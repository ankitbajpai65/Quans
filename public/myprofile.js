console.log('added');

function openNav() {
  document.querySelector(".sidebar").style.width = "250px";
  document.querySelector("#close").style.display = "block";

  document.querySelector(".content").style.marginLeft = "24rem";
  // document.querySelector("#moreInfo").style.position = 'static';

  // document.querySelector('.table-2').style.display = 'none'
  // document.getElementById('pinChange').style.display = 'inline-block';
}
function closeNav() {
  document.querySelector(".sidebar").style.width = "0";
  document.querySelector(".content").style.marginLeft = "";
  // document.querySelector("#moreInfo").style.position = '';

  // document.querySelector('.table-2').style.display = 'block'
  // document.getElementById('pinChange').style.display = 'none';
  //   if(document.querySelector("#moreInfo").style.position == 'absolute'){
  //     document.querySelector(".secLable").style.marginRight = '3rem';
  //   }
  //   else{
  //     document.querySelector(".secLable").style.marginRight = '';
  //   }
}

// let pin = document.getElementById('pinChange');
// pin.onclick = () => {
//     let table = document.querySelector('.table-2');
//     console.log('btn clicked');
//     table.classList.toggle("clickedPinChangeBtn");

//     if (table.classList.contains("clickedPinChangeBtn")){
//         pin.style.backgroundColor = 'black';
//         pin.innerHTML='Add more';
//         document.getElementById('moreInfo').style.display='none';
//         // document.querySelector('.content').style.marginTop='1rem';
//     }
//     else{
//         pin.innerHTML='Change Password';
//         pin.style.backgroundColor = '';
//         document.getElementById('moreInfo').style.display='';

//         // document.querySelector('.content').style.marginTop='';
//     }
// }

// FOLLOWERS AND FOLLOWING

// let edit = document.getElementById('editBtn');
// edit.addEventListener('click', editInfo);

// document.querySelector('#followerBtn').onclick = () => {
//   let follower = document.querySelectorAll('.follower');
//   // console.log('foll click');
//   for (let i = 0; i < follower.length; i++) {
//     follower[i].classList.toggle('followers');
//     if (follower[i].classList.contains('followers')) {
//       // console.log('present');
//       follower[i].style.display = 'block';
//       document.querySelector('#followerBtn').style.textDecoration='underline';
//     }
//     else {
//       //  console.log('absent');
//       follower[i].style.display = '';
//       document.querySelector('#followerBtn').style.textDecoration='';
//     }
//   }
// }
// document.querySelector('#followingBtn').onclick = () => {
//   let following = document.querySelectorAll('.following');
//   // console.log('foll click');
//   for (let i = 0; i < following.length; i++) {
//     following[i].classList.toggle('followings');
//     if (following[i].classList.contains('followings')) {
//       // console.log('present');
//       following[i].style.display = 'block';
//       document.querySelector('#followingBtn').style.textDecoration='underline';
//     }
//     else {
//       //  console.log('absent');
//       following[i].style.display = '';
//       document.querySelector('#followingBtn').style.textDecoration='';
//     }
//   }
// }

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

function editInfo() {
  let edit = document.getElementById("editBtn");
  if (edit.innerHTML == "Edit") {
    alert("Now, you can the Change the user info")
    edit.innerHTML = "Save";
  }
  else edit.innerHTML = "Edit";
}
var i = 0;
function saveedit() {
  if (i % 2 == 0) {
    $("#FName").prop("readonly", false);
    $("#LName").prop("readonly", false);
    editInfo();
  } else {
    let data = {
      FName: $('#FName').val(),
      LName: $('#LName').val(),
    }
    // console.log(data);
    data = JSON.stringify(data);
    $.post('/addmoredetails', { data: data }, function (data) {
      console.log(data);
    });
    $("#FName").prop("readonly", true);
    $("#LName").prop("readonly", true);
    editInfo();
  }
  i++;
}

function savedetail() {
  // console.log("yes");
  let data = {
    Description: $("#Description").val(),
    Education: $('#edu').val(),
    State: $('#state').val(),
    City: $('#city').val()
  }
  data = JSON.stringify(data);
  $.post('/addmoredetails', { data: data });
  // console.log(data);
}
 // console.log(data);
// }
