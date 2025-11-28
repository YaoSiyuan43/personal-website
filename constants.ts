
import { Experience, GalleryPhoto, PersonalInfo, WebProject } from './types';

export const PERSONAL_INFO: Record<string, PersonalInfo> = {
  zh: {
    name: "姚思源",
    title: "AI产品经理练习生",
    subtitle: "探索 · 韧性 · 自驱", 
    email: "3071439401@qq.com",
    xhs: "yuanyuan430"
  },
  en: {
    name: "Yao Siyuan",
    title: "AI Product Manager Trainee",
    subtitle: "Exploration · Resilience · Agency",
    email: "3071439401@qq.com",
    xhs: "yuanyuan430"
  }
};

export const EXPERIENCES: Experience[] = [
  {
    type: "education",
    period: "2022.09 – 2026.07",
    role: { zh: "金融学 本科", en: "B.S. in Finance" },
    company: { zh: "对外经济贸易大学 (UIBE)", en: "University of International Business and Economics" },
    shortDesc: { 
        zh: [
          "数学建模国赛北京二等奖",
          "“挑战杯”北京二等奖",
          "北京大学生跳绳比赛交互跳绳第一名"
        ], 
        en: [
          "CUMCM Beijing Second Prize",
          "Challenge Cup Beijing Second Prize",
          "1st Place in Beijing University Interactive Jump Rope Competition"
        ] 
    }
  },
  {
    type: "work",
    period: "2025.04 – 2025.10",
    role: { zh: "NOMI AI产品经理 (实习)", en: "NOMI AI Product Manager Intern" },
    company: { zh: "蔚来汽车 | NIO", en: "NIO Inc." },
    shortDesc: {
        zh: [
          "担任NOMI AI产品经理，主导“生日记忆”功能从PRD到上线",
          "调优复杂Prompt实现个性化祝福，提升用户体验",
          "负责核心场景Prompt优化，实现结构化输出并显著降本",
          "独立搭建AI资讯自动化工作流，提升信息筛选效率"
        ],
        en: [
          "Led 'Birthday Memory' feature from PRD to launch as NOMI AI PM",
          "Tuned complex prompts for personalized blessings and UX improvement",
          "Optimized core scenario prompts for structured output and cost reduction",
          "Built automated AI news workflows to boost information filtering efficiency"
        ]
    }
  },
  {
    type: "work",
    period: "2024.02 – 2024.05",
    role: { zh: "行研实习生 (大消费行业)", en: "Industry Research Intern (Consumer Sector)" },
    company: { zh: "华泰证券研究所", en: "Huatai Securities Research Institute" },
    shortDesc: {
        zh: [
          "深度参与全球OTA龙头Booking、“她经济”及小红书商业化等深度报告撰写",
          "进行基本面分析与商业模式拆解"
        ],
        en: [
          "Co-authored reports on global OTA leaders, 'She Economy', and Xiaohongshu commercialization",
          "Conducted fundamental analysis and business model deconstruction"
        ]
    }
  }
];

export const WEB_PROJECTS: WebProject[] = [
  { 
    id: 1, 
    title: "表情包自由", 
    category: "AI Web Application", 
    background: "洞察到IP表情包热梗（如“高雅人士企鹅”）具有极高传播性，但传统二创门槛高、链路长。独立设计并开发一个基于IP的AI表情包制作网站，旨在赋能用户快速创作和传播。", 
    outputs: ["小红书点赞收藏7天过万"],
    features: [
        "AI风格保持：允许用户选择/上传IP形象，通过文本描述修改表情，同时AI模型能锁定并复现原图的模糊、像素化等独特风格特征。",
        "AI文案助手：AI提供热门文案灵感，降低用户创作决策成本。",
        "极简工作流：实现“选择IP →自由修改→添加文字 →即时下载”的快速创作体验，简化传统二创链路80%。"
    ],
    images: [
        "https://i.postimg.cc/Nf1JWK6H/ping-mu-jie-tu-2025-11-27-232828.png",
        "https://i.postimg.cc/m2xpXYH1/ping-mu-jie-tu-2025-11-27-233015.png"
    ]
  },
  { 
    id: 2, 
    title: "罗盘选品", 
    category: "小程序 / Mini Program", 
    background: "通过创业经历和深度访谈，发现跨境独立站卖家需求，确立“数据+AI”驱动的选品决策工具定位。", 
    outputs: ["小程序成功上线（目前未维护）"],
    features: [
        "信息层：建立每日更新的跨境电商资讯聚合引擎；实现独立站竞品网站精准搜索整合和智能总结。",
        "分析层：构建选品顾问智能体，通过prompt调优和引入跨境电商知识库RAG，提高回答准确性。",
        "决策层：整合Google Trends API实现商品搜索热度可视化，加入AI时间节点和趋势定量分析。"
    ],
    images: [
        "https://i.postimg.cc/PJDgrdw3/image.png",
        "https://i.postimg.cc/CMfT4sQY/1.png",
        "https://i.postimg.cc/L5Pc6m1w/2.jpg",
        "https://i.postimg.cc/Pf8sMQRH/3.png",
        "https://i.postimg.cc/3xNZgntc/4.jpg",
        "https://i.postimg.cc/Y0F5qtWd/5.png",
        "https://i.postimg.cc/FzSMshLC/6.png"
    ]
  },
  { 
    id: 3, 
    title: "末日净魂草饲养指南", 
    category: "小说 / Novel", 
    background: "在精神枯竭的末日废土中，一株化为人形的“净魂草”苏醒，凭借“吃”的本能寻找曾经的饲养员。一段关于呆萌异种少女与铁血人类指挥官之间，跨越十年的寻找、守护与救赎的故事。",
    features: [
        "反差萌： 恐怖的末日背景 vs. 轻松的吃货日常。",
        "极致双标： 男主对世界的冰冷 vs. 对女主的独宠。"
    ],
    // Link triggers internal reader
    link: "#", 
    images: [
        "https://i.postimg.cc/yYFcV9rd/jing-hun-cao.png"
    ]
  }
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  { id: 1, src: "https://images.unsplash.com/photo-1763992743997-bc7b8b3f0f57?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MXx8fGVufDB8fHx8fA%3D%3D", title: "Sichuan" },
  { id: 2, src: "https://images.unsplash.com/photo-1763992743675-c2b759eb2021?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NXx8fGVufDB8fHx8fA%3D%3D", title: "Sichuan" },
  { id: 3, src: "https://images.unsplash.com/photo-1763992744524-fe61998eb36e?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8OXx8fGVufDB8fHx8fA%3D%3D", title: "Beijing" },
  { id: 4, src: "https://images.unsplash.com/photo-1763992743774-70779c5a8fc4?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8M3x8fGVufDB8fHx8fA%3D%3D", title: "Beijing" },
  { id: 5, src: "https://images.unsplash.com/photo-1763992744492-c88377fed4cb?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NHx8fGVufDB8fHx8fA%3D%3D", title: "Beijing" },
  { id: 6, src: "https://images.unsplash.com/photo-1763992744037-94a3d4b06908?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8OHx8fGVufDB8fHx8fA%3D%3D", title: "Xinjiang" },
  { id: 7, src: "https://images.unsplash.com/photo-1763992743869-b2f4e2745e6f?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8N3x8fGVufDB8fHx8fA%3D%3D", title: "Beijing" },
  { id: 8, src: "https://images.unsplash.com/photo-1763992743733-3eb0b7a052e1?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MTB8fHxlbnwwfHx8fHw%3D", title: "Beijing" },
  { id: 9, src: "https://images.unsplash.com/photo-1763992743727-1f13d8ec7cb5?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8Mnx8fGVufDB8fHx8fA%3D%3D", title: "Sichuan" }
];
