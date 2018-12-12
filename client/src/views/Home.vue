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
import HelloWorld from '@/components/HelloWorld.vue';
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
  },
  mounted(){
    this.$http.get('http://10.21.40.155:3000/check',{withCredentials : true}).then(res=>{
      if(res.data.code===210){
        this.$message({
          showClose:true,
          message:'未登录',
          type:'error'
        })
        window.localStorage.removeItem('loginToken');
        this.$router.push({path:'/login'})
      }
    }).catch(err=>{
      this.$message({
        showClose:true,
        message:'网络请求失败',
        type:'error'
      })
    })
  }
}
</script>
