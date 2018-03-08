module.exports = {
  apps: [
    {
      name: 'strigoaica-server',
      script: 'server.js',
      env: {},
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ]
}
