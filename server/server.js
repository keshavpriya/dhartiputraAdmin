var express=require('express');
var mongoose=require('mongoose');
var bodyParser =require('body-parser');
var jwt = require('jsonwebtoken');
var app=express();
var morgan=require('morgan');

var config=require('./config');
var user=require('./routes/user');
var companies=require('./routes/companies');
var products=require('./routes/products');




var port=process.env.PORT || config.serverport;

mongoose.Promise=global.Promise;

mongoose.connect(config.database,function (err) {
  if(err){
    console.log('Error connecting database , please check if Mongodb is running');
  }else{
    console.log('congratulation! connected to database');
  }
});

app.use(bodyParser.urlencoded({extended:true}));
app.use(require('body-parser').json({type:'*/*'}));

app.use(morgan('dev'));

app.use(function (req,res,next) {
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Method",'PUT,GET,POST,DELETE,OPTIONS');
  res.setHeader("Access-Control-Allow-Headers","Origin,,X-Requested-with,Content-Type,Accept,Authorization,Access-Control-Allow-Credentials");
  res.setHeader("Access-Control-Allow-Credentials","true");
  next();
});

app.get('/',function (req,res,next) {
  res.send('dhartiputra running at http://localhost:'+port+'api');
});

app.post('/register',user.signup);

var apiRoutes=express.Router();

app.use('/api',apiRoutes);

app.post('/login',user.login);

app.get('/getcompanyDetails',companies.getcompanyList);

apiRoutes.get('/getproductDetails',products.getproductList);


app.listen(port);
console.log('dhartiputra is running at http://localhost:'+port);
