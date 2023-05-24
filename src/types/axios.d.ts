export interface Result<T = any> {
  code: number
  message: string
  result: T
}
