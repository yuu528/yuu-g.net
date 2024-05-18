<template>
  <v-sheet class="mt-6 mx-4">
    <div class="text-h4">コンテンツ</div>
    <v-sheet class="ml-4">
      <CardList title="Apps" :list="Contents.apps" />
      <CardList title="WebApps" :list="Contents.webApps" />
      <CardList title="UserJS" :list="Contents.userJSs" />
    </v-sheet>

    <div class="text-h4">リンク</div>
    <v-sheet class="ml-4">
      <CardList title="" :list="Contents.links" />
    </v-sheet>
  </v-sheet>
</template>

<script setup lang="ts">
import { Contents } from '@/data/index/Contents';
</script>
