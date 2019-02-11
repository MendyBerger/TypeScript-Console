"use strict";
chrome.devtools.panels.create("TS Console", null, "./console-tab/tab.html", null);
console.log("from: tab.js");
