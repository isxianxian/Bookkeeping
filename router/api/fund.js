let express = require('express');
let router = express.Router();
let jwt = require('jsonwebtoken');
let key = require('../../config/key.js').key;
let Fund = require('../../model/Fund.js');
let Users = require('../../model/User.js');

// 测试
    router.get('/test', (req,res)=>{
        res.status(200).send('fund测试成功');
    })


// 获取自己的所有账单信息
    // 利用token得到对应的账户，然后在数据库中查询。
    // 返回401，表示没有权限验证失败
    // 返回200，表示查询到，返回的是这个账户的所有信息
    router.get('/all' , (req,res)=>{
        let token = req.get('authorization');

        jwt.verify(token, key, function(err, decoded) {

            if(err){
                res.status(401).json('没有权限访问！');
                return;
            }

            let {email} = decoded;
            Users.findOne({email} , (err,result)=>{
                if(err){
                    throw new Error(err.message);
                }
            res.status(200).send(result);
            })

        });
    })

// 查找某一个信息 => 自己账户下寻找某一条的资金信息
    // 先验证token找到对应账户，再查询对应账户下的资金信息，然后将符合条件的资金信息返回
    // 返回401，表示没有权限验证失败
    // 返回200，表示查询到，返回的是这个账户的对应的那一条信息 
    router.get('/:id' , (req,res)=>{
        let token = req.get('authorization');

        jwt.verify(token, key, function(err, decoded) {

            if(err){
                res.status(401).json('没有权限访问！');
                return;
            }

            let id = req.params.id,
                email = decoded.email;

            Users.findOne({email} , (err,mes)=>{
                if(err){
                    throw new Error(err.message);
                }
                let result = mes.fund.find(item => item._id == id);
                res.status(200).send(result);
            })

        });
    })


// 添加数据
    // 验证token，在相应账户中添加信息
    // 利用Fund数据模型，创建新的数据对象，再添加到Users的数据库中。
    // 返回401，表示没有权限验证失败
    // 返回406，表示数据不完整
    // 返回200，表示数据添加成功，返回的字符串‘数据添加成功’
    router.post('/add' , (req,res)=>{
        let token = req.get('authorization');

        jwt.verify(token, key, function(err, decoded) {

            if(err){
                res.status(401).json('没有权限访问！');
                return;
            }

            let {income,expend,cash,remark} = req.body;
            if(income == null || expend == null || cash == null){
                res.status(406).json('数据不完整！');
                return;
            }

            let newFund = new Fund({income,expend,cash,remark});
            let myEmail = decoded.email;

            Users.updateOne({email:myEmail} , {$push:{'fund':newFund}} , (err,mes)=>{
                if(err){
                    throw new Error(err.message);
                }else{
                    res.status(200).json('数据添加成功');
                }
            })

        });
        
    })

// 删除数据
    // 点击删除按钮时就将相应资金信息的id传过来
    // 返回401，表示没有权限验证失败
    // 返回200，表示数据删除成功，返回的字符串‘数据删除成功’
    router.delete('/del/:id' , (req,res)=>{
        let token = req.get('authorization');

        jwt.verify(token, key, function(err, decoded) {

            if(err){
                res.status(401).json('没有权限访问！');
                return;
            }

            let id = req.params.id,
                email = decoded.email;

            Users.updateOne({email} , {$pull:{"fund":{ "_id": id,}}} , (err,mes)=>{
                if(err){
                    throw new Error(err.message);
                }else{
                    res.status(200).json('数据删除成功！');
                }
            })   

            

        }); 
    })


// 修改数据
    // 点击删除按钮时就将相应资金信息的id传过来
    // 获取修改的数据放入。
    // income，expend，cash不可以为空。 为0会有错误吗？
    // 返回401，表示没有权限验证失败
    // 返回406，表示数据不完整
    // 返回200，表示数据删除成功，返回的字符串‘数据删除成功’
    router.post('/edit/:id' , (req,res)=>{
        let token = req.get('authorization');

        jwt.verify(token, key, function(err, decoded) {

            if(err){
                res.status(401).json('没有权限访问！');
                throw new Error(err.message);
            }

            let {income,expend,cash,remark} = req.body;
            if(income == null || expend == null || cash == null){
                res.status(406).json('数据不完整！');
                return;
            }

            let id = req.params.id,
                email = decoded.email;

            let newFund = {
                'fund.$.income':income,
                'fund.$.expend':expend,
                'fund.$.cash':cash,
                'fund.$.remark':remark,
            }

            Users.updateOne({email , 'fund._id':id},{$set:newFund},(err,mes)=>{
                if(err){
                    throw new Error(err.message);
                }else{
                    res.status(200).json('数据修改成功！');
                }
            });
            
        }); 
    })


module.exports = {
    router
}
