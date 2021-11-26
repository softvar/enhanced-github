const commonUtil = require('./commonUtil');

const handlersUtil = {
  onPathContentFetchedForBtns: data => {
    //const formattedFileSize = commonUtil.getFileSizeAndUnit(data);

    commonUtil.removePrevInstancesOf('.js-file-clipboard');
    commonUtil.removePrevInstancesOf('.js-file-download');

    const btnGroupHtml = `
      <button aria-label="Copy file contents to clipboard" class="js-file-clipboard btn btn-sm BtnGroup-item file-clipboard-button tooltipped tooltipped-s js-enhanced-github-copy-btn" data-copied-hint="Copied!" type="button" click="selectText()" data-clipboard-target="tbody">
        Copy File
      </button>
      <a href="https://github/come/turbo-src/pulls" download="pulls"
        aria-label="(Alt/Option/Ctrl + Click) to download File" class="js-file-download btn btn-sm BtnGroup-item file-download-button tooltipped tooltipped-s">
        <span style="margin-right: 5px;">${formattedFileSize}</span>
        <svg class="octicon octicon-cloud-download" aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16">
          <path d="M9 12h2l-3 3-3-3h2V7h2v5zm3-8c0-.44-.91-3-4.5-3C5.08 1 3 2.92 3 5 1.02 5 0 6.52 0 8c0 1.53 1 3 3 3h3V9.7H3C1.38 9.7 1.3 8.28 1.3 8c0-.17.05-1.7 1.7-1.7h1.3V5c0-1.39 1.56-2.7 3.2-2.7 2.55 0 3.13 1.55 3.2 1.8v1.2H12c.81 0 2.7.22 2.7 2.2 0 2.09-2.25 2.2-2.7 2.2h-2V11h2c2.08 0 4-1.16 4-3.5C16 5.06 14.08 4 12 4z"></path>
        </svg>
      </a>`;

    const btnGroup = document.querySelectorAll('.BtnGroup:not(.d-md-none)')[0];

    btnGroup.insertAdjacentHTML('beforeend', btnGroupHtml);
  },
  onPathContentFetched: (data = []) => {
    //data = commonUtil.sortFileStructureAsOnSite(data);

    //if (!data) {
    //  return;
    //}

    //let isAnyFilePresent = false;

    //for (let i = 0; i < data.length; i++) {
    //  if (data[i].type === 'file') {
    //    isAnyFilePresent = true;
    //    break;
    //  }
    //}

    //if (!isAnyFilePresent) {
    //  return;
    //}

    setTimeout(function() {
      commonUtil.removePrevInstancesOf('.eg-download'); // remove before adding new ones

      // The table of files and folders, but is the table of pull requests for our purpose.
      // js-navigation-container.js-active-navigation-container is the class (can have other parts but must have that)
      // js.navigation-item is the inner class that must have js-navigation-item in it
      // Same thing for pulls
      //const containerItems = document.documentElement.firstChild
      //const containerItems = document.querySelectorAll(
      const containerItems = document.querySelectorAll(
        '.js-issue-row'
        //'.js-navigation-container.js-active-navigation-container .js-navigation-item'
        //'.js-navigation-container.js-active-navigation-container .js-navigation-item'
      );

      let actualDataIndex = 0;
      let startIndex = 0;

      if (
        window.location.pathname &&
        window.location.pathname.indexOf(`pulls`) > -1
      ) {
        startIndex = 1;
      }

      const repoPath = commonUtil.getUsernameWithReponameFromGithubURL();

      if (
        window.location.pathname !== `/${repoPath.user}/${repoPath.repo}/pulls`
        //window.location.href.indexOf('tree/' + commonUtil.getBranch()) === -1
      ) {
        return;
      }
      //const commitElem = containerItems[i].querySelector('.issue_102');
      //containerItems = containerItems.querySelector('.issue_102');
      //containerItems[1]/*.querySelector('.js-issue-row')*/.insertAdjacentHTML('beforebegin', 'Hola');

      //for (var i = startIndex; i < containerItems.length; i++) {
      //  const commitElem = containerItems[i].querySelector('div:nth-of-type(3)');
      //  //const isValidFile = data[actualDataIndex].type === 'file' && data[actualDataIndex].size !== 0;

      //  if (commitElem) {
      //    containerItems[i].querySelector('div:nth-of-type(2)').classList.remove('col-md-2', 'mr-3');
      //    containerItems[i].querySelector('div:nth-of-type(2)').classList.add('col-md-1', 'mr-2');

      //    //if (isValidFile || data[actualDataIndex].type === 'symlink') {
      //      //const formattedFileSize = commonUtil.getFileSizeAndUnit(data[actualDataIndex]);

      //      // inserts into container items' div role="gridcell"
      //      // div id="issue_$number"
      //      // number is variable, so lock in here maybe
      //      // div class="flex-shrink-0 pt-2 pl-3"

            const html = `
              <div id="gridcell" class="mr-2 text-gray-light eg-download" style="width: 95px;">
                <span class="css-truncate css-truncate-target d-block">
                  <span style="margin-right: 5px;">
                   100
                  </span>
                  <a style="float: right" href="${/*data[actualDataIndex].download_url*/'https://github/com/turbo-src/pulls'}" title="(Alt/Option/Ctrl + Click) to download File" aria-label="(Alt/Option/Ctrl + Click) to download File" class="tooltipped tooltipped-s"
                    download="pulls}">
                    <svg class="octicon octicon-cloud-download" aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16">
                      <path d="M9 12h2l-3 3-3-3h2V7h2v5zm3-8c0-.44-.91-3-4.5-3C5.08 1 3 2.92 3 5 1.02 5 0 6.52 0 8c0 1.53 1 3 3 3h3V9.7H3C1.38 9.7 1.3 8.28 1.3 8c0-.17.05-1.7 1.7-1.7h1.3V5c0-1.39 1.56-2.7 3.2-2.7 2.55 0 3.13 1.55 3.2 1.8v1.2H12c.81 0 2.7.22 2.7 2.2 0 2.09-2.25 2.2-2.7 2.2h-2V11h2c2.08 0 4-1.16 4-3.5C16 5.06 14.08 4 12 4z"></path>
                    </svg>
                  </a>
                </span>
              </div>
            `;

            //beforeend?
            containerItems[1].querySelector('.flex-shrink-0').insertAdjacentHTML('beforebegin', html);
          //} else {
            //<div role="gridcell" class="mr-1 eg-download" style="width: 90px;"></div>
            const defaultHtml = `
              <div id=issue_102 "" class="mr-1 eg-download" style="width: 90px;"></div>
            `;

            //beforeend?
            //commitElem.insertAdjacentHTML('beforebegin', defaultHtml);
          //}

      //    actualDataIndex++;
      //  }
      //}
    }, 1000);
  }
};

module.exports = handlersUtil;
