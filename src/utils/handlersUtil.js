const commonUtil = require('./commonUtil');
const authContributor =  require("../authorizedContributor")

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
      const contributor_id =  authContributor.getAuthContributor();
      const svg_vote_yes = `
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

      const svg_vote_no = `
            href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBTUEAALGPC/xhBQAAACBjSFJN
        AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACSVBMVEUAAACJPrtWeEKIP7mX
        VbiJQLiIP7iIQLmIQLqKPruJP7qKPbyHQbeHQreKPbuJPrmHPrmMQrWGPbaIP7r/AP+HP7mFQrmE
        Q7mHQbmET7iHQLmIPrmIPLiIPLeIO7SJQLmIQLiAQL+HP7iLQbmKQLmIPbiHQLiIPriMQreNPbqJ
        P7mHPriNQ8OEPbyFQbeGP7yHPreJQLuHPbmCDozXFueKQLqKQbqJPrqHQbiHQLeIPLuEPb+KPbmF
        QLmEQrSAQreKPrqIPruUOrSCPLSGQbmJP7iIP7mIP7mIP7mIP7mIP7mIP7mGP7WIP7mIP7mIP7mI
        P7mIP7mIP7mJQbuIP7mIP7mIP7mIP7mIP7mJPrmIP7mIP7mIP7mIP7mIP7mIP7mIP7mJPrmHPrqI
        P7mIP7mIP7mIP7mIP7mIP7mIP7mIP7mIP7mIP7mIP7mIP7qIP7mIP7mIP7mJPrmKPbmIPbeIP7mI
        P7mIP7mIP7mIP7mJP7mKQLmIPriIP7mIP7mIP7mIQLmKQLmIP7mJP7mIP7mIP7mIP7mIP7mIP7mI
        P7mIP7mIP7mIP7mIP7mIP7mIP7mIP7mIP7mIP7mIP7mIP7mJPrqIP7mIP7mIP7mIP7mIP7mHPrmI
        P7mIP7mKPbiJQbiIP7mIP7mIP7mIP7mIP7mIP7mIP7mIP7iHP7mIP7mIP7mIP7mHQLqIP7mIP7mI
        PrmIP7mIP7mIP7mIP7mIP7mIP7mIP7iIP7mIP7mIP7mIP7mIP7mIP7mIP7mJQLmIP7qJP7mIP7n/
        //+dIzw1AAAAwXRSTlMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
        AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADTBHSjEOAbzh29q+TgJX46NFKidDn+RbH9OQCAaL
        1SFgIiDZYoa6CAiHj7EGBgEUQncjdhQBD6f1kgMCjg9x/e5EQOwSvbcQtEnw+2hl+gWZ1iTUmgUr
        3QMCjXNB68G1Dw4V8vn4Bp5aBi/gWXj+eRfFXVzGF1NPCRQJNzsU1QAAAAFiS0dEwv1vvtQAAAAH
        dElNRQflDAcDHgLqcxWDAAACFklEQVQ4y33TZ1MTYRQF4BuO7EpANygBNWpi17Vii2DDBqy0GGmC
        NAugBE3AKBawEaWoYG+goliwRFDsWO4/c5k4ziYbcj7tzn125t13ziUiQxTGyLhoUiNASM/IVHTJ
        3JkFcTxRDLKVnNw8hy55ubucu40Gio3LLygsKt6jS3FJ6d6yCRMJ5RWVVYCkC7Bv/4GDIFQ7amCK
        J10mTUbtocMqqHPVI4HCBUdcR82U6PY0SGHnJDV43ImU5PY0qmDK1GkWy/9PYZmuvkiNHndSAMyY
        qR7TapsVmCfMFkRgzlwNmHfMe/xEE8QAmI/akyWnTls1YMGZ5hY+e05cODpfJJ+/wC3NF2UNWLyk
        1ceXLpuXjoJlaGtnX+tyQQNWoKOT+cpVJBOJYtY15s4OaAGtRFc3X79hllatXmO+eYu7FRi1f0Fr
        cfsO8917sK9D033mBw9NKUGAZPT0MrsfSeLjJ8y9PQi+B6JUW2qfj9ufAm3P2NcHpIQAEuHtZ37+
        4qV6wv5XAIUCWg/nAL9Wut7wgBMbSA9sePuOuczPXPoe5jBAPefgEPs/8NAgBAoHNto3fRz2+4c/
        bU7bEhaQHZ+/fP32/YcljTRAW5it8shP5wi2BRVGW7nt1l/e33+Myf9qgXpXXUhpd0QDshx4jjeh
        xlGNSLWvqqwoR4TFKSosyI+LjbR6OUo2YiIsb0a6ELixsdc/ykD0F6Hp41+UYqWeAAAAJXRFWHRk
        YXRlOmNyZWF0ZQAyMDIxLTEyLTA3VDAzOjMwOjAxKzAwOjAwdcHGiwAAACV0RVh0ZGF0ZTptb2Rp
        ZnkAMjAyMS0xMi0wN1QwMzozMDowMSswMDowMAScfjcAAAAASUVORK5CYII=" />
     `
      for (var i = startIndex; i < containerItems.length; i++) {
            var issue_id = containerItems[i].getAttribute('id');

            const voteYesHtml = `
              <div id="gridcell" class="mr-2 text-gray-light eg-download style="width: 18px;">
                <span class="css-truncate css-truncate-target d-block">
                  <a style="float: right" title="Vote Yes" class="tooltipped tooltipped-s"
                    }">
                    <svg class="octicon octicon-cloud-download" aria-hidden="true" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="18px" height="18px" viewBox="0 0 18 18" enable-background="new 0 0 18 18" xml:space="preserve">  <image id="voteYes" width="18" height="18" x="0" y="0" issue_id="${issue_id}" contributor_id="${contributor_id}"` +
                    svg_vote_yes + `
                </svg
                  </a>
                </span>
              </div>
            `;

            const voteNoHtml = `
              <div id="gridcell" class="mr-2 text-gray-light eg-download style="width: 18px;">
                <span class="css-truncate css-truncate-target d-block">
                  <a style="float: right" title="Vote No"" class="tooltipped tooltipped-s"
                    }">
                    <svg class="octicon octicon-cloud-download" aria-hidden="true" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="18px" height="18px" viewBox="0 0 18 18" enable-background="new 0 0 18 18" xml:space="preserve">  <image id="voteNo" width="18" height="18" x="0" y="0" issue_id="${issue_id}" contributor_id="${contributor_id}"` +
                    svg_vote_no + `
                </svg
                  </a>
                </span>
              </div>
            `;
            containerItems[i].querySelector('.flex-shrink-0').insertAdjacentHTML('beforeend', voteYesHtml + voteNoHtml);
            //containerItems[i].querySelector('.flex-shrink-0').insertAdjacentHTML('beforebegin', voteNoHtml);
      }
    }, 1000);
  }
};

module.exports = handlersUtil;