// Placeholder for OCR Service
// You would use a library like 'tesseract.js' or an API SDK (Google Vision, AWS Textract)

async function parseReceipt(imageBuffer) {
  console.log("Parsing receipt...");
  // 1. Send imageBuffer to an OCR service
  // 2. Process the raw text result
  // 3. Extract fields like amount, date, vendor name
  // 4. Return a structured JSON object

  return {
    amount: 12.50,
    date: '2025-10-04',
    description: 'Coffee at Cafe Day',
    currency: 'USD'
  };
}

module.exports = { parseReceipt };