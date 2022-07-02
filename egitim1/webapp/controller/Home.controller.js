sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "../model/formatter"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, MessageBox, formatter) {
        "use strict";

        return Controller.extend("renova.egitim1.controller.Home", {
            formatter: formatter,
            onInit: function () {
                var oJsonModel = new JSONModel();
                var aData = [
                    {
                        "name": "Ertuğrul",
                        "surname": "Pehlivan",
                        "id": "1",
                        "title": "teaml"
                    }
                ];
                oJsonModel.setData(aData);
                this.getView().setModel(oJsonModel, "EmployeeModel");
                //sap.ui.getCore().setModel(oJsonModel, "EmployeeModel"); 
            },
            onAddEmployee: function(){
                var oModel = new JSONModel({});
                this.getView().setModel(oModel, "NewEmployeeModel");
                this._getEmployeeDialog().open();
            },
            onSaveEmployee: function(){
                var sEmployeeDetail = this.getView().getModel("NewEmployeeModel").getData();

                //tablodaki data
                var oModel = this.getView().getModel("EmployeeModel");
                var aEmployee = oModel.getData();
                
                var iElementIndex = aEmployee.map(function(x){return x.id;}).indexOf(sEmployeeDetail.id);
                if(iElementIndex !== -1){
                    aEmployee.splice(iElementIndex,1);
                }

                aEmployee.push(sEmployeeDetail);
                oModel.setData(aEmployee);

                this._getEmployeeDialog().close();

            },
            onEditEmployee: function(oEvent){
                var sEmployeeDetail = oEvent.getSource().getBindingContext("EmployeeModel").getProperty();
                var oModel = new JSONModel(sEmployeeDetail);
                this.getView().setModel(oModel, "NewEmployeeModel");
                this._getEmployeeDialog().open();
            },
            onAfterCloseDialog: function(){
                var oModel = new JSONModel({});
                this.getView().setModel(oModel, "NewEmployeeModel");
            },
            onDeleteEmployee: function(oEvent){
                var that = this;
                var sEmployeeDetail = oEvent.getSource().getBindingContext("EmployeeModel").getProperty();
                var vId = sEmployeeDetail.id;

                MessageBox.error("Veri silinecek devam etmek istiyor musunuz ? ", {
                    actions: [MessageBox.Action.OK],
                    onClose: function (sAction) {
                        if(sAction === "OK"){
                            that.onDeleteConfirmEmployee(vId);
                        }                                                                       
                    }
                });
            },
            onDeleteConfirmEmployee: function(vId){
                var oModel = this.getView().getModel("EmployeeModel");
                var aEmployee = oModel.getData();
                var iElementIndex = aEmployee.map(function(x){return x.id;}).indexOf(vId);
                if(iElementIndex !== -1){
                    aEmployee.splice(iElementIndex,1);
                    oModel.setData(aEmployee);
                }
            },  
            _getEmployeeDialog: function () {			
                this._oEmployeeDialog = sap.ui.getCore().byId("dialogEmployee");			
                if (!this._oEmployeeDialog) {				
                    this._oEmployeeDialog = sap.ui.xmlfragment("renova.egitim1.fragments.Employee", this); 
                    this.getView().addDependent(this._oEmployeeDialog);
                    jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oEmployeeDialog);	
                }			
                return this._oEmployeeDialog;		
            },    
            onAfterRendering: function(){

            },
            onBeforeRendering: function(){

            },
            onExit: function(){

            }
        });
    });
