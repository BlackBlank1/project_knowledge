<template>
  <div class="header">
    <div class="header_div1">
      <img src="../../images/logo.png" alt="" >
    </div>
    <div class="header_div2">
      <h1>无人系统知识平台</h1>
    </div>
    <div class="header_div3">
      <div class="img1">
        <el-dropdown @command="handleCommand">
          <div class="img1_div">
            <img src="../../images/setting.png" alt="">
          </div>
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
        <img src="../../images/user.png" alt="">
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
.header_div1{
  width: 68px;height: 66px;margin-left: 37px;margin-top: 10px
}
img{
  max-width: 100%;height: auto;
}
.header_div2{
  margin-left: 30px;width: 360px;height: 50px;color: #FFFFFF;font-size: 16px;margin-top: 15px
}
.header_div3{
  display: flex;margin-left: 1250px
}
.img1_div{
  width: 51px;height: 51px
}
</style>

<style scoped>
.header{
  width: 100%;
  height: 86px;
  background: linear-gradient(225deg, #2243BA 0%, #4A6BE5 39%, #8E54EC 100%);
  display: flex;
}
.img1 {
  margin-top: 20px;
  margin-right: 40px;
}
.img1 :hover{
  cursor: pointer;
}
.img2 {
  margin-top: 20px;
  width: 50px;
  height: 49px;
}
.img2 :hover{
  cursor: pointer;
}

</style>