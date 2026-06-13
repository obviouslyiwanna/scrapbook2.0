import type { JournalTemplate } from '@/types/journal'

export const JOURNAL_TEMPLATES: JournalTemplate[] = [
  { id: 'daily', name: '日常记录', description: '记录今天的小确幸与待办。', defaultTitle: '今天的日常', defaultContent: '今天发生了：\n\n让我开心的是：\n\n明天想做：' },
  { id: 'study', name: '学习复盘', description: '梳理学习成果和下一步计划。', defaultTitle: '学习复盘', defaultContent: '今天学习了：\n\n掌握得不错：\n\n还需要加强：\n\n下一步计划：' },
  { id: 'travel', name: '旅行日记', description: '收藏旅途中的风景与心情。', defaultTitle: '旅行日记', defaultContent: '目的地：\n\n今天看见的风景：\n\n难忘瞬间：\n\n旅行感受：' },
  { id: 'emotion', name: '情绪记录', description: '温柔观察自己的情绪变化。', defaultTitle: '情绪记录', defaultContent: '此刻的情绪：\n\n情绪来源：\n\n我可以怎样照顾自己：\n\n给自己的话：' }
]

export const getTemplateById = (id?: string) => JOURNAL_TEMPLATES.find(item => item.id === id)
