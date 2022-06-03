import qs from "qs"

/* eslint-disable no-undef */
interface Config extends RequestInit {
  data?: object
}


export const http = async (endpoint: string, { data, ...customConfig }: Config = {}) => {
  const config: Config = {
    method: 'GET',
    ...customConfig
  }

  if (config.method!.toUpperCase() === 'GET') {
    endpoint += `?${qs.stringify(data)}`
  } else {
    config.body = JSON.stringify(data || {})
  }

  return window.fetch(`/api/${endpoint}`, config)
    .then(async response => {
      //todo：错误处理


      const result = await response.json()
      if (response.ok) {
        return result.data
      } else {
        return Promise.reject()
      }
    })
}
