import knex from 'knex';
import * as dotenv from 'dotenv';
dotenv.config();

const pg = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
  },
});

export default pg;
