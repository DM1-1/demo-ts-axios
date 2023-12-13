import axios from 'axios'
import type {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  AxiosRequestConfig,
} from 'axios'

const service: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 0,
})

/**
 * 请求拦截器
 */
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = window.localStorage.getItem('token') || ''
    if(token) {
      config.headers!.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: AxiosError) => {
    alert(error.message)
    return Promise.reject(error)
  }
)

/**
 * 响应拦截器
 */
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { code, message, data } = response.data
    if (code === 200) {
      return data
    } else {
      alert(message)
      return Promise.reject(new Error(message))
    }
  },
  (error: AxiosError) => {
    let message = ''
    const status = error.request?.status
    switch (status) {
      case 401:
        message = 'token失效，重新登录'
        break
      case 403:
        message = '拒绝访问'
        break
      case 404:
        message = '请求地址错误'
        break
      default:
        message = '网络连接异常'
      // todos: handle error
    }
    alert(`error ${message}`)
    return Promise.reject(error)
  }
)

/**
 * 这里的封装可以使得在调用接口的时候，不需要写返回值，通过我们在方法后面的<>中传入泛型即可
 */
export const http = {
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return service.get(url, config)
  },
  post<T = any>(
    url: string,
    data?: object,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return service.post(url, data, config)
  },
  put<T = any>(
    url: string,
    data?: object,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return service.put(url, data, config)
  },
  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return service.delete(url, config)
  },
}

export default service