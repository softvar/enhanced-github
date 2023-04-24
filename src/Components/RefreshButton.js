import Draggable, {DraggableCore} from 'react-draggable'; // Both at the same time
import { Refresh } from '@mui/icons-material';
import React from 'react';
import styled from "styled-components";

const Icon = styled.div`
background-color: grey;
border-radius: 90%;
width: 41px;
//opacity: 0.5;
cursor: move; /* fallback if grab cursor is unsupported */
cursor: grab;
cursor: -moz-grab;
cursor: -webkit-grab;
filter: drop-shadow(3px 3px 6px #000000)
`;

const rotateElementOnClickForHalfSecondWithTransition = () => {
    const refreshIcon = document.getElementById('refresh-icon');
    refreshIcon.style.transition = 'transform 0.25s';
    refreshIcon.style.transform = 'rotate(360deg)';
    setTimeout(() => {
        refreshIcon.style.transform = 'rotate(0deg)';
    }, 500);
}

const RefreshButton = (props) => {
    return (
        <Draggable>
            <Icon onClick={props.refresh}>
                <Refresh sx={{ color: 'white' }} id="refresh-icon" onClick={rotateElementOnClickForHalfSecondWithTransition} fontSize='large' color='primary'/> 
            </Icon>
        </Draggable>
    );
}
export default RefreshButton;