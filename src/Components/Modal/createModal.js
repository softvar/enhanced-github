function createModal() {
    return `
    <style>
    /* The Modal (background) */
    body {font-family: Arial, Helvetica, sans-serif;}

    .modal {
      display: none; /* Hidden by default */
      position: fixed; /* Stay in place */
      z-index: 1; /* Sit on top */
      padding-top: 30px; /* Location of the box */
      left: 0;
      top: 0;
      width: 100%; /* Full width */
      height: 100%; /* Full height */
      
      background-color: rgb(0,0,0); /* Fallback color */
      background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
    }
  </style>
      <div id="myModal" class="modal">
  
        <!-- Modal content -->
       
      </div>
      `;
  }
  //removing everything from the modal except myModal which we need to inject the react component into 

  module.exports = createModal;