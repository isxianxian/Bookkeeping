<template>
  <div class="fund">
    <div class="top" width="1200px">
      <div class="screen">
        <span class="tit">按照时间筛选:</span>

        <el-date-picker
          v-model="time"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
        ></el-date-picker>

        <el-button type="primary" @click="screen">筛选</el-button>
      </div>

      <el-button type="primary" round @click="changeData('add')">添加按钮</el-button>
    </div>

    <div class="fundTable">
      <el-table
        :data="tableData" 
        height='410px'
        border
        show-summary
        :summary-method="getSummaries"
        :default-sort="{prop: 'date', order: 'descending' }"
      >
        <el-table-column prop="date" label="日期" sortable width="220" align="center">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.date|showDate }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="income"  label="收入" width="150" align="center" ref="income">
          <template slot-scope="scope">
            <span style="color:blue">{{ scope.row.income}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="expend" label="支出" width="150" align="center"></el-table-column>

        <el-table-column prop="cash" label="现金" width="150" align="center"></el-table-column>

        <el-table-column prop="remark" label="收支描述" width="150" align="center"></el-table-column>

        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              type="warning"
              size="mini"
              round
              style="padding:10px 15px"
              @click="changeData(scope.row)"
            >修改</el-button>
            <el-button
              type="danger"
              size="mini"
              round
              style="padding:10px 15px"
              @click="del(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="messageBox" v-show="tabShow">
      <MesTab :show.sync="tabShow" @update="getData" ref="mesTab"></MesTab>
    </div>

    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="allData.length"
      ></el-pagination>
    </div>

  </div>
</template>

<script>
import MesTab from "../components/MesTable.vue";

export default {
  name: "fund",
  created() {
    this.getData();
  },
  data() {
    return {
      tableData: [], // 页面显示的数据是根据tableData，那改变tableData就可以改变显示的。
      allData: [],
      tabShow: false,
      currentPage: 1,
      pageSize: 5,
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      time: "",
      length: ""
    };
  },
  methods: {
    changeData(...arg) {
      this.tabShow = true;
      if (arg[0] == "add") {
        this.$refs.mesTab.tit = "增加";
        this.$refs.mesTab.ruleForm = {
          income: "",
          expend: "",
          cash: "",
          remark: ""
        };
      } else {
        this.$refs.mesTab.tit = "修改";
        // 将此时的数据传给弹框，修改框中就有了数据。
        this.$refs.mesTab.ruleForm = JSON.parse(JSON.stringify(arg[0]));
      }
    },
    getData() {
      this.$axios.get("/api/fund/all").then(result => {
        this.allData = result.data.fund;
        this.tableData = this.allData.filter(
          (item, index) => index < this.pageSize
        );
      });
      //   this.length = this.allData.length;
    },
    del(index, { _id }) {
      this.$axios.delete(`/api/fund/del/${_id}`).then(result => {
        this.getData();
        this.$message({
          message: result.data,
          type: "success"
        });
      });
    },
    handleSizeChange(val) {
      // 改变每页的页数。
      this.currentPage = 1;
      this.tableData = this.allData.filter((item, index) => index < val);
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      // 点击index跳到指定页。
      this.tableData = [];
      this.allData.forEach((item, index) => {
        if (index < this.pageSize * val && index >= this.pageSize * (val - 1)) {
          this.tableData.push(item);
        }
      });
    },
    screen() {
      if (this.time.length == 2) {
        this.allData = this.allData.filter((item, index) => {
          let date = new Date(item.date);
          if (date > this.time[0] && date < this.time[1]) {
            return true;
          }
        });
        this.currentPage = 1;
        this.tableData = this.allData.filter(
          (item, index) => index < this.pageSize
        );
      } else {
        this.$message.error("请把日期选择完整！");
      }
    },
    getSummaries(param) {
        const { columns, data } = param;
        console.log(param.columns); // 
        console.log(param.data);  // 每一项的数据
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计';
            return;
          }
          if(index === 4){
              sums[index] = '';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] += ' 元';
          } else {
            sums[index] = '';
          }
        });

        return sums;
      }
  },
  filters: {
    showDate(val) {
      return new Date(val).toLocaleString();
    }
  },
  components: {
    MesTab  
  },
  watch: {
    time(newVal, oldVal) {
      if (!newVal) {
        this.getData();
      }
    }
  },
  computed: {
    users() {
      return this.$store.getters.mesGet;
    }
  }
};
</script>

<style lang="scss" scoped>
.fund {
  height: 100%;
  .top {
    width: 1100px;
    padding: 20px 50px 20px 0px;
    display: flex;
    justify-content: space-around;
    .screen {
      .tit {
        font-size: 14px;
        margin-right: 10px;
      }
      .el-range-editor.el-input__inner {
        margin: 0 20px;
      }
    }
  }
  .fundTable {
    margin: 10px 50px;
    width: 1100px;
    max-height: 410px;
    overflow: auto;
    border: 1px solid #f1f1f1;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
  .messageBox {
    width: calc(100% + 180px);
    height: calc(100% + 70px);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 20;
    background-color: rgba(153, 153, 153, 0.5);
  }
  .pagination {
    margin-top: 20px;
    width: 1100px;
    .el-pagination {
      float: right;
    }
  }
}
</style>
