const mongoose=require('mongoose');
var mongoosePaginate=require('mongoose-paginate');
var Schema=mongoose.Schema;

var companySchema=new Schema({
  name:{type:String},
  permalink:{type:String},
  crunchbase_url:{type:String},
  homepage_url:{type:String},
  blog_url:{type:String},
  blog_feed_url:{type:String},
  twitter_username:{type:String},
  category_code:{type:String},
  number_of_employees:{type:Number},
  founded_year:{type:Number},
  founded_month:{type:Number},
  founded_day:{type:Number},
  deadpooled_year:{type:Number},
  tag_list:{type:String},
  alias_list:{type:String},
  email_address:{type:String},
  phone_number:{type:String},
  description:{type:String},
  created_at:{type:Date},
  updated_at:{type:String},
  overview:{type:String},
  image:{type:Object},
  products:{type:Array},
  relationships:{type:Array},
  competitions:{type:Array},
  providerships:{type:Array},
  total_money_raised:{type:String},
  funding_rounds:{type:Array},
  investments:{type:Array},
  acquisition:{type:Object},
  acquisitions:{type:Array},
  offices:{type:Array},
  milestones:{type:Array},
  video_embeds:{type:Array},
  screenshots:{type:Object},
  external_links:{type:Array},
  partners:{type:Array}
});
companySchema.plugin(mongoosePaginate);
module.exports=mongoose.model('companies',companySchema,'companies');
