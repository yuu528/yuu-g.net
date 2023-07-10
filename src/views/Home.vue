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
      /*
      {
        title: 'test',
        text: 'description',
        link: 'link',
        href: 'https://example.com'
      }
      */
    ],
    links: [
      {
        icon: 'mdi-twitter',
        title: 'Twitter',
        text: 'メインのSNS',
        link: 'Visit',
        href: 'https://twitter.com/you_yuu528'
      },
      {
        title: 'Scrapbox',
        text: '自分用のちょっとしたメモなど',
        link: 'Visit',
        href: 'https://scrapbox.io/yuu-g/'
      }
    ]
  })
}
</script>
