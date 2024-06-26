import {
  mdiAndroid,
  mdiGithub,
  mdiLinux,
  mdiMicrosoftWindows,
  mdiTwitter,
} from '@mdi/js';

export class Contents {
  public static readonly apps = [
    {
      title: 'GakujoViewer',
      text: '静岡大学学務情報システムの非公式クライアント',
      link: 'Visit',
      to: '/su/gv',
      targets: [mdiMicrosoftWindows, mdiLinux]
    },
    {
      title: '艦これブラウザ',
      text: 'AndroidでもPCと同じUI・画質・音質で遊べる艦これブラウザ',
      link: 'Visit',
      href: 'https://old.yuu-g.net/kcbrowser/',
      targets: [mdiAndroid]
    },
  ];

  public static readonly webApps = [
    {
      title: 'BrainFu*k Interpreter',
      text: 'BrainFu*k系言語のWebインタプリタ',
      link: 'Visit',
      to: '/brainfuxk'
    },
    {
      title: 'PokeMikuConverter',
      text: 'ポケミクに64文字以上の歌詞を入力できるアプリ(現在ひらがな変換利用不可)',
      link: 'Visit',
      href: 'https://old.yuu-g.net/pokemiku/conv/'
    },
    {
      title: 'AlpFast',
      text: 'アルファベットA～Zを打つタイムアタック',
      link: 'Visit',
      href: 'https://old.yuu-g.net/alpfast/'
    },
    {
      title: 'OBCSim',
      text: '某会社のバス運賃表示器を再現するシミュレータ',
      link: 'Visit',
      href: 'https://old.yuu-g.net/obcsim/'
    },
  ];

  public static readonly userJSs = [
    {
      title: 'improve_gakujo.user.js',
      text: '静岡大学学務情報システムの改善UserJS(自分用)',
      link: 'Visit',
      href: 'https://github.com/yuu528/ImproveGakujo'
    },
    {
      title: 'ddg-googlebtn.user.js',
      text: 'DuckDuckGoにGoogle検索ボタンを追加UserJS',
      link: 'Visit',
      href: 'https://gist.github.com/yuu528/bce27d799f3047a13d7766e19b207ada'
    },
  ];

  public static readonly links = [
    {
      icon: mdiTwitter,
      title: 'Twitter',
      link: 'Visit',
      href: 'https://twitter.com/you_yuu528'
    },
    {
      icon: mdiGithub,
      title: 'GitHub',
      link: 'Visit',
      href: 'https://github.com/yuu528'
    },
    {
      title: 'Scrapbox',
      text: '自分用のちょっとしたメモなど',
      link: 'Visit',
      href: 'https://scrapbox.io/yuu-g/'
    },
    {
      title: '旧ウェブサイト',
      text: 'リニューアル前のウェブサイトをアーカイブとして公開(一部リンク切れあり)',
      link: 'Visit',
      href: 'https://old.yuu-g.net'
    },
  ];
}
