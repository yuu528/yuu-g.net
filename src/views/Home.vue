<template>
  <CardList title="コンテンツ" :list="contents" />
  <CardList title="リンク" :list="links" />
</template>

<script setup>
import CardList from '@/components/CardList.vue'
</script>

<script>
export default {
  data: () => ({
    contents: [
      {
        title: 'EightRPN',
        text: 'オーバーフローのないRPN電卓アプリ',
        link: '開発中',
        href: ''
      },
      {
        title: 'improve_gakujo.user.js',
        text: '静岡大学学務情報システムの改善UserJS(自分用)',
        link: 'Visit',
        href: 'https://gist.github.com/yuu528/529046d3dcead488a4ea05e2a7a7ff48'
      },
      {
        title: 'ddg-googlebtn.user.js',
        text: 'DuckDuckGoにGoogle検索ボタンを追加UserJS',
        link: 'Visit',
        href: 'https://gist.github.com/yuu528/bce27d799f3047a13d7766e19b207ada'
      },
      {
        title: '艦これブラウザ',
        text: 'AndroidでもPCと同じUI・画質・音質で遊べる艦これブラウザ',
        link: 'Visit',
        href: 'https://old.yuu-g.net/kcbrowser/'
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
      {
        title: '旧ウェブサイト',
        text: 'リニューアル前のウェブサイトをアーカイブとして公開(一部リンク切れあり)',
        link: 'Visit',
        href: 'https://old.yuu-g.net'
      },
    ],
    links: [
      {
        icon: 'mdi-twitter',
        title: 'Twitter',
        link: 'Visit',
        href: 'https://twitter.com/you_yuu528'
      },
      {
        icon: 'mdi-github',
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
    ]
  })
}
</script>
