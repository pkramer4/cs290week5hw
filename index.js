var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 25369);

app.get('/',function(req,res){
  query_list = []
  for (key in req.query) {
    query_list.push({key: key, value: req.query[key]});
  }
  var context = {};

  // changes type of request received when get request submitted
  if (query_list.length == 0) {
    context.type = '';
    context.end = ': none yet';
  } else {
    context.type = 'GET';
    context.end = '';
  }

  context.context_list = query_list;
  res.render('get', context);
});

app.post('/', function(req,res){
  var body_list = [];
  for (var key in req.body){
    body_list.push({key:key,value:req.body[key]})
  }

  req_list = []
  for (key in req.query) {
    req_list.push({key: key, value: req.query[key]});
  }

  var context = {};

  // changes type of request received when post request submitted
  if (body_list.length == 0 && req_list.length == 0 ) {
    context.type = '';
    context.end = ': none yet';
  } else {
    context.type = 'POST';
    context.end = '';
  }

  context.body_list = body_list;
  context.req_list = req_list;
  res.render('post', context);
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
