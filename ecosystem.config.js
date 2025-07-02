module.exports = {
  apps: [
    {
      name: "repo3",
      cwd: "/var/www/html/repo3/3-pilot.sazag.in",
      script: "npm",
      args: "run dev",
      env: {
        NODE_ENV: "development",
        PORT: 5006
      }
    }
  ]
};

