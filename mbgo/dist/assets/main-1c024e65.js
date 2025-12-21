var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, a as reactDomExports, R as ReactDOM, b as React, c as React$1 } from "./vendor-77a3a710.js";
(/* @__PURE__ */ __name(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity)
      fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy)
      fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  __name(getFetchOpts, "getFetchOpts");
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
  __name(processPreload, "processPreload");
}, "polyfill"))();
var jsxRuntime = { exports: {} };
var reactJsxRuntime_production_min = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f = reactExports, k = Symbol.for("react.element"), l = Symbol.for("react.fragment"), m$1 = Object.prototype.hasOwnProperty, n = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, p = { key: true, ref: true, __self: true, __source: true };
function q(c, a, g) {
  var b, d = {}, e = null, h = null;
  void 0 !== g && (e = "" + g);
  void 0 !== a.key && (e = "" + a.key);
  void 0 !== a.ref && (h = a.ref);
  for (b in a)
    m$1.call(a, b) && !p.hasOwnProperty(b) && (d[b] = a[b]);
  if (c && c.defaultProps)
    for (b in a = c.defaultProps, a)
      void 0 === d[b] && (d[b] = a[b]);
  return { $$typeof: k, type: c, key: e, ref: h, props: d, _owner: n.current };
}
__name(q, "q");
reactJsxRuntime_production_min.Fragment = l;
reactJsxRuntime_production_min.jsx = q;
reactJsxRuntime_production_min.jsxs = q;
{
  jsxRuntime.exports = reactJsxRuntime_production_min;
}
var jsxRuntimeExports = jsxRuntime.exports;
var client = {};
var m = reactDomExports;
{
  client.createRoot = m.createRoot;
  client.hydrateRoot = m.hydrateRoot;
}
function _setPrototypeOf(t, e) {
  return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t2, e2) {
    return t2.__proto__ = e2, t2;
  }, _setPrototypeOf(t, e);
}
__name(_setPrototypeOf, "_setPrototypeOf");
function _inheritsLoose(t, o) {
  t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o);
}
__name(_inheritsLoose, "_inheritsLoose");
var Subscribable = /* @__PURE__ */ function() {
  function Subscribable2() {
    this.listeners = [];
  }
  __name(Subscribable2, "Subscribable");
  var _proto = Subscribable2.prototype;
  _proto.subscribe = /* @__PURE__ */ __name(function subscribe(listener) {
    var _this = this;
    var callback = listener || function() {
      return void 0;
    };
    this.listeners.push(callback);
    this.onSubscribe();
    return function() {
      _this.listeners = _this.listeners.filter(function(x) {
        return x !== callback;
      });
      _this.onUnsubscribe();
    };
  }, "subscribe");
  _proto.hasListeners = /* @__PURE__ */ __name(function hasListeners() {
    return this.listeners.length > 0;
  }, "hasListeners");
  _proto.onSubscribe = /* @__PURE__ */ __name(function onSubscribe() {
  }, "onSubscribe");
  _proto.onUnsubscribe = /* @__PURE__ */ __name(function onUnsubscribe() {
  }, "onUnsubscribe");
  return Subscribable2;
}();
function _extends$3() {
  return _extends$3 = Object.assign ? Object.assign.bind() : function(n2) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t)
        ({}).hasOwnProperty.call(t, r) && (n2[r] = t[r]);
    }
    return n2;
  }, _extends$3.apply(null, arguments);
}
__name(_extends$3, "_extends$3");
var isServer = typeof window === "undefined";
function noop() {
  return void 0;
}
__name(noop, "noop");
function functionalUpdate(updater, input) {
  return typeof updater === "function" ? updater(input) : updater;
}
__name(functionalUpdate, "functionalUpdate");
function isValidTimeout(value) {
  return typeof value === "number" && value >= 0 && value !== Infinity;
}
__name(isValidTimeout, "isValidTimeout");
function ensureQueryKeyArray(value) {
  return Array.isArray(value) ? value : [value];
}
__name(ensureQueryKeyArray, "ensureQueryKeyArray");
function timeUntilStale(updatedAt, staleTime) {
  return Math.max(updatedAt + (staleTime || 0) - Date.now(), 0);
}
__name(timeUntilStale, "timeUntilStale");
function parseQueryArgs(arg1, arg2, arg3) {
  if (!isQueryKey(arg1)) {
    return arg1;
  }
  if (typeof arg2 === "function") {
    return _extends$3({}, arg3, {
      queryKey: arg1,
      queryFn: arg2
    });
  }
  return _extends$3({}, arg2, {
    queryKey: arg1
  });
}
__name(parseQueryArgs, "parseQueryArgs");
function parseFilterArgs(arg1, arg2, arg3) {
  return isQueryKey(arg1) ? [_extends$3({}, arg2, {
    queryKey: arg1
  }), arg3] : [arg1 || {}, arg2];
}
__name(parseFilterArgs, "parseFilterArgs");
function mapQueryStatusFilter(active, inactive) {
  if (active === true && inactive === true || active == null && inactive == null) {
    return "all";
  } else if (active === false && inactive === false) {
    return "none";
  } else {
    var isActive = active != null ? active : !inactive;
    return isActive ? "active" : "inactive";
  }
}
__name(mapQueryStatusFilter, "mapQueryStatusFilter");
function matchQuery(filters, query) {
  var active = filters.active, exact = filters.exact, fetching = filters.fetching, inactive = filters.inactive, predicate = filters.predicate, queryKey = filters.queryKey, stale = filters.stale;
  if (isQueryKey(queryKey)) {
    if (exact) {
      if (query.queryHash !== hashQueryKeyByOptions(queryKey, query.options)) {
        return false;
      }
    } else if (!partialMatchKey(query.queryKey, queryKey)) {
      return false;
    }
  }
  var queryStatusFilter = mapQueryStatusFilter(active, inactive);
  if (queryStatusFilter === "none") {
    return false;
  } else if (queryStatusFilter !== "all") {
    var isActive = query.isActive();
    if (queryStatusFilter === "active" && !isActive) {
      return false;
    }
    if (queryStatusFilter === "inactive" && isActive) {
      return false;
    }
  }
  if (typeof stale === "boolean" && query.isStale() !== stale) {
    return false;
  }
  if (typeof fetching === "boolean" && query.isFetching() !== fetching) {
    return false;
  }
  if (predicate && !predicate(query)) {
    return false;
  }
  return true;
}
__name(matchQuery, "matchQuery");
function matchMutation(filters, mutation) {
  var exact = filters.exact, fetching = filters.fetching, predicate = filters.predicate, mutationKey = filters.mutationKey;
  if (isQueryKey(mutationKey)) {
    if (!mutation.options.mutationKey) {
      return false;
    }
    if (exact) {
      if (hashQueryKey(mutation.options.mutationKey) !== hashQueryKey(mutationKey)) {
        return false;
      }
    } else if (!partialMatchKey(mutation.options.mutationKey, mutationKey)) {
      return false;
    }
  }
  if (typeof fetching === "boolean" && mutation.state.status === "loading" !== fetching) {
    return false;
  }
  if (predicate && !predicate(mutation)) {
    return false;
  }
  return true;
}
__name(matchMutation, "matchMutation");
function hashQueryKeyByOptions(queryKey, options) {
  var hashFn = (options == null ? void 0 : options.queryKeyHashFn) || hashQueryKey;
  return hashFn(queryKey);
}
__name(hashQueryKeyByOptions, "hashQueryKeyByOptions");
function hashQueryKey(queryKey) {
  var asArray = ensureQueryKeyArray(queryKey);
  return stableValueHash(asArray);
}
__name(hashQueryKey, "hashQueryKey");
function stableValueHash(value) {
  return JSON.stringify(value, function(_, val) {
    return isPlainObject(val) ? Object.keys(val).sort().reduce(function(result, key) {
      result[key] = val[key];
      return result;
    }, {}) : val;
  });
}
__name(stableValueHash, "stableValueHash");
function partialMatchKey(a, b) {
  return partialDeepEqual(ensureQueryKeyArray(a), ensureQueryKeyArray(b));
}
__name(partialMatchKey, "partialMatchKey");
function partialDeepEqual(a, b) {
  if (a === b) {
    return true;
  }
  if (typeof a !== typeof b) {
    return false;
  }
  if (a && b && typeof a === "object" && typeof b === "object") {
    return !Object.keys(b).some(function(key) {
      return !partialDeepEqual(a[key], b[key]);
    });
  }
  return false;
}
__name(partialDeepEqual, "partialDeepEqual");
function replaceEqualDeep(a, b) {
  if (a === b) {
    return a;
  }
  var array = Array.isArray(a) && Array.isArray(b);
  if (array || isPlainObject(a) && isPlainObject(b)) {
    var aSize = array ? a.length : Object.keys(a).length;
    var bItems = array ? b : Object.keys(b);
    var bSize = bItems.length;
    var copy = array ? [] : {};
    var equalItems = 0;
    for (var i = 0; i < bSize; i++) {
      var key = array ? i : bItems[i];
      copy[key] = replaceEqualDeep(a[key], b[key]);
      if (copy[key] === a[key]) {
        equalItems++;
      }
    }
    return aSize === bSize && equalItems === aSize ? a : copy;
  }
  return b;
}
__name(replaceEqualDeep, "replaceEqualDeep");
function isPlainObject(o) {
  if (!hasObjectPrototype(o)) {
    return false;
  }
  var ctor = o.constructor;
  if (typeof ctor === "undefined") {
    return true;
  }
  var prot = ctor.prototype;
  if (!hasObjectPrototype(prot)) {
    return false;
  }
  if (!prot.hasOwnProperty("isPrototypeOf")) {
    return false;
  }
  return true;
}
__name(isPlainObject, "isPlainObject");
function hasObjectPrototype(o) {
  return Object.prototype.toString.call(o) === "[object Object]";
}
__name(hasObjectPrototype, "hasObjectPrototype");
function isQueryKey(value) {
  return typeof value === "string" || Array.isArray(value);
}
__name(isQueryKey, "isQueryKey");
function sleep(timeout) {
  return new Promise(function(resolve) {
    setTimeout(resolve, timeout);
  });
}
__name(sleep, "sleep");
function scheduleMicrotask(callback) {
  Promise.resolve().then(callback).catch(function(error) {
    return setTimeout(function() {
      throw error;
    });
  });
}
__name(scheduleMicrotask, "scheduleMicrotask");
function getAbortController() {
  if (typeof AbortController === "function") {
    return new AbortController();
  }
}
__name(getAbortController, "getAbortController");
var FocusManager = /* @__PURE__ */ function(_Subscribable) {
  _inheritsLoose(FocusManager2, _Subscribable);
  function FocusManager2() {
    var _this;
    _this = _Subscribable.call(this) || this;
    _this.setup = function(onFocus) {
      var _window;
      if (!isServer && ((_window = window) == null ? void 0 : _window.addEventListener)) {
        var listener = /* @__PURE__ */ __name(function listener2() {
          return onFocus();
        }, "listener");
        window.addEventListener("visibilitychange", listener, false);
        window.addEventListener("focus", listener, false);
        return function() {
          window.removeEventListener("visibilitychange", listener);
          window.removeEventListener("focus", listener);
        };
      }
    };
    return _this;
  }
  __name(FocusManager2, "FocusManager");
  var _proto = FocusManager2.prototype;
  _proto.onSubscribe = /* @__PURE__ */ __name(function onSubscribe() {
    if (!this.cleanup) {
      this.setEventListener(this.setup);
    }
  }, "onSubscribe");
  _proto.onUnsubscribe = /* @__PURE__ */ __name(function onUnsubscribe() {
    if (!this.hasListeners()) {
      var _this$cleanup;
      (_this$cleanup = this.cleanup) == null ? void 0 : _this$cleanup.call(this);
      this.cleanup = void 0;
    }
  }, "onUnsubscribe");
  _proto.setEventListener = /* @__PURE__ */ __name(function setEventListener(setup) {
    var _this$cleanup2, _this2 = this;
    this.setup = setup;
    (_this$cleanup2 = this.cleanup) == null ? void 0 : _this$cleanup2.call(this);
    this.cleanup = setup(function(focused) {
      if (typeof focused === "boolean") {
        _this2.setFocused(focused);
      } else {
        _this2.onFocus();
      }
    });
  }, "setEventListener");
  _proto.setFocused = /* @__PURE__ */ __name(function setFocused(focused) {
    this.focused = focused;
    if (focused) {
      this.onFocus();
    }
  }, "setFocused");
  _proto.onFocus = /* @__PURE__ */ __name(function onFocus() {
    this.listeners.forEach(function(listener) {
      listener();
    });
  }, "onFocus");
  _proto.isFocused = /* @__PURE__ */ __name(function isFocused() {
    if (typeof this.focused === "boolean") {
      return this.focused;
    }
    if (typeof document === "undefined") {
      return true;
    }
    return [void 0, "visible", "prerender"].includes(document.visibilityState);
  }, "isFocused");
  return FocusManager2;
}(Subscribable);
var focusManager = new FocusManager();
var OnlineManager = /* @__PURE__ */ function(_Subscribable) {
  _inheritsLoose(OnlineManager2, _Subscribable);
  function OnlineManager2() {
    var _this;
    _this = _Subscribable.call(this) || this;
    _this.setup = function(onOnline) {
      var _window;
      if (!isServer && ((_window = window) == null ? void 0 : _window.addEventListener)) {
        var listener = /* @__PURE__ */ __name(function listener2() {
          return onOnline();
        }, "listener");
        window.addEventListener("online", listener, false);
        window.addEventListener("offline", listener, false);
        return function() {
          window.removeEventListener("online", listener);
          window.removeEventListener("offline", listener);
        };
      }
    };
    return _this;
  }
  __name(OnlineManager2, "OnlineManager");
  var _proto = OnlineManager2.prototype;
  _proto.onSubscribe = /* @__PURE__ */ __name(function onSubscribe() {
    if (!this.cleanup) {
      this.setEventListener(this.setup);
    }
  }, "onSubscribe");
  _proto.onUnsubscribe = /* @__PURE__ */ __name(function onUnsubscribe() {
    if (!this.hasListeners()) {
      var _this$cleanup;
      (_this$cleanup = this.cleanup) == null ? void 0 : _this$cleanup.call(this);
      this.cleanup = void 0;
    }
  }, "onUnsubscribe");
  _proto.setEventListener = /* @__PURE__ */ __name(function setEventListener(setup) {
    var _this$cleanup2, _this2 = this;
    this.setup = setup;
    (_this$cleanup2 = this.cleanup) == null ? void 0 : _this$cleanup2.call(this);
    this.cleanup = setup(function(online) {
      if (typeof online === "boolean") {
        _this2.setOnline(online);
      } else {
        _this2.onOnline();
      }
    });
  }, "setEventListener");
  _proto.setOnline = /* @__PURE__ */ __name(function setOnline(online) {
    this.online = online;
    if (online) {
      this.onOnline();
    }
  }, "setOnline");
  _proto.onOnline = /* @__PURE__ */ __name(function onOnline() {
    this.listeners.forEach(function(listener) {
      listener();
    });
  }, "onOnline");
  _proto.isOnline = /* @__PURE__ */ __name(function isOnline() {
    if (typeof this.online === "boolean") {
      return this.online;
    }
    if (typeof navigator === "undefined" || typeof navigator.onLine === "undefined") {
      return true;
    }
    return navigator.onLine;
  }, "isOnline");
  return OnlineManager2;
}(Subscribable);
var onlineManager = new OnlineManager();
function defaultRetryDelay(failureCount) {
  return Math.min(1e3 * Math.pow(2, failureCount), 3e4);
}
__name(defaultRetryDelay, "defaultRetryDelay");
function isCancelable(value) {
  return typeof (value == null ? void 0 : value.cancel) === "function";
}
__name(isCancelable, "isCancelable");
var CancelledError = /* @__PURE__ */ __name(function CancelledError2(options) {
  this.revert = options == null ? void 0 : options.revert;
  this.silent = options == null ? void 0 : options.silent;
}, "CancelledError");
function isCancelledError(value) {
  return value instanceof CancelledError;
}
__name(isCancelledError, "isCancelledError");
var Retryer = /* @__PURE__ */ __name(function Retryer2(config) {
  var _this = this;
  var cancelRetry = false;
  var cancelFn;
  var continueFn;
  var promiseResolve;
  var promiseReject;
  this.abort = config.abort;
  this.cancel = function(cancelOptions) {
    return cancelFn == null ? void 0 : cancelFn(cancelOptions);
  };
  this.cancelRetry = function() {
    cancelRetry = true;
  };
  this.continueRetry = function() {
    cancelRetry = false;
  };
  this.continue = function() {
    return continueFn == null ? void 0 : continueFn();
  };
  this.failureCount = 0;
  this.isPaused = false;
  this.isResolved = false;
  this.isTransportCancelable = false;
  this.promise = new Promise(function(outerResolve, outerReject) {
    promiseResolve = outerResolve;
    promiseReject = outerReject;
  });
  var resolve = /* @__PURE__ */ __name(function resolve2(value) {
    if (!_this.isResolved) {
      _this.isResolved = true;
      config.onSuccess == null ? void 0 : config.onSuccess(value);
      continueFn == null ? void 0 : continueFn();
      promiseResolve(value);
    }
  }, "resolve");
  var reject = /* @__PURE__ */ __name(function reject2(value) {
    if (!_this.isResolved) {
      _this.isResolved = true;
      config.onError == null ? void 0 : config.onError(value);
      continueFn == null ? void 0 : continueFn();
      promiseReject(value);
    }
  }, "reject");
  var pause = /* @__PURE__ */ __name(function pause2() {
    return new Promise(function(continueResolve) {
      continueFn = continueResolve;
      _this.isPaused = true;
      config.onPause == null ? void 0 : config.onPause();
    }).then(function() {
      continueFn = void 0;
      _this.isPaused = false;
      config.onContinue == null ? void 0 : config.onContinue();
    });
  }, "pause");
  var run = /* @__PURE__ */ __name(function run2() {
    if (_this.isResolved) {
      return;
    }
    var promiseOrValue;
    try {
      promiseOrValue = config.fn();
    } catch (error) {
      promiseOrValue = Promise.reject(error);
    }
    cancelFn = /* @__PURE__ */ __name(function cancelFn2(cancelOptions) {
      if (!_this.isResolved) {
        reject(new CancelledError(cancelOptions));
        _this.abort == null ? void 0 : _this.abort();
        if (isCancelable(promiseOrValue)) {
          try {
            promiseOrValue.cancel();
          } catch (_unused) {
          }
        }
      }
    }, "cancelFn");
    _this.isTransportCancelable = isCancelable(promiseOrValue);
    Promise.resolve(promiseOrValue).then(resolve).catch(function(error) {
      var _config$retry, _config$retryDelay;
      if (_this.isResolved) {
        return;
      }
      var retry = (_config$retry = config.retry) != null ? _config$retry : 3;
      var retryDelay = (_config$retryDelay = config.retryDelay) != null ? _config$retryDelay : defaultRetryDelay;
      var delay = typeof retryDelay === "function" ? retryDelay(_this.failureCount, error) : retryDelay;
      var shouldRetry = retry === true || typeof retry === "number" && _this.failureCount < retry || typeof retry === "function" && retry(_this.failureCount, error);
      if (cancelRetry || !shouldRetry) {
        reject(error);
        return;
      }
      _this.failureCount++;
      config.onFail == null ? void 0 : config.onFail(_this.failureCount, error);
      sleep(delay).then(function() {
        if (!focusManager.isFocused() || !onlineManager.isOnline()) {
          return pause();
        }
      }).then(function() {
        if (cancelRetry) {
          reject(error);
        } else {
          run2();
        }
      });
    });
  }, "run");
  run();
}, "Retryer");
var NotifyManager = /* @__PURE__ */ function() {
  function NotifyManager2() {
    this.queue = [];
    this.transactions = 0;
    this.notifyFn = function(callback) {
      callback();
    };
    this.batchNotifyFn = function(callback) {
      callback();
    };
  }
  __name(NotifyManager2, "NotifyManager");
  var _proto = NotifyManager2.prototype;
  _proto.batch = /* @__PURE__ */ __name(function batch(callback) {
    var result;
    this.transactions++;
    try {
      result = callback();
    } finally {
      this.transactions--;
      if (!this.transactions) {
        this.flush();
      }
    }
    return result;
  }, "batch");
  _proto.schedule = /* @__PURE__ */ __name(function schedule(callback) {
    var _this = this;
    if (this.transactions) {
      this.queue.push(callback);
    } else {
      scheduleMicrotask(function() {
        _this.notifyFn(callback);
      });
    }
  }, "schedule");
  _proto.batchCalls = /* @__PURE__ */ __name(function batchCalls(callback) {
    var _this2 = this;
    return function() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      _this2.schedule(function() {
        callback.apply(void 0, args);
      });
    };
  }, "batchCalls");
  _proto.flush = /* @__PURE__ */ __name(function flush() {
    var _this3 = this;
    var queue = this.queue;
    this.queue = [];
    if (queue.length) {
      scheduleMicrotask(function() {
        _this3.batchNotifyFn(function() {
          queue.forEach(function(callback) {
            _this3.notifyFn(callback);
          });
        });
      });
    }
  }, "flush");
  _proto.setNotifyFunction = /* @__PURE__ */ __name(function setNotifyFunction(fn) {
    this.notifyFn = fn;
  }, "setNotifyFunction");
  _proto.setBatchNotifyFunction = /* @__PURE__ */ __name(function setBatchNotifyFunction(fn) {
    this.batchNotifyFn = fn;
  }, "setBatchNotifyFunction");
  return NotifyManager2;
}();
var notifyManager = new NotifyManager();
var logger$1 = console;
function getLogger() {
  return logger$1;
}
__name(getLogger, "getLogger");
function setLogger(newLogger) {
  logger$1 = newLogger;
}
__name(setLogger, "setLogger");
var Query = /* @__PURE__ */ function() {
  function Query2(config) {
    this.abortSignalConsumed = false;
    this.hadObservers = false;
    this.defaultOptions = config.defaultOptions;
    this.setOptions(config.options);
    this.observers = [];
    this.cache = config.cache;
    this.queryKey = config.queryKey;
    this.queryHash = config.queryHash;
    this.initialState = config.state || this.getDefaultState(this.options);
    this.state = this.initialState;
    this.meta = config.meta;
    this.scheduleGc();
  }
  __name(Query2, "Query");
  var _proto = Query2.prototype;
  _proto.setOptions = /* @__PURE__ */ __name(function setOptions(options) {
    var _this$options$cacheTi;
    this.options = _extends$3({}, this.defaultOptions, options);
    this.meta = options == null ? void 0 : options.meta;
    this.cacheTime = Math.max(this.cacheTime || 0, (_this$options$cacheTi = this.options.cacheTime) != null ? _this$options$cacheTi : 5 * 60 * 1e3);
  }, "setOptions");
  _proto.setDefaultOptions = /* @__PURE__ */ __name(function setDefaultOptions(options) {
    this.defaultOptions = options;
  }, "setDefaultOptions");
  _proto.scheduleGc = /* @__PURE__ */ __name(function scheduleGc() {
    var _this = this;
    this.clearGcTimeout();
    if (isValidTimeout(this.cacheTime)) {
      this.gcTimeout = setTimeout(function() {
        _this.optionalRemove();
      }, this.cacheTime);
    }
  }, "scheduleGc");
  _proto.clearGcTimeout = /* @__PURE__ */ __name(function clearGcTimeout() {
    if (this.gcTimeout) {
      clearTimeout(this.gcTimeout);
      this.gcTimeout = void 0;
    }
  }, "clearGcTimeout");
  _proto.optionalRemove = /* @__PURE__ */ __name(function optionalRemove() {
    if (!this.observers.length) {
      if (this.state.isFetching) {
        if (this.hadObservers) {
          this.scheduleGc();
        }
      } else {
        this.cache.remove(this);
      }
    }
  }, "optionalRemove");
  _proto.setData = /* @__PURE__ */ __name(function setData(updater, options) {
    var _this$options$isDataE, _this$options;
    var prevData = this.state.data;
    var data = functionalUpdate(updater, prevData);
    if ((_this$options$isDataE = (_this$options = this.options).isDataEqual) == null ? void 0 : _this$options$isDataE.call(_this$options, prevData, data)) {
      data = prevData;
    } else if (this.options.structuralSharing !== false) {
      data = replaceEqualDeep(prevData, data);
    }
    this.dispatch({
      data,
      type: "success",
      dataUpdatedAt: options == null ? void 0 : options.updatedAt
    });
    return data;
  }, "setData");
  _proto.setState = /* @__PURE__ */ __name(function setState(state, setStateOptions) {
    this.dispatch({
      type: "setState",
      state,
      setStateOptions
    });
  }, "setState");
  _proto.cancel = /* @__PURE__ */ __name(function cancel(options) {
    var _this$retryer;
    var promise = this.promise;
    (_this$retryer = this.retryer) == null ? void 0 : _this$retryer.cancel(options);
    return promise ? promise.then(noop).catch(noop) : Promise.resolve();
  }, "cancel");
  _proto.destroy = /* @__PURE__ */ __name(function destroy() {
    this.clearGcTimeout();
    this.cancel({
      silent: true
    });
  }, "destroy");
  _proto.reset = /* @__PURE__ */ __name(function reset() {
    this.destroy();
    this.setState(this.initialState);
  }, "reset");
  _proto.isActive = /* @__PURE__ */ __name(function isActive() {
    return this.observers.some(function(observer) {
      return observer.options.enabled !== false;
    });
  }, "isActive");
  _proto.isFetching = /* @__PURE__ */ __name(function isFetching() {
    return this.state.isFetching;
  }, "isFetching");
  _proto.isStale = /* @__PURE__ */ __name(function isStale() {
    return this.state.isInvalidated || !this.state.dataUpdatedAt || this.observers.some(function(observer) {
      return observer.getCurrentResult().isStale;
    });
  }, "isStale");
  _proto.isStaleByTime = /* @__PURE__ */ __name(function isStaleByTime(staleTime) {
    if (staleTime === void 0) {
      staleTime = 0;
    }
    return this.state.isInvalidated || !this.state.dataUpdatedAt || !timeUntilStale(this.state.dataUpdatedAt, staleTime);
  }, "isStaleByTime");
  _proto.onFocus = /* @__PURE__ */ __name(function onFocus() {
    var _this$retryer2;
    var observer = this.observers.find(function(x) {
      return x.shouldFetchOnWindowFocus();
    });
    if (observer) {
      observer.refetch();
    }
    (_this$retryer2 = this.retryer) == null ? void 0 : _this$retryer2.continue();
  }, "onFocus");
  _proto.onOnline = /* @__PURE__ */ __name(function onOnline() {
    var _this$retryer3;
    var observer = this.observers.find(function(x) {
      return x.shouldFetchOnReconnect();
    });
    if (observer) {
      observer.refetch();
    }
    (_this$retryer3 = this.retryer) == null ? void 0 : _this$retryer3.continue();
  }, "onOnline");
  _proto.addObserver = /* @__PURE__ */ __name(function addObserver(observer) {
    if (this.observers.indexOf(observer) === -1) {
      this.observers.push(observer);
      this.hadObservers = true;
      this.clearGcTimeout();
      this.cache.notify({
        type: "observerAdded",
        query: this,
        observer
      });
    }
  }, "addObserver");
  _proto.removeObserver = /* @__PURE__ */ __name(function removeObserver(observer) {
    if (this.observers.indexOf(observer) !== -1) {
      this.observers = this.observers.filter(function(x) {
        return x !== observer;
      });
      if (!this.observers.length) {
        if (this.retryer) {
          if (this.retryer.isTransportCancelable || this.abortSignalConsumed) {
            this.retryer.cancel({
              revert: true
            });
          } else {
            this.retryer.cancelRetry();
          }
        }
        if (this.cacheTime) {
          this.scheduleGc();
        } else {
          this.cache.remove(this);
        }
      }
      this.cache.notify({
        type: "observerRemoved",
        query: this,
        observer
      });
    }
  }, "removeObserver");
  _proto.getObserversCount = /* @__PURE__ */ __name(function getObserversCount() {
    return this.observers.length;
  }, "getObserversCount");
  _proto.invalidate = /* @__PURE__ */ __name(function invalidate() {
    if (!this.state.isInvalidated) {
      this.dispatch({
        type: "invalidate"
      });
    }
  }, "invalidate");
  _proto.fetch = /* @__PURE__ */ __name(function fetch2(options, fetchOptions) {
    var _this2 = this, _this$options$behavio, _context$fetchOptions, _abortController$abor;
    if (this.state.isFetching) {
      if (this.state.dataUpdatedAt && (fetchOptions == null ? void 0 : fetchOptions.cancelRefetch)) {
        this.cancel({
          silent: true
        });
      } else if (this.promise) {
        var _this$retryer4;
        (_this$retryer4 = this.retryer) == null ? void 0 : _this$retryer4.continueRetry();
        return this.promise;
      }
    }
    if (options) {
      this.setOptions(options);
    }
    if (!this.options.queryFn) {
      var observer = this.observers.find(function(x) {
        return x.options.queryFn;
      });
      if (observer) {
        this.setOptions(observer.options);
      }
    }
    var queryKey = ensureQueryKeyArray(this.queryKey);
    var abortController = getAbortController();
    var queryFnContext = {
      queryKey,
      pageParam: void 0,
      meta: this.meta
    };
    Object.defineProperty(queryFnContext, "signal", {
      enumerable: true,
      get: /* @__PURE__ */ __name(function get() {
        if (abortController) {
          _this2.abortSignalConsumed = true;
          return abortController.signal;
        }
        return void 0;
      }, "get")
    });
    var fetchFn = /* @__PURE__ */ __name(function fetchFn2() {
      if (!_this2.options.queryFn) {
        return Promise.reject("Missing queryFn");
      }
      _this2.abortSignalConsumed = false;
      return _this2.options.queryFn(queryFnContext);
    }, "fetchFn");
    var context = {
      fetchOptions,
      options: this.options,
      queryKey,
      state: this.state,
      fetchFn,
      meta: this.meta
    };
    if ((_this$options$behavio = this.options.behavior) == null ? void 0 : _this$options$behavio.onFetch) {
      var _this$options$behavio2;
      (_this$options$behavio2 = this.options.behavior) == null ? void 0 : _this$options$behavio2.onFetch(context);
    }
    this.revertState = this.state;
    if (!this.state.isFetching || this.state.fetchMeta !== ((_context$fetchOptions = context.fetchOptions) == null ? void 0 : _context$fetchOptions.meta)) {
      var _context$fetchOptions2;
      this.dispatch({
        type: "fetch",
        meta: (_context$fetchOptions2 = context.fetchOptions) == null ? void 0 : _context$fetchOptions2.meta
      });
    }
    this.retryer = new Retryer({
      fn: context.fetchFn,
      abort: abortController == null ? void 0 : (_abortController$abor = abortController.abort) == null ? void 0 : _abortController$abor.bind(abortController),
      onSuccess: /* @__PURE__ */ __name(function onSuccess(data) {
        _this2.setData(data);
        _this2.cache.config.onSuccess == null ? void 0 : _this2.cache.config.onSuccess(data, _this2);
        if (_this2.cacheTime === 0) {
          _this2.optionalRemove();
        }
      }, "onSuccess"),
      onError: /* @__PURE__ */ __name(function onError(error) {
        if (!(isCancelledError(error) && error.silent)) {
          _this2.dispatch({
            type: "error",
            error
          });
        }
        if (!isCancelledError(error)) {
          _this2.cache.config.onError == null ? void 0 : _this2.cache.config.onError(error, _this2);
          getLogger().error(error);
        }
        if (_this2.cacheTime === 0) {
          _this2.optionalRemove();
        }
      }, "onError"),
      onFail: /* @__PURE__ */ __name(function onFail() {
        _this2.dispatch({
          type: "failed"
        });
      }, "onFail"),
      onPause: /* @__PURE__ */ __name(function onPause() {
        _this2.dispatch({
          type: "pause"
        });
      }, "onPause"),
      onContinue: /* @__PURE__ */ __name(function onContinue() {
        _this2.dispatch({
          type: "continue"
        });
      }, "onContinue"),
      retry: context.options.retry,
      retryDelay: context.options.retryDelay
    });
    this.promise = this.retryer.promise;
    return this.promise;
  }, "fetch");
  _proto.dispatch = /* @__PURE__ */ __name(function dispatch(action) {
    var _this3 = this;
    this.state = this.reducer(this.state, action);
    notifyManager.batch(function() {
      _this3.observers.forEach(function(observer) {
        observer.onQueryUpdate(action);
      });
      _this3.cache.notify({
        query: _this3,
        type: "queryUpdated",
        action
      });
    });
  }, "dispatch");
  _proto.getDefaultState = /* @__PURE__ */ __name(function getDefaultState2(options) {
    var data = typeof options.initialData === "function" ? options.initialData() : options.initialData;
    var hasInitialData = typeof options.initialData !== "undefined";
    var initialDataUpdatedAt = hasInitialData ? typeof options.initialDataUpdatedAt === "function" ? options.initialDataUpdatedAt() : options.initialDataUpdatedAt : 0;
    var hasData = typeof data !== "undefined";
    return {
      data,
      dataUpdateCount: 0,
      dataUpdatedAt: hasData ? initialDataUpdatedAt != null ? initialDataUpdatedAt : Date.now() : 0,
      error: null,
      errorUpdateCount: 0,
      errorUpdatedAt: 0,
      fetchFailureCount: 0,
      fetchMeta: null,
      isFetching: false,
      isInvalidated: false,
      isPaused: false,
      status: hasData ? "success" : "idle"
    };
  }, "getDefaultState");
  _proto.reducer = /* @__PURE__ */ __name(function reducer2(state, action) {
    var _action$meta, _action$dataUpdatedAt;
    switch (action.type) {
      case "failed":
        return _extends$3({}, state, {
          fetchFailureCount: state.fetchFailureCount + 1
        });
      case "pause":
        return _extends$3({}, state, {
          isPaused: true
        });
      case "continue":
        return _extends$3({}, state, {
          isPaused: false
        });
      case "fetch":
        return _extends$3({}, state, {
          fetchFailureCount: 0,
          fetchMeta: (_action$meta = action.meta) != null ? _action$meta : null,
          isFetching: true,
          isPaused: false
        }, !state.dataUpdatedAt && {
          error: null,
          status: "loading"
        });
      case "success":
        return _extends$3({}, state, {
          data: action.data,
          dataUpdateCount: state.dataUpdateCount + 1,
          dataUpdatedAt: (_action$dataUpdatedAt = action.dataUpdatedAt) != null ? _action$dataUpdatedAt : Date.now(),
          error: null,
          fetchFailureCount: 0,
          isFetching: false,
          isInvalidated: false,
          isPaused: false,
          status: "success"
        });
      case "error":
        var error = action.error;
        if (isCancelledError(error) && error.revert && this.revertState) {
          return _extends$3({}, this.revertState);
        }
        return _extends$3({}, state, {
          error,
          errorUpdateCount: state.errorUpdateCount + 1,
          errorUpdatedAt: Date.now(),
          fetchFailureCount: state.fetchFailureCount + 1,
          isFetching: false,
          isPaused: false,
          status: "error"
        });
      case "invalidate":
        return _extends$3({}, state, {
          isInvalidated: true
        });
      case "setState":
        return _extends$3({}, state, action.state);
      default:
        return state;
    }
  }, "reducer");
  return Query2;
}();
var QueryCache = /* @__PURE__ */ function(_Subscribable) {
  _inheritsLoose(QueryCache2, _Subscribable);
  function QueryCache2(config) {
    var _this;
    _this = _Subscribable.call(this) || this;
    _this.config = config || {};
    _this.queries = [];
    _this.queriesMap = {};
    return _this;
  }
  __name(QueryCache2, "QueryCache");
  var _proto = QueryCache2.prototype;
  _proto.build = /* @__PURE__ */ __name(function build(client2, options, state) {
    var _options$queryHash;
    var queryKey = options.queryKey;
    var queryHash = (_options$queryHash = options.queryHash) != null ? _options$queryHash : hashQueryKeyByOptions(queryKey, options);
    var query = this.get(queryHash);
    if (!query) {
      query = new Query({
        cache: this,
        queryKey,
        queryHash,
        options: client2.defaultQueryOptions(options),
        state,
        defaultOptions: client2.getQueryDefaults(queryKey),
        meta: options.meta
      });
      this.add(query);
    }
    return query;
  }, "build");
  _proto.add = /* @__PURE__ */ __name(function add(query) {
    if (!this.queriesMap[query.queryHash]) {
      this.queriesMap[query.queryHash] = query;
      this.queries.push(query);
      this.notify({
        type: "queryAdded",
        query
      });
    }
  }, "add");
  _proto.remove = /* @__PURE__ */ __name(function remove(query) {
    var queryInMap = this.queriesMap[query.queryHash];
    if (queryInMap) {
      query.destroy();
      this.queries = this.queries.filter(function(x) {
        return x !== query;
      });
      if (queryInMap === query) {
        delete this.queriesMap[query.queryHash];
      }
      this.notify({
        type: "queryRemoved",
        query
      });
    }
  }, "remove");
  _proto.clear = /* @__PURE__ */ __name(function clear() {
    var _this2 = this;
    notifyManager.batch(function() {
      _this2.queries.forEach(function(query) {
        _this2.remove(query);
      });
    });
  }, "clear");
  _proto.get = /* @__PURE__ */ __name(function get(queryHash) {
    return this.queriesMap[queryHash];
  }, "get");
  _proto.getAll = /* @__PURE__ */ __name(function getAll() {
    return this.queries;
  }, "getAll");
  _proto.find = /* @__PURE__ */ __name(function find(arg1, arg2) {
    var _parseFilterArgs = parseFilterArgs(arg1, arg2), filters = _parseFilterArgs[0];
    if (typeof filters.exact === "undefined") {
      filters.exact = true;
    }
    return this.queries.find(function(query) {
      return matchQuery(filters, query);
    });
  }, "find");
  _proto.findAll = /* @__PURE__ */ __name(function findAll(arg1, arg2) {
    var _parseFilterArgs2 = parseFilterArgs(arg1, arg2), filters = _parseFilterArgs2[0];
    return Object.keys(filters).length > 0 ? this.queries.filter(function(query) {
      return matchQuery(filters, query);
    }) : this.queries;
  }, "findAll");
  _proto.notify = /* @__PURE__ */ __name(function notify(event) {
    var _this3 = this;
    notifyManager.batch(function() {
      _this3.listeners.forEach(function(listener) {
        listener(event);
      });
    });
  }, "notify");
  _proto.onFocus = /* @__PURE__ */ __name(function onFocus() {
    var _this4 = this;
    notifyManager.batch(function() {
      _this4.queries.forEach(function(query) {
        query.onFocus();
      });
    });
  }, "onFocus");
  _proto.onOnline = /* @__PURE__ */ __name(function onOnline() {
    var _this5 = this;
    notifyManager.batch(function() {
      _this5.queries.forEach(function(query) {
        query.onOnline();
      });
    });
  }, "onOnline");
  return QueryCache2;
}(Subscribable);
var Mutation = /* @__PURE__ */ function() {
  function Mutation2(config) {
    this.options = _extends$3({}, config.defaultOptions, config.options);
    this.mutationId = config.mutationId;
    this.mutationCache = config.mutationCache;
    this.observers = [];
    this.state = config.state || getDefaultState();
    this.meta = config.meta;
  }
  __name(Mutation2, "Mutation");
  var _proto = Mutation2.prototype;
  _proto.setState = /* @__PURE__ */ __name(function setState(state) {
    this.dispatch({
      type: "setState",
      state
    });
  }, "setState");
  _proto.addObserver = /* @__PURE__ */ __name(function addObserver(observer) {
    if (this.observers.indexOf(observer) === -1) {
      this.observers.push(observer);
    }
  }, "addObserver");
  _proto.removeObserver = /* @__PURE__ */ __name(function removeObserver(observer) {
    this.observers = this.observers.filter(function(x) {
      return x !== observer;
    });
  }, "removeObserver");
  _proto.cancel = /* @__PURE__ */ __name(function cancel() {
    if (this.retryer) {
      this.retryer.cancel();
      return this.retryer.promise.then(noop).catch(noop);
    }
    return Promise.resolve();
  }, "cancel");
  _proto.continue = /* @__PURE__ */ __name(function _continue() {
    if (this.retryer) {
      this.retryer.continue();
      return this.retryer.promise;
    }
    return this.execute();
  }, "_continue");
  _proto.execute = /* @__PURE__ */ __name(function execute() {
    var _this = this;
    var data;
    var restored = this.state.status === "loading";
    var promise = Promise.resolve();
    if (!restored) {
      this.dispatch({
        type: "loading",
        variables: this.options.variables
      });
      promise = promise.then(function() {
        _this.mutationCache.config.onMutate == null ? void 0 : _this.mutationCache.config.onMutate(_this.state.variables, _this);
      }).then(function() {
        return _this.options.onMutate == null ? void 0 : _this.options.onMutate(_this.state.variables);
      }).then(function(context) {
        if (context !== _this.state.context) {
          _this.dispatch({
            type: "loading",
            context,
            variables: _this.state.variables
          });
        }
      });
    }
    return promise.then(function() {
      return _this.executeMutation();
    }).then(function(result) {
      data = result;
      _this.mutationCache.config.onSuccess == null ? void 0 : _this.mutationCache.config.onSuccess(data, _this.state.variables, _this.state.context, _this);
    }).then(function() {
      return _this.options.onSuccess == null ? void 0 : _this.options.onSuccess(data, _this.state.variables, _this.state.context);
    }).then(function() {
      return _this.options.onSettled == null ? void 0 : _this.options.onSettled(data, null, _this.state.variables, _this.state.context);
    }).then(function() {
      _this.dispatch({
        type: "success",
        data
      });
      return data;
    }).catch(function(error) {
      _this.mutationCache.config.onError == null ? void 0 : _this.mutationCache.config.onError(error, _this.state.variables, _this.state.context, _this);
      getLogger().error(error);
      return Promise.resolve().then(function() {
        return _this.options.onError == null ? void 0 : _this.options.onError(error, _this.state.variables, _this.state.context);
      }).then(function() {
        return _this.options.onSettled == null ? void 0 : _this.options.onSettled(void 0, error, _this.state.variables, _this.state.context);
      }).then(function() {
        _this.dispatch({
          type: "error",
          error
        });
        throw error;
      });
    });
  }, "execute");
  _proto.executeMutation = /* @__PURE__ */ __name(function executeMutation() {
    var _this2 = this, _this$options$retry;
    this.retryer = new Retryer({
      fn: /* @__PURE__ */ __name(function fn() {
        if (!_this2.options.mutationFn) {
          return Promise.reject("No mutationFn found");
        }
        return _this2.options.mutationFn(_this2.state.variables);
      }, "fn"),
      onFail: /* @__PURE__ */ __name(function onFail() {
        _this2.dispatch({
          type: "failed"
        });
      }, "onFail"),
      onPause: /* @__PURE__ */ __name(function onPause() {
        _this2.dispatch({
          type: "pause"
        });
      }, "onPause"),
      onContinue: /* @__PURE__ */ __name(function onContinue() {
        _this2.dispatch({
          type: "continue"
        });
      }, "onContinue"),
      retry: (_this$options$retry = this.options.retry) != null ? _this$options$retry : 0,
      retryDelay: this.options.retryDelay
    });
    return this.retryer.promise;
  }, "executeMutation");
  _proto.dispatch = /* @__PURE__ */ __name(function dispatch(action) {
    var _this3 = this;
    this.state = reducer(this.state, action);
    notifyManager.batch(function() {
      _this3.observers.forEach(function(observer) {
        observer.onMutationUpdate(action);
      });
      _this3.mutationCache.notify(_this3);
    });
  }, "dispatch");
  return Mutation2;
}();
function getDefaultState() {
  return {
    context: void 0,
    data: void 0,
    error: null,
    failureCount: 0,
    isPaused: false,
    status: "idle",
    variables: void 0
  };
}
__name(getDefaultState, "getDefaultState");
function reducer(state, action) {
  switch (action.type) {
    case "failed":
      return _extends$3({}, state, {
        failureCount: state.failureCount + 1
      });
    case "pause":
      return _extends$3({}, state, {
        isPaused: true
      });
    case "continue":
      return _extends$3({}, state, {
        isPaused: false
      });
    case "loading":
      return _extends$3({}, state, {
        context: action.context,
        data: void 0,
        error: null,
        isPaused: false,
        status: "loading",
        variables: action.variables
      });
    case "success":
      return _extends$3({}, state, {
        data: action.data,
        error: null,
        status: "success",
        isPaused: false
      });
    case "error":
      return _extends$3({}, state, {
        data: void 0,
        error: action.error,
        failureCount: state.failureCount + 1,
        isPaused: false,
        status: "error"
      });
    case "setState":
      return _extends$3({}, state, action.state);
    default:
      return state;
  }
}
__name(reducer, "reducer");
var MutationCache = /* @__PURE__ */ function(_Subscribable) {
  _inheritsLoose(MutationCache2, _Subscribable);
  function MutationCache2(config) {
    var _this;
    _this = _Subscribable.call(this) || this;
    _this.config = config || {};
    _this.mutations = [];
    _this.mutationId = 0;
    return _this;
  }
  __name(MutationCache2, "MutationCache");
  var _proto = MutationCache2.prototype;
  _proto.build = /* @__PURE__ */ __name(function build(client2, options, state) {
    var mutation = new Mutation({
      mutationCache: this,
      mutationId: ++this.mutationId,
      options: client2.defaultMutationOptions(options),
      state,
      defaultOptions: options.mutationKey ? client2.getMutationDefaults(options.mutationKey) : void 0,
      meta: options.meta
    });
    this.add(mutation);
    return mutation;
  }, "build");
  _proto.add = /* @__PURE__ */ __name(function add(mutation) {
    this.mutations.push(mutation);
    this.notify(mutation);
  }, "add");
  _proto.remove = /* @__PURE__ */ __name(function remove(mutation) {
    this.mutations = this.mutations.filter(function(x) {
      return x !== mutation;
    });
    mutation.cancel();
    this.notify(mutation);
  }, "remove");
  _proto.clear = /* @__PURE__ */ __name(function clear() {
    var _this2 = this;
    notifyManager.batch(function() {
      _this2.mutations.forEach(function(mutation) {
        _this2.remove(mutation);
      });
    });
  }, "clear");
  _proto.getAll = /* @__PURE__ */ __name(function getAll() {
    return this.mutations;
  }, "getAll");
  _proto.find = /* @__PURE__ */ __name(function find(filters) {
    if (typeof filters.exact === "undefined") {
      filters.exact = true;
    }
    return this.mutations.find(function(mutation) {
      return matchMutation(filters, mutation);
    });
  }, "find");
  _proto.findAll = /* @__PURE__ */ __name(function findAll(filters) {
    return this.mutations.filter(function(mutation) {
      return matchMutation(filters, mutation);
    });
  }, "findAll");
  _proto.notify = /* @__PURE__ */ __name(function notify(mutation) {
    var _this3 = this;
    notifyManager.batch(function() {
      _this3.listeners.forEach(function(listener) {
        listener(mutation);
      });
    });
  }, "notify");
  _proto.onFocus = /* @__PURE__ */ __name(function onFocus() {
    this.resumePausedMutations();
  }, "onFocus");
  _proto.onOnline = /* @__PURE__ */ __name(function onOnline() {
    this.resumePausedMutations();
  }, "onOnline");
  _proto.resumePausedMutations = /* @__PURE__ */ __name(function resumePausedMutations() {
    var pausedMutations = this.mutations.filter(function(x) {
      return x.state.isPaused;
    });
    return notifyManager.batch(function() {
      return pausedMutations.reduce(function(promise, mutation) {
        return promise.then(function() {
          return mutation.continue().catch(noop);
        });
      }, Promise.resolve());
    });
  }, "resumePausedMutations");
  return MutationCache2;
}(Subscribable);
function infiniteQueryBehavior() {
  return {
    onFetch: /* @__PURE__ */ __name(function onFetch(context) {
      context.fetchFn = function() {
        var _context$fetchOptions, _context$fetchOptions2, _context$fetchOptions3, _context$fetchOptions4, _context$state$data, _context$state$data2;
        var refetchPage = (_context$fetchOptions = context.fetchOptions) == null ? void 0 : (_context$fetchOptions2 = _context$fetchOptions.meta) == null ? void 0 : _context$fetchOptions2.refetchPage;
        var fetchMore = (_context$fetchOptions3 = context.fetchOptions) == null ? void 0 : (_context$fetchOptions4 = _context$fetchOptions3.meta) == null ? void 0 : _context$fetchOptions4.fetchMore;
        var pageParam = fetchMore == null ? void 0 : fetchMore.pageParam;
        var isFetchingNextPage = (fetchMore == null ? void 0 : fetchMore.direction) === "forward";
        var isFetchingPreviousPage = (fetchMore == null ? void 0 : fetchMore.direction) === "backward";
        var oldPages = ((_context$state$data = context.state.data) == null ? void 0 : _context$state$data.pages) || [];
        var oldPageParams = ((_context$state$data2 = context.state.data) == null ? void 0 : _context$state$data2.pageParams) || [];
        var abortController = getAbortController();
        var abortSignal = abortController == null ? void 0 : abortController.signal;
        var newPageParams = oldPageParams;
        var cancelled = false;
        var queryFn = context.options.queryFn || function() {
          return Promise.reject("Missing queryFn");
        };
        var buildNewPages = /* @__PURE__ */ __name(function buildNewPages2(pages, param2, page, previous) {
          newPageParams = previous ? [param2].concat(newPageParams) : [].concat(newPageParams, [param2]);
          return previous ? [page].concat(pages) : [].concat(pages, [page]);
        }, "buildNewPages");
        var fetchPage = /* @__PURE__ */ __name(function fetchPage2(pages, manual2, param2, previous) {
          if (cancelled) {
            return Promise.reject("Cancelled");
          }
          if (typeof param2 === "undefined" && !manual2 && pages.length) {
            return Promise.resolve(pages);
          }
          var queryFnContext = {
            queryKey: context.queryKey,
            signal: abortSignal,
            pageParam: param2,
            meta: context.meta
          };
          var queryFnResult = queryFn(queryFnContext);
          var promise2 = Promise.resolve(queryFnResult).then(function(page) {
            return buildNewPages(pages, param2, page, previous);
          });
          if (isCancelable(queryFnResult)) {
            var promiseAsAny = promise2;
            promiseAsAny.cancel = queryFnResult.cancel;
          }
          return promise2;
        }, "fetchPage");
        var promise;
        if (!oldPages.length) {
          promise = fetchPage([]);
        } else if (isFetchingNextPage) {
          var manual = typeof pageParam !== "undefined";
          var param = manual ? pageParam : getNextPageParam(context.options, oldPages);
          promise = fetchPage(oldPages, manual, param);
        } else if (isFetchingPreviousPage) {
          var _manual = typeof pageParam !== "undefined";
          var _param = _manual ? pageParam : getPreviousPageParam(context.options, oldPages);
          promise = fetchPage(oldPages, _manual, _param, true);
        } else {
          (function() {
            newPageParams = [];
            var manual2 = typeof context.options.getNextPageParam === "undefined";
            var shouldFetchFirstPage = refetchPage && oldPages[0] ? refetchPage(oldPages[0], 0, oldPages) : true;
            promise = shouldFetchFirstPage ? fetchPage([], manual2, oldPageParams[0]) : Promise.resolve(buildNewPages([], oldPageParams[0], oldPages[0]));
            var _loop = /* @__PURE__ */ __name(function _loop2(i2) {
              promise = promise.then(function(pages) {
                var shouldFetchNextPage = refetchPage && oldPages[i2] ? refetchPage(oldPages[i2], i2, oldPages) : true;
                if (shouldFetchNextPage) {
                  var _param2 = manual2 ? oldPageParams[i2] : getNextPageParam(context.options, pages);
                  return fetchPage(pages, manual2, _param2);
                }
                return Promise.resolve(buildNewPages(pages, oldPageParams[i2], oldPages[i2]));
              });
            }, "_loop");
            for (var i = 1; i < oldPages.length; i++) {
              _loop(i);
            }
          })();
        }
        var finalPromise = promise.then(function(pages) {
          return {
            pages,
            pageParams: newPageParams
          };
        });
        var finalPromiseAsAny = finalPromise;
        finalPromiseAsAny.cancel = function() {
          cancelled = true;
          abortController == null ? void 0 : abortController.abort();
          if (isCancelable(promise)) {
            promise.cancel();
          }
        };
        return finalPromise;
      };
    }, "onFetch")
  };
}
__name(infiniteQueryBehavior, "infiniteQueryBehavior");
function getNextPageParam(options, pages) {
  return options.getNextPageParam == null ? void 0 : options.getNextPageParam(pages[pages.length - 1], pages);
}
__name(getNextPageParam, "getNextPageParam");
function getPreviousPageParam(options, pages) {
  return options.getPreviousPageParam == null ? void 0 : options.getPreviousPageParam(pages[0], pages);
}
__name(getPreviousPageParam, "getPreviousPageParam");
var QueryClient = /* @__PURE__ */ function() {
  function QueryClient2(config) {
    if (config === void 0) {
      config = {};
    }
    this.queryCache = config.queryCache || new QueryCache();
    this.mutationCache = config.mutationCache || new MutationCache();
    this.defaultOptions = config.defaultOptions || {};
    this.queryDefaults = [];
    this.mutationDefaults = [];
  }
  __name(QueryClient2, "QueryClient");
  var _proto = QueryClient2.prototype;
  _proto.mount = /* @__PURE__ */ __name(function mount() {
    var _this = this;
    this.unsubscribeFocus = focusManager.subscribe(function() {
      if (focusManager.isFocused() && onlineManager.isOnline()) {
        _this.mutationCache.onFocus();
        _this.queryCache.onFocus();
      }
    });
    this.unsubscribeOnline = onlineManager.subscribe(function() {
      if (focusManager.isFocused() && onlineManager.isOnline()) {
        _this.mutationCache.onOnline();
        _this.queryCache.onOnline();
      }
    });
  }, "mount");
  _proto.unmount = /* @__PURE__ */ __name(function unmount() {
    var _this$unsubscribeFocu, _this$unsubscribeOnli;
    (_this$unsubscribeFocu = this.unsubscribeFocus) == null ? void 0 : _this$unsubscribeFocu.call(this);
    (_this$unsubscribeOnli = this.unsubscribeOnline) == null ? void 0 : _this$unsubscribeOnli.call(this);
  }, "unmount");
  _proto.isFetching = /* @__PURE__ */ __name(function isFetching(arg1, arg2) {
    var _parseFilterArgs = parseFilterArgs(arg1, arg2), filters = _parseFilterArgs[0];
    filters.fetching = true;
    return this.queryCache.findAll(filters).length;
  }, "isFetching");
  _proto.isMutating = /* @__PURE__ */ __name(function isMutating(filters) {
    return this.mutationCache.findAll(_extends$3({}, filters, {
      fetching: true
    })).length;
  }, "isMutating");
  _proto.getQueryData = /* @__PURE__ */ __name(function getQueryData(queryKey, filters) {
    var _this$queryCache$find;
    return (_this$queryCache$find = this.queryCache.find(queryKey, filters)) == null ? void 0 : _this$queryCache$find.state.data;
  }, "getQueryData");
  _proto.getQueriesData = /* @__PURE__ */ __name(function getQueriesData(queryKeyOrFilters) {
    return this.getQueryCache().findAll(queryKeyOrFilters).map(function(_ref) {
      var queryKey = _ref.queryKey, state = _ref.state;
      var data = state.data;
      return [queryKey, data];
    });
  }, "getQueriesData");
  _proto.setQueryData = /* @__PURE__ */ __name(function setQueryData(queryKey, updater, options) {
    var parsedOptions = parseQueryArgs(queryKey);
    var defaultedOptions = this.defaultQueryOptions(parsedOptions);
    return this.queryCache.build(this, defaultedOptions).setData(updater, options);
  }, "setQueryData");
  _proto.setQueriesData = /* @__PURE__ */ __name(function setQueriesData(queryKeyOrFilters, updater, options) {
    var _this2 = this;
    return notifyManager.batch(function() {
      return _this2.getQueryCache().findAll(queryKeyOrFilters).map(function(_ref2) {
        var queryKey = _ref2.queryKey;
        return [queryKey, _this2.setQueryData(queryKey, updater, options)];
      });
    });
  }, "setQueriesData");
  _proto.getQueryState = /* @__PURE__ */ __name(function getQueryState(queryKey, filters) {
    var _this$queryCache$find2;
    return (_this$queryCache$find2 = this.queryCache.find(queryKey, filters)) == null ? void 0 : _this$queryCache$find2.state;
  }, "getQueryState");
  _proto.removeQueries = /* @__PURE__ */ __name(function removeQueries(arg1, arg2) {
    var _parseFilterArgs2 = parseFilterArgs(arg1, arg2), filters = _parseFilterArgs2[0];
    var queryCache = this.queryCache;
    notifyManager.batch(function() {
      queryCache.findAll(filters).forEach(function(query) {
        queryCache.remove(query);
      });
    });
  }, "removeQueries");
  _proto.resetQueries = /* @__PURE__ */ __name(function resetQueries(arg1, arg2, arg3) {
    var _this3 = this;
    var _parseFilterArgs3 = parseFilterArgs(arg1, arg2, arg3), filters = _parseFilterArgs3[0], options = _parseFilterArgs3[1];
    var queryCache = this.queryCache;
    var refetchFilters = _extends$3({}, filters, {
      active: true
    });
    return notifyManager.batch(function() {
      queryCache.findAll(filters).forEach(function(query) {
        query.reset();
      });
      return _this3.refetchQueries(refetchFilters, options);
    });
  }, "resetQueries");
  _proto.cancelQueries = /* @__PURE__ */ __name(function cancelQueries(arg1, arg2, arg3) {
    var _this4 = this;
    var _parseFilterArgs4 = parseFilterArgs(arg1, arg2, arg3), filters = _parseFilterArgs4[0], _parseFilterArgs4$ = _parseFilterArgs4[1], cancelOptions = _parseFilterArgs4$ === void 0 ? {} : _parseFilterArgs4$;
    if (typeof cancelOptions.revert === "undefined") {
      cancelOptions.revert = true;
    }
    var promises = notifyManager.batch(function() {
      return _this4.queryCache.findAll(filters).map(function(query) {
        return query.cancel(cancelOptions);
      });
    });
    return Promise.all(promises).then(noop).catch(noop);
  }, "cancelQueries");
  _proto.invalidateQueries = /* @__PURE__ */ __name(function invalidateQueries(arg1, arg2, arg3) {
    var _ref3, _filters$refetchActiv, _filters$refetchInact, _this5 = this;
    var _parseFilterArgs5 = parseFilterArgs(arg1, arg2, arg3), filters = _parseFilterArgs5[0], options = _parseFilterArgs5[1];
    var refetchFilters = _extends$3({}, filters, {
      // if filters.refetchActive is not provided and filters.active is explicitly false,
      // e.g. invalidateQueries({ active: false }), we don't want to refetch active queries
      active: (_ref3 = (_filters$refetchActiv = filters.refetchActive) != null ? _filters$refetchActiv : filters.active) != null ? _ref3 : true,
      inactive: (_filters$refetchInact = filters.refetchInactive) != null ? _filters$refetchInact : false
    });
    return notifyManager.batch(function() {
      _this5.queryCache.findAll(filters).forEach(function(query) {
        query.invalidate();
      });
      return _this5.refetchQueries(refetchFilters, options);
    });
  }, "invalidateQueries");
  _proto.refetchQueries = /* @__PURE__ */ __name(function refetchQueries(arg1, arg2, arg3) {
    var _this6 = this;
    var _parseFilterArgs6 = parseFilterArgs(arg1, arg2, arg3), filters = _parseFilterArgs6[0], options = _parseFilterArgs6[1];
    var promises = notifyManager.batch(function() {
      return _this6.queryCache.findAll(filters).map(function(query) {
        return query.fetch(void 0, _extends$3({}, options, {
          meta: {
            refetchPage: filters == null ? void 0 : filters.refetchPage
          }
        }));
      });
    });
    var promise = Promise.all(promises).then(noop);
    if (!(options == null ? void 0 : options.throwOnError)) {
      promise = promise.catch(noop);
    }
    return promise;
  }, "refetchQueries");
  _proto.fetchQuery = /* @__PURE__ */ __name(function fetchQuery(arg1, arg2, arg3) {
    var parsedOptions = parseQueryArgs(arg1, arg2, arg3);
    var defaultedOptions = this.defaultQueryOptions(parsedOptions);
    if (typeof defaultedOptions.retry === "undefined") {
      defaultedOptions.retry = false;
    }
    var query = this.queryCache.build(this, defaultedOptions);
    return query.isStaleByTime(defaultedOptions.staleTime) ? query.fetch(defaultedOptions) : Promise.resolve(query.state.data);
  }, "fetchQuery");
  _proto.prefetchQuery = /* @__PURE__ */ __name(function prefetchQuery(arg1, arg2, arg3) {
    return this.fetchQuery(arg1, arg2, arg3).then(noop).catch(noop);
  }, "prefetchQuery");
  _proto.fetchInfiniteQuery = /* @__PURE__ */ __name(function fetchInfiniteQuery(arg1, arg2, arg3) {
    var parsedOptions = parseQueryArgs(arg1, arg2, arg3);
    parsedOptions.behavior = infiniteQueryBehavior();
    return this.fetchQuery(parsedOptions);
  }, "fetchInfiniteQuery");
  _proto.prefetchInfiniteQuery = /* @__PURE__ */ __name(function prefetchInfiniteQuery(arg1, arg2, arg3) {
    return this.fetchInfiniteQuery(arg1, arg2, arg3).then(noop).catch(noop);
  }, "prefetchInfiniteQuery");
  _proto.cancelMutations = /* @__PURE__ */ __name(function cancelMutations() {
    var _this7 = this;
    var promises = notifyManager.batch(function() {
      return _this7.mutationCache.getAll().map(function(mutation) {
        return mutation.cancel();
      });
    });
    return Promise.all(promises).then(noop).catch(noop);
  }, "cancelMutations");
  _proto.resumePausedMutations = /* @__PURE__ */ __name(function resumePausedMutations() {
    return this.getMutationCache().resumePausedMutations();
  }, "resumePausedMutations");
  _proto.executeMutation = /* @__PURE__ */ __name(function executeMutation(options) {
    return this.mutationCache.build(this, options).execute();
  }, "executeMutation");
  _proto.getQueryCache = /* @__PURE__ */ __name(function getQueryCache() {
    return this.queryCache;
  }, "getQueryCache");
  _proto.getMutationCache = /* @__PURE__ */ __name(function getMutationCache() {
    return this.mutationCache;
  }, "getMutationCache");
  _proto.getDefaultOptions = /* @__PURE__ */ __name(function getDefaultOptions() {
    return this.defaultOptions;
  }, "getDefaultOptions");
  _proto.setDefaultOptions = /* @__PURE__ */ __name(function setDefaultOptions(options) {
    this.defaultOptions = options;
  }, "setDefaultOptions");
  _proto.setQueryDefaults = /* @__PURE__ */ __name(function setQueryDefaults(queryKey, options) {
    var result = this.queryDefaults.find(function(x) {
      return hashQueryKey(queryKey) === hashQueryKey(x.queryKey);
    });
    if (result) {
      result.defaultOptions = options;
    } else {
      this.queryDefaults.push({
        queryKey,
        defaultOptions: options
      });
    }
  }, "setQueryDefaults");
  _proto.getQueryDefaults = /* @__PURE__ */ __name(function getQueryDefaults(queryKey) {
    var _this$queryDefaults$f;
    return queryKey ? (_this$queryDefaults$f = this.queryDefaults.find(function(x) {
      return partialMatchKey(queryKey, x.queryKey);
    })) == null ? void 0 : _this$queryDefaults$f.defaultOptions : void 0;
  }, "getQueryDefaults");
  _proto.setMutationDefaults = /* @__PURE__ */ __name(function setMutationDefaults(mutationKey, options) {
    var result = this.mutationDefaults.find(function(x) {
      return hashQueryKey(mutationKey) === hashQueryKey(x.mutationKey);
    });
    if (result) {
      result.defaultOptions = options;
    } else {
      this.mutationDefaults.push({
        mutationKey,
        defaultOptions: options
      });
    }
  }, "setMutationDefaults");
  _proto.getMutationDefaults = /* @__PURE__ */ __name(function getMutationDefaults(mutationKey) {
    var _this$mutationDefault;
    return mutationKey ? (_this$mutationDefault = this.mutationDefaults.find(function(x) {
      return partialMatchKey(mutationKey, x.mutationKey);
    })) == null ? void 0 : _this$mutationDefault.defaultOptions : void 0;
  }, "getMutationDefaults");
  _proto.defaultQueryOptions = /* @__PURE__ */ __name(function defaultQueryOptions(options) {
    if (options == null ? void 0 : options._defaulted) {
      return options;
    }
    var defaultedOptions = _extends$3({}, this.defaultOptions.queries, this.getQueryDefaults(options == null ? void 0 : options.queryKey), options, {
      _defaulted: true
    });
    if (!defaultedOptions.queryHash && defaultedOptions.queryKey) {
      defaultedOptions.queryHash = hashQueryKeyByOptions(defaultedOptions.queryKey, defaultedOptions);
    }
    return defaultedOptions;
  }, "defaultQueryOptions");
  _proto.defaultQueryObserverOptions = /* @__PURE__ */ __name(function defaultQueryObserverOptions(options) {
    return this.defaultQueryOptions(options);
  }, "defaultQueryObserverOptions");
  _proto.defaultMutationOptions = /* @__PURE__ */ __name(function defaultMutationOptions(options) {
    if (options == null ? void 0 : options._defaulted) {
      return options;
    }
    return _extends$3({}, this.defaultOptions.mutations, this.getMutationDefaults(options == null ? void 0 : options.mutationKey), options, {
      _defaulted: true
    });
  }, "defaultMutationOptions");
  _proto.clear = /* @__PURE__ */ __name(function clear() {
    this.queryCache.clear();
    this.mutationCache.clear();
  }, "clear");
  return QueryClient2;
}();
var unstable_batchedUpdates = ReactDOM.unstable_batchedUpdates;
notifyManager.setBatchNotifyFunction(unstable_batchedUpdates);
var logger = console;
setLogger(logger);
var defaultContext = /* @__PURE__ */ React.createContext(void 0);
var QueryClientSharingContext = /* @__PURE__ */ React.createContext(false);
function getQueryClientContext(contextSharing) {
  if (contextSharing && typeof window !== "undefined") {
    if (!window.ReactQueryClientContext) {
      window.ReactQueryClientContext = defaultContext;
    }
    return window.ReactQueryClientContext;
  }
  return defaultContext;
}
__name(getQueryClientContext, "getQueryClientContext");
var QueryClientProvider = /* @__PURE__ */ __name(function QueryClientProvider2(_ref) {
  var client2 = _ref.client, _ref$contextSharing = _ref.contextSharing, contextSharing = _ref$contextSharing === void 0 ? false : _ref$contextSharing, children = _ref.children;
  React.useEffect(function() {
    client2.mount();
    return function() {
      client2.unmount();
    };
  }, [client2]);
  var Context = getQueryClientContext(contextSharing);
  return /* @__PURE__ */ React.createElement(QueryClientSharingContext.Provider, {
    value: contextSharing
  }, /* @__PURE__ */ React.createElement(Context.Provider, {
    value: client2
  }, children));
}, "QueryClientProvider");
/**
 * @remix-run/router v1.23.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function _extends$2() {
  _extends$2 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$2.apply(this, arguments);
}
__name(_extends$2, "_extends$2");
var Action;
(function(Action2) {
  Action2["Pop"] = "POP";
  Action2["Push"] = "PUSH";
  Action2["Replace"] = "REPLACE";
})(Action || (Action = {}));
const PopStateEventType = "popstate";
function createBrowserHistory(options) {
  if (options === void 0) {
    options = {};
  }
  function createBrowserLocation(window2, globalHistory) {
    let {
      pathname,
      search,
      hash
    } = window2.location;
    return createLocation(
      "",
      {
        pathname,
        search,
        hash
      },
      // state defaults to `null` because `window.history.state` does
      globalHistory.state && globalHistory.state.usr || null,
      globalHistory.state && globalHistory.state.key || "default"
    );
  }
  __name(createBrowserLocation, "createBrowserLocation");
  function createBrowserHref(window2, to) {
    return typeof to === "string" ? to : createPath(to);
  }
  __name(createBrowserHref, "createBrowserHref");
  return getUrlBasedHistory(createBrowserLocation, createBrowserHref, null, options);
}
__name(createBrowserHistory, "createBrowserHistory");
function invariant(value, message) {
  if (value === false || value === null || typeof value === "undefined") {
    throw new Error(message);
  }
}
__name(invariant, "invariant");
function warning(cond, message) {
  if (!cond) {
    if (typeof console !== "undefined")
      console.warn(message);
    try {
      throw new Error(message);
    } catch (e) {
    }
  }
}
__name(warning, "warning");
function createKey() {
  return Math.random().toString(36).substr(2, 8);
}
__name(createKey, "createKey");
function getHistoryState(location, index2) {
  return {
    usr: location.state,
    key: location.key,
    idx: index2
  };
}
__name(getHistoryState, "getHistoryState");
function createLocation(current, to, state, key) {
  if (state === void 0) {
    state = null;
  }
  let location = _extends$2({
    pathname: typeof current === "string" ? current : current.pathname,
    search: "",
    hash: ""
  }, typeof to === "string" ? parsePath(to) : to, {
    state,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: to && to.key || key || createKey()
  });
  return location;
}
__name(createLocation, "createLocation");
function createPath(_ref) {
  let {
    pathname = "/",
    search = "",
    hash = ""
  } = _ref;
  if (search && search !== "?")
    pathname += search.charAt(0) === "?" ? search : "?" + search;
  if (hash && hash !== "#")
    pathname += hash.charAt(0) === "#" ? hash : "#" + hash;
  return pathname;
}
__name(createPath, "createPath");
function parsePath(path) {
  let parsedPath = {};
  if (path) {
    let hashIndex = path.indexOf("#");
    if (hashIndex >= 0) {
      parsedPath.hash = path.substr(hashIndex);
      path = path.substr(0, hashIndex);
    }
    let searchIndex = path.indexOf("?");
    if (searchIndex >= 0) {
      parsedPath.search = path.substr(searchIndex);
      path = path.substr(0, searchIndex);
    }
    if (path) {
      parsedPath.pathname = path;
    }
  }
  return parsedPath;
}
__name(parsePath, "parsePath");
function getUrlBasedHistory(getLocation, createHref, validateLocation, options) {
  if (options === void 0) {
    options = {};
  }
  let {
    window: window2 = document.defaultView,
    v5Compat = false
  } = options;
  let globalHistory = window2.history;
  let action = Action.Pop;
  let listener = null;
  let index2 = getIndex();
  if (index2 == null) {
    index2 = 0;
    globalHistory.replaceState(_extends$2({}, globalHistory.state, {
      idx: index2
    }), "");
  }
  function getIndex() {
    let state = globalHistory.state || {
      idx: null
    };
    return state.idx;
  }
  __name(getIndex, "getIndex");
  function handlePop() {
    action = Action.Pop;
    let nextIndex = getIndex();
    let delta = nextIndex == null ? null : nextIndex - index2;
    index2 = nextIndex;
    if (listener) {
      listener({
        action,
        location: history.location,
        delta
      });
    }
  }
  __name(handlePop, "handlePop");
  function push(to, state) {
    action = Action.Push;
    let location = createLocation(history.location, to, state);
    if (validateLocation)
      validateLocation(location, to);
    index2 = getIndex() + 1;
    let historyState = getHistoryState(location, index2);
    let url = history.createHref(location);
    try {
      globalHistory.pushState(historyState, "", url);
    } catch (error) {
      if (error instanceof DOMException && error.name === "DataCloneError") {
        throw error;
      }
      window2.location.assign(url);
    }
    if (v5Compat && listener) {
      listener({
        action,
        location: history.location,
        delta: 1
      });
    }
  }
  __name(push, "push");
  function replace(to, state) {
    action = Action.Replace;
    let location = createLocation(history.location, to, state);
    if (validateLocation)
      validateLocation(location, to);
    index2 = getIndex();
    let historyState = getHistoryState(location, index2);
    let url = history.createHref(location);
    globalHistory.replaceState(historyState, "", url);
    if (v5Compat && listener) {
      listener({
        action,
        location: history.location,
        delta: 0
      });
    }
  }
  __name(replace, "replace");
  function createURL(to) {
    let base = window2.location.origin !== "null" ? window2.location.origin : window2.location.href;
    let href = typeof to === "string" ? to : createPath(to);
    href = href.replace(/ $/, "%20");
    invariant(base, "No window.location.(origin|href) available to create URL for href: " + href);
    return new URL(href, base);
  }
  __name(createURL, "createURL");
  let history = {
    get action() {
      return action;
    },
    get location() {
      return getLocation(window2, globalHistory);
    },
    listen(fn) {
      if (listener) {
        throw new Error("A history only accepts one active listener");
      }
      window2.addEventListener(PopStateEventType, handlePop);
      listener = fn;
      return () => {
        window2.removeEventListener(PopStateEventType, handlePop);
        listener = null;
      };
    },
    createHref(to) {
      return createHref(window2, to);
    },
    createURL,
    encodeLocation(to) {
      let url = createURL(to);
      return {
        pathname: url.pathname,
        search: url.search,
        hash: url.hash
      };
    },
    push,
    replace,
    go(n2) {
      return globalHistory.go(n2);
    }
  };
  return history;
}
__name(getUrlBasedHistory, "getUrlBasedHistory");
var ResultType;
(function(ResultType2) {
  ResultType2["data"] = "data";
  ResultType2["deferred"] = "deferred";
  ResultType2["redirect"] = "redirect";
  ResultType2["error"] = "error";
})(ResultType || (ResultType = {}));
function matchRoutes(routes, locationArg, basename) {
  if (basename === void 0) {
    basename = "/";
  }
  return matchRoutesImpl(routes, locationArg, basename, false);
}
__name(matchRoutes, "matchRoutes");
function matchRoutesImpl(routes, locationArg, basename, allowPartial) {
  let location = typeof locationArg === "string" ? parsePath(locationArg) : locationArg;
  let pathname = stripBasename(location.pathname || "/", basename);
  if (pathname == null) {
    return null;
  }
  let branches = flattenRoutes(routes);
  rankRouteBranches(branches);
  let matches = null;
  for (let i = 0; matches == null && i < branches.length; ++i) {
    let decoded = decodePath(pathname);
    matches = matchRouteBranch(branches[i], decoded, allowPartial);
  }
  return matches;
}
__name(matchRoutesImpl, "matchRoutesImpl");
function flattenRoutes(routes, branches, parentsMeta, parentPath) {
  if (branches === void 0) {
    branches = [];
  }
  if (parentsMeta === void 0) {
    parentsMeta = [];
  }
  if (parentPath === void 0) {
    parentPath = "";
  }
  let flattenRoute = /* @__PURE__ */ __name((route, index2, relativePath) => {
    let meta = {
      relativePath: relativePath === void 0 ? route.path || "" : relativePath,
      caseSensitive: route.caseSensitive === true,
      childrenIndex: index2,
      route
    };
    if (meta.relativePath.startsWith("/")) {
      invariant(meta.relativePath.startsWith(parentPath), 'Absolute route path "' + meta.relativePath + '" nested under path ' + ('"' + parentPath + '" is not valid. An absolute child route path ') + "must start with the combined path of all its parent routes.");
      meta.relativePath = meta.relativePath.slice(parentPath.length);
    }
    let path = joinPaths([parentPath, meta.relativePath]);
    let routesMeta = parentsMeta.concat(meta);
    if (route.children && route.children.length > 0) {
      invariant(
        // Our types know better, but runtime JS may not!
        // @ts-expect-error
        route.index !== true,
        "Index routes must not have child routes. Please remove " + ('all child routes from route path "' + path + '".')
      );
      flattenRoutes(route.children, branches, routesMeta, path);
    }
    if (route.path == null && !route.index) {
      return;
    }
    branches.push({
      path,
      score: computeScore(path, route.index),
      routesMeta
    });
  }, "flattenRoute");
  routes.forEach((route, index2) => {
    var _route$path;
    if (route.path === "" || !((_route$path = route.path) != null && _route$path.includes("?"))) {
      flattenRoute(route, index2);
    } else {
      for (let exploded of explodeOptionalSegments(route.path)) {
        flattenRoute(route, index2, exploded);
      }
    }
  });
  return branches;
}
__name(flattenRoutes, "flattenRoutes");
function explodeOptionalSegments(path) {
  let segments = path.split("/");
  if (segments.length === 0)
    return [];
  let [first, ...rest] = segments;
  let isOptional = first.endsWith("?");
  let required = first.replace(/\?$/, "");
  if (rest.length === 0) {
    return isOptional ? [required, ""] : [required];
  }
  let restExploded = explodeOptionalSegments(rest.join("/"));
  let result = [];
  result.push(...restExploded.map((subpath) => subpath === "" ? required : [required, subpath].join("/")));
  if (isOptional) {
    result.push(...restExploded);
  }
  return result.map((exploded) => path.startsWith("/") && exploded === "" ? "/" : exploded);
}
__name(explodeOptionalSegments, "explodeOptionalSegments");
function rankRouteBranches(branches) {
  branches.sort((a, b) => a.score !== b.score ? b.score - a.score : compareIndexes(a.routesMeta.map((meta) => meta.childrenIndex), b.routesMeta.map((meta) => meta.childrenIndex)));
}
__name(rankRouteBranches, "rankRouteBranches");
const paramRe = /^:[\w-]+$/;
const dynamicSegmentValue = 3;
const indexRouteValue = 2;
const emptySegmentValue = 1;
const staticSegmentValue = 10;
const splatPenalty = -2;
const isSplat = /* @__PURE__ */ __name((s) => s === "*", "isSplat");
function computeScore(path, index2) {
  let segments = path.split("/");
  let initialScore = segments.length;
  if (segments.some(isSplat)) {
    initialScore += splatPenalty;
  }
  if (index2) {
    initialScore += indexRouteValue;
  }
  return segments.filter((s) => !isSplat(s)).reduce((score, segment) => score + (paramRe.test(segment) ? dynamicSegmentValue : segment === "" ? emptySegmentValue : staticSegmentValue), initialScore);
}
__name(computeScore, "computeScore");
function compareIndexes(a, b) {
  let siblings = a.length === b.length && a.slice(0, -1).every((n2, i) => n2 === b[i]);
  return siblings ? (
    // If two routes are siblings, we should try to match the earlier sibling
    // first. This allows people to have fine-grained control over the matching
    // behavior by simply putting routes with identical paths in the order they
    // want them tried.
    a[a.length - 1] - b[b.length - 1]
  ) : (
    // Otherwise, it doesn't really make sense to rank non-siblings by index,
    // so they sort equally.
    0
  );
}
__name(compareIndexes, "compareIndexes");
function matchRouteBranch(branch, pathname, allowPartial) {
  if (allowPartial === void 0) {
    allowPartial = false;
  }
  let {
    routesMeta
  } = branch;
  let matchedParams = {};
  let matchedPathname = "/";
  let matches = [];
  for (let i = 0; i < routesMeta.length; ++i) {
    let meta = routesMeta[i];
    let end = i === routesMeta.length - 1;
    let remainingPathname = matchedPathname === "/" ? pathname : pathname.slice(matchedPathname.length) || "/";
    let match = matchPath({
      path: meta.relativePath,
      caseSensitive: meta.caseSensitive,
      end
    }, remainingPathname);
    let route = meta.route;
    if (!match && end && allowPartial && !routesMeta[routesMeta.length - 1].route.index) {
      match = matchPath({
        path: meta.relativePath,
        caseSensitive: meta.caseSensitive,
        end: false
      }, remainingPathname);
    }
    if (!match) {
      return null;
    }
    Object.assign(matchedParams, match.params);
    matches.push({
      // TODO: Can this as be avoided?
      params: matchedParams,
      pathname: joinPaths([matchedPathname, match.pathname]),
      pathnameBase: normalizePathname(joinPaths([matchedPathname, match.pathnameBase])),
      route
    });
    if (match.pathnameBase !== "/") {
      matchedPathname = joinPaths([matchedPathname, match.pathnameBase]);
    }
  }
  return matches;
}
__name(matchRouteBranch, "matchRouteBranch");
function matchPath(pattern, pathname) {
  if (typeof pattern === "string") {
    pattern = {
      path: pattern,
      caseSensitive: false,
      end: true
    };
  }
  let [matcher, compiledParams] = compilePath(pattern.path, pattern.caseSensitive, pattern.end);
  let match = pathname.match(matcher);
  if (!match)
    return null;
  let matchedPathname = match[0];
  let pathnameBase = matchedPathname.replace(/(.)\/+$/, "$1");
  let captureGroups = match.slice(1);
  let params = compiledParams.reduce((memo, _ref, index2) => {
    let {
      paramName,
      isOptional
    } = _ref;
    if (paramName === "*") {
      let splatValue = captureGroups[index2] || "";
      pathnameBase = matchedPathname.slice(0, matchedPathname.length - splatValue.length).replace(/(.)\/+$/, "$1");
    }
    const value = captureGroups[index2];
    if (isOptional && !value) {
      memo[paramName] = void 0;
    } else {
      memo[paramName] = (value || "").replace(/%2F/g, "/");
    }
    return memo;
  }, {});
  return {
    params,
    pathname: matchedPathname,
    pathnameBase,
    pattern
  };
}
__name(matchPath, "matchPath");
function compilePath(path, caseSensitive, end) {
  if (caseSensitive === void 0) {
    caseSensitive = false;
  }
  if (end === void 0) {
    end = true;
  }
  warning(path === "*" || !path.endsWith("*") || path.endsWith("/*"), 'Route path "' + path + '" will be treated as if it were ' + ('"' + path.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + path.replace(/\*$/, "/*") + '".'));
  let params = [];
  let regexpSource = "^" + path.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:([\w-]+)(\?)?/g, (_, paramName, isOptional) => {
    params.push({
      paramName,
      isOptional: isOptional != null
    });
    return isOptional ? "/?([^\\/]+)?" : "/([^\\/]+)";
  });
  if (path.endsWith("*")) {
    params.push({
      paramName: "*"
    });
    regexpSource += path === "*" || path === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$";
  } else if (end) {
    regexpSource += "\\/*$";
  } else if (path !== "" && path !== "/") {
    regexpSource += "(?:(?=\\/|$))";
  } else
    ;
  let matcher = new RegExp(regexpSource, caseSensitive ? void 0 : "i");
  return [matcher, params];
}
__name(compilePath, "compilePath");
function decodePath(value) {
  try {
    return value.split("/").map((v) => decodeURIComponent(v).replace(/\//g, "%2F")).join("/");
  } catch (error) {
    warning(false, 'The URL path "' + value + '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' + ("encoding (" + error + ")."));
    return value;
  }
}
__name(decodePath, "decodePath");
function stripBasename(pathname, basename) {
  if (basename === "/")
    return pathname;
  if (!pathname.toLowerCase().startsWith(basename.toLowerCase())) {
    return null;
  }
  let startIndex = basename.endsWith("/") ? basename.length - 1 : basename.length;
  let nextChar = pathname.charAt(startIndex);
  if (nextChar && nextChar !== "/") {
    return null;
  }
  return pathname.slice(startIndex) || "/";
}
__name(stripBasename, "stripBasename");
const ABSOLUTE_URL_REGEX$1 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
const isAbsoluteUrl = /* @__PURE__ */ __name((url) => ABSOLUTE_URL_REGEX$1.test(url), "isAbsoluteUrl");
function resolvePath(to, fromPathname) {
  if (fromPathname === void 0) {
    fromPathname = "/";
  }
  let {
    pathname: toPathname,
    search = "",
    hash = ""
  } = typeof to === "string" ? parsePath(to) : to;
  let pathname;
  if (toPathname) {
    if (isAbsoluteUrl(toPathname)) {
      pathname = toPathname;
    } else {
      if (toPathname.includes("//")) {
        let oldPathname = toPathname;
        toPathname = toPathname.replace(/\/\/+/g, "/");
        warning(false, "Pathnames cannot have embedded double slashes - normalizing " + (oldPathname + " -> " + toPathname));
      }
      if (toPathname.startsWith("/")) {
        pathname = resolvePathname(toPathname.substring(1), "/");
      } else {
        pathname = resolvePathname(toPathname, fromPathname);
      }
    }
  } else {
    pathname = fromPathname;
  }
  return {
    pathname,
    search: normalizeSearch(search),
    hash: normalizeHash(hash)
  };
}
__name(resolvePath, "resolvePath");
function resolvePathname(relativePath, fromPathname) {
  let segments = fromPathname.replace(/\/+$/, "").split("/");
  let relativeSegments = relativePath.split("/");
  relativeSegments.forEach((segment) => {
    if (segment === "..") {
      if (segments.length > 1)
        segments.pop();
    } else if (segment !== ".") {
      segments.push(segment);
    }
  });
  return segments.length > 1 ? segments.join("/") : "/";
}
__name(resolvePathname, "resolvePathname");
function getInvalidPathError(char, field, dest, path) {
  return "Cannot include a '" + char + "' character in a manually specified " + ("`to." + field + "` field [" + JSON.stringify(path) + "].  Please separate it out to the ") + ("`to." + dest + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.';
}
__name(getInvalidPathError, "getInvalidPathError");
function getPathContributingMatches(matches) {
  return matches.filter((match, index2) => index2 === 0 || match.route.path && match.route.path.length > 0);
}
__name(getPathContributingMatches, "getPathContributingMatches");
function getResolveToMatches(matches, v7_relativeSplatPath) {
  let pathMatches = getPathContributingMatches(matches);
  if (v7_relativeSplatPath) {
    return pathMatches.map((match, idx) => idx === pathMatches.length - 1 ? match.pathname : match.pathnameBase);
  }
  return pathMatches.map((match) => match.pathnameBase);
}
__name(getResolveToMatches, "getResolveToMatches");
function resolveTo(toArg, routePathnames, locationPathname, isPathRelative) {
  if (isPathRelative === void 0) {
    isPathRelative = false;
  }
  let to;
  if (typeof toArg === "string") {
    to = parsePath(toArg);
  } else {
    to = _extends$2({}, toArg);
    invariant(!to.pathname || !to.pathname.includes("?"), getInvalidPathError("?", "pathname", "search", to));
    invariant(!to.pathname || !to.pathname.includes("#"), getInvalidPathError("#", "pathname", "hash", to));
    invariant(!to.search || !to.search.includes("#"), getInvalidPathError("#", "search", "hash", to));
  }
  let isEmptyPath = toArg === "" || to.pathname === "";
  let toPathname = isEmptyPath ? "/" : to.pathname;
  let from;
  if (toPathname == null) {
    from = locationPathname;
  } else {
    let routePathnameIndex = routePathnames.length - 1;
    if (!isPathRelative && toPathname.startsWith("..")) {
      let toSegments = toPathname.split("/");
      while (toSegments[0] === "..") {
        toSegments.shift();
        routePathnameIndex -= 1;
      }
      to.pathname = toSegments.join("/");
    }
    from = routePathnameIndex >= 0 ? routePathnames[routePathnameIndex] : "/";
  }
  let path = resolvePath(to, from);
  let hasExplicitTrailingSlash = toPathname && toPathname !== "/" && toPathname.endsWith("/");
  let hasCurrentTrailingSlash = (isEmptyPath || toPathname === ".") && locationPathname.endsWith("/");
  if (!path.pathname.endsWith("/") && (hasExplicitTrailingSlash || hasCurrentTrailingSlash)) {
    path.pathname += "/";
  }
  return path;
}
__name(resolveTo, "resolveTo");
const joinPaths = /* @__PURE__ */ __name((paths) => paths.join("/").replace(/\/\/+/g, "/"), "joinPaths");
const normalizePathname = /* @__PURE__ */ __name((pathname) => pathname.replace(/\/+$/, "").replace(/^\/*/, "/"), "normalizePathname");
const normalizeSearch = /* @__PURE__ */ __name((search) => !search || search === "?" ? "" : search.startsWith("?") ? search : "?" + search, "normalizeSearch");
const normalizeHash = /* @__PURE__ */ __name((hash) => !hash || hash === "#" ? "" : hash.startsWith("#") ? hash : "#" + hash, "normalizeHash");
function isRouteErrorResponse(error) {
  return error != null && typeof error.status === "number" && typeof error.statusText === "string" && typeof error.internal === "boolean" && "data" in error;
}
__name(isRouteErrorResponse, "isRouteErrorResponse");
const validMutationMethodsArr = ["post", "put", "patch", "delete"];
new Set(validMutationMethodsArr);
const validRequestMethodsArr = ["get", ...validMutationMethodsArr];
new Set(validRequestMethodsArr);
/**
 * React Router v6.30.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function _extends$1() {
  _extends$1 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$1.apply(this, arguments);
}
__name(_extends$1, "_extends$1");
const DataRouterContext = /* @__PURE__ */ reactExports.createContext(null);
const DataRouterStateContext = /* @__PURE__ */ reactExports.createContext(null);
const NavigationContext = /* @__PURE__ */ reactExports.createContext(null);
const LocationContext = /* @__PURE__ */ reactExports.createContext(null);
const RouteContext = /* @__PURE__ */ reactExports.createContext({
  outlet: null,
  matches: [],
  isDataRoute: false
});
const RouteErrorContext = /* @__PURE__ */ reactExports.createContext(null);
function useHref(to, _temp) {
  let {
    relative
  } = _temp === void 0 ? {} : _temp;
  !useInRouterContext() ? invariant(false) : void 0;
  let {
    basename,
    navigator: navigator2
  } = reactExports.useContext(NavigationContext);
  let {
    hash,
    pathname,
    search
  } = useResolvedPath(to, {
    relative
  });
  let joinedPathname = pathname;
  if (basename !== "/") {
    joinedPathname = pathname === "/" ? basename : joinPaths([basename, pathname]);
  }
  return navigator2.createHref({
    pathname: joinedPathname,
    search,
    hash
  });
}
__name(useHref, "useHref");
function useInRouterContext() {
  return reactExports.useContext(LocationContext) != null;
}
__name(useInRouterContext, "useInRouterContext");
function useLocation() {
  !useInRouterContext() ? invariant(false) : void 0;
  return reactExports.useContext(LocationContext).location;
}
__name(useLocation, "useLocation");
function useIsomorphicLayoutEffect(cb) {
  let isStatic = reactExports.useContext(NavigationContext).static;
  if (!isStatic) {
    reactExports.useLayoutEffect(cb);
  }
}
__name(useIsomorphicLayoutEffect, "useIsomorphicLayoutEffect");
function useNavigate() {
  let {
    isDataRoute
  } = reactExports.useContext(RouteContext);
  return isDataRoute ? useNavigateStable() : useNavigateUnstable();
}
__name(useNavigate, "useNavigate");
function useNavigateUnstable() {
  !useInRouterContext() ? invariant(false) : void 0;
  let dataRouterContext = reactExports.useContext(DataRouterContext);
  let {
    basename,
    future,
    navigator: navigator2
  } = reactExports.useContext(NavigationContext);
  let {
    matches
  } = reactExports.useContext(RouteContext);
  let {
    pathname: locationPathname
  } = useLocation();
  let routePathnamesJson = JSON.stringify(getResolveToMatches(matches, future.v7_relativeSplatPath));
  let activeRef = reactExports.useRef(false);
  useIsomorphicLayoutEffect(() => {
    activeRef.current = true;
  });
  let navigate = reactExports.useCallback(function(to, options) {
    if (options === void 0) {
      options = {};
    }
    if (!activeRef.current)
      return;
    if (typeof to === "number") {
      navigator2.go(to);
      return;
    }
    let path = resolveTo(to, JSON.parse(routePathnamesJson), locationPathname, options.relative === "path");
    if (dataRouterContext == null && basename !== "/") {
      path.pathname = path.pathname === "/" ? basename : joinPaths([basename, path.pathname]);
    }
    (!!options.replace ? navigator2.replace : navigator2.push)(path, options.state, options);
  }, [basename, navigator2, routePathnamesJson, locationPathname, dataRouterContext]);
  return navigate;
}
__name(useNavigateUnstable, "useNavigateUnstable");
function useResolvedPath(to, _temp2) {
  let {
    relative
  } = _temp2 === void 0 ? {} : _temp2;
  let {
    future
  } = reactExports.useContext(NavigationContext);
  let {
    matches
  } = reactExports.useContext(RouteContext);
  let {
    pathname: locationPathname
  } = useLocation();
  let routePathnamesJson = JSON.stringify(getResolveToMatches(matches, future.v7_relativeSplatPath));
  return reactExports.useMemo(() => resolveTo(to, JSON.parse(routePathnamesJson), locationPathname, relative === "path"), [to, routePathnamesJson, locationPathname, relative]);
}
__name(useResolvedPath, "useResolvedPath");
function useRoutes(routes, locationArg) {
  return useRoutesImpl(routes, locationArg);
}
__name(useRoutes, "useRoutes");
function useRoutesImpl(routes, locationArg, dataRouterState, future) {
  !useInRouterContext() ? invariant(false) : void 0;
  let {
    navigator: navigator2
  } = reactExports.useContext(NavigationContext);
  let {
    matches: parentMatches
  } = reactExports.useContext(RouteContext);
  let routeMatch = parentMatches[parentMatches.length - 1];
  let parentParams = routeMatch ? routeMatch.params : {};
  routeMatch ? routeMatch.pathname : "/";
  let parentPathnameBase = routeMatch ? routeMatch.pathnameBase : "/";
  routeMatch && routeMatch.route;
  let locationFromContext = useLocation();
  let location;
  if (locationArg) {
    var _parsedLocationArg$pa;
    let parsedLocationArg = typeof locationArg === "string" ? parsePath(locationArg) : locationArg;
    !(parentPathnameBase === "/" || ((_parsedLocationArg$pa = parsedLocationArg.pathname) == null ? void 0 : _parsedLocationArg$pa.startsWith(parentPathnameBase))) ? invariant(false) : void 0;
    location = parsedLocationArg;
  } else {
    location = locationFromContext;
  }
  let pathname = location.pathname || "/";
  let remainingPathname = pathname;
  if (parentPathnameBase !== "/") {
    let parentSegments = parentPathnameBase.replace(/^\//, "").split("/");
    let segments = pathname.replace(/^\//, "").split("/");
    remainingPathname = "/" + segments.slice(parentSegments.length).join("/");
  }
  let matches = matchRoutes(routes, {
    pathname: remainingPathname
  });
  let renderedMatches = _renderMatches(matches && matches.map((match) => Object.assign({}, match, {
    params: Object.assign({}, parentParams, match.params),
    pathname: joinPaths([
      parentPathnameBase,
      // Re-encode pathnames that were decoded inside matchRoutes
      navigator2.encodeLocation ? navigator2.encodeLocation(match.pathname).pathname : match.pathname
    ]),
    pathnameBase: match.pathnameBase === "/" ? parentPathnameBase : joinPaths([
      parentPathnameBase,
      // Re-encode pathnames that were decoded inside matchRoutes
      navigator2.encodeLocation ? navigator2.encodeLocation(match.pathnameBase).pathname : match.pathnameBase
    ])
  })), parentMatches, dataRouterState, future);
  if (locationArg && renderedMatches) {
    return /* @__PURE__ */ reactExports.createElement(LocationContext.Provider, {
      value: {
        location: _extends$1({
          pathname: "/",
          search: "",
          hash: "",
          state: null,
          key: "default"
        }, location),
        navigationType: Action.Pop
      }
    }, renderedMatches);
  }
  return renderedMatches;
}
__name(useRoutesImpl, "useRoutesImpl");
function DefaultErrorComponent() {
  let error = useRouteError();
  let message = isRouteErrorResponse(error) ? error.status + " " + error.statusText : error instanceof Error ? error.message : JSON.stringify(error);
  let stack = error instanceof Error ? error.stack : null;
  let lightgrey = "rgba(200,200,200, 0.5)";
  let preStyles = {
    padding: "0.5rem",
    backgroundColor: lightgrey
  };
  let devInfo = null;
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ reactExports.createElement("h3", {
    style: {
      fontStyle: "italic"
    }
  }, message), stack ? /* @__PURE__ */ reactExports.createElement("pre", {
    style: preStyles
  }, stack) : null, devInfo);
}
__name(DefaultErrorComponent, "DefaultErrorComponent");
const defaultErrorElement = /* @__PURE__ */ reactExports.createElement(DefaultErrorComponent, null);
const _RenderErrorBoundary = class _RenderErrorBoundary extends reactExports.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: props.location,
      revalidation: props.revalidation,
      error: props.error
    };
  }
  static getDerivedStateFromError(error) {
    return {
      error
    };
  }
  static getDerivedStateFromProps(props, state) {
    if (state.location !== props.location || state.revalidation !== "idle" && props.revalidation === "idle") {
      return {
        error: props.error,
        location: props.location,
        revalidation: props.revalidation
      };
    }
    return {
      error: props.error !== void 0 ? props.error : state.error,
      location: state.location,
      revalidation: props.revalidation || state.revalidation
    };
  }
  componentDidCatch(error, errorInfo) {
    console.error("React Router caught the following error during render", error, errorInfo);
  }
  render() {
    return this.state.error !== void 0 ? /* @__PURE__ */ reactExports.createElement(RouteContext.Provider, {
      value: this.props.routeContext
    }, /* @__PURE__ */ reactExports.createElement(RouteErrorContext.Provider, {
      value: this.state.error,
      children: this.props.component
    })) : this.props.children;
  }
};
__name(_RenderErrorBoundary, "RenderErrorBoundary");
let RenderErrorBoundary = _RenderErrorBoundary;
function RenderedRoute(_ref) {
  let {
    routeContext,
    match,
    children
  } = _ref;
  let dataRouterContext = reactExports.useContext(DataRouterContext);
  if (dataRouterContext && dataRouterContext.static && dataRouterContext.staticContext && (match.route.errorElement || match.route.ErrorBoundary)) {
    dataRouterContext.staticContext._deepestRenderedBoundaryId = match.route.id;
  }
  return /* @__PURE__ */ reactExports.createElement(RouteContext.Provider, {
    value: routeContext
  }, children);
}
__name(RenderedRoute, "RenderedRoute");
function _renderMatches(matches, parentMatches, dataRouterState, future) {
  var _dataRouterState;
  if (parentMatches === void 0) {
    parentMatches = [];
  }
  if (dataRouterState === void 0) {
    dataRouterState = null;
  }
  if (future === void 0) {
    future = null;
  }
  if (matches == null) {
    var _future;
    if (!dataRouterState) {
      return null;
    }
    if (dataRouterState.errors) {
      matches = dataRouterState.matches;
    } else if ((_future = future) != null && _future.v7_partialHydration && parentMatches.length === 0 && !dataRouterState.initialized && dataRouterState.matches.length > 0) {
      matches = dataRouterState.matches;
    } else {
      return null;
    }
  }
  let renderedMatches = matches;
  let errors = (_dataRouterState = dataRouterState) == null ? void 0 : _dataRouterState.errors;
  if (errors != null) {
    let errorIndex = renderedMatches.findIndex((m2) => m2.route.id && (errors == null ? void 0 : errors[m2.route.id]) !== void 0);
    !(errorIndex >= 0) ? invariant(false) : void 0;
    renderedMatches = renderedMatches.slice(0, Math.min(renderedMatches.length, errorIndex + 1));
  }
  let renderFallback = false;
  let fallbackIndex = -1;
  if (dataRouterState && future && future.v7_partialHydration) {
    for (let i = 0; i < renderedMatches.length; i++) {
      let match = renderedMatches[i];
      if (match.route.HydrateFallback || match.route.hydrateFallbackElement) {
        fallbackIndex = i;
      }
      if (match.route.id) {
        let {
          loaderData,
          errors: errors2
        } = dataRouterState;
        let needsToRunLoader = match.route.loader && loaderData[match.route.id] === void 0 && (!errors2 || errors2[match.route.id] === void 0);
        if (match.route.lazy || needsToRunLoader) {
          renderFallback = true;
          if (fallbackIndex >= 0) {
            renderedMatches = renderedMatches.slice(0, fallbackIndex + 1);
          } else {
            renderedMatches = [renderedMatches[0]];
          }
          break;
        }
      }
    }
  }
  return renderedMatches.reduceRight((outlet, match, index2) => {
    let error;
    let shouldRenderHydrateFallback = false;
    let errorElement = null;
    let hydrateFallbackElement = null;
    if (dataRouterState) {
      error = errors && match.route.id ? errors[match.route.id] : void 0;
      errorElement = match.route.errorElement || defaultErrorElement;
      if (renderFallback) {
        if (fallbackIndex < 0 && index2 === 0) {
          warningOnce("route-fallback", false);
          shouldRenderHydrateFallback = true;
          hydrateFallbackElement = null;
        } else if (fallbackIndex === index2) {
          shouldRenderHydrateFallback = true;
          hydrateFallbackElement = match.route.hydrateFallbackElement || null;
        }
      }
    }
    let matches2 = parentMatches.concat(renderedMatches.slice(0, index2 + 1));
    let getChildren = /* @__PURE__ */ __name(() => {
      let children;
      if (error) {
        children = errorElement;
      } else if (shouldRenderHydrateFallback) {
        children = hydrateFallbackElement;
      } else if (match.route.Component) {
        children = /* @__PURE__ */ reactExports.createElement(match.route.Component, null);
      } else if (match.route.element) {
        children = match.route.element;
      } else {
        children = outlet;
      }
      return /* @__PURE__ */ reactExports.createElement(RenderedRoute, {
        match,
        routeContext: {
          outlet,
          matches: matches2,
          isDataRoute: dataRouterState != null
        },
        children
      });
    }, "getChildren");
    return dataRouterState && (match.route.ErrorBoundary || match.route.errorElement || index2 === 0) ? /* @__PURE__ */ reactExports.createElement(RenderErrorBoundary, {
      location: dataRouterState.location,
      revalidation: dataRouterState.revalidation,
      component: errorElement,
      error,
      children: getChildren(),
      routeContext: {
        outlet: null,
        matches: matches2,
        isDataRoute: true
      }
    }) : getChildren();
  }, null);
}
__name(_renderMatches, "_renderMatches");
var DataRouterHook$1 = /* @__PURE__ */ function(DataRouterHook2) {
  DataRouterHook2["UseBlocker"] = "useBlocker";
  DataRouterHook2["UseRevalidator"] = "useRevalidator";
  DataRouterHook2["UseNavigateStable"] = "useNavigate";
  return DataRouterHook2;
}(DataRouterHook$1 || {});
var DataRouterStateHook$1 = /* @__PURE__ */ function(DataRouterStateHook2) {
  DataRouterStateHook2["UseBlocker"] = "useBlocker";
  DataRouterStateHook2["UseLoaderData"] = "useLoaderData";
  DataRouterStateHook2["UseActionData"] = "useActionData";
  DataRouterStateHook2["UseRouteError"] = "useRouteError";
  DataRouterStateHook2["UseNavigation"] = "useNavigation";
  DataRouterStateHook2["UseRouteLoaderData"] = "useRouteLoaderData";
  DataRouterStateHook2["UseMatches"] = "useMatches";
  DataRouterStateHook2["UseRevalidator"] = "useRevalidator";
  DataRouterStateHook2["UseNavigateStable"] = "useNavigate";
  DataRouterStateHook2["UseRouteId"] = "useRouteId";
  return DataRouterStateHook2;
}(DataRouterStateHook$1 || {});
function useDataRouterContext(hookName) {
  let ctx = reactExports.useContext(DataRouterContext);
  !ctx ? invariant(false) : void 0;
  return ctx;
}
__name(useDataRouterContext, "useDataRouterContext");
function useDataRouterState(hookName) {
  let state = reactExports.useContext(DataRouterStateContext);
  !state ? invariant(false) : void 0;
  return state;
}
__name(useDataRouterState, "useDataRouterState");
function useRouteContext(hookName) {
  let route = reactExports.useContext(RouteContext);
  !route ? invariant(false) : void 0;
  return route;
}
__name(useRouteContext, "useRouteContext");
function useCurrentRouteId(hookName) {
  let route = useRouteContext();
  let thisRoute = route.matches[route.matches.length - 1];
  !thisRoute.route.id ? invariant(false) : void 0;
  return thisRoute.route.id;
}
__name(useCurrentRouteId, "useCurrentRouteId");
function useRouteError() {
  var _state$errors;
  let error = reactExports.useContext(RouteErrorContext);
  let state = useDataRouterState(DataRouterStateHook$1.UseRouteError);
  let routeId = useCurrentRouteId(DataRouterStateHook$1.UseRouteError);
  if (error !== void 0) {
    return error;
  }
  return (_state$errors = state.errors) == null ? void 0 : _state$errors[routeId];
}
__name(useRouteError, "useRouteError");
function useNavigateStable() {
  let {
    router
  } = useDataRouterContext(DataRouterHook$1.UseNavigateStable);
  let id = useCurrentRouteId(DataRouterStateHook$1.UseNavigateStable);
  let activeRef = reactExports.useRef(false);
  useIsomorphicLayoutEffect(() => {
    activeRef.current = true;
  });
  let navigate = reactExports.useCallback(function(to, options) {
    if (options === void 0) {
      options = {};
    }
    if (!activeRef.current)
      return;
    if (typeof to === "number") {
      router.navigate(to);
    } else {
      router.navigate(to, _extends$1({
        fromRouteId: id
      }, options));
    }
  }, [router, id]);
  return navigate;
}
__name(useNavigateStable, "useNavigateStable");
const alreadyWarned$1 = {};
function warningOnce(key, cond, message) {
  if (!cond && !alreadyWarned$1[key]) {
    alreadyWarned$1[key] = true;
  }
}
__name(warningOnce, "warningOnce");
function logV6DeprecationWarnings(renderFuture, routerFuture) {
  if ((renderFuture == null ? void 0 : renderFuture.v7_startTransition) === void 0)
    ;
  if ((renderFuture == null ? void 0 : renderFuture.v7_relativeSplatPath) === void 0 && (!routerFuture || routerFuture.v7_relativeSplatPath === void 0))
    ;
  if (routerFuture) {
    if (routerFuture.v7_fetcherPersist === void 0)
      ;
    if (routerFuture.v7_normalizeFormMethod === void 0)
      ;
    if (routerFuture.v7_partialHydration === void 0)
      ;
    if (routerFuture.v7_skipActionErrorRevalidation === void 0)
      ;
  }
}
__name(logV6DeprecationWarnings, "logV6DeprecationWarnings");
function Navigate(_ref4) {
  let {
    to,
    replace,
    state,
    relative
  } = _ref4;
  !useInRouterContext() ? invariant(false) : void 0;
  let {
    future,
    static: isStatic
  } = reactExports.useContext(NavigationContext);
  let {
    matches
  } = reactExports.useContext(RouteContext);
  let {
    pathname: locationPathname
  } = useLocation();
  let navigate = useNavigate();
  let path = resolveTo(to, getResolveToMatches(matches, future.v7_relativeSplatPath), locationPathname, relative === "path");
  let jsonPath = JSON.stringify(path);
  reactExports.useEffect(() => navigate(JSON.parse(jsonPath), {
    replace,
    state,
    relative
  }), [navigate, jsonPath, relative, replace, state]);
  return null;
}
__name(Navigate, "Navigate");
function Route(_props) {
  invariant(false);
}
__name(Route, "Route");
function Router(_ref5) {
  let {
    basename: basenameProp = "/",
    children = null,
    location: locationProp,
    navigationType = Action.Pop,
    navigator: navigator2,
    static: staticProp = false,
    future
  } = _ref5;
  !!useInRouterContext() ? invariant(false) : void 0;
  let basename = basenameProp.replace(/^\/*/, "/");
  let navigationContext = reactExports.useMemo(() => ({
    basename,
    navigator: navigator2,
    static: staticProp,
    future: _extends$1({
      v7_relativeSplatPath: false
    }, future)
  }), [basename, future, navigator2, staticProp]);
  if (typeof locationProp === "string") {
    locationProp = parsePath(locationProp);
  }
  let {
    pathname = "/",
    search = "",
    hash = "",
    state = null,
    key = "default"
  } = locationProp;
  let locationContext = reactExports.useMemo(() => {
    let trailingPathname = stripBasename(pathname, basename);
    if (trailingPathname == null) {
      return null;
    }
    return {
      location: {
        pathname: trailingPathname,
        search,
        hash,
        state,
        key
      },
      navigationType
    };
  }, [basename, pathname, search, hash, state, key, navigationType]);
  if (locationContext == null) {
    return null;
  }
  return /* @__PURE__ */ reactExports.createElement(NavigationContext.Provider, {
    value: navigationContext
  }, /* @__PURE__ */ reactExports.createElement(LocationContext.Provider, {
    children,
    value: locationContext
  }));
}
__name(Router, "Router");
function Routes(_ref6) {
  let {
    children,
    location
  } = _ref6;
  return useRoutes(createRoutesFromChildren(children), location);
}
__name(Routes, "Routes");
new Promise(() => {
});
function createRoutesFromChildren(children, parentPath) {
  if (parentPath === void 0) {
    parentPath = [];
  }
  let routes = [];
  reactExports.Children.forEach(children, (element, index2) => {
    if (!/* @__PURE__ */ reactExports.isValidElement(element)) {
      return;
    }
    let treePath = [...parentPath, index2];
    if (element.type === reactExports.Fragment) {
      routes.push.apply(routes, createRoutesFromChildren(element.props.children, treePath));
      return;
    }
    !(element.type === Route) ? invariant(false) : void 0;
    !(!element.props.index || !element.props.children) ? invariant(false) : void 0;
    let route = {
      id: element.props.id || treePath.join("-"),
      caseSensitive: element.props.caseSensitive,
      element: element.props.element,
      Component: element.props.Component,
      index: element.props.index,
      path: element.props.path,
      loader: element.props.loader,
      action: element.props.action,
      errorElement: element.props.errorElement,
      ErrorBoundary: element.props.ErrorBoundary,
      hasErrorBoundary: element.props.ErrorBoundary != null || element.props.errorElement != null,
      shouldRevalidate: element.props.shouldRevalidate,
      handle: element.props.handle,
      lazy: element.props.lazy
    };
    if (element.props.children) {
      route.children = createRoutesFromChildren(element.props.children, treePath);
    }
    routes.push(route);
  });
  return routes;
}
__name(createRoutesFromChildren, "createRoutesFromChildren");
/**
 * React Router DOM v6.30.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
__name(_extends, "_extends");
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0)
      continue;
    target[key] = source[key];
  }
  return target;
}
__name(_objectWithoutPropertiesLoose, "_objectWithoutPropertiesLoose");
function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}
__name(isModifiedEvent, "isModifiedEvent");
function shouldProcessLinkClick(event, target) {
  return event.button === 0 && // Ignore everything but left clicks
  (!target || target === "_self") && // Let browser handle "target=_blank" etc.
  !isModifiedEvent(event);
}
__name(shouldProcessLinkClick, "shouldProcessLinkClick");
const _excluded = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset", "viewTransition"];
const REACT_ROUTER_VERSION = "6";
try {
  window.__reactRouterVersion = REACT_ROUTER_VERSION;
} catch (e) {
}
const START_TRANSITION = "startTransition";
const startTransitionImpl = React$1[START_TRANSITION];
function BrowserRouter(_ref4) {
  let {
    basename,
    children,
    future,
    window: window2
  } = _ref4;
  let historyRef = reactExports.useRef();
  if (historyRef.current == null) {
    historyRef.current = createBrowserHistory({
      window: window2,
      v5Compat: true
    });
  }
  let history = historyRef.current;
  let [state, setStateImpl] = reactExports.useState({
    action: history.action,
    location: history.location
  });
  let {
    v7_startTransition
  } = future || {};
  let setState = reactExports.useCallback((newState) => {
    v7_startTransition && startTransitionImpl ? startTransitionImpl(() => setStateImpl(newState)) : setStateImpl(newState);
  }, [setStateImpl, v7_startTransition]);
  reactExports.useLayoutEffect(() => history.listen(setState), [history, setState]);
  reactExports.useEffect(() => logV6DeprecationWarnings(future), [future]);
  return /* @__PURE__ */ reactExports.createElement(Router, {
    basename,
    children,
    location: state.location,
    navigationType: state.action,
    navigator: history,
    future
  });
}
__name(BrowserRouter, "BrowserRouter");
const isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
const ABSOLUTE_URL_REGEX = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
const Link = /* @__PURE__ */ reactExports.forwardRef(/* @__PURE__ */ __name(function LinkWithRef(_ref7, ref) {
  let {
    onClick,
    relative,
    reloadDocument,
    replace,
    state,
    target,
    to,
    preventScrollReset,
    viewTransition
  } = _ref7, rest = _objectWithoutPropertiesLoose(_ref7, _excluded);
  let {
    basename
  } = reactExports.useContext(NavigationContext);
  let absoluteHref;
  let isExternal = false;
  if (typeof to === "string" && ABSOLUTE_URL_REGEX.test(to)) {
    absoluteHref = to;
    if (isBrowser) {
      try {
        let currentUrl = new URL(window.location.href);
        let targetUrl = to.startsWith("//") ? new URL(currentUrl.protocol + to) : new URL(to);
        let path = stripBasename(targetUrl.pathname, basename);
        if (targetUrl.origin === currentUrl.origin && path != null) {
          to = path + targetUrl.search + targetUrl.hash;
        } else {
          isExternal = true;
        }
      } catch (e) {
      }
    }
  }
  let href = useHref(to, {
    relative
  });
  let internalOnClick = useLinkClickHandler(to, {
    replace,
    state,
    target,
    preventScrollReset,
    relative,
    viewTransition
  });
  function handleClick(event) {
    if (onClick)
      onClick(event);
    if (!event.defaultPrevented) {
      internalOnClick(event);
    }
  }
  __name(handleClick, "handleClick");
  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    /* @__PURE__ */ reactExports.createElement("a", _extends({}, rest, {
      href: absoluteHref || href,
      onClick: isExternal || reloadDocument ? onClick : handleClick,
      ref,
      target
    }))
  );
}, "LinkWithRef"));
var DataRouterHook;
(function(DataRouterHook2) {
  DataRouterHook2["UseScrollRestoration"] = "useScrollRestoration";
  DataRouterHook2["UseSubmit"] = "useSubmit";
  DataRouterHook2["UseSubmitFetcher"] = "useSubmitFetcher";
  DataRouterHook2["UseFetcher"] = "useFetcher";
  DataRouterHook2["useViewTransitionState"] = "useViewTransitionState";
})(DataRouterHook || (DataRouterHook = {}));
var DataRouterStateHook;
(function(DataRouterStateHook2) {
  DataRouterStateHook2["UseFetcher"] = "useFetcher";
  DataRouterStateHook2["UseFetchers"] = "useFetchers";
  DataRouterStateHook2["UseScrollRestoration"] = "useScrollRestoration";
})(DataRouterStateHook || (DataRouterStateHook = {}));
function useLinkClickHandler(to, _temp) {
  let {
    target,
    replace: replaceProp,
    state,
    preventScrollReset,
    relative,
    viewTransition
  } = _temp === void 0 ? {} : _temp;
  let navigate = useNavigate();
  let location = useLocation();
  let path = useResolvedPath(to, {
    relative
  });
  return reactExports.useCallback((event) => {
    if (shouldProcessLinkClick(event, target)) {
      event.preventDefault();
      let replace = replaceProp !== void 0 ? replaceProp : createPath(location) === createPath(path);
      navigate(to, {
        replace,
        state,
        preventScrollReset,
        relative,
        viewTransition
      });
    }
  }, [location, navigate, path, replaceProp, state, target, to, preventScrollReset, relative, viewTransition]);
}
__name(useLinkClickHandler, "useLinkClickHandler");
const AuthContext = reactExports.createContext();
function useAuth() {
  const context = reactExports.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
__name(useAuth, "useAuth");
function AuthProvider({ children }) {
  const [user, setUser] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);
  const login = /* @__PURE__ */ __name(async (username, password) => {
    if (username === "admin" && password === "admin") {
      const userData = {
        id: 1,
        username: "admin",
        role: "admin",
        name: "Administrator"
      };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      return { success: true };
    } else if (username === "manager" && password === "manager") {
      const userData = {
        id: 2,
        username: "manager",
        role: "manager",
        name: "Manager"
      };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      return { success: true };
    } else if (username === "staff" && password === "staff") {
      const userData = {
        id: 3,
        username: "staff",
        role: "staff",
        name: "Staff Member"
      };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      return { success: true };
    }
    return { success: false, error: "Invalid credentials" };
  }, "login");
  const logout = /* @__PURE__ */ __name(() => {
    setUser(null);
    localStorage.removeItem("user");
  }, "logout");
  const hasPermission = /* @__PURE__ */ __name((action, resource) => {
    var _a;
    if (!user)
      return false;
    const permissions = {
      admin: {
        create: true,
        read: true,
        update: true,
        delete: true,
        audit: true,
        reports: true
      },
      manager: {
        create: true,
        read: true,
        update: true,
        delete: false,
        audit: true,
        reports: true
      },
      staff: {
        create: false,
        read: true,
        update: false,
        delete: false,
        audit: false,
        reports: false
      }
    };
    return ((_a = permissions[user.role]) == null ? void 0 : _a[action]) || false;
  }, "hasPermission");
  const value = {
    user,
    login,
    logout,
    hasPermission,
    loading
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AuthContext.Provider, { value, children });
}
__name(AuthProvider, "AuthProvider");
const DatabaseContext = reactExports.createContext();
function useDatabase() {
  const context = reactExports.useContext(DatabaseContext);
  if (!context) {
    throw new Error("useDatabase must be used within a DatabaseProvider");
  }
  return context;
}
__name(useDatabase, "useDatabase");
function DatabaseProvider({ children }) {
  const [initialized, setInitialized] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  reactExports.useEffect(() => {
  }, []);
  const query = /* @__PURE__ */ __name(async (sql, params = []) => {
    try {
      const response = await fetch("http://localhost:3001/api/database/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          query: sql,
          params
        })
      });
      const result = await response.json();
      if (!result.success) {
        console.error("❌ Query error:", result.error);
        throw new Error(result.error);
      }
      return result;
    } catch (error2) {
      console.error("Database query error:", error2);
      throw error2;
    }
  }, "query");
  const logAudit = /* @__PURE__ */ __name(async (tableName, recordId, action, oldValues, newValues, userId) => {
    try {
      await query(
        `INSERT INTO audit_trail (table_name, record_id, action, old_values, new_values, user_id) 
         VALUES (@tableName, @recordId, @action, @oldValues, @newValues, @userId)`,
        {
          tableName,
          recordId,
          action,
          oldValues: JSON.stringify(oldValues),
          newValues: JSON.stringify(newValues),
          userId
        }
      );
      console.log(`📝 Audit logged: ${action} on ${tableName}`);
    } catch (error2) {
      console.error("Error logging audit trail:", error2);
    }
  }, "logAudit");
  const value = {
    query,
    logAudit,
    initialized,
    error
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(DatabaseContext.Provider, { value, children });
}
__name(DatabaseProvider, "DatabaseProvider");
var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
const toKebabCase = /* @__PURE__ */ __name((string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), "toKebabCase");
const createLucideIcon = /* @__PURE__ */ __name((iconName, iconNode) => {
  const Component = reactExports.forwardRef(
    ({ color = "currentColor", size = 24, strokeWidth = 2, absoluteStrokeWidth, children, ...rest }, ref) => reactExports.createElement(
      "svg",
      {
        ref,
        ...defaultAttributes,
        width: size,
        height: size,
        stroke: color,
        strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
        className: `lucide lucide-${toKebabCase(iconName)}`,
        ...rest
      },
      [
        ...iconNode.map(([tag, attrs]) => reactExports.createElement(tag, attrs)),
        ...(Array.isArray(children) ? children : [children]) || []
      ]
    )
  );
  Component.displayName = `${iconName}`;
  return Component;
}, "createLucideIcon");
var createLucideIcon$1 = createLucideIcon;
const BarChart3 = createLucideIcon$1("BarChart3", [
  ["path", { d: "M3 3v18h18", key: "1s2lah" }],
  ["path", { d: "M18 17V9", key: "2bz60n" }],
  ["path", { d: "M13 17V5", key: "1frdt8" }],
  ["path", { d: "M8 17v-3", key: "17ska0" }]
]);
const Building2 = createLucideIcon$1("Building2", [
  ["path", { d: "M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z", key: "1b4qmf" }],
  ["path", { d: "M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2", key: "i71pzd" }],
  ["path", { d: "M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2", key: "10jefs" }],
  ["path", { d: "M10 6h4", key: "1itunk" }],
  ["path", { d: "M10 10h4", key: "tcdvrf" }],
  ["path", { d: "M10 14h4", key: "kelpxr" }],
  ["path", { d: "M10 18h4", key: "1ulq68" }]
]);
const ChevronDown = createLucideIcon$1("ChevronDown", [
  ["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]
]);
const ChevronUp = createLucideIcon$1("ChevronUp", [
  ["path", { d: "m18 15-6-6-6 6", key: "153udz" }]
]);
const Download = createLucideIcon$1("Download", [
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["polyline", { points: "7 10 12 15 17 10", key: "2ggqvy" }],
  ["line", { x1: "12", x2: "12", y1: "15", y2: "3", key: "1vk2je" }]
]);
const Eye = createLucideIcon$1("Eye", [
  [
    "path",
    { d: "M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z", key: "rwhkz3" }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
]);
const FileText = createLucideIcon$1("FileText", [
  [
    "path",
    {
      d: "M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z",
      key: "1nnpy2"
    }
  ],
  ["polyline", { points: "14 2 14 8 20 8", key: "1ew0cm" }],
  ["line", { x1: "16", x2: "8", y1: "13", y2: "13", key: "14keom" }],
  ["line", { x1: "16", x2: "8", y1: "17", y2: "17", key: "17nazh" }],
  ["line", { x1: "10", x2: "8", y1: "9", y2: "9", key: "1a5vjj" }]
]);
const Filter = createLucideIcon$1("Filter", [
  [
    "polygon",
    { points: "22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3", key: "1yg77f" }
  ]
]);
const Home = createLucideIcon$1("Home", [
  [
    "path",
    { d: "m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z", key: "y5dka4" }
  ],
  ["polyline", { points: "9 22 9 12 15 12 15 22", key: "e2us08" }]
]);
const LogOut = createLucideIcon$1("LogOut", [
  ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }],
  ["polyline", { points: "16 17 21 12 16 7", key: "1gabdz" }],
  ["line", { x1: "21", x2: "9", y1: "12", y2: "12", key: "1uyos4" }]
]);
const Menu = createLucideIcon$1("Menu", [
  ["line", { x1: "4", x2: "20", y1: "12", y2: "12", key: "1e0a9i" }],
  ["line", { x1: "4", x2: "20", y1: "6", y2: "6", key: "1owob3" }],
  ["line", { x1: "4", x2: "20", y1: "18", y2: "18", key: "yk5zj1" }]
]);
const Moon = createLucideIcon$1("Moon", [
  ["path", { d: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z", key: "a7tn18" }]
]);
const Package = createLucideIcon$1("Package", [
  ["path", { d: "M16.5 9.4 7.55 4.24", key: "10qotr" }],
  [
    "path",
    {
      d: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z",
      key: "yt0hxn"
    }
  ],
  ["polyline", { points: "3.29 7 12 12 20.71 7", key: "ousv84" }],
  ["line", { x1: "12", x2: "12", y1: "22", y2: "12", key: "a4e8g8" }]
]);
const PenSquare = createLucideIcon$1("PenSquare", [
  [
    "path",
    {
      d: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7",
      key: "1qinfi"
    }
  ],
  [
    "path",
    { d: "M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z", key: "w2jsv5" }
  ]
]);
const PieChart = createLucideIcon$1("PieChart", [
  ["path", { d: "M21.21 15.89A10 10 0 1 1 8 2.83", key: "k2fpak" }],
  ["path", { d: "M22 12A10 10 0 0 0 12 2v10z", key: "1rfc4y" }]
]);
const Plus = createLucideIcon$1("Plus", [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
]);
const Search = createLucideIcon$1("Search", [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }]
]);
const ShoppingCart = createLucideIcon$1("ShoppingCart", [
  ["circle", { cx: "8", cy: "21", r: "1", key: "jimo8o" }],
  ["circle", { cx: "19", cy: "21", r: "1", key: "13723u" }],
  [
    "path",
    {
      d: "M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12",
      key: "9zh506"
    }
  ]
]);
const Sun = createLucideIcon$1("Sun", [
  ["circle", { cx: "12", cy: "12", r: "4", key: "4exip2" }],
  ["path", { d: "M12 2v2", key: "tus03m" }],
  ["path", { d: "M12 20v2", key: "1lh1kg" }],
  ["path", { d: "m4.93 4.93 1.41 1.41", key: "149t6j" }],
  ["path", { d: "m17.66 17.66 1.41 1.41", key: "ptbguv" }],
  ["path", { d: "M2 12h2", key: "1t8f8n" }],
  ["path", { d: "M20 12h2", key: "1q8mjw" }],
  ["path", { d: "m6.34 17.66-1.41 1.41", key: "1m8zz5" }],
  ["path", { d: "m19.07 4.93-1.41 1.41", key: "1shlcs" }]
]);
const Trash2 = createLucideIcon$1("Trash2", [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
]);
const TrendingUp = createLucideIcon$1("TrendingUp", [
  ["polyline", { points: "22 7 13.5 15.5 8.5 10.5 2 17", key: "126l90" }],
  ["polyline", { points: "16 7 22 7 22 13", key: "kwv8wd" }]
]);
const UserCheck = createLucideIcon$1("UserCheck", [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["polyline", { points: "16 11 18 13 22 9", key: "1pwet4" }]
]);
const Users = createLucideIcon$1("Users", [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["path", { d: "M16 3.13a4 4 0 0 1 0 7.75", key: "1da9ce" }]
]);
const X = createLucideIcon$1("X", [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
]);
function Layout({ children }) {
  const { user, logout, hasPermission } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = reactExports.useState(false);
  const [darkMode, setDarkMode] = reactExports.useState(false);
  const toggleDarkMode = /* @__PURE__ */ __name(() => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  }, "toggleDarkMode");
  const navigation = [
    { name: "Dashboard", href: "/", icon: Home, permission: "read" },
    { name: "Companies", href: "/companies", icon: Building2, permission: "read" },
    { name: "Product Groups", href: "/product-groups", icon: Package, permission: "read" },
    { name: "Products", href: "/products", icon: ShoppingCart, permission: "read" },
    { name: "Customer Groups", href: "/customer-groups", icon: Users, permission: "read" },
    { name: "Customers", href: "/customers", icon: UserCheck, permission: "read" },
    { name: "Audit Trail", href: "/audit-trail", icon: FileText, permission: "audit" },
    { name: "Reports", href: "/reports", icon: BarChart3, permission: "reports" }
  ];
  const filteredNavigation = navigation.filter(
    (item) => hasPermission(item.permission, "any")
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-screen bg-gray-100 dark:bg-gray-900", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `${sidebarOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-700", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-gray-900 dark:text-white", children: "Business Admin" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setSidebarOpen(false),
            className: "lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "mt-6 px-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: filteredNavigation.map((item) => {
        const isActive = location.pathname === item.href;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: item.href,
            className: `${isActive ? "bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300" : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"} group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200`,
            onClick: () => setSidebarOpen(false),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { className: "mr-3 h-5 w-5" }),
              item.name
            ]
          },
          item.name
        );
      }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between h-16 px-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setSidebarOpen(true),
            className: "lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-5 w-5" })
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: toggleDarkMode,
              className: "p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700",
              "aria-label": "Toggle dark mode",
              children: darkMode ? /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { className: "h-5 w-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "h-5 w-5" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-900 dark:text-white font-medium", children: user == null ? void 0 : user.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 dark:text-gray-400 capitalize", children: user == null ? void 0 : user.role })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: logout,
                className: "p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700",
                "aria-label": "Logout",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-5 w-5" })
              }
            )
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 overflow-auto p-6", children })
    ] }),
    sidebarOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden",
        onClick: () => setSidebarOpen(false)
      }
    )
  ] });
}
__name(Layout, "Layout");
function LoadingSpinner({ size = "md", className = "" }) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `flex items-center justify-center ${className}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `animate-spin rounded-full border-2 border-gray-300 border-t-primary-600 ${sizeClasses[size]}` }) });
}
__name(LoadingSpinner, "LoadingSpinner");
function Login() {
  const { login } = useAuth();
  const [formData, setFormData] = reactExports.useState({
    username: "",
    password: ""
  });
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const handleSubmit = /* @__PURE__ */ __name(async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const result = await login(formData.username, formData.password);
      if (!result.success) {
        setError(result.error);
      }
    } catch (err) {
      setError("An error occurred during login");
    } finally {
      setLoading(false);
    }
  }, "handleSubmit");
  const handleChange = /* @__PURE__ */ __name((e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }, "handleChange");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md w-full space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-8 w-8 text-primary-600 dark:text-primary-400" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white", children: "Sign in to your account" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 text-center text-sm text-gray-600 dark:text-gray-400", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Demo credentials:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Admin: admin/admin | Manager: manager/manager | Staff: staff/staff" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "mt-8 space-y-6", onSubmit: handleSubmit, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md shadow-sm -space-y-px", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "username", className: "sr-only", children: "Username" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "username",
              name: "username",
              type: "text",
              required: true,
              className: "appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white",
              placeholder: "Username",
              value: formData.username,
              onChange: handleChange
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "password", className: "sr-only", children: "Password" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "password",
              name: "password",
              type: "password",
              required: true,
              className: "appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white",
              placeholder: "Password",
              value: formData.password,
              onChange: handleChange
            }
          )
        ] })
      ] }),
      error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-red-600 dark:text-red-400 text-sm text-center", children: error }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "submit",
          disabled: loading,
          className: "group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed",
          children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "sm" }) : "Sign in"
        }
      ) })
    ] })
  ] }) });
}
__name(Login, "Login");
function Dashboard() {
  const { query } = useDatabase();
  const [stats, setStats] = reactExports.useState({
    companies: 0,
    productGroups: 0,
    products: 0,
    customerGroups: 0,
    customers: 0
  });
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    loadStats();
  });
  const loadStats = /* @__PURE__ */ __name(async () => {
    var _a, _b, _c, _d, _e;
    try {
      const [
        companiesResult,
        productGroupsResult,
        productsResult,
        customerGroupsResult,
        customersResult
      ] = await Promise.all([
        query("SELECT COUNT(*) as count FROM companies WHERE enabled = 1"),
        query("SELECT COUNT(*) as count FROM product_groups WHERE enabled = 1"),
        query("SELECT COUNT(*) as count FROM products WHERE enabled = 1"),
        query("SELECT COUNT(*) as count FROM customer_groups WHERE enabled = 1"),
        query("SELECT COUNT(*) as count FROM customers WHERE enabled = 1")
      ]);
      setStats({
        companies: ((_a = companiesResult.data[0]) == null ? void 0 : _a.count) || 0,
        productGroups: ((_b = productGroupsResult.data[0]) == null ? void 0 : _b.count) || 0,
        products: ((_c = productsResult.data[0]) == null ? void 0 : _c.count) || 0,
        customerGroups: ((_d = customerGroupsResult.data[0]) == null ? void 0 : _d.count) || 0,
        customers: ((_e = customersResult.data[0]) == null ? void 0 : _e.count) || 0
      });
    } catch (error) {
      console.error("Error loading stats:", error);
    } finally {
      setLoading(false);
    }
  }, "loadStats");
  const statCards = [
    {
      name: "Companies",
      value: stats.companies,
      icon: Building2,
      color: "bg-blue-500",
      href: "/companies"
    },
    {
      name: "Product Groups",
      value: stats.productGroups,
      icon: Package,
      color: "bg-green-500",
      href: "/product-groups"
    },
    {
      name: "Products",
      value: stats.products,
      icon: ShoppingCart,
      color: "bg-purple-500",
      href: "/products"
    },
    {
      name: "Customer Groups",
      value: stats.customerGroups,
      icon: Users,
      color: "bg-yellow-500",
      href: "/customer-groups"
    },
    {
      name: "Customers",
      value: stats.customers,
      icon: UserCheck,
      color: "bg-red-500",
      href: "/customers"
    }
  ];
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-64", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "lg" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: "Dashboard" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-gray-500 dark:text-gray-400", children: "Overview of your business data" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5", children: statCards.map((card) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card p-6 hover:shadow-md transition-shadow duration-200", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `${card.color} rounded-md p-3`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(card.icon, { className: "h-6 w-6 text-white" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-5 w-0 flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-sm font-medium text-gray-500 dark:text-gray-400 truncate", children: card.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "text-lg font-medium text-gray-900 dark:text-white", children: card.value })
      ] }) })
    ] }) }, card.name)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-medium text-gray-900 dark:text-white mb-4", children: "Recent Activity" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-5 w-5 text-green-500" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-900 dark:text-white", children: "System initialized successfully" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: "Database schema created" })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-medium text-gray-900 dark:text-white mb-4", children: "Quick Actions" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: "/companies",
              className: "block p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-5 w-5 text-primary-600 dark:text-primary-400" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-gray-900 dark:text-white", children: "Manage Companies" })
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: "/products",
              className: "block p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "h-5 w-5 text-primary-600 dark:text-primary-400" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-gray-900 dark:text-white", children: "Manage Products" })
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: "/customers",
              className: "block p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "h-5 w-5 text-primary-600 dark:text-primary-400" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-gray-900 dark:text-white", children: "Manage Customers" })
              ] })
            }
          )
        ] })
      ] })
    ] })
  ] });
}
__name(Dashboard, "Dashboard");
function DataTable({
  data = [],
  columns = [],
  onEdit,
  onDelete,
  onView,
  searchable = true,
  sortable = true,
  className = ""
}) {
  const [searchTerm, setSearchTerm] = reactExports.useState("");
  const [sortConfig, setSortConfig] = reactExports.useState({ key: null, direction: "asc" });
  const handleSort = /* @__PURE__ */ __name((key) => {
    if (!sortable)
      return;
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  }, "handleSort");
  const filteredData = data.filter(
    (item) => searchable ? Object.values(item).some(
      (value) => value == null ? void 0 : value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    ) : true
  );
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig.key)
      return 0;
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    if (aValue < bValue)
      return sortConfig.direction === "asc" ? -1 : 1;
    if (aValue > bValue)
      return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `card ${className}`, children: [
    searchable && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 border-b border-gray-200 dark:border-gray-700", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          placeholder: "Search...",
          value: searchTerm,
          onChange: (e) => setSearchTerm(e.target.value),
          className: "input-field pl-10"
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-x-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "min-w-full divide-y divide-gray-200 dark:divide-gray-700", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-gray-50 dark:bg-gray-700", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          columns.map((column) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "th",
            {
              className: `px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider ${sortable && column.sortable !== false ? "cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600" : ""}`,
              onClick: () => column.sortable !== false && handleSort(column.key),
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: column.label }),
                sortable && column.sortable !== false && sortConfig.key === column.key && (sortConfig.direction === "asc" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4" }))
              ] })
            },
            column.key
          )),
          (onEdit || onDelete || onView) && /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700", children: sortedData.map((item, index2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-gray-50 dark:hover:bg-gray-700", children: [
          columns.map((column) => /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100", children: column.render ? column.render(item[column.key], item) : item[column.key] }, column.key)),
          (onEdit || onDelete || onView) && /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end space-x-2", children: [
            onView && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => onView(item),
                className: "text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300",
                "aria-label": "View",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" })
              }
            ),
            onEdit && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => onEdit(item),
                className: "text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300",
                "aria-label": "Edit",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(PenSquare, { className: "h-4 w-4" })
              }
            ),
            onDelete && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => onDelete(item),
                className: "text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300",
                "aria-label": "Delete",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" })
              }
            )
          ] }) })
        ] }, index2)) })
      ] }),
      sortedData.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 dark:text-gray-400", children: "No data found" }) })
    ] })
  ] });
}
__name(DataTable, "DataTable");
function Companies() {
  const { query, logAudit } = useDatabase();
  const { user, hasPermission } = useAuth();
  const [companies, setCompanies] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [showForm, setShowForm] = reactExports.useState(false);
  const [editingCompany, setEditingCompany] = reactExports.useState(null);
  const [formData, setFormData] = reactExports.useState({
    company_code: "",
    company_short_desc: "",
    company_long_desc: "",
    enabled: true
  });
  reactExports.useEffect(() => {
    loadCompanies();
  }, []);
  const loadCompanies = /* @__PURE__ */ __name(async () => {
    try {
      const result = await query("SELECT * FROM companies ORDER BY company_code");
      setCompanies(result.data || []);
    } catch (error) {
      console.error("Error loading companies:", error);
    } finally {
      setLoading(false);
    }
  }, "loadCompanies");
  const resetForm = /* @__PURE__ */ __name(() => {
    setShowForm(false);
    setEditingCompany(null);
    setFormData({
      company_code: "",
      company_short_desc: "",
      company_long_desc: "",
      enabled: true
    });
  }, "resetForm");
  const handleSubmit = /* @__PURE__ */ __name(async (e) => {
    e.preventDefault();
    try {
      if (editingCompany) {
        await query(
          `UPDATE companies SET 
           company_short_desc = @short_desc, 
           company_long_desc = @long_desc, 
           enabled = @enabled, 
           updated_at = GETUTCDATE() 
           WHERE company_code = @code`,
          {
            short_desc: formData.company_short_desc,
            long_desc: formData.company_long_desc,
            enabled: formData.enabled,
            code: editingCompany.company_code
          }
        );
        await logAudit("companies", editingCompany.company_code, "UPDATE", editingCompany, formData, user.username || user.id);
      } else {
        await query(
          `INSERT INTO companies (company_code, company_short_desc, company_long_desc, enabled) 
           VALUES (@code, @short_desc, @long_desc, @enabled)`,
          {
            code: formData.company_code,
            short_desc: formData.company_short_desc,
            long_desc: formData.company_long_desc,
            enabled: formData.enabled
          }
        );
        await logAudit("companies", formData.company_code, "CREATE", null, formData, user.username || user.id);
      }
      resetForm();
      await loadCompanies();
    } catch (error) {
      console.error("Error saving company:", error);
      alert("Error saving company: " + error.message);
    }
  }, "handleSubmit");
  const handleEdit = /* @__PURE__ */ __name((company) => {
    setEditingCompany(company);
    setFormData({
      company_code: company.company_code,
      company_short_desc: company.company_short_desc,
      company_long_desc: company.company_long_desc || "",
      enabled: company.enabled
    });
    setShowForm(true);
  }, "handleEdit");
  const handleDelete = /* @__PURE__ */ __name(async (company) => {
    if (!confirm("Are you sure you want to delete this company?"))
      return;
    try {
      await query("DELETE FROM companies WHERE company_code = @code", { code: company.company_code });
      await logAudit("companies", company.company_code, "DELETE", company, null, user.username || user.id);
      await loadCompanies();
    } catch (error) {
      console.error("Error deleting company:", error);
      alert("Error deleting company: " + error.message);
    }
  }, "handleDelete");
  const columns = [
    { key: "company_code", label: "Code" },
    { key: "company_short_desc", label: "Short Description" },
    { key: "company_long_desc", label: "Long Description" },
    {
      key: "enabled",
      label: "Status",
      render: (value) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `px-2 py-1 text-xs font-medium rounded-full ${value ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"}`, children: value ? "Enabled" : "Disabled" })
    },
    { key: "created_at", label: "Created", render: (value) => new Date(value).toLocaleDateString() }
  ];
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-64", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "lg" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: "Companies" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-gray-500 dark:text-gray-400", children: "Manage company information" })
      ] }),
      hasPermission("create", "companies") && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => setShowForm(true),
          className: "btn-primary flex items-center space-x-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Add Company" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      DataTable,
      {
        data: companies,
        columns,
        onEdit: hasPermission("update", "companies") ? handleEdit : null,
        onDelete: hasPermission("delete", "companies") ? handleDelete : null
      }
    ),
    showForm && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white dark:bg-gray-800", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-medium text-gray-900 dark:text-white mb-4", children: editingCompany ? "Edit Company" : "Add New Company" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: "Company Code" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              maxLength: "2",
              required: true,
              disabled: editingCompany,
              className: "input-field",
              value: formData.company_code,
              onChange: (e) => setFormData({ ...formData, company_code: e.target.value.toUpperCase() })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: "Short Description" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              maxLength: "50",
              required: true,
              className: "input-field",
              value: formData.company_short_desc,
              onChange: (e) => setFormData({ ...formData, company_short_desc: e.target.value })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: "Long Description" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              rows: "3",
              className: "input-field",
              value: formData.company_long_desc,
              onChange: (e) => setFormData({ ...formData, company_long_desc: e.target.value })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              id: "enabled",
              className: "h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded",
              checked: formData.enabled,
              onChange: (e) => setFormData({ ...formData, enabled: e.target.checked })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "enabled", className: "ml-2 block text-sm text-gray-900 dark:text-white", children: "Enabled" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end space-x-3 pt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: resetForm,
              className: "btn-secondary",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "btn-primary", children: editingCompany ? "Update" : "Create" })
        ] })
      ] })
    ] }) }) })
  ] });
}
__name(Companies, "Companies");
function ProductGroups() {
  const { query, logAudit } = useDatabase();
  const { user, hasPermission } = useAuth();
  const [productGroups, setProductGroups] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [showForm, setShowForm] = reactExports.useState(false);
  const [editingGroup, setEditingGroup] = reactExports.useState(null);
  const [formData, setFormData] = reactExports.useState({
    prod_grp_code: "",
    prod_grp_short_desc: "",
    prod_grp_long_desc: "",
    enabled: true
  });
  reactExports.useEffect(() => {
    loadProductGroups();
  }, []);
  const loadProductGroups = /* @__PURE__ */ __name(async () => {
    try {
      const result = await query("SELECT * FROM product_groups ORDER BY prod_grp_code");
      setProductGroups(result.data || []);
    } catch (error) {
      console.error("Error loading product groups:", error);
    } finally {
      setLoading(false);
    }
  }, "loadProductGroups");
  const resetForm = /* @__PURE__ */ __name(() => {
    setShowForm(false);
    setEditingGroup(null);
    setFormData({
      prod_grp_code: "",
      prod_grp_short_desc: "",
      prod_grp_long_desc: "",
      enabled: true
    });
  }, "resetForm");
  const handleSubmit = /* @__PURE__ */ __name(async (e) => {
    e.preventDefault();
    try {
      if (editingGroup) {
        await query(
          `UPDATE product_groups SET 
           prod_grp_short_desc = @short_desc, 
           prod_grp_long_desc = @long_desc, 
           enabled = @enabled, 
           updated_at = GETUTCDATE() 
           WHERE prod_grp_code = @code`,
          {
            short_desc: formData.prod_grp_short_desc,
            long_desc: formData.prod_grp_long_desc,
            enabled: formData.enabled,
            code: editingGroup.prod_grp_code
          }
        );
        await logAudit("product_groups", editingGroup.prod_grp_code, "UPDATE", editingGroup, formData, user.username || user.id);
      } else {
        await query(
          `INSERT INTO product_groups (prod_grp_code, prod_grp_short_desc, prod_grp_long_desc, enabled) 
           VALUES (@code, @short_desc, @long_desc, @enabled)`,
          {
            code: formData.prod_grp_code,
            short_desc: formData.prod_grp_short_desc,
            long_desc: formData.prod_grp_long_desc,
            enabled: formData.enabled
          }
        );
        await logAudit("product_groups", formData.prod_grp_code, "CREATE", null, formData, user.username || user.id);
      }
      resetForm();
      await loadProductGroups();
    } catch (error) {
      console.error("Error saving product group:", error);
      alert("Error saving product group: " + error.message);
    }
  }, "handleSubmit");
  const handleEdit = /* @__PURE__ */ __name((group) => {
    setEditingGroup(group);
    setFormData({
      prod_grp_code: group.prod_grp_code,
      prod_grp_short_desc: group.prod_grp_short_desc,
      prod_grp_long_desc: group.prod_grp_long_desc || "",
      enabled: group.enabled
    });
    setShowForm(true);
  }, "handleEdit");
  const handleDelete = /* @__PURE__ */ __name(async (group) => {
    if (!confirm("Are you sure you want to delete this product group?"))
      return;
    try {
      await query("DELETE FROM product_groups WHERE prod_grp_code = @code", { code: group.prod_grp_code });
      await logAudit("product_groups", group.prod_grp_code, "DELETE", group, null, user.username || user.id);
      await loadProductGroups();
    } catch (error) {
      console.error("Error deleting product group:", error);
      alert("Error deleting product group: " + error.message);
    }
  }, "handleDelete");
  const columns = [
    { key: "prod_grp_code", label: "Code" },
    { key: "prod_grp_short_desc", label: "Short Description" },
    { key: "prod_grp_long_desc", label: "Long Description" },
    {
      key: "enabled",
      label: "Status",
      render: (value) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `px-2 py-1 text-xs font-medium rounded-full ${value ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"}`, children: value ? "Enabled" : "Disabled" })
    },
    { key: "created_at", label: "Created", render: (value) => new Date(value).toLocaleDateString() }
  ];
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-64", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "lg" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: "Product Groups" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-gray-500 dark:text-gray-400", children: "Manage product group categories" })
      ] }),
      hasPermission("create", "product_groups") && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => setShowForm(true),
          className: "btn-primary flex items-center space-x-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Add Product Group" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      DataTable,
      {
        data: productGroups,
        columns,
        onEdit: hasPermission("update", "product_groups") ? handleEdit : null,
        onDelete: hasPermission("delete", "product_groups") ? handleDelete : null
      }
    ),
    showForm && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white dark:bg-gray-800", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-medium text-gray-900 dark:text-white mb-4", children: editingGroup ? "Edit Product Group" : "Add New Product Group" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: "Product Group Code" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              maxLength: "2",
              required: true,
              disabled: editingGroup,
              className: "input-field",
              value: formData.prod_grp_code,
              onChange: (e) => setFormData({ ...formData, prod_grp_code: e.target.value.toUpperCase() })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: "Short Description" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              maxLength: "50",
              required: true,
              className: "input-field",
              value: formData.prod_grp_short_desc,
              onChange: (e) => setFormData({ ...formData, prod_grp_short_desc: e.target.value })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: "Long Description" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              rows: "3",
              className: "input-field",
              value: formData.prod_grp_long_desc,
              onChange: (e) => setFormData({ ...formData, prod_grp_long_desc: e.target.value })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              id: "enabled",
              className: "h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded",
              checked: formData.enabled,
              onChange: (e) => setFormData({ ...formData, enabled: e.target.checked })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "enabled", className: "ml-2 block text-sm text-gray-900 dark:text-white", children: "Enabled" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end space-x-3 pt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: resetForm,
              className: "btn-secondary",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "btn-primary", children: editingGroup ? "Update" : "Create" })
        ] })
      ] })
    ] }) }) })
  ] });
}
__name(ProductGroups, "ProductGroups");
function Products() {
  const { query, logAudit } = useDatabase();
  const { user, hasPermission } = useAuth();
  const [products, setProducts] = reactExports.useState([]);
  const [companies, setCompanies] = reactExports.useState([]);
  const [productGroups, setProductGroups] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [showForm, setShowForm] = reactExports.useState(false);
  const [editingProduct, setEditingProduct] = reactExports.useState(null);
  const [formData, setFormData] = reactExports.useState({
    product_code: "",
    product_short_desc: "",
    product_long_desc: "",
    prod_grp_code: "",
    company_code: "",
    price_zone_1: 0,
    price_zone_2: 0,
    price_zone_3: 0,
    price_zone_4: 0,
    price_zone_5: 0,
    price_zone_6: 0,
    price_zone_7: 0,
    price_zone_8: 0,
    price_zone_9: 0,
    price_zone_10: 0,
    enabled: true
  });
  reactExports.useEffect(() => {
    loadData();
  }, []);
  const loadData = /* @__PURE__ */ __name(async () => {
    try {
      const [productsResult, companiesResult, productGroupsResult] = await Promise.all([
        query(`SELECT p.*, c.company_short_desc, pg.prod_grp_short_desc 
               FROM products p 
               LEFT JOIN companies c ON p.company_code = c.company_code 
               LEFT JOIN product_groups pg ON p.prod_grp_code = pg.prod_grp_code 
               ORDER BY p.product_code`),
        query("SELECT * FROM companies WHERE enabled = 1 ORDER BY company_code"),
        query("SELECT * FROM product_groups WHERE enabled = 1 ORDER BY prod_grp_code")
      ]);
      setProducts(productsResult.data || []);
      setCompanies(companiesResult.data || []);
      setProductGroups(productGroupsResult.data || []);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  }, "loadData");
  const handleSubmit = /* @__PURE__ */ __name(async (e) => {
    e.preventDefault();
    try {
      const params = {
        code: formData.product_code,
        short_desc: formData.product_short_desc,
        long_desc: formData.product_long_desc,
        prod_grp_code: formData.prod_grp_code || null,
        company_code: formData.company_code || null,
        pz1: formData.price_zone_1,
        pz2: formData.price_zone_2,
        pz3: formData.price_zone_3,
        pz4: formData.price_zone_4,
        pz5: formData.price_zone_5,
        pz6: formData.price_zone_6,
        pz7: formData.price_zone_7,
        pz8: formData.price_zone_8,
        pz9: formData.price_zone_9,
        pz10: formData.price_zone_10,
        enabled: formData.enabled ? 1 : 0
      };
      if (editingProduct) {
        params.code = editingProduct.product_code;
        console.debug("Products UPDATE params:", params);
        await query(
          `UPDATE products SET 
           product_short_desc = @short_desc, 
           product_long_desc = @long_desc, 
           prod_grp_code = @prod_grp_code,
           company_code = @company_code,
           price_zone_1 = @pz1,
           price_zone_2 = @pz2,
           price_zone_3 = @pz3,
           price_zone_4 = @pz4,
           price_zone_5 = @pz5,
           price_zone_6 = @pz6,
           price_zone_7 = @pz7,
           price_zone_8 = @pz8,
           price_zone_9 = @pz9,
           price_zone_10 = @pz10,
           enabled = @enabled, 
           updated_at = GETUTCDATE() 
           WHERE product_code = @code`,
          params
        );
        await logAudit(
          "products",
          editingProduct.product_code,
          "UPDATE",
          editingProduct,
          formData,
          user.id
        );
      } else {
        console.debug("Products INSERT params:", params);
        await query(
          `INSERT INTO products (
            product_code, product_short_desc, product_long_desc, prod_grp_code, company_code,
            price_zone_1, price_zone_2, price_zone_3, price_zone_4, price_zone_5,
            price_zone_6, price_zone_7, price_zone_8, price_zone_9, price_zone_10, enabled
           ) VALUES (@code, @short_desc, @long_desc, @prod_grp_code, @company_code, @pz1, @pz2, @pz3, @pz4, @pz5, @pz6, @pz7, @pz8, @pz9, @pz10, @enabled)`,
          params
        );
        await logAudit(
          "products",
          formData.product_code,
          "CREATE",
          null,
          formData,
          user.id
        );
      }
      setShowForm(false);
      setEditingProduct(null);
      resetForm();
      await loadData();
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Error saving product: " + (error.message || error));
    }
  }, "handleSubmit");
  const resetForm = /* @__PURE__ */ __name(() => {
    setFormData({
      product_code: "",
      product_short_desc: "",
      product_long_desc: "",
      prod_grp_code: "",
      company_code: "",
      price_zone_1: 0,
      price_zone_2: 0,
      price_zone_3: 0,
      price_zone_4: 0,
      price_zone_5: 0,
      price_zone_6: 0,
      price_zone_7: 0,
      price_zone_8: 0,
      price_zone_9: 0,
      price_zone_10: 0,
      enabled: true
    });
  }, "resetForm");
  const handleEdit = /* @__PURE__ */ __name((product) => {
    setEditingProduct(product);
    setFormData({
      product_code: product.product_code,
      product_short_desc: product.product_short_desc,
      product_long_desc: product.product_long_desc || "",
      prod_grp_code: product.prod_grp_code,
      company_code: product.company_code,
      price_zone_1: product.price_zone_1 || 0,
      price_zone_2: product.price_zone_2 || 0,
      price_zone_3: product.price_zone_3 || 0,
      price_zone_4: product.price_zone_4 || 0,
      price_zone_5: product.price_zone_5 || 0,
      price_zone_6: product.price_zone_6 || 0,
      price_zone_7: product.price_zone_7 || 0,
      price_zone_8: product.price_zone_8 || 0,
      price_zone_9: product.price_zone_9 || 0,
      price_zone_10: product.price_zone_10 || 0,
      enabled: product.enabled
    });
    setShowForm(true);
  }, "handleEdit");
  const handleDelete = /* @__PURE__ */ __name(async (product) => {
    if (!confirm("Are you sure you want to delete this product?"))
      return;
    try {
      await query("DELETE FROM products WHERE product_code = @code", { code: product.product_code });
      await logAudit("products", product.product_code, "DELETE", product, null, user.id);
      await loadData();
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Error deleting product: " + (error.message || error));
    }
  }, "handleDelete");
  const columns = [
    { key: "product_code", label: "Code" },
    { key: "product_short_desc", label: "Description" },
    { key: "prod_grp_short_desc", label: "Product Group" },
    { key: "company_short_desc", label: "Company" },
    { key: "price_zone_1", label: "Price Zone 1", render: (value) => `$${parseFloat(value || 0).toFixed(2)}` },
    {
      key: "enabled",
      label: "Status",
      render: (value) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `px-2 py-1 text-xs font-medium rounded-full ${value ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"}`, children: value ? "Enabled" : "Disabled" })
    }
  ];
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-64", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "lg" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: "Products" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-gray-500 dark:text-gray-400", children: "Manage product catalog with pricing zones" })
      ] }),
      hasPermission("create", "products") && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => setShowForm(true),
          className: "btn-primary flex items-center space-x-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Add Product" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      DataTable,
      {
        data: products,
        columns,
        onEdit: hasPermission("update", "products") ? handleEdit : null,
        onDelete: hasPermission("delete", "products") ? handleDelete : null
      }
    ),
    showForm && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative top-10 mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-md bg-white dark:bg-gray-800", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-medium text-gray-900 dark:text-white mb-4", children: editingProduct ? "Edit Product" : "Add New Product" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: "Product Code" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                maxLength: "5",
                required: true,
                disabled: editingProduct,
                className: "input-field",
                value: formData.product_code,
                onChange: (e) => setFormData({ ...formData, product_code: e.target.value.toUpperCase() })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: "Short Description" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                maxLength: "50",
                required: true,
                className: "input-field",
                value: formData.product_short_desc,
                onChange: (e) => setFormData({ ...formData, product_short_desc: e.target.value })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: "Product Group" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "select",
              {
                required: true,
                className: "input-field",
                value: formData.prod_grp_code,
                onChange: (e) => setFormData({ ...formData, prod_grp_code: e.target.value }),
                children: productGroups.map((group) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: group.prod_grp_code, children: [
                  group.prod_grp_code,
                  " - ",
                  group.prod_grp_short_desc
                ] }, group.prod_grp_code))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: "Company" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                required: true,
                className: "input-field",
                value: formData.company_code,
                onChange: (e) => setFormData({ ...formData, company_code: e.target.value }),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select Company" }),
                  companies.map((company) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: company.company_code, children: [
                    company.company_code,
                    " - ",
                    company.company_short_desc
                  ] }, company.company_code))
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: "Long Description" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              rows: "3",
              className: "input-field",
              value: formData.product_long_desc,
              onChange: (e) => setFormData({ ...formData, product_long_desc: e.target.value })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-md font-medium text-gray-900 dark:text-white mb-3", children: "Pricing Zones" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-5 gap-4", children: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((zone) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: [
              "Zone ",
              zone
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "number",
                step: "0.01",
                min: "0",
                className: "input-field",
                value: formData[`price_zone_${zone}`],
                onChange: (e) => setFormData({ ...formData, [`price_zone_${zone}`]: parseFloat(e.target.value) || 0 })
              }
            )
          ] }, zone)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              id: "enabled",
              className: "h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded",
              checked: formData.enabled,
              onChange: (e) => setFormData({ ...formData, enabled: e.target.checked })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "enabled", className: "ml-2 block text-sm text-gray-900 dark:text-white", children: "Enabled" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end space-x-3 pt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => {
                setShowForm(false);
                setEditingProduct(null);
                resetForm();
              },
              className: "btn-secondary",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "btn-primary", children: editingProduct ? "Update" : "Create" })
        ] })
      ] })
    ] }) }) })
  ] });
}
__name(Products, "Products");
function CustomerGroups() {
  const { query, logAudit } = useDatabase();
  const { user, hasPermission } = useAuth();
  const [customerGroups, setCustomerGroups] = reactExports.useState([]);
  const [companies, setCompanies] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [showForm, setShowForm] = reactExports.useState(false);
  const [editingGroup, setEditingGroup] = reactExports.useState(null);
  const [formData, setFormData] = reactExports.useState({
    cust_group_code: "",
    cust_group_short_desc: "",
    cust_group_long_desc: "",
    company_code: "",
    enabled: true
  });
  reactExports.useEffect(() => {
    loadData();
  }, []);
  const loadData = /* @__PURE__ */ __name(async () => {
    try {
      const [customerGroupsResult, companiesResult] = await Promise.all([
        query(`SELECT cg.*, c.company_short_desc 
               FROM customer_groups cg 
               LEFT JOIN companies c ON cg.company_code = c.company_code 
               ORDER BY cg.cust_group_code`),
        query("SELECT * FROM companies WHERE enabled = 1 ORDER BY company_code")
      ]);
      setCustomerGroups(customerGroupsResult.data || []);
      setCompanies(companiesResult.data || []);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  }, "loadData");
  const resetForm = /* @__PURE__ */ __name(() => {
    setShowForm(false);
    setEditingGroup(null);
    setFormData({
      cust_group_code: "",
      cust_group_short_desc: "",
      cust_group_long_desc: "",
      company_code: "",
      enabled: true
    });
  }, "resetForm");
  const handleSubmit = /* @__PURE__ */ __name(async (e) => {
    e.preventDefault();
    try {
      if (editingGroup) {
        await query(
          `UPDATE customer_groups SET 
           cust_group_short_desc = @short_desc, 
           cust_group_long_desc = @long_desc, 
           company_code = @company_code,
           enabled = @enabled, 
           updated_at = GETUTCDATE() 
           WHERE cust_group_code = @code`,
          {
            short_desc: formData.cust_group_short_desc,
            long_desc: formData.cust_group_long_desc,
            company_code: formData.company_code,
            enabled: formData.enabled,
            code: editingGroup.cust_group_code
          }
        );
        await logAudit("customer_groups", editingGroup.cust_group_code, "UPDATE", editingGroup, formData, user.username || user.id);
      } else {
        await query(
          `INSERT INTO customer_groups (cust_group_code, cust_group_short_desc, cust_group_long_desc, company_code, enabled) 
           VALUES (@code, @short_desc, @long_desc, @company_code, @enabled)`,
          {
            code: formData.cust_group_code,
            short_desc: formData.cust_group_short_desc,
            long_desc: formData.cust_group_long_desc,
            company_code: formData.company_code,
            enabled: formData.enabled
          }
        );
        await logAudit("customer_groups", formData.cust_group_code, "CREATE", null, formData, user.username || user.id);
      }
      resetForm();
      await loadData();
    } catch (error) {
      console.error("Error saving customer group:", error);
      alert("Error saving customer group: " + error.message);
    }
  }, "handleSubmit");
  const handleEdit = /* @__PURE__ */ __name((group) => {
    setEditingGroup(group);
    setFormData({
      cust_group_code: group.cust_group_code,
      cust_group_short_desc: group.cust_group_short_desc,
      cust_group_long_desc: group.cust_group_long_desc || "",
      company_code: group.company_code,
      enabled: group.enabled
    });
    setShowForm(true);
  }, "handleEdit");
  const handleDelete = /* @__PURE__ */ __name(async (group) => {
    if (!confirm("Are you sure you want to delete this customer group?"))
      return;
    try {
      await query("DELETE FROM customer_groups WHERE cust_group_code = @code", { code: group.cust_group_code });
      await logAudit("customer_groups", group.cust_group_code, "DELETE", group, null, user.username || user.id);
      await loadData();
    } catch (error) {
      console.error("Error deleting customer group:", error);
      alert("Error deleting customer group: " + error.message);
    }
  }, "handleDelete");
  const columns = [
    { key: "cust_group_code", label: "Code" },
    { key: "cust_group_short_desc", label: "Short Description" },
    { key: "company_short_desc", label: "Company" },
    {
      key: "enabled",
      label: "Status",
      render: (value) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `px-2 py-1 text-xs font-medium rounded-full ${value ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"}`, children: value ? "Enabled" : "Disabled" })
    },
    { key: "created_at", label: "Created", render: (value) => new Date(value).toLocaleDateString() }
  ];
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-64", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "lg" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: "Customer Groups" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-gray-500 dark:text-gray-400", children: "Manage customer group categories" })
      ] }),
      hasPermission("create", "customer_groups") && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setShowForm(true), className: "btn-primary flex items-center space-x-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Add Customer Group" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      DataTable,
      {
        data: customerGroups,
        columns,
        onEdit: hasPermission("update", "customer_groups") ? handleEdit : null,
        onDelete: hasPermission("delete", "customer_groups") ? handleDelete : null
      }
    ),
    showForm && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white dark:bg-gray-800", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-medium text-gray-900 dark:text-white mb-4", children: editingGroup ? "Edit Customer Group" : "Add New Customer Group" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: "Customer Group Code" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              maxLength: "3",
              required: true,
              disabled: editingGroup,
              className: "input-field",
              value: formData.cust_group_code,
              onChange: (e) => setFormData({ ...formData, cust_group_code: e.target.value.toUpperCase() })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: "Short Description" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              maxLength: "50",
              required: true,
              className: "input-field",
              value: formData.cust_group_short_desc,
              onChange: (e) => setFormData({ ...formData, cust_group_short_desc: e.target.value })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: "Company" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              required: true,
              className: "input-field",
              value: formData.company_code,
              onChange: (e) => setFormData({ ...formData, company_code: e.target.value }),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select Company" }),
                companies.map((company) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: company.company_code, children: [
                  company.company_code,
                  " - ",
                  company.company_short_desc
                ] }, company.company_code))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: "Long Description" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              rows: "3",
              className: "input-field",
              value: formData.cust_group_long_desc,
              onChange: (e) => setFormData({ ...formData, cust_group_long_desc: e.target.value })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              id: "enabled",
              className: "h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded",
              checked: formData.enabled,
              onChange: (e) => setFormData({ ...formData, enabled: e.target.checked })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "enabled", className: "ml-2 block text-sm text-gray-900 dark:text-white", children: "Enabled" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end space-x-3 pt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: resetForm, className: "btn-secondary", children: "Cancel" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "btn-primary", children: editingGroup ? "Update" : "Create" })
        ] })
      ] })
    ] }) }) })
  ] });
}
__name(CustomerGroups, "CustomerGroups");
function Customers() {
  const { query, logAudit } = useDatabase();
  const { user, hasPermission } = useAuth();
  const [customers, setCustomers] = reactExports.useState([]);
  const [companies, setCompanies] = reactExports.useState([]);
  const [customerGroups, setCustomerGroups] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [showForm, setShowForm] = reactExports.useState(false);
  const [editingCustomer, setEditingCustomer] = reactExports.useState(null);
  const [formData, setFormData] = reactExports.useState({
    customer_code: "",
    customer_short_desc: "",
    customer_long_desc: "",
    cust_group_code: "",
    company_code: "",
    enabled: true
  });
  reactExports.useEffect(() => {
    loadData();
  }, []);
  const loadData = /* @__PURE__ */ __name(async () => {
    try {
      const [customersResult, companiesResult, customerGroupsResult] = await Promise.all([
        query(`SELECT c.*, co.company_short_desc, cg.cust_group_short_desc 
               FROM customers c 
               LEFT JOIN companies co ON c.company_code = co.company_code 
               LEFT JOIN customer_groups cg ON c.cust_group_code = cg.cust_group_code 
               ORDER BY c.customer_code`),
        query("SELECT * FROM companies WHERE enabled = 1 ORDER BY company_code"),
        query("SELECT * FROM customer_groups WHERE enabled = 1 ORDER BY cust_group_code")
      ]);
      setCustomers(customersResult.data || []);
      setCompanies(companiesResult.data || []);
      setCustomerGroups(customerGroupsResult.data || []);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  }, "loadData");
  const resetForm = /* @__PURE__ */ __name(() => {
    setShowForm(false);
    setEditingCustomer(null);
    setFormData({
      customer_code: "",
      customer_short_desc: "",
      customer_long_desc: "",
      cust_group_code: "",
      company_code: "",
      enabled: true
    });
  }, "resetForm");
  const handleSubmit = /* @__PURE__ */ __name(async (e) => {
    e.preventDefault();
    try {
      if (editingCustomer) {
        await query(
          `UPDATE customers SET 
           customer_short_desc = @short_desc, 
           customer_long_desc = @long_desc, 
           cust_group_code = @cust_group_code,
           company_code = @company_code,
           enabled = @enabled, 
           updated_at = GETUTCDATE() 
           WHERE customer_code = @code`,
          {
            short_desc: formData.customer_short_desc,
            long_desc: formData.customer_long_desc,
            cust_group_code: formData.cust_group_code,
            company_code: formData.company_code,
            enabled: formData.enabled,
            code: editingCustomer.customer_code
          }
        );
        await logAudit("customers", editingCustomer.customer_code, "UPDATE", editingCustomer, formData, user.username || user.id);
      } else {
        await query(
          `INSERT INTO customers (customer_code, customer_short_desc, customer_long_desc, cust_group_code, company_code, enabled) 
           VALUES (@code, @short_desc, @long_desc, @cust_group_code, @company_code, @enabled)`,
          {
            code: formData.customer_code,
            short_desc: formData.customer_short_desc,
            long_desc: formData.customer_long_desc,
            cust_group_code: formData.cust_group_code,
            company_code: formData.company_code,
            enabled: formData.enabled
          }
        );
        await logAudit("customers", formData.customer_code, "CREATE", null, formData, user.username || user.id);
      }
      resetForm();
      await loadData();
    } catch (error) {
      console.error("Error saving customer:", error);
      alert("Error saving customer: " + error.message);
    }
  }, "handleSubmit");
  const handleEdit = /* @__PURE__ */ __name((customer) => {
    setEditingCustomer(customer);
    setFormData({
      customer_code: customer.customer_code,
      customer_short_desc: customer.customer_short_desc,
      customer_long_desc: customer.customer_long_desc || "",
      cust_group_code: customer.cust_group_code,
      company_code: customer.company_code,
      enabled: customer.enabled
    });
    setShowForm(true);
  }, "handleEdit");
  const handleDelete = /* @__PURE__ */ __name(async (customer) => {
    if (!confirm("Are you sure you want to delete this customer?"))
      return;
    try {
      await query("DELETE FROM customers WHERE customer_code = @code", { code: customer.customer_code });
      await logAudit("customers", customer.customer_code, "DELETE", customer, null, user.username || user.id);
      await loadData();
    } catch (error) {
      console.error("Error deleting customer:", error);
      alert("Error deleting customer: " + error.message);
    }
  }, "handleDelete");
  const columns = [
    { key: "customer_code", label: "Code" },
    { key: "customer_short_desc", label: "Description" },
    { key: "cust_group_short_desc", label: "Customer Group" },
    { key: "company_short_desc", label: "Company" },
    {
      key: "enabled",
      label: "Status",
      render: (value) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `px-2 py-1 text-xs font-medium rounded-full ${value ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"}`, children: value ? "Enabled" : "Disabled" })
    },
    { key: "created_at", label: "Created", render: (value) => new Date(value).toLocaleDateString() }
  ];
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-64", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "lg" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: "Customers" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-gray-500 dark:text-gray-400", children: "Manage customer database" })
      ] }),
      hasPermission("create", "customers") && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setShowForm(true), className: "btn-primary flex items-center space-x-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Add Customer" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      DataTable,
      {
        data: customers,
        columns,
        onEdit: hasPermission("update", "customers") ? handleEdit : null,
        onDelete: hasPermission("delete", "customers") ? handleDelete : null
      }
    ),
    showForm && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white dark:bg-gray-800", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-medium text-gray-900 dark:text-white mb-4", children: editingCustomer ? "Edit Customer" : "Add New Customer" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: "Customer Code" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              maxLength: "6",
              required: true,
              disabled: editingCustomer,
              className: "input-field",
              value: formData.customer_code,
              onChange: (e) => setFormData({ ...formData, customer_code: e.target.value.toUpperCase() })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: "Short Description" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              maxLength: "50",
              required: true,
              className: "input-field",
              value: formData.customer_short_desc,
              onChange: (e) => setFormData({ ...formData, customer_short_desc: e.target.value })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: "Customer Group" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              required: true,
              className: "input-field",
              value: formData.cust_group_code,
              onChange: (e) => setFormData({ ...formData, cust_group_code: e.target.value }),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select Customer Group" }),
                customerGroups.map((group) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: group.cust_group_code, children: [
                  group.cust_group_code,
                  " - ",
                  group.cust_group_short_desc
                ] }, group.cust_group_code))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: "Company" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              required: true,
              className: "input-field",
              value: formData.company_code,
              onChange: (e) => setFormData({ ...formData, company_code: e.target.value }),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select Company" }),
                companies.map((company) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: company.company_code, children: [
                  company.company_code,
                  " - ",
                  company.company_short_desc
                ] }, company.company_code))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: "Long Description" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              rows: "3",
              className: "input-field",
              value: formData.customer_long_desc,
              onChange: (e) => setFormData({ ...formData, customer_long_desc: e.target.value })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              id: "enabled",
              className: "h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded",
              checked: formData.enabled,
              onChange: (e) => setFormData({ ...formData, enabled: e.target.checked })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "enabled", className: "ml-2 block text-sm text-gray-900 dark:text-white", children: "Enabled" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end space-x-3 pt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: resetForm, className: "btn-secondary", children: "Cancel" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "btn-primary", children: editingCustomer ? "Update" : "Create" })
        ] })
      ] })
    ] }) }) })
  ] });
}
__name(Customers, "Customers");
function AuditTrail() {
  const { query } = useDatabase();
  const [auditLogs, setAuditLogs] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [filters, setFilters] = reactExports.useState({
    table_name: "",
    action: "",
    user_id: "",
    date_from: "",
    date_to: ""
  });
  reactExports.useEffect(() => {
    loadAuditLogs();
  }, []);
  const loadAuditLogs = /* @__PURE__ */ __name(async () => {
    try {
      let sql = "SELECT * FROM audit_trail";
      const params = [];
      let paramIndex = 1;
      if (filters.table_name) {
        sql += ` AND table_name = $${paramIndex}`;
        params.push(filters.table_name);
        paramIndex++;
      }
      if (filters.action) {
        sql += ` AND action = $${paramIndex}`;
        params.push(filters.action);
        paramIndex++;
      }
      if (filters.user_id) {
        sql += ` AND user_id = $${paramIndex}`;
        params.push(filters.user_id);
        paramIndex++;
      }
      if (filters.date_from) {
        sql += ` AND timestamp >= $${paramIndex}`;
        params.push(filters.date_from);
        paramIndex++;
      }
      if (filters.date_to) {
        sql += ` AND timestamp <= $${paramIndex}`;
        params.push(filters.date_to + " 23:59:59");
        paramIndex++;
      }
      sql += " ORDER BY timestamp DESC";
      const result = await query(sql, params);
      setAuditLogs(result.data || []);
    } catch (error) {
      console.error("Error loading audit logs:", error);
    } finally {
      setLoading(false);
    }
  }, "loadAuditLogs");
  const handleFilterChange = /* @__PURE__ */ __name((field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value
    }));
  }, "handleFilterChange");
  const applyFilters = /* @__PURE__ */ __name(() => {
    setLoading(true);
    loadAuditLogs();
  }, "applyFilters");
  const clearFilters = /* @__PURE__ */ __name(() => {
    setFilters({
      table_name: "",
      action: "",
      user_id: "",
      date_from: "",
      date_to: ""
    });
    setLoading(true);
    setTimeout(() => loadAuditLogs(), 100);
  }, "clearFilters");
  const columns = [
    {
      key: "timestamp",
      label: "Timestamp",
      render: (value) => new Date(value).toLocaleString()
    },
    { key: "table_name", label: "Table" },
    { key: "record_id", label: "Record ID" },
    {
      key: "action",
      label: "Action",
      render: (value) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `px-2 py-1 text-xs font-medium rounded-full ${value === "CREATE" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" : value === "UPDATE" ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" : value === "DELETE" ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300" : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"}`, children: value })
    },
    { key: "user_id", label: "User" }
  ];
  const handleView = /* @__PURE__ */ __name((log) => {
    const details = {
      id: log.id,
      table: log.table_name,
      record: log.record_id,
      action: log.action,
      user: log.user_id,
      timestamp: new Date(log.timestamp).toLocaleString(),
      oldValues: log.old_values ? JSON.stringify(log.old_values, null, 2) : "N/A",
      newValues: log.new_values ? JSON.stringify(log.new_values, null, 2) : "N/A"
    };
    alert(`Audit Log Details:

ID: ${details.id}
Table: ${details.table}
Record: ${details.record}
Action: ${details.action}
User: ${details.user}
Timestamp: ${details.timestamp}

Old Values:
${details.oldValues}

New Values:
${details.newValues}`);
  }, "handleView");
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-64", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "lg" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: "Audit Trail" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-gray-500 dark:text-gray-400", children: "Track all data changes and user activities" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Filter, { className: "h-5 w-5 text-gray-500" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-medium text-gray-900 dark:text-white", children: "Filters" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Table" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              className: "input-field",
              value: filters.table_name,
              onChange: (e) => handleFilterChange("table_name", e.target.value),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "All Tables" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "companies", children: "Companies" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "product_groups", children: "Product Groups" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "products", children: "Products" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "customer_groups", children: "Customer Groups" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "customers", children: "Customers" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Action" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              className: "input-field",
              value: filters.action,
              onChange: (e) => handleFilterChange("action", e.target.value),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "All Actions" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "CREATE", children: "Create" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "UPDATE", children: "Update" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "DELETE", children: "Delete" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "User ID" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              className: "input-field",
              value: filters.user_id,
              onChange: (e) => handleFilterChange("user_id", e.target.value),
              placeholder: "Enter user ID"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "From Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "date",
              className: "input-field",
              value: filters.date_from,
              onChange: (e) => handleFilterChange("date_from", e.target.value)
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "To Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "date",
              className: "input-field",
              value: filters.date_to,
              onChange: (e) => handleFilterChange("date_to", e.target.value)
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end space-x-3 mt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: clearFilters,
            className: "btn-secondary",
            children: "Clear Filters"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: applyFilters,
            className: "btn-primary",
            children: "Apply Filters"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      DataTable,
      {
        data: auditLogs,
        columns,
        onView: handleView,
        searchable: false
      }
    )
  ] });
}
__name(AuditTrail, "AuditTrail");
function Reports() {
  const { query } = useDatabase();
  const [loading, setLoading] = reactExports.useState(true);
  const [reportData, setReportData] = reactExports.useState({
    summary: {
      totalCompanies: 0,
      totalProductGroups: 0,
      totalProducts: 0,
      totalCustomerGroups: 0,
      totalCustomers: 0,
      enabledProducts: 0,
      disabledProducts: 0
    },
    productsByGroup: [],
    customersByGroup: [],
    recentActivity: []
  });
  reactExports.useEffect(() => {
    loadReportData();
  }, []);
  const loadReportData = /* @__PURE__ */ __name(async () => {
    var _a, _b, _c, _d, _e, _f, _g;
    try {
      const [
        summaryResult,
        productsByGroupResult,
        customersByGroupResult,
        recentActivityResult
      ] = await Promise.all([
        // Summary statistics
        Promise.all([
          query("SELECT COUNT(*) as count FROM companies WHERE enabled = true"),
          query("SELECT COUNT(*) as count FROM product_groups WHERE enabled = true"),
          query("SELECT COUNT(*) as count FROM products WHERE enabled = true"),
          query("SELECT COUNT(*) as count FROM customer_groups WHERE enabled = true"),
          query("SELECT COUNT(*) as count FROM customers WHERE enabled = true"),
          query("SELECT COUNT(*) as count FROM products WHERE enabled = true"),
          query("SELECT COUNT(*) as count FROM products WHERE enabled = false")
        ]),
        // Products by group
        query(`SELECT pg.prod_grp_short_desc as group_name, COUNT(p.product_code) as count
               FROM product_groups pg
               LEFT JOIN products p ON pg.prod_grp_code = p.prod_grp_code
               WHERE pg.enabled = true
               GROUP BY pg.prod_grp_code, pg.prod_grp_short_desc
               ORDER BY count DESC`),
        // Customers by group
        query(`SELECT cg.cust_group_short_desc as group_name, COUNT(c.customer_code) as count
               FROM customer_groups cg
               LEFT JOIN customers c ON cg.cust_group_code = c.cust_group_code
               WHERE cg.enabled = true
               GROUP BY cg.cust_group_code, cg.cust_group_short_desc
               ORDER BY count DESC`),
        // Recent activity from audit trail
        query(`SELECT table_name, action, COUNT(*) as count, MAX(timestamp) as last_activity
               FROM audit_trail
               WHERE timestamp >= NOW() - INTERVAL '30 days'
               GROUP BY table_name, action
               ORDER BY last_activity DESC
               LIMIT 10`)
      ]);
      const [
        totalCompanies,
        totalProductGroups,
        totalProducts,
        totalCustomerGroups,
        totalCustomers,
        enabledProducts,
        disabledProducts
      ] = summaryResult;
      setReportData({
        summary: {
          totalCompanies: ((_a = totalCompanies.data[0]) == null ? void 0 : _a.count) || 0,
          totalProductGroups: ((_b = totalProductGroups.data[0]) == null ? void 0 : _b.count) || 0,
          totalProducts: ((_c = totalProducts.data[0]) == null ? void 0 : _c.count) || 0,
          totalCustomerGroups: ((_d = totalCustomerGroups.data[0]) == null ? void 0 : _d.count) || 0,
          totalCustomers: ((_e = totalCustomers.data[0]) == null ? void 0 : _e.count) || 0,
          enabledProducts: ((_f = enabledProducts.data[0]) == null ? void 0 : _f.count) || 0,
          disabledProducts: ((_g = disabledProducts.data[0]) == null ? void 0 : _g.count) || 0
        },
        productsByGroup: productsByGroupResult.data || [],
        customersByGroup: customersByGroupResult.data || [],
        recentActivity: recentActivityResult.data || []
      });
    } catch (error) {
      console.error("Error loading report data:", error);
    } finally {
      setLoading(false);
    }
  }, "loadReportData");
  const exportToCSV = /* @__PURE__ */ __name((data, filename) => {
    if (!data || data.length === 0)
      return;
    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(","),
      ...data.map((row) => headers.map((header) => `"${row[header] || ""}"`).join(","))
    ].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `${filename}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, "exportToCSV");
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-64", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "lg" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: "Reports" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-gray-500 dark:text-gray-400", children: "Business intelligence and analytics dashboard" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BarChart3, { className: "h-8 w-8 text-blue-600" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-5 w-0 flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-sm font-medium text-gray-500 dark:text-gray-400 truncate", children: "Total Companies" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "text-lg font-medium text-gray-900 dark:text-white", children: reportData.summary.totalCompanies })
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PieChart, { className: "h-8 w-8 text-green-600" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-5 w-0 flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-sm font-medium text-gray-500 dark:text-gray-400 truncate", children: "Total Products" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "text-lg font-medium text-gray-900 dark:text-white", children: reportData.summary.totalProducts })
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-8 w-8 text-purple-600" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-5 w-0 flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-sm font-medium text-gray-500 dark:text-gray-400 truncate", children: "Total Customers" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "text-lg font-medium text-gray-900 dark:text-white", children: reportData.summary.totalCustomers })
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BarChart3, { className: "h-8 w-8 text-yellow-600" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-5 w-0 flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-sm font-medium text-gray-500 dark:text-gray-400 truncate", children: "Active Products" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "text-lg font-medium text-gray-900 dark:text-white", children: reportData.summary.enabledProducts })
        ] }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-medium text-gray-900 dark:text-white", children: "Products by Group" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => exportToCSV(reportData.productsByGroup, "products-by-group"),
              className: "btn-secondary flex items-center space-x-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Export" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: reportData.productsByGroup.map((item, index2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-gray-900 dark:text-white", children: item.group_name || "Unassigned" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "bg-primary-600 h-2 rounded-full",
                style: {
                  width: `${Math.max(item.count / Math.max(...reportData.productsByGroup.map((p2) => p2.count)) * 100, 5)}%`
                }
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-gray-900 dark:text-white", children: item.count })
          ] })
        ] }, index2)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-medium text-gray-900 dark:text-white", children: "Customers by Group" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => exportToCSV(reportData.customersByGroup, "customers-by-group"),
              className: "btn-secondary flex items-center space-x-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Export" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: reportData.customersByGroup.map((item, index2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-gray-900 dark:text-white", children: item.group_name || "Unassigned" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "bg-green-600 h-2 rounded-full",
                style: {
                  width: `${Math.max(item.count / Math.max(...reportData.customersByGroup.map((c) => c.count)) * 100, 5)}%`
                }
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-gray-900 dark:text-white", children: item.count })
          ] })
        ] }, index2)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-medium text-gray-900 dark:text-white", children: "Recent Activity (Last 30 Days)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => exportToCSV(reportData.recentActivity, "recent-activity"),
            className: "btn-secondary flex items-center space-x-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Export" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "min-w-full divide-y divide-gray-200 dark:divide-gray-700", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-gray-50 dark:bg-gray-700", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider", children: "Table" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider", children: "Action" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider", children: "Count" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider", children: "Last Activity" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700", children: reportData.recentActivity.map((item, index2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100", children: item.table_name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `px-2 py-1 text-xs font-medium rounded-full ${item.action === "CREATE" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" : item.action === "UPDATE" ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" : item.action === "DELETE" ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300" : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"}`, children: item.action }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100", children: item.count }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100", children: new Date(item.last_activity).toLocaleString() })
        ] }, index2)) })
      ] }) })
    ] })
  ] });
}
__name(Reports, "Reports");
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, {});
  }
  if (!user) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: "/login", replace: true });
  }
  return children;
}
__name(ProtectedRoute, "ProtectedRoute");
function AppRoutes() {
  const { user } = useAuth();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Routes, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/login", element: user ? /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: "/", replace: true }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Login, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/", element: /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Dashboard, {}) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/companies", element: /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Companies, {}) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/product-groups", element: /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProductGroups, {}) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/products", element: /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Products, {}) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/customer-groups", element: /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CustomerGroups, {}) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/customers", element: /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Customers, {}) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/audit-trail", element: /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AuditTrail, {}) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/reports", element: /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Reports, {}) }) }) })
  ] });
}
__name(AppRoutes, "AppRoutes");
function App() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(BrowserRouter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AuthProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DatabaseProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-gray-50 dark:bg-gray-900", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AppRoutes, {}) }) }) }) });
}
__name(App, "App");
const index = "";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1
    }
  }
});
client.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(React.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsx(App, {}) }) })
);
