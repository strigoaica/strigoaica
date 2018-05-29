module.exports = {
  apps: [
    {
      name: 'strigoaica-server',
      script: 'server.js',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ]
}
