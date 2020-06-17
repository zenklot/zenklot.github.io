// GET JSON
var json;

function loadJSON(path, callback) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
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
function jk(kel) {
    if (kel == "male") {
        return "Laki-Laki";
    } else {
        return "Perempuan";
    }


}





function getUsers() {
    var men = 0;
    var women = 0;

    loadJSON('http://spk-psi.herokuapp.com/api/v1/users', function dtaUser() {
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
            "lengthMenu": [
                [10, 25, 50, 100, 150, -1],
                [10, 25, 50, 100, 150, "All"]
            ]
        });

    });

}


function getDTA() {

    loadJSON('http://spk-psi.herokuapp.com/api/v1/dta', function GetDta() {
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
            "lengthMenu": [
                [10, 25, 50, 100, 150, -1],
                [10, 25, 50, 100, 150, "All"]
            ]
        });

    });

}


function getCriteria() {

    var totalBobot=0;
    loadJSON('http://spk-psi.herokuapp.com/api/v1/criterias', function GetDta() {
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
        $("#totBobot").html(totalBobot+"%");
        $('#test').html(table);
        $('#ini_table').DataTable({
            responsive: true,
            "processing": true,
            "lengthMenu": [
                [10, 25, 50, 100, 150, -1],
                [10, 25, 50, 100, 150, "All"]
            ]
        });

    });

}


function getENUM() {

    var totalBobot=0;
    loadJSON('http://spk-psi.herokuapp.com/api/v1/enumerisation', function GetDta() {
        $("#totEnum").html(json['data'].length);
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
                "</tr>"
            
        }
        $('#test').html(table);
        $('#ini_table').DataTable({
            responsive: true,
            "processing": true,
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
    loadJSON('http://spk-psi.herokuapp.com/api/v1/user/' + id, function dtaUser() {
        $('#edEmail').val(json['data'][0]['email']);
        $('#edName').val(json['data'][0]['name']);
        $('#edGender').val(json['data'][0]['gender']);
    });
}

function GetEditDTA(id) {
    // console.log(id);
    $('#mdEditDTA').modal('toggle');
    $('#edIdDTA').val(id);
    loadJSON('http://spk-psi.herokuapp.com/api/v1/dta/' + id, function dtaUser() {
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
    loadJSON('http://spk-psi.herokuapp.com/api/v1/criteria/' + id, function dtaUser() {
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
    loadJSON('http://spk-psi.herokuapp.com/api/v1/enumerisation/' + id, function dtaUser() {
        $('#edNameEnum').val(json['data'][0]['name']);
        $('#edValue').val(json['data'][0]['value'])
    });
}

function GetDetUser(id) {
    // console.log(id);
    $('#mdDet').modal('toggle');
    loadJSON('http://spk-psi.herokuapp.com/api/v1/user/' + id, function dtaUser() {
        $('#deEmail').val(json['data'][0]['email']);
        $('#deName').val(json['data'][0]['name']);
        $('#deGender').val(json['data'][0]['gender']);
        $('#deCreated').val(json['data'][0]['created_at']);
        $('#deUpdate').val(json['data'][0]['updated_at']);
        $('#deToken').val(json['data'][0]['token_exp']);
    });
}

function GetDetDTA(id) {
    // console.log(id);
    $('#mdDetDTA').modal('toggle');
    loadJSON('http://spk-psi.herokuapp.com/api/v1/dta/' + id, function dtaUser() {
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
    loadJSON('http://spk-psi.herokuapp.com/api/v1/criteria/' + id, function dtaUser() {

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
    loadJSON('http://spk-psi.herokuapp.com/api/v1/enumerisation/' + id, function dtaUser() {

        $('#deNameEnum').val(json['data'][0]['name']);
        $('#deValue').val(json['data'][0]['value']);
        $('#deCreated').val(json['data'][0]['created_at']);
        $('#deUpdate').val(json['data'][0]['updated_at']);
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
                url: 'http://spk-psi.herokuapp.com/api/v1/user/' + id + '/delete',
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
                }, 500);

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
                url: 'http://spk-psi.herokuapp.com/api/v1/dta/' + id + '/delete',
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
                }, 500);

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
                url: 'http://spk-psi.herokuapp.com/api/v1/criteria/' + id + '/delete',
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
                }, 500);

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
                url: 'http://spk-psi.herokuapp.com/api/v1/enumerisation/' + id + '/delete',
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
                }, 500);

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

function EmptyAddDTA() {
    $('#inStatis').val('');
    $('#inNameDta').val('');
    $('#inAddress').val('');
    $('#inHeadmaster').val('');

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
    var letters = /^[A-Za-z]+$/;
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


function cekAddCRT() {
    var criteria = $('#inCriteria').val();
    var alias = $('#inAlias').val();
    var category = $('#inCategory').val();
    var weight = $('#inWeight').val();

    if (criteria == '' || alias == '' || category == '' || cekAngka(weight) === false) {
        return false;
    } else {
        return true;
    }
}


function cekAddENUM() {
    var name = $('#inNameEnum').val();
    var value = $('#inValue').val();

    if (name == '' || cekAngka(value) == false) {
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
            if (cekAlpabet(nameDTA)){
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

function cekEditCRT(){
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

function cekEditENUM(){
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
            if (cekAlpabet(nameDTA)){
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



function validWeight(){
    var total = $('#totBobot').html();
    if(total == "100%"){
        
    }else{
        toastr.error('Total Jumlah Bobot Tidak Sesuai!, Sesuaikan Total Bobot Ke 100%');
    }

    setTimeout(validWeight, 5000);
}
