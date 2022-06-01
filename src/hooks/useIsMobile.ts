import { useEffect, useState } from 'react';
import { useDebounce, useSize } from 'ahooks';
import { PC_DEVICE_WIDTH } from 'constant';

//判断是否为移动端设备 判断依据是屏幕宽度是否小于一个宽度(1280px)
export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false)
  const size = useSize(() => document.documentElement)
  const debounceSize = useDebounce(size, { wait: 200 })

  useEffect(() => {
    setIsMobile(() => !!debounceSize?.width && debounceSize.width < PC_DEVICE_WIDTH)
  }, [debounceSize])

  return isMobile
}
