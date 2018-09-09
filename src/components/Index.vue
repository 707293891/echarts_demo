<template>
  <el-container>
    <el-header>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          background-color="#545c64"
          text-color="#fff"
          :router="true"
          :default-active="0"
          active-text-color="#ffd04b">
          <el-menu-item v-for="(item, idx) in items" :key="item.id" :index="idx+''" :route="{name: 'Second', params: {type: item.type } }">
            <i class="el-icon-setting"></i>
            <span slot="title">{{ item.name }}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <eh-example></eh-example>
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
import EhExample from '@/components/EhExample'
export default {
  name: 'Index',
  components: { EhExample },
  data () {
    return {
      items: []
    }
  },
  methods: {
    handleClick (type) {
      this.$router.push({name: 'Second', params: { type: type }})
    }
  },
  mounted () {
    let _this = this
    let query = new _this.$query('eh_type')
    query.ascending('createdAt')
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
