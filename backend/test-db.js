const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  user: 'postgres',
  password: 'Sahana@2005',
  database: 'expense_db',
  port: 5432,
});

client.connect()
  .then(() => {
    console.log('Connected to PostgreSQL database successfully!');
    // Check the structure of the users table
    return client.query("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'users' ORDER BY ordinal_position");
  })
  .then(res => {
    console.log('Users table structure:');
    res.rows.forEach(row => {
      console.log(`  ${row.column_name}: ${row.data_type}`);
    });
    return client.query("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'companies' ORDER BY ordinal_position");
  })
  .then(res => {
    console.log('Companies table structure:');
    res.rows.forEach(row => {
      console.log(`  ${row.column_name}: ${row.data_type}`);
    });
    client.end();
  })
  .catch(err => {
    console.error('Database query error:', err);
    client.end();
  });