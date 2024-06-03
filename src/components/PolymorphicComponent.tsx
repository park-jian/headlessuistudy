import React, { forwardRef, CSSProperties} from 'react';
//forwardRef는 컴포넌트가 ref(dom에 직접 조작하기 위한 것)를  받아 하위 컴포넌트에게 전달

//T는 타입 매개변수로 React.ElementType 상속받음, as는 제네릭으로 전달받은 T 타입 배개변수를 가짐
type AsProp<T extends React.ElementType> = {
  as?: T;
};
// as라는 이름의 속성을 가진 타입을 만들고, as는 어떤 HTML 태그인지 알려줌

type PolymorphicRef<T extends React.ElementType> = React.ComponentPropsWithRef<T>["ref"];
// PolymorphicRef라는 타입을 만듦. 이 타입은 특정 HTML 태그(ref)를 가리키는 역할을 함
//T가 "button"이면 HTMLButtonElement | null을 반환하고, T가 "input"이면 HTMLInputElement | null을 반환
//React.ComponentPropsWithRef<T>는 T에 해당하는 React 컴포넌트의 속성(props)들을 나타내며, ["ref"]는 해당 props 중 ref 속성만을 선택하는 역할
//예를 들어, <button ref={ref} />에서 T가 "button"이라면 React.ComponentPropsWithRef<"button">["ref"]는 HTMLButtonElement | null

type PolymorphicComponentProps<
  T extends React.ElementType,
  Props = {}
> = AsProp<T> & React.ComponentPropsWithoutRef<T> & Props & {
  ref?: PolymorphicRef<T>;
};
// PolymorphicComponentProps라는 타입을 만듦. 이 타입은 as 속성과 다른 여러 속성을 가질 수 있음. ref도 포함됨
//React.ComponentPropsWithoutRef<T>: 이는 T에 해당하는 React 요소의 ref를 제외한 모든 속성(props)을 가져
//{ ref?: PolymorphicRef<T> }: 이는 컴포넌트가 ref 속성을 가질 수 있도록 함. 이 ref는 PolymorphicRef<T>에 따라 다양한 HTML 요소의 ref를 가리킬 수 있다.

type _CustomComponentProps = {
  size: number;
  color: string;
  style?: CSSProperties; // CSS 속성을 나타내는 타입.
};
// CustomComponentProps 타입을 수정하여 style 속성을 직접 받도록 변경함.
// type CustomComponentProps<T extends React.ElementType> = 
//   PolymorphicComponentProps<T> & {
//     size: number;
//     color: string;
//     style?: CSSProperties; // style 속성을 CSSProperties 타입으로 변경
//   };


type CustomComponentProps<T extends React.ElementType> = 
  PolymorphicComponentProps<T, _CustomComponentProps>;
// CustomComponentProps라는 타입을 만듦. 이 타입은 PolymorphicComponentProps와 _CustomComponentProps를 합친 거임

type CustomComponentComponent = <T extends React.ElementType = "div">(
  props: CustomComponentProps<T>
) => React.ReactElement | null;
// CustomComponentComponent라는 타입을 만듦. 이 타입은 HTML 태그와 속성(props)을 받아서 React 엘리먼트나 null을 반환함

export const CustomComponent: CustomComponentComponent = forwardRef(
  <T extends React.ElementType = "div">(
    { as, size, color, style, ...props }: CustomComponentProps<T>, ref: PolymorphicRef<T>["ref"]
  ) => {
    const Element = as || "div";
    // as 속성이 있으면 그걸 쓰고, 없으면 기본으로 "div"을 사용함
    const combinedStyle = { fontSize: size, color, ...style };

    return <Element ref={ref} {...props} style={combinedStyle} />;
     // Element라는 태그를 만들고 ref와 다른 속성들을 넣음. style로 글자의 크기와 색깔을 지정함
  }
) as CustomComponentComponent;
// 이 코드는 forwardRef로 만든 컴포넌트를 CustomComponentComponent 타입으로 캐스팅함