var cexpress = require('./config/custom-express.js');
var app = cexpress();

app.listen(3000, function(){
    console.log("Server is running");
});