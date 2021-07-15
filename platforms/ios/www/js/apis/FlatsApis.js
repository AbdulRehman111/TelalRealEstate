/**
 * Created by FHK on 7/23/2017.
 */

modalLoginFlats = function (text, title, callbackOk, callbackCancel) {
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
        afterText: $('#dvPopUp').html(),
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
            var password = $('.modal').find('#name_bld').val();
            var locationid = $('.modal').find('#ddlLocation').val();
            if (index === 0 && callbackCancel){
                //$('#dvPopUp').attr('style', 'none');
                callbackCancel(username, password)};
            if (index === 1 && callbackOk) callbackOk(username, password,locationid);
        }
    });
};

function AddFlats(){
    //$('#dvPopUp').attr('style', '');
    modalLoginFlats('','Add Flats', function (flatNo, buildingName,locationid) {
        //var txt = lang == Storage.classSetting.lang.arabic ? dictionary.arabic._thankyou : dictionary.english._thankyou;
        InsertFlats(flatNo,buildingName,locationid);
        //('#dvPopUp').attr('style', 'none');
    });
}

function InsertFlats(flat, building,locationid){
    console.log(flat+'-'+building+'-'+locationid);
    var url2=Storage.URL.InsertFlat;
    //var LocationClass= 'LocationName='+EnLocation+'&LocationNameAr='+ArLocation;

    $.ajax({
        type: "POST",
        url: url2,
        data: { FlatNo: flat,buildingName: building,locationid:locationid},
        success: OnFlatInsertSuccess,
        error: function (xhr, status, p3, p4) {
            var err = "Error " + " " + status + " " + p3;
            alert(err);
        },
        complete: OnFlatComplete
    });
}

function OnFlatComplete () {
    console.log('Complete');
}

function OnFlatInsertSuccess(data){
    var data2=JSON.parse(data);
    console.log(data2);
    //$.each(data2, function (index, value) {
    var obj=data2.ObjFlat;
    var html_Flats=`
     <tr tr id="tr_`+obj.ID+`">
              
              <td contentEditable class="item-text">`+obj.FlatNo+`</td>
              <td  contentEditable class="item-text">`+obj.buildingName+`</td>
              <td class="label-cell">`+obj.LocationName+`</td>              
              <td class="actions-cell">
                
                <a class="link icon-only" onclick="DeleteFlat(`+obj.ID+`)"><i class="icon f7-icons">trash</i></a>
              </td>
            </tr>
    `;
    $('#tbFlats').append(html_Flats);
    //});

}

function getlocationddl() {
    var url2=Storage.URL.GetLocations;
    console.log(url2);
    var LocationClass= 'lang=en';
    $.ajax({
        type: "GET",
        url: url2,
        data: LocationClass,
        success: OnGetLocComboSuccess,
        error: function (xhr, status, p3, p4) {
            var err = "Error " + " " + status + " " + p3;
            alert(err);
        },
        complete: OnLocComplete
    });
}

function OnGetLocComboSuccess(data) {
    console.log(data)
    $("#ddlLocation").html("");
    var sResult = '<option value="0" selected>' + 'Select Location' + '</option>';
    try {
        for (var areaIterate = 0; areaIterate < data.length; areaIterate++) {
            sResult += '<option value="' + data[areaIterate].ID + '" >' + data[areaIterate].LocationName + '</option>';
        }
        $("#ddlLocation").html(sResult);
    } catch (err) {
        console.log(err);
    }


}




function DisplayFlats(){
    var url2=Storage.URL.GetFlats;
    //console.log(url2);
    var LocationClass= 'lang=en';
    $.ajax({
        type: "GET",
        url: url2,
        data: LocationClass,
        success: OnGetFlatSuccess,
        error: function (xhr, status, p3, p4) {
            var err = "Error " + " " + status + " " + p3;
            alert(err);
        },
        complete: OnFlatComplete
    });
}

function OnGetFlatSuccess(data) {
    console.log(data);
    $.each(data, function (index, value) {
        var html_Flats=`
     <tr tr id="tr_`+value.ID+`">
              
              <td contentEditable class="item-text">`+value.FlatNo+`</td>
              <td  contentEditable class="item-text">`+value.buildingName+`</td>
              <td class="label-cell">`+value.LocationName+`</td>              
              <td class="actions-cell">
                
                <a class="link icon-only" onclick="DeleteFlat(`+value.ID+`)"><i class="icon f7-icons">trash</i></a>
              </td>
            </tr>
    `;
        $('#tbFlats').append(html_Flats);
    });

}

function DeleteFlat(id){
    myApp.confirm('Are you sure?','Delete', function () {

        var url2=Storage.URL.DeleteFlats;
        console.log(url2);
        var LocationClass= 'id='+id;
        $.ajax({
            type: "GET",
            url: url2,
            data: LocationClass,
            success: function (data) {
                $('#tr_'+id).remove();
                myApp.alert('Record Deleted','Delete');
            },
            error: function (xhr, status, p3, p4) {
                var err = "Error " + " " + status + " " + p3;
                alert(err);
            },
            complete: OnLocComplete
        });


    });
}
