<template>
  <div class="register">
    <div class="main">
      <h1>注册</h1>
      <div class="form">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="name">
            <el-input type="text" v-model="ruleForm.name" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="邮箱" prop="email">
            <el-input type="email" v-model="ruleForm.email" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="身份选择" prop="identity">
            <el-select v-model="ruleForm.identity" placeholder="请选择您的身份">
              <el-option label="管理员" value="manage"></el-option>
              <el-option label="员工" value="staff"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item style="text-align:center">
            <el-button type="primary" @click="submitForm">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>



<script>
export default {
  name: "register",
  data() {
    var check = (rule, value, callback) => {
      if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        name: "",
        email: "",
        password: "",
        checkPass: "",
        identity: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, message: "请至少输入两个字符", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          { type: "email", message: "请输入正确的邮箱地址", trigger: ["blur"] }
        ],
        password: [
          { required: true, message: "请正确输入密码", trigger: "blur" },
          { min: 6, message: "密码不应该少于两个字符", trigger: "blur" }
        ],
        checkPass: [
          { required: true, message: "请正确输入密码", trigger: "blur" },
          { validator: check, trigger: "blur" }
        ],
        identity: [{ required: true, message: "请选择身份", trigger: "change" }]
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {

          this.$axios
            .post("/api/users/register", this.ruleForm)
            .then(result => {
              this.$message({
                    message: result.data,
                    type: 'success'
                });
              //注册成功的提醒
              this.$router.push('/login');
            })

        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>


<style lang="scss" scoped>
.register {
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
    }
  }
}
</style>