import { View, Text } from '@tarojs/components'
import './index.scss'

interface EmptyStateProps { title?: string; description?: string }

export default function EmptyState({ title = '还没有手账', description = '写下今天的心情与闪光瞬间吧。' }: EmptyStateProps) {
  return <View className='empty-state'><Text className='empty-emoji'>🌷</Text><Text className='empty-title'>{title}</Text><Text className='empty-desc'>{description}</Text></View>
}
