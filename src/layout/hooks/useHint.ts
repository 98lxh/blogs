import { requestHintList } from "api/hint"
import { useEffect, useState } from "react"

export const useHint = (keyword: string) => {
  const [hintList, setHintList] = useState<{ title: string }[]>([])

  const setHintListAsync = async () => {
    if (!keyword) return setHintList([])

    const list = await requestHintList(keyword)
    setHintList(list)
  }

  useEffect(() => {
    setHintListAsync()
  },
    [keyword]
  )

  return hintList
}
