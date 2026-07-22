# Union-Find (Disjoint Set)

## 1. Union-Find란?

서로 겹치지 않는 여러 집합을 관리하는 자료구조이다.

다음 두 연산을 빠르게 처리한다.

| 연산          | 의미                              |
| ------------- | --------------------------------- |
| `find(x)`     | x가 속한 집합의 대표(root)를 찾음 |
| `union(a, b)` | a와 b가 속한 두 집합을 합침       |

## 2. 언제 사용하는가?

다음과 같은 상황에서 사용한다.

- 두 원소가 같은 그룹에 속하는지 반복해서 확인
- 여러 그룹을 계속 합침
- 연결 요소의 개수 계산
- 간선을 추가했을 때 사이클이 생기는지 판별
- 크루스칼 알고리즘으로 최소 신장 트리(MST) 구성

핵심 판단 기준

> 연결 관계가 계속 추가되고, 두 원소가 같은 연결 그룹인지 반복해서 확인하는가?

경로 자체, 최단 거리, 연결된 원소의 구체적인 목록이 필요하다면 BFS/DFS가 더 적합할 수 있다.

## 3. parent 배열

각 노드의 부모를 `parent` 배열에 저장한다.

노드 번호가 `1 ~ n`이라면 다음과 같이 초기화한다.

```javascript
const parent = Array.from({ length: n + 1 }, (_, i) => i);
```

처음에는 각 노드가 혼자 하나의 집합을 이루므로 자기 자신이 대표이다.

```
parent[1] = 1
parent[2] = 2
parent[3] = 3
```

## 4. find

### 기본 아이디어

부모를 계속 따라 올라가다가 자기 자신이 부모인 노드를 만나면 그 노드가 대표 노드이다.

```
4 → 3 → 2 → 1
```

위 구조에서 `find(4)`의 결과는 1이다.

### 기본 구현

```javascript
function find(x) {
  if (parent[x] === x) return x;
  return find(parent[x]);
}
```

이 구현도 대표를 정확히 찾지만, 호출할 때마다 같은 경로를 반복해서 올라간다.

### 경로 압축 (Path Compression)

대표를 찾은 뒤, 탐색 과정에서 지나간 노드들의 부모를 대표로 바꾼다.

```javascript
function find(x) {
  if (parent[x] === x) return x;

  parent[x] = find(parent[x]); // 내 부모의 최종 대표값을 찾아서 내 부모로 저장
  return parent[x];
}
```

경로 압축은 전체 트리를 한 번에 수정하지 않는다.  
해당 `find`가 지나간 경로만 압축한다.

## 5. union

`union(a, b)`는 a와 b만 연결하는 연산이 아니라, **a가 속한 집합**과 **b가 속한 집합**을 합치는 연산이다.

따라서 먼저 각각의 대표를 찾는다.

```javascript
function union(a, b) {
  const rootA = find(a);
  const rootB = find(b);

  if (rootA === rootB) return false;

  parent[rootB] = rootA;
  return true;
}
```

대표끼리 연결하는 것이 핵심이다.

최적화를 사용하지 않는다면 연결 방향은 상관없다.

```javascript
parent[rootA] = rootB;
parent[rootB] = rootA; // 동일
```

## 6. Union by Size

트리가 불필요하게 깊어지는 것을 막기 위해 **작은 집합을 큰 집합 아래에** 붙인다.

각 집합의 초기 크기는 1이다.

```javascript
const size = Array(n + 1).fill(1);
```

### 구현

```javascript
function union(a, b) {
  let rootA = find(a);
  let rootB = find(b);

  if (rootA === rootB) return false;

  if (size[rootA] < size[rootB]) {
    [rootA, rootB] = [rootB, rootA];
  }

  parent[rootB] = rootA;
  size[rootA] += size[rootB];

  return true;
}
```

이 구현에서는 항상 `rootA`가 더 큰 집합의 대표가 되도록 두 값을 교환한다.

```javascript
if (size[rootA] < size[rootB]) {
  [rootA, rootB] = [rootB, rootA];
}
```

그 후 작은 집합인 `rootB`를 `rootA` 아래에 붙이고 크기를 더한다.

```javascript
parent[rootB] = rootA;
size[rootA] += size[rootB];
```

### size 배열의 규칙

`size`는 대표 노드에서만 의미가 있다.

```javascript
size[find(x)];
```

로 조회해야 한다.

대표가 아닌 노드의 `size`에는 이전 값이 남아 있을 수 있기 때문에 사용하지 않도록 해야 한다.

### 같은 집합인지 먼저 확인하는 이유

두 노드의 대표가 같다면 이미 같은 집합이다.

```javascript
if (rootA === rootB) return false;
```

이 검사를 하지 않고 크기를 더하면 다음과 같은 버그가 생긴다.

```javascript
rootA = 1;
rootB = 1;
size[1] = 3;

size[rootA] += size[rootB];
// size[1] = 6
```

실제로는 원소가 3개인데 같은 집합의 크기를 다시 더해 6이 된다.

`union`이 성공 여부를 반환하게 만들면 다른 문제에도 활용하기 쉽다.

```javascript
if (union(a, b)) {
  // 서로 다른 두 집합이 실제로 합쳐짐
} else {
  // 이미 같은 집합이었음
}
```

## 8. 최종 템플릿

```javascript
const parent = Array.from({ length: n + 1 }, (_, i) => i);
const size = Array(n + 1).fill(1);

function find(x) {
  if (parent[x] === x) return x;

  parent[x] = find(parent[x]);
  return parent[x];
}

function union(a, b) {
  let rootA = find(a);
  let rootB = find(b);

  if (rootA === rootB) return false;

  if (size[rootA] < size[rootB]) {
    [rootA, rootB] = [rootB, rootA];
  }

  parent[rootB] = rootA;
  size[rootA] += size[rootB];

  return true;
}

function isConnected(a, b) {
  return find(a) === find(b);
}

function getSize(x) {
  return size[find(x)];
}
```

## 9. 유형별 활용

### 같은 집합인지 확인

```javascript
if (find(a) === find(b)) {
  console.log('YES');
} else {
  console.log('NO');
}
```

### 연결 요소 개수 구하기

처음에는 각 노드가 하나의 집합이므로 집합의 개수는 `n`이다.

```javascript
let groupCount = n;

for (const [a, b] of edges) {
  if (union(a, b)) {
    groupCount--;
  }
}
```

이미 같은 집합인 두 노드를 다시 합칠 때는 개수를 줄이지 않는다.

### 사이클 판별

간선을 추가하려는 두 노드가 이미 같은 집합이라면 그 간선은 사이클을 만든다.

```javascript
let hasCycle = false;

for (const [a, b] of edges) {
  if (!union(a, b)) {
    hasCycle = true;
    break;
  }
}
```

### 집합의 크기 구하기

```javascript
const groupSize = size[find(x)];
```

## 10. 시간복잡도

경로 압축과 Union by Size를 함께 사용하면 각 연산은 사실상 상수 시간에 가깝다.

```
O(α(n))
```

`α(n)`은 역 아커만 함수이며 현실적인 입력 범위에서는 매우 작은 값이다.

연산이 m개라면 전체 시간복잡도는 다음과 같다.

```
O(m α(n))
```
