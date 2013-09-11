sap.ui.controller("leaverequest.login", {


/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
*/
//   onInit: function() {
//
//   },

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
*/
//   onBeforeRendering: function() {
//
//   },

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
*/
//   onAfterRendering: function() {
//
//   },

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
*/
//   onExit: function() {
//	 
//   },
	
	doLogin : function() {
		
    	var username = sap.ui.getCore().byId("username").getValue();
    	var password = sap.ui.getCore().byId("password").getValue();
    	
    	form = {username: username, password: password};


    	
    	
    	
        var data;
        data = '<?xml version="1.0" encoding="utf-8"?>';
        data  =  data  +  '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:glob="http://sap.com/xi/SAPGlobal20/Global">'; 
        data  =  data  +     '<soap:Header/>';
        data  =  data  +     '<soap:Body>';          
        data  =  data  +        '<glob:CustomerByElementsQuery_sync>';
        data  =  data  +           '<CustomerSelectionByElements>';
        data  =  data  +              '<SelectionByInternalID>';
        data  =  data  +                 '<InclusionExclusionCode>I</InclusionExclusionCode>';
        data  =  data  +                 '<IntervalBoundaryTypeCode>1</IntervalBoundaryTypeCode>';
        data  =  data  +                 '<LowerBoundaryInternalID>1000000</LowerBoundaryInternalID>';
        data  =  data  +              '</SelectionByInternalID>';
        data  =  data  +           '</CustomerSelectionByElements>';
        data  =  data  +        '</glob:CustomerByElementsQuery_sync>';
        data  =  data  +     '</soap:Body>';
        data  =  data  +  '</soap:Envelope>';
        alert(data);
//      params[gadgets.io.RequestParameters.CONTENT_TYPE]= 'application/soap+xml; charset=UTF-8';
  //      params[gadgets.io.RequestParameters.HEADERS]={"SOAPAction":"http://sap.com/xi/A1S/Global/QueryCustomerIn/FindByElementsRequest",                                                                             "Content-Type":"application/soap+xml; charset=UTF-8"};
        //var URL="https://my307220.sapbydesign.com/sap/bc/srt/scs/sap/querycustomerin1?sap-vhost=my307220.sapbydesign.com";
        var URL="/ByD-Accounts/proxy/my307220__public/sap/bc/srt/scs/sap/querycustomerin1?sap-vhost=my307220.sapbydesign.com";
    	
    	
    	
    	
    	$.ajax({ 
			 type: 'POST', 
			 url: URL,
			 data: data,
			 dataType: 'xml',
			 contentType: "application/soap-xml; charset=\"utf-8\"",
			 beforeSend: function( xhr ){
				// Pass the action onto the proxy.
				xhr.setRequestHeader(
				"SOAPAction",
				"http://sap.com/xi/A1S/Global/QueryCustomerIn/FindByElementsRequest"
				);
				},			 
			 success: function(data) {
				 alert(data);
				 /*
				 var loginData = $.trim(data);
				 if (loginData == "NOK") 
				 {
					alert('Login failed! Please try again');
				 } 
				 else 
				 {
					var oView = sap.ui.getCore().byId("view.shell");
					var oCtrl = oView.getController();
					oCtrl.navigateToView(loginData);
				 }
				*/
			}
 	    });	
	}
});
