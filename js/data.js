const POSITIONS = [
    { id: 'intern', name: '实习生', salary: 0 },
    { id: 'P4', name: 'P4', salary: 6 },
    { id: 'P5', name: 'P5', salary: 15 },
    { id: 'P6', name: 'P6', salary: 30 },
    { id: 'P7', name: 'P7', salary: 50 },
    { id: 'P8', name: 'P8', salary: 80 },
    { id: 'P9', name: 'P9', salary: 150 },
    { id: 'P10', name: 'P10 VP', salary: 300 }
];

const COMPANIES = [
    { id: 'small', name: '小厂(50人)', bonus: 0.5 },
    { id: 'medium', name: '中厂(500人)', bonus: 1 },
    { id: 'big', name: '大厂(5万人)', bonus: 1.5 },
    { id: 'outsourcing', name: '外包', bonus: 0.3 },
    { id: 'state', name: '国企IT部', bonus: 0.8 },
    { id: 'startup', name: '创业公司(20人)', bonus: 2 }
];

const EDUCATIONS = [
    { id: 'erben', name: '二本', abilityBonus: 10, connectionBonus: 5 },
    { id: 'yiben', name: '双非一本', abilityBonus: 15, connectionBonus: 10 },
    { id: '211', name: '211', abilityBonus: 25, connectionBonus: 15 },
    { id: '985', name: '985', abilityBonus: 35, connectionBonus: 25 },
    { id: 'haigui', name: '海归', abilityBonus: 30, connectionBonus: 30 },
    { id: 'peixun', name: '培训班转码', abilityBonus: 15, connectionBonus: 5 }
];

const MAJORS = [
    { id: 'cs', name: '计算机', abilityBonus: 20 },
    { id: 'se', name: '软件工程', abilityBonus: 25 },
    { id: 'ee', name: '电子信息', abilityBonus: 15 },
    { id: 'bio', name: '生化环材转码', abilityBonus: 5, mindBonus: -5 },
    { id: 'arts', name: '文科转码', abilityBonus: 5, mindBonus: 5 }
];

const PERSONALITIES = [
    { id: 'juanwang', name: '卷王', abilityGain: 3, mindCost: 2, healthCost: 1 },
    { id: 'moyu', name: '摸鱼党', abilityGain: 0, mindGain: 2, healthGain: 1 },
    { id: 'shekong', name: '社恐', connectionCost: 1, mindGain: 1, abilityGain: 1 },
    { id: 'sheniu', name: '社牛', connectionGain: 2, abilityGain: 0, mindGain: 1 },
    { id: 'foxi', name: '佛系', mindGain: 3, abilityGain: -1, connectionGain: -1 },
    { id: 'fenqing', name: '愤青', mindCost: 1, connectionCost: 1, abilityGain: 2 },
    { id: 'fendoubi', name: '奋斗逼', abilityGain: 4, mindCost: 3, healthCost: 2 }
];

const QUARTERLY_DECISIONS = [
    {
        id: 'focus_work',
        text: '专注工作提升能力',
        effects: { ability: 8, mind: -5, health: -3, "996": 10 }
    },
    {
        id: 'networking',
        text: '主动社交拓展人脉',
        effects: { connection: 8, ability: -2, mind: 3 }
    },
    {
        id: 'rest',
        text: '注重休息保持健康',
        effects: { health: 10, mind: 5, ability: -3, "996": -10 }
    },
    {
        id: 'side_hustle',
        text: '发展副业增加收入',
        effects: { money: 5, ability: -2, health: -3 }
    },
    {
        id: 'study',
        text: '学习新技术',
        effects: { ability: 10, mind: -3, health: -2 }
    },
    {
        id: 'seek_promotion',
        text: '争取晋升机会',
        effects: { connection: 5, ability: 5, mind: -8, "996": 15 },
        risk: 0.3,
        riskEffect: { mind: -20 },
        riskText: '晋升失败，心态受挫'
    },
    {
        id: 'work_life_balance',
        text: '追求工作生活平衡',
        effects: { mind: 10, health: 5, connection: -3, "996": -15 }
    },
    {
        id: 'invest_stock',
        text: '投资股票基金',
        effects: { mind: -5 },
        risk: 0.4,
        riskEffect: { money: 30, mind: 10 },
        riskText: '投资成功！',
        successText: '投资略有收益'
    },
    {
        id: 'buy_house',
        text: '贷款买房',
        effects: { money: -50, mind: 15, health: 5 },
        condition: (stats) => stats.money >= 50
    },
    {
        id: 'mentor_young',
        text: '指导新人建立威望',
        effects: { connection: 6, ability: 3, mind: 5 }
    },
    {
        id: 'certification',
        text: '考取专业证书',
        effects: { ability: 12, mind: -8, health: -5, money: -3 }
    },
    {
        id: 'travel',
        text: '休假旅行放松',
        effects: { mind: 15, health: 8, ability: -5, money: -10 }
    },
    {
        id: 'volunteer',
        text: '参与公司志愿活动',
        effects: { connection: 6, mind: 8, ability: -2 }
    },
    {
        id: 'publish_article',
        text: '发表技术文章',
        effects: { ability: 5, connection: 8, mind: 5 }
    },
    {
        id: 'negotiate_raise',
        text: '主动谈薪',
        effects: { money: 15, connection: -5 },
        risk: 0.4,
        riskEffect: { mind: -15, connection: -10 },
        riskText: '谈薪失败，领导对你印象变差'
    }
];

const EVENTS = [
    {
        id: 'event_001',
        title: '需求第5次变更',
        description: '产品经理在群里发了最新版PRD，这已经是本周第5次变更了。他说："这次是真的最终版，我以产品经理的尊严担保！"',
        choices: [
            { text: '默默接受重写', effects: { ability: 3, mind: -15, health: -5, "996": 20 } },
            { text: '群里怼产品', effects: { mind: 10 }, risk: 0.5, riskEffect: { mind: -30, connection: -20 }, riskText: '你被产品记恨了，以后你的需求永远排最后' },
            { text: '要求写文档确认', effects: { mind: 0, ability: 2, connection: -5 } }
        ],
        triggerCondition: 'random',
        weight: 15
    },
    {
        id: 'event_002',
        title: 'P0线上故障',
        description: '凌晨3点，你被电话惊醒。生产环境出现严重BUG，所有用户都无法正常登录。领导要求你立刻到公司排查问题。',
        choices: [
            { text: '立刻奔赴战场', effects: { ability: 10, mind: -20, health: -15, "996": 30, money: 3 } },
            { text: '在家远程排查', effects: { ability: 5, mind: -10, health: -5 }, risk: 0.3, riskEffect: { mind: -20, ability: -5 }, riskText: '问题定位太慢，被领导批评' },
            { text: '假装没听到', effects: { mind: 5, health: 5 }, risk: 0.7, riskEffect: { mind: -40, connection: -30, ability: -10 }, riskText: '你被列入了"不可靠员工"名单' }
        ],
        triggerCondition: 'random',
        weight: 12
    },
    {
        id: 'event_003',
        title: '组织架构调整',
        description: '公司宣布进行新一轮组织架构调整，你的部门被拆分，你面临重新选择团队的局面。',
        choices: [
            { text: '加入核心业务线', effects: { ability: 5, mind: -10, "996": 15 } },
            { text: '选择边缘但稳定的团队', effects: { mind: 10, ability: -5, health: 5 } },
            { text: '主动要求外派', effects: { connection: 10, ability: 5, mind: -5 } }
        ],
        triggerCondition: year => year > 2,
        weight: 10
    },
    {
        id: 'event_004',
        title: '361绩效评估',
        description: '年底了，到了最紧张的绩效评估时刻。你的直属leader找你谈话，暗示今年部门名额紧张。',
        choices: [
            { text: '主动找领导汇报工作', effects: { connection: 5, mind: -5 }, risk: 0.4, riskEffect: { mind: -15 }, riskText: '领导觉得你太会来事' },
            { text: '默默等待结果', effects: { mind: -10 } },
            { text: '请领导吃饭', effects: { connection: 10, money: -5 }, risk: 0.3, riskEffect: { mind: -20, connection: -10 }, riskText: '被同事看到，影响不好' }
        ],
        triggerCondition: quarter => quarter === 4,
        weight: 20
    },
    {
        id: 'event_005',
        title: '996福报文化',
        description: '部门新来的主管宣布实行"弹性工作时间"，实际上就是鼓励大家自愿加班。',
        choices: [
            { text: '积极响应，每天最早到最晚走', effects: { ability: 5, mind: -20, health: -10, "996": 25 } },
            { text: '正常上下班', effects: { mind: 5, health: 5 }, risk: 0.4, riskEffect: { connection: -15, ability: -5 }, riskText: '主管对你印象变差' },
            { text: '假装加班，实际摸鱼', effects: { mind: -5, "996": 10 } }
        ],
        triggerCondition: 'random',
        weight: 10
    },
    {
        id: 'event_006',
        title: '脉脉爆料',
        description: '你在脉脉上看到一篇匿名帖子，内容直指你们部门的管理问题。同事们都在讨论，气氛很紧张。',
        choices: [
            { text: '参与讨论吐槽', effects: { mind: 10, connection: -10 }, risk: 0.3, riskEffect: { mind: -25, connection: -20 }, riskText: '被HR监控到，收到警告' },
            { text: '默默围观不发言', effects: { mind: 0 } },
            { text: '举报帖子', effects: { connection: 10, mind: -15 }, risk: 0.5, riskEffect: { mind: -30, connection: -15 }, riskText: '被同事孤立' }
        ],
        triggerCondition: 'random',
        weight: 8
    },
    {
        id: 'event_007',
        title: '期权上市',
        description: '公司终于上市了！你手里的期权一夜之间翻了好几倍。',
        choices: [
            { text: '全部抛售套现', effects: { money: 200, mind: 20 } },
            { text: '长期持有', effects: { mind: 10 }, risk: 0.5, riskEffect: { money: 500 }, riskText: '股价继续暴涨！', successText: '股价稳定增长，收益不错' },
            { text: '卖掉一半', effects: { money: 100, mind: 15 } }
        ],
        triggerCondition: (year, position) => year >= 5 && position !== 'intern',
        weight: 5
    },
    {
        id: 'event_008',
        title: '35岁危机',
        description: 'HR找你谈话，暗示公司正在进行"结构优化"，35岁以下的员工更有活力...',
        choices: [
            { text: '主动申请转岗', effects: { ability: 5, mind: -10, connection: -5 } },
            { text: '提升技能证明自己', effects: { ability: 10, mind: -15, health: -10 } },
            { text: '开始准备跳槽', effects: { connection: 10, mind: -5, money: -10 } }
        ],
        triggerCondition: (year, position, age) => age >= 35 && !['P7', 'P8', 'P9', 'P10'].includes(position),
        weight: 15
    },
    {
        id: 'event_009',
        title: '竞业协议',
        description: '公司要求所有技术人员签署竞业协议，限制离职后2年内不得加入竞争对手。',
        choices: [
            { text: '签署协议', effects: { money: 5, mind: -10 } },
            { text: '拒绝签署', effects: { mind: 10 }, risk: 0.6, riskEffect: { mind: -30, connection: -25 }, riskText: '被公司列入黑名单' },
            { text: '要求提高补偿', effects: { money: 15, mind: -5 }, risk: 0.4, riskEffect: { mind: -20 }, riskText: '领导觉得你不识抬举' }
        ],
        triggerCondition: 'random',
        weight: 8
    },
    {
        id: 'event_010',
        title: '副业起飞',
        description: '你业余时间做的开源项目突然火了，收到了大厂的offer邀请，或者有投资人想投资你的副业。',
        choices: [
            { text: '辞职创业', effects: { money: 50, ability: 10, mind: 20 }, risk: 0.6, riskEffect: { money: -50, mind: -30 }, riskText: '创业失败，积蓄归零' },
            { text: '兼职继续做', effects: { money: 20, mind: 10, health: -5 } },
            { text: '卖掉项目', effects: { money: 100, mind: 15 } }
        ],
        triggerCondition: year => year > 3,
        weight: 6
    },
    {
        id: 'event_011',
        title: '嫡系文化',
        description: '你的新领导带来了自己的团队，明显偏袒"自己人"。你感觉被边缘化了。',
        choices: [
            { text: '主动靠拢新领导', effects: { connection: 10, mind: -15 }, risk: 0.4, riskEffect: { mind: -25 }, riskText: '老同事觉得你背叛了' },
            { text: '专注做好自己的事', effects: { ability: 8, mind: -5 } },
            { text: '申请调去其他部门', effects: { connection: -5, mind: 5 } }
        ],
        triggerCondition: 'random',
        weight: 10
    },
    {
        id: 'event_012',
        title: 'OKR压力',
        description: '新季度OKR制定会议上，领导给你定了一个几乎不可能完成的目标。',
        choices: [
            { text: '接受挑战', effects: { ability: 10, mind: -20, health: -10, "996": 20 } },
            { text: '讨价还价', effects: { mind: 5, connection: -5 }, risk: 0.5, riskEffect: { mind: -20, connection: -15 }, riskText: '领导觉得你缺乏狼性' },
            { text: '表面接受，实际放水', effects: { mind: 5, ability: -5 }, risk: 0.4, riskEffect: { mind: -30, ability: -10 }, riskText: '绩效C' }
        ],
        triggerCondition: quarter => quarter === 1,
        weight: 12
    },
    {
        id: 'event_013',
        title: '毕业通知',
        description: '你收到了HR的邮件，被告知"毕业"了。公司会给N+1补偿。',
        choices: [
            { text: '体面离开', effects: { mind: 0, money: 20 } },
            { text: '要求N+3赔偿', effects: { money: 40, mind: -10 }, risk: 0.5, riskEffect: { mind: -30 }, riskText: '谈判失败，名声受损' },
            { text: '劳动仲裁', effects: { mind: -20, money: 50 }, risk: 0.4, riskEffect: { mind: -40, money: 10 }, riskText: '耗时耗力，赔偿打折' }
        ],
        triggerCondition: 'random',
        weight: 5
    },
    {
        id: 'event_014',
        title: '贵人相助',
        description: '一位资深技术大佬注意到了你的工作，主动提出要指导你。',
        choices: [
            { text: '虚心请教', effects: { ability: 15, connection: 10, mind: 5 } },
            { text: '保持距离', effects: { mind: 0 } },
            { text: '请大佬吃饭', effects: { connection: 15, money: -5, mind: 10 } }
        ],
        triggerCondition: (year, position, age, stats) => stats.connection > 60,
        weight: 8
    },
    {
        id: 'event_015',
        title: '健康警报',
        description: '体检报告显示你的身体状况亮起了红灯，医生建议你好好休息。',
        choices: [
            { text: '请长假调养', effects: { health: 25, mind: 15, ability: -10 } },
            { text: '继续工作', effects: { mind: -15, health: -10 }, risk: 0.3, riskEffect: { health: -30 }, riskText: '病情恶化' },
            { text: '调整作息', effects: { health: 10, mind: 5, "996": -15 } }
        ],
        triggerCondition: (year, position, age, stats) => stats.health < 30,
        weight: 10
    },
    {
        id: 'event_016',
        title: '跳槽机会',
        description: '猎头给你推荐了一个薪资翻倍的机会，但需要签竞业协议。',
        choices: [
            { text: '接受offer', effects: { money: 50, ability: 5, mind: 20 }, risk: 0.3, riskEffect: { mind: -30, money: -20 }, riskText: '原公司起诉你违反竞业协议' },
            { text: '拒绝', effects: { mind: -5 } },
            { text: '跟现公司谈加薪', effects: { money: 25, mind: 10 }, risk: 0.5, riskEffect: { mind: -20, connection: -10 }, riskText: '领导觉得你在威胁他' }
        ],
        triggerCondition: (year, position) => year > 2 && position !== 'intern',
        weight: 10
    },
    {
        id: 'event_017',
        title: '对齐与抓手',
        description: '领导在周会上大谈"对齐"、"抓手"、"闭环"、"赋能"等黑话，你完全听不懂他在说什么。',
        choices: [
            { text: '点头称是', effects: { connection: 5, mind: -10 } },
            { text: '当场提问', effects: { ability: 5, mind: 5 }, risk: 0.4, riskEffect: { mind: -20, connection: -10 }, riskText: '领导觉得你在挑战权威' },
            { text: '会后查资料学习', effects: { ability: 5, mind: 0 } }
        ],
        triggerCondition: 'random',
        weight: 12
    },
    {
        id: 'event_018',
        title: '技术选型之争',
        description: '团队在技术选型上产生分歧，一方坚持用新技术，一方主张稳定优先。',
        choices: [
            { text: '支持新技术', effects: { ability: 10, mind: -5 }, risk: 0.4, riskEffect: { mind: -20, ability: -5 }, riskText: '新技术坑太多，项目延期' },
            { text: '支持稳定方案', effects: { mind: 5, ability: -3 } },
            { text: '中立调和', effects: { connection: 10, mind: 5, ability: 0 } }
        ],
        triggerCondition: 'random',
        weight: 8
    },
    {
        id: 'event_019',
        title: '领导抢功劳',
        description: '你熬夜一周完成的项目，在汇报时被领导完全当成自己的成果。同事们都在看你的反应。',
        choices: [
            { text: '忍气吞声', effects: { mind: -15, connection: 5 } },
            { text: '正面刚', effects: { mind: 10 }, risk: 0.6, riskEffect: { mind: -30, connection: -20 }, riskText: '你被穿小鞋，被迫离职' },
            { text: '暗中留证据', effects: { mind: -5, connection: -5 }, secretEffect: { futureRevenge: true }, successText: '你保留了证据，静待时机' }
        ],
        triggerCondition: 'random',
        weight: 12
    },
    {
        id: 'event_020',
        title: '猎头挖角',
        description: '一家竞争对手的猎头联系你，开出30%涨薪的offer，但要求996工作制。',
        choices: [
            { text: '接受offer', effects: { money: 30, mind: 5, health: -15, "996": 20 } },
            { text: '拒绝', effects: { mind: -5 }, secretEffect: { loyalty: true }, successText: '领导听说后给你涨了薪' },
            { text: '先拿offer压价', effects: { money: 20, mind: 10 }, risk: 0.4, riskEffect: { mind: -15, connection: -10 }, riskText: '被领导发现，关系变僵' }
        ],
        triggerCondition: (year, position) => year > 2 && position !== 'intern',
        weight: 10
    },
    {
        id: 'event_021',
        title: '公司裁员',
        description: '公司宣布新一轮裁员计划，你收到消息自己在裁员名单边缘。',
        choices: [
            { text: '找关系保住工作', effects: { mind: 5, connection: -10 } },
            { text: '拿N+1走人', effects: { money: 25, mind: 10, health: 5 } },
            { text: '主动降薪留任', effects: { money: -10, mind: -5, ability: 10 } }
        ],
        triggerCondition: (year) => year > 3,
        weight: 8
    },
    {
        id: 'event_022',
        title: '孩子出生',
        description: '你的孩子出生了！家人希望你多花时间陪伴，但项目正处于关键期。',
        choices: [
            { text: '请陪产假', effects: { mind: 15, health: 5, ability: -10 }, secretEffect: { familyBond: true } },
            { text: '以工作为重', effects: { money: 10, mind: -20 }, secretEffect: { familyConflict: true } },
            { text: '远程办公兼顾', effects: { mind: 5, health: -5, ability: -5 } }
        ],
        triggerCondition: (year, position, age) => age >= 26 && year > 1,
        weight: 6
    },
    {
        id: 'event_023',
        title: '父母生病',
        description: '父母生病需要照顾，你面临工作和家庭的艰难抉择。',
        choices: [
            { text: '请假照顾', effects: { mind: 10, health: -5, ability: -15 }, secretEffect: { familyCare: true } },
            { text: '请护工', effects: { money: -15, mind: -5 }, secretEffect: { guilt: true } },
            { text: '周末回去看看', effects: { mind: -10, health: -3 }, secretEffect: { familyDistance: true } }
        ],
        triggerCondition: (year, position, age) => age >= 28,
        weight: 7
    },
    {
        id: 'event_024',
        title: '伴侣抱怨',
        description: '伴侣抱怨你工作太忙，缺少陪伴，甚至威胁要分手。',
        choices: [
            { text: '减少工作陪伴家人', effects: { mind: 15, "996": -20, ability: -8 }, secretEffect: { relationshipSaved: true } },
            { text: '送礼物哄一哄', effects: { money: -10, mind: 5 }, risk: 0.4, riskEffect: { mind: -20 }, riskText: '治标不治本，矛盾继续积累' },
            { text: '沟通调整工作节奏', effects: { mind: 10, connection: -5 }, secretEffect: { understanding: true } }
        ],
        triggerCondition: 'random',
        weight: 9
    },
    {
        id: 'event_025',
        title: '体检异常',
        description: '年度体检报告显示多项指标异常，医生强烈建议你减少工作压力，多休息。',
        choices: [
            { text: '无视继续肝', effects: { ability: 5, mind: -10, health: -15 }, risk: 0.15, riskEffect: { health: -50 }, riskText: '身体不堪重负，住院治疗' },
            { text: '请假调养', effects: { health: 20, mind: 10, ability: -10 }, secretEffect: { missedPromotion: true } },
            { text: '调整作息慢慢恢复', effects: { health: 10, mind: 5, "996": -10 } }
        ],
        triggerCondition: (year, position, age, stats) => stats.health < 60,
        weight: 10
    },
    {
        id: 'event_026',
        title: '前同事创业',
        description: '前同事创业成功，现在估值上亿，他邀请你加入成为核心成员。',
        choices: [
            { text: 'all in创业', effects: { ability: 15, mind: 20 }, risk: 0.5, riskEffect: { money: -50, mind: -30 }, riskText: '创业失败，积蓄受损', successEffect: { money: 200 } },
            { text: '兼职入股', effects: { money: -20, mind: 10, ability: 5 }, risk: 0.3, riskEffect: { money: -10 }, riskText: '创业失败，投资打水漂', successEffect: { money: 80 } },
            { text: '拒绝邀请', effects: { mind: -5 }, secretEffect: { stability: true } }
        ],
        triggerCondition: (year) => year > 3,
        weight: 6
    },
    {
        id: 'event_027',
        title: '办公室政治',
        description: '部门分成两派斗争，双方都想拉你入伙。',
        choices: [
            { text: '加入强势一派', effects: { connection: 10, mind: -10 }, risk: 0.5, riskEffect: { mind: -30, connection: -15 }, riskText: '站错队，被清算' },
            { text: '保持中立', effects: { mind: 5, connection: -10 }, secretEffect: { neutral: true } },
            { text: '两边讨好', effects: { connection: 5, mind: -15 }, risk: 0.6, riskEffect: { mind: -25, connection: -20 }, riskText: '两边都不讨好' }
        ],
        triggerCondition: 'random',
        weight: 8
    },
    {
        id: 'event_028',
        title: '项目奖金',
        description: '你负责的项目大获成功，公司发放丰厚奖金，但分配方式引发争议。',
        choices: [
            { text: '据理力争', effects: { money: 20, mind: 5 }, risk: 0.4, riskEffect: { mind: -15, connection: -10 }, riskText: '被领导认为斤斤计较' },
            { text: '默默接受', effects: { money: 10, mind: -5 } },
            { text: '主动让出', effects: { mind: 10, connection: 10, money: 5 } }
        ],
        triggerCondition: 'random',
        weight: 7
    },
    {
        id: 'event_029',
        title: '年会抽奖',
        description: '公司年会，你抽到了特等奖——海外豪华游！但需要在项目关键期请假。',
        choices: [
            { text: '果断去旅游', effects: { mind: 20, health: 15, ability: -15 }, secretEffect: { refreshed: true } },
            { text: '转让给同事', effects: { connection: 15, mind: 5 } },
            { text: '折现', effects: { money: 30, mind: -5 } }
        ],
        triggerCondition: quarter => quarter === 4,
        weight: 5
    },
    {
        id: 'event_030',
        title: '技术栈淘汰',
        description: '公司宣布全面升级技术栈，你熟悉的旧技术即将被淘汰。',
        choices: [
            { text: '快速学习新技术', effects: { ability: 15, mind: -10, health: -5 } },
            { text: '申请转岗', effects: { connection: 5, mind: 5, ability: -5 } },
            { text: '消极抵制', effects: { mind: 5 }, risk: 0.6, riskEffect: { ability: -15, connection: -10 }, riskText: '被列入淘汰名单' }
        ],
        triggerCondition: (year) => year % 3 === 0,
        weight: 9
    },
    {
        id: 'event_031',
        title: '突发疫情',
        description: '疫情爆发，公司要求全员居家办公。',
        choices: [
            { text: '高效远程办公', effects: { ability: 5, mind: 5, health: 5, "996": -5 } },
            { text: '摸鱼摆烂', effects: { mind: 10, health: 5, ability: -10 }, risk: 0.3, riskEffect: { mind: -20, ability: -10 }, riskText: '被领导发现，绩效受影响' },
            { text: '申请去公司', effects: { ability: 5, mind: -10, health: -10 }, secretEffect: { exposureRisk: true } }
        ],
        triggerCondition: (year) => year === 2 || year === 3,
        weight: 10
    },
    {
        id: 'event_032',
        title: '导师离职',
        description: '带你入行的导师突然离职，你失去了重要的职业指导。',
        choices: [
            { text: '请求继续保持联系', effects: { connection: 5, mind: 5 } },
            { text: '找新导师', effects: { connection: 5, ability: 5, mind: -5 } },
            { text: '自立自强', effects: { ability: 10, mind: -5 } }
        ],
        triggerCondition: 'random',
        weight: 7
    },
    {
        id: 'event_033',
        title: '产品上线失败',
        description: '你负责的产品上线后bug频发，用户大量流失，领导非常生气。',
        choices: [
            { text: '主动承担责任', effects: { mind: -15, connection: 5, ability: 5 } },
            { text: '找借口推脱', effects: { mind: -10 }, risk: 0.7, riskEffect: { mind: -25, connection: -15 }, riskText: '被领导看穿，失去信任' },
            { text: '连夜修复', effects: { ability: 10, mind: -20, health: -15, "996": 25 } }
        ],
        triggerCondition: 'random',
        weight: 8
    },
    {
        id: 'event_034',
        title: '股票解禁',
        description: '你手里的公司股票终于解禁，可以出售了。',
        choices: [
            { text: '全部卖出', effects: { money: 100, mind: 15 } },
            { text: '长期持有', effects: { mind: 5 }, risk: 0.5, riskEffect: { money: 200 }, riskText: '股价翻倍！', successText: '股价小幅上涨' },
            { text: '分批卖出', effects: { money: 50, mind: 10 } }
        ],
        triggerCondition: (year, position) => year >= 4 && position !== 'intern',
        weight: 5
    },
    {
        id: 'event_035',
        title: '性骚扰风波',
        description: '公司内部爆发性骚扰丑闻，你被要求参与调查。',
        choices: [
            { text: '如实作证', effects: { mind: -10, connection: -5 }, secretEffect: { integrity: true } },
            { text: '保持沉默', effects: { mind: -5 }, risk: 0.4, riskEffect: { mind: -20 }, riskText: '被牵连调查' },
            { text: '主动回避', effects: { mind: 0, connection: -10 } }
        ],
        triggerCondition: 'random',
        weight: 5
    },
    {
        id: 'event_036',
        title: '行业寒冬',
        description: '互联网行业进入寒冬，多家公司裁员，人心惶惶。',
        choices: [
            { text: '疯狂内卷保工作', effects: { ability: 10, mind: -20, health: -15, "996": 25 } },
            { text: '观望等待', effects: { mind: -10 } },
            { text: '提前找下家', effects: { connection: 10, mind: 5, ability: -5 } }
        ],
        triggerCondition: (year) => year >= 5,
        weight: 10
    }
];

const ENDINGS = [
    {
        id: 'ending_freedom',
        name: '财务自由',
        description: '你成功实现了财务自由，提前退休，过上了自己想要的生活。',
        condition: (stats, maxPosition) => stats.money >= 3000,
        icon: '💰'
    },
    {
        id: 'ending_executive',
        name: '大厂高管',
        description: '你一路攀升，最终成为了大厂高管，年薪百万，风光无限。',
        condition: (stats, maxPosition) => ['P9', 'P10'].includes(maxPosition) && stats.health > 50,
        icon: '👔'
    },
    {
        id: 'ending_unemployed',
        name: '中年失业',
        description: '35岁被裁，存款不足，房贷压力巨大，你陷入了深深的焦虑...',
        condition: (stats, maxPosition, age) => age >= 35 && stats.money < 200 && stats.ability < 50,
        icon: '💼'
    },
    {
        id: 'ending_death',
        name: '猝死工位',
        description: '长期的996和高压工作终于压垮了你...',
        condition: (stats, maxPosition) => stats.health <= 0,
        icon: '⚰️'
    },
    {
        id: 'ending_gongwuyuan',
        name: '上岸成功',
        description: '你厌倦了职场的尔虞我诈，成功考上公务员，过上了稳定的生活。',
        condition: (stats, maxPosition, age, decisions) => stats.mind > 80 && age < 35 && decisions.filter(d => d === 'rest').length >= 5,
        icon: '📋'
    },
    {
        id: 'ending_waimai',
        name: '外卖骑手',
        description: '失业后存款耗尽，为了生计，你成为了一名外卖骑手。',
        condition: (stats, maxPosition, age) => stats.money < 10 && age > 35 && stats.ability < 40,
        icon: '🛵'
    },
    {
        id: 'ending_startup_success',
        name: '创业成功',
        description: '你抓住机会创业，最终公司上市，你成为了新的独角兽创始人。',
        condition: (stats, maxPosition, age) => stats.money >= 1500 && stats.ability > 70 && stats.connection > 60,
        icon: '🚀'
    },
    {
        id: 'ending_startup_fail',
        name: '创业失败',
        description: '你辞去工作创业，但最终失败，积蓄归零，一切从头再来。',
        condition: (stats, maxPosition, age) => stats.money < 50 && stats.ability > 60 && age > 30,
        icon: '💸'
    },
    {
        id: 'ending_influencer',
        name: '技术网红',
        description: '你在技术社区持续输出优质内容，成为了知名的技术博主，副业收入远超主业。',
        condition: (stats, maxPosition, age, decisions) => decisions.filter(d => d === 'side_hustle').length >= 8 && stats.connection > 80,
        icon: '📱'
    },
    {
        id: 'ending_retire',
        name: '提前退休',
        description: '40岁那年，你带着千万存款和健康的身体，提前退休享受生活。',
        condition: (stats, maxPosition, age) => age >= 40 && stats.money > 1000 && stats.health > 80,
        icon: '🏖️'
    },
    {
        id: 'ending_depression',
        name: '抑郁症',
        description: '长期的职场压力和心态低落，你患上了抑郁症，不得不长期休养。',
        condition: (stats, maxPosition, age, decisions, mindHistory) => mindHistory.filter(m => m <= 10).length >= 8,
        icon: '😔'
    },
    {
        id: 'ending_normal',
        name: '平凡一生',
        description: '你在大厂勤勤恳恳工作了30年，最终以P6/P7的身份退休，平淡但安稳。',
        condition: () => true,
        icon: '👴'
    }
];

function generateInitialStats(education, major, personality, company) {
    const edu = EDUCATIONS.find(e => e.id === education);
    const maj = MAJORS.find(m => m.id === major);
    const pers = PERSONALITIES.find(p => p.id === personality);
    const comp = COMPANIES.find(c => c.id === company);
    
    const baseAbility = 30 + (edu?.abilityBonus || 0) + (maj?.abilityBonus || 0);
    const baseMind = 70 + (maj?.mindBonus || 0);
    const baseConnection = 20 + (edu?.connectionBonus || 0);
    const baseHealth = 80;
    const baseMoney = comp?.id === 'big' ? 10 : 5;
    
    return {
        ability: Math.min(100, Math.max(0, baseAbility + Math.floor(Math.random() * 10) - 5)),
        mind: Math.min(100, Math.max(0, baseMind + Math.floor(Math.random() * 10) - 5)),
        connection: Math.min(100, Math.max(0, baseConnection + Math.floor(Math.random() * 10) - 5)),
        health: Math.min(100, Math.max(0, baseHealth + Math.floor(Math.random() * 10) - 5)),
        money: baseMoney + Math.floor(Math.random() * 5),
        "996": 10 + Math.floor(Math.random() * 10)
    };
}