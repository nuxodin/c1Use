
Load the script:
=====
    <script src="c1Use.js">

File-structur:
=====

    --|
      | c1Use.js
      |
      | jQuery.js
      |
      | jQuery | 
               | fn | 
                    |  velocity.js


asyncron use:

```javascript
// optional ( fallback is the dir in the scripts-tags src )
window.c1UseSrc = '/url/to/c1Use.js';

// load jQuery async:
c1Use('jQuery', function($) {

    $('#test').addClass('xy')

});
```

syncron use:

```javascript
c1Use.addGetter(window, 'jQuery');

// now, "jQuery" is magicly usable
// the jQeury module is not loaded at this momenbt
jQuery('#text') // at this moment jQuery will be loaded
```

make properties (submodules) usable with c1Use:

```javascript
c1Use('jQuery', function($) { // "jQuery" is now usable with c1Use

    c1Use.able(jQuery, 'fn'); // make "jQuery.fn" usable
    
    c1Use.addGetter( jQuery.fn, 'velocity' );
    
    // later:
    $('#text').velocity( {color:red} );
     
})
```

licence:
=====
MIT


