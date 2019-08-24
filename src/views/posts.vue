<template>
  <div class="layout_posts">
    <c-header />

    <section class="layout_seach_wrap">
      <el-button @click="add" type="primary" size="small">Add</el-button>
    </section>

    <section class="global_ayout_content">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="序号" width="180"></el-table-column>
        <el-table-column prop="title" label="标题" width="180">
           <template slot-scope="scope">
             <router-link :to="{'name':'posts_add','query':{id:scope.row.id}}">{{scope.row.title}}</router-link>
           </template>
        </el-table-column>
        <el-table-column prop="details" label="详情"></el-table-column>
        <el-table-column prop="create_time" label="创建时间"></el-table-column>
        <el-table-column prop="update_time" label="更新时间"></el-table-column>
        <el-table-column label="操作" width="150">
           <template slot-scope="scope">
               <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
               <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
           </template>

        </el-table-column>
      </el-table>

      <section class="global_page_wrap">
        <el-pagination
        v-if="page.total"
        :page-size="page.size"
        :total="page.total"
        class="pagination"
        :current-page="page.page"
        background
        layout="prev, pager, next"
        @current-change="changePage"
         >
      </el-pagination>

      </section>

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
      tableData: [],
      page: {
        total: 0,
        size: 3,
        page: 1
      }

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

        let tmp = retData
        let pageStart = ((this.page.page || 1) - 1) * this.page.size
        this.tableData = tmp.slice(pageStart, pageStart + this.page.size).map((v, k) => {
          v.create_time = dateFormat(v.create_time)
          v.update_time = dateFormat(v.update_time)
          return v
        })
        this.page.total = retData.length || 0
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
    },
    // 分页重写
    changePage (p) {
      this.page.page = parseInt(p)
      this.postList()
      // this.getDatas();
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
   .global_ayout_content{
      a{
        text-decoration: none;
      }
    }

}
</style>
