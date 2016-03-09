// bring in other modules by putting into []
angular
    .module("ngClassifieds", ["ngMaterial", 'ui.router', 'firebase'])
    .config(function($mdThemingProvider, $stateProvider, $urlRouterProvider){
    
        $mdThemingProvider.theme('default')
            .primaryPalette('teal')
            .accentPalette('orange');
    
        // REDIRECT USERS TO '/CLASSIFIEDS' AS A DEFAULT
        $urlRouterProvider.otherwise("/classifieds"); 
    
        $stateProvider 
            .state('classifieds', {
                url: '/classifieds',
                templateUrl: 'components/classifieds/classifieds.tpl.html',
                controller: 'classifiedsCtrl as vm'
            })
            .state('classifieds.new', {
                url: '/new',
                templateUrl: 'components/classifieds/new/classifieds.new.tpl.html',
                controller: 'newClassifiedsCtrl as vm'
            })
            .state('classifieds.edit', {
                url: '/edit/:id',
                templateUrl: 'components/classifieds/edit/classifieds.edit.tpl.html',
                controller: 'editClassifiedsCtrl as vm',
                params: {
                    classified: null // empty parameter to start (from classified id)
                }
            })
    })