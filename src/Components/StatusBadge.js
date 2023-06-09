import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
const statusMap = {
    "merge": ['#4A00BA', 'MERGED'],
    "pre-open": ['#4A00BA', 'PRE-OPEN'],
    "new": ['#1ED61B', 'NEW'],
    "conflict": ['#FF8A00', 'CONFLICT'],
    "close": ['#D33131', 'CLOSED'],
    "open": ['#FF6489', 'OPEN']
  };
const Wrapper = styled.div`
    font-size: 10px;
    font-weight: 700;
    background-color: #4A00BA;
    border-radius: 8px;
    color: white;
    width: 75%; 
    padding: 3px 0px;
    text-align: center;
    `;
export default function StatusBadge({state}){ 
    return(
        <Wrapper style={{backgroundColor: statusMap[state][0]}}>
            {statusMap[state][1]}
        </Wrapper>
    )
}