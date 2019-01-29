import { plainToClass, ClassTransformOptions } from 'class-transformer'
import {
  TransformValidationOptions,
  transformAndValidate
} from 'class-transformer-validator'

export abstract class BaseController {
  public deserialize(
    model,
    params,
    options?: ClassTransformOptions | undefined
  ) {
    return plainToClass(model, params, options)
  }
  public async validate(
    model,
    body,
    option?: TransformValidationOptions
  ): Promise<any> {
    try {
      await transformAndValidate(model, body, option)
    } catch (err) {
      const error: any = {}
      error.message = err[0].constraints
      error.status = 422
      error.stack = err[0].constraints
      throw error
    }
  }
}
