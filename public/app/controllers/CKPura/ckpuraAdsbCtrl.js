angular.module('ckpuraAdsbCtrl', ['angularUtils.directives.dirPagination', 'ckpuraAdsbService'])

    .controller('ckpuraAdsbController', function(Adsb, $scope, $http) {

        var vm = this;

        vm.processing = true;

        vm.v = [];

        Adsb.all()
            .success(function(data) {
                vm.processing = false;

                vm.message = 'in power monitoring';


                $scope.data = data;

                $scope.sortKey = 'time';
                $scope.reverse = !$scope.reverse;

                console.log(data);

            });

        $scope.sort = function(keyname){
            $scope.sortKey = keyname;   //set the sortKey to the param passed
            $scope.reverse = !$scope.reverse; //if true make it false and vice versa
        }

    });

