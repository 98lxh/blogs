import { systemActions } from './../store/system.slice';
import { useEffect } from 'react';
import { useDebounce, useSize } from 'ahooks';
import { PC_DEVICE_WIDTH } from 'constant';
import { store } from 'store';

//判断是否为移动端设备 判断依据是屏幕宽度是否小于一个宽度(1280px)
export const useIsMobile = () => {
  const size = useSize(() => document.documentElement)
  const debounceSize = useDebounce(size, { wait: 200 })

  useEffect(() => {
    if (!debounceSize || !debounceSize.width) return
    store.dispatch(systemActions.setIsMobile(debounceSize.width < PC_DEVICE_WIDTH))
  }, [debounceSize])
}
