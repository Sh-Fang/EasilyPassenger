
Page({


  data: {

  },

  passenger:function(){
    wx.login({
      timeout:10000,
      success: (res)=>{
        wx.redirectTo({
          url: '../passenger/passenger',
        });
        // wx.navigateTo({
        //   url: '../passenger/passenger',
        // });
      },
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