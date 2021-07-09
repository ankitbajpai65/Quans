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
// document.getElementById('Question').addEventListener('click', function(){
//     console.log("hi");
//     $('.QuestionList').css('display','block');
// });
// document.getElementById('Answer').addEventListener('click', function(){
//     console.log("hi");
//     $('.AnswerList').css('display','block');
// });

$(document).ready(function(){
  $(".list-tab button").on("click", function(){
    $(".list-hide").css("display", "none");
      var    tab = $(this).attr("id");
    $("."+tab).css("display", "block");
  });
});




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

// EDIT PART HERE

document.getElementById('editSpan').onclick=()=>{
  console.log('edit click');
  // document.getElementById('editSec').style.display='block';
  // document.getElementById('myContent').style.display='none';

  if (document.getElementById('myContent')) {

    if (document.getElementById('myContent').style.display == 'none') {
        document.getElementById('myContent').style.display = 'block';
        document.getElementById('editSec').style.display = 'none';
    }
    else {
        document.getElementById('myContent').style.display = 'none';
        document.getElementById('editSec').style.display = 'block';
    }
}

  console.log('edit end');
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
      // console.log(data);
    });
    $("#FName").prop("readonly", true);
    $("#LName").prop("readonly", true);
    editInfo();
  }
  i++;
}

$(document).ready(function() {
       // console.log("h");
       $("#file").on("change", function(){
         $( "#profilephoto" ).submit();
         // console.log("HI");
       });

    //  $('#profilephoto').submit(function() {
    //    console.log("i");
    //     // $("#status").empty().text("File is uploading...");
    //     $(this).ajaxSubmit({
    //
    //         error: function(xhr) {
    //     status('Error: ' + xhr.status);
    //         },
    //
    //         success: function(response) {
    //     // $("#status").empty().text(response);
    //             console.log(response);
    //         }
    // });
    //     //Very important line, it disable the page refresh.
    // return false;
    // });
});

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
let name = document.getElementsByClassName('getname');
var q=0;
if(name){
  for( i=0; i<name.length; i++){
      var namexd = $(name[i]).attr('name');
      $.post('/getname', { data: namexd },function(data){
        handledata(data);
      });
  }
}
function handledata(data){
  $(name[q]).html(data.ok);
  q++;
};
let time = document.getElementsByClassName('gettime');
var t=0;
if(time){
  for(var i=0; i<time.length; i++){
      var namexd = $(time[i]).attr('name');
      $.post('/gettime', { data: namexd },function(data){
        handledatatime(data);
      });
  }
}
function handledatatime(data){
  $(time[t]).html(data.ok.totaltime.date+"/"+data.ok.totaltime.month+"/"+data.ok.totaltime.year);
  t++;
};

//handles the followers follow UnFollow all_button
$(".FollowersList").on("click",'.followed', function(){
    var current = $(this).html();
    var xt = $(this).attr('name');
    if(current == "UnFollow"){
      $(this).html("Follow");
      var data = xt;
      $.post('/follow', {data: data}, function(data){
        // console.log(data);
      });
      control(xt);
    }else if (current == "Follow") {
      $.post('/follow',{data: xt},function(result){
        puttingvalue(result.ok);
      });
      $(this).html("UnFollow");
      control2(xt);
    }
});

function control(xt){
  $('.following.ttfollow.'+xt).remove();
  $('hr.hr.'+xt).remove();
  let inou = $('#FollowingList').html();
  inou  = parseInt(inou[0]);
  inou--;
  $('#FollowingList').html(inou+" Following");
}
function control2(xt){
  // $('.befollowed.'+xt).remove();
  let inou = $('#FollowingList').html();
  inou  = parseInt(inou[0]);
  inou++;
  $('#FollowingList').html(inou+" Following");
}


function puttingvalue(data){
  var e  = $('<hr class="hr '+data._id+'"/><div class="following col d-flex align-items-center ttfollow '+data._id+'"><i class="dpIcon fas fa-user-circle fa-2x"></i><h6 class="fw-bold">'+data.detail.FullName+'</h6><button class="followBtn befollowed '+data._id+'" name="'+data._id+'">UnFollow</button></div><hr class="hr '+data._id+'"/>');
  $('.FollowingList').append(e);
}



$(".FollowingList").on("click",'.befollowed',function(){
    let current = $(this).html();
    let xt = $(this).attr('name');
      let data = xt;
      $.post('/follow', {data: data}, function(data){
        // console.log(data);
      });
     $('div.following.ttfollow.'+xt).remove();
     $('hr.hr.'+xt).remove();
      control(xt);
      $('.followed.'+xt).html('Follow');
});
 // console.log(data);
// }
