## 5.1 상태 관리는 왜 필요한가?

### 상태의 정의

상태는 애플리케이션의 시나리오에 따라 지속적으로 변경될 수 있는 값을 의미합니다.<br>
상태는 애플리케이션의 동작과 사용자 인터페이스(UI)에 직접적인 영향을 미치므로, 이를 적절히 관리하는 것은 필수적입니다.

### 상태의 예시

상태는 다양한 형태로 나타날 수 있습니다.

**예:**
- **UI 상태**: 다크/라이트 모드, input 값, 알림창 노출 여부 등
- **URL 상태**: 라우팅에 따라 변동되는 값
- **Form 상태**: 로딩, 제출, 비활성화, 검증 등
- **서버에서 가져온 데이터**: API 요청을 통해 가져온 데이터

### 상태 관리 고려 사항

효과적인 상태 관리를 위해 다음과 같은 사항을 고려해야 합니다.

**예:**
1. **상태를 전역 변수 또는 클로저로 관리할 것인가?**
2. **상태의 유효 범위를 어떻게 제한할 것인가?**
3. **상태 변화에 따른 자식 요소들의 반응을 어떻게 처리할 것인가?**
4. **상태 변화에 따른 UI 찢어짐(tearing)을 어떻게 방지할 것인가?**

### 5.1.1 리액트 상태 관리의 역사

리액트 상태 관리의 역사는 다양한 패턴과 라이브러리의 발전을 통해 이루어져 왔습니다.

#### 1. Flux 패턴의 등장

Flux는 페이스북에서 제안한 상태 관리 패턴으로, 단방향 데이터 흐름을 강조합니다.<br> 
이는 애플리케이션의 상태를 예측 가능하게 만들고 디버깅을 용이하게 합니다.<br>
Flux 패턴은 다음과 같은 요소로 구성됩니다.

- **Action**: 사용자 상호작용이나 데이터 요청과 같은 이벤트를 나타내는 객체입니다.
- **Dispatcher**: 액션을 받아서 등록된 콜백(스토어)에 전달하는 역할을 합니다.
- **Store**: 상태와 로직을 관리하며, 상태가 변경되면 뷰에 알립니다.
- **View**: 사용자 인터페이스를 표현하며, 상태 변화에 따라 업데이트됩니다.

#### Flux 패턴 코드 예시

```tsx
type StoreState = { count: number };
type Action = { type: "add"; payload: number };

function reducer(prevState: StoreState, action: Action) {
  const { type: ActionType } = action;
  if (ActionType === "add") {
    return { count: prevState.count + action.payload };
  }
  throw new Error(`Unexpected Action [${ActionType}]`);
}

export default function App() {
  const [state, dispatcher] = useReducer(reducer, { count: 0 });

  function handleClick() {
    dispatcher({ type: "add", payload: 1 });
  }

  return (
    <div>
      <h1>{state.count}</h1>
      <button onClick={handleClick}>+</button>
    </div>
  );
}
```

#### 2. 리덕스의 등장

리덕스는 Flux 패턴을 기반으로 한 상태 관리 라이브러리로, 단일 스토어를 통해 상태를 관리하고 액션과 리듀서를 통해 상태를 업데이트합니다.<br>
이는 상태 관리의 일관성을 높이고, 예측 가능성을 강화합니다.<br>
리덕스는 다음과 같은 요소로 구성됩니다.

- **Action**: 상태 변경을 설명하는 객체입니다.
- **Reducer**: 액션을 기반으로 상태를 업데이트하는 순수 함수입니다.
- **Store**: 상태와 리듀서를 관리하며, 상태 변화에 따라 리스너를 호출합니다.
- **Dispatch**: 액션을 스토어에 전달하는 함수입니다.

#### 리덕스 코드 예시

```tsx
import { createStore } from "redux";

const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";

const increment = () => ({ type: INCREMENT });
const decrement = () => ({ type: DECREMENT });

const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case INCREMENT:
      return state + 1;
    case DECREMENT:
      return state - 1;
    default:
      return state;
  }
};

const store = createStore(counterReducer);

const render = () => {
  console.log(store.getState());
};

store.subscribe(render);

store.dispatch(increment());
store.dispatch(decrement());
```

#### 리덕스의 장점과 단점

|               | 장점                                                                                             | 단점                                             |
|---------------|--------------------------------------------------------------------------------------------------|--------------------------------------------------|
| 전역 상태 관리 | 글로벌 상태 객체를 통해 하위 컴포넌트에 전파 가능                                                   | 단순한 상태 변경을 위한 작업이 복잡함              |
| 스토어 접근    | connect 키워드를 통해 스토어에 바로 접근 가능                                                     | 보일러플레이트 코드가 많음                         |
| 커뮤니티      | 큰 커뮤니티와 많은 미들웨어 지원                                                                 |                                                   |

#### 3. Context API와 useContext

Context API는 리액트의 내장 기능으로, 전역 상태를 관리하고 하위 컴포넌트에 주입할 수 있습니다.<br>
이는 간단한 상태 관리에 유용하지만, 복잡한 상태 관리에는 성능 문제가 발생할 수 있습니다.<br>
Context API는 다음과 같은 요소로 구성됩니다.

- **Context**: 전역 상태를 보유하는 객체입니다.
- **Provider**: Context 값을 하위 컴포넌트에 전달하는 컴포넌트입니다.
- **Consumer**: Context 값을 사용하는 컴포넌트입니다.
- **useContext**: 함수형 컴포넌트에서 Context 값을 사용하기 위한 훅입니다.

#### 4. 훅의 탄생, 그리고 React Query와 SWR

리액트 훅은 함수형 컴포넌트에서 상태와 사이드 이펙트를 관리할 수 있는 다양한 API를 제공합니다.<br>
React Query와 SWR은데이터를 가져오는 fetch 작업을 효율적으로 관리하는 라이브러리입니다.<br>
이들은 데이터 요청을 관리하고, 캐싱, 재검증, 배경 업데이트 등의 기능을 제공합니다.

#### SWR 코드 예시

```jsx
import React from 'react';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function App() {
  const { data, error } = useSWR('https://api.github.com/repos/vercel/swr', fetcher);

  if (error) return 'An error has occurred.';
  if (!data) return 'Loading...';

  return (
    <div>
      <p>{JSON.stringify(data)}</p>
    </div>
  );
}
```

#### 5. Recoil, Zustand, Jotai, Valtio

최근에는 Recoil, Zustand, Jotai, Valtio와 같은 다양한 상태 관리 라이브러리가 등장했습니다.<br>
이들은 리덕스와 달리 작은 크기의 상태를 효율적으로 관리할 수 있도록 설계되었습니다.<br>
각 라이브러리는 다음과 같은 특징을 갖습니다.

- **Recoil**: Facebook에서 개발한 상태 관리 라이브러리로, atoms와 selectors를 사용하여 상태를 관리합니다.
  - **Atoms**: 상태의 단위입니다.
  - **Selectors**: 상태를 기반으로 파생된 값을 생성합니다.
  
- **Jotai**: "minimalist" 상태 관리 라이브러리로, atoms를 사용하여 상태를 관리합니다. React의 Context API 없이도 전역 상태를 관리할 수 있습니다.
  - **Atoms**: 상태의 단위입니다.
  - **Primitive Hooks**: 간단하고 직관적인 API를 제공합니다.
  
- **Zustand**: 적은 설정과 보일러플레이트 코드를 요구하며, 상태를 하나의 저장소(store)에서 관리합니다. 상태 업데이트와 구독이 쉽습니다.
  - **Store**: 상태를 관리하는 객체입니다.
  - **Hooks**: 상태를 사용하는 함수형 컴포넌트에서 호출하는 API입니다.

### 5.2 리액트 훅으로 시작하는 상태 관리

리액트 훅을 사용하면 컴포넌트 내에서 상태를 쉽게 관리할 수 있습니다.<br>
여기서는 기본적인 `useState`와 `useReducer` 훅을 사용하는 방법을 살펴보겠습니다.

#### 5.2.1 가장 기본적인 방법: useState와 useReducer

`useState`와 `useReducer`는 리액트 훅의 기본적인 상태 관리 방법입니다.

- **useState**: 간단한 상태 관리를 위해 사용됩니다. 상태 값과 그 값을 업데이트하는 함수를 반환합니다.
  - **사용 예시**: 간단한 카운터, 토글 상태 등
  
- **useReducer**: 복잡한 상태 로직을 관리하기 위해 사용됩니다. 상태와 리듀서 함수를 연결하여 복잡한 상태 변화를 관리할 수 있습니다.
  - **사용 예시**: 복잡한 폼 상태, 여러 액션을 처리하는 상태 로직 등

#### 5.2.2 지역 상태의 한계를 벗어나보자: useState의 상태를 바깥으로 분리하기

컴포넌트의 로직을 재사용 가능하게 만들기 위해 Custom Hook을 사용할 수 있습니다.<br>
Custom Hook을 통해 상태 관리 로직을 컴포넌트로부터 분리하면 코드의 재사용성과 유지보수성이 향상됩니다.

#### Custom Hook 예시

```javascript
import { useState } from "react";

function useCustomState(initialValue) {
  const [value, setValue] = useState(initialValue);

  function doSomethingWithValue() {
    // 상태 값을 사용하여 수행할 작업 정의
  }

  return [value, setValue, doSomethingWithValue];
}

function SomeComponent() {
  const [value, setValue, doSomethingWithValue] = useCustomState(0);
  // 컴포넌트의 나머지 부분에서 value, setValue, doSomethingWithValue 사용
}
```

#### 5.2.3 useState와 Context를 동시에 사용해 보기

`useState`와 `Context`를 함께 사용하여 전역 상태를 관리할 수 있습니다.<br>
Context를 통해 상태를 전역적으로 주입하고, `useState`를 통해 상태를 관리합니다.

```javascript
import React, { useState, useContext } from "react";

const StateContext = React.createContext();

export function StateProvider({ children }) {
  const [state, setState] = useState(initialState);

  return (
    <StateContext.Provider value={{ state, setState }}>
      {children}
    </StateContext.Provider>
  );
}

function SomeComponent() {
  const { state, setState } = useContext(StateContext);
  // state와 setState 사용
}
```

#### 5.2.4 상태 관리 라이브러리 Recoil, Jotai, Zustand 살펴보기

각 라이브러리는 상태 관리를 단순화하고 효율적으로 만들기 위해 고안되었습니다.

- **Recoil**: Facebook에서 개발한 상태 관리 라이브러리로, atoms와 selectors를 사용하여 상태를 관리합니다.
- **Jotai**: "minimalist" 상태 관리 라이브러리로, atoms를 사용하여 상태를 관리합니다. React의 Context API 없이도 전역 상태를 관리할 수 있습니다.
- **Zustand**: 적은 설정과 보일러플레이트 코드 요구하며, 상태를 하나의 저장소(store)에서 관리합니다. 상태 업데이트와 구독이 쉽습니다.

### 5.2.5 Next.js와 TypeScript를 사용한 상태 관리

다음은 Next.js와 TypeScript를 사용하여 상태 관리를 구현하는 예제입니다.<br>
이 예제에서는 기본적인 `useState`와 `useReducer`를 사용하여 상태 관리를 합니다.

#### `useState`를 사용한 상태 관리

`useState`를 사용하여 상태를 관리하는 예제입니다.

1. **컴포넌트 생성**: `pages/index.tsx`

   ```tsx
   import { useState } from 'react';

   const Home = () => {
     const [count, setCount] = useState(0);

     const increment = () => setCount(count + 1);
     const decrement = () => setCount(count - 1);

     return (
       <div>
         <h1>Counter: {count}</h1>
         <button onClick={increment}>Increment</button>
         <button onClick={decrement}>Decrement</button>
       </div>
     );
   };

   export default Home;
   ```

#### `useReducer`를 사용한 상태 관리

`useReducer`를 사용하여 복잡한 상태를 관리하는 예제입니다.

1. **컴포넌트 생성**: `pages/reducer.tsx`

   ```tsx
   import { useReducer } from 'react';

   type State = { count: number };
   type Action = { type: 'increment' } | { type: 'decrement' };

   const initialState: State = { count: 0 };

   function reducer(state: State, action: Action): State {
     switch (action.type) {
       case 'increment':
         return { count: state.count + 1 };
       case 'decrement':
         return { count: state.count - 1 };
       default:
         throw new Error();
     }
   }

   const Counter = () => {
     const [state, dispatch] = useReducer(reducer, initialState);

     return (
       <div>
         <h1>Counter: {state.count}</h1>
         <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>
         <button onClick={() => dispatch({ type: 'decrement' })}>Decrement</button>
       </div>
     );
   };

   export default Counter;
   ```

### 상태 관리 라이브러리 비교

| 라이브러리    | 장점                                                                                             | 단점                                                                                     |
|---------------|--------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------|
| Redux         | - 글로벌 상태 관리<br>- 다양한 미들웨어 지원<br>- 큰 커뮤니티와 많은 자료                            | - 복잡한 설정과 많은 보일러플레이트 코드<br>- 학습 곡선이 큼                              |
| Context API   | - 전역 상태 관리 가능<br>- 리액트 내장 기능 사용                                                      | - 리렌더링 성능 문제<br>- 복잡한 상태 관리에는 부적합                                     |
| Recoil        | - 세밀한 구독 관리<br>- atoms와 selectors를 사용한 효율적인 상태 관리                                 | - 아직 작은 커뮤니티<br>- 일부 기능 제한                                                  |
| Jotai         | - 간단하고 직관적인 API<br>- 작은 크기와 빠른 성능<br>- Context API 없이도 전역 상태 관리 가능        | - 제한된 생태계<br>- 복잡한 상태 관리에는 부적합                                          |
| Zustand       | - 적은 설정과 보일러플레이트 코드<br>- 간단한 상태 관리<br>- 미들웨어를 통한 기능 확장 가능            | - 큰 애플리케이션에는 부적합<br>- 상태 변화 추적이 어렵                                   |

이렇게 Next.js와 TypeScript를 사용하여 상태 관리 기능을 구현할 수 있습니다.<br>
`useState`는 간단한 상태 관리를 위해, `useReducer`는 복잡한 상태 관리를 위해 사용됩니다.<br>
이러한 기법을 통해 더 복잡한 애플리케이션에서도 효과적으로 상태를 관리할 수 있습니다.
