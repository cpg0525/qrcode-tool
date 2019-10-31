const fs = require('fs');
const create = (str) => {
  const path = [];
  const arr = str.split("/");
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    path.push(arr[i]);
    const filename = path.join("/");
    // 判断这个文件或文件夹是否存在
    const bln = fs.existsSync(filename);
    if (bln == false) {
      if (i < len - 1) {  // 一定是文件夹
        console.log("计划创建 " + filename + " 文件夹");
        fs.mkdirSync(filename);
      } else {
        // 判断是文件还是文件夹                
        if (arr[i].indexOf(".") > -1) {
          // 如果是文件
          console.log("创建文件" + filename);
          fs.writeFileSync(filename);
        } else {
          // 如果是文件夹
          console.log("创建文件夹" + filename);
          fs.mkdirSync(filename);
        }
      }
    }
  }
}
module.exports = create; 