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

let pin = document.getElementById('pinChange');
pin.onclick = () => {
    let table = document.querySelector('.table-2');
    console.log('btn clicked');
    table.classList.toggle("clickedPinChangeBtn");

<<<<<<< HEAD
    if (table.classList.contains("clickedPinChangeBtn")){
        pin.style.backgroundColor = 'black';
        pin.innerHTML='Add more';
        document.getElementById('moreInfo').style.display='none';
        // document.querySelector('.content').style.marginTop='1rem';
    }
    else{
        pin.innerHTML='Change Password';
        pin.style.backgroundColor = '';
        document.getElementById('moreInfo').style.display='';

        // document.querySelector('.content').style.marginTop='';
    }
}
<<<<<<< HEAD
// let edit = document.getElementById('editBtn');
// edit.addEventListener('click', editInfo);

function editInfo() {
    let edit = document.getElementById("editBtn");
    if (edit.innerHTML == "Edit") {
      alert("Now, you can the Change the user info")
        edit.innerHTML = "Save";
    }
    else edit.innerHTML = "Edit";
}
var i=0;
function saveedit(){
  if(i%2==0){
    $("#FName").prop("readonly", false);
    $("#LName").prop("readonly", false);
    editInfo();
  }else{
    let data = {
      FName : $('#FName').val(),
      LName: $('#LName').val(),
    }
    // console.log(data);
    data = JSON.stringify(data);
    $.post('/addmoredetails', { data: data }, function(data){
      console.log(data);
    });
    $("#FName").prop("readonly", true);
    $("#LName").prop("readonly", true);
    editInfo();
  }
  i++;
}

function savedetail(){
  // console.log("yes");
  let data = {
    Description : $("#Description").val(),
    Education : $('#edu').val(),
    State : $('#state').val(),
    City: $('#city').val()
  }
  data = JSON.stringify(data);
  $.post('/addmoredetails', { data: data });
  // console.log(data);
}
 console.log(data);
}
