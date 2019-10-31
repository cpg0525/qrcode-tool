const fs = require('fs');
const path = require('path');
const Router = require('koa-router');
const router = new Router();
const spider = require('../utils/spider');
const creatFile = require('../utils/index');
const db = require('../sql');
const actions = require('../sql/action');

const user =
  `create table if not exists user(
 id INT NOT NULL AUTO_INCREMENT,
 url VARCHAR(100) NOT NULL,
 PRIMARY KEY ( id )
);`

router.post(
  '/action/upload/files',
  async ctx => {
    const file = ctx.request.files.file;
    await db.createTable(user);
    await creatFile('public/upload/');
    const reader = fs.createReadStream(file.path);
    const filePath = path.join(__dirname, '../public/upload/') + `/${file.name}`;
    actions.insertImage([filePath]);
    const upStream = fs.createWriteStream(filePath);
    reader.pipe(upStream);
    ctx.body = {
      msg: '上传成功！',
      url: `${ctx.host}/${file.name}`,
      status: 1
    };
  }
);

router.get('/action/get/qrcode', async ctx => {
  const url = `https://cli.im/api/qrcode/code?text=${ctx.query.url}&mhid=vBHDXgvpyc8hMHcmK9RRPKg`;
  try {
    const imgUrl = await spider(url);
    if (imgUrl) {
      ctx.body = {
        msg: '二维码获取成功',
        data: `https:${imgUrl}`,
        status: 1
      }
    } else {
      ctx.body = {
        msg: '二维码获取失败，请稍后再试',
        data: null,
        status: 0
      }
    }

  } catch (error) {
    ctx.body = {
      msg: '服务器内部错误',
      data: null,
      status: 0
    }
  }
});

router.get('/action/get/mysql', async ctx => {
  try {
    const re = await actions.queryImageById(3);
    ctx.body = {
      msg: '查询成功',
      re,
      status: 1
    }
  } catch (err) {
    ctx.body = {
      msg: err,
      re: null,
      status: 0
    }
  }
})


module.exports = router;