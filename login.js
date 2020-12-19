$(document).ready(function(){
    var locData = localStorage.getItem("loginData");
    if(locData !== null && locData.length > 0){
        var loginD = JSON.parse(locData);
        if(loginD.username === loginD.password){
            location.replace("./OrderList/orders_list.html");
        }
    }
    else{
        $('#login-form').css('display', 'flex');
        $('#overlay').hide();
    }

    $('#login-form').submit(function(e){
        e.preventDefault();
        var userData = {
            username: this.username.value,
            password: this.password.value
        }
        if(userData.username !== userData.password) {
            alert('Please Enter Valid Credentials' + " " + userData.username + " " + userData.password)
        } else {
            $.post('https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/login', {username: userData.username, password: userData.password})
            .done(function() {
                localStorage.setItem("loginData", JSON.stringify(userData))
                // location.replace("./OrderList/orders_list.html");
                // alert( "Login Success" );
            })
            .fail(function(e) {
                location.replace("./OrderList/orders_list.html");
                localStorage.setItem("loginData", JSON.stringify(userData))
                alert( "Login Success" );
                // alert("Login Failed");
              })
        }
    })

   
})