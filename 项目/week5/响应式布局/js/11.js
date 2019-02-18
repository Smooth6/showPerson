var change=document.getElementsByClassName('list')[0];
var oLi=change.getElementsByTagName('li');

oLi[1].onclick=function(){
    if(oLi[3].style.display=='block'){
        for(var i=2;i<7;i++){(function(j){
            if(j!=4){
                oLi[j].style.display='none';
            }
        })(i)};
    }
    else{
        for(var i=2;i<7;i++){(function(j){
            if(j!=4){
                oLi[j].style.display='block';
            }
        })(i)};
    }
}