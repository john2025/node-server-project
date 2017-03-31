module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    {
      name: "node-server",
      script: "./bin/www",
      watch: true,
      ignore_watch: [
        "client",
        "public",
        "test",
        "logs",
        "node_modules"
      ],
      instances: 0,
      exec_mode: "cluster",
      max_memory_restart: "1G",
      error_file: "./logs/err.log",
      out_file: "./logs/out.log",
      merge_logs: false,
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      env: {
        PM2: "true"
      },
      env_production: {
        NODE_ENV: "production"
      },
      env_testing: {
        NODE_ENV: "testing"
      },
      env_development: {
        NODE_ENV: "development"
      }
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy: {
    production: {
      user: "node",
      host: ["212.83.163.1"],
      ref: "origin/master",
      repo: "git@github.com:repo.git",
      path: "/var/www/node-server",
      "post-deploy": "npm install && npm run prod",
      env: {
        NODE_ENV: "production"
      }
    },
    testing: {
      user: "node",
      host: "212.83.163.1",
      ref: "origin/develop",
      repo: "git@github.com:repo.git",
      path: "/var/www/node-server",
      ssh_options: ["StrictHostKeyChecking=no", "PasswordAuthentication=no"],
      "post-setup": "cnpm install && npm run testing",
      "post-deploy": "cnpm install && npm run testing",
      env: {
        NODE_ENV: "testing"
      }
    }
  }
}

