;'use strict';
var prettyPrint = (function() {
  function underScoreAvailable() {
    return (_ instanceof Function) && (_.VERSION) && (_.each);
  }

  function ce(n) {
  	return document.createElement(n);
  }

  function ss2e(el, str) {
  	ap(el, document.createTextNode(str));
  }

  function ap(el, c) {
  	el.appendChild(c);
  }
  
  function isScalar(v) {
    return _.isString(v) || _.isNumber(v) || _.isBoolean(v) || _.isNaN(v) || _.isNull(v) || _.isUndefined(v);
  }

  function makeTable(content, heading) {
    var p = ce('table')
    , h = ce('thead')
    , b = ce('tbody');

    if (heading) {
      ap(p, (function() {
        var hd = ce('tr')
        , th = ce('th');
        ss2e(th, heading);
        ap(hd, th);
        return hd;
      })());
    }

    if (isScalar(content)) {
      ap(b, makeRow(content, null));
    } else {
      _.chain(content).map(makeRow).each(function(v, k) {
        ap(b, v);
      });
    }

    ap(p, h);
    ap(p, b);

    return p;
  }

  function makeRow(v, k) {
    var r = ce('tr')
    , th = ce('th')
    , td = ce('td');
    if (k) {
      ss2e(th, k);
      ap(r, th);
    }
    if (isScalar(v)) {
      ss2e(td, v);
    } else {
      ap(td, makeTable(v, null));
    }
    ap(r, td);

    return r;
  }


  function print(json) {
    var b = ce('div');
    b.setAttribute('class', 'pretty-print');
    _.chain(json).map(function(v, k) {
      return makeTable(v, k);
    }).each(function(v, k) {
      ap(b, v);
    })
    return b;
  }

  return (underScoreAvailable()) ? print : function(){ console.log('requires underscore.js. please include it.'); };
})();