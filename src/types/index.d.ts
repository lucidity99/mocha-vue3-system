export interface SelectOptionItem {
  value: string
  label: string
}

export interface UserInfo {
  userid: number
  username: string
  password?: string
  role?: string
  permiss?: []
  routes?: []
}
