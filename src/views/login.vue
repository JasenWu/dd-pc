<template>
<section class="layout_login">

  <el-row :gutter="20">
    <el-col :span="6" :offset="9" :xs="{span:20,offset:2}">
      <div class="grid-content bg-purple">
          <h2 class="i_title">Please login</h2>
        <el-form ref="form" :model="form" label-width="0">
          <el-form-item label="">
            <el-input v-model="form.username" autocomplete="on" placeholder="UserName address" ></el-input>
          </el-form-item>
           <el-form-item label="">
            <el-input v-model="form.password" autocomplete="on" placeholder="Password address" ></el-input>
          </el-form-item>

          <el-form-item>
            <el-checkbox style="float:left;" v-model="form.remeberMe">Remeber Me</el-checkbox>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" class="i_button" @click="onSubmit">login</el-button>

          </el-form-item>
        </el-form>
      </div>
    </el-col>
  </el-row>
</section>
</template>
<script>
import { login } from '@models/user'
export default {

  data () {
    return {
      form: {
        username: '',
        password: '',
        remeberMe: false
      }
    }
  },
  methods: {
    onSubmit () {
      login({ ...this.form }).then(({ retCode, retMsg, retData }) => {
        if (retCode !== this.$api_code.SUCCESS) {
          return false
        }
        this.$message.success(retMsg)
        this.$router.push({
          name: 'posts'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.layout_login {
    height: 100%;

    background: #f5f3f3;

    .i_title{
        margin-bottom: 10px;
        margin-top:150px;
        text-align: left;
    }
  .i_button{
      width:100%;

  }
}
</style>

<style lang="scss" >
html,body,#app,.layout_login {
    overflow: hidden;
    height: 100%;

}
</style>
