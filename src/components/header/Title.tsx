import React from "react";
import styled from "styled-components";
import palette from "@src/utils/palette";

const Title = () => {
  return (
    <Input
      type="text"
      id="title"
      name="itle"
      placeholder="제목 없음"
      autoComplete="off"
    />
  );
};

const Input = styled.input`
  min-height: 1em;
  cursor: text;
  white-space: pre-wrap;
  word-break: break-word;
  font-weight: 700;
  line-height: 1.2;
  font-size: 40px;
  -webkit-text-fill-color: ${palette.black0};
  caret-color: ${palette.grey2};
  ::-webkit-input-placeholder {
    -webkit-text-fill-color: ${palette.grey0};
  }
`;

export default Title;
