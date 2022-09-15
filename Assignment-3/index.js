const fs=require('fs/promises');
const http=require('http');
const fileWriter=async (fileName,content)=>{
    try{
        await fs.writeFile(fileName,content);
    }
    catch(err){
        console.log(err);
    }
}
fileWriter('index.html','<h1> Hello World </h1>\n<p> This is Vamsi... </p>')
const server=http.createServer((req,res)=>{
    res.writeHead(200,{"Content-type":"text/html"});
    res.end("<h1> Hello World </h1><p> This is Vamsi... </p>");
})
server.listen(5000,()=>console.log("Server is up at 5000 port"));


//fileWriter('index.html','<h1> Hello World </h1>\n <p> This is vamsi...</p>');
//const server=http.createServer((req,res)=>{
//  res.writeHead(200,{'content-type':'text/html'});
//  res.end("<h1> Hello World </h1><p> This is vamsi...</p>");
//}
//server.listen(5000,()=>console.log("server is up at port 5000"));
//Hello all, this is R Vamsi Krishna.
fileAppend('index.html','<p> This is Vamsi... </p>')

