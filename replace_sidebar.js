const fs = require('fs');
let appJs = fs.readFileSync('js/app.js', 'utf8');

// Remove extra categories from the sidebar
appJs = appJs.replace(/,\s*\{\s*name:\s*"Nginx"[^\}]+\}/g, '');
appJs = appJs.replace(/,\s*\{\s*name:\s*"RabbitMQ & Kafka"[^\}]+\}/g, '');
appJs = appJs.replace(/,\s*\{\s*name:\s*"gRPC"[^\}]+\}/g, '');
appJs = appJs.replace(/,\s*\{\s*name:\s*"Elasticsearch"[^\}]+\}/g, '');
appJs = appJs.replace(/,\s*\{\s*name:\s*"Redis"[^\}]+\}/g, '');

// Update the filter logic
const oldFilter = `if (cat.name === "Database") {`;
const newFilter = `if (cat.name === "System Design") {
        return ["System Design", "Nginx", "RabbitMQ & Kafka", "gRPC", "Elasticsearch", "Redis"].includes(q.category) || q.category.startsWith("System Design");
      }
      if (cat.name === "Database") {`;

appJs = appJs.replace(oldFilter, newFilter);

fs.writeFileSync('js/app.js', appJs);
console.log('Sidebar categories updated');
