export const accessToken = (() => {
  let value = ''

  return {
    update(newToken: string) {
      value = newToken
    },
    value() {
      return value
    },
  }
})()
