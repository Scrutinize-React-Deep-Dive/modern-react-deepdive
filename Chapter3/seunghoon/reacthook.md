# 리액트의 모든 훅 파헤치기

## 3.1 리액트의 모든 훅 파헤치기

### 3.1.1 useState

`useState`는 함수형 컴포넌트에서 상태를 관리할 수 있게 해주는 훅입니다. 함수형 컴포넌트 내에서 상태를 선언하고, 해당 상태를 업데이트하는 함수를 반환합니다. `useState`를 통해 컴포넌트가 재렌더링될 때마다 상태가 유지되도록 할 수 있습니다.

#### 예시 코드

```jsx
import React, { useState } from 'react';

function Counter() {
	// count 상태 변수와 상태를 갱신할 수 있는 setCount 함수를 선언합니다.
	const [count, setCount] = useState(0);

	return (
		<div>
			<p>You clicked {count} times</p>
			<button onClick={() => setCount(count + 1)}>Click me</button>
		</div>
	);
}

export default Counter;
```

#### 설명

위 코드에서 `useState(0)`는 `count`라는 상태 변수와 `setCount`라는 상태 갱신 함수를 반환합니다. `count`의 초기값은 0이며, `setCount`를 호출할 때마다 `count`가 업데이트되고 컴포넌트는 재렌더링됩니다. 버튼을 클릭하면 `setCount(count + 1)`이 호출되어 `count`가 1 증가합니다.

### 3.1.2 useEffect

`useEffect`는 컴포넌트가 렌더링 될 때마다 특정 작업을 수행하도록 설정할 때 사용합니다. 주로 데이터 fetching, 구독 설정, 타이머 설정 등의 부수 효과(side effects)를 처리합니다. `useEffect`는 컴포넌트가 마운트된 직후와 업데이트된 직후에 호출됩니다.

#### 예시 코드

```jsx
import React, { useState, useEffect } from 'react';

function Example() {
	const [count, setCount] = useState(0);

	// 컴포넌트가 렌더링될 때마다 실행되는 effect를 설정합니다.
	useEffect(() => {
		document.title = `You clicked ${count} times`;
	});

	return (
		<div>
			<p>You clicked {count} times</p>
			<button onClick={() => setCount(count + 1)}>Click me</button>
		</div>
	);
}

export default Example;
```

#### 설명

위 코드에서 `useEffect`는 컴포넌트가 렌더링될 때마다 실행됩니다. `useEffect` 내부의 함수는 `count` 값이 변경될 때마다 호출되며, 해당 함수는 `document.title`을 업데이트합니다. 이는 사용자가 버튼을 클릭할 때마다 페이지 제목이 클릭 횟수로 변경되는 것을 의미합니다.

### 3.1.3 useMemo

`useMemo`는 성능 최적화를 위해 사용되며, 메모이제이션된 값을 반환합니다. 특정 값이 변경될 때만 계산을 수행하여 불필요한 계산을 피할 수 있습니다. 주로 비용이 많이 드는 계산을 메모이제이션할 때 유용합니다.

#### 예시 코드

```jsx
import React, { useState, useMemo } from 'react';

function Example() {
	const [count, setCount] = useState(0);
	const expensiveCalculation = useMemo(() => {
		// 비용이 많이 드는 계산 로직
		return count * 2;
	}, [count]);

	return (
		<div>
			<p>Calculated value: {expensiveCalculation}</p>
			<button onClick={() => setCount(count + 1)}>Increment</button>
		</div>
	);
}

export default Example;
```

#### 설명

위 코드에서 `useMemo`는 `count`가 변경될 때만 재계산을 수행하여 `expensiveCalculation` 값을 반환합니다. 이는 `count`가 변경되지 않는 한, 동일한 `expensiveCalculation` 값을 재사용하여 불필요한 계산을 방지합니다.

### 3.1.4 useCallback

`useCallback`은 메모이제이션된 콜백 함수를 반환합니다. 주로 함수형 컴포넌트의 성능을 최적화할 때 사용되며, 동일한 함수를 재사용하여 불필요한 함수 재생성을 방지합니다.

#### 예시 코드

```jsx
import React, { useState, useCallback } from 'react';

function Example() {
	const [count, setCount] = useState(0);
	const handleClick = useCallback(() => {
		setCount(count + 1);
	}, [count]);

	return (
		<div>
			<p>You clicked {count} times</p>
			<button onClick={handleClick}>Click me</button>
		</div>
	);
}

export default Example;
```

#### 설명

위 코드에서 `useCallback`은 `count`가 변경될 때만 `handleClick` 함수를 재생성합니다. `count`가 변경되지 않는 한 동일한 `handleClick` 함수를 재사용하여 컴포넌트의 성능을 최적화합니다.

### 3.1.5 useRef

`useRef`는 변경 가능한 ref 객체를 생성하는 데 사용됩니다. 주로 DOM 요소에 접근하거나, 컴포넌트의 인스턴스 메서드에 접근할 때 사용됩니다.

#### 예시 코드

```jsx
import React, { useRef } from 'react';

function TextInputWithFocusButton() {
	const inputEl = useRef(null);
	const onButtonClick = () => {
		inputEl.current.focus();
	};

	return (
		<div>
			<input ref={inputEl} type='text' />
			<button onClick={onButtonClick}>Focus the input</button>
		</div>
	);
}

export default TextInputWithFocusButton;
```

#### 설명

위 코드에서 `useRef`는 `inputEl`이라는 ref 객체를 생성합니다. 버튼을 클릭하면 `inputEl.current.focus()`가 호출되어 입력 필드에 포커스가 설정됩니다.

### 3.1.6 useContext

`useContext`는 컨텍스트의 값을 구독하는 데 사용됩니다. 트리 전체에 데이터를 전달할 때 유용하며, props drilling을 피할 수 있습니다.

#### 예시 코드

```jsx
// ThemeContext.js
import React, { createContext, useState } from 'react';

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext };


// ThemedButton.js
import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

const ThemedButton = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      style={{
        backgroundColor: theme === 'light' ? '#ffffff' : '#333333',
        color: theme === 'light' ? '#333333' : '#ffffff',
        padding: '8px 16px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
      }}
      onClick={toggleTheme}
    >
      Toggle Theme
    </button>
  );
};

export default ThemedButton;


// App.js
import React from 'react';
import { ThemeProvider } from './ThemeContext';
import ThemedButton from './ThemedButton';

const App = () => {
  return (
    <ThemeProvider>
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>Themed App</h1>
        <ThemedButton />
      </div>
    </ThemeProvider>
  );
};

export default App;

```

#### 설명

위 코드에서 `useContext`는 `ThemeContext`의 값을 구독하여 `theme` 변수에 저장합니다. `ThemedButton` 컴포넌트는 `theme` 값을 사용하여 스타일을 적용합니다.

### 3.1.7 useReducer

`useReducer`는 `useState`의 대안으로, 복잡한 상태 로직을 처리할 때 사용됩니다. 상태가 복잡하고 여러 가지 상태 변경 로직이 필요할 때, 혹은 상태가 관련된 여러 하위 컴포넌트에서 사용될 때 유용합니다.

#### 예시 코드

```jsx
import React, { useReducer } from 'react';

const initialState = { count: 0 };

function reducer(state, action) {
	switch (action.type) {
		case 'increment':
			return { count: state.count + 1 };
		case 'decrement':
			return { count: state.count - 1 };
		default:
			throw new Error();
	}
}

function Counter() {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<div>
			<p>Count: {state.count}</p>
			<button onClick={() => dispatch({ type: 'increment' })}>+</button>
			<button onClick={() => dispatch({ type: 'decrement' })}>-</button>
		</div>
	);
}

export default Counter;
```

#### 설명

위 코드에서 `useReducer`는 상태와 상태를 업데이트하는 `dispatch` 함수를 반환합니다. `reducer` 함수는 액션 타입에 따라 상태를 갱신합니다. 버튼을 클릭하면 `dispatch` 함수가 호출되어 상태가 업데이트됩니다.

### 3.1.8 useImperativeHandle

`useImperativeHandle`은 ref를 사용하는 부모 컴포넌트가 자식 컴포넌트의 인스턴스 메서드를 호출할 수 있도록 할 때 사용합니다. 주로 컴포넌트의 내부 메서드에 대한 제어를 부모 컴포넌트에 노출할 필요가 있을 때 사용됩니다.

#### 예시 코드

```jsx
import React, { useRef, useImperativeHandle, forwardRef } from 'react';

const FancyInput = forwardRef((props, ref) => {
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    }
  }));

  return <input ref={inputRef} />;
});

export default function App() {
  const inputRef = useRef();

  return (
    <div>
      <FancyInput ref={inputRef} />
      <button onClick={() => input

Ref.current.focus()}>Focus the input</button>
    </div>
  );
}
```

#### 설명

위 코드에서 `useImperativeHandle`은 부모 컴포넌트가 자식 컴포넌트의 `focus` 메서드를 호출할 수 있도록 합니다. `FancyInput` 컴포넌트는 내부적으로 `inputRef`를 사용하지만, 부모 컴포넌트에서는 `inputRef.current.focus()`를 호출할 수 있습니다.

### 3.1.9 useLayoutEffect

`useLayoutEffect`는 동기적으로 DOM을 업데이트합니다. DOM을 읽고 변경해야 하는 경우 사용됩니다. 이는 브라우저가 화면을 그리기 전에 실행되므로, DOM 변경 후 바로 적용해야 하는 경우에 유용합니다.

#### 예시 코드

```jsx
import React, { useLayoutEffect, useRef } from 'react';

function LayoutEffectExample() {
	const inputRef = useRef(null);

	useLayoutEffect(() => {
		console.log(inputRef.current.getBoundingClientRect());
	}, []);

	return <input ref={inputRef} />;
}

export default LayoutEffectExample;
```

#### 설명

위 코드에서 `useLayoutEffect`는 DOM 요소의 크기와 위치를 동기적으로 읽습니다. 이는 브라우저가 화면을 그리기 전에 실행되므로, DOM을 읽고 변경해야 하는 경우에 유용합니다.

### 3.1.10 useDebugValue

`useDebugValue`는 주로 커스텀 훅에서 디버그 값을 설정하는 데 사용됩니다. 개발자 도구에서 커스텀 훅의 상태를 쉽게 디버깅할 수 있도록 도와줍니다.

#### 예시 코드

```jsx
import React, { useState, useDebugValue } from 'react';

function useFriendStatus(friendID) {
	const [isOnline, setIsOnline] = useState(null);

	useDebugValue(isOnline ? 'Online' : 'Offline');

	// ...상태 업데이트 로직

	return isOnline;
}
```

#### 설명

위 코드에서 `useDebugValue`는 `isOnline` 상태를 디버깅하기 위해 사용됩니다. 개발자 도구에서 커스텀 훅의 상태를 'Online' 또는 'Offline'으로 표시합니다.

### 3.1.11 훅의 규칙

1. **최상위에서만 호출:** 훅은 함수형 컴포넌트의 최상위에서만 호출해야 합니다. 루프, 조건문, 중첩 함수 내에서 훅을 호출해서는 안 됩니다.
2. **리액트 함수 컴포넌트 또는 커스텀 훅에서만 호출:** 훅은 리액트 함수 컴포넌트 또는 커스텀 훅에서만 호출해야 합니다. 일반 자바스크립트 함수에서는 훅을 호출할 수 없습니다.

## 3.2 사용자 정의 훅과 고차 컴포넌트 중 무엇을 써야 할까?

### 3.2.1 사용자 정의 훅

사용자 정의 훅은 여러 컴포넌트에서 재사용할 수 있는 훅입니다. 공통된 로직을 추출하여 재사용할 수 있습니다.

#### 예시 코드

```jsx
import { useState, useEffect } from 'react';

function useFetch(url) {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch(url)
			.then((response) => response.json())
			.then((data) => {
				setData(data);
				setLoading(false);
			});
	}, [url]);

	return { data, loading };
}
```

#### 설명

위 코드에서 `useFetch` 훅은 데이터를 가져오는 로직을 캡슐화하여 여러 컴포넌트에서 재사용할 수 있습니다. URL을 인수로 받아 데이터를 fetch하고, 데이터를 반환합니다.

### 3.2.2 고차 컴포넌트

고차 컴포넌트(HOC)는 컴포넌트를 인수로 받아들여 새 컴포넌트를 반환하는 함수입니다. UI 로직을 재사용할 때 유용합니다.

#### 예시 코드

```jsx
import React from 'react';

function withLoading(Component) {
	return function WithLoadingComponent({ isLoading, ...props }) {
		if (!isLoading) return <Component {...props} />;
		return <p>Loading...</p>;
	};
}
```

#### 설명

위 코드에서 `withLoading` HOC는 `isLoading` prop에 따라 로딩 상태를 표시하거나 실제 컴포넌트를 렌더링합니다. 이는 로딩 상태 처리를 여러 컴포넌트에서 재사용할 수 있도록 합니다.

### 3.2.3 사용자 정의 훅과 고차 컴포넌트 중 무엇을 써야 할까?

사용자 정의 훅과 고차 컴포넌트 중 무엇을 사용할지는 상황에 따라 다릅니다. 상태와 로직을 공유하려면 사용자 정의 훅을, UI를 공유하려면 고차 컴포넌트를 사용하는 것이 일반적입니다.

---

# 관련된 질문과 답변

<details>
<summary>useState란 무엇인가요?</summary>

`useState`는 함수형 컴포넌트에서 상태를 관리할 수 있게 해주는 훅입니다. 상태 변수와 상태를 갱신할 수 있는 함수를 반환하며, 이를 통해 컴포넌트의 상태를 관리할 수 있습니다. 초기값을 인수로 받아 상태 변수에 저장하고, 상태를 변경하는 함수를 통해 상태가 갱신되면 컴포넌트가 다시 렌더링됩니다.

</details>

<details>
<summary>useState란 내부적으로 어떻게 동작하나요?</summary>

`useState`는 컴포넌트의 상태를 관리하는 훅으로, 내부적으로는 상태 변수와 그 상태를 변경하는 함수를 생성합니다. 리액트는 컴포넌트가 렌더링될 때 이 함수를 호출하고, 상태 변수를 반환합니다. 상태 변수는 컴포넌트가 렌더링될 때 현재 상태 값을 유지하고, 상태 변경 함수를 호출하면 새로운 상태 값을 설정합니다. 이후 컴포넌트가 다시 렌더링될 때 상태 변수의 값은 이전과 동일하게 유지됩니다.

</details>

<details>
<summary>useEffect는 언제 사용하나요?</summary>

`useEffect`는 컴포넌트가 렌더링 될 때마다 특정 작업을 수행하도록 설정할 때 사용합니다. 주로 데이터를 가져오거나, 구독 설정, 타이머 설정 등의 부수 효과(side effects)를 처리합니다. `useEffect`는 컴포넌트가 마운트된 직후와 업데이트된 직후에 호출됩니다. 특정 값의 변경 시에만 실행되도록 설정할 수도 있습니다.

</details>

<details>
<summary>seEffect와 useLayoutEffect의 차이점은 무엇인가요?</summary>

`useEffect`와 `useLayoutEffect`는 비동기적으로 DOM을 업데이트하는데 사용됩니다. 그러나 그 차이점은 호출 시점에 있습니다. `useEffect`는 화면이 그려진 후에 실행되는 반면, `useLayoutEffect`는 DOM 변경 후 브라우저가 화면을 그리기 전에 실행됩니다. 따라서 `useLayoutEffect`는 화면이 그려지기 전에 필요한 동기적인 작업을 처리할 때 사용됩니다. 일반적으로 `useEffect`를 사용하고, 렌더링이 블로킹되어야 하는 경우에만 `useLayoutEffect`를 고려합니다.

</details>

<details>
<summary>useMemo는 어떤 경우에 유용한가요?</summary>

`useMemo`는 성능 최적화를 위해 사용됩니다. 특정 값이 변경될 때만 계산을 수행하여 불필요한 계산을 피할 수 있습니다. 주로 비용이 많이 드는 계산을 메모이제이션할 때 유용합니다. 예를 들어, 복잡한 계산 로직이 포함된 함수의 결과를 메모이제이션하여 필요할 때만 다시 계산하도록 할 수 있습니다.

</details>

<details>
<summary>useCallback과 useMemo의 차이점은 무엇인가요?</summary>

`useMemo`는 값을 메모이제이션하는 반면, `useCallback`은 함수를 메모이제이션합니다. 두 훅 모두 성능 최적화를 위해 사용되지만, `useMemo`는 값의 계산을 메모이제이션하고 특정 값이 변경될 때만 다시 계산됩니다, `useCallback`은 함수를 메모이제이션하여 컴포넌트가 다시 렌더링될 때 동일한 함수를 재사용할 수 있도록 하여 불필요한 함수 재생성을 방지합니다.

</details>

<details>
<summary>useRef는 어떤 상황에서 사용하나요?</summary>

`useRef`는 변경 가능한 ref 객체를 생성하는 데 사용됩니다. 주로 DOM 요소에 접근하거나, 컴포넌트의 인스턴스 메서드에 접근할 때 사용됩니다. 예를 들어, 입력 필드에 포커스를 설정하거나, 스크롤 위치를 제어하는 등의 상황에서 유용하게 사용할 수 있습니다.

</details>

<details>
<summary>useContext의 주요 목적은 무엇인가요?</summary>

`useContext`는 컨텍스트의 값을 구독하는 데 사용됩니다. 트리 전체에 데이터를 전달할 때 유용하며, props drilling을 피할 수 있습니다. 주로 테마, 현재 로그인한 사용자, 언어 설정 등 전역적인 데이터를 관리하는 데 사용됩니다. 이를 통해 여러 컴포넌트에서 공통된 데이터를 쉽게 사용할 수 있습니다.

</details>

<details>
<summary>useContext를 사용하는 것과 props를 통해 데이터를 전달하는 것의 장단점은 무엇인가요?</summary>

`useContext`를 사용하면 트리 전체에 데이터를 전달할 수 있어야 하는 경우에 유용합니다. props를 통해 데이터를 전달하는 것은 더 많은 중간 컴포넌트를 거치는 props drilling 현상을 초래할 수 있습니다. 그러나 `useContext`를 사용하면 컴포넌트 간의 의존성이 불투명해질 수 있고, 컴포넌트의 재사용성이 저하될 수 있습니다. 또한, 테스트가 어려워질 수 있습니다.

</details>

<details>
<summary>useReducer는 언제 사용하는 것이 좋나요?</summary>

`useReducer`는 `useState`의 대안으로, **복잡한 상태 로직을 처리할 때 사용**됩니다. 상태가 복잡하고 여러 가지 상태 변경 로직이 필요할 때, 혹은 상태가 관련된 여러 하위 컴포넌트에서 사용될 때 유용합니다. `useReducer`는 상태와 액션을 기반으로 상태를 갱신하는 리듀서 함수를 통해 상태 관리를 보다 구조적으로 할 수 있습니다.

`useReducer`는 복잡한 상태 관리 로직을 다룰 때 유용합니다. 여러 상태 값을 한꺼번에 업데이트할 수 있고, 상태 업데이트 로직을 리듀서 함수에 분리하여 관리할 수 있습니다. 또한, `useReducer`는 컴포넌트 간의 상태를 공유하기 쉽고, 상태 로직을 컴포넌트 외부로 추출하여 재사용할 수 있습니다. 이는 컴포넌트의 유지보수성과 확장성을 향상시킵니다.

</details>

<details>
<summary>useImperativeHandle의 사용 사례는 무엇인가요?</summary>

`useImperativeHandle`은 부모 컴포넌트가 자식 컴포넌트의 인스턴스 메서드를 직접 호출해야 하는 경우에 유용합니다. 주로 자식 컴포넌트의 특정 메서드를 외부에서 직접 호출하여 제어해야 할 때 사용됩니다. 예를 들어, 자식 컴포넌트의 특정 동작을 부모 컴포넌트에서 수행해야 하는 경우에 `useImperativeHandle`을 사용하여 해당 동작을 외부로 노출할 수 있습니다.

</details>

<details>
<summary>useDebugValue는 어떻게 사용되며, 어떤 상황에서 유용한가요?</summary>

`useDebugValue`는 커스텀 훅의 디버깅을 도와주는 훅입니다. 이 훅을 사용하여 개발자 도구에서 커스텀 훅의 상태나 동작을 쉽게 디버깅할 수 있습니다. 주로 커스텀 훅이 복잡한 로직을 포함하거나 외부 데이터와 상호작용할 때 사용됩니다. `useDebugValue`를 사용하면 개발자가 커스텀 훅의 상태를 쉽게 이해하고 디버깅할 수 있습니다.

</details>
