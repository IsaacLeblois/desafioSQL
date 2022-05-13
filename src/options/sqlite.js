const optionsSqlite = {
    client: 'sqlite3',
    connection: {
      filename: process.cwd()+"/src/database/messages.sqlite"
    },
    useNullAsDefault: true
}

module.exports = optionsSqlite