// User Types
export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  plan: 'free' | 'pro' | 'enterprise'
  createdAt: Date
  updatedAt: Date
}

// Project Types
export interface Project {
  id: string
  name: string
  type: 'image' | 'video'
  thumbnail?: string
  userId: string
  collaborators: string[]
  settings: ProjectSettings
  createdAt: Date
  updatedAt: Date
}

export interface ProjectSettings {
  width: number
  height: number
  fps?: number
  duration?: number
  backgroundColor: string
  quality: 'low' | 'medium' | 'high' | 'ultra'
}

// Layer Types
export interface Layer {
  id: string
  name: string
  type: 'image' | 'video' | 'text' | 'shape' | 'audio'
  visible: boolean
  locked: boolean
  opacity: number
  blendMode: BlendMode
  transform: Transform
  content: LayerContent
  effects: Effect[]
  createdAt: Date
  updatedAt: Date
}

export interface Transform {
  x: number
  y: number
  width: number
  height: number
  rotation: number
  scaleX: number
  scaleY: number
  skewX: number
  skewY: number
}

export interface LayerContent {
  url?: string
  text?: string
  font?: string
  fontSize?: number
  color?: string
  backgroundColor?: string
  shape?: 'rectangle' | 'circle' | 'triangle' | 'star'
  audioUrl?: string
  volume?: number
}

// Effect Types
export interface Effect {
  id: string
  type: EffectType
  name: string
  enabled: boolean
  parameters: Record<string, any>
}

export type EffectType = 
  | 'brightness'
  | 'contrast'
  | 'saturation'
  | 'hue'
  | 'blur'
  | 'sharpen'
  | 'noise'
  | 'vintage'
  | 'blackAndWhite'
  | 'sepia'
  | 'glitch'
  | 'vhs'
  | 'sparkle'
  | 'bokeh'
  | 'lensFlare'

// Blend Mode Types
export type BlendMode = 
  | 'normal'
  | 'multiply'
  | 'screen'
  | 'overlay'
  | 'softLight'
  | 'hardLight'
  | 'colorDodge'
  | 'colorBurn'
  | 'darken'
  | 'lighten'
  | 'difference'
  | 'exclusion'
  | 'hue'
  | 'saturation'
  | 'color'
  | 'luminosity'

// Tool Types
export interface Tool {
  id: string
  name: string
  icon: string
  category: ToolCategory
  enabled: boolean
  shortcut?: string
}

export type ToolCategory = 
  | 'select'
  | 'transform'
  | 'draw'
  | 'text'
  | 'effects'
  | 'ai'
  | 'video'
  | 'audio'

// Timeline Types
export interface TimelineTrack {
  id: string
  name: string
  type: 'video' | 'audio' | 'text' | 'effect'
  clips: TimelineClip[]
  visible: boolean
  locked: boolean
  volume: number
}

export interface TimelineClip {
  id: string
  layerId: string
  startTime: number
  endTime: number
  duration: number
  offset: number
  speed: number
  effects: Effect[]
}

// Export Types
export interface ExportSettings {
  format: 'jpg' | 'png' | 'webp' | 'mp4' | 'webm' | 'gif'
  quality: number
  width: number
  height: number
  fps?: number
  bitrate?: number
  codec?: string
  includeAudio: boolean
  watermark?: string
}

// AI Feature Types
export interface AIFeature {
  id: string
  name: string
  description: string
  type: 'background-removal' | 'enhancement' | 'style-transfer' | 'object-removal' | 'face-retouch'
  enabled: boolean
  premium: boolean
  parameters: Record<string, any>
}

// Filter Types
export interface Filter {
  id: string
  name: string
  category: FilterCategory
  thumbnail: string
  parameters: Record<string, any>
  premium: boolean
}

export type FilterCategory = 
  | 'vintage'
  | 'modern'
  | 'artistic'
  | 'dramatic'
  | 'warm'
  | 'cool'
  | 'blackAndWhite'
  | 'colorful'

// Template Types
export interface Template {
  id: string
  name: string
  category: TemplateCategory
  thumbnail: string
  dimensions: { width: number; height: number }
  layers: Layer[]
  premium: boolean
  tags: string[]
}

export type TemplateCategory = 
  | 'social-media'
  | 'presentation'
  | 'marketing'
  | 'personal'
  | 'business'
  | 'creative'

// Collaboration Types
export interface CollaborationSession {
  id: string
  projectId: string
  participants: CollaborationParticipant[]
  createdAt: Date
  updatedAt: Date
}

export interface CollaborationParticipant {
  userId: string
  name: string
  avatar?: string
  role: 'owner' | 'editor' | 'viewer'
  cursor?: { x: number; y: number }
  lastActive: Date
}

// Notification Types
export interface Notification {
  id: string
  userId: string
  type: NotificationType
  title: string
  message: string
  read: boolean
  data?: Record<string, any>
  createdAt: Date
}

export type NotificationType = 
  | 'project-shared'
  | 'collaboration-invite'
  | 'export-complete'
  | 'ai-processing-complete'
  | 'system-update'
  | 'premium-feature'

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// File Upload Types
export interface UploadProgress {
  fileId: string
  fileName: string
  progress: number
  status: 'uploading' | 'processing' | 'complete' | 'error'
  error?: string
}

// Settings Types
export interface UserSettings {
  theme: 'light' | 'dark' | 'auto'
  language: string
  autoSave: boolean
  autoSaveInterval: number
  defaultExportQuality: number
  defaultExportFormat: string
  keyboardShortcuts: Record<string, string>
  notifications: {
    email: boolean
    push: boolean
    desktop: boolean
  }
}

// Analytics Types
export interface AnalyticsEvent {
  event: string
  properties: Record<string, any>
  userId?: string
  timestamp: Date
}

// Payment Types
export interface Subscription {
  id: string
  userId: string
  plan: 'free' | 'pro' | 'enterprise'
  status: 'active' | 'canceled' | 'past_due'
  currentPeriodStart: Date
  currentPeriodEnd: Date
  cancelAtPeriodEnd: boolean
}

// Error Types
export interface AppError {
  code: string
  message: string
  details?: Record<string, any>
  timestamp: Date
}