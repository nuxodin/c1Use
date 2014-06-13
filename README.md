
in your html head:
=====

    <script src="c1Use.js">

In your javascript-code

    // optional ( fallback is the dir in the scripts-tags src )
    window.c1UseSrc = '/url/to/c1Use.js';

    // load jQuery async:
    c1Use('jQuery', function() {

        // make jQuery.fn usable with c1Use
        c1Use.able(jQuery, 'fn');

        // use syncron: 
        c1Use.addGetter(jQuery.fn,'velocity');
    
        // now, the plugin "velocity" is magicly usable
        $('#test').velocity();
    
        // or - if it has a callback-function, it is async
        $('#text').c1Use('velocity', function() {
        	this.velocity();
        });
    
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


