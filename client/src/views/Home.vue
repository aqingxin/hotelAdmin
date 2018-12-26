<template>
  <div class="home">
   <Header></Header>
   <!-- <section>
     <Aside />
   </section> -->
   <el-container>
     <Aside />
     <el-main>
      <div class="main">
        <router-view />
      </div>
     </el-main>
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
    // this.$http.get('http://10.21.40.155:3000/check',{withCredentials : true}).then(res=>{
    //   if(res.data.code===210){
    //     this.$message({
    //       showClose:true,
    //       message:'未登录',
    //       type:'error'
    //     })
    //     window.localStorage.removeItem('loginToken');
    //     this.$router.push({path:'/login'})
    //   }
    // }).catch(err=>{
    //   this.$message({
    //     showClose:true,
    //     message:'网络请求失败',
    //     type:'error'
    //   })
    // })
  }
}
</script>


<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;
}
.main {
  width: 100%;
  height: 100%;
  background: #fff;
  padding: 15px;
  box-sizing: border-box;
  border-radius:3px;
  overflow-y: auto;
}
.main::-webkit-scrollbar {
  width: 5px;     /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
.main::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.1);
  background: #CCCCCC;
}

.main::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.1);
  border-radius: 10px;
  background: #EDEDED;
}
</style>
