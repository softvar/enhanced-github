import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Skeleton from '@mui/material/Skeleton';

const SkeletonGrid = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 1fr 1fr 3fr;
  gap: 0px 0px;
  height: 370px;
  `;

  const SkeletonButton = styled.div`
  display:flex;
  justify-content: center;
  align-items: center;
  margin-left: 50px;
  `;

  const SkeletonButtonLeft = styled(SkeletonButton)`
  justify-content: flex-end;
  margin-right: 40px;
  margin-bottom: 40px;
  `;

  const SkeletonButtonRight = styled(SkeletonButtonLeft)`
  margin-right:50px;
  justify-content: flex-start;
  `;  

  const SkeletonVotePower = styled(SkeletonButton)`
  justify-content: flex-end;
  margin-bottom: 90px;
  `;

  const TopLineSkeleton = styled.div`
  margin-top: 5px;
  `;

  const DecisionSkeleton = styled.div`
  margin-left: 50px;
  `;

  const SkeletonVoteRows = styled.div`
  margin-top: -35px;  
  `;

export default function SkeletonModal() {

    return (
        <SkeletonGrid>
            <div>
                <TopLineSkeleton>
                    <Skeleton animation="wave" variant="text" width={385} height={40} />
                    <Skeleton animation="wave" variant="text" width={385} height={40} />
                    <Skeleton animation="wave" variant="text" width={385} height={40} />
                    <Skeleton animation="wave" variant="text" width={385} height={40} />
                    <Skeleton animation="wave" variant="text" width={385} height={40} />
                    <Skeleton animation="wave" variant="text" width={385} height={40} />
             
                </TopLineSkeleton>
            </div>
        </SkeletonGrid>
    )
}
