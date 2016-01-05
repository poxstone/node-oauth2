// create angular app
(function(){
'use strict';
angular.module('app', [])
.controller('ContAuthorize',ConttlCrud);

function ConttlCrud($http){
	var vm = this;//$scope
	vm.pr='gato';
	vm.errores= [{name:'no hay'}];
	
	//models empty
	vm.modelSave= {
		name: '',
		passwidord: '',
		secret: ''
	};

	//init
	init();
	
	//initialized
	function init(){
	  //call it here
		vm.toSave = angular.copy(vm.modelSave);
	};

	vm.saveUser = function(){
		var req = {
			method: 'post',
			url: '/oauth2/authorize',
			headers: {
			  'Content-Type': 'application/json; charset=utf-8'
			},
			data: vm.toSave
		};
		
		$http(req).then(

			function(res){
				vm.users = res.data;
				vm.toSave = angular.copy(vm.modelSave);
				vm.errores= ['status saveusers: ',res];
				
			},
			function(res){
				vm.errores= ['erro save: ',res];
			}

		);
	};
	
}
})();
