function addOption(lang){
    //Look for the select element by ID
    var obj=document.getElementById('lang');
    var opt = new Option(lang, lang)
    //Add one more options
    obj.options.add(opt);
}

function checkEFIGS(lang){
    if(lang.includes("E") && (lang != "ENAR")){
        addOption("EN");
    }
    if(lang.includes("F")){
        addOption("FR");
    }
    if(lang.includes("I")){
        addOption("IT");
    }
    if(lang.includes("G")){
        addOption("DE");
    }
    if(lang.includes("S") && (lang != "ZHS")){
        addOption("ES");
    }
}


chrome.runtime.sendMessage({type: "getBugData"}, function(bugData) {
    if(typeof bugData == "undefined") {

        alert("Didn't catch any bug data. \n Please check if you are on a correct bug page \n or try to use the extension again after the page is completely loaded.");

    } else {
        var build_show;

        chrome.storage.local.get('BOTO', function (result) {
            if(typeof result == "undefined") {
                document.getElementById('release_id').value = bugData.releaseBuild;  
            } else {
            document.getElementById('release_id').value = result.BOTO;
            build_show = result.BOTO;
            }


            document.getElementById('bug_id').value = bugData.bugID;
            document.getElementById('bug_type_one').value = bugData.bugType1;
            document.getElementById('bug_type_two').value = bugData.bugType2;

            if(bugData.langs.search("/") == -1){
                addOption(bugData.langs);
                document.getElementById('file_name').value = bugData.filename + "_" +  build_show;
            } else {
                var matches = bugData.langs.split("/");
                matches.forEach(function(lang){
                    if(lang.match(/[EFIGS][EFIGS]+/)){
                        checkEFIGS(lang);
                    }
                    else{
                        addOption(lang);
                    }
                })

                document.getElementById('lang').onchange = function(){
                    var lang_selected = document.getElementById('lang').value;
                    var new_filename = bugData.bugID + "_" + lang_selected + "_" + bugData.bugType1 + "_" + bugData.bugType2 + "_" + build_show;
                    document.getElementById('file_name').value = new_filename;
                };
            }

            document.getElementById('release_id').onchange = function(){
                var new_release = document.getElementById('release_id').value;
                var lang_showed = document.getElementById('lang').value;
                var new_filename_release = bugData.bugID + "_" + lang_showed + "_" + bugData.bugType1 + "_" + bugData.bugType2 + "_" + new_release;
                document.getElementById('file_name').value = new_filename_release;
            };

            document.getElementById('copy_text').onclick = function(){
                var copy_filename = document.getElementById('file_name').value;

                navigator.clipboard.writeText(copy_filename).then(function() {
                    console.log('Async: Copying to clipboard was successful!');
                }, function(err) {
                    alert('Async: Could not copy text: ', err);
                });
            };

            document.getElementById('add_new').onclick = function(){
                var original_filename = document.getElementById('file_name').value;
                document.getElementById('file_name').value = "New_" + original_filename;
            };

            document.getElementById('save_build').onclick = function(){
                var today_build = document.getElementById('release_id').value;
                chrome.storage.local.set({'BOTO': today_build});
            };
        });
    }
});
