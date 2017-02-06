/**
 * @ngdoc function
 * @name aaal.controller:ToysCtrl
 * @description
 * # ToysCtrl
 * Controller of the aaal
 */

(function() {
    'use strict';

    angular
        .module('aaal')
        .controller('ToysListCtrl', ToysListCtrl);

    /* @ngInject */
    function ToysListCtrl(Toys) {
        var vm = this;
        var ModelService = Toys;

        function loadModel() {
            vm.rowCollection = ModelService.find();
        }

        vm.viewState = 'private.ToysView';
        vm.editState = 'private.ToysEdit';

        /**
         * you can add columns and add filters to them like so
         * {name:'modelPropertyName': filter:'date:dd/MM/yy'}
         */
        vm.columns = [
            'id',
            'title'
        ];

        //remove to the real data holder
        vm.removeItem = function removeItem(row) {
            var index = vm.rowCollection.indexOf(row);

            if (index !== -1) {
                vm.rowCollection.splice(index, 1);

                return ModelService.deleteById({id: row.id})
                    .$promise
                    .then(function() {
                        loadModel();
                    }, function() {
                        loadModel();
                    });
            }
        };

        // INIT
        loadModel();
    }
})();