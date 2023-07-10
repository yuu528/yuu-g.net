<template>
  <v-container>
    <v-row class="mt-2" justify="center">
      <v-avatar size="150" variant="elevated">
        <v-img alt="Yuu528 Avatar" src="@/assets/icon.png"></v-img>
      </v-avatar>
    </v-row>
    <v-row justify="center">
      <div class="text-h4">Yuu528</div>
    </v-row>
    <v-row justify="center">
      <v-col
        cols="12" sm="10" md="10" lg="8" xl="6" xxl="6"
      >
      <TimelineCard title="経歴" :list="items" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import TimelineCard from '@/components/TimelineCard.vue'
</script>

<script>
  export default {
    data: () => ({
      items: [
        {
          title: '小学校高学年',
          text: 'BASICでプログラミングに入門'
        },
        {
          title: '小学校高学年～中学2年',
          text: 'Minecraftサーバ運営、PHPを学ぶ'
        },
        {
          title: '中学2年',
          text: 'JavaScriptなどを学ぶ。自宅Webサーバのホスティング開始'
        },
        {
          title: '高校1年',
          texts: [
            'Arduinoに入門。チームで自律ロボットの制作を開始(プログラミング担当)',
            '文化祭にてイルミネーション回路を設計、設置',
            '県高校生ロボット大会に出場'
          ],
        },
        {
          title: '高校2年',
          text: '画像認識ロボットを作成、大会に出場'
        },
        {
          title: '高校3年',
          text: 'モータドライバ設計・発注とプログラミング担当としてロボットを制作'
        },
        {
          title: '大学入学',
          text: '国立大学へ入学'
        },
      ]
    })
  }
</script>
