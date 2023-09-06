<template>
  <div style="width: 1920px;height: 1080px;display: flex;flex-direction: column">
    <div>
      <Header></Header>
    </div>
      <router-view></router-view>
  </div>
</template>

<script>
import Header from "@/components/MainPage/Header_Single_Icon.vue"
export default {
  components:{
    Header
  }
}
</script>

<style scoped>

</style>