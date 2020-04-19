export interface ErrorMessage {
  message: string
  // tslint:disable-next-line: array-type
  stack: Array<{
    line: number
    column: number
    filename: string
  }>
}