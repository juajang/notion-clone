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
  max-width: 100%;
  width: 100%;
  min-height: 1em;
  cursor: text;
  white-space: pre-wrap;
  word-break: break-word;
  color: ${palette.grey0};
  caret-color: ${palette.grey1};
  -webkit-text-fill-color: ${palette.grey0};
  font-weight: 700;
  line-height: 1.2;
  font-size: 40px;
`;

export default Title;
