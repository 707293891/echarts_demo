<template>
  <el-container>
    <el-header style="line-height: 60px;background-color:#545c64;">
      <el-dropdown @command="handleCommand">
        <el-button style="background-color: #545c64;border-color:#545c64;color: white; " circle icon="el-icon-setting">
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command='option'>添加图表</el-dropdown-item>
          <el-dropdown-item command='type'>添加类型</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div style="display: inline-block;margin-left: 48%;">
        <el-popover
          placement="bottom"
          width="400"
          trigger="hover">
          <div>
            <p>本页面用于展示echarts示例,主要有以下功能：</p>
            <p>1：直接获取option使用，点击图表下方<i class="el-icon-view"></i>可获取option</p>
            <p>2：为本页面增加echarts示例：通过添加option以及对应的type，来为本页面新增一个示例。option需采用JSON格式。</p>
            <p>3：为本页面增加echarts类型：通过type和type名字，来为左边菜单新增一个类型。</p>
          </div>
          <i class="el-icon-document" slot="reference" style="color: white;cursor: pointer;"></i>
        </el-popover>
      </div>
      <div style="float: right;">
        <a href="https://github.com/707293891/echarts_demo" target="_blank" style="color: white;">在github上查看</a>
      </div>
    </el-header>
    <el-container style="margin-top: 20px;">
      <el-aside width="200px">
        <el-menu
          background-color="#545c64"
          text-color="#fff"
          :router="true"
          default-active="0"
          active-text-color="#ffd04b">
          <el-menu-item v-for="(item, idx) in items" :key="item.id" :index="idx+''" :route="{name: 'index', params: {type: item.type } }">
            <i class="el-icon-setting"></i>
            <span slot="title">{{ item.name }}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <eh-example></eh-example>
      </el-main>
    </el-container>
    <el-dialog title="添加信息" :visible.sync="dialogFormVisible" style="text-align: center;">
      <el-form :model="form" ref="form1" v-show="form.addOption">
        <el-form-item label="option内容" :required="true"  prop="option">
          <el-input
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 8}"
            placeholder="请输入option内容，保证json格式"
            v-model.trim="form.option">
          </el-input>
        </el-form-item>
        <el-form-item label="类型" :required="true" prop="type">
          <el-select v-model="form.type" placeholder="请选择图表类型" style="width: 100%;">
            <el-option v-for="item in items" :value="item.type" :label="item.name" :key="item.type"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-form :model="form" ref="form2" v-if="form.addType">
        <el-form-item label="类型名称" :required="true" prop="typeName">
          <el-input v-model.trim="form.typeName" auto-complete="off" placeholder="如：饼图，柱状图，线型图"></el-input>
        </el-form-item>
        <el-form-item label="类型编码" :required="true" prop="type">
          <el-input v-model.trim="form.type" auto-complete="off" placeholder="如：pie，bar，line"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSave">确 定</el-button>
      </div>
    </el-dialog>
  </el-container>

</template>

<script>
import EhExample from '@/components/EhExample'
export default {
  name: 'Index',
  components: { EhExample },
  data () {
    return {
      items: [],
      form: {addOption: true, addType: false},
      dialogFormVisible: false
    }
  },
  methods: {
    handleCommand (command) {
      this.dialogFormVisible = true
      switch (command) {
        case 'option':
          this.form.addOption = true
          this.form.addType = false
          break
        case 'type':
          this.form.addOption = false
          this.form.addType = true
          break
      }
    },
    handleSave () {
      let _this = this
      let val = _this.form
      this.items.forEach((v) => {
        if (val.addType && (val.type === v.type || val.typeName === v.name)) {
          _this.$alert('已有相同类型的图表')
          val.type = null
        }
      })
      let fm = val.addOption ? 'form1' : 'form2'
      this.$refs[fm].validate((valid) => {
        if (valid) {
          if (_this.form.addOption) {
            _this.$addOption(val.option, val.type)
          } else if (_this.form.addType) {
            _this.$addType(val.type, val.typeName)
          }
          this.dialogFormVisible = false
        }
      })
    }
  },
  mounted () {
    let _this = this
    let query = new _this.$query('eh_type')
    query.ascending('order')
    query.find().then(function (results) {
      for (let i = 0; i < results.length; i++) {
        _this.items.push({
          id: results[i].id,
          type: results[i].get('type'),
          name: results[i].get('type_name')
        })
      }
    })
  }
}
</script>

<style scoped>

</style>
