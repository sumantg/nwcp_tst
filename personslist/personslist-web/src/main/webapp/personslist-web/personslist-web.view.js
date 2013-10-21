sap.ui.jsview("personslist-web.personslist-web", 
	{

      getControllerName : function() 
      {
         return "personslist-web.personslist-web";
      },

      createContent : function(oController) 
      {

/* 
    	  // Create a button
    	  var mybutton	=	new sap.ui.commons.Button("btn");
    	  
    	  // Set button text
    	  mybutton.setText("My button");
    	  
    	  // Add an Action handler to onClick
    	  mybutton.attachPress(function(){$("#btn").fadeOut();});
    	  
    	  return mybutton;
*/ 

      // Add a table to display first name and last name
    	  var oTable = new sap.ui.table.Table({title:"MyTable", 
    		  									visibleRowCount:7,
    		  									selectionMode:sap.ui.table.SelectionMode.Single
    	  										});
    	  
    	  var mytoolbar = 
//    	  toolbar: new sap.ui.commons.toolbar({ id: "MyToolbar",
    	  new sap.ui.commons.Toolbar({ id: "MyToolbar",
					items:[//new sap.ui.commons.Label({text:"lblLastName"}),
						new sap.ui.commons.TextField({id:"iptLastName"}),
						//new sap.ui.commons.Label({text:"lblFirstName"}),
						new sap.ui.commons.TextField({id:"iptFirstName"})
					]
				});
    	  var lblLastName = new sap.ui.commons.Label({text:"lblLastName"});
    	  lblLastName.setLabelFor(sap.ui.getCore().getControl("iptLastName"));
    	  mytoolbar.addItem(lblLastName);

    	  var lblFirstName = new sap.ui.commons.Label({text:"lblFirstName"});
    	  lblFirstName.setLabelFor(sap.ui.getCore().getControl("iptFirstName"));
    	  mytoolbar.addItem(lblFirstName);
    	  
    	  oTable.setToolbar(mytoolbar);
    	  var myButton = new sap.ui.commons.Button({text:"Add Person",
			press:function(){ oController.addPerson(sap.ui.getCore().getControl("iptLastName").getValue(),
			        			  sap.ui.getCore().getControl("iptFirstName").getValue(),
							      oTable);
			}
		});
    	  mytoolbar.addItem(myButton);
    	  //sap.ui.getCore().getControl("Mytoolbar").addItem( new sap.ui.commons.Button({text:"Add Person"}) //,
																						//press:function(){ //oController.addPerson(sap.ui.getCore().getControl("iptLastName").getValue(),
																											//        			  sap.ui.getCore().getControl("iptFirstName").getValue(),
																												//			      oTable);
																							//			}
																					//		})
			//												);

    	  
    	  //sap.ui.getCore().getControl("lblFirstName").setLabelFor(sap.ui.getCore().getControl("iptFirstName"));
    	  //sap.ui.getCore().getControl("lblLastName").setLabelFor(sap.ui.getCore().getControl("iptLastName"));
    	  
    	  
    	  // Setup the columns now
    	  oTable.addColumn(new sap.ui.table.Column({label:new sap.ui.commons.Label({text:"First Name"}),
    			  									template:new sap.ui.commons.TextField().bindProperty("value","FirstName"),
    			  									sortProperty:"FirstName",
    			  									filterProperty:"FirstName",
    			  									width:"100px"
    	  											})
    	  					);

    	  oTable.addColumn(new sap.ui.table.Column({label:new sap.ui.commons.Label({text:"Last Name"}),
														template:new sap.ui.commons.TextField().bindProperty("value","LastName"),
														sortProperty:"LastName",
														filterProperty:"LastName",
														width:"200px"
    	  											})
    	  );
    	  oTable.bindRows("/Persons");
    	  return oTable;
    	  
    	  
      }
      
	}
	
);
