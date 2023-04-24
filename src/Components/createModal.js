function createModal() {
    return `<!-- The Modal -->
      <style>
        body {font-family: Arial, Helvetica, sans-serif;}
  
        /* The Modal (background) */
        .modal {
          display: none; /* Hidden by default */
          position: fixed; /* Stay in place */
          z-index: 1; /* Sit on top */
          padding-top: 100px; /* Location of the box */
          left: 0;
          top: 0;
          width: 100%; /* Full width */
          height: 100%; /* Full height */
          overflow: auto; /* Enable scroll if needed */
          background-color: rgb(0,0,0); /* Fallback color */
          background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
        }
  
        /* Modal Content */
        .modal-content {
          background-color: #fefefe;
          margin: auto;
          padding: 20px;
          border: 1px solid #888;
          height: 100%;
          width: 33%;
          text-align: center;
        }
        .btn-group-vote {
          display: flex;
          width: 100%;
          justify-content: center;
          flex-direction: row; /* Display buttons horizontally in flexbox */
        }
        .btn-group-vote button {
          background-color: #04AA6D; /* Green background */
          border: 1px solid green; /* Green border */
          color: white; /* White text */
          padding: 10px 24px; /* Some padding */
          cursor: pointer; /* Pointer/hand icon */
          float: left; /* Float the buttons side by side - Still needed ? */
          margin: 1rem;
        }
        /* Clear floats (clearfix hack) */
        .btn-group-vote:after {
          content: "";
          clear: both;
          display: table;
        }
  
        .btn-group-vote button:not(:last-child) {
          border-right: none; /* Prevent double borders */
        }
      </style>
      <div id="myModal" class="modal">
  
        <!-- Modal content -->
        <div class="modal-content">
          <style>
          </style>
            <div id="vote-total-main"></div>
          <div class="btn-group-vote">
            <div id="yes_vote_button"></div>
            <div id="no_vote_button"></div>
          </div>
            <p></p>
        </div>
      </div>
      `;
  }

  module.exports = createModal;