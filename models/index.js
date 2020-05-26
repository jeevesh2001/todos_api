const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.Promise = Promise;

mongoose.connect('mongodb://localhost/todo_api', {
  keepAlive: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});



module.exports.Todo = require('./todo');