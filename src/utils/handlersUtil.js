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
                OjAw096V+gAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII=" />`

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