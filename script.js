document.querySelector("input").onchange = function() {
    console.log(this.files);

    let re = /video\/*/;
    [].slice.call(this.files).forEach( function(v) {
        var link = "file:///home/rla/" + v.webkitRelativePath;
        if(re.test(v.type)) {
            $("body").append(`<div><a href="${link}"> ${v.name} </a></div>`);
        }
    });
};