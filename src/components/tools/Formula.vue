<template>
  <span ref="target"></span>
</template>

<style>
.katex-html {
  display: none;
}
</style>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import katex from 'katex';

const props = defineProps<{
  expr: string
}>();

const target = ref(null);

onMounted(() => {
  katex.render(props.expr, target.value);
});

watch(() => props.expr, () => {
  katex.render(props.expr, target.value);
}, { deep: true });
</script>
