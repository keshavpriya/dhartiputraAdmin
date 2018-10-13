const Comppanies=require('../models/companies');
var mongoose=require('mongoose');
var mongoosePaginate=require('mongoose-paginate');
exports.getcompanyList=function (req,res,next) {

  /*Comppanies.find({founded_year:{$gt:2011}},function (err,Data) {
    if(err){
      return res.status(401).json({success:false,message:'Error Processing Request'+err})
    }
    if(Data){
      return res.status(200).json({success:true,message:Data})
    }
  })*/
  var limit=30;
  var select='name crunchbase_url';
  var sortby='name';
  var offset=0;
  var query={number_of_employees:{$gt:10}};
  var options={select:select,sortby:sortby,offset:offset,limit:limit}
  Comppanies.paginate(query,options).then(function (result) {
    return res.status(200).json({success:true,data:result});
  });
};
