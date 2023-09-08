<template>
  <div class="FileManager">
    <div class="h">文件管理</div>
    <div style="width: 1860px;height: 128px;">

      <form style="display: flex;">
        <span class="word">上传开始时间</span>
        <el-date-picker name="date1" v-model="value4" type="date" placeholder="请选择上传开始时间" style="margin-top: 20px;margin-left: 12px; width: 200px;height: 34px;"/>
        <span class="word2">上传结束时间</span>
        <el-date-picker name="date2" v-model="value3" type="date" placeholder="请选择上传结束时间" style="margin-top: 20px;margin-left: 12px; width: 200px;height: 34px;"/>
        <el-input  class="input1" placeholder="请输入备注" />
        <el-input  class="input2" placeholder="请输入上传人员" />
        <el-input  class="input3" placeholder="请输入文件" />
        <button class="but1">搜索</button>
        <button class="but2" type="reset">重置</button>
        <button class="but2">上传</button>

      </form>
      <div style="height: 704px;width: 1855px;">
        <el-table :data="tableData" class="table" :header-cell-style="{background:'rgba(43,86,249,0.2)',color:'#000000', height:'64px', fontSize:'20px'}" >
          <el-table-column prop="fileName" label="文件名" width="391px" />
          <el-table-column prop="uplodeDate" label="上传时间" width="440px" />
          <el-table-column prop="uplodeName" label="上传人员"  width="291px" />
          <el-table-column prop="remark" label="备注" width="559px" />
          <el-table-column  label="操作" width="148px" >
            <el-button class="but3">删除</el-button>
          </el-table-column>
        </el-table></div>
      <div class="p">
        <span class="pageWord">10条/页</span>
        <el-pagination background layout="prev, pager, next" :total="100" :page-size="pageSize" :current-page="currentPage" @current-change="handleCurrentChange" />
      </div>
    </div>

  </div>
</template>

<script>
import { ref } from 'vue'
const value4 = ref('')
const value3 = ref('')

export default {

  data(){
    return{
      currentPage:1,
      pageSize:10,
      value3,
      value4,
      tableData:[{

        fileName:'文件名',
        uplodeDate: '2023-5-8 10:54:20',

        uplodeName: '上传人员',
        remark: '无人机集群，编队控制方法，深度强化学习，群智算法，路径规划',
      },
        {
          fileName:'文件名',
          uplodeDate: '2023-5-8 10:54:20',

          uplodeName: '上传人员',
          remark: '无人机集群，编队控制方法，深度强化学习，群智算法，路径规划',
        },
        {
          fileName:'文件名',
          uplodeDate: '2023-5-8 10:54:20',

          uplodeName: '上传人员',
          remark: '无人机集群，编队控制方法，深度强化学习，群智算法，路径规划',
        },
        {
          fileName:'文件名',
          uplodeDate: '2023-5-8 10:54:20',

          uplodeName: '上传人员',
          remark: '无人机集群，编队控制方法，深度强化学习，群智算法，路径规划',
        },
        {
          fileName:'文件名',
          uplodeDate: '2023-5-8 10:54:20',

          uplodeName: '上传人员',
          remark: '无人机集群，编队控制方法，深度强化学习，群智算法，路径规划',
        },
        {
          fileName:'文件名',
          uplodeDate: '2023-5-8 10:54:20',

          uplodeName: '上传人员',
          remark: '无人机集群，编队控制方法，深度强化学习，群智算法，路径规划',
        },
        {
          fileName:'文件名',
          uplodeDate: '2023-5-8 10:54:20',

          uplodeName: '上传人员',
          remark: '无人机集群，编队控制方法，深度强化学习，群智算法，路径规划',
        },
        {
          fileName:'文件名',
          uplodeDate: '2023-5-8 10:54:20',

          uplodeName: '上传人员',
          remark: '无人机集群，编队控制方法，深度强化学习，群智算法，路径规划',
        },
        {
          fileName:'文件名',
          uplodeDate: '2023-5-8 10:54:20',

          uplodeName: '上传人员',
          remark: '无人机集群，编队控制方法，深度强化学习，群智算法，路径规划',
        },
        {
          fileName:'文件名',
          uplodeDate: '2023-5-8 10:54:20',

          uplodeName: '上传人员',
          remark: '无人机集群，编队控制方法，深度强化学习，群智算法，路径规划',
        },

      ]
    }
  },
  methods: {
    handleCurrentChange(page) {
      this.currentPage = page;
      this.tableData();
    },
  },
}
</script>
<style scoped>
*{
  margin: 0;
  padding: 0;
}
.FileManager{
  width: 1900px;
  height: 1024px;
  background: #FFFFFF;
  margin-top: 16px;
  margin-left: 10px;
  border: #F2F3F5 2px solid;
}
.h{
  width: 1860px;
  height: 69px;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
  border-bottom: 2px solid #DDDFE5;
  font-size: 24px;
  font-family: PingFang SC-Bold, PingFang SC;
  font-weight: bold;
  color: rgba(0,0,0,0.85);
  line-height: 69px;
  margin-left: 20px;
}
.but1{
  width: 60px;
  height: 34px;
  font-size: 14px;
  color:#FFFFFF ;
  background-color: #2B56F9;
  border-radius: 4px 4px 4px 4px;
  opacity: 1;
  border: 1px solid #2B56F9;
  border-radius: 4px;
  margin-top: 20px;
  margin-left: 18px;
}
.but2{
  width: 60px;
  height: 34px;
  font-size: 14px;
  color: #000000 ;
  font-size: 14px;
  background-color: #FFFFFF;
  border-radius: 4px 4px 4px 4px;
  opacity: 1;
  border: 1px solid #DDDFE5;
  border-radius: 4px;
  margin-top: 20px;
  margin-left: 18px;
}
.but3{
  width: 60px;
  height: 34px;
  font-size: 14px;
  color:#FF6333 ;
  background-color: #FFEFEB ;
  border-radius: 3px 3px 3px 3px;
  opacity: 1;
  border: 1px solid #FF6333 ;
  border-radius: 4px;
  margin-top: 0;
  margin-left: 0;
}

.word{
  white-space: nowrap;
  margin-top: 27px;
  margin-left: 122px;
  font-size: 16px;
  color: rgba(0,0,0,0.85);
}
.word2{
  white-space: nowrap;
  margin-top: 27px;
  margin-left: 18px;
  font-size: 16px;
  color: rgba(0,0,0,0.85);
}
.input1{
  width: 428px;height: 34px;
  background: #F2F3F5;
  border-radius: 4px 4px 4px 4px;
  opacity: 1;
  border: 1px solid #DDDFE5; margin-left: 18px;margin-top: 20px;
}
.input2{
  width: 200px;height: 34px;
  background: #F2F3F5;
  border-radius: 4px 4px 4px 4px;
  opacity: 1;
  border: 1px solid #DDDFE5; margin-left: 18px;margin-top: 20px;
}
.input3{
  width: 200px;height: 34px;
  background: #F2F3F5;
  border-radius: 4px 4px 4px 4px;
  opacity: 1;
  border: 1px solid #DDDFE5; margin-left: 18px;margin-top: 20px;
}
.table{
  width: 100%;margin-left: 26px;margin-top: 28px;
}
.pageWord{
  width: 52px;
  height: 20px;
  font-size: 14px;
  color: #000000;
  margin-left: 1327px;
  margin-right: 18px;
  line-height: 50px;
}
.p{
  display: flex;width: 1855px;
  height: 50px; margin-top: 38px;
}

</style>