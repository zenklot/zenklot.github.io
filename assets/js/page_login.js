const $btnLogin = document.getElementById("btn-login");


$btnLogin.addEventListener('click',login,false);


function login(){
    let $email = document.getElementById("email-login").value;
    let $password = document.getElementById("password-login").value;


    if(cekEmail($email) && $password !== ""){

    try{
    var xhr = new XMLHttpRequest();
    xhr.open("POST", 'https://spk-psi.herokuapp.com/api/v1/auth', true);

    //Send the proper header information along with the request
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function() { // Call a function when the state changes.
        if (this.readyState === XMLHttpRequest.DONE) {
            if(this.status === 200){
                // Request finished. Do processing here.
            let data = JSON.parse(xhr.responseText);
            // console.log(data);
            window.localStorage.setItem('token',data.access_token);
            window.localStorage.setItem('admin-name',data.name);
            window.location.replace('/admin');
            }else if(this.status === 401){
                alert('Tidak Ada User Dengan Email Tersebut!');
            }
            
        }
    }

    xhr.send("email="+$email+"&password="+$password);
    }catch(e){
        console.log('Takde');
    }

}else{
    alert('Email Atau Password Salah!');
}
   
}


function cekEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}