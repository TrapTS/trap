import { CronJob } from 'cron'
import * as dir from 'dir_filenames'
import * as path from 'path'
import { CronSchedule } from '../typings/schedule'

const files: string[] = dir(path.resolve(__dirname, 'cronjob'))

export const schedule: Function = async () => {
  files.forEach(file => {
    const moduleObj = require(file)
    for (let info in moduleObj) {
      const SC: CronSchedule = moduleObj[info]
      if (SC.env) {
        const env: string | string[] = SC.env
        if (env.includes(process.env.NODE_ENV as string)) {
          const job = new CronJob(
            SC.cron,
            SC.task,
            (): void => {},
            true,
            SC.timeZone
          )
          job.start()
        }
      } else {
        const job = new CronJob(
          SC.cron,
          SC.task,
          (): void => {},
          true,
          SC.timeZone
        )
        job.start()
      }
    }
  })
}

const classfiles: string[] = dir(path.resolve(__dirname, 'classcronjob'))

export const classSchedule: Function = async () => {
  classfiles.map(async file => {
    const classes = require(file)
    for (let i in classes) {
      const info = classes[i].prototype.schedule()
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
  })
}

export class Subscription {}
