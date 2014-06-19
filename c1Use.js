/* c1Use */
!function(global,undefined) {
    
    var CALLBACKS = 'pseudoSymbol_&/%83';
    
    global.c1Use = function ( prop , cb ) {

        var scope = this || self;

        if ( prop in scope ) { // loadet?
            cb && cb(scope[prop]);
            return scope[prop];
        }

        var callbacks = scope[CALLBACKS] || (scope[CALLBACKS]={});

        if ( callbacks[prop] && cb ) { // is it loading? (and async)

            callbacks[prop].push(cb);

        } else { // load!

    		callbacks[prop] = [cb];

            (cb ? loadScript : loadScriptSync)( scope.c1UseSrc + '/' +prop + '.js?c' , function() {
            	var fn,
            		object = c1Use.able(scope,prop);
            	while ( fn = callbacks[prop].shift() ) {
                	fn( object );
                }
            }, function() { scope[prop] = false; });

    	}
    	return cb ? null : scope[prop];
    };

    /* multiple and path
     * extend c1Use so it can have an array as first arguments
     * */
    c1Use = function (use) {
        var fn = function (props, cb) {
            var scope = this || self;
    		
            if ( !scope.c1UseSrc ) { throw new Error("c1Use: the Object needs a c1UseSrc property!"); };
    		
            if ( typeof props === 'string' ) {

                /* parts ("jQuery.fn.velocity") */
        		var parts = props.split(/\./);
        		var prop = parts.pop();
        		for ( var i = 0, part; part = parts[i++]; ) {
       				c1Use.able( scope, part );
       				scope = scope[part];
        		}
    			return use.call(scope, prop, cb);

        		/* without parts */
        		//return use.call(this,props, cb);
        	}
        	var returns = [];
        	var num = props.length;
    		for ( var i = 0, prop; prop = props[i++]; ) {
    			c1Use.call(scope, prop, function(i) {
    				var fn = function(res) {
    					returns[i-1] = res;
    					num--;
    					if (num===0) {
    						cb.apply(scope,returns);
    					}
    				};
    				return fn;
    			}(i));
    		}
    	};
    	return fn;
    } (c1Use);

    /* make the object useable */
    c1Use.able = function ( obj, prop ) {
        if( obj[prop] === undefined ){
            obj[prop] = {};
        }
        obj[prop].c1Use    = c1Use;
        obj[prop].c1UseSrc = obj.c1UseSrc + '/' + prop;
        return obj[prop];
    };
    c1Use.addGetter = function ( obj, prop ) {

        if (obj.hasOwnProperty(prop)) { return; }

        if (!global.Document) { // ie8: bad check
            c1Use.call(obj,prop); // load everything!
            return;
        }

        /* other libaries should check properties like so: if( prop in obj ){ ... }; so the getter will not fire */
        Object.defineProperty( obj, prop, {
            configurable:true,
            get: function() {
                delete obj[prop];
                return c1Use.call(this,prop);
            },
            set: function(v) {
                delete obj[prop];
                obj[prop] = v;
            }
        });
    };
    
    /* browser only! */
    var d = document;
    function loadScript(path,cb,eb) {
        var elem = d.createElement('script');
        elem.setAttribute('src',path);
        elem.onload  = function(){cb();elem.remove();};
        elem.onerror = function(){eb();elem.remove();};
        document.documentElement.firstChild.appendChild(elem);
    }
    function loadScriptSync(path,cb,eb) {
    	var request = new XMLHttpRequest();
    	request.open('GET',path, false);
    	request.send(null);
    	if (request.status === 200) {
            var elem = d.createElement('script'); 
            elem.text = request.responseText;
            d.documentElement.firstChild.appendChild(elem);
            elem.setAttribute('data-c1-src',path);
            cb();
            //debug && setTimeout(function(){elem.remove();}); // performance ?
    	} else {
            eb();
    	}
    }
    if (!global.c1UseSrc) {
        var tmp = d.getElementsByTagName('script');
        tmp = tmp[tmp.length-1];
        global.c1UseSrc = tmp.getAttribute('src').replace(/[^\/]+$/,'');
    }

}(this);
