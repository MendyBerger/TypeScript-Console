let sendResponseRef;


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.type === "checkIfSupportedTab"){
        sendResponseRef = sendResponse;
        isSupportedTab(request.tabId);
        return true;
    } else {
        let js = getTs(
            request.ts, 
            request.url || getRandomFileName()
        );
        runJs(js, request.tabId || sender.tab.id);
    }
});



function runJs(script, tabId){
    // chrome.tabs.sendMessage(tabId, {tsCode: script}, function(response) {});
    chrome.tabs.executeScript(tabId, {code: script});

}



function getTs (script, tsUrl){
    let js = ts.transpileModule(script, {
        fileName: tsUrl,
        compilerOptions: {
            inlineSourceMap: true,
            inlineSources: true,
            target: 'ES2016',
            experimentalDecorators: true,// delete
            esModuleInterop: true,// delete
            module: "es2016"// delete
            // sourceRoot: '/',
            // mapRoot: tsUrl
        }
    });
    // console.log(js);
    return js.outputText;
}






function getRandomFileName(){
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 5; i++){
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text + '.ts';
}


function isSupportedTab(tabId) {
        chrome.tabs.get(tabId, function (tabInfo) {
            let supported = /^(https|http|file|ftp|data)/.test(tabInfo.url);
            if(tabInfo.url.startsWith("https://chrome.google.com")) supported = false;
            sendResponseRef(!supported);
        });
}
