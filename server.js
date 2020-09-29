const express = require('express');
const config = require('./server/configure');
let app = express();

app.set('port', process.env.PORT || 3300);
app.set('views', __dirname + '/views');
app = config(app);
// app.get('/', function(req, res) {
//     res.send('Hello World 😎');
// });
app.listen(app.get('port'), function() {
    console.log(`Server up: http://localhost:${app.get('port')}`);
})