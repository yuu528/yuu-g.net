<template>
  <v-container>
  </v-container>
</template>

<script setup lang="ts">
import { BCHUtil } from '@/scripts/tools/bch1511/BCHUtil';

const result = BCHUtil.encode('10001000011');
</script>
