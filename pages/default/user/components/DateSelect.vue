<template>
  <div class="date_box">
    <div>
      <select
        id=""
        name=""
      >
        <option
          v-for="(item,index) in yearList"
          :key="index"
          :value="item"
        >
          {{ item }}
        </option>
      </select>
      <select
        id=""
        name="month"
      >
        <option value="aa">
          aaa
        </option>
      </select>
      <select
        id=""
        name="day"
      >
        <option value="aa">
          aaa
        </option>
      </select>
    </div>
  </div>
</template>
<script>
export default {
  name: 'DateSelectComponent',
  data: () => ({
    year: '',
    month: '',
    day: '',
    yearList: [],
    monthList: ['1'],
    daysList: []
  }),
  mounted () {
    console.log(this.yearList)
  },
  methods: {
    initYearList () {
      const date = new Date()
      const year = date.getFullYear()
      // const month = date.getMonth() + 1
      // const day = date.getDate()
      this.getYearData(year)
    },
    getYearData (data) {
      const arra = []
      for (let i = 2000; i < data; i++) {
        arra.push(i)
      }
      // this.yearlist = arra
      return arra
    }
  }
}
</script>
