/**
 * Created by FHK on 7/19/2017.
 */

//var mainURL = 'http://localhost:50309/api/';
var mainURL='http://farhanfhk-001-site1.itempurl.com/api/'


var open = false;
var c_open = false;
//var showOneTime = false;

var AppMode = "Live";
var Storage = {
    noOfMonths_NewServices: 3,
    VersionNotification: 'VersionNotification',
    Setting: 'settings',
    classSetting: {
        language: 'lan',
        Read: 'Read',
        lang: {
            english: 'EN',
            arabic: 'AR',
        },
    },

    login: {
        islogin: 'islogin',
        username: 'username',
        password: 'password',
        name_ar: 'name_ar',
        name_en: 'name_en',
        mobileNo: 'mobileNo',
        pic: 'pic',
        status: 'status',
        id: 'Id',
        isCustomer: 'isCustomer',
    },

    URL: {
        GetLocations: mainURL + 'Property/GetLocation',
        GetVAT: mainURL + 'Settings/GetSettings',
        InsertLocation: mainURL + 'Property/SetLocation',
        DeleteLocation:mainURL+'Property/DeleteLocation',

        GetFlats: mainURL + 'Flats/GetFlats',
        InsertFlat: mainURL + 'Flats/SetFlats',
        DeleteFlats:mainURL+'Flats/DeleteFlat',

        GetSuppliers: mainURL + 'Supplier/GetSuppliers',
        InsertSupplier: mainURL + 'Supplier/SetSuppliers',
        DeleteSuppliers:mainURL+'Supplier/DeleteSupplier',

        InsertRentals:mainURL + 'Rental/SetRental',
        GetRentals:mainURL + 'Rental/GetRentals',
        GetRentals2:mainURL + 'Rental/GetRentals2',
        MakeCheckOut:mainURL+'Rental/MakeCheckOut',
        GetRates:mainURL + 'rates/getRates'

    },

    //SessionStorage Paths//
    Path: {
        pathToRedirect: 'pathToRedirect',
        menu: 'menu',
        menuItem: '',
    }
}