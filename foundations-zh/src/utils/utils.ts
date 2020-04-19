/**
 * @description 判断浏览器类型
 */
export const browserType = {
  isChrome () {
    return navigator.userAgent.toLowerCase().includes('chrome')
  },
  isFirefox () {
    return navigator.userAgent.toLowerCase().includes('firefox')
  }
}

/**
 * @description 格式化错误信息
 * @param info 
 */
export const formateError = function (info: string) {
  if (browserType.isFirefox()) {
    return /(.*)@(.*):(\d*):(\d*)/i.exec(info)
  }
  return (
    /at\s+(.*)\s+\((.*):(\d*):(\d*)\)/i.exec(info) ||
    /at\s+(.*)\s+(.*):(\d*):(\d*)/ig.exec(info)
  )
}