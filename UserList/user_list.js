var userList =[];
var userFilterList= ["Expired","Low Stock"];

$(document).ready(function(){
    var locData = localStorage.getItem("loginData");
    if(locData !== null && locData.length > 0){
        var loginD = JSON.parse(locData);
        if(loginD.username === loginD.password){
            function createRow(rowData,index){
                console.log(rowData,index)
                tRow = $('<tr class="each_prod_row_data"></tr>').appendTo('#user_table_body')
                $('<td>'+rowData.id+'</td>').appendTo(tRow);
                $('<td><img src="'+rowData.profilePic+'" /></td>').appendTo(tRow)
                $('<td>'+rowData.fullName+'</td>').appendTo(tRow);
                $('<td>'+rowData.dob+'</td>').appendTo(tRow);
                $('<td>'+rowData.gender+'</td>').appendTo(tRow);
                $('<td>'+rowData.currentCity+', '+rowData.currentCountry+'</td>').appendTo(tRow);
            }



            function rowCreator(){
                for(var i=0; i<userList.length;i++){
                    createRow(userList[i],i)
                }
            }


            $.get('https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users')
            .done(function(data,status) {
                console.log(data,status)
                if(status === 'success'){
                    userList = data;
                    rowCreator();
                    $('#overlay').hide();
                    $('#logout').show();
                }
                else{
                    alert("error occured while fetching user list");
                }
            })
            .fail(function(e) {
                alert("Failed to fetch user list");
            })

            $('#search_form').submit(function(e){
                e.preventDefault();
                var inputVal = $('#search_input')[0].value.toUpperCase();
                if(inputVal.length >= 2){
                    var tRow = $('tr');
                    for (i = 1; i <tRow.length; i++) {
                        td = tRow[i].getElementsByTagName("td")[2];
                        if(td){
                            var txtVal = td.innerText;
                            if (txtVal.toUpperCase().indexOf(inputVal) > -1) {
                                tRow[i].style.display = "";
                            } else {
                                tRow[i].style.display = "none";
                            }
                        }
                    }
                }  
                else{
                    alert("Please enter at least 2 characters");
                }
            })

            $('#search_form').on('reset',function(){
                var tRow = $('tr');
                for (i = 1; i <tRow.length; i++) {
                    tRow[i].style.display = "none";
                }
                rowCreator();
            })

            $('#logout').on('click',function(){
                localStorage.clear();
                location.replace("../index.html");
            })
        }
    }
    else{
        alert("You are not logged in");
        location.replace("../index.html");
    }
})