// create angular app
(function(){
'use strict';
angular.module('app', [])
.controller('Conttlusers',ConttlCrud);

function ConttlCrud($http){
	var vm = this;//$scope
	vm.pr='gato';
	vm.errores= [{name:'no hay'}];
	
	//models empty
	vm.modelSave= {
		username: '',
		password: ''
	};

	vm.tokenurl= location.origin+'/token';

	vm.urlSearch = (location.search)? true : false;
	if(vm.urlSearch){
		vm.tokenurl= vm.tokenurl+'?code='+getUrlVars().code;
	}

	//init
	init();
	
	//initialized
	function init(){
	  //call it here
		vm.toSave = angular.copy(vm.modelSave);
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

	vm.saveUser = function(){
		var req = {
			method: 'post',
			url: '/api/users',
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
