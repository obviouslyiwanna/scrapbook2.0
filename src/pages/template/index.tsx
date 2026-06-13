import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import TemplateCard from '@/components/TemplateCard'
import { JOURNAL_TEMPLATES } from '@/utils/templates'
import './index.scss'

export default function TemplatePage() {
  return <View className='container'><Text className='page-title'>手账模板</Text><Text className='page-subtitle'>选择一个模板，快速开始记录</Text>{JOURNAL_TEMPLATES.map(item => <TemplateCard key={item.id} template={item} onClick={id => Taro.navigateTo({ url: `/pages/editor/index?templateId=${id}` })} />)}</View>
}
