<template>
  <v-tabs
    v-model="tab"
    align-tabs="center"
    fixed-tabs
  >
    <v-tab value="run">Run</v-tab>
    <v-tab value="gen">Generate</v-tab>
  </v-tabs>

  <v-tabs-window v-model="tab">
    <v-tabs-window-item value="run">
      <BFRun />
    </v-tabs-window-item>
    <v-tabs-window-item value="gen">
      <BFGenerate />
    </v-tabs-window-item>
  </v-tabs-window>
</template>

<route lang="yaml">
meta:
  title: BrainFu*k Interpreter & Generator
  description: BrainFu*kのインタプリタとジェネレータ
</route>

<script setup lang="ts">
import { ref } from 'vue';

const tab = ref();
</script>
