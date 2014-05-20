var scripts = [
    '/assets/js/dist/angular.min.js',
    '/assets/js/dist/app.min.js',
    '//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js',
    '//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js'
];
var src;
var script;
var pendingScripts = [];
var firstScript = document.scripts[0];

// Watch scripts load in IE
function stateChange() {
    // Execute as many scripts in order as we can
    var pendingScript;
    while (pendingScripts[0] && pendingScripts[0].readyState == 'loaded') {
        pendingScript = pendingScripts.shift();
        // avoid future loading events from this script (eg, if src changes)
        pendingScript.onreadystatechange = null;
        // can't just appendChild, old IE bug if element isn't closed
        firstScript.parentNode.insertBefore(pendingScript, firstScript);
    }
}

// loop through our script urls
while (src = scripts.shift()) {
    if ('async' in firstScript) { // modern browsers
        script = document.createElement('script');
        script.async = false;
        script.src = src;
        document.head.appendChild(script);
    }
    else if (firstScript.readyState) { // IE<10
        // create a script and add it to our todo pile
        script = document.createElement('script');
        pendingScripts.push(script);
        // listen for state changes
        script.onreadystatechange = stateChange;
        // must set src AFTER adding onreadystatechange listener
        // else we’ll miss the loaded event for cached scripts
        script.src = src;
    }
    else { // fall back to defer
        document.write('<script src="' + src + '" defer></' + 'script>');
    }
}