document.querySelector("input").onchange = function() {
    console.log(this.files);
    hideInput();

    let re = /video\/*/;

    var filelist = [].slice.call(this.files);
    filelist.sort(function(a, b) {
        return (a.name < b.name ? -1 : (a.name > b.name ? 1 : 0));
    });
    
    filelist.forEach( function(v) {
        var link = "file:///home/rla/" + v.webkitRelativePath;
        if(re.test(v.type)) {
            $("body").append(`<div><a href="${link}"> ${v.name} </a></div>`);
        }
    });
};

function hideInput() {
    $("#folderInput").toggle();
}