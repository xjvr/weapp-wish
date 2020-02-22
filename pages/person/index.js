import config from '../../utils/config.js'
var Api = require('../../utils/api.js');
var util = require('../../utils/util.js');
var Auth = require('../../utils/auth.js');
var WxParse = require('../../wxParse/wxParse.js');
var wxApi = require('../../utils/wxApi.js')
var wxRequest = require('../../utils/wxRequest.js');
var app = getApp();
var webSiteName = config.getWebsiteName;
var domain = config.getDomain

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showerror: "none",
    shownodata: "none",
    subscription: "",
    userInfo: {},
    userLevel: {},
    openid: '',
    isLoginPopup: false,
    webSiteName: webSiteName,
    domain: domain,
 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    Auth.setUserInfoData(self);
    Auth.checkLogin(self);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var self = this;
    Auth.checkSession(self, 'isLoginNow');
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log(this.data.userInfo)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var title = "分享我在“" + config.getWebsiteName + "浏览、评论、点赞、鼓励的文章";
    var path = "pages/readlog/readlog";
    return {
      title: title,
      path: path,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },

  /**
   * 自定义
   */
  agreeGetUser: function (e) {
    let self = this;
    Auth.checkAgreeGetUser(e, app, self, '0');

  },

  refresh: function (e) {
    var self = this;
    if (self.data.openid) {
      var args = {};
      var userInfo = e.detail.userInfo;
      args.openid = self.data.openid;
      args.avatarUrl = userInfo.avatarUrl;
      args.nickname = userInfo.nickName;
      var url = Api.getUpdateUserInfo();
      var postUpdateUserInfoRequest = wxRequest.postRequest(url, args);
      postUpdateUserInfoRequest.then(res => {
        if (res.data.status == '200') {
          var userLevel = res.data.userLevel;
          wx.setStorageSync('userInfo', userInfo);
          wx.setStorageSync('userLevel', userLevel);
          self.setData({ userInfo: userInfo });
          self.setData({ userLevel: userLevel });
          wx.showToast({
            title: res.data.message,
            icon: 'success',
            duration: 900,
            success: function () {
            }
          })
        }
        else {
          wx.showToast({
            title: res.data.message,
            icon: 'success',
            duration: 900,
            success: function () {
            }
          })
        }
      });
    }
    else {
      Auth.checkSession(self, 'isLoginNow');

    }

  },
  praise: function () {
    var src = config.getZanImageUrl;
    console.log(src)
    wx.previewImage({
      urls: [src],
    });
  },
  login() {
    let { userId, nickName } = this.data
    if (!userId) {
      this.openLoginPopup()
    }
  },
  exit: function (e) {
    Auth.logout(this);
    wx.reLaunch({
      url: '../index/index'
    })
  },
  clear: function (e) {

    Auth.logout(this);

  },
  closeLoginPopup() {
    this.setData({ isLoginPopup: false });
  },
  openLoginPopup() {
    this.setData({ isLoginPopup: true });
  }
  ,
  confirm: function () {
    this.setData({
      'dialog.hidden': true,
      'dialog.title': '',
      'dialog.content': ''
    })
  },

})