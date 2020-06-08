
Page({


  data: {

  },

  passenger:function(){
    wx.showModal({
      title: '敬请期待',
      content: '该功能暂时关闭，敬请期待',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
    });
  },

  driver:function(){
    wx.redirectTo({
      url: '../user/user',
    });
  },

  onLoad: function (options) {

  },


  onReady: function () {

  },


  onShow: function () {

  },


  onHide: function () {

  },


  onUnload: function () {

  },


  onPullDownRefresh: function () {

  },


  onReachBottom: function () {

  },


  onShareAppMessage: function () {

  }
})