import styled from "styled-components";
import Title from "@components/header/Title";
import Date from "@components/header/Date";

const Header: any = styled.header`
  padding: 5rem calc(96px + env(safe-area-inset-right)) 0.5rem
    calc(96px + env(safe-area-inset-left));
`;

Header.Title = Title;
Header.Date = Date;

export default Header;
