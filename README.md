c1Use
=====

hierarchical module loader


in your html:
=====

    <script src="c1Use.js">
    <script src="jQuery.js">

    <script>

    c1Use.able('jQuery.fn');

    //----------------
    // use sync:

    c1Use.addGetter(jQuery.fn,'velocity');

    $('#test').velocity();

    //----------------
    // or async: ( if it has a callback-function, it is async )
    
    $('#text').c1Use('velocity',function(){
    	this.velocity();
    })

    </script>



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


