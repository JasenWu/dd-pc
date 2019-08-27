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

        <el-form-item>
          <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />

            <i v-if="!imageUrl" class="el-icon-plus avatar-uploader-icon"></i>
            <i v-if="imageUrl && $route.query.id" class="el-icon-edit avatar-uploader-icon"></i>
          </el-upload>
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
import { postAdd, getDetail, postEdit, uploadUrl } from '@models/posts'
import { API_DOMAIN } from '@config/index'

export default {
  components: {
    'c-header': require('@views/components/header').default
  },
  data () {
    return {
      uploadUrl,
      postAddForm: {
        title: '',
        details: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 200, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        details: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      },
      imgBaseUrl: '',
      imageUrl: ''
    }
  },
  mounted () {
    this.initDetail()
  },
  methods: {
    handleAvatarSuccess (res, file) {
      console.log('res', res)
      let { retData } = res

      let imageUrl = API_DOMAIN + '/' + retData.basePath
      this.imgBaseUrl = retData.basePath
      this.imageUrl = imageUrl
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
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

          this.imageUrl = API_DOMAIN + '/' + retData.imageUrl
        })
      }
    },
    submitForm (formName) {
      // 新增
      const add = () => {
        this.$refs[formName].validate(valid => {
          if (valid) {
            let data = this.postAddForm
            postAdd({ imageUrl: this.imgBaseUrl, ...data }).then(
              ({ retCode, retMsg, retData }) => {
                if (retCode !== this.$api_code.SUCCESS) {
                  return false
                }
                this.$message.success(retMsg)
                this.$timeout(1000).then(() => {
                  this.$router.push({
                    name: 'posts'
                  })
                })
              }
            )
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
              id: this.$route.query.id,
              imageUrl: this.imgBaseUrl
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

<style lang="less">
.avatar-uploader {
  position: relative;
  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .el-icon-edit {
    position: absolute;
    left:0;
    top:0;
    bottom:0;
    right:0;
    z-index: 9;
    background:rgba(0, 0, 0, 0.5)

  }
  .el-upload:hover {
    border-color: #409eff;
  }
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
