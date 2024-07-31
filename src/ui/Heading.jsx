import styled, { css } from "styled-components";

//vì Heading là 1 component nên có thể nhận prop và xử lý bằng js trong đây

{
  /* // truyền as prop thì nó sẽ tạo html đúng như tên đặt 
        ex: as="h3" ==> <h3>Form</h3> */
}
const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 600;
    `}

  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 600;
    `}

    ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 2rem;
      font-weight: 300;
    `}

    ${(props) =>
    props.as === "h4" &&
    css`
      font-size: 2.75rem;
      font-weight: 500;
      text-align: center;
    `}

  line-height:1.4;
`;

export default Heading;
