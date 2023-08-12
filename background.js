var temp;
chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
        switch(message.type) {
            case "sendBugData":
                temp = message.bugData;
                break;
            case "getBugData":
                sendResponse(temp);
                break;
            default:
                console.error("Unrecognised message: ", message);
        }
    }
);
