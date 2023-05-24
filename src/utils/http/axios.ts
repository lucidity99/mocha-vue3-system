import axios, { AxiosInstance, AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios'
import { errorHandler, errorMsgHandler } from './errorHandler'

import qs from 'qs'

declare module 'axios' {
  export interface AxiosRequestConfig {
    isReturnNativeData?: boolean
    errorMode?: string
    repeatRequest?: boolean
  }
}

let pendingMap = new Map()

function getRequestKey(config: AxiosRequestConfig) {
  return (config.method || '') + config.url + '?' + qs.stringify(config?.data)
}

function setPendingMap(config: AxiosRequestConfig) {
  const controller = new AbortController()
  config.signal = controller.signal
  const key = getRequestKey(config)
  if (pendingMap.has(key)) {
    pendingMap.get(key).abort()
    pendingMap.delete(key)
  } else {
    pendingMap.set(key, controller)
  }
}

const service: AxiosInstance = axios.create({
  timeout: 1000 * 30,
  baseURL: import.meta.env.VITE_BASE_URL
})

service.interceptors.request.use(
  (config) => {
    if (!config.repeatRequest) {
      setPendingMap(config)
    }
    return config
  },
  (error: AxiosError) => {
    console.log(error)
    return Promise.reject()
  }
)

service.interceptors.response.use((response: AxiosResponse) => {
  const config = response.config
  const key = getRequestKey(config)
  pendingMap.delete(key)

  if (response.status === 200) {
    if (config?.isReturnNativeData) {
      return response.data
    } else {
      const { result, code, message } = response.data

      if (code === 200) {
        return result
      } else {
        errorHandler(message || errorMsgHandler(code), config.errorMode)
      }
    }
  } else {
    const errMsg = errorMsgHandler(response.status)
    errorHandler(errMsg, config.errorMode)
    Promise.reject()
  }
})

// 错误处理
service.interceptors.response.use(undefined, (e) => {
  errorHandler(e.response.status)
})

export default service
