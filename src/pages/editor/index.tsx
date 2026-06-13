import { useLoad } from '@tarojs/taro'
import Taro from '@tarojs/taro'
import { View, Text, Input, Textarea, Button, Picker } from '@tarojs/components'
import { useState } from 'react'
import MoodSelector from '@/components/MoodSelector'
import TagSelector from '@/components/TagSelector'
import { getJournalById, saveJournal } from '@/utils/storage'
import { getTemplateById, JOURNAL_TEMPLATES } from '@/utils/templates'
import type { JournalEntry } from '@/types/journal'
import './index.scss'

interface EditorParams { id?: string; templateId?: string }
const today = () => new Date().toISOString().slice(0, 10)
const createId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

export default function EditorPage() {
  const [entryId, setEntryId] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [date, setDate] = useState(today())
  const [mood, setMood] = useState('开心')
  const [tags, setTags] = useState<string[]>([])
  const [templateId, setTemplateId] = useState<string | undefined>()

  useLoad((params: EditorParams) => {
    if (params.id) {
      const existing = getJournalById(params.id)
      if (existing) {
        setEntryId(existing.id); setTitle(existing.title); setContent(existing.content); setDate(existing.date); setMood(existing.mood); setTags(existing.tags); setTemplateId(existing.templateId)
      }
      return
    }
    const template = getTemplateById(params.templateId)
    if (template) { setTemplateId(template.id); setTitle(template.defaultTitle); setContent(template.defaultContent) }
  })

  const handleTemplateChange = (event: { detail: { value: string | number } }) => {
    const template = JOURNAL_TEMPLATES[Number(event.detail.value)]
    if (template) { setTemplateId(template.id); setTitle(template.defaultTitle); setContent(template.defaultContent) }
  }

  const handleSave = () => {
    if (!title.trim()) { Taro.showToast({ title: '请填写标题', icon: 'none' }); return }
    const now = new Date().toISOString()
    const oldEntry = entryId ? getJournalById(entryId) : undefined
    const nextEntry: JournalEntry = { id: entryId || createId(), title: title.trim(), content: content.trim(), date, mood, tags, templateId, createdAt: oldEntry?.createdAt || now, updatedAt: now }
    saveJournal(nextEntry)
    Taro.showToast({ title: '已保存', icon: 'success' }).then(() => setTimeout(() => Taro.navigateBack({ delta: 1 }), 500))
  }

  return <View className='container editor-page'><Text className='page-title'>{entryId ? '编辑手账' : '新建手账'}</Text><View className='form-card'><Text className='field-label'>标题</Text><Input className='field-input' value={title} placeholder='给今天起个标题' onInput={e => setTitle(e.detail.value)} /><Text className='field-label'>日期</Text><Picker mode='date' value={date} onChange={e => setDate(String(e.detail.value))}><View className='picker-box'>{date}</View></Picker><Text className='field-label'>心情</Text><MoodSelector value={mood} onChange={setMood} /><Text className='field-label'>标签</Text><TagSelector value={tags} onChange={setTags} /><Text className='field-label'>模板</Text><Picker mode='selector' range={JOURNAL_TEMPLATES.map(item => item.name)} onChange={handleTemplateChange}><View className='picker-box'>{getTemplateById(templateId)?.name || '选择一个模板（可选）'}</View></Picker><Text className='field-label'>正文</Text><Textarea className='content-input' value={content} placeholder='慢慢写下今天...' maxlength={2000} onInput={e => setContent(e.detail.value)} /></View><Button className='primary-button save-button' onClick={handleSave}>保存手账</Button></View>
}
