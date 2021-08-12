import React from "react";
import styled from "styled-components";
import moment from "moment";
import { ImClock } from "react-icons/all";
import palette from "@src/utils/palette";

const Date = () => {
  const mm = moment();
  const date = mm.format("YYYY년 M월 DD일");
  const a = mm.format("a") === "am" ? "오전" : "오후";
  const time = mm.format("h:mm");

  return (
    <Wrapper>
      <Label>
        <ImClock />
        <span>생성일</span>
      </Label>
      <Value>
        {date} {a} {time}
      </Value>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  font-size: 14px;
  padding: 10px 0;
  color: ${palette.grey2};
`;

const Label = styled.div`
  display: flex;
  flex-grow: 2;
  span {
    margin-left: 7px;
  }
`;

const Value = styled.div`
  flex-grow: 8;
  color: ${palette.grey3};
`;

export default Date;
