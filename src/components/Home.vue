<template>
    <div style="display: flex;flex-wrap: wrap;">
        <div class="header">
            <div>
                <img src="../images/logo.png" alt="">
            </div>
            <div>
                <h1>本地文献</h1>
            </div>
            <div>
                <el-icon @click="login_exit()" title="退出登录" class = "exit" color="white"><User /></el-icon>
            </div>
        </div>
        <div class="main">
            <div class="main_header">
                <div>
                    <el-input style="width: 428px;
                    height: 34px;
                    background: #F2F3F5;    
                    border-radius: 4px 4px 4px 4px;
                    opacity: 1;
                    border: 1px solid #DDDFE5; margin-left: 201px; margin-top: 20px;" v-model="input" placeholder="Please input" />
                    <el-input v-model="input" style="width: 200px;
                    height: 34px;
                    background: #F2F3F5;
                    border-radius: 4px 4px 4px 4px;
                    opacity: 1;
                    border: 1px solid #DDDFE5; margin-left: 18px;margin-top: 20px;" placeholder="Please input" />
                    <el-input v-model="input" style="width: 200px;
                    height: 34px;
                    background: #F2F3F5;
                    border-radius: 4px 4px 4px 4px;
                    opacity: 1;
                    border: 1px solid #DDDFE5; margin-left: 18px;margin-top: 20px;" placeholder="Please input" />
                    <el-input v-model="input" style="width: 200px;
                    height: 34px;
                    background: #F2F3F5;
                    border-radius: 4px 4px 4px 4px;
                    opacity: 1;
                    border: 1px solid #DDDFE5; margin-left: 18px;margin-top: 20px;" placeholder="Please input" />
                    <el-input v-model="input" style="width: 200px;
                    height: 34px;
                    background: #F2F3F5;
                    border-radius: 4px 4px 4px 4px;
                    opacity: 1;
                    border: 1px solid #DDDFE5; margin-left: 18px;margin-top: 20px;" placeholder="Please input" />
                    <el-input v-model="input" style="width: 200px;
                    height: 34px;
                    background: #F2F3F5;
                    border-radius: 4px 4px 4px 4px;
                    opacity: 1;
                    border: 1px solid #DDDFE5; margin-left: 18px;margin-top: 20px;" placeholder="Please input" />
                    <el-button type="primary" style="margin-left: 18px;margin-top: 20px;">搜索</el-button>
                    <el-button style="margin-top: 20px;">重置</el-button>
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
                            v-model="value1"
                            type="datetime"
                            placeholder="Pick a Date"
                            format="YYYY/MM/DD HH:mm:ss"
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
                            v-model="value1"
                            type="datetime"
                            placeholder="Pick a Date"
                            format="YYYY/MM/DD HH:mm:ss"
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
            <div class="main_center">
                <div>
                    <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" style="width: 100%; font-size: 20px;margin-top: 20px;" :header-cell-style="{background:'rgba(43,86,249,0.2)', color:'#000000', height:'64px',padding:'17px'}">
                        <el-table-column v-if="multiple_selected" type="selection" style="margin-left: 100px;"></el-table-column>
                        <el-table-column label="标题名" width="294">
                        <template #default="scope">
                            <div style="display: flex; align-items: center">
                            <span>{{ scope.row.roleCode }}</span>
                            </div>
                        </template>
                        </el-table-column>
                        <el-table-column label="作者" width="294">
                        <template #default="scope">
                            <div style="display: flex; align-items: center">
                            <span>{{ scope.row.gmtCreate }}</span>
                            </div>
                        </template>
                        </el-table-column>
                        <el-table-column label="刊名" width="294" show-overflow-tooltip>
                        <template #default="scope">
                            <div style="display: flex; align-items: center">
                            <span>{{ scope.row.gmtModified }}</span>
                            </div>
                        </template>
                        </el-table-column>
                        <el-table-column label="出版时间" width="294" show-overflow-tooltip>
                        <template #default="scope">
                            <div style="display: flex; align-items: center">
                            <span>{{ scope.row.roleName }}</span>
                            </div>
                        </template>
                        </el-table-column>
                        <el-table-column label="关键词" width="400" show-overflow-tooltip>
                        <template #default="scope">
                            <div style="display: flex; align-items: center; ">
                            <span>{{ scope.row.description }}</span>
                            </div>
                        </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template #default="scope">
                                <el-button size="small" v-if="is_manager = scope.row.roleName == '管理员' ? false : true " @click="handleEdit(scope.$index, scope.row)" style="width: 60px;
                                    height: 34px;
                                    background: #FFFFFF;
                                    border-radius: 4px 4px 4px 4px;
                                    opacity: 1;
                                    border: 1px solid #DDDFE5;"
                                >编辑</el-button
                                >
                                <el-button
                                size="small" v-if="is_manager"
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
                </div>
            </div>
            <div class="main_footer">
                <el-pagination background layout="total, sizes, prev, pager, next, jumper" :total="100" @size-change="handleSizeChange" 
                @current-change="handleCurrentChange" :current-page="currentPage"  :page-sizes="[8, 16]"
                :page-size="pageSize" ></el-pagination>
            </div>
        </div>
    </div>

</template>


<script>
    export default{
        data(){
            return{
                input:'',
                value1:'',
                tableData: [],
                currentIndex: 0,
                currentPage: 1,
                pageSize: 8, // 每页的数据条数,
            }
        },
        methods:{
            login_exit(){
                this.$router.push({
                    name: 'Login',
                })

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

        // mounted:{

        // }
    }
</script>


<style>
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

  .exit{
    width: 52px;
    height: 54px;
    border-radius: 0px 0px 0px 0px;
    opacity: 1;font-size: 70px; margin-left: 1500px; margin-top: 12px;
  }

  .exit:hover{
    cursor: pointer;
  }

  .main{
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
    margin-top: 614px;
  }
</style>