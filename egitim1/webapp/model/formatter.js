sap.ui.define([], function () {
	"use strict";
	return {
        getTitleText: function(sTitle){
            if(sTitle === "dev"){
                return "Developer";
            }else if(sTitle === "techl"){
                return "Technical Lead";
            }else if(sTitle === "teaml"){
                return "Team Lead";
            }
        }
	};
});