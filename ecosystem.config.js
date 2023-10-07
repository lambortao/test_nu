module.exports = {
  apps: [
    {
      name: 'NU-MASTER',
      exec_mode: 'cluster',
      instances: 'max',
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start',
      env: {
        NODE_ENV: 'production'
      },
      watch: true,
      port: 23457
    }
  ]
}
