<template>
  <div class="mesTab" v-show="show">
    <div class="title">
      <h2>{{text}}</h2>
      <i class="el-icon-close" @click="change"></i>
    </div>
    <div class="main">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="收入" prop="income">
          <el-input type="number" v-model="ruleForm.income" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="支出" prop="expend">
          <el-input type="number" v-model="ruleForm.expend" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="现金" >
          <el-input type="number" v-text='cashMoney' autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="收支描述" prop="remark">
          <el-input type="text" v-model="ruleForm.remark" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "mesTab",
  props: ["show"],
  data() {
    return {
      ruleForm: {
        income: "",
        expend: "",
        cash: '',
        remark: "",
        _id: ""
      },
      rules: {
        income: [
          { required: true, message: "收入金额不能为空", trigger: "blur" }
        ],
        expend: [
          { required: true, message: "支出金额不能为空", trigger: "blur" }
        ]
      },
      tit: ""
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.ruleForm.cash = this.cashMoney;
          if (this.tit == "修改") {
            this.edit = true;
            let { _id } = this.ruleForm;
            console.log(this.ruleForm);
            this.$axios
              .post(`/api/fund/edit/${_id}`, this.ruleForm)
              .then(result => {
                this.$message({
                  message: result.data,
                  type: "success"
                });
                this.resetForm(formName);
                this.change();
                this.$emit("update");
              });
          } else {
            this.$axios.post("/api/fund/add", this.ruleForm).then(result => {
              this.change();

              this.$message({
                message: result.data,
                type: "success"
              });
              this.resetForm(formName);
              this.$emit("update");
            });
          }
        } else {
          this.$message.error("请将数据补充完整！");
          return false;
        }
      });
    },
    resetForm(formName) {
      // 重置弹框
      this.$refs[formName].resetFields();
    },
    change() {
      //关闭弹框
      this.$emit("update:show", false);
    }
  },
  computed: {
    text() {
      return `${this.tit}资金信息`;
    },
    cashMoney(){
      return Number(this.ruleForm.income) - Number(this.ruleForm.expend) || 0;
    }
  }
};
</script>


<style lang="scss" scoped>
.mesTab {
  position: fixed;
  background-color: #fff;
  top: 50%;
  left: 50%;
  z-index: 21;
  transform: translate(-50%, -50%);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  width: 900px;
  .title {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    margin-bottom: 20px;
  }
  .main {
    padding: 10px 50px;
  }
}
</style>