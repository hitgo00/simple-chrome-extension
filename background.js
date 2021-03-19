// chrome.runtime.onInstalled.addListener(() => {
// });
chrome.runtime.onConnectExternal.addListener((port) => {
  port.onMessage.addListener(console.log);
  let strInfo, cpuInfo, memInfo;
  setInterval(() => {
    chrome.system.cpu.getInfo((info) => {
      cpuInfo = info;
    });
    chrome.system.memory.getInfo((info) => {
      memInfo = info;
    });
    chrome.system.storage.getInfo((info) => {
      strInfo = info;
    });
    port.postMessage({
      strInfo,
      cpuInfo,
      memInfo,
    });
  }, 1000);
});