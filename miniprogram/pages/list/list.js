const cloud = wx.cloud.database()
const _=cloud.command
const app=getApp();
const driver='driver'
Page({

  data: {
    _listObj:{}   //将对象内的数组循环显示在页面上
  },

  onLoad: function (options) {
    let listObj=JSON.parse(options.listObj)  //因为传过来的是对象转的字符串，因此，需要对字符串进行回转，回转成对象
    this.setData({
      _listObj:listObj
    })
  },

  onReady: function () {

  },


  onShow: function () {
    
  },

  deleteDriver:function(res){
    var that=this;
    let deleteId=this.data._listObj[res.currentTarget.id]._id  //待删除的数据的id
    cloud.collection(driver).doc(deleteId).remove({   //删除数据
      success: function(res) {
        wx.showToast({
          title: '删除成功',
          icon: 'success',
          duration: 800,
        });
      }
    })
  },

  onHide: function () {

  },

  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})