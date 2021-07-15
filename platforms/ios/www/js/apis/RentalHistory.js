/**
 * Created by FHK on 7/26/2017.
 */





function DisplayHistory(obj){
    var FlatID=  $('#ddlFlats').val();
    var viewhistory=$('#chk_history')[0].checked;
    var chkHistory=0;
    if(viewhistory) chkHistory=1;
    var CheckInDate=  $('#t_InDate').val();
    console.log(FlatID +'--'+CheckInDate);
    var LocationClass= 'lang=en&chkHistory='+chkHistory;
    if(CheckInDate!=''){
        LocationClass+='&CheckOutdate='+ $('#t_InDate').val();
    }
    if(FlatID!=0){
        LocationClass+='&FlatID='+FlatID;
    }

    $('#tb_History').html('');
    Util.showScreenLoader(true);
    var url2=Storage.URL.GetRentals;
    console.log(LocationClass);

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
    try {
        $.each(data, function (index, value) {
            //alert(1);
            $$('#dvtablePending').attr('style', '');
            $$('#dvtablePending_h').attr('style', '');
            //var html_li=ShowAttachments( value.Attachments);
            var html_li = '';
            //
            // if(NoofFiles==1){
            //     arr_files.push(obj);
            // }
            // console.log(NoofFiles);
            for (var i = 0; i < value.Attachments.length; i++) {
                var thisLi = `
                <li>                   
                   <a href="forms/Imagehtml.html" onclick="ShowAttachments('`+ value.Attachments[i]+`')">File ` + (parseInt(i) + 1) + `</a>
                 </li>
            `;
                html_li+=thisLi;
            }

            //<a href="forms/Imagehtml.html" onclick="ShowAttachments('`+ value.Attachments[i]+`')">File ` + (parseInt(i) + 1) + `</a>
            var isActive=value.IsActive;
            var html_Flats = ` `;
            if(isActive==false) {
                html_Flats =  html_Flats+`<tr class="trClass" id="tr_`+value.ID+`">`;
                    }
                    else{

                html_Flats =  html_Flats+`<tr  id="tr_`+value.ID+`">`;
            }

            html_Flats =  html_Flats+`<td class="actions-cell">`;
            if(isActive==true) {
                html_Flats =  html_Flats+`<a class="link icon-only" onclick="EditRentals(`+value.ID+`)"><i class="icon f7-icons">compose</i></a>`;
            }
            else{
                html_Flats =  html_Flats+`<a class="link icon-only"  style="display: none"  ><i class="icon f7-icons">compose</i></a>`;
            }

            html_Flats =  html_Flats+`
        </td>
                <td contentEditable class="item-text">` + value.FlatNo + `</td>
                <td class="label-cell">` + value.CustomerName + `</td>
                <td class="label-cell">` + value.StrChecksIn + `</td>
                 <td class="label-cell">` + value.StrChecksOut + `</td>
                <td class="numeric-cell">` + value.TotalAmount + `</td>
                <td class="numeric-cell">` + value.VATAmount + `</td>
        
                <td class="actions-cell">
            <div class="content-block accordion-list custom-accordion">
                <div class="accordion-item">
                    <div class="accordion-item-toggle">
                        <i class="icon icon-plus">+</i>
                        <i class="icon icon-minus">-</i>
                        <span></span>
                     </div>
                    <div class="accordion-item-content">
                        <ul>` +
                html_li + `
                        </ul>
                    </div>
                </div>
            </div>    
            
        </td>
    </tr>
    `;

            //alert(html_Flats);
            $('#tb_History').append(html_Flats);
        });
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
        $$(document).on('pageAfterAnimation', function (event) {
            var page = event.detail.page;
            if (page.name == pageName.AttachemntPage) {
                //zoom();


                $("#touchgallery").html("");
                $("#touchgallery").append("<div class='zoom'><img class='media' src='" + filename + "' width='100%'  /></div>");
                zoom();
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
    modalLoginHistory('','Make CheckOut', function (flatNo) {
        //var txt = lang == Storage.classSetting.lang.arabic ? dictionary.arabic._thankyou : dictionary.english._thankyou;
        MakeCheckOut(id,flatNo);
        //('#dvPopUp').attr('style', 'none');
    });
}

modalLoginHistory = function (text, title, callbackOk, callbackCancel) {
    var sLanguage = 'en';
    //var txtyes = 'Yes';//sLanguage == Storage.classSetting.lang.arabic ? dictionary.arabic._yes : dictionary.english._yes;
    var txtNo = 'No';//sLanguage == Storage.classSetting.lang.arabic ? dictionary.arabic._no : dictionary.english._no;
    var txtcancel = 'Cancel';//sLanguage == Storage.classSetting.lang.arabic ? dictionary.arabic._cancel : dictionary.english._cancel;
    var txtOK = 'OK';//sLanguage == Storage.classSetting.lang.arabic ? dictionary.arabic._ok : dictionary.english._ok;
    var Satisfied= 'Yes';//sLanguage == Storage.classSetting.lang.arabic ? dictionary.arabic._Satisfied : dictionary.english._Satisfied;
    var Suggestions= 'Yes';//sLanguage == Storage.classSetting.lang.arabic ? dictionary.arabic._Suggestions : dictionary.english._Suggestions;
    if (typeof title === 'function') {
        callbackCancel = arguments[2];
        callbackOk = arguments[1];
        title = undefined;
    }
    return myApp.modal({
        text: text || '',
        title: typeof title === 'undefined' ? myApp.params.modalTitle : title,
        afterText: $('#dvPopUpHistory').html(),
        buttons: [
            {
                text: txtcancel
            },
            {
                text: txtOK,
                bold: true
            }
        ],
        onClick: function (modal, index) {
            var username =$('.modal').find('#t_OutDate').val();
            // var password = $('.modal').find('#name_bld').val();
            //var locationid = $('.modal').find('#ddlLocation').val();
            if (index === 0 && callbackCancel){
                //$('#dvPopUp').attr('style', 'none');
                callbackCancel(username)};
            if (index === 1 && callbackOk) callbackOk(username);
        }
    });
};

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
