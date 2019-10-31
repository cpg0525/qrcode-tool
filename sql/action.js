const db = require('./index');

const insertImage = (value) => {
  const _sql = `insert into user set url=?;`
  return db.query(_sql, value)
}
/**
 * 根据指定id搜索；
 * @param {*} id 
 */
const queryImageById = (id) => {
  const _sql = `select * from user where id ='${id}';`
  return db.query(_sql)
}

/**
 * 根据关键字id 指定范围搜索；
 * @param {Number} v1 
 * @param {Number} v2 
 */
const queryImageByIdOfRange = (v1, v2) => {
  const _sql = `select * from user where id BETWEEN '${v1}' AND '${v2}';`
  return db.query(_sql)
}

module.exports = {
  insertImage,
  queryImageById
}