const commonUtil = require('./commonUtil');

const handlersUtil = {
  onPathContentFetchedForBtns: data => {

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

      for (var i = startIndex; i < containerItems.length; i++) {
            const html = `
              <div id="gridcell" class="mr-2 text-gray-light eg-download" style="width: 55px;">
                <span class="css-truncate css-truncate-target d-block">
                  <span style="margin-right: 5px;">
                   70%
                  </span>
                  <a style="float: right" href="${/*data[actualDataIndex].download_url*/'https://github.com/turbo-src'}" title="(Alt/Option/Ctrl + Click) to download File" aria-label="(Alt/Option/Ctrl + Click) to download File" class="tooltipped tooltipped-s"
                    }">
                    <svg class="octicon octicon-cloud-download" aria-hidden="true" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve">  <image id="image0" width="24" height="24" x="0" y="0"
                    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAABGdBTUEAALGPC/xhBQAAACBjSFJN
                AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAJcEhZ
                cwAADsQAAA7EAZUrDhsAAAAHdElNRQflCxQEJyIqWooVAAABsklEQVQ4y53UwUtUURgF8J+jm1rI
                GwlCGMKWgo9qN5tajkj/gNvciBtFiYImaDsLNwW6iZbuAmFAhpbpqoVEIKO7QoRWr4kKQeW922Je
                zqhPlN7dvMs9595zz3fuR9EX27AhLloa6vsfNeVQx5gF47jrta9G3NTyvYhcF2SOpEI+0nxWL4JX
                tE+BQdpHC9oq/2CDp/CnHhvADx+89c57nxy67QZuGbTjV0/7C22ZINNUFYlNmRKLVDXzlba60S5h
                Jj84s6qspiVx4kSipaZsVZYjZrqE6VxvU9mcTp/24Kc5Zc38XtNdwqQjQaKqdg4eBB01VYngyCQl
                jBnCR3sWRRfciyzas4khY92qdu1cEkvO7J1atSKTiC3l9sYlDePI7KsYxo5dkFnx3DepYRX7Moxr
                lM4JONYw7QtWvPTEqzPhUSRp2z0PPBOZ90cQJCZ6kmBWKlgXaQmCz+5jIYcHLZF1QWr2Mlu3Lftd
                bOtVhesUFa4/GiPXicbF8E1cHr6BvnjP5/HetGUfdzz0yAiCN5Yd/NcD6hXuwBqCYxlKSsjy2Vpv
                94G+M843gd2rmsC12sxf+fsRd+kA99MAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjEtMTEtMjBUMDQ6
                Mzk6MzQrMDA6MDCigy1GAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIxLTExLTIwVDA0OjM5OjM0KzAw
                OjAw096V+gAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII=" />
                </svg
                  </a>
                </span>
              </div>
            `;

            containerItems[i].querySelector('.flex-shrink-0').insertAdjacentHTML('beforebegin', html);
      }
    }, 1000);
  }
};

module.exports = handlersUtil;