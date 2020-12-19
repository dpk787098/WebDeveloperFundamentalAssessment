var productList =[];
var prodFilterList= ["Expired","Low Stock"];

$(document).ready(function(){
    var locData = localStorage.getItem("loginData");
    if(locData !== null && locData.length > 0){
        var loginD = JSON.parse(locData);
        if(loginD.username === loginD.password){
            function createRow(rowData,index){
                tRow = $('<tr class="each_prod_row_data"></tr>').appendTo('#prod_table_body')
                $('<td>'+rowData.id+'</td>').appendTo(tRow);
                $('<td>'+rowData.medicineName+'</td>').appendTo(tRow);
                $('<td>'+rowData.medicineBrand+'</td>').appendTo(tRow);
                $('<td class="exp_date">'+rowData.expiryDate+'</td>').appendTo(tRow);
                $('<td>$'+rowData.unitPrice+'</td>').appendTo(tRow);
                $('<td class="stk_count">'+rowData.stock+'</td>').appendTo(tRow);
            }



            function rowCreator(){
                for(var i=0; i<productList.length;i++){
                    createRow(productList[i],i)
                }
            }


            $.get('https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products')
            .done(function(data,status) {
                if(status === 'success'){
                    productList = data;
                    $('#prd_count').text("Count: "+productList.length);
                    rowCreator();
                    $('#overlay').hide();
                    $('#logout').show();
                }
                else{
                    alert("error occured while fetching product list please try refreshing the page");
                }
            })
            .fail(function(e) {
                alert("Failed to fetch product list Please refresh the page");
            })

            $('#logout').on('click',function(){
                localStorage.clear();
                location.replace("../index.html");
            })


            var monthName= ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            
            function getDate(){
                var today = new Date();
                return today.getTime();
            }


            $(".product").on("click", function(e) {
                if(prodFilterList.indexOf(e.target.value) !== -1){
                    var idx = prodFilterList.indexOf(e.target.value);
                    for (var i = prodFilterList.length; i--;)
                    {
                    if (prodFilterList[i] === prodFilterList[idx]) {prodFilterList.splice(i, 1);}
                    }

                }
                else{
                    prodFilterList.push(e.target.value);
                }

        
                if(prodFilterList.length === 0 || prodFilterList.length === 2){
                    trow1 = $('#prod_table_body tr');
                    for(var i=0; i<trow1.length; i++){
                        $('#prod_table_body tr').hide();
                    }
                    rowCreator()
                    $('#prd_count').text("Count: "+productList.length);
                }

                if(prodFilterList.length === 1){
                    if(prodFilterList[0] === 'Expired'){
                        $('table').find(".exp_date").each(function(index,element){
                            var tdDate=new Date($(element).html());
                            tdDate = tdDate.getTime();
                            var currDate=getDate();
                            var diff=currDate-tdDate;
                            if(diff<0)
                            {
                            $(element).parent('tr').css('display','none');
                            }
                        });
                        $('#prd_count').text("Count: "+$('table').find(".exp_date:visible").length)
                    }
                    else{
                        $('table').find('.stk_count').each(function(index,element){
                            if($(element).html() > 200){
                                $(element).parent('tr').css('display','none');
                            }
                        })
                        $('#prd_count').text("Count: "+$('table').find(".exp_date:visible").length)
                    }
                }
            });
        }
    }
    else{
        alert("You are not logged in");
        location.replace("../index.html");
    }
})