var nav = document.getElementsByTagName('nav')[0],
    nLi = nav.getElementsByTagName('li'),
    btn1 = document.getElementById('btn1'),
    btn2 = document.getElementById('btn2'),
    teacher = document.getElementsByClassName('teacher')[0],
    teacher1 = teacher.getElementsByTagName('li');
var p2 = document.getElementsByClassName('part2')[0],
    p2Div = p2.getElementsByTagName('div');
var p5 = document.getElementsByClassName('part5')[0];
var height,index=1;

document.onscroll=function(){
    height=document.body.scrollTop;
    console.log(height);
    moveNav(height);
    moveDiv(height);
    moveBg(height);
}

function moveNav(height){
    if(height > 100){
        nav.style.height = "70px";
        nav.style.lineHeight = "84px"
    }else{
        nav.style.height = "100px";
        nav.style.lineHeight = "120px"
    }
}

function moveDiv(height){
    if(height > 1300)
    p2Div[2].style.transition = "all 1s ease 1s";
    p2Div[4].style.transition = "all 1s ease 1s";
    p2Div[3].style.transition = "all 1s ease 2s";
    p2Div[5].style.transition = "all 1s ease 2s";
    p2Div[1].style.left = "0";
    p2Div[2].style.left = "0";
    p2Div[3].style.left = "0";
    p2Div[4].style.left = "0";
    p2Div[5].style.left = "0";
}

function moveBg(height){
    if(height> 3400){
        p5.style.backgroundPosition="120% 50%";
    }
}
btn1.addEventListener('click',()=>{
    if(index == 1){
        teacher1[0].style.marginLeft="0%";
        index = 0;
    }else if(index == 2){
        teacher1[0].style.marginLeft="-25%";
        index = 1;
    }
    
});
btn2.addEventListener('click',()=>{
    if(index == 0){
        teacher1[0].style.marginLeft="-25%";
        index = 1;
    }else if(index == 1){
        teacher1[0].style.marginLeft="-50%";
        index = 2;
    }
});


