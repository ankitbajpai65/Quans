console.log("hehehhe");

document.getElementById('allAnswer').onclick = () => {
    let ans = document.getElementsByClassName('answerer');
    for (let i = 0; i < ans.length; i++) {
        ans[i].classList.toggle("showAns");
    }
}

let quesIconslike = document.getElementsByClassName('quesIconslike');

for (let i = 0; i < quesIconslike.length; i++) {
    quesIconslike[i].onclick = () => {
        quesIconslike[i].classList.toggle("clickedIcon");
        saveDetailLike($(quesIconslike[i]).attr("id"));
    }
}
// console.log(quesIconslike);
let quesIconsdislike = document.getElementsByClassName('quesIconsdislike');

for (let i = 0; i < quesIconsdislike.length; i++) {
    quesIconsdislike[i].onclick = () => {
        quesIconsdislike[i].classList.toggle("clickedIcon");
        saveDetailDislike($(quesIconslike[i]).attr("id"));
    }
}
let ansIconslike = document.getElementsByClassName('ansIconslike');
let ansIconsdislike = document.getElementsByClassName('ansIconsdislike');

for (let i = 0; i < ansIconslike.length; i++) {
    ansIconslike[i].onclick = () => {
        ansIconslike[i].classList.toggle("clickedIcon");
          saveDetailLike($(ansIconslike[i]).attr("id"));
    }
}
for (let i = 0; i < ansIconsdislike.length; i++) {
    ansIconsdislike[i].onclick = () => {
        ansIconsdislike[i].classList.toggle("clickedIcon");
        saveDetailDislike($(ansIconsdislike[i]).attr("id"));
    }
}
function saveDetailLike(data){
    var id = data;
      $.post('/userliked', { data: id });
}
function saveDetailDislike(data){
    var id = data;
    $.post('/userdisliked', { data: id });
}
