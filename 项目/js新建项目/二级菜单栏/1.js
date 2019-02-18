var oUl = document.getElementsByTagName('ul');
    

for( let i=0 ;i<oUl.length;i++){
    oUl[i].addEventListener('mouseover',()=>{
        oUl[i].style.background="wheat";
        var oA = oUl[i].getElementsByTagName('a');
        oA[0].style.color = "black";
        var oLi = oUl[i].getElementsByTagName('li');
        for(let j=0 ;j<oLi.length;j++){
            oLi[j].style.display ='block';
        }
    });
    oUl[i].addEventListener('mouseleave',()=>{
        oUl[i].style.background="#ff6700";
        var oA = oUl[i].getElementsByTagName('a');
        oA[0].style.color = "-webkit-link";
        var oLi = oUl[i].getElementsByTagName('li');
        for(let j=0 ;j<oLi.length;j++){
            oLi[j].style.display ='none';
        }
    })
}
