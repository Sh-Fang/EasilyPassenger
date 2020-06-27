const app=getApp();

Page({
  data: {
    noticeBar:null,   //显示在通告栏上的信息
    MyInterval:null   //定时器
  },

  onLoad:function(){
    var that=this;
    that.data.MyInterval = setInterval(function () {
      if(app.globalData.noticeBar){  //如果检测到app.globalData.noticeBar有值
        that.setData({
          noticeBar:app.globalData.noticeBar
        })
        clearInterval(that.data.MyInterval);
      }
    }, 1000) //循环间隔 单位ms
    
  },



  onShow:function(){
    
  },

  passenger:function(){
    wx.getSystemInfo({
      success: (res)=>{
        if(res.platform=="ios"||res.platform == "devtools"){
          wx.showModal({
            title: '非常抱歉',
            content: '由于目前未知的BUG，IOS用户界面显示有缺陷',
            showCancel: true,
            cancelText: '退出',
            cancelColor: '#000000',
            confirmText: '仍然进入',
            confirmColor: '#3CC51F',
            success: (result) => {
              if(result.confirm){
                wx.navigateTo({
                  url: '../passenger/passenger',
                });
              }
            },
          });
        }else{
          wx.navigateTo({
            url: '../passenger/passenger',
          });
        }
      },
    });
   
    
  },

  driver:function(){
    wx.navigateTo({
      url: '../user/user',
    });
  },
})