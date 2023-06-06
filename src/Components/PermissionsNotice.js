import React, { useState, useEffect } from 'react';
import styled from 'styled-components';


const RepoButton = styled.button`
  background-color: #313131;
  color: white;
  width: 200px;
  height: 50px;
  border: none;
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'); 
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  `;


  const PermsNotice = styled.span`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'); 
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  color: black;
  text-align: center;
  margin: 1rem auto;
  `;
  
  const BtnSpan = styled.span`
    text-align: center;
`;

const PermsList = styled.ul`
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
font-family: 'Inter', sans-serif;
font-weight: 400;
color: black;
text-align: center;
list-style-type: disc;
width: 80%;
margin: 0px auto 40px auto;
`;

export default function PermissionsNotice(props){



    return (
        <div className="content">
        <div className="onboard">
          <form name="create">
            <div className="apiKey">
              <PermsNotice>  
                Additional permissions are required to add this repository to Turbosrc:
              </PermsNotice>
              <PermsList>
                <li>Read/write access to your public repositories</li>
              </PermsList>
              <BtnSpan>
                <a
                  href={`https://github.com/login/oauth/authorize?scope=user:email%20public_repo&client_id=${process.env.GITHUB_CLIENT_ID}`}
                  target="_blank"
                >
                  <RepoButton type="button">Update Permissions</RepoButton>
                </a>
              </BtnSpan>
            </div>
            <span>{props.errorText}</span>
          </form>
        </div>
      </div>
    );
}