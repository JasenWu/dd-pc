<template>
  <div class="layout_posts">

    <c-header />

    <section class="layout_content">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="日期" width="180"></el-table-column>
        <el-table-column prop="username" label="姓名" width="180"></el-table-column>
        <el-table-column prop="password" label="地址"></el-table-column>
      </el-table>

      <div class="demo-image__lazy">
        <el-image v-for="url in urls" :key="url" :src="url" lazy></el-image>
      </div>
    </section>

  </div>
</template>

<script>
import { getList } from '@models/user'
export default {
  components: {
    'c-header': require('@views/components/header').default
  },
  mounted () {
    this.getList()
  },
  data () {
    return {
      activeIndex: '1',
      tableData: [],
      fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
      url:
        'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      urls: [
        'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
        'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
        'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
        'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
        'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
        'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
        'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
      ]
    }
  },
  methods: {
    getList () {
      getList().then(({ retCode, retData }) => {
        if (retCode !== this.$api_code.SUCCESS) {
          return false
        }
        this.tableData = retData
      })
    },
    handleSelect (key, keyPath) {
      let config = {
        1: 'posts',
        2: 'users'
      }
      console.log('key', key)
      this.$router.push({
        name: config[key]
      })
    }

  }
}
</script>

<style lang="less" scoped>
.layout_posts{

  .layout_content{
    padding: 25px;

  }
}
</style>
