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

  inc = '>';
  dec = '<';
  incVal = '+';
  decVal = '-';
  output = '.';
  input = ',';
  loopStart = '[';
  loopEnd = ']';
}
