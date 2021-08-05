import styled from "styled-components";
import palette from "@src/utils/palette";
import EditablePage from "@components/editablePage/EditablePage";

const Editable: any = styled.main`
  font-size: 16px;
  padding: 0 calc(96px + env(safe-area-inset-right)) 0
    calc(96px + env(safe-area-inset-left));

  [contenteditable="true"] {
    margin: 1rem 0;
    padding: 3px 2px;
    white-space: pre-wrap;
    word-break: break-word;
    background-color: ${palette.grey0};
    -webkit-text-fill-color: ${palette.grey3};
  }

  [contentEditable="true"]:empty:before {
    content: attr(data-placeholder);
    -webkit-text-fill-color: ${palette.grey1};
  }

  p[contentEditable="true"]:empty:last-child:before {
    content: '명령어 사용 시 "/"를 입력하세요';
    -webkit-text-fill-color: ${palette.grey1};
  }

  h1 {
    font-size: 1.875em;
    line-height: 1.3;
    font-weight: 600;
  }

  h2 {
    font-size: 1.5em;
    line-height: 1.3;
    font-weight: 600;
  }

  h3 {
    font-size: 1.25em;
    line-height: 1.3em;
    font-weight: 600;
  }

  p {
    font-size: 1em;
    line-height: 1em;
    font-weight: normal;
  }
`;

Editable.Page = EditablePage;

export default Editable;
