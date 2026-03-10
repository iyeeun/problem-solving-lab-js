# 스코프 체인 연습

[코드](./scope-chain.js)

1. Global Execution Context 생성

```
- EnvironmentRecord
  - a -> undefined
  - outer -> undefined
- OuterEnvironmentReference
```

2. 1, 2번 라인 (top : 전역)

- EnvironmentRecord
  - a -> `1`
  - outer -> `funtion {...}`
- OuterEnvironmentReference

3. 10번 라인 (top : 전역 -> outer)  
   : `outer 함수 호출`

4. 2번 라인 (top : outer)

```
- EnvironmentRecord
  - inner -> undefined
- OuterEnvironmentReference : 전역
  - a -> 1
  - outer -> funtion {...}
```

5. 3번 라인 (top : outer)

- EnvironmentRecord
  - inner -> `function {...}`
- OuterEnvironmentReference : 전역
  - a -> 1
  - outer -> funtion {...}

6. 7번 라인 (top : outer -> inner)  
   : `inner 함수 호출`

7. 3번 라인 (top : inner)

```
- EnvironmentRecord
  - a -> undefined
- OuterEnvironmentReference : outer
  - inner -> function {...}
```

8. 4번 라인 (top : inner)  
   : `a 출력 -> undefined`

- EnvironmentRecord
  - a -> undefined
- OuterEnvironmentReference : outer
  - inner -> function {...}

9. 5번 라인 (top : inner)

- EnvironmentRecord
  - a -> `3`
- OuterEnvironmentReference : outer
  - inner -> function {...}

10. 6번 라인 (top : inner -> outer)  
    : inner 함수 종료, 콜스택에서 삭제 -> outer 활성화 -> 7번 라인 다음 실행

11. 8번 라인 (top : outer)  
    : `a 출력 -> 1`

- EnvironmentRecord
  - inner -> function {...}
- OuterEnvironmentReference : 전역
  - a -> 1
  - outer -> funtion {...}

=> 현재 EnvironmentRecord에서 식별자를 찾고,  
없으면 OuterEnvironmentReference가 가리키는 LexicalEnvironment로 이동하여 다시 EnvironmentRecord를 확인한다.  
이 과정을 전역까지 반복한다.

12. 9번 라인 (top : outer -> 전역)  
    : outer 함수 종료, 콜스택에서 삭제 -> 전역 활성화 -> 10번 라인 다음 실행

13. 11번 라인 (top : 전역)  
    : `a 출력 -> 1`

- EnvironmentRecord
  - a -> `1`
  - outer -> `funtion {...}`
- OuterEnvironmentReference
