## 2.1 JSX란?

- JSX(JavaScript XML)는 React에서 사용되는 페이스북에서 소개한 독자적인 문법으로, 다양한 속성을 가진 트리 구조를 토큰화해 자바스크립트(ECMAScript)로 이용 가능하게 변환하여 사용합니다.
- JSX는 **트리 구조의 데이터를 쉽게 작성하기 위한 구문**이고 XML과 유사한 내장형 구문을 가지고 있어서 HTML과 비슷한 형태로 마크업을 작성할 수 있습니다. 트랜스파일러를 통해 일반 자바스크립트 형태의 코드로 변환되어 실행됩니다.

```jsx
import React from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to My React App</h1>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App; // create-react-app 의 App.jsx
```

### 2.1.1 JSX의 정의

JSX는 여러 컴포넌트로 나타냅니다.

- JSXElement
  - JSXElementName
  - JSXAttributes
  - JSXChildren
  - JSXStrings

#### JSXElement

- 컴포넌트를 생성하고 렌더링하는 데 사용됩니다. (HTML 태그와 유사한 구조)
  - _커스텀 컴포넌트 이름은 대문자로 시작해야 인식가능_

| Element               | Description                                                                              | Example          |
| --------------------- | ---------------------------------------------------------------------------------------- | ---------------- |
| JSXOpeningElement     | JSXElement의 시작 부분을 나타내며, `<`로 시작하고 태그 이름과 속성을 포함합니다.         | `<JSXElement>`   |
| JSXClosingElement     | JSXElement의 끝 부분을 나타내며, `</`로 시작하고 태그 이름을 포함합니다.                 | `</JSXElement>`  |
| JSXSelfClosingElement | 자체 닫히는 태그를 나타내며, `<`로 시작하고 태그 이름과 속성을 포함하며, `/`로 닫습니다. | `<JSXElement />` |
| JSXFragment           | 빈 태그로 이루어진 구조를 나타내며, 여러 컴포넌트를 묶어서 반환할 때 사용.               | `<></>`          |

#### JSXElementName

- JSXElement의 요소 이름을 정의합니다.

| Element             | Description                                                                    | Example               |
| ------------------- | ------------------------------------------------------------------------------ | --------------------- |
| JSXIdentifier       | 내부 식별자로, 소문자로 시작하는 컴포넌트의 이름($, \_ 가능).                  | `<$ />`               |
| JSXNamespacedName   | 네임스페이스 조합(JSXIdentifier:JSXIdentifier) (최대 2개)                      | `<my:component>`      |
| JSXMemberExpression | 객체의 속성에 접근하는 멤버 표현식(JSXIdentifier.JSXIdentifier) (여러 개 가능) | `<my.component.item>` |

#### JSXAttributes

- JSXElement의 속성을 나타냅니다. HTML 태그의 속성과 유사한 방식

| Element            | Description                                                     | Example                          |
| ------------------ | --------------------------------------------------------------- | -------------------------------- |
| JSXAttribute       | JSXElement 속성. (key={value})                                  | `className="myclass"`            |
| JSXAttributeName   | JSX 속성의 이름. JSXIdentifier, JSXNamespacedName 규칙으로 생성 | `className`                      |
| JSXAttributeValue  | JSX 속성의 값. 문자열, 중괄호 `{}`로 감싼 표현식, JSXElement.   | `"myclass"` 또는 `{customclass}` |
| JSXSpreadAttribute | 객체의 속성들을 JSX 요소에 전개합니다. (spread 문법)            | `{...props}`                     |

### JSXChildren

- JSXElement을 구성하는 자식 요소(JSXText, JSXElement, JSXFragment, JSXChildExpression) 여러 개의 자식 요소 포함 가능.

| Element            | Description                                                                    | Example                                                |
| ------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------ |
| JSXText            | JSXElement 안에 직접 작성된 텍스트(일반 텍스트로 처리). {,<,>,} 제외한 문자열. | `"simple text"`                                        |
| JSXElement         | HTML 태그나 다른 컴포넌트. 내부 중첩 가능                                      | `<JSXElement><span>sample text<span></JSXElement>`     |
| JSXFragment        | 여러 자식 요소를 그룹화(DOM 엘리먼트를 추가없이 컨테이너 역할).                | `<><ChildElement1 /><ChildElement2 /></>`              |
| JSXChildExpression | 중괄호 `{}` 표현식. 가변적인 값(JSXChild 리턴)을 표현할 때 사용됩니다.         | `{hasLicense ? <ChildElement1 /> : <ChildElement2 />}` |

#### JSXStrings

JSXStrings은 JSXElement에서 사용되는 문자열 리터럴을 나타냅니다. JSXStrings은 JSX 속성 값이나 텍스트 노드로 사용됩니다.

| Element       | Description                     | Example                                     |
| ------------- | ------------------------------- | ------------------------------------------- |
| 일반 문자열   | 일반적인 문자열 리터럴.         | `<div>string literal</div>`                 |
| 템플릿 리터럴 | 백틱(`)을 이용한 템플릿 리터럴. | `<div>{`template literal, ${name}!`}</div>` |

### 2.1.2 JSX 예제

```jsx
import React from "react";

function MyComponent() {
  const name = "John Doe";
  const user = {
    firstName: "Jane",
    lastName: "Doe",
  };

  return (
    <div>
      {/* This is a comment in JSX */}
      <h1>Hello, {name}!</h1>
      <p>Welcome to my website.</p>
      {/* JSX expressions can be used inside curly braces */}
      <p>
        {user.firstName} {user.lastName}
      </p>
      {/* Conditional rendering in JSX */}
      {user.firstName === "Jane" && <p>Hey, Jane!</p>}
      {/* Using array.map() to render lists */}
      <ul>
        {[1, 2, 3, 4, 5].map((number) => (
          <li key={number}>{number}</li>
        ))}
      </ul>
      {/* Using inline styles */}
      <div style={{ backgroundColor: "lightblue", padding: "10px" }}>
        This div has a light blue background.
      </div>
    </div>
  );
}

export default MyComponent;
```

### 2.1.3 JSX의 트랜스파일링

JSX to JS (@babel/plugin-transform-react-jsx)

```tsx
// JSX
const HelloWorld = (
  <div>
    <span>hello world</span>
  </div>
);

const Title = (
  <h3 id="title" onMouseEnter={() => console.log("mouse enter")}>
    Hello I'm title
  </h3>
);
```

위 코드를 바벨로 변환한 결과 (https://babeljs.io/)

```jsx
// JS
const HelloWorld = /*__PURE__*/ React.createElement(
  "div",
  null,
  /*__PURE__*/ React.createElement("span", null, "hello world")
);

const Title = /*__PURE__*/ React.createElement(
  "h3",
  { id: "title", onMouseEnter: () => console.log("mouse enter") },
  "Hello I'm title"
);
```

- (JSXElement, {JSXAttributes, JSXChildren, JSXStrings })
