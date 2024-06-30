# 리액트 개발도구로 디버깅하기

## 리액트 개발도구란?

### 정의 및 용도

리액트 개발도구는 리액트로 만들어진 다양한 애플리케이션을 디버깅하기 위해 만들어진 개발도구입니다. 이 도구는 리액트 애플리케이션의 상태를 실시간으로 확인하고 수정할 수 있게 해주며, 리액트뿐만 아니라 리액트 네이티브 등 다양한 플랫폼에서 사용할 수 있습니다.

## 리액트 개발도구 설치

### 브라우저별 설치 방법

리액트 개발도구는 각 브라우저별 웹 스토어에서 설치할 수 있습니다. 크롬 브라우저를 예로 들면, 크롬 웹 스토어에서 '[React Developer Tools](https://chromewebstore.google.com/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=ko)'를 검색하여 설치할 수 있습니다.

### 설치 후 사용 방법

리액트로 개발되고 접근할 수 있는 페이지에 접속하면, 브라우저 상단의 리액트 아이콘이 활성화됩니다. 개발자 도구를 열면 이전에는 없었던 `components`와 `profiler` 탭이 활성화되어 사용 가능합니다.

![image](https://github.com/Scrutinize-React-Deep-Dive/modern-react-deepdive/assets/48350491/73ebdb50-0f27-4a93-83cd-b0033555099b)


## 리액트 개발도구 활용하기

### 컴포넌트

#### 컴포넌트 트리

컴포넌트 트리는 리액트 애플리케이션의 전체 트리 구조를 한눈에 보여줍니다. 이를 통해 애플리케이션의 구조를 시각적으로 이해하고, 각 컴포넌트의 상태와 props를 확인할 수 있습니다.

![image](https://github.com/Scrutinize-React-Deep-Dive/modern-react-deepdive/assets/48350491/16607a71-bafb-4ef1-887b-cc9884fddcad)


### 상태 관리와 props 사용 예제

[![Edit react debugging](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/sandbox/react-debugging-3mkw4k)

```tsx
import { useState } from 'react';

type RatingProps = {
  initialRating: number;
};

const Rating: React.FC<RatingProps> = ({ initialRating }) => {
  const [rating, setRating] = useState(initialRating);

  const handleClick = (newRating: number) => {
    setRating(newRating);
  };

  return (
    <div className="rating-container">
      <h1 className="rating-title">Rating: {rating}</h1>
      <div className="rating-stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <span 
            key={star} 
            onClick={() => handleClick(star)} 
            className={`rating-star ${star <= rating ? 'selected' : ''}`}
          >
            ★
          </span>
        ))}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <div className="App">
      <Rating initialRating={3} />
    </div>
  );
};

export default App;

```

### 디버깅 및 최적화

이 예제 코드를 리액트 개발도구로 디버깅하면서 주요 포인트를 살펴보겠습니다.

#### 컴포넌트 트리 확인

1. **컴포넌트 트리**에서 `App` 컴포넌트와 `Rating` 컴포넌트를 확인할 수 있습니다.
2. `Rating` 컴포넌트의 props (`initialRating`)와 state (`rating`)를 확인합니다.
3. `Rating` 컴포넌트의 `handleClick` 함수가 호출될 때 상태 변화가 제대로 반영되는지 확인합니다.

#### displayName 설정

컴포넌트를 디버깅할 때 더 명확한 이름을 부여하기 위해 `displayName` 속성을 설정할 수 있습니다.

```tsx
const Rating: React.FC<RatingProps> = ({ initialRating }) => {
  const [rating, setRating] = useState(initialRating);

  const handleClick = (newRating: number) => {
    setRating(newRating);
  };

  return (
    <div className="rating-container">
      <h1 className="rating-title">Rating: {rating}</h1>
      <div className="rating-stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <span 
            key={star} 
            onClick={() => handleClick(star)} 
            className={`rating-star ${star <= rating ? 'selected' : ''}`}
          >
            ★
          </span>
        ))}
      </div>
    </div>
  );
};

Rating.displayName = "Rating Component";

const App: React.FC = () => {
  return (
    <div className="App">
      <Rating initialRating={3} />
    </div>
  );
};

export default App;
```

#### 컴포넌트 도구 사용

1. **컴포넌트 눈 모양 아이콘:** `Rating` 컴포넌트가 HTML의 어디에 랜더링 되었는지 확인할 수 있습니다.
2. **벌레 아이콘:** `Rating` 컴포넌트의 props와 state가 `console.log`에 기록되어 디버깅에 유용합니다.
3. **소스 코드 아이콘:** `Rating` 컴포넌트의 소스 코드를 직접 확인할 수 있습니다.

### 프로파일링

프로파일링 도구는 애플리케이션의 성능을 분석하고 최적화할 수 있게 해줍니다.

#### 설정

프로파일링을 시작하기 전에 몇 가지 설정을 통해 효율성을 높일 수 있습니다.

- **추천 옵션:**
  - 컴포넌트가 랜더링될 때 컴포넌트를 하이라이트하는 기능
  - 프로파일링 도중 왜 랜더링 되었는지 기록하는 모드

#### 프로파일링 메뉴

프로파일링 메뉴를 통해 리액트가 랜더링하는 과정에서 발생하는 상황을 확인할 수 있습니다.

- **어떤 컴포넌트가 몇 번 랜더링되었는지**
- **어떤 작업에서 오래 걸렸는지** 등을 확인 가능합니다.
- **개발 모드에서 실행되는 리액트 애플리케이션에서만 사용**이 가능합니다.
- **버튼 순서대로 다음 기능을 수행:**
  1. **Start Profiling**
  2. **Reload and Start Profiling**
  3. **Stop Profiling**
  4. **Load Profile**
  5. **Save Profile**

#### Flamegraph

Flamegraph를 통해 각 컴포넌트 별 랜더 커밋별 정보를 확인할 수 있습니다.

- **랜더링 되지 않은 컴포넌트 정보도 확인 가능**
  - 의도대로 메모이제이션이 작동하고 있는지, 랜더링이 발생하는지 확인에 유용합니다.
- **랜더링 속도를 너비와 색으로 표기**
  - 너비가 넓을수록 느리게 랜더링
  - 빠름: [초록 < > 노랑] 느림
- **컴포넌트 트리 구조를 확인할 수 있음**

#### Ranked

Ranked는 랜더링이 오래 걸린 컴포넌트 순서대로 나열합니다.

- **Flamegraph와 다르게 랜더링이 발생한 컴포넌트만 보여줌**

#### 타임라인

타임라인은 리액트 18 이상의 환경에서만 확인 가능하며, 시간의 흐름에 따른 리액트 작동을 추적하는 데 사용됩니다.

- **무엇이 어느 시점에서 랜더링 되었는지, 리액트의 유휴 시간(작업하지 않고 쉬고 있는 시간) 파악 가능**
