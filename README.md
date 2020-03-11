# qrcode

> 简单实现网址转化为二维码图片功能

## Build Setup

``` bash
# install dependencies
$ yarn install or npm run install

# serve with hot reload at localhost:3000
$ yarn dev or npm run dev

# build for production and launch server
$ yarn build or npm run build
$ yarn start or npm run start

# generate static project
$ yarn generate
```
```
 /**
     *  输入：“get1_install2_app3_list4_by5_android6”（每个单词后面总会携带一个数字，只有偶数才删掉），
     *  我不用循环只用正则怎么实现输出"get1InstallApp3ListBy5Android"？
     *  @param {string} str 所要处理的字符串
     *  @return {string} 返回处理好的字符串
    */
    const handleStr = str => {
      const reg = /\_([a-zA-Z]+)(\d+)/g;
      return str.replace(reg, (...args) => {
        const [firstLetter, ...string] = args[1];
        const letters = (args[3] !== 0 ? firstLetter.toUpperCase() : firstLetter) + string.join('');
        if (!(args[2] % 2)) {
          return letters;
        } else {
          return letters + args[2];
        }
      })
    }
    console.log(handleStr('get1_install2_app3_list4_by5_ios6')); // get1InstallApp3ListBy5Ios
```
