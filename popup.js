function addOption(lang){
    //根据id查找对象，
    var obj=document.getElementById('lang');
    var opt = new Option(lang, lang)
    //添加一个选项
    obj.options.add(opt);
}

var buildForm = document.getElementById("buildForm");

buildForm.addEventListener("submit", (e) => {
    e.preventDefault();
    var build_today = document.getElementById('release_id').value;
    alert(build_today);
});

chrome.runtime.sendMessage({type: "getBugData"}, function(bugData) {
    if(typeof bugData == "undefined") {
        // That's kind of bad
    } else {

        document.getElementById('bug_id').value = bugData.bugID;
        document.getElementById('release_id').value = bugData.releaseBuild;
        document.getElementById('bug_type_one').value = bugData.bugType1;
        document.getElementById('bug_type_two').value = bugData.bugType2;

        if(bugData.langs.search("/") == -1){
            addOption(bugData.langs);
            document.getElementById('file_name').value = bugData.filename;
        } else {
            var matches = bugData.langs.split("/");
            matches.forEach(function(lang){
                addOption(lang);
            })

            document.getElementById('lang').onchange = function(){
                var lang_selected = document.getElementById('lang').value;
                var new_filename = bugData.bugID + "_" + lang_selected + "_" + bugData.bugType1 + "_" + bugData.bugType2 + "_" + bugData.releaseBuild;
                document.getElementById('file_name').value = new_filename;
            };
        }

        document.getElementById('release_id').onchange = function(){
            var new_release = document.getElementById('release_id').value;
            var lang_showed = document.getElementById('lang').value;
            var new_filename_release = bugData.bugID + "_" + lang_showed + "_" + bugData.bugType1 + "_" + bugData.bugType2 + "_" + new_release;
            document.getElementById('file_name').value = new_filename_release;
        };
    }
});