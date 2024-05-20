import TopPng from '@/assets/su/gv/top.png';
import DetailPng from '@/assets/su/gv/detail.png';
import LoginPng from '@/assets/su/gv/login.png';

export const Descriptions = [
  {
    title: '見やすく高速なUI',
    description: [
      'レポート、授業連絡、小テストのデータのみに絞った表示で、',
      '見やすいUIを実現。',
      '取得したデータをキャッシュすることで高速動作を実現。'
    ],
    image: TopPng
  },
  {
    title: '詳細の高速表示',
    description: [
      'タイトルをクリックすると内容を表示。',
      '2回目以降はキャッシュされたデータを表示することで高速表示。'
    ],
    image: DetailPng
  },
  {
    title: '自動ログイン',
    description: [
      '最初の1回だけログインすれば、次から起動時に自動でログイン。',
      'ログイン作業をユーザに意識させません。'
    ],
    image: LoginPng
  },
  {
    title: 'データの自動更新',
    description: [
      '10分おきに自動で新しいデータを取得。',
      '常に最新の情報を表示し、タイムアウトも起きません。'
    ]
  }
];
