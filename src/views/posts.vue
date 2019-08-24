<template>
  <div class="layout_posts">
    <c-header />

    <section class="layout_seach_wrap">
      <el-button @click="add" type="primary" size="small">Add</el-button>
    </section>

    <section class="global_ayout_content">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="序号" width="180"></el-table-column>
        <el-table-column prop="title" label="标题" width="180"></el-table-column>
        <el-table-column prop="details" label="详情"></el-table-column>
        <el-table-column prop="create_time" label="创建时间"></el-table-column>
        <el-table-column prop="update_time" label="更新时间"></el-table-column>
        <el-table-column label="操作">
           <template slot-scope="scope">
               <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
               <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
           </template>

        </el-table-column>
      </el-table>

      <div class="demo-image__lazy">
        <el-image v-for="url in urls" :key="url" :src="url" lazy></el-image>
      </div>
    </section>
  </div>
</template>

<script>
import { postList, postDel } from '@models/posts'

export default {
  components: {
    'c-header': require('@views/components/header').default
  },
  data () {
    return {
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
  mounted () {
    this.postList()
  },
  methods: {
    postList () {
      postList().then(({ retData, retCode }) => {
        if (retCode !== this.$api_code.SUCCESS) {
          return false
        }

        this.tableData = retData || []
      })
    },
    handleEdit (index, row) {
      this.$router.push({
        name: 'posts_add',
        query: {
          id: row.id
        }
      })
    },
    handleDelete (index, row) {
      postDel({ id: row.id }).then(({ retData, retCode, retMsg }) => {
        if (retCode !== this.$api_code.SUCCESS) {
          return false
        }
        this.$message.success(retMsg)
        this.postList()
      })
    },
    add () {
      this.$router.push({
        name: 'posts_add'
      })
    }
  }
}
</script>

<style lang="less" scoped>
.layout_posts {
  .layout_seach_wrap{
    display: flex;
    padding: 20px;

  }

}
</style>
