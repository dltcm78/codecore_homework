exports.up = function (knex) {
    return knex.schema.table('cohorts', table => {
        table.string('password')
    })
};

exports.down = function (knex) {
    return knex.schema.table('cohorts', table => {
        table.dropColumn('password')
    })
};