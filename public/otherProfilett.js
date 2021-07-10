console.log('otherProfile.js included');

// QUESTION PART HERE

let answerBtn = document.getElementsByClassName('answerBtn');
for (let i = 0; i < answerBtn.length; i++) {
  answerBtn[i].onclick = () => {
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
    let tab = $(this).attr("id");
    console.log(tab);
    $("."+tab).css("display", "block");
  });
});
let name = document.getElementsByClassName('getname');
let q=0;
if(name){
  for( i=0; i<name.length; i++){
      let namexd = $(name[i]).attr('name');
      $.post('/getname', { data: namexd },function(data){
        handledata(data);
      });
  }
}
function handledata(data){
  $(name[q]).html(data.ok);
  q++;
};
let time = document.getElementsByClassName('gettime');
let t=0;
if(time){
  for(var i=0; i<time.length; i++){
      let namexd = $(time[i]).attr('name');
      $.post('/gettime', { data: namexd },function(data){
        handledatatime(data);
      });
  }
}
function handledatatime(data){
  $(time[t]).html(data.ok.totaltime.date+"/"+data.ok.totaltime.month+"/"+data.ok.totaltime.year);
  t++;
};
