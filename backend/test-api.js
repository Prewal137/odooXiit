// test-api.js
// Simple script to test API endpoints

const apiTest = async () => {
  try {
    // Test the root endpoint
    const rootResponse = await fetch('http://localhost:8080');
    const rootData = await rootResponse.json();
    console.log('Root endpoint test:', rootData);

    console.log('API tests completed successfully');
  } catch (error) {
    console.error('API test failed:', error);
  }
};

apiTest();