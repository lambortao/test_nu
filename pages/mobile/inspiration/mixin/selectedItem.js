export default {
  model: {
    prop: 'selectedList',
    event: 'update:selectedList'
  },
  props: {
    selectedList: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    selectedItem (id) {
      const newData = this.selectedList
      const itemIndex = newData.indexOf(id)
      if (itemIndex > -1) {
        newData.splice(itemIndex, 1)
      } else {
        newData.push(id)
      }
      this.$emit('update:selectedList', newData)
    }
  }
}
