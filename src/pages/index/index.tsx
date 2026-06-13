import { useDidShow } from '@tarojs/taro'
import Taro from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import { useState } from 'react'
import JournalCard from '@/components/JournalCard'
import EmptyState from '@/components/EmptyState'
import { getJournalList } from '@/utils/storage'
import type { JournalEntry } from '@/types/journal'
import './index.scss'

export default function IndexPage() {
  const [journals, setJournals] = useState<JournalEntry[]>([])
  useDidShow(() => setJournals(getJournalList()))
  return <View className='container'><Text className='page-title'>我的手账</Text><Text className='page-subtitle'>把平凡日子写成温柔故事</Text>{journals.length === 0 ? <EmptyState /> : journals.map(entry => <JournalCard key={entry.id} entry={entry} onClick={id => Taro.navigateTo({ url: `/pages/detail/index?id=${id}` })} />)}<Button className='new-button primary-button' onClick={() => Taro.navigateTo({ url: '/pages/editor/index' })}>新建手账</Button></View>
}
