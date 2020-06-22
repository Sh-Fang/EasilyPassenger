const cloud = wx.cloud.database();
const driver="driver";
const app=getApp();
Page({

  data: {
    userInfo:{
      phone:null,
      password:null,
      identity:null
    }
  },
  
  onLoad: function (options) {
    wx.getSystemInfo({
      success: (res)=>{
        console.log(res)
        if(res.locationEnabled==false||!res.locationEnabled){
          wx.showModal({
            title: '系统定位未开启',
            content: '请在手机的“设置”中开启定位',
          });
        }
        else{
          wx.getStorage({
            key: 'userInfo',
            success: (res)=>{
              cloud.collection(driver).where({
                phone:res.data.userInfo.phone,
                password: res.data.userInfo.password
              }).get({
                success:function(res){
                  if(res.data[0].identity=="admin"){
                    wx.showToast({
                      title: '正在自动登陆',
                      icon: 'loading',
                      duration: 1000,
                    });
                    wx.navigateTo({
                      url: '../admin/admin',
                    })
                  }
                  if(res.data[0].identity=="driver"){
                    wx.showToast({
                      title: '正在自动登陆',
                      icon: 'loading',
                      duration: 1000,
                    });
                    wx.redirectTo({
                      url: '../driver/driver?carNum='+res.data[0].carNum,
                    })
                  }
                }
              })
            }
          });
        }
      },
    });
  },

  text1: function (e) {
    this.data.text1 = e.detail.value
  },

  text2: function (e) {
    this.data.text2 = e.detail.value
  },


  MySetStorage(res){ 
    wx.setStorage({
      key: 'userInfo',
      data: {
        userInfo: {
          phone: res.data[0].phone,
          password: res.data[0].password,
          identity:res.data[0].identity
        }
      },
    })
  },



  login:function(){
    var that=this;
    var phone = this.data.text1;
    var password = this.data.text2;
    wx.getSystemInfo({
      success: (res)=>{
        if(res.locationEnabled==false||!res.locationEnabled){
          wx.showModal({
            title: '系统定位未开启',
            content: '请在手机的“设置”中开启定位',
          });
        }
        // if(null){

        // }
        else{
          if(phone&&password){     //如果输入框不为空
            cloud.collection(driver).where({
              phone:phone,
              password:password
            }).get({
              success:function(res){
                if(res.data.length==0){
                  wx.showToast({
                    title: '账号或密码有误',
                    icon: 'none',
                    duration: 1000,
                    mask: false,
                  });
                  wx.setStorage({
                    key: 'userInfo',
                    data: {
                      userInfo: {
                        phone: phone,
                        password: password,
                        identity:null
                      }
                    },
                  })
                  console.log("错误_已存入缓存")
                }
                if(res.data[0].identity=="driver"&&res.data[0].phone==phone&&res.data[0].password==password){
                  that.MySetStorage(res);
                  console.log("司机_已存入缓存")
                  wx.redirectTo({
                    url: '../driver/driver?carNum='+res.data[0].carNum,
                  });
                }
                if(res.data[0].identity=="admin"&&res.data[0].phone==phone&&res.data[0].password==password){
                  that.MySetStorage(res);
                  console.log("管理员_已存入缓存")
                  wx.navigateTo({
                    url: '../admin/admin',
                  });
                }
              }
            })
          }else{
            wx.showToast({
              title: '请输入登陆信息',
              icon: 'none',
              duration: 1000,
            });
          }
        }
      },
    });
  },

  onHide: function(){

  },

})


