<template>
  <div class="home">
   <Header></Header>
   <!-- <section>
     <Aside />
   </section> -->
   <el-container>
     <Aside />
     <Main />
   </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Header from '@/components/Header.vue';
import Aside from '@/components/Aside.vue';
import Main from '@/components/Main.vue';
export default {
  name: 'home',
  components: {
    HelloWorld,
    Header,
    Aside,
    Main
  }
}
</script>
