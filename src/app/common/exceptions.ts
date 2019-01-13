export class Exception extends Error {
  public name: string
  public code: number

  constructor(message: string, code: number) {
    super(message)

    Object.setPrototypeOf(this, Exception.prototype)
    Error.captureStackTrace(this, this.constructor)

    this.name = this.constructor.name
    this.code = Number(code)
  }

  public getMessage(): string {
    return this.message
  }

  public getCode(): number {
    return this.code
  }

  public getStackTrace(): any {
    return this.stack
  }
}

export class NotImplementedException extends Exception {
  constructor(message: string) {
    super(message, 501)
  }
}

export class DataValidationException extends Exception {
  constructor(message: string) {
    super(message, 400)
  }
}

export class NotFoundException extends Exception {
  constructor(message: string) {
    super(message, 404)
  }
}

export class NotAuthorizedException extends Exception {
  constructor(message: string) {
    super(message, 401)
  }
}

export class RestrictedAccessException extends Exception {
  constructor(message: string) {
    super(message, 403)
  }
}

export class RuntimeException extends Exception {
  constructor(message: string) {
    super(message, 500)
  }
}

export class ApiErrorException extends Exception {
  constructor(message: string, code: number) {
    super(message, code)
  }
}
