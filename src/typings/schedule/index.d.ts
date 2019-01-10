export interface CronSchedule {
  cron: string
  env?: string | string[]
  timeZone: string
  task: Function
}
