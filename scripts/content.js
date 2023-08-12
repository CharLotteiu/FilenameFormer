const bug_id = document.getElementById("key-val").innerHTML;
const release_build = document.getElementById("customfield_10403-val") == null ?
    document.getElementById("customfield_10307-val").textContent.trim():
    document.getElementById("customfield_10403-val").textContent.trim();
const summary = document.getElementById("summary-val").textContent;
const pattern = /([^-|–]*)(-|–)/g;
const matches = summary.split(pattern);
const language = matches[7].trim();
const bug_type_1 = matches[10].trim();
const bug_type_2 = matches[13].trim();
const filename = bug_id + "_" + language + "_" + bug_type_1 + "_" + bug_type_2 + "_" + release_build;

var bugData = {
    "bugID": bug_id,
    "releaseBuild": release_build,
    "langs": language,
    "bugType1": bug_type_1,
    "bugType2": bug_type_2,
    "filename": filename,
};

chrome.runtime.sendMessage({type: "sendBugData", bugData: bugData});

// navigator.clipboard.writeText(filename).then(function() {
//     console.log('Async: Copying to clipboard was successful!');
// }, function(err) {
//     console.error('Async: Could not copy text: ', err);
// });
