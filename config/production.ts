module.exports = {
  port: 9000,
  log: {
    level: "info",
    disabled: false,
  },
  cors: {
    origins: ["http://localhost:3000"],
    maxAge: 3 * 60 * 60,
  },

  database: {
    //name: 'name',
    host: "localhost",
    port: 3306,
    dialect: "mysql",
  },

  auth: {
    argon: {
      saltLength: 32,
      hashLength: 256,
      timeCost: 16,
      memoryCost: 2 ** 17,
    },
    jwt: {
      secret:
        "eenveeltemoeilijksecretdatniemandooitzalradenandersisdesitegehacked2",
      expirationInterval: 60 * 60 * 1000, // ms (1 hour)
      issuer: "sdp-groep2",
      audience: "developer",
    },
  },
};
