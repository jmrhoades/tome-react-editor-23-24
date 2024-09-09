import React from "react";
import styled from 'styled-components';
import { Link } from "react-router-dom";

export const SiteNavPanel = () => {
  return (
    <Panel>
        <h3>Nav</h3>
        <Group>
        <h4>Link Display</h4>
        <ul>
            <li>
                <Link to="/link-display">About / Specs</Link>
            </li>
            <li>
                <Link to="/link-display/prototypes/001">Prototype 001</Link>
            </li>
        </ul>
        </Group>
    </Panel>
  )
}

const Panel = styled("div")`
  position: fixed;
  bottom: 0px;
  left: 0px;
  background-color: white;
  color: black;
  padding: 1.5rem 0 3rem;
line-height: 1;
  h3 {

      font-family: ${props => props.theme.typography.fonts.bold};
      font-size: 15px;
      margin-bottom: 2rem;
      padding: 0 2rem;
  }
`;

const Group = styled("div")`

    h4 {
        padding: 0 2rem;
    }
    
    a {
        text-decoration: none;
        padding: 0 2rem;
        display: block;
        
    }
    a, a:visited {
        color: #2861CC;
    }
    a:hover {
        background: #2861CC;
        color: #fff;
    }
`;