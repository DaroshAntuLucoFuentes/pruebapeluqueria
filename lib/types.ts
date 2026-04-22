export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginationParams {
  page: number
  limit: number
}

export interface PaginatedResponse<T> extends ApiResponse<T> {
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface BusySlot {
  start: string
  end: string
}

export interface CalendarEventData {
  summary: string
  description?: string
  start: Date
  end: Date
  attendeeEmail?: string
  attendeeName?: string
}

export interface Service {
  name: string
  duration: number
}

export interface WorkingHours {
  monday?: [string, string]
  tuesday?: [string, string]
  wednesday?: [string, string]
  thursday?: [string, string]
  friday?: [string, string]
  saturday?: [string, string]
  sunday?: [string, string]
}

export interface BusinessConfig {
  name: string
  calendarId: string
  timezone: string
  workingHours: WorkingHours
  services: Service[]
  slotInterval: number
}
