console.log("hehehhe");

document.getElementById('allAnswer').onclick = () => {
    let ans = document.getElementsByClassName('answerer');
    for (let i = 0; i < ans.length; i++) {
        // ans[i].style.display = 'block';
        ans[i].classList.toggle("showAns");
    }
}

let quesIcons = document.getElementsByClassName('quesIcons');

for (let i = 0; i < quesIcons.length; i++) {
    quesIcons[i].onclick = () => {
        quesIcons[i].classList.toggle("clickedIcon");
    }
}
let ansIcons = document.getElementsByClassName('ansIcons');
let like = document.getElementsByClassName('like');
let dislike = document.getElementsByClassName('dislike');

for (let i = 0; i < ansIcons.length; i++) {
    ansIcons[i].onclick = () => {
        ansIcons[i].classList.toggle("clickedIcon");
    }
}
