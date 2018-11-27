let input = document.querySelector("textarea");

function submitFunction (){
    sendToCompiler(input.value);
    input.value = '';
}


input.addEventListener("keyup", e => {
    if (e.keyCode == 13 && !e.shiftKey) {
        submitFunction();
    }
});



function sendToCompiler(tsCode) {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.runtime.sendMessage({ts:tsCode, tabId:tabs[0].id});
    });
}
