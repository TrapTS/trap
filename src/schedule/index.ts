import { CronJob } from 'cron'
import * as dir from 'dir_filenames'
import * as _ from 'lodash'
import { CronSchedule } from '../typings/schedule';

const files: string[] = dir(`${process.env.PWD}/src/schedule/cron`)

export const schedule: Function = async () => {
  files.forEach(file => {
    const moduleObj = require(file)
    for (let info in moduleObj) {
      const SC: CronSchedule = moduleObj[info]
      if (SC.env) {
        const env: string | string[] = SC.env
        if (env.includes(process.env.NODE_ENV as string)) {
          const job = new CronJob(SC.cron, SC.task, null, true, SC.timeZone)
          job.start()
        }
      } else {
        const job = new CronJob(SC.cron, SC.task, null, true, SC.timeZone)
        job.start()
      }
    }
  })
}
