<template>
  <div class="DocManager">
    <div class="main_header">
      <el-header style="margin-left: 20px">用户管理</el-header>
      <hr>
    </div>
    <div class="main_header">
      <div style="margin-top: -40px">
        <el-input style="width: 428px;
                    height: 34px;
                    background: #F2F3F5;
                    border-radius: 4px 4px 4px 4px;
                    opacity: 1;
                    border: 1px solid #DDDFE5; margin-left: 201px; margin-top: 20px;" v-model="search.summary" placeholder="请输入摘要" />
        <el-input v-model="search.keyword" style="width: 200px;
                    height: 34px;
                    background: #F2F3F5;
                    border-radius: 4px 4px 4px 4px;
                    opacity: 1;
                    border: 1px solid #DDDFE5; margin-left: 18px;margin-top: 20px;" placeholder="请输入关键词" />
        <el-input v-model="search.author" style="width: 200px;
                    height: 34px;
                    background: #F2F3F5;
                    border-radius: 4px 4px 4px 4px;
                    opacity: 1;
                    border: 1px solid #DDDFE5; margin-left: 18px;margin-top: 20px;" placeholder="请输入作者" />
        <el-input v-model="search.source" style="width: 200px;
                    height: 34px;
                    background: #F2F3F5;
                    border-radius: 4px 4px 4px 4px;
                    opacity: 1;
                    border: 1px solid #DDDFE5; margin-left: 18px;margin-top: 20px;" placeholder="请输入期刊来源" />
        <el-input v-model="search.filename" style="width: 200px;
                    height: 34px;
                    background: #F2F3F5;
                    border-radius: 4px 4px 4px 4px;
                    opacity: 1;
                    border: 1px solid #DDDFE5; margin-left: 18px;margin-top: 20px;" placeholder="请输入文件名称" />
        <el-input v-model="search.title" style="width: 200px;
                    height: 34px;
                    background: #F2F3F5;
                    border-radius: 4px 4px 4px 4px;
                    opacity: 1;
                    border: 1px solid #DDDFE5; margin-left: 18px;margin-top: 20px;" placeholder="请输入标题" />
        <el-button @click="LocalSearch()" type="primary" style="background: #2B56F9; margin-left: 18px;margin-top: 20px;width: 50px">搜索</el-button>
        <el-button style="margin-top: 20px;width: 50px;border: #F2F3F5 2px solid" @click="allClear()">重置</el-button>
      </div>
      <div>
        <div style="margin-top: 20px;margin-left: 1222px;">
          <span style="width: 96px;
                            height: 22px;
                            font-size: 16px;
                            font-family: PingFang SC-Medium, PingFang SC;
                            font-weight: 500;
                            color: rgba(0,0,0,0.85);
                            line-height: 19px; margin-right: 18px;">出版开始时间</span>
          <el-date-picker
              v-model="search.start"
              type="datetime"
              placeholder="请选择出版开始时间"
              format="YYYY/MM/DD"
              style="width: 200px;
                            height: 34px;
                            background: #F2F3F5;
                            border-radius: 4px 4px 4px 4px;
                            opacity: 1;
                            border: 1px solid #DDDFE5;"
          />
          <span style="width: 96px;
                            height: 22px;
                            font-size: 16px;
                            font-family: PingFang SC-Medium, PingFang SC;
                            font-weight: 500;
                            color: rgba(0,0,0,0.85);
                            line-height: 19px; margin-right: 18px;margin-left: 18px;">出版开始时间</span>
          <el-date-picker
              v-model="search.end"
              type="datetime"
              placeholder="请选择出版结束时间"
              format="YYYY/MM/DD"
              style="width: 200px;
                            height: 34px;
                            background: #F2F3F5;
                            border-radius: 4px 4px 4px 4px;
                            opacity: 1;
                            border: 1px solid #DDDFE5;"
          />
        </div>
      </div>
    </div>


    <el-dialog v-model="modify_password" style=" margin-top: 150px;" modal="false">
      <div class="dialog_title">修改密码</div>
      <div style="width: 910px;opacity: 1;border: 2px solid #DDDFE5;margin-bottom: 34px; margin-top: 20px;"></div>
      <el-form>
        <el-form-item label="请输入密码" :label-width="formLabelWidth" style="font-size: 14px;margin-left: 36px;" required="true">
          <el-input v-model="new_password_1" autocomplete="off" type="password" placeholder="请输入" style="width: 469px;
                  height: 34px;
                  background: #F2F3F5;
                  border-radius: 4px 4px 4px 4px;
                  opacity: 1;
                  border: 1px solid #DDDFE5;"/>
        </el-form-item>
        <el-form-item label="请再次输入密码" :label-width="formLabelWidth" style="font-size: 14px;margin-left: 9px;" required="true">
          <el-input v-model="new_password_2" autocomplete="off" placeholder="请输入" type="password" style="width: 469px;
                  height: 34px;
                  background: #F2F3F5;
                  border-radius: 4px 4px 4px 4px;
                  opacity: 1;
                  border: 1px solid #DDDFE5;"/>
        </el-form-item>
      </el-form>
      <template #footer>
              <span class="dialog-footer">
                <el-button type="primary" @click="ModifiedPassword()" style="width: 200px;height: 34px; background: #2B56F9;">
                  确认修改
                </el-button>
                <el-button @click="Clear()" style="width: 200px;
                    height: 34px;
                    background: #FFFFFF;
                    border-radius: 4px 4px 4px 4px;
                    opacity: 1;
                    border: 1px solid #DDDFE5;">清空</el-button>
              </span>
      </template>
    </el-dialog>


    <div class="main_center">
      <div>
        <el-table :data="tableData" stripe style="width: 100%; font-size: 20px;margin-top: 20px;" :header-cell-style="{background:'rgba(43,86,249,0.2)', color:'#000000', height:'64px',padding:'17px'}">
          <el-table-column label="标题名" width="388">
            <template #default="scope">
              <div style="display: flex; align-items: center">
                <span>{{ scope.row.title }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="作者" width="260">
            <template #default="scope">
              <div style="display: flex; align-items: center">
<!--                <span>{{ scope.row.author?scope.row.author.join(', '):'' }}</span>-->
                <span>{{ scope.row.author}}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="刊名" width="200" show-overflow-tooltip>
            <template #default="scope">
              <div style="display: flex; align-items: center">
                <span>{{ scope.row.source }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="出版时间" width="260" show-overflow-tooltip>
            <template #default="scope">
              <div>
                <span>{{ scope.row.pubTime }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="关键词" width="550" show-overflow-tooltip>
            <template #default="scope">
              <div style="display: flex; align-items: center; ">
                <span>{{ scope.row.keyword?scope.row.keyword.join(', '):'' }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #default="scope">
              <el-button size="small" @click="is_download(scope.row.id, scope.row.title)" style="width: 60px;
                                    height: 34px;
                                    background: #FFFFFF;
                                    border-radius: 4px 4px 4px 4px;
                                    opacity: 1;
                                    border: 1px solid #DDDFE5;" :disabled="isHigh"
              >下载</el-button
              >
              <el-button size="small" @click="preview(scope.row.md5)" style="width: 60px;
                                    height: 34px;
                                    background: #FFFFFF;
                                    border-radius: 4px 4px 4px 4px;
                                    opacity: 1;
                                    border: 1px solid #DDDFE5;"
              >预览</el-button
              >
              <el-button size="small" @click="detail(scope.row)" style="width: 60px;
                                    height: 34px;
                                    background: #FFFFFF;
                                    border-radius: 4px 4px 4px 4px;
                                    opacity: 1;
                                    border: 1px solid #DDDFE5;"
              >详情</el-button
              >

            </template>
          </el-table-column>
        </el-table>
        <el-drawer :data="current_row" v-model="drawer" :with-header="false" size="796">
          <div>
            <div class="drawer_windows">
              <span>{{ current_row.title }}</span>
            </div>
            <div class="close">
              <el-icon @click="close()"><Close /></el-icon>
            </div>
            <hr style="width: 776px;
                                height: 0px;
                                border-radius: 0px 0px 0px 0px;
                                opacity: 1;
                                border: 2px solid #DDDFE5;margin-top: 12px;">
            <div style="margin-top: 21px;width: 735px;
                                    height: 22px;
                                    font-size: 18px;
                                    color: #000000;
                                    line-height: 19px;
                                    ">
              <p><b>文件名：</b>{{ current_row.fileName }}</p>
            </div>
            <div style="margin-top: 28px;width: 735px;
                                    height: 22px;
                                    font-size: 18px;
                                    color: #000000;
                                    line-height: 19px;
                                    ">
              <p><b>标题名：</b>{{ current_row.title }}</p>
            </div>
            <div style="margin-top: 28px;width: 735px;
                                    height: 22px;
                                    font-size: 18px;
                                    color: #000000;
                                    line-height: 19px;">
              <p><b>作者：</b>{{ current_row.author?current_row.author.join(', '): ''}}</p>
            </div>
            <div style="margin-top: 28px;width: 735px;
                                    height: 22px;
                                    font-size: 18px;
                                    color: #000000;
                                    line-height: 19px;">
              <p><b>刊名：</b>{{ current_row.source }}</p>
            </div>
            <div style="margin-top: 28px;width: 735px;
                                    height: 22px;
                                    font-size: 18px;
                                    color: #000000;
                                    line-height: 19px;">
              <p><b>来源数据库：</b>{{ current_row.srcDatabase }}</p>
            </div>
            <div style="margin-top: 28px;width: 735px;
                                    height: 22px;
                                    font-size: 18px;
                                    color: #000000;
                                    line-height: 19px;">
              <p><b>出版时间：</b>{{ current_row.pubTime }}</p>
            </div>
            <div style="margin-top: 28px;width: 735px;
                                    height: 22px;
                                    font-size: 18px;
                                    color: #000000;
                                    line-height: 19px;">
              <p><b>关键词：</b>{{ current_row.keyword?current_row.keyword.join(', '):'' }}</p>
            </div>
            <div style="margin-top: 28px;width: 735px;
                                    height: 22px;
                                    font-size: 18px;
                                    color: #000000;
                                    line-height: 19px;">
              <p><b>摘要：</b>{{ current_row.summary }}</p>
            </div>
          </div>
        </el-drawer>
      </div>
    </div>
    <div class="main_footer">
      <el-pagination background layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
                     @current-change="handleCurrentChange" :current-page="currentPage"  :page-sizes="[10, 10]"
                     :page-size="pageSize" ></el-pagination>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ElMessage } from 'element-plus'


export default{
  data(){
    return{
      input:'',
      value1:'',
      tableData: [{
        "title":"111",
        "author":"222",
        "source":"333",
        "pubTime":"444"
      }],
      currentIndex: 0,
      currentPage: 1,
      pageSize: 10, // 每页的数据条数,
      instance:'',
      token:'',
      search:{
        keyword:'',
        pageSize: 1,
        author:'',
        summary:'',
        start:'',
        end:'',
        filename:'',
        title:'',
        order:'',
        pageOn:1,
        source:''
      },
      drawer:false,
      current_row:'',
      total:0,
      isAdmin:true,
      isHigh:true,
      modify_password:false,
      new_password_1:'',
      new_password_2:'',
    }
  },
  // methods:{
  //   login_exit(){
  //     this.$router.push({
  //       name: 'Login',
  //     })
  //
  //   },
  //
  //   go_managemnet(){
  //     this.$router.push({
  //       name: 'BackStage',
  //     })
  //   },
  //
  //   //每页条数改变时触发 选择一页显示多少行
  //   handleSizeChange(val) {
  //     this.currentPage = 1;
  //     this.pageSize = val;
  //   },
  //
  //   //当前页改变时触发 跳转其他页
  //   handleCurrentChange(val) {
  //     this.currentPage = val;
  //     this.LocalSearch();
  //   },
  //
  //   async init(){
  //     this.token = localStorage.getItem('token');
  //     this.instance = axios.create({
  //       baseURL: 'http://localhost:5173/api',
  //       timeout: 1000,
  //       headers: {'X-Custom-Header': 'foobar'}
  //     });
  //
  //     this.LocalSearch();
  //   },
  //
  //   LocalSearch(){
  //     this.search.pageSize = this.pageSize;
  //     this.search.pageOn = this.currentPage;
  //     this.instance({
  //       url: '/list',
  //       method: 'post',
  //       data:this.search,
  //       headers: { Authorization: this.token, 'Content-Type': 'application/json' }
  //     }).then((res)=>{
  //       console.log(res.data.data)
  //       this.tableData = res.data.data.list;
  //       this.total = res.data.data.total;
  //     });
  //   },
  //
  //   detail(row){
  //     this.drawer = true;
  //     this.current_row = row;
  //   },
  //
  //   close(){
  //     this.drawer = false;
  //   },
  //
  //   is_download(id, title){
  //     var url = '/download/' + id.toString();
  //     console.log(url)
  //     this.instance({
  //       url: url,
  //       method: 'get',
  //       headers: {Authorization: this.token},
  //       responseType:'blob',
  //     }).then((res) => {
  //       //模板下载
  //       let b = new Blob([res.data], {type: 'application/vnd.ms-excel'});
  //       let url = URL.createObjectURL(b);
  //       let link = document.createElement('a');
  //       link.download = title + '.pdf';
  //       link.href = url;
  //       link.click();
  //     });
  //   },
  //
  //   preview(md5){
  //     var url = '/preview/' + md5;
  //     this.instance({
  //       url: url,
  //       method: 'get',
  //       headers: {Authorization: this.token},
  //     }).then((res) => {
  //       console.log(res.data.data)
  //       window.open(res.data.data)
  //     });
  //   },
  //
  //   allClear(){
  //     this.search = {
  //       keyword:'',
  //       pageSize: 1,
  //       author:'',
  //       summary:'',
  //       start:'',
  //       end:'',
  //       filename:'',
  //       title:'',
  //       order:'',
  //       pageOn:1,
  //       source:''
  //     },
  //         this.LocalSearch();
  //   },
  //
  //   Clear() {
  //     this.new_password_1 = "";
  //     this.new_password_2 = "";
  //   },
  //
  //   ModifiedPassword(){
  //     if(this.new_password_1 != this.new_password_2){
  //       ElMessage({
  //         showClose: true,
  //         message: '两次密码输入不一致！',
  //         type: 'error',
  //       });
  //       this.Clear();
  //     }
  //     else{
  //       var data = {
  //         "username": localStorage.getItem('userName'),
  //         "password": localStorage.getItem('password'),
  //         "id": 0,
  //         "newPassword": this.new_password_1,
  //         "notes":'',
  //       }
  //       this.instance({
  //         url:'/reset/pwd',
  //         method:'post',
  //         headers: { Authorization: this.token, 'Content-Type': 'application/json' },
  //         data:data
  //       }).then((res) => {
  //         console.log('修改成功')
  //         ElMessage({
  //           type: "success",
  //           message: "修改成功",
  //         });
  //         this.modify_password = false;
  //       });
  //       this.Clear();
  //     }
  //
  //   }
  // },
  //
  // mounted(){
  //   this.init();
  //   this.isAdmin = localStorage.getItem('is_admin') == 'true'?true:false;
  //   console.log(this.isAdmin)
  //   this.isHigh = localStorage.getItem('is_user_high') == 'true'?true:false;
  //   console.log(this.isHigh)
  //   // this.modify_password = localStorage.getItem('is_first_login') == 'true'?true:false;
  //   // console.log(this.modify_password)
  // }
}
</script>


<style scoped>
*{
  margin:0;
  padding:0;
  border:0
}

.header{
  width: 100%;
  height: 86px;
  background: #2243BA;
  display: flex;
  justify-content: space-between;
}
.header h1{
  width: 144px;
  height: 50px;
  font-size: 36px;
  font-family: PingFang SC-Heavy, PingFang SC;
  font-weight: 800;
  color: #FFFFFF;
  line-height: 42px;
  margin-left: 39px;
  padding-top: 18px;
}

.main_header{
  font-size: 24px;
  font-family: PingFang SC-Bold, PingFang SC;
  font-weight: bold;
  color: rgba(0,0,0,0.85);
  line-height: 22px;
  width: 1900px;
  padding-top: 10px;
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
}

hr{
  width: 1860px;
  height: 0px;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
  border: 2px solid #DDDFE5;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: -20px;
}

.keyIcon{
  width: 52px;
  height: 54px;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;font-size: 70px; margin-top: 12px;
  margin-right: -5px;
}

.keyIcon:hover{
  cursor: pointer;
}

.exit{
  width: 52px;
  height: 54px;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;font-size: 70px; margin-top: 12px;
  margin-right: 20px;
}

.exit:hover{
  cursor: pointer;
}

.back_stage{
  width: 52px;
  height: 54px;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;font-size: 70px; margin-top: 12px;
  margin-right: 10px;
  margin-left: 15px;
}

.back_stage:hover{
  cursor: pointer;
}

.DocManager{
  width: 1900px;
  height: 974px;
  background: #FFFFFF;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
  margin-top: 10px;
  border: #ffffff solid;
  margin-left: 10px;
  box-shadow: inset 0 0 1px black;
}

.main_footer{
  margin-top: 100px;
}

.main_center span{
  font-size: 16px;
}

.close{
  margin-left: 740px;
  margin-top: -20px;
}

.close:hover{
  cursor: pointer;
}

.drawer_windows{
  width: 796px;
}

.drawer_windows span{
  width: 300px;
  height: 28px;
  font-size: 20px;
  font-family: PingFang SC-Bold, PingFang SC;
  font-weight: bold;
  color: rgba(0,0,0,0.85);
  line-height: 23px;
}

.dialog_title{
  width: 96px;
  height: 22px;
  font-size: 24px;
  font-family: PingFang SC-Bold, PingFang SC;
  font-weight: bold;
  color: rgba(0,0,0,0.85);
  line-height: 22px;
  margin-top: -30px;
}
</style>

<style>
.DocManager .el-pagination{
  float: right;
}

.DocManager .el-pager{
  height: 50px;
}

.DocManager .el-pager li.number{
  width: 50px;
  height: 50px;
  box-shadow: 0px 1px 6px 0px rgba(0,0,0,0.2);
  border-radius: 4px 4px 4px 4px;
  opacity: 1;
}
</style>