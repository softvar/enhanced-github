import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Skeleton from '@mui/material/Skeleton';

const SkeletonGrid = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 1fr 1fr 3fr;
  gap: 0px 0px;
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
                    <Skeleton animation="wave" variant="text" width={350} height={40} />
                </TopLineSkeleton>
                <Skeleton animation="wave" variant="text" width={250} height={20} />
                <Skeleton animation="wave" variant="text" width={150} height={20} />
                <Skeleton animation="wave" variant="text" width={0} height={20} />
                <DecisionSkeleton>
                    <Skeleton animation="wave" variant="text" width={480} height={40} />
                </DecisionSkeleton>
            </div>
            <SkeletonVotePower>
                <Skeleton animation="wave" variant="rectangular" width={150} height={30} />
            </SkeletonVotePower>
            <SkeletonButtonLeft>
                <Skeleton animation="wave" variant="rounded" width={110} height={55} />
            </SkeletonButtonLeft>
            <SkeletonButtonRight>
                <Skeleton animation="wave" variant="rounded" width={110} height={55} />
            </SkeletonButtonRight>
            <SkeletonVoteRows>
                <Skeleton animation="wave" variant="text" width={580} height={30} />
                <Skeleton animation="wave" variant="text" width={0} height={30} />
                <Skeleton animation="wave" variant="text" width={580} height={50} />
                <Skeleton animation="wave" variant="text" width={580} height={50} />
                <Skeleton animation="wave" variant="text" width={580} height={50} />
                <Skeleton animation="wave" variant="text" width={580} height={50} />
                <Skeleton animation="wave" variant="text" width={580} height={50} />
                <Skeleton animation="wave" variant="text" width={580} height={50} />
            </SkeletonVoteRows>
            <div></div>
        </SkeletonGrid>
    )
}
