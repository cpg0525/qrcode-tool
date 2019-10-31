const Crawler = require('crawler');
const c = new Crawler({
  maxConnections: 10
})

const spider = (uri) => {
  return new Promise((resolve, reject) => {
    c.queue([
      {
        uri,
        callback: function (error, res, done) {
          if (error) {
            console.log(error);
            reject(error);
          } else {
            const $ = res.$;
            const data = $(res.body).find('img').attr('src');
            resolve(data)
          }
          done();
        }
      }
    ])
  })
}
module.exports = spider; 