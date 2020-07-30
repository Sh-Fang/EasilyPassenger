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
const build="../img/build.png"
var util = require('../../utils/util.js');
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
        {longitude: 117.15031,latitude: 34.214825},//117.15031,34.214825
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
      {
        iconPath:build,
        id:11,
        longitude:117.149813,
        latitude:34.219134,//117.149813,34.219134
        width: 20,
        height: 20,
        label:{
          content: '北门',  //文本
          color: '#FF0202',  //文本颜色
          borderRadius: 3,  //边框圆角
          borderWidth: 1,  //边框宽度
          borderColor: '#FF0202',  //边框颜色
          bgColor: '#ffffff',  //背景色
          padding: 5,  //文本边缘留白
          textAlign: 'center'  //文本对齐方式。有效值: left, right, center
        },
      },
      {
        iconPath:build,
        id:12,
        longitude:117.146472,
        latitude:34.21873,//117.146472,34.21873
        width: 20,
        height: 20,
        label:{
          content: '第一运动场',  //文本
          color: '#FF0202',  //文本颜色
          borderRadius: 3,  //边框圆角
          borderWidth: 1,  //边框宽度
          borderColor: '#FF0202',  //边框颜色
          bgColor: '#ffffff',  //背景色
          padding: 5,  //文本边缘留白
          textAlign: 'center'  //文本对齐方式。有效值: left, right, center
        },
      },
      {
        iconPath:build,
        id:13,
        longitude:117.144209,
        latitude:34.215772,//117.144209,34.215772
        width: 20,
        height: 20,
        label:{
          content: '图书馆',  //文本
          color: '#FF0202',  //文本颜色
          borderRadius: 3,  //边框圆角
          borderWidth: 1,  //边框宽度
          borderColor: '#FF0202',  //边框颜色
          bgColor: '#ffffff',  //背景色
          padding: 5,  //文本边缘留白
          textAlign: 'center'  //文本对齐方式。有效值: left, right, center
        },
      },
      {
        iconPath:build,
        id:14,
        longitude:117.141849,
        latitude:34.214841,//117.141849,34.214841
        width: 20,
        height: 20,
        label:{
          content: '一食堂',  //文本
          color: '#FF0202',  //文本颜色
          borderRadius: 3,  //边框圆角
          borderWidth: 1,  //边框宽度
          borderColor: '#FF0202',  //边框颜色
          bgColor: '#ffffff',  //背景色
          padding: 5,  //文本边缘留白
          textAlign: 'center'  //文本对齐方式。有效值: left, right, center
        },
      },
      {
        iconPath:build,
        id:15,
        longitude:117.14547,
        latitude:34.217693,//117.14547,34.217693
        width: 20,
        height: 20,
        label:{
          content: '网球场',  //文本
          color: '#FF0202',  //文本颜色
          borderRadius: 3,  //边框圆角
          borderWidth: 1,  //边框宽度
          borderColor: '#FF0202',  //边框颜色
          bgColor: '#ffffff',  //背景色
          padding: 5,  //文本边缘留白
          textAlign: 'center'  //文本对齐方式。有效值: left, right, center
        },
      },
      {
        iconPath:build,
        id:16,
        longitude:117.141098,
        latitude:34.213279,//117.141098,34.213279
        width: 20,
        height: 20,
        label:{
          content: '二食堂',  //文本
          color: '#FF0202',  //文本颜色
          borderRadius: 3,  //边框圆角
          borderWidth: 1,  //边框宽度
          borderColor: '#FF0202',  //边框颜色
          bgColor: '#ffffff',  //背景色
          padding: 5,  //文本边缘留白
          textAlign: 'center'  //文本对齐方式。有效值: left, right, center
        },
      },
      {
        iconPath:build,
        id:17,
        longitude:117.140953,
        latitude:34.211407,//117.140953,34.211407
        width: 20,
        height: 20,
        label:{
          content: '三食堂',  //文本
          color: '#FF0202',  //文本颜色
          borderRadius: 3,  //边框圆角
          borderWidth: 1,  //边框宽度
          borderColor: '#FF0202',  //边框颜色
          bgColor: '#ffffff',  //背景色
          padding: 5,  //文本边缘留白
          textAlign: 'center'  //文本对齐方式。有效值: left, right, center
        },
      },
      {
        iconPath:build,
        id:18,
        longitude:117.144617,
        latitude:34.210551,//117.144617,34.210551
        width: 20,
        height: 20,
        label:{
          content: '不显山',  //文本
          color: '#FF0202',  //文本颜色
          borderRadius: 3,  //边框圆角
          borderWidth: 1,  //边框宽度
          borderColor: '#FF0202',  //边框颜色
          bgColor: '#ffffff',  //背景色
          padding: 5,  //文本边缘留白
          textAlign: 'center'  //文本对齐方式。有效值: left, right, center
        },
      },
      {
        iconPath:build,
        id:19,
        longitude:117.148013,
        latitude:34.213266,//117.148013,34.213266
        width: 20,
        height: 20,
        label:{
          content: '国旗广场',  //文本
          color: '#FF0202',  //文本颜色
          borderRadius: 3,  //边框圆角
          borderWidth: 1,  //边框宽度
          borderColor: '#FF0202',  //边框颜色
          bgColor: '#ffffff',  //背景色
          padding: 5,  //文本边缘留白
          textAlign: 'center'  //文本对齐方式。有效值: left, right, center
        },
      },
      {
        iconPath:build,
        id:20,
        longitude:117.149574,
        latitude:34.212295,//117.149574,34.212295
        width: 20,
        height: 20,
        label:{
          content: '东门',  //文本
          color: '#FF0202',  //文本颜色
          borderRadius: 3,  //边框圆角
          borderWidth: 1,  //边框宽度
          borderColor: '#FF0202',  //边框颜色
          bgColor: '#ffffff',  //背景色
          padding: 5,  //文本边缘留白
          textAlign: 'center'  //文本对齐方式。有效值: left, right, center
        },
      },
      {
        iconPath:build,
        id:21,
        longitude:117.148883,
        latitude:34.213938,//117.148883,34.213938
        width: 20,
        height: 20,
        label:{
          content: '信控学院',  //文本
          color: '#FF0202',  //文本颜色
          borderRadius: 3,  //边框圆角
          borderWidth: 1,  //边框宽度
          borderColor: '#FF0202',  //边框颜色
          bgColor: '#ffffff',  //背景色
          padding: 5,  //文本边缘留白
          textAlign: 'center'  //文本对齐方式。有效值: left, right, center
        },
      },
      {
        iconPath:build,
        id:22,
        longitude:117.15031,
        latitude:34.214825,//117.15031,34.214825
        width: 20,
        height: 20,
        label:{
          content: '机电学院',  //文本
          color: '#FF0202',  //文本颜色
          borderRadius: 3,  //边框圆角
          borderWidth: 1,  //边框宽度
          borderColor: '#FF0202',  //边框颜色
          bgColor: '#ffffff',  //背景色
          padding: 5,  //文本边缘留白
          textAlign: 'center'  //文本对齐方式。有效值: left, right, center
        },
      },
      {
        iconPath:build,
        id:23,
        longitude:117.151233,
        latitude:34.215974,//117.151233,34.215974
        width: 20,
        height: 20,
        label:{
          content: '化工学院',  //文本
          color: '#FF0202',  //文本颜色
          borderRadius: 3,  //边框圆角
          borderWidth: 1,  //边框宽度
          borderColor: '#FF0202',  //边框颜色
          bgColor: '#ffffff',  //背景色
          padding: 5,  //文本边缘留白
          textAlign: 'center'  //文本对齐方式。有效值: left, right, center
        },
      },
      {
        iconPath:build,
        id:24,
        longitude:117.152,
        latitude:34.216799,//117.152,34.216799
        width: 20,
        height: 20,
        label:{
          content: '安全学院',  //文本
          color: '#FF0202',  //文本颜色
          borderRadius: 3,  //边框圆角
          borderWidth: 1,  //边框宽度
          borderColor: '#FF0202',  //边框颜色
          bgColor: '#ffffff',  //背景色
          padding: 5,  //文本边缘留白
          textAlign: 'center'  //文本对齐方式。有效值: left, right, center
        },
      },
      {
        iconPath:build,
        id:25,
        longitude:117.151609,
        latitude:34.217731,//117.151609,34.217731
        width: 20,
        height: 20,
        label:{
          content: '环测学院',  //文本
          color: '#FF0202',  //文本颜色
          borderRadius: 3,  //边框圆角
          borderWidth: 1,  //边框宽度
          borderColor: '#FF0202',  //边框颜色
          bgColor: '#ffffff',  //背景色
          padding: 5,  //文本边缘留白
          textAlign: 'center'  //文本对齐方式。有效值: left, right, center
        },
      },
      {
        iconPath:build,
        id:26,
        longitude:117.150836,
        latitude:34.21876,//117.150836,34.21876
        width: 20,
        height: 20,
        label:{
          content: '资源学院',  //文本
          color: '#FF0202',  //文本颜色
          borderRadius: 3,  //边框圆角
          borderWidth: 1,  //边框宽度
          borderColor: '#FF0202',  //边框颜色
          bgColor: '#ffffff',  //背景色
          padding: 5,  //文本边缘留白
          textAlign: 'center'  //文本对齐方式。有效值: left, right, center
        },
      },
      {
        iconPath:build,
        id:27,
        longitude:117.148342,
        latitude:34.219221,//117.148342,34.219221
        width: 20,
        height: 20,
        label:{
          content: '建筑学院',  //文本
          color: '#FF0202',  //文本颜色
          borderRadius: 3,  //边框圆角
          borderWidth: 1,  //边框宽度
          borderColor: '#FF0202',  //边框颜色
          bgColor: '#ffffff',  //背景色
          padding: 5,  //文本边缘留白
          textAlign: 'center'  //文本对齐方式。有效值: left, right, center
        },
      },
    ]
  },

  onLoad: function (options) {
    var that=this
    let time = util.formatTime(new Date());  //获取系统时间
    time=(time.split(" ")[1]).split(":");
    let hour=time[0];
    let minute=time[1];
    if(hour<7){   //如果不在上班时间
      wx.showModal({
        title: '不在运营时间',
        content: '当前时间未上班',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#000000',
        confirmText: '确定',
        confirmColor: '#3CC51F',
      });
    }else if(hour>=20){
      wx.showModal({
        title: '不在运营时间',
        content: '当前时间已下班',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#000000',
        confirmText: '确定',
        confirmColor: '#3CC51F',
      });
    }else{
      wx.showToast({
        title: '正在显示司机',
        icon: 'loading',
        duration: 2000,
        mask: false,
      });

      app.receive();    //开始接收消息
    }

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