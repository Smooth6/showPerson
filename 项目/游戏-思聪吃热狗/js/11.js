var myCavans=document.getElementById('canvas');
var ctx=myCavans.getContext('2d');
var img1= new Image(),
    img2= new Image();
    img3= new Image();
    img4= new Image();
var arr=[];
var rank=1,experience=0;
var num=0,s=70,s2=70,pp,pp2,flag=true,flag3=true,ss=0,timer1,timer2,timer3,timer4,timer5,i,j,flag2=true;
img2.src='./imags/55.png';
img4.src='./imags/55.png';
img1.src="./imags/6.jpg";
img3.src="./imags/7.jpg";

var gradient=ctx.createLinearGradient(0,0,myCavans.width,0);
    gradient.addColorStop("0","magenta");
    gradient.addColorStop("0.5","blue");
    gradient.addColorStop("1.0","red");


img1.onload=function(){
    ctx.drawImage(img1,0,num,100,100);
    ctx.drawImage(img2,70,num+20,80,50);
    ctx.font="30px Verdana";
    ctx.fillStyle=gradient;
    ctx.fillText("请按Enter开始游戏",350,150);
    ctx.fillText("上下操控",350,200);
    ctx.fillText("空格发射热狗",350,250);
    ctx.fillText("(升级难度增加)",350,300);
    ctx.fillText("(三级解锁连续发射2热狗)",350,350);
    ctx.fillText("(死亡后按Enter自动复活)",350,400);
}

circle();

document.onkeydown=function(ev){
    var oEvent = ev || event;
    key=oEvent.keyCode;
    arr=addKeyCode(key,arr);

    //这个 if 本来应该放在circle循环里面的
    //有时会自动延时触发发射两个热狗
    if(rank > 2){
        if(!flag&&flag3){
            pp2=num;
            shot2();
        }
    }
}
document.onkeyup=function(ev){
    var oEvent = ev || event;
    key=oEvent.keyCode;
    arr=deletKeyCode(key,arr);
}
function addKeyCode(key,arr){
    var check = 0;
    for(var i=0;i<arr.length;i++){
        if(arr[i]==key){
            check=1;
        }
    }
    if(check==0){
        arr.push(key);
    }
    return arr;
}

function deletKeyCode(key,arr){
    for(var i=0;i<arr.length;i++){
        if(arr[i]==key){
            arr.splice(i,1);
        }
    }
    return arr;
}

function circle(){
    if(!flag2){
        rankImprove();
    }
    for(var i=0;i<arr.length;i++){
        if(arr[i]==13){
            if(flag2){
                ctx.clearRect(180,0,850,700);
                start();
                flag2=false;
            }
        }
        if(arr[i]==38){
            move(-5);
        }
        if(arr[i]==40){
            move(5);
        }
        if(arr[i]==32){
            if(flag==true){
                pp=num;
                shot();
            }

            //本来循环应该放在这里的，但是按一次space会触发多次
            // if (arr[i] == 32)事件，相当于按一次会自动发射两个
            //无法分开发射两个

            // console.log(flag);
            // if(!flag&&flag3){
            //     console.log(1);
            //     flag3=false;
            //     pp2=num;
            //     shot2();
            // }
        }
    }
    requestAnimationFrame(circle);
}

function rankImprove(){
    ctx.beginPath();
    ctx.font="25px Verdana";
    ctx.fillStyle=gradient;
    if(experience > rank*10-1){
        experience=0;
        rank+=1;
    }
    ctx.fillText('当前等级:'+rank+'(难度：'+rank+')',300,50);
    ctx.fillText('当前经验:('+experience+'/'+rank*10+')',300,100);
}

function move(i){
    if(i>0){
        if(num>=600){
            num=600;
        }else{
            num = num + i;
            ctx.beginPath();
            ctx.clearRect(0,0,150,700);
            ctx.drawImage(img1,0,num,100,100);
            ctx.drawImage(img2,70,num + 20,80,50);
        }
    }
    if(i<0){
        if(num<=0){
            num=0;
        }else{
            num = num + i;
            ctx.beginPath();
            ctx.clearRect(0,0,150,700);
            ctx.drawImage(img1,0,num,100,100);
            ctx.drawImage(img2,70,num + 20,80,50);
        }
    }
}

function shot(){
    flag=false;
    if(s<1000){
        s=s+15;
        ctx.beginPath();
        ctx.clearRect(s-20,pp+20,80,50);
        ctx.drawImage(img1,0,num,100,100);
        ctx.drawImage(img2,70,num + 20,80,50);
        ctx.drawImage(img2,s,pp + 20,80,50);
        timer1=requestAnimationFrame(shot);
    }else{
        cancelAnimationFrame(timer1);
        flag=true;
        s=70;
    }
}

function shot2(){
    flag3=false;
    if(s2<1000){
        s2+=15;
        ctx.beginPath();
        ctx.clearRect(s2-20,pp2+20,80,50);
        ctx.drawImage(img1,0,num,100,100);
        ctx.drawImage(img4,70,num + 20,80,50);
        ctx.drawImage(img4,s2,pp2 + 20,80,50);
        timer5=requestAnimationFrame(shot2);
    }else{
        cancelAnimationFrame(timer5);
        flag3=true;
        s2=70;
    }
}

function start(){
    var i=Math.random(),
        j=Math.random();
        ss=0;
        asd();
        
    function asd(){
        if(ss<999){
            ctx.clearRect(1000-ss,i*500,-(50+j*150),50+j*150);
            ss += rank*2+2*(1-j);
            ctx.drawImage(img3,1000-ss,i*500,-(50+j*150),50+j*150);
            timer2=requestAnimationFrame(asd);
        }else{
            flag2=true;
            alert("你把思聪饿死了");
        }
        if(Math.abs((1000-ss)-s-100)<20&&Math.abs(pp-i*500-50*j)<30){
            console.log(1111);
            cancelAnimationFrame(timer1);
            cancelAnimationFrame(timer2);
            flag=true;
            s=70;
            experience += 1;
            ctx.clearRect(150,0,850,700);
            start();
        }
        if(Math.abs((1000-ss)-s2-100)<20&&Math.abs(pp2-i*500-50*j)<30){
            cancelAnimationFrame(timer5);
            cancelAnimationFrame(timer2);
            flag3=true;
            s2=70;
            experience += 1;
            ctx.clearRect(150,0,850,700);
            start();
        }
    }
   
}

