/**
 * Shared types for the Pages Function database backends.
 */

export interface Story {
  id?: number | string
  slug: string
  title: string
  summary: string
  body: string
  category: string
  tags: string[]
  hero: string
  caption: string
  author: string
  readTime: number
  publishedAt: string | null
  status: string
  createdAt: string
  updatedAt: string
}

export interface User {
  id: number | string
  username: string
  display_name: string
  role: string
  password_hash?: string
}

export interface PipelineLog {
  id: number | string
  story_id: number | string
  from_status: string | null
  to_status: string
  changed_by: string
  note: string
  created_at: string
}

export interface DbBackend {
  ensureSchema?(): Promise<void>

  listStories(params: {
    all?: boolean
    status?: string
    category?: string
    limit?: number
    offset?: number
  }): Promise<{ stories: Story[]; total: number }> | { stories: Story[]; total: number }

  getStory(slug: string): Promise<Story | null> | Story | null

  createStory(data: Partial<Story>): Promise<Story> | Story

  updateStory(slug: string, data: Partial<Story>): Promise<Story | null> | Story | null

  deleteStory(slug: string): Promise<boolean> | boolean

  getUser(username: string): Promise<User | null> | User | null

  createUser(user: Omit<User, 'id'>): Promise<User> | User

  getPipelineStats(): Promise<{ status: string; count: number }[]> | { status: string; count: number }[]

  createPipelineLog(
    storyId: number | string,
    from: string | null,
    to: string,
    by: string,
    note: string,
  ): Promise<PipelineLog> | PipelineLog

  getPipelineLogs(storySlug?: string): Promise<PipelineLog[]> | PipelineLog[]

  health(): Promise<{ stories: number }> | { stories: number }
}
