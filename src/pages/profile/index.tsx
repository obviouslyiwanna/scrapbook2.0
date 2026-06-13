import { useDidShow } from '@tarojs/taro'
import Taro from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import { useState } from 'react'
import { clearAllJournals, getJournalStats } from '@/utils/storage'
import type { JournalStats } from '@/types/journal'
import './index.scss'

export default function ProfilePage() {
  const [stats, setStats] = useState<JournalStats>({ total: 0, latestDate: '暂无记录' })
  useDidShow(() => setStats(getJournalStats()))
  const handleClear = () => Taro.showModal({ title: '确认清空？', content: '清空后本地手账无法恢复。', confirmColor: '#d45b5b' }).then(res => { if (res.confirm) { clearAllJournals(); setStats(getJournalStats()); Taro.showToast({ title: '已清空', icon: 'success' }) } })
  return <View className='container'><View className='profile-card'><Text className='avatar'>♡</Text><View><Text className='nickname'>手账小主人</Text><Text className='profile-desc'>认真生活，温柔记录</Text></View></View><View className='stats-card'><View><Text className='stat-num'>{stats.total}</Text><Text className='stat-label'>已写手账</Text></View><View><Text className='stat-num small'>{stats.latestDate}</Text><Text className='stat-label'>最近记录</Text></View></View><Button className='danger-button clear-button' onClick={handleClear}>清空所有本地数据</Button></View>
}
