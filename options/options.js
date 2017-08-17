(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/json/stringify"), __esModule: true };
},{"core-js/library/fn/json/stringify":5}],2:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/define-property"), __esModule: true };
},{"core-js/library/fn/object/define-property":6}],3:[function(require,module,exports){
"use strict";

exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};
},{}],4:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _defineProperty = require("../core-js/object/define-property");

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();
},{"../core-js/object/define-property":2}],5:[function(require,module,exports){
var core = require('../../modules/_core');
var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};

},{"../../modules/_core":9}],6:[function(require,module,exports){
require('../../modules/es6.object.define-property');
var $Object = require('../../modules/_core').Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};

},{"../../modules/_core":9,"../../modules/es6.object.define-property":22}],7:[function(require,module,exports){
module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

},{}],8:[function(require,module,exports){
var isObject = require('./_is-object');
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

},{"./_is-object":18}],9:[function(require,module,exports){
var core = module.exports = { version: '2.5.0' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

},{}],10:[function(require,module,exports){
// optional / simple context binding
var aFunction = require('./_a-function');
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

},{"./_a-function":7}],11:[function(require,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_fails":14}],12:[function(require,module,exports){
var isObject = require('./_is-object');
var document = require('./_global').document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};

},{"./_global":15,"./_is-object":18}],13:[function(require,module,exports){
var global = require('./_global');
var core = require('./_core');
var ctx = require('./_ctx');
var hide = require('./_hide');
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;

},{"./_core":9,"./_ctx":10,"./_global":15,"./_hide":16}],14:[function(require,module,exports){
module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

},{}],15:[function(require,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

},{}],16:[function(require,module,exports){
var dP = require('./_object-dp');
var createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

},{"./_descriptors":11,"./_object-dp":19,"./_property-desc":20}],17:[function(require,module,exports){
module.exports = !require('./_descriptors') && !require('./_fails')(function () {
  return Object.defineProperty(require('./_dom-create')('div'), 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_descriptors":11,"./_dom-create":12,"./_fails":14}],18:[function(require,module,exports){
module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

},{}],19:[function(require,module,exports){
var anObject = require('./_an-object');
var IE8_DOM_DEFINE = require('./_ie8-dom-define');
var toPrimitive = require('./_to-primitive');
var dP = Object.defineProperty;

exports.f = require('./_descriptors') ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

},{"./_an-object":8,"./_descriptors":11,"./_ie8-dom-define":17,"./_to-primitive":21}],20:[function(require,module,exports){
module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

},{}],21:[function(require,module,exports){
// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = require('./_is-object');
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

},{"./_is-object":18}],22:[function(require,module,exports){
var $export = require('./_export');
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !require('./_descriptors'), 'Object', { defineProperty: require('./_object-dp').f });

},{"./_descriptors":11,"./_export":13,"./_object-dp":19}],23:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.qs = qs;
exports.$on = $on;
exports.$off = $off;
exports.qsa = qsa;
exports.$delegate = $delegate;
/* global GM_setValue, GM_getValue */

function qs(selector, scope) {
    return (scope || document).querySelector(selector);
}

function $on(target, type, callback, capture) {
    target.addEventListener(type, callback, !!capture);
}

function $off(target, type, callback, capture) {
    target.removeEventListener(type, callback, !!capture);
}

function qsa(selector, scope) {
    return (scope || document).querySelectorAll(selector);
}

function $delegate(target, selector, type, handler, capture) {
    if (!target) {
        return false;
    }
    var dispatchEvent = function dispatchEvent(event) {
        var targetElement = event.target;
        var potentialElements = target.querySelectorAll(selector);
        var i = potentialElements.length;

        while (i--) {
            if (potentialElements[i] === targetElement) {
                handler.call(targetElement, event);
                break;
            }
        }
    };

    $on(target, type, dispatchEvent, !!capture);
}

var escapeForHTML = exports.escapeForHTML = function escapeForHTML(s) {
    return s.replace(/[&<]/g, function (c) {
        return c === '&' ? '&amp;' : '&lt;';
    });
};

var gm = exports.gm = {
    get: typeof GM_getValue === 'undefined' ? function () {
        return false;
    } : GM_getValue, // jshint ignore:line
    set: typeof GM_setValue === 'undefined' ? function () {
        return false;
    } : GM_setValue // jshint ignore:line
};

},{}],24:[function(require,module,exports){
module.exports={
    "name": {
        "message": "AntiAdblock"
    },
    "eula_text": {
        "message": "<p>\r\n                    This AntiAdblock Browser Extension End-User License Agreement (\u201cEULA\u201d or \u201cAgreement\u201d) is a legal agreement between you,\r\n                    and Performix, LLC (the \u201cCompany\u201d), which is the legal owner of the AntiAdblock browser extension\r\n                    (\"AntiAdblock\u201d or \u201cAntiAdblock browser extension\u201d), and provides the terms and conditions by which you may\r\n                    use AntiAdblock, including any associated media, scripts, printed materials, and online or electronic\r\n                    documentation. This EULA supersedes any other agreement or understanding with respect to its subject matter.\r\n                    If you don't like what you see here, do not install or use the AntiAdblock browser extension.\r\n                    By downloading it, however, you agree to use the AntiAdblock browser extension consistent with the\r\n                    terms of this EULA. The Privacy Statement is subject to and incorporated into this EULA.\r\n                <\/p>\r\n                <p><br\/><\/p>\r\n                <p>\r\n                    AntiAdblock is the intellectual property of the Company and is protected by copyright, trademark laws and international copyright treaties, as well as other\r\n                    intellectual property laws. Intellectual property, includes, but is not limited to, computer or software code, scripts, design elements, graphics, interactive\r\n                    features, artwork, text communication, tracker libraries, and any other content that may be found in AntiAdblock. All trademarks, service marks and trade names\r\n                    are owned, registered and\/or licensed by the Company.\r\n                <\/p>\r\n                <p><br\/><\/p>\r\n                <p>\r\n                    1. GRANT OF LICENSE\r\n                <\/p>\r\n                <p><br\/><\/p>\r\n                <p>\r\n                    The Company grants to you a limited, worldwide, non-exclusive, royalty-free, revocable, and non-commercial license to: download AntiAdblock to a computer\r\n                    via a web browser; use AntiAdblock as herein set forth in the following section; copy and store AntiAdblock in your web browser cache memory; and print pages\r\n                    from AntiAdblock for your own personal and non-commercial use. The Company does not grant you any other rights whatsoever in relation to AntiAdblock.\r\n                    All other rights are expressly reserved by the Company.\r\n                <\/p>\r\n                <p><br\/><\/p>\r\n                <p>\r\n                    2. DESCRIPTION OF OTHER RIGHTS AND LIMITATIONS.\r\n                <\/p>\r\n                <p><br\/><\/p>\r\n                <p>\r\n                    (a) Unless you have the express written permission from the Company, you may not distribute AntiAdblock or any portion thereof to any third parties.\r\n                    <br\/>\r\n                    (b) You may not disassemble or reverse engineer AntiAdblock for any purpose, other than for reviewing the code for personal review, and at all times are bound\r\n                    by the terms of this EULA.\r\n                    <br\/>\r\n                    (c) We don't charge for AntiAdblock, and neither can you. You may not rent, lease, or lend AntiAdblock and may only use it for you own personal, non-commercial use.\r\n                    <br\/>\r\n                    (d) The Company may provide you with support services, and any supplemental software code provided to you as part of those services shall be considered part of\r\n                    AntiAdblock and subject to the terms and conditions of this EULA.\r\n                    <br\/>\r\n                    (e) You must comply with all applicable laws regarding use of AntiAdblock.\r\n                <\/p>\r\n                <p><br\/><\/p>\r\n                <p>\r\n                    3. ALLOWABLE USES OF AntiAdblock\r\n                <\/p>\r\n                <p><br\/><\/p>\r\n                <p>\r\n                    You may only use AntiAdblock for your own personal, non-commercial use.\r\n                <\/p>\r\n                <p><br\/><\/p>\r\n                <p>\r\n                    4. NON-ALLOWABLE USES OF AntiAdblock\r\n                <\/p>\r\n                <p><br\/><\/p>\r\n                <p>\r\n                    You are strictly prohibited from, and agree that you will not, adapt, edit, change, modify, transform, publish, republish, distribute, or redistribute\r\n                    AntiAdblock or any elements, portions, or parts thereof, including without limitation, to any elements, portions, or parts of AntiAdblock software (in any form or media)\r\n                    without the Company\u2019s prior written consent. You agree not to use any automated data collection methods, data mining, robots, scraping or any data gathering\r\n                    methods of any kind on AntiAdblock. You will not use AntiAdblock for any commercial use whatsoever.\r\n                <\/p>\r\n                <p><br\/><\/p>\r\n                <p>\r\n                    5. ENFORCEMENT OF COPYRIGHT AND PROTECTION OF INTELLECTUAL PROPERTY\r\n                <\/p>\r\n                <p><br\/><\/p>\r\n                <p>\r\n                    If the Company discovers that you have used its copyrighted or other protected intellectual property in contravention of the terms of the license above,\r\n                    the Company may bring legal proceedings against you, seeking monetary damages and an injunction against you. You could also be ordered to pay legal fees and costs.\r\n                    If you become aware of any use of the Company\u2019s copyright or protected intellectual property that contravenes or may contravene the terms of the license above,\r\n                    immediately report this by email to support@adguard.com.\r\n                <\/p>\r\n                <p><br\/><\/p>\r\n                <p>\r\n                    6. TERMINATION\r\n                <\/p>\r\n                <p><br\/><\/p>\r\n                <p>\r\n                    Your right to use AntiAdblock continues until terminated by the Company, which may terminate this Agreement and your license to use AntiAdblock at any time,\r\n                    without cause and without notice. You may terminate this agreement at any time by uninstalling AntiAdblock. This Agreement will automatically terminate if you fail\r\n                    to comply with any of the terms of this EULA. Upon termination, you agree to stop using and to uninstall AntiAdblock.\r\n                <\/p>\r\n                <p><br\/><\/p>\r\n                <p>\r\n                    7. NO WARRANTIES\r\n                <\/p>\r\n                <p><br\/><\/p>\r\n                <p>\r\n                    AntiAdblock is provided \u201cAs Is\u201d and does not come with any kind of warranty whatsoever. The Company does not warrant or assume responsibility for the accuracy\r\n                    or completeness of any information, text, graphics, links or other items contained within AntiAdblock. AntiAdblock makes no warranties respecting any harm that may be\r\n                    caused by the transmission of any kind of computer virus.\r\n                <\/p>\r\n                <p><br\/><\/p>\r\n                <p>\r\n                    8. LIMITATION OF LIABILITY\r\n                <\/p>\r\n                <p><br\/><\/p>\r\n                <p>\r\n                    In no event shall the Company be liable for any damages (including, without limitation, lost profits, business interruption, or loss of data) rising out of use\r\n                    of or inability to use AntiAdblock. In no event will the Company be liable for indirect, special, incidental, consequential (including lost profit), punitive,\r\n                    exemplary, or other damages based in contract, tort or otherwise. The Company shall have no liability with respect to the content or operation of AntiAdblock.\r\n                <\/p>"
    },
    "privacy_text": {
        "message": "<p>\r\n                    The privacy policy of&nbsp;the AntiAdblock project is&nbsp;to&nbsp;prevent gathering more data than needed\r\n                    for the extensions to&nbsp;function correctly. The data collected is&nbsp;anonymized and removed when no&nbsp;longer required. We&nbsp;will never share it\r\n                    with any third parties. This policy specifies the data gathered and its processing.\r\n                <\/p>\r\n\r\n                <p><br\/><\/p>\r\n                <h3>Filter update checks<\/h3>\r\n\r\n                <p>\r\n                    AntiAdblock uses <a href=\"http:\/\/adguard.com\/en\/filters.html\">Adguard filters<\/a>\r\n                    and from time to&nbsp;time refers to&nbsp;Adguard servers to&nbsp;check for the filter updates.\r\n                <\/p>\r\n\r\n                <p><br\/><\/p>\r\n                <p>In&nbsp;this case the server receives the following data:<\/p>\r\n                <ul>\r\n                    <li>Your IP&nbsp;address<\/li>\r\n                    <li>Filter&nbsp;ID, which we&nbsp;check for updates<\/li>\r\n                    <li>Extension type and version<\/li>\r\n                <\/ul>\r\n\r\n                <p>\r\n                    This data is&nbsp;not stored anywhere and never used later&nbsp;on.\r\n                <\/p>\r\n\r\n                <p><br\/><\/p>\r\n                <h3>Extension update checks<\/h3>\r\n\r\n                <p>\r\n                    From time to&nbsp;time your browser checks for updates of&nbsp;all your extensions including AntiAdblock.\r\n                    Some general data, such as&nbsp;operating system, browser version, your&nbsp;IP address and\r\n                    extension version is&nbsp;sent during an&nbsp;update check.\r\n                <\/p>\r\n                <p><br\/><\/p>\r\n                <p>\r\n                    Updates to&nbsp;AntiAdblock stable releases for Yandex.Browser are processed by&nbsp;the Yandex Browser and is&nbsp;subject to&nbsp;the <a href=\"http:\/\/legal.yandex.com\/privacy\/\">Yandex Browser Privacy Policy<\/a>.\r\n                <\/p>\r\n                <p><br\/><\/p>\r\n                <p>\r\n                    Updates to&nbsp;AntiAdblock stable releases for Google Chrome are processed by&nbsp;the Google Web Store website and is&nbsp;subject to&nbsp;the <a href=\"http:\/\/www.google.com\/intl\/en\/policies\/privacy\/\">Google Privacy Policy<\/a>.\r\n                <\/p>\r\n                <p><br\/><\/p>\r\n                <p>\r\n                    Updates to&nbsp;AntiAdblock stable releases for Firefox are processed by&nbsp;Addons.Mozilla.Org website and are subject to&nbsp;the <a href=\"https:\/\/www.mozilla.org\/en-US\/privacy\/\">Mozilla Privacy Policy<\/a>.\r\n                <\/p>\r\n                <p><br\/><\/p>\r\n                <p>\r\n                    Updates to&nbsp;AntiAdblock stable releases for Opera are processed by&nbsp;the Opera Add-ons website and are subject to&nbsp;the <a href=\"http:\/\/www.opera.com\/privacy\">Opera privacy policy<\/a>.\r\n                <\/p>"
    },
    "short_name": {
        "message": "AntiAdblock"
    },
    "description": {
        "message": "Protect and respect"
    },
    "footer_homepage": {
        "message": "Homepage"
    },
    "footer_privacy_policy": {
        "message": "Privacy Policy"
    },
    "footer_eula": {
        "message": "EULA"
    },
    "footer_powered_by": {
        "message": "Powered by"
    },
    "options_title": {
        "message": "Settings"
    },
    "options_header": {
        "message": "Settings"
    },
    "options_settings_filters": {
        "message": "Filters"
    },
    "privacy_title": {
        "message": "AntiAdblock: Privacy Policy"
    },
    "privacy_header": {
        "message": "Privacy Policy"
    },
    "eula_title": {
        "message": "AntiAdblock: End-User License Agreement"
    },
    "eula_header": {
        "message": "End-User License Agreement"
    }
}

},{}],25:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Options = function () {
    function Options(store, view) {
        (0, _classCallCheck3.default)(this, Options);

        this.store = store;
        this.view = view;

        view.localization();
        view.updateOption(this.updateOption.bind(this));
        store.getOptions(function (data) {
            view.setOptions(data);
        });
    }

    (0, _createClass3.default)(Options, [{
        key: 'saveOptions',
        value: function saveOptions() {
            var view = this.view;
            this.store.update(this.view.getOptions(), function () {
                view.showSaveStatus();
            });
        }
    }, {
        key: 'updateOption',
        value: function updateOption(option, value) {
            this.store.updateOption(option, value, function () {
                console.log('upd');
            });
        }
    }]);
    return Options;
}();

exports.default = Options;

},{"babel-runtime/helpers/classCallCheck":3,"babel-runtime/helpers/createClass":4}],26:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var languages = {
    en: require('../_locales/en/messages.json')
};

var current = 'en';

var i18n = exports.i18n = function i18n(s) {
    return languages[current][s] && languages[current][s].message ? languages[current][s].message : s;
};

},{"../_locales/en/messages.json":24}],27:[function(require,module,exports){
'use strict';

var _controller = require('./controller');

var _controller2 = _interopRequireDefault(_controller);

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

var _view = require('./view');

var _view2 = _interopRequireDefault(_view);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var store = new _store2.default('anti-adblock-store');
var view = new _view2.default();

new _controller2.default(store, view);

},{"./controller":25,"./store":29,"./view":30}],28:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var options = exports.options = {
    warningIconsNearLinks: true,
    preventAccess: true,
    tryToCircumvent: true,
    google: true,
    bing: true,
    yahoo: true,
    duckduckgo: true,
    facebook: true,
    twitter: true,
    googlenews: true,
    yahooNews: true,
    reddit: true
};

},{}],29:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _options = require('./options');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Store = function () {
    function Store(name, callback) {
        (0, _classCallCheck3.default)(this, Store);

        var localStorage = window.localStorage;

        this.getLocalStorage = function () {
            var data = localStorage.getItem(name);

            if (data) {
                return JSON.parse(data);
            } else {
                return _options.options;
            }
        };

        this.setLocalStorage = function (data) {
            localStorage.setItem(name, (0, _stringify2.default)(data));
        };

        if (callback) {
            callback();
        }
    }

    (0, _createClass3.default)(Store, [{
        key: 'getOptions',
        value: function getOptions(callback) {
            callback(this.getLocalStorage());
        }
    }, {
        key: 'update',
        value: function update(options, callback) {
            this.setLocalStorage(options);

            if (callback) {
                callback();
            }
        }
    }, {
        key: 'updateOption',
        value: function updateOption(option, value, callback) {
            var options = this.getLocalStorage();

            options[option] = !value;

            this.setLocalStorage(options);

            if (callback) {
                callback(options);
            }
        }
    }]);
    return Store;
}();

exports.default = Store;

},{"./options":28,"babel-runtime/core-js/json/stringify":1,"babel-runtime/helpers/classCallCheck":3,"babel-runtime/helpers/createClass":4}],30:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _helpers = require('../../common/helpers');

var _localization = require('./localization');

var _options = require('./options');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var View = function () {
    function View() {
        (0, _classCallCheck3.default)(this, View);

        this.options = {};

        for (var option in _options.options) {
            this.options[option] = (0, _helpers.qs)('#' + option);
        }

        this.optionsBlock = (0, _helpers.qs)('.options');
    }

    (0, _createClass3.default)(View, [{
        key: 'localization',
        value: function localization() {
            // too slow select
            var elements = (0, _helpers.qsa)('*[i18n]');
            elements.forEach(function (el) {
                el.innerText = (0, _localization.i18n)(el.getAttribute('i18n'));
            });
        }
    }, {
        key: 'updateOption',
        value: function updateOption(handler) {
            (0, _helpers.$delegate)(this.optionsBlock, '.option', 'click', function (_ref) {
                var target = _ref.target;

                var id = target.id;
                var value = target.children[id].checked;
                handler(id, value);
            });
        }
    }, {
        key: 'showSaveStatus',
        value: function showSaveStatus() {
            var _this = this;

            this.statusText.classList.add('active');
            setTimeout(function () {
                _this.statusText.classList.remove('active');
            }, 750);
        }
    }, {
        key: 'setOptions',
        value: function setOptions(data) {
            if (!this.optionsBlock) {
                return false;
            }

            for (var option in this.options) {
                this.options[option].querySelector('input').checked = data[option];
            }
        }
    }, {
        key: 'getOptions',
        value: function getOptions() {
            var data = {};
            for (var option in this.options) {
                data[option] = this.options[option].checked;
            }
            return data;
        }
    }]);
    return View;
}();

exports.default = View;

},{"../../common/helpers":23,"./localization":26,"./options":28,"babel-runtime/helpers/classCallCheck":3,"babel-runtime/helpers/createClass":4}]},{},[27]);
