const dbName = {
  dev: 'beenotetest',
  pro: 'beenote'
}
const getDBName = process.env.DEV ? dbName.dev : dbName.pro
const obj = {
  proHost: 'blackHook.club', //'67.209.187.22'
  dbName: {
    dev: 'beenotetest',
    pro: 'beenote'
  },
  SECRET: 'hello~',
  DBURL: `mongodb://127.0.0.1:27017/${getDBName}`
}

module.exports = {
  base: obj
}
