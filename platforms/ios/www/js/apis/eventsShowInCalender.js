/**
 * Created by rahman on 10/31/2019.
 */

var eventsActive =[];
var eventsInActive =[];
var atachmentsFile =[];
var getData =[];
var eventsss =[];
var result=''
function onChange(a) {
    //console.log(a);

    $('.console').html('');

    //console.log(atachmentsFile);

    var pickDate=kendo.toString(this.value(),'d');
    findInJSONContainObject(getData , pickDate);

}

function onNavigate() {
    console.log("Navigate");
}



//$( "#calendar" ).click(function() {
//    var d = $("#calendar").data("kendoCalendar").value();
//    console.log(d);
//
//});
//function myTrace(data) {
//    console.log(data);
//    return "";
//}
function findInJSONContainObject(mobject, val) {
    //console.log(val)
    //console.log(html_li);
    $$('.console').html('');
    var arr = [];
    $.each(mobject, function (index, dep) {
        //console.log(index);
        console.log(dep);
        if (dep.StrChecksIn == val){
            arr.push({
                customerName: dep.CustomerName,
                flatID: dep.FlatID,
                TotalAmmount: dep.TotalAmount,
                flatNo: dep.FlatNo,
                checkIN: dep.ChecksIn,
                checkOUT: dep.ChecksOut,
                vat:dep.VATAmount,
                IsActive:dep.IsActive,
                Attachments:dep.Attachments

            });
            var html_li = '';
            myApp.popup('.popup-first_page');
           

            //
            // if(NoofFiles==1){
            //     arr_files.push(obj);
            // }

            for (var i = 0; i < arr[0].Attachments.length; i++) {
                var thisLi = `
                <li>
                   <a href="forms/Imagehtml.html" onclick="ShowAttachments('`+ arr[0].Attachments[i]+`')">File ` + (parseInt(i) + 1) + `</a>
                 </li>
            `;
                html_li+=thisLi;
            }
            if(arr[0].IsActive ==true) {
               // eventsActive.push(+new Date(value.StrChecksIn));
                //html_Flats =  html_Flats+`<a class="link icon-only" onclick="EditRentals(`+value.ID+`)"><i class="icon f7-icons">compose</i></a>`;
                var thisLi1 = `
                <li>
                <a class="link icon-only" onclick="EditRentals(`+dep.ID+`)"><i class="icon f7-icons">compose</i></a>
                
                </li>`;
            }
            else{

                var thisLi1 = `
                <li>

                  <a class="link icon-only"  style="display: none"  ><i class="icon f7-icons">compose</i></a>
                 </li>`;
                setTimeout(function(){
                    $('#checkOutDetail').hide();
                },200);

            }
            var eventInfo= ` <div class="w3-card-4" style="width:100%">
                                    <header class="w3-container w3-light-grey">
                                       <h3>`+arr[0].flatNo+`</h3>
                                     </header>
                                    <div class="w3-container" >
                                       <h2 style=" color:white; text-align: center;    margin-top: 12px;font-size: 18px;">`+arr[0].customerName+`</h2>
                                       <hr>
     

                                   <div class="wrap">
                                       <div class="left">
                                                 Check-IN:<br>
                                                 Check-Out:<br>
                                                 Ammount:<br>
                                                 IsActive:

                                              
                                       </div>
                                  <div class="right">
                                      <p style=" padding-bottom: 0px !important;">`+arr[0].checkIN +`</p>
                                      <p style=" padding-bottom: 0px !important;">`+arr[0].checkOUT +`</p>
                                      <p style=" padding-bottom: 0px !important;">`+arr[0].TotalAmmount +`</p>
                                      <p>`+arr[0].IsActive +`</p>

                                 </div>
                           </div>
                           <button id="checkOutDetail" class="w3-button w3-block" style="color: #e6e6e6!important;  margin-top: -20px;>`+thisLi1+`  Check-Out Date</button>
            <div style="width:100%;text-align:center;" id="checkOutContainer" hidden>
            <h3 style="color:#aecb36;font-size:15px;">Make checkOUT</h3>
            <input type="text" id="t_OutDate" placeholder="Select Date to" style="color:#a3c43d;background-color: #333333;"/>
         
            <div id="appendCheckOutButton" ></div>
            </div>
         
           
                </div>
         </div>
    <button  class="w3-button w3-block w3-dark-grey" style="color: #101010!important;  background-color: #f1f1f1!important;">
        <div class=" accordion-list custom-accordion">
                <div class="accordion-item">
                    <div class="accordion-item-toggle">
                        <i class="icon icon-plus">+</i>
                        <i class="icon icon-minus">-</i>
                        <span></span>
                     </div>
                    <div class="accordion-item-content">
                        <ul>
                     `+html_li+`

                        </ul>
                    </div>
                </div>
            </div>
     </button>

  </div>`
        }

        $('.console').append(eventInfo);
        //$('.console').html('');

        arr=[];

    });
    //console.log(arr);


    return arr;

}
