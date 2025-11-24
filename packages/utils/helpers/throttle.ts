export function throttle(func: Function, timeFrame: number) {
  let lastTime = 0
  return function throttled(...args: unknown[]) {
    let now = Date.now()
    if (now - lastTime >= timeFrame) {
      func(...args)
      lastTime = now
    }
  }
}
