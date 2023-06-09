import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import loadergif from '../loader.gif';
import Loader from './Loader';
import PermissionsNotice from './PermissionsNotice';
import Fail from './Fail';
import Success from './Success';
import storageUtil from '../utils/storageUtil';
import { postCreateRepo, postCheckGithubTokenPermissions } from '../requests';
import Home from './Home';
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

const CreateRepoInfo = styled.p`
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
font-family: 'Inter', sans-serif;
font-weight: 400;
color: black;
text-align: left;
width: 80%;
margin: 20px auto 40px auto;
`

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

const BtnSpan = styled.span`
text-align: center;
`;

const CreateRepoForm = styled.form`
  margin: 0 auto;
  `;

export default function Onboard2() {
  const user = useSelector(state => state.auth.user);
  const repo = useSelector(state => state.repo.name);
  const owner = useSelector(state => state.repo.owner.login);
  const navigate = useNavigate();

  const currency = repo;

  const [failed, setFailed] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [loader, setLoader] = useState(false);
  const [checking, setChecking] = useState(false);
  const [verified, setVerified] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [length, setLength] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [permissions, setPermissions] = useState({public_repo_scopes:false, push_permissions:false});

  const checkPermissions = async () => {
    try {
        await postCheckGithubTokenPermissions(owner, repo, user.login, user.token).then(res => {
        setPermissions({public_repo_scopes: res.public_repo_scopes, push_permissions: res.push_permissions});
      })
    } catch (error) {
      console.log(error)
      setErrorText(error.message)
    }
  };

  const changeHandler = e => {
    e.preventDefault();
    setApiKey(e.target.value);
    if (e.target.value.length) {
      setLength(true);
      setChecking(true);
      checkPermissions();
      setTimeout(() => {
        setChecking(false);
      }, 2000);
    } else {
      setLength(false);
      setVerified(false);
      setChecking(false);
    }
  };

  const createRepo = async () => {
    setLoader(true);
    await postCreateRepo(owner, repo, '', user.ethereumAddress, '', user.token).then(res => {
      setLoader(false);
      if (res === '201') {
        navigate('/home');
      } else {
        setErrorText('There was an error creating this repository.');
      }
    });
  };

  useEffect(() => {
    if (user.ethereumAddress === 'none' || user.ethereumKey === 'none') {
      navigate('/ethereum');
    }
  });

  useEffect(() => {
    checkPermissions();
  }, [owner, repo]);

  if (owner === 'none' && repo === 'none') {
    return <Home />;
  }

  if (loader) {
    return <Loader />;
  }

  if (!permissions.public_repo_scopes) {
    return (
      <PermissionsNotice
      errorText={errorText}
      />
    );
  } else {
    return (
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
    );
    } 
}
