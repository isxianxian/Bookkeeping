<template>
  <div class="login">
    <div class="main">
      <h1>登陆</h1>
      <div class="form">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="邮箱" prop="email">
            <el-input type="email" v-model="ruleForm.email" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item style="text-align:center">
            <el-button type="primary" @click="submitForm">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>

        <p>
          现在还没有账号，赶紧去
          <span @click="register">注册</span> 吧！
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  background: url("../assets/img/bg.jpg") no-repeat center center;
  background-size: 100% 100%;
  position: relative;
  .main {
    position: absolute;
    top: 12%;
    left: 50%;
    transform: translateX(-50%);

    h1 {
      color: #fff;
      text-align: center;
      font-size: 26px;
      margin-bottom: 15px;
    }

    .form {
      width: 370px;
      padding: 25px 45px 20px 20px;
      border-radius: 7px;
      box-shadow: 0px 5px 10px #ccc;
      box-sizing: border-box;
      background-color: #fff;

      p {
        text-align: right;
        font-size: 12px;
        color: #606266;

        span {
          color: cornflowerblue;
          cursor: pointer;
        }
      }
    }
  }
}
</style>

<script>
import jwt_decode from "jwt-decode";

export default {
  name: "register",
  data() {
    return {
      ruleForm: {
        email: "",
        password: ""
      },
      rules: {
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          { type: "email", message: "请输入正确的邮箱地址", trigger: ["blur"] }
        ],
        password: [
          { required: true, message: "请正确输入密码", trigger: "blur" },
          { min: 6, message: "密码不应该少于六个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$axios
          .post('/api/users/login',this.ruleForm)
          .then((result)=>{
              this.$message({
                  message: '登陆成功',
                  type: 'success'
              });
              // 将eletoken存储在客户端本地。
              let eleToken = result.data.token;
              localStorage.setItem('eleToken',eleToken);
              // 将token解密，获取存储的信息，将信息放到vuex。
              let mes = jwt_decode(eleToken);
              this.isEmpty(mes)?mes=null:null;
              this.$store.dispatch('isAct' , Boolean(mes));
              this.$store.dispatch('mesAct' , mes);
              // 跳到具体的页面
              this.$router.push('/index');
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    register() {
      this.$router.push("/register");
    },
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    }
  }
};
</script>

