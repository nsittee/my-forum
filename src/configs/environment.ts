import path from 'path'

const env = process.env.NODE_ENV;
var envFile = "";
if (env === "local") envFile = 'env/.env.local';
else if (env === "development") envFile = 'env/.env.development.local';
else if (env === "production") envFile = 'env/.env.production.local';
else {
  console.log(`invalid NODE_ENV: ${env} value, default back to 'env/.env.local'`);
  envFile = 'env/.env.local';
}
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config({ path: path.resolve(process.cwd(), envFile) })
