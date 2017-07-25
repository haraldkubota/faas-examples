/**
 * Count primes from 2 to limit
 */
exports.handler = (event, context, callback) => {
  function primeCount(n) {
    let allPrimes = [];
    for (let j = 2; j < n; ++j) {
      let isPrime = true;
      let divCheckLimit = Math.sqrt(j);
      for (let i = 2; i <= divCheckLimit &&
        isPrime === true; ++i) {
        if (j % i === 0) isPrime = false;
      }
      if (isPrime) allPrimes.push(j);
    }
    return allPrimes;
  }
  let limit = parseInt(event.queryStringParameters.limit);
  let myPrimes = primeCount(limit);
  callback(null, {
    statusCode: '200',
    body: JSON.stringify({
      'limit': limit,
      'primeCount': myPrimes.length,
      'primes': myPrimes
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
};