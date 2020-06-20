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

```
    /**
    *  利用递归来达到迭代效果，
    *  不使用任何循环控制语句和迭代器的情况下实现一个0到1000的数组赋值。
    * 
    *  @param {Number} length 数组长度
    *  @return {Array} 返回一个根据长度生成的数组
   */

    const copyArray = length => {
      let arr = [];
      return (function continueToPush() {
        if (arr.length <= length) {
          arr.push(arr.length);
          return continueToPush(length);
        } else {
          return arr;
        }
      })()

    }
    console.log(copyArray(10)); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

```
    /**
     *  利用循环递归深层遍历对象，
     *  找出两个相似对象的不同之处返回其key及key所在层级
     * 
     *  @param {Object} obj 参考对象
     *  @param {Object} target 所要对参考对象对比的对象
     *  @return {String} 返回key1->key2->key3格式字符串 可定制分隔符
    */
    const compare = (obj, target) => {
      let isType = Function.prototype.call.bind(Object.prototype.toString);
      let path = [];
      let keys = Object.keys(obj);
      let i = 0;
      (function continueToCompare(obj, target, path) {
        if (isType(obj) === '[object Object]' && isType(target) === '[object Object]') {
          i++;
          for (let key in obj) {
            // 两个对象含有相同的key，但value值不一致情况; 对象key值不一样;
            if (target.hasOwnProperty(key)) {
              if (JSON.stringify(obj[key]) !== JSON.stringify(target[key])) {
                // 如果当前的Key值不存在于第一层的key值数组中，则将其层级复位置1
                if (keys.some(item => item === key)) {
                  i = 1;
                }
                path.push(key + i);
              }
            } else {
              path.push(key + i);
            }
            continueToCompare(obj[key], target[key], path)
          }
        } else if (isType(obj) === '[object Array]' && isType(target) === '[object Array]') {
          // 循环-->递归对深层属性值判断-->根据判断类型做不同处理
        } else {
          // 时间 字符串 布尔值 数字 文件 Symbol类型等...
          // 其中对Symbol类型是否是参数相同还是无参数对比的，都视为不相等。只要是Symbol就放入path中。
        }

      })(obj, target, path);

      return path.join('->');
    }
    let obj = {
      "id": 3,
      "detail": {
        "name": "Henry",
        "age": 5,
        "sex": { a: 1 }
      },
      'd': null,
      'e': [1, 2]
    }

    let target = {
      "detail": {
        "name": "Henry",
        "age": 6,
        "sex": { a: 2 }
      },
      'd': undefined,
      'e': [1, { a: 2 }]
    }
    console.log(compare(obj, target)); // id1->detail1->age2->sex2->a3->d1->e1.
