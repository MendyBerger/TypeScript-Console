import { TsConfig } from "../ts-config.js";
let consoleTsConfig = new TsConfig;
let input = document.querySelector("textarea");
let moduleSelect = document.querySelector("#module");
let targetSelect = document.querySelector("#target");
let strictCheckbox = document.querySelector("#strict");
function submitFunction() {
    sendToCompiler(input.value, consoleTsConfig);
    input.value = '';
}
input.addEventListener("keyup", e => {
    if (e.keyCode == 13 && !e.shiftKey) {
        submitFunction();
    }
});
moduleSelect.addEventListener("change", e => {
    consoleTsConfig.module = e.target.value;
});
targetSelect.addEventListener("change", e => {
    consoleTsConfig.target = e.target.value;
});
strictCheckbox.addEventListener("change", e => {
    consoleTsConfig.strict = e.target.checked;
});
// targetSelect
function sendToCompiler(tsCode, tsConfig) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.runtime.sendMessage({ ts: tsCode, tsConfig, tabId: tabs[0].id });
    });
}
