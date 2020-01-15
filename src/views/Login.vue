<template>
  <div class="w-screen h-screen flex justify-center items-center">
    <el-form
      ref="loginForm"
      :model="form"
      :rules="rules"
      @submit.native.prevent="login"
      class="login-form -mt-64"
    >
      <h1 class="font-bold text-3xl mb-8">{{ title }}</h1>
      <div class="mb-8 text-gray-500">{{ description }}</div>
      <el-form-item prop="mobile">
        <el-input
          size="normal"
          v-model.trim="form.mobile"
          placeholder="请输入手机号"
        />
      </el-form-item>
      <el-form-item prop="code">
        <el-input
          size="noraml"
          v-model.trim="form.code"
          placeholder="请输入验证码"
        >
          <template slot="append">
            <el-button :disabled="!isMobileValid(form.mobile)" @click="sendCode"
              >获取短信验证码</el-button
            >
          </template>
        </el-input>
      </el-form-item>
      <el-button
        class="w-full mt-8"
        type="primary"
        size="noraml"
        native-type="submit"
        >登录</el-button
      >
    </el-form>
  </div>
</template>

<script>
const MOBILE_PATTERN = /^1[345789]\d{9}$/

export default {
  name: 'Login',
  props: {
    title: {
      required: false,
      default: '管理后台',
      type: String,
    },
    description: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      form: {
        mobile: '',
        code: '',
      },
      rules: {
        mobile: [
          {
            required: true,
            message: '手机号不能为空',
            trigger: 'blur',
          },
          {
            validator: (rule, value, callback) => {
              if (this.isMobileValid(value)) {
                callback()
              }
              callback(new Error('手机号格式错误'))
            },
            trigger: 'blur',
          },
        ],
        code: [
          {
            required: true,
            message: '验证码不能为空',
            trigger: 'blur',
          },
        ],
      },
    }
  },

  methods: {
    isMobileValid(mobile) {
      return MOBILE_PATTERN.test(mobile)
    },
    sendCode() {
      this.$store.dispatch('sendCode', this.form.mobile).then(res => {
        console.log(res)
      })
    },
    login() {
      this.$refs.loginForm.validate(valid => {
        console.log(valid)
        if (valid)
          this.$store.dispatch('login', this.form).then(() => {
            this.$router.push(this.$route.query.redirect || '/')
          })
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.login-form {
  width: 400px;
}
</style>
