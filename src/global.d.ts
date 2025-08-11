declare global {
    interface Window {
        electronAPI: {
            ipcRenderer: {
                send: any
            }
            closeApp: () => void;
        }
    }
}

 export {};