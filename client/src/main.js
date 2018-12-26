import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Mainless from './assets/main.less';
import axios from 'axios';


axios.defaults.withCredentials=true;
Vue.prototype.$http=axios;
Vue.config.productionTip = false;
Vue.use(ElementUI);

axios.interceptors.response.use(
  response => {
    // console.log(ElementUI)
   
    return response;
  },
  error => {
    if(error.response){
      console.log(error.response.status)
      if(error.response.status===401){
        console.log(2)
        ElementUI.Message({
          showClose:true,
          message:'未登录',
          type:'error',
        })
        window.localStorage.removeItem('loginToken')
        router.push('/login')
      }else{
        ElementUI.Message({
          showClose:true,
          message:'网络请求错误',
          type:'error',
        })
      }
    }
    // return Promise.reject(error)
  }
)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
