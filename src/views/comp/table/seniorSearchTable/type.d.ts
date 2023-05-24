export interface SearchColumnItem {
  label: string
  code: string
  type: string
  condition: string
  andOr?: string
  isDefault?: boolean
}

export interface SearchFormItem {
  code: string
  condition: string
  value: string | number
  type: string
  andOr?: string
}

export interface SchemeItem {
  title: string
  isDefault: boolean
  data: SearchFormItem
}
