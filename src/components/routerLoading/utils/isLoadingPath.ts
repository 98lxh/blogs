export const isLoadingPath = (pathname: string, loadingRules?: (string | RegExp)[]) => {
  if (!loadingRules) return true
  let isLoading = false

  for (let i = 0; i < loadingRules.length; i++) {
    const rule = loadingRules[i]
    if (rule instanceof RegExp && rule.test(pathname)) {
      isLoading = true
      break
    } else if (rule === pathname) {
      isLoading = true
      break
    }
  }

  return isLoading
}
