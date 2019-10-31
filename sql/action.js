const db = require('./index');

const insertImage = (value) => {
  const _sql = `insert into user set url=?;`
  return db.query(_sql, value)
}
const queryImageById = (id) => {
  const _sql = `select * from user where id=${id};`
  return db.query(_sql, id)
}
module.exports = {
  insertImage,
  queryImageById
}