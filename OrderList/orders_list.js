var orderList =[];
var filterList = ["New","Packed","InTransit","Delivered"];

$(document).ready(function(){
  var locData = localStorage.getItem("loginData");
  if(locData !== null && locData.length > 0){
    var loginD = JSON.parse(locData);
    if(loginD.username === loginD.password){
      
      function createRow(rowData,index){
          tRow = $('<tr class="each_row_data"></tr>').appendTo('#table_body')
          $('<td>'+rowData.id+'</td>').appendTo(tRow);
          $('<td>'+rowData.customerName+'</td>').appendTo(tRow);
          $('<td>'+rowData.orderDate+'<br /><span>'+rowData.orderTime+'<span></td>').appendTo(tRow);
          $('<td>$'+rowData.amount+'</td>').appendTo(tRow);
          $('<td class="ordStat">'+rowData.orderStatus+'</td>').appendTo(tRow);
      }



      function rowCreator(){
          for(var i=0; i<orderList.length;i++){
              createRow(orderList[i],i)
          }
      }


      $.get('https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders')
      .done(function(data,status) {
          if(status === 'success'){
              orderList = data;
              rowCreator();
              $('#prd_count').html('Count: '+orderList.length);
              $('#overlay').hide();
              $('#logout').show();
          }
          else{
              alert("error occured while fetching order list");
          }
      })
      .fail(function(e) {
          alert("Failed to fetch orders list");
      })

    
      $(".ordStatus").on("click", function() {
          $('input[type="checkbox"]').change(function() {
            if($('input[type="checkbox"]:checked').length > 0) {
              var vals = $('input[type="checkbox"]:checked').map(function() {
                return this.value;
              }).get();

              $('#table_body tr')
              .hide()  
              .filter(function() { 
                return vals.indexOf($(this).find('td:last').text()) > -1;
              }).show();
              $('#prd_count').html('Count: '+$('table').find(".ordStat:visible").length);
            } 
            else {
              $('#table_body tr').show();
              $('#prd_count').html('Count: '+orderList.length);
            }
          });
          
          
      });

      $('#logout').on('click',function(){
        localStorage.clear();
        location.replace("../index.html");
      });
    }
  }
  else{
      alert("You are not logged in");
      location.replace("../index.html");
  }
})