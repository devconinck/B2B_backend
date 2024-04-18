module.exports = {
  port: 9000,
  log: {
    level: 'silly',
    disabled: false,
  },
  
  database: {
    //name: 'name',
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    },

  auth: {
    jwt: {
      secret: 'eenveeltemoeilijksecretdatniemandooitzalradenandersisdesitegehacked2',
      expirationInterval: 60 * 60 * 1000, // ms (1 hour)
      issuer: 'brecht',
      audience: 'developer',
    },
  },
};
