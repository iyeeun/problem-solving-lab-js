# 소수(Prime Number) 구하는 방법

## 1. 소수란?

소수(Prime Number)는 1과 자기 자신만을 약수로 가지는 자연수이다.

> 따라서 약수가 한 개인 1은 소수가 아니다

## 2. 소수 판별 방법

소수 문제는 크게 두 가지 유형으로 나뉜다.

| 문제 유형                 | 예            |
| ------------------------- | ------------- |
| 하나의 수가 소수인지 판별 | n = 97        |
| n 이하의 모든 소수 찾기   | n ≤ 1,000,000 |

각 상황마다 사용하는 알고리즘이 다르다.

## 3. 하나의 수가 소수인지 판별하기

### 방법 1 — 기본적인 소수 판별

#### 아이디어

1부터 n-1까지 나누어본다

#### 구현

```javascript
function isPrime(n) {
  if (n <= 1) return false;

  for (let i = 2; i < n; i++) {
    if (n % i === 0) return false;
  }

  return true;
}
```

#### 시간복잡도

```
O(n)
```

#### 특징

- 가장 직관적인 방법
- 매우 비효율적
- 코테에서는 거의 사용하지 않음

### 방법 2 — √n 소수 판별 (가장 기본적인 최적화)

#### 아이디어

어떤 합성수 n이 있다면

```
n = a × b
```

이때

```
a ≤ √n 또는 b ≤ √n
```

반드시 하나는 √n 이하이다.

따라서

```
2 ~ √n 까지만 나누어 보면 된다
```

#### 구현

```javascript
function isPrime(n) {
  if (n <= 1) return false;

  for (let i = 2; i * i <= n; i++) {
    if (n % i === 0) return false;
  }

  return true;
}
```

#### 시간복잡도

```
O(√n)
```

#### 특징

- 단일 소수 판별 문제에서 가장 많이 사용
- 구현 간단
- 대부분 코테 문제에 충분

## 4. n 이하의 모든 소수 찾기 — 에라토스테네스의 체

고대 그리스 수학자 에라토스테네스가 만든 알고리즘

### 핵심 아이디어

```
소수의 배수는 모두 합성수이다
```

그래서

```
2의 배수 제거
3의 배수 제거
5의 배수 제거
...
```

반복하면 소수만 남는다.

### 알고리즘 과정

예: n = 30

초기

```
2 3 4 5 6 7 8 9 10 11 ... 30
```

#### 1단계

```
2의 배수 제거
```

```
4 6 8 10 12 ...
```

#### 2단계

```
3의 배수 제거
```

```
6 9 12 15 ...
```

#### 3단계

```
5의 배수 제거
```

이 과정을 반복하면 소수만 남는다.

### 구현

```javascript
function sieve(n) {
  const isPrime = Array(n + 1).fill(true);

  isPrime[0] = false;
  isPrime[1] = false;

  for (let i = 2; i * i <= n; i++) {
    if (isPrime[i]) {
      for (let j = i * i; j <= n; j += i) {
        isPrime[j] = false;
      }
    }
  }

  return isPrime;
}
```

### 소수 리스트 추출

```javascript
function getPrimes(n) {
  const isPrime = sieve(n);

  return isPrime.map((v, i) => (v ? i : null)).filter((v) => v !== null);
}
```

#### 시간복잡도

```
O(n log log n)
```

매우 빠른 알고리즘이다.

### 중요한 구현 포인트

#### 1. i \* i 부터 시작

```
j = i * i
```

이유

```
i × 2
i × 3
```

은 이미 이전 단계에서 제거됨.

#### 2. √n까지만 반복

```
i * i <= n
```

## 5. 최소 소인수 체 (Smallest Prime Factor)

빠른 소인수 분해를 위한 에라토스테네스의 체 확장 버전

### 아이디어

각 숫자에 대해

```
가장 작은 소인수
```

를 저장한다.

예

```
12 → 2
15 → 3
21 → 3
```

### 구현

```javascript
function buildSPF(n) {
  const spf = Array(n + 1).fill(0);

  for (let i = 2; i <= n; i++) {
    if (spf[i] === 0) {
      for (let j = i; j <= n; j += i) {
        if (spf[j] === 0) {
          spf[j] = i;
        }
      }
    }
  }

  return spf;
}
```

### 소인수 분해

```javascript
function factorize(x, spf) {
  const factors = [];

  while (x !== 1) {
    factors.push(spf[x]);
    x /= spf[x];
  }

  return factors;
}
```

### 시간복잡도

전처리

```
O(n log log n)
```

소인수분해

```
O(log n)
```

## 6. 선형 체 (Linear Sieve)

에라토스테네스보다 더 최적화된 체

특징

```
각 합성수를 정확히 한 번만 제거
```

### 구현

```javascript
function linearSieve(n) {
  const primes = [];
  const isComposite = Array(n + 1).fill(false);

  for (let i = 2; i <= n; i++) {
    if (!isComposite[i]) primes.push(i);

    for (const p of primes) {
      if (i * p > n) break;

      isComposite[i * p] = true;

      if (i % p === 0) break;
    }
  }

  return primes;
}
```

### 시간복잡도

```
O(n)
```
