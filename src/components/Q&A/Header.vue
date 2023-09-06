<template>
  <div class="header">
    <div style="width: 100%; display: flex">
      <div style="width: 68px;height: 66px;margin-top: -55px;margin-left: -20px">
        <img src="../../images/logo1.png" alt="" style="scale: 0.35;">
      </div>
      <div style="margin-left: 60px">
        <h1>本地文献</h1>
      </div>
      <div style="display: flex;margin-left: 1380px">
        <div class="img1" @click="goToBackStage()">
          <img src="https://lanhu.oss-cn-beijing.aliyuncs.com/FigmaDDSSlicePNG53f1be56e3d17850952ac8c7abc9a70b.png" alt="">
        </div>
        <div class="img2" @click="goToLogin()">
          <img src="https://lanhu.oss-cn-beijing.aliyuncs.com/FigmaDDSSlicePNGd856cfe424fa8f47bf7b1c0b388ba05f.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    methods:{
      goToBackStage(){
        this.$router.push({
          name: "BackStage"
        })
      },
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
  background: #2243BA;
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
}
.img1 :hover{
  cursor: pointer;
}
.img2 {
  margin-top: 20px;
  margin-left: 30px;
}
.img2 :hover{
  cursor: pointer;
}

</style>