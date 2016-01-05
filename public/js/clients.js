// create angular app
(function(){
'use strict';
angular.module('app', [])
.controller('ConttlClients',ConttlCrud);

function ConttlCrud($http){
	var vm = this;//$scope
	vm.pr='gato';
	vm.errores= [{name:'no hay'}];
	
	//models empty
	vm.modelSave= {
		name: '',
		passwidord: '',
		secret: '',
		redirect_uri: location.origin+'/'
	};
	vm.oauth2Href = null;

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
			url: '/api/clients',
			headers: {
			  'Content-Type': 'application/json; charset=utf-8'
			},
			data: vm.toSave
		};
		
		$http(req).then(

			function(res){
				vm.users = res.data;
				vm.oauth2Href = location.origin+'/oauth2/authorize?client_id='+res.data.data.id+'&response_type=code&redirect_uri='+ vm.toSave.redirect_uri;
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
