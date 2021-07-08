console.log('otherProfile.js included');

// QUESTION PART HERE

let answerBtn = document.getElementsByClassName('answerBtn');
for (let i = 0; i < answerBtn.length; i++) {
  answerBtn[i].onclick = () => {
    // console.log('ans click');
    let answerDiv = document.getElementsByClassName('answerDiv');
    answerDiv[i].style.display = 'block';
  }
}
let bold = document.getElementById('bold');
if(bold){
  bold.onclick = () => {
    console.log('bold click');
    bold.classList.toggle('boldActive');
    if (bold.classList.contains('boldActive')) {
      bold.style.color = 'rgb(3, 110, 250)';
      document.getElementById('answerBlock').style.fontWeight = 'bold';
    }
    else {
      bold.style.color = '';
      document.getElementById('answerBlock').style.fontWeight = '';
    }
  }

}

let italic = document.getElementById('italic')
if(italic){
  italic.onclick = () => {
    console.log('italic click');
    italic.classList.toggle('italicActive');
    if (italic.classList.contains('italicActive')) {
      italic.style.color = 'rgb(3, 110, 250)';
      document.getElementById('answerBlock').style.fontStyle = 'italic';
    }
    else {
      italic.style.color = '';
      document.getElementById('answerBlock').style.fontStyle = '';
    }
  }

}
$(document).ready(function(){
  $(".list-tab button").on("click", function(){
    $(".list-hide").css("display", "none");
    tab = $(this).attr("id");
    $("."+tab).css("display", "block");
  });
});
let name = document.getElementsByClassName('getname');
var q;
if(name){
  for(var i=0; i<name.length; i++){
    q=i;
    console.log('name');
      var namexd = $(name[i]).attr('name');
      $.post('/getname', { data: namexd },function(data){
        handledata(data);
      });
  }
}
function handledata(data){
  $(name[q]).html(data.ok);
};
let time = document.getElementsByClassName('gettime');
if(time){
  for(var i=0; i<time.length; i++){
    q=i;
      var namexd = $(time[i]).attr('name');
      $.post('/gettime', { data: namexd },function(data){
        handledatatime(data);
      });
  }
}
function handledatatime(data){
  $(time[q]).html(data.ok.totaltime.date+"/"+data.ok.totaltime.month+"/"+data.ok.totaltime.year);
};



$('.followBtn').on('click',function(){
  let tt = $(this).html();
  let xt  = $(this).attr('name');
  $.post("/follow",{data:xt});
  if(tt=="UnFollow"){
    $('button.followBtn'+'.'+xt).html('Follow');
  }else{
    $('button.followBtn'+'.'+xt).html('UnFollow');
  }
});
