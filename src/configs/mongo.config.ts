const user = process.env.MONGO_USER;
const password = process.env.MONGO_PASSWORD;
const db = process.env.MONGO_DB;
let host = process.env.MONGO_HOST;
const port = process.env.MONGO_PORT;
const whatEnv = process.env.ENVIRONMENT;

let credentials = '';
let mongo = 'mongodb+srv://';
let appName = '?retryWrites=true&w=majority';
if (user && password) {
  credentials = `${user}:${password}@`;
}

if (whatEnv == 'LOCAL') {
  mongo = `mongodb://`;
  appName = `?appName=${process.env.APPNAME}`;
  host = host + ':' + port;
}
console.log(`${mongo}${credentials}${host}/${db}${appName}`);

export const connection = `${mongo}${credentials}${host}/${db}${appName}`;
