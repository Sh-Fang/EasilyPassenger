const updateManager = wx.getUpdateManager()

/*****************************************************/
const mqtt = require('./utils/mqtt.high.js');   //高版本的mqtt
var clientId=Math.random().toString(36).substring(2)   //生成随机身份码
const options={
  connectTimeout: 4000, // 超时时间
  clientId: clientId,
  username: '2hum4rm/driver',
  password: '6AuVtBfi1tQMhwk0',
}
const client  = mqtt.connect('wxs://2hum4rm.mqtt.iot.gz.baidubce.com/mqtt',options);
/*****************************************************************************/


App({
  globalData:{
    carNum:null,
    longitude: null,
    latitude: null,
    loginStatus:null,    //若司机下线，则该值为0，若在线，则值为1
  },

  

  checkUpdateVersion:function() {
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
    })
    
    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })
    
    updateManager.onUpdateFailed(function () {
      // 新版本下载失败
      wx.showModal({
        title: '更新提示',
        content: '新版本下载失败，待网络情况良好时将自动下载并更新'
      })
    })
  },
  
  connect:function(){    //与服务器建立连接
    client.on('connect',(e)=>{
      console.log("成功连接服务器");
      client.subscribe('location',{qos:0})
      console.log("成功订阅主题");
    })
  },

  reconnect:function(){
    client.on('reconnect',(e)=>{
      console.log("正在重连:")
    })
  },

  publish:function(message){     //向服务器发布消息
    client.publish('location', message)
  },

  receive:function(_id){   //接收服务器消息
    var that=this
    client.on('message', function (topic, message) {
      var t=message.toString()
      console.log("消息："+t)
      that.globalData.carNum=t.split(',')[0]
      that.globalData.longitude=t.split(',')[1]
      that.globalData.latitude=t.split(',')[2]
      that.globalData.loginStatus=t.split(',')[3]
    })
  },



  onLaunch: function () {
    var that=this;
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'testtest-6zkau',
        traceUser: true,
      });

      this.checkUpdateVersion();  //检查小程序是否有更新
      this.connect();   //连接MQTT服务器
      // this.receive();
    }
    


  },
  
  
})


