angular.module('gerenciadorErp').service('PageService', function($rootScope){
    return {
        setTitle: function(title){
            $rootScope.title = title;
        }
    }
});
