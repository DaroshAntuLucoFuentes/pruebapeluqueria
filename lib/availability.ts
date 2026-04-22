import { getBusySlots } from './google'
import businessConfig from '@/config/business.json'
import type { BusySlot } from './types'

type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'

function getDayOfWeek(date: Date): DayOfWeek {
  const days: DayOfWeek[] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
  return days[date.getDay()]
}

function parseTime(timeStr: string): { hours: number; minutes: number } {
  const [hours, minutes] = timeStr.split(':').map(Number)
  return { hours, minutes }
}

function timeToMinutes(timeStr: string): number {
  const { hours, minutes } = parseTime(timeStr)
  return hours * 60 + minutes
}

function minutesToTime(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`
}

export function createDateTime(date: Date, timeStr: string): Date {
  const { hours, minutes } = parseTime(timeStr)
  const result = new Date(date)
  result.setHours(hours, minutes, 0, 0)
  return result
}

export function parseDateString(dateString: string): Date {
  const [year, month, day] = dateString.split('-').map(Number)
  return new Date(year, month - 1, day, 0, 0, 0, 0)
}

function isSlotAvailable(
  slotStart: Date,
  slotEnd: Date,
  busySlots: BusySlot[]
): boolean {
  for (const busy of busySlots) {
    const busyStart = new Date(busy.start)
    const busyEnd = new Date(busy.end)

    if (slotStart < busyEnd && slotEnd > busyStart) {
      return false
    }
  }
  return true
}

export interface GetAvailableSlotsParams {
  date: Date
  serviceDuration: number
}

export async function getAvailableSlots(
  params: GetAvailableSlotsParams
): Promise<string[]> {
  const { date, serviceDuration } = params

  const dayOfWeek = getDayOfWeek(date)
  const workingHours = businessConfig.workingHours[dayOfWeek as keyof typeof businessConfig.workingHours]

  if (!workingHours) {
    return []
  }

  const [startTime, endTime] = workingHours
  const startMinutes = timeToMinutes(startTime)
  const endMinutes = timeToMinutes(endTime)

  const dayStart = createDateTime(date, startTime)
  const dayEnd = createDateTime(date, endTime)

  let busySlots: BusySlot[] = []
  try {
    busySlots = await getBusySlots(dayStart, dayEnd)
  } catch (error) {
    console.error('Error obteniendo slots ocupados:', error)
    throw error
  }

  const availableSlots: string[] = []
  const slotInterval = businessConfig.slotInterval

  for (let currentMinutes = startMinutes; currentMinutes < endMinutes; currentMinutes += slotInterval) {
    const slotEndMinutes = currentMinutes + serviceDuration

    if (slotEndMinutes > endMinutes) {
      break
    }

    const slotStartTime = minutesToTime(currentMinutes)
    const slotStart = createDateTime(date, slotStartTime)
    const slotEnd = new Date(slotStart.getTime() + serviceDuration * 60000)

    if (isSlotAvailable(slotStart, slotEnd, busySlots)) {
      availableSlots.push(slotStartTime)
    }
  }

  return availableSlots
}

export interface ValidateSlotParams {
  date: Date
  time: string
  serviceDuration: number
}

export async function isSlotStillAvailable(
  params: ValidateSlotParams
): Promise<boolean> {
  const { date, time, serviceDuration } = params

  const dayOfWeek = getDayOfWeek(date)
  const workingHours = businessConfig.workingHours[dayOfWeek as keyof typeof businessConfig.workingHours]

  if (!workingHours) {
    return false
  }

  const slotStart = createDateTime(date, time)
  const slotEnd = new Date(slotStart.getTime() + serviceDuration * 60000)

  const [startTime, endTime] = workingHours
  const dayStart = createDateTime(date, startTime)
  const dayEnd = createDateTime(date, endTime)

  const busySlots = await getBusySlots(dayStart, dayEnd)

  return isSlotAvailable(slotStart, slotEnd, busySlots)
}

export function getWorkingHoursForDate(date: Date): [string, string] | null {
  const dayOfWeek = getDayOfWeek(date)
  const hours = businessConfig.workingHours[dayOfWeek as keyof typeof businessConfig.workingHours]
  return hours ? [hours[0], hours[1]] : null
}

export function isWorkingDay(date: Date): boolean {
  const dayOfWeek = getDayOfWeek(date)
  return !!businessConfig.workingHours[dayOfWeek as keyof typeof businessConfig.workingHours]
}

export function getServiceByName(serviceName: string) {
  return businessConfig.services.find(
    (service) => service.name.toLowerCase() === serviceName.toLowerCase()
  )
}

export function getAllServices() {
  return businessConfig.services
}
