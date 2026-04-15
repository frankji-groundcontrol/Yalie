export type PosterSpeaker = {
  name: string
  title: string
  image: string
  alt: string
  imageClassName?: string
}

export type AgendaItem = {
  time: string
  title: string
  description?: string
}

export const posterContent = {
  clubName: 'Yale Club of Shanghai',
  dateLabel: '2026.04.26',
  chineseDate: '2026年4月26日',
  eventTitle: '四月校友聚会',
  eventSubtitle: 'AI、生活与人生路径的相遇',
  summary:
    '这不是一场只讨论工具的活动。我们想从 AI 进入真实生活之后的表达、路径与连接出发，让校友和朋友们在同一个现场里认真交流，也一起共创可被带走的内容。',
  locationCards: [
    {
      name: '陆家嘴数智港',
      venue: '',
      address: '上海市浦东新区洋泾街道滨江大道257弄8号V6商墅',
    },
  ],
  agendaItems: [
    {
      time: '1:30 PM',
      title: '入场签到',
    },
    {
      time: '2:00 PM - 3:00 PM',
      title: '主题演讲',
      description: '两位主讲嘉宾依次分享。',
    },
    {
      time: '3:00 PM - 4:00 PM',
      title: '圆桌讨论',
      description: '我们希望把更多行业，比如建筑、艺术、心理、政治学等领域的校友和朋友们邀请进来一起聊聊。欢迎你在现场成为 Guest X，加入圆桌对话。',
    },
    {
      time: '4:00 PM - 6:00 PM',
      title: 'OpenClaw 共创 & 自由交流',
      description: '围绕两张地图展开共创体验；如不想参加共创，也可直接在交流区自由交流。',
    },
  ] satisfies AgendaItem[],
  keynoteSpeakers: [
    {
      name: '朱威',
      title: '地平线总裁',
      image: '/zhuwei.jpg',
      alt: '朱威',
      imageClassName: 'object-contain bg-white',
    },
    {
      name: '崔东红',
      title: '教授、上海市精神卫生中心研究员',
      image: '/cuidonghong.webp',
      alt: '崔东红',
    },
  ] satisfies PosterSpeaker[],
  roundtableSpeakers: [
    {
      name: '刘子玥',
      title: '设计AI Agent出海、f-a-n事务所创始人',
      image: '/ziyue.png',
      alt: '刘子玥',
    },
    {
      name: '赵子超',
      title: '导演、视效总监、电子音乐创作人、E-Kung厂牌创始人',
      image: '/zichao.png',
      alt: '赵子超',
    },
    {
      name: 'Hedy Bok',
      title: 'AI穿戴设备创业者、心理咨询师',
      image: '/hedy.jpg',
      alt: 'Hedy Bok',
      imageClassName: 'object-contain',
    },
    {
      name: '周悦',
      title: '上海人工智能实验室青年研究员',
      image: '/yue.jpg',
      alt: '周悦',
    },
  ] satisfies PosterSpeaker[],
  guestX: {
    name: 'Guest X',
    title: '来自现场的你',
  },
  audienceItems: [
    '即将前往纽黑文生活',
    '想在上海认识新朋友',
    '对跨学科合作与创作感兴趣',
    '想和有好奇心的人聊聊',
  ],
  qrTitle: '报名二维码',
  qrInstruction: '扫描二维码或点击阅读原文进行报名',
  footerDateLabel: 'April 2026',
} as const
