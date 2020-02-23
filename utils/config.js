
//配置域名,域名只修改此处。
//如果wordpress没有安装在网站根目录请加上目录路径,例如："www.watch-life.net/blog"
var DOMAIN = "55io.com";
var WEBSITENAME="但愿风雨来"; //网站名称
var PAGECOUNT='10'; //每页文章数目
var PAYTEMPPLATEID = 'pbOL19hJYrMVzUqaaKHt8dxU1u8PZqB9KfUO7G1a7Rg';//鼓励消息模版id
var REPLAYTEMPPLATEID = 'iOCTemfyfWDZcVx2qWahxitV2zWw7sPm_004QJQjtkU';//回复评论消息模版id
var ZANIMAGEURL = 'https://55io.com/assets/img/donate.jpg';//微信鼓励的图片链接，用于个人小程序的赞赏
var LOGO = "../../images/logo-icon.png"; // 网站的logo图片
//设置downloadFile合法域名,不带https ,在中括号([])里增加域名，格式：{id=**,domain:'www.**.com'}，用英文逗号分隔。
//此处设置的域名和小程序与小程序后台设置的downloadFile合法域名要一致。
var DOWNLOADFILEDOMAIN = [
    { id: 1, domain: '55io.com'}

];
 //首页图标导航
 //参数说明：'name'为名称，'image'为图标路径，'url'为跳转的页面，'redirecttype'为跳转的类型，apppage为本小程序的页面，miniapp为其他微信小程序,webpage为web-view的页面
 //redirecttype 是 miniapp 就是跳转其他小程序  url 为其他小程序的页面
 //redirecttype 为 apppage 就是跳转本小程序的页面，url为本小程序的页面路径
 //redirecttype 为 webpage 是跳转网址，是通过web-view打开网址，url就是你要打开的网址，不过这个网址的域名要是业务域名
 //'appid' 当redirecttype为miniapp时，这个值为其他微信小程序的appid，如果redirecttype为apppage，webpage时，这个值设置为空。
 //'extraData'当redirecttype为miniapp时，这个值为提交到其他微信小程序的参数，如果redirecttype为apppage，webpage时，这个值设置为空。
var INDEXNAV = [
  { id: '1', name: '排行', image: '../../images/uploads/ranking.jpg', url: '../hot/hot', redirecttype: 'apppage', appid: '', extraData: '' },
  { id: '2', name: '搜索', image: '../../images/uploads/search.jpg', url: '../search/search', redirecttype: 'apppage', appid: '', extraData: '' },
  { id: '3', name: '评论', image: '../../images/uploads/comment.png', url: '../comments/comments', redirecttype: 'apppage', appid: '', extraData: '' },
  {
    id: '4', name: '微博', image: '../../images/uploads/weibo.jpg', url: 'pages/profile/profile?nickname=摇滚的卡夫卡&amp;objectUid=3895095118', redirecttype: 'miniapp', appid: 'wx9074de28009e1111', extraData: '' },
  { id: '5', name: '关于', image: '../../images/uploads/me.jpg', url: '../about/about', redirecttype: 'apppage', appid: '', extraData: '' }
  // { id: '7', name: '小程序', image: '../../images/uploads/miniprogram.png', url: '../list/list?categoryID=1059', redirecttype: 'apppage', appid: '', extraData: '' },
  // { id: '8', name: '官网', image: '../../images/uploads/watch-life.png', url: 'https://55io.com', redirecttype: 'webpage', appid: '', extraData: '' },

  
];

export default {
  getDomain: DOMAIN,
  getWebsiteName: WEBSITENAME,  
  getPayTemplateId: PAYTEMPPLATEID,
  getPageCount: PAGECOUNT,
  getIndexNav: INDEXNAV,
  getReplayTemplateId: REPLAYTEMPPLATEID,  
  getZanImageUrl: ZANIMAGEURL, 
  getLogo: LOGO,
  getDownloadFileDomain: DOWNLOADFILEDOMAIN
}