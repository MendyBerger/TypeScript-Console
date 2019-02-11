import { TsConfig } from "../ts-config.js";

declare let chrome: any;

let consoleTsConfig = new TsConfig;

let input = document.querySelector("textarea") as HTMLTextAreaElement;
let moduleSelect = document.querySelector("#module") as HTMLSelectElement;
let targetSelect = document.querySelector("#target") as HTMLSelectElement;
let strictCheckbox = document.querySelector("#strict") as HTMLInputElement;

function submitFunction (){
    sendToCompiler(input.value, consoleTsConfig);
    input.value = '';
}


input.addEventListener("keyup", e => {
    if (e.keyCode == 13 && !e.shiftKey) {
        submitFunction();
    }
});
moduleSelect.addEventListener("change", e => {
    consoleTsConfig.module = (e.target as HTMLSelectElement).value as any;
});
targetSelect.addEventListener("change", e => {
    consoleTsConfig.target = (e.target as HTMLSelectElement).value as any;
});
strictCheckbox.addEventListener("change", e => {
    consoleTsConfig.strict = (e.target as HTMLInputElement).checked as any;
});
// targetSelect



function sendToCompiler(tsCode: string, tsConfig: TsConfig) {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs: any[]) => {
        chrome.runtime.sendMessage({ts:tsCode, tsConfig, tabId:tabs[0].id});
    });
}
