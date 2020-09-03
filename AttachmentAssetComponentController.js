({
    
    downloadfile : function (component, event, helper){
        var actiondownload = component.get("c.loadContentVersion");
        actiondownload.setCallback(this, function(response){
        var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.base64Value", response.getReturnValue());
            }
            else {
                console.log("Failed with state: " + state);
            }
        });
        $A.enqueueAction(action);
    }
});

    
    
