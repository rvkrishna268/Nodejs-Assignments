const readLine=require("readline");
const rl=readLine.createInterface({
    input:process.stdin,
    output:process.stdout
});
rl.question('Please enter your name:',(name)=>{
    console.log(`Hello ${name}`);
    rl.close(name);
})