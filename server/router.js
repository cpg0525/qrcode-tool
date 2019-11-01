const fs = require('fs');
const path = require('path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const Router = require('koa-router');
const router = new Router();
const spider = require('../utils/spider');
const creatFile = require('../utils/index');
const db = require('../sql');
const actions = require('../sql/action');
const rootpath = (p = '../') => {
  return path.join(__dirname, p);
}

console.log(rootpath());

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
    const filePath = rootpath('../public/upload/') + `/${file.name}`;
    actions.insertImage([filePath]);
    const upStream = fs.createWriteStream(filePath);
    reader.pipe(upStream);
    const {
      stdout,
      stderr
    } = await exec(`git pull && git add . && git commit -m 'feat: 新增图片;' && git push`);
    console.log('stderr:', stderr);
    ctx.body = {
      msg: '上传成功！',
      url: `https://github.com/cpg0525/qrcode-tool/blob/master/public/upload/${file.name}?raw=true`,
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
    const re = await actions.queryImageByIdOfRange(1, 3);
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