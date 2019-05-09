// 账单信息数据库
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
})
    // 将数据类型转化为结构
        // fund为mongoose数据库中的名字，Fund为这里使用的名字。
let Fund = mongoose.model('fund' , FundSchema);

    // 将结构导出供使用
module.exports = Fund;

