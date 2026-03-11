# 최대공약수 & 최소공배수

## 1. 최대공약수 (Greatest Common Divisor, GCD)

### 정의

두 정수 `a`, `b`의 공통 약수 중 가장 큰 값

```
12의 약수
1 2 3 4 6 12

18의 약수
1 2 3 6 9 18

공통 약수
1 2 3 6

gcd(12,18) = 6
```

#### 수학적 정의

정수 `a`, `b`에 대해

```
gcd(a,b) = max{ d | d divides a and b }
```

즉

```
d | a
d | b
```

를 만족하는 가장 큰 d

### 주요 성질

#### 1. 교환 법칙

```
gcd(a,b) = gcd(b,a)
```

#### 2. 결합 법칙

```
gcd(a,b,c) = gcd(gcd(a,b), c)
```

#### 3. 0과의 관계

```
gcd(a,0) = |a|
gcd(0,b) = |b|
gcd(0,0) = undefined
```

#### 4. 부호 무시

```
gcd(-a,b) = gcd(a,b)
```

보통 구현에서는 절댓값을 취해서 구함

## 2. 최소공배수 (Least Common Multiple, LCM)

### 정의

두 정수 `a`, `b`의 공통 배수 중 가장 작은 값

```
12의 배수
12 24 36 48 ...

18의 배수
18 36 54 ...

lcm(12,18) = 36
```

#### 수학적 정의

```
lcm(a,b) = min { m | a|m and b|m }
```

## 3. GCD와 LCM의 관계

두 정수 `a`, `b`에 대해

```
gcd(a,b) × lcm(a,b) = |a × b|
```

따라서

```
lcm(a,b) = |a × b| / gcd(a,b)
```

#### 예시

```
a = 12
b = 18

gcd = 6

lcm = (12 × 18) / 6 = 36
```

## 4. 유클리드 호제법 (Euclidean Algorithm)

### 정의

두 정수의 최대공약수를 나머지 연산으로 반복 계산하는 알고리즘

#### 핵심 공식

```
gcd(a,b) = gcd(b, a mod b)
```

단

```
b ≠ 0
```

#### 작동 원리

만약

```
a = qb + r
```

이라면

```
r = a - qb
```

이다.

만약 `d`가 `a`, `b`의 공약수라면

```
d | a
d | b
```

따라서

```
d | (a - qb)
```

즉

```
d | r
```

따라서

```
gcd(a,b) = gcd(b,r)
```

### 예제 계산

```
gcd(48,18)
```

```js
// 1단계
48 % 18 = 12
gcd(18,12)

// 2단계
18 % 12 = 6
gcd(12,6)

// 3단계
12 % 6 = 0
gcd(6,0)
```

결과

```
gcd = 6
```

### 알고리즘이 반드시 종료되는 이유

각 단계에서

```
a % b < b
```

이므로

```
a > b > r
```

숫자가 계속 작아지며 반드시 0에 도달함

### 시간복잡도

```
O(log n)
```

최악의 경우는 **피보나치 수**일 때 발생함

### 적용 조건

유클리드 호제법이 성립하려면

| 조건         | 설명               |
| ------------ | ------------------ |
| 정수 입력    | 나머지 연산 정의   |
| 둘 다 0 불가 | gcd(0,0) 정의 없음 |
| 음수 가능    | 보통 절댓값 처리   |

## 5. JavaScript 구현

### GCD 재귀 버전

```javascript
function gcd(a, b) {
  if (b === 0) return a;
  return gcd(b, a % b);
}
```

### GCD 반복문 버전

```javascript
function gcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);

  while (b !== 0) {
    [a, b] = [b, a % b];
  }

  return a;
}
```

### LCM 구현

```javascript
function lcm(a, b) {
  return Math.abs(a * b) / gcd(a, b);
}
```

## 6. 여러 수의 GCD / LCM

### GCD

```
gcd(a,b,c) = gcd(gcd(a,b), c)
```

```javascript
function gcdArray(arr) {
  return arr.reduce((acc, v) => gcd(acc, v));
}
```

### LCM

```
lcm(a,b,c) = lcm(lcm(a,b), c)
```

```javascript
function lcmArray(arr) {
  return arr.reduce((acc, v) => lcm(acc, v));
}
```
