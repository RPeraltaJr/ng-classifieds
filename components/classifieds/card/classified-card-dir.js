(function() {
    
    "use strict";
    
    angular 
        .module("ngClassifieds")
        .directive("classifiedCard", function(){
            return {
                templateUrl: 'components/classifieds/card/classified-card-tpl.html',
                scope: {
                    classifieds: "=classifieds", // coming in from classifieds.tpl.html (line 48)
                    classifiedsFilter: "=classifiedsFilter", // coming in from classifieds.tpl.html (line 48)
                    category: "=category" // coming in from classifieds.tpl.html (line 48)
                },
                controller: classifiedCardController,
                controllerAs: "vm"
            }
            
            function classifiedCardController($state, $scope, $mdDialog) {
                
                // Set up local capture variable
                var vm = this;
                vm.editClassified = editClassified;
                vm.deleteClassified = deleteClassified;
            
                // Edit Current Classified
                // Classified parameter passed from the view
                function editClassified(classified) {
                    $state.go('classifieds.edit', {
                        id: classified.$id // $id for firebase ID
                    });
                }
                
                // Delete Current Classified
                // Classified parameter passed from the view
                function deleteClassified(event, classified) {
                    // mdDialog Confirm
                    var confirm = $mdDialog.confirm()
                        .title('Are you sure you want to delete ' + classified.title + '?')
                        .ok('Yes')
                        .cancel('No')
                        .targetEvent(event);
                    $mdDialog.show(confirm).then(function() { // If 'Yes' is clicked...
                        vm.classifieds.$remove(classified);
                        showToast('Classified deleted!')
                    }, function() { // What happens if the 'No' button is clicked...
                        // Nothing
                    });
                }
                
                // Toast Message Function
                function showToast(message) {
                    // Toast/Pop up from Angular Material
                    $mdToast.show(
                        $mdToast.simple()
                            .content(message)
                            .position('top, right')
                            .hideDelay(3000)
                    );
                }
                
            }
    })
})();