import { EntitySubcription } from '../../typings/schedule'

export class TestSchedule implements EntitySubcription {
  public static schedule() {
    return {
      disable: false,
      cron: '1 * * * * *',
      env: 'development',
      timeZone: 'Asia/Shanghai'
    }
  }
  async subscribe(): Promise<void> {
    console.log('Hello World')
  }
}
