import { formateError } from './utils/utils'

export interface ErrorMessage {
  message: string
  stack: Array<{
    line: number
    column: number
    filename: string
  }>
}

export function parseError(err: Error): ErrorMessage {
  const errorHandlerInstance = new ErrorHandler(err)
  return errorHandlerInstance.reportError()
}

class ErrorHandler {
  errorMessage: string
  errorStack: string

  constructor(error: Error) {
    this.errorMessage = error.toString()
    this.errorStack = error.stack || ''
  }

  // 上报错误
  reportError(): ErrorMessage {
    console.log(this.jsonError())
    return this.jsonError()
  }

  // 序列化 Error 对象
  jsonError(): ErrorMessage {
    const errorMessage: string = this.errorMessage.split(':')[1]
    const errorStackArr: Array<string> = this.errorStack.split('\n')
    const errorStackInfo: any = errorStackArr
      .map(lineStr => {
        return formateError(lineStr)
      })
      .filter(Boolean)
      .shift()

    const errorJson: ErrorMessage = {
      message: errorMessage.trim(),
      stack: [
        {
          line: parseInt(errorStackInfo[3]),
          column: parseInt(errorStackInfo[4]),
          filename: errorStackInfo[2],
        },
      ],
    }
    return errorJson
  }
}
