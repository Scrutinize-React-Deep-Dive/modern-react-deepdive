## 1. 서버 사이드 렌더링이란?

### **싱글 페이지 애플리케이션이란?**

싱글 페이지 애플리케이션(Single Page Application, SPA)은 렌더링과 라우팅에 필요한 대부분의 기능을 서버가 아닌 브라우저의 자바스크립트에 의존하는 방식을 의미합니다. 최초의 페이지에서 데이터를 불러온 이후 페이지 전환은 자바스크립트와 브라우저의 `history.pushState`와 `history.replaceState`로 이뤄집니다.

사이트의 소스 보기를 통해 HTML 코드를 보면 `<body>` 내부에 아무런 코드가 없고, 최초에 데이터를 불러온 이후에 자바스크립트 리소스와 브라우저 API를 기반으로 모든 작동이 이뤄집니다.

### **싱글 페이지 렌더링 방식의 유행과 JAM 스택의 등장**

- 과거에는 PHP나 JSP를 기반으로 만들어진 서버 사이드 렌더링이 주로 사용되었습니다.
- 자바스크립트가 점점 더 많은 작업을 수행하면서 자바스크립트를 모듈화하는 방법으로 **CommonJS**와 **AMD(Asynchronous Module Definition)**가 나왔습니다.
- 이후 웹페이지의 모든 영역에서 렌더링과 인터랙션을 담당하는 싱글 페이지 렌더링 방식이 인기를 얻었습니다.
- 이러한 유행으로 인해 **JAM 스택**이라는 새로운 용어가 나타났습니다.
  - LAMP 스택(Linux, Apache, MySQL, PHP/Python)에서 서버 의존적 문제로 확장성에 걸림돌이 되었지만, 자바스크립트의 발전과 클라우드 개념의 등장으로 JAM 스택(JavaScript, API, Markup)이 인기를 얻게 되었습니다.
  - JAM 스택의 인기는 Node.js의 발전과 함께 **MEAN(MongoDB, Express.js, AngularJS, Node.js)**이나 **MERN(MongoDB, Express.js, React, Node.js)** 스택과 같은 자바스크립트 기반의 API 서버 구현 구조를 선호하게 되었습니다.

### 새로운 패러다임의 웹서비스를 향한 요구

현대의 웹 애플리케이션은 다양한 작업을 처리하며, 앱 내부에서도 웹처럼 구동되는 경우가 많습니다. 사용자의 기기와 인터넷 속도가 크게 개선되었음에도 불구하고, 실제 사용자들이 느끼는 웹 애플리케이션의 로딩 속도는 여전히 개선이 필요합니다. 이는 여러 요인에 기인할 수 있습니다.

**평균 자바스크립트 코드의 크기 (2010 ~ 2020)**

자바스크립트 코드의 크기는 지난 10년간 지속적으로 증가해왔습니다. 이는 웹 애플리케이션이 더 많은 기능을 제공하고 복잡한 인터랙션을 지원하기 위해 점점 더 많은 자바스크립트 코드를 포함하게 되었기 때문입니다. 

- 2010년: 평균 자바스크립트 파일 크기 약 100KB
- 2020년: 평균 자바스크립트 파일 크기 약 500KB

이러한 증가 추세는 웹 애플리케이션의 기능이 확장됨에 따라 더욱 가속화되었습니다.

**스크립트가 페이지당 소비하는 CPU 시간 (2010 ~ 2020)**

자바스크립트가 페이지에서 소비하는 CPU 시간도 함께 증가했습니다. 이는 복잡한 연산, 애니메이션, 동적 데이터 처리 등 다양한 기능을 구현하는 데 자바스크립트의 역할이 커졌기 때문입니다.

- 2010년: 평균 페이지당 소비하는 CPU 시간 약 50ms
- 2020년: 평균 페이지당 소비하는 CPU 시간 약 200ms

이러한 수치는 브라우저 성능의 향상에도 불구하고 자바스크립트 코드의 복잡성과 크기가 증가하면서 더 많은 CPU 자원을 요구하게 된 결과를 반영합니다.


### 참고 링크
- [Web Performance Optimization Guide](https://web.dev/fast/)

## 서버 사이드 렌더링이란?

서버 사이드 렌더링(Server Side Rendering, SSR)은 최초에 사용자에게 보여줄 페이지를 서버에서 렌더링해 빠르게 사용자에게 화면을 제공하는 방식입니다.

### 싱글 페이지 애플리케이션과 서버 사이드 렌더링의 차이

- **SPA**: 사용자에게 제공되는 자바스크립트 번들에서 렌더링을 담당합니다.
- **SSR**: 서버에서 렌더링에 필요한 작업을 모두 수행합니다.

### 장점

1. **최초 페이지 진입 속도**: 서버에서 렌더링을 수행해 빠르게 페이지를 제공할 수 있습니다.
2. **검색 엔진 최적화(SEO)**: 서버에서 미리 렌더링된 페이지를 제공해 검색 엔진과 SNS 공유 시 메타데이터 제공이 용이합니다.
3. **누적 레이아웃 이동 감소**: 서버에서 모든 렌더링 작업을 완료한 후 페이지를 제공하므로 누적 레이아웃 이동(Cumulative Layout Shift)을 줄일 수 있습니다.
4. **사용자 디바이스 성능**: 서버에서 렌더링을 수행해 사용자 디바이스의 성능에 대한 부담을 줄일 수 있습니다.
5. **보안 강화**: 서버에서 민감한 작업을 수행해 브라우저에는 결과만 제공하므로 보안 위협을 줄일 수 있습니다.

### 단점

1. **서버 고려 필요**: 소스코드를 작성할 때 항상 서버를 고려해야 합니다.
2. **적절한 서버 구축 필요**: 서버를 구축하고 물리적 가용량, 장애 복구 전략 등을 고려해야 합니다.
3. **서비스 지연 문제**: 렌더링 작업이 끝나기 전까지 사용자에게 정보를 제공할 수 없어 더 안 좋은 사용자 경험을 제공할 수 있습니다.

## SPA와 SSR을 모두 알아야 하는 이유

두 방법 중 어느 것이 더 낫다고 단언할 수는 없습니다. 현대의 SSR은 최초 진입 시에는 완성된 HTML을 제공받고, 이후 라우팅에서는 서버에서 내려받은 자바스크립트를 바탕으로 SPA처럼 작동합니다. 따라서 서버와 클라이언트 모두에서 렌더링을 이해해야 두 가지 장점을 모두 취할 수 있는 제대로 된 웹서비스를 구축할 수 있습니다.

## 2. 서버 사이드 렌더링을 위한 리액트 API 살펴보기

React는 서버에서 렌더링할 수 있는 API를 제공하며, 이는 Node.js와 같은 서버 환경에서만 실행할 수 있습니다.

### renderToString

인수로 넘겨받은 리액트 컴포넌트를 렌더링해 HTML 문자열로 반환하는 함수입니다.

```tsx
function ChildrenComponent({ fruits }: { fruits: Array<string> }) {
  function handleClick() {
    console.log('hello');
  }

  return (
    <ul>
      {fruits.map((fruit) => (
        <li key={fruit} onClick={handleClick}>
          {fruit}
        </li>
      ))}
    </ul>
  );
}

function SampleComponent() {
  return (
    <>
      <div>hello</div>
      <ChildrenComponent fruits={['apple', 'banana', 'peach']} />
    </>
  );
}

const result = ReactDOMServer.renderToString(
  React.createElement('div', { id: 'root' }, <SampleComponent />),
);

// result

<div id="root" data-reactroot="">
  <div>hello</div>
  <ul>
    <li>apple</li>
    <li>banana</li>
    <li>peach</li>
  </ul>
</div>;
```

실제 브라우저가 그려야 할 HTML 결과로 만들어 냅니다. 이때 `useEffect` 같은 훅과 `handleClick` 같은 이벤트 핸들러는 포함되지 않습니다.

### renderToStaticMarkup

`renderToString`과 유사하지만 `data-reactroot` 속성을 만들지 않습니다.

```tsx
const result = ReactDOMServer.renderToStaticMarkup(
  React.createElement('div', { id: 'root' }, <SampleComponent />),
);

// result

<div id="root">
  <div>hello</div>
  <ul>
    <li>apple</li>
    <li>banana</li>
    <li>peach</li>
  </ul>
</div>;
```

`renderToStaticMarkup`은 완전히 순수한 HTML만을 반환하므로, hydrate를 수행하면 서버와 클라이언트의 내용이 맞지 않는다는 에러가 발생할 수 있습니다.

### renderToNodeStream

`renderToString`과 결과물이 동일하지만 브라우저에서는 사용할 수 없습니다. `renderToNodeStream`의 결과물은 Node.js의 ReadableStream(utf-8 인코딩된 바이트 스트림)이므로 Node.js에서만 사용할 수 있습니다.

```tsx
export default function App({ todos }: { todos: Array<TodoResponse> }) {
  return (
    <>
      <ul>
        {todos.map((todo, index) => (
          <Todo key={index} todo={todo} />
        ))}
      </ul>
    </>
  );
}

// Node.js 코드
(async () => {
  const response = await fetch('http://localhost:3000');

  try {
    for await (const chunk of response.body) {
      console.log('----chunk----');
      console.log(Buffer.from(chunk.toString()));
    }
  } catch (err) {
    console.error(err.stack);
  }
})();
```

`renderToNodeStream`을 통해 청크로 분리되어 내려오게 해 서버의 부담을 줄일 수 있습니다.

### renderToStaticNodeStream

`renderToNodeStream`과 결과물은 동일하나, 리액트 자바스크립트에 필요한 리액트 속성이 제공되지 않습니다. 순수 HTML 결과물이 필요할 때 사용하는 메서드입니다.

### hydrate

hydrate는 `renderToString`, `renderToNodeStream`으로 생성된 HTML 컨텐츠에 자바스크립트 핸들러나 이벤트를 붙이는 역할을 합니다.

```tsx
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

// containerId를 가리키는 element는 서버에서 렌더링된 HTML의 특정 위치를 의미합니다.
const element = document.getElementById(containerId);
ReactDOM.hydrate(<App />, element);
```

`render`와 다르게 `hydrate`는 이미 렌더링된 HTML이 있다는 가정하에 작업이 수행되고 이벤트를 붙이는 작업만 실행합니다.

### 서버 사이드 렌더링 예제 프로젝트

특정 `/api`에서 할 일 목록을 가져오고,

 각 할 일을 클릭해 `useState`로 완료 여부를 변경할 수 있는 간단한 구조로 설계한 예제입니다.

```tsx
import React from "react";
import { hydrate } from "react-dom";

import App from "./components/App";
import { fetchTodo } from "./fetch";

async function main() {
  const result = await fetchTodo();

  const app = <App todos={result} />;
  const el = document.getElementById("root");

  hydrate(app, el);
}

main();
```

**Server.ts**

```tsx
function main() {
  createServer(serverHandler).listen(PORT, () => {
    console.log(`Server has been started ${PORT}...`);
  });
}
```

3000번 포트를 이용하는 HTTP 서버를 만드는 코드입니다.

```tsx
async function serverHandler(req: IncomingMessage, res: ServerResponse) {
  const { url } = req;

  switch (url) {
    case '/': {
      const result = await fetchTodo();

      const rootElement = createElement(
        'div',
        { id: 'root' },
        createElement(App, { todos: result }),
      );
      const renderResult = renderToString(rootElement);

      const htmlResult = html.replace('__placeholder__', renderResult);

      res.setHeader('Content-Type', 'text/html');
      res.write(htmlResult);
      res.end();
      return;
    }
    case '/stream': {
      res.setHeader('Content-Type', 'text/html');
      res.write(indexFront);

      const result = await fetchTodo();
      const rootElement = createElement(
        'div',
        { id: 'root' },
        createElement(App, { todos: result }),
      );

      const stream = renderToNodeStream(rootElement);
      stream.pipe(res, { end: false });
      stream.on('end', () => {
        res.write(indexEnd);
        res.end();
      });
      return;
    }
    default: {
      res.statusCode = 404;
      res.end("404 Not Found");
    }
  }
}
```

최종 코드는 다음과 같습니다.

```tsx
import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url!, true);
    handle(req, res, parsedUrl);
  }).listen(3000, (err?: any) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});
```

## 3. Next.js 톺아보기

### Next.js란?

Vercel이라는 미국 스타트업에서 만든 리액트 기반 서버 사이드 렌더링 프레임워크입니다.

### Next.js 시작하기

**pages/\_app.tsx**

애플리케이션의 전체 페이지의 시작점으로, 공통으로 설정해야 하는 것들을 여기서 실행할 수 있습니다.

```tsx
import { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
```

**pages/\_document.tsx**

애플리케이션의 HTML을 초기화하는 파일입니다.

```tsx
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```

**pages/\_error.tsx**

클라이언트에서 발생하는 에러 또는 서버에서 발생하는 500 에러를 처리하는 파일입니다.

```tsx
import { NextPageContext } from "next";

function Error({ statusCode }: { statusCode: number }) {
  return <>{statusCode ? `서버에서 ${statusCode}` : "클라이언트에서"} 에러가 발생했습니다.</>;
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : "";
  return { statusCode };
};

export default Error;
```

**pages/404.tsx**

404 페이지를 정의하는 파일입니다.

```tsx
import { useCallback } from "react";

export default function My404Page() {
  const handleClick = useCallback(() => {
    console.log("hi");
  }, []);
  return (
    <h1>
      페이지를 찾을 수 없습니다. <button onClick={handleClick}>클릭</button>
    </h1>
  );
}
```

### 서버 라우팅과 클라이언트 라우팅 차이

Next.js는 서버 사이드 렌더링을 수행하지만 동시에 SPA처럼 클라이언트 라우팅 또한 수행합니다.

```tsx
export default function Hello() {
  console.log(typeof window === "undefined" ? "서버" : "클라이언트");

  return <>hello</>;
}

export const getServerSideProps = () => {
  return {
    props: {},
  };
};

// Home.tsx
import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <ul>
      <li>
        {/* next의 eslint 룰을 잠시 끄기 위해 추가했다. */}
        {/* eslint-disable-next-line */}
        <a href="/hello">A 태그로 이동</a>
      </li>
      <li>
        {/* 차이를 극적으로 보여주기 위해 해당 페이지의 리소스를 미리 가져오는 prefetch를 잠시 꺼두었다. */}
        <Link prefetch={false} href="/hello">
          next/link로 이동
        </Link>
      </li>
    </ul>
  );
};

export default Home;
```

`a` 태그로 이동하는 것과 `Link` 태그로 이동하는 것은 차이점이 있습니다. `a` 태그로 이동하는 경우에는 페이지를 만드는데 필요한 모든 리소스를 처음부터 다 가져오고, 서버와 클라이언트가 동시에 찍힙니다. 반면 `Link` 태그로 이동하는 경우에는 클라이언트에서만 필요한 자바스크립트만 불러온 뒤 클라이언트 라우팅/렌더링 방식으로 동작합니다.

### Data Fetching

**getStaticPaths와 getStaticProps**

```tsx
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: "1" } }, { params: { id: "2" } }],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params;

  const post = await fetchPost(id);

  return {
    props: { post },
  };
};

export default function Post({ post }: { post: Post }) {
  return <div>{post.title}</div>;
}
```

**getServerSideProps**

`getServerSideProps`는 서버에서 실행되는 함수로, 해당 함수가 있으면 페이지 진입 전에 실행됩니다.

```tsx
export const getServerSideProps: GetServerSideProps = async (context) => {
  const {
    query: { id = '' },
  } = context;
  const post = await fetchPost(id.toString());
  return {
    props: { post },
  };
};

export default function Post({ post }: { post: Post }) {
  return <div>{post.title}</div>;
}
```

### getInitialProps

`getInitialProps`는 라우팅에 따라 서버와 클라이언트 모두에서 실행 가능한 메서드입니다.

```tsx
import Link from "next/link";
import { NextPageContext } from "next";

export default function Todo({ todo }: { todo: { userId: number; id: number; title: string; completed: boolean } }) {
  return (
    <>
      <h1>{todo.title}</h1>
      <ul>
        <li>
          <Link href="/todo/1">1번</Link>
        </li>
        <li>
          <Link href="/todo/2">2번</Link>
        </li>
        <li>
          <Link href="/todo/3">3번</Link>
        </li>
      </ul>
    </>
  );
}

Todo.getInitialProps = async (ctx: NextPageContext) => {
  const {
    query: { id = "" },
  } = ctx;
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
  const result = await response.json();
  return { todo: result };
};
```

`getInitialProps`는 가급적이면 `getStaticProps`나 `getServerSideProps`를 사용하는 것이 좋으며, 제한된 페이지에서만 사용하는 것이 좋습니다.

### 스타일 적용하기

**전역 스타일**

전역 스타일을 적용할 때는 `\_app.tsx`를 활용하면 됩니다.

```tsx
import "../styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
```

**컴포넌트 레벨 CSS**

컴포넌트 레벨 CSS를 사용할 때는 `[name].module.css` 파일을 사용합니다.

```tsx
import styles from "./Button.module.css";

export function Button() {


  return (
    <button type="button" className={styles.alert}>
      경고!
    </button>
  );
}
```

**SCSS와 SASS**

Sass 패키지를 설치하여 사용합니다. 변수는 `export` 문법을 통해 사용합니다.

```scss
$primary: blue;

:export {
  primary: $primary;
}
```

```tsx
import styles from "./Button.module.scss";

export function Button() {
  return <button style={{ color: styles.primary }}>경고!</button>;
}
```

**CSS-in-JS**

Styled-components를 사용하기 위해서는 별도의 설정이 필요합니다.

```tsx
import Document, { Html, Head, Main, NextScript, DocumentContext, DocumentInitialProps } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () => originalRenderPage({
        enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
      });

      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
```

**\_app.tsx 응용하기**

```tsx
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

App.getInitialProps = async (context: AppContext) => {
  const appProps = await App.getInitialProps(context);
  const isServer = Boolean(context.ctx.req);
  console.log(`[${isServer ? "서버" : "클라이언트"}] ${context.router.pathname}에서 ${context.ctx?.req?.url}를 요청함`);
  return appProps;
};

export default MyApp;
```

라우팅을 반복하면 서버와 클라이언트에서의 요청 로그를 확인할 수 있습니다. 이를 통해 특정 작업을 최초 요청 시에만 실행하도록 설정할 수 있습니다.

```tsx
App.getInitialProps = async (context: AppContext) => {
  const {
    ctx: { req },
    router: { pathname },
  } = context;

  if (req && !req.url?.startsWith('/_next') && !['/500', '/400', '/_error'].includes(pathname)) {
    doSomethingOnlyOnce();
  }

  return appProps;
};
```

이러한 특성을 활용하면 최초 접근 시 실행해야 하는 작업을 포함할 수 있습니다.
