cd /var/www/html/repo3/3-pilot.sazag.in
sudo chown -R ubuntu:ubuntu /var/www/html
npm install
npm run build
sudo chown -R ubuntu:ubuntu /var/www/html/repo3/3-pilot.sazag.in
cd /var/www/html/repo3/3-pilot.sazag.in && pm2 restart ecosystem.config.js

