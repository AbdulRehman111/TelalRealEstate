/**
 * Created by FHK on 7/23/2017.
 */

modalLoginSuppliers = function (text, title, callbackOk, callbackCancel) {
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
        afterText: $('#dvPopUpSupp').html(),
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
            //var locationid = $('.modal').find('#ddlLocation').val();
            if (index === 0 && callbackCancel){
                //$('#dvPopUp').attr('style', 'none');
            callbackCancel(username, password)};
            if (index === 1 && callbackOk) callbackOk(username, password);
        }
    });
};

function AddSuppliers(){
    //$('#dvPopUp').attr('style', '');
    modalLoginSuppliers('','Add Agent', function (flatNo, buildingName) {
        //var txt = lang == Storage.classSetting.lang.arabic ? dictionary.arabic._thankyou : dictionary.english._thankyou;
        InsertSuppliers(flatNo,buildingName);
        //('#dvPopUp').attr('style', 'none');
    });
}

function InsertSuppliers(name, percentage){
    console.log(name+'-'+percentage+'-');
    Util.showScreenLoader(true);
    var url2=Storage.URL.InsertSupplier;
    //var LocationClass= 'LocationName='+EnLocation+'&LocationNameAr='+ArLocation;

    $.ajax({
        type: "POST",
        url: url2,
        data: { NameEn: name,Percentage: percentage},
        success: OnSupplierInsertSuccess,
        error: function (xhr, status, p3, p4) {
            var err = "Error " + " " + status + " " + p3;
            alert(err);
        },
        complete: OnSupplierComplete
    });
}

function OnSupplierComplete () {
    console.log('Complete');
    Util.showScreenLoader(false);
}

function OnSupplierInsertSuccess(data){
    var data2=JSON.parse(data);
    console.log(data2);
    //$.each(data2, function (index, value) {
        var obj=data2.ObjSupplier;
        var html_Flats=`
     <tr id="tr_`+obj.ID+`">
              
              <td contentEditable class="item-text">`+obj.NameEn+`</td>
              <td  contentEditable class="item-text">`+obj.Percentage+`</td>

              <!--<td class="numeric-cell">True</td>-->
              <td class="actions-cell">
                
                <a class="link icon-only" onclick="DeleteSupplier(`+obj.ID+`)"><i class="icon f7-icons">trash</i></a>
              </td>
            </tr>
    `;
        $('#tb_Supplier').append(html_Flats);
    //});

}






function DisplaySuppliers(){
    var url2=Storage.URL.GetSuppliers;
    //console.log(url2);
    var LocationClass= 'lang=en';
    $.ajax({
        type: "GET",
        url: url2,
        data: LocationClass,
        success: OnGetSupplierSuccess,
        error: function (xhr, status, p3, p4) {
            var err = "Error " + " " + status + " " + p3;
            alert(err);
        },
        complete: OnSupplierComplete
    });
}

function OnGetSupplierSuccess(data) {
    console.log(data);
    $.each(data, function (index, value) {
        var html_Flats=`
     <tr id="tr_`+value.ID+`">
              
              <td contentEditable class="item-text">`+value.NameEn+`</td>
              <td  contentEditable class="item-text">`+value.Percentage+`</td>

              <!--<td class="numeric-cell">True</td>-->
              <td class="actions-cell">
                
                <a class="link icon-only" onclick="DeleteSupplier(`+value.ID+`)"><i class="icon f7-icons">trash</i></a>
              </td>
            </tr>
    `;
        $('#tb_Supplier').append(html_Flats);
    });

}

function DeleteSupplier(id){
    myApp.confirm('Are you sure?','Delete', function () {

        var url2=Storage.URL.DeleteSuppliers;
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
