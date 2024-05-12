import { MarkSpec } from './MarkSpec';
import { BFError, Error } from './BFError';
import { BFStatus, Status } from './BFStatus';

export class BFMachine {
  private _progMem: number[];
  private _progPtr: number;

  private _mem: number[];
  private _ptr: number;

  private loopStack: number[];

  private _mark: MarkSpec;

  constructor() {
    this._mark = new MarkSpec();

    this.reset();
  }

  public setMark(mark: MarkSpec) {
    this._mark = mark;
  }

  public load(prog: string): (BFError | boolean) {
    // Covert mark char to number
    let markToNum = {};

    Object.entries(this._mark).forEach(([op, mark]) => {
      if(Array.isArray(mark)) {
        mark.forEach(mark => markToNum[mark.replace(/\s/g, '')] = MarkSpec.enum[op]);
      } else {
        markToNum[mark.replace(/\s/g, '')] = MarkSpec.enum[op];
      }
    });

    // create regex to match /^\s*({mark})(.*)$/s
    const regExp = new RegExp(
      '^\s*(' +
      Object.values(this._mark)
        .map(mark => {
            if(Array.isArray(mark)) {
              return mark.map(mark => mark.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\s/g, '')).join('|');
            }

            return mark.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\s/g, '')
          })
          .sort((a, b) => b.length - a.length)
          .join('|') +
        ')(.*)$',
      's'
    );

    // Load program to memory
    let matched: RegExpMatchArray | null;
    let remain = prog.replace(/\s/g, '');
    do {
      matched = remain.match(regExp);

      if(matched === null || !(matched[1] in markToNum)) {
        // reporting line and column is not implemented yet
        return new BFError(Error.INVALID_SYNTAX, 0, 0);
      }

      this._progMem.push(markToNum[matched[1]]);

      remain = matched[2];
    } while(remain !== '');

    return true;
  }

  public reset(): void {
    this._progPtr = 0;
    this._progMem = [];

    this._ptr = 0;
    this._mem = [];

    this.loopStack = [];
  }

  public step(): BFStatus {
    if(this._progPtr >= this._progMem.length) {
      return new BFStatus(Status.HALTED, '');
    }

    const result = new BFStatus(Status.RUNNING, '');

    switch(this._progMem[this._progPtr]) {
      case MarkSpec.enum.inc:
        this._ptr++;
        break;

      case MarkSpec.enum.dec:
        this._ptr--;
        break;

      case MarkSpec.enum.incVal:
        if(this._mem[this._ptr] === undefined) {
          this._mem[this._ptr] = 1;
        } else {
          this._mem[this._ptr]++;
        }
        break;

      case MarkSpec.enum.decVal:
        if(this._mem[this._ptr] === undefined) {
          this._mem[this._ptr] = -1;
        } else {
          this._mem[this._ptr]--;
        }
        break;

      case MarkSpec.enum.output:
        result.stdout = String.fromCharCode(this._mem[this._ptr]);
        break;

      case MarkSpec.enum.input:
        result.id = Status.WAITING_INPUT;
        break;

      case MarkSpec.enum.loopStart:
        this.loopStack.push(this._progPtr);

        if(this._mem[this._ptr] === 0) {
          let currentDepth = this.loopStack.length;

          do {
            this._progPtr++;

            switch(this._progMem[this._progPtr]) {
              case MarkSpec.enum.loopStart:
                this.loopStack.push(this._progPtr);
                break;

              case MarkSpec.enum.loopEnd:
                if(this.loopStack.pop() === undefined) {
                  return new BFStatus(
                    Status.HALTED,
                    '',
                    new BFError(Error.UNMATCHED_LOOP, 0, 0) // Line and column is not implemented yet
                  );
                }
                break;
            }
          } while(this.loopStack.length >= currentDepth);
        }
        break;

      case MarkSpec.enum.loopEnd:
        let pairPtr = this.loopStack.pop();

        if(pairPtr === undefined) {
          return new BFStatus(
            Status.HALTED,
            '',
            new BFError(Error.UNMATCHED_LOOP, 0, 0) // Line and column is not implemented yet
          );
        }

        if(this._mem[this._ptr] !== 0) {
          this._progPtr = pairPtr;
          this.loopStack.push(pairPtr);
        }
        break;
    }

    this._progPtr++;

    return result;
  }

  public store(input: string): void {
    this._mem[this._ptr] = input.charCodeAt(0);
  }

  get progMem(): number[] {
    return this._progMem;
  }

  get progPtr(): number {
    return this._progPtr;
  }

  get mem(): number[] {
    return this._mem;
  }

  get ptr(): number {
    return this._ptr;
  }

  get mark(): MarkSpec {
    return this._mark;
  }
}
