<template>
  <v-container>
    <v-row class="mt-2" justify="center">
      <v-avatar size="150" variant="elevated">
        <v-img alt="Yuu528 Avatar" src="@/assets/icon.png"></v-img>
      </v-avatar>
    </v-row>
    <v-row justify="center">
      <div class="text-h4">Yuu528</div>
    </v-row>
    <v-row justify="center">
      <v-col
        cols="12" sm="10" md="10" lg="8" xl="6" xxl="6"
      >
      <TimelineCard title="経歴" :list="myHistory" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { myHistory } from '@/data/about/MyHistory';
</script>
