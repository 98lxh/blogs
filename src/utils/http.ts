import message from "libs/message"
import qs from "qs"

/* eslint-disable no-undef */
interface Config extends RequestInit {
  data?: object
}


export const http = async  <T = any>(endpoint: string, { data, ...customConfig }: Config = {}): Promise<T> => {
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
      const result = await response.json()
      if (response.ok) {
        return result.data
      } else {
        switch (response.status) {
          case 401:
            message.error(result.message)
        }
        return Promise.reject()
      }
    })
}
