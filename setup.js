const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up AI Coding Platform...\n');

// Check if Node.js version is compatible
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);

if (majorVersion < 18) {
  console.error('❌ Node.js version 18 or higher is required. Current version:', nodeVersion);
  process.exit(1);
}

console.log('✅ Node.js version check passed');

// Create .env files if they don't exist
const serverEnvPath = path.join(__dirname, 'server', '.env');
const clientEnvPath = path.join(__dirname, 'client', '.env');

if (!fs.existsSync(serverEnvPath)) {
  console.log('📝 Creating server .env file...');
  const serverEnvContent = `PORT=5000
MONGODB_URI=mongodb://localhost:27017/ai-coding-platform
JWT_SECRET=your_jwt_secret_key_here_change_this_in_production
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GEMINI_API_KEY=AIzaSyA7C4anyNxXOUVYN-lshnIAhfIUwFfKy4c
NODE_ENV=development
CLIENT_URL=http://localhost:3000`;

  fs.writeFileSync(serverEnvPath, serverEnvContent);
  console.log('✅ Server .env file created');
} else {
  console.log('✅ Server .env file already exists');
}

if (!fs.existsSync(clientEnvPath)) {
  console.log('📝 Creating client .env file...');
  const clientEnvContent = `VITE_API_URL=http://localhost:5000/api`;

  fs.writeFileSync(clientEnvPath, clientEnvContent);
  console.log('✅ Client .env file created');
} else {
  console.log('✅ Client .env file already exists');
}

// Install dependencies
console.log('\n📦 Installing dependencies...');

try {
  console.log('Installing root dependencies...');
  execSync('npm install', { stdio: 'inherit' });

  console.log('Installing server dependencies...');
  execSync('cd server && npm install', { stdio: 'inherit' });

  console.log('Installing client dependencies...');
  execSync('cd client && npm install', { stdio: 'inherit' });

  console.log('✅ All dependencies installed successfully');
} catch (error) {
  console.error('❌ Error installing dependencies:', error.message);
  process.exit(1);
}

// Create MongoDB data directory (for local development)
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
  console.log('✅ Created data directory for MongoDB');
}

console.log('\n🎉 Setup completed successfully!');
console.log('\n📋 Next steps:');
console.log('1. Make sure MongoDB is running on your system');
console.log('2. Update the .env files with your actual configuration values');
console.log('3. Run "npm run dev" to start both servers');
console.log('4. Visit http://localhost:3000 to see the application');
console.log('5. Run "cd server && npm run seed" to populate the database with sample data');
console.log('\n🔧 Configuration:');
console.log('- Backend: http://localhost:5000');
console.log('- Frontend: http://localhost:3000');
console.log('- Database: MongoDB (local or Atlas)');
console.log('- AI: Google Gemini API');
console.log('\n📚 Documentation: See README.md for detailed information');
console.log('\nHappy coding! 🚀');
