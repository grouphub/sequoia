module.exports = {
  title: process.env.TITLE || 'Grouphub',
  serverPort: process.env.PORT || 9292,
  environment: process.env.NODE_ENV || 'development',
  databaseUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/picker',
  databaseTables: ['plans', 'users'],
  sessionSecret: 'pickerpicker'
};

