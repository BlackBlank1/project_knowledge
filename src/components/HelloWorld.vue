<template>
  <div style="display: flex;flex-wrap: wrap;">
    <div class="header">
      <img src="../images/logo.png" alt="">
      <h1>本地文献检索</h1>
    </div>
    <div class="main">
      <el-container>
        <div class="main_header">
          <el-header>管理员后台</el-header>
          <hr>
        </div>
        <div class="search">
          <div style="margin-left: 1043px;margin-top: 20px;">
            <el-select v-model="character" placeholder="请选择角色" class="select_character">
            <el-option label="管理员" value="1" />
            <el-option label="系统管理" value="2" />
            <el-option label="高级用户" value="3" />
            <el-option label="普通用户" value="4" />
            </el-select>
          </div>
          <div style="margin-left: 18px;margin-top: 20px; width: 277px;height: 34px;">
            <el-input
                v-model="input"
                class="w-50 m-2"
                placeholder="请输入用户名"
                :prefix-icon="Search"
              />
          </div>
          <div>
            <el-upload :file-list="fileList" :auto-upload="false" multiple>
              <template #trigger>
                <el-button type="primary" style="width: 96px;height: 34px;margin-top: 20px;margin-left: 18px;background: #FFFFFF;color: rgba(0,0,0,0.65);border: 1px solid #DDDFE5;" @click="submitUpload">批量上传</el-button>
              </template>
            </el-upload>
          </div>
          <div>
            <el-button type="primary" style="width: 96px;height: 34px;margin-top: 20px;margin-left: 18px;background: #FFFFFF;color: rgba(0,0,0,0.65);border: 1px solid #DDDFE5;" @click="Multiple_Selected" v-if="out_download">批量下载</el-button>
            <el-button type="primary" style="width: 96px;height: 34px;margin-top: 20px;margin-left: 18px;background: #FFFFFF;color: rgba(0,0,0,0.65);border: 1px solid #DDDFE5;" @click="Download" v-if="is_download">下载</el-button>
          </div>
          <div>
            <el-button text @click="dialogFormVisible = true" style="color: #ffffff;width: 96px;height: 34px;background: #2B56F9;border-radius: 4px 4px 4px 4px;opacity: 1;border: 1px solid #2B56F9;margin-top: 20px;margin-left: 18px;">
              新建用户
            </el-button>
            <el-dialog v-model="dialogFormVisible" style=" margin-top: 150px;">
              <div class="dialog_title">新建用户</div>
              <div style="width: 910px;opacity: 1;border: 2px solid #DDDFE5;margin-bottom: 34px; margin-top: 20px;"></div>
              <el-form :model="form">
                <el-form-item label="用户名" :label-width="formLabelWidth" style="font-size: 14px;margin-left: 9px;" required="true">
                  <el-input v-model="form.user_name " autocomplete="off" placeholder="请输入用户名" style="width: 469px;
                    height: 34px;
                    background: #F2F3F5;
                    border-radius: 4px 4px 4px 4px;
                    opacity: 1;
                    border: 1px solid #DDDFE5;"/>
                </el-form-item>
                <el-form-item label="角色" :label-width="formLabelWidth" style="margin-left: 23px;" required="true">
                  <el-select v-model="form.character" placeholder="请选择角色" style="width: 469px;
                      height: 34px;
                      background: #F2F3F5;
                      opacity: 1;" >
                    <el-option label="管理员" value="管理员" />
                    <el-option label="系统管理员" value="系统管理员" />
                    <el-option label="高级用户" value="高级用户" />
                    <el-option label="普通用户" value="普通用户" />
                  </el-select>
                </el-form-item>
                <el-form-item label="备注" :label-width="formLabelWidth" style="margin-left: 23px;" required="true">
                  <el-input type="textarea" v-model="form.remark" maxlength="500" resize="none" :rows="5" class="textarea-box" placeholder="请输入备注"></el-input>
                </el-form-item>
              </el-form>
              <template #footer>
                <span class="dialog-footer">
                  <el-button type="primary" @click="createUser()" style="width: 200px;height: 34px; background: #2B56F9;">
                    新建用户
                  </el-button>
                  <el-button @click="create_user_clear()" style="width: 200px;height: 34px;">清空</el-button>
                </span>
              </template>
            </el-dialog>
          </div>
        </div>

        <!-- 表格主体 -->
        <el-main>
          <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" style="width: 100%; font-size: 20px;" :header-cell-style="{background:'rgba(43,86,249,0.2)', color:'#000000', height:'64px',padding:'17px'}">
            <el-table-column v-if="multiple_selected" type="selection" style="margin-left: 100px;"></el-table-column>
            <el-table-column label="用户名" width="294">
              <template #default="scope">
                <div style="display: flex; align-items: center">
                  <span>{{ scope.row.user_name }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="创建时间" width="294">
              <template #default="scope">
                <div style="display: flex; align-items: center">
                  <span>{{ scope.row.create_date }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="更改时间" width="294" show-overflow-tooltip>
              <template #default="scope">
                <div style="display: flex; align-items: center">
                  <span>{{ scope.row.modify_date }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="角色" width="294" show-overflow-tooltip>
              <template #default="scope">
                <div style="display: flex; align-items: center">
                  <span>{{ scope.row.character }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="备注" width="400" show-overflow-tooltip>
              <template #default="scope">
                <div style="display: flex; align-items: center; ">
                  <span>{{ scope.row.remark }}</span>
                </div>
              </template>
            </el-table-column>
            <!-- 操作按钮 -->
            <el-table-column label="操作">
              <template #default="scope">
                <el-button size="small" @click="handleEdit(scope.$index, scope.row)" style="width: 60px;
                    height: 34px;
                    background: #FFFFFF;
                    border-radius: 4px 4px 4px 4px;
                    opacity: 1;
                    border: 1px solid #DDDFE5;"
                  >编辑</el-button
                >
                <el-button
                  size="small"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)" style="width: 60px;
                  height: 34px;
                  background: #FFEFEB;
                  border-radius: 4px 4px 4px 4px;
                  opacity: 1;
                  border: 1px solid #FF6333; color: #FF6333;font-size: 14px;margin-left: 11px;"
                  >删除</el-button
                >
              </template>
            </el-table-column>
        </el-table>
          
          <!-- 编辑弹窗 -->
          <el-dialog v-model="editFormVisible" style=" margin-top: 150px;" modal="false">
            <div class="dialog_title">编辑用户</div>
            <div style="width: 910px;opacity: 1;border: 2px solid #DDDFE5;margin-bottom: 34px; margin-top: 20px;"></div>
            <el-form :model="currentForm">
              <el-form-item label="用户名" :label-width="formLabelWidth" style="font-size: 14px;margin-left: 9px;" required="true">
                <el-input v-model="currentForm.user_name " autocomplete="off" placeholder="请输入用户名" style="width: 469px;
                  height: 34px;
                  background: #F2F3F5;
                  border-radius: 4px 4px 4px 4px;
                  opacity: 1;
                  border: 1px solid #DDDFE5;"/>
              </el-form-item>
              <el-form-item label="角色" :label-width="formLabelWidth" style="margin-left: 23px;" required="true">
                <el-select v-model="currentForm.character" placeholder="请选择角色" style="width: 469px;
                    height: 34px;
                    background: #F2F3F5;
                    opacity: 1;" >
                  <el-option label="管理员" value="管理员" />
                  <el-option label="系统管理员" value="系统管理员" />
                  <el-option label="高级用户" value="高级用户" />
                  <el-option label="普通用户" value="普通用户" />
                </el-select>
              </el-form-item>
              <el-form-item label="备注" :label-width="formLabelWidth" style="margin-left: 23px;" required="true">
                <el-input type="textarea" v-model="currentForm.remark" maxlength="500" resize="none" :rows="5" class="textarea-box" placeholder="请输入备注"></el-input>
              </el-form-item>
            </el-form>
            <template #footer>
              <span class="dialog-footer">
                <el-button type="primary" @click="Edit()" style="width: 200px;height: 34px; background: #2B56F9;">
                  完成
                </el-button>
                <el-button @click="Clear()" style="width: 200px;height: 34px;">清空</el-button>
              </span>
            </template>
          </el-dialog>

      </el-main>
      <el-footer>
        <el-pagination background layout="total, sizes, prev, pager, next, jumper" :total="100" @size-change="handleSizeChange" 
        @current-change="handleCurrentChange" :current-page="currentPage"  :page-sizes="[8, 16]"
        :page-size="pageSize" ></el-pagination>
      </el-footer>
      <!-- <router-link to="/" type="primary" style="width: 100px;height: 100px;margin-left: 600px;">跳转登录界面</router-link> -->
    </el-container>
    </div>
  </div>
</template>

<script>
import { Search } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox, ElNotification } from 'element-plus'
import axios from 'axios';
import { h } from 'vue';

    export default {
    name: "HelloWorld",
    data() {
        return {
            tableData: [{
                    user_name: "Tom",
                    create_date: "2016-05-01",
                    modify_date: "2016-05-01",
                    character: "Tom",
                    remark: "No. 189, Grove St, Los Angeles",
                }, {
                    user_name: "Tom",
                    create_date: "2016-05-01",
                    modify_date: "2016-05-01",
                    character: "Tom",
                    remark: "No. 189, Grove St, Los Angeles",
                }, {
                    user_name: "Tom",
                    create_date: "2016-05-01",
                    modify_date: "2016-05-01",
                    character: "Tom",
                    remark: "No. 189, Grove St, Los Angeles",
                }, {
                    user_name: "Tom",
                    create_date: "2016-05-01",
                    modify_date: "2016-05-01",
                    character: "Tom",
                    remark: "No. 189, Grove St, Los Angeles",
                }, {
                    user_name: "Tom",
                    create_date: "2016-05-01",
                    modify_date: "2016-05-01",
                    character: "Tom",
                    remark: "No. 189, Grove St, Los Angeles",
                }, {
                    user_name: "Tom",
                    create_date: "2016-05-01",
                    modify_date: "2016-05-01",
                    character: "Tom",
                    remark: "No. 189, Grove St, Los Angeles",
                },{
                    user_name: "Tom",
                    create_date: "2016-05-01",
                    modify_date: "2016-05-01",
                    character: "Tom",
                    remark: "No. 189, Grove St, Los Angeles",
                },{
                    user_name: "Tom",
                    create_date: "2016-05-01",
                    modify_date: "2016-05-01",
                    character: "Tom",
                    remark: "No. 189, Grove St, Los Angeles",
                },{
                    user_name: "Tom",
                    create_date: "2016-05-01",
                    modify_date: "2016-05-01",
                    character: "Tom",
                    remark: "No. 189, Grove St, Los Angeles",
                },{
                    user_name: "Tom",
                    create_date: "2016-05-01",
                    modify_date: "2016-05-01",
                    character: "Tom",
                    remark: "No. 189, Grove St, Los Angeles",
                },
            ],
            dialogFormVisible: false,
            form: ({
                user_name: "",
                create_date: "",
                modify_date: "",
                character: "",
                remark: ""
            }),
            character: "",
            input: "",
            editFormVisible: false,
            currentForm: ({
                user_name: "",
                character: "",
                remark: ""
            }),
            currentIndex: 0,
            currentPage: 1,
            pageSize: 8, // 每页的数据条数,
            fileList:[], //上传的文件列表
            multiple_selected:false, //控制多选框的显示
            is_download:false, //控制下载按钮显示
            out_download:true, //控制批量下载按钮显示
        };
    },
    methods: {
        handleEdit: function (index, row) {
            this.editFormVisible = true;
            this.currentIndex = index;
            this.Clear();
        },

        Edit: function () {
            this.editFormVisible = false;
            if (this.currentForm.user_name != ''){
              this.tableData[this.currentIndex].user_name = this.currentForm.user_name;
            }
            if (this.currentForm.character != ''){
              this.tableData[this.currentIndex].character = this.currentForm.character;
            }
            if (this.currentForm.remark != ''){
              this.tableData[this.currentIndex].remark = this.currentForm.remark;
            }
            this.tableData[this.currentIndex].modify_date = this.CurrentDate();
        },

        Clear: function () {
            this.currentForm.user_name = "";
            this.currentForm.character = "";
            this.currentForm.remark = "";
        },

        handleDelete: function (index, row) {
            ElMessageBox.confirm("是否确认删除", "提示", {
                confirmButtonText: "确认",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then((status) => {
                if (status == "confirm") {
                  //确认删除后对tableData里面进行删除
                    this.tableData.splice((this.currentPage-1)*this.pageSize + index, 1);
                    console.log(index)
                }
                ElMessage({
                    type: "success",
                    message: "Delete completed",
                });
            })
                .catch(() => {
                ElMessage({
                    type: "info",
                    message: "Delete canceled",
                });
            });
        },

        submitUpload: function () {
        },

        Multiple_Selected: function () {
          this.multiple_selected = true;
          this.is_download = true;
          this.out_download = false;
        },

        Download:function(){
          ElMessageBox.confirm("是否确认下载", "提示", {
                confirmButtonText: "确认",
                cancelButtonText: "取消",
                type: "warning",
              }).then((status) => {
                //下载确认后进行文件下载
                if (status == "confirm") {
                  this.out_download = true;
                  this.multiple_selected = false;
                  this.is_download = false;

                  //下载文件
                }
                ElMessage({
                    type: "success",
                    message: "Delete completed",
                });
              }).catch((status) => {
                if (status == "cancel"){
                  this.out_download = true;
                  this.multiple_selected = false;
                  this.is_download = false;
                }
                ElMessage({
                    type: "info",
                    message: "Delete canceled",
                });
            });
        },

        createUser: function () {
          if (this.form.user_name == "" || this.form.character == ""){
            ElNotification({
              title: '提示',
              message: h('i', { style: 'color: red;width:100px;height:100px'}, '用户名或角色未进行正确填写！'),
              position:'top-left',
            })
          }
          else{
            this.dialogFormVisible = false;
            this.form.create_date = this.CurrentDate();
            this.tableData.push(this.form);
          }
        },

        create_user_clear:function(){
          this.form.user_name = '';
          this.form.character = '';
          this.form.remark = '';
        },

        //返回当前的时间
        CurrentDate: function () {
            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            if (month < 10) {
                month = "0" + month.toString();
            }
            var day = date.getDate();
            if (day < 10) {
                day = "0" + day.toString();
            }
            return year.toString() + "-" + month + "-" + day;
        },

        //每页条数改变时触发 选择一页显示多少行
        handleSizeChange: function (val) {
            this.currentPage = 1;
            this.pageSize = val;
        },

        //当前页改变时触发 跳转其他页
        handleCurrentChange: function (val) {
            this.currentPage = val;
        },
    },
    mounted() {
      var token='';
      var loginUrl = 'http://192.168.20.116/api/login';
      var user = {
        username:'admin',
        password:'2WSX3edc.'
      };
      axios.post(loginUrl, user).then(function(res){
        sessionStorage.setItem('accessToken', res.data.token)
        token = res.data.token;
        //显示token值
        console.log(res.data.token);
      }).catch(function(err){
            console.log(err);
      });;
      axios.get("", {headers: { Authorization: 'Bearer ' + token }}).then((result) => {
          console.log(result);
      });
    },
};
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
      
  }
  .header h1{
    width: 216px;
    height: 50px;
    font-size: 36px;
    font-family: PingFang SC-Heavy, PingFang SC;
    font-weight: 800;
    color: #FFFFFF;
    margin-left: 135px;
    padding-top: 18px;
  }
  .main{
    width: 1900px;
    height: 974px;
    background: #FFFFFF;
    border-radius: 0px 0px 0px 0px;
    opacity: 1;
    margin-left: 10px;
    margin-top: 5px;
    box-shadow: inset 0 0 1px black;
    display: flex;
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
    margin-top: 24px;
  }

  hr{
    width: 1860px;
    height: 0px;
    border-radius: 0px 0px 0px 0px;
    opacity: 1;
    border: 2px solid #DDDFE5;
    margin-left: 20px;
    margin-right: 20px;
    margin-top: -10px;
  }
  .search{
      display: flex;
  }

  .select_character{
    width: 200px;
    height: 34px;
  }

  span{
    height: 41px;
    font-size: 16px;
    margin-top: 23px;
    margin-left: 18px;
  }

  .dialog-footer {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -30px;
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
  .el-message-box{
    width: 513px;
    height: 218px;
    background: #FFFFFF;
    border-radius: 4px 4px 4px 4px;
    opacity: 1;
  } 

  .el-message-box__btns .el-button{
    width: 60px;
    height: 34px;
    background: #FFFFFF;
    border-radius: 4px 4px 4px 4px;
    opacity: 1;
    border: 1px solid #DDDFE5;
    margin-top: 27px;
  }
  .el-message-box__btns .el-button--primary{
    width: 60px;
    height: 34px;
    background: #2B56F9;
    border-radius: 4px 4px 4px 4px;
    opacity: 1;
    border: 1px solid #2B56F9;
    margin-top: 27px;
  }

  .el-message-box__container{
    height: 22px;
    font-size: 24px;
    font-family: PingFang SC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(0,0,0,0.85);
    line-height: 22px;
    margin-top: 40px;
  }

  .el-pagination{
    float: right;
  }

  .el-pager{
    height: 50px;
  } 

  .el-pager li.number{
    width: 50px;
    height: 50px;
    box-shadow: 0px 1px 6px 0px rgba(0,0,0,0.2);
    border-radius: 4px 4px 4px 4px;
    opacity: 1;
  }
  
  .el-message-box__title{
    width: 48px;
    height: 22px;
    font-size: 24px;
    font-family: PingFang SC-Bold, PingFang SC;
    font-weight: bold;
    color: rgba(0,0,0,0.85);
    line-height: 22px;
  }

  .el-checkbox{
    zoom: 200%;
  }

  .el-checkbox__inner{
    background-color: #FFFFFF;
    margin-left: -5px;
  }

</style>
