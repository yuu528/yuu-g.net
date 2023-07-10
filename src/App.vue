<template>
  <v-app>
    <v-app-bar flat>
      <v-app-bar-title>Yuu-G.net</v-app-bar-title>

      <template v-slot:extension>
        <v-tabs>
          <v-tab v-for="page in pages" :to="page.to" :key="page.to">
            {{ page.name }}
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>

    <v-main>
      <keep-alive>
        <router-view />
      </keep-alive>
    </v-main>

    <v-footer>
      <v-row justify="center">
        (C) {{ new Date().getFullYear() }} Yuu528
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      drawer: null,
      pages: [
        {
          name: 'Home',
          to: '/'
        },
        {
          name: 'About',
          to: '/about'
        }
      ]
    })
  }
</script>
