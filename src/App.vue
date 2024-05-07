<template>
  <v-app>
    <v-app-bar color="primary" flat>
      <v-app-bar-title v-if="inTabPage">Yuu-G.net</v-app-bar-title>
      <v-app-bar-title v-else>{{ $router.currentRoute.value.meta.title }}</v-app-bar-title>

      <template v-slot:prepend v-if="!inTabPage">
        <v-app-bar-nav-icon
          v-if="router.currentRoute.value.name === 'NotFound'"
          to="/"
          icon="mdi-home"
        ></v-app-bar-nav-icon>
        <v-app-bar-nav-icon
          v-else
          @click="router.back()"
          icon="mdi-arrow-left"
        ></v-app-bar-nav-icon>
      </template>

      <template v-slot:extension v-if="inTabPage">
        <v-tabs>
          <v-tab v-for="page in pages" :to="page.to" :key="page.to">
            {{ page.name }}
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>

    <v-main>
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" :key="$route.fullPath"></component>
        </keep-alive>
      </router-view>
    </v-main>

    <v-footer>
      <v-row justify="center">
        &copy; {{ new Date().getFullYear() }} Yuu528
      </v-row>
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const pages = [
  {
    name: 'Home',
    to: '/'
  },
  {
    name: 'About',
    to: '/about'
  }
];

console.log(router.currentRoute);

const inTabPage = computed(() =>
  pages.some(page =>
    page.to === router.currentRoute.value.path
  )
)
</script>
