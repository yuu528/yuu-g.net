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
      <router-view />
    </v-main>
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
