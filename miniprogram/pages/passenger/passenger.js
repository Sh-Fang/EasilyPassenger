const app=getApp();
const car1="https://7465-testtest-6zkau-1301141850.tcb.qcloud.la/1.png?sign=7554c3298bc5d168da87db61e532cd5a&t=1579622296"
const car2="https://7465-testtest-6zkau-1301141850.tcb.qcloud.la/2.png?sign=24e9644ac79a299647f52a0b4e740d47&t=1579622379"
const car3="https://7465-testtest-6zkau-1301141850.tcb.qcloud.la/3.png?sign=4958d478eae4fa2f0c65b2fb41009665&t=1579622394"
const car4="https://7465-testtest-6zkau-1301141850.tcb.qcloud.la/4.png?sign=395d6d6001c38ff3cfc0dfeaaeb8ce0c&t=1579622408"
const car5="https://7465-testtest-6zkau-1301141850.tcb.qcloud.la/5.png?sign=514b7696249642c037ce218619f7f311&t=1579622537"
const car6="https://7465-testtest-6zkau-1301141850.tcb.qcloud.la/6.png?sign=31ca16d7ea7fc63bc9ea64911c4f6dc3&t=1579622552"
const car7="https://7465-testtest-6zkau-1301141850.tcb.qcloud.la/7.png?sign=543358b9a32e7bacdc82242828354454&t=1579622566"
const car8="https://7465-testtest-6zkau-1301141850.tcb.qcloud.la/8.png?sign=27381a2efecc5540861b786c2f36d687&t=1579622583"
const car9="https://7465-testtest-6zkau-1301141850.tcb.qcloud.la/9.png?sign=c6c6929094c2710a1ac85e5202bf1bc6&t=1579622599"
const car10="https://7465-testtest-6zkau-1301141850.tcb.qcloud.la/10.png?sign=6b9bb56206eb900cfd5fbd9db1d76858&t=1579622616"
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
      {iconPath:car10,id:10,latitude:null,longitude:null,width: 35,height: 35}
    ]
  },

  onLoad: function (options) {
    var that=this
    wx.showToast({
      title: '正在刷新...',
      icon: 'loading',
      duration: 4000,
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
      duration: 1000,
      animationEnd: ()=>{},
      fail: ()=>{}
    });
  },

  onShow: function () {
    var that = this;
    that.data.MyInterval_d  = setInterval(function () {

      let _carNum=parseInt(app.globalData.carNum)   //marker标识 
      let _longitude=app.globalData.longitude //一次性从app.globalData中获取数据的原因:因为每一次发布消息的间隔是2秒,
      let _latitude=app.globalData.latitude    //这2秒中,可能会有其他司机发布了位置信息,因此为了避免获取到的carNum和longitude等不匹配,所以一次性获取到三个数据
      
      let _loginStatus=app.globalData.loginStatus  //如果司机下线，则在乘客端消失该marker
      if(_loginStatus=="1"){   
        that.markerMove(_carNum,_longitude,_latitude)
      }else{
        that.markerMove(_carNum,null,null)
      }

    }, 1000) //循环间隔 单位ms
  },


  logout:function(){
    wx.clearStorage();
    wx.redirectTo({
      url: '../start/start',
    });
  },


  onHide: function () {
    clearInterval(this.data.MyInterval_d);
  },


  onUnload: function () {
    clearInterval(this.data.MyInterval_d);
  },

})