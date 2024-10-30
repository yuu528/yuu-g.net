<template>
  <span ref="target"></span>
</template>

<style></style>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import katex from 'katex';
import 'katex/dist/katex.min.css';

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
