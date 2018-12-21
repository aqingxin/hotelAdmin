<template>
  <div>
    <NotOpenRoom :notOpened="notOpened" @reloadRoom='fGetRoom'/>
    <OpenRoom :openRoom="open" @reloadRoom="fGetRoom"/>
  </div>
</template>


<script>
import NotOpenRoom from '../components/NotOpenRoom';
import OpenRoom from '../components/OpenRoom';
export default {
  data() {
    return {
      notOpened:[],
      open:[]
    }
  },
  components:{
    NotOpenRoom,
    OpenRoom
  },
  mounted(){
    this.fGetRoom()
  },
  methods:{
    fGetRoom(){
      this.$http.get('http://10.21.40.155:3000/getRoom').then(res=>{
        this.notOpened=res.data.notOpen;
        this.open=res.data.open;
        console.log(res)
      }).catch(err=>{
        this.$message({
          showClose:true,
          message:'网络请求错误',
          type:'success'
        })
      })
    },
  },
  computed:{
    // notOpened(){
    //   // console.log(1)
    //   return this.room.filter(function(item){
    //     return item.room_status===0;
    //   })
      
    // },
    // opened(){
    //   // console.log(1)
    //   return this.room.filter(function(item){
    //     return item.room_status===1;
    //   })
      
    // },
  },
}
</script>
