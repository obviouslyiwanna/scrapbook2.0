import Taro from '@tarojs/taro'
import type { JournalEntry, JournalStats } from '@/types/journal'

const STORAGE_KEY = 'journal_entries'

const sortByUpdatedAt = (list: JournalEntry[]) =>
  [...list].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())

export const getJournalList = (): JournalEntry[] => {
  const list = Taro.getStorageSync<JournalEntry[]>(STORAGE_KEY)
  return Array.isArray(list) ? sortByUpdatedAt(list) : []
}

export const getJournalById = (id: string): JournalEntry | undefined =>
  getJournalList().find(item => item.id === id)

export const saveJournal = (entry: JournalEntry): JournalEntry => {
  const list = getJournalList()
  const index = list.findIndex(item => item.id === entry.id)
  const nextList = index >= 0 ? list.map(item => (item.id === entry.id ? entry : item)) : [entry, ...list]
  Taro.setStorageSync(STORAGE_KEY, sortByUpdatedAt(nextList))
  return entry
}

export const deleteJournal = (id: string): void => {
  Taro.setStorageSync(STORAGE_KEY, getJournalList().filter(item => item.id !== id))
}

export const clearAllJournals = (): void => {
  Taro.removeStorageSync(STORAGE_KEY)
}

export const getJournalStats = (): JournalStats => {
  const list = getJournalList()
  return { total: list.length, latestDate: list[0]?.date || '暂无记录' }
}
