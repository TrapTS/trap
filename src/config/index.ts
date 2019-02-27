import * as development from './default.config'
import * as release from './release.config'
import * as prod from './prod.config'
import * as test from './test.config'
import { merge } from 'lodash'
import { Config } from '../typings'

const env: string = process.env.NODE_ENV || 'development'
const configs: Object = {
  development: development.config,
  production: prod.config,
  release: release.config,
  test: test.config
}

const defaultConfig: Object = {
  env: env,
  appRoot: process.env.PWD
}

export let config: Config
config = merge(defaultConfig, configs[env])
