// pages/home/home.js
//这里必须是相对路径
import {getMultidata, getGoodsData} from '../../service/home.js'

const types = ['pop', 'new', 'sell'];
const topDistance = 1000;

Page({
  data: {
    banners: [],
    recommends: [],
    titles: ['流行','新款','精选'],
    goods: {
      'pop': {page: 0, list: []},
      'new': {page: 0, list: []},
      'sell': {page: 0, list: []}
    },
    currentType: 'pop',
    showBackTop: false,
    isTabFixed: false,
    tabScrollTop: 0
  },
  onLoad: function (options) {
    //请求轮播图和推荐的数据
    this._getMultidata();

    //请求商品数据
    this._getGoodsData('pop');
    this._getGoodsData('new');
    this._getGoodsData('sell');
  },
  //网络请求函数
  _getMultidata() {
    getMultidata().then(res => {
      // console.log(res);
      const banners = res.data.data.banner.list;
      const recommends = res.data.data.recommend.list;
      this.setData({
        banners: banners,
        recommends: recommends
      })
    })
  },
  _getGoodsData(type) {
    //获取页码
    const page = this.data.goods[type].page + 1;
    //发送请求
    getGoodsData(type, page).then(res => {
      // console.log(res)
      const list = res.data.data.list;
      const oldList = this.data.goods[type].list;
      oldList.push(...list);
      // this.data.goods[type].list.push(...list)
      // 注意这里的修改data中goods数据的方式
      const typeKey = `goods.${type}.list`;
      const pageKey = `goods.${type}.page`;
      this.setData({
        [typeKey]: oldList,
        [pageKey]: page
      })
    })
  },

  //recommend子组件的图片加载完成
  handleImageLoad() {
    //获取tab-control距离顶部的距离
    wx.createSelectorQuery().select('#tab-control').boundingClientRect(rect => {
      console.log(rect);
      this.setData({
        tabScrollTop: rect.top
      })
    }).exec()
  },

  handleItemClick(event) {
    console.log(event);
    const index = event.detail.index;
    //设置currentType
    this.setData({
      currentType: types[index]
    })
  },
  onReachBottom() {
    this._getGoodsData(this.data.currentType)
  },
  onPageScroll(options) {
    const scrollTop = options.scrollTop;
    // 不要在滚动的函数回调中频繁调用this.setData
    const flag = scrollTop >= topDistance;
    if (flag != this.data.showBackTop) {
      this.setData({
        showBackTop: flag
      })
    }
    const flag2 = scrollTop >= this.data.tabScrollTop;
    if (flag2 != this.data.isTabFixed) {
      this.setData({
        isTabFixed: flag2
      })
    }
  }
})