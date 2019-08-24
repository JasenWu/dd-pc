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

    </section>
  </div>
</template>

<script>
import { postList, postDel } from '@models/posts'
import { dateFormat } from '@assets/js/tools'

export default {
  components: {
    'c-header': require('@views/components/header').default
  },
  data () {
    return {
      tableData: []

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

        retData.map((v, k) => {
          console.log('dateFormat(v.create_time)', dateFormat(v.create_time))

          v.create_time = dateFormat(v.create_time)
          v.update_time = dateFormat(v.update_time)
        })

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
