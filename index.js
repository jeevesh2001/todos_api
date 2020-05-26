const express = require('express');
const app = express();
const bodyParser = require('body-parser');


const todoRoutes = require('./routes/todos');

const PORT = 3000;


app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use('/api/todos', todoRoutes);



app.get('/', (req, res) => {
  res.render("index.html");
});

app.listen(PORT, () => {
  console.log(`App is running on PORT ${PORT}`);
});