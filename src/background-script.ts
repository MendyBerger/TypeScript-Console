import { TsConfig } from "./ts-config.js";

declare let chrome: any;
declare let ts: any;

chrome.runtime.onMessage.addListener((request : any, sender:any, sendResponse:any) => {
    console.log(request)
    let js = getTs(
        request.ts, 
        request.tsConfig,
        request.url || getRandomFileName()
    );
    runJs(js, request.tabId || sender.tab.id, request.tsConfig.module !== "none");
});


function runJs(script:string, tabId: number, isModule: boolean){
    chrome.tabs.sendMessage(tabId, {tsCode: script, isModule}, function(response:any) {});
}


function getTs (script: string, tsConfig: TsConfig, tsUrl: string){
    let js = ts.transpileModule(script, {
        fileName: tsUrl,
        compilerOptions: {
            inlineSourceMap: true,
            inlineSources: true,
            target: tsConfig.target,
            experimentalDecorators: true,// delete
            esModuleInterop: true,// delete
            module: tsConfig.module // delete
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
