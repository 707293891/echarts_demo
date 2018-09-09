<template>
  <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 6}">
    <div :id="id" class="eh_div">
    </div>
    <div class="control">
        <el-tooltip content="编辑option">
          <i class="el-icon-edit cursor" @click="handleClick"></i>
        </el-tooltip>
      <el-tooltip content="查看option">
        <i class=" el-icon-view cursor" @click="handleClick"></i>
      </el-tooltip>

    </div>
  </el-col>
</template>

<script>

export default {
  name: 'ehShow',
  props: {
    id: {type: String, require: true},
    option: {type: Object, require: true}
  },
  methods: {
    handleClick () {
      this.$msgbox({
        title: 'option',
        message: JSON.stringify(this.$options.propsData.option),
        customClass: 'optionClass'
      })
    }
  },
  mounted () {
    // require('echarts/lib/chart/'+this.$route.params.type)
    let chart = this.$echarts.init(document.getElementById(this.$options.propsData.id))
    chart.setOption(this.$options.propsData.option)
    this.reszieArray.push(chart.resize)
  }
}
</script>

<style>
  .eh_div{
    height: 200px;
    border: 1px solid #20457b;
  }
  .control{
    width: 99%;
    border: 1px solid #20457b;
    text-align: center;
    color: white;
  }
  .cursor{
    cursor: pointer;
  }
  .optionClass{
    width: 90%;
  }
</style>
