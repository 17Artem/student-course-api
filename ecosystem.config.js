module.exports = {
  apps: [
    {
      name: "app-3000",
      script: "src/server.js",
      env: { PORT: 3000 }
    },
    {
      name: "app-4000",
      script: "src/server.js",
      env: { PORT: 4000 }
    }
  ]
};