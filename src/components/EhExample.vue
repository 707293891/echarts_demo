<template>
  <el-row :gutter="20">
    <eh-show v-for="chart in charts" :option="chart.option" :id="chart.id" :key="chart.id"></eh-show>
  </el-row>
</template>

<script>
import ehShow from '@/components/EhShow'
export default {
  name: 'EhExample',
  components: { ehShow },
  data () {
    return {
      charts: []
    }
  },
  methods: {
    initEcharts (type) {
      type = type || 'line'
      let _this = this
      let query = new _this.$query('eh_option')
      query.equalTo('type', type)
      query.find().then(function (results) {
        _this.charts.splice(0, _this.charts.length)
        for (let i = 0; i < results.length; i++) {
          _this.charts.push({
            id: results[i].id,
            option: results[i].get('option')
          })
        }
      })
    }
  },
  watch: {
    '$route' (to, from) {
      this.initEcharts(to.params.type)
    }
  },
  mounted () {
    this.initEcharts(this.$route.params.type)
  }
}
</script>

<style scoped>

</style>
