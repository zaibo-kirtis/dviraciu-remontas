/* ngInject */
export function AlertDirective() {
    return {
        restrict: 'E',
        templateUrl: 'alert.html',
        scope: {
            message: '='
        },
        link: function( $scope ) {
            $scope.close = () => $scope.message = null;
        }
    }
}