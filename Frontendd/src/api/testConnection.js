// testConnection.js
const testConnection = async () => {
  try {
    const response = await fetch('/api/health');
    const data = await response.json();
    console.log('Backend connection successful:', data);
    return true;
  } catch (error) {
    console.error('Backend connection failed:', error);
    return false;
  }
};

export default testConnection;