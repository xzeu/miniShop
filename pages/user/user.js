var app = getApp();
// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  url: app.globalData.urlImages,
  userinfo:[],
  orderStatusNum:[],
  coupon:'',
  collect:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.setBarColor();
    app.setUserInfo();
    var header = {
      'content-type': 'application/x-www-form-urlencoded',
    };
    var that = this;
    wx.request({
      url: app.globalData.url + '/routine/auth_api/my?uid=' + app.globalData.uid,
      method: 'POST',
      header: header,
      success: function (res) {
        that.setData({
          userinfo: res.data.data,
          orderStatusNum: res.data.data.orderStatusNum
        })
        that.coupon();
        that.collect();
      }
    });
  },
  goNotification:function(){
      wx.navigateTo({
        url: '/pages/news-list/news-list',
      })
  },
  onShow: function () {
    var header = {
      'content-type': 'application/x-www-form-urlencoded',
    };
    var that = this;
    wx.request({
      url: app.globalData.url + '/routine/auth_api/my?uid=' + app.globalData.uid,
      method: 'POST',
      header: header,
      success: function (res) {
        that.setData({
          userinfo: res.data.data
        })
        that.coupon();
        that.collect();
      }
    });
  },  
   /**
   * 生命周期函数--优惠卷个数
   */
  coupon: function () {
    var header = {
      'content-type': 'application/x-www-form-urlencoded',
    };
    var that = this;
    wx.request({
      url: app.globalData.url + '/routine/auth_api/get_use_coupons?uid=' + app.globalData.uid,
      data:{types:0},
      method: 'GET',
      header: header,
      success: function (res) {    
        that.setData({
          coupon: res.data.data.length
        })
      }
    })
  },
   /**
   * 生命周期函数--收藏个数
   */
  collect: function () {
    var header = {
      'content-type': 'application/x-www-form-urlencoded',
      'cookie': app.globalData.sessionId//读取cookie
    };
    var that = this;
    wx.request({
      url: app.globalData.url + '/routine/auth_api/get_user_collect_product?uid=' + app.globalData.uid,
      method: 'GET',
      header: header,
      success: function (res) {
        that.setData({
          collect: res.data.data.length
        })
      }
    })
  },
   /**
   * 生命周期函数--我的余额
   */
  money:function(){
    wx.navigateTo({
      url: '/pages/main/main?now=' + this.data.userinfo.now_money + '&uid='+app.globalData.uid,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
   /**
   * 生命周期函数--我的积分
   */
  integral: function () {
    wx.navigateTo({
      url: '/pages/integral-con/integral-con?inte=' + this.data.userinfo.integral + '&uid=' + app.globalData.uid,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
   /**
   * 生命周期函数--我的优惠卷
   */
  coupons: function () {
    wx.navigateTo({
      url: '/pages/coupon/coupon',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
   /**
   * 生命周期函数--我的收藏
   */
  collects: function () {
    wx.navigateTo({
      url: '/pages/collect/collect',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
   /**
   * 生命周期函数--我的推广人
   */
  extension:function(){
    wx.navigateTo({
      url: '/pages/feree/feree',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
   /**
   * 生命周期函数--我的推广
   */
  myextension: function () {
    wx.navigateTo({
      url: '/pages/extension/extension',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
   /**
   * 生命周期函数--我的砍价
   */
  cut_down_the_price:function(){
    wx.navigateTo({
      url: '../../pages/feree/feree',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  }
})