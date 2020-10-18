(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}




var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



var _List_Nil = { $: 0 };
var _List_Nil_UNUSED = { $: '[]' };

function _List_Cons(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons_UNUSED(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === elm$core$Basics$EQ ? 0 : ord === elm$core$Basics$LT ? -1 : 1;
	}));
});



// LOG

var _Debug_log = F2(function(tag, value)
{
	return value;
});

var _Debug_log_UNUSED = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString(value)
{
	return '<internals>';
}

function _Debug_toString_UNUSED(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File !== 'undefined' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[36m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash_UNUSED(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.U.G === region.ab.G)
	{
		return 'on line ' + region.U.G;
	}
	return 'on lines ' + region.U.G + ' through ' + region.ab.G;
}



// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	/**_UNUSED/
	if (x.$ === 'Set_elm_builtin')
	{
		x = elm$core$Set$toList(x);
		y = elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = elm$core$Dict$toList(x);
		y = elm$core$Dict$toList(y);
	}
	//*/

	/**/
	if (x.$ < 0)
	{
		x = elm$core$Dict$toList(x);
		y = elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**_UNUSED/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**/
	if (typeof x.$ === 'undefined')
	//*/
	/**_UNUSED/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? elm$core$Basics$LT : n ? elm$core$Basics$GT : elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0 = 0;
var _Utils_Tuple0_UNUSED = { $: '#0' };

function _Utils_Tuple2(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2_UNUSED(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3_UNUSED(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr(c) { return c; }
function _Utils_chr_UNUSED(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return !isNaN(word)
		? elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? elm$core$Maybe$Nothing
		: elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? elm$core$Maybe$Just(n) : elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});




// STRINGS


var _Parser_isSubString = F5(function(smallString, offset, row, col, bigString)
{
	var smallLength = smallString.length;
	var isGood = offset + smallLength <= bigString.length;

	for (var i = 0; isGood && i < smallLength; )
	{
		var code = bigString.charCodeAt(offset);
		isGood =
			smallString[i++] === bigString[offset++]
			&& (
				code === 0x000A /* \n */
					? ( row++, col=1 )
					: ( col++, (code & 0xF800) === 0xD800 ? smallString[i++] === bigString[offset++] : 1 )
			)
	}

	return _Utils_Tuple3(isGood ? offset : -1, row, col);
});



// CHARS


var _Parser_isSubChar = F3(function(predicate, offset, string)
{
	return (
		string.length <= offset
			? -1
			:
		(string.charCodeAt(offset) & 0xF800) === 0xD800
			? (predicate(_Utils_chr(string.substr(offset, 2))) ? offset + 2 : -1)
			:
		(predicate(_Utils_chr(string[offset]))
			? ((string[offset] === '\n') ? -2 : (offset + 1))
			: -1
		)
	);
});


var _Parser_isAsciiCode = F3(function(code, offset, string)
{
	return string.charCodeAt(offset) === code;
});



// NUMBERS


var _Parser_chompBase10 = F2(function(offset, string)
{
	for (; offset < string.length; offset++)
	{
		var code = string.charCodeAt(offset);
		if (code < 0x30 || 0x39 < code)
		{
			return offset;
		}
	}
	return offset;
});


var _Parser_consumeBase = F3(function(base, offset, string)
{
	for (var total = 0; offset < string.length; offset++)
	{
		var digit = string.charCodeAt(offset) - 0x30;
		if (digit < 0 || base <= digit) break;
		total = base * total + digit;
	}
	return _Utils_Tuple2(offset, total);
});


var _Parser_consumeBase16 = F2(function(offset, string)
{
	for (var total = 0; offset < string.length; offset++)
	{
		var code = string.charCodeAt(offset);
		if (0x30 <= code && code <= 0x39)
		{
			total = 16 * total + code - 0x30;
		}
		else if (0x41 <= code && code <= 0x46)
		{
			total = 16 * total + code - 55;
		}
		else if (0x61 <= code && code <= 0x66)
		{
			total = 16 * total + code - 87;
		}
		else
		{
			break;
		}
	}
	return _Utils_Tuple2(offset, total);
});



// FIND STRING


var _Parser_findSubString = F5(function(smallString, offset, row, col, bigString)
{
	var newOffset = bigString.indexOf(smallString, offset);
	var target = newOffset < 0 ? bigString.length : newOffset + smallString.length;

	while (offset < target)
	{
		var code = bigString.charCodeAt(offset++);
		code === 0x000A /* \n */
			? ( col=1, row++ )
			: ( col++, (code & 0xF800) === 0xD800 && offset++ )
	}

	return _Utils_Tuple3(newOffset, row, col);
});



function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**_UNUSED/
function _Json_errorToString(error)
{
	return elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? elm$core$Result$Ok(value)
		: (value instanceof String)
			? elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return (elm$core$Result$isOk(result)) ? result : elm$core$Result$Err(A2(elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return (elm$core$Result$isOk(result)) ? result : elm$core$Result$Err(A2(elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!elm$core$Result$isOk(result))
					{
						return elm$core$Result$Err(A2(elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return elm$core$Result$Ok(elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if (elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return elm$core$Result$Err(elm$json$Json$Decode$OneOf(elm$core$List$reverse(errors)));

		case 1:
			return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!elm$core$Result$isOk(result))
		{
			return elm$core$Result$Err(A2(elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2(elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap_UNUSED(value) { return { $: 0, a: value }; }
function _Json_unwrap_UNUSED(value) { return value.a; }

function _Json_wrap(value) { return value; }
function _Json_unwrap(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.a$,
		impl.a9,
		impl.a6,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	elm$core$Result$isOk(result) || _Debug_crash(2 /**_UNUSED/, _Json_errorToString(result.a) /**/);
	var managers = {};
	var initPair = init(result.a);
	var model = initPair.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		var pair = A2(update, msg, model);
		stepper(model = pair.a, viewMetadata);
		_Platform_enqueueEffects(managers, pair.b, subscriptions(model));
	}

	_Platform_enqueueEffects(managers, initPair.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS
//
// Effects must be queued!
//
// Say your init contains a synchronous command, like Time.now or Time.here
//
//   - This will produce a batch of effects (FX_1)
//   - The synchronous task triggers the subsequent `update` call
//   - This will produce a batch of effects (FX_2)
//
// If we just start dispatching FX_2, subscriptions from FX_2 can be processed
// before subscriptions from FX_1. No good! Earlier versions of this code had
// this problem, leading to these reports:
//
//   https://github.com/elm/core/issues/980
//   https://github.com/elm/core/pull/981
//   https://github.com/elm/compiler/issues/1776
//
// The queue is necessary to avoid ordering issues for synchronous commands.


// Why use true/false here? Why not just check the length of the queue?
// The goal is to detect "are we currently dispatching effects?" If we
// are, we need to bail and let the ongoing while loop handle things.
//
// Now say the queue has 1 element. When we dequeue the final element,
// the queue will be empty, but we are still actively dispatching effects.
// So you could get queue jumping in a really tricky category of cases.
//
var _Platform_effectsQueue = [];
var _Platform_effectsActive = false;


function _Platform_enqueueEffects(managers, cmdBag, subBag)
{
	_Platform_effectsQueue.push({ p: managers, q: cmdBag, r: subBag });

	if (_Platform_effectsActive) return;

	_Platform_effectsActive = true;
	for (var fx; fx = _Platform_effectsQueue.shift(); )
	{
		_Platform_dispatchEffects(fx.p, fx.q, fx.r);
	}
	_Platform_effectsActive = false;
}


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				s: bag.n,
				t: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.t)
		{
			x = temp.s(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		u: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		u: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**/
	var node = args['node'];
	//*/
	/**_UNUSED/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS


function _VirtualDom_noScript(tag)
{
	return tag == 'script' ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return /^(on|formAction$)/i.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,'')) ? '' : value;
}

function _VirtualDom_noJavaScriptUri_UNUSED(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,''))
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value) ? '' : value;
}

function _VirtualDom_noJavaScriptOrHtmlUri_UNUSED(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value)
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2(elm$json$Json$Decode$map, func, handler.a)
				:
			A3(elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		u: func(record.u),
		V: record.V,
		S: record.S
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.u;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.V;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.S) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.a$,
		impl.a9,
		impl.a6,
		function(sendToApp, initialModel) {
			var view = impl.bb;
			/**/
			var domNode = args['node'];
			//*/
			/**_UNUSED/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.a$,
		impl.a9,
		impl.a6,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.I && impl.I(sendToApp)
			var view = impl.bb;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.aQ);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.a7) && (_VirtualDom_doc.title = title = doc.a7);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.a1;
	var onUrlRequest = impl.a2;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		I: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.aw === next.aw
							&& curr.ai === next.ai
							&& curr.as.a === next.as.a
						)
							? elm$browser$Browser$Internal(next)
							: elm$browser$Browser$External(href)
					));
				}
			});
		},
		a$: function(flags)
		{
			return A3(impl.a$, flags, _Browser_getUrl(), key);
		},
		bb: impl.bb,
		a9: impl.a9,
		a6: impl.a6
	});
}

function _Browser_getUrl()
{
	return elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return elm$core$Result$isOk(result) ? elm$core$Maybe$Just(result.a) : elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { aZ: 'hidden', aR: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { aZ: 'mozHidden', aR: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { aZ: 'msHidden', aR: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { aZ: 'webkitHidden', aR: 'webkitvisibilitychange' }
		: { aZ: 'hidden', aR: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail(elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		aC: _Browser_getScene(),
		aK: {
			aM: _Browser_window.pageXOffset,
			aN: _Browser_window.pageYOffset,
			aL: _Browser_doc.documentElement.clientWidth,
			ag: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		aL: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		ag: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			aC: {
				aL: node.scrollWidth,
				ag: node.scrollHeight
			},
			aK: {
				aM: node.scrollLeft,
				aN: node.scrollTop,
				aL: node.clientWidth,
				ag: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			aC: _Browser_getScene(),
			aK: {
				aM: x,
				aN: y,
				aL: _Browser_doc.documentElement.clientWidth,
				ag: _Browser_doc.documentElement.clientHeight
			},
			aW: {
				aM: x + rect.left,
				aN: y + rect.top,
				aL: rect.width,
				ag: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}
var elm$core$Dict$RBEmpty_elm_builtin = {$: -2};
var elm$core$Dict$empty = elm$core$Dict$RBEmpty_elm_builtin;
var elm$core$Basics$identity = function (x) {
	return x;
};
var jschomay$elm_narrative_engine$NarrativeEngine$Debug$State = elm$core$Basics$identity;
var jschomay$elm_narrative_engine$NarrativeEngine$Debug$init = {O: 'Start', P: 'Begin', T: ''};
var author$project$Preview$initialModel = function (initialWorldModel) {
	return {q: jschomay$elm_narrative_engine$NarrativeEngine$Debug$init, A: elm$core$Dict$empty, J: 'You are a (mostly) brave adventurer, searching the lands for bags of gold.  You have climbed this mountain and arrived at the mouth of a cave.', g: initialWorldModel};
};
var elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var elm$core$Array$foldr = F3(
	function (func, baseCase, _n0) {
		var tree = _n0.c;
		var tail = _n0.d;
		var helper = F2(
			function (node, acc) {
				if (!node.$) {
					var subTree = node.a;
					return A3(elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3(elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			elm$core$Elm$JsArray$foldr,
			helper,
			A3(elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var elm$core$Basics$EQ = 1;
var elm$core$Basics$LT = 0;
var elm$core$List$cons = _List_cons;
var elm$core$Array$toList = function (array) {
	return A3(elm$core$Array$foldr, elm$core$List$cons, _List_Nil, array);
};
var elm$core$Basics$GT = 2;
var elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === -2) {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3(elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var elm$core$Dict$toList = function (dict) {
	return A3(
		elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var elm$core$Dict$keys = function (dict) {
	return A3(
		elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2(elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var elm$core$Set$toList = function (_n0) {
	var dict = _n0;
	return elm$core$Dict$keys(dict);
};
var author$project$Preview$entity = F3(
	function (entityString, name, description) {
		return _Utils_Tuple2(
			entityString,
			{N: description, H: name});
	});
var author$project$Preview$initialWorldModelSpec = _List_fromArray(
	[
		A3(author$project$Preview$entity, 'CAVE.location.dark', 'Dark cavern', 'Caves are dark and scary, and habitats for two things: goblins and bags of gold.'),
		A3(author$project$Preview$entity, 'CAVE_ENTRANCE.location', 'Entrance to a cave', 'This seems like a relatively safe place to be.'),
		A3(author$project$Preview$entity, 'PLAYER.fear=1.bagsOfGoldCollected=0.current_location=CAVE_ENTRANCE', 'Yourself', 'You are a (mostly) fearless explorer in search of gold.'),
		A3(author$project$Preview$entity, 'GOBLIN.character.sleeping.current_location=CAVE', 'Sleepy goblin', 'Big, green, ugly, and can\'t seem to keep his eyes open.'),
		A3(author$project$Preview$entity, 'LIGHTER.item.illumination=2.fuel=10.current_location=PLAYER', 'Pocket lighter', '{You don\'t smoke, but it\'s useful to have a lighter on hand, though it\'s|Useful, but} not much of a light source.'),
		A3(author$project$Preview$entity, 'TORCH.item.illumination=0.current_location=CAVE_ENTRANCE', 'Torch', 'This is the go-to illumination solution for adventurers.  It is currently {TORCH.illumination>0?burning bright|unlit}.'),
		A3(author$project$Preview$entity, 'BAG_OF_GOLD.item.current_location=CAVE', 'Bag of gold', '{?Ooooh, sparkly!|Gold, gold!|This is what makes it all worthwhile.}')
	]);
var elm$core$Dict$Black = 1;
var elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: -1, a: a, b: b, c: c, d: d, e: e};
	});
var elm$core$Basics$compare = _Utils_compare;
var elm$core$Dict$Red = 0;
var elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === -1) && (!right.a)) {
			var _n1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === -1) && (!left.a)) {
				var _n3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					0,
					key,
					value,
					A5(elm$core$Dict$RBNode_elm_builtin, 1, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, 1, rK, rV, rLeft, rRight));
			} else {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5(elm$core$Dict$RBNode_elm_builtin, 0, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === -1) && (!left.a)) && (left.d.$ === -1)) && (!left.d.a)) {
				var _n5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _n6 = left.d;
				var _n7 = _n6.a;
				var llK = _n6.b;
				var llV = _n6.c;
				var llLeft = _n6.d;
				var llRight = _n6.e;
				var lRight = left.e;
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					0,
					lK,
					lV,
					A5(elm$core$Dict$RBNode_elm_builtin, 1, llK, llV, llLeft, llRight),
					A5(elm$core$Dict$RBNode_elm_builtin, 1, key, value, lRight, right));
			} else {
				return A5(elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === -2) {
			return A5(elm$core$Dict$RBNode_elm_builtin, 0, key, value, elm$core$Dict$RBEmpty_elm_builtin, elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _n1 = A2(elm$core$Basics$compare, key, nKey);
			switch (_n1) {
				case 0:
					return A5(
						elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3(elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 1:
					return A5(elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3(elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _n0 = A3(elm$core$Dict$insertHelp, key, value, dict);
		if ((_n0.$ === -1) && (!_n0.a)) {
			var _n1 = _n0.a;
			var k = _n0.b;
			var v = _n0.c;
			var l = _n0.d;
			var r = _n0.e;
			return A5(elm$core$Dict$RBNode_elm_builtin, 1, k, v, l, r);
		} else {
			var x = _n0;
			return x;
		}
	});
var author$project$Preview$content__________________________________ = elm$core$Dict$insert;
var elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var author$project$Preview$narrative_content = A3(
	author$project$Preview$content__________________________________,
	'entering dark places with a light source',
	'You can see well enough to enter this dark space.',
	A3(
		author$project$Preview$content__________________________________,
		'entering dark places',
		'You can\'t see anything at all in there.  Better find some kind of light before going in.',
		A3(
			author$project$Preview$content__________________________________,
			'picking up items',
			'You grab the {$.name} to take with you.',
			A3(
				author$project$Preview$content__________________________________,
				'moving around',
				'You go explore over there.',
				A3(
					author$project$Preview$content__________________________________,
					'getting the gold',
					'You nimbly sneak around the sleeping goblin and snatch the bag of gold!',
					A3(
						author$project$Preview$content__________________________________,
						'waking the goblin',
						'There\'s an old saying, \"Let sleeping dogs lie.\"  That applies double when it comes to goblins.  Too late... the goblin wakes up and chases you out of the cave.',
						A3(
							author$project$Preview$content__________________________________,
							'light the torch',
							'You light the torch. Brilliant, fear no more!',
							A3(author$project$Preview$content__________________________________, 'entering the cave the first time', 'You can see a short way into the cave, and bravely enter.  You hear an awful snoring sound...', elm$core$Dict$empty))))))));
var author$project$Preview$rule_______________________ = F3(
	function (k, v, dict) {
		return A3(
			elm$core$Dict$insert,
			k,
			_Utils_Tuple2(
				v,
				{}),
			dict);
	});
var author$project$Preview$rulesSpec = A3(
	author$project$Preview$rule_______________________,
	'getting the gold',
	'\n            ON: BAG_OF_GOLD.current_location=CAVE\n            DO: PLAYER.bagsOfGoldCollected+1\n                BAG_OF_GOLD.current_location=PLAYER\n            ',
	A3(
		author$project$Preview$rule_______________________,
		'waking the goblin',
		'\n            ON: GOBLIN.sleeping\n            DO: PLAYER.current_location=CAVE_ENTRANCE.fear+5\n            ',
		A3(
			author$project$Preview$rule_______________________,
			'light the torch',
			'\n            ON: LIGHTER.fuel>0.current_location=PLAYER\n            IF: TORCH.illumination=0.current_location=PLAYER\n            DO: TORCH.illumination=7\n                LIGHTER.fuel-1\n                PLAYER.fear-1\n            ',
			A3(
				author$project$Preview$rule_______________________,
				'entering the cave the first time',
				'\n            ON: CAVE.!explored\n            IF: *.item.illumination>5.current_location=PLAYER\n            DO: PLAYER.fear+2.current_location=CAVE\n                CAVE.explored\n            ',
				A3(
					author$project$Preview$rule_______________________,
					'entering dark places with a light source',
					'\n            ON: *.location.dark\n            IF: *.item.illumination>5.current_location=PLAYER\n            DO: PLAYER.current_location=$\n            ',
					A3(
						author$project$Preview$rule_______________________,
						'entering dark places',
						'\n            ON: *.location.dark\n            ',
						A3(
							author$project$Preview$rule_______________________,
							'picking up items',
							'\n            ON: *.item.!current_location=PLAYER\n            DO: $.current_location=PLAYER\n            ',
							A3(author$project$Preview$rule_______________________, 'moving around', '\n            ON: *.location\n            DO: PLAYER.current_location=$\n            ', elm$core$Dict$empty))))))));
var elm$core$Basics$append = _Utils_append;
var elm$core$Maybe$Just = function (a) {
	return {$: 0, a: a};
};
var elm$core$Maybe$Nothing = {$: 1};
var elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === -2) {
				return elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _n1 = A2(elm$core$Basics$compare, targetKey, key);
				switch (_n1) {
					case 0:
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 1:
						return elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return elm$core$Maybe$Just(x);
	} else {
		return elm$core$Maybe$Nothing;
	}
};
var elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return elm$core$Maybe$Just(
				f(value));
		} else {
			return elm$core$Maybe$Nothing;
		}
	});
var elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var elm$core$Basics$not = _Basics_not;
var elm$core$Basics$add = _Basics_add;
var elm$core$Basics$gt = _Utils_gt;
var elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var elm$core$List$reverse = function (list) {
	return A3(elm$core$List$foldl, elm$core$List$cons, _List_Nil, list);
};
var elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							elm$core$List$foldl,
							fn,
							acc,
							elm$core$List$reverse(r4)) : A4(elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4(elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2(elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var elm$core$Basics$eq = _Utils_equal;
var elm$core$String$isEmpty = function (string) {
	return string === '';
};
var elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var elm$core$String$trim = _String_trim;
var elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var elm$core$Result$Err = function (a) {
	return {$: 1, a: a};
};
var elm$core$Result$Ok = function (a) {
	return {$: 0, a: a};
};
var elm$parser$Parser$DeadEnd = F3(
	function (row, col, problem) {
		return {Z: col, at: problem, aB: row};
	});
var elm$parser$Parser$problemToDeadEnd = function (p) {
	return A3(elm$parser$Parser$DeadEnd, p.aB, p.Z, p.at);
};
var elm$parser$Parser$Advanced$bagToList = F2(
	function (bag, list) {
		bagToList:
		while (true) {
			switch (bag.$) {
				case 0:
					return list;
				case 1:
					var bag1 = bag.a;
					var x = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2(elm$core$List$cons, x, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
				default:
					var bag1 = bag.a;
					var bag2 = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2(elm$parser$Parser$Advanced$bagToList, bag2, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
			}
		}
	});
var elm$parser$Parser$Advanced$run = F2(
	function (_n0, src) {
		var parse = _n0;
		var _n1 = parse(
			{Z: 1, c: _List_Nil, d: 1, b: 0, aB: 1, a: src});
		if (!_n1.$) {
			var value = _n1.b;
			return elm$core$Result$Ok(value);
		} else {
			var bag = _n1.b;
			return elm$core$Result$Err(
				A2(elm$parser$Parser$Advanced$bagToList, bag, _List_Nil));
		}
	});
var elm$parser$Parser$run = F2(
	function (parser, source) {
		var _n0 = A2(elm$parser$Parser$Advanced$run, parser, source);
		if (!_n0.$) {
			var a = _n0.a;
			return elm$core$Result$Ok(a);
		} else {
			var problems = _n0.a;
			return elm$core$Result$Err(
				A2(elm$core$List$map, elm$parser$Parser$problemToDeadEnd, problems));
		}
	});
var elm$parser$Parser$ExpectingEnd = {$: 10};
var elm$core$Basics$False = 1;
var elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var elm$core$String$length = _String_length;
var elm$parser$Parser$Advanced$Bad = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var elm$parser$Parser$Advanced$Good = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var elm$parser$Parser$Advanced$Parser = elm$core$Basics$identity;
var elm$parser$Parser$Advanced$AddRight = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var elm$parser$Parser$Advanced$DeadEnd = F4(
	function (row, col, problem, contextStack) {
		return {Z: col, aT: contextStack, at: problem, aB: row};
	});
var elm$parser$Parser$Advanced$Empty = {$: 0};
var elm$parser$Parser$Advanced$fromState = F2(
	function (s, x) {
		return A2(
			elm$parser$Parser$Advanced$AddRight,
			elm$parser$Parser$Advanced$Empty,
			A4(elm$parser$Parser$Advanced$DeadEnd, s.aB, s.Z, x, s.c));
	});
var elm$parser$Parser$Advanced$end = function (x) {
	return function (s) {
		return _Utils_eq(
			elm$core$String$length(s.a),
			s.b) ? A3(elm$parser$Parser$Advanced$Good, false, 0, s) : A2(
			elm$parser$Parser$Advanced$Bad,
			false,
			A2(elm$parser$Parser$Advanced$fromState, s, x));
	};
};
var elm$parser$Parser$end = elm$parser$Parser$Advanced$end(elm$parser$Parser$ExpectingEnd);
var elm$core$Basics$always = F2(
	function (a, _n0) {
		return a;
	});
var elm$core$Basics$or = _Basics_or;
var elm$parser$Parser$Advanced$map2 = F3(
	function (func, _n0, _n1) {
		var parseA = _n0;
		var parseB = _n1;
		return function (s0) {
			var _n2 = parseA(s0);
			if (_n2.$ === 1) {
				var p = _n2.a;
				var x = _n2.b;
				return A2(elm$parser$Parser$Advanced$Bad, p, x);
			} else {
				var p1 = _n2.a;
				var a = _n2.b;
				var s1 = _n2.c;
				var _n3 = parseB(s1);
				if (_n3.$ === 1) {
					var p2 = _n3.a;
					var x = _n3.b;
					return A2(elm$parser$Parser$Advanced$Bad, p1 || p2, x);
				} else {
					var p2 = _n3.a;
					var b = _n3.b;
					var s2 = _n3.c;
					return A3(
						elm$parser$Parser$Advanced$Good,
						p1 || p2,
						A2(func, a, b),
						s2);
				}
			}
		};
	});
var elm$parser$Parser$Advanced$ignorer = F2(
	function (keepParser, ignoreParser) {
		return A3(elm$parser$Parser$Advanced$map2, elm$core$Basics$always, keepParser, ignoreParser);
	});
var elm$parser$Parser$ignorer = elm$parser$Parser$Advanced$ignorer;
var elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
	});
var elm$core$Array$branchFactor = 32;
var elm$core$Basics$ceiling = _Basics_ceiling;
var elm$core$Basics$fdiv = _Basics_fdiv;
var elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var elm$core$Basics$toFloat = _Basics_toFloat;
var elm$core$Array$shiftStep = elm$core$Basics$ceiling(
	A2(elm$core$Basics$logBase, 2, elm$core$Array$branchFactor));
var elm$core$Elm$JsArray$empty = _JsArray_empty;
var elm$core$Array$empty = A4(elm$core$Array$Array_elm_builtin, 0, elm$core$Array$shiftStep, elm$core$Elm$JsArray$empty, elm$core$Elm$JsArray$empty);
var elm$core$Array$Leaf = function (a) {
	return {$: 1, a: a};
};
var elm$core$Array$SubTree = function (a) {
	return {$: 0, a: a};
};
var elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _n0 = A2(elm$core$Elm$JsArray$initializeFromList, elm$core$Array$branchFactor, nodes);
			var node = _n0.a;
			var remainingNodes = _n0.b;
			var newAcc = A2(
				elm$core$List$cons,
				elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var elm$core$Tuple$first = function (_n0) {
	var x = _n0.a;
	return x;
};
var elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = elm$core$Basics$ceiling(nodeListSize / elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2(elm$core$Elm$JsArray$initializeFromList, elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2(elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var elm$core$Basics$floor = _Basics_floor;
var elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var elm$core$Basics$mul = _Basics_mul;
var elm$core$Basics$sub = _Basics_sub;
var elm$core$Elm$JsArray$length = _JsArray_length;
var elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.e) {
			return A4(
				elm$core$Array$Array_elm_builtin,
				elm$core$Elm$JsArray$length(builder.h),
				elm$core$Array$shiftStep,
				elm$core$Elm$JsArray$empty,
				builder.h);
		} else {
			var treeLen = builder.e * elm$core$Array$branchFactor;
			var depth = elm$core$Basics$floor(
				A2(elm$core$Basics$logBase, elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? elm$core$List$reverse(builder.i) : builder.i;
			var tree = A2(elm$core$Array$treeFromBuilder, correctNodeList, builder.e);
			return A4(
				elm$core$Array$Array_elm_builtin,
				elm$core$Elm$JsArray$length(builder.h) + treeLen,
				A2(elm$core$Basics$max, 5, depth * elm$core$Array$shiftStep),
				tree,
				builder.h);
		}
	});
var elm$core$Basics$True = 0;
var elm$core$Basics$lt = _Utils_lt;
var elm$core$Array$fromListHelp = F3(
	function (list, nodeList, nodeListSize) {
		fromListHelp:
		while (true) {
			var _n0 = A2(elm$core$Elm$JsArray$initializeFromList, elm$core$Array$branchFactor, list);
			var jsArray = _n0.a;
			var remainingItems = _n0.b;
			if (_Utils_cmp(
				elm$core$Elm$JsArray$length(jsArray),
				elm$core$Array$branchFactor) < 0) {
				return A2(
					elm$core$Array$builderToArray,
					true,
					{i: nodeList, e: nodeListSize, h: jsArray});
			} else {
				var $temp$list = remainingItems,
					$temp$nodeList = A2(
					elm$core$List$cons,
					elm$core$Array$Leaf(jsArray),
					nodeList),
					$temp$nodeListSize = nodeListSize + 1;
				list = $temp$list;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue fromListHelp;
			}
		}
	});
var elm$core$Array$fromList = function (list) {
	if (!list.b) {
		return elm$core$Array$empty;
	} else {
		return A3(elm$core$Array$fromListHelp, list, _List_Nil, 0);
	}
};
var elm$core$Bitwise$shiftRightZfBy = _Bitwise_shiftRightZfBy;
var elm$core$Array$bitMask = 4294967295 >>> (32 - elm$core$Array$shiftStep);
var elm$core$Bitwise$and = _Bitwise_and;
var elm$core$Elm$JsArray$unsafeGet = _JsArray_unsafeGet;
var elm$core$Array$getHelp = F3(
	function (shift, index, tree) {
		getHelp:
		while (true) {
			var pos = elm$core$Array$bitMask & (index >>> shift);
			var _n0 = A2(elm$core$Elm$JsArray$unsafeGet, pos, tree);
			if (!_n0.$) {
				var subTree = _n0.a;
				var $temp$shift = shift - elm$core$Array$shiftStep,
					$temp$index = index,
					$temp$tree = subTree;
				shift = $temp$shift;
				index = $temp$index;
				tree = $temp$tree;
				continue getHelp;
			} else {
				var values = _n0.a;
				return A2(elm$core$Elm$JsArray$unsafeGet, elm$core$Array$bitMask & index, values);
			}
		}
	});
var elm$core$Bitwise$shiftLeftBy = _Bitwise_shiftLeftBy;
var elm$core$Array$tailIndex = function (len) {
	return (len >>> 5) << 5;
};
var elm$core$Basics$ge = _Utils_ge;
var elm$core$Array$get = F2(
	function (index, _n0) {
		var len = _n0.a;
		var startShift = _n0.b;
		var tree = _n0.c;
		var tail = _n0.d;
		return ((index < 0) || (_Utils_cmp(index, len) > -1)) ? elm$core$Maybe$Nothing : ((_Utils_cmp(
			index,
			elm$core$Array$tailIndex(len)) > -1) ? elm$core$Maybe$Just(
			A2(elm$core$Elm$JsArray$unsafeGet, elm$core$Array$bitMask & index, tail)) : elm$core$Maybe$Just(
			A3(elm$core$Array$getHelp, startShift, index, tree)));
	});
var elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var elm$core$Basics$min = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) < 0) ? x : y;
	});
var elm$core$Basics$modBy = _Basics_modBy;
var elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var elm$core$List$all = F2(
	function (isOkay, list) {
		return !A2(
			elm$core$List$any,
			A2(elm$core$Basics$composeL, elm$core$Basics$not, isOkay),
			list);
	});
var elm$core$List$isEmpty = function (xs) {
	if (!xs.b) {
		return true;
	} else {
		return false;
	}
};
var elm$core$List$length = function (xs) {
	return A3(
		elm$core$List$foldl,
		F2(
			function (_n0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var elm$core$Result$map = F2(
	function (func, ra) {
		if (!ra.$) {
			var a = ra.a;
			return elm$core$Result$Ok(
				func(a));
		} else {
			var e = ra.a;
			return elm$core$Result$Err(e);
		}
	});
var elm$parser$Parser$Done = function (a) {
	return {$: 1, a: a};
};
var elm$parser$Parser$Loop = function (a) {
	return {$: 0, a: a};
};
var elm$parser$Parser$Advanced$andThen = F2(
	function (callback, _n0) {
		var parseA = _n0;
		return function (s0) {
			var _n1 = parseA(s0);
			if (_n1.$ === 1) {
				var p = _n1.a;
				var x = _n1.b;
				return A2(elm$parser$Parser$Advanced$Bad, p, x);
			} else {
				var p1 = _n1.a;
				var a = _n1.b;
				var s1 = _n1.c;
				var _n2 = callback(a);
				var parseB = _n2;
				var _n3 = parseB(s1);
				if (_n3.$ === 1) {
					var p2 = _n3.a;
					var x = _n3.b;
					return A2(elm$parser$Parser$Advanced$Bad, p1 || p2, x);
				} else {
					var p2 = _n3.a;
					var b = _n3.b;
					var s2 = _n3.c;
					return A3(elm$parser$Parser$Advanced$Good, p1 || p2, b, s2);
				}
			}
		};
	});
var elm$parser$Parser$andThen = elm$parser$Parser$Advanced$andThen;
var elm$parser$Parser$Advanced$backtrackable = function (_n0) {
	var parse = _n0;
	return function (s0) {
		var _n1 = parse(s0);
		if (_n1.$ === 1) {
			var x = _n1.b;
			return A2(elm$parser$Parser$Advanced$Bad, false, x);
		} else {
			var a = _n1.b;
			var s1 = _n1.c;
			return A3(elm$parser$Parser$Advanced$Good, false, a, s1);
		}
	};
};
var elm$parser$Parser$backtrackable = elm$parser$Parser$Advanced$backtrackable;
var elm$parser$Parser$Expecting = function (a) {
	return {$: 0, a: a};
};
var elm$parser$Parser$Advanced$Token = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var elm$parser$Parser$toToken = function (str) {
	return A2(
		elm$parser$Parser$Advanced$Token,
		str,
		elm$parser$Parser$Expecting(str));
};
var elm$core$Basics$negate = function (n) {
	return -n;
};
var elm$parser$Parser$Advanced$findSubString = _Parser_findSubString;
var elm$parser$Parser$Advanced$fromInfo = F4(
	function (row, col, x, context) {
		return A2(
			elm$parser$Parser$Advanced$AddRight,
			elm$parser$Parser$Advanced$Empty,
			A4(elm$parser$Parser$Advanced$DeadEnd, row, col, x, context));
	});
var elm$parser$Parser$Advanced$chompUntil = function (_n0) {
	var str = _n0.a;
	var expecting = _n0.b;
	return function (s) {
		var _n1 = A5(elm$parser$Parser$Advanced$findSubString, str, s.b, s.aB, s.Z, s.a);
		var newOffset = _n1.a;
		var newRow = _n1.b;
		var newCol = _n1.c;
		return _Utils_eq(newOffset, -1) ? A2(
			elm$parser$Parser$Advanced$Bad,
			false,
			A4(elm$parser$Parser$Advanced$fromInfo, newRow, newCol, expecting, s.c)) : A3(
			elm$parser$Parser$Advanced$Good,
			_Utils_cmp(s.b, newOffset) < 0,
			0,
			{Z: newCol, c: s.c, d: s.d, b: newOffset, aB: newRow, a: s.a});
	};
};
var elm$parser$Parser$chompUntil = function (str) {
	return elm$parser$Parser$Advanced$chompUntil(
		elm$parser$Parser$toToken(str));
};
var elm$parser$Parser$Advanced$commit = function (a) {
	return function (s) {
		return A3(elm$parser$Parser$Advanced$Good, true, a, s);
	};
};
var elm$parser$Parser$commit = elm$parser$Parser$Advanced$commit;
var elm$core$String$slice = _String_slice;
var elm$parser$Parser$Advanced$mapChompedString = F2(
	function (func, _n0) {
		var parse = _n0;
		return function (s0) {
			var _n1 = parse(s0);
			if (_n1.$ === 1) {
				var p = _n1.a;
				var x = _n1.b;
				return A2(elm$parser$Parser$Advanced$Bad, p, x);
			} else {
				var p = _n1.a;
				var a = _n1.b;
				var s1 = _n1.c;
				return A3(
					elm$parser$Parser$Advanced$Good,
					p,
					A2(
						func,
						A3(elm$core$String$slice, s0.b, s1.b, s0.a),
						a),
					s1);
			}
		};
	});
var elm$parser$Parser$Advanced$getChompedString = function (parser) {
	return A2(elm$parser$Parser$Advanced$mapChompedString, elm$core$Basics$always, parser);
};
var elm$parser$Parser$getChompedString = elm$parser$Parser$Advanced$getChompedString;
var elm$parser$Parser$Advanced$keeper = F2(
	function (parseFunc, parseArg) {
		return A3(elm$parser$Parser$Advanced$map2, elm$core$Basics$apL, parseFunc, parseArg);
	});
var elm$parser$Parser$keeper = elm$parser$Parser$Advanced$keeper;
var elm$parser$Parser$Advanced$lazy = function (thunk) {
	return function (s) {
		var _n0 = thunk(0);
		var parse = _n0;
		return parse(s);
	};
};
var elm$parser$Parser$lazy = elm$parser$Parser$Advanced$lazy;
var elm$parser$Parser$Advanced$map = F2(
	function (func, _n0) {
		var parse = _n0;
		return function (s0) {
			var _n1 = parse(s0);
			if (!_n1.$) {
				var p = _n1.a;
				var a = _n1.b;
				var s1 = _n1.c;
				return A3(
					elm$parser$Parser$Advanced$Good,
					p,
					func(a),
					s1);
			} else {
				var p = _n1.a;
				var x = _n1.b;
				return A2(elm$parser$Parser$Advanced$Bad, p, x);
			}
		};
	});
var elm$parser$Parser$map = elm$parser$Parser$Advanced$map;
var elm$parser$Parser$Advanced$Done = function (a) {
	return {$: 1, a: a};
};
var elm$parser$Parser$Advanced$Loop = function (a) {
	return {$: 0, a: a};
};
var elm$parser$Parser$toAdvancedStep = function (step) {
	if (!step.$) {
		var s = step.a;
		return elm$parser$Parser$Advanced$Loop(s);
	} else {
		var a = step.a;
		return elm$parser$Parser$Advanced$Done(a);
	}
};
var elm$parser$Parser$Advanced$loopHelp = F4(
	function (p, state, callback, s0) {
		loopHelp:
		while (true) {
			var _n0 = callback(state);
			var parse = _n0;
			var _n1 = parse(s0);
			if (!_n1.$) {
				var p1 = _n1.a;
				var step = _n1.b;
				var s1 = _n1.c;
				if (!step.$) {
					var newState = step.a;
					var $temp$p = p || p1,
						$temp$state = newState,
						$temp$callback = callback,
						$temp$s0 = s1;
					p = $temp$p;
					state = $temp$state;
					callback = $temp$callback;
					s0 = $temp$s0;
					continue loopHelp;
				} else {
					var result = step.a;
					return A3(elm$parser$Parser$Advanced$Good, p || p1, result, s1);
				}
			} else {
				var p1 = _n1.a;
				var x = _n1.b;
				return A2(elm$parser$Parser$Advanced$Bad, p || p1, x);
			}
		}
	});
var elm$parser$Parser$Advanced$loop = F2(
	function (state, callback) {
		return function (s) {
			return A4(elm$parser$Parser$Advanced$loopHelp, false, state, callback, s);
		};
	});
var elm$parser$Parser$loop = F2(
	function (state, callback) {
		return A2(
			elm$parser$Parser$Advanced$loop,
			state,
			function (s) {
				return A2(
					elm$parser$Parser$map,
					elm$parser$Parser$toAdvancedStep,
					callback(s));
			});
	});
var elm$parser$Parser$Advanced$Append = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var elm$parser$Parser$Advanced$oneOfHelp = F3(
	function (s0, bag, parsers) {
		oneOfHelp:
		while (true) {
			if (!parsers.b) {
				return A2(elm$parser$Parser$Advanced$Bad, false, bag);
			} else {
				var parse = parsers.a;
				var remainingParsers = parsers.b;
				var _n1 = parse(s0);
				if (!_n1.$) {
					var step = _n1;
					return step;
				} else {
					var step = _n1;
					var p = step.a;
					var x = step.b;
					if (p) {
						return step;
					} else {
						var $temp$s0 = s0,
							$temp$bag = A2(elm$parser$Parser$Advanced$Append, bag, x),
							$temp$parsers = remainingParsers;
						s0 = $temp$s0;
						bag = $temp$bag;
						parsers = $temp$parsers;
						continue oneOfHelp;
					}
				}
			}
		}
	});
var elm$parser$Parser$Advanced$oneOf = function (parsers) {
	return function (s) {
		return A3(elm$parser$Parser$Advanced$oneOfHelp, s, elm$parser$Parser$Advanced$Empty, parsers);
	};
};
var elm$parser$Parser$oneOf = elm$parser$Parser$Advanced$oneOf;
var elm$parser$Parser$Problem = function (a) {
	return {$: 12, a: a};
};
var elm$parser$Parser$Advanced$problem = function (x) {
	return function (s) {
		return A2(
			elm$parser$Parser$Advanced$Bad,
			false,
			A2(elm$parser$Parser$Advanced$fromState, s, x));
	};
};
var elm$parser$Parser$problem = function (msg) {
	return elm$parser$Parser$Advanced$problem(
		elm$parser$Parser$Problem(msg));
};
var elm$parser$Parser$Advanced$succeed = function (a) {
	return function (s) {
		return A3(elm$parser$Parser$Advanced$Good, false, a, s);
	};
};
var elm$parser$Parser$succeed = elm$parser$Parser$Advanced$succeed;
var elm$parser$Parser$ExpectingSymbol = function (a) {
	return {$: 8, a: a};
};
var elm$parser$Parser$Advanced$isSubString = _Parser_isSubString;
var elm$parser$Parser$Advanced$token = function (_n0) {
	var str = _n0.a;
	var expecting = _n0.b;
	var progress = !elm$core$String$isEmpty(str);
	return function (s) {
		var _n1 = A5(elm$parser$Parser$Advanced$isSubString, str, s.b, s.aB, s.Z, s.a);
		var newOffset = _n1.a;
		var newRow = _n1.b;
		var newCol = _n1.c;
		return _Utils_eq(newOffset, -1) ? A2(
			elm$parser$Parser$Advanced$Bad,
			false,
			A2(elm$parser$Parser$Advanced$fromState, s, expecting)) : A3(
			elm$parser$Parser$Advanced$Good,
			progress,
			0,
			{Z: newCol, c: s.c, d: s.d, b: newOffset, aB: newRow, a: s.a});
	};
};
var elm$parser$Parser$Advanced$symbol = elm$parser$Parser$Advanced$token;
var elm$parser$Parser$symbol = function (str) {
	return elm$parser$Parser$Advanced$symbol(
		A2(
			elm$parser$Parser$Advanced$Token,
			str,
			elm$parser$Parser$ExpectingSymbol(str)));
};
var elm$random$Random$Seed = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var elm$random$Random$next = function (_n0) {
	var state0 = _n0.a;
	var incr = _n0.b;
	return A2(elm$random$Random$Seed, ((state0 * 1664525) + incr) >>> 0, incr);
};
var elm$random$Random$initialSeed = function (x) {
	var _n0 = elm$random$Random$next(
		A2(elm$random$Random$Seed, 0, 1013904223));
	var state1 = _n0.a;
	var incr = _n0.b;
	var state2 = (state1 + x) >>> 0;
	return elm$random$Random$next(
		A2(elm$random$Random$Seed, state2, incr));
};
var elm$core$Basics$remainderBy = _Basics_remainderBy;
var elm$random$Random$Generator = elm$core$Basics$identity;
var elm$core$Bitwise$xor = _Bitwise_xor;
var elm$random$Random$peel = function (_n0) {
	var state = _n0.a;
	var word = (state ^ (state >>> ((state >>> 28) + 4))) * 277803737;
	return ((word >>> 22) ^ word) >>> 0;
};
var elm$random$Random$int = F2(
	function (a, b) {
		return function (seed0) {
			var _n0 = (_Utils_cmp(a, b) < 0) ? _Utils_Tuple2(a, b) : _Utils_Tuple2(b, a);
			var lo = _n0.a;
			var hi = _n0.b;
			var range = (hi - lo) + 1;
			if (!((range - 1) & range)) {
				return _Utils_Tuple2(
					(((range - 1) & elm$random$Random$peel(seed0)) >>> 0) + lo,
					elm$random$Random$next(seed0));
			} else {
				var threshhold = (((-range) >>> 0) % range) >>> 0;
				var accountForBias = function (seed) {
					accountForBias:
					while (true) {
						var x = elm$random$Random$peel(seed);
						var seedN = elm$random$Random$next(seed);
						if (_Utils_cmp(x, threshhold) < 0) {
							var $temp$seed = seedN;
							seed = $temp$seed;
							continue accountForBias;
						} else {
							return _Utils_Tuple2((x % range) + lo, seedN);
						}
					}
				};
				return accountForBias(seed0);
			}
		};
	});
var elm$random$Random$step = F2(
	function (_n0, seed) {
		var generator = _n0;
		return generator(seed);
	});
var elm$core$Dict$foldl = F3(
	function (func, acc, dict) {
		foldl:
		while (true) {
			if (dict.$ === -2) {
				return acc;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3(elm$core$Dict$foldl, func, acc, left)),
					$temp$dict = right;
				func = $temp$func;
				acc = $temp$acc;
				dict = $temp$dict;
				continue foldl;
			}
		}
	});
var elm$core$Dict$filter = F2(
	function (isGood, dict) {
		return A3(
			elm$core$Dict$foldl,
			F3(
				function (k, v, d) {
					return A2(isGood, k, v) ? A3(elm$core$Dict$insert, k, v, d) : d;
				}),
			elm$core$Dict$empty,
			dict);
	});
var elm$core$Basics$and = _Basics_and;
var elm$core$Maybe$andThen = F2(
	function (callback, maybeValue) {
		if (!maybeValue.$) {
			var value = maybeValue.a;
			return callback(value);
		} else {
			return elm$core$Maybe$Nothing;
		}
	});
var elm$core$Maybe$map2 = F3(
	function (func, ma, mb) {
		if (ma.$ === 1) {
			return elm$core$Maybe$Nothing;
		} else {
			var a = ma.a;
			if (mb.$ === 1) {
				return elm$core$Maybe$Nothing;
			} else {
				var b = mb.a;
				return elm$core$Maybe$Just(
					A2(func, a, b));
			}
		}
	});
var jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$hasStat = F5(
	function (key, comparator, statMatcher, store, entity) {
		if (!statMatcher.$) {
			var value = statMatcher.a;
			return function (actual) {
				return _Utils_eq(
					A2(elm$core$Basics$compare, actual, value),
					comparator);
			}(
				A2(
					elm$core$Maybe$withDefault,
					0,
					A2(elm$core$Dict$get, key, entity.aF)));
		} else {
			var compareID = statMatcher.a;
			var compareKey = statMatcher.b;
			return A2(
				elm$core$Maybe$withDefault,
				false,
				A2(
					elm$core$Maybe$map,
					elm$core$Basics$eq(comparator),
					A3(
						elm$core$Maybe$map2,
						elm$core$Basics$compare,
						A2(elm$core$Dict$get, key, entity.aF),
						A2(
							elm$core$Maybe$andThen,
							A2(
								elm$core$Basics$composeR,
								function ($) {
									return $.aF;
								},
								elm$core$Dict$get(compareKey)),
							A2(elm$core$Dict$get, compareID, store)))));
		}
	});
var elm$core$Dict$member = F2(
	function (key, dict) {
		var _n0 = A2(elm$core$Dict$get, key, dict);
		if (!_n0.$) {
			return true;
		} else {
			return false;
		}
	});
var elm$core$Set$member = F2(
	function (key, _n0) {
		var dict = _n0;
		return A2(elm$core$Dict$member, key, dict);
	});
var jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$hasTag = F2(
	function (value, entity) {
		return A2(elm$core$Set$member, value, entity.aI);
	});
var jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$findSpecific = F3(
	function (id, queries, store) {
		var matchesQueries = function (entity) {
			return A2(
				elm$core$List$all,
				function (q) {
					return A3(jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$queryFn, q, store, entity);
				},
				queries) ? _List_fromArray(
				[
					_Utils_Tuple2(id, entity)
				]) : _List_Nil;
		};
		return A2(
			elm$core$Maybe$withDefault,
			_List_Nil,
			A2(
				elm$core$Maybe$map,
				matchesQueries,
				A2(elm$core$Dict$get, id, store)));
	});
var jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$hasLink = F4(
	function (key, linkMatcher, store, entity) {
		var assertMatch = F2(
			function (matcher, actualID) {
				if (!matcher.$) {
					var expectedID = matcher.a;
					var qs = matcher.b;
					return _Utils_eq(expectedID, actualID) && (!elm$core$List$isEmpty(
						A3(jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$findSpecific, actualID, qs, store)));
				} else {
					var qs = matcher.a;
					return !elm$core$List$isEmpty(
						A3(jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$findSpecific, actualID, qs, store));
				}
			});
		if (!linkMatcher.$) {
			var entityMatcher = linkMatcher.a;
			return A2(
				elm$core$Maybe$withDefault,
				false,
				A2(
					elm$core$Maybe$map,
					assertMatch(entityMatcher),
					A2(elm$core$Dict$get, key, entity.an)));
		} else {
			var compareID = linkMatcher.a;
			var compareKey = linkMatcher.b;
			return A2(
				elm$core$Maybe$withDefault,
				false,
				A3(
					elm$core$Maybe$map2,
					elm$core$Basics$eq,
					A2(elm$core$Dict$get, key, entity.an),
					A2(
						elm$core$Maybe$andThen,
						A2(
							elm$core$Basics$composeR,
							function ($) {
								return $.an;
							},
							elm$core$Dict$get(compareKey)),
						A2(elm$core$Dict$get, compareID, store))));
		}
	});
var jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$queryFn = F2(
	function (q, store) {
		switch (q.$) {
			case 0:
				var value = q.a;
				return jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$hasTag(value);
			case 1:
				var key = q.a;
				var comparator = q.b;
				var value = q.c;
				return A4(jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$hasStat, key, comparator, value, store);
			case 2:
				var key = q.a;
				var value = q.b;
				return A3(jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$hasLink, key, value, store);
			default:
				var nestedQuery = q.a;
				return A2(
					elm$core$Basics$composeL,
					elm$core$Basics$not,
					A2(jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$queryFn, nestedQuery, store));
		}
	});
var jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$findGeneral = F2(
	function (queries, store) {
		var gatherMatches = F2(
			function (id, entity) {
				return A2(
					elm$core$List$all,
					function (q) {
						return A3(jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$queryFn, q, store, entity);
					},
					queries);
			});
		return elm$core$Dict$toList(
			A2(elm$core$Dict$filter, gatherMatches, store));
	});
var jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$query = F2(
	function (matcher, store) {
		if (!matcher.$) {
			var id = matcher.a;
			var queries = matcher.b;
			return A3(jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$findSpecific, id, queries, store);
		} else {
			var queries = matcher.a;
			return A2(jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$findGeneral, queries, store);
		}
	});
var jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$CompareLink = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$CompareStat = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$HasLink = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$HasStat = F3(
	function (a, b, c) {
		return {$: 1, a: a, b: b, c: c};
	});
var jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$Match = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$MatchAny = function (a) {
	return {$: 1, a: a};
};
var jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$SpecificLink = function (a) {
	return {$: 0, a: a};
};
var jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$replaceTrigger = F2(
	function (trigger, matcher) {
		var replaceInSelector = function (id) {
			return (id === '$') ? trigger : id;
		};
		var replaceInQuery = function (q) {
			_n1$3:
			while (true) {
				switch (q.$) {
					case 1:
						if ((q.c.$ === 1) && (q.c.a === '$')) {
							var key = q.a;
							var comparison = q.b;
							var _n3 = q.c;
							var compareKey = _n3.b;
							return A3(
								jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$HasStat,
								key,
								comparison,
								A2(jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$CompareStat, trigger, compareKey));
						} else {
							break _n1$3;
						}
					case 2:
						if (!q.b.$) {
							if ((!q.b.a.$) && (q.b.a.a === '$')) {
								var key = q.a;
								var _n2 = q.b.a;
								var queries = _n2.b;
								return A2(
									jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$HasLink,
									key,
									jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$SpecificLink(
										A2(jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$Match, trigger, queries)));
							} else {
								break _n1$3;
							}
						} else {
							if (q.b.a === '$') {
								var key = q.a;
								var _n4 = q.b;
								var compareKey = _n4.b;
								return A2(
									jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$HasLink,
									key,
									A2(jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$CompareLink, trigger, compareKey));
							} else {
								break _n1$3;
							}
						}
					default:
						break _n1$3;
				}
			}
			return q;
		};
		if (matcher.$ === 1) {
			var queries = matcher.a;
			return jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$MatchAny(
				A2(elm$core$List$map, replaceInQuery, queries));
		} else {
			var id = matcher.a;
			var queries = matcher.b;
			return A2(
				jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$Match,
				replaceInSelector(id),
				A2(elm$core$List$map, replaceInQuery, queries));
		}
	});
var jschomay$elm_narrative_engine$NarrativeEngine$Syntax$Helpers$notEmpty = function (s) {
	return elm$core$String$isEmpty(s) ? elm$parser$Parser$problem('cannot be empty') : elm$parser$Parser$succeed(s);
};
var jschomay$elm_narrative_engine$NarrativeEngine$Syntax$Helpers$sequence = function (list) {
	return A3(
		elm$core$List$foldl,
		F2(
			function (r, acc) {
				if (!r.$) {
					var a = r.a;
					return A2(
						elm$core$Result$map,
						elm$core$List$cons(a),
						acc);
				} else {
					var e = r.a;
					return elm$core$Result$Err(e);
				}
			}),
		elm$core$Result$Ok(_List_Nil),
		list);
};
var jschomay$elm_narrative_engine$NarrativeEngine$Syntax$Helpers$parseMultiple = F2(
	function (parser, strings) {
		return jschomay$elm_narrative_engine$NarrativeEngine$Syntax$Helpers$sequence(
			A2(elm$core$List$map, parser, strings));
	});
var jschomay$elm_narrative_engine$NarrativeEngine$Syntax$NarrativeParser$Looping = 1;
var jschomay$elm_narrative_engine$NarrativeEngine$Syntax$NarrativeParser$Randomly = 2;
var jschomay$elm_narrative_engine$NarrativeEngine$Syntax$NarrativeParser$Sticking = 0;
var jschomay$elm_narrative_engine$NarrativeEngine$Syntax$NarrativeParser$break = elm$parser$Parser$symbol('|');
var jschomay$elm_narrative_engine$NarrativeEngine$Syntax$NarrativeParser$close = elm$parser$Parser$symbol('}');
var jschomay$elm_narrative_engine$NarrativeEngine$Syntax$NarrativeParser$open = elm$parser$Parser$symbol('{');
var elm$core$List$member = F2(
	function (x, xs) {
		return A2(
			elm$core$List$any,
			function (a) {
				return _Utils_eq(a, x);
			},
			xs);
	});
var elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var elm$core$String$replace = F3(
	function (before, after, string) {
		return A2(
			elm$core$String$join,
			after,
			A2(elm$core$String$split, before, string));
	});
var elm$parser$Parser$Advanced$isSubChar = _Parser_isSubChar;
var elm$parser$Parser$Advanced$chompWhileHelp = F5(
	function (isGood, offset, row, col, s0) {
		chompWhileHelp:
		while (true) {
			var newOffset = A3(elm$parser$Parser$Advanced$isSubChar, isGood, offset, s0.a);
			if (_Utils_eq(newOffset, -1)) {
				return A3(
					elm$parser$Parser$Advanced$Good,
					_Utils_cmp(s0.b, offset) < 0,
					0,
					{Z: col, c: s0.c, d: s0.d, b: offset, aB: row, a: s0.a});
			} else {
				if (_Utils_eq(newOffset, -2)) {
					var $temp$isGood = isGood,
						$temp$offset = offset + 1,
						$temp$row = row + 1,
						$temp$col = 1,
						$temp$s0 = s0;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					s0 = $temp$s0;
					continue chompWhileHelp;
				} else {
					var $temp$isGood = isGood,
						$temp$offset = newOffset,
						$temp$row = row,
						$temp$col = col + 1,
						$temp$s0 = s0;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					s0 = $temp$s0;
					continue chompWhileHelp;
				}
			}
		}
	});
var elm$parser$Parser$Advanced$chompWhile = function (isGood) {
	return function (s) {
		return A5(elm$parser$Parser$Advanced$chompWhileHelp, isGood, s.b, s.aB, s.Z, s);
	};
};
var elm$parser$Parser$chompWhile = elm$parser$Parser$Advanced$chompWhile;
var elm$parser$Parser$ExpectingKeyword = function (a) {
	return {$: 9, a: a};
};
var elm$core$Basics$le = _Utils_le;
var elm$core$Char$toCode = _Char_toCode;
var elm$core$Char$isDigit = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var elm$core$Char$isLower = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var elm$core$Char$isUpper = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var elm$core$Char$isAlphaNum = function (_char) {
	return elm$core$Char$isLower(_char) || (elm$core$Char$isUpper(_char) || elm$core$Char$isDigit(_char));
};
var elm$parser$Parser$Advanced$keyword = function (_n0) {
	var kwd = _n0.a;
	var expecting = _n0.b;
	var progress = !elm$core$String$isEmpty(kwd);
	return function (s) {
		var _n1 = A5(elm$parser$Parser$Advanced$isSubString, kwd, s.b, s.aB, s.Z, s.a);
		var newOffset = _n1.a;
		var newRow = _n1.b;
		var newCol = _n1.c;
		return (_Utils_eq(newOffset, -1) || (0 <= A3(
			elm$parser$Parser$Advanced$isSubChar,
			function (c) {
				return elm$core$Char$isAlphaNum(c) || (c === '_');
			},
			newOffset,
			s.a))) ? A2(
			elm$parser$Parser$Advanced$Bad,
			false,
			A2(elm$parser$Parser$Advanced$fromState, s, expecting)) : A3(
			elm$parser$Parser$Advanced$Good,
			progress,
			0,
			{Z: newCol, c: s.c, d: s.d, b: newOffset, aB: newRow, a: s.a});
	};
};
var elm$parser$Parser$keyword = function (kwd) {
	return elm$parser$Parser$Advanced$keyword(
		A2(
			elm$parser$Parser$Advanced$Token,
			kwd,
			elm$parser$Parser$ExpectingKeyword(kwd)));
};
var jschomay$elm_narrative_engine$NarrativeEngine$Syntax$NarrativeParser$fromResult = function (res) {
	if (!res.$) {
		var s = res.a;
		return elm$parser$Parser$succeed(s);
	} else {
		var e = res.a;
		return elm$parser$Parser$problem(e);
	}
};
var jschomay$elm_narrative_engine$NarrativeEngine$Syntax$NarrativeParser$propertyText = function (config) {
	var keywords = A2(
		elm$core$List$map,
		function (_n0) {
			var propName = _n0.a;
			var fn = _n0.b;
			return A2(
				elm$parser$Parser$ignorer,
				elm$parser$Parser$succeed(fn),
				elm$parser$Parser$keyword(propName));
		},
		elm$core$Dict$toList(config.a4));
	var getProp = F2(
		function (id, propFn) {
			return propFn(
				A3(elm$core$String$replace, '$', config.a8, id));
		});
	return A2(
		elm$parser$Parser$andThen,
		jschomay$elm_narrative_engine$NarrativeEngine$Syntax$NarrativeParser$fromResult,
		A2(
			elm$parser$Parser$keeper,
			A2(
				elm$parser$Parser$keeper,
				elm$parser$Parser$succeed(getProp),
				A2(
					elm$parser$Parser$ignorer,
					A2(
						elm$parser$Parser$andThen,
						jschomay$elm_narrative_engine$NarrativeEngine$Syntax$Helpers$notEmpty,
						elm$parser$Parser$getChompedString(
							elm$parser$Parser$chompWhile(
								function (c) {
									return !A2(
										elm$core$List$member,
										c,
										_List_fromArray(
											['{', '.', '|', '}']));
								}))),
					elm$parser$Parser$symbol('.'))),
			A2(
				elm$parser$Parser$ignorer,
				elm$parser$Parser$oneOf(keywords),
				jschomay$elm_narrative_engine$NarrativeEngine$Syntax$NarrativeParser$close)));
};
var jschomay$elm_narrative_engine$NarrativeEngine$Syntax$NarrativeParser$notReserved = function (_char) {
	return !A2(
		elm$core$List$member,
		_char,
		_List_fromArray(
			['{', '}', '|']));
};
var jschomay$elm_narrative_engine$NarrativeEngine$Syntax$NarrativeParser$staticText = A2(
	elm$parser$Parser$andThen,
	jschomay$elm_narrative_engine$NarrativeEngine$Syntax$Helpers$notEmpty,
	elm$parser$Parser$getChompedString(
		A2(
			elm$parser$Parser$ignorer,
			elm$parser$Parser$succeed(0),
			elm$parser$Parser$chompWhile(jschomay$elm_narrative_engine$NarrativeEngine$Syntax$NarrativeParser$notReserved))));
var elm$core$Result$mapError = F2(
	function (f, result) {
		if (!result.$) {
			var v = result.a;
			return elm$core$Result$Ok(v);
		} else {
			var e = result.a;
			return elm$core$Result$Err(
				f(e));
		}
	});
var elm$core$List$intersperse = F2(
	function (sep, xs) {
		if (!xs.b) {
			return _List_Nil;
		} else {
			var hd = xs.a;
			var tl = xs.b;
			var step = F2(
				function (x, rest) {
					return A2(
						elm$core$List$cons,
						sep,
						A2(elm$core$List$cons, x, rest));
				});
			var spersed = A3(elm$core$List$foldr, step, _List_Nil, tl);
			return A2(elm$core$List$cons, hd, spersed);
		}
	});
var elm$core$String$concat = function (strings) {
	return A2(elm$core$String$join, '', strings);
};
var elm$core$String$fromInt = _String_fromNumber;
var jschomay$elm_narrative_engine$NarrativeEngine$Syntax$Helpers$deadEndsToString = function (deadEnds) {
	var problemToString = function (p) {
		switch (p.$) {
			case 0:
				var s = p.a;
				return 'expecting \'' + (s + '\'');
			case 1:
				return 'expecting int';
			case 2:
				return 'expecting hex';
			case 3:
				return 'expecting octal';
			case 4:
				return 'expecting binary';
			case 5:
				return 'expecting float';
			case 6:
				return 'expecting number';
			case 7:
				return 'expecting variable';
			case 8:
				var s = p.a;
				return 'expecting symbol \'' + (s + '\'');
			case 9:
				var s = p.a;
				return 'expecting keyword \'' + (s + '\'');
			case 10:
				return 'expecting end';
			case 11:
				return 'unexpected char';
			case 12:
				var s = p.a;
				return 'problem ' + s;
			default:
				return 'bad repeat';
		}
	};
	var deadEndToString = function (deadend) {
		return problemToString(deadend.at) + (' at row ' + (elm$core$String$fromInt(deadend.aB) + (', col ' + elm$core$String$fromInt(deadend.Z))));
	};
	return elm$core$String$concat(
		A2(
			elm$core$List$intersperse,
			'; ',
			A2(elm$core$List$map, deadEndToString, deadEnds)));
};
var elm$parser$Parser$token = function (str) {
	return elm$parser$Parser$Advanced$token(
		elm$parser$Parser$toToken(str));
};
var jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$HasTag = function (a) {
	return {$: 0, a: a};
};
var jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$Not = function (a) {
	return {$: 3, a: a};
};
var jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$SpecificStat = function (a) {
	return {$: 0, a: a};
};
var elm$core$Char$isAlpha = function (_char) {
	return elm$core$Char$isLower(_char) || elm$core$Char$isUpper(_char);
};
var elm$parser$Parser$UnexpectedChar = {$: 11};
var elm$parser$Parser$Advanced$chompIf = F2(
	function (isGood, expecting) {
		return function (s) {
			var newOffset = A3(elm$parser$Parser$Advanced$isSubChar, isGood, s.b, s.a);
			return _Utils_eq(newOffset, -1) ? A2(
				elm$parser$Parser$Advanced$Bad,
				false,
				A2(elm$parser$Parser$Advanced$fromState, s, expecting)) : (_Utils_eq(newOffset, -2) ? A3(
				elm$parser$Parser$Advanced$Good,
				true,
				0,
				{Z: 1, c: s.c, d: s.d, b: s.b + 1, aB: s.aB + 1, a: s.a}) : A3(
				elm$parser$Parser$Advanced$Good,
				true,
				0,
				{Z: s.Z + 1, c: s.c, d: s.d, b: newOffset, aB: s.aB, a: s.a}));
		};
	});
var elm$parser$Parser$chompIf = function (isGood) {
	return A2(elm$parser$Parser$Advanced$chompIf, isGood, elm$parser$Parser$UnexpectedChar);
};
var jschomay$elm_narrative_engine$NarrativeEngine$Syntax$EntityParser$idParser = function () {
	var valid = function (c) {
		return elm$core$Char$isAlphaNum(c) || A2(
			elm$core$List$member,
			c,
			_List_fromArray(
				['_', '-', ':', '#', '+']));
	};
	return A2(
		elm$parser$Parser$andThen,
		jschomay$elm_narrative_engine$NarrativeEngine$Syntax$Helpers$notEmpty,
		elm$parser$Parser$getChompedString(
			A2(
				elm$parser$Parser$ignorer,
				A2(
					elm$parser$Parser$ignorer,
					elm$parser$Parser$succeed(0),
					elm$parser$Parser$chompIf(elm$core$Char$isAlpha)),
				elm$parser$Parser$chompWhile(valid))));
}();
var elm$core$String$toInt = _String_toInt;
var jschomay$elm_narrative_engine$NarrativeEngine$Syntax$EntityParser$numberParser = function () {
	var int_ = A2(
		elm$parser$Parser$andThen,
		A2(
			elm$core$Basics$composeR,
			elm$core$String$toInt,
			A2(
				elm$core$Basics$composeR,
				elm$core$Maybe$map(elm$parser$Parser$succeed),
				elm$core$Maybe$withDefault(
					elm$parser$Parser$problem('not an int')))),
		elm$parser$Parser$getChompedString(
			elm$parser$Parser$chompWhile(elm$core$Char$isDigit)));
	return elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				A2(
				elm$parser$Parser$keeper,
				A2(
					elm$parser$Parser$ignorer,
					elm$parser$Parser$succeed(elm$core$Basics$negate),
					elm$parser$Parser$symbol('-')),
				int_),
				int_
			]));
}();
var jschomay$elm_narrative_engine$NarrativeEngine$Syntax$EntityParser$propertyNameParser = function () {
	var valid = function (c) {
		return elm$core$Char$isAlphaNum(c) || A2(
			elm$core$List$member,
			c,
			_List_fromArray(
				['_', ':', '#']));
	};
	return A2(
		elm$parser$Parser$andThen,
		jschomay$elm_narrative_engine$NarrativeEngine$Syntax$Helpers$notEmpty,
		elm$parser$Parser$getChompedString(
			A2(
				elm$parser$Parser$ignorer,
				elm$parser$Parser$succeed(0),
				elm$parser$Parser$chompWhile(valid))));
}();
var jschomay$elm_narrative_engine$NarrativeEngine$Syntax$RuleParser$selectorParser = elm$parser$Parser$oneOf(
	_List_fromArray(
		[
			A2(
			elm$parser$Parser$map,
			elm$core$Basics$always(jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$MatchAny),
			elm$parser$Parser$symbol('*')),
			A2(
			elm$parser$Parser$map,
			elm$core$Basics$always(
				jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$Match('$')),
			elm$parser$Parser$symbol('$')),
			A2(elm$parser$Parser$map, jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$Match, jschomay$elm_narrative_engine$NarrativeEngine$Syntax$EntityParser$idParser)
		]));
function jschomay$elm_narrative_engine$NarrativeEngine$Syntax$RuleParser$cyclic$matcherParser() {
	var toMatcher = F2(
		function (selector, queries) {
			return selector(queries);
		});
	return A2(
		elm$parser$Parser$keeper,
		A2(
			elm$parser$Parser$keeper,
			elm$parser$Parser$succeed(toMatcher),
			jschomay$elm_narrative_engine$NarrativeEngine$Syntax$RuleParser$selectorParser),
		jschomay$elm_narrative_engine$NarrativeEngine$Syntax$RuleParser$cyclic$queriesParser());
}
function jschomay$elm_narrative_engine$NarrativeEngine$Syntax$RuleParser$cyclic$queriesParser() {
	var toQuery = F4(
		function (acc, negate, propName, queryConstructor) {
			return negate ? elm$parser$Parser$Loop(
				A2(
					elm$core$List$cons,
					jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$Not(
						queryConstructor(propName)),
					acc)) : elm$parser$Parser$Loop(
				A2(
					elm$core$List$cons,
					queryConstructor(propName),
					acc));
		});
	var compareParser = F2(
		function (kind, mapper) {
			return A2(
				elm$parser$Parser$keeper,
				A2(
					elm$parser$Parser$keeper,
					A2(
						elm$parser$Parser$ignorer,
						A2(
							elm$parser$Parser$ignorer,
							elm$parser$Parser$succeed(mapper),
							elm$parser$Parser$keyword('(' + kind)),
						elm$parser$Parser$chompWhile(
							elm$core$Basics$eq(' '))),
					A2(
						elm$parser$Parser$ignorer,
						elm$parser$Parser$oneOf(
							_List_fromArray(
								[
									A2(
									elm$parser$Parser$map,
									elm$core$Basics$always('$'),
									elm$parser$Parser$token('$')),
									jschomay$elm_narrative_engine$NarrativeEngine$Syntax$EntityParser$idParser
								])),
						elm$parser$Parser$symbol('.'))),
				A2(
					elm$parser$Parser$ignorer,
					jschomay$elm_narrative_engine$NarrativeEngine$Syntax$EntityParser$propertyNameParser,
					elm$parser$Parser$symbol(')')));
		});
	var helper = function (acc) {
		return elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					A2(
					elm$parser$Parser$keeper,
					A2(
						elm$parser$Parser$keeper,
						A2(
							elm$parser$Parser$keeper,
							A2(
								elm$parser$Parser$ignorer,
								elm$parser$Parser$succeed(
									toQuery(acc)),
								elm$parser$Parser$symbol('.')),
							elm$parser$Parser$oneOf(
								_List_fromArray(
									[
										A2(
										elm$parser$Parser$map,
										elm$core$Basics$always(true),
										elm$parser$Parser$symbol('!')),
										elm$parser$Parser$succeed(false)
									]))),
						jschomay$elm_narrative_engine$NarrativeEngine$Syntax$EntityParser$propertyNameParser),
					elm$parser$Parser$oneOf(
						_List_fromArray(
							[
								A2(
								elm$parser$Parser$keeper,
								A2(
									elm$parser$Parser$ignorer,
									elm$parser$Parser$succeed(elm$core$Basics$identity),
									elm$parser$Parser$symbol('>')),
								elm$parser$Parser$oneOf(
									_List_fromArray(
										[
											A2(
											compareParser,
											'stat',
											F3(
												function (compareID, compareKey, key) {
													return A3(
														jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$HasStat,
														key,
														2,
														A2(jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$CompareStat, compareID, compareKey));
												})),
											A2(
											elm$parser$Parser$map,
											function (n) {
												return function (key) {
													return A3(
														jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$HasStat,
														key,
														2,
														jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$SpecificStat(n));
												};
											},
											jschomay$elm_narrative_engine$NarrativeEngine$Syntax$EntityParser$numberParser)
										]))),
								A2(
								elm$parser$Parser$keeper,
								A2(
									elm$parser$Parser$ignorer,
									elm$parser$Parser$succeed(elm$core$Basics$identity),
									elm$parser$Parser$symbol('<')),
								elm$parser$Parser$oneOf(
									_List_fromArray(
										[
											A2(
											compareParser,
											'stat',
											F3(
												function (compareID, compareKey, key) {
													return A3(
														jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$HasStat,
														key,
														0,
														A2(jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$CompareStat, compareID, compareKey));
												})),
											A2(
											elm$parser$Parser$map,
											function (n) {
												return function (key) {
													return A3(
														jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$HasStat,
														key,
														0,
														jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$SpecificStat(n));
												};
											},
											jschomay$elm_narrative_engine$NarrativeEngine$Syntax$EntityParser$numberParser)
										]))),
								A2(
								elm$parser$Parser$keeper,
								A2(
									elm$parser$Parser$ignorer,
									elm$parser$Parser$succeed(elm$core$Basics$identity),
									elm$parser$Parser$symbol('=')),
								elm$parser$Parser$oneOf(
									_List_fromArray(
										[
											A2(
											elm$parser$Parser$map,
											function (n) {
												return function (key) {
													return A3(
														jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$HasStat,
														key,
														1,
														jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$SpecificStat(n));
												};
											},
											jschomay$elm_narrative_engine$NarrativeEngine$Syntax$EntityParser$numberParser),
											A2(
											elm$parser$Parser$map,
											function (_n0) {
												return function (key) {
													return A2(
														jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$HasLink,
														key,
														jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$SpecificLink(
															A2(jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$Match, '$', _List_Nil)));
												};
											},
											elm$parser$Parser$symbol('$')),
											A2(
											elm$parser$Parser$map,
											function (id) {
												return function (key) {
													return A2(
														jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$HasLink,
														key,
														jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$SpecificLink(
															A2(jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$Match, id, _List_Nil)));
												};
											},
											jschomay$elm_narrative_engine$NarrativeEngine$Syntax$EntityParser$idParser),
											A2(
											compareParser,
											'stat',
											F3(
												function (compareID, compareKey, key) {
													return A3(
														jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$HasStat,
														key,
														1,
														A2(jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$CompareStat, compareID, compareKey));
												})),
											A2(
											compareParser,
											'link',
											F3(
												function (compareID, compareKey, key) {
													return A2(
														jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$HasLink,
														key,
														A2(jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$CompareLink, compareID, compareKey));
												})),
											A2(
											elm$parser$Parser$keeper,
											A2(
												elm$parser$Parser$ignorer,
												elm$parser$Parser$succeed(elm$core$Basics$identity),
												elm$parser$Parser$symbol('(')),
											A2(
												elm$parser$Parser$ignorer,
												A2(
													elm$parser$Parser$map,
													function (matcher) {
														return function (key) {
															return A2(
																jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$HasLink,
																key,
																jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$SpecificLink(matcher));
														};
													},
													jschomay$elm_narrative_engine$NarrativeEngine$Syntax$RuleParser$cyclic$matcherParser()),
												elm$parser$Parser$symbol(')')))
										]))),
								elm$parser$Parser$succeed(
								function (t) {
									return jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$HasTag(t);
								})
							]))),
					elm$parser$Parser$succeed(
					elm$parser$Parser$Done(acc))
				]));
	};
	return A2(elm$parser$Parser$loop, _List_Nil, helper);
}
var jschomay$elm_narrative_engine$NarrativeEngine$Syntax$RuleParser$matcherParser = jschomay$elm_narrative_engine$NarrativeEngine$Syntax$RuleParser$cyclic$matcherParser();
jschomay$elm_narrative_engine$NarrativeEngine$Syntax$RuleParser$cyclic$matcherParser = function () {
	return jschomay$elm_narrative_engine$NarrativeEngine$Syntax$RuleParser$matcherParser;
};
var jschomay$elm_narrative_engine$NarrativeEngine$Syntax$RuleParser$queriesParser = jschomay$elm_narrative_engine$NarrativeEngine$Syntax$RuleParser$cyclic$queriesParser();
jschomay$elm_narrative_engine$NarrativeEngine$Syntax$RuleParser$cyclic$queriesParser = function () {
	return jschomay$elm_narrative_engine$NarrativeEngine$Syntax$RuleParser$queriesParser;
};
var jschomay$elm_narrative_engine$NarrativeEngine$Syntax$RuleParser$parseMatcher = function (text) {
	return A2(
		elm$core$Result$mapError,
		jschomay$elm_narrative_engine$NarrativeEngine$Syntax$Helpers$deadEndsToString,
		A2(
			elm$parser$Parser$run,
			A2(elm$parser$Parser$ignorer, jschomay$elm_narrative_engine$NarrativeEngine$Syntax$RuleParser$matcherParser, elm$parser$Parser$end),
			text));
};
var jschomay$elm_narrative_engine$NarrativeEngine$Syntax$NarrativeParser$conditionalText = function (config) {
	var assert = function (matcher) {
		return !elm$core$List$isEmpty(
			A2(jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$query, matcher, config.g));
	};
	var process = function (_n5) {
		var queryText = _n5.a;
		var ifText = _n5.b;
		var elseText = _n5.c;
		return function (_final) {
			if (!_final.$) {
				if (_final.a) {
					return elm$parser$Parser$commit(ifText);
				} else {
					return elm$parser$Parser$commit(elseText);
				}
			} else {
				var e = _final.a;
				return elm$parser$Parser$problem(e);
			}
		}(
			A2(
				elm$core$Result$map,
				elm$core$List$all(
					A2(
						elm$core$Basics$composeR,
						jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$replaceTrigger(config.a8),
						assert)),
				A2(
					jschomay$elm_narrative_engine$NarrativeEngine$Syntax$Helpers$parseMultiple,
					jschomay$elm_narrative_engine$NarrativeEngine$Syntax$RuleParser$parseMatcher,
					A2(
						elm$core$List$map,
						elm$core$String$trim,
						A2(elm$core$String$split, '&', queryText)))));
	};
	return A2(
		elm$parser$Parser$andThen,
		process,
		A2(
			elm$parser$Parser$keeper,
			A2(
				elm$parser$Parser$keeper,
				A2(
					elm$parser$Parser$keeper,
					elm$parser$Parser$succeed(
						F3(
							function (a, b, c) {
								return _Utils_Tuple3(a, b, c);
							})),
					A2(
						elm$parser$Parser$ignorer,
						A2(
							elm$parser$Parser$andThen,
							jschomay$elm_narrative_engine$NarrativeEngine$Syntax$Helpers$notEmpty,
							elm$parser$Parser$getChompedString(
								elm$parser$Parser$chompUntil('?'))),
						elm$parser$Parser$symbol('?'))),
				elm$parser$Parser$lazy(
					function (_n2) {
						return jschomay$elm_narrative_engine$NarrativeEngine$Syntax$NarrativeParser$parseText(config);
					})),
			elm$parser$Parser$oneOf(
				_List_fromArray(
					[
						A2(
						elm$parser$Parser$keeper,
						A2(
							elm$parser$Parser$ignorer,
							elm$parser$Parser$succeed(elm$core$Basics$identity),
							jschomay$elm_narrative_engine$NarrativeEngine$Syntax$NarrativeParser$break),
						A2(
							elm$parser$Parser$ignorer,
							elm$parser$Parser$lazy(
								function (_n3) {
									return jschomay$elm_narrative_engine$NarrativeEngine$Syntax$NarrativeParser$parseText(config);
								}),
							jschomay$elm_narrative_engine$NarrativeEngine$Syntax$NarrativeParser$close)),
						A2(
						elm$parser$Parser$map,
						elm$core$Basics$always(''),
						jschomay$elm_narrative_engine$NarrativeEngine$Syntax$NarrativeParser$close)
					]))));
};
var jschomay$elm_narrative_engine$NarrativeEngine$Syntax$NarrativeParser$cyclingText = function (config) {
	var helper = function (acc) {
		return elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					A2(
					elm$parser$Parser$map,
					elm$core$Basics$always(
						elm$parser$Parser$Loop(
							A2(elm$core$List$cons, '', acc))),
					jschomay$elm_narrative_engine$NarrativeEngine$Syntax$NarrativeParser$break),
					A2(
					elm$parser$Parser$map,
					elm$core$Basics$always(
						elm$parser$Parser$Done(
							elm$core$List$reverse(
								A2(elm$core$List$cons, '', acc)))),
					jschomay$elm_narrative_engine$NarrativeEngine$Syntax$NarrativeParser$close),
					A2(
					elm$parser$Parser$keeper,
					A2(
						elm$parser$Parser$keeper,
						elm$parser$Parser$succeed(
							F2(
								function (a, f) {
									return f(a);
								})),
						elm$parser$Parser$lazy(
							function (_n1) {
								return jschomay$elm_narrative_engine$NarrativeEngine$Syntax$NarrativeParser$parseText(config);
							})),
					elm$parser$Parser$oneOf(
						_List_fromArray(
							[
								A2(
								elm$parser$Parser$map,
								elm$core$Basics$always(
									function (t) {
										return elm$parser$Parser$Loop(
											A2(elm$core$List$cons, t, acc));
									}),
								jschomay$elm_narrative_engine$NarrativeEngine$Syntax$NarrativeParser$break),
								A2(
								elm$parser$Parser$map,
								elm$core$Basics$always(
									function (t) {
										return elm$parser$Parser$Done(
											elm$core$List$reverse(
												A2(elm$core$List$cons, t, acc)));
									}),
								jschomay$elm_narrative_engine$NarrativeEngine$Syntax$NarrativeParser$close)
							])))
				]));
	};
	var findCurrent = F2(
		function (cycleType, l) {
			switch (cycleType) {
				case 2:
					return A2(
						elm$core$Maybe$withDefault,
						'ERROR finding correct cycling text',
						function (i) {
							return A2(
								elm$core$Array$get,
								i,
								elm$core$Array$fromList(l));
						}(
							A2(
								elm$core$Basics$modBy,
								elm$core$List$length(l),
								A2(
									elm$random$Random$step,
									A2(elm$random$Random$int, 0, 200),
									elm$random$Random$initialSeed(
										config.aU * elm$core$String$length(config.a8))).a)));
				case 1:
					return A2(
						elm$core$Maybe$withDefault,
						'ERROR finding correct cycling text',
						A2(
							elm$core$Array$get,
							A2(
								elm$core$Basics$modBy,
								elm$core$List$length(l),
								config.aU),
							elm$core$Array$fromList(l)));
				default:
					return A2(
						elm$core$Maybe$withDefault,
						'ERROR finding correct cycling text',
						A2(
							elm$core$Array$get,
							A2(
								elm$core$Basics$min,
								elm$core$List$length(l) - 1,
								config.aU),
							elm$core$Array$fromList(l)));
			}
		});
	return A2(
		elm$parser$Parser$keeper,
		A2(
			elm$parser$Parser$keeper,
			elm$parser$Parser$succeed(findCurrent),
			elm$parser$Parser$oneOf(
				_List_fromArray(
					[
						A2(
						elm$parser$Parser$map,
						elm$core$Basics$always(1),
						elm$parser$Parser$symbol('~')),
						A2(
						elm$parser$Parser$map,
						elm$core$Basics$always(2),
						elm$parser$Parser$symbol('?')),
						elm$parser$Parser$succeed(0)
					]))),
		A2(elm$parser$Parser$loop, _List_Nil, helper));
};
var jschomay$elm_narrative_engine$NarrativeEngine$Syntax$NarrativeParser$parseText = function (config) {
	var topLevel = elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				A2(
				elm$parser$Parser$keeper,
				A2(
					elm$parser$Parser$ignorer,
					elm$parser$Parser$succeed(elm$core$Basics$identity),
					jschomay$elm_narrative_engine$NarrativeEngine$Syntax$NarrativeParser$open),
				elm$parser$Parser$oneOf(
					_List_fromArray(
						[
							elm$parser$Parser$backtrackable(
							jschomay$elm_narrative_engine$NarrativeEngine$Syntax$NarrativeParser$conditionalText(config)),
							elm$parser$Parser$backtrackable(
							jschomay$elm_narrative_engine$NarrativeEngine$Syntax$NarrativeParser$propertyText(config)),
							elm$parser$Parser$backtrackable(
							jschomay$elm_narrative_engine$NarrativeEngine$Syntax$NarrativeParser$cyclingText(config))
						]))),
				jschomay$elm_narrative_engine$NarrativeEngine$Syntax$NarrativeParser$staticText
			]));
	var join = F2(
		function (next, base) {
			return elm$parser$Parser$Loop(
				_Utils_ap(next, base));
		});
	var l = function (base) {
		return elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					A2(
					elm$parser$Parser$map,
					join(base),
					topLevel),
					elm$parser$Parser$succeed(
					elm$parser$Parser$Done(base))
				]));
	};
	return A2(
		elm$parser$Parser$keeper,
		elm$parser$Parser$succeed(elm$core$Basics$identity),
		A2(elm$parser$Parser$loop, '', l));
};
var jschomay$elm_narrative_engine$NarrativeEngine$Syntax$NarrativeParser$top = function (config) {
	return A2(
		elm$parser$Parser$ignorer,
		jschomay$elm_narrative_engine$NarrativeEngine$Syntax$NarrativeParser$parseText(config),
		elm$parser$Parser$end);
};
var jschomay$elm_narrative_engine$NarrativeEngine$Syntax$NarrativeParser$parse = F2(
	function (config, text) {
		var _n0 = A2(
			elm$parser$Parser$run,
			jschomay$elm_narrative_engine$NarrativeEngine$Syntax$NarrativeParser$top(config),
			text);
		if (!_n0.$) {
			var parsed = _n0.a;
			return A2(
				elm$core$List$filter,
				A2(
					elm$core$Basics$composeL,
					A2(elm$core$Basics$composeL, elm$core$Basics$not, elm$core$String$isEmpty),
					elm$core$String$trim),
				A2(elm$core$String$split, '---', parsed));
		} else {
			var e = _n0.a;
			return _List_fromArray(
				['ERROR could not parse: ' + text]);
		}
	});
var author$project$Preview$getDescription = F3(
	function (config, entityID, worldModel_) {
		return A2(
			elm$core$Maybe$withDefault,
			'ERROR parsing narrative content for ' + entityID,
			elm$core$List$head(
				A2(
					jschomay$elm_narrative_engine$NarrativeEngine$Syntax$NarrativeParser$parse,
					config,
					A2(
						elm$core$Maybe$withDefault,
						'ERROR can\'t find entity ' + entityID,
						A2(
							elm$core$Maybe$map,
							function ($) {
								return $.N;
							},
							A2(elm$core$Dict$get, entityID, worldModel_))))));
	});
var author$project$Preview$getName = F2(
	function (entityID, worldModel_) {
		return A2(
			elm$core$Maybe$withDefault,
			'ERROR can\'t find entity ' + entityID,
			A2(
				elm$core$Maybe$map,
				function ($) {
					return $.H;
				},
				A2(elm$core$Dict$get, entityID, worldModel_)));
	});
var elm$core$Dict$singleton = F2(
	function (key, value) {
		return A5(elm$core$Dict$RBNode_elm_builtin, 1, key, value, elm$core$Dict$RBEmpty_elm_builtin, elm$core$Dict$RBEmpty_elm_builtin);
	});
var author$project$Preview$makeConfig = F3(
	function (trigger, matchedRule, model) {
		return {
			aU: A2(
				elm$core$Maybe$withDefault,
				0,
				A2(elm$core$Dict$get, matchedRule, model.A)),
			a4: A2(
				elm$core$Dict$singleton,
				'name',
				function (id) {
					return elm$core$Result$Ok(
						A2(author$project$Preview$getName, id, model.g));
				}),
			a8: trigger,
			g: model.g
		};
	});
var elm$core$Dict$getMin = function (dict) {
	getMin:
	while (true) {
		if ((dict.$ === -1) && (dict.d.$ === -1)) {
			var left = dict.d;
			var $temp$dict = left;
			dict = $temp$dict;
			continue getMin;
		} else {
			return dict;
		}
	}
};
var elm$core$Dict$moveRedLeft = function (dict) {
	if (((dict.$ === -1) && (dict.d.$ === -1)) && (dict.e.$ === -1)) {
		if ((dict.e.d.$ === -1) && (!dict.e.d.a)) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _n1 = dict.d;
			var lClr = _n1.a;
			var lK = _n1.b;
			var lV = _n1.c;
			var lLeft = _n1.d;
			var lRight = _n1.e;
			var _n2 = dict.e;
			var rClr = _n2.a;
			var rK = _n2.b;
			var rV = _n2.c;
			var rLeft = _n2.d;
			var _n3 = rLeft.a;
			var rlK = rLeft.b;
			var rlV = rLeft.c;
			var rlL = rLeft.d;
			var rlR = rLeft.e;
			var rRight = _n2.e;
			return A5(
				elm$core$Dict$RBNode_elm_builtin,
				0,
				rlK,
				rlV,
				A5(
					elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					rlL),
				A5(elm$core$Dict$RBNode_elm_builtin, 1, rK, rV, rlR, rRight));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _n4 = dict.d;
			var lClr = _n4.a;
			var lK = _n4.b;
			var lV = _n4.c;
			var lLeft = _n4.d;
			var lRight = _n4.e;
			var _n5 = dict.e;
			var rClr = _n5.a;
			var rK = _n5.b;
			var rV = _n5.c;
			var rLeft = _n5.d;
			var rRight = _n5.e;
			if (clr === 1) {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			} else {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var elm$core$Dict$moveRedRight = function (dict) {
	if (((dict.$ === -1) && (dict.d.$ === -1)) && (dict.e.$ === -1)) {
		if ((dict.d.d.$ === -1) && (!dict.d.d.a)) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _n1 = dict.d;
			var lClr = _n1.a;
			var lK = _n1.b;
			var lV = _n1.c;
			var _n2 = _n1.d;
			var _n3 = _n2.a;
			var llK = _n2.b;
			var llV = _n2.c;
			var llLeft = _n2.d;
			var llRight = _n2.e;
			var lRight = _n1.e;
			var _n4 = dict.e;
			var rClr = _n4.a;
			var rK = _n4.b;
			var rV = _n4.c;
			var rLeft = _n4.d;
			var rRight = _n4.e;
			return A5(
				elm$core$Dict$RBNode_elm_builtin,
				0,
				lK,
				lV,
				A5(elm$core$Dict$RBNode_elm_builtin, 1, llK, llV, llLeft, llRight),
				A5(
					elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					lRight,
					A5(elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight)));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _n5 = dict.d;
			var lClr = _n5.a;
			var lK = _n5.b;
			var lV = _n5.c;
			var lLeft = _n5.d;
			var lRight = _n5.e;
			var _n6 = dict.e;
			var rClr = _n6.a;
			var rK = _n6.b;
			var rV = _n6.c;
			var rLeft = _n6.d;
			var rRight = _n6.e;
			if (clr === 1) {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			} else {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var elm$core$Dict$removeHelpPrepEQGT = F7(
	function (targetKey, dict, color, key, value, left, right) {
		if ((left.$ === -1) && (!left.a)) {
			var _n1 = left.a;
			var lK = left.b;
			var lV = left.c;
			var lLeft = left.d;
			var lRight = left.e;
			return A5(
				elm$core$Dict$RBNode_elm_builtin,
				color,
				lK,
				lV,
				lLeft,
				A5(elm$core$Dict$RBNode_elm_builtin, 0, key, value, lRight, right));
		} else {
			_n2$2:
			while (true) {
				if ((right.$ === -1) && (right.a === 1)) {
					if (right.d.$ === -1) {
						if (right.d.a === 1) {
							var _n3 = right.a;
							var _n4 = right.d;
							var _n5 = _n4.a;
							return elm$core$Dict$moveRedRight(dict);
						} else {
							break _n2$2;
						}
					} else {
						var _n6 = right.a;
						var _n7 = right.d;
						return elm$core$Dict$moveRedRight(dict);
					}
				} else {
					break _n2$2;
				}
			}
			return dict;
		}
	});
var elm$core$Dict$removeMin = function (dict) {
	if ((dict.$ === -1) && (dict.d.$ === -1)) {
		var color = dict.a;
		var key = dict.b;
		var value = dict.c;
		var left = dict.d;
		var lColor = left.a;
		var lLeft = left.d;
		var right = dict.e;
		if (lColor === 1) {
			if ((lLeft.$ === -1) && (!lLeft.a)) {
				var _n3 = lLeft.a;
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					color,
					key,
					value,
					elm$core$Dict$removeMin(left),
					right);
			} else {
				var _n4 = elm$core$Dict$moveRedLeft(dict);
				if (_n4.$ === -1) {
					var nColor = _n4.a;
					var nKey = _n4.b;
					var nValue = _n4.c;
					var nLeft = _n4.d;
					var nRight = _n4.e;
					return A5(
						elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						elm$core$Dict$removeMin(nLeft),
						nRight);
				} else {
					return elm$core$Dict$RBEmpty_elm_builtin;
				}
			}
		} else {
			return A5(
				elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				value,
				elm$core$Dict$removeMin(left),
				right);
		}
	} else {
		return elm$core$Dict$RBEmpty_elm_builtin;
	}
};
var elm$core$Dict$removeHelp = F2(
	function (targetKey, dict) {
		if (dict.$ === -2) {
			return elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_cmp(targetKey, key) < 0) {
				if ((left.$ === -1) && (left.a === 1)) {
					var _n4 = left.a;
					var lLeft = left.d;
					if ((lLeft.$ === -1) && (!lLeft.a)) {
						var _n6 = lLeft.a;
						return A5(
							elm$core$Dict$RBNode_elm_builtin,
							color,
							key,
							value,
							A2(elm$core$Dict$removeHelp, targetKey, left),
							right);
					} else {
						var _n7 = elm$core$Dict$moveRedLeft(dict);
						if (_n7.$ === -1) {
							var nColor = _n7.a;
							var nKey = _n7.b;
							var nValue = _n7.c;
							var nLeft = _n7.d;
							var nRight = _n7.e;
							return A5(
								elm$core$Dict$balance,
								nColor,
								nKey,
								nValue,
								A2(elm$core$Dict$removeHelp, targetKey, nLeft),
								nRight);
						} else {
							return elm$core$Dict$RBEmpty_elm_builtin;
						}
					}
				} else {
					return A5(
						elm$core$Dict$RBNode_elm_builtin,
						color,
						key,
						value,
						A2(elm$core$Dict$removeHelp, targetKey, left),
						right);
				}
			} else {
				return A2(
					elm$core$Dict$removeHelpEQGT,
					targetKey,
					A7(elm$core$Dict$removeHelpPrepEQGT, targetKey, dict, color, key, value, left, right));
			}
		}
	});
var elm$core$Dict$removeHelpEQGT = F2(
	function (targetKey, dict) {
		if (dict.$ === -1) {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_eq(targetKey, key)) {
				var _n1 = elm$core$Dict$getMin(right);
				if (_n1.$ === -1) {
					var minKey = _n1.b;
					var minValue = _n1.c;
					return A5(
						elm$core$Dict$balance,
						color,
						minKey,
						minValue,
						left,
						elm$core$Dict$removeMin(right));
				} else {
					return elm$core$Dict$RBEmpty_elm_builtin;
				}
			} else {
				return A5(
					elm$core$Dict$balance,
					color,
					key,
					value,
					left,
					A2(elm$core$Dict$removeHelp, targetKey, right));
			}
		} else {
			return elm$core$Dict$RBEmpty_elm_builtin;
		}
	});
var elm$core$Dict$remove = F2(
	function (key, dict) {
		var _n0 = A2(elm$core$Dict$removeHelp, key, dict);
		if ((_n0.$ === -1) && (!_n0.a)) {
			var _n1 = _n0.a;
			var k = _n0.b;
			var v = _n0.c;
			var l = _n0.d;
			var r = _n0.e;
			return A5(elm$core$Dict$RBNode_elm_builtin, 1, k, v, l, r);
		} else {
			var x = _n0;
			return x;
		}
	});
var elm$core$Dict$update = F3(
	function (targetKey, alter, dictionary) {
		var _n0 = alter(
			A2(elm$core$Dict$get, targetKey, dictionary));
		if (!_n0.$) {
			var value = _n0.a;
			return A3(elm$core$Dict$insert, targetKey, value, dictionary);
		} else {
			return A2(elm$core$Dict$remove, targetKey, dictionary);
		}
	});
var elm$core$List$sortBy = _List_sortBy;
var elm$core$Tuple$second = function (_n0) {
	var y = _n0.b;
	return y;
};
var jschomay$elm_narrative_engine$NarrativeEngine$Core$Rules$matchCondition = F3(
	function (trigger, store, matcher) {
		return !elm$core$List$isEmpty(
			function (m) {
				return A2(jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$query, m, store);
			}(
				A2(jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$replaceTrigger, trigger, matcher)));
	});
var jschomay$elm_narrative_engine$NarrativeEngine$Core$Rules$matchTrigger = F3(
	function (store, trigger, triggerMatcher) {
		if (!triggerMatcher.$) {
			var t = triggerMatcher.a;
			return _Utils_eq(trigger, t);
		} else {
			if (!triggerMatcher.a.$) {
				var em = triggerMatcher.a;
				var id = em.a;
				var qs = em.b;
				return _Utils_eq(id, trigger) && (!elm$core$List$isEmpty(
					A2(jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$query, em, store)));
			} else {
				var qs = triggerMatcher.a.a;
				return !elm$core$List$isEmpty(
					A2(
						jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$query,
						A2(jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$Match, trigger, qs),
						store));
			}
		}
	});
var jschomay$elm_narrative_engine$NarrativeEngine$Core$Rules$weight = function (_n0) {
	var trigger = _n0.a8;
	var conditions = _n0._;
	var queryScore = function (matcher) {
		if (!matcher.$) {
			var id = matcher.a;
			var queries = matcher.b;
			return elm$core$List$length(queries);
		} else {
			var queries = matcher.a;
			return elm$core$List$length(queries);
		}
	};
	var triggerScore = function () {
		if (!trigger.$) {
			return 0;
		} else {
			if (!trigger.a.$) {
				var em = trigger.a;
				return 100 + queryScore(em);
			} else {
				var em = trigger.a;
				return 0 + queryScore(em);
			}
		}
	}();
	var conditionsScore = A3(
		elm$core$List$foldl,
		F2(
			function (matcher, acc) {
				if (!matcher.$) {
					return (10 + queryScore(matcher)) + acc;
				} else {
					return (0 + queryScore(matcher)) + acc;
				}
			}),
		0,
		conditions);
	return conditionsScore + triggerScore;
};
var jschomay$elm_narrative_engine$NarrativeEngine$Core$Rules$findMatchingRule = F3(
	function (trigger, rules, store) {
		return elm$core$List$head(
			elm$core$List$reverse(
				A2(
					elm$core$List$sortBy,
					A2(elm$core$Basics$composeR, elm$core$Tuple$second, jschomay$elm_narrative_engine$NarrativeEngine$Core$Rules$weight),
					elm$core$Dict$toList(
						A2(
							elm$core$Dict$filter,
							F2(
								function (ruleId, rule) {
									return A3(jschomay$elm_narrative_engine$NarrativeEngine$Core$Rules$matchTrigger, store, trigger, rule.a8) && A2(
										elm$core$List$all,
										A2(jschomay$elm_narrative_engine$NarrativeEngine$Core$Rules$matchCondition, trigger, store),
										rule._);
								}),
							rules)))));
	});
var elm$core$Set$Set_elm_builtin = elm$core$Basics$identity;
var elm$core$Set$insert = F2(
	function (key, _n0) {
		var dict = _n0;
		return A3(elm$core$Dict$insert, key, 0, dict);
	});
var jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$addTag = F2(
	function (value, entity) {
		return _Utils_update(
			entity,
			{
				aI: A2(elm$core$Set$insert, value, entity.aI)
			});
	});
var jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$decStat = F3(
	function (key, delta, entity) {
		var current = A2(
			elm$core$Maybe$withDefault,
			0,
			A2(elm$core$Dict$get, key, entity.aF));
		return _Utils_update(
			entity,
			{
				aF: A3(elm$core$Dict$insert, key, current - delta, entity.aF)
			});
	});
var jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$incStat = F3(
	function (key, delta, entity) {
		var current = A2(
			elm$core$Maybe$withDefault,
			0,
			A2(elm$core$Dict$get, key, entity.aF));
		return _Utils_update(
			entity,
			{
				aF: A3(elm$core$Dict$insert, key, current + delta, entity.aF)
			});
	});
var elm$core$Set$remove = F2(
	function (key, _n0) {
		var dict = _n0;
		return A2(elm$core$Dict$remove, key, dict);
	});
var jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$removeTag = F2(
	function (value, entity) {
		return _Utils_update(
			entity,
			{
				aI: A2(elm$core$Set$remove, value, entity.aI)
			});
	});
var jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$setLink = F3(
	function (key, value, entity) {
		return _Utils_update(
			entity,
			{
				an: A3(elm$core$Dict$insert, key, value, entity.an)
			});
	});
var jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$setStat = F3(
	function (key, value, entity) {
		return _Utils_update(
			entity,
			{
				aF: A3(elm$core$Dict$insert, key, value, entity.aF)
			});
	});
var jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$update = F3(
	function (id, updateFn, store) {
		return A3(
			elm$core$Dict$update,
			id,
			elm$core$Maybe$map(updateFn),
			store);
	});
var jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$applyChanges = F3(
	function (entityUpdates, trigger, store) {
		var parseID = function (id) {
			if (id === '$') {
				return trigger;
			} else {
				return id;
			}
		};
		var applyChange = F3(
			function (id, change, updated_store) {
				switch (change.$) {
					case 0:
						var tag_ = change.a;
						return A3(
							jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$update,
							id,
							jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$addTag(tag_),
							updated_store);
					case 1:
						var tag_ = change.a;
						return A3(
							jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$update,
							id,
							jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$removeTag(tag_),
							updated_store);
					case 2:
						var key = change.a;
						var stat_ = change.b;
						return A3(
							jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$update,
							id,
							A2(jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$setStat, key, stat_),
							updated_store);
					case 3:
						var key = change.a;
						var amount = change.b;
						return A3(
							jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$update,
							id,
							A2(jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$incStat, key, amount),
							updated_store);
					case 4:
						var key = change.a;
						var amount = change.b;
						return A3(
							jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$update,
							id,
							A2(jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$decStat, key, amount),
							updated_store);
					default:
						if (!change.b.$) {
							var key = change.a;
							var linkID = change.b.a;
							return A3(
								jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$update,
								id,
								A2(
									jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$setLink,
									key,
									parseID(linkID)),
								updated_store);
						} else {
							var key = change.a;
							var _n3 = change.b;
							var linkID = _n3.a;
							var linkKey = _n3.b;
							return A2(
								elm$core$Maybe$withDefault,
								updated_store,
								A2(
									elm$core$Maybe$map,
									function (targetID) {
										return A3(
											jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$update,
											id,
											A2(jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$setLink, key, targetID),
											updated_store);
									},
									A2(
										elm$core$Maybe$andThen,
										A2(
											elm$core$Basics$composeR,
											function ($) {
												return $.an;
											},
											elm$core$Dict$get(linkKey)),
										A2(
											elm$core$Dict$get,
											parseID(linkID),
											updated_store))));
						}
				}
			});
		var updateEntity = function (id) {
			return elm$core$List$foldl(
				applyChange(id));
		};
		var applyUpdate = F2(
			function (entityUpdate, updated_store) {
				if (!entityUpdate.$) {
					var id = entityUpdate.a;
					var changes = entityUpdate.b;
					return A3(
						updateEntity,
						parseID(id),
						updated_store,
						changes);
				} else {
					var queries = entityUpdate.a;
					var changes = entityUpdate.b;
					return A3(
						elm$core$List$foldl,
						F2(
							function (_n1, acc) {
								var id = _n1.a;
								return A3(updateEntity, id, acc, changes);
							}),
						updated_store,
						A2(
							jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$query,
							jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$MatchAny(queries),
							updated_store));
				}
			});
		return A3(elm$core$List$foldl, applyUpdate, store, entityUpdates);
	});
var jschomay$elm_narrative_engine$NarrativeEngine$Debug$setLastInteractionId = F2(
	function (id, _n0) {
		var state = _n0;
		return _Utils_update(
			state,
			{O: id});
	});
var jschomay$elm_narrative_engine$NarrativeEngine$Debug$setLastMatchedRuleId = F2(
	function (id, _n0) {
		var state = _n0;
		return _Utils_update(
			state,
			{P: id});
	});
var jschomay$elm_narrative_engine$NarrativeEngine$Debug$updateSearch = F2(
	function (text, _n0) {
		var state = _n0;
		return _Utils_update(
			state,
			{T: text});
	});
var author$project$Preview$update = F3(
	function (rules, msg, model) {
		if (!msg.$) {
			var trigger = msg.a;
			var _n1 = A3(jschomay$elm_narrative_engine$NarrativeEngine$Core$Rules$findMatchingRule, trigger, rules, model.g);
			if (!_n1.$) {
				var _n2 = _n1.a;
				var matchedRuleID = _n2.a;
				var changes = _n2.b.aS;
				return _Utils_update(
					model,
					{
						q: A2(
							jschomay$elm_narrative_engine$NarrativeEngine$Debug$setLastInteractionId,
							trigger,
							A2(jschomay$elm_narrative_engine$NarrativeEngine$Debug$setLastMatchedRuleId, matchedRuleID, model.q)),
						A: A3(
							elm$core$Dict$update,
							matchedRuleID,
							A2(
								elm$core$Basics$composeR,
								elm$core$Maybe$map(
									elm$core$Basics$add(1)),
								A2(
									elm$core$Basics$composeR,
									elm$core$Maybe$withDefault(1),
									elm$core$Maybe$Just)),
							model.A),
						J: A2(
							elm$core$Maybe$withDefault,
							'ERROR parsing narrative content for ' + matchedRuleID,
							elm$core$List$head(
								A2(
									jschomay$elm_narrative_engine$NarrativeEngine$Syntax$NarrativeParser$parse,
									A3(author$project$Preview$makeConfig, trigger, matchedRuleID, model),
									A2(
										elm$core$Maybe$withDefault,
										'ERROR finding narrative content for ' + matchedRuleID,
										A2(elm$core$Dict$get, matchedRuleID, author$project$Preview$narrative_content))))),
						g: A3(jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$applyChanges, changes, trigger, model.g)
					});
			} else {
				return _Utils_update(
					model,
					{
						q: A2(
							jschomay$elm_narrative_engine$NarrativeEngine$Debug$setLastInteractionId,
							trigger,
							A2(jschomay$elm_narrative_engine$NarrativeEngine$Debug$setLastMatchedRuleId, trigger, model.q)),
						A: A3(
							elm$core$Dict$update,
							trigger,
							A2(
								elm$core$Basics$composeR,
								elm$core$Maybe$map(
									elm$core$Basics$add(1)),
								A2(
									elm$core$Basics$composeR,
									elm$core$Maybe$withDefault(1),
									elm$core$Maybe$Just)),
							model.A),
						J: A3(
							author$project$Preview$getDescription,
							A3(author$project$Preview$makeConfig, trigger, trigger, model),
							trigger,
							model.g)
					});
			}
		} else {
			var searchText = msg.a;
			return _Utils_update(
				model,
				{
					q: A2(jschomay$elm_narrative_engine$NarrativeEngine$Debug$updateSearch, searchText, model.q)
				});
		}
	});
var author$project$Preview$UpdateDebugSearchText = function (a) {
	return {$: 1, a: a};
};
var elm$core$Result$withDefault = F2(
	function (def, result) {
		if (!result.$) {
			var a = result.a;
			return a;
		} else {
			return def;
		}
	});
var author$project$Preview$query = F2(
	function (q, worldModel) {
		return A2(
			elm$core$Result$withDefault,
			_List_Nil,
			A2(
				elm$core$Result$map,
				function (parsedMatcher) {
					return A2(jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$query, parsedMatcher, worldModel);
				},
				jschomay$elm_narrative_engine$NarrativeEngine$Syntax$RuleParser$parseMatcher(q)));
	});
var author$project$Preview$assert = F2(
	function (q, worldModel) {
		return !elm$core$List$isEmpty(
			A2(author$project$Preview$query, q, worldModel));
	});
var author$project$Preview$InteractWith = function (a) {
	return {$: 0, a: a};
};
var elm$core$Result$isOk = function (result) {
	if (!result.$) {
		return true;
	} else {
		return false;
	}
};
var elm$core$Basics$idiv = _Basics_idiv;
var elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					elm$core$Array$builderToArray,
					false,
					{i: nodeList, e: (len / elm$core$Array$branchFactor) | 0, h: tail});
			} else {
				var leaf = elm$core$Array$Leaf(
					A3(elm$core$Elm$JsArray$initialize, elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2(elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return elm$core$Array$empty;
		} else {
			var tailLen = len % elm$core$Array$branchFactor;
			var tail = A3(elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - elm$core$Array$branchFactor;
			return A5(elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var elm$json$Json$Decode$OneOf = function (a) {
	return {$: 2, a: a};
};
var elm$core$List$map2 = _List_map2;
var elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2(elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var elm$core$List$range = F2(
	function (lo, hi) {
		return A3(elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			elm$core$List$map2,
			f,
			A2(
				elm$core$List$range,
				0,
				elm$core$List$length(xs) - 1),
			xs);
	});
var elm$core$String$all = _String_all;
var elm$core$String$uncons = _String_uncons;
var elm$json$Json$Decode$indent = function (str) {
	return A2(
		elm$core$String$join,
		'\n    ',
		A2(elm$core$String$split, '\n', str));
};
var elm$json$Json$Encode$encode = _Json_encode;
var elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + (elm$core$String$fromInt(i + 1) + (') ' + elm$json$Json$Decode$indent(
			elm$json$Json$Decode$errorToString(error))));
	});
var elm$json$Json$Decode$errorToString = function (error) {
	return A2(elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 0:
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _n1 = elm$core$String$uncons(f);
						if (_n1.$ === 1) {
							return false;
						} else {
							var _n2 = _n1.a;
							var _char = _n2.a;
							var rest = _n2.b;
							return elm$core$Char$isAlpha(_char) && A2(elm$core$String$all, elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2(elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 1:
					var i = error.a;
					var err = error.b;
					var indexName = '[' + (elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2(elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 2:
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									elm$core$String$join,
									'',
									elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										elm$core$String$join,
										'',
										elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + (elm$core$String$fromInt(
								elm$core$List$length(errors)) + ' ways:'));
							return A2(
								elm$core$String$join,
								'\n\n',
								A2(
									elm$core$List$cons,
									introduction,
									A2(elm$core$List$indexedMap, elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								elm$core$String$join,
								'',
								elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + (elm$json$Json$Decode$indent(
						A2(elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var elm$json$Json$Decode$map = _Json_map1;
var elm$json$Json$Decode$map2 = _Json_map2;
var elm$json$Json$Decode$succeed = _Json_succeed;
var elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 0:
			return 0;
		case 1:
			return 1;
		case 2:
			return 2;
		default:
			return 3;
	}
};
var elm$html$Html$li = _VirtualDom_node('li');
var elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var elm$html$Html$text = elm$virtual_dom$VirtualDom$text;
var elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var elm$html$Html$Attributes$style = elm$virtual_dom$VirtualDom$style;
var elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 0, a: a};
};
var elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			elm$virtual_dom$VirtualDom$on,
			event,
			elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var elm$html$Html$Events$onClick = function (msg) {
	return A2(
		elm$html$Html$Events$on,
		'click',
		elm$json$Json$Decode$succeed(msg));
};
var author$project$Preview$entityView = function (_n0) {
	var id = _n0.a;
	var name = _n0.b.H;
	return A2(
		elm$html$Html$li,
		_List_fromArray(
			[
				elm$html$Html$Events$onClick(
				author$project$Preview$InteractWith(id)),
				A2(elm$html$Html$Attributes$style, 'cursor', 'pointer')
			]),
		_List_fromArray(
			[
				elm$html$Html$text(name)
			]));
};
var elm$core$Basics$neq = _Utils_notEqual;
var elm$html$Html$div = _VirtualDom_node('div');
var elm$html$Html$em = _VirtualDom_node('em');
var elm$html$Html$h1 = _VirtualDom_node('h1');
var elm$html$Html$h2 = _VirtualDom_node('h2');
var elm$html$Html$h3 = _VirtualDom_node('h3');
var elm$html$Html$p = _VirtualDom_node('p');
var elm$html$Html$ul = _VirtualDom_node('ul');
var jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$getLink = F3(
	function (id, key, store) {
		return A2(
			elm$core$Maybe$andThen,
			function (linkedID) {
				return A2(elm$core$Dict$member, linkedID, store) ? elm$core$Maybe$Just(linkedID) : elm$core$Maybe$Nothing;
			},
			A2(
				elm$core$Maybe$andThen,
				A2(
					elm$core$Basics$composeR,
					function ($) {
						return $.an;
					},
					elm$core$Dict$get(key)),
				A2(elm$core$Dict$get, id, store)));
	});
var jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$getStat = F3(
	function (id, key, store) {
		return A2(
			elm$core$Maybe$andThen,
			A2(
				elm$core$Basics$composeR,
				function ($) {
					return $.aF;
				},
				elm$core$Dict$get(key)),
			A2(elm$core$Dict$get, id, store));
	});
var elm$core$String$contains = _String_contains;
var elm$core$String$startsWith = _String_startsWith;
var elm$core$String$toLower = _String_toLower;
var elm$html$Html$input = _VirtualDom_node('input');
var elm$html$Html$span = _VirtualDom_node('span');
var elm$json$Json$Encode$string = _Json_wrap;
var elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			elm$json$Json$Encode$string(string));
	});
var elm$html$Html$Attributes$placeholder = elm$html$Html$Attributes$stringProperty('placeholder');
var elm$html$Html$Attributes$value = elm$html$Html$Attributes$stringProperty('value');
var elm$html$Html$Events$alwaysStop = function (x) {
	return _Utils_Tuple2(x, true);
};
var elm$virtual_dom$VirtualDom$MayStopPropagation = function (a) {
	return {$: 1, a: a};
};
var elm$html$Html$Events$stopPropagationOn = F2(
	function (event, decoder) {
		return A2(
			elm$virtual_dom$VirtualDom$on,
			event,
			elm$virtual_dom$VirtualDom$MayStopPropagation(decoder));
	});
var elm$json$Json$Decode$field = _Json_decodeField;
var elm$json$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3(elm$core$List$foldr, elm$json$Json$Decode$field, decoder, fields);
	});
var elm$json$Json$Decode$string = _Json_decodeString;
var elm$html$Html$Events$targetValue = A2(
	elm$json$Json$Decode$at,
	_List_fromArray(
		['target', 'value']),
	elm$json$Json$Decode$string);
var elm$html$Html$Events$onInput = function (tagger) {
	return A2(
		elm$html$Html$Events$stopPropagationOn,
		'input',
		A2(
			elm$json$Json$Decode$map,
			elm$html$Html$Events$alwaysStop,
			A2(elm$json$Json$Decode$map, tagger, elm$html$Html$Events$targetValue)));
};
var jschomay$elm_narrative_engine$NarrativeEngine$Debug$debugBar = F3(
	function (msg, worldModel, _n0) {
		var lastInteractionId = _n0.O;
		var lastMatchedRuleId = _n0.P;
		var searchText = _n0.T;
		var fuzzyMatch = F2(
			function (search, text) {
				return A2(
					elm$core$String$contains,
					elm$core$String$toLower(search),
					elm$core$String$toLower(text));
			});
		var displayEntity = function (_n3) {
			var id = _n3.a;
			var tags = _n3.b.aI;
			var stats = _n3.b.aF;
			var links = _n3.b.an;
			return A2(
				elm$core$String$join,
				'.',
				A2(
					elm$core$List$filter,
					A2(elm$core$Basics$composeL, elm$core$Basics$not, elm$core$String$isEmpty),
					A2(
						elm$core$List$map,
						elm$core$String$join('.'),
						_List_fromArray(
							[
								_List_fromArray(
								[id]),
								elm$core$Set$toList(tags),
								A2(
								elm$core$List$map,
								function (_n1) {
									var key = _n1.a;
									var value = _n1.b;
									return A2(
										elm$core$String$join,
										'=',
										_List_fromArray(
											[
												key,
												elm$core$String$fromInt(value)
											]));
								},
								elm$core$Dict$toList(stats)),
								A2(
								elm$core$List$map,
								function (_n2) {
									var key = _n2.a;
									var value = _n2.b;
									return A2(
										elm$core$String$join,
										'=',
										_List_fromArray(
											[key, value]));
								},
								elm$core$Dict$toList(links))
							]))));
		};
		var displayWorldModel = A2(
			elm$core$List$map,
			displayEntity,
			elm$core$Dict$toList(worldModel));
		var filteredDisplayWorldModel = elm$core$String$isEmpty(searchText) ? _List_Nil : A2(
			elm$core$List$sortBy,
			function (text) {
				return A2(
					elm$core$String$startsWith,
					elm$core$String$toLower(searchText),
					elm$core$String$toLower(text)) ? (-1) : 0;
			},
			A2(
				elm$core$List$filter,
				fuzzyMatch(searchText),
				displayWorldModel));
		return A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					A2(elm$html$Html$Attributes$style, 'color', 'yellow'),
					A2(elm$html$Html$Attributes$style, 'font-family', 'Courier'),
					A2(elm$html$Html$Attributes$style, 'background', 'black'),
					A2(elm$html$Html$Attributes$style, 'opacity', '0.9'),
					A2(elm$html$Html$Attributes$style, 'lineHeight', '1.5em')
				]),
			_List_fromArray(
				[
					elm$html$Html$text('Debug mode'),
					A2(
					elm$html$Html$input,
					_List_fromArray(
						[
							elm$html$Html$Events$onInput(msg),
							elm$html$Html$Attributes$value(searchText),
							elm$html$Html$Attributes$placeholder('Search world model'),
							A2(elm$html$Html$Attributes$style, 'margin', '0 10px')
						]),
					_List_Nil),
					A2(
					elm$html$Html$span,
					_List_Nil,
					_List_fromArray(
						[
							elm$html$Html$text('Last triggered rule: ' + (lastInteractionId + (' - ' + lastMatchedRuleId)))
						])),
					A2(
					elm$html$Html$ul,
					_List_fromArray(
						[
							A2(elm$html$Html$Attributes$style, 'borderTop', '1px solid #333')
						]),
					A2(
						elm$core$List$map,
						function (e) {
							return A2(
								elm$html$Html$li,
								_List_Nil,
								_List_fromArray(
									[
										elm$html$Html$text(e)
									]));
						},
						filteredDisplayWorldModel))
				]));
	});
var author$project$Preview$view = function (model) {
	var items = A2(author$project$Preview$query, '*.item.current_location=(link PLAYER.current_location)', model.g);
	var isQuestComplete = A2(author$project$Preview$assert, 'PLAYER.bagsOfGoldCollected>0', model.g);
	var inventory = A2(author$project$Preview$query, '*.item.current_location=PLAYER', model.g);
	var fearLevel = A2(
		elm$core$Maybe$withDefault,
		'ERROR can\'t find PLAYER\'s fear stat',
		A2(
			elm$core$Maybe$map,
			elm$core$String$fromInt,
			A3(jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$getStat, 'PLAYER', 'fear', model.g)));
	var currentLocation = A2(
		elm$core$Maybe$withDefault,
		'ERROR getting current location',
		A3(jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$getLink, 'PLAYER', 'current_location', model.g));
	var locations = A2(
		elm$core$List$filter,
		function (_n0) {
			var locationID = _n0.a;
			return !_Utils_eq(locationID, currentLocation);
		},
		A2(author$project$Preview$query, '*.location', model.g));
	var characters = A2(author$project$Preview$query, '*.character.current_location=(link PLAYER.current_location)', model.g);
	return A2(
		elm$html$Html$div,
		_List_fromArray(
			[
				A2(elm$html$Html$Attributes$style, 'width', '70%'),
				A2(elm$html$Html$Attributes$style, 'margin', 'auto')
			]),
		_List_fromArray(
			[
				A3(jschomay$elm_narrative_engine$NarrativeEngine$Debug$debugBar, author$project$Preview$UpdateDebugSearchText, model.g, model.q),
				A2(
				elm$html$Html$h1,
				_List_Nil,
				_List_fromArray(
					[
						elm$html$Html$text(
						'You are currently located in the ' + A2(author$project$Preview$getName, currentLocation, model.g))
					])),
				A2(
				elm$html$Html$h2,
				_List_Nil,
				_List_fromArray(
					[
						elm$html$Html$text(
						A3(
							author$project$Preview$getDescription,
							A3(author$project$Preview$makeConfig, currentLocation, currentLocation, model),
							currentLocation,
							model.g))
					])),
				A2(
				elm$html$Html$h3,
				_List_Nil,
				_List_fromArray(
					[
						elm$html$Html$text('Fear level: ' + fearLevel)
					])),
				A2(
				elm$html$Html$div,
				_List_fromArray(
					[
						A2(elm$html$Html$Attributes$style, 'display', 'flex')
					]),
				_List_fromArray(
					[
						A2(
						elm$html$Html$div,
						_List_fromArray(
							[
								A2(elm$html$Html$Attributes$style, 'flex', '0 0 auto')
							]),
						_List_fromArray(
							[
								A2(
								elm$html$Html$h3,
								_List_Nil,
								_List_fromArray(
									[
										elm$html$Html$text('You have:')
									])),
								A2(
								elm$html$Html$ul,
								_List_Nil,
								A2(elm$core$List$map, author$project$Preview$entityView, inventory)),
								A2(
								elm$html$Html$h3,
								_List_Nil,
								_List_fromArray(
									[
										elm$html$Html$text('You see the following items:')
									])),
								A2(
								elm$html$Html$ul,
								_List_Nil,
								A2(elm$core$List$map, author$project$Preview$entityView, items)),
								A2(
								elm$html$Html$h3,
								_List_Nil,
								_List_fromArray(
									[
										elm$html$Html$text('You see the following characters:')
									])),
								A2(
								elm$html$Html$ul,
								_List_Nil,
								A2(elm$core$List$map, author$project$Preview$entityView, characters)),
								A2(
								elm$html$Html$h3,
								_List_Nil,
								_List_fromArray(
									[
										elm$html$Html$text('Places near by:')
									])),
								A2(
								elm$html$Html$ul,
								_List_Nil,
								A2(elm$core$List$map, author$project$Preview$entityView, locations))
							])),
						A2(
						elm$html$Html$div,
						_List_fromArray(
							[
								A2(elm$html$Html$Attributes$style, 'flex', '1 1 auto'),
								A2(elm$html$Html$Attributes$style, 'font-size', '2em'),
								A2(elm$html$Html$Attributes$style, 'padding', '0 2em')
							]),
						_List_fromArray(
							[
								A2(
								elm$html$Html$em,
								_List_Nil,
								_List_fromArray(
									[
										elm$html$Html$text(model.J)
									])),
								A2(
								elm$html$Html$p,
								_List_Nil,
								_List_fromArray(
									[
										elm$html$Html$text(
										isQuestComplete ? 'Congratulations, you win!' : 'Goal: get the bag of gold!')
									]))
							]))
					]))
			]));
};
var elm$core$Platform$Cmd$batch = _Platform_batch;
var elm$core$Platform$Cmd$none = elm$core$Platform$Cmd$batch(_List_Nil);
var elm$core$Platform$Sub$batch = _Platform_batch;
var elm$core$Platform$Sub$none = elm$core$Platform$Sub$batch(_List_Nil);
var elm$browser$Browser$External = function (a) {
	return {$: 1, a: a};
};
var elm$browser$Browser$Internal = function (a) {
	return {$: 0, a: a};
};
var elm$browser$Browser$Dom$NotFound = elm$core$Basics$identity;
var elm$core$Basics$never = function (_n0) {
	never:
	while (true) {
		var nvr = _n0;
		var $temp$_n0 = nvr;
		_n0 = $temp$_n0;
		continue never;
	}
};
var elm$core$Task$Perform = elm$core$Basics$identity;
var elm$core$Task$succeed = _Scheduler_succeed;
var elm$core$Task$init = elm$core$Task$succeed(0);
var elm$core$Task$andThen = _Scheduler_andThen;
var elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			elm$core$Task$andThen,
			function (a) {
				return elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			elm$core$Task$andThen,
			function (a) {
				return A2(
					elm$core$Task$andThen,
					function (b) {
						return elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var elm$core$Task$sequence = function (tasks) {
	return A3(
		elm$core$List$foldr,
		elm$core$Task$map2(elm$core$List$cons),
		elm$core$Task$succeed(_List_Nil),
		tasks);
};
var elm$core$Platform$sendToApp = _Platform_sendToApp;
var elm$core$Task$spawnCmd = F2(
	function (router, _n0) {
		var task = _n0;
		return _Scheduler_spawn(
			A2(
				elm$core$Task$andThen,
				elm$core$Platform$sendToApp(router),
				task));
	});
var elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			elm$core$Task$map,
			function (_n0) {
				return 0;
			},
			elm$core$Task$sequence(
				A2(
					elm$core$List$map,
					elm$core$Task$spawnCmd(router),
					commands)));
	});
var elm$core$Task$onSelfMsg = F3(
	function (_n0, _n1, _n2) {
		return elm$core$Task$succeed(0);
	});
var elm$core$Task$cmdMap = F2(
	function (tagger, _n0) {
		var task = _n0;
		return A2(elm$core$Task$map, tagger, task);
	});
_Platform_effectManagers['Task'] = _Platform_createManager(elm$core$Task$init, elm$core$Task$onEffects, elm$core$Task$onSelfMsg, elm$core$Task$cmdMap);
var elm$core$Task$command = _Platform_leaf('Task');
var elm$core$Task$perform = F2(
	function (toMessage, task) {
		return elm$core$Task$command(
			A2(elm$core$Task$map, toMessage, task));
	});
var elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			elm$core$String$slice,
			n,
			elm$core$String$length(string),
			string);
	});
var elm$url$Url$Http = 0;
var elm$url$Url$Https = 1;
var elm$core$String$indexes = _String_indexes;
var elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3(elm$core$String$slice, 0, n, string);
	});
var elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {af: fragment, ai: host, aq: path, as: port_, aw: protocol, ax: query};
	});
var elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if (elm$core$String$isEmpty(str) || A2(elm$core$String$contains, '@', str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, ':', str);
			if (!_n0.b) {
				return elm$core$Maybe$Just(
					A6(elm$url$Url$Url, protocol, str, elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_n0.b.b) {
					var i = _n0.a;
					var _n1 = elm$core$String$toInt(
						A2(elm$core$String$dropLeft, i + 1, str));
					if (_n1.$ === 1) {
						return elm$core$Maybe$Nothing;
					} else {
						var port_ = _n1;
						return elm$core$Maybe$Just(
							A6(
								elm$url$Url$Url,
								protocol,
								A2(elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return elm$core$Maybe$Nothing;
				}
			}
		}
	});
var elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if (elm$core$String$isEmpty(str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, '/', str);
			if (!_n0.b) {
				return A5(elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _n0.a;
				return A5(
					elm$url$Url$chompBeforePath,
					protocol,
					A2(elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2(elm$core$String$left, i, str));
			}
		}
	});
var elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if (elm$core$String$isEmpty(str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, '?', str);
			if (!_n0.b) {
				return A4(elm$url$Url$chompBeforeQuery, protocol, elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _n0.a;
				return A4(
					elm$url$Url$chompBeforeQuery,
					protocol,
					elm$core$Maybe$Just(
						A2(elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2(elm$core$String$left, i, str));
			}
		}
	});
var elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if (elm$core$String$isEmpty(str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, '#', str);
			if (!_n0.b) {
				return A3(elm$url$Url$chompBeforeFragment, protocol, elm$core$Maybe$Nothing, str);
			} else {
				var i = _n0.a;
				return A3(
					elm$url$Url$chompBeforeFragment,
					protocol,
					elm$core$Maybe$Just(
						A2(elm$core$String$dropLeft, i + 1, str)),
					A2(elm$core$String$left, i, str));
			}
		}
	});
var elm$url$Url$fromString = function (str) {
	return A2(elm$core$String$startsWith, 'http://', str) ? A2(
		elm$url$Url$chompAfterProtocol,
		0,
		A2(elm$core$String$dropLeft, 7, str)) : (A2(elm$core$String$startsWith, 'https://', str) ? A2(
		elm$url$Url$chompAfterProtocol,
		1,
		A2(elm$core$String$dropLeft, 8, str)) : elm$core$Maybe$Nothing);
};
var elm$browser$Browser$sandbox = function (impl) {
	return _Browser_element(
		{
			a$: function (_n0) {
				return _Utils_Tuple2(impl.a$, elm$core$Platform$Cmd$none);
			},
			a6: function (_n1) {
				return elm$core$Platform$Sub$none;
			},
			a9: F2(
				function (msg, model) {
					return _Utils_Tuple2(
						A2(impl.a9, msg, model),
						elm$core$Platform$Cmd$none);
				}),
			bb: impl.bb
		});
};
var elm$core$Result$map3 = F4(
	function (func, ra, rb, rc) {
		if (ra.$ === 1) {
			var x = ra.a;
			return elm$core$Result$Err(x);
		} else {
			var a = ra.a;
			if (rb.$ === 1) {
				var x = rb.a;
				return elm$core$Result$Err(x);
			} else {
				var b = rb.a;
				if (rc.$ === 1) {
					var x = rc.a;
					return elm$core$Result$Err(x);
				} else {
					var c = rc.a;
					return elm$core$Result$Ok(
						A3(func, a, b, c));
				}
			}
		}
	});
var elm$core$Tuple$mapSecond = F2(
	function (func, _n0) {
		var x = _n0.a;
		var y = _n0.b;
		return _Utils_Tuple2(
			x,
			func(y));
	});
var elm$parser$Parser$Advanced$spaces = elm$parser$Parser$Advanced$chompWhile(
	function (c) {
		return (c === ' ') || ((c === '\n') || (c === '\r'));
	});
var elm$parser$Parser$spaces = elm$parser$Parser$Advanced$spaces;
var jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$emptyLinks = elm$core$Dict$empty;
var jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$emptyStats = elm$core$Dict$empty;
var elm$core$Set$empty = elm$core$Dict$empty;
var jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$emptyTags = elm$core$Set$empty;
var jschomay$elm_narrative_engine$NarrativeEngine$Syntax$EntityParser$propsParser = function () {
	var toComponent = F2(
		function (key, fn) {
			return fn(key);
		});
	var helper = function (acc) {
		return elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					A2(
					elm$parser$Parser$keeper,
					A2(
						elm$parser$Parser$keeper,
						A2(
							elm$parser$Parser$ignorer,
							A2(
								elm$parser$Parser$ignorer,
								elm$parser$Parser$succeed(toComponent),
								elm$parser$Parser$spaces),
							elm$parser$Parser$symbol('.')),
						jschomay$elm_narrative_engine$NarrativeEngine$Syntax$EntityParser$propertyNameParser),
					elm$parser$Parser$oneOf(
						_List_fromArray(
							[
								A2(
								elm$parser$Parser$keeper,
								A2(
									elm$parser$Parser$ignorer,
									elm$parser$Parser$succeed(elm$core$Basics$identity),
									elm$parser$Parser$symbol('=')),
								elm$parser$Parser$oneOf(
									_List_fromArray(
										[
											A2(
											elm$parser$Parser$map,
											function (v) {
												return function (k) {
													return elm$parser$Parser$Loop(
														A3(jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$setLink, k, v, acc));
												};
											},
											jschomay$elm_narrative_engine$NarrativeEngine$Syntax$EntityParser$idParser),
											A2(
											elm$parser$Parser$map,
											function (v) {
												return function (k) {
													return elm$parser$Parser$Loop(
														A3(jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$setStat, k, v, acc));
												};
											},
											jschomay$elm_narrative_engine$NarrativeEngine$Syntax$EntityParser$numberParser)
										]))),
								elm$parser$Parser$succeed(
								function (t) {
									return elm$parser$Parser$Loop(
										A2(jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$addTag, t, acc));
								})
							]))),
					elm$parser$Parser$succeed(
					elm$parser$Parser$Done(acc))
				]));
	};
	var emptyNarrativeComponent = {an: jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$emptyLinks, aF: jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$emptyStats, aI: jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$emptyTags};
	return A2(elm$parser$Parser$loop, emptyNarrativeComponent, helper);
}();
var jschomay$elm_narrative_engine$NarrativeEngine$Syntax$EntityParser$entityParser = function () {
	var toEntity = F2(
		function (id, narrativeComponent) {
			return _Utils_Tuple2(id, narrativeComponent);
		});
	return A2(
		elm$parser$Parser$keeper,
		A2(
			elm$parser$Parser$keeper,
			elm$parser$Parser$succeed(toEntity),
			jschomay$elm_narrative_engine$NarrativeEngine$Syntax$EntityParser$idParser),
		A2(elm$parser$Parser$ignorer, jschomay$elm_narrative_engine$NarrativeEngine$Syntax$EntityParser$propsParser, elm$parser$Parser$end));
}();
var jschomay$elm_narrative_engine$NarrativeEngine$Syntax$EntityParser$parseEntity = F2(
	function (extendFn, _n0) {
		var text = _n0.a;
		var extraFields = _n0.b;
		return A2(
			elm$core$Result$mapError,
			jschomay$elm_narrative_engine$NarrativeEngine$Syntax$Helpers$deadEndsToString,
			A2(
				elm$core$Result$map,
				elm$core$Tuple$mapSecond(
					extendFn(extraFields)),
				A2(elm$parser$Parser$run, jschomay$elm_narrative_engine$NarrativeEngine$Syntax$EntityParser$entityParser, text)));
	});
var jschomay$elm_narrative_engine$NarrativeEngine$Syntax$EntityParser$parseMany = F2(
	function (extendFn, entities) {
		var displayError = F2(
			function (source, e) {
				return _Utils_Tuple2('Entity def: ' + source, e);
			});
		var addParsedEntity = F2(
			function (entity, acc) {
				var source = entity.a;
				var extraFields = entity.b;
				var _n0 = A2(jschomay$elm_narrative_engine$NarrativeEngine$Syntax$EntityParser$parseEntity, extendFn, entity);
				if (!_n0.$) {
					var _n1 = _n0.a;
					var id = _n1.a;
					var parsedEntity = _n1.b;
					return A2(
						elm$core$Result$map,
						A2(elm$core$Dict$insert, id, parsedEntity),
						acc);
				} else {
					var err = _n0.a;
					if (!acc.$) {
						return elm$core$Result$Err(
							_List_fromArray(
								[
									A2(displayError, source, err)
								]));
					} else {
						var errors = acc.a;
						return elm$core$Result$Err(
							A2(
								elm$core$List$cons,
								A2(displayError, source, err),
								errors));
					}
				}
			});
		return A3(
			elm$core$List$foldl,
			addParsedEntity,
			elm$core$Result$Ok(elm$core$Dict$empty),
			entities);
	});
var elm$html$Html$code = _VirtualDom_node('code');
var elm$html$Html$pre = _VirtualDom_node('pre');
var jschomay$elm_narrative_engine$NarrativeEngine$Syntax$Helpers$parseErrorsView = function (errors) {
	return A2(
		elm$html$Html$div,
		_List_fromArray(
			[
				A2(elm$html$Html$Attributes$style, 'background', 'black'),
				A2(elm$html$Html$Attributes$style, 'color', 'red'),
				A2(elm$html$Html$Attributes$style, 'padding', '4em'),
				A2(elm$html$Html$Attributes$style, 'display', 'flex'),
				A2(elm$html$Html$Attributes$style, 'flex-direction', 'column'),
				A2(elm$html$Html$Attributes$style, 'align-items', 'center'),
				A2(elm$html$Html$Attributes$style, 'justify-content', 'center')
			]),
		_List_fromArray(
			[
				A2(
				elm$html$Html$h1,
				_List_Nil,
				_List_fromArray(
					[
						elm$html$Html$text('Errors when parsing!  Please fix:')
					])),
				A2(
				elm$html$Html$ul,
				_List_fromArray(
					[
						A2(elm$html$Html$Attributes$style, 'width', '100%')
					]),
				A2(
					elm$core$List$map,
					function (_n0) {
						var source = _n0.a;
						var error = _n0.b;
						return A2(
							elm$html$Html$li,
							_List_fromArray(
								[
									A2(elm$html$Html$Attributes$style, 'margin-bottom', '2em')
								]),
							_List_fromArray(
								[
									A2(
									elm$html$Html$pre,
									_List_fromArray(
										[
											A2(elm$html$Html$Attributes$style, 'background', 'white'),
											A2(elm$html$Html$Attributes$style, 'padding', '1em'),
											A2(elm$html$Html$Attributes$style, 'color', 'black'),
											A2(elm$html$Html$Attributes$style, 'overflow', ' auto'),
											A2(elm$html$Html$Attributes$style, 'width', '100%')
										]),
									_List_fromArray(
										[
											A2(
											elm$html$Html$code,
											_List_Nil,
											_List_fromArray(
												[
													elm$html$Html$text(source)
												]))
										])),
									elm$html$Html$text(error)
								]));
					},
					errors))
			]));
};
var jschomay$elm_narrative_engine$NarrativeEngine$Syntax$NarrativeParser$parseMany = function (content) {
	var emptyConfig = {aU: 0, a4: elm$core$Dict$empty, a8: '', g: elm$core$Dict$empty};
	var displayError = F3(
		function (k, v, e) {
			return _Utils_Tuple2(
				'Narrative content: ' + (k + ('\n' + (v + ' '))),
				jschomay$elm_narrative_engine$NarrativeEngine$Syntax$Helpers$deadEndsToString(e));
		});
	return A3(
		elm$core$Dict$foldl,
		F3(
			function (k, v, acc) {
				var _n0 = A2(
					elm$parser$Parser$run,
					jschomay$elm_narrative_engine$NarrativeEngine$Syntax$NarrativeParser$top(emptyConfig),
					v);
				if (!_n0.$) {
					return acc;
				} else {
					var e = _n0.a;
					if (!acc.$) {
						return elm$core$Result$Err(
							_List_fromArray(
								[
									A3(displayError, k, v, e)
								]));
					} else {
						var errors = acc.a;
						return elm$core$Result$Err(
							A2(
								elm$core$List$cons,
								A3(displayError, k, v, e),
								errors));
					}
				}
			}),
		elm$core$Result$Ok(0),
		content);
};
var jschomay$elm_narrative_engine$NarrativeEngine$Core$Rules$EntityTrigger = function (a) {
	return {$: 1, a: a};
};
var jschomay$elm_narrative_engine$NarrativeEngine$Core$Rules$SpecificTrigger = function (a) {
	return {$: 0, a: a};
};
var jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$AddTag = function (a) {
	return {$: 0, a: a};
};
var jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$DecStat = F2(
	function (a, b) {
		return {$: 4, a: a, b: b};
	});
var jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$IncStat = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$LookUpLinkTarget = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$RemoveTag = function (a) {
	return {$: 1, a: a};
};
var jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$SetLink = F2(
	function (a, b) {
		return {$: 5, a: a, b: b};
	});
var jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$SetStat = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$SpecificLinkTarget = function (a) {
	return {$: 0, a: a};
};
var jschomay$elm_narrative_engine$NarrativeEngine$Syntax$RuleParser$changeEntityParser = function () {
	var toUpdateEntity = F3(
		function (acc, propName, updateConstructor) {
			return elm$parser$Parser$Loop(
				A2(
					elm$core$List$cons,
					updateConstructor(propName),
					acc));
		});
	var lookupParser = function (mapper) {
		return A2(
			elm$parser$Parser$keeper,
			A2(
				elm$parser$Parser$keeper,
				A2(
					elm$parser$Parser$ignorer,
					A2(
						elm$parser$Parser$ignorer,
						elm$parser$Parser$succeed(mapper),
						elm$parser$Parser$keyword('(link')),
					elm$parser$Parser$chompWhile(
						elm$core$Basics$eq(' '))),
				A2(
					elm$parser$Parser$ignorer,
					elm$parser$Parser$oneOf(
						_List_fromArray(
							[
								A2(
								elm$parser$Parser$map,
								elm$core$Basics$always('$'),
								elm$parser$Parser$token('$')),
								jschomay$elm_narrative_engine$NarrativeEngine$Syntax$EntityParser$idParser
							])),
					elm$parser$Parser$symbol('.'))),
			A2(
				elm$parser$Parser$ignorer,
				jschomay$elm_narrative_engine$NarrativeEngine$Syntax$EntityParser$propertyNameParser,
				elm$parser$Parser$symbol(')')));
	};
	var helper = function (acc) {
		return elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					A2(
					elm$parser$Parser$keeper,
					A2(
						elm$parser$Parser$ignorer,
						A2(
							elm$parser$Parser$ignorer,
							elm$parser$Parser$succeed(elm$core$Basics$identity),
							elm$parser$Parser$chompWhile(
								elm$core$Basics$eq(' '))),
						elm$parser$Parser$symbol('.')),
					elm$parser$Parser$oneOf(
						_List_fromArray(
							[
								A2(
								elm$parser$Parser$keeper,
								A2(
									elm$parser$Parser$ignorer,
									elm$parser$Parser$succeed(
										function (t) {
											return elm$parser$Parser$Loop(
												A2(
													elm$core$List$cons,
													jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$RemoveTag(t),
													acc));
										}),
									elm$parser$Parser$symbol('-')),
								jschomay$elm_narrative_engine$NarrativeEngine$Syntax$EntityParser$propertyNameParser),
								A2(
								elm$parser$Parser$keeper,
								A2(
									elm$parser$Parser$keeper,
									elm$parser$Parser$succeed(
										toUpdateEntity(acc)),
									jschomay$elm_narrative_engine$NarrativeEngine$Syntax$EntityParser$propertyNameParser),
								elm$parser$Parser$oneOf(
									_List_fromArray(
										[
											A2(
											elm$parser$Parser$keeper,
											A2(
												elm$parser$Parser$ignorer,
												elm$parser$Parser$succeed(elm$core$Basics$identity),
												elm$parser$Parser$symbol('+')),
											A2(
												elm$parser$Parser$map,
												function (n) {
													return function (key) {
														return A2(jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$IncStat, key, n);
													};
												},
												jschomay$elm_narrative_engine$NarrativeEngine$Syntax$EntityParser$numberParser)),
											A2(
											elm$parser$Parser$keeper,
											A2(
												elm$parser$Parser$ignorer,
												elm$parser$Parser$succeed(elm$core$Basics$identity),
												elm$parser$Parser$symbol('-')),
											A2(
												elm$parser$Parser$map,
												function (n) {
													return function (key) {
														return A2(jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$DecStat, key, n);
													};
												},
												jschomay$elm_narrative_engine$NarrativeEngine$Syntax$EntityParser$numberParser)),
											A2(
											elm$parser$Parser$keeper,
											A2(
												elm$parser$Parser$ignorer,
												elm$parser$Parser$succeed(elm$core$Basics$identity),
												elm$parser$Parser$symbol('=')),
											elm$parser$Parser$oneOf(
												_List_fromArray(
													[
														A2(
														elm$parser$Parser$map,
														function (n) {
															return function (key) {
																return A2(jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$SetStat, key, n);
															};
														},
														jschomay$elm_narrative_engine$NarrativeEngine$Syntax$EntityParser$numberParser),
														A2(
														elm$parser$Parser$map,
														function (_n0) {
															return function (key) {
																return A2(
																	jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$SetLink,
																	key,
																	jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$SpecificLinkTarget('$'));
															};
														},
														elm$parser$Parser$symbol('$')),
														A2(
														elm$parser$Parser$map,
														function (id) {
															return function (key) {
																return A2(
																	jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$SetLink,
																	key,
																	jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$SpecificLinkTarget(id));
															};
														},
														jschomay$elm_narrative_engine$NarrativeEngine$Syntax$EntityParser$idParser),
														lookupParser(
														F3(
															function (lookupID, lookupKey, key) {
																return A2(
																	jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$SetLink,
																	key,
																	A2(jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$LookUpLinkTarget, lookupID, lookupKey));
															}))
													]))),
											elm$parser$Parser$succeed(
											function (t) {
												return jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$AddTag(t);
											})
										])))
							]))),
					elm$parser$Parser$succeed(
					elm$parser$Parser$Done(acc))
				]));
	};
	return A2(elm$parser$Parser$loop, _List_Nil, helper);
}();
var jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$Update = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$UpdateAll = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var jschomay$elm_narrative_engine$NarrativeEngine$Syntax$RuleParser$updateTargetParser = elm$parser$Parser$oneOf(
	_List_fromArray(
		[
			A2(
			elm$parser$Parser$map,
			elm$core$Basics$always(
				jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$Update('$')),
			elm$parser$Parser$symbol('$')),
			A2(elm$parser$Parser$map, jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$Update, jschomay$elm_narrative_engine$NarrativeEngine$Syntax$EntityParser$idParser),
			A2(
			elm$parser$Parser$keeper,
			A2(
				elm$parser$Parser$ignorer,
				A2(
					elm$parser$Parser$ignorer,
					elm$parser$Parser$succeed(elm$core$Basics$identity),
					elm$parser$Parser$symbol('(')),
				elm$parser$Parser$symbol('*')),
			A2(
				elm$parser$Parser$ignorer,
				A2(
					elm$parser$Parser$map,
					function (queries) {
						return jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$UpdateAll(queries);
					},
					jschomay$elm_narrative_engine$NarrativeEngine$Syntax$RuleParser$queriesParser),
				elm$parser$Parser$symbol(')')))
		]));
var jschomay$elm_narrative_engine$NarrativeEngine$Syntax$RuleParser$changesParser = function () {
	var toChange = F2(
		function (selector, updates) {
			return selector(updates);
		});
	return A2(
		elm$parser$Parser$keeper,
		A2(
			elm$parser$Parser$keeper,
			elm$parser$Parser$succeed(toChange),
			jschomay$elm_narrative_engine$NarrativeEngine$Syntax$RuleParser$updateTargetParser),
		jschomay$elm_narrative_engine$NarrativeEngine$Syntax$RuleParser$changeEntityParser);
}();
var jschomay$elm_narrative_engine$NarrativeEngine$Syntax$RuleParser$ruleParser = function () {
	var toRule = F3(
		function (trigger, conditions, changes) {
			return {aS: changes, _: conditions, a8: trigger};
		});
	var specificTriggerParser = A2(
		elm$parser$Parser$keeper,
		A2(
			elm$parser$Parser$ignorer,
			elm$parser$Parser$succeed(elm$core$Basics$identity),
			elm$parser$Parser$token('\"')),
		A2(
			elm$parser$Parser$ignorer,
			elm$parser$Parser$getChompedString(
				elm$parser$Parser$chompUntil('\"')),
			elm$parser$Parser$symbol('\"')));
	var triggerParser = A2(
		elm$parser$Parser$keeper,
		A2(
			elm$parser$Parser$ignorer,
			A2(
				elm$parser$Parser$ignorer,
				A2(
					elm$parser$Parser$ignorer,
					elm$parser$Parser$succeed(elm$core$Basics$identity),
					elm$parser$Parser$spaces),
				elm$parser$Parser$oneOf(
					_List_fromArray(
						[
							elm$parser$Parser$keyword('ON:'),
							elm$parser$Parser$keyword('ON')
						]))),
			elm$parser$Parser$spaces),
		A2(
			elm$parser$Parser$ignorer,
			elm$parser$Parser$oneOf(
				_List_fromArray(
					[
						A2(elm$parser$Parser$map, jschomay$elm_narrative_engine$NarrativeEngine$Core$Rules$SpecificTrigger, specificTriggerParser),
						A2(elm$parser$Parser$map, jschomay$elm_narrative_engine$NarrativeEngine$Core$Rules$EntityTrigger, jschomay$elm_narrative_engine$NarrativeEngine$Syntax$RuleParser$matcherParser)
					])),
			elm$parser$Parser$spaces));
	var conditionsParser = A2(
		elm$parser$Parser$keeper,
		A2(
			elm$parser$Parser$ignorer,
			A2(
				elm$parser$Parser$ignorer,
				elm$parser$Parser$succeed(elm$core$Basics$identity),
				elm$parser$Parser$oneOf(
					_List_fromArray(
						[
							elm$parser$Parser$keyword('IF:'),
							elm$parser$Parser$keyword('IF'),
							elm$parser$Parser$succeed(0)
						]))),
			elm$parser$Parser$spaces),
		A2(
			elm$parser$Parser$loop,
			_List_Nil,
			function (acc) {
				return elm$parser$Parser$oneOf(
					_List_fromArray(
						[
							A2(
							elm$parser$Parser$map,
							function (_n1) {
								return elm$parser$Parser$Done(
									elm$core$List$reverse(acc));
							},
							A2(
								elm$parser$Parser$ignorer,
								elm$parser$Parser$oneOf(
									_List_fromArray(
										[
											elm$parser$Parser$keyword('DO:'),
											elm$parser$Parser$keyword('DO'),
											elm$parser$Parser$end
										])),
								elm$parser$Parser$spaces)),
							A2(
							elm$parser$Parser$map,
							function (condition) {
								return elm$parser$Parser$Loop(
									A2(elm$core$List$cons, condition, acc));
							},
							A2(elm$parser$Parser$ignorer, jschomay$elm_narrative_engine$NarrativeEngine$Syntax$RuleParser$matcherParser, elm$parser$Parser$spaces))
						]));
			}));
	var changesParser_ = A2(
		elm$parser$Parser$loop,
		_List_Nil,
		function (acc) {
			return elm$parser$Parser$oneOf(
				_List_fromArray(
					[
						A2(
						elm$parser$Parser$map,
						function (_n0) {
							return elm$parser$Parser$Done(
								elm$core$List$reverse(acc));
						},
						elm$parser$Parser$end),
						A2(
						elm$parser$Parser$map,
						function (condition) {
							return elm$parser$Parser$Loop(
								A2(elm$core$List$cons, condition, acc));
						},
						A2(elm$parser$Parser$ignorer, jschomay$elm_narrative_engine$NarrativeEngine$Syntax$RuleParser$changesParser, elm$parser$Parser$spaces))
					]));
		});
	return A2(
		elm$parser$Parser$keeper,
		A2(
			elm$parser$Parser$keeper,
			A2(
				elm$parser$Parser$keeper,
				elm$parser$Parser$succeed(toRule),
				triggerParser),
			conditionsParser),
		changesParser_);
}();
var jschomay$elm_narrative_engine$NarrativeEngine$Syntax$RuleParser$parseRule = F2(
	function (extendFn, _n0) {
		var source = _n0.a;
		var extraFields = _n0.b;
		return A2(
			elm$core$Result$mapError,
			jschomay$elm_narrative_engine$NarrativeEngine$Syntax$Helpers$deadEndsToString,
			A2(
				elm$core$Result$map,
				extendFn(extraFields),
				A2(
					elm$parser$Parser$run,
					A2(elm$parser$Parser$ignorer, jschomay$elm_narrative_engine$NarrativeEngine$Syntax$RuleParser$ruleParser, elm$parser$Parser$end),
					source)));
	});
var jschomay$elm_narrative_engine$NarrativeEngine$Syntax$RuleParser$parseRules = F2(
	function (extendFn, rules) {
		var displayError = F3(
			function (k, v, e) {
				return _Utils_Tuple2('Rule: ' + (k + ('\n' + (v.a + ' '))), e);
			});
		var addParsedRule = F3(
			function (id, ruleSpec, acc) {
				var _n0 = A2(jschomay$elm_narrative_engine$NarrativeEngine$Syntax$RuleParser$parseRule, extendFn, ruleSpec);
				if (!_n0.$) {
					var parsedRule = _n0.a;
					return A2(
						elm$core$Result$map,
						A2(elm$core$Dict$insert, id, parsedRule),
						acc);
				} else {
					var err = _n0.a;
					if (!acc.$) {
						return elm$core$Result$Err(
							_List_fromArray(
								[
									A3(displayError, id, ruleSpec, err)
								]));
					} else {
						var errors = acc.a;
						return elm$core$Result$Err(
							A2(
								elm$core$List$cons,
								A3(displayError, id, ruleSpec, err),
								errors));
					}
				}
			});
		return A3(
			elm$core$Dict$foldl,
			addParsedRule,
			elm$core$Result$Ok(elm$core$Dict$empty),
			rules);
	});
var author$project$Preview$main = function () {
	var addExtraRuleFields = F2(
		function (extraFields, rule) {
			return rule;
		});
	var addExtraEntityFields = F2(
		function (_n1, _n2) {
			var name = _n1.H;
			var description = _n1.N;
			var tags = _n2.aI;
			var stats = _n2.aF;
			var links = _n2.an;
			return {N: description, an: links, H: name, aF: stats, aI: tags};
		});
	var parsedData = A4(
		elm$core$Result$map3,
		F3(
			function (parsedInitialWorldModel, narrative, parsedRules) {
				return _Utils_Tuple2(parsedInitialWorldModel, parsedRules);
			}),
		A2(jschomay$elm_narrative_engine$NarrativeEngine$Syntax$EntityParser$parseMany, addExtraEntityFields, author$project$Preview$initialWorldModelSpec),
		jschomay$elm_narrative_engine$NarrativeEngine$Syntax$NarrativeParser$parseMany(author$project$Preview$narrative_content),
		A2(jschomay$elm_narrative_engine$NarrativeEngine$Syntax$RuleParser$parseRules, addExtraRuleFields, author$project$Preview$rulesSpec));
	return elm$browser$Browser$sandbox(
		{
			a$: author$project$Preview$initialModel(
				A2(
					elm$core$Result$withDefault,
					elm$core$Dict$empty,
					A2(elm$core$Result$map, elm$core$Tuple$first, parsedData))),
			a9: author$project$Preview$update(
				A2(
					elm$core$Result$withDefault,
					elm$core$Dict$empty,
					A2(elm$core$Result$map, elm$core$Tuple$second, parsedData))),
			bb: function () {
				if (!parsedData.$) {
					return author$project$Preview$view;
				} else {
					var errors = parsedData.a;
					return function (model) {
						return jschomay$elm_narrative_engine$NarrativeEngine$Syntax$Helpers$parseErrorsView(errors);
					};
				}
			}()
		});
}();
_Platform_export({'Preview':{'init':author$project$Preview$main(
	elm$json$Json$Decode$succeed(0))(0)}});}(this));