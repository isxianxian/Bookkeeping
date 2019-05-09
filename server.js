let express = require('express'),
    path = require('path'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    monUrl = require('./config/key.js').db,
    user = require('./router/api/user.js').router,
    fund = require('./router/api/fund.js').router;

let app = express(),
    port = process.env.PORT || 8686;

mongoose.connect(monUrl,{useNewUrlParser: true })
.then((res)=>{
    console.log('连接成功');
})
.catch((err)=>{
    console.log(err);
})


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use('/api/users' , user);
app.use('/api/fund' , fund);

app.listen(port,()=>{
    console.log(`服务已经创建在${port}端口号`);
})