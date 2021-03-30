chrome.runtime.onConnectExternal.addListener((port) => {
  let strInfo, cpuInfo, memInfo;
  port.onMessage.addListener((message) => {
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
  });
});
