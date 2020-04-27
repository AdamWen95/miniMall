// pages/home/childComps/recommend/recommend.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    recommends: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    //图片加载是否完成（一张完成了就行）
    isLoad: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleImageLoad() {
      if (!this.data.isLoad) {
        this.triggerEvent('imageLoad');
        // this.setData({
        //   isLoad: true
        // })
        //界面不需要刷新，因此可以直接改
        this.data.isLoad = true;
      }
    }
  }
})
