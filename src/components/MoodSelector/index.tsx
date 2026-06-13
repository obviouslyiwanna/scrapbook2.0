import { View, Text } from '@tarojs/components'
import './index.scss'

export const MOODS = ['开心', '平静', '难过', '焦虑', '期待']
interface Props { value: string; onChange: (mood: string) => void }
export default function MoodSelector({ value, onChange }: Props) {
  return <View className='selector-row'>{MOODS.map(mood => <Text key={mood} className={`pill ${value === mood ? 'active' : ''}`} onClick={() => onChange(mood)}>{mood}</Text>)}</View>
}
