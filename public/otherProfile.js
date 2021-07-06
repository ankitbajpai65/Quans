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
let bold = document.getElementById('bold')
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

let italic = document.getElementById('italic')
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