<template>
    <div class="login_frame">
        <div class="login">
            <h1 class="login_h">登录</h1>
            <el-input class="login_input1" v-model="username" placeholder="请输入用户名"></el-input>
            <el-input class="login_input2" type="password" v-model="password" placeholder="请输入密码"></el-input>
            <el-button class="login_button" type="primary" @click="Login()">登录</el-button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

import { ElMessage } from 'element-plus'

    export default{
        data(){
            return{
                username:'',
                password:'',
            }
        },
        methods:{
            Login(){
                let data = new FormData();
                data.append('username', this.username);
                data.append('password', this.password);
                var instance = axios.create({
                baseURL: 'http://localhost:5173/api',
                timeout: 1000,
                headers: {'X-Custom-Header': 'foobar'}
                });
                instance({
                    url:'/login',
                    method:'post',
                    data:data,
                }).then((res) => {
                    localStorage.setItem('token', res.data.data);
                    console.log(res.data);
                    localStorage.setItem('userName', this.username);
                    localStorage.setItem('password', this.password);
                    instance({
                        url:'/admin/roles/' + this.username,
                        method:'get',
                        headers: { Authorization: res.data.data }
                    }).then((res) => {
                        console.log(res.data.data)
                        if ((res.data.data).indexOf('admin') != -1 || (res.data.data).indexOf('sys_admin') != -1){
                         localStorage.setItem('is_admin', true);
                         localStorage.setItem('is_user_high', false);
                        }
                        else{
                            if ((res.data.data).indexOf('sys_user_high') != -1){
                                localStorage.setItem('is_user_high', false);
                                console.log(11111)
                            }
                            else{
                                console.log(22222)
                                localStorage.setItem('is_user_high', true);
                            }
                            localStorage.setItem('is_admin', false);
                        }

                        this.$router.push({
                            name: 'Home',
                         })
                    })
                }).catch((res) => {
                    ElMessage({
                        showClose: true,
                        message: '用户名或密码输入错误，请重新输入',
                        type: 'error',
                    })
                })

                // var data = {
                //     username:this.username,
                //     password:this.password,
                // }
                // this.$router.push({
                //     name: 'LocalSearch',
                //     params: {data: data} })
            }
        }
    }
</script>

<style scoped>
    .login_button{
      width: 339px;height: 34px;background: #2B56F9;
      border-radius: 4px 4px 4px 4px; border: 1px solid #2B56F9; margin-left: 158px;margin-top: 60px;
    }
    .login_h{
      font-size: 48px; margin-left: 279px; height: 25px; padding-top: 63px;
    }
    .login_input1{
      width: 512px;margin-left: 76px;margin-top: 110px;
    }
    .login_input2{
      width: 512px;margin-left: 76px;margin-top: 20px;
    }
    .login_frame{
        width: 1920px;
        height: 1080px;
        background-image: url("../images/login.png");
        background-size: 100%;
    }
    .login{
        width: 664px;
        height: 483px;
        background: #FFFFFF;
        margin-left: 1116px;
        top:305px;
        position: relative;
    }

    
</style>

<style>
    .login .el-input__wrapper{
        background: #F2F3F5;
        border-radius: 4px 4px 4px 4px;
        opacity: 1;
        border: 1px solid #DDDFE5;
    }

    .login .el-input__inner{
        height: 48px;
        font-size: 20px;
    }

    .login .el-message{
        width: 500px;
        height: 70px;
    }

    .login .el-message__content{
        font-size: 20px;
    }

    .login .el-icon{
        font-size: 20px;
    }

    input:-webkit-autofill { box-shadow: 0 0 0px 1000px #F2F3F5 inset !important;}
</style>