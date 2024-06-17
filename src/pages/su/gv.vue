<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="12">
        <span class="text-h3">
          <v-avatar size="3.5rem">
            <v-img src="@/assets/su/gv/icon.png"></v-img>
          </v-avatar>
          GakujoViewer
        </span>
      </v-col>
      <v-col cols="12">
        <p class="ml-3">
          静岡大学 学務情報システムを閲覧しやすくするWindows、Linux向けソフトウェア
        </p>
      </v-col>
    </v-row>

    <v-row class="mt-10" no-gutters>
      <v-col cols="12">
        <span class="text-h4">
          機能説明
        </span>
      </v-col>
      <v-col v-for="description in Descriptions" cols="12" class="mt-6">
        <v-sheet>
          <v-container>
            <v-row>
              <v-col v-if="'image' in description" cols="12" md="6">
                <v-img :src="description.image"></v-img>
              </v-col>

              <v-col cols="12" md="6">
                <span class="text-h5">{{ description.title }}</span>
                <p>{{ description.description.join('') }}</p>
              </v-col>
            </v-row>
          </v-container>
        </v-sheet>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <span class="text-h4">
          ダウンロード
        </span>
      </v-col>
      <v-col cols="12" sm="6">
        <v-btn href="https://github.com/SU-ProgC-Marionnette/GakujoViewer/releases" class="w-100"
          :prepend-icon="mdiFolderZip" color="primary">インストーラ・ZIP</v-btn>
      </v-col>
      <v-col cols="12" sm="6">
        <v-btn href="https://github.com/SU-ProgC-Marionnette/GakujoViewer" class="w-100" :prepend-icon="mdiFileCode"
          color=" primary">ソースコード</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<route lang="yaml">
meta:
  title: GakujoViewer - 静岡大学 学務情報システムビューワ
  description: 静岡大学 学務情報システムを閲覧しやすくするWindows、Linux向けソフトウェア
</route>

<script lang="ts" setup>
import { mdiFolderZip, mdiFileCode } from '@mdi/js';

import { Descriptions } from '@/data/su/gv/Descriptions';
</script>
