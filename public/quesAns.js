console.log("hehehhe");

document.getElementById('allAnswer').onclick = () => {
    let ans = document.getElementsByClassName('answerer');
    for (let i = 0; i < ans.length; i++) {
        // ans[i].style.display = 'block';
        ans[i].classList.toggle("showAns");
    }
}

let quesIcon = document.getElementsByClassName('quesIcon');
quesIcon[0].onclick = () => {
    console.log('clicked');
    quesIcon.classList.toggle("clickedIcon");
}
let ansIcons = document.getElementsByClassName('ansIcons');

for (let i = 0; i < ansIcons.length; i++) {
    ansIcons[i].onclick = () => {
        ansIcons[i].classList.toggle("clickedIcon");
    }
}
