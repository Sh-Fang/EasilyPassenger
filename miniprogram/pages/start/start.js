Page({
  data: {
  },
  
  passenger:function(){
    wx.navigateTo({
      url: '../passenger/passenger',
    });
  },

  driver:function(){
    wx.navigateTo({
      url: '../user/user',
    });
  },
})