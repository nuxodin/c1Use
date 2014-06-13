
in your html head:
=====

    <script src="c1Use.js">
    <script src="jQuery.js">

In your javascript-code

    // optional 
    window.c1UseSrc = '/url/to/c1Use.js';

    // make the object "jQuery.fn" c1.Use usable width c1Use
    c1Use.able('jQuery.fn');

    // use sync: 
    c1Use.addGetter(jQuery.fn,'velocity');

    // now, the plugin "velocity" is magicly usable
    $('#test').velocity();

    // or async:
    // if it has a callback-function, it is async
    $('#text').c1Use('velocity', function() {
    	this.velocity();
    });


your file-structur:
=====

    --|
      | c1Use.js
      |
      | jQuery.js
      |
      | jQuery | 
               | fn | 
                    |  velocity.js



licence:
=====
MIT


