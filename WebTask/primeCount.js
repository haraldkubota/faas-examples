"use strict";

/**
 * Count primes from 2 to limit
 */
module.exports = (ctx, req, res) => {
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
  let limit = parseInt(ctx.data.limit);
  let myPrimes = primeCount(limit);
  //res.set('Content-Type', 'application/json');
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });
  res.end(JSON.stringify({
    'limit': limit,
    'primeCount': myPrimes.length,
    'primes': myPrimes
  }));
};