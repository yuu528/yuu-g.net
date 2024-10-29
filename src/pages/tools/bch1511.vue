<template>
  <v-container>
    <v-text-field label="2進数" v-model="inputModel" :rules="inputRules">
    </v-text-field>
    <v-btn @click="calc">計算する</v-btn>

    <BCHEncodeResult :quotient="result.quotient.asArray" :divisor="BCHUtil.generator.asArray"
      :work="result.work.map(bin => bin.asArray)" />
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { BCHUtil } from '@/scripts/tools/bch1511/BCHUtil';
import BCHEncodeResult from '@/components/tools/BCHEncodeResult.vue';

const inputModel = ref('10001000011');
const inputRules = [
  value => {
    if (/[^01]/.test(value)) return '2進数で入力してください';
    if (value.length !== 11) return '11bitで入力してください';

    return true;
  }
];

const result = ref(BCHUtil.encode(inputModel.value));

function calc() {
  result.value = BCHUtil.encode(inputModel.value);
}
</script>
