var projct_setting = {
    "IW9": {
        "release_build": "customfield_10403-val"
    },
    "JUP": {
        "release_build": "customfield_10307-val"
    },
    "CER": {
        "release_build": "customfield_10307-val"
    }
};

const bug_id = document.getElementById("key-val").innerHTML;
const project = bug_id.split("-")[0];
const release_build = document.getElementById(projct_setting[project]["release_build"]) != null ?
    document.getElementById(projct_setting[project]["release_build"]).textContent.trim(): "";
const summary = document.getElementById("summary-val").textContent;
const pattern = /([^-|–]*)(-|–)/g;
const matches = summary.split(pattern);
const language = matches[7].trim();
const bug_type_1 = matches[10].trim();
const bug_type_2 = matches[13].trim();

const filename = bug_id + "_" + language + "_" + bug_type_1 + "_" + bug_type_2;

var bugData = {
    "bugID": bug_id,
    "releaseBuild": release_build,
    "langs": language,
    "bugType1": bug_type_1,
    "bugType2": bug_type_2,
    "filename": filename,
};

chrome.runtime.sendMessage({type: "sendBugData", bugData: bugData});
