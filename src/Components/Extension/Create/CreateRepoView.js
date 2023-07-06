import React from 'react';
import styled from 'styled-components';
// TODO: move last else statement in Onboard2.js to here
export default function CreateRepoView(){

    return(
        <div className="content">
            <div className="onboard">
            <CreateRepoInfo>
                Creating this repository on Turbosrc will generate VotePower for this project.
                <br/> 
                <br/> 
                You can then transfer as much or as little VotePower to your community as you like and vote on pull requests.
                <br/>
                <br/> 
                When a majority consensus has been reached, the pull request will either be merged or closed automatically.
            </CreateRepoInfo>
            <CreateRepoForm name="create">
                <span>{errorText}</span>
                <BtnSpan >
                <RepoButton type="button" onClick={() => createRepo()}>
                    Submit
                </RepoButton>
                </BtnSpan>
            </CreateRepoForm>
        </div>
      </div>
    )
}