import React, { useState, useEffect } from 'react';
import Review from './Review';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import superagent from 'superagent';
export default function Transfer(props) {
  let user = useSelector(state => state.auth.user);
  let { repo, currency } = props;
  const navigate = useNavigate();
  let [errorText, setErrorText] = useState('');
  async function postGetContributorID(owner, repo, issue_id, contributor_name) {
    const res = await superagent
      .post('http://localhost:4000/graphql')
      .send(
        //{ query: '{ name: 'Manny', species: 'cat' }' }
        //{ query: '{ newPullRequest(pr_id: "first", contributorId: "1", side: 1) { vote_code } }' }
        //{ query: '{ getVote(pr_id: "default", contributorId: 1) {side} }' }
        //{ query: '{ getVoteAll(pr_id: "default") { vote_code } }' }
        //{ query: `{ getVoteEverything }` }
        {
          query: `{ getContributorID(owner: "${owner}", repo: "${repo}", pr_id: "${issue_id}", contributor_name: "${contributor_name}") }`
        }
        //{ query: '{ setVote(pr_id: "default" contributorId: "2", side: 1 ) { vote_code }' }
      ) // sends a JSON post body
      .set('accept', 'json');
    //.end((err, res) => {
    // Calling the end function will send the request
    //});
    const json = JSON.parse(res.text);
    console.log(json);
    return json.data.getContributorID;
  }

  let [transfer, setTransfer] = useState({
    repo: '',
    from: user.ethereumAddress,
    recipientId: 'none',
    recipientName: '',
    amount: 0,
    tokens: currency
  });
  let [review, setReview] = useState(false);

  useEffect(() => {
    setReview(false);
  }, []);

  const changeHandler = e => {
    e.preventDefault();
    setTransfer({ ...transfer, [e.target.name]: e.target.value });
  };

  const getId = async e => {
    e.preventDefault();
    changeHandler(e);

    await postGetContributorID('', '', '', e.target.value).then(res => setTransfer({ ...transfer, recipientId: res }));
    if (!e.target.value.length) {
      setErrorText('');
    }
    if (e.target.value.length && transfer.recipientId === 'none') {
      setErrorText('Turbo-Src user not found');
    }
    if (transfer.recipientId && transfer.recipientId !== 'none') {
      setErrorText('');
    }
  };

  const submitHandler = () => {
    if (transfer.recipientId && transfer.recipientId !== 'none') {
      setReview(true);
    }
  };

  useEffect(() => {
    if (user.ethereumAddress === 'none' || user.ethereumKey === 'none') {
      navigate('/ethereum');
    }
  });

  if (review) {
    return (
      <Review
        from={transfer.from}
        recipientName={transfer.recipientName}
        recipientId={transfer.recipientId}
        tokens={transfer.tokens}
        amount={transfer.amount}
        setTransfer={setTransfer}
        setReview={setReview}
        repo={transfer.repo}
      />
    );
  }
  return (
    <div className="content items-center">
      <div className="section items-center">
        <form name="transfer" className="transfer" onSubmit={submitHandler}>
          <span>
            <label htmlFor="transfer" className="">
              Who would you like to transfer tokens to?
            </label>
            <input type="text" name="recipientName" value={transfer.recipientName} onChange={e => getId(e)} required />
            {errorText}
          </span>

          <span>
            <label htmlFor="repo">Which repository's tokens would you like to send?</label>
            <select name="repo" value={transfer.tokens} onChange={e => changeHandler(e)} required>
              <option value="sel">SelectedWork</option>
              <option value="nix">Nixpckgs</option>
              <option value="rei">Reibase</option>
            </select>
          </span>

          <span>
            <label htmlFor="amount">How many tokens would you like to send?</label>
            <input type="number" name="amount" value={transfer.amount} onChange={e => changeHandler(e)} required />
          </span>

          <span>
            <button type="submit" className="startButton">
              Review and Send
            </button>
          </span>
        </form>
      </div>
    </div>
  );
}
