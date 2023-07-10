<template>
  <v-container>
    <v-row>
      <div class="text-h4">{{ title }}</div>
    </v-row>
    <v-row>
      <v-col
        cols="12" sm="6" md="4" lg="3" xl="3" xxl="2"
        v-for="content in list" :key="content.title"
      >
        <v-card
          :title="content.title"
          :text="content.text"
          :prepend-icon="content.icon"
        >
          <v-card-actions>
            <v-btn :href="content.href">{{ content.link }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: [
    'title',
    'list'
  ]
}
</script>
