const knex = require('./db')

exports.usersCreate = async (req, res) => {
  knex('users')
    .insert({
      'username': req.body.username,
      'password': req.body.password,
      'fname': req.body.fname,
      'lname': req.body.lname,
      'email': req.body.email,
      'count': req.body.count,
      'file': req.body.file,
      'id': req.body.id,
    })
    .then((data) => {
      res.json({ status: 200, data: data })
    })
    .catch(err => {
      res.json({ status: 404, error: err.toString() })
    })
}


exports.usersCheck = async (req, res) => {
  knex('users')
    .where('username', req.body.username)
    .then((user) => {
      res.json(user)
    })
    .catch(err => {
      res.json({ status: 404, error: err.toString() })
    })
}
