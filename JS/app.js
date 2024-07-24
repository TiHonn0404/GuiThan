var app = angular.module('myApp',['ngRoute'])
.config(function ($routeProvider) {
    $routeProvider
    .when('/',{
        templateUrl: 'giaoDien/home.html',
        controller: 'homeCtrl',
    })
    .when('/content',{
        templateUrl: 'giaoDien/content.html',
        controller : 'contentCtrl',
    })
    .when('/cart',{
        templateUrl: 'giaoDien/cart.html',
        controller : 'cartCtrl',     
    })
    .when('/detail/:id',{
        templateUrl: 'giaoDien/detail.html',
        controller : 'detailCtrl',
    })
    .otherwise({
        templateUrl: 'giaoDien/home.html',
    })
})
.controller('cartCtrl', function($scope, $rootScope){
    $scope.tongTien = function(){
        var tong = 0;
        for(var i = 0; i < $rootScope.cart.length; i++){
            tong += $rootScope.cart[i].quantity * $rootScope.cart[i].price;
        }
        return tong;
    }
    $scope.removeItem = function(id){
        for(var i=0; i<$rootScope.cart.length; i++){
            if($rootScope.cart[i].id == id){
                $rootScope.cart.splice(i, 1);
                break;
            }           
        }  
    }
    $scope.removeAllItem = function(){
        $rootScope.cart = [];
    }
})
.controller('homeCtrl', function($scope, $rootScope){
    $scope.page = 2;
    $scope.limit = 4;
    // Trang 1: Start = 0
    // Trang 2: Start = 4
    // Trang 3: Start = 8
    // Trang 4: Start = (n-1)*4
    $scope.start = ($scope.page -1)*$scope.limit;
    $scope.tongTrang = Math.ceil ($scope.dsSP.length / $scope.limit);
    $scope.dsTrang = [];
    for(var i=1;i<=$scope.tongTrang;i++){
        $scope.dsTrang.push(i);
    }
    $scope.chonTrang  = function(trang){
        $scope.page = trang;
        $scope.start = ($scope.page -1)*$scope.limit;
    }   
})
.controller('contentCtrl', function($scope){
    $scope.page = 1;
    $scope.limit = 4;
    // Trang 1: Start = 0
    // Trang 2: Start = 4
    // Trang 3: Start = 8
    // Trang 4: Start = (n-1)*4
    $scope.start = ($scope.page -1)*$scope.limit;
    $scope.tongTrang = Math.ceil ($scope.dsSP.length / $scope.limit);
    $scope.dsTrang = [];
    for(var i=1;i<=$scope.tongTrang;i++){
        $scope.dsTrang.push(i);
    }
    $scope.chonTrang  = function(trang){
        $scope.page = trang;
        $scope.start = ($scope.page -1)*$scope.limit;
    }
    // $scope.sliderValue = 0;
    // $scope.selectedPrice = 0;
    // $scope.updatePrice = function () {
    //     $scope.selectedPrice = $scope.sliderValue;
    //     if ($scope.selectedPrice === 0) {
    //         $scope.filteredProducts = $scope.dsSP; // Hiển thị tất cả sản phẩm
            
    //     } else {
    //         $scope.filteredProducts = $scope.dsSP.filter(function (sp) {
    //             return sp.price <= $scope.selectedPrice;
    //         }).sort(function (a, b) {
    //             return a.price - b.price;
    //         });
    //     }
    // };
    // $scope.updatePrice();

    $scope.sliderValue = 0;
    $scope.selectedPrice = $scope.sliderValue;

    // Hàm cập nhật giá trị khi slider thay đổi
    $scope.updatePrice = function() {
        $scope.selectedPrice = $scope.sliderValue;
        $scope.filterProducts(); // Gọi hàm lọc sản phẩm khi giá trị slider thay đổi
    };

    // Hàm lọc sản phẩm dựa trên giá
    $scope.filterProducts = function() {
        $scope.filteredProducts = $scope.dsSP.filter(function(product) {
            return product.price <= $scope.selectedPrice;
        });
    };

    // Gọi hàm lọc sản phẩm khi trang được load
    $scope.filterProducts();
})
.controller('myCtrl',function ($scope, $rootScope, $http) {
    $scope.dsSP = [];
    $http.get('JS/data.json').then(
        function(res){ //Tải thành công
            $scope.dsSP = res.data;
        },
        function(){ //Tải thất bại
            alert("Lỗi òi");

        },console.log($scope.dsSP)
    );
    $rootScope.cart = [];
    $rootScope.addToCart = function(sp){
        //SP đã có trong cart -> tăng số lượng
        var inCart = false;
        for(var i=0;i<$rootScope.cart.length;i++){
            if($rootScope.cart[i].id == sp.id){
                inCart = true;
                $rootScope.cart[i].quantity++;
                break;
            }
        }
        //SP không có trong cart
        if(!inCart){
            sp.quantity = 1;
            $rootScope.cart.push(sp);
        }
        console.log($rootScope.cart)
    }
})
.controller('detailCtrl',function ($scope, $routeParams) {
    $scope.id = $routeParams.id;
    $scope.sp = {};
    for(var sp of $scope.dsSP){ //Tìm sản phẩm dựa vào id
        if(sp.id == $scope.id){
            $scope.sp = sp;
            break;
        }
    };
    
})