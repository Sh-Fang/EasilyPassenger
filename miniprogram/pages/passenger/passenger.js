const app=getApp();
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
    latitude: null,
    longitude: null,
    MyInterval_d:null,   //定时接收司机位置信息

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
    var that=this
    wx.showToast({
      title: '正在显示司机',
      icon: 'loading',
      duration: 2000,
      mask: false,
    });

    app.receive();    //开始接收消息

    wx.getLocation({
      type: 'gcj02',
      success (res) {
        that.setData({
          longitude: res.longitude,
          latitude: res.latitude,
        })
      }
    })
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
      animationEnd: ()=>{},
      fail: ()=>{}
    });
  },

  onShow: function () {
    var that = this;
    that.data.MyInterval_d  = setInterval(function () {

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
    }, 100) //循环间隔 单位ms
  },


  logout:function(){
    wx.clearStorage();
    wx.navigateBack({
      delta: 1
    });
    // wx.redirectTo({
    //   url: '../start/start',
    // });
  },


  onHide: function () {
    clearInterval(this.data.MyInterval_d);
  },


  onUnload: function () {
    clearInterval(this.data.MyInterval_d);
  },

  onShareAppMessage: function () {

  }
})