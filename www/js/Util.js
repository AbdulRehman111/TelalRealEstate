/**
 * Created by FHK on 7/25/2017.
 */

var Util = {

    networkConnectionStatus: false,
    deleteFavItemID: "",
    monthNames: new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"),
    picFileToUpload: "",


    showScreenLoader: function (flag) {
        if (flag) {
            //myApp.showPreloader();
            myApp.showIndicator();
        } else {
            //myApp.hidePreloader();
            myApp.hideIndicator();
        }
    },

}
