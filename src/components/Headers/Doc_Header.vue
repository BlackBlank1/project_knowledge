<template>
  <div class="header">
    <div class="header_div1">
      <img src="../../images/logo.png" alt="" class="div1_img">
    </div>
    <div class="header_div2">
      <h1>无人系统知识平台</h1>
    </div>
    <div class="img2" @click="goToLogin()">
      <img src="../../images/user.png" alt="" class="div1_img">
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
  width: 1920px;
  height: 86px;
  background: linear-gradient(225deg, #2243BA 0%, #4A6BE5 39%, #8E54EC 100%);
  display: flex;
}

.img2 {
  margin-top: 20px;
  width: 50px;
  height: 49px;
  margin-left: 1413px
}
.img2 :hover{
  cursor: pointer;
}

.header_div1 {
  width: 68px;height: 66px;margin-left: 37px;margin-top: 10px
}

.div1_img{
  max-width: 100%;height: auto;
}

.header_div2 {
  margin-left: 30px;width: 288px;height: 50px;color: #FFFFFF;font-size: 18px;margin-top: 15px
}

</style>