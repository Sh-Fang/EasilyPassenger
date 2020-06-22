Page({
  data: {

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