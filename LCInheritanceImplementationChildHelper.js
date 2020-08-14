({
    getAllAccounts : function(component, helper) {
        //Calling base component's controller method
        helper.getDataFromServer(component,
                                 "c.getAccounts",
                                 function(response){
                                     if(response){
                                         component.set("v.ListAcc", response);
                                     }
                                 }
                                );
    },
})
