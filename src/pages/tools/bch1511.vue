<template>
  <v-container>
    <v-sheet class="d-flex align-stretch">
      <v-text-field density="compact" label="2進数" v-model="inputModel" :rules="[valueTest]">
      </v-text-field>
      <v-btn class="ml-2" :disabled="valueTest(inputModel) !== true" @click="calc">計算する</v-btn>
    </v-sheet>

    <p>
      結果: {{ resultStr }}
    </p>

    <BCHEncodeResult :quotient="result.quotient.asArray" :divisor="BCHUtil.generator.asArray"
      :work="result.work.map(bin => bin.asArray)" />
  </v-container>
</template>

<route lang="yaml">
meta:
  title: BCH(15, 11)符号化ツール
</route>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { BCHUtil } from '@/scripts/tools/bch1511/BCHUtil';
import BCHEncodeResult from '@/components/tools/BCHEncodeResult.vue';

const inputModel = ref('10001000011');

const result = ref(BCHUtil.encode(inputModel.value));

const resultStr = computed(() => {
  const codeStrTmp = result.value.work[result.value.work.length - 1].asString
    .padStart(BCHUtil.codeLength - BCHUtil.infoBitsLength, '0');

  return [
    result.value.input.asString.split('').map((bit, index) =>
      index % 4 === 0 ? ' ' + bit : bit
    ).join(''),
    codeStrTmp.substring(codeStrTmp.length - 4)
  ].join(' ')
});

function calc() {
  result.value = BCHUtil.encode(inputModel.value);
}

function valueTest(value: string): boolean | string {
  if (/[^01]/.test(value)) return '2進数で入力してください';
  if (value.length !== 11) return '11bitで入力してください';
  return true;
}
</script>
