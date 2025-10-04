import React, { useState, useEffect } from 'react';

const CurrencyConverter = ({ amount, fromCurrency, toCurrency, onConversion }) => {
  const [exchangeRates, setExchangeRates] = useState({});
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch exchange rates
  useEffect(() => {
    const fetchExchangeRates = async () => {
      if (!fromCurrency || !toCurrency || fromCurrency === toCurrency) {
        setConvertedAmount(amount);
        if (onConversion) onConversion(amount);
        return;
      }

      setLoading(true);
      setError(null);
      
      try {
        // In a real app, this would fetch from https://api.exchangerate-api.com/v4/latest/{BASE_CURRENCY}
        // For demo, we'll use mock data
        const mockRates = {
          USD: { rates: { EUR: 0.85, GBP: 0.73, JPY: 110.0, CAD: 1.25, AUD: 1.35, CHF: 0.92, CNY: 6.45 } },
          EUR: { rates: { USD: 1.18, GBP: 0.86, JPY: 129.0, CAD: 1.47, AUD: 1.59, CHF: 1.08, CNY: 7.60 } },
          GBP: { rates: { USD: 1.37, EUR: 1.16, JPY: 150.0, CAD: 1.71, AUD: 1.85, CHF: 1.26, CNY: 8.85 } },
          JPY: { rates: { USD: 0.0091, EUR: 0.0078, GBP: 0.0067, CAD: 0.011, AUD: 0.012, CHF: 0.0084, CNY: 0.059 } },
          CAD: { rates: { USD: 0.80, EUR: 0.68, GBP: 0.58, JPY: 88.0, AUD: 1.08, CHF: 0.74, CNY: 5.16 } },
          AUD: { rates: { USD: 0.74, EUR: 0.63, GBP: 0.54, JPY: 81.5, CAD: 0.93, CHF: 0.68, CNY: 4.78 } },
          CHF: { rates: { USD: 1.09, EUR: 0.93, GBP: 0.79, JPY: 119.0, CAD: 1.35, AUD: 1.47, CNY: 7.02 } },
          CNY: { rates: { USD: 0.155, EUR: 0.132, GBP: 0.113, JPY: 17.0, CAD: 0.194, AUD: 0.210, CHF: 0.142 } }
        };

        if (mockRates[fromCurrency]) {
          const rate = mockRates[fromCurrency].rates[toCurrency];
          if (rate) {
            const converted = (amount * rate).toFixed(2);
            setConvertedAmount(converted);
            if (onConversion) onConversion(parseFloat(converted));
          } else {
            setError(`Exchange rate not available for ${fromCurrency} to ${toCurrency}`);
            setConvertedAmount(amount);
            if (onConversion) onConversion(amount);
          }
        } else {
          setError(`Base currency ${fromCurrency} not supported`);
          setConvertedAmount(amount);
          if (onConversion) onConversion(amount);
        }
      } catch (err) {
        setError('Failed to fetch exchange rates');
        setConvertedAmount(amount);
        if (onConversion) onConversion(amount);
      } finally {
        setLoading(false);
      }
    };

    fetchExchangeRates();
  }, [amount, fromCurrency, toCurrency, onConversion]);

  if (loading) {
    return <div className="currency-converter-loading">Converting...</div>;
  }

  if (error) {
    return <div className="currency-converter-error">{error}</div>;
  }

  if (fromCurrency === toCurrency) {
    return <span>{amount} {fromCurrency}</span>;
  }

  return (
    <div className="currency-converter">
      <span>{amount} {fromCurrency} = </span>
      <span className="converted-amount">{convertedAmount} {toCurrency}</span>
    </div>
  );
};

export default CurrencyConverter;