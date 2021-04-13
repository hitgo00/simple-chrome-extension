//to fetch cpu stats
const getCpuInfo = async () => {
  return new Promise((resolve, reject) => {
    chrome.system.cpu.getInfo((info) => {
      if (info) {
        resolve(info);
      } else {
        reject("Unable to get cpu information");
      }
    });
  });
};

//to fetch memory information
const getMemoryInfo = async () => {
  return new Promise((resolve, reject) => {
    chrome.system.memory.getInfo((info) => {
      if (info) {
        resolve(info);
      } else {
        reject("Unable to get memory information");
      }
    });
  });
};

//to fetch storage information
const getStorageInfo = async () => {
  return new Promise((resolve, reject) => {
    chrome.system.storage.getInfo((info) => {
      if (info) {
        resolve(info);
      } else {
        reject("Unable to get storage information");
      }
    });
  });
};

const fetchDataFromSystem = () => {
  return new Promise((resolve, reject) => {
    Promise.all([getCpuInfo(), getMemoryInfo(), getStorageInfo()]).then(
      (values) => {
        const cpuInfo = values[0];
        const memInfo = values[1];
        const strInfo = values[2];
        resolve({
          strInfo,
          cpuInfo,
          memInfo,
        });
      }
    );
  });
};

//listen to incoming port connection requests
chrome.runtime.onConnectExternal.addListener((port) => {
  port.onMessage.addListener(async (message) => {
    try {
      const systemInfo = await fetchDataFromSystem();
      console.log(systemInfo);
      port.postMessage(systemInfo);
    } catch (error) {
      port.postMessage(error);
    }
  });
});
