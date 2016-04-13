angular.module('gerenciadorErp').filter('replaceSpaceToUndercore', function(){
  return function(input){
    if(input) return input.replace(/[^a-z_]/g, '-');
  };
});
