export const getUserFromCookie = (req) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(111)
    }, 3000)
  })
}
