var oMore=document.getElementsByClassName('list-more')[0],
    oList=document.getElementsByClassName('list')[0];
oMore.onclick=function(){
    if(document.getElementsByClassName('list-active')[0]){
        oList.classList.remove('list-active');
    }else{
        oList.classList.add('list-active');
    }
}