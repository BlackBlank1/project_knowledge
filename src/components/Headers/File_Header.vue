<template>
  <div class="header">
    <div style="width: 100%; display: flex">
      <div style="width: 68px;height: 66px;margin-top: -55px;margin-left: -20px">
        <img src="../../images/logo.png" alt="" style="scale: 0.35;">
      </div>
      <div style="margin-left: 60px">
        <h1>无人系统知识平台</h1>
      </div>
      <div style="display: flex;margin-left: 1360px">
        <div class="img2" @click="goToLogin()">
          <img src="../../images/user.png" style="scale: 0.3;margin-top: -75px;margin-left: -40px" alt="">
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
    }
  }
}
</script>

<style scoped>
.header{
  width: 100%;
  height: 86px;
  background: linear-gradient(225deg, #5A22B5 0%, #B691F3 63%, #3656CA 100%);
  display: flex;
}
.header h1{
  width: 288px;
  height: 50px;
  font-size: 36px;
  font-family: PingFang SC-Heavy, PingFang SC;
  font-weight: 800;
  color: #FFFFFF;
  line-height: 42px;
  margin-left: 39px;
  padding-top: 18px;
}
.img2 {
  margin-top: 20px;
}
.img2 :hover{
  cursor: pointer;
}

</style>