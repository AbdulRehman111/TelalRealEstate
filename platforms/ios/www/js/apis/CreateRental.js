/**
 * Created by FHK on 7/19/2017.
 */

var fd = [];
var fdpro = [];
var audio = {};
var picture = {};
var video = {};
var vote01;
var vote02;
var status;
var internet=1;
var idnointernet;
var fdnointernet = [];
var linknointernet = [];
var VAT_RATE=0;

function takePicture1() {
    console.log("Take Picture");
    // $('#cam1').attr('src', 'images/icons/custom/camera_check.png');
    var captureSuccess = function (mediaFiles) {
        var path = mediaFiles;
        //window.resolveLocalFileSystemURL(path, picture.readAsDataURL, picture.fileFail);
        //alert(mediaFiles);
        if (internet == "1") {
            var uri = encodeURI(
                mainURL +
                "Rental/uploadFiles");

            var options = new FileUploadOptions();
            var fileURL = path;
            options.fileKey = "file";
            options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
            options.mimeType = "image/jpeg";
            //options.chunkedMode = false;

            var headers = { 'headerParam': 'headerValue' };

            options.headers = headers;

            var ft = new FileTransfer();
            ft.onprogress = function (progressEvent) {
                Util.showScreenLoader(true);
            };
            ft.upload(fileURL, uri, winpic, fail, options);
        } else {
            var data = new Object();
            data["type"] = "image/jpeg";
            data["file"] = path;
            fdnointernet.push(data);
            console.log("fd_pic", fdnointernet);
            // $('#takePicture').addClass("f-green-bg");
            //$('#cam1').attr('src', 'images/icons/custom/camera_check.png');

        }

    };

    // capture error callback
    var captureError = function (error) {
        if (error.code != 3) {
            myApp.alert('Error code: ' + error.code, 'Capture Error');
        }
    };

    // start image capture
    //navigator.device.capture.captureImage(captureSuccess, captureError, { limit: 1 });

    //navigator.camera.getPicture(captureSuccess, captureError, { limit: 1 })


    try {
        navigator.camera.getPicture(
            captureSuccess, captureError, {
                quality: 25,
                targetWidth: 1000,
                targetHeight: 1000,
                destinationType: Camera.DestinationType.FILE_URI,
                sourceType: Camera.PictureSourceType.CAMERA,
                correctOrientation: true
            });
    } catch (e) {
        myApp.alert(e);
    }

}

function takePicture2(){
    window.imagePicker.getPictures(
        function(results) {
            for (var i = 0; i < results.length; i++) {
                captureSuccess( results[i]);
            }
        }, function (error) {
            console.log('Error: ' + error);
        }, {
            maximumImagesCount: 10,
            width: 800
        }
    );


    var captureSuccess = function (mediaFiles) {
        var path = mediaFiles;
        //window.resolveLocalFileSystemURL(path, picture.readAsDataURL, picture.fileFail);
        //alert(mediaFiles);
        if (internet == "1") {
            var uri = encodeURI(
                mainURL +
                "Rental/uploadFiles");

            var options = new FileUploadOptions();
            var fileURL = path;
            options.fileKey = "file";
            options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
            options.mimeType = "image/jpeg";
            //options.chunkedMode = false;

            var headers = { 'headerParam': 'headerValue' };

            options.headers = headers;

            var ft = new FileTransfer();
            ft.onprogress = function (progressEvent) {
                Util.showScreenLoader(true);
            };
            ft.upload(fileURL, uri, winpic2, fail, options);
        } else {
            var data = new Object();
            data["type"] = "image/jpeg";
            data["file"] = path;
            fdnointernet.push(data);
            console.log("fd_pic", fdnointernet);
            // $('#takePicture').addClass("f-green-bg");
            //$('#cam1').attr('src', 'images/icons/custom/camera_check.png');

        }

    };

}

function takePicture22() {
    console.log("Take Picture");
    // $('#cam1').attr('src', 'images/icons/custom/camera_check.png');
    var captureSuccess = function (mediaFiles) {
        var path = mediaFiles;
        //window.resolveLocalFileSystemURL(path, picture.readAsDataURL, picture.fileFail);
        //alert(mediaFiles);
        if (internet == "1") {
            var uri = encodeURI(
                mainURL +
                "Rental/uploadFiles");

            var options = new FileUploadOptions();
            var fileURL = path;
            options.fileKey = "file";
            options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
            options.mimeType = "image/jpeg";
            //options.chunkedMode = false;

            var headers = { 'headerParam': 'headerValue' };

            options.headers = headers;

            var ft = new FileTransfer();
            ft.onprogress = function (progressEvent) {
                Util.showScreenLoader(true);
            };
            ft.upload(fileURL, uri, winpic2, fail, options);
        } else {
            var data = new Object();
            data["type"] = "image/jpeg";
            data["file"] = path;
            fdnointernet.push(data);
            console.log("fd_pic", fdnointernet);
            // $('#takePicture').addClass("f-green-bg");
            //$('#cam1').attr('src', 'images/icons/custom/camera_check.png');

        }

    };

    // capture error callback
    var captureError = function (error) {
        if (error.code != 3) {
            myApp.alert('Error code: ' + error.code, 'Capture Error');
        }
    };

    // start image capture
    //navigator.device.capture.captureImage(captureSuccess, captureError, { limit: 1 });

    //navigator.camera.getPicture(captureSuccess, captureError, { limit: 1 })


    try {
        navigator.camera.getPicture(
            captureSuccess, captureError, {
                quality: 25,
                //targetWidth: 1000,
                //targetHeight: 1000,
                destinationType: Camera.DestinationType.FILE_URI,
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                correctOrientation: true,
                //encodingType:Camera.EncodingType.JPEG,
                saveToPhotoAlbum:false,
                correctOrientation:true
            });
    } catch (e) {
        myApp.alert(e);
    }

}

function winpic(r) {
    Util.showScreenLoader(false);


    var data = new Object();
    data["type"] = "0";
    data["file"] = r.response.slice(2, -2);
    fd.push(data);
    console.log("fd", fd);

    $('#cam1').attr('src', 'images/icons/custom/camera_check.png');

        myApp.alert(
            "Successfully Uploaded",
            'Alert'
        );

}

function winpic2(r) {
    Util.showScreenLoader(false);


    var data = new Object();
    data["type"] = "0";
    data["file"] = r.response.slice(2, -2);
    fd.push(data);
    console.log("fd", fd);

    $('#cam2').attr('src', 'images/icons/custom/FolderChk.png');

    myApp.alert(
        "Successfully Uploaded",
        'Alert'
    );

}

function fail(error) {
    Util.showScreenLoader(false);
    //myApp.alert("An error has occurred in Uploading");
    myApp.alert("An error has occurred: Code = " + error.code,'Error');
    //myApp.alert("An error has occurred: Code = " + error.target,_error);
    //console.log("upload error source " + error.source);
    //console.log("upload error target " + error.target);
}

function getSuppliersddl(){
    var url2=Storage.URL.GetSuppliers;
    console.log(url2);
    var LocationClass= 'lang=en';
    $.ajax({
        type: "GET",
        url: url2,
        data: LocationClass,
        success: OnGetSupplierComboSuccess,
        error: function (xhr, status, p3, p4) {
            var err = "Error " + " " + status + " " + p3;
            alert(err);
        }
    });
}


function getVAT() {
    var url2=Storage.URL.GetVAT;
    console.log(url2);
    var LocationClass= 'lang=en';
    $.ajax({
        type: "GET",
        url: url2,
        data: LocationClass,
        success: OnGetVATSuccess,
        error: function (xhr, status, p3, p4) {
            var err = "Error " + " " + status + " " + p3;
            alert(err);
        },
        complete: OnLocComplete
    });
}

function OnGetVATSuccess(data) {
    //console.log(data)
    $("#dvVAT").html("");
    //$('#dvVAT').html('VAT');

    try {
        for (var areaIterate = 0; areaIterate < data.length; areaIterate++) {
            //sResult += '<option value="' + data[areaIterate].ID + '" >' + data[areaIterate].LocationName + '</option>';

            VAT_RATE= data[areaIterate].VAT_Rate;
        }
        $("#dvVAT").html('VAT ('+VAT_RATE+'%)');
    } catch (err) {
        console.log(err);
    }


}

function getFlatsddl() {
    var url2=Storage.URL.GetFlats;
    console.log(url2);
    var LocationClass= 'lang=en';
    $.ajax({
        type: "GET",
        url: url2,
        data: LocationClass,
        success: OnGetFlatComboSuccess,
        error: function (xhr, status, p3, p4) {
            var err = "Error " + " " + status + " " + p3;
            alert(err);
        }
    });
}

function OnGetFlatComboSuccess(data) {
    console.log(data)
    $("#ddlFlats").html("");
    var sResult = '<option value="0" selected>' + 'Select Flat' + '</option>';
    try {
        for (var areaIterate = 0; areaIterate < data.length; areaIterate++) {
            sResult += '<option value="' + data[areaIterate].ID + '" >' + data[areaIterate].FlatNo +' -- '+ data[areaIterate].buildingName+ '</option>';
        }
        $("#ddlFlats").html(sResult);
        Util.showScreenLoader(false);
    } catch (err) {
        console.log(err);
    }
}

function OnGetSupplierComboSuccess(data) {
    console.log(data)

    $("#ddlSupplier").html("");
    var sResult = '<option name="0" value="0" selected>' + 'Select Agent' + '</option>';
    try {
        for (var areaIterate = 0; areaIterate < data.length; areaIterate++) {
            sResult += '<option name="' + data[areaIterate].Percentage + '" value="' + data[areaIterate].ID + '" >' + data[areaIterate].NameEn +' -- '+ data[areaIterate].Percentage+'%'+ '</option>';
        }
        $("#ddlSupplier").html(sResult);
    } catch (err) {
        console.log(err);
        Util.showScreenLoader(false);
    }
    Util.showScreenLoader(false);
}

function SetTotalAmount() {
    var ContractAmount=$('#t_Amount').html();//$('#t_Amount').val();
    var SupplierID=$('#ddlSupplier').val();
    var percentage=0;

    if(ContractAmount==''|| ContractAmount=='0' ||ContractAmount==0){
        myApp.alert('Set Contract Amount','Error');
        return false;
    }

    // if(SupplierID=='0' || SupplierID==0){
    //     myApp.alert('Select Supplier','Error');
    //     return false;
    // }

    percentage=$("#ddlSupplier option:selected").attr('name');
    if(percentage=='null'||percentage==null||percentage=='')
    {
        percentage=0;
    }

    var SuuplierAmount= parseFloat(ContractAmount) * parseFloat(percentage) / 100;

    console.log(SuuplierAmount);
    $('#t_SuppAmount').html(Math.round(SuuplierAmount));
    var amountforVAT=parseFloat(ContractAmount);
    var VATAmt= parseFloat(amountforVAT) * (parseFloat(VAT_RATE)/100);
    $('#t_VATAmount').html(VATAmt);
    $('#t_totalAmount').html((parseFloat(ContractAmount)- Math.round(SuuplierAmount)));
    $('#t_totalAmountx').html((parseFloat(ContractAmount))+VATAmt);
}


function SetAmount () {
    var rateAmount=$('#t_Rate').val();
    var NoOFNights=$('#t_duration').val();
    if(rateAmount!='' && rateAmount!='0' && NoOFNights!='' && NoOFNights!='0' ){
        var Amount=parseFloat(rateAmount)* parseFloat(NoOFNights);
        //$('#t_Amount').val(parseFloat(Amount));
        $('#t_Amount').html(parseFloat(Amount));//
        SetTotalAmount();
    }

}

function submitForm(){
    //alert(fd);

    var ChecksIn=$('#t_InDate').val();
    var Comment=$('#t_comments').val();
    var ContractAmount=$('#t_Amount').html();//$('#t_Amount').val();
    var FlatID=$('#ddlFlats').val();
    var SupplierAmount=$('#t_SuppAmount').html();
    var SupplierID=$('#ddlSupplier').val();
    var CustomerMobile=$('#t_mobile').val();
    var CustomerName=$('#t_name').val();
    var TotalAmount=$('#t_totalAmount').html();
    var VATAmount=$('#t_VATAmount').html();
    var VATRate=VAT_RATE;

    var PerNightRate=$('#t_Rate').val();
    var Duration=$('#t_duration').val();

    if(CustomerName==''){
        myApp.alert('Insert Customer Name','Error');
        return false;
    }

    if(FlatID=='0' || FlatID==0){
        myApp.alert('Select Flat','Error');
        return false;
    }
    if(ContractAmount==''|| ContractAmount=='0' ||ContractAmount==0){
        myApp.alert('Set Contract Amount','Error');
        return false;
    }
    var datastring = {
        ChecksIn: ChecksIn,
        Comment: Comment,
        ContractAmount:ContractAmount,
        FlatID:FlatID,
        SupplierAmount:SupplierAmount,
        SupplierID:SupplierID,
        CustomerMobile:CustomerMobile,
        CustomerName:CustomerName,
        TotalAmount:TotalAmount,
        Duration:Duration,
        PerNightRate:PerNightRate,
        VATAmount:VATAmount,
        VATRate:VATRate,
        filesNames:JSON.stringify(fd)
    }
    //myApp.alert(datastring.filesNames);
    var url2=Storage.URL.InsertRentals;

    $.ajax({
        type: "POST",
        url: url2,
        data: datastring,
        success: OnRentalInsertSuccess,
        error: function (xhr, status, p3, p4) {
            var err = "Error " + " " + status + " " + p3;
            myApp.alert(err,'Error');
        }//,
        //complete: OnFlatComplete
    });
}

function OnRentalInsertSuccess(data){

    myApp.alert('Record Inserted','Success');
    cancelForm()

}


function cancelForm(){
    $('#t_InDate').val('');
    $('#t_comments').val('');
    $('#t_Amount').html('0');
    $('#ddlFlats').val('');
    $('#t_SupplierAmount').val('');
    $('#ddlSupplier').val('');
    $('#t_mobile').val('');
    $('#t_name').val('');
    $('#t_SuppAmount').html('0');
    $('#t_totalAmount').html('0');
    $('#t_Rate').val('');
    $('#t_duration').val('');
    fd= [];
}