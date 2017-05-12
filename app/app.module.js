var app = angular.module('museumApp', [
	'ngMessages',
    'bsLoadingOverlay',
    'bsLoadingOverlayHttpInterceptor',
    'ui.router',
    'ui.bootstrap',
	'angular-loading-bar',
	'cfp.loadingBar',
	'ngAnimate'
	])
.factory('allHttpInterceptor', function(bsLoadingOverlayHttpInterceptorFactoryFactory) {
    return bsLoadingOverlayHttpInterceptorFactoryFactory();
})
.config(function($httpProvider) {
    $httpProvider.interceptors.push('allHttpInterceptor');
}).run(function(bsLoadingOverlayService) {
    bsLoadingOverlayService.setGlobalConfig({
        templateUrl: 'views/users/loading-overlay-template.html'
    });
});

app.directive('validFile', function ($parse) {
    return {
        require: 'ngModel',
        restrict: 'A',
        link: function (scope, el, attrs, ngModel) {
            var model = $parse(attrs.ngModel);
            var modelSetter = model.assign;
            var maxSize = 10;
            el.bind('change', function () {
                scope.$apply(function () {
                    console.log(el[0].files)
                    if (el[0].files.length > 1) {
                        modelSetter(scope, el[0].files)
                    } else{
                        modelSetter(scope, el[0].files[0])
                    }
                    var fileSize = el[0].files[0].size/1024/1024;
                    // console.log(fileSize)
                    if (fileSize > maxSize) {
                        alert("Kich thuoc file vuot qua dung luong cho phep");
                        return false;
                    }
                });
            });
        }
    };
});

app.directive('validImage', function ($parse) {
    return {
        require: 'ngModel',
        restrict: 'A',
        link: function (scope, el, attrs, ngModel) {
            var model = $parse(attrs.ngModel);
            var modelSetter = model.assign;
            var maxSize = 5;
            el.bind('change', function () {
                scope.$apply(function () {
                    // console.log(el[0].files)
                    if (el[0].files.length > 1) {
                        modelSetter(scope, el[0].files)
                    } else{
                        modelSetter(scope, el[0].files[0])
                    }
                    var fileSize = el[0].files[0].size/1024/1024;
                    // console.log(fileSize)
                    if (fileSize > maxSize) {
                        alert("Kich thuoc file vuot qua dung luong cho phep");
                        return false;
                    }
                });
            });
        }
    };
});

// Hiển thị thông báo
app.controller('ModalInstanceCtrl', function ($location, $uibModalInstance, $scope, err, id, $anchorScroll) {
    $scope.message = err;
    $scope.ok = function () {
        $uibModalInstance.dismiss();
        if (id !== "") {
            $location.hash(id);
            $anchorScroll.yOffset = 100;
            $anchorScroll();
            var x = document.getElementById(id);
            var element = x.nextElementSibling
            element.style.borderColor = "red";
        }
    }
});
