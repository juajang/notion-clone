import styled from "styled-components";
import Title from "@components/header/Title";

const Header: any = styled.header`
  padding: 5rem calc(96px + env(safe-area-inset-right)) 1rem
    calc(96px + env(safe-area-inset-left));
`;

Header.Title = Title;

export default Header;
