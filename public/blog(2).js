// console.log("js file included");
window.addEventListener("pageshow", function (event) {
  var historyTraversal = event.persisted ||
    (typeof window.performance != "undefined" &&
      window.performance.navigation.type === 2);
  if (historyTraversal) {
    // Handle page restore.
    window.location.reload();
  }
});
let search = document.getElementById('searchImg');
if (search)
  search.addEventListener('click', populateSearch);
var exr = 0;
function populateSearch() {
  if (exr % 2 == 0) {
    document.getElementById('list-2').style.width = '';
    document.getElementById('searchBar').style.display = '';
  } else {
    document.getElementById('list-2').style.width = '32rem';
    document.getElementById('searchBar').style.display = 'block';
    document.getElementById('profileImg').style.display = 'block';
    $('#profileImg').css('margin-right', '10px');
    $('#profileImg').css('margin-bottom', '10px');
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
  if (home)
    home.style.opacity = '0.1';
  if (about)
    about.style.opacity = '0.1';
  if (footer)
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
if (other)
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
  let location = document.getElementById("others");
  if (location)
    location.style.display = "none";
  if (nav)
    nav.style.opacity = '';
  if (home)
    home.style.opacity = '';
  if (about)
    about.style.opacity = '';
  if (footer)
    footer.style.opacity = '';
  document.body.style.overflowY = '';
  document.getElementById("quesSec").style.display = "none";
}

// Asking question
let ask = document.getElementById('askBtn');
if (ask)
  ask.addEventListener('click', populateQues);

function populateQues() {
  // console.log('hehehe');
  let anst = document.getElementById("quesSec");
  // const(anst);
  if (anst)
    anst.style.display = "block";
  scrollTo(0, -500);
  document.body.style.overflowY = 'hidden';

}
function dothis() {
  let fun = document.getElementById('contactForm');
  let name = $('#name').val()
  let email = $('#email').val();
  let message = $('#messages').val();
  // console.log(message);
  let data = {
    name: name,
    email: email,
    message: message
  }
  data = JSON.stringify(data);
  $.post('/mailing', { data: data }).done(function (data) {
    console.log(data);
    if (!data.ok) {
      alert("you are not logged in");
    } else {
      alert("successfully submitted");
    }
  });
}



$('#submitQues').on('click', function () {
  const data = $('#askq').val();
  $.post('/askquestion', { question: data });
  $('#quesSec').css('display', 'none');
  $('#alertBox').css('display', 'block');
  window.setTimeout("closeHelpDiv();", 2000);
});
function closeHelpDiv() {
  $('#alertBox').css('display', 'none');
}


// Profile image function
//
$(document).on('click', function (e) {
  let qt = e.target.id;
  if (qt == 'profileImg' || qt == 'profileImgs' || qt == 'total' || qt == 'infoList') {
    document.getElementById('infoSec').style.display = "block";
  } else {
    document.getElementById('infoSec').style.display = "none";
  }
});

// document.body.onclick = () => {
//   document.getElementById('infoSec').style.display = "";
// }
// document.body.onscroll = () => {
//   document.getElementById('infoSec').style.display = "";
// }

let i = 0;
let textu = document.getElementById('fname');
if (textu) {
  let text = textu.innerText;
  $('#fname').html('');
  function typing() {
    if (i < text.length) {
      document.getElementById("fname").innerHTML += text.charAt(i);
      i++;
      setTimeout(typing, 80);
    }
  }
  typing();
}

$('.newt').on('click', function () {
  $('.xt').css('display', 'none');
  let uve = $(this).attr('id');
  $('.' + uve).css('display', 'block');
});

$('button#flwBtn').on('click', function () {
  let nam = $(this).html();
  let xd = $(this).attr('name');
  $.post('/follow', { data: xd });
  if (nam == 'UnFollow') {
    $(this).html('Follow');
  } else if (nam == 'Follow') {
    $(this).html('UnFollow');
  }
});

// FOR MOBILE NAVIGATION

/* Open */
function openNav() {
  console.log('bar click');
  document.getElementById("mobileSec").style.display = "block";
  // document.getElementById("mobileSec").style.transition = "2s";
  // document.getElementById("mobileSec").style.height = "100%";
}

/* Close */
function closeNav() {
  document.getElementById("mobileSec").style.display = "";
  // document.getElementById("mobileSec").style.height = "0%";
}