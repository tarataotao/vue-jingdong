<template>
    <div>
        <img class="headerImg" src="" alt=""/>
        <cube-form
                :model="model"
                :schema="schema"
                @submit="submitHandler">
        </cube-form>
    </div>

</template>

<script>
    export default {
        name: "Login",
        data(){
            return {
                model:{
                    username:'',
                    password:''
                },
                schema:{
                    fields:[
                        //用户名配置
                        {
                            type:'input',
                            modelKey:'username',
                            label:'用户名',
                            props:{
                                placeholder:'请输入用户名',
                            },
                            rules:{
                                //校验规则
                                required:true,
                                type:'string',
                                min:3,
                                max:15,
                            },
                            trigger:'blur',
                            messages:{
                                required:'用户名不能为空' ,
                                min:'用户名不能少于3个字符',
                                max:'用户名不能大于15个字符'
                            }
                        },
                        //密码配置
                        {
                            type:'input',
                            modelKey:'password',
                            label:'密码',
                            props:{
                                placeholder:'请输入密码',
                                type:'password',
                                eye:{
                                    open:false
                                }
                            },
                            rules:{
                                //校验规则
                                required:true,
                            },
                            trigger:'blur',
                            messages:{
                                required:'密码不能为空'
                            }
                        },
                        {
                            type:'submit',
                            label:'登录'
                        }
                    ]
                }
            }
        }
        ,methods:{
            async submitHandler(e){
                e.preventDefault();//阻止默认事件
                try {
                    const result=await this.$http.get('/api/login',{params:this.model});
                    if(result.code=='0'){
                        this.$store.commit('settoken',result.token);//调用store.js 的mutations方法 同步
                      //   this.$store.dispatch();//调用store.js 的actions方法 异步
                        //alert(result.data.message);
                        window.localStorage.setItem('token',result.token);//vuex刷新之后token会丢失，所以要本地存储
                        //判断路由是否带参数，带参数就去到重定向参数地址，否则就去首页
                        if(this.$route.query.redirect){
                            this.$router.replace({path:this.$route.query.redirect})
                        }else{
                            this.$router.replace({path:"/botnav/index"})
                        }
                    }else{
                        alert(result.message);
                    }

                }catch (e) {
                    console.log(e);
                }
            }
        }
    }
</script>

<style scoped>
    .headerImg{
        height: 150px;
        width: 100%;
    }
</style>