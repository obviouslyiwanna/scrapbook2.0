import { View, Text } from '@tarojs/components'
import type { JournalTemplate } from '@/types/journal'
import './index.scss'

interface Props { template: JournalTemplate; onClick: (id: string) => void }
export default function TemplateCard({ template, onClick }: Props) {
  return <View className='template-card' onClick={() => onClick(template.id)}><Text className='template-name'>{template.name}</Text><Text className='template-desc'>{template.description}</Text></View>
}
