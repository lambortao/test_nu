/**
 * 该文件为打包工程化的脚本
 * 主要作用是在项目打包完毕后将构建好的静态文件复制到指定目录
 */
const path = require('node:path')
const fs = require('fs')

/**
 * 删除文件夹下所有问价及将文件夹下所有文件清空
 * @param {*} path
 */
function emptyDir (path) {
  const files = fs.readdirSync(path)
  files.forEach((file) => {
    const filePath = `${path}/${file}`
    const stats = fs.statSync(filePath)
    if (stats.isDirectory()) {
      emptyDir(filePath)
    } else {
      fs.unlinkSync(filePath)
    }
  })
}

/**
* 删除指定路径下的所有空文件夹
* @param {*} path
*/
function rmEmptyDir (path, level = 0) {
  const files = fs.readdirSync(path)
  if (files.length > 0) {
    let tempFile = 0
    files.forEach((file) => {
      tempFile++
      rmEmptyDir(`${path}/${file}`, 1)
    })
    if (tempFile === files.length && level !== 0) {
      fs.rmdirSync(path)
    }
  } else {
    level !== 0 && fs.rmdirSync(path)
  }
}

/**
 * 清空指定路径下的所有文件及文件夹
 * @param {*} path
 */
function clearDir (path) {
  emptyDir(path)
  rmEmptyDir(path)
}

// 被复制的文件夹
const distClienPath = path.join(__dirname.split('utils')[0], '.nuxt\\dist\\client')
// 目标文件夹
const targetPath = path.join(__dirname.split('website')[0], 'static')

// 清空目标文件夹
clearDir(targetPath)

// 复制源文件到目标文件夹
fs.cp(distClienPath, targetPath, { recursive: true }, (err) => {
  if (err) {
    console.error(err)
  } else {
    console.log('打包后的静态文件迁移成功')
  }
})

console.log(`静态目录文件夹 ${targetPath} 已清空`)
