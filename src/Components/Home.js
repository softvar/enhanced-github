import React, { useState } from 'react';
import '../index.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
export default function Home(props) {
  const user = useSelector(state => state.auth.user);
  const navigate = useNavigate();
  let name = user?.name;
  let username = user?.login;
  let tokens = user?.tokens || `100,000 nix`;
  let avatar = user?.avatar_url || null;
  let { repo, currecy } = props;
  return (
    <div className="content">
      <div className="home">
        <section className="profile items-center">
          <img src={avatar} className="profilePictureSmall" />
          <span>
            <ul>
              <li className="bold">{name}</li>
              <li className="secondary githubLine">
                <a href={user?.html_url} target="_blank">
                  {username}
                  <img src="../../icons/github.png" />
                </a>
              </li>
              <li>
                <select>
                  <option>Nixpckgs</option>
                  <option>Repo 1</option>
                  <option>Repo 2</option>
                  <option>Repo 3</option>
                </select>
              </li>
            </ul>
          </span>
        </section>

        <section>
          <div className="repo">
            <span>
              <img src="../icons/repository.png" />
              <a href="#" target="_blank">
                {repo || 'NixPckgs'}
              </a>
            </span>
            <span className="tokens">
              <img src="../icons/tokens.png" />
              {tokens}
            </span>
          </div>

          <div className="data">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
              <path
                fill="#a2d9ff"
                fill-opacity="1"
                d="M0,192L90,0L180,288L270,160L360,224L450,160L540,224L630,96L720,128L810,96L900,32L990,32L1080,160L1170,96L1260,224L1350,192L1440,64L1440,320L1350,320L1260,320L1170,320L1080,320L990,320L900,320L810,320L720,320L630,320L540,320L450,320L360,320L270,320L180,320L90,320L0,320Z"
              ></path>
            </svg>
          </div>

          <div>
            <span className="items-center">
              <button type="button" className="homeButton">
                Trade
              </button>
              <button type="button" className="homeButton">
                Transfer
              </button>
            </span>
          </div>
        </section>

        <div>
          <button type="button" className="createButton" onClick={() => navigate('/create')}>
            <img src="../../icons/turbo-src16.png" />
            Create New Repository
          </button>
        </div>
      </div>
    </div>
  );
}
