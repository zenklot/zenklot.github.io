
// GET JSON
var json;
function loadJSON(path, callback) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                // Here the callback gets implemented
                json = JSON.parse(xhr.responseText);
                callback();
            // }else if(xhr.status === 500){
                // json = "error";
            } else {
                // json = "error";
                // callback();
            }
        }
    };

    // try {
    xhr.open("GET", path, true);
    xhr.send();

    return xhr.onreadystatechange();    
    // } catch (err) {
        // console.error(err) // we will make sense of that later
    // }

    
}


// Fungsi Ubah Jenis Kelamin
function jk(kel){
  if(kel == "male"){
    return "Laki-Laki";
  }else{
    return "Perempuan";
  }


}





function getUsers(){
  loadJSON('http://spk-psi.herokuapp.com/api/v1/users',function dtaUser(){
    hasil = json['data'];
    var table = '';
                for (var i = 0; i < hasil.length; i++) {
                    var dta = hasil[i];
                    // console.log(dta['created_at'])
                    table +=
                        "<tr>" +
                        "<td>"+(i+1)+"</td>" +
                        "<td>" + dta['name'] + "</td>" +
                        "<td>" + jk(dta['gender']) + "</td>" +
                        "<td>" + dta['email'] + "</td>" +
                        "<td><button class='btn btn-sm bg-danger' onclick='deleteUser("+ dta['id'] +")'><i class='fas fa-trash fa-lg'></i></button> <button class='btn btn-sm bg-info' onclick='GetEditUser("+ dta['id'] +")'><i class='fas fa-edit fa-lg'></i></button> <button class='btn btn-sm bg-success' onclick='GetDetUser("+ dta['id'] +")'><i class='fas fa-eye fa-lg'></i></button></td>" +
                        "</tr>"
                }
                $('#test').html(table);
                $('#ini_table').DataTable( {
                  responsive: true,
                  "processing": true,
                "lengthMenu": [[10, 25, 50, 100, 150, -1], [10, 25, 50, 100, 150, "All"]]
            });
            
      });

}

function GetEditUser(id){
  // console.log(id);
    $('#mdEdit').modal('toggle');
    $('#edIdUser').val(id);
    loadJSON('http://spk-psi.herokuapp.com/api/v1/user/'+id,function dtaUser(){
    $('#edEmail').val(json['data'][0]['email']);
    $('#edName').val(json['data'][0]['name']);
    $('#edGender').val(json['data'][0]['gender']);
    });
}

function GetDetUser(id){
  // console.log(id);
    $('#mdDet').modal('toggle');
    loadJSON('http://spk-psi.herokuapp.com/api/v1/user/'+id,function dtaUser(){
    $('#deEmail').val(json['data'][0]['email']);
    $('#deName').val(json['data'][0]['name']);
    $('#deGender').val(json['data'][0]['gender']);
    $('#deCreated').val(json['data'][0]['created_at']);
    $('#deUpdate').val(json['data'][0]['updated_at']);
    $('#deToken').val(json['data'][0]['token_exp']);
    });
}


function deleteUser(id){
 Swal.fire({
      title: 'Delete this user?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Delete Now!'
      }).then((result) => {
        if (result.value) {
          // var id =  id;
          $.ajax({
    url: 'http://spk-psi.herokuapp.com/api/v1/user/'+id+'/delete',
    type: 'DELETE',
    headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Cache-Control": "no-cache"}
});
          
          kosongkanTabel('ini_table');
         

          Swal.fire(
          'Delete User!',
            'Delete User Has Been Success.',
          'success'
      )
          setTimeout(
            function() 
            {
              getUsers();
            }, 500);
           
          // EmptyAddUser();
         
  }
})

};

function kosongkanTabel(tbl){
        if ( $.fn.DataTable.isDataTable('#'+tbl) ) {
          $('#'+tbl).DataTable().destroy();
        }
        $('#'+tbl+' tbody').empty();
};

function EmptyAddUser(){
  $('#inEmail').val('');
  $('#inName').val('');
};


function cekAlpabet(inputtxt)
  {
   var letters = /^[A-Za-z]+$/;
   return letters.test(inputtxt);
  }
  

function cekEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}