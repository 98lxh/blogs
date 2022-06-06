import { useHttp } from "hooks/useAsync"
import { useEffect, useState } from "react"

export const useHint = (keyword: string) => {
  const client = useHttp()
  const [hintList, setHintList] = useState<{ title: string }[]>([])

  const requestHintList = async () => {
    if (!keyword) return setHintList([])

    const list = await client('article/hint', {
      data: {
        keyword,
      }
    })
    setHintList(list)
  }

  useEffect(() => {
    requestHintList()
  },
    [keyword]
  )

  return hintList
}
