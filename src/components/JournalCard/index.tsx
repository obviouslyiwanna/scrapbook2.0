import { View, Text } from '@tarojs/components'
import type { JournalEntry } from '@/types/journal'
import './index.scss'

interface Props { entry: JournalEntry; onClick: (id: string) => void }
export default function JournalCard({ entry, onClick }: Props) {
  const summary = entry.content.length > 58 ? `${entry.content.slice(0, 58)}...` : entry.content
  return <View className='journal-card' onClick={() => onClick(entry.id)}><View className='card-head'><Text className='card-title'>{entry.title || '未命名手账'}</Text><Text className='card-mood'>{entry.mood}</Text></View><Text className='card-date'>{entry.date}</Text><Text className='card-summary'>{summary || '今天还没有写正文。'}</Text><View className='card-tags'>{entry.tags.map(tag => <Text key={tag} className='card-tag'>#{tag}</Text>)}</View></View>
}
