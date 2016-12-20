/* @ngInject */
export function BuilderDirective() {
    return {
        restrict: 'E',
        templateUrl: 'builder.html',
        scope: {
            model: '=model',
            map: '=itemsMap',
            id: '@builderId',
            addLabel: '@addLabel'
        },
        controllerAs: 'builder',
        controller: function( $controller, $scope ) {
            let self = this;
            $controller( 'BaseController', { vm: self });

            $scope.$watch( 'model', (model) => self.model = model || []);
            $scope.$watch( 'map', (map) => self.map = map || [] );
            $scope.$watch( 'id', (id) => self.id = id);
            $scope.$watch( 'addLabel', (addLabel) => self.addLabel = addLabel);

            self.updateValue = function( index, val ) {
                self.model[ index ] = val;
            };

            self.addItem = function() {
                self.model.push(null);
            };

            self.removeItem = function( index ) {
                self.model.splice( index, 1 );
            }
        }
    }
}