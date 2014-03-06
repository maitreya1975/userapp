/* GET users listing. */
var mysql      = require('mysql');
var config = require('./config.js');
console.log('DB Config host: ', config.dbConfig.host);
var pool = mysql.createPool(config.dbConfig);

exports.list = function(req, res){
    var users;
    pool.query('SELECT name, email from users', function(err, results, fields) {
        if (err) throw err;
        console.log('The first user name: ', results[0].name);
        res.render('users', { userlist: results });
    });
};

exports.add = function(req, res) {
    console.log('Body = ', req.body);
    var newuser = {name: req.body.name, 
        email: req.body.email};

    pool.query('INSERT INTO users SET ?', newuser, function(err, result) {
        if(err) throw err;
        console.log('Added user {name: "' + newuser.name + '", email:"' + newuser.email + '"} successfully');
    });

    // bounce back to show the list
    res.redirect("back");
};
