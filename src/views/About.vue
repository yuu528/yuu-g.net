<template>
  <v-container>
    <v-row justify="center">
      <v-avatar size="150" variant="elevated">
        <v-img alt="Yuu528 Avatar" src="@/assets/icon.png"></v-img>
      </v-avatar>
    </v-row>
    <v-row justify="center">
      <div class="text-h4">Yuu528</div>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      items: [
        {
          icon: 'mdi-map-marker',
          text: 'Shizuoka, Japan'
        }
      ]
    })
  }
</script>
