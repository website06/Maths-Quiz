str=localStorage.getItem('var1');
data=JSON.parse(str);
clas=data.class;
clasid=clas.slice(1);
clasid=Number(clasid);
if(clasid<=1){
    clasid=0;
} else{
 clasid=clasid-1;
}
data.corcount=0;
//creating buttons
div=document.getElementById('div');
for(var i=0;i<4;i++){
    bd=document.createElement('input');
    div1=document.createElement('div');
    if(i==0){
        bd.type='text';
        bd.id='qus';
        bd.disabled=true;
        bd.className='qus';
        div.appendChild(div1);    div1.appendChild(bd);//adding text box
    } else if(i>0 & i<3){
    bd.type='button';
    var bid='b'+(i-1);
    bd.id=bid;
    bd.className='b01';
    bd.style.height='80px'; bd.style.width='15%'; bd.style.fontSize='70px';
    } else{
    bd.type='button';
    bd.id='next';
    bd.value='>';
    bd.className='next'
    bd.addEventListener('click',next);
    bd.style.height='80px';  bd.style.width='10%';bd.style.fontSize='50px';bd.style.color='green';
    }
    if(i>0){
    div.appendChild(bd); }
}

var next=document.getElementById('next');

function quiz(){
next.disabled=true;//dissabling next button
arr=['+','-','<','>','='];

if(clasid>=0 && clasid<13){
    arr=['+','-','*','/'];
    if(clasid==0){
        min=1;
        max=10;
    } else if(clasid>0 && clasid<2){
        min=2;
        max=13;
    } else { 
        min=7;
        max=20;
    } 
}


options=[];
var a=Math.floor(Math.random()* (arr.length));
//declaring addition and sub-------------
if(clasid>0 && a<2){
    min=200;
    max=1000;
}
var v1=(Math.floor(Math.random()* max)+min);
var v2=(Math.floor(Math.random()* max)+min);

//if(arr[a]!='&' || arr[a]!='^' || arr(a)!='@'){
    if(arr[a]=='='){
        var an=eval(v1+'=='+v2);
    } else{
        var an=eval(v1+arr[a]+v2);
    }
    qu=v1+' '+arr[a]+' '+v2+' =';//question
/*} else{
    if(arr[a]=='^'){
        var an=v2*v2;
        qu=v2+'²'+' =';
    } else if(arr[a=='&']){
        var an=v1*v1*v1;
        qu=v1+'³'+' =';
    } else{
        var an=Math.sqrt(v2);
        qu='√'+v2+' =';
    }
}*/

// for 2 3 class students-------------------------------


//options
if(typeof(an)==='boolean'){
options=[true,false];
} else{
var temp=Math.floor(Math.random()* 2);
var temp1=(Math.floor(Math.random()* 5))+1;
an2=eval(an+arr[temp]+temp1);
//rounding
if(typeof an === 'number' && !Number.isInteger(an)){
options=[an.toFixed(2),an2.toFixed(2)];
}else{
    options=[an,an2];
}
}
an=an.toString();//convert answer to string
options.push(qu);
options.push(an);
document.getElementById('qus').value=qu;
var rand=2;
for(var i=0;i<2;i++){
    //change the options
rand01=Math.floor(Math.random()* rand);
b='b'+i;
b=document.getElementById(b);
b.value=options[rand01];
options.splice(rand01,1);
rand=rand-1;
}
return options;
}
quiz();//function ends here------


ans=document.getElementById('ans');
var count=1;
var corcount=0;
function next(){// next button-------------
    if(count<10){
options=quiz();
ans.innerHTML=' ';
b0.disabled=false;
b1.disabled=false;
count=count+1;//counting
document.getElementById('count').innerHTML="Question No : "+count;
    } else{
    str=JSON.stringify(data);
    localStorage.setItem('final',str);//data adding to local host
    window.location.href='end.html';
        }
    }

function check(bt){
b0.disabled=true;//disablling buttons-------
b1.disabled=true;
next.disabled=false;//enablling next button;----------------

    if(options[1]==bt.value){
        corcount=corcount+1;
        ans.innerHTML='correct ';
        data.corcount=corcount;// adding to json
    }else{
        ans.innerHTML='wrong ';
    }
} 
b0=document.getElementById('b0');
b1=document.getElementById('b1');
b0.addEventListener('click',function(){
    check(b0);
});
b1.addEventListener('click',function(){
    check(b1);
});

