// 请求拦截和响应拦截，并作出相关的反应
import axios from 'axios';

    // 加载动画
    import { Message , Loading } from 'element-ui';

    let loading = null;
    function startLoading(){
        loading = Loading.service({
            lock:true,
            text:'拼命加载中...',
            background:'rgba(0,0,0,.7)'
        })
    }
    function endLoading(){
        loading.close();
    }

// 请求拦截
axios.interceptors.request.use(config=>{
    // config 为一个对象，里面包括请求头部信息，传递数据信息。
    startLoading();
    if(localStorage.eleToken){
        config.headers.Authorization = localStorage.eleToken;
    }
    return config;
},err=>{
    return Promise.reject(error);
})

// 响应拦截
    // 当返回的状态码是4或者5开头的表示失败，走err。
axios.interceptors.response.use(response =>{
    // response就是响应回来的对象
    endLoading();
    return response;
},err=>{
    // err就是错误信息对象
    endLoading();
    let {status} = err.response;
    if(status == 401){
        Message.error('登陆失效，请重新登陆！');
        localStorage.removeItem('eleToken');
        this.$router.push('/login');
        return Promise.reject(err);
    }

    Message.error(err.response.data);
    return Promise.reject(err);
})

export default axios;

