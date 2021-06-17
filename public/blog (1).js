console.log("js file included");

let search = document.getElementById('searchBtn');
search.addEventListener('click', populateSearch);
var exr = 0;
function populateSearch() {
  if(exr%2==0){
    document.getElementById('list-2').style.width = '';
    document.getElementById('searchBar').style.display = '';
  }else{
    document.getElementById('list-2').style.width = '31rem';
    document.getElementById('searchBar').style.display = 'block';
  }
  exr++;
}

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

let register = document.getElementById('signupBtn');
register.addEventListener('click', populateSignup);
function populateSignup() {
  console.log('signup presses')
  // closeForm();
  document.getElementById("signupForm").style.display = "block";
  nav.style.opacity = "0.1";
  home.style.opacity = '0.1';
  about.style.opacity = '0.1';
  footer.style.opacity = '0.1';
  document.body.style.overflowY = 'hidden';
}

let homeBtn = document.querySelector('.homeBtn');
homeBtn.addEventListener('click', populateSignup);
