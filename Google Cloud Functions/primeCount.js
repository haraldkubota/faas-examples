/**
 * Count primes from 2 to limit
 */

exports.handler = (req, res) => {

  function primeCount(n) {
    let count = 0;
    let allPrimes = [];

    for (let j = 2; j < n; ++j) {
      let isPrime = true;
      let divCheckLimit = Math.sqrt(j);
      for (let i = 2; i <= divCheckLimit && isPrime === true; ++i) {
        if (j % i === 0) isPrime = false;
      }
      if (isPrime) {
        ++count;
        allPrimes.push(j);
      }
    }
    return allPrimes;
  }

  let limit = parseInt(req.query.limit);
  let myPrimes = primeCount(limit);

  res.set('Content-Type', 'application/json');
  res.status(200).send(
    JSON.stringify({
      'limit': limit,
      'primeCount': myPrimes.length,
      'primes': myPrimes
    })
  );
};