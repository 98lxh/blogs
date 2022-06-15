import message from 'libs/message';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from "react-redux"
import { selectUser } from "store/slices/auth.slice"

export const usePermission = () => {
  const userInfo = useSelector(selectUser)
  const { push } = useRouter()

  useEffect(() => {
    if (!userInfo) {
      message.error('请先登录在进行该操作~')
      push('/login')
    }
  }, [])
}
