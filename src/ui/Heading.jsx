import styled, { css } from 'styled-components';

const number = 10;

// const test = css`
//   text-align: center;
//   ${number > 5 && 'background-color: yellow'}
// `;
//
//   /* ${test} */
//   /* font-size: ${number > 20 ? '20px' : '10px'}; */

const Heading = styled.h1`
  ${(props) =>
    props.as === 'h1' &&
    css`
      font-size: 3rem;
      font-weight: 600;
    `};

  ${(props) =>
    props.as === 'h2' &&
    css`
      font-size: 2rem;
      font-weight: 600;
    `};

  ${(props) =>
    props.as === 'h3' &&
    css`
      font-size: 2rem;
      font-weight: 500;
    `}

  background-color: yellow;
`;

export default Heading;
