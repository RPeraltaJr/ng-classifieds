/* MAIN CLASSIFIEDS CONTROLLER */

// With this approach we won't be polluting the global scope
// Anything we write in here will be contained to this function

(function() {
    
    "use strict";
    // Declare module without the [], otherwise it declares a new/separate module
    angular
        .module("ngClassifieds")
        .controller("classifiedsCtrl", function($scope, $state, $http, classifiedsFactory, $mdSidenav, $mdToast, $mdDialog){
        
            // Capture 'this' with a defined variable
            var vm = this;
        
            // Replaced '$scope' with 'vm' to use in the view
            vm.categories;
            vm.classified;
            vm.classifieds;
            vm.closeSidebar = closeSidebar;
            vm.deleteClassified = deleteClassified;
            vm.editClassified = editClassified;
            vm.editing;
            vm.openSidebar = openSidebar;
            vm.saveClassified = saveClassified;
            vm.saveEdit = saveEdit;
        
            vm.classifieds = classifiedsFactory.ref; // output our data from firebase
        
            // Wait until all data is loaded, then get categories from each classified
            vm.classifieds.$loaded().then(function(classifieds) {
                vm.categories = getCategories(classifieds);
            })
        
            $scope.$on('newClassified', function(event, classified) {
                // Not needed b/c Firebase creates its own IDs
                    // classified.id = vm.classifieds.length + 1; // ID of the new classified
                    // vm.classifieds.push(classified);
                vm.classifieds.$add(classified);
                showToast('Classified saved!');
            });
        
            $scope.$on('editSaved', function(event, message) {
                showToast(message);
            });
        
            // This information would come from the user's profile, but we'll set this info as default
            var contact = {
                name: "John Doe",
                phone: "(555) 555-5555",
                email: "johndoe@mail.com"
            }
        
            // Open Sidebar
            function openSidebar() {
                // With id of 'left'
                $state.go('classifieds.new');
                // $mdSidenav('left').open();
            }
            
            // Close Sidebar
            function closeSidebar() {
                // With id of 'left'
                $mdSidenav('left').close();
            }
            
            // Save Classified
            function saveClassified(classified) {
                // Check if there is at least one property for new object
                if(classified) {
                    // Default User contact info
                    classified.contact = contact;
                    // Classified push function
                    vm.classifieds.push(classified);  
                    // Empty out fields (classified object) right after adding
                    vm.classified = {};
                    // Close sidebar when we add new item
                    // $mdSidenav('left').close();
                    closeSidebar();
                    showToast("Classified saved!");
                }
            }
            
            // Edit Current Classified
            // Classified parameter passed from the view
            function editClassified(classified) {
                $state.go('classifieds.edit', {
                    id: classified.$id // $id for firebase ID
                });
            }
            
            // Save Edit
            function saveEdit() {
                vm.editing = false;
                // Clear out the form
                vm.classified = {};
                // Close sidebar
                // $mdSidenav('left').close();
                closeSidebar();
                showToast("Edit saved!");
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
        
            // To grab categories section for each of our items
            function getCategories(classifieds) {
                // set vategories to an empty array
                var categories = [];
                angular.forEach(classifieds, function(item) {
                    angular.forEach(item.categories, function(category) {
                        categories.push(category);
                    });
                });
                // alert(categories); // Vehicles, Parts and Accessories, Clothing, Furniture, Electronics, Computer Parts and Accessories, Vehicles, Cars
                return _.uniq(categories); // Returns only unique categories (no duplicates)
            }
        
            // Import our data to firebase (lines 163 - 276)
//            var data = [
//              {
//                "id":"1",
//                "title":"20 Foot Equipment Trailer",
//                "description":"2013 rainbow trailer 20 feet x 82 inch deck area, two 5,000 lb axels, electric brakes, two pull out ramps, break away box, spare tire.",
//                "price":6000,
//                "posted":"2015-10-24",
//                "contact": {
//                  "name":"John Doe",
//                  "phone":"(555) 555-5555",
//                  "email":"johndoe@gmail.com"
//                },
//                "categories":[
//                  "Vehicles",
//                  "Parts and Accessories"
//                ],
//                "image": "http://www.louisianasportsman.com/classifieds/pics/p1358549934434943.jpg",
//                "views":213
//              },
//              {
//                "id":"2",
//                "title":"Canada Goose Jacket",
//                "description":"Red woman's Canada Goose Montebello jacket. It was used for two seasons. This jacket retails for $745. The jacket has been professionally cleaned since it was last worn by anyone.",
//                "price": 500,
//                "posted": "2015-10-28",
//                "contact": {
//                  "name": "Jane Doe",
//                  "phone": "(555) 555-5555",
//                  "email": "janedoe@gmail.com"
//                },
//                "categories": [
//                  "Clothing"
//                ],
//                "image":"http://canadagoose-jacket.weebly.com/uploads/9/2/3/3/9233177/9087323_orig.jpg",
//                "views":422
//              },
//              {
//                "id":"3",
//                "title":"Baby Crib and Matress",
//                "description":"Good condition.",
//                "price":50,
//                "posted":"2015-10-27",
//                "contact": {
//                  "name":"Jane Doe",
//                  "phone":"(555) 555-5555",
//                  "email":"janedoe@gmail.com"
//                },
//                "categories":[
//                  "Furniture"
//                ],
//                "image":"http://images.landofnod.com/is/image/LandOfNod/Crib_Anderson_Nat_V1/$web_setitem$/1308310657/andersen-crib-maple.jpg",
//                "views":23
//              },
//              {
//                "id":"4",
//                "title":"Leather Sofa",
//                "description":"Brown leather sofa for sale.  Good condition but small tear on one cushion.",
//                "price":250,
//                "posted":"2015-11-01",
//                "contact": {
//                  "name":"John Doe",
//                  "phone":"(555) 555-5555",
//                  "email":"johndoe@gmail.com"
//                },
//                "categories":[
//                  "Furniture"
//                ],
//                "image":"http://images2.roomstogo.com/is/image/roomstogo/lr_sof_14163214_grandpalazzo_black~Cindy-Crawford-Home-Grand-Palazzo-Black-Leather-Sofa.jpeg?$PDP_Primary_525x366$",
//                "views":77
//              },
//              {
//                "id":"5",
//                "title":"MacBook Air",
//                "description":"2013 MacBook Air. Great condition, but a few scratches.",
//                "price":1150,
//                "posted":"2015-11-02",
//                "contact": {
//                  "name":"John Doe",
//                  "phone":"(555) 555-5555",
//                  "email":"johndoe@gmail.com"
//                },
//                "categories":[
//                  "Electronics",
//                  "Computer Parts and Accessories"
//                ],
//                "image":"http://www9.pcmag.com/media/images/357361-apple-macbook-air-13-inch-2014-angle.jpg",
//                "views":889
//              },
//              {
//                "id":"6",
//                "title":"2008 Dodge Caliber",
//                "description":"Battery blanket and block heater installed. Winter tires, good tread left are on the car currently. Car comes with 4 summer tires with also good treads left. Hydraulic power steering fluid line installed so this won't break on you in the cold Yellowknife winters! Synthetic oil used, good for 1000+ more KMs. AC/Sunroof/power doors/steering, CD player/radio. Red accented dash and upolstry.",
//                "price":4800,
//                "posted":"2015-11-03",
//                "contact": {
//                  "name":"John Doe",
//                  "phone":"(555) 555-5555",
//                  "email":"johndoe@gmail.com"
//                },
//                "categories":[
//                  "Vehicles",
//                  "Cars"
//                ],
//                "image":"http://images.buysellsearch.com/image/orig/8dfc4f6c5d411130d19dedd28d61bc2b/2009-dodge-caliber-se.jpg",
//                "views":423
//              }
//            ]
//            
//            var firebase = classifiedsFactory.ref;
//        
//            angular.forEach(data, function(item) {
//                firebase.$add(item);
//            });
//        
    });
    
})();