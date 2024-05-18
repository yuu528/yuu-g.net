<template>
  <v-container class="my-4">
    <v-row>
      <div class="text-h4">{{ props.title }}</div>
    </v-row>
    <v-row v-if="props.list">
      <v-col
        cols="12" sm="6" md="4" lg="3" xl="3" xxl="2"
        v-for="content in props.list" :key="content.title"
      >
        <v-card
          :title="content.title"
          :text="content.text"
          :prepend-icon="content.icon"
        >
          <v-card-actions>
            <v-btn
              v-if="'href' in content"
              :href="content.href"
            >
              {{ content.link }}
            </v-btn>
            <v-btn
              v-if="'to' in content"
              :to="content.to"
            >
              {{ content.link }}
            </v-btn>
            <v-spacer></v-spacer>
            <div v-if="content.targets">
              <v-icon v-for="target in content.targets" :icon="target" :key="target">
              </v-icon>
            </div>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-else>
      <div class="ml-2">準備中です！</div>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
const props = defineProps([
  'title',
  'list'
]);
</script>
