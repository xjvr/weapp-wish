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

  data: {
    readLogs: [],
    topBarItems: [
      // id name selected 选中状态
      {
        id: '1',
        name: '浏览',
        selected: true
      },
      {
        id: '2',
        name: '评论',
        selected: false
      },
      {
        id: '3',
        name: '点赞',
        selected: false
      },
      {
        id: '4',
        name: '鼓励',
        selected: false
      },
      {
        id: '5',
        name: '订阅',
        selected: false
      },
      // { id: '6', name: '言论', selected: false }
    ],
    cate: '1',
    type: '',
    showerror: "none",
    shownodata: "none",
    subscription: "",
    userInfo: {},
    userLevel: {},
    openid: '',
    webSiteName: webSiteName,
    domain: domain
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var self = this;
    Auth.setUserInfoData(self);
    Auth.checkLogin(self);

    if (options.cate != null && options.cate != '') {
      
      var title = "全部记录";
      switch (options.cate) {
        case '1':
          title = "浏览";
          break;
        case '2':
          title = "评论";
          break;
        case '3':
          title = "点赞";
          break;
        case '4':
          title = "赞赏";
          break;
        case '5':
          title = "订阅";
          break;
      }
      self.setData({
        cate: options.cate,
        type: title
      });

      wx.setNavigationBarTitle({
        title: '我的' + title
      })
      self.fetchPostsData(self.data.cate);
      console.log(this.data.readLogs)

    }
  },

  onReady: function() {},

  // 跳转至查看文章详情
  redictDetail: function(e) {
    // console.log('查看文章');
    var id = e.currentTarget.id;
    var itemtype = e.currentTarget.dataset.itemtype;
    var url = "";
    if (itemtype == "1") {
      url = '../list/list?categoryID=' + id;
    } else {
      url = '../detail/detail?id=' + id;

    }

    wx.navigateTo({
      url: url
    })
  },

  onShareAppMessage: function() {
    var title = "分享我在“" + config.getWebsiteName + this.data.type + "的文章";
    var path = "pages/readlog/readlog";
    return {
      title: title,
      path: path,
      success: function(res) {
        // 转发成功
      },
      fail: function(res) {
        // 转发失败
      }
    }
  },

  fetchPostsData: function(cate) {
    self = this;
    self.setData({
      showerror: 'none',
      shownodata: 'none'
    });
    var count = 0;
    var openid = "";
    if (cate != '1') {
      if (self.data.openid) {
        var openid = self.data.openid;
      } else {
        Auth.checkSession(self, 'isLoginNow');
        return;
      }
    }
    if (cate == '1') {
      self.setData({
        readLogs: (wx.getStorageSync('readLogs') || []).map(function(log) {
          count++;
          return log;
        })
      });
      if (count == 0) {
        self.setData({
          shownodata: 'block'
        });
      }
    } else if (cate == '2') {
      self.setData({
        readLogs: []
      });
      var getMyCommentsPosts = wxRequest.getRequest(Api.getWeixinComment(openid));
      getMyCommentsPosts.then(response => {
        if (response.statusCode == 200) {
          self.setData({
            readLogs: self.data.readLogs.concat(response.data.data.map(function(item) {
              count++;
              item[0] = item.post_id;
              item[1] = item.post_title;
              return item;
            }))
          });
          console.log(this.data.readLogs)
          if (count == 0) {
            self.setData({
              shownodata: 'block'
            });
          }
        } else {
          console.log(response);
          self.setData({
            showerror: 'block'
          });

        }
      })
    } else if (cate == '3') {
      self.setData({
        readLogs: []
      });
      var getMylikePosts = wxRequest.getRequest(Api.getMyLikeUrl(openid));
      getMylikePosts.then(response => {
        if (response.statusCode == 200) {
          self.setData({
            readLogs: self.data.readLogs.concat(response.data.data.map(function(item) {
              count++;
              item[0] = item.post_id;
              item[1] = item.post_title;
              item[2] = "0";
              return item;
            }))
          });

          if (count == 0) {
            self.setData({
              shownodata: 'block'
            });
          }
        } else {
          console.log(response);
          self.setData({
            showerror: 'block'
          });

        }
      })

    } else if (cate == '4') {
      self.setData({
        readLogs: []
      });

      var getMyPraisePosts = wxRequest.getRequest(Api.getMyPraiseUrl(openid));
      getMyPraisePosts.then(response => {
        if (response.statusCode == 200) {
          self.setData({
            readLogs: self.data.readLogs.concat(response.data.data.map(function(item) {
              count++;
              item[0] = item.post_id;
              item[1] = item.post_title;
              item[2] = "0";
              return item;
            }))
          });
          if (count == 0) {
            self.setData({
              shownodata: 'block'
            });
          }
        } else {
          console.log(response);
          this.setData({
            showerror: 'block'
          });
        }
      })
    } else if (cate == '5') {
      self.setData({
        readLogs: []
      });
      var url = Api.getSubscription() + '?openid=' + openid;
      var getMysubPost = wxRequest.getRequest(url);
      getMysubPost.then(response => {
        if (response.statusCode == 200) {
          var usermetaList = response.data.usermetaList;
          if (usermetaList) {
            self.setData({
              readLogs: self.data.readLogs.concat(usermetaList.map(function(item) {
                count++;
                item[0] = item.ID;
                item[1] = item.post_title;
                item[2] = "0";
                return item;
              }))
            });
          }
          if (count == 0) {
            self.setData({
              shownodata: 'block'
            });
          }
        } else {
          console.log(response);
          this.setData({
            showerror: 'block'
          });
        }
      })


    } else if (cate == '6') {
      self.setData({
        readLogs: []
      });
      var getNewComments = wxRequest.getRequest(Api.getNewComments());
      getNewComments.then(response => {
        if (response.statusCode == 200) {
          self.setData({
            readLogs: self.data.readLogs.concat(response.data.map(function(item) {
              count++;
              item[0] = item.post;
              item[1] = util.removeHTML(item.content.rendered + '(' + item.author_name + ')');
              item[2] = "0";
              return item;
            }))
          });
          if (count == 0) {
            self.setData({
              shownodata: 'block'
            });
          }

        } else {
          console.log(response);
          self.setData({
            showerror: 'block'
          });

        }
      }).catch(function() {
        console.log(response);
        self.setData({
          showerror: 'block'
        });

      })
    }
  },
})