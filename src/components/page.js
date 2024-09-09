import React from "react";
import styled from 'styled-components';


export const Page = ({title, ...props}) => {
  return (
    <PageWrap>
        
        
        
        {props.children}
    </PageWrap>
  )
}

const PageWrap = styled("div")`
  height: 100%;
`;
