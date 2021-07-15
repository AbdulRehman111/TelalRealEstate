/**
 * Created by FHK on 7/26/2017.
 */

var html_li = '';
var html_li1 = '';

function DisplayHistory(obj){
    getData =[];
    eventsInActive =[];
    eventsActive =[];
    eventsss =[];
    var FlatID=  $('#ddlFlats').val();
    //var viewhistory=$('#chk_history')[0].checked;
    var chkHistory=1;
    //if(viewhistory) chkHistory=1;
    var CheckInDate=  $('#t_InDate').val();
    var CheckInDate2=  $('#toSelectedDate').val();
    var searchByName= $('#searchByName').val();
    console.log(FlatID +'--'+CheckInDate);
    var LocationClass= 'lang=en&chkHistory='+chkHistory;
    if(CheckInDate!=''){
        LocationClass+='&CheckOutdate='+ moment($('#t_InDate').val()).format('YYYY-MM-DDTHH:mm:ss');
    }
    if(CheckInDate2!=''){
        LocationClass+='&CheckOutdateto='+
        moment($('#toSelectedDate').val()).format('YYYY-MM-DDTHH:mm:ss');
    }
    if(searchByName != ''){
        LocationClass+= '&CustName=' + searchByName;
    }
    //if(CheckInDate == ''){
    //    return false;
    //}
    if(FlatID!=0){
        LocationClass+='&FlatID='+FlatID;
    }
    //if(viewhistory == false){
    //    return false;
    //
    //}
    $("#calenderEvents").html('');
    //$('#tb_History').html('');
    Util.showScreenLoader(true);
    var url2=Storage.URL.GetRentals2;
    console.log(LocationClass);
    //console.log(FlatID);
    $.ajax({
        type: "GET",
        url: url2,
        data: LocationClass,
        success: OnHistorySuccess,
        error: function (xhr, status, p3, p4) {
            var err = "Error " + " " + status + " " + p3;
            alert(err);
        },
        complete: function(){
            Util.showScreenLoader(false);
        }
    });
}

function OnHistorySuccess(data){
    console.log(data);


    //<a href="forms/Imagehtml.html" onclick="ShowAttachments('`+ value.Attachments[i]+`')">File ` + (parseInt(i) + 1) + `</a>
    try {

        if (data == [] || data.length == '0') {
            myApp.alert('No Records Found..','Telal Real Estate');
            return false;

        } else {


            $.each(data, function (index, value) {
                //alert(1);
                getData.push(value);
                console.log(value);
                var isActive=value.IsActive;
                console.log(isActive);

                if(isActive==true) {
                    eventsActive.push(+new Date(value.StrChecksIn));

                }
                else{
                    eventsInActive.push(+new Date(value.StrChecksIn));

                }
                //html_li1 += thisLi1;
                eventsss.push(+new Date(value.StrChecksIn));
                //console.log(eventsss);


                $$('#dvtablePending').attr('style', '');
                $$('#dvtablePending_h').attr('style', '');
                //var html_li=ShowAttachments( value.Attachments);


                //
                // if(NoofFiles==1){
                //     arr_files.push(obj);
                // }

                for (var i = 0; i < value.Attachments.length; i++) {
//                atachmentsFile.push(value.Attachments[i]);
                    var thisLi = `
                <li>
                   <a href="forms/Imagehtml.html" onclick="ShowAttachments('` + value.Attachments[i] + `')">File ` + (parseInt(i) + 1) + `</a>
                </li>
            `;

                }
                html_li += thisLi;
            });

            console.log(eventsInActive);
            console.log(eventsActive);


            Util.showScreenLoader(false);
            $("#calenderEvents").kendoCalendar({
                value: new Date(),
                //change: onChange,

                navigate: onNavigate,
                dates: eventsss,
                //disableDates: function (date) {
                //    console.log(date);
                    //console.log(eventsInActive);
                //    var dates = $("#national-holidays").data("kendoCalendar").options.dates;
                //    if (date && compareDates(date, dates)) {
                //        console.log(dates)
                //        return true;
                //    } else {
                //        //console.log(dates)
                //        return false;
                //    }
                //},
                content: '<div class="custom"><#=data.value#></div>',
                //month: {
                //    content: '<div>' +
                //    '#= myTrace(data) #' +
                //    '#= data.value #' +
                //    '</div>'
                //},
                month: {
                    // template for dates in month view
                    content: "# if ($.inArray(+data.date, dates) != -1) { #" +
                    "<div data-tooltip='#=kendo.toString(data.date, \"d\")#' class='" +
                    "# if ($.inArray(+data.date, eventsInActive) !=-1) { #" +
                    "past" +
                    "# } else if (data.date == eventsActive) { #" +
                    "current" +
                    "# } else { #" +
                    "future" +
                    "# } #" +
                    "'>#= data.value #</div>" +
                    "# } else { #" +
                        // wrap the text in a div in order to add the data-tooltip
                    "<div data-tooltip='#=kendo.toString(data.date, \"d\")#'>#= data.value #</div>" +
                    "# } #"
                },
            });
            $("#calenderEvents").click(function () {

                var eventDates = $("#calenderEvents").data("kendoCalendar").value();
                var pickDate = kendo.toString(eventDates, 'd');
                findInJSONContainObject(getData, pickDate);

            });
        }
    }
    catch (err){
        console.log(err);
        Util.showScreenLoader(false);
    }
}
// <a class="link icon-only" onclick="ShowAttachments('`+ value.Attachments+`')"><i class="icon f7-icons">download</i></a>

function ShowAttachments(filename){
    try {
        // mainView.router.loadPage("forms/" + pageName.AttachemntPage + ".html?filename=" + filename );
        // mainView.router.loadPage("forms/" + pageName.AttachemntPage);
        // mainView.router.refreshPage();
        myApp.closeModal(".popup-first_page");
        $$(document).on('pageAfterAnimation', function (event) {
            var page = event.detail.page;
            if (page.name == pageName.AttachemntPage) {
                //zoom();
                $("#touchgallery").html("");
                $("#touchgallery").append("<div'><img id='imgShow'  src='" + filename + "' width='100%'  /></div>");
                //zoom();
            }

        });
    }
    catch (err){
        Util.showScreenLoader(false);
    }
}

function ShowAttachments2(filename){
    try {
        mainView.router.loadPage("forms/" + pageName.AttachemntPage + ".html?filename=" + filename );
        $$(document).on('pageAfterAnimation', function (event) {
            $("#touchgallery").html("");
            console.log(type);
            if (type === 1) {
                $.each(attachments, function (i, attach) {
                    if (attach.fkFileType === 1) {
                        $("#touchgallery").append("<div id='floating-img'><img src='" + attach.filePath + "' width='100%' /></div>");
                    }
                })
                console.log("type 1");
                Util.showScreenLoader(false);
            } else if (type === 3) {
                $.each(attachments, function (i, attach) {
                    if (attach.fkFileType === 3) {
                        $("#touchgallery").append("<div id='floating-box' onclick='playVideo(" + attach.id + ", " + id + ")'><img src='images/play-icon.png' width='150' height='150'/></div>");
                    }
                })
                Util.showScreenLoader(false);
                console.log("type 3");
            } else if (type === 2) {
                $.each(attachments, function (i, attach) {
                    if (attach.fkFileType === 2) {
                        $("#touchgallery").append("<div id='floating-box' class='" + id + "' onclick='playAudio(" + attach.id + ", " + id + ")'><img src='images/voice-r.png' width='150' height='150'/><div style='color:#fff' align='center'><span id='audio_playing' style='float:left'></span> <span id='audio_duration' style='float:left'></span></div></div>");
                    }
                })
                Util.showScreenLoader(false);
                console.log("type 2");
            }

            console.log($$("#touchgallery"));
        });
    }
    catch (err){
        Util.showScreenLoader(false);
    }
}


function EditRentals(id){
    
    $('#appendCheckOutButton').html('');
    $("#t_OutDate").kendoDateTimePicker({
       value: new Date(),
       format: "yyyy/MM/dd",
   }
);
    $("#t_OutDate").val('');
    $('#checkOutContainer').show();
    var submitButton =`<button class="checkOutButton" onclick="GetCheckOutDetail(`+id+`)">submit</button>`;
    
    $('#appendCheckOutButton').append(submitButton);
   // modalLoginHistory('','Make CheckOut', function (flatNo) {
        //var txt = lang == Storage.classSetting.lang.arabic ? dictionary.arabic._thankyou : dictionary.english._thankyou;
      //  MakeCheckOut(id,flatNo);
        //('#dvPopUp').attr('style', 'none');
    //});
}

//modalLoginHistory = function (text, title, callbackOk, callbackCancel) {
//    var sLanguage = 'en';
//    //var txtyes = 'Yes';//sLanguage == Storage.classSetting.lang.arabic ? dictionary.arabic._yes : dictionary.english._yes;
//    var txtNo = 'No';//sLanguage == Storage.classSetting.lang.arabic ? dictionary.arabic._no : dictionary.english._no;
//    var txtcancel = 'Cancel';//sLanguage == Storage.classSetting.lang.arabic ? dictionary.arabic._cancel : dictionary.english._cancel;
//    var txtOK = 'OK';//sLanguage == Storage.classSetting.lang.arabic ? dictionary.arabic._ok : dictionary.english._ok;
//    var Satisfied= 'Yes';//sLanguage == Storage.classSetting.lang.arabic ? dictionary.arabic._Satisfied : dictionary.english._Satisfied;
//    var Suggestions= 'Yes';//sLanguage == Storage.classSetting.lang.arabic ? dictionary.arabic._Suggestions : dictionary.english._Suggestions;
//    if (typeof title === 'function') {
//        callbackCancel = arguments[2];
//        callbackOk = arguments[1];
//        title = undefined;
//    }
//    return myApp.modal({
//        text: text || '',
//        title: typeof title === 'undefined' ? myApp.params.modalTitle : title,
//        afterText: $('#dvPopUpHistory').html(),
//        buttons: [
//            {
//                text: txtcancel
//            },
//            {
//                text: txtOK,
//                bold: true
//            }
//        ],
//        onClick: function (modal, index) {
//            var username =$('.modal').find('#t_OutDate').val();
//            // var password = $('.modal').find('#name_bld').val();
//            //var locationid = $('.modal').find('#ddlLocation').val();
//            if (index === 0 && callbackCancel){
//                //$('#dvPopUp').attr('style', 'none');
//                callbackCancel(username)};
//            if (index === 1 && callbackOk) callbackOk(username);
//        }
//    });
//};

function GetCheckOutDetail(id) {
    var checkOutDate = $("#t_OutDate").val();
    console.log(id)
    if(checkOutDate == ""){
        myApp.alert("Select Check-OUT Date","Telal Real Estate");
        return false;
        
    }
    //console.log(checkOutDate)
    MakeCheckOut(id,checkOutDate)
}
function MakeCheckOut(id, dateCheckout) {
    //console.log(name+'-'+percentage+'-');
    Util.showScreenLoader(true);
    var url2=Storage.URL.MakeCheckOut;
    //var LocationClass= 'LocationName='+EnLocation+'&LocationNameAr='+ArLocation;

    $.ajax({
        type: "POST",
        url: url2,
        data: { ID: id,ChecksOut: dateCheckout},
        success: function () {
            console.log('Complete');
            Util.showScreenLoader(false);
            $('#tr_'+id).remove();
            myApp.alert('Record UpdateD','Success');
            myApp.closeModal('.popup-first_page');

        },
        error: function (xhr, status, p3, p4) {
            var err = "Error " + " " + status + " " + p3;
            alert(err);
        },
        complete: OnSupplierComplete
    });

}

function OnMakeCheckOutSuccess (data) {

    console.log('Complete');
    Util.showScreenLoader(false);
    $('#tr_'+id).remove();
    myApp.alert('Record Update','Success');

}
