console.log('otherProfile.js included');
window.addEventListener( "pageshow", function ( event ) {
  var historyTraversal = event.persisted ||
                         ( typeof window.performance != "undefined" &&
                              window.performance.navigation.type === 2 );
  if ( historyTraversal ) {
    // Handle page restore.
    window.location.reload();
  }
});

// FOR MOBILE NAVIGATION MENU

let openSide=document.getElementById('openSide');
let sidebar=document.querySelector('.sidebar');
openSide.onclick=()=>{
  // sidebar.classList.toggle('openSidebar');
  sidebar.style.width='28%';
}
document.getElementById('myContent').onclick=()=>{
  sidebar.style.width='';
}

// PROFILENAV

let btn = document.querySelectorAll('.btn');
let slide = document.querySelector('.slide');
btn.forEach((ele, index) => {
  ele.addEventListener("click", () => {
    slide.style.display = 'block';
    slide.style.left = 100 / btn.length * index + "%";

    // for (let i = 0; i < btn.length; i++) {
    //   btn[i].onclick = () => {
    //     btn[i].style.color = 'red';
    //   }
    //   btn[i].onmouseout = () => {
    //     btn[i].style.color = '';
    //   }
    // }
  });
});

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
  $(".list-tab button").on("click", function () {
    $(".list-hide").css("display", "none");
    $(".lexy").css("color", "black");
    var tab = $(this).attr("id");
    $("." + tab).css("display", "block");
    $("button#" + tab).css("color", "red");
    // $(".list-tab button").css("color", "red");
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
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

let time = document.getElementsByClassName('gettime');
var t = 0;
if (time) {
  for (var i = 0; i < time.length; i++) {
    var namexd = $(time[i]).attr('name');
    $.post('/gettime', { data: namexd }, function (data) {
      handledatatime(data);
    });
  }
}
function handledatatime(data) {
  $(time[t]).html(data.ok.totaltime.date + "/" + monthNames[data.ok.totaltime.month] + "/" + data.ok.totaltime.year);
  t++;
};
