//input is something like:
/*
    var arr = [];
    for( var i = 0; i < 100; i++ ) {
        arr.push({'id':i,'marty': i%2==1 ? 'dead' : 'alive', 'sine':Math.sin(i)});
    }
    arr.query([{'key':'id','value':10,'comparison':'<'},{'key':'marty','value':'dead','comparison':'=='}],{'key':'id','order':'desc'},4);
    arr.query([{'key':'sine','value':0.5,'comparison':'>'},{'key':'sine','value':0.75,'comparison':'<'}],{'key':'id','order':'desc'},4);
*/
Array.prototype.query = function( conditions, orderBy, limit ) {

    conditions = [].concat( conditions );
    var matchingSet = this.slice(0);

    if( matchingSet.length == 0 ){ // --- empty set, no matches possible
        return [];
    }

    for( var i = 0; i < conditions.length; i++ ) {
        var key = conditions[i].key;
        var value = conditions[i].value;
        switch( conditions[i].comparison ) {
            case '>':
                matchingSet = matchingSet.filter( function( item ) {
                    return item[key] != undefined && item[key] > value;
                });
            break;
            case '>=':
                matchingSet = matchingSet.filter( function( item ) {
                    return item[key] != undefined && item[key] >= value;
                });
            break;
            case '<':
                matchingSet = matchingSet.filter( function( item ) {
                    return item[key] != undefined && item[key] < value;
                });
            break;
            case '<=':
                matchingSet = matchingSet.filter( function( item ) {
                    return item[key] != undefined && item[key] <= value;
                });
            break;
            case '==':
                matchingSet = matchingSet.filter( function( item ) {
                    return item[key] != undefined && item[key] == value;
                });
            break;
            case '!=':
                matchingSet = matchingSet.filter( function( item ) {
                    return item[key] != undefined && item[key] != value;
                });
            break;
        }
        if( matchingSet.length == 0 ) { // --- all values have been conditioned out. return empty array.
            return [];
        }
    }

    //{'key':'id','order':'asc'}
    if( orderBy != undefined ) {
        var key = orderBy['key'];
        if( key == undefined ) {
            return matchingSet;
        }
        if( orderBy.order == undefined ) {
            orderBy.order = 'asc';
        } else {
            orderBy.order = orderBy.order.toLowerCase();
        }
        matchingSet = matchingSet.sort( function( a, b ){
            if( 'asc' == orderBy.order ) {
                if( a[key] < b[key] ) {
                    return -1;
                } else if( a[key] > b[key] ) {
                    return 1;
                } else {
                    return 0;
                }
            } else { // --- descending
                if( a[key] < b[key] ) {
                    return 1;
                } else if( a[key] > b[key] ) {
                    return -1;
                } else {
                    return 0;
                }
            }
        });
    }

    if( limit != undefined ) {
        limit = parseInt( limit, 10 );
        return matchingSet.slice( 0, limit );
    }

    return matchingSet;
};