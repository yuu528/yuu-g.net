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
    Brainfuxk: {
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
    },
    Nyaruko: {
      inc: '(」・ω・)」うー(／・ω・)／にゃー',
      dec: '(」・ω・)」うー!!(／・ω・)／にゃー!!',
      incVal: '(」・ω・)」うー!(／・ω・)／にゃー!',
      decVal: '(」・ω・)」うー!!!(／・ω・)／にゃー!!!',
      output: 'Let\'s＼(・ω・)／にゃー',
      input: 'cosmic!',
      loopStart: 'CHAOS☆CHAOS!',
      loopEnd: 'I WANNA CHAOS!'
    },
    Kemono: {
      inc: 'たのしー！',
      dec: 'すごーい！',
      incVal: 'たーのしー！',
      decVal: 'すっごーい！',
      output: 'なにこれなにこれ！',
      input: 'おもしろーい！',
      loopStart: 'うわー！',
      loopEnd: 'わーい！'
    },
    Jojo: {
      inc: ['スターフィンガー！', 'やれやれだぜ'],
      dec: ['ロードローラーだ！', '貧弱ゥ'],
      incVal: 'オラ',
      decVal: '無駄',
      output: 'ハーミットパープル',
      input: '新手のスタンド使いか！',
      loopStart: 'あ…ありのまま 今　起こった事を話すぜ！',
      loopEnd: 'ザ・ワールド！'
    },
    BFBASICn: {
      inc: 'す',
      dec: 'ばぼーん',
      incVal: 'ぽ',
      decVal: 'び',
      output: 'ぽーん',
      input: 'うすらの',
      loopStart: 'すてらの',
      loopEnd: 'なばびこーん'
    },
    Misa: {
      inc: ['>', '→', '～', 'ー'],
      dec: ['<', '←', '★', '☆'],
      incVal: ['+', 'あ', 'ぁ', 'お', 'ぉ'],
      decVal: ['-', 'っ', 'ッ'],
      input: [',', '？'],
      output: ['.', '！'],
      loopStart: ['[','「', '『'],
      loopEnd: [']', '」', '』']
    },
    BrainHakke: {
      inc: '☰',
      dec: '☷',
      incVal: '☳',
      decVal: '☴',
      output: '☵',
      input: '☲',
      loopStart: '☶',
      loopEnd: '☱'
    },
    Gochiusa: {
      inc: 'こころ',
      dec: 'いつも',
      incVal: 'ぴょん',
      decVal: 'らんらん',
      output: '言いなさいっ',
      input: '待ち？',
      loopStart: 'はじめんがかんじん',
      loopEnd: 'つーんだつーんだ'
    },
    NekoMimi: {
      inc: 'ネコミミ！',
      dec: 'ネコミミモード',
      incVal: 'おにいさま',
      decVal: '私のしもべー',
      output: 'や・く・そ・く・よ',
      input: 'フルフルフルムーン',
      loopStart: 'キスキス…',
      loopEnd: 'キス…したくなっちゃった…'
    },
    YazawaNico: {
      inc: '笑顔届ける矢澤にこにこ！',
      dec: 'だめだめだめっ！',
      incVal: 'にっこにっこにー',
      decVal: 'にこにーって覚えてラブニコ！',
      output: 'ぴょんぴょんぴょんっ！',
      input: 'あなたのハートににこにこにー！',
      loopStart: 'にこにーはみんなのもの！',
      loopEnd: 'ｷﾓﾁﾜﾙｲ'
    },
    Eimun: {
      inc: 'えい！',
      dec: 'むん！',
      incVal: 'えい',
      decVal: 'むん',
      output: 'ばばんば～',
      input: 'とまと！',
      loopStart: 'っ',
      loopEnd: '、'
    }
  };

  public inc: string | string[];
  public dec: string | string[];
  public incVal: string | string[];
  public decVal: string | string[];
  public output: string | string[];
  public input: string | string[];
  public loopStart: string | string[];
  public loopEnd: string | string[];

  constructor(spec?: {[key: string]: string | string[]}) {
    if(spec !== undefined) {
      Object.entries(spec).forEach(([key, mark]) => {
        this[key] = mark;
      });
    } else {
      Object.entries(MarkSpec.PRESETS.Brainfuxk).forEach(([key, mark]) => {
        this[key] = mark;
      });
    }
  }
}
