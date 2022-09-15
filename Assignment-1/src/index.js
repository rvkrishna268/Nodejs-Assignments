const fs = require('fs/promises')

const myFileWriter = async (fileName, fileContent) => {
	// write code here
	// dont chnage function name
	try{
		await fs.writeFile(fileName,fileContent);
	}
	catch(err){
		console.log(err);
	}
}

const myFileReader = async (fileName) => {
	// write code here
	// dont chnage function name
	try{
		const data= await fs.readFile(fileName,{encoding:'utf-8'});
		console.log(data);
	}
	catch(err){
		console.log(err);
	}
}


const myFileUpdater = async (fileName, fileContent) => {
	// write code here
	// dont chnage function name
	try{
		await fs.appendFile(fileName,fileContent);
	}
	catch(err){
		console.log(err);
	}
}

const myFileDeleter = async (fileName) => {
	// write code here
	// dont chnage function name
	try{
		await fs.unlink(fileName);
	}
	catch{
		console.log(err);
	}
}
// myFileWriter('file.txt','A sample text');
// myFileReader('file.txt');
// myFileUpdater('file.txt',' ,and now appending more text to it.');
myFileDeleter('file.txt');
module.exports = { myFileWriter, myFileUpdater, myFileReader, myFileDeleter }