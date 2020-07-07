// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let message=" "//非常抱歉！作者准备考研了，因此iOS端的问题暂时无法修复
  return {
    message
  }
}