<template>
  <v-container fluid>
    <v-row justify="center">
      <div class="text-h2" align-content="center">Works</div>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6" md="4" lg="3" xl="3" xxl="2" v-for="work in works" :key="work.title">
        <v-card
          :title="work.title"
          :text="work.text"
        >
          <v-card-actions>
            <v-btn :href="work.href">{{ work.link }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      works: [
        {
          title: 'test',
          text: 'description',
          link: 'link',
          href: 'https://example.com'
        },
        {
          title: 'test',
          text: 'description',
          link: 'link',
          href: 'https://example.com'
        },
        {
          title: 'test',
          text: 'description',
          link: 'link',
          href: 'https://example.com'
        },
        {
          title: 'test',
          text: 'description',
          link: 'link',
          href: 'https://example.com'
        },
        {
          title: 'test',
          text: 'description',
          link: 'link',
          href: 'https://example.com'
        },
        {
          title: 'test',
          text: 'description',
          link: 'link',
          href: 'https://example.com'
        },
      ]
    })
  }
</script>
