(function() {
    
    "use strict";
    
    angular
        .module('ngClassifieds')
        .controller('newClassifiedsCtrl', function($scope, $state, $mdSidenav, $timeout, $mdDialog, classifiedsFactory){
        
            var vm = this;
            vm.closeSidebar = closeSidebar;
            vm.saveClassified = saveClassified;
        
            // $scope.$broadcast - used if we want to broadcast data to child scopes
            // $scope.$emit - used if we want to emit data to parent scopes
        
            $timeout(function() {
                $mdSidenav('left').open();
            });
        
            // Setting Up Watchers
            // $scope.$watch('vm.valueToChange', function(value){})
            $scope.$watch('vm.sidenavOpen', function(sidenav){
                if (sidenav === false) {
                    $mdSidenav('left')
                        .close()
                        .then(function() { // then navigate to classifieds
                            $state.go('classifieds');
                        });
                }
            });

            function closeSidebar() {
                vm.sidenavOpen = false;
            }    
        
            function saveClassified(classified) {
                if(classified) {
                    // This information would come from the user's profile, but we'll set this info as default
                    var contact = {
                        name: "John Doe",
                        phone: "(555) 555-5555",
                        email: "johndoe@mail.com"
                    }
                    
                    $scope.$emit('newClassified', classified);
                    vm.sidenavOpen = false;
                }
            }
        
        });
})();