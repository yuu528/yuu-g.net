<!--
  TimelineCard component

  -- Props --
  title: card title
  list: Object
    title: timeline title
    text: text
    texts: texts array (instead of text property)
-->

<template>
  <v-card :title="title">
    <v-timeline align="start" density="compact" class="ms-6">
      <v-timeline-item v-for="item in list" size="x-small" :key="item.title">
        <div class="d-flex">
          <strong class="me-4">{{ item.title }}</strong>
          <div v-if="'texts' in item">
            <span v-for="text, index in item.texts" :key="text">
              {{ text }}
              <br v-if="index != item.texts.length - 1">
            </span>
          </div>
          <div v-else>
            {{ item.text }}
          </div>
        </div>
      </v-timeline-item>
    </v-timeline>
  </v-card>
</template>

<script>
export default {
  props: [
    'title',
    'list'
  ]
}
</script>
