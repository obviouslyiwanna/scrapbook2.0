import { View, Text } from '@tarojs/components'
import './index.scss'

export const TAGS = ['学习', '生活', '旅行', '饮食', '灵感']
interface Props { value: string[]; onChange: (tags: string[]) => void }
export default function TagSelector({ value, onChange }: Props) {
  const toggle = (tag: string) => onChange(value.includes(tag) ? value.filter(item => item !== tag) : [...value, tag])
  return <View className='tag-row'>{TAGS.map(tag => <Text key={tag} className={`tag-pill ${value.includes(tag) ? 'active' : ''}`} onClick={() => toggle(tag)}>#{tag}</Text>)}</View>
}
