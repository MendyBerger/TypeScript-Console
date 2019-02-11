declare let chrome: any;

document.addEventListener("DOMContentLoaded", () => {
    for (let i = 0; i < document.scripts.length; i++) {
        if(document.scripts[i].type === "text/typescript"){

            if(document.scripts[i].src){
                fetch(document.scripts[i].src)
                    .then(response => response.text())
                    .then(response => {
                        runTs(response, document.scripts[i].src);
                    })
                    .catch(err => {
                        console.error(err);
                    });
            } else {
                runTs(document.scripts[i].textContent as string, getRandomFileName());
            }

        }
    }
});

function addScript(code: string, isModule = false) {
    let script = document.createElement("script");
    if(isModule) script.type = "module";
    script.text = code;
    document.body.appendChild(script);

    
    // eval(js.outputText);
    // Function(js.outputText)();
}




function getRandomFileName(){
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 5; i++){
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text + '.ts';
}







function runTs (script: string, tsUrl:string) {
    chrome.runtime.sendMessage({ts: script, url: tsUrl});
}



chrome.runtime.onMessage.addListener((request:any, sender:any, sendResponse:any) => {
    addScript(request.tsCode, request.isModule);
});