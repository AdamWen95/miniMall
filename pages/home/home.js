// pages/home/home.js
//这里必须是相对路径
import {getMultidata} from '../../service/home.js'
Page({
  data: {
    banners: [],
    recommends: []
  },
  onLoad: function (options) {
    //请求轮播图和推荐的数据
    getMultidata().then(res => {
      console.log(res);
      const banners = res.data.data.banner.list;
      const recommends = res.data.data.recommend.list;
      this.setData({
        banners: banners,
        recommends: recommends
      })
    })
  }
})