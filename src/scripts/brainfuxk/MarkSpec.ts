export class MarkSpec {
  static readonly enum = {
    inc: 0,
    dec: 1,
    incVal: 2,
    decVal: 3,
    output: 4,
    input: 5,
    loopStart: 6,
    loopEnd: 7
  }

  static readonly PRESETS = {
    brainfuxk: {
      inc: '>',
      dec: '<',
      incVal: '+',
      decVal: '-',
      output: '.',
      input: ',',
      loopStart: '[',
      loopEnd: ']'
    },
    Ook: {
      inc: 'Ook. Ook?',
      dec: 'Ook? Ook.',
      incVal: 'Ook. Ook.',
      decVal: 'Ook! Ook!',
      output: 'Ook! Ook.',
      input: 'Ook. Ook!',
      loopStart: 'Ook! Ook?',
      loopEnd: 'Ook? Ook!'
    }
  };

  public inc: string;
  public dec: string;
  public incVal: string;
  public decVal: string;
  public output: string;
  public input: string;
  public loopStart: string;
  public loopEnd: string;

  constructor(spec?: {key: string, mark: string}) {
    if(spec !== undefined) {
      Object.entries(spec).forEach(([key, mark]) => {
        this[key] = mark;
      });
    } else {
      Object.entries(MarkSpec.PRESETS.brainfuxk).forEach(([key, mark]) => {
        this[key] = mark;
      });
    }
  }
}
