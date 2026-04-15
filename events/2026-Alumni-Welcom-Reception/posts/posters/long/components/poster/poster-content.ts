export type PosterSpeaker = {
  name: string
  title: string
  bio: string
  image: string
  alt: string
  imageClassName?: string
  frameClassName?: string
}

export type PosterMapItem = {
  title: string
  description: string
  image: string
  alt: string
  kind: 'journey' | 'local'
}

export type PosterRegistration = {
  eyebrow: string
  title: string
  qrPlaceholderText: string
  qrInstruction: string
}

export type PosterContent = {
  clubName: string
  dateLabel: string
  chineseDate: string
  footerDateLabel: string
  eventTitle: string
  eventSubtitle: string
  aboutLabel: string
  aboutTitle: string
  introduction: string[]
  valuesTitle: string
  values: string[]
  keynoteSpeakers: PosterSpeaker[]
  roundtableSpeakers: PosterSpeaker[]
  guestX: {
    name: string
    title: string
    description: string
  }
  roundtableClosing: string
  cocreationDescription: string
  mapItems: PosterMapItem[]
  mapClosing: string
  audienceLabel: string
  audienceTitle: string
  audienceIntro: string
  audienceItems: string[]
  quote: string
  registration: PosterRegistration
  locations: string[]
}

export const posterContent: PosterContent = {
  clubName: 'Yale Club of Shanghai',
  dateLabel: '2026.04.26',
  chineseDate: '2026年4月26日',
  footerDateLabel: 'April 2026',
  eventTitle: '四月校友聚会',
  eventSubtitle: 'AI、生活与人生路径的相遇',
  aboutLabel: 'About This Event',
  aboutTitle: '这次活动有什么不一样？',
  introduction: [
    '现在将OpenClaw之类的智能体或者Vibe Coding引入校友活动逐渐流行了起来。尽管我们或许也终不能免俗，但我们想让活动围绕人来展开。',
    '很多活动都在和AI攀上关系，乐此不疲地讨论效率、工具、焦虑和追赶，而我们的活动重点并不是展示技术本身。',
    '我们更想讨论的是，AI 怎么进入真实生活，怎么帮助我们理解自己、表达自己、连接彼此。',
    '这一次，我们想换一种方式——把智能体当作朋友，把技能当作打开连接的钥匙，通过 AI 走进更多社区，认识更多朋友，产生更多真实的相遇。',
  ],
  valuesTitle: 'We Care About',
  values: [
    '表达自己',
    '理解路径',
    '连接彼此',
  ],
  keynoteSpeakers: [
    {
      name: '朱威',
      title: '地平线总裁',
      bio: '中科大精密仪器本科，耶鲁管理学院 MBA。曾任职于梅赛德斯-奔驰、法雷奥、宁德时代等企业。长期深耕智能汽车、产业协同、商业化落地与国际化发展。',
      image: '/zhuwei.jpg',
      alt: '朱威',
      imageClassName: 'object-contain bg-white',
    },
    {
      name: '崔东红',
      title: '上海交大医学院附属精神卫生中心研究员',
      bio: '医学博士，哲学学士，博导。复旦大学精神病学博士，美国耶鲁大学分子精神病学博士后。现任上海市精神疾病重点实验室执行主任、样本库主任。',
      image: '/cuidonghong.webp',
      alt: '崔东红',
    },
  ],
  roundtableSpeakers: [
    {
      name: '刘子玥',
      title: '设计AI Agent出海、f-a-n事务所创始人',
      bio: '主持建筑师，兼任 SANAA 事务所及妹岛和世建筑设计事务所项目建筑师。耶鲁大学建筑学硕士，新南威尔士大学建筑学学士。曾就职于西扎佩里事务所、都市实践、标准营造等，也曾在雪城大学、新南威尔士大学、耶鲁大学、东南大学任教。',
      image: '/ziyue.png',
      alt: '刘子玥',
    },
    {
      name: '赵子超',
      title: '导演、视效总监、电子音乐创作人',
      bio: 'SeeCiao 个人品牌主理人，策展人。曾就职于 Smoke&Mirrors、MPC 等国际特效公司。创立视觉特效厂牌 E-KUNG 至今 10 年，持续进行电音&跨界艺术创作、艺术展、音乐节、电音节及创意项目策划。',
      image: '/zichao.png',
      alt: '赵子超',
    },
    {
      name: 'Hedy Bok',
      title: 'AI穿戴设备创业者、心理咨询师',
      bio: '港大心理咨询硕士，耶鲁神学院硕士，普林斯顿比较文学学士。2018年耶鲁 Edwin Seder 跨学科研究奖获奖者，英国心理咨询协会会员。与潮汐、三联、Heartly Lab 合作冥想课程，陪伴16万学员。',
      image: '/hedy.jpg',
      alt: 'Hedy Bok',
      imageClassName: 'object-contain',
      frameClassName: 'overflow-hidden border-2 border-[#00356b]',
    },
    {
      name: '周悦',
      title: '上海人工智能实验室青年研究员',
      bio: '耶鲁大学国际关系博士，本科获政治科学、STS（Science, Technology and Society）双学位。长期从事人工智能与前沿科技方向的软硬件技术分析与政策、产业调查。',
      image: '/yue.jpg',
      alt: '周悦',
    },
  ],
  guestX: {
    name: 'Guest X',
    title: '来自现场的你',
    description: '我们相信，最有趣的观点可能来自任何人。如果你有想分享的故事、经历或思考，欢迎在现场成为 Guest X，加入圆桌对话。',
  },
  roundtableClosing:
    '我们也希望把更多行业的朋友邀请进来——比如建筑、艺术、心理、政治学等领域——一起聊聊：当 AI 进入工作与生活之后，人的感受、审美、创作方式和人生选择，会发生什么变化。',
  cocreationDescription:
    '结合 OpenClaw，尝试人与智能体之间更自然的沟通方式：怎么提问，怎么来回对话，怎么把模糊的感受变成可以被表达、被组织的内容。',
  mapItems: [
    {
      title: '人生路径地图',
      description: '把大家走过的每一段路，整理成可以被看见、被分享的路径地图',
      image: '/map-1-journey.png',
      alt: '人生路径地图示例',
      kind: 'journey',
    },
    {
      title: '在地生活地图',
      description: '把关于纽黑文和你的城市的生活，变成可以分享的城市关系图',
      image: '/map-2-local.png',
      alt: '在地生活地图示例',
      kind: 'local',
    },
  ],
  mapClosing: '我们希望带走的，不只是一次活动记忆，而是一些真正和自己有关、和彼此有关的内容。',
  audienceLabel: 'WHO IS THIS FOR',
  audienceTitle: '期待与你相聚',
  audienceIntro: '无论是否是校友，只要下面有一点像你，都欢迎来参与：',
  audienceItems: [
    '即将前往纽黑文生活',
    '想在上海认识校友或新朋友',
    '对 AI、创作、城市生活、跨学科合作感兴趣',
    '想和有好奇心又认真的人们坐下来聊聊',
  ],
  quote: '技术应当真正服务于人的尊严、自由与幸福。让我们一起探索，在一个人与 AI 共同塑造的新世界中，如何有态度地生活，有温度地连接，有创造力地共处。',
  registration: {
    eyebrow: 'Registration',
    title: '报名二维码',
    qrPlaceholderText: '1:1 Placeholder',
    qrInstruction: '扫描二维码或点击阅读原文进行报名',
  },
  locations: [
    '陆家嘴数智港 · 上海市浦东新区洋泾街道滨江大道257弄8号V6商墅',
  ],
}
