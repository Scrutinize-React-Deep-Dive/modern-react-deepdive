## 1.1 자바스크립트의 동등 비교

### 자바스크립트의 데이터 타입

**원시 타입(primitive type)**

- boolean
- null
- undefined
- number
- string
- symbol
- bigint

<br/>

**객체 타입(object/reference type)**

- object

<br/>
undefined: 선언됐지만 할당되지 않은 값<br/>
null: 명시적으로 비어 있음을 나타내는 값

⇒ null은 다른 원시값과 다르게, typeof로 확인했을 때, `object` 라는 결과가 반환된다. 이는 초창기 자바스크립트가 값을 표현하는 방식 때문에 발생한 문제로, 이후 변경하고자 했으나 호환성 문제로 실패!

**falsy 한 값**

- false
- 0, -0, 0n, 0x0n
- NaN
- '', "", ``
- null
- undefined

여기서 문자열이 falsy하기 위해서는 반드시 공백이 없는 빈 문자열이어야 한다.

객체와 배열은 내부에 값이 존재하는지 여부와 상관없이 truthy로 취급된다.

---

### **원시 타입 vs 객체 타입**

원시 타입과 객체 타입의 가장 큰 차이점은 **값을 저장하는 방식**이다.

**원시 타입은 값을 직접 저장하지만, 객체 타입은 메모리 상에서 참조됩니다. (변수에는 객체의 위치가 저장됨)**

원시 타입은 값이 불변 형태로 저장되며, 이 값은 변수 할당 시점에 메모리 영역을 차지하고 저장된다. 변경하려면 변수에 재할당해야한다. 또한, 속성이나 메서드가 없다.

동등 비교시에 원시 타입은 값 자체를 비교한다.

**객체는 프로퍼티를 삭제, 수정할 수 있으므로 원시 값과 다르게 변경 가능한 형태로 저장**되며, 값을 복사할 때에도 값이 아닌 참조를 전달.

객체는 값이 같더라도 서로 다른 참조를 갖기 때문에 동등비교시 false

### **📌 Object.is**

: 두 개의 인수를 받으며, 이 인수 두 개가 동일한지 확인하고 반환하는 메서드이다.

==는 강제 형변환 진행, ===는 형변환 작업 x, 타입 비교

Object.is는 이러한 === 보다 더 개발자가 기대하는 방식으로 더 정확히 비교

ex)

```jsx
-0 === +0; // true
Object.is(-0, +0); // false

Number.NaN === NaN; // false
Object.is(Number.NaN, NaN); // true

NaN === 0 / 0; // false
Object.is(NaN, 0 / 0); // true
```

=== 보다 더 정확해진 문법이지만, 객체 비교에 있어서는 ===와 동일하게 동작함.

**Object.is 개념이 중요한 이유** => **리액트에서 사용하는 동등 비교의 방법이기 때문.**

리액트에서는 Object.js로 먼저 비교를 수행하고, 이후 Object.js에서는 수행하지 못하는 비교, 즉 객체 간의 얕은 비교를 한 번 더 수행한다.

- _객체 간의 얕은 비교란 객체의 첫 번째 깊이에 존재하는 값만 비교한다는 것_

**왜 얕은 비교만 할까?**

**1. 성능 향상**

깊은 비교는 비용이 많이 들 수 있다. 모든 속성을 재귀적으로 비교하는 것은 성능에 부담이 된다.

**2. 일반적인 사용 사례**

React에서 사용하는 props의 대부분은 원시값이거나 얕은 객체일 가능성이 높다. React에서는 props에서 꺼내온 값을 기준으로 렌더링을 수행하기 때문에 일반적인 케이스에서는 얕은 비교만으로 충분.

```jsx
type DeeperProps = {
  counter: {
    counter: number,
  },
};
```

⇒ 이와 같이 props가 깊어지는 경우, 즉 한 객체 안에 또 다른 객체가 있을 경우 React.memo는 컴포넌트에 실제 변경된 값이 없음에도 불구하고 메모이제이션된 컴포넌트를 반환하지 못한다.

<br/>

## 1.2 함수

### 함수를 정의하는 방법

: 함수 선언문, 함수 표현식, Function 생성자, 화살표 함수

**함수 표현식과 함수 선언문의 차이 => 호이스팅**

- 함수 선언문은 해당하는 함수의 전체 내용이 호이스팅된다. 따라서, 어디서든 호출 가능
- 함수 표현식은 함수를 변수에 할당하는 것인데, 이 변수 선언 부분만 호이스팅 되고 함수 할당은 호이스팅되지 않음. 따라서 함수 호출은 함수 할당 이후에만 가능

**화살표 함수의 특징**

- constructor를 사용할 수 없다 => 생성자 함수로 사용 불가
- arguments가 존재하지 않는다.
- 일반함수와 this 바인딩의 차이

화살표 함수 이전까지는 함수가 어떻게 호출되느냐에 따라 동적으로 결정.

만약 일반 함수로서 호출된다면, 그 내부의 this는 전역 객체를 가리킨다.

화살표 함수는 함수 자체의 바인딩을 가지지 않는다. 화살표 내부에서 this 바인딩을 참조하면, 상위 스코프의 this를 그대로 따르게 된다.

<br/>

### 함수를 사용하는 방법

**1) 즉시 실행 함수 (Immediately Invoked Function Expression, IIFE)**

함수를 정의하고, 그 순간 즉시 실행되는 함수. 다시 호출 X

```jsx
((a, b) => {
    return a + b
  },
)(5, 10) // 15
```

⇒ 이 특성을 활용하면, 글로벌 스코프를 오염시키지 않는 독립적인 함수 스코프를 운용할 수 있다. 함수의 선언과 실행이 바로 그 자리에서 끝나기 때문에 즉시 실행 함수 내부에 있는 값은 그 함수 내부가 아니고서는 접근이 불가능하기 때문이다.

⇒ 👀 재사용되지 않는 함수 어디에서 사용될까

es) useEffect → asyne/await → 데이터 패칭 1번만 사용할 때

```jsx
(async function () {
  const res = await (await fetch("")).json();
  alert(res);
})();
```

**2) 고차 함수 (Higher Order Function)**

자바스크립트의 함수가 일급 객체라는 특징을 활용하면, 함수를 인자로 받거나, 결과로 새로운 함수를 반환 시킬수 있다. 이런 역할을 하는 함수를 고차 함수라고 한다. ex) map, filter, reduce...

<br/>

### **함수 만들때 주의 사항**

- 함수의 부수 효과(side-effect)를 최대한 억제하라.
  - 함수의 부수 효과란 함수 내의 작동으로 인해 함수가 아닌 함수 외부에 영향을 끼치는 것을 의미. 이러한 부수 효과가 없는 함수를 순수 함수라 한다.
  - 순수 함수는 언제 실행되든 항상 결과가 동일하기 때문에 예측 가능 하며 안정적이다.
  - React 관점에서 본다면, useEffect의 작동을 최소화하자. useEffect 사용은 피할 수 없지만, 최소한으로 줄임으로써 함수의 역할을 좁히고, 버그를 줄이며 컴포넌트의 안정성을 높일 수 있음
  - 예측 가능한 단위의 부수 효과가 작은 함수를 설계하면, 개발자와 이를 유지보수하는 또 다른 개발자에게 도움된다.
- 가능한 한 함수를 작게 만들어라.
  - 함수는 하나의 일을, 그 하나만 잘하면 된다. 그것이 함수의 원래 목적인 재사용성을 높일 수 있는 방법이다.
- 누구나 이해할 수 있는 이름을 붙여라
  - useEffect의 콜백 함수에 이름 붙여보자 → 부수 효과를 일으키는 함수가 많아질수록, 굳이 useEffect 코드를 유심히 살펴보지 않더라도 어떤 일과 작동을 하는지 알아채는 데 도움됨.
  ```jsx
  useEffect(fuction apiRequest() {
  	// ... do something
  }, []))
  ```

<br/>

## **1.3 클래스**

: 자바스크립트에서의 클래스란, **특정한 객체를 만들기 위한 일종의 템플릿과 같은 개념**. 즉, 특정한 형태의 객체를 반복적으로 만들기 위해 사용되는 것이 클래스이다.

이는 객체를 만드는 데 필요한 데이터나 이를 조작하는 코드를 추상화해 객체 생성을 더욱 편리하게 할 수 있다. 또한 자바스크립트 클래스로 하는 모든 것들은 함수로도 동일하게 표현 가능.

**constructor**

: 생성자로, 객체를 생성하는 데 사용하는 특수한 메서드이다. 단 하나만 존재 가능하며, 필요가 없다면 생략 가능.

**프로퍼티**

: 클래스로 인스턴스를 생성할 때 내부에 정의할 수 있는 속성값을 의미

- #을 붙여서 private을 선언하는 방법이 ES2019에 추가됐고, TS를 활용하면 public, protected, private을 사용할 수 있다. JS에서는 기본적으로 모든 프로퍼니가 public이다.

**getter와 setter**

: getter는 클래스에서 무언가 값을 가져올 때 사용된다. getter를 사용하기 위해서는 get을 붙여야 함.

: setter란 클래스 필드에 값을 할당할 때 사용한다. 마찬가지로 set 키워드 먼저 선언 필요

**인스턴스 메서드**

: 클래스 내부에서 선언한 메서드. 이는 실제로 자바스크립트의 prototype에 선언되므로 프로토타입 메서드라고 불리기도 한다.

직접 객체에 선언하지 않았음에도 프로토타입에 있는 메서드를 찾아서 실행을 도와주는 것을 바로 **프로토타입 체이닝**이라고 한다. 모든 객체는 프로토타입을 가지고 있는데, 특성 속성을 찾을 때 자기 자신부터 시작해서 이 프로토타입을 타고 최상위 객체인 Object까지 훑는다.

```jsx
class Car {
  constructor(name) {
    this.name = name;
  }

  //인스턴스 메서드 정의
  hello() {
    console.log(`안녕하세요, ${this.name}입니다.`);
  }
}

const myCar = new Car("자동차");
myCar.hello(); // 안녕하세요, 자동차입니다.

Object.getPrototypeOf(myCar); // {constructor: f, hello: f}
```

프로토타입과 프로토타입 체이닝 덕분에, 생성한 객체에서도 직접 선언하지 않은 hello() 메서드를 호출할 수 있고, 이 메서드 내부에서 this도 접근해 상요할 수 있게 된다.

**정적 메서드**

: 클래스의 인스턴스가 아닌 이름으로 호출할 수 있는 메서드이다.

```jsx
class Car() {
	static hello() {
		console.log("안녕하세요")
	}
)

const myCar = new Car()

myCar.hello() // TypeError: myCar.hello is not a function
Car.hello() // 안녕하세요
```

정적 메서드 내부의 this는 클래스로 생성된 인스턴스가 아닌, 클래스 자신을 가리키기 때문에 다른 메서드에서 일반적으로 사용하는 this를 사용할 수 없다.

this 접근은 할 수 없지만, 인스턴스를 생성하지 않아도 사용할 수 있다는 점, 그리고 생성하지 않아도 접근할 수 있기 때문에 객체를 생성하지 않더라도 여러 곳에서 재사용이 가능하다는 장점이 있다.

**상속**

: extends는 기존 클래스를 상속받아서 자식 클래스에게 이 상속받은 클래스를 기반으로 확장하는 개념이라고 볼 수 있다.

<aside>
💡 클래스는 ES6에서 나온 개념으로, ES6 이전에는 프로토타입을 활용해 클래스의 작동 방식을 동일하게 구현할 수 있었다. 클래스가 작동하는 방식은 자바스크립트의 프로토타입을 활용하는 것이라고 볼 수 있다.

</aside>

<br/>

## **1.4 클로저**

: 함수와 함수가 선언된 어휘적인 환경 (MDN)

선언된 어휘적인 환경이라는 것은 변수가 코드 내부에서 어디서 선언됐는지를 말하는 것이다.

변수의 유효 범위에 따라서 어휘적 환경이 결정 → 스코프

자바스크립트는 기본적으로 함수 레벨 스코프를 따른다.

<br/>