<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
  import HelloWorld from '@/components/HelloWorld.vue';
  
  export default {
    components: {
      HelloWorld
    },
  };
</script>

<style scoped>
    *{
        margin:0;
        padding:0;
        border:0
    }

</style>
