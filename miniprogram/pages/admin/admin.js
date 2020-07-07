const cloud = wx.cloud.database()
const _=cloud.command
const app=getApp();
const driver='driver'

Page({
  

  data: {
    _phone:"",
    _passWord:"",
    _carNum:""
  },

  onLoad: function (options) {
    
  },

  list:function(){
    var that=this
    cloud.collection(driver).where({
      identity:"driver"
    }).get({
      success: function(res) {
        // console.log(JSON.stringify(res.data))   //在传递对象的时候，要先将对象转换成字符串类型
        wx.navigateTo({
          url: '../list/list?listObj='+JSON.stringify(res.data), //使用字符串进行传递，然后在接收页面对字符串进行转换（转换成对象）
        });
      }
    })
    
  }, 


  text1: function (e) {
    this.data.text1 = e.detail.value
  },
  text2: function (e) {
    this.data.text2 = e.detail.value
  },
  text3: function (e) {
    this.data.text3 = e.detail.value
  },


  userRegister:function(){
    var that=this;
    var userPhone=this.data.text1;
    var userPassword=this.data.text2;
    var carNum=this.data.text3;
    if(userPassword&&userPassword&&carNum){     //只有当三个输入框有值时才执行
      cloud.collection(driver).where(_.or([   //“或”条件查找
        {
          phone:userPhone
        },
        {
          carNum:carNum
        }
      ])).get({
        success:function(res){
          if(res.data.length!=0){   //只要不等于0，就说明手机号或者车号被占了
            wx.showToast({
              title: '手机号或车号已被注册',
              icon: 'none',
              duration: 500,
            });
          }else{                   //否则注册
            cloud.collection(driver).add({
              data:{
                phone:userPhone,
                password:userPassword,
                identity:"driver",
                carNum:carNum,
              }
            }).then(res=>{
              that.setData({  //清空输入框
                _phone:"",
                _passWord:"",
                _carNum:""
              })
              wx.showToast({
                title: '注册成功',
                icon: 'success',
                duration: 500,
                mask: false,
              });
              
            })
          }
        }
      })
    }else{
      wx.showToast({
        title: '信息不完整',
        icon: 'none',
        duration: 500,
      });
    }  
  },

  onShareAppMessage: function () {

  }
 
})