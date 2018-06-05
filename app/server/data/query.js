const { Pool } = require('pg')

const query = async (statement, values = []) => {
    const pool = new Pool()
    const result = pool
        .query(statement, values)
        .catch(e => console.error(e.stack))

    await pool.end()
    return result
}

module.exports = query
