<template>
  <v-app-bar color="primary">
    <template v-slot:prepend v-if="prependButton !== null">
      <v-app-bar-nav-icon :icon="prependButton.icon" class="ml-2" @click="prependButton.handler" />
    </template>

    <v-app-bar-title>{{ title }}</v-app-bar-title>

    <template v-slot:extension v-if="tabEnabled">
      <v-tabs v-model="tabModel">
        <v-tab v-for="tab in tabs" :key="tab.path" :text="tab.title" :to="tab.path"></v-tab>
      </v-tabs>
    </template>
  </v-app-bar>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { mdiHome } from '@mdi/js';

const router = useRouter();

// Title
const title = computed(() => {
  const currentRoute = router.currentRoute.value;

  if ('title' in currentRoute.meta) {
    return currentRoute.meta.title;
  } else {
    return 'Yuu-G.net';
  }
});

// Tabs
const tabModel = ref(null);

const tabs = ref([
  { title: 'Home', path: '/' },
  { title: 'About', path: '/about' }
]);

const tabEnabled = computed(() =>
  tabs.value.some(tab => tab.path === router.currentRoute.value.path)
);

// Prepend button
const prependButton = computed(() => {
  const currentRoute = router.currentRoute.value;

  if (tabEnabled.value) {
    return null;
    /*
      } else if(window.history.length > 1) {
        return {
          handler: () => router.back(),
          icon: 'mdi-arrow-left'
        };
    */
  } else {
    console.log(currentRoute)
    if (currentRoute.meta.homeDisabled === true) {
      return null;
    }

    return {
      handler: () => router.push('/'),
      icon: mdiHome
    };
  }

});
</script>
