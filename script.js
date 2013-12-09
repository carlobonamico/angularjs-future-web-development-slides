// Code goes here

var ngSlides = angular.module('ngSlides', ['ngSanitize']);

ngSlides.controller("presentationCtrl", function ($scope, $http, $rootScope, slidesMarkdownService) {

    $scope.print = false;

    $scope.background = "backgroundCover";

    $scope.slidesMock = [
        {
            number: 1,
            title: "title1",
            content: "## Syntax highlighting  \naaa\n\n```javascript\naa```"

        },
        {
            number: 2,
            title: "title2",
            content: "## two "
        },
        {
            number: 3,
            title: "title2",
            content: "## Sthree "
        },
        {
            number: 4,
            title: "title2",
            content: "## Syntax highlighting\n javascript: var "
        }

    ];


    $scope.slides = slidesMarkdownService.getFromMarkdown('slides.md');

    $scope.currentSlide = 0;


    $scope.next = function () {
        $scope.currentSlide = $scope.currentSlide + 1;

    };

    $scope.previous = function () {
        $scope.currentSlide = $scope.currentSlide - 1;
    };


});


ngSlides.service('slidesMarkdownService', function ($http) {

    //https://github.com/btford/angular-markdown-directive
    var converter = new Showdown.converter();

    return {
        getFromMarkdown: function (path) {
            var slides = [];

            $http({method: 'GET', url: path}).
                success(function (data, status, headers, config) {

                    var slidesToLoad = data.split("--");

                    console.log(slidesToLoad);

                    for (i = 0; i < slidesToLoad.length; i++) {
                        var slide = {
                            number: i,
                            title: "Title " + i,
                            content: slidesToLoad[i],
                            html: "",
                            background: "backgroundSlide" //CSS class defining the background image

                        };

                        slide.html = converter.makeHtml(slide.content);
                        slides.push(slide);

                    }

                    //FIXME
                    slides[0].background = "backgroundCover";

                    slides[15].background = "specialEffect";

                }).
                error(function (data, status, headers, config) {
                    //$scope.error = data;

                });



            return slides;

        }
    }
})

document.onkeyup = KeyPressed;

function KeyPressed(e) {
    var key = ( window.event ) ? event.keyCode : e.keyCode;

    var controllerElement = angular.element(document.getElementById("slidesContainer"));

    console.log(controllerElement);
    console.log(controllerElement.scope());

    var scope = controllerElement.scope()

    scope.$apply(function () {
        switch (key) {
            case 39:
            {
                console.log("next");
                scope.next();
                break;
            }

            case 37:
            {
                console.log("previous");
                scope.previous();
                break;
            }
        }
    });


}
//- See more at: http://www.syntacticsugr.com/23-javascript/sugr_cubes/81-globally-capture-key-press-events#sthash.tXpwzrI8.dpuf