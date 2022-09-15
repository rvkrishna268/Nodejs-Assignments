
const mongoose = require('mongoose');
const port = 3000
const app = require('./app');
mongoose.connect('mongodb://localhost/mariodb', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });


// mongoose.connect('mongodb://username:password@host:port/database?options...');

mongoose.connection.once('open', () =>{
    console.log('connection established ${} ')
}).on('connectionError',(err) =>{
    console.log(err);
})

app.listen(port, () => console.log(`App listening on port ${port}!`));