module.exports = {
  port: 9000,
  log: {
    level: "none",
    disabled: false,
  },
  cors: {
    origins: ["http://localhost:3000"],
    maxAge: 3 * 60 * 60,
  },
  database: {
    client: "mysql2",
    host: "localhost",
    port: 3306,
    name: "delawaredb_test",
    username: "root",
    password: "",
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
