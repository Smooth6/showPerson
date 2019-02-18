var oBox=document.getElementsByClassName('box')[0],
    oCurrent=document.getElementsByClassName('current')[0],
    oProgress=document.getElementsByClassName('progress')[0],
    oSpan=oProgress.getElementsByTagName('span')[0];

oBox.addEventListener('dragover',function(e){
    e.preventDefault();
});
oBox.addEventListener('drop',function(e){
    e.preventDefault();
    file=e.dataTransfer.files[0];
    var loader=new FileLoader(file,events);

});

var events={
    progressIng: function(per){
        oCurrent.style.width=per*300+'px';
        oSpan.innerHTML=Math.round(per*100)+'%';
    },
    loadIng: function(loaded){
        console.log('上传'+loaded+'部分');
    },
    Loaded: function(){
        console.log('传完了');
    }

}

