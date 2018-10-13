var Connection=require('../dbconnect');

exports.getproductList=function (req,res,next) {
  var sql="SELECT * FROM brijwasiproducts";
  Connection.query(sql,function (err,data) {
if(err){
  return res.status(401).json({success:false,message:'Error Processing Request'+err})
}
if(data){
  return res.status(200).json({success:true,data:data});
}
  })
};
