<template>
  <div class="main">
    <div>
      <File_Header></File_Header>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import File_Header from "@/components/Headers/File_Header.vue"
export default {
  components:{
    File_Header
  }
}
</script>

<style scoped>
.main{
  width: 1920px;height: 1080px;display: flex;flex-direction: column
}
</style>