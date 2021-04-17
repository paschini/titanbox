import dotenv from 'dotenv';

dotenv.config();

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 1337;

const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT
};

const MYSQL_HOST = process.env.MYSQL_HOST || '15.10.10.101';
const MYSQL_PORT = parseInt(process.env.MYSQL_HOST || '30775');
const MYSQL_DATABASE = process.env.MYSQL_DATABASE || 'titanbox';
const MYSQL_USER = process.env.MYSQL_USER || 'titanbox';
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || 'ningy0him3';

const MYSQL = {
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  database: MYSQL_DATABASE,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD
};

const config = {
  mysql: MYSQL,
  server: SERVER
};

export default config;
