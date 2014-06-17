### Start:

###### Load the script:
    <script src="c1Use.js">

###### Example File-structur:
    --|
      | c1Use.js
      |
      | jQuery.js
      |
      | jQuery | 
               | fn | 
                    |  velocity.js

### Asyncron use:
```javascript
// load jQuery async:
window.c1Use('jQuery', function($) {

    $('#test').addClass('xy')

});
```

### Syncron use:
```javascript
// if there is no callback-function, its syncron
window.c1Use('JSON').parse( '{a:1,b:2}' );
```

### The magic addGetter function:
```javascript
c1Use.addGetter(window, 'JSON'); // JSON-polyfill for old browsers

// now, "JSON" is magicly usable
// the *JSON" poilyfill  is not loaded at this moment!!!
JSON.parse( '{a:1,b:2}' ); 
```

### Make properties (submodules) usable with c1Use:
```javascript
window.c1Use('jQuery', function($) { // "jQuery" is automaticly usable width c1Use because loaded with c1Use.

    c1Use.able(jQuery, 'fn'); // make "jQuery.fn" usable
    
    c1Use.addGetter( jQuery.fn, 'velocity' );
    // later: in your code
    $('#text').velocity( {color:red} );

})
```

### Use multiple resources:
```javascript
window.c1Use(['jQuery', 'mytool'], function($, mytool) {
    // use $ and mytool
})
```

### Configuration:
```javascript
// optional ( fallback is the dir in the scripts-tags src )
window.c1UseSrc = '/url/to/libs';
```

### Licence:
MIT


