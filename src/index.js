module.exports = function getZerosCount(number, base) {

  let baseFactors = factorize(base);

  let includesCounts = (() => {
    let res = {};
    
    for (prime in baseFactors){
      res[prime] = getPowInFactorial(prime, number)
    }
    
    return res;
  })();

  let min = Infinity;


  for (let factor in baseFactors){
    let count = (includesCounts[factor] / baseFactors[factor]) | 0;
    if (count < min){
      min = count;
    }
  }

  return min;
}


function factorize(number){

  if (!(number > 1)){
    return null;
  }

  let primes = getPrimes(number);
  let factors = {};

  let i=0;

  while (number !== 1){
    prime = primes[i];
    let remainder = number % prime;

    if (remainder !== 0){
      i++;
    } else {
      i = 0;

      if (factors[prime]){
        factors[prime]++;
      } else {
        factors[prime] = 1;
      }
      
      number = number / prime;
    }
  }

  return factors;
}

function getPrimes(max){

  if (max > 256){
    throw new Error('The parameter "max" should be less than 257.')
  }

  let primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257];
  
  let res = [];
  let length = primes.length;
  for (let i=0; i<length; i++){
    if (primes[i] > max){
      break;
    } else {
      res.push(primes[i])
    }
  }
  
  return res;
}

function getPowInFactorial(prime, number){

  if (prime < 2){
    throw new Error('The parameter "prime" should be greater than 1. The passed value: ' + prime + '.')
  }

  let pow = prime;
  let count = 0;
  
  while (pow <= number){
    count += number / pow | 0;
    pow = pow * prime;
  }

  return count;
}