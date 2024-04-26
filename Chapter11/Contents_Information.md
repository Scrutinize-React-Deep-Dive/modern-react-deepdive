# 11장: Next.js 13과 리액트 18

이 장은 Next.js 13과 리액트 18의 새로운 기능을 소개합니다.

<br>

- [11장: Next.js 13과 리액트 18](#11장-nextjs-13과-리액트-18)
  - [11.1 app 디렉터리의 등장](#111-app-디렉터리의-등장)
    - [11.1.1 라우팅](#1111-라우팅)
  - [11.2 리액트 서버 컴포넌트](#112-리액트-서버-컴포넌트)
    - [11.2.1 기존 리액트 컴포넌트와 서버 사이드 렌더링의 한계](#1121-기존-리액트-컴포넌트와-서버-사이드-렌더링의-한계)
    - [11.2.2 서버 컴포넌트란?](#1122-서버-컴포넌트란)
    - [11.2.3 서버 사이드 렌더링과 서버 컴포넌트의 차이](#1123-서버-사이드-렌더링과-서버-컴포넌트의-차이)
    - [11.2.4 서버 컴포넌트는 어떻게 작동하는가?](#1124-서버-컴포넌트는-어떻게-작동하는가)
  - [11.3 Next.js에서의 리액트 서버 컴포넌트](#113-nextjs에서의-리액트-서버-컴포넌트)
    - [11.3.1 새로운 fetch 도입과 getServerSideProps, getStaticProps, getInitial Props의 삭제](#1131-새로운-fetch-도입과-getserversideprops-getstaticprops-getinitial-props의-삭제)
    - [11.3.2 정적 렌더링과 동적 렌더링](#1132-정적-렌더링과-동적-렌더링)
    - [11.3.3 캐시와 mutating, 그리고 revalidating](#1133-캐시와-mutating-그리고-revalidating)
    - [11.3.4 스트리밍을 활용한 점진적인 페이지 불러오기](#1134-스트리밍을-활용한-점진적인-페이지-불러오기)
  - [11.4 웹팩의 대항마, 터보팩의 등장(beta)](#114-웹팩의-대항마-터보팩의-등장beta)
  - [11.5 서버 액션(alpha)](#115-서버-액션alpha)
    - [11.5.1 form의 action](#1151-form의-action)
    - [11.5.2 input의 submit과 image의 formAction](#1152-input의-submit과-image의-formaction)
    - [11.5.4 server mutation이 없는 작업](#1154-server-mutation이-없는-작업)
    - [11.5.5 서버 액션 사용 시 주의할 점](#1155-서버-액션-사용-시-주의할-점)
  - [11.6 그 밖의 변화](#116-그-밖의-변화)
  - [11.7 Next.js 13 코드 맛보기](#117-nextjs-13-코드-맛보기)
    - [11.7.1 getServerSideProps와 비슷한 서버 사이드 렌더링 구현해 보기](#1171-getserversideprops와-비슷한-서버-사이드-렌더링-구현해-보기)
    - [11.7.2 getStaticProps와 비슷한 정적인 페이지 렌더링 구현해 보기](#1172-getstaticprops와-비슷한-정적인-페이지-렌더링-구현해-보기)
    - [11.7.3 로딩, 스트리밍, 서스펜스](#1173-로딩-스트리밍-서스펜스)
  - [11.8 정리 및 주의사항](#118-정리-및-주의사항)

<br>

## 11.1 app 디렉터리의 등장

### 11.1.1 라우팅

<br>

## 11.2 리액트 서버 컴포넌트

### 11.2.1 기존 리액트 컴포넌트와 서버 사이드 렌더링의 한계



### 11.2.2 서버 컴포넌트란?

### 11.2.3 서버 사이드 렌더링과 서버 컴포넌트의 차이

### 11.2.4 서버 컴포넌트는 어떻게 작동하는가?
<br>

## 11.3 Next.js에서의 리액트 서버 컴포넌트

### 11.3.1 새로운 fetch 도입과 getServerSideProps, getStaticProps, getInitial Props의 삭제

### 11.3.2 정적 렌더링과 동적 렌더링


### 11.3.3 캐시와 mutating, 그리고 revalidating

### 11.3.4 스트리밍을 활용한 점진적인 페이지 불러오기

<br>

## 11.4 웹팩의 대항마, 터보팩의 등장(beta)

<br>

## 11.5 서버 액션(alpha)

### 11.5.1 form의 action

### 11.5.2 input의 submit과 image의 formAction

### 11.5.4 server mutation이 없는 작업

### 11.5.5 서버 액션 사용 시 주의할 점

<br>

## 11.6 그 밖의 변화

<br>

## 11.7 Next.js 13 코드 맛보기

### 11.7.1 getServerSideProps와 비슷한 서버 사이드 렌더링 구현해 보기

### 11.7.2 getStaticProps와 비슷한 정적인 페이지 렌더링 구현해 보기

### 11.7.3 로딩, 스트리밍, 서스펜스

<br>

## 11.8 정리 및 주의사항