import axios from 'axios'
import  store from './store'
import router from './router'

//http的全局拦截
//token放在所有请求的头上面 header回带给后端

//暴露方法
//请求拦截
export default function setAxios(){
    axios.interceptors.request.use(
        config=>{
            if(store.state.token){
                config.headers.token=store.state.token;
            }
            return config;
        },error=>{
            return Promise.reject(error);
        }
    )
    //每次的请求有返回的，都是先经过这个拦截器
    axios.interceptors.response.use(
        response=>{
            if(response.status==200){
                const data=response.data
                if(data.code==-1){
                    //登录过期，需要重新登录，需要清空vuex的token和localstore的token
                    store.commit('settoken','');
                    localStorage.removeItem('token');
                    //跳转到login页面
                    router.replace({path:'/login'});
                }
                return data;
            }
            return response;
        }
    )
}
