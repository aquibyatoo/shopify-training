import 'Styles/templates/index.scss';


// ES5 syntax
function Person() {
    // we assign `this` to `self` so we can use it later
    var self = this;
    self.age = 0;

    setInterval(function growUp() {
        // `self` refers to the expected object
        self.age++;
    }, 1000);
}

var p = new Person();