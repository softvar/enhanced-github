import React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Decision = styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@600;700&display=swap');
    font-family: 'Inter', monospace;
    margin-top: 0px;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 17px;
    font-weight: 300;
    color: #333;
`;
const YesGreen = styled.span`
    color: #038800;
`;
const NoRed = styled.span`
    color: #D33131;
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
                    <span>
                    Vote <YesGreen>yes</YesGreen> to merge and <NoRed>no</NoRed> to close
                </span>
                </Decision>
            );
        case 'Yes':
            return (
                <Decision>
                    <span>
                    You voted <YesGreen>yes</YesGreen> to merge on {formatDate(userVotedAt)}
                </span>
                </Decision>
            );
        case 'No':
            return (
                <Decision>
                    <span>
                    You voted <NoRed>no</NoRed> to close on {formatDate(userVotedAt)}
                </span>
                </Decision>
            );
        case 'None':
            return (
                <Decision>
                    <span>
                    This pull request is not voteable
                </span>
                </Decision>
            );
        default:
            return (
                <Decision>
                    <span>
                    default
                </span>
                </Decision>
            );
    }
}
export default VoteText;