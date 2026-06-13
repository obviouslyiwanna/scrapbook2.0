export interface JournalEntry {
  id: string
  title: string
  content: string
  date: string
  mood: string
  tags: string[]
  templateId?: string
  createdAt: string
  updatedAt: string
}

export interface JournalTemplate {
  id: string
  name: string
  description: string
  defaultTitle: string
  defaultContent: string
}

export interface JournalStats {
  total: number
  latestDate: string
}
