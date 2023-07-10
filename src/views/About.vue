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
    <v-row justify="center">
      <v-col
        cols="12" sm="10" md="10" lg="8" xl="6" xxl="6"
      >
        <v-card title="経歴">
          <v-timeline align="start" density="compact" class="ms-6">
            <v-timeline-item v-for="item in items" size="x-small">
              <div class="d-flex">
                <strong class="me-4">{{ item.title }}</strong>
                <div>{{ item.text }}</div>
              </div>
            </v-timeline-item>
          </v-timeline>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

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
          title: '中学1年',
          text: 'JavaScriptなどを学ぶ。自宅Webサーバのホスティング開始'
        },
        {
          title: '高校1年',
          text: 'Arduinoに入門。チームで自律ロボットの制作を開始(プログラミング担当)'
        },
        {
          title: '高校1年',
          text: '文化祭にてイルミネーション回路を設計、設置'
        },
        {
          title: '高校1年',
          text: 'ロボット大会に出場'
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
