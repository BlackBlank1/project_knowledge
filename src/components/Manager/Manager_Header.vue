<template>
  <div class="header">
    <div style="width: 100%; display: flex">
      <div style="width: 68px;height: 66px;margin-top: -55px;margin-left: -20px">
        <img src="../../images/logo1.png" alt="" style="scale: 0.35;">
      </div>
      <div style="margin-left: 60px">
        <h1>本地文献</h1>
      </div>
      <div style="display: flex;margin-left: 1200px">
        <div class="img1">
          <el-dropdown @command="handleCommand">
            <img src="../../images/setting.png" alt="" style="scale: 0.3;margin-top: -65px">
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="用户管理">用户管理</el-dropdown-item>
                <el-dropdown-item command="文献管理">文献管理</el-dropdown-item>
                <el-dropdown-item command="文件管理">文件管理</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <div class="img2" @click="goToLogin()">
          <img src="../../images/user.png" alt="" style="scale: 0.3;margin-top: -75px;">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods:{
    goToLogin(){
      this.$router.push({
        name:"Login"
      })
    },
    handleCommand(command){
      if (command === "用户管理"){
        this.$router.push({
          name:"UserManager"
        })
      }else if (command === "文献管理"){
        this.$router.push({
          name:"DocManager"
        })
      }else if (command === "文件管理"){
        this.$router.push({
          name:"FileManager"
        })
      }
    }
  }
}
</script>

<style scoped>
.header{
  width: 100%;
  height: 86px;
  background: linear-gradient(225deg, #2243BA 0%, #4A6BE5 39%, #8E54EC 100%);
  display: flex;
}
.header h1{
  width: 230px;
  height: 50px;
  font-size: 36px;
  font-family: PingFang SC-Heavy, PingFang SC;
  font-weight: 800;
  color: #FFFFFF;
  line-height: 42px;
  margin-left: 39px;
  padding-top: 18px;
}
.img1 {
  margin-top: 20px;
  margin-left: 80px;
}
.img1 :hover{
  cursor: pointer;
}
.img2 {
  margin-top: 20px;
  margin-left: -80px;
}
.img2 :hover{
  cursor: pointer;
}

</style>