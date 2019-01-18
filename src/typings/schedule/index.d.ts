export interface CronSchedule {
  cron: string
  env?: string | string[]
  timeZone: string
  task: () => void
}

export type Schedule = () => void
export type ClassSchedule = () => void

export interface EntitySchedule {
  disable?: boolean
  cron: string
  env: string | string[]
  timeZone: string
}

export class EntitySubcription {
  public static schedule(): EntitySchedule
  public subscribe(): void
}
