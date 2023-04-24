function createButtonHtml(index, issue_id, contributor_id) {
  return `
      <div id='turbo-src-btn-${issue_id}'></div>
    `;
}
//#yes_vote_button, #no_vote_button {
//  display: inline-block;
//  padding: 20px;
//}

//.modal-center {
//  margin: 0;
//  position: absolute;
//  top: 15%;
//  left: 50%;
//  -ms-transform: translate(-50%, -50%);
//  transform: translate(-50%, -50%);
//}
module.exports = createButtonHtml;
