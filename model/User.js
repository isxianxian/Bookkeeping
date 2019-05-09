// 用户信息数据库
let mongoose = require('mongoose');
    // 定义数据库数据的要求
let Schema = mongoose.Schema;
let FundSchema = new Schema({
    income:{
        type:String,
        required:true
    },
    expend:{
        type:String,
        required:true
    },
    cash:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    remark:{
        type:String
    }
});
let UsersSchema = new Schema({
    name:{
        required:true,
        type:String
    },
    email:{
        required:true,
        type:String
    },
    password:{
        type:String,
        required:true
    },
    avatar:{

    },
    date:{
        type:Date,
        default:Date.now
    },
    identity:{
        type:String,
        required:true
    },
    fund:[FundSchema]
})
// 将数据类型转化为结构
    // users为mongoose数据库中的名字，User为这里使用的名字。
var Users = mongoose.model('users' , UsersSchema);






    // 将结构导出供使用
module.exports = Users;