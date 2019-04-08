import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

let store= new Vuex.Store({
  state: {
    //本地存储？
    token:'',
    cartarry:JSON.parse(localStorage.getItem('cartarry'))||[],///存储购物车商品的数据
  },
  mutations: {
    //同步
      //设置vuex的token
      settoken(state,token){
        state.token=token;
      },
      //添加商品到购物车
      tocart(state,tag){
        let googs=state.cartarry.find(v=>v.title==tag.label);
        if(googs){
          googs.cartCount+=1;
        }else{
          state.cartarry.push({title:tag.label,cartCount:1});
        }
      }
      //购物车数量加一
      ,cartadd(state,index){
           state.cartarry[index].cartCount++;
      }
      ,cartremove(state,index){
        if(state.cartarry[index].cartCount>1){
            state.cartarry[index].cartCount--;
        }else{
          if(window.confirm("确定从购物车里面移除商品嘛")){
            state.cartarry.splice(index,1);
          }
        }
      },
      //清空购物车
      clearcart(state){
        state.cartarry=[];
      }
//
  },
  actions: {
    //异步
  },
    getters:{
    //计算属性,相当于vue 的 computed
        countsum:state=>{
          let num=0;
          state.cartarry.forEach(v=>{
            num+=v.cartCount
          })
            return num;
        }
    }
});
//舰艇每次调用mutations的时候，都会金这个方法，然后我们可以做一些自己想做的处理
store.subscribe((mutation,state)=>{
  localStorage.setItem('cartarry',JSON.stringify(state.cartarry));
})
 export default store