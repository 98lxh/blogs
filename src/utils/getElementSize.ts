export const getElementSize = (target: HTMLElement | null) => {
  if (!target) return

  return {
    width: target.offsetWidth,
    height: target.offsetHeight
  }
}
