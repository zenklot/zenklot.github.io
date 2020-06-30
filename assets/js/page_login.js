const $btnLogin = document.getElementById("btn-login");


$btnLogin.addEventListener('click',login,false);


function login(){
    let $email = document.getElementById("email-login").value;
    let $password = document.getElementById("password-login").value;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", 'https://spk-psi.herokuapp.com/api/v1/auth', true);

    //Send the proper header information along with the request
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function() { // Call a function when the state changes.
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            // Request finished. Do processing here.
            let data = JSON.parse(xhr.responseText);
            // console.log(data);
            window.localStorage.setItem('token',data.access_token);
            window.localStorage.setItem('admin-name',data.name);
            window.location.replace('/admin');
        }
    }
    xhr.send("email="+$email+"&password="+$password);
   
}

