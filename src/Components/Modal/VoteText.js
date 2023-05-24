import React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Decision = styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@600;700&display=swap'); 
    font-family: 'Inter', sans-serif;
    font-size: 27px;
    font-weight: 700;
    text-align: center;
    color: black;
    margin: 20px auto 0 auto;
`;

function formatDate(inputDate) {
    const date = new Date(inputDate);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear().toString().substring(2);
    return `${month}/${day}/${year}`;
  }

function VoteText({
    disabled,
  voted,
  chosenSide,
  userVotedAt
})  {
    const [textType, setTextType] = useState('');
    
    useEffect(() => {
        if (!voted) {
            setTextType('Decision');
        }
        if (!voted && disabled) {
            setTextType('None');
        }
        if (voted && chosenSide === 'yes') {
            setTextType('Yes');
        }
        if (voted && chosenSide === 'no') {
            setTextType('No');
        }


    }, [voted, chosenSide, disabled]);

    switch (textType) {
        case 'Decision':
            return (
                <Decision>
                    Vote YES to merge and NO to close
                </Decision>
            );
        case 'Yes':
            return (
                <Decision>
                    You voted YES to merge on {formatDate(userVotedAt)}
                </Decision>
            );
        case 'No':
            return (
                <Decision>
                    You voted NO to close on {formatDate(userVotedAt)}
                </Decision>
            );
        case 'None':
            return (
                <Decision>
                    This Pull Request is not voteable
                </Decision>
            );
        default:
            return (
                <Decision>
                    default
                </Decision>
            );
    }
}
export default VoteText;