const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override')

const indexRouter = require('./routes/index');
const authorRouter = require('./routes/authors');
const bookRouter = require('./routes/books');

mongoose.connect('mongodb+srv://ganeshverma:Ganesh@2000@cluster0.58ofe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});
const db = mongoose.connection;

db.on('error', error => console.error());
db.once('open', () => {
    console.log('Connected to the database')
});



app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');

app.use(bodyparser.urlencoded({ limit: '10mb', extended: false }))
app.use(expressLayouts);
app.use(methodOverride('_method'));
app.use(express.static('public'));

app.use('/', indexRouter);
app.use('/authors', authorRouter);
app.use('/books', bookRouter);

app.listen(process.env.PORT || 3000, (req, res) => {


    console.log('server is running on http://localhost:3000');

});