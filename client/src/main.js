import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Mainless from './assets/main.less';
import axios from 'axios';
import Icon from 'vue-svg-icon/Icon.vue';


axios.defaults.withCredentials=true;
Vue.prototype.$http=axios;
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.component('icon', Icon); 


//axios拦截，请求响应
axios.interceptors.response.use(
  response => {   //响应结果为正确的情况下
    return response;
  },
  error => {    //错误的情况下，统一处理
    if(error.response){
      if(error.response.status===401){   //未登录情况
        ElementUI.Message({
          showClose:true,
          message:'未登录',
          type:'error',
        })
        window.localStorage.removeItem('loginToken')
        router.push('/login')   
      }else{    //其他情况下
        ElementUI.Message({
          showClose:true,
          message:'网络请求错误',
          type:'error',
        })
      }
    }
  }
)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
