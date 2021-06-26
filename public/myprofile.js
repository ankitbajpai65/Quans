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

let edit = document.getElementById('editBtn');
edit.addEventListener('click', editInfo);

function editInfo() {
    alert("Change user info")
    let edit = document.getElementById("editBtn");
    if (edit.innerHTML == "Edit") {
        edit.innerHTML = "Save";

    }
    else edit.innerHTML = "Edit";
}