import * as dotenv from 'dotenv';
dotenv.config();

const JWT_KEY_REFESH_TOKEN = process.env.JWT_KEY_REFESH_TOKEN;
const G_JWT_KEY_ACCESS_TOKEN = process.env.JWT_KEY_ACCESS_TOKEN;
const G_DB_HOST = process.env.DB_HOST;
const G_DB_PORT = Number(process.env.DB_PORT);
const G_DB_USERNAME = process.env.DB_USERNAME;
const G_DB_PASSWORD = process.env.DB_PASSWORD;
const G_DB_NAME = process.env.DB_NAME;
const G_PORT = process.env.PORT;
const GLOBAL = {
  G_DB_HOST,
  G_PORT,
  G_DB_PORT,
  G_DB_USERNAME,
  G_DB_PASSWORD,
  G_DB_NAME,
  JWT_KEY_REFESH_TOKEN,
  G_JWT_KEY_ACCESS_TOKEN,
};

// constains
export const ROLES_KEY = 'roles';
export enum Roles {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export { GLOBAL };
