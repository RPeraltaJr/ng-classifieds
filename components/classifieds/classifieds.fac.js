(function() {
    
    "use strict";
    
    angular
        .module("ngClassifieds")
        .factory("classifiedsFactory", function($http, $firebaseArray) {
        
            // function getClassifieds(){
            //   return $http.get('data/classifieds.json'); DATA EXISTS LOCALLY
            // }
        
            var ref = new Firebase('https://<FIREBASE-URL>.firebaseio.com');
        
            return {
                // getClassifieds: getClassifieds
                ref: $firebaseArray(ref)
            }
        
    });
    
})();