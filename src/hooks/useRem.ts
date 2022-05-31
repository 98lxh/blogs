import { useMount } from './useMount';
//动态指定 rem 基准 根据用户屏幕宽度计算 计算的值给根标签
export const useREM = () => {
  useMount(() => {
    //定义最大的fontSize
    const MAX_FONT_SIZE = 40
    //监听html文章被解析完成的事件
    //拿到html标签
    const html = document.querySelector('html')
    //根据fontSize根据屏幕宽度/10
    let fontSize = window.innerWidth / 10
    fontSize = fontSize > MAX_FONT_SIZE ? MAX_FONT_SIZE : fontSize

    html!.style.fontSize = fontSize + 'px'
  })
}
