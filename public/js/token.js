// create angular app
(function(){
'use strict';
angular.module('app', [])
.controller('ContToken',ConttlCrud);

function ConttlCrud($http){
	var vm = this;//$scope
	vm.errores= [{name:'no hay'}];
	
	//models empty
	vm.modelSave= {
		code: '',
		grant_type: '',
		redirect_uri: ''
	};

	//init
	init();
	
	//initialized
	function init(){
	  //call it here
		vm.toSave = angular.copy(vm.modelSave);
		vm.toSave.code= getUrlVars().code;
		vm.toSave.grant_type= 'authorization_code';
		vm.toSave.redirect_uri= location.origin+'/';
	};

	function getUrlVars(){
	  var vars = [], hash;
	  var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	  for(var i = 0; i < hashes.length; i++)
	  {
      hash = hashes[i].split('=');
      vars.push(hash[0]);
      vars[hash[0]] = hash[1];
	  }
	  return vars;
	}

	vm.sendCode = function(){
		var req = {
			method: 'post',
			url: '/oauth2/token',
			headers: {
			  'Content-Type': 'application/json; charset=utf-8'
			},
			data: vm.toSave
		};
		
		$http(req).then(

			function(res){
				vm.users = res.data;
				vm.toSave = angular.copy(vm.modelSave);
				vm.errores= ['status sendCodes: ',res];
			},
			function(res){
				vm.errores= ['erro save: ',res];
			}

		);
	};
	
}
})();
