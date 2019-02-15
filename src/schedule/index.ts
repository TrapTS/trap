import { CronJob } from 'cron'
import * as dir from 'dir_filenames'
import { resolve } from 'path'
import {
  CronSchedule,
  Schedule,
  ClassSchedule,
  EntitySchedule
} from '../typings'
import { Subcription } from '../typings/schedule'

const files: string[] = dir(resolve(__dirname, 'cronjob'))

export const schedule: Schedule = async () => {
  for await (let file of files) {
    const moduleObj = require(file)
    for (let info in moduleObj) {
      const SC: CronSchedule = moduleObj[info]
      if (SC.env) {
        const env: string | string[] = SC.env
        if (env.includes(process.env.NODE_ENV as string)) {
          const job: CronJob = new CronJob(
            SC.cron,
            SC.task,
            (): void => {},
            true,
            SC.timeZone
          )
          job.start()
        }
      } else {
        const job: CronJob = new CronJob(
          SC.cron,
          SC.task,
          (): void => {},
          true,
          SC.timeZone
        )
        job.start()
      }
    }
  }
}

const classfiles: string[] = dir(resolve(__dirname, 'classcronjob'))

export const classSchedule: ClassSchedule = async () => {
  for await (let file of classfiles) {
    const classes = require(file)
    for (let i in classes) {
      const subscription: Subcription = classes[i]
      const info: EntitySchedule = subscription.schedule()
      if (info.disable === true) {
        continue
      }
      if (info.env) {
        const env: string | string[] = info.env
        if (env.includes(process.env.NODE_ENV as string)) {
          const job: CronJob = new CronJob(
            info.cron,
            classes[i].prototype.subscribe,
            (): void => {},
            true,
            info.timeZone
          )
          job.start()
        }
      } else {
        const job: CronJob = new CronJob(
          info.cron,
          classes[i].prototype.subscribe,
          (): void => {},
          true,
          info.timeZone
        )
        job.start()
      }
    }
  }
}

export class Subscription {}
