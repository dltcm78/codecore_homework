const knex = require('./client');

const queries = {
    // Get all data from database 'cohorts' and order them in createdAt descending order
    getAll() {
        return knex('cohorts').select('*').orderBy('createdAt', 'desc')
    },

    // add new cohort into the database cohorts
    new(n) {
        return knex('cohorts').insert(n)
    },

    // will search where the name is equal to req.body.name
    search(req) {
        return knex("cohorts")
            .whereRaw('LOWER(name) LIKE ?', `${req.body.name}`.toLowerCase())
            .first()
    },

    getOne(req) {
        return knex("cohorts").where("id", req.params.id).first()
    }
}

module.exports = queries