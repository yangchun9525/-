// pages/baisibudejie/baisibudejie.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    appid: '17899',                             //请求所需的参数
    sign: '9208b4bf256a46c0b9f51f653ab6e8ae',   //请求所需的参数
    type: '10',                                 //请求所需的参数
    currentPage: 1,                             //请求所需的参数
    contentlist: [],                            //请求返回的数据列表
    refreshShow: false,                          //刷新的时候view是否展示
    loadMoreShow: false,                         //加载更多的时候view是否展示
  },
  onItemClick:function(e){
    // console.log(e);
    // var detailUrl = e.currentTarget.dataset.url;
    // console.log(detailUrl);
    // wx.navigateTo({

    //   url: '../detail/detail?detailUrl=' + detailUrl,

    //   success: function (res) {
    //   },

    //   fail: function () {
    //   },
    //   complete: function () {
    //   }
    // })
  },
  //图片点击事件
  imgYu: function (event) {
    var src = event.currentTarget.dataset.src;//获取data-src
    var imgs = [src];
    //图片预览
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: imgs // 需要预览的图片http链接列表
    })
  },
  //下拉刷新
  upper: function (e) {
    this.setData({
      refreshShow: true,
      currentPage: 1
    })
    e.target.dataset.appid = this.data.appid
    e.target.dataset.sign = this.data.sign
    e.target.dataset.type = this.data.type
    this.loadBuDeJieData(e);
  },
  //加载更多
  lower: function (e) {
    this.setData({
      loadMoreShow: true,
      currentPage: this.data.currentPage + 1
    })
    e.target.dataset.appid = this.data.appid
    e.target.dataset.sign = this.data.sign
    e.target.dataset.type = this.data.type
    this.loadBuDeJieData(e);
  },

  /**
   * 加载网络数据 
   * showapi_appid=17899
   * showapi_sign=9208b4bf256a46c0b9f51f653ab6e8ae
   * type=10
   */
  loadBuDeJieData: function (e) {
    var contentlist = this.data.contentlist;
    const self = this;
    wx.request({
      url: 'https://route.showapi.com/255-1',
      data: {
        showapi_appid: e.target.dataset.appid,
        showapi_sign: e.target.dataset.sign,
        type: e.target.dataset.type,
        page: self.data.currentPage
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (self.data.currentPage === 1) {
          setTimeout(() => {
            self.setData({
              contentlist: res.data.showapi_res_body.pagebean.contentlist,
              allPages: res.data.showapi_res_body.pagebean.allPages,
              currentPage: self.data.currentPage,
              refreshShow: false,
              loadMoreShow: false
            })
          }, 3000)
        } else {
          setTimeout(() => {
            self.setData({
              contentlist: contentlist.concat(res.data.showapi_res_body.pagebean.contentlist),
              allPages: res.data.showapi_res_body.pagebean.allPages,
              currentPage: self.data.currentPage,
              refreshShow: false,
              loadMoreShow: false
            })
          }, 3000)
        }


      }
    })
  },
  scroll: function (e) {
 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      refreshShow: true
    })
    const self = this;
    wx.request({
      url: 'https://route.showapi.com/255-1',
      data: {
        showapi_appid: self.data.appid,
        showapi_sign: self.data.sign,
        type: self.data.type,
        page: self.data.currentPage
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        setTimeout(() => {
          self.setData({
            contentlist: res.data.showapi_res_body.pagebean.contentlist,
            allPages: res.data.showapi_res_body.pagebean.allPages,
            currentPage: self.data.currentPage,
            refreshShow: false,
            loadMoreShow: false
          })
        }, 3000)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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

  }
})