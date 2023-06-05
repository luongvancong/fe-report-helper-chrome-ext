console.info('chrome-ext template-react-ts content script')

function countTotalBug(assignee: string) {
    const domList = Array.from(document.querySelectorAll('.sc-1s82hq4-0.eYSScX'));

    let totalBug = 0;

    domList.forEach((x) => {
      let haveBug = x.querySelector('img[alt="Issue type: Bug"]');
      if (haveBug) {
        let avatarDom = x.querySelector('.css-1gr7gcv');

        if (avatarDom) {
            const alt = avatarDom.getAttribute('alt');
            if (alt && alt.includes(assignee)) {
                totalBug++;
            }
        }
      }
    });

    return totalBug;
}

// @ts-ignore
chrome.runtime.onMessage.addListener(
    function(request: any, sender: any, sendResponse: any) {
      console.log(sender.tab ?
                  "from a content script:" + sender.tab.url :
                  "from the extension");
      if (request.command == "COUNT_TOTAL_BUG") {
        const assignee = request.payload.assignee
        sendResponse({totalBug: countTotalBug(assignee)});
      }

      if (request.command == "GET_US_NAME") {
        const nameSelector = document.querySelector('h1')
        console.log('name', nameSelector?.textContent)
        sendResponse({
            name: nameSelector?.textContent
        })
      }
    }
  );



export { };

