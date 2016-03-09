(function() {
    
    "use strict";
    
    /* ANGULAR FIRE DOC 
    https://www.firebase.com/docs/web/libraries/angular/api.html#angularfire */
    
    angular
        .module('ngClassifieds')
        .controller('editClassifiedsCtrl', function($scope, $state, $mdSidenav, $timeout, $mdDialog, classifiedsFactory){
        
            var vm = this;
            vm.classifieds = classifiedsFactory.ref;
            vm.closeSidebar = closeSidebar;
            vm.saveEdit = saveEdit;
            vm.classified = vm.classifieds.$getRecord($state.params.id); // take ID that is coming through that way when we edit an item we get the 'edit/id' on the URL
        
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
            
            // Look for 'classifieds.ctr.js' line 42
            // vm.sendMessage = function() {
            //     $scope.$emit('myMessage', 'hey, how are you?');
            // }
        
            function saveEdit(classified) {
                vm.classifieds.$save(vm.classified).then(function(){
                    $scope.$emit('editSaved', 'Edit saved!');
                    vm.sidenavOpen = false;  
                })
            }
        
        
        });
})();