/**************************************************************************************
* AdWords - Management - Destination URL Checker 
* This script tests checks ad destination URLs for 404 HTTP Response Codes And Simply  
* Logs Results to the Console. Updated to handle Removed Ads and Dynamic Ads
* Version 1.1
* Created By: Derek Martin
* DerekMartinLA.com
**************************************************************************************/

function main() {
var campIter = AdWordsApp.campaigns().withCondition("Status = ENABLED").get();
while (campIter.hasNext()) {
 var camp = campIter.next();

  var adIter = camp.ads().withCondition("Status != DISABLED").get();

while (adIter.hasNext()) {

   var ad = adIter.next();
   
   Logger.log('Now checking ad #' + ad.getId());
   
    var destUrl = ad.getDestinationUrl();

  var options = { muteHttpExceptions: true };

    var response = UrlFetchApp.fetch(destUrl, options);
    var responseCode = response.getResponseCode();

  if (responseCode == 404.0) {
    Logger.log(camp.getName());
    Logger.log(ad.getAdGroup().getName());
    Logger.log(destUrl);
    Logger.log(ad.getApprovalStatus());
    Logger.log(response.getResponseCode());
  } else if (responseCode == 200.0) {
	  Logger.log('Ad OK -- 200 HTTP Response Code.');
	  
  }
}
}
}