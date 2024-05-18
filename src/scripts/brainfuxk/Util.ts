export class Util {
  static copyToClipboard(text: string): boolean {
    if(navigator.clipboard) {
      navigator.clipboard.writeText(text);
      return true;
    } else {
      return false;
    }
  }

  static factor(n: number): number[] {
    let result = [];

    let tmp = n;
    for(let i = 2; tmp > 1 && i <= tmp; i++) {
      if(tmp % i === 0) {
        result.push(i);
        tmp /= i;
        i = 1;
      }
    }

    if(tmp > 1) {
      result.push(tmp);
    }

    result.sort((a, b) => a - b);

    return result;
  }
}
