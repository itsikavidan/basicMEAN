/**
 * Created by avidan on 08-05-16.
 */
(function () {
	'use strict';

	angular.module('ChatApp',[
		'ui.router'
	]).config(function($stateProvider, $urlRouterProvider) {
		//
		// For any unmatched url, redirect to /state1
		$urlRouterProvider.otherwise("/state1");
		//
		// Now set up the states
		$stateProvider
			.state('home',{
				url:"/home",
				templateUrl:"views/home/homeView.html",
				controller :'HomeCtrl',
				controllerAs:'vm'
			})
			.state('teams',{
				url:"/teams",
				templateUrl:"views/teams/teamsView.html",
				controller : 'TeamsCtrl',
				controllerAs : 'vm'
			})
			.state('teamP',{
				url:"/teams/:teamCode",
				templateUrl:"views/team/teamView.html",
				controller : 'TeamCtrl',
				controllerAs : 'vm'
			})
			.state('prediction',{
				url:"/prediction",
				templateUrl:"views/prediction/predictionView.html",
				controller : 'PredictionCtrl',
				controllerAs : 'vm'
			})

	});

})();
