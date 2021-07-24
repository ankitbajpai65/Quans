window.addEventListener("pageshow", function (event) {
  var historyTraversal = event.persisted ||
    (typeof window.performance != "undefined" &&
      window.performance.navigation.type === 2);
  if (historyTraversal) {
    // Handle page restore.
    window.location.reload();
  }
});
document.getElementById('allAnswer').onclick = () => {
  let ans = document.getElementsByClassName('answerer');
  for (let i = 0; i < ans.length; i++) {
    ans[i].classList.toggle("showAns");
    if (ans[i].classList.contains('showAns')) {
      scrollTo(0, 500);
    }
  }

}

let quesIconslike = document.getElementsByClassName('quesIconslike');

for (let i = 0; i < quesIconslike.length; i++) {
  quesIconslike[i].onclick = () => {
    saveDetailLike($(quesIconslike[i]).attr("id"));
    // console.log(get);
    quesIconslike[i].classList.toggle("clickedIcon");
    if (quesIconsdislike[i].classList[3]) {
      quesIconsdislike[i].classList.toggle("clickedIcon");
    }
  }
}
// console.log(quesIconslike);
let quesIconsdislike = document.getElementsByClassName('quesIconsdislike');

for (let i = 0; i < quesIconsdislike.length; i++) {
  quesIconsdislike[i].onclick = () => {
    quesIconsdislike[i].classList.toggle("clickedIcon");
    // console.log();
    if (quesIconslike[i].classList[3]) {
      quesIconslike[i].classList.toggle("clickedIcon");
    }
    saveDetailDislike($(quesIconslike[i]).attr("id"));
  }
}
let ansIconslike = document.getElementsByClassName('ansIconslike');
let ansIconsdislike = document.getElementsByClassName('ansIconsdislike');

for (let i = 0; i < ansIconslike.length; i++) {
  ansIconslike[i].onclick = () => {
    ansIconslike[i].classList.toggle("clickedIcon");
    // console.log(ansIconsdislike[i]);
    if (ansIconsdislike[i].classList[3]) {
      ansIconsdislike[i].classList.toggle("clickedIcon");
    }
    saveDetailLike($(ansIconslike[i]).attr("id"));
  }
}
for (let i = 0; i < ansIconsdislike.length; i++) {
  ansIconsdislike[i].onclick = () => {
    ansIconsdislike[i].classList.toggle("clickedIcon");
    // console.log(ansIconslike[i]);
    if (ansIconslike[i].classList[3]) {
      ansIconslike[i].classList.toggle("clickedIcon");
    }
    saveDetailDislike($(ansIconsdislike[i]).attr("id"));
  }
}

let icon = document.getElementById('likeIcon');
icon.onclick = () => {
  console.log('like click');
    icon.style.display = 'none';
    document.getElementById('clickedLike').style.display = 'block';
  // icon.classList.toggle('clickedLike');
}

function saveDetailLike(data) {
  var id = data;
  var tt = true;
  $.post('/userliked', { data: id });
}
function saveDetailDislike(data) {
  var id = data;
  $.post('/userdisliked', { data: id });
}

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
