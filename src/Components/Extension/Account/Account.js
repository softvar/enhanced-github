import React, { useState, useEffect } from 'react';
import Settings from './Settings';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { postGetVotePowerAmount } from '../../../requests';
import useCommas from '../../../hooks/useCommas';
import styled from 'styled-components';
import toast from 'react-hot-toast';
import {AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import {BiCopy} from 'react-icons/bi';


export default function Account() {
  const user = useSelector(state => state.auth.user);
  const repo = useSelector(state => state.repo.name);
  const owner = useSelector(state => state.repo.owner.login);
  const [passwordViewToggle, setpasswordViewToggle] = useState(true);


  const navigate = useNavigate();
  let name = user?.name;
  let username = user?.login;
  let [tokenAmount, setTokenAmount] = useState('');
  let avatar = user?.avatar_url || null;

  const notify = () => toast.success('Copied to clipboard!', {
    duration: 1000,
    position: 'top-center',
    style: {}
  });

  const copyAddress = () => {
    const textToCopy = navigator.clipboard.writeText(user?.ethereumAddress)
      .then(() => {
        notify();
      })
      .catch((error) => {
        console.error('Failed to copy text:', error);
      });
  };  

  const copySignature = () => {
    const textToCopy = navigator.clipboard.writeText(user?.ethereumKey)
      .then(() => {
        notify();
      })
      .catch((error) => {
        console.error('Failed to copy text:', error);
      });
  };  
  
  

  const Profile = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    `;

    const Username = styled.span`
      color: #6A6868;
      font-size: 15px;
      font-weight: 400;
    `;

    const ProfilePicture = styled.img`
      height: 3rem;
      width: 3rem;
      display: block;
      object-fit: cover;
      border-radius: 50%;
      margin: 5px;
      background-color: var(--lightbg);
    `;

    const AccountContent = styled.div`
    width: 24rem;
    height: 27rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 0.5rem;
    `;

    const AccountHeader = styled.div`
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    `;

    const AccountAddress = styled.div`
      width: 290px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    `;

    const Address = styled.div`
      display: flex;
      flex-direction: column;
      `;

      const AddressHeading = styled.span`
        color: #6A6868;
        font-size: 12px;
        font-weight: 400;
        margin-bottom: 5px;
      `;

      const EthAddress = styled.span`
        color: black;
        font-size: 11px;
        font-weight: 400;
        margin-bottom: 10px;
        cursor: pointer;
      `;
      const Signature = styled.input`
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 90%;
      border: none; /* Remove the border */
      outline: none; /* Remove the outline when focused */
      cursor: pointer;
      height:15px;
      margin-bottom: 10px;
      `;

      const SignatureHidden = styled(Signature)`
        text-overflow: clip;
        `;

      const EyeIcon = styled.img`
      height: 20px;
      width: 20px;
      margin-bottom: 10px;
      `;

      const SignatureContainer = styled.div`
      display: flex;
      flex-direction: row;
      gap:17px;  
      `;

      const HeadingContainer = styled.div`
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      `;

      const SignatureWarning = styled.span`
      color: #6A6868;
      font-size: 10px;
      font-weight: 400;
      `;

  useEffect(() => {
    const getTokenAmount = async () => {
      await postGetVotePowerAmount(owner, repo, '', user.ethereumAddress, '', user.token)
        .then(res => useCommas(res.amount))
        .then(tokens => setTokenAmount(tokens));
    };
    getTokenAmount();
  });

  return (
    <AccountContent>
      <AccountHeader>
        <Profile>
          <ProfilePicture src={avatar}/>
          <Username>
            <a href={user?.html_url} target="_blank">
              {username}
            </a>
          </Username>
        </Profile>
        <AccountAddress>
          <Address >
            <HeadingContainer>
              <AddressHeading >Address</AddressHeading>
              <BiCopy onClick={copyAddress} style={{ cursor: 'pointer' }} />
            </HeadingContainer>
            <EthAddress onClick={copyAddress} >{user?.ethereumAddress}</EthAddress>
          </Address>
          <Address >
            <HeadingContainer>
              <AddressHeading >Signature</AddressHeading>
              <BiCopy onClick={copySignature} style={{ cursor: 'pointer' }} />
            </HeadingContainer>
            <SignatureContainer>
              {passwordViewToggle ? (
                <>                  
                  <SignatureHidden onClick={copySignature} type="password" readOnly value={user?.ethereumKey} />
                  <AiOutlineEyeInvisible onClick={() => setpasswordViewToggle(!passwordViewToggle)}
                  style={{ cursor: 'pointer' }} />
                  </>
                ) : (
                  <>
                    <Signature onClick={copySignature} type="text" readOnly value={user?.ethereumKey} />
                    <AiOutlineEye onClick={() => setpasswordViewToggle(!passwordViewToggle)}
                      style={{ cursor: 'pointer' }}
                    />
                  </>
                )}
              
            </SignatureContainer>
            <SignatureWarning>
            Do not share your signature with anyone.
            </SignatureWarning>
          </Address>
        </AccountAddress>
      </AccountHeader>

      <Settings />
    </AccountContent>
  );
}
