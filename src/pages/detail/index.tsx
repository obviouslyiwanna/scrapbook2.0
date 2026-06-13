import { useLoad } from '@tarojs/taro'
import Taro from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import { useState } from 'react'
import EmptyState from '@/components/EmptyState'
import { deleteJournal, getJournalById } from '@/utils/storage'
import type { JournalEntry } from '@/types/journal'
import './index.scss'

export default function DetailPage() {
  const [entry, setEntry] = useState<JournalEntry | undefined>()
  useLoad((params: { id?: string }) => { if (params.id) setEntry(getJournalById(params.id)) })
  const handleDelete = () => { if (!entry) return; Taro.showModal({ title: '删除手账？', content: '删除后不可恢复。', confirmColor: '#d45b5b' }).then(res => { if (res.confirm) { deleteJournal(entry.id); Taro.navigateBack({ delta: 1 }) } }) }
  if (!entry) return <View className='container'><EmptyState title='没有找到这篇手账' description='它可能已经被删除啦。' /></View>
  return <View className='container'><View className='detail-card'><Text className='detail-title'>{entry.title}</Text><View className='meta-row'><Text>{entry.date}</Text><Text>{entry.mood}</Text></View><View className='tag-list'>{entry.tags.map(tag => <Text className='detail-tag' key={tag}>#{tag}</Text>)}</View><Text className='detail-content'>{entry.content || '没有正文内容。'}</Text></View><Button className='primary-button action-button' onClick={() => Taro.navigateTo({ url: `/pages/editor/index?id=${entry.id}` })}>编辑</Button><Button className='danger-button action-button' onClick={handleDelete}>删除</Button></View>
}
