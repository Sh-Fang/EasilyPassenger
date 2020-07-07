const app=getApp();
const cloud = wx.cloud.database();
const driver="driver";
const car1="../img/1.png"
const car2="../img/2.png"
const car3="../img/3.png"
const car4="../img/4.png"
const car5="../img/5.png"
const car6="../img/6.png"
const car7="../img/7.png"
const car8="../img/8.png"
const car9="../img/9.png"
const car10="../img/10.png"
Page({

  data: {
    carNum:null,      //司机车号
    outControl:false,   //外控制变量
    latitude: null,
    longitude: null,
    MyInterval_d:null,   //定时发送该司机位置信息
    MyInterval_receive:null,   //接收消息的定时器
    isLocate:true,       //“开始定位”按钮是否可按
    noticeBar:"定位已关闭",   //显示在通告栏上的信息
    isShowNoticeBar:true,    //是否允许显示“定位已开启”通知栏
    polyline: [{     //显示在地图上的路线(注意要和用户界面的一样)
      points: [
        {longitude: 117.149784,latitude: 34.21908},//117.149784,34.21908
        {longitude: 117.147258,latitude: 34.219484},//117.147258,34.219484
        {longitude: 117.143401,latitude:34.215305},//117.143401,34.215305
        {longitude: 117.142982,latitude: 34.215079},//117.142982,34.215079
        {longitude: 117.14221, latitude: 34.214977},//117.14221,34.214977
        {longitude: 117.14163,latitude: 34.214693},//117.14163,34.214693
        {longitude: 117.141099,latitude: 34.213863},//117.141099,34.213863
        {longitude: 117.141062,latitude: 34.210648},//117.141062,34.210648
        {longitude: 117.14523,latitude: 34.210679},//117.14523,34.210679
        {longitude: 117.146823,latitude: 34.211393},//117.146823,34.211393
        {longitude: 117.148255,latitude: 34.213196},//117.148255,34.213196
        {longitude: 117.151785,latitude: 34.216727},//117.151785,34.216727
        {longitude: 117.151764,latitude: 34.218457},//117.151764,34.218457
        {longitude: 117.150938,latitude: 34.218838},//117.150938,34.218838
        {longitude: 117.149779,latitude: 34.21906},//117.149779,34.21906
        
      ],
      color:"#FF0000DD",
      width: 4,
      dottedLine: false
    }],


    markers:[
      {iconPath:car1,id:1,latitude:null,longitude:null,width: 35,height: 35},
      {iconPath:car2,id:2,latitude:null,longitude:null,width: 35,height: 35},
      {iconPath:car3,id:3,latitude:null,longitude:null,width: 35,height: 35},
      {iconPath:car4,id:4,latitude:null,longitude:null,width: 35,height: 35},
      {iconPath:car5,id:5,latitude:null,longitude:null,width: 35,height: 35},
      {iconPath:car6,id:6,latitude:null,longitude:null,width: 35,height: 35},
      {iconPath:car7,id:7,latitude:null,longitude:null,width: 35,height: 35},
      {iconPath:car8,id:8,latitude:null,longitude:null,width: 35,height: 35},
      {iconPath:car9,id:9,latitude:null,longitude:null,width: 35,height: 35},
      {iconPath:car10,id:10,latitude:null,longitude:null,width: 35,height: 35},
    ]
  },

  

  onLoad: function (options) {
    this.setData({
      carNum:parseInt(options.carNum)    //该司机的车号
    })
    app.receive();    //开始接收消息
  },



  markerMove:function(markerId,longitude,latitude){       //marker移动
    var mapContext = wx.createMapContext('map', this);
    mapContext.translateMarker({
      markerId: markerId,
      destination: {
        longitude: longitude,
        latitude: latitude,
      },
      autoRotate: false,
      rotate: 0,
      duration: 100,
      animationEnd: (res)=>{},
      fail: (res)=>{}
    });
  },


  upLoadLocation:function(longitude,latitude){   //上传该司机的位置
    if(this.data.outControl==true){
      let loginStatus="1"
      let message=this.data.carNum+","+longitude+","+latitude+","+loginStatus
      app.publish(message);
      
      if(this.data.isShowNoticeBar){ //允许在通知栏上显示“定位已开启”
        this.setData({
          noticeBar:"定位已开启",
          isShowNoticeBar:false  //因为是不断的循环，所以第一次将文字改成了"定位已开启"后，就不再修改了
        })
      } 
    }
  },





  getLocation:function(){  //获取当前位置
    var that=this;
    wx.getLocation({
      type: 'gcj02',
      success (res) {
        that.setData({
          longitude: res.longitude,
          latitude: res.latitude,
        })
        that.upLoadLocation(res.longitude,res.latitude);//上传该司机的位置
        
      }
    })
  },


  

  onShow: function () {
    var that=this;
    that.setData({
      isLocate:true   //设置按钮为可按状态
    })
    wx.getLocation({
      type: 'gcj02',
      success (res) {
        that.setData({
          longitude: res.longitude,
          latitude: res.latitude,
        })
      }
    })

    that.data.MyInterval_d  = setInterval(function () {
      that.getLocation();  //获取当前位置
    }, 1000) //循环间隔 单位ms

    that.data.MyInterval_receive=setInterval(function () {   //接收消息的定时器
      let _carNum=parseInt(app.globalData.carNum)   //marker标识 
      let _longitude=parseFloat(app.globalData.longitude) //一次性从app.globalData中获取数据的原因:因为每一次发布消息的间隔是2秒,
      let _latitude=parseFloat(app.globalData.latitude)    //这2秒中,可能会有其他司机发布了位置信息,因此为了避免获取到的carNum和longitude等不匹配,所以一次性获取到三个数据
      let _loginStatus=app.globalData.loginStatus  //如果司机下线，则在乘客端消失该marker
      if(_carNum){   //如果_carNum有值
        if(_loginStatus=="1"){  //如果司机在线
          that.markerMove(_carNum,_longitude,_latitude)
        }else if(_loginStatus=="0"){  //如果司机下线
          that.markerMove(_carNum,null,null)
        }  
      }
    },100)  //疯狂的读取本地的app.globalData
  },



  openLocate:function(){   //开始定位
    var that = this;
    if(!that.data.isLocate){   //按钮不可按
      wx.showToast({
        title: '请不要多次点击',
        icon: 'none',
        duration: 1000,
        mask: false,
      });
    }else{
      wx.showToast({
        title: '正在开启',
        icon: 'loading',
        duration: 2500,
        mask: true,
      });

      that.setData({
        outControl:true,   //开启定位
        isLocate:false    //按下一次后就不能再按了
      })

    }
    
  },


  closeLocate:function(){
    wx.showToast({
      title: '正在关闭',
      icon: 'loading',
      duration: 1500,
      mask: true,
    });

    let loginStatus="0"   //发送司机下线的消息
    let message=this.data.carNum+","+this.data.longitude+","+this.data.latitude+","+loginStatus
    app.publish(message);

    this.setData({
      noticeBar:"定位已关闭",
      isLocate:true,   //将定位按钮设为可以按
      outControl:false,  //关闭定位
      isShowNoticeBar:true  //关闭了定位，所以下次开启定位的时候，可以修改通知栏上的文字
    })
  },

  

  exit:function(){
    let loginStatus="0"   //发送司机下线的消息
    let message=this.data.carNum+","+this.data.longitude+","+this.data.latitude+","+loginStatus
    wx.showModal({
      title: '退出登陆',
      content: '是否保留账号信息？(下次登陆无需输入账号和密码)',
      showCancel: true,
      cancelText: '否',
      cancelColor: '#000000',
      confirmText: '是',
      confirmColor: '#3CC51F',
      success: (result) => {
        if(result.confirm){    //如果点击确定
          app.publish(message);
          wx.redirectTo({
            url: '../start/start',
          });
        }
        if(result.cancel){     //如果点击否
          wx.clearStorage();   //清除缓存
          app.publish(message);
          wx.redirectTo({
            url: '../start/start',
          });
        }
      },
    });
  },

  

  onHide: function(){
    // clearInterval(this.data.MyInterval_d);
    // clearInterval(this.data.MyInterval_receive);
  },

  onUnload: function(){
    clearInterval(this.data.MyInterval_d);
    clearInterval(this.data.MyInterval_receive);
    
  },

  onShareAppMessage: function () {

  }
})
