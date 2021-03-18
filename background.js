chrome.runtime.onInstalled.addListener(() => {
  setInterval(() => {
    chrome.system.cpu.getInfo(console.log);
    chrome.system.memory.getInfo(console.log);
    chrome.system.storage.getInfo(console.log);
    // chrome.system.display.getInfo(true, console.log);
  }, 2100);
});
