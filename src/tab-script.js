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
    chrome.runtime.sendMessage({ts:tsCode, tabId:chrome.devtools.inspectedWindow.tabId});
}


(function () {
    function checkIfsupportedTab(){
        chrome.runtime.sendMessage({type: 'checkIfSupportedTab', tabId:chrome.devtools.inspectedWindow.tabId}, function (isSupported) {
            console.log(isSupported);
            
            if(isSupported){
                document.querySelector("body").setAttribute("unsupportedTab", "");
                
            } else {
                document.querySelector("body").removeAttribute("unsupportedTab");
            }
        });
    }
    checkIfsupportedTab();
    chrome.webNavigation.onCompleted.addListener(checkIfsupportedTab);
})()

