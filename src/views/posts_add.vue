<template>
  <div class="layout_posts_add">
    <c-header />

    <section class="global_ayout_content">
      <el-form
        :model="postAddForm"
        :rules="rules"
        ref="postAddForm"
        label-width="100px"
        class="add_post_form"
      >
        <el-form-item label="活动名称" prop="title">
          <el-input v-model="postAddForm.title"></el-input>
        </el-form-item>

        <el-form-item label="活动形式" prop="details">
          <el-input type="textarea" rows="15" v-model="postAddForm.details"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('postAddForm')">{{getBtnText()}}</el-button>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
import { postAdd, getDetail, postEdit } from '@models/posts'

export default {
  components: {
    'c-header': require('@views/components/header').default
  },
  data () {
    return {
      postAddForm: {
        title: '',
        details: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 200, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        details: [{ required: true, message: '请填写活动形式', trigger: 'blur' }]
      }
    }
  },
  mounted () {
    this.initDetail()
  },
  methods: {
    getBtnText () {
      let id = this.$route.query.id || null
      let txt = id ? 'Update' : 'Create'
      return txt
    },
    initDetail () {
      let id = this.$route.query.id || null
      if (id) {
        getDetail({ id }).then(({ retCode, retMsg, retData }) => {
          if (retCode !== this.$api_code.SUCCESS) {
            return false
          }
          this.postAddForm = {
            title: retData.title,
            details: retData.details
          }
        })
      }
    },
    submitForm (formName) {
      // 新增
      const add = () => {
        this.$refs[formName].validate(valid => {
          if (valid) {
            let data = this.postAddForm
            postAdd(data).then(({ retCode, retMsg, retData }) => {
              if (retCode !== this.$api_code.SUCCESS) {
                return false
              }
              this.$message.success(retMsg)
              this.$timeout(1000).then(() => {
                this.$router.push({
                  name: 'posts'
                })
              })
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }

      // 编辑
      const edit = () => {
        this.$refs[formName].validate(valid => {
          if (valid) {
            let data = {
              ...this.postAddForm,
              id: this.$route.query.id
            }
            postEdit(data).then(({ retCode, retMsg, retData }) => {
              if (retCode !== this.$api_code.SUCCESS) {
                return false
              }
              this.$message.success(retMsg)
              this.$timeout(1000).then(() => {
                this.$router.push({
                  name: 'posts'
                })
              })
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }

      let id = this.$route.query.id || null

      if (id) {
        console.log('edit')
        edit()
      } else {
        console.log('add')
        add()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.layout_posts_add {
  .add_post_form {
    max-width: 800px;
  }
}
</style>
