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
      <Run />
    </v-tabs-window-item>
    <v-tabs-window-item value="gen">
      <Generate />
    </v-tabs-window-item>
  </v-tabs-window>
</template>

<route lang="yaml">
meta:
  title: BrainFu*k Interpreter & Generator
</route>

<script setup lang="ts">
import { ref } from 'vue';

import Run from '@/components/brainfuxk/Run.vue';
import Generate from '@/components/brainfuxk/Generate.vue';

const tab = ref();
</script>
