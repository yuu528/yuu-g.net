<template>
  <v-container fluid>
    <v-row justify="center">
      <div class="text-h2" align-content="center">Contents</div>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6" md="4" lg="3" xl="3" xxl="2" v-for="content in contents" :key="content.title">
        <v-card
          :title="content.title"
          :text="content.text"
        >
          <v-card-actions>
            <v-btn :href="content.href">{{ content.link }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <div class="text-h2" align-content="center">Links</div>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6" md="4" lg="3" xl="3" xxl="2" v-for="link in links" :key="link.title">
        <v-card
          :title="link.title"
          :text="link.text"
          :prepend-icon="link.icon"
        >
          <v-card-actions>
            <v-btn :href="link.href">{{ link.link }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      contents: [
        {
          title: 'test',
          text: 'description',
          link: 'link',
          href: 'https://example.com'
        }
      ],
      links: [
        {
          icon: 'fa-twitter',
          title: 'Twitter',
          text: '',
          link: 'Visit',
          href: 'https://twitter.com/you_yuu528'
        }
      ]
    })
  }
</script>
