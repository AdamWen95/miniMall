// components/tab-control/tab-control.js
Component({
  properties: {
    titles: {
      type: Array,
      value: []
    }
  },
  data: {
    currentIndex: 0
  },
  methods: {
    itemClick(event) {
      const index = event.currentTarget.dataset.index;
      this.setData({
        currentIndex: index
      })

      this.triggerEvent('itemClick', {index: index, title: this.properties.titles[index]}, {})
    }
  }
})
