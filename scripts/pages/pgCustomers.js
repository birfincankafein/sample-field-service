/*globals lang */
const extend = require("js-base/core/extend");
const Router = require("sf-core/ui/router");
const CustomerRow = require("../components/CustomerRow");
const pgCustomersDesign = require("../ui/ui_pgCustomers");
const Image = require('sf-core/ui/image');
const ListViewItem = require('sf-core/ui/listviewitem');
const StatusBarStyle = require('sf-core/ui/statusbarstyle');
const backAction = require("../lib/ui").backAction;
const theme = require("../lib/theme");

const pgCustomers = extend(pgCustomersDesign)(
    function(_super) {
        const page = this;
        _super(this);
        var baseOnLoad = page.onLoad;
        var baseOnShow = page.onShow;
        page.onLoad = function onLoad() {
            baseOnLoad && baseOnLoad();

            page.headerBar.title = lang.customers;

            Object.assign(page.btnAddCustomer, {
                text: "",
                borderRadius: 0,
                onPress: function() {
                    Router.go("pgNewCustomer");
                }
            });


            var lvCustomers = page.lvCustomers;
            var customerRowID = 149;
            lvCustomers.onRowCreate = function() {
                var lviCustomerRow = new ListViewItem();
                var customerRow = new CustomerRow({
                    //id: customerRowID,

                });
                lviCustomerRow.addChild(customerRow);
                return lviCustomerRow;
            };

            lvCustomers.onRowBind = function(lviCustomerRow, index) {
                var customerRow = lviCustomerRow.findChildById(customerRowID);
            };

            lvCustomers.onRowSelected = function(listViewItem, index) {
                Router.go("pgCustomerDetails", {
                    fields: [{
                        name: lang["Customer Number"],
                        value: "7645980"
                    }, {
                        name: lang["Mobile Phone"],
                        value: "+905337441232"
                    }, {
                        name: lang["Work Phone"],
                        value: "905337441232"
                    }, {
                        name: "Adress",
                        value: "PO Box 2364 Malta, NY 12030"
                    }, ],
                    actions: [{
                        name: "Notes",
                        text: lang["Notes"]
                    }, {
                        name: "Notification flow",
                        text: lang["Notification flow"]
                    }]
                });
            };

        };

        page.onShow = function onShow(data) {
            baseOnShow && baseOnShow(data);
            data && bindData(data);
            page.statusBar.ios.style = StatusBarStyle.LIGHTCONTENT;
            backAction(page);
            applyTheme();
        };

        function applyTheme() {
            var selectedTheme = theme[theme.selected];
            page.statusBar.android && (page.statusBar.android.color = selectedTheme.topBarColor);
            page.headerBar.backgroundColor = selectedTheme.topBarColor;

            page.btnAddCustomer.backgroundImage = {
                normal: selectedTheme.addCustomer
            };
        }

        function bindData(customerData) {
            page.lvCustomers.itemCount = customerData.length;
            page.lvCustomers.refreshData();
        }




    });



module && (module.exports = pgCustomers);
