let OneSignal = require('onesignal-node');

const OneSignal_notifications = (req, res, next)=>{
  
try{
 //console.log(req.body,'respdata')
    var myClient = new OneSignal.Client({
        userAuthKey: 'Y2RlMWE2YTctMTM3Ni00MDJjLWI5MmMtMWNjNjE3Y2M3N2Zi',
    app: { appAuthKey: 'MjRiMmExZWQtOTBlYS00ODAwLTlhZDgtNWI5OGNmNjYwMzUz', appId: '0734fcfe-2359-4856-909f-89475e82a65b' }
   

});
      
// we need to create a notification to send    
var firstNotification = new OneSignal.Notification({    
    contents: {    
        en: req.body.message,    
        tr: "Test mesajı"    
    }    
});    
    
// set target users    
firstNotification.postBody["included_segments"] = ["All"];    
     
firstNotification.postBody["headings"] =  {"en":req.body.title, "es": req.body.title};
  
//firstNotification.postBody["big_picture"] ="https://cdn.pixabay.com/photo/2018/01/21/01/46/architecture-3095716_960_720.jpg";
 // small_icon: "resource_name", // can not be an url
firstNotification.postBody["large_icon"] = req.body.large_icon;
// set notification parameters    
firstNotification.postBody["data"] = {"abc": "123", "foo": "bar"};    
// firstNotification.postBody["send_after"] = 'Thu Sep 24 2015 14:00:00 GMT-0700 (PDT)';  
   
// send this notification to All Users except Inactive ones    
myClient.sendNotification(firstNotification, function (err, httpResponse,data) {    
   if (err) {    
     //  console.log('Something went wrong...');    
   } else {    
      // console.log(data, httpResponse.statusCode); 
       res.json({msg:"true"})   
   }    
});    
}
catch (error) {
  //  console.log(error)
    res.json({
        error
    })
}
}

  
   
export default {
    OneSignal_notifications
}
