# Web Framework
<br/>  
<br/>  
##AngularJS
<br/>
## _How to code today with tomorrow tools_
###Carlo Bonamico - [@carlobonamico](https://twitter.com/carlobonamico)
###NIS s.r.l.
###carlo.bonamico@gmail.com
###carlo.bonamico@nispro.it
--
#Yes but you can't do that in a web app
* Sure? people used to think it was impossible to get
  * interactive email clients (GMail)
  * word processors and spreadsheets (GDocs)
  * file share (Dropbox)
  * real-time monitoring (Kibana)
  * offline apps (Nozbe)
  
The web is (and will always be) more powerful than people think!

* the same now applies to _mobile_ web 
  * which will overcome the "desktop" web in terms of traffic next year
--
#OK, wo I will go for HTML5
##to implement my next great service/project

                              ... a few months go by...
                              
##WTF!! I did not think web development was could be that messy!

* Spaghetti code tastes better in a dynamic language such as JS
* I spent most of my time juggling the DOM
* I cannot integrate the Form widgets I love with the charts library I love
* Where is modularization? and encapsulation?
  * "everything" can fiddle with "everything"...  
--
#Then the problems begin
* Initially, it "feels" more productive, but...
* When the app grows, 
  * debugging gets harder
  * refactoring gets harder
  * effective testing gets impossible
* When the team grows, collaboration becomes harder!
  * every time a designer makes a beautiful look, we spend days implementing it and regression testing
* It's becoming impossible to evolve!
--
#HELP ME!
<br/>
<br/>
<br/>
##Please, before I go back to Desktop development, 
##can you tell me if there is a better way?
--
#If I were to answer this question in 2008...
##Almost a no brainer: go for Adobe Flex!
It has

* encapsulation, interfaces
* event driven GUI
* modular and reusable comoponents
* great tooling

##The web platform was just not there yet...
--
#Fast-forward to 2015...
## Definitely a no-brainer: 
<br/>
##go for Web Components + event-driven MVC

* [http://mozilla.github.io/brick/docs.html](http://mozilla.github.io/brick/docs.html)
* [http://www.polymer-project.org/](http://www.polymer-project.org/)

--
#And now? on end of 2013
##Blurry situation...
<br>

* Adobe Flex is Open Source (but maybe too late...) and lost support
* HTML5 is booming, but large-scale JS dev is hard
<br>
<br>
##But please, I HAVE to deliver a great Web App in a few months!
--
#Well..
##The future is already here — it's just not very evenly distributed.
_William Gibson_

<img src="http://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/William_Ford_Gibson.jpg/144px-William_Ford_Gibson.jpg" style="width: 200px;"/>

##If the hundred year language (from 2113) were available today, 
##would we want to program in it?
_Paul Graham_ - [http://paulgraham.com/hundred.html](http://paulgraham.com/hundred.html)
--
#Enter AngularJS
##Use tomorrow web technologies today
<br/>
<img src="http://localhost:8000/slides3/angularjs.png" style="width: 200px;"/>
##[http://www.angularjs.org](http://www.angularjs.org)
<br/>
###And almost transparently upgrade as soon as they are available
[http://www.2ality.com/2013/05/web-components-angular-ember.html](http://www.2ality.com/2013/05/web-components-angular-ember.html)

--
#Robust, productive (& fun!) Web dev
##Open Source _toolset_ 
###backed by Google
###great, active and open community
<br/>
###used from startups to Microsoft, Oracle & Google itself
<br/>
##Extremely productive, robust, testable, and scalable
###from mockups to small apps to large enterprise apps
--
#Strong points
* Angular follows and ehnances the _HTML way_ of doing things
  * declarative
  * interoperable
* Event-driven Model-View-Controller
  * plain JS models
* Data binding
##View is as decoupled as possibile from logic
##Great for effective Designer-Developer workflows!
--
#OK, you are getting me interested
<br/>
<br/>
##but I want proof!
--
#Well...
<br/>
<br/>
## OK! THIS presentation is not PowerPoint
### nor OpenOffice nor Keynote
--
#It's an AngularJS app I wrote in a few hours
<br/>
<br/>
<br/>
## Press F12 to be sure!
<br/>
<br/>
Thanks [http://plnkr.co](http://plnkr.co) !
--
#
--
#What's inside
* A View: index.html
  * + a [style.css](style.css)
  * peppered-up with AngularJS 'ng-something' directives
* A model
  * data: slides.md
  * code: array of slide object
* A controller
  * script.js
--
#The model
```javascript
   var slide = {
                    number: i + 1,
                    title: "Title " + i,
                    content: "#Title \n markdown sample",
                    html: "",
                    background: "backgroundSlide"
    };
```
--
#A service to load the model from markdown
```js
    ngSlides.service('slidesMarkdownService', function ($http) {
    var converter = new Showdown.converter();
    return {
        getFromMarkdown: function (path) {
            var slides = [];

            $http({method: 'GET', url: path}).
                success(function (data, status, headers, config) {
                    var slidesToLoad = data.split(separator); //two dashes
                    for (i = 0; i < slidesToLoad.length; i++) {
                        var slide = {
                            content: slidesToLoad[i],
                            //.. init other slide fields
                        };
                        slide.html = converter.makeHtml(slide.content);
                        slides.push(slide);
                    }
                });
            return slides;
        }
    }
})
```
--
#A simple declarative view
* binding the model to the html

```html
<body ng-app="ngSlides" ng-class="slides[currentSlide].background"
      ng-controller="presentationCtrl">

<div id="slidesContainer" class="slidesContainer" >
    <div class="slide" ng-repeat="slide in slides"
                       ng-show="slide.number == currentSlide" >

        <div ng-bind-html="slide.html"></div>

        <h4 class="number">{{slide.number}}</h4>

    </div>

</div>
</body>
```

* and a very simple css for positioning elements in the page
--
#A controller focused on interaction
```javascript

    ngSlides.controller("presentationCtrl", function ($scope, $http,
                                      $rootScope, slidesMarkdownService) {

    $scope.slides = slidesMarkdownService.getFromMarkdown('slides.md');

    $scope.currentSlide = 0;

    $scope.next = function () {
        $scope.currentSlide = $scope.currentSlide + 1;

    };

    $scope.previous = function () {
        $scope.currentSlide = $scope.currentSlide - 1;
    };


});

```
--
#Integration with non-angular code
* $apply utility function to notify angular of changes
* angular.element( ...).scope()
  * to access controller methods and scope outside angular
```
document.onkeyup = KeyPressed;

function KeyPressed(e) {
    var key = ( window.event ) ? event.keyCode : e.keyCode;

    var controllerElement = angular.element(document.getElementById("slidesContainer"));
    var scope = controllerElement.scope()

    scope.$apply(function () {
        switch (key) {
            case 39:
            {
                scope.next();
                break;
            }
    //...
```
--
#Slide sources in markdown format
* ``slides.md``
```txt
#It's an AngularJS app I wrote in a few hours
<br/>
## Press F12 to be sure!
```

--
#What's inside - details
* A custom directive
* A few filters
--
#AngularJS magic
## Any sufficiently advanced technology is indistinguishable from magic.
###_Arthur C. Clarcke_

```
<li ng-repeat="slide in slides | filter:q">...</li>
```
--
#AngularJS magic is made of
* Dependency Injection
  * makes for decoupling, testability, and enriching of your code and tags

```
  function SlidesCtrl($scope, SlidesService)
  {
    SlidesService.loadFromMarkdown('slides.md');
  }
```
--
#AngularJS magic is made of
* Transparent navigation and history with ``ng-view`` and ``ng-route``
* Databinding
  * a few little tricks (Dirty checking) 
  * which will disappear when the future (ECMAScript6 object.observe) arrives
--
#The power of composition
* Microkernel architecture
  * core: HTML compiler, Dependency Injection, module system
  * everything else is a directive, service or module
* Composition of
  * modules 
    * ``module('slides',['slides.markdown'])``
  * directives 
    * `` <h1 ng-show='enableTitle' ng-class='titleClass'>..</h1>``
  * filters 
    * `` slide in slides | filter:q | orderBy:title | limit:3``
  * ...
##Do you know of other microkernel-based technologies 
## with a strong focus on composition?
### they tend to be strong and long lived :-), right Linux, Maven, Jenkins?
--
#Take advantage of AngularJS capabilities
* Integration with other frameworks
  * Showdon Markdown converter https://github.com/coreyti/showdown
  * Highlight.js for syntax highlighting
  * plain JS for keyboard handling
* AngularJS is opinionated
  * but it will let you follow a different way in case you really really need it
--
#Testing
* Unit Testing
  * mocking
  * http mocking
* End-To-End testing
  * scenarios 
* Jasmine
--
#Weak points
Even angular is not perfect... yet!

* Dynamic page rendering, so SEO is hard
  * temporary solutions with PhantomJS on the server side
  * a few cloud-based services
  * personally think Google is working on fixing that
* Tooling is good but can improve
* Support for lesser browser
--
#Lessons learnt
* angularJS docs are great! but beware of 
``
  <ANY ng-show="{expression}">
``

If you write
``
  <div ng-show="{divEnableFlag}">
``

It won't work! Write
``
  <div ng-show="divEnableFlag">
``
--
#Lessons learnt
* Getting started is very easy
* But to go further you need to learn the key concepts
  * promises
  * dependency injection
  * directives
  * scopes
--
#Lessons learnt
* Like all the magic wands, you could end up like Mikey Mouse as the apprentice sorcerer

* So get your training!
  * Online
  * Codemotion training (4-5 february and 4-5 march 2014)
    * [http://training.codemotion.it/](http://training.codemotion.it/)

--
#Lessons learnt
* AngularJS makes for great mockups
  * interactivity in plain HTML views
* AngularJS changes your way of working (for the better!)
  * let you free of concentrating on your ideas
  * makes for a way faster development cycle
  * makes for a way faster interaction with customer cycle
  * essential for Continuous Delivery!

--
#To learn more
* Online tutorials and video trainings:
  * [http://www.yearofmoo.com/](http://www.yearofmoo.com/)
  * [http://egghead.io](http://egghead.io)
* All links and reference from my Codemotion Workshop
  * [https://github.com/carlobonamico/angularjs-quickstart](https://github.com/carlobonamico/angularjs-quickstart)
  * [https://github.com/carlobonamico/angularjs-quickstart/blob/master/references.md](https://github.com/carlobonamico/angularjs-quickstart/blob/master/references.md)
* Full lab from my Codemotion Workshop
  * [https://github.com/carlobonamico/angularjs-quickstart](https://github.com/carlobonamico/angularjs-quickstart)
--
#Web Components
* [http://www.w3.org/TR/components-intro/](http://www.w3.org/TR/components-intro/)
* Youtube video "Web Components in Action"
* [http://css-tricks.com/modular-future-web-components/](http://css-tricks.com/modular-future-web-components/)
--
#Books
* [http://www.ng-book.com/](http://www.ng-book.com/)
* AngularJS and .NET [http://henriquat.re](http://henriquat.re)
--
#My current plans
* writing about AngularJS and security
* attend Marcello Teodori talk on JS Power Tools
* integrate AngularJS with my favourite Open Source server-side dev platform
  * [http://www.manydesigns.com/en/portofino](http://www.manydesigns.com/en/portofino)
* preparing the 'Advanced AngularJS' workshop
  * contact us if interested
--
#Thank you!
* Explore these slides
  * [https://github.com/carlobonamico/angularjs-future-web-development-slides](https://github.com/carlobonamico/angularjs-future-web-development-slides)
* My presentations
  * [http://slideshare.net/carlo.bonamico](http://slideshare.net/carlo.bonamico)
* Follow me at [@carlobonamico](https://twitter.com/carlobonamico) / [@nis_srl](https://twitter.com/nis_srl)
  * will publish these slides in a few days
* Attend my Codemotion trainings
  * [http://training.codemotion.it/](http://training.codemotion.it/)
* Write me if you are interested in the upcoming AngularJS Italy online community
<br/>
<br/>
<br/>
* and thanks to Elena Venni for the many ideas about Angular in our last project together
