const mongooose = require('mongoose');

const blogSchema = new mongooose.Schema({
    // Your code goes here
    topic:{type:String,required:true},
    description:String,
    posted_at:String,
    posted_by:String
},{timestamps:true})

const Blog = mongooose.model('blogs', blogSchema);

module.exports = Blog;
