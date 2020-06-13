Page({
  data: {
  },
  
  passenger:function(){
    wx.navigateTo({
      url: '../passenger/passenger',
    });
  },

  driver:function(){
    wx.redirectTo({
      url: '../user/user',
    });
  },
})