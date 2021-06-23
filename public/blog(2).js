// console.log("js file included");
window.addEventListener( "pageshow", function ( event ) {
  var historyTraversal = event.persisted ||
                         ( typeof window.performance != "undefined" &&
                              window.performance.navigation.type === 2 );
  if ( historyTraversal ) {
    // Handle page restore.
    window.location.reload();
  }
});
let search = document.getElementById('searchImg');
if(search)
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
  if(home)
  home.style.opacity = '0.1';
 if(about)
  about.style.opacity = '0.1';
 if(footer)
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
if (register)
register.addEventListener('click', populateSignup);
function populateSignup() {
  // console.log('signup presses')
  closeForm();
  document.getElementById("signupForm").style.display = "block";
  nav.style.opacity = "0.1";
  home.style.opacity = '0.1';
  about.style.opacity = '0.1';
  footer.style.opacity = '0.1';
  document.body.style.overflowY = 'hidden';
}

// Others button functioning

let other = document.querySelector('#otherBtn');
if(other)
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
if(signin)
signin.addEventListener('submit', formLogin);
function formLogin() {
  console.log('form submitted');
}

// Asking question
let ask = document.getElementById('askBtn');
if(ask)
ask.addEventListener('click', populateQues);

function populateQues() {
  // console.log('hehehe');
  let anst = document.getElementById("quesSec");
  // const(anst);
  if(anst)
  anst.style.display = "block";
  document.body.style.overflowY = 'hidden';
}

// document.getElementById('signinBtn').addEventListener('submit',changeBody);
// function changeBody(){
//   console.log("submitted");
//}
