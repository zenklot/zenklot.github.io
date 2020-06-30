// GET JSON
var json;

function loadJSON(path, card, callback) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                // Here the callback gets implemented
                json = JSON.parse(xhr.responseText);
                callback();
                $("."+card).children(".overlay").remove();
                // }else if(xhr.status === 1000){
                // json = "error";
            } else {
                // json = "error";
                // callback();
            }
        }
    }

    // try {
    xhr.open("GET", path, true);
    xhr.setRequestHeader('Authorization', 'Bearer'+window.localStorage.getItem('token'));
    $("."+card).append("<div class='overlay'><i class='fas fa-2x fa-sync-alt fa-spin'></i></div>");
    xhr.send();
    console.log(window.localStorage.getItem('token'));

    return xhr.onreadystatechange();
    // } catch (err) {
    // console.error(err) // we will make sense of that later
    // }


}


// Fungsi Ubah Jenis Kelamin
function jk(kel) {
    if (kel == "male") {
        return "Laki-Laki";
    } else {
        return "Perempuan";
    }


}


function dtaName(id){
var response = $.ajax({ type: "GET",   
                        url: 'https://spk-psi.herokuapp.com/api/v1/dta/'+id,
                        async: false
                      }).responseText;
var hasil = JSON.parse(response);
return hasil['data'][0]['name'];
}




function getUsers() {

    var men = 0;
    var women = 0;
    try{
        kosongkanTabel("ini_table");
    }catch{

    }

    loadJSON('https://spk-psi.herokuapp.com/api/v1/users',"tblUser",function dtaUser() {
        hasil = json['data'];
        $("#totUsr").html(hasil.length);
        var table = '';
        for (var i = 0; i < hasil.length; i++) {
            var dta = hasil[i];
            // console.log(dta['created_at'])
            table +=
                "<tr>" +
                "<td>" + (i + 1) + "</td>" +
                "<td>" + dta['name'] + "</td>" +
                "<td>" + jk(dta['gender']) + "</td>" +
                "<td>" + dta['email'] + "</td>" +
                "<td><button class='btn btn-sm bg-danger' onclick='deleteUser(" + dta['id'] + ")'><i class='fas fa-trash fa-lg'></i></button> <button class='btn btn-sm bg-info' onclick='GetEditUser(" + dta['id'] + ")'><i class='fas fa-edit fa-lg'></i></button> <button class='btn btn-sm bg-success' onclick='GetDetUser(" + dta['id'] + ")'><i class='fas fa-eye fa-lg'></i></button></td>" +
                "</tr>";
            if (json['data'][i]['gender'] == 'male') {
                men = men + 1;
            } else if (json['data'][i]['gender'] == 'female') {
                women = women + 1;
            }
        }
        $("#rinUsr").html("Laki-Laki : " + men + "<br>" + "Perempuan : " + women);

        $('#test').html(table);
        $('#ini_table').DataTable({
            responsive: true,
            "processing": true,
            "stateSave": true,
            "lengthMenu": [
                [10, 25, 50, 100, 150, -1],
                [10, 25, 50, 100, 150, "All"]
            ]
        });

    });

}


function getOperator() {

    var men = 0;
    var women = 0;
    try{
        kosongkanTabel("ini_table");
    }catch{

    }

    loadJSON('https://spk-psi.herokuapp.com/api/v1/operators',"tblUser",function dtaUser() {
        hasil = json['data'];
        $("#totUsr").html(hasil.length);
        var table = '';
        for (var i = 0; i < hasil.length; i++) {
            var dta = hasil[i];
            // console.log(dta['created_at'])
            table +=
                "<tr>" +
                "<td>" + (i + 1) + "</td>" +
                "<td>" + dta['name'] + "</td>" +
                "<td>" + dtaName(dta['dta_id']) + "</td>" +
                "<td>" + jk(dta['gender']) + "</td>" +
                "<td>" + dta['email'] + "</td>" +
                "<td><button class='btn btn-sm bg-danger' onclick='deleteOperator(" + dta['id'] + ")'><i class='fas fa-trash fa-lg'></i></button> <button class='btn btn-sm bg-info' onclick='GetEditOperator(" + dta['id'] + ","+dta['dta_id'] + ")'><i class='fas fa-edit fa-lg'></i></button> <button class='btn btn-sm bg-success' onclick='GetDetOperator(" + dta['id'] + ")'><i class='fas fa-eye fa-lg'></i></button></td>" +
                "</tr>";
            if (json['data'][i]['gender'] == 'male') {
                men = men + 1;
            } else if (json['data'][i]['gender'] == 'female') {
                women = women + 1;
            }
        }
        $("#rinUsr").html("Laki-Laki : " + men + "<br>" + "Perempuan : " + women);

        $('#test').html(table);
        $('#ini_table').DataTable({
            responsive: true,
            "processing": true,
            "stateSave": true,
            "lengthMenu": [
                [10, 25, 50, 100, 150, -1],
                [10, 25, 50, 100, 150, "All"]
            ]
        });

    });

}

function getDTA() {

    loadJSON('https://spk-psi.herokuapp.com/api/v1/dta', "tblDta", function GetDta() {
        $("#totDTA").html(json['data'].length);
        hasil = json['data'];
        var table = '';
        for (var i = 0; i < hasil.length; i++) {
            var dta = hasil[i];
            // console.log(dta['created_at'])
            table +=
                "<tr>" +
                "<td>" + (i + 1) + "</td>" +
                "<td>" + dta['no_statistik'] + "</td>" +
                "<td>" + dta['name'] + "</td>" +
                "<td>" + dta['address'] + "</td>" +
                "<td>" + dta['headmaster'] + "</td>" +
                "<td><button class='btn btn-sm bg-danger' onclick='deleteDTA(" + dta['id'] + ")'><i class='fas fa-trash fa-lg'></i></button> <button class='btn btn-sm bg-info' onclick='GetEditDTA(" + dta['id'] + ")'><i class='fas fa-edit fa-lg'></i></button> <button class='btn btn-sm bg-success' onclick='GetDetDTA(" + dta['id'] + ")'><i class='fas fa-eye fa-lg'></i></button></td>" +
                "</tr>"
        }
        $('#test').html(table);
        $('#ini_table').DataTable({
            responsive: true,
            "processing": true,
            "stateSave": true,
            "lengthMenu": [
                [10, 25, 50, 100, 150, -1],
                [10, 25, 50, 100, 150, "All"]
            ]
        });

    });

}


function getCriteria() {

    var totalBobot = 0;
    loadJSON('https://spk-psi.herokuapp.com/api/v1/criterias', "tblCrt", function GetDta() {
        $("#totCriteria").html(json['data'].length);
        hasil = json['data'];
        var table = '';
        for (var i = 0; i < hasil.length; i++) {
            var dta = hasil[i];
            // console.log(dta['created_at'])
            table +=
                "<tr>" +
                "<td>" + (i + 1) + "</td>" +
                "<td>" + dta['name'] + "</td>" +
                "<td>" + dta['alias'] + "</td>" +
                "<td>" + dta['category'] + "</td>" +
                "<td>" + dta['weight'] + "</td>" +
                "<td><button class='btn btn-sm bg-danger' onclick='deleteCRT(" + dta['id'] + ")'><i class='fas fa-trash fa-lg'></i></button> <button class='btn btn-sm bg-info' onclick='GetEditCRT(" + dta['id'] + ")'><i class='fas fa-edit fa-lg'></i></button> <button class='btn btn-sm bg-success' onclick='GetDetCRT(" + dta['id'] + ")'><i class='fas fa-eye fa-lg'></i></button></td>" +
                "</tr>";
            totalBobot = totalBobot + dta['weight'];
        }
        $("#totBobot").html(totalBobot + "%");
        $('#test').html(table);
        $('#ini_table').DataTable({
            responsive: true,
            "processing": true,
            "stateSave": true,
            "lengthMenu": [
                [10, 25, 50, 100, 150, -1],
                [10, 25, 50, 100, 150, "All"]
            ]
        });

    });

}

function getAlternatif() {

    loadJSON('https://spk-psi.herokuapp.com/api/v1/alternatif', "tblSan",function GetDta() {
        $("#totSan").html(json['data'].length);
        hasil = json['data'];
        var table = '';
        for (var i = 0; i < hasil.length; i++) {
            var dta = hasil[i];
            // console.log(dta['created_at'])
            table +=
                "<tr>" +
                "<td>" + (i + 1) + "</td>" +
                "<td>" + dta['no_induk_dta'] + "</td>" +
                "<td>" + dta['nik'] + "</td>" +
                "<td>" + dta['name'] + "</td>" +
                "<td>" + jk(dta['gender']) + "</td>" +
                "<td>" + dta['nama_dta'] + "</td>" +
                "<td><button class='btn btn-sm bg-danger' onclick='deleteSan(" + dta['id'] + ")'><i class='fas fa-trash fa-lg'></i></button> <button class='btn btn-sm bg-info' onclick='GetEditSan(" + dta['id'] + ","+dta['dta_id']+")'><i class='fas fa-edit fa-lg'></i></button> <button class='btn btn-sm bg-success' onclick='GetDetSan(" + dta['id'] + ")'><i class='fas fa-eye fa-lg'></i></button></td>" +
                "</tr>";
        }
        $('#test').html(table);
        $('#ini_table').DataTable({
            responsive: true,
            "processing": true,
            "stateSave": true,
            "lengthMenu": [
                [10, 25, 50, 100, 150, -1],
                [10, 25, 50, 100, 150, "All"]
            ]
        });

    });

}


function getENUM() {


    var totalBobot = 0;
    loadJSON('https://spk-psi.herokuapp.com/api/v1/enumerisation', "tblEnum", function GetDta() {
        $("#totEnum").html(json['data'].length);
        var enumer = '';
        hasil = json['data'];
        var table = '';
        for (var i = 0; i < hasil.length; i++) {
            var dta = hasil[i];
            // console.log(dta['created_at'])
            table +=
                "<tr>" +
                "<td>" + (i + 1) + "</td>" +
                "<td>" + dta['name'] + "</td>" +
                "<td>" + dta['value'] + "</td>" +
                "<td><button class='btn btn-sm bg-danger' onclick='deleteENUM(" + dta['id'] + ")'><i class='fas fa-trash fa-lg'></i></button> <button class='btn btn-sm bg-info' onclick='GetEditENUM(" + dta['id'] + ")'><i class='fas fa-edit fa-lg'></i></button> <button class='btn btn-sm bg-success' onclick='GetDetENUM(" + dta['id'] + ")'><i class='fas fa-eye fa-lg'></i></button></td>" +
                "</tr>";
             enumer += json['data'][i]['name'];

        }
        $('#arrEnum').val(enumer);
        $('#test').html(table);
        $('#ini_table').DataTable({
            responsive: true,
            "processing": true,
            "stateSave": true,
            "lengthMenu": [
                [10, 25, 50, 100, 150, -1],
                [10, 25, 50, 100, 150, "All"]
            ]
        });

    });

}


function GetEditUser(id) {
    // console.log(id);
    $('#mdEdit').modal('toggle');
    $('#edIdUser').val(id);
    loadJSON('https://spk-psi.herokuapp.com/api/v1/user/' + id, "mdEdit", function dtaUser() {
        $('#edEmail').val(json['data'][0]['email']);
        $('#edName').val(json['data'][0]['name']);
        $('#edGender').val(json['data'][0]['gender']);
    });
}


function GetEditOperator(id,dtaId) {
    // console.log(id);
    $('#mdEdit').modal('toggle');
    $('#edIdUser').val(id);
    
 loadJSON('https://spk-psi.herokuapp.com/api/v1/dta', "mdEdit", function dtaUser() {
       hasil = json['data'];
                var opsi = '';
                opsi = "<option value='' data-statistik='' data-namedta=''>-</option>";
                for (var i = 0; i < hasil.length; i++) {
                    var dta = hasil[i];
                    // console.log(dta['created_at'])
                    if(dta['id'] == dtaId){
                    opsi +=
                        "<option value='" + dta['id'] + "' data-statistik='" + dta['no_statistik'] + "' data-namedta='" + dta['name'] + "' selected>" + dta['name'] + "</option>";    
                    }else{
                        opsi +=
                        "<option value='" + dta['id'] + "' data-statistik='" + dta['no_statistik'] + "' data-namedta='" + dta['name'] + "'>" + dta['name'] + "</option>";
                    }
                    
                }
                $('#edDTAid').html(opsi);
    });

    loadJSON('https://spk-psi.herokuapp.com/api/v1/operator/' + id, "mdEdit", function dtaUser() {
        $('#edEmail').val(json['data'][0]['email']);
        $('#edName').val(json['data'][0]['name']);
        $('#edGender').val(json['data'][0]['gender']);
        
    });
}

function GetEditDTA(id) {
    // console.log(id);
    $('#mdEditDTA').modal('toggle');
    $('#edIdDTA').val(id);
    loadJSON('https://spk-psi.herokuapp.com/api/v1/dta/' + id, "mdEdit", function dtaUser() {
        $('#edStatis').val(json['data'][0]['no_statistik']);
        $('#edNameDta').val(json['data'][0]['name']);
        $('#edAddress').val(json['data'][0]['address']);
        $('#edHeadmaster').val(json['data'][0]['headmaster']);
    });
}

function GetEditCRT(id) {
    // console.log(id);
    $('#mdEditCRT').modal('toggle');
    $('#edIdCRT').val(id);
    loadJSON('https://spk-psi.herokuapp.com/api/v1/criteria/' + id, "mdEdit", function dtaCrt() {
        $('#edCriteria').val(json['data'][0]['name']);
        $('#edAlias').val(json['data'][0]['alias']);
        $('#edCategory').val(json['data'][0]['category']);
        $('#edWeight').val(json['data'][0]['weight']);;
    });
}

function GetEditENUM(id) {
    // console.log(id);
    $('#mdEditENUM').modal('toggle');
    $('#edIdENUM').val(id);
    loadJSON('https://spk-psi.herokuapp.com/api/v1/enumerisation/' + id, "mdEdit", function dtaUser() {
        $('#edNameEnum').val(json['data'][0]['name']);
        $('#edValue').val(json['data'][0]['value'])
    });
}

function GetEditSan(id,dtaId) {
    // console.log(id);
    $('#mdEditSan').modal('toggle');
    $('#edIdSan').val(id);
    loadJSON('https://spk-psi.herokuapp.com/api/v1/dta/' + dtaId, "mdEdit", function dtaUser() {
        $('#edParamDtaIn').val(json['data'][0]['no_statistik']);
        $('#edParamDta').html(json['data'][0]['no_statistik']);

        
    });

    loadJSON('https://spk-psi.herokuapp.com/api/v1/dta', "mdEdit", function dtaUser() {
       hasil = json['data'];
                var opsi = '';
                opsi = "<option value='' data-statistik='' data-namedta=''>-</option>";
                for (var i = 0; i < hasil.length; i++) {
                    var dta = hasil[i];
                    // console.log(dta['created_at'])
                    if(dta['id'] == dtaId){
                    opsi +=
                        "<option value='" + dta['id'] + "' data-statistik='" + dta['no_statistik'] + "' data-namedta='" + dta['name'] + "' selected>" + dta['name'] + "</option>";    
                    }else{
                        opsi +=
                        "<option value='" + dta['id'] + "' data-statistik='" + dta['no_statistik'] + "' data-namedta='" + dta['name'] + "'>" + dta['name'] + "</option>";
                    }
                    
                }
                $('#edDTAid').html(opsi);
    });

    loadJSON('https://spk-psi.herokuapp.com/api/v1/alternatif/' + id, "mdEdit", function dtaUser() {
        var noInduk = json['data'][0]['no_induk_dta'];
        // console.log(json['data'][0]['nama_dta']);
        // $('#edDTAid').val(json['data'][0]['nama_dta']);
        $('#edNik').val(json['data'][0]['nik']);
        $('#edNameSan').val(json['data'][0]['name']);
        $('#edGenderSan').val(json['data'][0]['gender']);
        noInduk = noInduk.replace($('#edParamDtaIn').val(), "");
        $('#edDtaParam').val(noInduk);
    });


}

function GetDetUser(id) {
    // console.log(id);
    $('#mdDet').modal('toggle');
    loadJSON('https://spk-psi.herokuapp.com/api/v1/user/' + id, "mdDet", function dtaUser() {
        $('#deEmail').val(json['data'][0]['email']);
        $('#deName').val(json['data'][0]['name']);
        $('#deGender').val(json['data'][0]['gender']);
        $('#deCreated').val(json['data'][0]['created_at']);
        $('#deUpdate').val(json['data'][0]['updated_at']);
        $('#deToken').val(json['data'][0]['token_exp']);
    });
}


function GetDetOperator(id) {
    // console.log(id);
    $('#mdDet').modal('toggle');
    loadJSON('https://spk-psi.herokuapp.com/api/v1/operator/' + id, "mdDet", function dtaOperator() {
        $('#deEmail').val(json['data'][0]['email']);
        $('#deName').val(json['data'][0]['name']);
        $('#deGender').val(json['data'][0]['gender']);
        $('#deCreated').val(json['data'][0]['created_at']);
        $('#deUpdate').val(json['data'][0]['updated_at']);
        $('#deToken').val(json['data'][0]['token_exp']);
        sid = json['data'][0]['dta_id'];
        console.log(sid);
        loadJSON('https://spk-psi.herokuapp.com/api/v1/dta/' + sid, "mdDet", function dtaGetDta() {
            $('#deDTAid').val(json['data'][0]['name']);

        });
        
        
    });
}

function GetDetDTA(id) {
    // console.log(id);
    $('#mdDetDTA').modal('toggle');
    loadJSON('https://spk-psi.herokuapp.com/api/v1/dta/' + id, "mdDet", function dtaUser() {
        $('#deStatis').val(json['data'][0]['no_statistik']);
        $('#deNameDta').val(json['data'][0]['name']);
        $('#deAddress').val(json['data'][0]['address']);
        $('#deCreated').val(json['data'][0]['created_at']);
        $('#deUpdate').val(json['data'][0]['updated_at']);
        $('#deHeadmaster').val(json['data'][0]['headmaster']);
    });
}

function GetDetCRT(id) {
    // console.log(id);
    $('#mdDetCRT').modal('toggle');
    loadJSON('https://spk-psi.herokuapp.com/api/v1/criteria/' + id, "mdDet", function dtaUser() {

        $('#deCriteria').val(json['data'][0]['name']);
        $('#deAlias').val(json['data'][0]['alias']);
        $('#deCategory').val(json['data'][0]['category']);
        $('#deWeight').val(json['data'][0]['weight']);
        $('#deCreated').val(json['data'][0]['created_at']);
        $('#deUpdate').val(json['data'][0]['updated_at']);
    });
}

function GetDetENUM(id) {
    // console.log(id);
    $('#mdDetENUM').modal('toggle');
    loadJSON('https://spk-psi.herokuapp.com/api/v1/enumerisation/' + id, "mdDet", function dtaUser() {

        $('#deNameEnum').val(json['data'][0]['name']);
        $('#deValue').val(json['data'][0]['value']);
        $('#deCreated').val(json['data'][0]['created_at']);
        $('#deUpdate').val(json['data'][0]['updated_at']);
    });
}


function GetDetSan(id) {
    // console.log(id);
    $('#mdDetSan').modal('toggle');
    loadJSON('https://spk-psi.herokuapp.com/api/v1/alternatif/' + id, "mdDet", function dtaUser() {

        $('#deDTAid').val(json['data'][0]['nama_dta']);
        $('#deDtaParam').val(json['data'][0]['no_induk_dta']);
        $('#deNik').val(json['data'][0]['nik']);
        $('#deNameSan').val(json['data'][0]['name']);
        $('#deGenderSan').val(json['data'][0]['gender']);
        $('#deCreatedSan').val(json['data'][0]['created_at']);
        $('#deUpdateSan').val(json['data'][0]['updated_at']);
        $('#deHeadmasterSan').val(json['data'][0]['headmaster']);

    });
}

function deleteUser(id) {
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
                url: 'https://spk-psi.herokuapp.com/api/v1/user/' + id + '/delete',
                type: 'DELETE',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Cache-Control": "no-cache"
                }
            });

            kosongkanTabel('ini_table');


            Swal.fire(
                'Delete User!',
                'Delete User Has Been Success.',
                'success'
            )
            setTimeout(
                function() {
                    getUsers();
                }, 1000);

            // EmptyAddUser();

        }
    })

};

function deleteOperator(id) {
    Swal.fire({
        title: 'Delete this Operator?',
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
                url: 'https://spk-psi.herokuapp.com/api/v1/operator/' + id + '/delete',
                type: 'DELETE',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Cache-Control": "no-cache"
                }
            });

            kosongkanTabel('ini_table');


            Swal.fire(
                'Delete Operator!',
                'Delete Operator Has Been Success.',
                'success'
            )
            setTimeout(
                function() {
                    getOperator();
                }, 1000);

            // EmptyAddUser();

        }
    })

};

function deleteDTA(id) {
    Swal.fire({
        title: 'Delete this DTA?',
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
                url: 'https://spk-psi.herokuapp.com/api/v1/dta/' + id + '/delete',
                type: 'DELETE',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Cache-Control": "no-cache"
                }
            });

            kosongkanTabel('ini_table');


            Swal.fire(
                'Delete DTA!',
                'Delete DTA Has Been Success.',
                'success'
            )
            setTimeout(
                function() {
                    getDTA();
                }, 1000);

            // EmptyAddUser();

        }
    })

};

function deleteCRT(id) {
    Swal.fire({
        title: 'Delete this Criteria?',
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
                url: 'https://spk-psi.herokuapp.com/api/v1/criteria/' + id + '/delete',
                type: 'DELETE',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Cache-Control": "no-cache"
                }
            });

            kosongkanTabel('ini_table');


            Swal.fire(
                'Delete DTA!',
                'Delete DTA Has Been Success.',
                'success'
            )
            setTimeout(
                function() {
                    getCriteria();
                }, 1000);

            // EmptyAddUser();

        }
    })

};

function deleteENUM(id) {
    Swal.fire({
        title: 'Delete this Enumerisation?',
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
                url: 'https://spk-psi.herokuapp.com/api/v1/enumerisation/' + id + '/delete',
                type: 'DELETE',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Cache-Control": "no-cache"
                }
            });

            kosongkanTabel('ini_table');


            Swal.fire(
                'Delete Enumerisation!',
                'Delete Enumerisation Has Been Success.',
                'success'
            )
            setTimeout(
                function() {
                    getENUM();
                }, 1000);

            // EmptyAddUser();

        }
    })

};



function deleteSan(id) {
    Swal.fire({
        title: 'Delete this Alternatif ?',
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
                url: 'https://spk-psi.herokuapp.com/api/v1/alternatif/' + id + '/delete',
                type: 'DELETE',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Cache-Control": "no-cache"
                }
            });

            kosongkanTabel('ini_table');


            Swal.fire(
                'Delete Alternatif!',
                'Delete Alternatif Has Been Success.',
                'success'
            )
            setTimeout(
                function() {
                    getAlternatif();
                }, 1000);

            // EmptyAddUser();

        }
    })

};

function kosongkanTabel(tbl) {
    if ($.fn.DataTable.isDataTable('#' + tbl)) {
        $('#' + tbl).DataTable().destroy();
    }
    $('#' + tbl + ' tbody').empty();
};

function EmptyAddUser() {
    $('#inEmail').val('');
    $('#inName').val('');
};
function EmptyAddOperator() {
    $('#inEmail').val('');
    $('#inName').val('');
    $('#inDTAid').val('-');
};

function EmptyAddDTA() {
    $('#inStatis').val('');
    $('#inNameDta').val('');
    $('#inAddress').val('');
    $('#inHeadmaster').val('');

};

function EmptyAddSan() {
    $('#inDtaName').val('');
    $('#inParamDta').val('');
    $('#inDTAid').val('-');
    $('#paramDta').val('');
    $('#inDtaParam').val('');
    $('#inNik').val('');
    $('#inNameSan').val('');
    $('#inGenderSan').val('');

};

function EmptyAddCriteria() {

    $('#inCriteria').val('');
    $('#inAlias').val('');
    $('#inCategory').val('');
    $('#inWeight').val('');
};

function EmptyAddEnum() {
    $('#inNameEnum').val('');
    $('#inValue').val('');
};

function cekAlpabet(inputtxt) {
    var letters = /^[A-Za-z][A-Za-z\s]*$/;
    return letters.test(inputtxt);
}


function cekEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function cekAngka(angka) {
    var re = /^[0-9]+$/;
    return re.test(angka);
}

function cekNilai(nilai){
    var re = /^[0-9\.]+$/;
    return re.test(nilai);
}

function cekAddUser() {
    var nama = $('#inName').val();
    var email = $('#inEmail').val();
    if (cekAlpabet(nama)) {
        if (cekEmail(email)) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

function cekAddOperator() {
    var dtaId = $('#inDTAid').val();
    var nama = $('#inName').val();
    var email = $('#inEmail').val();
    console.log(nama+" "+email);
    if (cekAlpabet(nama) == true && cekEmail(email) == true && dtaId != '') {
        return true;
    } else {
        return false;
    }
}


function cekAddCRT() {
    var criteria = $('#inCriteria').val();
    var alias = $('#inAlias').val();
    var category = $('#inCategory').val();
    var weight = $('#inWeight').val();
    weight = weight.trim();
    var total = $('#totBobot').html();
    total = total.replace('%','');

    if (criteria == '' || alias == '' || category == '' || cekAngka(weight) === false || (parseInt(weight) + parseInt(total)) > 100 || weight == 0 || parseInt(weight) <= 0) {
        return false;
    } else {
        return true;
    }
}


function cekAddENUM() {
    var name = $('#inNameEnum').val();
    var value = $('#inValue').val();
    name = name.trim().toUpperCase();
    var arr = $('#arrEnum').val();
    if (name == '' || cekAngka(value) == false || arr.indexOf(name) != -1) {
        return false;
    } else {
        return true;
    }
}


function cekAddSan() {
    var dtaId = $('#inDTAid').val();
    var nik = $('#inNik').val();
    var name = $('#inNameSan').val();
    var induk = $('#inDtaParam').val();
    // console.log(dtaId+" "+nik+" "+name+" "+induk)
    if (dtaId == '' || cekAngka(nik) == false || cekAlpabet(name) == false || cekAngka(induk) == false) {
        return false;
    } else {
        return true;
    }
}

function cekAddDTA() {
    var nostatistik = $('#inStatis').val();
    var nameDTA = $('#inNameDta').val()
    var AddressDTA = $('#inAddress').val()
    var HeadmasterDTA = $('#inHeadmaster').val();

    if (cekAngka(nostatistik)) {
        if (nostatistik.length > 10) {
            if (cekAlpabet(nameDTA)) {
                // console.log('Benar');
                // if (cekAlpabet(HeadmasterDTA)) {
                // console.log('lagi');
                // if (AddressDTA.length > 10) {
                // return true;
                // }else{
                // return false;
                // }
                // }else{
                return true;
                // }

            } else {
                return false;
            }
        } else {
            return false;
        }

    } else {
        return false;
    }
}


function cekEditUser() {
    var nama = $('#edName').val();
    var email = $('#edEmail').val();
    if (cekAlpabet(nama)) {
        if (cekEmail(email)) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

function cekEditOperator() {
    var nama = $('#edName').val();
    var email = $('#edEmail').val();
    var dtaId = $('#edDTAid').val();
    if (cekAlpabet(nama) == true && cekEmail(email) == true && dtaId != '') {
            return true;
    } else {
        return false;
    }
}

function cekEditCRT() {
    var criteria = $('#edCriteria').val();
    var alias = $('#edAlias').val();
    var category = $('#edCategory').val();
    var weight = $('#edWeight').val();

    if (criteria == '' || alias == '' || category == '' || cekAngka(weight) === false) {
        return false;
    } else {
        return true;
    }
}

function cekEditENUM() {
    var name = $('#edNameEnum').val();
    var value = $('#edValue').val();


    if (name == '' || value == '') {
        return false;
    } else {
        return true;
    }
}

function cekEditDTA() {
    var nostatistik = $('#edStatis').val();
    var nameDTA = $('#edNameDta').val()
    var AddressDTA = $('#edAddress').val()
    var HeadmasterDTA = $('#edHeadmaster').val();

    if (cekAngka(nostatistik)) {
        if (nostatistik.length > 10) {
            if (cekAlpabet(nameDTA)) {
                // console.log('Benar');
                // if (cekAlpabet(HeadmasterDTA)) {
                // console.log('lagi');
                // if (AddressDTA.length > 10) {
                // return true;
                // }else{
                // return false;
                // }
                // }else{
                return true;
                // }

            } else {
                return false;
            }
        } else {
            return false;
        }

    } else {
        return false;
    }
}


function cekEditSan() {
    var dtaId = $('#edDTAid').val();
    var nik = $('#edNik').val();
    var name = $('#edNameSan').val();
    var induk = $('#edDtaParam').val();
    // console.log(dtaId+" "+nik+" "+name+" "+induk)
    if (dtaId == '' || cekAngka(nik) == false || cekAlpabet(name) == false || cekAngka(induk) == false) {
        return false;
    } else {
        return true;
    }
}



function validWeight() {
    var total = $('#totBobot').html();
    if (total == "100%") {

    } else {
        toastr.error('Total Jumlah Bobot Tidak Sesuai!, Sesuaikan Total Bobot Ke 100%');
    }

    setTimeout(validWeight, 5000);
}



function printHasil() {
var columns = [{title:"Nama DTA", dataKey: "dta_name"}, {title:"Nama Santri", dataKey: "alternatif_name"}, {title:"Rank (0.5)", dataKey: "rank"}, {title:"Rank (0.6)", dataKey: "rankv6"}, {title:"Rank (0.7)", dataKey: "rankv7"}];
v5 = $("#v5").val();

var rows = JSON.parse(v5);
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;

var doc = new jsPDF();
doc.setProperties({
    title: 'DSS VIKOR',
    subject: 'Santri Berprestasi di Madrasah DTA se Kelurahan Karanganyar',
    author: 'Zam zam Saeful Bahtiar & Raisa Supriatna',
    keywords: 'DSS, Vikor, DTA, Santri Berprestasi',
    creator: 'Noname'
});
doc.autoTable(columns, rows, {
    margin: {top: 25},
    addPageContent: function(data) {
        doc.setFont("times");
        doc.setFontStyle("bold");
        doc.text("LAPORAN HASIL PERHITUNGAN DSS VIKOR", 15, 10);
        doc.setFontStyle("normal");
        doc.text("Santri Berprestasi di Madrasah DTA se Kelurahan Karanganyar", 15, 15);
        doc.setFontSize(11);
        doc.text("Print : " + dateTime, 195, 20, "right");
        
    }
});
doc.save('DSS Vikor '+date+'.pdf');

}

function tampilLangkah(){
     $('.lang').removeClass('d-none');
     $('#tmplLang').hide();
}
function logout(){
    window.localStorage.removeItem('token');
    window.location.replace('../');
}
document.getElementById("logout").addEventListener('click',logout,false);

if (localStorage.getItem("token") === null) {
    window.location.replace('../');
}

document.getElementById("admin-name").innerText = window.localStorage.getItem('admin-name');