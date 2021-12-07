const commonUtil = require('./commonUtil');

const handlersUtil = {
  onPathContentFetchedForBtns: data => {

    commonUtil.removePrevInstancesOf('.js-file-clipboard');
    commonUtil.removePrevInstancesOf('.js-file-download');

    const btnGroupHtml = `
    `;

    const btnGroup = document.querySelectorAll('.BtnGroup:not(.d-md-none)')[0];

    btnGroup.insertAdjacentHTML('beforeend', btnGroupHtml);
  },
  onPathContentFetched: (data = []) => {

    setTimeout(function() {
      commonUtil.removePrevInstancesOf('.eg-download'); // remove before adding new ones

      const containerItems = document.querySelectorAll(
        '.js-issue-row'
      );

      let actualDataIndex = 0;
      let startIndex = 0;

      const repoPath = commonUtil.getUsernameWithReponameFromGithubURL();

      if (
        window.location.pathname !== `/${repoPath.user}/${repoPath.repo}/pulls`
      ) {
        return;
      }

      // Get contributor_id from chain web wallet extension
      const contributor_id = "turbo-src-dev";
      const svg_data = `
             href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBTUEAALGPC/xhBQAAACBjSFJN
         AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAC1lBMVEUAAACKPb2EQdCJPrqI
         P7mJPrmIP7qIPrl7TcqFQLyHP7mAQL+JP7iKPryTO8KJP7qHObeJQLqGP7mJQLiJP7mKQLiHQLmg
         K8OCQK+IP7iHP7iJQLmHPbWIQLqFQruIQLuLPLaLRrmHPriJQLuPQL+IP7uGP7aQOMKGPbmLPruD
         QL2HPraIPriJQLaHPLSIRLuGPbuKQLyNKLGHPreHQbqSPMOIQLmGQruMQL9WAP+pX76IPrqHPrmJ
         PLeJQauGPrqMQLeJPr6KPLyGQraFQrmEQ7mGQbmJQryMPLqIP7mJPrmIP7qGPrmHPbiIP7mIP7mI
         P7mIP7mIP7mGPrmIP7mIP7mIP7mIP7mIP7mIP7mIP7mIP7mIP7mIP7mJQLiIP7mJP7mIQLmIP7mI
         P7mIP7mKP7yKQbeIP7mIP7mIP7mJQLiJP7iIPrmIP7mIP7mIP7mIP7mIPrmIQLqIP7mIP7mIP7mI
         P7mIP7mIP7mJPrmIP7mIP7mIP7iIP7mIPrmIP7mIP7mIP7iIP7mIP7mIP7mIP7mIP7mIP7mIP7mI
         PrmIP7mIP7mJPrmIP7mIP7mIPrmIP7mIP7mJP7mIP7mIP7mIP7mIP7mIP7mIP7mIP7mIP7mIP7mI
         P7mIPrmIP7mIP7mIP7mIP7iIP7mIP7mIP7mIP7mIP7mIP7mIP7mIP7mIP7mIP7mIP7mIP7mIP7mI
         P7mGP7iIP7mJP7mIP7mIP7mIPrmIP7mIP7mIP7mIP7mIP7mIP7mIP7mIP7mIP7mIP7mIP7mIP7mI
         P7mIP7mIP7mIPrmJPriIP7mIP7mIP7mJP7mIQLmJP7iHP7mIP7mIP7mIP7mIP7mIP7mIP7mIP7mI
         P7mIP7mIP7mIP7mIP7mIP7mIP7mIP7mIP7mJP7mIP7mIP7mIP7mKPrmKPbmJPrmIP7mIP7mIP7mI
         P7mIP7mIP7mIP7mIP7mIP7mIP7mIP7mIP7n////RALvBAAAA8HRSTlMAAAAAAAAAAAAAAAAAAAAA
         AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB
         DxcPAQE7msfQQANj4bt4ZWR5uON3BoEMCm3mXgEBkcYUCAcI3jkXCSMHLttKTbVJLtpMEsAgy7wQ
         S2/EyP5qKCHXJQSVvhvDkANG7vxudP3sQRC5EhXBtA5p+/BITvL6JNaXBp3TIQMpLt+LAnbqPRaw
         DVLz8VD0GVefgwYIipxVFwIFBgLOaDHcRwq/iVTdLX4juqgIHzcLBgYGDDY0wrKxOn+Oj30koCav
         AAAAAWJLR0TxQr/fwgAAAAd0SU1FB+UMBhUPGZPYR9gAAAJMSURBVDjLbZPnWxNBEIdX+YXTgCXk
         RANGNNiN2LH3CgokaCCIBRV7xYYGhajEigpWmlgJioq9Ye+9YC/YKyo6f4Jp+ORyeT/dzrx7z8zO
         LmOMVarsAYkYT65KVWYFHAaFhIoZPARSqZc1HxYeodGK0UREDoU3q8aFDdNFRetjXNEPjx0xcpQ3
         q45w3eg4uGPM2HHxYDXGR0TFoabMVg7zkfNcLfunb21MmDhpMkOIJhp17DGm8JsydZo/X7FC5PQZ
         DDO1ejj218Ws+IT42cp6DgNz5s5jklBtDByBAMxPTIhdwNd3rCULDUnOgkKxaLEmOcW4BPgvLHUS
         GvjJllFqsmn5ClVgQ3eCBCsNlLrKRKvXQOFGaMSnrSVatz6dKGMDVGKhMTZuos1blFszKSvb3pdA
         8EFOLpFxG/K2E+3YCQ8XoUlT/127aU8+AmAuoL0xaNZcKPhiXyHR/jROhQMHiYoOgRMILaSHM4gM
         R8AzNY4eIzp+QtLSWVAiO8taoTqItZK3PplJp07D01lASKKtQst/mT/OWFotPguBcO48XchHG9v5
         tOUuXqICs1C4fOXqtetoZxPa8zdu3rp9RygAd+9VzIip1fcfWCKCNgM7BPMdgxxCp85SdAkUDUuM
         7T4g7+Ejx/BEeZQ8fsLw9NlzcF3d5GVSvHj5inWTvy56A3dPD8grffuOdcd7U+mHj58+u/Ll67fi
         wu9gXj1Qkqv7UfbTlbJ0nfFXz16MefYOzjH/Lv/jSvnfpBzIra+oT1/LofTr78oABTBQxf4BNEkb
         Auz9d/0AAAAldEVYdGRhdGU6Y3JlYXRlADIwMjEtMTItMDZUMjE6MTU6MjUrMDA6MDBStHcXAAAA
         JXRFWHRkYXRlOm1vZGlmeQAyMDIxLTEyLTA2VDIxOjE1OjI1KzAwOjAwI+nPqwAAAABJRU5ErkJg
         gg==" />
     `

      for (var i = startIndex; i < containerItems.length; i++) {
            var issue_id = containerItems[i].getAttribute('id');

            const voteYesHtml = `
              <div id="gridcell" class="mr-2 text-gray-light eg-download style="width: 24px;">
                <span class="css-truncate css-truncate-target d-block">
                  <a style="float: right" title="Vote Yes" aria-label="(Alt/Option/Ctrl + Click) to download File" class="tooltipped tooltipped-s"
                    }">
                    <svg class="octicon octicon-cloud-download" aria-hidden="true" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve">  <image id="voteYes" width="24" height="24" x="0" y="0" issue_id="${issue_id}" contributor_id="${contributor_id}"` +
                    svg_data + `
                </svg
                  </a>
                </span>
              </div>
            `;

            const voteNoHtml = `
              <div id="gridcell2" class="mr-2 text-gray-light eg-download style="width: 24px;">
                <span class="css-truncate css-truncate-target d-block">
                  <a style="float: right" title="Vote No" aria-label="(Alt/Option/Ctrl + Click) to download File" class="tooltipped tooltipped-s"
                    }">
                    <svg class="octicon octicon-cloud-download" aria-hidden="true" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve">  <image id="voteNo" width="24" height="24" x="0" y="0" issue_id="${issue_id}" contributor_id="${contributor_id}"` +
                    svg_data + `
                </svg
                  </a>
                </span>
              </div>
            `;
            containerItems[i].querySelector('.flex-shrink-0').insertAdjacentHTML('beforebegin', voteYesHtml);
            containerItems[i].querySelector('.flex-shrink-0').insertAdjacentHTML('beforebegin', voteNoHtml);
      }
    }, 1000);
  }
};

module.exports = handlersUtil;