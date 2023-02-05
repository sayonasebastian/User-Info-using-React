
const path = require('path')

const dbPath = path.resolve(__dirname, 'db/database.sqlite')

const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: dbPath,
  },
  useNullAsDefault: true
})

knex.schema
  .hasTable('users')
  .then((exists) => {
    if (!exists) {
      return knex.schema.createTable('users', (dt) => {
        dt.increments('id').primary()
        dt.string('username')
        dt.string('password')
        dt.string('fname')
        dt.string('lname')
        dt.string('email')
        dt.string('count')
      })
        .then(() => {
          res.json({ status: 200 })
        })
        .catch((error) => {
          res.json({ status: 404, error: error.toString() })
        })
    }
  })
  .then(() => {
    console.log('done')
  })
  .catch((error) => {
    res.json({ status: 404, error: error.toString() })
  })

knex.select('*').from('users')
  .then(data => console.log('data:', data))
  .catch(err => console.log(err))

module.exports = knex