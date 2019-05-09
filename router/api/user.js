let express = require('express');
let md5 = require('md5');
let gravatar = require('gravatar');
let jwt = require('jsonwebtoken');


let router = express.Router();
let User = require('../../model/User');
let key = require('../../config/key.js').key;

// 测试
router.get('/test',(req,res)=>{
    res.send('测试成功');    
})

// 注册 => post /register
    // 注册成功返回200，成功信息
    // 注册失败返回406，失败信息
    // 406	Not Acceptable	服务器无法根据客户端请求的内容特性完成请求
router.post('/register' , (req,res)=>{
    let {email} = req.body;

    User.find({email:email},function(error,result){

        if(error){
            console.log(err.message);
            return;
        };

        // 当查找结构的长度不为0时表示邮箱已经被注册
        if(result.length){
            res.status(406).json('该邮箱已经被注册'); 
            return;
        }
        
        let {name,email,password,avatar,date,identity,fund} = req.body;
        avatar = gravatar.url(req.body.email, { s: "200", r: "pg", d: "mm" }); //头像
        password = md5(password); //密码加密

        let newUser = new User({name,email,password,avatar,date,identity,fund});
        newUser.save(function(error,result){
            if(error){
                throw new Error(error);
            }else{
                console.log(newUser);
                res.status(200).json('注册成功');
            }
        })

    })

})

// 登陆 => post /login
    // 登陆成功返回token，
    //    失败返回406状态码,表示没有这个用户。
    // 登陆失败返回401，表示密码错误没有权限。
router.post('/login' , (req,res)=>{

    let {email} = req.body;

    User.findOne({email} , (err,result)=>{
        if(err){
            throw new Error(err);
        }

        if(!result){
            res.status(406).send('用户不存在');
            return;
        }

        let password = md5(req.body.password);
        if(password == result.password){
           let {name,email,password,avatar,date,identity,fund} = result;
           let rule = {name,email,password,avatar,date,identity};
            // 创建token
            jwt.sign(rule , key , { expiresIn: '24h' } , function(err,token){
                if(err){
                    throw new Error(err);
                }
                res.status(200).send({code:1,token});
            }) 
        }else{
            res.status(401).send('密码错误');
        }


    })
})

// 获取当前用户具体的信息
    // 根据用户登陆成功返回而储存的token获取相关的信息 token需要在请求头中传入
    // 成功返回200和相关信息对象
    // 失败返回401，没有权限访问
router.get('/current' , (req,res)=>{
        // let token = req.headers.authorization;  // token不是字符串
    let token = req.get('authorization');
        // 验证token
    jwt.verify(token, key, function(err, decoded) {
        if(err){
            res.status(401).json('没有权限访问！');
            throw new Error(err.message);
        }
        res.status(200).json(decoded);
      });
})



module.exports = {
    router
}
