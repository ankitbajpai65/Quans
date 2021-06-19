console.log("js file included");

let ele = document.getElementById('getit');
if(ele){
  alert("user has already found");
}

let search = document.getElementById('searchImg');
search.addEventListener('click', populateSearch);
var exr = 0;
function populateSearch() {
  if (exr % 2 == 0) {
    document.getElementById('list-2').style.width = '';
    document.getElementById('searchBar').style.display = '';
  } else {
    document.getElementById('list-2').style.width = '31rem';
    document.getElementById('searchBar').style.display = 'block';
  }
  exr++;
}

// Sign in button

let nav = document.getElementById('navSec');
let home = document.getElementById('homeSec');
let about = document.getElementById('aboutSec');
let footer = document.getElementById('footer');
function openForm() {
  document.getElementById("myForm").style.display = "block";
  nav.style.opacity = "0.1";
  home.style.opacity = '0.1';
  about.style.opacity = '0.1';
  footer.style.opacity = '0.1';
  document.body.style.overflowY = 'hidden';
}
function closeForm() {
  document.getElementById("myForm").style.display = "none";
  document.getElementById("signupForm").style.display = "none";
  nav.style.opacity = '';
  home.style.opacity = '';
  about.style.opacity = '';
  footer.style.opacity = '';
  document.body.style.overflowY = '';
}

// Sign up button

let register = document.getElementById('signupBtn');
register.addEventListener('click', populateSignup);
function populateSignup() {
  // console.log('signup presses')
  document.getElementById("signupForm").style.display = "block";
  nav.style.opacity = "0.1";
  home.style.opacity = '0.1';
  about.style.opacity = '0.1';
  footer.style.opacity = '0.1';
  document.body.style.overflowY = 'hidden';
}

let homeBtn = document.querySelector('.homeBtn');
homeBtn.addEventListener('click', populateSignup);

// Others button functioning

let other = document.querySelector('#otherBtn');
otherBtn.addEventListener('click', populateOthers)

function populateOthers() {
  console.log('others pressed');
  document.getElementById("others").style.display = "block";
  closeForm();
  nav.style.opacity = "0.1";
  home.style.opacity = '0.1';
  about.style.opacity = '0.1';
  footer.style.opacity = '0.1';
  document.body.style.overflowY = 'hidden';
}

function closeOthers() {
  document.getElementById("others").style.display = "none";
  nav.style.opacity = '';
  home.style.opacity = '';
  about.style.opacity = '';
  footer.style.opacity = '';
  document.body.style.overflowY = '';
  document.getElementById("quesSec").style.display = "none";
}

// when user signed in
let signin = document.getElementById('signinBtn');
signin.addEventListener('submit', formLogin);
function formLogin() {
  console.log('form submitted');
}

// Asking question
// let ask = document.getElementById('askBtn');
// ask.addEventListener('click', populateQues);

function populateQues() {
  console.log('hehehe');
  document.getElementById("quesSec").style.display = "block";
  document.body.style.overflowY = 'hidden';
}


// document.getElementById('signinBtn').addEventListener('submit',changeBody);
// function changeBody(){
//   console.log("submitted");
//}
