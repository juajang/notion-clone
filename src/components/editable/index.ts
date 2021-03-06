import styled from "styled-components";
import palette from "@src/utils/palette";
import EditablePage from "@components/editable/EditablePage";

const Editable: any = styled.main`
  font-size: 16px;
  padding: 0 calc(96px + env(safe-area-inset-right)) 0
    calc(96px + env(safe-area-inset-left));

  [contenteditable="true"] {
    min-height: 1em;
    display: block;
    margin: 5px 0;
    padding: 3px 2px;
    white-space: pre-wrap;
    word-break: break-word;
    -webkit-text-fill-color: ${palette.grey3};
  }

  [contentEditable="true"]:empty:focus:before {
    content: attr(data-placeholder);
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
