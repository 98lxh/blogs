/* eslint-disable no-undef */
interface Config extends RequestInit {
  data?: object
}


export const http = async (endpoint: string, { ...customConfig }: Config = {}) => {
  const config: Config = {
    method: 'GET',
    ...customConfig
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
