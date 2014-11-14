arrayQuery.js
=============

Array prototype method for querying properties of objects in an array.

usage:

    var arr = [];
    for( var i = 0; i < 100; i++ ) {
        arr.push({'id':i,'marty': i%2==1 ? 'dead' : 'alive', 'sine':Math.sin(i)});
    }
    arr.query([{'key':'id','value':10,'comparison':'<'},{'key':'marty','value':'dead','comparison':'=='}],{'key':'id','order':'desc'},4);
    arr.query([{'key':'sine','value':0.5,'comparison':'>'},{'key':'sine','value':0.75,'comparison':'<'}],{'key':'id','order':'desc'},4);
