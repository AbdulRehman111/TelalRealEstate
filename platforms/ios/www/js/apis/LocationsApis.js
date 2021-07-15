/**
 * Created by FHK on 7/19/2017.
 */


modalLogin2 = function (text, title, callbackOk, callbackCancel) {
    var sLanguage = 'en';
    var txtyes = 'Yes';//sLanguage == Storage.classSetting.lang.arabic ? dictionary.arabic._yes : dictionary.english._yes;
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
        afterText: '' +
        '<div class="input-field modal-input-double">' +
        '   <input type="text" id="l1" name="modal-username" placeholder="' + 'Location(En)' + '" class="modal-text-input"> </div><br>' +

        '<div class="input-field modal-input-double">' +
        // '   <input type="text" name="modal-password" placeholder="' + _Suggestions + '" class="modal-text-input">' +
        ' <input type="text" id="Location_ar" name="modal-password"  placeholder="'+'Location(Ar)'+'" class="modal-text-input" > ' +
        '</div>',
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
            var username =$('.modal').find('#l1').val();
            var password = $('.modal').find('#Location_ar').val();
            if (index === 0 && callbackCancel) callbackCancel(username, password);
            if (index === 1 && callbackOk) callbackOk(username, password);
        }
    });
};


var InsertLocation = function (EnLocation, ArLocation) {

    console.log(EnLocation+'--'+ArLocation);
    Util.showScreenLoader(true);
    var url2=Storage.URL.InsertLocation;
    //var objLocation1 = { LocationNameAr: ArLocation,LocationNameEn: EnLocation};
    //var objLocation = { objLocation: objLocation1};
    //objLocation["LocationNameAr"]=ArLocation;
    //objLocation["LocationNameEn"]=EnLocation;

    // var LocationClass = new Object();
    // LocationClass.LocationNameAr = ArLocation;
    // LocationClass.LocationNameEn = EnLocation;

    var LocationClass= 'LocationName='+EnLocation+'&LocationNameAr='+ArLocation;


    // console.log(url2);

    $.ajax({
        type: "POST",
        url: url2,
        //dataType: "json",
        data: { LocationNameAr: ArLocation,LocationName: EnLocation},
        //contentType:"text/plain",
        //contentType: "application/json",
        //contentType:false,
        //processData:false,
        //crossDomain: true,
        success: OnLocSuccess,
        error: function (xhr, status, p3, p4) {
            var err = "Error " + " " + status + " " + p3;
            alert(err);
        },
        complete: OnLocComplete
    });
};

function OnLocSuccess (data) {
    console.log(data);
    var data2=JSON.parse(data);
    console.log(data2);
    //$.each(data2, function (index, value) {
    var value=data2.ObjLocation;


    var htmlTable=`<tr id="tr_`+value.ID+`" >         
             <td contentEditable class="item-text">`+value.LocationName+`</td>
             <!--<td contentEditable class="item-text">`+value.LocationName+`</td>-->
             <td class="actions-cell">
            
             <a class="link icon-only" onclick="DeleteLocation(`+value.ID+`)"><i class="icon f7-icons">trash</i></a>
             </td>
             </tr>`;

    $('#tbLocation').append(htmlTable);



    myApp.alert('New Location Added','Success');

}
function OnLocError () {
    console.log('Error');
}
function OnLocComplete () {
    console.log('Complete');
    Util.showScreenLoader(false);
}
function AddLocation(){
    modalLogin2('','Add Location', function (EnLocation, ArLocation) {
        //var txt = lang == Storage.classSetting.lang.arabic ? dictionary.arabic._thankyou : dictionary.english._thankyou;
        InsertLocation(EnLocation,ArLocation);
    });
}

function DisplayLocation(){
    var url2=Storage.URL.GetLocations;
    console.log(url2);
    var LocationClass= 'lang=en';
    $.ajax({
        type: "GET",
        url: url2,
        //dataType: "json",
        data: LocationClass,
        //contentType:"text/plain",
        //contentType: "application/json",
        //contentType:false,
        //processData:false,
        //crossDomain: true,
        success: OnGetLocSuccess,
        error: function (xhr, status, p3, p4) {
            var err = "Error " + " " + status + " " + p3;
            alert(err);
        },
        complete: OnLocComplete
    });
}
function OnGetLocSuccess(data){
    console.log(data);
    $.each(data, function (index, value) {
        console.log(value.LocationName)
        var htmlTable=`<tr id="tr_`+value.ID+`" >         
             <td contentEditable class="item-text">`+value.LocationName+`</td>
             <!--<td contentEditable class="item-text">`+value.LocationName+`</td>-->
             <td class="actions-cell">
             
             <a class="link icon-only" onclick="DeleteLocation(`+value.ID+`)"><i class="icon f7-icons">trash</i></a>
             </td>
             </tr>`;

        $('#tbLocation').append(htmlTable);

    });

}

function DeleteLocation(id){

    myApp.confirm('Are you sure?','Delete', function () {
        //myApp.alert('You clicked Ok button');
        var url2=Storage.URL.DeleteLocation;
        console.log(url2);
        var LocationClass= 'id='+id;
        $.ajax({
            type: "GET",
            url: url2,
            data: LocationClass,
            success: function (data) {
                $('#tr_'+id).remove();
                myApp.alert('Record Deleted?','Delete');
            },
            error: function (xhr, status, p3, p4) {
                var err = "Error " + " " + status + " " + p3;
                alert(err);
            },
            complete: OnLocComplete
        });


    });

}

