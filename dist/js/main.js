(() => {
  // node_modules/lucide/dist/esm/createElement.js
  var createElement = (tag, attrs, children = []) => {
    const element = document.createElementNS("http://www.w3.org/2000/svg", tag);
    Object.keys(attrs).forEach((name) => {
      element.setAttribute(name, String(attrs[name]));
    });
    if (children.length) {
      children.forEach((child) => {
        const childElement = createElement(...child);
        element.appendChild(childElement);
      });
    }
    return element;
  };
  var createElement$1 = ([tag, attrs, children]) => createElement(tag, attrs, children);

  // node_modules/lucide/dist/esm/replaceElement.js
  var getAttrs = (element) => Array.from(element.attributes).reduce((attrs, attr) => {
    attrs[attr.name] = attr.value;
    return attrs;
  }, {});
  var getClassNames = (attrs) => {
    if (typeof attrs === "string")
      return attrs;
    if (!attrs || !attrs.class)
      return "";
    if (attrs.class && typeof attrs.class === "string") {
      return attrs.class.split(" ");
    }
    if (attrs.class && Array.isArray(attrs.class)) {
      return attrs.class;
    }
    return "";
  };
  var combineClassNames = (arrayOfClassnames) => {
    const classNameArray = arrayOfClassnames.flatMap(getClassNames);
    return classNameArray.map((classItem) => classItem.trim()).filter(Boolean).filter((value, index, self2) => self2.indexOf(value) === index).join(" ");
  };
  var toPascalCase = (string) => string.replace(/(\w)(\w*)(_|-|\s*)/g, (g0, g1, g2) => g1.toUpperCase() + g2.toLowerCase());
  var replaceElement = (element, { nameAttr, icons, attrs }) => {
    const iconName = element.getAttribute(nameAttr);
    if (iconName == null)
      return;
    const ComponentName = toPascalCase(iconName);
    const iconNode = icons[ComponentName];
    if (!iconNode) {
      return console.warn(
        `${element.outerHTML} icon name was not found in the provided icons object.`
      );
    }
    const elementAttrs = getAttrs(element);
    const [tag, iconAttributes, children] = iconNode;
    const iconAttrs = {
      ...iconAttributes,
      "data-lucide": iconName,
      ...attrs,
      ...elementAttrs
    };
    const classNames = combineClassNames(["lucide", `lucide-${iconName}`, elementAttrs, attrs]);
    if (classNames) {
      Object.assign(iconAttrs, {
        class: classNames
      });
    }
    const svgElement = createElement$1([tag, iconAttrs, children]);
    return element.parentNode?.replaceChild(svgElement, element);
  };

  // node_modules/lucide/dist/esm/defaultAttributes.js
  var defaultAttributes = {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": 2,
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  };

  // node_modules/lucide/dist/esm/icons/link.js
  var Link = [
    "svg",
    defaultAttributes,
    [
      ["path", { d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" }],
      ["path", { d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" }]
    ]
  ];

  // node_modules/lucide/dist/esm/lucide.js
  var createIcons = ({ icons = {}, nameAttr = "data-lucide", attrs = {} } = {}) => {
    if (!Object.values(icons).length) {
      throw new Error(
        "Please provide an icons object.\nIf you want to use all the icons you can import it like:\n `import { createIcons, icons } from 'lucide';\nlucide.createIcons({icons});`"
      );
    }
    if (typeof document === "undefined") {
      throw new Error("`createIcons()` only works in a browser environment.");
    }
    const elementsToReplace = document.querySelectorAll(`[${nameAttr}]`);
    Array.from(elementsToReplace).forEach(
      (element) => replaceElement(element, { nameAttr, icons, attrs })
    );
    if (nameAttr === "data-lucide") {
      const deprecatedElements = document.querySelectorAll("[icon-name]");
      if (deprecatedElements.length > 0) {
        console.warn(
          "[Lucide] Some icons were found with the now deprecated icon-name attribute. These will still be replaced for backwards compatibility, but will no longer be supported in v1.0 and you should switch to data-lucide"
        );
        Array.from(deprecatedElements).forEach(
          (element) => replaceElement(element, { nameAttr: "icon-name", icons, attrs })
        );
      }
    }
  };

  // ns-hugo:/home/emma/Code/Projects/hugo-blog/themes/Alexandria/assets/js/headings.js
  function build_headings() {
    let root = document.querySelector("article.link-headings");
    if (root == null) {
      return;
    }
    const headings = root.querySelectorAll("h2, h3, h4, h5, h6");
    headings.forEach((heading) => {
      const id = heading.id;
      if (!id) {
        console.warn(`Heading "${heading.outerHTML}" does not have an id. Skipping.`);
        return;
      }
      if (heading.parentElement != null && heading.parentElement.tagName == "a") {
        if (heading.parentElement.href = `#${id}`) {
          console.warn(`Heading "${heading.outerHTML}" already has an <a> parent with href = #${id}, skipping`);
          return;
        }
      }
      const icon = document.createElement("i");
      icon.setAttribute("data-lucide", "link");
      const anchor = document.createElement("a");
      anchor.appendChild(icon);
      anchor.href = `#${id}`;
      anchor.classList.add("heading-link");
      while (heading.firstChild) {
        anchor.appendChild(heading.firstChild);
      }
      heading.appendChild(anchor);
    });
    createIcons({
      icons: {
        Link
      }
    });
  }
  build_headings();

  // node_modules/delegate-it/delegate.js
  var ledger = /* @__PURE__ */ new WeakMap();
  function editLedger(wanted, baseElement, callback, setup) {
    if (!wanted && !ledger.has(baseElement)) {
      return false;
    }
    const elementMap = ledger.get(baseElement) ?? /* @__PURE__ */ new WeakMap();
    ledger.set(baseElement, elementMap);
    const setups = elementMap.get(callback) ?? /* @__PURE__ */ new Set();
    elementMap.set(callback, setups);
    const existed = setups.has(setup);
    if (wanted) {
      setups.add(setup);
    } else {
      setups.delete(setup);
    }
    return existed && wanted;
  }
  function safeClosest(event, selector) {
    let target = event.target;
    if (target instanceof Text) {
      target = target.parentElement;
    }
    if (target instanceof Element && event.currentTarget instanceof Element) {
      const closest = target.closest(selector);
      if (closest && event.currentTarget.contains(closest)) {
        return closest;
      }
    }
  }
  function delegate(selector, type, callback, options = {}) {
    const { signal, base = document } = options;
    if (signal?.aborted) {
      return;
    }
    const { once, ...nativeListenerOptions } = options;
    const baseElement = base instanceof Document ? base.documentElement : base;
    const capture = Boolean(typeof options === "object" ? options.capture : options);
    const listenerFunction = (event) => {
      const delegateTarget = safeClosest(event, String(selector));
      if (delegateTarget) {
        const delegateEvent = Object.assign(event, { delegateTarget });
        callback.call(baseElement, delegateEvent);
        if (once) {
          baseElement.removeEventListener(type, listenerFunction, nativeListenerOptions);
          editLedger(false, baseElement, callback, setup);
        }
      }
    };
    const setup = JSON.stringify({ selector, type, capture });
    const isAlreadyListening = editLedger(true, baseElement, callback, setup);
    if (!isAlreadyListening) {
      baseElement.addEventListener(type, listenerFunction, nativeListenerOptions);
    }
    signal?.addEventListener("abort", () => {
      editLedger(false, baseElement, callback, setup);
    });
  }
  var delegate_default = delegate;

  // node_modules/swup/dist/Swup.modern.js
  function i() {
    return i = Object.assign ? Object.assign.bind() : function(t) {
      for (var e = 1; e < arguments.length; e++) {
        var i2 = arguments[e];
        for (var s2 in i2) ({}).hasOwnProperty.call(i2, s2) && (t[s2] = i2[s2]);
      }
      return t;
    }, i.apply(null, arguments);
  }
  var s = (t, e) => String(t).toLowerCase().replace(/[\s/_.]+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-").replace(/^-+|-+$/g, "") || e || "";
  var n = ({ hash: t } = {}) => window.location.pathname + window.location.search + (t ? window.location.hash : "");
  var o = (t, e = {}) => {
    const s2 = i({ url: t = t || n({ hash: true }), random: Math.random(), source: "swup" }, e);
    window.history.pushState(s2, "", t);
  };
  var r = (t = null, e = {}) => {
    t = t || n({ hash: true });
    const s2 = i({}, window.history.state || {}, { url: t, random: Math.random(), source: "swup" }, e);
    window.history.replaceState(s2, "", t);
  };
  var a = (e, s2, n2, o2) => {
    const r2 = new AbortController();
    return o2 = i({}, o2, { signal: r2.signal }), delegate_default(e, s2, n2, o2), { destroy: () => r2.abort() };
  };
  var l = class _l extends URL {
    constructor(t, e = document.baseURI) {
      super(t.toString(), e), Object.setPrototypeOf(this, _l.prototype);
    }
    get url() {
      return this.pathname + this.search;
    }
    static fromElement(t) {
      const e = t.getAttribute("href") || t.getAttribute("xlink:href") || "";
      return new _l(e);
    }
    static fromUrl(t) {
      return new _l(t);
    }
  };
  var c = class extends Error {
    constructor(t, e) {
      super(t), this.url = void 0, this.status = void 0, this.aborted = void 0, this.timedOut = void 0, this.name = "FetchError", this.url = e.url, this.status = e.status, this.aborted = e.aborted || false, this.timedOut = e.timedOut || false;
    }
  };
  async function u(t, e = {}) {
    var s2;
    t = l.fromUrl(t).url;
    const { visit: n2 = this.visit } = e, o2 = i({}, this.options.requestHeaders, e.headers), r2 = null != (s2 = e.timeout) ? s2 : this.options.timeout, a2 = new AbortController(), { signal: h } = a2;
    e = i({}, e, { headers: o2, signal: h });
    let u2, d2 = false, p2 = null;
    r2 && r2 > 0 && (p2 = setTimeout(() => {
      d2 = true, a2.abort("timeout");
    }, r2));
    try {
      u2 = await this.hooks.call("fetch:request", n2, { url: t, options: e }, (t2, { url: e2, options: i2 }) => fetch(e2, i2)), p2 && clearTimeout(p2);
    } catch (e2) {
      if (d2) throw this.hooks.call("fetch:timeout", n2, { url: t }), new c(`Request timed out: ${t}`, { url: t, timedOut: d2 });
      if ("AbortError" === (null == e2 ? void 0 : e2.name) || h.aborted) throw new c(`Request aborted: ${t}`, { url: t, aborted: true });
      throw e2;
    }
    const { status: m2, url: w2 } = u2, f2 = await u2.text();
    if (500 === m2) throw this.hooks.call("fetch:error", n2, { status: m2, response: u2, url: w2 }), new c(`Server error: ${w2}`, { status: m2, url: w2 });
    if (!f2) throw new c(`Empty response: ${w2}`, { status: m2, url: w2 });
    const { url: g2 } = l.fromUrl(w2), v = { url: g2, html: f2 };
    return !n2.cache.write || e.method && "GET" !== e.method || t !== g2 || this.cache.set(v.url, v), v;
  }
  var d = class {
    constructor(t) {
      this.swup = void 0, this.pages = /* @__PURE__ */ new Map(), this.swup = t;
    }
    get size() {
      return this.pages.size;
    }
    get all() {
      const t = /* @__PURE__ */ new Map();
      return this.pages.forEach((e, s2) => {
        t.set(s2, i({}, e));
      }), t;
    }
    has(t) {
      return this.pages.has(this.resolve(t));
    }
    get(t) {
      const e = this.pages.get(this.resolve(t));
      return e ? i({}, e) : e;
    }
    set(t, e) {
      e = i({}, e, { url: t = this.resolve(t) }), this.pages.set(t, e), this.swup.hooks.callSync("cache:set", void 0, { page: e });
    }
    update(t, e) {
      t = this.resolve(t);
      const s2 = i({}, this.get(t), e, { url: t });
      this.pages.set(t, s2);
    }
    delete(t) {
      this.pages.delete(this.resolve(t));
    }
    clear() {
      this.pages.clear(), this.swup.hooks.callSync("cache:clear", void 0, void 0);
    }
    prune(t) {
      this.pages.forEach((e, i2) => {
        t(i2, e) && this.delete(i2);
      });
    }
    resolve(t) {
      const { url: e } = l.fromUrl(t);
      return this.swup.resolveUrl(e);
    }
  };
  var p = (t, e = document) => e.querySelector(t);
  var m = (t, e = document) => Array.from(e.querySelectorAll(t));
  var w = () => new Promise((t) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        t();
      });
    });
  });
  function f(t) {
    return !!t && ("object" == typeof t || "function" == typeof t) && "function" == typeof t.then;
  }
  function g(t, e = []) {
    return new Promise((i2, s2) => {
      const n2 = t(...e);
      f(n2) ? n2.then(i2, s2) : i2(n2);
    });
  }
  function y(t, e) {
    const i2 = null == t ? void 0 : t.closest(`[${e}]`);
    return null != i2 && i2.hasAttribute(e) ? (null == i2 ? void 0 : i2.getAttribute(e)) || true : void 0;
  }
  var k = class {
    constructor(t) {
      this.swup = void 0, this.swupClasses = ["to-", "is-changing", "is-rendering", "is-popstate", "is-animating", "is-leaving"], this.swup = t;
    }
    get selectors() {
      const { scope: t } = this.swup.visit.animation;
      return "containers" === t ? this.swup.visit.containers : "html" === t ? ["html"] : Array.isArray(t) ? t : [];
    }
    get selector() {
      return this.selectors.join(",");
    }
    get targets() {
      return this.selector.trim() ? m(this.selector) : [];
    }
    add(...t) {
      this.targets.forEach((e) => e.classList.add(...t));
    }
    remove(...t) {
      this.targets.forEach((e) => e.classList.remove(...t));
    }
    clear() {
      this.targets.forEach((t) => {
        const e = t.className.split(" ").filter((t2) => this.isSwupClass(t2));
        t.classList.remove(...e);
      });
    }
    isSwupClass(t) {
      return this.swupClasses.some((e) => t.startsWith(e));
    }
  };
  var b = class {
    constructor(t, e) {
      this.id = void 0, this.state = void 0, this.from = void 0, this.to = void 0, this.containers = void 0, this.animation = void 0, this.trigger = void 0, this.cache = void 0, this.history = void 0, this.scroll = void 0, this.meta = void 0;
      const { to: i2, from: s2, hash: n2, el: o2, event: r2 } = e;
      this.id = Math.random(), this.state = 1, this.from = { url: null != s2 ? s2 : t.location.url, hash: t.location.hash }, this.to = { url: i2, hash: n2 }, this.containers = t.options.containers, this.animation = { animate: true, wait: false, name: void 0, native: t.options.native, scope: t.options.animationScope, selector: t.options.animationSelector }, this.trigger = { el: o2, event: r2 }, this.cache = { read: t.options.cache, write: t.options.cache }, this.history = { action: "push", popstate: false, direction: void 0 }, this.scroll = { reset: true, target: void 0 }, this.meta = {};
    }
    advance(t) {
      this.state < t && (this.state = t);
    }
    abort() {
      this.state = 8;
    }
    get done() {
      return this.state >= 7;
    }
  };
  function S(t) {
    return new b(this, t);
  }
  var E = class {
    constructor(t) {
      this.swup = void 0, this.registry = /* @__PURE__ */ new Map(), this.hooks = ["animation:out:start", "animation:out:await", "animation:out:end", "animation:in:start", "animation:in:await", "animation:in:end", "animation:skip", "cache:clear", "cache:set", "content:replace", "content:scroll", "enable", "disable", "fetch:request", "fetch:error", "fetch:timeout", "history:popstate", "link:click", "link:self", "link:anchor", "link:newtab", "page:load", "page:view", "scroll:top", "scroll:anchor", "visit:start", "visit:transition", "visit:abort", "visit:end"], this.swup = t, this.init();
    }
    init() {
      this.hooks.forEach((t) => this.create(t));
    }
    create(t) {
      this.registry.has(t) || this.registry.set(t, /* @__PURE__ */ new Map());
    }
    exists(t) {
      return this.registry.has(t);
    }
    get(t) {
      const e = this.registry.get(t);
      if (e) return e;
      console.error(`Unknown hook '${t}'`);
    }
    clear() {
      this.registry.forEach((t) => t.clear());
    }
    on(t, e, s2 = {}) {
      const n2 = this.get(t);
      if (!n2) return console.warn(`Hook '${t}' not found.`), () => {
      };
      const o2 = i({}, s2, { id: n2.size + 1, hook: t, handler: e });
      return n2.set(e, o2), () => this.off(t, e);
    }
    before(t, e, s2 = {}) {
      return this.on(t, e, i({}, s2, { before: true }));
    }
    replace(t, e, s2 = {}) {
      return this.on(t, e, i({}, s2, { replace: true }));
    }
    once(t, e, s2 = {}) {
      return this.on(t, e, i({}, s2, { once: true }));
    }
    off(t, e) {
      const i2 = this.get(t);
      i2 && e ? i2.delete(e) || console.warn(`Handler for hook '${t}' not found.`) : i2 && i2.clear();
    }
    async call(t, e, i2, s2) {
      const [n2, o2, r2] = this.parseCallArgs(t, e, i2, s2), { before: a2, handler: l2, after: h } = this.getHandlers(t, r2);
      await this.run(a2, n2, o2);
      const [c2] = await this.run(l2, n2, o2, true);
      return await this.run(h, n2, o2), this.dispatchDomEvent(t, n2, o2), c2;
    }
    callSync(t, e, i2, s2) {
      const [n2, o2, r2] = this.parseCallArgs(t, e, i2, s2), { before: a2, handler: l2, after: h } = this.getHandlers(t, r2);
      this.runSync(a2, n2, o2);
      const [c2] = this.runSync(l2, n2, o2, true);
      return this.runSync(h, n2, o2), this.dispatchDomEvent(t, n2, o2), c2;
    }
    parseCallArgs(t, e, i2, s2) {
      return e instanceof b || "object" != typeof e && "function" != typeof i2 ? [e, i2, s2] : [void 0, e, i2];
    }
    async run(t, e = this.swup.visit, i2, s2 = false) {
      const n2 = [];
      for (const { hook: o2, handler: r2, defaultHandler: a2, once: l2 } of t) if (null == e || !e.done) {
        l2 && this.off(o2, r2);
        try {
          const t2 = await g(r2, [e, i2, a2]);
          n2.push(t2);
        } catch (t2) {
          if (s2) throw t2;
          console.error(`Error in hook '${o2}':`, t2);
        }
      }
      return n2;
    }
    runSync(t, e = this.swup.visit, i2, s2 = false) {
      const n2 = [];
      for (const { hook: o2, handler: r2, defaultHandler: a2, once: l2 } of t) if (null == e || !e.done) {
        l2 && this.off(o2, r2);
        try {
          const t2 = r2(e, i2, a2);
          n2.push(t2), f(t2) && console.warn(`Swup will not await Promises in handler for synchronous hook '${o2}'.`);
        } catch (t2) {
          if (s2) throw t2;
          console.error(`Error in hook '${o2}':`, t2);
        }
      }
      return n2;
    }
    getHandlers(t, e) {
      const i2 = this.get(t);
      if (!i2) return { found: false, before: [], handler: [], after: [], replaced: false };
      const s2 = Array.from(i2.values()), n2 = this.sortRegistrations, o2 = s2.filter(({ before: t2, replace: e2 }) => t2 && !e2).sort(n2), r2 = s2.filter(({ replace: t2 }) => t2).filter((t2) => true).sort(n2), a2 = s2.filter(({ before: t2, replace: e2 }) => !t2 && !e2).sort(n2), l2 = r2.length > 0;
      let h = [];
      if (e && (h = [{ id: 0, hook: t, handler: e }], l2)) {
        const i3 = r2.length - 1, { handler: s3, once: n3 } = r2[i3], o3 = (t2) => {
          const i4 = r2[t2 - 1];
          return i4 ? (e2, s4) => i4.handler(e2, s4, o3(t2 - 1)) : e;
        };
        h = [{ id: 0, hook: t, once: n3, handler: s3, defaultHandler: o3(i3) }];
      }
      return { found: true, before: o2, handler: h, after: a2, replaced: l2 };
    }
    sortRegistrations(t, e) {
      var i2, s2;
      return (null != (i2 = t.priority) ? i2 : 0) - (null != (s2 = e.priority) ? s2 : 0) || t.id - e.id || 0;
    }
    dispatchDomEvent(t, e, i2) {
      if (null != e && e.done) return;
      const s2 = { hook: t, args: i2, visit: e || this.swup.visit };
      document.dispatchEvent(new CustomEvent("swup:any", { detail: s2, bubbles: true })), document.dispatchEvent(new CustomEvent(`swup:${t}`, { detail: s2, bubbles: true }));
    }
    parseName(t) {
      const [e, ...s2] = t.split(".");
      return [e, s2.reduce((t2, e2) => i({}, t2, { [e2]: true }), {})];
    }
  };
  var C = (t) => {
    if (t && "#" === t.charAt(0) && (t = t.substring(1)), !t) return null;
    const e = decodeURIComponent(t);
    let i2 = document.getElementById(t) || document.getElementById(e) || p(`a[name='${CSS.escape(t)}']`) || p(`a[name='${CSS.escape(e)}']`);
    return i2 || "top" !== t || (i2 = document.body), i2;
  };
  var U = "transition";
  var P = "animation";
  async function $({ selector: t, elements: e }) {
    if (false === t && !e) return;
    let i2 = [];
    if (e) i2 = Array.from(e);
    else if (t && (i2 = m(t, document.body), !i2.length)) return void console.warn(`[swup] No elements found matching animationSelector \`${t}\``);
    const s2 = i2.map((t2) => function(t3) {
      const { type: e2, timeout: i3, propCount: s3 } = function(t4) {
        const e3 = window.getComputedStyle(t4), i4 = x(e3, `${U}Delay`), s4 = x(e3, `${U}Duration`), n2 = A(i4, s4), o2 = x(e3, `${P}Delay`), r2 = x(e3, `${P}Duration`), a2 = A(o2, r2), l2 = Math.max(n2, a2), h = l2 > 0 ? n2 > a2 ? U : P : null;
        return { type: h, timeout: l2, propCount: h ? h === U ? s4.length : r2.length : 0 };
      }(t3);
      return !(!e2 || !i3) && new Promise((n2) => {
        const o2 = `${e2}end`, r2 = performance.now();
        let a2 = 0;
        const l2 = () => {
          t3.removeEventListener(o2, h), n2();
        }, h = (e3) => {
          e3.target === t3 && ((performance.now() - r2) / 1e3 < e3.elapsedTime || ++a2 >= s3 && l2());
        };
        setTimeout(() => {
          a2 < s3 && l2();
        }, i3 + 1), t3.addEventListener(o2, h);
      });
    }(t2));
    s2.filter(Boolean).length > 0 ? await Promise.all(s2) : t && console.warn(`[swup] No CSS animation duration defined on elements matching \`${t}\``);
  }
  function x(t, e) {
    return (t[e] || "").split(", ");
  }
  function A(t, e) {
    for (; t.length < e.length; ) t = t.concat(t);
    return Math.max(...e.map((e2, i2) => H(e2) + H(t[i2])));
  }
  function H(t) {
    return 1e3 * parseFloat(t);
  }
  function V(t, e = {}, s2 = {}) {
    if ("string" != typeof t) throw new Error("swup.navigate() requires a URL parameter");
    if (this.shouldIgnoreVisit(t, { el: s2.el, event: s2.event })) return void window.location.assign(t);
    const { url: n2, hash: o2 } = l.fromUrl(t), r2 = this.createVisit(i({}, s2, { to: n2, hash: o2 }));
    this.performNavigation(r2, e);
  }
  async function I(t, e = {}) {
    if (this.navigating) {
      if (this.visit.state >= 6) return t.state = 2, void (this.onVisitEnd = () => this.performNavigation(t, e));
      await this.hooks.call("visit:abort", this.visit, void 0), delete this.visit.to.document, this.visit.state = 8;
    }
    this.navigating = true, this.visit = t;
    const { el: i2 } = t.trigger;
    e.referrer = e.referrer || this.location.url, false === e.animate && (t.animation.animate = false), t.animation.animate || this.classes.clear();
    const n2 = e.history || y(i2, "data-swup-history");
    "string" == typeof n2 && ["push", "replace"].includes(n2) && (t.history.action = n2);
    const a2 = e.animation || y(i2, "data-swup-animation");
    var h, c2;
    "string" == typeof a2 && (t.animation.name = a2), t.meta = e.meta || {}, "object" == typeof e.cache ? (t.cache.read = null != (h = e.cache.read) ? h : t.cache.read, t.cache.write = null != (c2 = e.cache.write) ? c2 : t.cache.write) : void 0 !== e.cache && (t.cache = { read: !!e.cache, write: !!e.cache }), delete e.cache;
    try {
      await this.hooks.call("visit:start", t, void 0), t.state = 3;
      const i3 = this.hooks.call("page:load", t, { options: e }, async (t2, e2) => {
        let i4;
        return t2.cache.read && (i4 = this.cache.get(t2.to.url)), e2.page = i4 || await this.fetchPage(t2.to.url, e2.options), e2.cache = !!i4, e2.page;
      });
      i3.then(({ html: e2 }) => {
        t.advance(5), t.to.html = e2, t.to.document = new DOMParser().parseFromString(e2, "text/html");
      });
      const n3 = t.to.url + t.to.hash;
      if (t.history.popstate || ("replace" === t.history.action || t.to.url === this.location.url ? r(n3) : (this.currentHistoryIndex++, o(n3, { index: this.currentHistoryIndex }))), this.location = l.fromUrl(n3), t.history.popstate && this.classes.add("is-popstate"), t.animation.name && this.classes.add(`to-${s(t.animation.name)}`), t.animation.wait && await i3, t.done) return;
      if (await this.hooks.call("visit:transition", t, void 0, async () => {
        if (!t.animation.animate) return await this.hooks.call("animation:skip", void 0), void await this.renderPage(t, await i3);
        t.advance(4), await this.animatePageOut(t), t.animation.native && document.startViewTransition ? await document.startViewTransition(async () => await this.renderPage(t, await i3)).finished : await this.renderPage(t, await i3), await this.animatePageIn(t);
      }), t.done) return;
      await this.hooks.call("visit:end", t, void 0, () => this.classes.clear()), t.state = 7, this.navigating = false, this.onVisitEnd && (this.onVisitEnd(), this.onVisitEnd = void 0);
    } catch (e2) {
      if (!e2 || null != e2 && e2.aborted) return void (t.state = 8);
      t.state = 9, console.error(e2), this.options.skipPopStateHandling = () => (window.location.assign(t.to.url + t.to.hash), true), window.history.back();
    } finally {
      delete t.to.document;
    }
  }
  var L = async function(t) {
    await this.hooks.call("animation:out:start", t, void 0, () => {
      this.classes.add("is-changing", "is-animating", "is-leaving");
    }), await this.hooks.call("animation:out:await", t, { skip: false }, (t2, { skip: e }) => {
      if (!e) return this.awaitAnimations({ selector: t2.animation.selector });
    }), await this.hooks.call("animation:out:end", t, void 0);
  };
  var q = function(t) {
    var e;
    const i2 = t.to.document;
    if (!i2) return false;
    const s2 = (null == (e = i2.querySelector("title")) ? void 0 : e.innerText) || "";
    document.title = s2;
    const n2 = m('[data-swup-persist]:not([data-swup-persist=""])'), o2 = t.containers.map((t2) => {
      const e2 = document.querySelector(t2), s3 = i2.querySelector(t2);
      return e2 && s3 ? (e2.replaceWith(s3.cloneNode(true)), true) : (e2 || console.warn(`[swup] Container missing in current document: ${t2}`), s3 || console.warn(`[swup] Container missing in incoming document: ${t2}`), false);
    }).filter(Boolean);
    return n2.forEach((t2) => {
      const e2 = t2.getAttribute("data-swup-persist"), i3 = p(`[data-swup-persist="${e2}"]`);
      i3 && i3 !== t2 && i3.replaceWith(t2);
    }), o2.length === t.containers.length;
  };
  var R = function(t) {
    const e = { behavior: "auto" }, { target: s2, reset: n2 } = t.scroll, o2 = null != s2 ? s2 : t.to.hash;
    let r2 = false;
    return o2 && (r2 = this.hooks.callSync("scroll:anchor", t, { hash: o2, options: e }, (t2, { hash: e2, options: i2 }) => {
      const s3 = this.getAnchorElement(e2);
      return s3 && s3.scrollIntoView(i2), !!s3;
    })), n2 && !r2 && (r2 = this.hooks.callSync("scroll:top", t, { options: e }, (t2, { options: e2 }) => (window.scrollTo(i({ top: 0, left: 0 }, e2)), true))), r2;
  };
  var T = async function(t) {
    if (t.done) return;
    const e = this.hooks.call("animation:in:await", t, { skip: false }, (t2, { skip: e2 }) => {
      if (!e2) return this.awaitAnimations({ selector: t2.animation.selector });
    });
    await w(), await this.hooks.call("animation:in:start", t, void 0, () => {
      this.classes.remove("is-animating");
    }), await e, await this.hooks.call("animation:in:end", t, void 0);
  };
  var N = async function(t, e) {
    if (t.done) return;
    t.advance(6);
    const { url: i2 } = e;
    this.isSameResolvedUrl(n(), i2) || (r(i2), this.location = l.fromUrl(i2), t.to.url = this.location.url, t.to.hash = this.location.hash), await this.hooks.call("content:replace", t, { page: e }, (t2, {}) => {
      if (this.classes.remove("is-leaving"), t2.animation.animate && this.classes.add("is-rendering"), !this.replaceContent(t2)) throw new Error("[swup] Container mismatch, aborting");
      t2.animation.animate && (this.classes.add("is-changing", "is-animating", "is-rendering"), t2.animation.name && this.classes.add(`to-${s(t2.animation.name)}`));
    }), await this.hooks.call("content:scroll", t, void 0, () => this.scrollToContent(t)), await this.hooks.call("page:view", t, { url: this.location.url, title: document.title });
  };
  var O = function(t) {
    var e;
    if (e = t, Boolean(null == e ? void 0 : e.isSwupPlugin)) {
      if (t.swup = this, !t._checkRequirements || t._checkRequirements()) return t._beforeMount && t._beforeMount(), t.mount(), this.plugins.push(t), this.plugins;
    } else console.error("Not a swup plugin instance", t);
  };
  function D(t) {
    const e = this.findPlugin(t);
    if (e) return e.unmount(), e._afterUnmount && e._afterUnmount(), this.plugins = this.plugins.filter((t2) => t2 !== e), this.plugins;
    console.error("No such plugin", e);
  }
  function M(t) {
    return this.plugins.find((e) => e === t || e.name === t || e.name === `Swup${String(t)}`);
  }
  function W(t) {
    if ("function" != typeof this.options.resolveUrl) return console.warn("[swup] options.resolveUrl expects a callback function."), t;
    const e = this.options.resolveUrl(t);
    return e && "string" == typeof e ? e.startsWith("//") || e.startsWith("http") ? (console.warn("[swup] options.resolveUrl needs to return a relative url"), t) : e : (console.warn("[swup] options.resolveUrl needs to return a url"), t);
  }
  function B(t, e) {
    return this.resolveUrl(t) === this.resolveUrl(e);
  }
  var j = { animateHistoryBrowsing: false, animationSelector: '[class*="transition-"]', animationScope: "html", cache: true, containers: ["#swup"], hooks: {}, ignoreVisit: (t, { el: e } = {}) => !(null == e || !e.closest("[data-no-swup]")), linkSelector: "a[href]", linkToSelf: "scroll", native: false, plugins: [], resolveUrl: (t) => t, requestHeaders: { "X-Requested-With": "swup", Accept: "text/html, application/xhtml+xml" }, skipPopStateHandling: (t) => {
    var e;
    return "swup" !== (null == (e = t.state) ? void 0 : e.source);
  }, timeout: 0 };
  var _ = class {
    get currentPageUrl() {
      return this.location.url;
    }
    constructor(t = {}) {
      var e, s2;
      this.version = "4.8.1", this.options = void 0, this.defaults = j, this.plugins = [], this.visit = void 0, this.cache = void 0, this.hooks = void 0, this.classes = void 0, this.location = l.fromUrl(window.location.href), this.currentHistoryIndex = void 0, this.clickDelegate = void 0, this.navigating = false, this.onVisitEnd = void 0, this.use = O, this.unuse = D, this.findPlugin = M, this.log = () => {
      }, this.navigate = V, this.performNavigation = I, this.createVisit = S, this.delegateEvent = a, this.fetchPage = u, this.awaitAnimations = $, this.renderPage = N, this.replaceContent = q, this.animatePageIn = T, this.animatePageOut = L, this.scrollToContent = R, this.getAnchorElement = C, this.getCurrentUrl = n, this.resolveUrl = W, this.isSameResolvedUrl = B, this.options = i({}, this.defaults, t), this.handleLinkClick = this.handleLinkClick.bind(this), this.handlePopState = this.handlePopState.bind(this), this.cache = new d(this), this.classes = new k(this), this.hooks = new E(this), this.visit = this.createVisit({ to: "" }), this.currentHistoryIndex = null != (e = null == (s2 = window.history.state) ? void 0 : s2.index) ? e : 1, this.enable();
    }
    async enable() {
      var t;
      const { linkSelector: e } = this.options;
      this.clickDelegate = this.delegateEvent(e, "click", this.handleLinkClick), window.addEventListener("popstate", this.handlePopState), this.options.animateHistoryBrowsing && (window.history.scrollRestoration = "manual"), this.options.native = this.options.native && !!document.startViewTransition, this.options.plugins.forEach((t2) => this.use(t2));
      for (const [t2, e2] of Object.entries(this.options.hooks)) {
        const [i2, s2] = this.hooks.parseName(t2);
        this.hooks.on(i2, e2, s2);
      }
      "swup" !== (null == (t = window.history.state) ? void 0 : t.source) && r(null, { index: this.currentHistoryIndex }), await w(), await this.hooks.call("enable", void 0, void 0, () => {
        const t2 = document.documentElement;
        t2.classList.add("swup-enabled"), t2.classList.toggle("swup-native", this.options.native);
      });
    }
    async destroy() {
      this.clickDelegate.destroy(), window.removeEventListener("popstate", this.handlePopState), this.cache.clear(), this.options.plugins.forEach((t) => this.unuse(t)), await this.hooks.call("disable", void 0, void 0, () => {
        const t = document.documentElement;
        t.classList.remove("swup-enabled"), t.classList.remove("swup-native");
      }), this.hooks.clear();
    }
    shouldIgnoreVisit(t, { el: e, event: i2 } = {}) {
      const { origin: s2, url: n2, hash: o2 } = l.fromUrl(t);
      return s2 !== window.location.origin || !(!e || !this.triggerWillOpenNewWindow(e)) || !!this.options.ignoreVisit(n2 + o2, { el: e, event: i2 });
    }
    handleLinkClick(t) {
      const e = t.delegateTarget, { href: i2, url: s2, hash: n2 } = l.fromElement(e);
      if (this.shouldIgnoreVisit(i2, { el: e, event: t })) return;
      if (this.navigating && s2 === this.visit.to.url) return void t.preventDefault();
      const o2 = this.createVisit({ to: s2, hash: n2, el: e, event: t });
      t.metaKey || t.ctrlKey || t.shiftKey || t.altKey ? this.hooks.callSync("link:newtab", o2, { href: i2 }) : 0 === t.button && this.hooks.callSync("link:click", o2, { el: e, event: t }, () => {
        var e2;
        const i3 = null != (e2 = o2.from.url) ? e2 : "";
        t.preventDefault(), s2 && s2 !== i3 ? this.isSameResolvedUrl(s2, i3) || this.performNavigation(o2) : n2 ? this.hooks.callSync("link:anchor", o2, { hash: n2 }, () => {
          r(s2 + n2), this.scrollToContent(o2);
        }) : this.hooks.callSync("link:self", o2, void 0, () => {
          "navigate" === this.options.linkToSelf ? this.performNavigation(o2) : (r(s2), this.scrollToContent(o2));
        });
      });
    }
    handlePopState(t) {
      var e, i2, s2, o2;
      const r2 = null != (e = null == (i2 = t.state) ? void 0 : i2.url) ? e : window.location.href;
      if (this.options.skipPopStateHandling(t)) return;
      if (this.isSameResolvedUrl(n(), this.location.url)) return;
      const { url: a2, hash: h } = l.fromUrl(r2), c2 = this.createVisit({ to: a2, hash: h, event: t });
      c2.history.popstate = true;
      const u2 = null != (s2 = null == (o2 = t.state) ? void 0 : o2.index) ? s2 : 0;
      u2 && u2 !== this.currentHistoryIndex && (c2.history.direction = u2 - this.currentHistoryIndex > 0 ? "forwards" : "backwards", this.currentHistoryIndex = u2), c2.animation.animate = false, c2.scroll.reset = false, c2.scroll.target = false, this.options.animateHistoryBrowsing && (c2.animation.animate = true, c2.scroll.reset = true), this.hooks.callSync("history:popstate", c2, { event: t }, () => {
        this.performNavigation(c2);
      });
    }
    triggerWillOpenNewWindow(t) {
      return !!t.matches('[download], [target="_blank"]');
    }
  };

  // node_modules/animejs/lib/anime.es.js
  var defaultInstanceSettings = {
    update: null,
    begin: null,
    loopBegin: null,
    changeBegin: null,
    change: null,
    changeComplete: null,
    loopComplete: null,
    complete: null,
    loop: 1,
    direction: "normal",
    autoplay: true,
    timelineOffset: 0
  };
  var defaultTweenSettings = {
    duration: 1e3,
    delay: 0,
    endDelay: 0,
    easing: "easeOutElastic(1, .5)",
    round: 0
  };
  var validTransforms = ["translateX", "translateY", "translateZ", "rotate", "rotateX", "rotateY", "rotateZ", "scale", "scaleX", "scaleY", "scaleZ", "skew", "skewX", "skewY", "perspective", "matrix", "matrix3d"];
  var cache = {
    CSS: {},
    springs: {}
  };
  function minMax(val, min, max) {
    return Math.min(Math.max(val, min), max);
  }
  function stringContains(str, text) {
    return str.indexOf(text) > -1;
  }
  function applyArguments(func, args) {
    return func.apply(null, args);
  }
  var is = {
    arr: function(a2) {
      return Array.isArray(a2);
    },
    obj: function(a2) {
      return stringContains(Object.prototype.toString.call(a2), "Object");
    },
    pth: function(a2) {
      return is.obj(a2) && a2.hasOwnProperty("totalLength");
    },
    svg: function(a2) {
      return a2 instanceof SVGElement;
    },
    inp: function(a2) {
      return a2 instanceof HTMLInputElement;
    },
    dom: function(a2) {
      return a2.nodeType || is.svg(a2);
    },
    str: function(a2) {
      return typeof a2 === "string";
    },
    fnc: function(a2) {
      return typeof a2 === "function";
    },
    und: function(a2) {
      return typeof a2 === "undefined";
    },
    nil: function(a2) {
      return is.und(a2) || a2 === null;
    },
    hex: function(a2) {
      return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(a2);
    },
    rgb: function(a2) {
      return /^rgb/.test(a2);
    },
    hsl: function(a2) {
      return /^hsl/.test(a2);
    },
    col: function(a2) {
      return is.hex(a2) || is.rgb(a2) || is.hsl(a2);
    },
    key: function(a2) {
      return !defaultInstanceSettings.hasOwnProperty(a2) && !defaultTweenSettings.hasOwnProperty(a2) && a2 !== "targets" && a2 !== "keyframes";
    }
  };
  function parseEasingParameters(string) {
    var match = /\(([^)]+)\)/.exec(string);
    return match ? match[1].split(",").map(function(p2) {
      return parseFloat(p2);
    }) : [];
  }
  function spring(string, duration) {
    var params = parseEasingParameters(string);
    var mass = minMax(is.und(params[0]) ? 1 : params[0], 0.1, 100);
    var stiffness = minMax(is.und(params[1]) ? 100 : params[1], 0.1, 100);
    var damping = minMax(is.und(params[2]) ? 10 : params[2], 0.1, 100);
    var velocity = minMax(is.und(params[3]) ? 0 : params[3], 0.1, 100);
    var w0 = Math.sqrt(stiffness / mass);
    var zeta = damping / (2 * Math.sqrt(stiffness * mass));
    var wd = zeta < 1 ? w0 * Math.sqrt(1 - zeta * zeta) : 0;
    var a2 = 1;
    var b2 = zeta < 1 ? (zeta * w0 + -velocity) / wd : -velocity + w0;
    function solver(t) {
      var progress = duration ? duration * t / 1e3 : t;
      if (zeta < 1) {
        progress = Math.exp(-progress * zeta * w0) * (a2 * Math.cos(wd * progress) + b2 * Math.sin(wd * progress));
      } else {
        progress = (a2 + b2 * progress) * Math.exp(-progress * w0);
      }
      if (t === 0 || t === 1) {
        return t;
      }
      return 1 - progress;
    }
    function getDuration() {
      var cached = cache.springs[string];
      if (cached) {
        return cached;
      }
      var frame = 1 / 6;
      var elapsed = 0;
      var rest = 0;
      while (true) {
        elapsed += frame;
        if (solver(elapsed) === 1) {
          rest++;
          if (rest >= 16) {
            break;
          }
        } else {
          rest = 0;
        }
      }
      var duration2 = elapsed * frame * 1e3;
      cache.springs[string] = duration2;
      return duration2;
    }
    return duration ? solver : getDuration;
  }
  function steps(steps2) {
    if (steps2 === void 0) steps2 = 10;
    return function(t) {
      return Math.ceil(minMax(t, 1e-6, 1) * steps2) * (1 / steps2);
    };
  }
  var bezier = function() {
    var kSplineTableSize = 11;
    var kSampleStepSize = 1 / (kSplineTableSize - 1);
    function A2(aA1, aA2) {
      return 1 - 3 * aA2 + 3 * aA1;
    }
    function B2(aA1, aA2) {
      return 3 * aA2 - 6 * aA1;
    }
    function C2(aA1) {
      return 3 * aA1;
    }
    function calcBezier(aT, aA1, aA2) {
      return ((A2(aA1, aA2) * aT + B2(aA1, aA2)) * aT + C2(aA1)) * aT;
    }
    function getSlope(aT, aA1, aA2) {
      return 3 * A2(aA1, aA2) * aT * aT + 2 * B2(aA1, aA2) * aT + C2(aA1);
    }
    function binarySubdivide(aX, aA, aB, mX1, mX2) {
      var currentX, currentT, i2 = 0;
      do {
        currentT = aA + (aB - aA) / 2;
        currentX = calcBezier(currentT, mX1, mX2) - aX;
        if (currentX > 0) {
          aB = currentT;
        } else {
          aA = currentT;
        }
      } while (Math.abs(currentX) > 1e-7 && ++i2 < 10);
      return currentT;
    }
    function newtonRaphsonIterate(aX, aGuessT, mX1, mX2) {
      for (var i2 = 0; i2 < 4; ++i2) {
        var currentSlope = getSlope(aGuessT, mX1, mX2);
        if (currentSlope === 0) {
          return aGuessT;
        }
        var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
        aGuessT -= currentX / currentSlope;
      }
      return aGuessT;
    }
    function bezier2(mX1, mY1, mX2, mY2) {
      if (!(0 <= mX1 && mX1 <= 1 && 0 <= mX2 && mX2 <= 1)) {
        return;
      }
      var sampleValues = new Float32Array(kSplineTableSize);
      if (mX1 !== mY1 || mX2 !== mY2) {
        for (var i2 = 0; i2 < kSplineTableSize; ++i2) {
          sampleValues[i2] = calcBezier(i2 * kSampleStepSize, mX1, mX2);
        }
      }
      function getTForX(aX) {
        var intervalStart = 0;
        var currentSample = 1;
        var lastSample = kSplineTableSize - 1;
        for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
          intervalStart += kSampleStepSize;
        }
        --currentSample;
        var dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
        var guessForT = intervalStart + dist * kSampleStepSize;
        var initialSlope = getSlope(guessForT, mX1, mX2);
        if (initialSlope >= 1e-3) {
          return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
        } else if (initialSlope === 0) {
          return guessForT;
        } else {
          return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
        }
      }
      return function(x2) {
        if (mX1 === mY1 && mX2 === mY2) {
          return x2;
        }
        if (x2 === 0 || x2 === 1) {
          return x2;
        }
        return calcBezier(getTForX(x2), mY1, mY2);
      };
    }
    return bezier2;
  }();
  var penner = function() {
    var eases = { linear: function() {
      return function(t) {
        return t;
      };
    } };
    var functionEasings = {
      Sine: function() {
        return function(t) {
          return 1 - Math.cos(t * Math.PI / 2);
        };
      },
      Expo: function() {
        return function(t) {
          return t ? Math.pow(2, 10 * t - 10) : 0;
        };
      },
      Circ: function() {
        return function(t) {
          return 1 - Math.sqrt(1 - t * t);
        };
      },
      Back: function() {
        return function(t) {
          return t * t * (3 * t - 2);
        };
      },
      Bounce: function() {
        return function(t) {
          var pow2, b2 = 4;
          while (t < ((pow2 = Math.pow(2, --b2)) - 1) / 11) {
          }
          return 1 / Math.pow(4, 3 - b2) - 7.5625 * Math.pow((pow2 * 3 - 2) / 22 - t, 2);
        };
      },
      Elastic: function(amplitude, period) {
        if (amplitude === void 0) amplitude = 1;
        if (period === void 0) period = 0.5;
        var a2 = minMax(amplitude, 1, 10);
        var p2 = minMax(period, 0.1, 2);
        return function(t) {
          return t === 0 || t === 1 ? t : -a2 * Math.pow(2, 10 * (t - 1)) * Math.sin((t - 1 - p2 / (Math.PI * 2) * Math.asin(1 / a2)) * (Math.PI * 2) / p2);
        };
      }
    };
    var baseEasings = ["Quad", "Cubic", "Quart", "Quint"];
    baseEasings.forEach(function(name, i2) {
      functionEasings[name] = function() {
        return function(t) {
          return Math.pow(t, i2 + 2);
        };
      };
    });
    Object.keys(functionEasings).forEach(function(name) {
      var easeIn = functionEasings[name];
      eases["easeIn" + name] = easeIn;
      eases["easeOut" + name] = function(a2, b2) {
        return function(t) {
          return 1 - easeIn(a2, b2)(1 - t);
        };
      };
      eases["easeInOut" + name] = function(a2, b2) {
        return function(t) {
          return t < 0.5 ? easeIn(a2, b2)(t * 2) / 2 : 1 - easeIn(a2, b2)(t * -2 + 2) / 2;
        };
      };
      eases["easeOutIn" + name] = function(a2, b2) {
        return function(t) {
          return t < 0.5 ? (1 - easeIn(a2, b2)(1 - t * 2)) / 2 : (easeIn(a2, b2)(t * 2 - 1) + 1) / 2;
        };
      };
    });
    return eases;
  }();
  function parseEasings(easing, duration) {
    if (is.fnc(easing)) {
      return easing;
    }
    var name = easing.split("(")[0];
    var ease = penner[name];
    var args = parseEasingParameters(easing);
    switch (name) {
      case "spring":
        return spring(easing, duration);
      case "cubicBezier":
        return applyArguments(bezier, args);
      case "steps":
        return applyArguments(steps, args);
      default:
        return applyArguments(ease, args);
    }
  }
  function selectString(str) {
    try {
      var nodes = document.querySelectorAll(str);
      return nodes;
    } catch (e) {
      return;
    }
  }
  function filterArray(arr, callback) {
    var len = arr.length;
    var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
    var result = [];
    for (var i2 = 0; i2 < len; i2++) {
      if (i2 in arr) {
        var val = arr[i2];
        if (callback.call(thisArg, val, i2, arr)) {
          result.push(val);
        }
      }
    }
    return result;
  }
  function flattenArray(arr) {
    return arr.reduce(function(a2, b2) {
      return a2.concat(is.arr(b2) ? flattenArray(b2) : b2);
    }, []);
  }
  function toArray(o2) {
    if (is.arr(o2)) {
      return o2;
    }
    if (is.str(o2)) {
      o2 = selectString(o2) || o2;
    }
    if (o2 instanceof NodeList || o2 instanceof HTMLCollection) {
      return [].slice.call(o2);
    }
    return [o2];
  }
  function arrayContains(arr, val) {
    return arr.some(function(a2) {
      return a2 === val;
    });
  }
  function cloneObject(o2) {
    var clone = {};
    for (var p2 in o2) {
      clone[p2] = o2[p2];
    }
    return clone;
  }
  function replaceObjectProps(o1, o2) {
    var o3 = cloneObject(o1);
    for (var p2 in o1) {
      o3[p2] = o2.hasOwnProperty(p2) ? o2[p2] : o1[p2];
    }
    return o3;
  }
  function mergeObjects(o1, o2) {
    var o3 = cloneObject(o1);
    for (var p2 in o2) {
      o3[p2] = is.und(o1[p2]) ? o2[p2] : o1[p2];
    }
    return o3;
  }
  function rgbToRgba(rgbValue) {
    var rgb = /rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(rgbValue);
    return rgb ? "rgba(" + rgb[1] + ",1)" : rgbValue;
  }
  function hexToRgba(hexValue) {
    var rgx = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    var hex = hexValue.replace(rgx, function(m2, r3, g3, b3) {
      return r3 + r3 + g3 + g3 + b3 + b3;
    });
    var rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    var r2 = parseInt(rgb[1], 16);
    var g2 = parseInt(rgb[2], 16);
    var b2 = parseInt(rgb[3], 16);
    return "rgba(" + r2 + "," + g2 + "," + b2 + ",1)";
  }
  function hslToRgba(hslValue) {
    var hsl = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(hslValue) || /hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(hslValue);
    var h = parseInt(hsl[1], 10) / 360;
    var s2 = parseInt(hsl[2], 10) / 100;
    var l2 = parseInt(hsl[3], 10) / 100;
    var a2 = hsl[4] || 1;
    function hue2rgb2(p3, q3, t) {
      if (t < 0) {
        t += 1;
      }
      if (t > 1) {
        t -= 1;
      }
      if (t < 1 / 6) {
        return p3 + (q3 - p3) * 6 * t;
      }
      if (t < 1 / 2) {
        return q3;
      }
      if (t < 2 / 3) {
        return p3 + (q3 - p3) * (2 / 3 - t) * 6;
      }
      return p3;
    }
    var r2, g2, b2;
    if (s2 == 0) {
      r2 = g2 = b2 = l2;
    } else {
      var q2 = l2 < 0.5 ? l2 * (1 + s2) : l2 + s2 - l2 * s2;
      var p2 = 2 * l2 - q2;
      r2 = hue2rgb2(p2, q2, h + 1 / 3);
      g2 = hue2rgb2(p2, q2, h);
      b2 = hue2rgb2(p2, q2, h - 1 / 3);
    }
    return "rgba(" + r2 * 255 + "," + g2 * 255 + "," + b2 * 255 + "," + a2 + ")";
  }
  function colorToRgb(val) {
    if (is.rgb(val)) {
      return rgbToRgba(val);
    }
    if (is.hex(val)) {
      return hexToRgba(val);
    }
    if (is.hsl(val)) {
      return hslToRgba(val);
    }
  }
  function getUnit(val) {
    var split = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(val);
    if (split) {
      return split[1];
    }
  }
  function getTransformUnit(propName) {
    if (stringContains(propName, "translate") || propName === "perspective") {
      return "px";
    }
    if (stringContains(propName, "rotate") || stringContains(propName, "skew")) {
      return "deg";
    }
  }
  function getFunctionValue(val, animatable) {
    if (!is.fnc(val)) {
      return val;
    }
    return val(animatable.target, animatable.id, animatable.total);
  }
  function getAttribute(el, prop) {
    return el.getAttribute(prop);
  }
  function convertPxToUnit(el, value, unit) {
    var valueUnit = getUnit(value);
    if (arrayContains([unit, "deg", "rad", "turn"], valueUnit)) {
      return value;
    }
    var cached = cache.CSS[value + unit];
    if (!is.und(cached)) {
      return cached;
    }
    var baseline = 100;
    var tempEl = document.createElement(el.tagName);
    var parentEl = el.parentNode && el.parentNode !== document ? el.parentNode : document.body;
    parentEl.appendChild(tempEl);
    tempEl.style.position = "absolute";
    tempEl.style.width = baseline + unit;
    var factor = baseline / tempEl.offsetWidth;
    parentEl.removeChild(tempEl);
    var convertedUnit = factor * parseFloat(value);
    cache.CSS[value + unit] = convertedUnit;
    return convertedUnit;
  }
  function getCSSValue(el, prop, unit) {
    if (prop in el.style) {
      var uppercasePropName = prop.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
      var value = el.style[prop] || getComputedStyle(el).getPropertyValue(uppercasePropName) || "0";
      return unit ? convertPxToUnit(el, value, unit) : value;
    }
  }
  function getAnimationType(el, prop) {
    if (is.dom(el) && !is.inp(el) && (!is.nil(getAttribute(el, prop)) || is.svg(el) && el[prop])) {
      return "attribute";
    }
    if (is.dom(el) && arrayContains(validTransforms, prop)) {
      return "transform";
    }
    if (is.dom(el) && (prop !== "transform" && getCSSValue(el, prop))) {
      return "css";
    }
    if (el[prop] != null) {
      return "object";
    }
  }
  function getElementTransforms(el) {
    if (!is.dom(el)) {
      return;
    }
    var str = el.style.transform || "";
    var reg = /(\w+)\(([^)]*)\)/g;
    var transforms = /* @__PURE__ */ new Map();
    var m2;
    while (m2 = reg.exec(str)) {
      transforms.set(m2[1], m2[2]);
    }
    return transforms;
  }
  function getTransformValue(el, propName, animatable, unit) {
    var defaultVal = stringContains(propName, "scale") ? 1 : 0 + getTransformUnit(propName);
    var value = getElementTransforms(el).get(propName) || defaultVal;
    if (animatable) {
      animatable.transforms.list.set(propName, value);
      animatable.transforms["last"] = propName;
    }
    return unit ? convertPxToUnit(el, value, unit) : value;
  }
  function getOriginalTargetValue(target, propName, unit, animatable) {
    switch (getAnimationType(target, propName)) {
      case "transform":
        return getTransformValue(target, propName, animatable, unit);
      case "css":
        return getCSSValue(target, propName, unit);
      case "attribute":
        return getAttribute(target, propName);
      default:
        return target[propName] || 0;
    }
  }
  function getRelativeValue(to, from) {
    var operator = /^(\*=|\+=|-=)/.exec(to);
    if (!operator) {
      return to;
    }
    var u2 = getUnit(to) || 0;
    var x2 = parseFloat(from);
    var y2 = parseFloat(to.replace(operator[0], ""));
    switch (operator[0][0]) {
      case "+":
        return x2 + y2 + u2;
      case "-":
        return x2 - y2 + u2;
      case "*":
        return x2 * y2 + u2;
    }
  }
  function validateValue(val, unit) {
    if (is.col(val)) {
      return colorToRgb(val);
    }
    if (/\s/g.test(val)) {
      return val;
    }
    var originalUnit = getUnit(val);
    var unitLess = originalUnit ? val.substr(0, val.length - originalUnit.length) : val;
    if (unit) {
      return unitLess + unit;
    }
    return unitLess;
  }
  function getDistance(p1, p2) {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
  }
  function getCircleLength(el) {
    return Math.PI * 2 * getAttribute(el, "r");
  }
  function getRectLength(el) {
    return getAttribute(el, "width") * 2 + getAttribute(el, "height") * 2;
  }
  function getLineLength(el) {
    return getDistance(
      { x: getAttribute(el, "x1"), y: getAttribute(el, "y1") },
      { x: getAttribute(el, "x2"), y: getAttribute(el, "y2") }
    );
  }
  function getPolylineLength(el) {
    var points = el.points;
    var totalLength = 0;
    var previousPos;
    for (var i2 = 0; i2 < points.numberOfItems; i2++) {
      var currentPos = points.getItem(i2);
      if (i2 > 0) {
        totalLength += getDistance(previousPos, currentPos);
      }
      previousPos = currentPos;
    }
    return totalLength;
  }
  function getPolygonLength(el) {
    var points = el.points;
    return getPolylineLength(el) + getDistance(points.getItem(points.numberOfItems - 1), points.getItem(0));
  }
  function getTotalLength(el) {
    if (el.getTotalLength) {
      return el.getTotalLength();
    }
    switch (el.tagName.toLowerCase()) {
      case "circle":
        return getCircleLength(el);
      case "rect":
        return getRectLength(el);
      case "line":
        return getLineLength(el);
      case "polyline":
        return getPolylineLength(el);
      case "polygon":
        return getPolygonLength(el);
    }
  }
  function setDashoffset(el) {
    var pathLength = getTotalLength(el);
    el.setAttribute("stroke-dasharray", pathLength);
    return pathLength;
  }
  function getParentSvgEl(el) {
    var parentEl = el.parentNode;
    while (is.svg(parentEl)) {
      if (!is.svg(parentEl.parentNode)) {
        break;
      }
      parentEl = parentEl.parentNode;
    }
    return parentEl;
  }
  function getParentSvg(pathEl, svgData) {
    var svg = svgData || {};
    var parentSvgEl = svg.el || getParentSvgEl(pathEl);
    var rect = parentSvgEl.getBoundingClientRect();
    var viewBoxAttr = getAttribute(parentSvgEl, "viewBox");
    var width = rect.width;
    var height = rect.height;
    var viewBox = svg.viewBox || (viewBoxAttr ? viewBoxAttr.split(" ") : [0, 0, width, height]);
    return {
      el: parentSvgEl,
      viewBox,
      x: viewBox[0] / 1,
      y: viewBox[1] / 1,
      w: width,
      h: height,
      vW: viewBox[2],
      vH: viewBox[3]
    };
  }
  function getPath(path, percent) {
    var pathEl = is.str(path) ? selectString(path)[0] : path;
    var p2 = percent || 100;
    return function(property) {
      return {
        property,
        el: pathEl,
        svg: getParentSvg(pathEl),
        totalLength: getTotalLength(pathEl) * (p2 / 100)
      };
    };
  }
  function getPathProgress(path, progress, isPathTargetInsideSVG) {
    function point(offset) {
      if (offset === void 0) offset = 0;
      var l2 = progress + offset >= 1 ? progress + offset : 0;
      return path.el.getPointAtLength(l2);
    }
    var svg = getParentSvg(path.el, path.svg);
    var p2 = point();
    var p0 = point(-1);
    var p1 = point(1);
    var scaleX = isPathTargetInsideSVG ? 1 : svg.w / svg.vW;
    var scaleY = isPathTargetInsideSVG ? 1 : svg.h / svg.vH;
    switch (path.property) {
      case "x":
        return (p2.x - svg.x) * scaleX;
      case "y":
        return (p2.y - svg.y) * scaleY;
      case "angle":
        return Math.atan2(p1.y - p0.y, p1.x - p0.x) * 180 / Math.PI;
    }
  }
  function decomposeValue(val, unit) {
    var rgx = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g;
    var value = validateValue(is.pth(val) ? val.totalLength : val, unit) + "";
    return {
      original: value,
      numbers: value.match(rgx) ? value.match(rgx).map(Number) : [0],
      strings: is.str(val) || unit ? value.split(rgx) : []
    };
  }
  function parseTargets(targets) {
    var targetsArray = targets ? flattenArray(is.arr(targets) ? targets.map(toArray) : toArray(targets)) : [];
    return filterArray(targetsArray, function(item, pos, self2) {
      return self2.indexOf(item) === pos;
    });
  }
  function getAnimatables(targets) {
    var parsed = parseTargets(targets);
    return parsed.map(function(t, i2) {
      return { target: t, id: i2, total: parsed.length, transforms: { list: getElementTransforms(t) } };
    });
  }
  function normalizePropertyTweens(prop, tweenSettings) {
    var settings = cloneObject(tweenSettings);
    if (/^spring/.test(settings.easing)) {
      settings.duration = spring(settings.easing);
    }
    if (is.arr(prop)) {
      var l2 = prop.length;
      var isFromTo = l2 === 2 && !is.obj(prop[0]);
      if (!isFromTo) {
        if (!is.fnc(tweenSettings.duration)) {
          settings.duration = tweenSettings.duration / l2;
        }
      } else {
        prop = { value: prop };
      }
    }
    var propArray = is.arr(prop) ? prop : [prop];
    return propArray.map(function(v, i2) {
      var obj = is.obj(v) && !is.pth(v) ? v : { value: v };
      if (is.und(obj.delay)) {
        obj.delay = !i2 ? tweenSettings.delay : 0;
      }
      if (is.und(obj.endDelay)) {
        obj.endDelay = i2 === propArray.length - 1 ? tweenSettings.endDelay : 0;
      }
      return obj;
    }).map(function(k2) {
      return mergeObjects(k2, settings);
    });
  }
  function flattenKeyframes(keyframes) {
    var propertyNames = filterArray(flattenArray(keyframes.map(function(key) {
      return Object.keys(key);
    })), function(p2) {
      return is.key(p2);
    }).reduce(function(a2, b2) {
      if (a2.indexOf(b2) < 0) {
        a2.push(b2);
      }
      return a2;
    }, []);
    var properties = {};
    var loop = function(i3) {
      var propName = propertyNames[i3];
      properties[propName] = keyframes.map(function(key) {
        var newKey = {};
        for (var p2 in key) {
          if (is.key(p2)) {
            if (p2 == propName) {
              newKey.value = key[p2];
            }
          } else {
            newKey[p2] = key[p2];
          }
        }
        return newKey;
      });
    };
    for (var i2 = 0; i2 < propertyNames.length; i2++) loop(i2);
    return properties;
  }
  function getProperties(tweenSettings, params) {
    var properties = [];
    var keyframes = params.keyframes;
    if (keyframes) {
      params = mergeObjects(flattenKeyframes(keyframes), params);
    }
    for (var p2 in params) {
      if (is.key(p2)) {
        properties.push({
          name: p2,
          tweens: normalizePropertyTweens(params[p2], tweenSettings)
        });
      }
    }
    return properties;
  }
  function normalizeTweenValues(tween, animatable) {
    var t = {};
    for (var p2 in tween) {
      var value = getFunctionValue(tween[p2], animatable);
      if (is.arr(value)) {
        value = value.map(function(v) {
          return getFunctionValue(v, animatable);
        });
        if (value.length === 1) {
          value = value[0];
        }
      }
      t[p2] = value;
    }
    t.duration = parseFloat(t.duration);
    t.delay = parseFloat(t.delay);
    return t;
  }
  function normalizeTweens(prop, animatable) {
    var previousTween;
    return prop.tweens.map(function(t) {
      var tween = normalizeTweenValues(t, animatable);
      var tweenValue = tween.value;
      var to = is.arr(tweenValue) ? tweenValue[1] : tweenValue;
      var toUnit = getUnit(to);
      var originalValue = getOriginalTargetValue(animatable.target, prop.name, toUnit, animatable);
      var previousValue = previousTween ? previousTween.to.original : originalValue;
      var from = is.arr(tweenValue) ? tweenValue[0] : previousValue;
      var fromUnit = getUnit(from) || getUnit(originalValue);
      var unit = toUnit || fromUnit;
      if (is.und(to)) {
        to = previousValue;
      }
      tween.from = decomposeValue(from, unit);
      tween.to = decomposeValue(getRelativeValue(to, from), unit);
      tween.start = previousTween ? previousTween.end : 0;
      tween.end = tween.start + tween.delay + tween.duration + tween.endDelay;
      tween.easing = parseEasings(tween.easing, tween.duration);
      tween.isPath = is.pth(tweenValue);
      tween.isPathTargetInsideSVG = tween.isPath && is.svg(animatable.target);
      tween.isColor = is.col(tween.from.original);
      if (tween.isColor) {
        tween.round = 1;
      }
      previousTween = tween;
      return tween;
    });
  }
  var setProgressValue = {
    css: function(t, p2, v) {
      return t.style[p2] = v;
    },
    attribute: function(t, p2, v) {
      return t.setAttribute(p2, v);
    },
    object: function(t, p2, v) {
      return t[p2] = v;
    },
    transform: function(t, p2, v, transforms, manual) {
      transforms.list.set(p2, v);
      if (p2 === transforms.last || manual) {
        var str = "";
        transforms.list.forEach(function(value, prop) {
          str += prop + "(" + value + ") ";
        });
        t.style.transform = str;
      }
    }
  };
  function setTargetsValue(targets, properties) {
    var animatables = getAnimatables(targets);
    animatables.forEach(function(animatable) {
      for (var property in properties) {
        var value = getFunctionValue(properties[property], animatable);
        var target = animatable.target;
        var valueUnit = getUnit(value);
        var originalValue = getOriginalTargetValue(target, property, valueUnit, animatable);
        var unit = valueUnit || getUnit(originalValue);
        var to = getRelativeValue(validateValue(value, unit), originalValue);
        var animType = getAnimationType(target, property);
        setProgressValue[animType](target, property, to, animatable.transforms, true);
      }
    });
  }
  function createAnimation(animatable, prop) {
    var animType = getAnimationType(animatable.target, prop.name);
    if (animType) {
      var tweens = normalizeTweens(prop, animatable);
      var lastTween = tweens[tweens.length - 1];
      return {
        type: animType,
        property: prop.name,
        animatable,
        tweens,
        duration: lastTween.end,
        delay: tweens[0].delay,
        endDelay: lastTween.endDelay
      };
    }
  }
  function getAnimations(animatables, properties) {
    return filterArray(flattenArray(animatables.map(function(animatable) {
      return properties.map(function(prop) {
        return createAnimation(animatable, prop);
      });
    })), function(a2) {
      return !is.und(a2);
    });
  }
  function getInstanceTimings(animations, tweenSettings) {
    var animLength = animations.length;
    var getTlOffset = function(anim) {
      return anim.timelineOffset ? anim.timelineOffset : 0;
    };
    var timings = {};
    timings.duration = animLength ? Math.max.apply(Math, animations.map(function(anim) {
      return getTlOffset(anim) + anim.duration;
    })) : tweenSettings.duration;
    timings.delay = animLength ? Math.min.apply(Math, animations.map(function(anim) {
      return getTlOffset(anim) + anim.delay;
    })) : tweenSettings.delay;
    timings.endDelay = animLength ? timings.duration - Math.max.apply(Math, animations.map(function(anim) {
      return getTlOffset(anim) + anim.duration - anim.endDelay;
    })) : tweenSettings.endDelay;
    return timings;
  }
  var instanceID = 0;
  function createNewInstance(params) {
    var instanceSettings = replaceObjectProps(defaultInstanceSettings, params);
    var tweenSettings = replaceObjectProps(defaultTweenSettings, params);
    var properties = getProperties(tweenSettings, params);
    var animatables = getAnimatables(params.targets);
    var animations = getAnimations(animatables, properties);
    var timings = getInstanceTimings(animations, tweenSettings);
    var id = instanceID;
    instanceID++;
    return mergeObjects(instanceSettings, {
      id,
      children: [],
      animatables,
      animations,
      duration: timings.duration,
      delay: timings.delay,
      endDelay: timings.endDelay
    });
  }
  var activeInstances = [];
  var engine = function() {
    var raf;
    function play() {
      if (!raf && (!isDocumentHidden() || !anime.suspendWhenDocumentHidden) && activeInstances.length > 0) {
        raf = requestAnimationFrame(step);
      }
    }
    function step(t) {
      var activeInstancesLength = activeInstances.length;
      var i2 = 0;
      while (i2 < activeInstancesLength) {
        var activeInstance = activeInstances[i2];
        if (!activeInstance.paused) {
          activeInstance.tick(t);
          i2++;
        } else {
          activeInstances.splice(i2, 1);
          activeInstancesLength--;
        }
      }
      raf = i2 > 0 ? requestAnimationFrame(step) : void 0;
    }
    function handleVisibilityChange() {
      if (!anime.suspendWhenDocumentHidden) {
        return;
      }
      if (isDocumentHidden()) {
        raf = cancelAnimationFrame(raf);
      } else {
        activeInstances.forEach(
          function(instance) {
            return instance._onDocumentVisibility();
          }
        );
        engine();
      }
    }
    if (typeof document !== "undefined") {
      document.addEventListener("visibilitychange", handleVisibilityChange);
    }
    return play;
  }();
  function isDocumentHidden() {
    return !!document && document.hidden;
  }
  function anime(params) {
    if (params === void 0) params = {};
    var startTime = 0, lastTime = 0, now = 0;
    var children, childrenLength = 0;
    var resolve = null;
    function makePromise(instance2) {
      var promise2 = window.Promise && new Promise(function(_resolve) {
        return resolve = _resolve;
      });
      instance2.finished = promise2;
      return promise2;
    }
    var instance = createNewInstance(params);
    var promise = makePromise(instance);
    function toggleInstanceDirection() {
      var direction = instance.direction;
      if (direction !== "alternate") {
        instance.direction = direction !== "normal" ? "normal" : "reverse";
      }
      instance.reversed = !instance.reversed;
      children.forEach(function(child) {
        return child.reversed = instance.reversed;
      });
    }
    function adjustTime(time) {
      return instance.reversed ? instance.duration - time : time;
    }
    function resetTime() {
      startTime = 0;
      lastTime = adjustTime(instance.currentTime) * (1 / anime.speed);
    }
    function seekChild(time, child) {
      if (child) {
        child.seek(time - child.timelineOffset);
      }
    }
    function syncInstanceChildren(time) {
      if (!instance.reversePlayback) {
        for (var i2 = 0; i2 < childrenLength; i2++) {
          seekChild(time, children[i2]);
        }
      } else {
        for (var i$1 = childrenLength; i$1--; ) {
          seekChild(time, children[i$1]);
        }
      }
    }
    function setAnimationsProgress(insTime) {
      var i2 = 0;
      var animations = instance.animations;
      var animationsLength = animations.length;
      while (i2 < animationsLength) {
        var anim = animations[i2];
        var animatable = anim.animatable;
        var tweens = anim.tweens;
        var tweenLength = tweens.length - 1;
        var tween = tweens[tweenLength];
        if (tweenLength) {
          tween = filterArray(tweens, function(t) {
            return insTime < t.end;
          })[0] || tween;
        }
        var elapsed = minMax(insTime - tween.start - tween.delay, 0, tween.duration) / tween.duration;
        var eased = isNaN(elapsed) ? 1 : tween.easing(elapsed);
        var strings = tween.to.strings;
        var round = tween.round;
        var numbers = [];
        var toNumbersLength = tween.to.numbers.length;
        var progress = void 0;
        for (var n2 = 0; n2 < toNumbersLength; n2++) {
          var value = void 0;
          var toNumber = tween.to.numbers[n2];
          var fromNumber = tween.from.numbers[n2] || 0;
          if (!tween.isPath) {
            value = fromNumber + eased * (toNumber - fromNumber);
          } else {
            value = getPathProgress(tween.value, eased * toNumber, tween.isPathTargetInsideSVG);
          }
          if (round) {
            if (!(tween.isColor && n2 > 2)) {
              value = Math.round(value * round) / round;
            }
          }
          numbers.push(value);
        }
        var stringsLength = strings.length;
        if (!stringsLength) {
          progress = numbers[0];
        } else {
          progress = strings[0];
          for (var s2 = 0; s2 < stringsLength; s2++) {
            var a2 = strings[s2];
            var b2 = strings[s2 + 1];
            var n$1 = numbers[s2];
            if (!isNaN(n$1)) {
              if (!b2) {
                progress += n$1 + " ";
              } else {
                progress += n$1 + b2;
              }
            }
          }
        }
        setProgressValue[anim.type](animatable.target, anim.property, progress, animatable.transforms);
        anim.currentValue = progress;
        i2++;
      }
    }
    function setCallback(cb) {
      if (instance[cb] && !instance.passThrough) {
        instance[cb](instance);
      }
    }
    function countIteration() {
      if (instance.remaining && instance.remaining !== true) {
        instance.remaining--;
      }
    }
    function setInstanceProgress(engineTime) {
      var insDuration = instance.duration;
      var insDelay = instance.delay;
      var insEndDelay = insDuration - instance.endDelay;
      var insTime = adjustTime(engineTime);
      instance.progress = minMax(insTime / insDuration * 100, 0, 100);
      instance.reversePlayback = insTime < instance.currentTime;
      if (children) {
        syncInstanceChildren(insTime);
      }
      if (!instance.began && instance.currentTime > 0) {
        instance.began = true;
        setCallback("begin");
      }
      if (!instance.loopBegan && instance.currentTime > 0) {
        instance.loopBegan = true;
        setCallback("loopBegin");
      }
      if (insTime <= insDelay && instance.currentTime !== 0) {
        setAnimationsProgress(0);
      }
      if (insTime >= insEndDelay && instance.currentTime !== insDuration || !insDuration) {
        setAnimationsProgress(insDuration);
      }
      if (insTime > insDelay && insTime < insEndDelay) {
        if (!instance.changeBegan) {
          instance.changeBegan = true;
          instance.changeCompleted = false;
          setCallback("changeBegin");
        }
        setCallback("change");
        setAnimationsProgress(insTime);
      } else {
        if (instance.changeBegan) {
          instance.changeCompleted = true;
          instance.changeBegan = false;
          setCallback("changeComplete");
        }
      }
      instance.currentTime = minMax(insTime, 0, insDuration);
      if (instance.began) {
        setCallback("update");
      }
      if (engineTime >= insDuration) {
        lastTime = 0;
        countIteration();
        if (!instance.remaining) {
          instance.paused = true;
          if (!instance.completed) {
            instance.completed = true;
            setCallback("loopComplete");
            setCallback("complete");
            if (!instance.passThrough && "Promise" in window) {
              resolve();
              promise = makePromise(instance);
            }
          }
        } else {
          startTime = now;
          setCallback("loopComplete");
          instance.loopBegan = false;
          if (instance.direction === "alternate") {
            toggleInstanceDirection();
          }
        }
      }
    }
    instance.reset = function() {
      var direction = instance.direction;
      instance.passThrough = false;
      instance.currentTime = 0;
      instance.progress = 0;
      instance.paused = true;
      instance.began = false;
      instance.loopBegan = false;
      instance.changeBegan = false;
      instance.completed = false;
      instance.changeCompleted = false;
      instance.reversePlayback = false;
      instance.reversed = direction === "reverse";
      instance.remaining = instance.loop;
      children = instance.children;
      childrenLength = children.length;
      for (var i2 = childrenLength; i2--; ) {
        instance.children[i2].reset();
      }
      if (instance.reversed && instance.loop !== true || direction === "alternate" && instance.loop === 1) {
        instance.remaining++;
      }
      setAnimationsProgress(instance.reversed ? instance.duration : 0);
    };
    instance._onDocumentVisibility = resetTime;
    instance.set = function(targets, properties) {
      setTargetsValue(targets, properties);
      return instance;
    };
    instance.tick = function(t) {
      now = t;
      if (!startTime) {
        startTime = now;
      }
      setInstanceProgress((now + (lastTime - startTime)) * anime.speed);
    };
    instance.seek = function(time) {
      setInstanceProgress(adjustTime(time));
    };
    instance.pause = function() {
      instance.paused = true;
      resetTime();
    };
    instance.play = function() {
      if (!instance.paused) {
        return;
      }
      if (instance.completed) {
        instance.reset();
      }
      instance.paused = false;
      activeInstances.push(instance);
      resetTime();
      engine();
    };
    instance.reverse = function() {
      toggleInstanceDirection();
      instance.completed = instance.reversed ? false : true;
      resetTime();
    };
    instance.restart = function() {
      instance.reset();
      instance.play();
    };
    instance.remove = function(targets) {
      var targetsArray = parseTargets(targets);
      removeTargetsFromInstance(targetsArray, instance);
    };
    instance.reset();
    if (instance.autoplay) {
      instance.play();
    }
    return instance;
  }
  function removeTargetsFromAnimations(targetsArray, animations) {
    for (var a2 = animations.length; a2--; ) {
      if (arrayContains(targetsArray, animations[a2].animatable.target)) {
        animations.splice(a2, 1);
      }
    }
  }
  function removeTargetsFromInstance(targetsArray, instance) {
    var animations = instance.animations;
    var children = instance.children;
    removeTargetsFromAnimations(targetsArray, animations);
    for (var c2 = children.length; c2--; ) {
      var child = children[c2];
      var childAnimations = child.animations;
      removeTargetsFromAnimations(targetsArray, childAnimations);
      if (!childAnimations.length && !child.children.length) {
        children.splice(c2, 1);
      }
    }
    if (!animations.length && !children.length) {
      instance.pause();
    }
  }
  function removeTargetsFromActiveInstances(targets) {
    var targetsArray = parseTargets(targets);
    for (var i2 = activeInstances.length; i2--; ) {
      var instance = activeInstances[i2];
      removeTargetsFromInstance(targetsArray, instance);
    }
  }
  function stagger(val, params) {
    if (params === void 0) params = {};
    var direction = params.direction || "normal";
    var easing = params.easing ? parseEasings(params.easing) : null;
    var grid = params.grid;
    var axis = params.axis;
    var fromIndex = params.from || 0;
    var fromFirst = fromIndex === "first";
    var fromCenter = fromIndex === "center";
    var fromLast = fromIndex === "last";
    var isRange = is.arr(val);
    var val1 = isRange ? parseFloat(val[0]) : parseFloat(val);
    var val2 = isRange ? parseFloat(val[1]) : 0;
    var unit = getUnit(isRange ? val[1] : val) || 0;
    var start = params.start || 0 + (isRange ? val1 : 0);
    var values = [];
    var maxValue = 0;
    return function(el, i2, t) {
      if (fromFirst) {
        fromIndex = 0;
      }
      if (fromCenter) {
        fromIndex = (t - 1) / 2;
      }
      if (fromLast) {
        fromIndex = t - 1;
      }
      if (!values.length) {
        for (var index = 0; index < t; index++) {
          if (!grid) {
            values.push(Math.abs(fromIndex - index));
          } else {
            var fromX = !fromCenter ? fromIndex % grid[0] : (grid[0] - 1) / 2;
            var fromY = !fromCenter ? Math.floor(fromIndex / grid[0]) : (grid[1] - 1) / 2;
            var toX = index % grid[0];
            var toY = Math.floor(index / grid[0]);
            var distanceX = fromX - toX;
            var distanceY = fromY - toY;
            var value = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
            if (axis === "x") {
              value = -distanceX;
            }
            if (axis === "y") {
              value = -distanceY;
            }
            values.push(value);
          }
          maxValue = Math.max.apply(Math, values);
        }
        if (easing) {
          values = values.map(function(val3) {
            return easing(val3 / maxValue) * maxValue;
          });
        }
        if (direction === "reverse") {
          values = values.map(function(val3) {
            return axis ? val3 < 0 ? val3 * -1 : -val3 : Math.abs(maxValue - val3);
          });
        }
      }
      var spacing = isRange ? (val2 - val1) / maxValue : val1;
      return start + spacing * (Math.round(values[i2] * 100) / 100) + unit;
    };
  }
  function timeline(params) {
    if (params === void 0) params = {};
    var tl = anime(params);
    tl.duration = 0;
    tl.add = function(instanceParams, timelineOffset) {
      var tlIndex = activeInstances.indexOf(tl);
      var children = tl.children;
      if (tlIndex > -1) {
        activeInstances.splice(tlIndex, 1);
      }
      function passThrough(ins2) {
        ins2.passThrough = true;
      }
      for (var i2 = 0; i2 < children.length; i2++) {
        passThrough(children[i2]);
      }
      var insParams = mergeObjects(instanceParams, replaceObjectProps(defaultTweenSettings, params));
      insParams.targets = insParams.targets || params.targets;
      var tlDuration = tl.duration;
      insParams.autoplay = false;
      insParams.direction = tl.direction;
      insParams.timelineOffset = is.und(timelineOffset) ? tlDuration : getRelativeValue(timelineOffset, tlDuration);
      passThrough(tl);
      tl.seek(insParams.timelineOffset);
      var ins = anime(insParams);
      passThrough(ins);
      children.push(ins);
      var timings = getInstanceTimings(children, params);
      tl.delay = timings.delay;
      tl.endDelay = timings.endDelay;
      tl.duration = timings.duration;
      tl.seek(0);
      tl.reset();
      if (tl.autoplay) {
        tl.play();
      }
      return tl;
    };
    return tl;
  }
  anime.version = "3.2.1";
  anime.speed = 1;
  anime.suspendWhenDocumentHidden = true;
  anime.running = activeInstances;
  anime.remove = removeTargetsFromActiveInstances;
  anime.get = getOriginalTargetValue;
  anime.set = setTargetsValue;
  anime.convertPx = convertPxToUnit;
  anime.path = getPath;
  anime.setDashoffset = setDashoffset;
  anime.stagger = stagger;
  anime.timeline = timeline;
  anime.easing = parseEasings;
  anime.penner = penner;
  anime.random = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  var anime_es_default = anime;

  // node_modules/three/build/three.core.js
  var REVISION = "171";
  var CullFaceNone = 0;
  var CullFaceBack = 1;
  var CullFaceFront = 2;
  var PCFShadowMap = 1;
  var PCFSoftShadowMap = 2;
  var VSMShadowMap = 3;
  var FrontSide = 0;
  var BackSide = 1;
  var DoubleSide = 2;
  var NoBlending = 0;
  var NormalBlending = 1;
  var AdditiveBlending = 2;
  var SubtractiveBlending = 3;
  var MultiplyBlending = 4;
  var CustomBlending = 5;
  var AddEquation = 100;
  var SubtractEquation = 101;
  var ReverseSubtractEquation = 102;
  var MinEquation = 103;
  var MaxEquation = 104;
  var ZeroFactor = 200;
  var OneFactor = 201;
  var SrcColorFactor = 202;
  var OneMinusSrcColorFactor = 203;
  var SrcAlphaFactor = 204;
  var OneMinusSrcAlphaFactor = 205;
  var DstAlphaFactor = 206;
  var OneMinusDstAlphaFactor = 207;
  var DstColorFactor = 208;
  var OneMinusDstColorFactor = 209;
  var SrcAlphaSaturateFactor = 210;
  var ConstantColorFactor = 211;
  var OneMinusConstantColorFactor = 212;
  var ConstantAlphaFactor = 213;
  var OneMinusConstantAlphaFactor = 214;
  var NeverDepth = 0;
  var AlwaysDepth = 1;
  var LessDepth = 2;
  var LessEqualDepth = 3;
  var EqualDepth = 4;
  var GreaterEqualDepth = 5;
  var GreaterDepth = 6;
  var NotEqualDepth = 7;
  var MultiplyOperation = 0;
  var MixOperation = 1;
  var AddOperation = 2;
  var NoToneMapping = 0;
  var LinearToneMapping = 1;
  var ReinhardToneMapping = 2;
  var CineonToneMapping = 3;
  var ACESFilmicToneMapping = 4;
  var CustomToneMapping = 5;
  var AgXToneMapping = 6;
  var NeutralToneMapping = 7;
  var UVMapping = 300;
  var CubeReflectionMapping = 301;
  var CubeRefractionMapping = 302;
  var EquirectangularReflectionMapping = 303;
  var EquirectangularRefractionMapping = 304;
  var CubeUVReflectionMapping = 306;
  var RepeatWrapping = 1e3;
  var ClampToEdgeWrapping = 1001;
  var MirroredRepeatWrapping = 1002;
  var NearestFilter = 1003;
  var NearestMipmapNearestFilter = 1004;
  var NearestMipmapLinearFilter = 1005;
  var LinearFilter = 1006;
  var LinearMipmapNearestFilter = 1007;
  var LinearMipmapLinearFilter = 1008;
  var UnsignedByteType = 1009;
  var ByteType = 1010;
  var ShortType = 1011;
  var UnsignedShortType = 1012;
  var IntType = 1013;
  var UnsignedIntType = 1014;
  var FloatType = 1015;
  var HalfFloatType = 1016;
  var UnsignedShort4444Type = 1017;
  var UnsignedShort5551Type = 1018;
  var UnsignedInt248Type = 1020;
  var UnsignedInt5999Type = 35902;
  var AlphaFormat = 1021;
  var RGBFormat = 1022;
  var RGBAFormat = 1023;
  var LuminanceFormat = 1024;
  var LuminanceAlphaFormat = 1025;
  var DepthFormat = 1026;
  var DepthStencilFormat = 1027;
  var RedFormat = 1028;
  var RedIntegerFormat = 1029;
  var RGFormat = 1030;
  var RGIntegerFormat = 1031;
  var RGBAIntegerFormat = 1033;
  var RGB_S3TC_DXT1_Format = 33776;
  var RGBA_S3TC_DXT1_Format = 33777;
  var RGBA_S3TC_DXT3_Format = 33778;
  var RGBA_S3TC_DXT5_Format = 33779;
  var RGB_PVRTC_4BPPV1_Format = 35840;
  var RGB_PVRTC_2BPPV1_Format = 35841;
  var RGBA_PVRTC_4BPPV1_Format = 35842;
  var RGBA_PVRTC_2BPPV1_Format = 35843;
  var RGB_ETC1_Format = 36196;
  var RGB_ETC2_Format = 37492;
  var RGBA_ETC2_EAC_Format = 37496;
  var RGBA_ASTC_4x4_Format = 37808;
  var RGBA_ASTC_5x4_Format = 37809;
  var RGBA_ASTC_5x5_Format = 37810;
  var RGBA_ASTC_6x5_Format = 37811;
  var RGBA_ASTC_6x6_Format = 37812;
  var RGBA_ASTC_8x5_Format = 37813;
  var RGBA_ASTC_8x6_Format = 37814;
  var RGBA_ASTC_8x8_Format = 37815;
  var RGBA_ASTC_10x5_Format = 37816;
  var RGBA_ASTC_10x6_Format = 37817;
  var RGBA_ASTC_10x8_Format = 37818;
  var RGBA_ASTC_10x10_Format = 37819;
  var RGBA_ASTC_12x10_Format = 37820;
  var RGBA_ASTC_12x12_Format = 37821;
  var RGBA_BPTC_Format = 36492;
  var RGB_BPTC_SIGNED_Format = 36494;
  var RGB_BPTC_UNSIGNED_Format = 36495;
  var RED_RGTC1_Format = 36283;
  var SIGNED_RED_RGTC1_Format = 36284;
  var RED_GREEN_RGTC2_Format = 36285;
  var SIGNED_RED_GREEN_RGTC2_Format = 36286;
  var InterpolateDiscrete = 2300;
  var InterpolateLinear = 2301;
  var InterpolateSmooth = 2302;
  var ZeroCurvatureEnding = 2400;
  var ZeroSlopeEnding = 2401;
  var WrapAroundEnding = 2402;
  var BasicDepthPacking = 3200;
  var RGBADepthPacking = 3201;
  var TangentSpaceNormalMap = 0;
  var ObjectSpaceNormalMap = 1;
  var NoColorSpace = "";
  var SRGBColorSpace = "srgb";
  var LinearSRGBColorSpace = "srgb-linear";
  var LinearTransfer = "linear";
  var SRGBTransfer = "srgb";
  var KeepStencilOp = 7680;
  var AlwaysStencilFunc = 519;
  var NeverCompare = 512;
  var LessCompare = 513;
  var EqualCompare = 514;
  var LessEqualCompare = 515;
  var GreaterCompare = 516;
  var NotEqualCompare = 517;
  var GreaterEqualCompare = 518;
  var AlwaysCompare = 519;
  var StaticDrawUsage = 35044;
  var GLSL3 = "300 es";
  var WebGLCoordinateSystem = 2e3;
  var WebGPUCoordinateSystem = 2001;
  var EventDispatcher = class {
    addEventListener(type, listener) {
      if (this._listeners === void 0) this._listeners = {};
      const listeners = this._listeners;
      if (listeners[type] === void 0) {
        listeners[type] = [];
      }
      if (listeners[type].indexOf(listener) === -1) {
        listeners[type].push(listener);
      }
    }
    hasEventListener(type, listener) {
      if (this._listeners === void 0) return false;
      const listeners = this._listeners;
      return listeners[type] !== void 0 && listeners[type].indexOf(listener) !== -1;
    }
    removeEventListener(type, listener) {
      if (this._listeners === void 0) return;
      const listeners = this._listeners;
      const listenerArray = listeners[type];
      if (listenerArray !== void 0) {
        const index = listenerArray.indexOf(listener);
        if (index !== -1) {
          listenerArray.splice(index, 1);
        }
      }
    }
    dispatchEvent(event) {
      if (this._listeners === void 0) return;
      const listeners = this._listeners;
      const listenerArray = listeners[event.type];
      if (listenerArray !== void 0) {
        event.target = this;
        const array = listenerArray.slice(0);
        for (let i2 = 0, l2 = array.length; i2 < l2; i2++) {
          array[i2].call(this, event);
        }
        event.target = null;
      }
    }
  };
  var _lut = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0a", "0b", "0c", "0d", "0e", "0f", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c", "1d", "1e", "1f", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2a", "2b", "2c", "2d", "2e", "2f", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "3a", "3b", "3c", "3d", "3e", "3f", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "4a", "4b", "4c", "4d", "4e", "4f", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "5a", "5b", "5c", "5d", "5e", "5f", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "6a", "6b", "6c", "6d", "6e", "6f", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "7a", "7b", "7c", "7d", "7e", "7f", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "8a", "8b", "8c", "8d", "8e", "8f", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "9a", "9b", "9c", "9d", "9e", "9f", "a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "aa", "ab", "ac", "ad", "ae", "af", "b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "ba", "bb", "bc", "bd", "be", "bf", "c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "ca", "cb", "cc", "cd", "ce", "cf", "d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "da", "db", "dc", "dd", "de", "df", "e0", "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "ea", "eb", "ec", "ed", "ee", "ef", "f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "fa", "fb", "fc", "fd", "fe", "ff"];
  var DEG2RAD = Math.PI / 180;
  var RAD2DEG = 180 / Math.PI;
  function generateUUID() {
    const d0 = Math.random() * 4294967295 | 0;
    const d1 = Math.random() * 4294967295 | 0;
    const d2 = Math.random() * 4294967295 | 0;
    const d3 = Math.random() * 4294967295 | 0;
    const uuid = _lut[d0 & 255] + _lut[d0 >> 8 & 255] + _lut[d0 >> 16 & 255] + _lut[d0 >> 24 & 255] + "-" + _lut[d1 & 255] + _lut[d1 >> 8 & 255] + "-" + _lut[d1 >> 16 & 15 | 64] + _lut[d1 >> 24 & 255] + "-" + _lut[d2 & 63 | 128] + _lut[d2 >> 8 & 255] + "-" + _lut[d2 >> 16 & 255] + _lut[d2 >> 24 & 255] + _lut[d3 & 255] + _lut[d3 >> 8 & 255] + _lut[d3 >> 16 & 255] + _lut[d3 >> 24 & 255];
    return uuid.toLowerCase();
  }
  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }
  function euclideanModulo(n2, m2) {
    return (n2 % m2 + m2) % m2;
  }
  function lerp(x2, y2, t) {
    return (1 - t) * x2 + t * y2;
  }
  function denormalize(value, array) {
    switch (array.constructor) {
      case Float32Array:
        return value;
      case Uint32Array:
        return value / 4294967295;
      case Uint16Array:
        return value / 65535;
      case Uint8Array:
        return value / 255;
      case Int32Array:
        return Math.max(value / 2147483647, -1);
      case Int16Array:
        return Math.max(value / 32767, -1);
      case Int8Array:
        return Math.max(value / 127, -1);
      default:
        throw new Error("Invalid component type.");
    }
  }
  function normalize(value, array) {
    switch (array.constructor) {
      case Float32Array:
        return value;
      case Uint32Array:
        return Math.round(value * 4294967295);
      case Uint16Array:
        return Math.round(value * 65535);
      case Uint8Array:
        return Math.round(value * 255);
      case Int32Array:
        return Math.round(value * 2147483647);
      case Int16Array:
        return Math.round(value * 32767);
      case Int8Array:
        return Math.round(value * 127);
      default:
        throw new Error("Invalid component type.");
    }
  }
  var Vector2 = class _Vector2 {
    constructor(x2 = 0, y2 = 0) {
      _Vector2.prototype.isVector2 = true;
      this.x = x2;
      this.y = y2;
    }
    get width() {
      return this.x;
    }
    set width(value) {
      this.x = value;
    }
    get height() {
      return this.y;
    }
    set height(value) {
      this.y = value;
    }
    set(x2, y2) {
      this.x = x2;
      this.y = y2;
      return this;
    }
    setScalar(scalar) {
      this.x = scalar;
      this.y = scalar;
      return this;
    }
    setX(x2) {
      this.x = x2;
      return this;
    }
    setY(y2) {
      this.y = y2;
      return this;
    }
    setComponent(index, value) {
      switch (index) {
        case 0:
          this.x = value;
          break;
        case 1:
          this.y = value;
          break;
        default:
          throw new Error("index is out of range: " + index);
      }
      return this;
    }
    getComponent(index) {
      switch (index) {
        case 0:
          return this.x;
        case 1:
          return this.y;
        default:
          throw new Error("index is out of range: " + index);
      }
    }
    clone() {
      return new this.constructor(this.x, this.y);
    }
    copy(v) {
      this.x = v.x;
      this.y = v.y;
      return this;
    }
    add(v) {
      this.x += v.x;
      this.y += v.y;
      return this;
    }
    addScalar(s2) {
      this.x += s2;
      this.y += s2;
      return this;
    }
    addVectors(a2, b2) {
      this.x = a2.x + b2.x;
      this.y = a2.y + b2.y;
      return this;
    }
    addScaledVector(v, s2) {
      this.x += v.x * s2;
      this.y += v.y * s2;
      return this;
    }
    sub(v) {
      this.x -= v.x;
      this.y -= v.y;
      return this;
    }
    subScalar(s2) {
      this.x -= s2;
      this.y -= s2;
      return this;
    }
    subVectors(a2, b2) {
      this.x = a2.x - b2.x;
      this.y = a2.y - b2.y;
      return this;
    }
    multiply(v) {
      this.x *= v.x;
      this.y *= v.y;
      return this;
    }
    multiplyScalar(scalar) {
      this.x *= scalar;
      this.y *= scalar;
      return this;
    }
    divide(v) {
      this.x /= v.x;
      this.y /= v.y;
      return this;
    }
    divideScalar(scalar) {
      return this.multiplyScalar(1 / scalar);
    }
    applyMatrix3(m2) {
      const x2 = this.x, y2 = this.y;
      const e = m2.elements;
      this.x = e[0] * x2 + e[3] * y2 + e[6];
      this.y = e[1] * x2 + e[4] * y2 + e[7];
      return this;
    }
    min(v) {
      this.x = Math.min(this.x, v.x);
      this.y = Math.min(this.y, v.y);
      return this;
    }
    max(v) {
      this.x = Math.max(this.x, v.x);
      this.y = Math.max(this.y, v.y);
      return this;
    }
    clamp(min, max) {
      this.x = clamp(this.x, min.x, max.x);
      this.y = clamp(this.y, min.y, max.y);
      return this;
    }
    clampScalar(minVal, maxVal) {
      this.x = clamp(this.x, minVal, maxVal);
      this.y = clamp(this.y, minVal, maxVal);
      return this;
    }
    clampLength(min, max) {
      const length = this.length();
      return this.divideScalar(length || 1).multiplyScalar(clamp(length, min, max));
    }
    floor() {
      this.x = Math.floor(this.x);
      this.y = Math.floor(this.y);
      return this;
    }
    ceil() {
      this.x = Math.ceil(this.x);
      this.y = Math.ceil(this.y);
      return this;
    }
    round() {
      this.x = Math.round(this.x);
      this.y = Math.round(this.y);
      return this;
    }
    roundToZero() {
      this.x = Math.trunc(this.x);
      this.y = Math.trunc(this.y);
      return this;
    }
    negate() {
      this.x = -this.x;
      this.y = -this.y;
      return this;
    }
    dot(v) {
      return this.x * v.x + this.y * v.y;
    }
    cross(v) {
      return this.x * v.y - this.y * v.x;
    }
    lengthSq() {
      return this.x * this.x + this.y * this.y;
    }
    length() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    manhattanLength() {
      return Math.abs(this.x) + Math.abs(this.y);
    }
    normalize() {
      return this.divideScalar(this.length() || 1);
    }
    angle() {
      const angle = Math.atan2(-this.y, -this.x) + Math.PI;
      return angle;
    }
    angleTo(v) {
      const denominator = Math.sqrt(this.lengthSq() * v.lengthSq());
      if (denominator === 0) return Math.PI / 2;
      const theta = this.dot(v) / denominator;
      return Math.acos(clamp(theta, -1, 1));
    }
    distanceTo(v) {
      return Math.sqrt(this.distanceToSquared(v));
    }
    distanceToSquared(v) {
      const dx = this.x - v.x, dy = this.y - v.y;
      return dx * dx + dy * dy;
    }
    manhattanDistanceTo(v) {
      return Math.abs(this.x - v.x) + Math.abs(this.y - v.y);
    }
    setLength(length) {
      return this.normalize().multiplyScalar(length);
    }
    lerp(v, alpha) {
      this.x += (v.x - this.x) * alpha;
      this.y += (v.y - this.y) * alpha;
      return this;
    }
    lerpVectors(v1, v2, alpha) {
      this.x = v1.x + (v2.x - v1.x) * alpha;
      this.y = v1.y + (v2.y - v1.y) * alpha;
      return this;
    }
    equals(v) {
      return v.x === this.x && v.y === this.y;
    }
    fromArray(array, offset = 0) {
      this.x = array[offset];
      this.y = array[offset + 1];
      return this;
    }
    toArray(array = [], offset = 0) {
      array[offset] = this.x;
      array[offset + 1] = this.y;
      return array;
    }
    fromBufferAttribute(attribute, index) {
      this.x = attribute.getX(index);
      this.y = attribute.getY(index);
      return this;
    }
    rotateAround(center, angle) {
      const c2 = Math.cos(angle), s2 = Math.sin(angle);
      const x2 = this.x - center.x;
      const y2 = this.y - center.y;
      this.x = x2 * c2 - y2 * s2 + center.x;
      this.y = x2 * s2 + y2 * c2 + center.y;
      return this;
    }
    random() {
      this.x = Math.random();
      this.y = Math.random();
      return this;
    }
    *[Symbol.iterator]() {
      yield this.x;
      yield this.y;
    }
  };
  var Matrix3 = class _Matrix3 {
    constructor(n11, n12, n13, n21, n22, n23, n31, n32, n33) {
      _Matrix3.prototype.isMatrix3 = true;
      this.elements = [
        1,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        1
      ];
      if (n11 !== void 0) {
        this.set(n11, n12, n13, n21, n22, n23, n31, n32, n33);
      }
    }
    set(n11, n12, n13, n21, n22, n23, n31, n32, n33) {
      const te = this.elements;
      te[0] = n11;
      te[1] = n21;
      te[2] = n31;
      te[3] = n12;
      te[4] = n22;
      te[5] = n32;
      te[6] = n13;
      te[7] = n23;
      te[8] = n33;
      return this;
    }
    identity() {
      this.set(
        1,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        1
      );
      return this;
    }
    copy(m2) {
      const te = this.elements;
      const me = m2.elements;
      te[0] = me[0];
      te[1] = me[1];
      te[2] = me[2];
      te[3] = me[3];
      te[4] = me[4];
      te[5] = me[5];
      te[6] = me[6];
      te[7] = me[7];
      te[8] = me[8];
      return this;
    }
    extractBasis(xAxis, yAxis, zAxis) {
      xAxis.setFromMatrix3Column(this, 0);
      yAxis.setFromMatrix3Column(this, 1);
      zAxis.setFromMatrix3Column(this, 2);
      return this;
    }
    setFromMatrix4(m2) {
      const me = m2.elements;
      this.set(
        me[0],
        me[4],
        me[8],
        me[1],
        me[5],
        me[9],
        me[2],
        me[6],
        me[10]
      );
      return this;
    }
    multiply(m2) {
      return this.multiplyMatrices(this, m2);
    }
    premultiply(m2) {
      return this.multiplyMatrices(m2, this);
    }
    multiplyMatrices(a2, b2) {
      const ae = a2.elements;
      const be = b2.elements;
      const te = this.elements;
      const a11 = ae[0], a12 = ae[3], a13 = ae[6];
      const a21 = ae[1], a22 = ae[4], a23 = ae[7];
      const a31 = ae[2], a32 = ae[5], a33 = ae[8];
      const b11 = be[0], b12 = be[3], b13 = be[6];
      const b21 = be[1], b22 = be[4], b23 = be[7];
      const b31 = be[2], b32 = be[5], b33 = be[8];
      te[0] = a11 * b11 + a12 * b21 + a13 * b31;
      te[3] = a11 * b12 + a12 * b22 + a13 * b32;
      te[6] = a11 * b13 + a12 * b23 + a13 * b33;
      te[1] = a21 * b11 + a22 * b21 + a23 * b31;
      te[4] = a21 * b12 + a22 * b22 + a23 * b32;
      te[7] = a21 * b13 + a22 * b23 + a23 * b33;
      te[2] = a31 * b11 + a32 * b21 + a33 * b31;
      te[5] = a31 * b12 + a32 * b22 + a33 * b32;
      te[8] = a31 * b13 + a32 * b23 + a33 * b33;
      return this;
    }
    multiplyScalar(s2) {
      const te = this.elements;
      te[0] *= s2;
      te[3] *= s2;
      te[6] *= s2;
      te[1] *= s2;
      te[4] *= s2;
      te[7] *= s2;
      te[2] *= s2;
      te[5] *= s2;
      te[8] *= s2;
      return this;
    }
    determinant() {
      const te = this.elements;
      const a2 = te[0], b2 = te[1], c2 = te[2], d2 = te[3], e = te[4], f2 = te[5], g2 = te[6], h = te[7], i2 = te[8];
      return a2 * e * i2 - a2 * f2 * h - b2 * d2 * i2 + b2 * f2 * g2 + c2 * d2 * h - c2 * e * g2;
    }
    invert() {
      const te = this.elements, n11 = te[0], n21 = te[1], n31 = te[2], n12 = te[3], n22 = te[4], n32 = te[5], n13 = te[6], n23 = te[7], n33 = te[8], t11 = n33 * n22 - n32 * n23, t12 = n32 * n13 - n33 * n12, t13 = n23 * n12 - n22 * n13, det = n11 * t11 + n21 * t12 + n31 * t13;
      if (det === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
      const detInv = 1 / det;
      te[0] = t11 * detInv;
      te[1] = (n31 * n23 - n33 * n21) * detInv;
      te[2] = (n32 * n21 - n31 * n22) * detInv;
      te[3] = t12 * detInv;
      te[4] = (n33 * n11 - n31 * n13) * detInv;
      te[5] = (n31 * n12 - n32 * n11) * detInv;
      te[6] = t13 * detInv;
      te[7] = (n21 * n13 - n23 * n11) * detInv;
      te[8] = (n22 * n11 - n21 * n12) * detInv;
      return this;
    }
    transpose() {
      let tmp;
      const m2 = this.elements;
      tmp = m2[1];
      m2[1] = m2[3];
      m2[3] = tmp;
      tmp = m2[2];
      m2[2] = m2[6];
      m2[6] = tmp;
      tmp = m2[5];
      m2[5] = m2[7];
      m2[7] = tmp;
      return this;
    }
    getNormalMatrix(matrix4) {
      return this.setFromMatrix4(matrix4).invert().transpose();
    }
    transposeIntoArray(r2) {
      const m2 = this.elements;
      r2[0] = m2[0];
      r2[1] = m2[3];
      r2[2] = m2[6];
      r2[3] = m2[1];
      r2[4] = m2[4];
      r2[5] = m2[7];
      r2[6] = m2[2];
      r2[7] = m2[5];
      r2[8] = m2[8];
      return this;
    }
    setUvTransform(tx, ty, sx, sy, rotation, cx, cy) {
      const c2 = Math.cos(rotation);
      const s2 = Math.sin(rotation);
      this.set(
        sx * c2,
        sx * s2,
        -sx * (c2 * cx + s2 * cy) + cx + tx,
        -sy * s2,
        sy * c2,
        -sy * (-s2 * cx + c2 * cy) + cy + ty,
        0,
        0,
        1
      );
      return this;
    }
    //
    scale(sx, sy) {
      this.premultiply(_m3.makeScale(sx, sy));
      return this;
    }
    rotate(theta) {
      this.premultiply(_m3.makeRotation(-theta));
      return this;
    }
    translate(tx, ty) {
      this.premultiply(_m3.makeTranslation(tx, ty));
      return this;
    }
    // for 2D Transforms
    makeTranslation(x2, y2) {
      if (x2.isVector2) {
        this.set(
          1,
          0,
          x2.x,
          0,
          1,
          x2.y,
          0,
          0,
          1
        );
      } else {
        this.set(
          1,
          0,
          x2,
          0,
          1,
          y2,
          0,
          0,
          1
        );
      }
      return this;
    }
    makeRotation(theta) {
      const c2 = Math.cos(theta);
      const s2 = Math.sin(theta);
      this.set(
        c2,
        -s2,
        0,
        s2,
        c2,
        0,
        0,
        0,
        1
      );
      return this;
    }
    makeScale(x2, y2) {
      this.set(
        x2,
        0,
        0,
        0,
        y2,
        0,
        0,
        0,
        1
      );
      return this;
    }
    //
    equals(matrix) {
      const te = this.elements;
      const me = matrix.elements;
      for (let i2 = 0; i2 < 9; i2++) {
        if (te[i2] !== me[i2]) return false;
      }
      return true;
    }
    fromArray(array, offset = 0) {
      for (let i2 = 0; i2 < 9; i2++) {
        this.elements[i2] = array[i2 + offset];
      }
      return this;
    }
    toArray(array = [], offset = 0) {
      const te = this.elements;
      array[offset] = te[0];
      array[offset + 1] = te[1];
      array[offset + 2] = te[2];
      array[offset + 3] = te[3];
      array[offset + 4] = te[4];
      array[offset + 5] = te[5];
      array[offset + 6] = te[6];
      array[offset + 7] = te[7];
      array[offset + 8] = te[8];
      return array;
    }
    clone() {
      return new this.constructor().fromArray(this.elements);
    }
  };
  var _m3 = /* @__PURE__ */ new Matrix3();
  function arrayNeedsUint32(array) {
    for (let i2 = array.length - 1; i2 >= 0; --i2) {
      if (array[i2] >= 65535) return true;
    }
    return false;
  }
  function createElementNS(name) {
    return document.createElementNS("http://www.w3.org/1999/xhtml", name);
  }
  function createCanvasElement() {
    const canvas2 = createElementNS("canvas");
    canvas2.style.display = "block";
    return canvas2;
  }
  var _cache = {};
  function warnOnce(message) {
    if (message in _cache) return;
    _cache[message] = true;
    console.warn(message);
  }
  function probeAsync(gl, sync, interval) {
    return new Promise(function(resolve, reject) {
      function probe() {
        switch (gl.clientWaitSync(sync, gl.SYNC_FLUSH_COMMANDS_BIT, 0)) {
          case gl.WAIT_FAILED:
            reject();
            break;
          case gl.TIMEOUT_EXPIRED:
            setTimeout(probe, interval);
            break;
          default:
            resolve();
        }
      }
      setTimeout(probe, interval);
    });
  }
  function toNormalizedProjectionMatrix(projectionMatrix) {
    const m2 = projectionMatrix.elements;
    m2[2] = 0.5 * m2[2] + 0.5 * m2[3];
    m2[6] = 0.5 * m2[6] + 0.5 * m2[7];
    m2[10] = 0.5 * m2[10] + 0.5 * m2[11];
    m2[14] = 0.5 * m2[14] + 0.5 * m2[15];
  }
  function toReversedProjectionMatrix(projectionMatrix) {
    const m2 = projectionMatrix.elements;
    const isPerspectiveMatrix = m2[11] === -1;
    if (isPerspectiveMatrix) {
      m2[10] = -m2[10] - 1;
      m2[14] = -m2[14];
    } else {
      m2[10] = -m2[10];
      m2[14] = -m2[14] + 1;
    }
  }
  var LINEAR_REC709_TO_XYZ = /* @__PURE__ */ new Matrix3().set(
    0.4123908,
    0.3575843,
    0.1804808,
    0.212639,
    0.7151687,
    0.0721923,
    0.0193308,
    0.1191948,
    0.9505322
  );
  var XYZ_TO_LINEAR_REC709 = /* @__PURE__ */ new Matrix3().set(
    3.2409699,
    -1.5373832,
    -0.4986108,
    -0.9692436,
    1.8759675,
    0.0415551,
    0.0556301,
    -0.203977,
    1.0569715
  );
  function createColorManagement() {
    const ColorManagement2 = {
      enabled: true,
      workingColorSpace: LinearSRGBColorSpace,
      /**
       * Implementations of supported color spaces.
       *
       * Required:
       *	- primaries: chromaticity coordinates [ rx ry gx gy bx by ]
       *	- whitePoint: reference white [ x y ]
       *	- transfer: transfer function (pre-defined)
       *	- toXYZ: Matrix3 RGB to XYZ transform
       *	- fromXYZ: Matrix3 XYZ to RGB transform
       *	- luminanceCoefficients: RGB luminance coefficients
       *
       * Optional:
       *  - outputColorSpaceConfig: { drawingBufferColorSpace: ColorSpace }
       *  - workingColorSpaceConfig: { unpackColorSpace: ColorSpace }
       *
       * Reference:
       * - https://www.russellcottrell.com/photo/matrixCalculator.htm
       */
      spaces: {},
      convert: function(color, sourceColorSpace, targetColorSpace) {
        if (this.enabled === false || sourceColorSpace === targetColorSpace || !sourceColorSpace || !targetColorSpace) {
          return color;
        }
        if (this.spaces[sourceColorSpace].transfer === SRGBTransfer) {
          color.r = SRGBToLinear(color.r);
          color.g = SRGBToLinear(color.g);
          color.b = SRGBToLinear(color.b);
        }
        if (this.spaces[sourceColorSpace].primaries !== this.spaces[targetColorSpace].primaries) {
          color.applyMatrix3(this.spaces[sourceColorSpace].toXYZ);
          color.applyMatrix3(this.spaces[targetColorSpace].fromXYZ);
        }
        if (this.spaces[targetColorSpace].transfer === SRGBTransfer) {
          color.r = LinearToSRGB(color.r);
          color.g = LinearToSRGB(color.g);
          color.b = LinearToSRGB(color.b);
        }
        return color;
      },
      fromWorkingColorSpace: function(color, targetColorSpace) {
        return this.convert(color, this.workingColorSpace, targetColorSpace);
      },
      toWorkingColorSpace: function(color, sourceColorSpace) {
        return this.convert(color, sourceColorSpace, this.workingColorSpace);
      },
      getPrimaries: function(colorSpace) {
        return this.spaces[colorSpace].primaries;
      },
      getTransfer: function(colorSpace) {
        if (colorSpace === NoColorSpace) return LinearTransfer;
        return this.spaces[colorSpace].transfer;
      },
      getLuminanceCoefficients: function(target, colorSpace = this.workingColorSpace) {
        return target.fromArray(this.spaces[colorSpace].luminanceCoefficients);
      },
      define: function(colorSpaces) {
        Object.assign(this.spaces, colorSpaces);
      },
      // Internal APIs
      _getMatrix: function(targetMatrix, sourceColorSpace, targetColorSpace) {
        return targetMatrix.copy(this.spaces[sourceColorSpace].toXYZ).multiply(this.spaces[targetColorSpace].fromXYZ);
      },
      _getDrawingBufferColorSpace: function(colorSpace) {
        return this.spaces[colorSpace].outputColorSpaceConfig.drawingBufferColorSpace;
      },
      _getUnpackColorSpace: function(colorSpace = this.workingColorSpace) {
        return this.spaces[colorSpace].workingColorSpaceConfig.unpackColorSpace;
      }
    };
    const REC709_PRIMARIES = [0.64, 0.33, 0.3, 0.6, 0.15, 0.06];
    const REC709_LUMINANCE_COEFFICIENTS = [0.2126, 0.7152, 0.0722];
    const D65 = [0.3127, 0.329];
    ColorManagement2.define({
      [LinearSRGBColorSpace]: {
        primaries: REC709_PRIMARIES,
        whitePoint: D65,
        transfer: LinearTransfer,
        toXYZ: LINEAR_REC709_TO_XYZ,
        fromXYZ: XYZ_TO_LINEAR_REC709,
        luminanceCoefficients: REC709_LUMINANCE_COEFFICIENTS,
        workingColorSpaceConfig: { unpackColorSpace: SRGBColorSpace },
        outputColorSpaceConfig: { drawingBufferColorSpace: SRGBColorSpace }
      },
      [SRGBColorSpace]: {
        primaries: REC709_PRIMARIES,
        whitePoint: D65,
        transfer: SRGBTransfer,
        toXYZ: LINEAR_REC709_TO_XYZ,
        fromXYZ: XYZ_TO_LINEAR_REC709,
        luminanceCoefficients: REC709_LUMINANCE_COEFFICIENTS,
        outputColorSpaceConfig: { drawingBufferColorSpace: SRGBColorSpace }
      }
    });
    return ColorManagement2;
  }
  var ColorManagement = /* @__PURE__ */ createColorManagement();
  function SRGBToLinear(c2) {
    return c2 < 0.04045 ? c2 * 0.0773993808 : Math.pow(c2 * 0.9478672986 + 0.0521327014, 2.4);
  }
  function LinearToSRGB(c2) {
    return c2 < 31308e-7 ? c2 * 12.92 : 1.055 * Math.pow(c2, 0.41666) - 0.055;
  }
  var _canvas;
  var ImageUtils = class {
    static getDataURL(image) {
      if (/^data:/i.test(image.src)) {
        return image.src;
      }
      if (typeof HTMLCanvasElement === "undefined") {
        return image.src;
      }
      let canvas2;
      if (image instanceof HTMLCanvasElement) {
        canvas2 = image;
      } else {
        if (_canvas === void 0) _canvas = createElementNS("canvas");
        _canvas.width = image.width;
        _canvas.height = image.height;
        const context = _canvas.getContext("2d");
        if (image instanceof ImageData) {
          context.putImageData(image, 0, 0);
        } else {
          context.drawImage(image, 0, 0, image.width, image.height);
        }
        canvas2 = _canvas;
      }
      if (canvas2.width > 2048 || canvas2.height > 2048) {
        console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons", image);
        return canvas2.toDataURL("image/jpeg", 0.6);
      } else {
        return canvas2.toDataURL("image/png");
      }
    }
    static sRGBToLinear(image) {
      if (typeof HTMLImageElement !== "undefined" && image instanceof HTMLImageElement || typeof HTMLCanvasElement !== "undefined" && image instanceof HTMLCanvasElement || typeof ImageBitmap !== "undefined" && image instanceof ImageBitmap) {
        const canvas2 = createElementNS("canvas");
        canvas2.width = image.width;
        canvas2.height = image.height;
        const context = canvas2.getContext("2d");
        context.drawImage(image, 0, 0, image.width, image.height);
        const imageData = context.getImageData(0, 0, image.width, image.height);
        const data = imageData.data;
        for (let i2 = 0; i2 < data.length; i2++) {
          data[i2] = SRGBToLinear(data[i2] / 255) * 255;
        }
        context.putImageData(imageData, 0, 0);
        return canvas2;
      } else if (image.data) {
        const data = image.data.slice(0);
        for (let i2 = 0; i2 < data.length; i2++) {
          if (data instanceof Uint8Array || data instanceof Uint8ClampedArray) {
            data[i2] = Math.floor(SRGBToLinear(data[i2] / 255) * 255);
          } else {
            data[i2] = SRGBToLinear(data[i2]);
          }
        }
        return {
          data,
          width: image.width,
          height: image.height
        };
      } else {
        console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.");
        return image;
      }
    }
  };
  var _sourceId = 0;
  var Source = class {
    constructor(data = null) {
      this.isSource = true;
      Object.defineProperty(this, "id", { value: _sourceId++ });
      this.uuid = generateUUID();
      this.data = data;
      this.dataReady = true;
      this.version = 0;
    }
    set needsUpdate(value) {
      if (value === true) this.version++;
    }
    toJSON(meta) {
      const isRootObject = meta === void 0 || typeof meta === "string";
      if (!isRootObject && meta.images[this.uuid] !== void 0) {
        return meta.images[this.uuid];
      }
      const output = {
        uuid: this.uuid,
        url: ""
      };
      const data = this.data;
      if (data !== null) {
        let url;
        if (Array.isArray(data)) {
          url = [];
          for (let i2 = 0, l2 = data.length; i2 < l2; i2++) {
            if (data[i2].isDataTexture) {
              url.push(serializeImage(data[i2].image));
            } else {
              url.push(serializeImage(data[i2]));
            }
          }
        } else {
          url = serializeImage(data);
        }
        output.url = url;
      }
      if (!isRootObject) {
        meta.images[this.uuid] = output;
      }
      return output;
    }
  };
  function serializeImage(image) {
    if (typeof HTMLImageElement !== "undefined" && image instanceof HTMLImageElement || typeof HTMLCanvasElement !== "undefined" && image instanceof HTMLCanvasElement || typeof ImageBitmap !== "undefined" && image instanceof ImageBitmap) {
      return ImageUtils.getDataURL(image);
    } else {
      if (image.data) {
        return {
          data: Array.from(image.data),
          width: image.width,
          height: image.height,
          type: image.data.constructor.name
        };
      } else {
        console.warn("THREE.Texture: Unable to serialize Texture.");
        return {};
      }
    }
  }
  var _textureId = 0;
  var Texture = class _Texture extends EventDispatcher {
    constructor(image = _Texture.DEFAULT_IMAGE, mapping = _Texture.DEFAULT_MAPPING, wrapS = ClampToEdgeWrapping, wrapT = ClampToEdgeWrapping, magFilter = LinearFilter, minFilter = LinearMipmapLinearFilter, format = RGBAFormat, type = UnsignedByteType, anisotropy = _Texture.DEFAULT_ANISOTROPY, colorSpace = NoColorSpace) {
      super();
      this.isTexture = true;
      Object.defineProperty(this, "id", { value: _textureId++ });
      this.uuid = generateUUID();
      this.name = "";
      this.source = new Source(image);
      this.mipmaps = [];
      this.mapping = mapping;
      this.channel = 0;
      this.wrapS = wrapS;
      this.wrapT = wrapT;
      this.magFilter = magFilter;
      this.minFilter = minFilter;
      this.anisotropy = anisotropy;
      this.format = format;
      this.internalFormat = null;
      this.type = type;
      this.offset = new Vector2(0, 0);
      this.repeat = new Vector2(1, 1);
      this.center = new Vector2(0, 0);
      this.rotation = 0;
      this.matrixAutoUpdate = true;
      this.matrix = new Matrix3();
      this.generateMipmaps = true;
      this.premultiplyAlpha = false;
      this.flipY = true;
      this.unpackAlignment = 4;
      this.colorSpace = colorSpace;
      this.userData = {};
      this.version = 0;
      this.onUpdate = null;
      this.isRenderTargetTexture = false;
      this.pmremVersion = 0;
    }
    get image() {
      return this.source.data;
    }
    set image(value = null) {
      this.source.data = value;
    }
    updateMatrix() {
      this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y);
    }
    clone() {
      return new this.constructor().copy(this);
    }
    copy(source) {
      this.name = source.name;
      this.source = source.source;
      this.mipmaps = source.mipmaps.slice(0);
      this.mapping = source.mapping;
      this.channel = source.channel;
      this.wrapS = source.wrapS;
      this.wrapT = source.wrapT;
      this.magFilter = source.magFilter;
      this.minFilter = source.minFilter;
      this.anisotropy = source.anisotropy;
      this.format = source.format;
      this.internalFormat = source.internalFormat;
      this.type = source.type;
      this.offset.copy(source.offset);
      this.repeat.copy(source.repeat);
      this.center.copy(source.center);
      this.rotation = source.rotation;
      this.matrixAutoUpdate = source.matrixAutoUpdate;
      this.matrix.copy(source.matrix);
      this.generateMipmaps = source.generateMipmaps;
      this.premultiplyAlpha = source.premultiplyAlpha;
      this.flipY = source.flipY;
      this.unpackAlignment = source.unpackAlignment;
      this.colorSpace = source.colorSpace;
      this.userData = JSON.parse(JSON.stringify(source.userData));
      this.needsUpdate = true;
      return this;
    }
    toJSON(meta) {
      const isRootObject = meta === void 0 || typeof meta === "string";
      if (!isRootObject && meta.textures[this.uuid] !== void 0) {
        return meta.textures[this.uuid];
      }
      const output = {
        metadata: {
          version: 4.6,
          type: "Texture",
          generator: "Texture.toJSON"
        },
        uuid: this.uuid,
        name: this.name,
        image: this.source.toJSON(meta).uuid,
        mapping: this.mapping,
        channel: this.channel,
        repeat: [this.repeat.x, this.repeat.y],
        offset: [this.offset.x, this.offset.y],
        center: [this.center.x, this.center.y],
        rotation: this.rotation,
        wrap: [this.wrapS, this.wrapT],
        format: this.format,
        internalFormat: this.internalFormat,
        type: this.type,
        colorSpace: this.colorSpace,
        minFilter: this.minFilter,
        magFilter: this.magFilter,
        anisotropy: this.anisotropy,
        flipY: this.flipY,
        generateMipmaps: this.generateMipmaps,
        premultiplyAlpha: this.premultiplyAlpha,
        unpackAlignment: this.unpackAlignment
      };
      if (Object.keys(this.userData).length > 0) output.userData = this.userData;
      if (!isRootObject) {
        meta.textures[this.uuid] = output;
      }
      return output;
    }
    dispose() {
      this.dispatchEvent({ type: "dispose" });
    }
    transformUv(uv) {
      if (this.mapping !== UVMapping) return uv;
      uv.applyMatrix3(this.matrix);
      if (uv.x < 0 || uv.x > 1) {
        switch (this.wrapS) {
          case RepeatWrapping:
            uv.x = uv.x - Math.floor(uv.x);
            break;
          case ClampToEdgeWrapping:
            uv.x = uv.x < 0 ? 0 : 1;
            break;
          case MirroredRepeatWrapping:
            if (Math.abs(Math.floor(uv.x) % 2) === 1) {
              uv.x = Math.ceil(uv.x) - uv.x;
            } else {
              uv.x = uv.x - Math.floor(uv.x);
            }
            break;
        }
      }
      if (uv.y < 0 || uv.y > 1) {
        switch (this.wrapT) {
          case RepeatWrapping:
            uv.y = uv.y - Math.floor(uv.y);
            break;
          case ClampToEdgeWrapping:
            uv.y = uv.y < 0 ? 0 : 1;
            break;
          case MirroredRepeatWrapping:
            if (Math.abs(Math.floor(uv.y) % 2) === 1) {
              uv.y = Math.ceil(uv.y) - uv.y;
            } else {
              uv.y = uv.y - Math.floor(uv.y);
            }
            break;
        }
      }
      if (this.flipY) {
        uv.y = 1 - uv.y;
      }
      return uv;
    }
    set needsUpdate(value) {
      if (value === true) {
        this.version++;
        this.source.needsUpdate = true;
      }
    }
    set needsPMREMUpdate(value) {
      if (value === true) {
        this.pmremVersion++;
      }
    }
  };
  Texture.DEFAULT_IMAGE = null;
  Texture.DEFAULT_MAPPING = UVMapping;
  Texture.DEFAULT_ANISOTROPY = 1;
  var Vector4 = class _Vector4 {
    constructor(x2 = 0, y2 = 0, z = 0, w2 = 1) {
      _Vector4.prototype.isVector4 = true;
      this.x = x2;
      this.y = y2;
      this.z = z;
      this.w = w2;
    }
    get width() {
      return this.z;
    }
    set width(value) {
      this.z = value;
    }
    get height() {
      return this.w;
    }
    set height(value) {
      this.w = value;
    }
    set(x2, y2, z, w2) {
      this.x = x2;
      this.y = y2;
      this.z = z;
      this.w = w2;
      return this;
    }
    setScalar(scalar) {
      this.x = scalar;
      this.y = scalar;
      this.z = scalar;
      this.w = scalar;
      return this;
    }
    setX(x2) {
      this.x = x2;
      return this;
    }
    setY(y2) {
      this.y = y2;
      return this;
    }
    setZ(z) {
      this.z = z;
      return this;
    }
    setW(w2) {
      this.w = w2;
      return this;
    }
    setComponent(index, value) {
      switch (index) {
        case 0:
          this.x = value;
          break;
        case 1:
          this.y = value;
          break;
        case 2:
          this.z = value;
          break;
        case 3:
          this.w = value;
          break;
        default:
          throw new Error("index is out of range: " + index);
      }
      return this;
    }
    getComponent(index) {
      switch (index) {
        case 0:
          return this.x;
        case 1:
          return this.y;
        case 2:
          return this.z;
        case 3:
          return this.w;
        default:
          throw new Error("index is out of range: " + index);
      }
    }
    clone() {
      return new this.constructor(this.x, this.y, this.z, this.w);
    }
    copy(v) {
      this.x = v.x;
      this.y = v.y;
      this.z = v.z;
      this.w = v.w !== void 0 ? v.w : 1;
      return this;
    }
    add(v) {
      this.x += v.x;
      this.y += v.y;
      this.z += v.z;
      this.w += v.w;
      return this;
    }
    addScalar(s2) {
      this.x += s2;
      this.y += s2;
      this.z += s2;
      this.w += s2;
      return this;
    }
    addVectors(a2, b2) {
      this.x = a2.x + b2.x;
      this.y = a2.y + b2.y;
      this.z = a2.z + b2.z;
      this.w = a2.w + b2.w;
      return this;
    }
    addScaledVector(v, s2) {
      this.x += v.x * s2;
      this.y += v.y * s2;
      this.z += v.z * s2;
      this.w += v.w * s2;
      return this;
    }
    sub(v) {
      this.x -= v.x;
      this.y -= v.y;
      this.z -= v.z;
      this.w -= v.w;
      return this;
    }
    subScalar(s2) {
      this.x -= s2;
      this.y -= s2;
      this.z -= s2;
      this.w -= s2;
      return this;
    }
    subVectors(a2, b2) {
      this.x = a2.x - b2.x;
      this.y = a2.y - b2.y;
      this.z = a2.z - b2.z;
      this.w = a2.w - b2.w;
      return this;
    }
    multiply(v) {
      this.x *= v.x;
      this.y *= v.y;
      this.z *= v.z;
      this.w *= v.w;
      return this;
    }
    multiplyScalar(scalar) {
      this.x *= scalar;
      this.y *= scalar;
      this.z *= scalar;
      this.w *= scalar;
      return this;
    }
    applyMatrix4(m2) {
      const x2 = this.x, y2 = this.y, z = this.z, w2 = this.w;
      const e = m2.elements;
      this.x = e[0] * x2 + e[4] * y2 + e[8] * z + e[12] * w2;
      this.y = e[1] * x2 + e[5] * y2 + e[9] * z + e[13] * w2;
      this.z = e[2] * x2 + e[6] * y2 + e[10] * z + e[14] * w2;
      this.w = e[3] * x2 + e[7] * y2 + e[11] * z + e[15] * w2;
      return this;
    }
    divide(v) {
      this.x /= v.x;
      this.y /= v.y;
      this.z /= v.z;
      this.w /= v.w;
      return this;
    }
    divideScalar(scalar) {
      return this.multiplyScalar(1 / scalar);
    }
    setAxisAngleFromQuaternion(q2) {
      this.w = 2 * Math.acos(q2.w);
      const s2 = Math.sqrt(1 - q2.w * q2.w);
      if (s2 < 1e-4) {
        this.x = 1;
        this.y = 0;
        this.z = 0;
      } else {
        this.x = q2.x / s2;
        this.y = q2.y / s2;
        this.z = q2.z / s2;
      }
      return this;
    }
    setAxisAngleFromRotationMatrix(m2) {
      let angle, x2, y2, z;
      const epsilon = 0.01, epsilon2 = 0.1, te = m2.elements, m11 = te[0], m12 = te[4], m13 = te[8], m21 = te[1], m22 = te[5], m23 = te[9], m31 = te[2], m32 = te[6], m33 = te[10];
      if (Math.abs(m12 - m21) < epsilon && Math.abs(m13 - m31) < epsilon && Math.abs(m23 - m32) < epsilon) {
        if (Math.abs(m12 + m21) < epsilon2 && Math.abs(m13 + m31) < epsilon2 && Math.abs(m23 + m32) < epsilon2 && Math.abs(m11 + m22 + m33 - 3) < epsilon2) {
          this.set(1, 0, 0, 0);
          return this;
        }
        angle = Math.PI;
        const xx = (m11 + 1) / 2;
        const yy = (m22 + 1) / 2;
        const zz = (m33 + 1) / 2;
        const xy = (m12 + m21) / 4;
        const xz = (m13 + m31) / 4;
        const yz = (m23 + m32) / 4;
        if (xx > yy && xx > zz) {
          if (xx < epsilon) {
            x2 = 0;
            y2 = 0.707106781;
            z = 0.707106781;
          } else {
            x2 = Math.sqrt(xx);
            y2 = xy / x2;
            z = xz / x2;
          }
        } else if (yy > zz) {
          if (yy < epsilon) {
            x2 = 0.707106781;
            y2 = 0;
            z = 0.707106781;
          } else {
            y2 = Math.sqrt(yy);
            x2 = xy / y2;
            z = yz / y2;
          }
        } else {
          if (zz < epsilon) {
            x2 = 0.707106781;
            y2 = 0.707106781;
            z = 0;
          } else {
            z = Math.sqrt(zz);
            x2 = xz / z;
            y2 = yz / z;
          }
        }
        this.set(x2, y2, z, angle);
        return this;
      }
      let s2 = Math.sqrt((m32 - m23) * (m32 - m23) + (m13 - m31) * (m13 - m31) + (m21 - m12) * (m21 - m12));
      if (Math.abs(s2) < 1e-3) s2 = 1;
      this.x = (m32 - m23) / s2;
      this.y = (m13 - m31) / s2;
      this.z = (m21 - m12) / s2;
      this.w = Math.acos((m11 + m22 + m33 - 1) / 2);
      return this;
    }
    setFromMatrixPosition(m2) {
      const e = m2.elements;
      this.x = e[12];
      this.y = e[13];
      this.z = e[14];
      this.w = e[15];
      return this;
    }
    min(v) {
      this.x = Math.min(this.x, v.x);
      this.y = Math.min(this.y, v.y);
      this.z = Math.min(this.z, v.z);
      this.w = Math.min(this.w, v.w);
      return this;
    }
    max(v) {
      this.x = Math.max(this.x, v.x);
      this.y = Math.max(this.y, v.y);
      this.z = Math.max(this.z, v.z);
      this.w = Math.max(this.w, v.w);
      return this;
    }
    clamp(min, max) {
      this.x = clamp(this.x, min.x, max.x);
      this.y = clamp(this.y, min.y, max.y);
      this.z = clamp(this.z, min.z, max.z);
      this.w = clamp(this.w, min.w, max.w);
      return this;
    }
    clampScalar(minVal, maxVal) {
      this.x = clamp(this.x, minVal, maxVal);
      this.y = clamp(this.y, minVal, maxVal);
      this.z = clamp(this.z, minVal, maxVal);
      this.w = clamp(this.w, minVal, maxVal);
      return this;
    }
    clampLength(min, max) {
      const length = this.length();
      return this.divideScalar(length || 1).multiplyScalar(clamp(length, min, max));
    }
    floor() {
      this.x = Math.floor(this.x);
      this.y = Math.floor(this.y);
      this.z = Math.floor(this.z);
      this.w = Math.floor(this.w);
      return this;
    }
    ceil() {
      this.x = Math.ceil(this.x);
      this.y = Math.ceil(this.y);
      this.z = Math.ceil(this.z);
      this.w = Math.ceil(this.w);
      return this;
    }
    round() {
      this.x = Math.round(this.x);
      this.y = Math.round(this.y);
      this.z = Math.round(this.z);
      this.w = Math.round(this.w);
      return this;
    }
    roundToZero() {
      this.x = Math.trunc(this.x);
      this.y = Math.trunc(this.y);
      this.z = Math.trunc(this.z);
      this.w = Math.trunc(this.w);
      return this;
    }
    negate() {
      this.x = -this.x;
      this.y = -this.y;
      this.z = -this.z;
      this.w = -this.w;
      return this;
    }
    dot(v) {
      return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w;
    }
    lengthSq() {
      return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
    }
    length() {
      return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
    }
    manhattanLength() {
      return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w);
    }
    normalize() {
      return this.divideScalar(this.length() || 1);
    }
    setLength(length) {
      return this.normalize().multiplyScalar(length);
    }
    lerp(v, alpha) {
      this.x += (v.x - this.x) * alpha;
      this.y += (v.y - this.y) * alpha;
      this.z += (v.z - this.z) * alpha;
      this.w += (v.w - this.w) * alpha;
      return this;
    }
    lerpVectors(v1, v2, alpha) {
      this.x = v1.x + (v2.x - v1.x) * alpha;
      this.y = v1.y + (v2.y - v1.y) * alpha;
      this.z = v1.z + (v2.z - v1.z) * alpha;
      this.w = v1.w + (v2.w - v1.w) * alpha;
      return this;
    }
    equals(v) {
      return v.x === this.x && v.y === this.y && v.z === this.z && v.w === this.w;
    }
    fromArray(array, offset = 0) {
      this.x = array[offset];
      this.y = array[offset + 1];
      this.z = array[offset + 2];
      this.w = array[offset + 3];
      return this;
    }
    toArray(array = [], offset = 0) {
      array[offset] = this.x;
      array[offset + 1] = this.y;
      array[offset + 2] = this.z;
      array[offset + 3] = this.w;
      return array;
    }
    fromBufferAttribute(attribute, index) {
      this.x = attribute.getX(index);
      this.y = attribute.getY(index);
      this.z = attribute.getZ(index);
      this.w = attribute.getW(index);
      return this;
    }
    random() {
      this.x = Math.random();
      this.y = Math.random();
      this.z = Math.random();
      this.w = Math.random();
      return this;
    }
    *[Symbol.iterator]() {
      yield this.x;
      yield this.y;
      yield this.z;
      yield this.w;
    }
  };
  var RenderTarget = class extends EventDispatcher {
    constructor(width = 1, height = 1, options = {}) {
      super();
      this.isRenderTarget = true;
      this.width = width;
      this.height = height;
      this.depth = 1;
      this.scissor = new Vector4(0, 0, width, height);
      this.scissorTest = false;
      this.viewport = new Vector4(0, 0, width, height);
      const image = { width, height, depth: 1 };
      options = Object.assign({
        generateMipmaps: false,
        internalFormat: null,
        minFilter: LinearFilter,
        depthBuffer: true,
        stencilBuffer: false,
        resolveDepthBuffer: true,
        resolveStencilBuffer: true,
        depthTexture: null,
        samples: 0,
        count: 1
      }, options);
      const texture = new Texture(image, options.mapping, options.wrapS, options.wrapT, options.magFilter, options.minFilter, options.format, options.type, options.anisotropy, options.colorSpace);
      texture.flipY = false;
      texture.generateMipmaps = options.generateMipmaps;
      texture.internalFormat = options.internalFormat;
      this.textures = [];
      const count = options.count;
      for (let i2 = 0; i2 < count; i2++) {
        this.textures[i2] = texture.clone();
        this.textures[i2].isRenderTargetTexture = true;
      }
      this.depthBuffer = options.depthBuffer;
      this.stencilBuffer = options.stencilBuffer;
      this.resolveDepthBuffer = options.resolveDepthBuffer;
      this.resolveStencilBuffer = options.resolveStencilBuffer;
      this.depthTexture = options.depthTexture;
      this.samples = options.samples;
    }
    get texture() {
      return this.textures[0];
    }
    set texture(value) {
      this.textures[0] = value;
    }
    setSize(width, height, depth = 1) {
      if (this.width !== width || this.height !== height || this.depth !== depth) {
        this.width = width;
        this.height = height;
        this.depth = depth;
        for (let i2 = 0, il = this.textures.length; i2 < il; i2++) {
          this.textures[i2].image.width = width;
          this.textures[i2].image.height = height;
          this.textures[i2].image.depth = depth;
        }
        this.dispose();
      }
      this.viewport.set(0, 0, width, height);
      this.scissor.set(0, 0, width, height);
    }
    clone() {
      return new this.constructor().copy(this);
    }
    copy(source) {
      this.width = source.width;
      this.height = source.height;
      this.depth = source.depth;
      this.scissor.copy(source.scissor);
      this.scissorTest = source.scissorTest;
      this.viewport.copy(source.viewport);
      this.textures.length = 0;
      for (let i2 = 0, il = source.textures.length; i2 < il; i2++) {
        this.textures[i2] = source.textures[i2].clone();
        this.textures[i2].isRenderTargetTexture = true;
      }
      const image = Object.assign({}, source.texture.image);
      this.texture.source = new Source(image);
      this.depthBuffer = source.depthBuffer;
      this.stencilBuffer = source.stencilBuffer;
      this.resolveDepthBuffer = source.resolveDepthBuffer;
      this.resolveStencilBuffer = source.resolveStencilBuffer;
      if (source.depthTexture !== null) this.depthTexture = source.depthTexture.clone();
      this.samples = source.samples;
      return this;
    }
    dispose() {
      this.dispatchEvent({ type: "dispose" });
    }
  };
  var WebGLRenderTarget = class extends RenderTarget {
    constructor(width = 1, height = 1, options = {}) {
      super(width, height, options);
      this.isWebGLRenderTarget = true;
    }
  };
  var DataArrayTexture = class extends Texture {
    constructor(data = null, width = 1, height = 1, depth = 1) {
      super(null);
      this.isDataArrayTexture = true;
      this.image = { data, width, height, depth };
      this.magFilter = NearestFilter;
      this.minFilter = NearestFilter;
      this.wrapR = ClampToEdgeWrapping;
      this.generateMipmaps = false;
      this.flipY = false;
      this.unpackAlignment = 1;
      this.layerUpdates = /* @__PURE__ */ new Set();
    }
    addLayerUpdate(layerIndex) {
      this.layerUpdates.add(layerIndex);
    }
    clearLayerUpdates() {
      this.layerUpdates.clear();
    }
  };
  var Data3DTexture = class extends Texture {
    constructor(data = null, width = 1, height = 1, depth = 1) {
      super(null);
      this.isData3DTexture = true;
      this.image = { data, width, height, depth };
      this.magFilter = NearestFilter;
      this.minFilter = NearestFilter;
      this.wrapR = ClampToEdgeWrapping;
      this.generateMipmaps = false;
      this.flipY = false;
      this.unpackAlignment = 1;
    }
  };
  var Quaternion = class {
    constructor(x2 = 0, y2 = 0, z = 0, w2 = 1) {
      this.isQuaternion = true;
      this._x = x2;
      this._y = y2;
      this._z = z;
      this._w = w2;
    }
    static slerpFlat(dst, dstOffset, src0, srcOffset0, src1, srcOffset1, t) {
      let x0 = src0[srcOffset0 + 0], y0 = src0[srcOffset0 + 1], z0 = src0[srcOffset0 + 2], w0 = src0[srcOffset0 + 3];
      const x1 = src1[srcOffset1 + 0], y1 = src1[srcOffset1 + 1], z1 = src1[srcOffset1 + 2], w1 = src1[srcOffset1 + 3];
      if (t === 0) {
        dst[dstOffset + 0] = x0;
        dst[dstOffset + 1] = y0;
        dst[dstOffset + 2] = z0;
        dst[dstOffset + 3] = w0;
        return;
      }
      if (t === 1) {
        dst[dstOffset + 0] = x1;
        dst[dstOffset + 1] = y1;
        dst[dstOffset + 2] = z1;
        dst[dstOffset + 3] = w1;
        return;
      }
      if (w0 !== w1 || x0 !== x1 || y0 !== y1 || z0 !== z1) {
        let s2 = 1 - t;
        const cos = x0 * x1 + y0 * y1 + z0 * z1 + w0 * w1, dir = cos >= 0 ? 1 : -1, sqrSin = 1 - cos * cos;
        if (sqrSin > Number.EPSILON) {
          const sin = Math.sqrt(sqrSin), len = Math.atan2(sin, cos * dir);
          s2 = Math.sin(s2 * len) / sin;
          t = Math.sin(t * len) / sin;
        }
        const tDir = t * dir;
        x0 = x0 * s2 + x1 * tDir;
        y0 = y0 * s2 + y1 * tDir;
        z0 = z0 * s2 + z1 * tDir;
        w0 = w0 * s2 + w1 * tDir;
        if (s2 === 1 - t) {
          const f2 = 1 / Math.sqrt(x0 * x0 + y0 * y0 + z0 * z0 + w0 * w0);
          x0 *= f2;
          y0 *= f2;
          z0 *= f2;
          w0 *= f2;
        }
      }
      dst[dstOffset] = x0;
      dst[dstOffset + 1] = y0;
      dst[dstOffset + 2] = z0;
      dst[dstOffset + 3] = w0;
    }
    static multiplyQuaternionsFlat(dst, dstOffset, src0, srcOffset0, src1, srcOffset1) {
      const x0 = src0[srcOffset0];
      const y0 = src0[srcOffset0 + 1];
      const z0 = src0[srcOffset0 + 2];
      const w0 = src0[srcOffset0 + 3];
      const x1 = src1[srcOffset1];
      const y1 = src1[srcOffset1 + 1];
      const z1 = src1[srcOffset1 + 2];
      const w1 = src1[srcOffset1 + 3];
      dst[dstOffset] = x0 * w1 + w0 * x1 + y0 * z1 - z0 * y1;
      dst[dstOffset + 1] = y0 * w1 + w0 * y1 + z0 * x1 - x0 * z1;
      dst[dstOffset + 2] = z0 * w1 + w0 * z1 + x0 * y1 - y0 * x1;
      dst[dstOffset + 3] = w0 * w1 - x0 * x1 - y0 * y1 - z0 * z1;
      return dst;
    }
    get x() {
      return this._x;
    }
    set x(value) {
      this._x = value;
      this._onChangeCallback();
    }
    get y() {
      return this._y;
    }
    set y(value) {
      this._y = value;
      this._onChangeCallback();
    }
    get z() {
      return this._z;
    }
    set z(value) {
      this._z = value;
      this._onChangeCallback();
    }
    get w() {
      return this._w;
    }
    set w(value) {
      this._w = value;
      this._onChangeCallback();
    }
    set(x2, y2, z, w2) {
      this._x = x2;
      this._y = y2;
      this._z = z;
      this._w = w2;
      this._onChangeCallback();
      return this;
    }
    clone() {
      return new this.constructor(this._x, this._y, this._z, this._w);
    }
    copy(quaternion) {
      this._x = quaternion.x;
      this._y = quaternion.y;
      this._z = quaternion.z;
      this._w = quaternion.w;
      this._onChangeCallback();
      return this;
    }
    setFromEuler(euler, update = true) {
      const x2 = euler._x, y2 = euler._y, z = euler._z, order = euler._order;
      const cos = Math.cos;
      const sin = Math.sin;
      const c1 = cos(x2 / 2);
      const c2 = cos(y2 / 2);
      const c3 = cos(z / 2);
      const s1 = sin(x2 / 2);
      const s2 = sin(y2 / 2);
      const s3 = sin(z / 2);
      switch (order) {
        case "XYZ":
          this._x = s1 * c2 * c3 + c1 * s2 * s3;
          this._y = c1 * s2 * c3 - s1 * c2 * s3;
          this._z = c1 * c2 * s3 + s1 * s2 * c3;
          this._w = c1 * c2 * c3 - s1 * s2 * s3;
          break;
        case "YXZ":
          this._x = s1 * c2 * c3 + c1 * s2 * s3;
          this._y = c1 * s2 * c3 - s1 * c2 * s3;
          this._z = c1 * c2 * s3 - s1 * s2 * c3;
          this._w = c1 * c2 * c3 + s1 * s2 * s3;
          break;
        case "ZXY":
          this._x = s1 * c2 * c3 - c1 * s2 * s3;
          this._y = c1 * s2 * c3 + s1 * c2 * s3;
          this._z = c1 * c2 * s3 + s1 * s2 * c3;
          this._w = c1 * c2 * c3 - s1 * s2 * s3;
          break;
        case "ZYX":
          this._x = s1 * c2 * c3 - c1 * s2 * s3;
          this._y = c1 * s2 * c3 + s1 * c2 * s3;
          this._z = c1 * c2 * s3 - s1 * s2 * c3;
          this._w = c1 * c2 * c3 + s1 * s2 * s3;
          break;
        case "YZX":
          this._x = s1 * c2 * c3 + c1 * s2 * s3;
          this._y = c1 * s2 * c3 + s1 * c2 * s3;
          this._z = c1 * c2 * s3 - s1 * s2 * c3;
          this._w = c1 * c2 * c3 - s1 * s2 * s3;
          break;
        case "XZY":
          this._x = s1 * c2 * c3 - c1 * s2 * s3;
          this._y = c1 * s2 * c3 - s1 * c2 * s3;
          this._z = c1 * c2 * s3 + s1 * s2 * c3;
          this._w = c1 * c2 * c3 + s1 * s2 * s3;
          break;
        default:
          console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: " + order);
      }
      if (update === true) this._onChangeCallback();
      return this;
    }
    setFromAxisAngle(axis, angle) {
      const halfAngle = angle / 2, s2 = Math.sin(halfAngle);
      this._x = axis.x * s2;
      this._y = axis.y * s2;
      this._z = axis.z * s2;
      this._w = Math.cos(halfAngle);
      this._onChangeCallback();
      return this;
    }
    setFromRotationMatrix(m2) {
      const te = m2.elements, m11 = te[0], m12 = te[4], m13 = te[8], m21 = te[1], m22 = te[5], m23 = te[9], m31 = te[2], m32 = te[6], m33 = te[10], trace = m11 + m22 + m33;
      if (trace > 0) {
        const s2 = 0.5 / Math.sqrt(trace + 1);
        this._w = 0.25 / s2;
        this._x = (m32 - m23) * s2;
        this._y = (m13 - m31) * s2;
        this._z = (m21 - m12) * s2;
      } else if (m11 > m22 && m11 > m33) {
        const s2 = 2 * Math.sqrt(1 + m11 - m22 - m33);
        this._w = (m32 - m23) / s2;
        this._x = 0.25 * s2;
        this._y = (m12 + m21) / s2;
        this._z = (m13 + m31) / s2;
      } else if (m22 > m33) {
        const s2 = 2 * Math.sqrt(1 + m22 - m11 - m33);
        this._w = (m13 - m31) / s2;
        this._x = (m12 + m21) / s2;
        this._y = 0.25 * s2;
        this._z = (m23 + m32) / s2;
      } else {
        const s2 = 2 * Math.sqrt(1 + m33 - m11 - m22);
        this._w = (m21 - m12) / s2;
        this._x = (m13 + m31) / s2;
        this._y = (m23 + m32) / s2;
        this._z = 0.25 * s2;
      }
      this._onChangeCallback();
      return this;
    }
    setFromUnitVectors(vFrom, vTo) {
      let r2 = vFrom.dot(vTo) + 1;
      if (r2 < Number.EPSILON) {
        r2 = 0;
        if (Math.abs(vFrom.x) > Math.abs(vFrom.z)) {
          this._x = -vFrom.y;
          this._y = vFrom.x;
          this._z = 0;
          this._w = r2;
        } else {
          this._x = 0;
          this._y = -vFrom.z;
          this._z = vFrom.y;
          this._w = r2;
        }
      } else {
        this._x = vFrom.y * vTo.z - vFrom.z * vTo.y;
        this._y = vFrom.z * vTo.x - vFrom.x * vTo.z;
        this._z = vFrom.x * vTo.y - vFrom.y * vTo.x;
        this._w = r2;
      }
      return this.normalize();
    }
    angleTo(q2) {
      return 2 * Math.acos(Math.abs(clamp(this.dot(q2), -1, 1)));
    }
    rotateTowards(q2, step) {
      const angle = this.angleTo(q2);
      if (angle === 0) return this;
      const t = Math.min(1, step / angle);
      this.slerp(q2, t);
      return this;
    }
    identity() {
      return this.set(0, 0, 0, 1);
    }
    invert() {
      return this.conjugate();
    }
    conjugate() {
      this._x *= -1;
      this._y *= -1;
      this._z *= -1;
      this._onChangeCallback();
      return this;
    }
    dot(v) {
      return this._x * v._x + this._y * v._y + this._z * v._z + this._w * v._w;
    }
    lengthSq() {
      return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
    }
    length() {
      return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
    }
    normalize() {
      let l2 = this.length();
      if (l2 === 0) {
        this._x = 0;
        this._y = 0;
        this._z = 0;
        this._w = 1;
      } else {
        l2 = 1 / l2;
        this._x = this._x * l2;
        this._y = this._y * l2;
        this._z = this._z * l2;
        this._w = this._w * l2;
      }
      this._onChangeCallback();
      return this;
    }
    multiply(q2) {
      return this.multiplyQuaternions(this, q2);
    }
    premultiply(q2) {
      return this.multiplyQuaternions(q2, this);
    }
    multiplyQuaternions(a2, b2) {
      const qax = a2._x, qay = a2._y, qaz = a2._z, qaw = a2._w;
      const qbx = b2._x, qby = b2._y, qbz = b2._z, qbw = b2._w;
      this._x = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
      this._y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
      this._z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
      this._w = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;
      this._onChangeCallback();
      return this;
    }
    slerp(qb, t) {
      if (t === 0) return this;
      if (t === 1) return this.copy(qb);
      const x2 = this._x, y2 = this._y, z = this._z, w2 = this._w;
      let cosHalfTheta = w2 * qb._w + x2 * qb._x + y2 * qb._y + z * qb._z;
      if (cosHalfTheta < 0) {
        this._w = -qb._w;
        this._x = -qb._x;
        this._y = -qb._y;
        this._z = -qb._z;
        cosHalfTheta = -cosHalfTheta;
      } else {
        this.copy(qb);
      }
      if (cosHalfTheta >= 1) {
        this._w = w2;
        this._x = x2;
        this._y = y2;
        this._z = z;
        return this;
      }
      const sqrSinHalfTheta = 1 - cosHalfTheta * cosHalfTheta;
      if (sqrSinHalfTheta <= Number.EPSILON) {
        const s2 = 1 - t;
        this._w = s2 * w2 + t * this._w;
        this._x = s2 * x2 + t * this._x;
        this._y = s2 * y2 + t * this._y;
        this._z = s2 * z + t * this._z;
        this.normalize();
        return this;
      }
      const sinHalfTheta = Math.sqrt(sqrSinHalfTheta);
      const halfTheta = Math.atan2(sinHalfTheta, cosHalfTheta);
      const ratioA = Math.sin((1 - t) * halfTheta) / sinHalfTheta, ratioB = Math.sin(t * halfTheta) / sinHalfTheta;
      this._w = w2 * ratioA + this._w * ratioB;
      this._x = x2 * ratioA + this._x * ratioB;
      this._y = y2 * ratioA + this._y * ratioB;
      this._z = z * ratioA + this._z * ratioB;
      this._onChangeCallback();
      return this;
    }
    slerpQuaternions(qa, qb, t) {
      return this.copy(qa).slerp(qb, t);
    }
    random() {
      const theta1 = 2 * Math.PI * Math.random();
      const theta2 = 2 * Math.PI * Math.random();
      const x0 = Math.random();
      const r1 = Math.sqrt(1 - x0);
      const r2 = Math.sqrt(x0);
      return this.set(
        r1 * Math.sin(theta1),
        r1 * Math.cos(theta1),
        r2 * Math.sin(theta2),
        r2 * Math.cos(theta2)
      );
    }
    equals(quaternion) {
      return quaternion._x === this._x && quaternion._y === this._y && quaternion._z === this._z && quaternion._w === this._w;
    }
    fromArray(array, offset = 0) {
      this._x = array[offset];
      this._y = array[offset + 1];
      this._z = array[offset + 2];
      this._w = array[offset + 3];
      this._onChangeCallback();
      return this;
    }
    toArray(array = [], offset = 0) {
      array[offset] = this._x;
      array[offset + 1] = this._y;
      array[offset + 2] = this._z;
      array[offset + 3] = this._w;
      return array;
    }
    fromBufferAttribute(attribute, index) {
      this._x = attribute.getX(index);
      this._y = attribute.getY(index);
      this._z = attribute.getZ(index);
      this._w = attribute.getW(index);
      this._onChangeCallback();
      return this;
    }
    toJSON() {
      return this.toArray();
    }
    _onChange(callback) {
      this._onChangeCallback = callback;
      return this;
    }
    _onChangeCallback() {
    }
    *[Symbol.iterator]() {
      yield this._x;
      yield this._y;
      yield this._z;
      yield this._w;
    }
  };
  var Vector3 = class _Vector3 {
    constructor(x2 = 0, y2 = 0, z = 0) {
      _Vector3.prototype.isVector3 = true;
      this.x = x2;
      this.y = y2;
      this.z = z;
    }
    set(x2, y2, z) {
      if (z === void 0) z = this.z;
      this.x = x2;
      this.y = y2;
      this.z = z;
      return this;
    }
    setScalar(scalar) {
      this.x = scalar;
      this.y = scalar;
      this.z = scalar;
      return this;
    }
    setX(x2) {
      this.x = x2;
      return this;
    }
    setY(y2) {
      this.y = y2;
      return this;
    }
    setZ(z) {
      this.z = z;
      return this;
    }
    setComponent(index, value) {
      switch (index) {
        case 0:
          this.x = value;
          break;
        case 1:
          this.y = value;
          break;
        case 2:
          this.z = value;
          break;
        default:
          throw new Error("index is out of range: " + index);
      }
      return this;
    }
    getComponent(index) {
      switch (index) {
        case 0:
          return this.x;
        case 1:
          return this.y;
        case 2:
          return this.z;
        default:
          throw new Error("index is out of range: " + index);
      }
    }
    clone() {
      return new this.constructor(this.x, this.y, this.z);
    }
    copy(v) {
      this.x = v.x;
      this.y = v.y;
      this.z = v.z;
      return this;
    }
    add(v) {
      this.x += v.x;
      this.y += v.y;
      this.z += v.z;
      return this;
    }
    addScalar(s2) {
      this.x += s2;
      this.y += s2;
      this.z += s2;
      return this;
    }
    addVectors(a2, b2) {
      this.x = a2.x + b2.x;
      this.y = a2.y + b2.y;
      this.z = a2.z + b2.z;
      return this;
    }
    addScaledVector(v, s2) {
      this.x += v.x * s2;
      this.y += v.y * s2;
      this.z += v.z * s2;
      return this;
    }
    sub(v) {
      this.x -= v.x;
      this.y -= v.y;
      this.z -= v.z;
      return this;
    }
    subScalar(s2) {
      this.x -= s2;
      this.y -= s2;
      this.z -= s2;
      return this;
    }
    subVectors(a2, b2) {
      this.x = a2.x - b2.x;
      this.y = a2.y - b2.y;
      this.z = a2.z - b2.z;
      return this;
    }
    multiply(v) {
      this.x *= v.x;
      this.y *= v.y;
      this.z *= v.z;
      return this;
    }
    multiplyScalar(scalar) {
      this.x *= scalar;
      this.y *= scalar;
      this.z *= scalar;
      return this;
    }
    multiplyVectors(a2, b2) {
      this.x = a2.x * b2.x;
      this.y = a2.y * b2.y;
      this.z = a2.z * b2.z;
      return this;
    }
    applyEuler(euler) {
      return this.applyQuaternion(_quaternion$4.setFromEuler(euler));
    }
    applyAxisAngle(axis, angle) {
      return this.applyQuaternion(_quaternion$4.setFromAxisAngle(axis, angle));
    }
    applyMatrix3(m2) {
      const x2 = this.x, y2 = this.y, z = this.z;
      const e = m2.elements;
      this.x = e[0] * x2 + e[3] * y2 + e[6] * z;
      this.y = e[1] * x2 + e[4] * y2 + e[7] * z;
      this.z = e[2] * x2 + e[5] * y2 + e[8] * z;
      return this;
    }
    applyNormalMatrix(m2) {
      return this.applyMatrix3(m2).normalize();
    }
    applyMatrix4(m2) {
      const x2 = this.x, y2 = this.y, z = this.z;
      const e = m2.elements;
      const w2 = 1 / (e[3] * x2 + e[7] * y2 + e[11] * z + e[15]);
      this.x = (e[0] * x2 + e[4] * y2 + e[8] * z + e[12]) * w2;
      this.y = (e[1] * x2 + e[5] * y2 + e[9] * z + e[13]) * w2;
      this.z = (e[2] * x2 + e[6] * y2 + e[10] * z + e[14]) * w2;
      return this;
    }
    applyQuaternion(q2) {
      const vx = this.x, vy = this.y, vz = this.z;
      const qx = q2.x, qy = q2.y, qz = q2.z, qw = q2.w;
      const tx = 2 * (qy * vz - qz * vy);
      const ty = 2 * (qz * vx - qx * vz);
      const tz = 2 * (qx * vy - qy * vx);
      this.x = vx + qw * tx + qy * tz - qz * ty;
      this.y = vy + qw * ty + qz * tx - qx * tz;
      this.z = vz + qw * tz + qx * ty - qy * tx;
      return this;
    }
    project(camera2) {
      return this.applyMatrix4(camera2.matrixWorldInverse).applyMatrix4(camera2.projectionMatrix);
    }
    unproject(camera2) {
      return this.applyMatrix4(camera2.projectionMatrixInverse).applyMatrix4(camera2.matrixWorld);
    }
    transformDirection(m2) {
      const x2 = this.x, y2 = this.y, z = this.z;
      const e = m2.elements;
      this.x = e[0] * x2 + e[4] * y2 + e[8] * z;
      this.y = e[1] * x2 + e[5] * y2 + e[9] * z;
      this.z = e[2] * x2 + e[6] * y2 + e[10] * z;
      return this.normalize();
    }
    divide(v) {
      this.x /= v.x;
      this.y /= v.y;
      this.z /= v.z;
      return this;
    }
    divideScalar(scalar) {
      return this.multiplyScalar(1 / scalar);
    }
    min(v) {
      this.x = Math.min(this.x, v.x);
      this.y = Math.min(this.y, v.y);
      this.z = Math.min(this.z, v.z);
      return this;
    }
    max(v) {
      this.x = Math.max(this.x, v.x);
      this.y = Math.max(this.y, v.y);
      this.z = Math.max(this.z, v.z);
      return this;
    }
    clamp(min, max) {
      this.x = clamp(this.x, min.x, max.x);
      this.y = clamp(this.y, min.y, max.y);
      this.z = clamp(this.z, min.z, max.z);
      return this;
    }
    clampScalar(minVal, maxVal) {
      this.x = clamp(this.x, minVal, maxVal);
      this.y = clamp(this.y, minVal, maxVal);
      this.z = clamp(this.z, minVal, maxVal);
      return this;
    }
    clampLength(min, max) {
      const length = this.length();
      return this.divideScalar(length || 1).multiplyScalar(clamp(length, min, max));
    }
    floor() {
      this.x = Math.floor(this.x);
      this.y = Math.floor(this.y);
      this.z = Math.floor(this.z);
      return this;
    }
    ceil() {
      this.x = Math.ceil(this.x);
      this.y = Math.ceil(this.y);
      this.z = Math.ceil(this.z);
      return this;
    }
    round() {
      this.x = Math.round(this.x);
      this.y = Math.round(this.y);
      this.z = Math.round(this.z);
      return this;
    }
    roundToZero() {
      this.x = Math.trunc(this.x);
      this.y = Math.trunc(this.y);
      this.z = Math.trunc(this.z);
      return this;
    }
    negate() {
      this.x = -this.x;
      this.y = -this.y;
      this.z = -this.z;
      return this;
    }
    dot(v) {
      return this.x * v.x + this.y * v.y + this.z * v.z;
    }
    // TODO lengthSquared?
    lengthSq() {
      return this.x * this.x + this.y * this.y + this.z * this.z;
    }
    length() {
      return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }
    manhattanLength() {
      return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
    }
    normalize() {
      return this.divideScalar(this.length() || 1);
    }
    setLength(length) {
      return this.normalize().multiplyScalar(length);
    }
    lerp(v, alpha) {
      this.x += (v.x - this.x) * alpha;
      this.y += (v.y - this.y) * alpha;
      this.z += (v.z - this.z) * alpha;
      return this;
    }
    lerpVectors(v1, v2, alpha) {
      this.x = v1.x + (v2.x - v1.x) * alpha;
      this.y = v1.y + (v2.y - v1.y) * alpha;
      this.z = v1.z + (v2.z - v1.z) * alpha;
      return this;
    }
    cross(v) {
      return this.crossVectors(this, v);
    }
    crossVectors(a2, b2) {
      const ax = a2.x, ay = a2.y, az = a2.z;
      const bx = b2.x, by = b2.y, bz = b2.z;
      this.x = ay * bz - az * by;
      this.y = az * bx - ax * bz;
      this.z = ax * by - ay * bx;
      return this;
    }
    projectOnVector(v) {
      const denominator = v.lengthSq();
      if (denominator === 0) return this.set(0, 0, 0);
      const scalar = v.dot(this) / denominator;
      return this.copy(v).multiplyScalar(scalar);
    }
    projectOnPlane(planeNormal) {
      _vector$c.copy(this).projectOnVector(planeNormal);
      return this.sub(_vector$c);
    }
    reflect(normal) {
      return this.sub(_vector$c.copy(normal).multiplyScalar(2 * this.dot(normal)));
    }
    angleTo(v) {
      const denominator = Math.sqrt(this.lengthSq() * v.lengthSq());
      if (denominator === 0) return Math.PI / 2;
      const theta = this.dot(v) / denominator;
      return Math.acos(clamp(theta, -1, 1));
    }
    distanceTo(v) {
      return Math.sqrt(this.distanceToSquared(v));
    }
    distanceToSquared(v) {
      const dx = this.x - v.x, dy = this.y - v.y, dz = this.z - v.z;
      return dx * dx + dy * dy + dz * dz;
    }
    manhattanDistanceTo(v) {
      return Math.abs(this.x - v.x) + Math.abs(this.y - v.y) + Math.abs(this.z - v.z);
    }
    setFromSpherical(s2) {
      return this.setFromSphericalCoords(s2.radius, s2.phi, s2.theta);
    }
    setFromSphericalCoords(radius, phi, theta) {
      const sinPhiRadius = Math.sin(phi) * radius;
      this.x = sinPhiRadius * Math.sin(theta);
      this.y = Math.cos(phi) * radius;
      this.z = sinPhiRadius * Math.cos(theta);
      return this;
    }
    setFromCylindrical(c2) {
      return this.setFromCylindricalCoords(c2.radius, c2.theta, c2.y);
    }
    setFromCylindricalCoords(radius, theta, y2) {
      this.x = radius * Math.sin(theta);
      this.y = y2;
      this.z = radius * Math.cos(theta);
      return this;
    }
    setFromMatrixPosition(m2) {
      const e = m2.elements;
      this.x = e[12];
      this.y = e[13];
      this.z = e[14];
      return this;
    }
    setFromMatrixScale(m2) {
      const sx = this.setFromMatrixColumn(m2, 0).length();
      const sy = this.setFromMatrixColumn(m2, 1).length();
      const sz = this.setFromMatrixColumn(m2, 2).length();
      this.x = sx;
      this.y = sy;
      this.z = sz;
      return this;
    }
    setFromMatrixColumn(m2, index) {
      return this.fromArray(m2.elements, index * 4);
    }
    setFromMatrix3Column(m2, index) {
      return this.fromArray(m2.elements, index * 3);
    }
    setFromEuler(e) {
      this.x = e._x;
      this.y = e._y;
      this.z = e._z;
      return this;
    }
    setFromColor(c2) {
      this.x = c2.r;
      this.y = c2.g;
      this.z = c2.b;
      return this;
    }
    equals(v) {
      return v.x === this.x && v.y === this.y && v.z === this.z;
    }
    fromArray(array, offset = 0) {
      this.x = array[offset];
      this.y = array[offset + 1];
      this.z = array[offset + 2];
      return this;
    }
    toArray(array = [], offset = 0) {
      array[offset] = this.x;
      array[offset + 1] = this.y;
      array[offset + 2] = this.z;
      return array;
    }
    fromBufferAttribute(attribute, index) {
      this.x = attribute.getX(index);
      this.y = attribute.getY(index);
      this.z = attribute.getZ(index);
      return this;
    }
    random() {
      this.x = Math.random();
      this.y = Math.random();
      this.z = Math.random();
      return this;
    }
    randomDirection() {
      const theta = Math.random() * Math.PI * 2;
      const u2 = Math.random() * 2 - 1;
      const c2 = Math.sqrt(1 - u2 * u2);
      this.x = c2 * Math.cos(theta);
      this.y = u2;
      this.z = c2 * Math.sin(theta);
      return this;
    }
    *[Symbol.iterator]() {
      yield this.x;
      yield this.y;
      yield this.z;
    }
  };
  var _vector$c = /* @__PURE__ */ new Vector3();
  var _quaternion$4 = /* @__PURE__ */ new Quaternion();
  var Box3 = class {
    constructor(min = new Vector3(Infinity, Infinity, Infinity), max = new Vector3(-Infinity, -Infinity, -Infinity)) {
      this.isBox3 = true;
      this.min = min;
      this.max = max;
    }
    set(min, max) {
      this.min.copy(min);
      this.max.copy(max);
      return this;
    }
    setFromArray(array) {
      this.makeEmpty();
      for (let i2 = 0, il = array.length; i2 < il; i2 += 3) {
        this.expandByPoint(_vector$b.fromArray(array, i2));
      }
      return this;
    }
    setFromBufferAttribute(attribute) {
      this.makeEmpty();
      for (let i2 = 0, il = attribute.count; i2 < il; i2++) {
        this.expandByPoint(_vector$b.fromBufferAttribute(attribute, i2));
      }
      return this;
    }
    setFromPoints(points) {
      this.makeEmpty();
      for (let i2 = 0, il = points.length; i2 < il; i2++) {
        this.expandByPoint(points[i2]);
      }
      return this;
    }
    setFromCenterAndSize(center, size) {
      const halfSize = _vector$b.copy(size).multiplyScalar(0.5);
      this.min.copy(center).sub(halfSize);
      this.max.copy(center).add(halfSize);
      return this;
    }
    setFromObject(object, precise = false) {
      this.makeEmpty();
      return this.expandByObject(object, precise);
    }
    clone() {
      return new this.constructor().copy(this);
    }
    copy(box) {
      this.min.copy(box.min);
      this.max.copy(box.max);
      return this;
    }
    makeEmpty() {
      this.min.x = this.min.y = this.min.z = Infinity;
      this.max.x = this.max.y = this.max.z = -Infinity;
      return this;
    }
    isEmpty() {
      return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z;
    }
    getCenter(target) {
      return this.isEmpty() ? target.set(0, 0, 0) : target.addVectors(this.min, this.max).multiplyScalar(0.5);
    }
    getSize(target) {
      return this.isEmpty() ? target.set(0, 0, 0) : target.subVectors(this.max, this.min);
    }
    expandByPoint(point) {
      this.min.min(point);
      this.max.max(point);
      return this;
    }
    expandByVector(vector) {
      this.min.sub(vector);
      this.max.add(vector);
      return this;
    }
    expandByScalar(scalar) {
      this.min.addScalar(-scalar);
      this.max.addScalar(scalar);
      return this;
    }
    expandByObject(object, precise = false) {
      object.updateWorldMatrix(false, false);
      const geometry2 = object.geometry;
      if (geometry2 !== void 0) {
        const positionAttribute = geometry2.getAttribute("position");
        if (precise === true && positionAttribute !== void 0 && object.isInstancedMesh !== true) {
          for (let i2 = 0, l2 = positionAttribute.count; i2 < l2; i2++) {
            if (object.isMesh === true) {
              object.getVertexPosition(i2, _vector$b);
            } else {
              _vector$b.fromBufferAttribute(positionAttribute, i2);
            }
            _vector$b.applyMatrix4(object.matrixWorld);
            this.expandByPoint(_vector$b);
          }
        } else {
          if (object.boundingBox !== void 0) {
            if (object.boundingBox === null) {
              object.computeBoundingBox();
            }
            _box$4.copy(object.boundingBox);
          } else {
            if (geometry2.boundingBox === null) {
              geometry2.computeBoundingBox();
            }
            _box$4.copy(geometry2.boundingBox);
          }
          _box$4.applyMatrix4(object.matrixWorld);
          this.union(_box$4);
        }
      }
      const children = object.children;
      for (let i2 = 0, l2 = children.length; i2 < l2; i2++) {
        this.expandByObject(children[i2], precise);
      }
      return this;
    }
    containsPoint(point) {
      return point.x >= this.min.x && point.x <= this.max.x && point.y >= this.min.y && point.y <= this.max.y && point.z >= this.min.z && point.z <= this.max.z;
    }
    containsBox(box) {
      return this.min.x <= box.min.x && box.max.x <= this.max.x && this.min.y <= box.min.y && box.max.y <= this.max.y && this.min.z <= box.min.z && box.max.z <= this.max.z;
    }
    getParameter(point, target) {
      return target.set(
        (point.x - this.min.x) / (this.max.x - this.min.x),
        (point.y - this.min.y) / (this.max.y - this.min.y),
        (point.z - this.min.z) / (this.max.z - this.min.z)
      );
    }
    intersectsBox(box) {
      return box.max.x >= this.min.x && box.min.x <= this.max.x && box.max.y >= this.min.y && box.min.y <= this.max.y && box.max.z >= this.min.z && box.min.z <= this.max.z;
    }
    intersectsSphere(sphere) {
      this.clampPoint(sphere.center, _vector$b);
      return _vector$b.distanceToSquared(sphere.center) <= sphere.radius * sphere.radius;
    }
    intersectsPlane(plane) {
      let min, max;
      if (plane.normal.x > 0) {
        min = plane.normal.x * this.min.x;
        max = plane.normal.x * this.max.x;
      } else {
        min = plane.normal.x * this.max.x;
        max = plane.normal.x * this.min.x;
      }
      if (plane.normal.y > 0) {
        min += plane.normal.y * this.min.y;
        max += plane.normal.y * this.max.y;
      } else {
        min += plane.normal.y * this.max.y;
        max += plane.normal.y * this.min.y;
      }
      if (plane.normal.z > 0) {
        min += plane.normal.z * this.min.z;
        max += plane.normal.z * this.max.z;
      } else {
        min += plane.normal.z * this.max.z;
        max += plane.normal.z * this.min.z;
      }
      return min <= -plane.constant && max >= -plane.constant;
    }
    intersectsTriangle(triangle) {
      if (this.isEmpty()) {
        return false;
      }
      this.getCenter(_center);
      _extents.subVectors(this.max, _center);
      _v0$2.subVectors(triangle.a, _center);
      _v1$7.subVectors(triangle.b, _center);
      _v2$4.subVectors(triangle.c, _center);
      _f0.subVectors(_v1$7, _v0$2);
      _f1.subVectors(_v2$4, _v1$7);
      _f2.subVectors(_v0$2, _v2$4);
      let axes = [
        0,
        -_f0.z,
        _f0.y,
        0,
        -_f1.z,
        _f1.y,
        0,
        -_f2.z,
        _f2.y,
        _f0.z,
        0,
        -_f0.x,
        _f1.z,
        0,
        -_f1.x,
        _f2.z,
        0,
        -_f2.x,
        -_f0.y,
        _f0.x,
        0,
        -_f1.y,
        _f1.x,
        0,
        -_f2.y,
        _f2.x,
        0
      ];
      if (!satForAxes(axes, _v0$2, _v1$7, _v2$4, _extents)) {
        return false;
      }
      axes = [1, 0, 0, 0, 1, 0, 0, 0, 1];
      if (!satForAxes(axes, _v0$2, _v1$7, _v2$4, _extents)) {
        return false;
      }
      _triangleNormal.crossVectors(_f0, _f1);
      axes = [_triangleNormal.x, _triangleNormal.y, _triangleNormal.z];
      return satForAxes(axes, _v0$2, _v1$7, _v2$4, _extents);
    }
    clampPoint(point, target) {
      return target.copy(point).clamp(this.min, this.max);
    }
    distanceToPoint(point) {
      return this.clampPoint(point, _vector$b).distanceTo(point);
    }
    getBoundingSphere(target) {
      if (this.isEmpty()) {
        target.makeEmpty();
      } else {
        this.getCenter(target.center);
        target.radius = this.getSize(_vector$b).length() * 0.5;
      }
      return target;
    }
    intersect(box) {
      this.min.max(box.min);
      this.max.min(box.max);
      if (this.isEmpty()) this.makeEmpty();
      return this;
    }
    union(box) {
      this.min.min(box.min);
      this.max.max(box.max);
      return this;
    }
    applyMatrix4(matrix) {
      if (this.isEmpty()) return this;
      _points[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(matrix);
      _points[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(matrix);
      _points[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(matrix);
      _points[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(matrix);
      _points[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(matrix);
      _points[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(matrix);
      _points[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(matrix);
      _points[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(matrix);
      this.setFromPoints(_points);
      return this;
    }
    translate(offset) {
      this.min.add(offset);
      this.max.add(offset);
      return this;
    }
    equals(box) {
      return box.min.equals(this.min) && box.max.equals(this.max);
    }
  };
  var _points = [
    /* @__PURE__ */ new Vector3(),
    /* @__PURE__ */ new Vector3(),
    /* @__PURE__ */ new Vector3(),
    /* @__PURE__ */ new Vector3(),
    /* @__PURE__ */ new Vector3(),
    /* @__PURE__ */ new Vector3(),
    /* @__PURE__ */ new Vector3(),
    /* @__PURE__ */ new Vector3()
  ];
  var _vector$b = /* @__PURE__ */ new Vector3();
  var _box$4 = /* @__PURE__ */ new Box3();
  var _v0$2 = /* @__PURE__ */ new Vector3();
  var _v1$7 = /* @__PURE__ */ new Vector3();
  var _v2$4 = /* @__PURE__ */ new Vector3();
  var _f0 = /* @__PURE__ */ new Vector3();
  var _f1 = /* @__PURE__ */ new Vector3();
  var _f2 = /* @__PURE__ */ new Vector3();
  var _center = /* @__PURE__ */ new Vector3();
  var _extents = /* @__PURE__ */ new Vector3();
  var _triangleNormal = /* @__PURE__ */ new Vector3();
  var _testAxis = /* @__PURE__ */ new Vector3();
  function satForAxes(axes, v0, v1, v2, extents) {
    for (let i2 = 0, j2 = axes.length - 3; i2 <= j2; i2 += 3) {
      _testAxis.fromArray(axes, i2);
      const r2 = extents.x * Math.abs(_testAxis.x) + extents.y * Math.abs(_testAxis.y) + extents.z * Math.abs(_testAxis.z);
      const p0 = v0.dot(_testAxis);
      const p1 = v1.dot(_testAxis);
      const p2 = v2.dot(_testAxis);
      if (Math.max(-Math.max(p0, p1, p2), Math.min(p0, p1, p2)) > r2) {
        return false;
      }
    }
    return true;
  }
  var _box$3 = /* @__PURE__ */ new Box3();
  var _v1$6 = /* @__PURE__ */ new Vector3();
  var _v2$3 = /* @__PURE__ */ new Vector3();
  var Sphere = class {
    constructor(center = new Vector3(), radius = -1) {
      this.isSphere = true;
      this.center = center;
      this.radius = radius;
    }
    set(center, radius) {
      this.center.copy(center);
      this.radius = radius;
      return this;
    }
    setFromPoints(points, optionalCenter) {
      const center = this.center;
      if (optionalCenter !== void 0) {
        center.copy(optionalCenter);
      } else {
        _box$3.setFromPoints(points).getCenter(center);
      }
      let maxRadiusSq = 0;
      for (let i2 = 0, il = points.length; i2 < il; i2++) {
        maxRadiusSq = Math.max(maxRadiusSq, center.distanceToSquared(points[i2]));
      }
      this.radius = Math.sqrt(maxRadiusSq);
      return this;
    }
    copy(sphere) {
      this.center.copy(sphere.center);
      this.radius = sphere.radius;
      return this;
    }
    isEmpty() {
      return this.radius < 0;
    }
    makeEmpty() {
      this.center.set(0, 0, 0);
      this.radius = -1;
      return this;
    }
    containsPoint(point) {
      return point.distanceToSquared(this.center) <= this.radius * this.radius;
    }
    distanceToPoint(point) {
      return point.distanceTo(this.center) - this.radius;
    }
    intersectsSphere(sphere) {
      const radiusSum = this.radius + sphere.radius;
      return sphere.center.distanceToSquared(this.center) <= radiusSum * radiusSum;
    }
    intersectsBox(box) {
      return box.intersectsSphere(this);
    }
    intersectsPlane(plane) {
      return Math.abs(plane.distanceToPoint(this.center)) <= this.radius;
    }
    clampPoint(point, target) {
      const deltaLengthSq = this.center.distanceToSquared(point);
      target.copy(point);
      if (deltaLengthSq > this.radius * this.radius) {
        target.sub(this.center).normalize();
        target.multiplyScalar(this.radius).add(this.center);
      }
      return target;
    }
    getBoundingBox(target) {
      if (this.isEmpty()) {
        target.makeEmpty();
        return target;
      }
      target.set(this.center, this.center);
      target.expandByScalar(this.radius);
      return target;
    }
    applyMatrix4(matrix) {
      this.center.applyMatrix4(matrix);
      this.radius = this.radius * matrix.getMaxScaleOnAxis();
      return this;
    }
    translate(offset) {
      this.center.add(offset);
      return this;
    }
    expandByPoint(point) {
      if (this.isEmpty()) {
        this.center.copy(point);
        this.radius = 0;
        return this;
      }
      _v1$6.subVectors(point, this.center);
      const lengthSq = _v1$6.lengthSq();
      if (lengthSq > this.radius * this.radius) {
        const length = Math.sqrt(lengthSq);
        const delta = (length - this.radius) * 0.5;
        this.center.addScaledVector(_v1$6, delta / length);
        this.radius += delta;
      }
      return this;
    }
    union(sphere) {
      if (sphere.isEmpty()) {
        return this;
      }
      if (this.isEmpty()) {
        this.copy(sphere);
        return this;
      }
      if (this.center.equals(sphere.center) === true) {
        this.radius = Math.max(this.radius, sphere.radius);
      } else {
        _v2$3.subVectors(sphere.center, this.center).setLength(sphere.radius);
        this.expandByPoint(_v1$6.copy(sphere.center).add(_v2$3));
        this.expandByPoint(_v1$6.copy(sphere.center).sub(_v2$3));
      }
      return this;
    }
    equals(sphere) {
      return sphere.center.equals(this.center) && sphere.radius === this.radius;
    }
    clone() {
      return new this.constructor().copy(this);
    }
  };
  var _vector$a = /* @__PURE__ */ new Vector3();
  var _segCenter = /* @__PURE__ */ new Vector3();
  var _segDir = /* @__PURE__ */ new Vector3();
  var _diff = /* @__PURE__ */ new Vector3();
  var _edge1 = /* @__PURE__ */ new Vector3();
  var _edge2 = /* @__PURE__ */ new Vector3();
  var _normal$1 = /* @__PURE__ */ new Vector3();
  var Ray = class {
    constructor(origin = new Vector3(), direction = new Vector3(0, 0, -1)) {
      this.origin = origin;
      this.direction = direction;
    }
    set(origin, direction) {
      this.origin.copy(origin);
      this.direction.copy(direction);
      return this;
    }
    copy(ray) {
      this.origin.copy(ray.origin);
      this.direction.copy(ray.direction);
      return this;
    }
    at(t, target) {
      return target.copy(this.origin).addScaledVector(this.direction, t);
    }
    lookAt(v) {
      this.direction.copy(v).sub(this.origin).normalize();
      return this;
    }
    recast(t) {
      this.origin.copy(this.at(t, _vector$a));
      return this;
    }
    closestPointToPoint(point, target) {
      target.subVectors(point, this.origin);
      const directionDistance = target.dot(this.direction);
      if (directionDistance < 0) {
        return target.copy(this.origin);
      }
      return target.copy(this.origin).addScaledVector(this.direction, directionDistance);
    }
    distanceToPoint(point) {
      return Math.sqrt(this.distanceSqToPoint(point));
    }
    distanceSqToPoint(point) {
      const directionDistance = _vector$a.subVectors(point, this.origin).dot(this.direction);
      if (directionDistance < 0) {
        return this.origin.distanceToSquared(point);
      }
      _vector$a.copy(this.origin).addScaledVector(this.direction, directionDistance);
      return _vector$a.distanceToSquared(point);
    }
    distanceSqToSegment(v0, v1, optionalPointOnRay, optionalPointOnSegment) {
      _segCenter.copy(v0).add(v1).multiplyScalar(0.5);
      _segDir.copy(v1).sub(v0).normalize();
      _diff.copy(this.origin).sub(_segCenter);
      const segExtent = v0.distanceTo(v1) * 0.5;
      const a01 = -this.direction.dot(_segDir);
      const b0 = _diff.dot(this.direction);
      const b1 = -_diff.dot(_segDir);
      const c2 = _diff.lengthSq();
      const det = Math.abs(1 - a01 * a01);
      let s0, s1, sqrDist, extDet;
      if (det > 0) {
        s0 = a01 * b1 - b0;
        s1 = a01 * b0 - b1;
        extDet = segExtent * det;
        if (s0 >= 0) {
          if (s1 >= -extDet) {
            if (s1 <= extDet) {
              const invDet = 1 / det;
              s0 *= invDet;
              s1 *= invDet;
              sqrDist = s0 * (s0 + a01 * s1 + 2 * b0) + s1 * (a01 * s0 + s1 + 2 * b1) + c2;
            } else {
              s1 = segExtent;
              s0 = Math.max(0, -(a01 * s1 + b0));
              sqrDist = -s0 * s0 + s1 * (s1 + 2 * b1) + c2;
            }
          } else {
            s1 = -segExtent;
            s0 = Math.max(0, -(a01 * s1 + b0));
            sqrDist = -s0 * s0 + s1 * (s1 + 2 * b1) + c2;
          }
        } else {
          if (s1 <= -extDet) {
            s0 = Math.max(0, -(-a01 * segExtent + b0));
            s1 = s0 > 0 ? -segExtent : Math.min(Math.max(-segExtent, -b1), segExtent);
            sqrDist = -s0 * s0 + s1 * (s1 + 2 * b1) + c2;
          } else if (s1 <= extDet) {
            s0 = 0;
            s1 = Math.min(Math.max(-segExtent, -b1), segExtent);
            sqrDist = s1 * (s1 + 2 * b1) + c2;
          } else {
            s0 = Math.max(0, -(a01 * segExtent + b0));
            s1 = s0 > 0 ? segExtent : Math.min(Math.max(-segExtent, -b1), segExtent);
            sqrDist = -s0 * s0 + s1 * (s1 + 2 * b1) + c2;
          }
        }
      } else {
        s1 = a01 > 0 ? -segExtent : segExtent;
        s0 = Math.max(0, -(a01 * s1 + b0));
        sqrDist = -s0 * s0 + s1 * (s1 + 2 * b1) + c2;
      }
      if (optionalPointOnRay) {
        optionalPointOnRay.copy(this.origin).addScaledVector(this.direction, s0);
      }
      if (optionalPointOnSegment) {
        optionalPointOnSegment.copy(_segCenter).addScaledVector(_segDir, s1);
      }
      return sqrDist;
    }
    intersectSphere(sphere, target) {
      _vector$a.subVectors(sphere.center, this.origin);
      const tca = _vector$a.dot(this.direction);
      const d2 = _vector$a.dot(_vector$a) - tca * tca;
      const radius2 = sphere.radius * sphere.radius;
      if (d2 > radius2) return null;
      const thc = Math.sqrt(radius2 - d2);
      const t0 = tca - thc;
      const t1 = tca + thc;
      if (t1 < 0) return null;
      if (t0 < 0) return this.at(t1, target);
      return this.at(t0, target);
    }
    intersectsSphere(sphere) {
      return this.distanceSqToPoint(sphere.center) <= sphere.radius * sphere.radius;
    }
    distanceToPlane(plane) {
      const denominator = plane.normal.dot(this.direction);
      if (denominator === 0) {
        if (plane.distanceToPoint(this.origin) === 0) {
          return 0;
        }
        return null;
      }
      const t = -(this.origin.dot(plane.normal) + plane.constant) / denominator;
      return t >= 0 ? t : null;
    }
    intersectPlane(plane, target) {
      const t = this.distanceToPlane(plane);
      if (t === null) {
        return null;
      }
      return this.at(t, target);
    }
    intersectsPlane(plane) {
      const distToPoint = plane.distanceToPoint(this.origin);
      if (distToPoint === 0) {
        return true;
      }
      const denominator = plane.normal.dot(this.direction);
      if (denominator * distToPoint < 0) {
        return true;
      }
      return false;
    }
    intersectBox(box, target) {
      let tmin, tmax, tymin, tymax, tzmin, tzmax;
      const invdirx = 1 / this.direction.x, invdiry = 1 / this.direction.y, invdirz = 1 / this.direction.z;
      const origin = this.origin;
      if (invdirx >= 0) {
        tmin = (box.min.x - origin.x) * invdirx;
        tmax = (box.max.x - origin.x) * invdirx;
      } else {
        tmin = (box.max.x - origin.x) * invdirx;
        tmax = (box.min.x - origin.x) * invdirx;
      }
      if (invdiry >= 0) {
        tymin = (box.min.y - origin.y) * invdiry;
        tymax = (box.max.y - origin.y) * invdiry;
      } else {
        tymin = (box.max.y - origin.y) * invdiry;
        tymax = (box.min.y - origin.y) * invdiry;
      }
      if (tmin > tymax || tymin > tmax) return null;
      if (tymin > tmin || isNaN(tmin)) tmin = tymin;
      if (tymax < tmax || isNaN(tmax)) tmax = tymax;
      if (invdirz >= 0) {
        tzmin = (box.min.z - origin.z) * invdirz;
        tzmax = (box.max.z - origin.z) * invdirz;
      } else {
        tzmin = (box.max.z - origin.z) * invdirz;
        tzmax = (box.min.z - origin.z) * invdirz;
      }
      if (tmin > tzmax || tzmin > tmax) return null;
      if (tzmin > tmin || tmin !== tmin) tmin = tzmin;
      if (tzmax < tmax || tmax !== tmax) tmax = tzmax;
      if (tmax < 0) return null;
      return this.at(tmin >= 0 ? tmin : tmax, target);
    }
    intersectsBox(box) {
      return this.intersectBox(box, _vector$a) !== null;
    }
    intersectTriangle(a2, b2, c2, backfaceCulling, target) {
      _edge1.subVectors(b2, a2);
      _edge2.subVectors(c2, a2);
      _normal$1.crossVectors(_edge1, _edge2);
      let DdN = this.direction.dot(_normal$1);
      let sign;
      if (DdN > 0) {
        if (backfaceCulling) return null;
        sign = 1;
      } else if (DdN < 0) {
        sign = -1;
        DdN = -DdN;
      } else {
        return null;
      }
      _diff.subVectors(this.origin, a2);
      const DdQxE2 = sign * this.direction.dot(_edge2.crossVectors(_diff, _edge2));
      if (DdQxE2 < 0) {
        return null;
      }
      const DdE1xQ = sign * this.direction.dot(_edge1.cross(_diff));
      if (DdE1xQ < 0) {
        return null;
      }
      if (DdQxE2 + DdE1xQ > DdN) {
        return null;
      }
      const QdN = -sign * _diff.dot(_normal$1);
      if (QdN < 0) {
        return null;
      }
      return this.at(QdN / DdN, target);
    }
    applyMatrix4(matrix4) {
      this.origin.applyMatrix4(matrix4);
      this.direction.transformDirection(matrix4);
      return this;
    }
    equals(ray) {
      return ray.origin.equals(this.origin) && ray.direction.equals(this.direction);
    }
    clone() {
      return new this.constructor().copy(this);
    }
  };
  var Matrix4 = class _Matrix4 {
    constructor(n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44) {
      _Matrix4.prototype.isMatrix4 = true;
      this.elements = [
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1
      ];
      if (n11 !== void 0) {
        this.set(n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44);
      }
    }
    set(n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44) {
      const te = this.elements;
      te[0] = n11;
      te[4] = n12;
      te[8] = n13;
      te[12] = n14;
      te[1] = n21;
      te[5] = n22;
      te[9] = n23;
      te[13] = n24;
      te[2] = n31;
      te[6] = n32;
      te[10] = n33;
      te[14] = n34;
      te[3] = n41;
      te[7] = n42;
      te[11] = n43;
      te[15] = n44;
      return this;
    }
    identity() {
      this.set(
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1
      );
      return this;
    }
    clone() {
      return new _Matrix4().fromArray(this.elements);
    }
    copy(m2) {
      const te = this.elements;
      const me = m2.elements;
      te[0] = me[0];
      te[1] = me[1];
      te[2] = me[2];
      te[3] = me[3];
      te[4] = me[4];
      te[5] = me[5];
      te[6] = me[6];
      te[7] = me[7];
      te[8] = me[8];
      te[9] = me[9];
      te[10] = me[10];
      te[11] = me[11];
      te[12] = me[12];
      te[13] = me[13];
      te[14] = me[14];
      te[15] = me[15];
      return this;
    }
    copyPosition(m2) {
      const te = this.elements, me = m2.elements;
      te[12] = me[12];
      te[13] = me[13];
      te[14] = me[14];
      return this;
    }
    setFromMatrix3(m2) {
      const me = m2.elements;
      this.set(
        me[0],
        me[3],
        me[6],
        0,
        me[1],
        me[4],
        me[7],
        0,
        me[2],
        me[5],
        me[8],
        0,
        0,
        0,
        0,
        1
      );
      return this;
    }
    extractBasis(xAxis, yAxis, zAxis) {
      xAxis.setFromMatrixColumn(this, 0);
      yAxis.setFromMatrixColumn(this, 1);
      zAxis.setFromMatrixColumn(this, 2);
      return this;
    }
    makeBasis(xAxis, yAxis, zAxis) {
      this.set(
        xAxis.x,
        yAxis.x,
        zAxis.x,
        0,
        xAxis.y,
        yAxis.y,
        zAxis.y,
        0,
        xAxis.z,
        yAxis.z,
        zAxis.z,
        0,
        0,
        0,
        0,
        1
      );
      return this;
    }
    extractRotation(m2) {
      const te = this.elements;
      const me = m2.elements;
      const scaleX = 1 / _v1$5.setFromMatrixColumn(m2, 0).length();
      const scaleY = 1 / _v1$5.setFromMatrixColumn(m2, 1).length();
      const scaleZ = 1 / _v1$5.setFromMatrixColumn(m2, 2).length();
      te[0] = me[0] * scaleX;
      te[1] = me[1] * scaleX;
      te[2] = me[2] * scaleX;
      te[3] = 0;
      te[4] = me[4] * scaleY;
      te[5] = me[5] * scaleY;
      te[6] = me[6] * scaleY;
      te[7] = 0;
      te[8] = me[8] * scaleZ;
      te[9] = me[9] * scaleZ;
      te[10] = me[10] * scaleZ;
      te[11] = 0;
      te[12] = 0;
      te[13] = 0;
      te[14] = 0;
      te[15] = 1;
      return this;
    }
    makeRotationFromEuler(euler) {
      const te = this.elements;
      const x2 = euler.x, y2 = euler.y, z = euler.z;
      const a2 = Math.cos(x2), b2 = Math.sin(x2);
      const c2 = Math.cos(y2), d2 = Math.sin(y2);
      const e = Math.cos(z), f2 = Math.sin(z);
      if (euler.order === "XYZ") {
        const ae = a2 * e, af = a2 * f2, be = b2 * e, bf = b2 * f2;
        te[0] = c2 * e;
        te[4] = -c2 * f2;
        te[8] = d2;
        te[1] = af + be * d2;
        te[5] = ae - bf * d2;
        te[9] = -b2 * c2;
        te[2] = bf - ae * d2;
        te[6] = be + af * d2;
        te[10] = a2 * c2;
      } else if (euler.order === "YXZ") {
        const ce = c2 * e, cf = c2 * f2, de = d2 * e, df = d2 * f2;
        te[0] = ce + df * b2;
        te[4] = de * b2 - cf;
        te[8] = a2 * d2;
        te[1] = a2 * f2;
        te[5] = a2 * e;
        te[9] = -b2;
        te[2] = cf * b2 - de;
        te[6] = df + ce * b2;
        te[10] = a2 * c2;
      } else if (euler.order === "ZXY") {
        const ce = c2 * e, cf = c2 * f2, de = d2 * e, df = d2 * f2;
        te[0] = ce - df * b2;
        te[4] = -a2 * f2;
        te[8] = de + cf * b2;
        te[1] = cf + de * b2;
        te[5] = a2 * e;
        te[9] = df - ce * b2;
        te[2] = -a2 * d2;
        te[6] = b2;
        te[10] = a2 * c2;
      } else if (euler.order === "ZYX") {
        const ae = a2 * e, af = a2 * f2, be = b2 * e, bf = b2 * f2;
        te[0] = c2 * e;
        te[4] = be * d2 - af;
        te[8] = ae * d2 + bf;
        te[1] = c2 * f2;
        te[5] = bf * d2 + ae;
        te[9] = af * d2 - be;
        te[2] = -d2;
        te[6] = b2 * c2;
        te[10] = a2 * c2;
      } else if (euler.order === "YZX") {
        const ac = a2 * c2, ad = a2 * d2, bc = b2 * c2, bd = b2 * d2;
        te[0] = c2 * e;
        te[4] = bd - ac * f2;
        te[8] = bc * f2 + ad;
        te[1] = f2;
        te[5] = a2 * e;
        te[9] = -b2 * e;
        te[2] = -d2 * e;
        te[6] = ad * f2 + bc;
        te[10] = ac - bd * f2;
      } else if (euler.order === "XZY") {
        const ac = a2 * c2, ad = a2 * d2, bc = b2 * c2, bd = b2 * d2;
        te[0] = c2 * e;
        te[4] = -f2;
        te[8] = d2 * e;
        te[1] = ac * f2 + bd;
        te[5] = a2 * e;
        te[9] = ad * f2 - bc;
        te[2] = bc * f2 - ad;
        te[6] = b2 * e;
        te[10] = bd * f2 + ac;
      }
      te[3] = 0;
      te[7] = 0;
      te[11] = 0;
      te[12] = 0;
      te[13] = 0;
      te[14] = 0;
      te[15] = 1;
      return this;
    }
    makeRotationFromQuaternion(q2) {
      return this.compose(_zero, q2, _one);
    }
    lookAt(eye, target, up) {
      const te = this.elements;
      _z.subVectors(eye, target);
      if (_z.lengthSq() === 0) {
        _z.z = 1;
      }
      _z.normalize();
      _x.crossVectors(up, _z);
      if (_x.lengthSq() === 0) {
        if (Math.abs(up.z) === 1) {
          _z.x += 1e-4;
        } else {
          _z.z += 1e-4;
        }
        _z.normalize();
        _x.crossVectors(up, _z);
      }
      _x.normalize();
      _y.crossVectors(_z, _x);
      te[0] = _x.x;
      te[4] = _y.x;
      te[8] = _z.x;
      te[1] = _x.y;
      te[5] = _y.y;
      te[9] = _z.y;
      te[2] = _x.z;
      te[6] = _y.z;
      te[10] = _z.z;
      return this;
    }
    multiply(m2) {
      return this.multiplyMatrices(this, m2);
    }
    premultiply(m2) {
      return this.multiplyMatrices(m2, this);
    }
    multiplyMatrices(a2, b2) {
      const ae = a2.elements;
      const be = b2.elements;
      const te = this.elements;
      const a11 = ae[0], a12 = ae[4], a13 = ae[8], a14 = ae[12];
      const a21 = ae[1], a22 = ae[5], a23 = ae[9], a24 = ae[13];
      const a31 = ae[2], a32 = ae[6], a33 = ae[10], a34 = ae[14];
      const a41 = ae[3], a42 = ae[7], a43 = ae[11], a44 = ae[15];
      const b11 = be[0], b12 = be[4], b13 = be[8], b14 = be[12];
      const b21 = be[1], b22 = be[5], b23 = be[9], b24 = be[13];
      const b31 = be[2], b32 = be[6], b33 = be[10], b34 = be[14];
      const b41 = be[3], b42 = be[7], b43 = be[11], b44 = be[15];
      te[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
      te[4] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
      te[8] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
      te[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;
      te[1] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
      te[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
      te[9] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
      te[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;
      te[2] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
      te[6] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
      te[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
      te[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;
      te[3] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
      te[7] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
      te[11] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
      te[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;
      return this;
    }
    multiplyScalar(s2) {
      const te = this.elements;
      te[0] *= s2;
      te[4] *= s2;
      te[8] *= s2;
      te[12] *= s2;
      te[1] *= s2;
      te[5] *= s2;
      te[9] *= s2;
      te[13] *= s2;
      te[2] *= s2;
      te[6] *= s2;
      te[10] *= s2;
      te[14] *= s2;
      te[3] *= s2;
      te[7] *= s2;
      te[11] *= s2;
      te[15] *= s2;
      return this;
    }
    determinant() {
      const te = this.elements;
      const n11 = te[0], n12 = te[4], n13 = te[8], n14 = te[12];
      const n21 = te[1], n22 = te[5], n23 = te[9], n24 = te[13];
      const n31 = te[2], n32 = te[6], n33 = te[10], n34 = te[14];
      const n41 = te[3], n42 = te[7], n43 = te[11], n44 = te[15];
      return n41 * (+n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34) + n42 * (+n11 * n23 * n34 - n11 * n24 * n33 + n14 * n21 * n33 - n13 * n21 * n34 + n13 * n24 * n31 - n14 * n23 * n31) + n43 * (+n11 * n24 * n32 - n11 * n22 * n34 - n14 * n21 * n32 + n12 * n21 * n34 + n14 * n22 * n31 - n12 * n24 * n31) + n44 * (-n13 * n22 * n31 - n11 * n23 * n32 + n11 * n22 * n33 + n13 * n21 * n32 - n12 * n21 * n33 + n12 * n23 * n31);
    }
    transpose() {
      const te = this.elements;
      let tmp;
      tmp = te[1];
      te[1] = te[4];
      te[4] = tmp;
      tmp = te[2];
      te[2] = te[8];
      te[8] = tmp;
      tmp = te[6];
      te[6] = te[9];
      te[9] = tmp;
      tmp = te[3];
      te[3] = te[12];
      te[12] = tmp;
      tmp = te[7];
      te[7] = te[13];
      te[13] = tmp;
      tmp = te[11];
      te[11] = te[14];
      te[14] = tmp;
      return this;
    }
    setPosition(x2, y2, z) {
      const te = this.elements;
      if (x2.isVector3) {
        te[12] = x2.x;
        te[13] = x2.y;
        te[14] = x2.z;
      } else {
        te[12] = x2;
        te[13] = y2;
        te[14] = z;
      }
      return this;
    }
    invert() {
      const te = this.elements, n11 = te[0], n21 = te[1], n31 = te[2], n41 = te[3], n12 = te[4], n22 = te[5], n32 = te[6], n42 = te[7], n13 = te[8], n23 = te[9], n33 = te[10], n43 = te[11], n14 = te[12], n24 = te[13], n34 = te[14], n44 = te[15], t11 = n23 * n34 * n42 - n24 * n33 * n42 + n24 * n32 * n43 - n22 * n34 * n43 - n23 * n32 * n44 + n22 * n33 * n44, t12 = n14 * n33 * n42 - n13 * n34 * n42 - n14 * n32 * n43 + n12 * n34 * n43 + n13 * n32 * n44 - n12 * n33 * n44, t13 = n13 * n24 * n42 - n14 * n23 * n42 + n14 * n22 * n43 - n12 * n24 * n43 - n13 * n22 * n44 + n12 * n23 * n44, t14 = n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34;
      const det = n11 * t11 + n21 * t12 + n31 * t13 + n41 * t14;
      if (det === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
      const detInv = 1 / det;
      te[0] = t11 * detInv;
      te[1] = (n24 * n33 * n41 - n23 * n34 * n41 - n24 * n31 * n43 + n21 * n34 * n43 + n23 * n31 * n44 - n21 * n33 * n44) * detInv;
      te[2] = (n22 * n34 * n41 - n24 * n32 * n41 + n24 * n31 * n42 - n21 * n34 * n42 - n22 * n31 * n44 + n21 * n32 * n44) * detInv;
      te[3] = (n23 * n32 * n41 - n22 * n33 * n41 - n23 * n31 * n42 + n21 * n33 * n42 + n22 * n31 * n43 - n21 * n32 * n43) * detInv;
      te[4] = t12 * detInv;
      te[5] = (n13 * n34 * n41 - n14 * n33 * n41 + n14 * n31 * n43 - n11 * n34 * n43 - n13 * n31 * n44 + n11 * n33 * n44) * detInv;
      te[6] = (n14 * n32 * n41 - n12 * n34 * n41 - n14 * n31 * n42 + n11 * n34 * n42 + n12 * n31 * n44 - n11 * n32 * n44) * detInv;
      te[7] = (n12 * n33 * n41 - n13 * n32 * n41 + n13 * n31 * n42 - n11 * n33 * n42 - n12 * n31 * n43 + n11 * n32 * n43) * detInv;
      te[8] = t13 * detInv;
      te[9] = (n14 * n23 * n41 - n13 * n24 * n41 - n14 * n21 * n43 + n11 * n24 * n43 + n13 * n21 * n44 - n11 * n23 * n44) * detInv;
      te[10] = (n12 * n24 * n41 - n14 * n22 * n41 + n14 * n21 * n42 - n11 * n24 * n42 - n12 * n21 * n44 + n11 * n22 * n44) * detInv;
      te[11] = (n13 * n22 * n41 - n12 * n23 * n41 - n13 * n21 * n42 + n11 * n23 * n42 + n12 * n21 * n43 - n11 * n22 * n43) * detInv;
      te[12] = t14 * detInv;
      te[13] = (n13 * n24 * n31 - n14 * n23 * n31 + n14 * n21 * n33 - n11 * n24 * n33 - n13 * n21 * n34 + n11 * n23 * n34) * detInv;
      te[14] = (n14 * n22 * n31 - n12 * n24 * n31 - n14 * n21 * n32 + n11 * n24 * n32 + n12 * n21 * n34 - n11 * n22 * n34) * detInv;
      te[15] = (n12 * n23 * n31 - n13 * n22 * n31 + n13 * n21 * n32 - n11 * n23 * n32 - n12 * n21 * n33 + n11 * n22 * n33) * detInv;
      return this;
    }
    scale(v) {
      const te = this.elements;
      const x2 = v.x, y2 = v.y, z = v.z;
      te[0] *= x2;
      te[4] *= y2;
      te[8] *= z;
      te[1] *= x2;
      te[5] *= y2;
      te[9] *= z;
      te[2] *= x2;
      te[6] *= y2;
      te[10] *= z;
      te[3] *= x2;
      te[7] *= y2;
      te[11] *= z;
      return this;
    }
    getMaxScaleOnAxis() {
      const te = this.elements;
      const scaleXSq = te[0] * te[0] + te[1] * te[1] + te[2] * te[2];
      const scaleYSq = te[4] * te[4] + te[5] * te[5] + te[6] * te[6];
      const scaleZSq = te[8] * te[8] + te[9] * te[9] + te[10] * te[10];
      return Math.sqrt(Math.max(scaleXSq, scaleYSq, scaleZSq));
    }
    makeTranslation(x2, y2, z) {
      if (x2.isVector3) {
        this.set(
          1,
          0,
          0,
          x2.x,
          0,
          1,
          0,
          x2.y,
          0,
          0,
          1,
          x2.z,
          0,
          0,
          0,
          1
        );
      } else {
        this.set(
          1,
          0,
          0,
          x2,
          0,
          1,
          0,
          y2,
          0,
          0,
          1,
          z,
          0,
          0,
          0,
          1
        );
      }
      return this;
    }
    makeRotationX(theta) {
      const c2 = Math.cos(theta), s2 = Math.sin(theta);
      this.set(
        1,
        0,
        0,
        0,
        0,
        c2,
        -s2,
        0,
        0,
        s2,
        c2,
        0,
        0,
        0,
        0,
        1
      );
      return this;
    }
    makeRotationY(theta) {
      const c2 = Math.cos(theta), s2 = Math.sin(theta);
      this.set(
        c2,
        0,
        s2,
        0,
        0,
        1,
        0,
        0,
        -s2,
        0,
        c2,
        0,
        0,
        0,
        0,
        1
      );
      return this;
    }
    makeRotationZ(theta) {
      const c2 = Math.cos(theta), s2 = Math.sin(theta);
      this.set(
        c2,
        -s2,
        0,
        0,
        s2,
        c2,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1
      );
      return this;
    }
    makeRotationAxis(axis, angle) {
      const c2 = Math.cos(angle);
      const s2 = Math.sin(angle);
      const t = 1 - c2;
      const x2 = axis.x, y2 = axis.y, z = axis.z;
      const tx = t * x2, ty = t * y2;
      this.set(
        tx * x2 + c2,
        tx * y2 - s2 * z,
        tx * z + s2 * y2,
        0,
        tx * y2 + s2 * z,
        ty * y2 + c2,
        ty * z - s2 * x2,
        0,
        tx * z - s2 * y2,
        ty * z + s2 * x2,
        t * z * z + c2,
        0,
        0,
        0,
        0,
        1
      );
      return this;
    }
    makeScale(x2, y2, z) {
      this.set(
        x2,
        0,
        0,
        0,
        0,
        y2,
        0,
        0,
        0,
        0,
        z,
        0,
        0,
        0,
        0,
        1
      );
      return this;
    }
    makeShear(xy, xz, yx, yz, zx, zy) {
      this.set(
        1,
        yx,
        zx,
        0,
        xy,
        1,
        zy,
        0,
        xz,
        yz,
        1,
        0,
        0,
        0,
        0,
        1
      );
      return this;
    }
    compose(position, quaternion, scale) {
      const te = this.elements;
      const x2 = quaternion._x, y2 = quaternion._y, z = quaternion._z, w2 = quaternion._w;
      const x22 = x2 + x2, y22 = y2 + y2, z2 = z + z;
      const xx = x2 * x22, xy = x2 * y22, xz = x2 * z2;
      const yy = y2 * y22, yz = y2 * z2, zz = z * z2;
      const wx = w2 * x22, wy = w2 * y22, wz = w2 * z2;
      const sx = scale.x, sy = scale.y, sz = scale.z;
      te[0] = (1 - (yy + zz)) * sx;
      te[1] = (xy + wz) * sx;
      te[2] = (xz - wy) * sx;
      te[3] = 0;
      te[4] = (xy - wz) * sy;
      te[5] = (1 - (xx + zz)) * sy;
      te[6] = (yz + wx) * sy;
      te[7] = 0;
      te[8] = (xz + wy) * sz;
      te[9] = (yz - wx) * sz;
      te[10] = (1 - (xx + yy)) * sz;
      te[11] = 0;
      te[12] = position.x;
      te[13] = position.y;
      te[14] = position.z;
      te[15] = 1;
      return this;
    }
    decompose(position, quaternion, scale) {
      const te = this.elements;
      let sx = _v1$5.set(te[0], te[1], te[2]).length();
      const sy = _v1$5.set(te[4], te[5], te[6]).length();
      const sz = _v1$5.set(te[8], te[9], te[10]).length();
      const det = this.determinant();
      if (det < 0) sx = -sx;
      position.x = te[12];
      position.y = te[13];
      position.z = te[14];
      _m1$2.copy(this);
      const invSX = 1 / sx;
      const invSY = 1 / sy;
      const invSZ = 1 / sz;
      _m1$2.elements[0] *= invSX;
      _m1$2.elements[1] *= invSX;
      _m1$2.elements[2] *= invSX;
      _m1$2.elements[4] *= invSY;
      _m1$2.elements[5] *= invSY;
      _m1$2.elements[6] *= invSY;
      _m1$2.elements[8] *= invSZ;
      _m1$2.elements[9] *= invSZ;
      _m1$2.elements[10] *= invSZ;
      quaternion.setFromRotationMatrix(_m1$2);
      scale.x = sx;
      scale.y = sy;
      scale.z = sz;
      return this;
    }
    makePerspective(left, right, top, bottom, near, far, coordinateSystem = WebGLCoordinateSystem) {
      const te = this.elements;
      const x2 = 2 * near / (right - left);
      const y2 = 2 * near / (top - bottom);
      const a2 = (right + left) / (right - left);
      const b2 = (top + bottom) / (top - bottom);
      let c2, d2;
      if (coordinateSystem === WebGLCoordinateSystem) {
        c2 = -(far + near) / (far - near);
        d2 = -2 * far * near / (far - near);
      } else if (coordinateSystem === WebGPUCoordinateSystem) {
        c2 = -far / (far - near);
        d2 = -far * near / (far - near);
      } else {
        throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: " + coordinateSystem);
      }
      te[0] = x2;
      te[4] = 0;
      te[8] = a2;
      te[12] = 0;
      te[1] = 0;
      te[5] = y2;
      te[9] = b2;
      te[13] = 0;
      te[2] = 0;
      te[6] = 0;
      te[10] = c2;
      te[14] = d2;
      te[3] = 0;
      te[7] = 0;
      te[11] = -1;
      te[15] = 0;
      return this;
    }
    makeOrthographic(left, right, top, bottom, near, far, coordinateSystem = WebGLCoordinateSystem) {
      const te = this.elements;
      const w2 = 1 / (right - left);
      const h = 1 / (top - bottom);
      const p2 = 1 / (far - near);
      const x2 = (right + left) * w2;
      const y2 = (top + bottom) * h;
      let z, zInv;
      if (coordinateSystem === WebGLCoordinateSystem) {
        z = (far + near) * p2;
        zInv = -2 * p2;
      } else if (coordinateSystem === WebGPUCoordinateSystem) {
        z = near * p2;
        zInv = -1 * p2;
      } else {
        throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: " + coordinateSystem);
      }
      te[0] = 2 * w2;
      te[4] = 0;
      te[8] = 0;
      te[12] = -x2;
      te[1] = 0;
      te[5] = 2 * h;
      te[9] = 0;
      te[13] = -y2;
      te[2] = 0;
      te[6] = 0;
      te[10] = zInv;
      te[14] = -z;
      te[3] = 0;
      te[7] = 0;
      te[11] = 0;
      te[15] = 1;
      return this;
    }
    equals(matrix) {
      const te = this.elements;
      const me = matrix.elements;
      for (let i2 = 0; i2 < 16; i2++) {
        if (te[i2] !== me[i2]) return false;
      }
      return true;
    }
    fromArray(array, offset = 0) {
      for (let i2 = 0; i2 < 16; i2++) {
        this.elements[i2] = array[i2 + offset];
      }
      return this;
    }
    toArray(array = [], offset = 0) {
      const te = this.elements;
      array[offset] = te[0];
      array[offset + 1] = te[1];
      array[offset + 2] = te[2];
      array[offset + 3] = te[3];
      array[offset + 4] = te[4];
      array[offset + 5] = te[5];
      array[offset + 6] = te[6];
      array[offset + 7] = te[7];
      array[offset + 8] = te[8];
      array[offset + 9] = te[9];
      array[offset + 10] = te[10];
      array[offset + 11] = te[11];
      array[offset + 12] = te[12];
      array[offset + 13] = te[13];
      array[offset + 14] = te[14];
      array[offset + 15] = te[15];
      return array;
    }
  };
  var _v1$5 = /* @__PURE__ */ new Vector3();
  var _m1$2 = /* @__PURE__ */ new Matrix4();
  var _zero = /* @__PURE__ */ new Vector3(0, 0, 0);
  var _one = /* @__PURE__ */ new Vector3(1, 1, 1);
  var _x = /* @__PURE__ */ new Vector3();
  var _y = /* @__PURE__ */ new Vector3();
  var _z = /* @__PURE__ */ new Vector3();
  var _matrix$2 = /* @__PURE__ */ new Matrix4();
  var _quaternion$3 = /* @__PURE__ */ new Quaternion();
  var Euler = class _Euler {
    constructor(x2 = 0, y2 = 0, z = 0, order = _Euler.DEFAULT_ORDER) {
      this.isEuler = true;
      this._x = x2;
      this._y = y2;
      this._z = z;
      this._order = order;
    }
    get x() {
      return this._x;
    }
    set x(value) {
      this._x = value;
      this._onChangeCallback();
    }
    get y() {
      return this._y;
    }
    set y(value) {
      this._y = value;
      this._onChangeCallback();
    }
    get z() {
      return this._z;
    }
    set z(value) {
      this._z = value;
      this._onChangeCallback();
    }
    get order() {
      return this._order;
    }
    set order(value) {
      this._order = value;
      this._onChangeCallback();
    }
    set(x2, y2, z, order = this._order) {
      this._x = x2;
      this._y = y2;
      this._z = z;
      this._order = order;
      this._onChangeCallback();
      return this;
    }
    clone() {
      return new this.constructor(this._x, this._y, this._z, this._order);
    }
    copy(euler) {
      this._x = euler._x;
      this._y = euler._y;
      this._z = euler._z;
      this._order = euler._order;
      this._onChangeCallback();
      return this;
    }
    setFromRotationMatrix(m2, order = this._order, update = true) {
      const te = m2.elements;
      const m11 = te[0], m12 = te[4], m13 = te[8];
      const m21 = te[1], m22 = te[5], m23 = te[9];
      const m31 = te[2], m32 = te[6], m33 = te[10];
      switch (order) {
        case "XYZ":
          this._y = Math.asin(clamp(m13, -1, 1));
          if (Math.abs(m13) < 0.9999999) {
            this._x = Math.atan2(-m23, m33);
            this._z = Math.atan2(-m12, m11);
          } else {
            this._x = Math.atan2(m32, m22);
            this._z = 0;
          }
          break;
        case "YXZ":
          this._x = Math.asin(-clamp(m23, -1, 1));
          if (Math.abs(m23) < 0.9999999) {
            this._y = Math.atan2(m13, m33);
            this._z = Math.atan2(m21, m22);
          } else {
            this._y = Math.atan2(-m31, m11);
            this._z = 0;
          }
          break;
        case "ZXY":
          this._x = Math.asin(clamp(m32, -1, 1));
          if (Math.abs(m32) < 0.9999999) {
            this._y = Math.atan2(-m31, m33);
            this._z = Math.atan2(-m12, m22);
          } else {
            this._y = 0;
            this._z = Math.atan2(m21, m11);
          }
          break;
        case "ZYX":
          this._y = Math.asin(-clamp(m31, -1, 1));
          if (Math.abs(m31) < 0.9999999) {
            this._x = Math.atan2(m32, m33);
            this._z = Math.atan2(m21, m11);
          } else {
            this._x = 0;
            this._z = Math.atan2(-m12, m22);
          }
          break;
        case "YZX":
          this._z = Math.asin(clamp(m21, -1, 1));
          if (Math.abs(m21) < 0.9999999) {
            this._x = Math.atan2(-m23, m22);
            this._y = Math.atan2(-m31, m11);
          } else {
            this._x = 0;
            this._y = Math.atan2(m13, m33);
          }
          break;
        case "XZY":
          this._z = Math.asin(-clamp(m12, -1, 1));
          if (Math.abs(m12) < 0.9999999) {
            this._x = Math.atan2(m32, m22);
            this._y = Math.atan2(m13, m11);
          } else {
            this._x = Math.atan2(-m23, m33);
            this._y = 0;
          }
          break;
        default:
          console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: " + order);
      }
      this._order = order;
      if (update === true) this._onChangeCallback();
      return this;
    }
    setFromQuaternion(q2, order, update) {
      _matrix$2.makeRotationFromQuaternion(q2);
      return this.setFromRotationMatrix(_matrix$2, order, update);
    }
    setFromVector3(v, order = this._order) {
      return this.set(v.x, v.y, v.z, order);
    }
    reorder(newOrder) {
      _quaternion$3.setFromEuler(this);
      return this.setFromQuaternion(_quaternion$3, newOrder);
    }
    equals(euler) {
      return euler._x === this._x && euler._y === this._y && euler._z === this._z && euler._order === this._order;
    }
    fromArray(array) {
      this._x = array[0];
      this._y = array[1];
      this._z = array[2];
      if (array[3] !== void 0) this._order = array[3];
      this._onChangeCallback();
      return this;
    }
    toArray(array = [], offset = 0) {
      array[offset] = this._x;
      array[offset + 1] = this._y;
      array[offset + 2] = this._z;
      array[offset + 3] = this._order;
      return array;
    }
    _onChange(callback) {
      this._onChangeCallback = callback;
      return this;
    }
    _onChangeCallback() {
    }
    *[Symbol.iterator]() {
      yield this._x;
      yield this._y;
      yield this._z;
      yield this._order;
    }
  };
  Euler.DEFAULT_ORDER = "XYZ";
  var Layers = class {
    constructor() {
      this.mask = 1 | 0;
    }
    set(channel) {
      this.mask = (1 << channel | 0) >>> 0;
    }
    enable(channel) {
      this.mask |= 1 << channel | 0;
    }
    enableAll() {
      this.mask = 4294967295 | 0;
    }
    toggle(channel) {
      this.mask ^= 1 << channel | 0;
    }
    disable(channel) {
      this.mask &= ~(1 << channel | 0);
    }
    disableAll() {
      this.mask = 0;
    }
    test(layers) {
      return (this.mask & layers.mask) !== 0;
    }
    isEnabled(channel) {
      return (this.mask & (1 << channel | 0)) !== 0;
    }
  };
  var _object3DId = 0;
  var _v1$4 = /* @__PURE__ */ new Vector3();
  var _q1 = /* @__PURE__ */ new Quaternion();
  var _m1$1 = /* @__PURE__ */ new Matrix4();
  var _target = /* @__PURE__ */ new Vector3();
  var _position$3 = /* @__PURE__ */ new Vector3();
  var _scale$2 = /* @__PURE__ */ new Vector3();
  var _quaternion$2 = /* @__PURE__ */ new Quaternion();
  var _xAxis = /* @__PURE__ */ new Vector3(1, 0, 0);
  var _yAxis = /* @__PURE__ */ new Vector3(0, 1, 0);
  var _zAxis = /* @__PURE__ */ new Vector3(0, 0, 1);
  var _addedEvent = { type: "added" };
  var _removedEvent = { type: "removed" };
  var _childaddedEvent = { type: "childadded", child: null };
  var _childremovedEvent = { type: "childremoved", child: null };
  var Object3D = class _Object3D extends EventDispatcher {
    constructor() {
      super();
      this.isObject3D = true;
      Object.defineProperty(this, "id", { value: _object3DId++ });
      this.uuid = generateUUID();
      this.name = "";
      this.type = "Object3D";
      this.parent = null;
      this.children = [];
      this.up = _Object3D.DEFAULT_UP.clone();
      const position = new Vector3();
      const rotation = new Euler();
      const quaternion = new Quaternion();
      const scale = new Vector3(1, 1, 1);
      function onRotationChange() {
        quaternion.setFromEuler(rotation, false);
      }
      function onQuaternionChange() {
        rotation.setFromQuaternion(quaternion, void 0, false);
      }
      rotation._onChange(onRotationChange);
      quaternion._onChange(onQuaternionChange);
      Object.defineProperties(this, {
        position: {
          configurable: true,
          enumerable: true,
          value: position
        },
        rotation: {
          configurable: true,
          enumerable: true,
          value: rotation
        },
        quaternion: {
          configurable: true,
          enumerable: true,
          value: quaternion
        },
        scale: {
          configurable: true,
          enumerable: true,
          value: scale
        },
        modelViewMatrix: {
          value: new Matrix4()
        },
        normalMatrix: {
          value: new Matrix3()
        }
      });
      this.matrix = new Matrix4();
      this.matrixWorld = new Matrix4();
      this.matrixAutoUpdate = _Object3D.DEFAULT_MATRIX_AUTO_UPDATE;
      this.matrixWorldAutoUpdate = _Object3D.DEFAULT_MATRIX_WORLD_AUTO_UPDATE;
      this.matrixWorldNeedsUpdate = false;
      this.layers = new Layers();
      this.visible = true;
      this.castShadow = false;
      this.receiveShadow = false;
      this.frustumCulled = true;
      this.renderOrder = 0;
      this.animations = [];
      this.userData = {};
    }
    onBeforeShadow() {
    }
    onAfterShadow() {
    }
    onBeforeRender() {
    }
    onAfterRender() {
    }
    applyMatrix4(matrix) {
      if (this.matrixAutoUpdate) this.updateMatrix();
      this.matrix.premultiply(matrix);
      this.matrix.decompose(this.position, this.quaternion, this.scale);
    }
    applyQuaternion(q2) {
      this.quaternion.premultiply(q2);
      return this;
    }
    setRotationFromAxisAngle(axis, angle) {
      this.quaternion.setFromAxisAngle(axis, angle);
    }
    setRotationFromEuler(euler) {
      this.quaternion.setFromEuler(euler, true);
    }
    setRotationFromMatrix(m2) {
      this.quaternion.setFromRotationMatrix(m2);
    }
    setRotationFromQuaternion(q2) {
      this.quaternion.copy(q2);
    }
    rotateOnAxis(axis, angle) {
      _q1.setFromAxisAngle(axis, angle);
      this.quaternion.multiply(_q1);
      return this;
    }
    rotateOnWorldAxis(axis, angle) {
      _q1.setFromAxisAngle(axis, angle);
      this.quaternion.premultiply(_q1);
      return this;
    }
    rotateX(angle) {
      return this.rotateOnAxis(_xAxis, angle);
    }
    rotateY(angle) {
      return this.rotateOnAxis(_yAxis, angle);
    }
    rotateZ(angle) {
      return this.rotateOnAxis(_zAxis, angle);
    }
    translateOnAxis(axis, distance) {
      _v1$4.copy(axis).applyQuaternion(this.quaternion);
      this.position.add(_v1$4.multiplyScalar(distance));
      return this;
    }
    translateX(distance) {
      return this.translateOnAxis(_xAxis, distance);
    }
    translateY(distance) {
      return this.translateOnAxis(_yAxis, distance);
    }
    translateZ(distance) {
      return this.translateOnAxis(_zAxis, distance);
    }
    localToWorld(vector) {
      this.updateWorldMatrix(true, false);
      return vector.applyMatrix4(this.matrixWorld);
    }
    worldToLocal(vector) {
      this.updateWorldMatrix(true, false);
      return vector.applyMatrix4(_m1$1.copy(this.matrixWorld).invert());
    }
    lookAt(x2, y2, z) {
      if (x2.isVector3) {
        _target.copy(x2);
      } else {
        _target.set(x2, y2, z);
      }
      const parent = this.parent;
      this.updateWorldMatrix(true, false);
      _position$3.setFromMatrixPosition(this.matrixWorld);
      if (this.isCamera || this.isLight) {
        _m1$1.lookAt(_position$3, _target, this.up);
      } else {
        _m1$1.lookAt(_target, _position$3, this.up);
      }
      this.quaternion.setFromRotationMatrix(_m1$1);
      if (parent) {
        _m1$1.extractRotation(parent.matrixWorld);
        _q1.setFromRotationMatrix(_m1$1);
        this.quaternion.premultiply(_q1.invert());
      }
    }
    add(object) {
      if (arguments.length > 1) {
        for (let i2 = 0; i2 < arguments.length; i2++) {
          this.add(arguments[i2]);
        }
        return this;
      }
      if (object === this) {
        console.error("THREE.Object3D.add: object can't be added as a child of itself.", object);
        return this;
      }
      if (object && object.isObject3D) {
        object.removeFromParent();
        object.parent = this;
        this.children.push(object);
        object.dispatchEvent(_addedEvent);
        _childaddedEvent.child = object;
        this.dispatchEvent(_childaddedEvent);
        _childaddedEvent.child = null;
      } else {
        console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.", object);
      }
      return this;
    }
    remove(object) {
      if (arguments.length > 1) {
        for (let i2 = 0; i2 < arguments.length; i2++) {
          this.remove(arguments[i2]);
        }
        return this;
      }
      const index = this.children.indexOf(object);
      if (index !== -1) {
        object.parent = null;
        this.children.splice(index, 1);
        object.dispatchEvent(_removedEvent);
        _childremovedEvent.child = object;
        this.dispatchEvent(_childremovedEvent);
        _childremovedEvent.child = null;
      }
      return this;
    }
    removeFromParent() {
      const parent = this.parent;
      if (parent !== null) {
        parent.remove(this);
      }
      return this;
    }
    clear() {
      return this.remove(...this.children);
    }
    attach(object) {
      this.updateWorldMatrix(true, false);
      _m1$1.copy(this.matrixWorld).invert();
      if (object.parent !== null) {
        object.parent.updateWorldMatrix(true, false);
        _m1$1.multiply(object.parent.matrixWorld);
      }
      object.applyMatrix4(_m1$1);
      object.removeFromParent();
      object.parent = this;
      this.children.push(object);
      object.updateWorldMatrix(false, true);
      object.dispatchEvent(_addedEvent);
      _childaddedEvent.child = object;
      this.dispatchEvent(_childaddedEvent);
      _childaddedEvent.child = null;
      return this;
    }
    getObjectById(id) {
      return this.getObjectByProperty("id", id);
    }
    getObjectByName(name) {
      return this.getObjectByProperty("name", name);
    }
    getObjectByProperty(name, value) {
      if (this[name] === value) return this;
      for (let i2 = 0, l2 = this.children.length; i2 < l2; i2++) {
        const child = this.children[i2];
        const object = child.getObjectByProperty(name, value);
        if (object !== void 0) {
          return object;
        }
      }
      return void 0;
    }
    getObjectsByProperty(name, value, result = []) {
      if (this[name] === value) result.push(this);
      const children = this.children;
      for (let i2 = 0, l2 = children.length; i2 < l2; i2++) {
        children[i2].getObjectsByProperty(name, value, result);
      }
      return result;
    }
    getWorldPosition(target) {
      this.updateWorldMatrix(true, false);
      return target.setFromMatrixPosition(this.matrixWorld);
    }
    getWorldQuaternion(target) {
      this.updateWorldMatrix(true, false);
      this.matrixWorld.decompose(_position$3, target, _scale$2);
      return target;
    }
    getWorldScale(target) {
      this.updateWorldMatrix(true, false);
      this.matrixWorld.decompose(_position$3, _quaternion$2, target);
      return target;
    }
    getWorldDirection(target) {
      this.updateWorldMatrix(true, false);
      const e = this.matrixWorld.elements;
      return target.set(e[8], e[9], e[10]).normalize();
    }
    raycast() {
    }
    traverse(callback) {
      callback(this);
      const children = this.children;
      for (let i2 = 0, l2 = children.length; i2 < l2; i2++) {
        children[i2].traverse(callback);
      }
    }
    traverseVisible(callback) {
      if (this.visible === false) return;
      callback(this);
      const children = this.children;
      for (let i2 = 0, l2 = children.length; i2 < l2; i2++) {
        children[i2].traverseVisible(callback);
      }
    }
    traverseAncestors(callback) {
      const parent = this.parent;
      if (parent !== null) {
        callback(parent);
        parent.traverseAncestors(callback);
      }
    }
    updateMatrix() {
      this.matrix.compose(this.position, this.quaternion, this.scale);
      this.matrixWorldNeedsUpdate = true;
    }
    updateMatrixWorld(force) {
      if (this.matrixAutoUpdate) this.updateMatrix();
      if (this.matrixWorldNeedsUpdate || force) {
        if (this.matrixWorldAutoUpdate === true) {
          if (this.parent === null) {
            this.matrixWorld.copy(this.matrix);
          } else {
            this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix);
          }
        }
        this.matrixWorldNeedsUpdate = false;
        force = true;
      }
      const children = this.children;
      for (let i2 = 0, l2 = children.length; i2 < l2; i2++) {
        const child = children[i2];
        child.updateMatrixWorld(force);
      }
    }
    updateWorldMatrix(updateParents, updateChildren) {
      const parent = this.parent;
      if (updateParents === true && parent !== null) {
        parent.updateWorldMatrix(true, false);
      }
      if (this.matrixAutoUpdate) this.updateMatrix();
      if (this.matrixWorldAutoUpdate === true) {
        if (this.parent === null) {
          this.matrixWorld.copy(this.matrix);
        } else {
          this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix);
        }
      }
      if (updateChildren === true) {
        const children = this.children;
        for (let i2 = 0, l2 = children.length; i2 < l2; i2++) {
          const child = children[i2];
          child.updateWorldMatrix(false, true);
        }
      }
    }
    toJSON(meta) {
      const isRootObject = meta === void 0 || typeof meta === "string";
      const output = {};
      if (isRootObject) {
        meta = {
          geometries: {},
          materials: {},
          textures: {},
          images: {},
          shapes: {},
          skeletons: {},
          animations: {},
          nodes: {}
        };
        output.metadata = {
          version: 4.6,
          type: "Object",
          generator: "Object3D.toJSON"
        };
      }
      const object = {};
      object.uuid = this.uuid;
      object.type = this.type;
      if (this.name !== "") object.name = this.name;
      if (this.castShadow === true) object.castShadow = true;
      if (this.receiveShadow === true) object.receiveShadow = true;
      if (this.visible === false) object.visible = false;
      if (this.frustumCulled === false) object.frustumCulled = false;
      if (this.renderOrder !== 0) object.renderOrder = this.renderOrder;
      if (Object.keys(this.userData).length > 0) object.userData = this.userData;
      object.layers = this.layers.mask;
      object.matrix = this.matrix.toArray();
      object.up = this.up.toArray();
      if (this.matrixAutoUpdate === false) object.matrixAutoUpdate = false;
      if (this.isInstancedMesh) {
        object.type = "InstancedMesh";
        object.count = this.count;
        object.instanceMatrix = this.instanceMatrix.toJSON();
        if (this.instanceColor !== null) object.instanceColor = this.instanceColor.toJSON();
      }
      if (this.isBatchedMesh) {
        object.type = "BatchedMesh";
        object.perObjectFrustumCulled = this.perObjectFrustumCulled;
        object.sortObjects = this.sortObjects;
        object.drawRanges = this._drawRanges;
        object.reservedRanges = this._reservedRanges;
        object.visibility = this._visibility;
        object.active = this._active;
        object.bounds = this._bounds.map((bound) => ({
          boxInitialized: bound.boxInitialized,
          boxMin: bound.box.min.toArray(),
          boxMax: bound.box.max.toArray(),
          sphereInitialized: bound.sphereInitialized,
          sphereRadius: bound.sphere.radius,
          sphereCenter: bound.sphere.center.toArray()
        }));
        object.maxInstanceCount = this._maxInstanceCount;
        object.maxVertexCount = this._maxVertexCount;
        object.maxIndexCount = this._maxIndexCount;
        object.geometryInitialized = this._geometryInitialized;
        object.geometryCount = this._geometryCount;
        object.matricesTexture = this._matricesTexture.toJSON(meta);
        if (this._colorsTexture !== null) object.colorsTexture = this._colorsTexture.toJSON(meta);
        if (this.boundingSphere !== null) {
          object.boundingSphere = {
            center: object.boundingSphere.center.toArray(),
            radius: object.boundingSphere.radius
          };
        }
        if (this.boundingBox !== null) {
          object.boundingBox = {
            min: object.boundingBox.min.toArray(),
            max: object.boundingBox.max.toArray()
          };
        }
      }
      function serialize(library, element) {
        if (library[element.uuid] === void 0) {
          library[element.uuid] = element.toJSON(meta);
        }
        return element.uuid;
      }
      if (this.isScene) {
        if (this.background) {
          if (this.background.isColor) {
            object.background = this.background.toJSON();
          } else if (this.background.isTexture) {
            object.background = this.background.toJSON(meta).uuid;
          }
        }
        if (this.environment && this.environment.isTexture && this.environment.isRenderTargetTexture !== true) {
          object.environment = this.environment.toJSON(meta).uuid;
        }
      } else if (this.isMesh || this.isLine || this.isPoints) {
        object.geometry = serialize(meta.geometries, this.geometry);
        const parameters = this.geometry.parameters;
        if (parameters !== void 0 && parameters.shapes !== void 0) {
          const shapes = parameters.shapes;
          if (Array.isArray(shapes)) {
            for (let i2 = 0, l2 = shapes.length; i2 < l2; i2++) {
              const shape = shapes[i2];
              serialize(meta.shapes, shape);
            }
          } else {
            serialize(meta.shapes, shapes);
          }
        }
      }
      if (this.isSkinnedMesh) {
        object.bindMode = this.bindMode;
        object.bindMatrix = this.bindMatrix.toArray();
        if (this.skeleton !== void 0) {
          serialize(meta.skeletons, this.skeleton);
          object.skeleton = this.skeleton.uuid;
        }
      }
      if (this.material !== void 0) {
        if (Array.isArray(this.material)) {
          const uuids = [];
          for (let i2 = 0, l2 = this.material.length; i2 < l2; i2++) {
            uuids.push(serialize(meta.materials, this.material[i2]));
          }
          object.material = uuids;
        } else {
          object.material = serialize(meta.materials, this.material);
        }
      }
      if (this.children.length > 0) {
        object.children = [];
        for (let i2 = 0; i2 < this.children.length; i2++) {
          object.children.push(this.children[i2].toJSON(meta).object);
        }
      }
      if (this.animations.length > 0) {
        object.animations = [];
        for (let i2 = 0; i2 < this.animations.length; i2++) {
          const animation = this.animations[i2];
          object.animations.push(serialize(meta.animations, animation));
        }
      }
      if (isRootObject) {
        const geometries = extractFromCache(meta.geometries);
        const materials = extractFromCache(meta.materials);
        const textures = extractFromCache(meta.textures);
        const images = extractFromCache(meta.images);
        const shapes = extractFromCache(meta.shapes);
        const skeletons = extractFromCache(meta.skeletons);
        const animations = extractFromCache(meta.animations);
        const nodes = extractFromCache(meta.nodes);
        if (geometries.length > 0) output.geometries = geometries;
        if (materials.length > 0) output.materials = materials;
        if (textures.length > 0) output.textures = textures;
        if (images.length > 0) output.images = images;
        if (shapes.length > 0) output.shapes = shapes;
        if (skeletons.length > 0) output.skeletons = skeletons;
        if (animations.length > 0) output.animations = animations;
        if (nodes.length > 0) output.nodes = nodes;
      }
      output.object = object;
      return output;
      function extractFromCache(cache2) {
        const values = [];
        for (const key in cache2) {
          const data = cache2[key];
          delete data.metadata;
          values.push(data);
        }
        return values;
      }
    }
    clone(recursive) {
      return new this.constructor().copy(this, recursive);
    }
    copy(source, recursive = true) {
      this.name = source.name;
      this.up.copy(source.up);
      this.position.copy(source.position);
      this.rotation.order = source.rotation.order;
      this.quaternion.copy(source.quaternion);
      this.scale.copy(source.scale);
      this.matrix.copy(source.matrix);
      this.matrixWorld.copy(source.matrixWorld);
      this.matrixAutoUpdate = source.matrixAutoUpdate;
      this.matrixWorldAutoUpdate = source.matrixWorldAutoUpdate;
      this.matrixWorldNeedsUpdate = source.matrixWorldNeedsUpdate;
      this.layers.mask = source.layers.mask;
      this.visible = source.visible;
      this.castShadow = source.castShadow;
      this.receiveShadow = source.receiveShadow;
      this.frustumCulled = source.frustumCulled;
      this.renderOrder = source.renderOrder;
      this.animations = source.animations.slice();
      this.userData = JSON.parse(JSON.stringify(source.userData));
      if (recursive === true) {
        for (let i2 = 0; i2 < source.children.length; i2++) {
          const child = source.children[i2];
          this.add(child.clone());
        }
      }
      return this;
    }
  };
  Object3D.DEFAULT_UP = /* @__PURE__ */ new Vector3(0, 1, 0);
  Object3D.DEFAULT_MATRIX_AUTO_UPDATE = true;
  Object3D.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = true;
  var _v0$1 = /* @__PURE__ */ new Vector3();
  var _v1$3 = /* @__PURE__ */ new Vector3();
  var _v2$2 = /* @__PURE__ */ new Vector3();
  var _v3$2 = /* @__PURE__ */ new Vector3();
  var _vab = /* @__PURE__ */ new Vector3();
  var _vac = /* @__PURE__ */ new Vector3();
  var _vbc = /* @__PURE__ */ new Vector3();
  var _vap = /* @__PURE__ */ new Vector3();
  var _vbp = /* @__PURE__ */ new Vector3();
  var _vcp = /* @__PURE__ */ new Vector3();
  var _v40 = /* @__PURE__ */ new Vector4();
  var _v41 = /* @__PURE__ */ new Vector4();
  var _v42 = /* @__PURE__ */ new Vector4();
  var Triangle = class _Triangle {
    constructor(a2 = new Vector3(), b2 = new Vector3(), c2 = new Vector3()) {
      this.a = a2;
      this.b = b2;
      this.c = c2;
    }
    static getNormal(a2, b2, c2, target) {
      target.subVectors(c2, b2);
      _v0$1.subVectors(a2, b2);
      target.cross(_v0$1);
      const targetLengthSq = target.lengthSq();
      if (targetLengthSq > 0) {
        return target.multiplyScalar(1 / Math.sqrt(targetLengthSq));
      }
      return target.set(0, 0, 0);
    }
    // static/instance method to calculate barycentric coordinates
    // based on: http://www.blackpawn.com/texts/pointinpoly/default.html
    static getBarycoord(point, a2, b2, c2, target) {
      _v0$1.subVectors(c2, a2);
      _v1$3.subVectors(b2, a2);
      _v2$2.subVectors(point, a2);
      const dot00 = _v0$1.dot(_v0$1);
      const dot01 = _v0$1.dot(_v1$3);
      const dot02 = _v0$1.dot(_v2$2);
      const dot11 = _v1$3.dot(_v1$3);
      const dot12 = _v1$3.dot(_v2$2);
      const denom = dot00 * dot11 - dot01 * dot01;
      if (denom === 0) {
        target.set(0, 0, 0);
        return null;
      }
      const invDenom = 1 / denom;
      const u2 = (dot11 * dot02 - dot01 * dot12) * invDenom;
      const v = (dot00 * dot12 - dot01 * dot02) * invDenom;
      return target.set(1 - u2 - v, v, u2);
    }
    static containsPoint(point, a2, b2, c2) {
      if (this.getBarycoord(point, a2, b2, c2, _v3$2) === null) {
        return false;
      }
      return _v3$2.x >= 0 && _v3$2.y >= 0 && _v3$2.x + _v3$2.y <= 1;
    }
    static getInterpolation(point, p1, p2, p3, v1, v2, v3, target) {
      if (this.getBarycoord(point, p1, p2, p3, _v3$2) === null) {
        target.x = 0;
        target.y = 0;
        if ("z" in target) target.z = 0;
        if ("w" in target) target.w = 0;
        return null;
      }
      target.setScalar(0);
      target.addScaledVector(v1, _v3$2.x);
      target.addScaledVector(v2, _v3$2.y);
      target.addScaledVector(v3, _v3$2.z);
      return target;
    }
    static getInterpolatedAttribute(attr, i1, i2, i3, barycoord, target) {
      _v40.setScalar(0);
      _v41.setScalar(0);
      _v42.setScalar(0);
      _v40.fromBufferAttribute(attr, i1);
      _v41.fromBufferAttribute(attr, i2);
      _v42.fromBufferAttribute(attr, i3);
      target.setScalar(0);
      target.addScaledVector(_v40, barycoord.x);
      target.addScaledVector(_v41, barycoord.y);
      target.addScaledVector(_v42, barycoord.z);
      return target;
    }
    static isFrontFacing(a2, b2, c2, direction) {
      _v0$1.subVectors(c2, b2);
      _v1$3.subVectors(a2, b2);
      return _v0$1.cross(_v1$3).dot(direction) < 0 ? true : false;
    }
    set(a2, b2, c2) {
      this.a.copy(a2);
      this.b.copy(b2);
      this.c.copy(c2);
      return this;
    }
    setFromPointsAndIndices(points, i0, i1, i2) {
      this.a.copy(points[i0]);
      this.b.copy(points[i1]);
      this.c.copy(points[i2]);
      return this;
    }
    setFromAttributeAndIndices(attribute, i0, i1, i2) {
      this.a.fromBufferAttribute(attribute, i0);
      this.b.fromBufferAttribute(attribute, i1);
      this.c.fromBufferAttribute(attribute, i2);
      return this;
    }
    clone() {
      return new this.constructor().copy(this);
    }
    copy(triangle) {
      this.a.copy(triangle.a);
      this.b.copy(triangle.b);
      this.c.copy(triangle.c);
      return this;
    }
    getArea() {
      _v0$1.subVectors(this.c, this.b);
      _v1$3.subVectors(this.a, this.b);
      return _v0$1.cross(_v1$3).length() * 0.5;
    }
    getMidpoint(target) {
      return target.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3);
    }
    getNormal(target) {
      return _Triangle.getNormal(this.a, this.b, this.c, target);
    }
    getPlane(target) {
      return target.setFromCoplanarPoints(this.a, this.b, this.c);
    }
    getBarycoord(point, target) {
      return _Triangle.getBarycoord(point, this.a, this.b, this.c, target);
    }
    getInterpolation(point, v1, v2, v3, target) {
      return _Triangle.getInterpolation(point, this.a, this.b, this.c, v1, v2, v3, target);
    }
    containsPoint(point) {
      return _Triangle.containsPoint(point, this.a, this.b, this.c);
    }
    isFrontFacing(direction) {
      return _Triangle.isFrontFacing(this.a, this.b, this.c, direction);
    }
    intersectsBox(box) {
      return box.intersectsTriangle(this);
    }
    closestPointToPoint(p2, target) {
      const a2 = this.a, b2 = this.b, c2 = this.c;
      let v, w2;
      _vab.subVectors(b2, a2);
      _vac.subVectors(c2, a2);
      _vap.subVectors(p2, a2);
      const d1 = _vab.dot(_vap);
      const d2 = _vac.dot(_vap);
      if (d1 <= 0 && d2 <= 0) {
        return target.copy(a2);
      }
      _vbp.subVectors(p2, b2);
      const d3 = _vab.dot(_vbp);
      const d4 = _vac.dot(_vbp);
      if (d3 >= 0 && d4 <= d3) {
        return target.copy(b2);
      }
      const vc = d1 * d4 - d3 * d2;
      if (vc <= 0 && d1 >= 0 && d3 <= 0) {
        v = d1 / (d1 - d3);
        return target.copy(a2).addScaledVector(_vab, v);
      }
      _vcp.subVectors(p2, c2);
      const d5 = _vab.dot(_vcp);
      const d6 = _vac.dot(_vcp);
      if (d6 >= 0 && d5 <= d6) {
        return target.copy(c2);
      }
      const vb = d5 * d2 - d1 * d6;
      if (vb <= 0 && d2 >= 0 && d6 <= 0) {
        w2 = d2 / (d2 - d6);
        return target.copy(a2).addScaledVector(_vac, w2);
      }
      const va = d3 * d6 - d5 * d4;
      if (va <= 0 && d4 - d3 >= 0 && d5 - d6 >= 0) {
        _vbc.subVectors(c2, b2);
        w2 = (d4 - d3) / (d4 - d3 + (d5 - d6));
        return target.copy(b2).addScaledVector(_vbc, w2);
      }
      const denom = 1 / (va + vb + vc);
      v = vb * denom;
      w2 = vc * denom;
      return target.copy(a2).addScaledVector(_vab, v).addScaledVector(_vac, w2);
    }
    equals(triangle) {
      return triangle.a.equals(this.a) && triangle.b.equals(this.b) && triangle.c.equals(this.c);
    }
  };
  var _colorKeywords = {
    "aliceblue": 15792383,
    "antiquewhite": 16444375,
    "aqua": 65535,
    "aquamarine": 8388564,
    "azure": 15794175,
    "beige": 16119260,
    "bisque": 16770244,
    "black": 0,
    "blanchedalmond": 16772045,
    "blue": 255,
    "blueviolet": 9055202,
    "brown": 10824234,
    "burlywood": 14596231,
    "cadetblue": 6266528,
    "chartreuse": 8388352,
    "chocolate": 13789470,
    "coral": 16744272,
    "cornflowerblue": 6591981,
    "cornsilk": 16775388,
    "crimson": 14423100,
    "cyan": 65535,
    "darkblue": 139,
    "darkcyan": 35723,
    "darkgoldenrod": 12092939,
    "darkgray": 11119017,
    "darkgreen": 25600,
    "darkgrey": 11119017,
    "darkkhaki": 12433259,
    "darkmagenta": 9109643,
    "darkolivegreen": 5597999,
    "darkorange": 16747520,
    "darkorchid": 10040012,
    "darkred": 9109504,
    "darksalmon": 15308410,
    "darkseagreen": 9419919,
    "darkslateblue": 4734347,
    "darkslategray": 3100495,
    "darkslategrey": 3100495,
    "darkturquoise": 52945,
    "darkviolet": 9699539,
    "deeppink": 16716947,
    "deepskyblue": 49151,
    "dimgray": 6908265,
    "dimgrey": 6908265,
    "dodgerblue": 2003199,
    "firebrick": 11674146,
    "floralwhite": 16775920,
    "forestgreen": 2263842,
    "fuchsia": 16711935,
    "gainsboro": 14474460,
    "ghostwhite": 16316671,
    "gold": 16766720,
    "goldenrod": 14329120,
    "gray": 8421504,
    "green": 32768,
    "greenyellow": 11403055,
    "grey": 8421504,
    "honeydew": 15794160,
    "hotpink": 16738740,
    "indianred": 13458524,
    "indigo": 4915330,
    "ivory": 16777200,
    "khaki": 15787660,
    "lavender": 15132410,
    "lavenderblush": 16773365,
    "lawngreen": 8190976,
    "lemonchiffon": 16775885,
    "lightblue": 11393254,
    "lightcoral": 15761536,
    "lightcyan": 14745599,
    "lightgoldenrodyellow": 16448210,
    "lightgray": 13882323,
    "lightgreen": 9498256,
    "lightgrey": 13882323,
    "lightpink": 16758465,
    "lightsalmon": 16752762,
    "lightseagreen": 2142890,
    "lightskyblue": 8900346,
    "lightslategray": 7833753,
    "lightslategrey": 7833753,
    "lightsteelblue": 11584734,
    "lightyellow": 16777184,
    "lime": 65280,
    "limegreen": 3329330,
    "linen": 16445670,
    "magenta": 16711935,
    "maroon": 8388608,
    "mediumaquamarine": 6737322,
    "mediumblue": 205,
    "mediumorchid": 12211667,
    "mediumpurple": 9662683,
    "mediumseagreen": 3978097,
    "mediumslateblue": 8087790,
    "mediumspringgreen": 64154,
    "mediumturquoise": 4772300,
    "mediumvioletred": 13047173,
    "midnightblue": 1644912,
    "mintcream": 16121850,
    "mistyrose": 16770273,
    "moccasin": 16770229,
    "navajowhite": 16768685,
    "navy": 128,
    "oldlace": 16643558,
    "olive": 8421376,
    "olivedrab": 7048739,
    "orange": 16753920,
    "orangered": 16729344,
    "orchid": 14315734,
    "palegoldenrod": 15657130,
    "palegreen": 10025880,
    "paleturquoise": 11529966,
    "palevioletred": 14381203,
    "papayawhip": 16773077,
    "peachpuff": 16767673,
    "peru": 13468991,
    "pink": 16761035,
    "plum": 14524637,
    "powderblue": 11591910,
    "purple": 8388736,
    "rebeccapurple": 6697881,
    "red": 16711680,
    "rosybrown": 12357519,
    "royalblue": 4286945,
    "saddlebrown": 9127187,
    "salmon": 16416882,
    "sandybrown": 16032864,
    "seagreen": 3050327,
    "seashell": 16774638,
    "sienna": 10506797,
    "silver": 12632256,
    "skyblue": 8900331,
    "slateblue": 6970061,
    "slategray": 7372944,
    "slategrey": 7372944,
    "snow": 16775930,
    "springgreen": 65407,
    "steelblue": 4620980,
    "tan": 13808780,
    "teal": 32896,
    "thistle": 14204888,
    "tomato": 16737095,
    "turquoise": 4251856,
    "violet": 15631086,
    "wheat": 16113331,
    "white": 16777215,
    "whitesmoke": 16119285,
    "yellow": 16776960,
    "yellowgreen": 10145074
  };
  var _hslA = { h: 0, s: 0, l: 0 };
  var _hslB = { h: 0, s: 0, l: 0 };
  function hue2rgb(p2, q2, t) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p2 + (q2 - p2) * 6 * t;
    if (t < 1 / 2) return q2;
    if (t < 2 / 3) return p2 + (q2 - p2) * 6 * (2 / 3 - t);
    return p2;
  }
  var Color = class {
    constructor(r2, g2, b2) {
      this.isColor = true;
      this.r = 1;
      this.g = 1;
      this.b = 1;
      return this.set(r2, g2, b2);
    }
    set(r2, g2, b2) {
      if (g2 === void 0 && b2 === void 0) {
        const value = r2;
        if (value && value.isColor) {
          this.copy(value);
        } else if (typeof value === "number") {
          this.setHex(value);
        } else if (typeof value === "string") {
          this.setStyle(value);
        }
      } else {
        this.setRGB(r2, g2, b2);
      }
      return this;
    }
    setScalar(scalar) {
      this.r = scalar;
      this.g = scalar;
      this.b = scalar;
      return this;
    }
    setHex(hex, colorSpace = SRGBColorSpace) {
      hex = Math.floor(hex);
      this.r = (hex >> 16 & 255) / 255;
      this.g = (hex >> 8 & 255) / 255;
      this.b = (hex & 255) / 255;
      ColorManagement.toWorkingColorSpace(this, colorSpace);
      return this;
    }
    setRGB(r2, g2, b2, colorSpace = ColorManagement.workingColorSpace) {
      this.r = r2;
      this.g = g2;
      this.b = b2;
      ColorManagement.toWorkingColorSpace(this, colorSpace);
      return this;
    }
    setHSL(h, s2, l2, colorSpace = ColorManagement.workingColorSpace) {
      h = euclideanModulo(h, 1);
      s2 = clamp(s2, 0, 1);
      l2 = clamp(l2, 0, 1);
      if (s2 === 0) {
        this.r = this.g = this.b = l2;
      } else {
        const p2 = l2 <= 0.5 ? l2 * (1 + s2) : l2 + s2 - l2 * s2;
        const q2 = 2 * l2 - p2;
        this.r = hue2rgb(q2, p2, h + 1 / 3);
        this.g = hue2rgb(q2, p2, h);
        this.b = hue2rgb(q2, p2, h - 1 / 3);
      }
      ColorManagement.toWorkingColorSpace(this, colorSpace);
      return this;
    }
    setStyle(style, colorSpace = SRGBColorSpace) {
      function handleAlpha(string) {
        if (string === void 0) return;
        if (parseFloat(string) < 1) {
          console.warn("THREE.Color: Alpha component of " + style + " will be ignored.");
        }
      }
      let m2;
      if (m2 = /^(\w+)\(([^\)]*)\)/.exec(style)) {
        let color;
        const name = m2[1];
        const components = m2[2];
        switch (name) {
          case "rgb":
          case "rgba":
            if (color = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(components)) {
              handleAlpha(color[4]);
              return this.setRGB(
                Math.min(255, parseInt(color[1], 10)) / 255,
                Math.min(255, parseInt(color[2], 10)) / 255,
                Math.min(255, parseInt(color[3], 10)) / 255,
                colorSpace
              );
            }
            if (color = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(components)) {
              handleAlpha(color[4]);
              return this.setRGB(
                Math.min(100, parseInt(color[1], 10)) / 100,
                Math.min(100, parseInt(color[2], 10)) / 100,
                Math.min(100, parseInt(color[3], 10)) / 100,
                colorSpace
              );
            }
            break;
          case "hsl":
          case "hsla":
            if (color = /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(components)) {
              handleAlpha(color[4]);
              return this.setHSL(
                parseFloat(color[1]) / 360,
                parseFloat(color[2]) / 100,
                parseFloat(color[3]) / 100,
                colorSpace
              );
            }
            break;
          default:
            console.warn("THREE.Color: Unknown color model " + style);
        }
      } else if (m2 = /^\#([A-Fa-f\d]+)$/.exec(style)) {
        const hex = m2[1];
        const size = hex.length;
        if (size === 3) {
          return this.setRGB(
            parseInt(hex.charAt(0), 16) / 15,
            parseInt(hex.charAt(1), 16) / 15,
            parseInt(hex.charAt(2), 16) / 15,
            colorSpace
          );
        } else if (size === 6) {
          return this.setHex(parseInt(hex, 16), colorSpace);
        } else {
          console.warn("THREE.Color: Invalid hex color " + style);
        }
      } else if (style && style.length > 0) {
        return this.setColorName(style, colorSpace);
      }
      return this;
    }
    setColorName(style, colorSpace = SRGBColorSpace) {
      const hex = _colorKeywords[style.toLowerCase()];
      if (hex !== void 0) {
        this.setHex(hex, colorSpace);
      } else {
        console.warn("THREE.Color: Unknown color " + style);
      }
      return this;
    }
    clone() {
      return new this.constructor(this.r, this.g, this.b);
    }
    copy(color) {
      this.r = color.r;
      this.g = color.g;
      this.b = color.b;
      return this;
    }
    copySRGBToLinear(color) {
      this.r = SRGBToLinear(color.r);
      this.g = SRGBToLinear(color.g);
      this.b = SRGBToLinear(color.b);
      return this;
    }
    copyLinearToSRGB(color) {
      this.r = LinearToSRGB(color.r);
      this.g = LinearToSRGB(color.g);
      this.b = LinearToSRGB(color.b);
      return this;
    }
    convertSRGBToLinear() {
      this.copySRGBToLinear(this);
      return this;
    }
    convertLinearToSRGB() {
      this.copyLinearToSRGB(this);
      return this;
    }
    getHex(colorSpace = SRGBColorSpace) {
      ColorManagement.fromWorkingColorSpace(_color.copy(this), colorSpace);
      return Math.round(clamp(_color.r * 255, 0, 255)) * 65536 + Math.round(clamp(_color.g * 255, 0, 255)) * 256 + Math.round(clamp(_color.b * 255, 0, 255));
    }
    getHexString(colorSpace = SRGBColorSpace) {
      return ("000000" + this.getHex(colorSpace).toString(16)).slice(-6);
    }
    getHSL(target, colorSpace = ColorManagement.workingColorSpace) {
      ColorManagement.fromWorkingColorSpace(_color.copy(this), colorSpace);
      const r2 = _color.r, g2 = _color.g, b2 = _color.b;
      const max = Math.max(r2, g2, b2);
      const min = Math.min(r2, g2, b2);
      let hue, saturation;
      const lightness = (min + max) / 2;
      if (min === max) {
        hue = 0;
        saturation = 0;
      } else {
        const delta = max - min;
        saturation = lightness <= 0.5 ? delta / (max + min) : delta / (2 - max - min);
        switch (max) {
          case r2:
            hue = (g2 - b2) / delta + (g2 < b2 ? 6 : 0);
            break;
          case g2:
            hue = (b2 - r2) / delta + 2;
            break;
          case b2:
            hue = (r2 - g2) / delta + 4;
            break;
        }
        hue /= 6;
      }
      target.h = hue;
      target.s = saturation;
      target.l = lightness;
      return target;
    }
    getRGB(target, colorSpace = ColorManagement.workingColorSpace) {
      ColorManagement.fromWorkingColorSpace(_color.copy(this), colorSpace);
      target.r = _color.r;
      target.g = _color.g;
      target.b = _color.b;
      return target;
    }
    getStyle(colorSpace = SRGBColorSpace) {
      ColorManagement.fromWorkingColorSpace(_color.copy(this), colorSpace);
      const r2 = _color.r, g2 = _color.g, b2 = _color.b;
      if (colorSpace !== SRGBColorSpace) {
        return `color(${colorSpace} ${r2.toFixed(3)} ${g2.toFixed(3)} ${b2.toFixed(3)})`;
      }
      return `rgb(${Math.round(r2 * 255)},${Math.round(g2 * 255)},${Math.round(b2 * 255)})`;
    }
    offsetHSL(h, s2, l2) {
      this.getHSL(_hslA);
      return this.setHSL(_hslA.h + h, _hslA.s + s2, _hslA.l + l2);
    }
    add(color) {
      this.r += color.r;
      this.g += color.g;
      this.b += color.b;
      return this;
    }
    addColors(color1, color2) {
      this.r = color1.r + color2.r;
      this.g = color1.g + color2.g;
      this.b = color1.b + color2.b;
      return this;
    }
    addScalar(s2) {
      this.r += s2;
      this.g += s2;
      this.b += s2;
      return this;
    }
    sub(color) {
      this.r = Math.max(0, this.r - color.r);
      this.g = Math.max(0, this.g - color.g);
      this.b = Math.max(0, this.b - color.b);
      return this;
    }
    multiply(color) {
      this.r *= color.r;
      this.g *= color.g;
      this.b *= color.b;
      return this;
    }
    multiplyScalar(s2) {
      this.r *= s2;
      this.g *= s2;
      this.b *= s2;
      return this;
    }
    lerp(color, alpha) {
      this.r += (color.r - this.r) * alpha;
      this.g += (color.g - this.g) * alpha;
      this.b += (color.b - this.b) * alpha;
      return this;
    }
    lerpColors(color1, color2, alpha) {
      this.r = color1.r + (color2.r - color1.r) * alpha;
      this.g = color1.g + (color2.g - color1.g) * alpha;
      this.b = color1.b + (color2.b - color1.b) * alpha;
      return this;
    }
    lerpHSL(color, alpha) {
      this.getHSL(_hslA);
      color.getHSL(_hslB);
      const h = lerp(_hslA.h, _hslB.h, alpha);
      const s2 = lerp(_hslA.s, _hslB.s, alpha);
      const l2 = lerp(_hslA.l, _hslB.l, alpha);
      this.setHSL(h, s2, l2);
      return this;
    }
    setFromVector3(v) {
      this.r = v.x;
      this.g = v.y;
      this.b = v.z;
      return this;
    }
    applyMatrix3(m2) {
      const r2 = this.r, g2 = this.g, b2 = this.b;
      const e = m2.elements;
      this.r = e[0] * r2 + e[3] * g2 + e[6] * b2;
      this.g = e[1] * r2 + e[4] * g2 + e[7] * b2;
      this.b = e[2] * r2 + e[5] * g2 + e[8] * b2;
      return this;
    }
    equals(c2) {
      return c2.r === this.r && c2.g === this.g && c2.b === this.b;
    }
    fromArray(array, offset = 0) {
      this.r = array[offset];
      this.g = array[offset + 1];
      this.b = array[offset + 2];
      return this;
    }
    toArray(array = [], offset = 0) {
      array[offset] = this.r;
      array[offset + 1] = this.g;
      array[offset + 2] = this.b;
      return array;
    }
    fromBufferAttribute(attribute, index) {
      this.r = attribute.getX(index);
      this.g = attribute.getY(index);
      this.b = attribute.getZ(index);
      return this;
    }
    toJSON() {
      return this.getHex();
    }
    *[Symbol.iterator]() {
      yield this.r;
      yield this.g;
      yield this.b;
    }
  };
  var _color = /* @__PURE__ */ new Color();
  Color.NAMES = _colorKeywords;
  var _materialId = 0;
  var Material = class extends EventDispatcher {
    constructor() {
      super();
      this.isMaterial = true;
      Object.defineProperty(this, "id", { value: _materialId++ });
      this.uuid = generateUUID();
      this.name = "";
      this.type = "Material";
      this.blending = NormalBlending;
      this.side = FrontSide;
      this.vertexColors = false;
      this.opacity = 1;
      this.transparent = false;
      this.alphaHash = false;
      this.blendSrc = SrcAlphaFactor;
      this.blendDst = OneMinusSrcAlphaFactor;
      this.blendEquation = AddEquation;
      this.blendSrcAlpha = null;
      this.blendDstAlpha = null;
      this.blendEquationAlpha = null;
      this.blendColor = new Color(0, 0, 0);
      this.blendAlpha = 0;
      this.depthFunc = LessEqualDepth;
      this.depthTest = true;
      this.depthWrite = true;
      this.stencilWriteMask = 255;
      this.stencilFunc = AlwaysStencilFunc;
      this.stencilRef = 0;
      this.stencilFuncMask = 255;
      this.stencilFail = KeepStencilOp;
      this.stencilZFail = KeepStencilOp;
      this.stencilZPass = KeepStencilOp;
      this.stencilWrite = false;
      this.clippingPlanes = null;
      this.clipIntersection = false;
      this.clipShadows = false;
      this.shadowSide = null;
      this.colorWrite = true;
      this.precision = null;
      this.polygonOffset = false;
      this.polygonOffsetFactor = 0;
      this.polygonOffsetUnits = 0;
      this.dithering = false;
      this.alphaToCoverage = false;
      this.premultipliedAlpha = false;
      this.forceSinglePass = false;
      this.visible = true;
      this.toneMapped = true;
      this.userData = {};
      this.version = 0;
      this._alphaTest = 0;
    }
    get alphaTest() {
      return this._alphaTest;
    }
    set alphaTest(value) {
      if (this._alphaTest > 0 !== value > 0) {
        this.version++;
      }
      this._alphaTest = value;
    }
    // onBeforeRender and onBeforeCompile only supported in WebGLRenderer
    onBeforeRender() {
    }
    onBeforeCompile() {
    }
    customProgramCacheKey() {
      return this.onBeforeCompile.toString();
    }
    setValues(values) {
      if (values === void 0) return;
      for (const key in values) {
        const newValue = values[key];
        if (newValue === void 0) {
          console.warn(`THREE.Material: parameter '${key}' has value of undefined.`);
          continue;
        }
        const currentValue = this[key];
        if (currentValue === void 0) {
          console.warn(`THREE.Material: '${key}' is not a property of THREE.${this.type}.`);
          continue;
        }
        if (currentValue && currentValue.isColor) {
          currentValue.set(newValue);
        } else if (currentValue && currentValue.isVector3 && (newValue && newValue.isVector3)) {
          currentValue.copy(newValue);
        } else {
          this[key] = newValue;
        }
      }
    }
    toJSON(meta) {
      const isRootObject = meta === void 0 || typeof meta === "string";
      if (isRootObject) {
        meta = {
          textures: {},
          images: {}
        };
      }
      const data = {
        metadata: {
          version: 4.6,
          type: "Material",
          generator: "Material.toJSON"
        }
      };
      data.uuid = this.uuid;
      data.type = this.type;
      if (this.name !== "") data.name = this.name;
      if (this.color && this.color.isColor) data.color = this.color.getHex();
      if (this.roughness !== void 0) data.roughness = this.roughness;
      if (this.metalness !== void 0) data.metalness = this.metalness;
      if (this.sheen !== void 0) data.sheen = this.sheen;
      if (this.sheenColor && this.sheenColor.isColor) data.sheenColor = this.sheenColor.getHex();
      if (this.sheenRoughness !== void 0) data.sheenRoughness = this.sheenRoughness;
      if (this.emissive && this.emissive.isColor) data.emissive = this.emissive.getHex();
      if (this.emissiveIntensity !== void 0 && this.emissiveIntensity !== 1) data.emissiveIntensity = this.emissiveIntensity;
      if (this.specular && this.specular.isColor) data.specular = this.specular.getHex();
      if (this.specularIntensity !== void 0) data.specularIntensity = this.specularIntensity;
      if (this.specularColor && this.specularColor.isColor) data.specularColor = this.specularColor.getHex();
      if (this.shininess !== void 0) data.shininess = this.shininess;
      if (this.clearcoat !== void 0) data.clearcoat = this.clearcoat;
      if (this.clearcoatRoughness !== void 0) data.clearcoatRoughness = this.clearcoatRoughness;
      if (this.clearcoatMap && this.clearcoatMap.isTexture) {
        data.clearcoatMap = this.clearcoatMap.toJSON(meta).uuid;
      }
      if (this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture) {
        data.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(meta).uuid;
      }
      if (this.clearcoatNormalMap && this.clearcoatNormalMap.isTexture) {
        data.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(meta).uuid;
        data.clearcoatNormalScale = this.clearcoatNormalScale.toArray();
      }
      if (this.dispersion !== void 0) data.dispersion = this.dispersion;
      if (this.iridescence !== void 0) data.iridescence = this.iridescence;
      if (this.iridescenceIOR !== void 0) data.iridescenceIOR = this.iridescenceIOR;
      if (this.iridescenceThicknessRange !== void 0) data.iridescenceThicknessRange = this.iridescenceThicknessRange;
      if (this.iridescenceMap && this.iridescenceMap.isTexture) {
        data.iridescenceMap = this.iridescenceMap.toJSON(meta).uuid;
      }
      if (this.iridescenceThicknessMap && this.iridescenceThicknessMap.isTexture) {
        data.iridescenceThicknessMap = this.iridescenceThicknessMap.toJSON(meta).uuid;
      }
      if (this.anisotropy !== void 0) data.anisotropy = this.anisotropy;
      if (this.anisotropyRotation !== void 0) data.anisotropyRotation = this.anisotropyRotation;
      if (this.anisotropyMap && this.anisotropyMap.isTexture) {
        data.anisotropyMap = this.anisotropyMap.toJSON(meta).uuid;
      }
      if (this.map && this.map.isTexture) data.map = this.map.toJSON(meta).uuid;
      if (this.matcap && this.matcap.isTexture) data.matcap = this.matcap.toJSON(meta).uuid;
      if (this.alphaMap && this.alphaMap.isTexture) data.alphaMap = this.alphaMap.toJSON(meta).uuid;
      if (this.lightMap && this.lightMap.isTexture) {
        data.lightMap = this.lightMap.toJSON(meta).uuid;
        data.lightMapIntensity = this.lightMapIntensity;
      }
      if (this.aoMap && this.aoMap.isTexture) {
        data.aoMap = this.aoMap.toJSON(meta).uuid;
        data.aoMapIntensity = this.aoMapIntensity;
      }
      if (this.bumpMap && this.bumpMap.isTexture) {
        data.bumpMap = this.bumpMap.toJSON(meta).uuid;
        data.bumpScale = this.bumpScale;
      }
      if (this.normalMap && this.normalMap.isTexture) {
        data.normalMap = this.normalMap.toJSON(meta).uuid;
        data.normalMapType = this.normalMapType;
        data.normalScale = this.normalScale.toArray();
      }
      if (this.displacementMap && this.displacementMap.isTexture) {
        data.displacementMap = this.displacementMap.toJSON(meta).uuid;
        data.displacementScale = this.displacementScale;
        data.displacementBias = this.displacementBias;
      }
      if (this.roughnessMap && this.roughnessMap.isTexture) data.roughnessMap = this.roughnessMap.toJSON(meta).uuid;
      if (this.metalnessMap && this.metalnessMap.isTexture) data.metalnessMap = this.metalnessMap.toJSON(meta).uuid;
      if (this.emissiveMap && this.emissiveMap.isTexture) data.emissiveMap = this.emissiveMap.toJSON(meta).uuid;
      if (this.specularMap && this.specularMap.isTexture) data.specularMap = this.specularMap.toJSON(meta).uuid;
      if (this.specularIntensityMap && this.specularIntensityMap.isTexture) data.specularIntensityMap = this.specularIntensityMap.toJSON(meta).uuid;
      if (this.specularColorMap && this.specularColorMap.isTexture) data.specularColorMap = this.specularColorMap.toJSON(meta).uuid;
      if (this.envMap && this.envMap.isTexture) {
        data.envMap = this.envMap.toJSON(meta).uuid;
        if (this.combine !== void 0) data.combine = this.combine;
      }
      if (this.envMapRotation !== void 0) data.envMapRotation = this.envMapRotation.toArray();
      if (this.envMapIntensity !== void 0) data.envMapIntensity = this.envMapIntensity;
      if (this.reflectivity !== void 0) data.reflectivity = this.reflectivity;
      if (this.refractionRatio !== void 0) data.refractionRatio = this.refractionRatio;
      if (this.gradientMap && this.gradientMap.isTexture) {
        data.gradientMap = this.gradientMap.toJSON(meta).uuid;
      }
      if (this.transmission !== void 0) data.transmission = this.transmission;
      if (this.transmissionMap && this.transmissionMap.isTexture) data.transmissionMap = this.transmissionMap.toJSON(meta).uuid;
      if (this.thickness !== void 0) data.thickness = this.thickness;
      if (this.thicknessMap && this.thicknessMap.isTexture) data.thicknessMap = this.thicknessMap.toJSON(meta).uuid;
      if (this.attenuationDistance !== void 0 && this.attenuationDistance !== Infinity) data.attenuationDistance = this.attenuationDistance;
      if (this.attenuationColor !== void 0) data.attenuationColor = this.attenuationColor.getHex();
      if (this.size !== void 0) data.size = this.size;
      if (this.shadowSide !== null) data.shadowSide = this.shadowSide;
      if (this.sizeAttenuation !== void 0) data.sizeAttenuation = this.sizeAttenuation;
      if (this.blending !== NormalBlending) data.blending = this.blending;
      if (this.side !== FrontSide) data.side = this.side;
      if (this.vertexColors === true) data.vertexColors = true;
      if (this.opacity < 1) data.opacity = this.opacity;
      if (this.transparent === true) data.transparent = true;
      if (this.blendSrc !== SrcAlphaFactor) data.blendSrc = this.blendSrc;
      if (this.blendDst !== OneMinusSrcAlphaFactor) data.blendDst = this.blendDst;
      if (this.blendEquation !== AddEquation) data.blendEquation = this.blendEquation;
      if (this.blendSrcAlpha !== null) data.blendSrcAlpha = this.blendSrcAlpha;
      if (this.blendDstAlpha !== null) data.blendDstAlpha = this.blendDstAlpha;
      if (this.blendEquationAlpha !== null) data.blendEquationAlpha = this.blendEquationAlpha;
      if (this.blendColor && this.blendColor.isColor) data.blendColor = this.blendColor.getHex();
      if (this.blendAlpha !== 0) data.blendAlpha = this.blendAlpha;
      if (this.depthFunc !== LessEqualDepth) data.depthFunc = this.depthFunc;
      if (this.depthTest === false) data.depthTest = this.depthTest;
      if (this.depthWrite === false) data.depthWrite = this.depthWrite;
      if (this.colorWrite === false) data.colorWrite = this.colorWrite;
      if (this.stencilWriteMask !== 255) data.stencilWriteMask = this.stencilWriteMask;
      if (this.stencilFunc !== AlwaysStencilFunc) data.stencilFunc = this.stencilFunc;
      if (this.stencilRef !== 0) data.stencilRef = this.stencilRef;
      if (this.stencilFuncMask !== 255) data.stencilFuncMask = this.stencilFuncMask;
      if (this.stencilFail !== KeepStencilOp) data.stencilFail = this.stencilFail;
      if (this.stencilZFail !== KeepStencilOp) data.stencilZFail = this.stencilZFail;
      if (this.stencilZPass !== KeepStencilOp) data.stencilZPass = this.stencilZPass;
      if (this.stencilWrite === true) data.stencilWrite = this.stencilWrite;
      if (this.rotation !== void 0 && this.rotation !== 0) data.rotation = this.rotation;
      if (this.polygonOffset === true) data.polygonOffset = true;
      if (this.polygonOffsetFactor !== 0) data.polygonOffsetFactor = this.polygonOffsetFactor;
      if (this.polygonOffsetUnits !== 0) data.polygonOffsetUnits = this.polygonOffsetUnits;
      if (this.linewidth !== void 0 && this.linewidth !== 1) data.linewidth = this.linewidth;
      if (this.dashSize !== void 0) data.dashSize = this.dashSize;
      if (this.gapSize !== void 0) data.gapSize = this.gapSize;
      if (this.scale !== void 0) data.scale = this.scale;
      if (this.dithering === true) data.dithering = true;
      if (this.alphaTest > 0) data.alphaTest = this.alphaTest;
      if (this.alphaHash === true) data.alphaHash = true;
      if (this.alphaToCoverage === true) data.alphaToCoverage = true;
      if (this.premultipliedAlpha === true) data.premultipliedAlpha = true;
      if (this.forceSinglePass === true) data.forceSinglePass = true;
      if (this.wireframe === true) data.wireframe = true;
      if (this.wireframeLinewidth > 1) data.wireframeLinewidth = this.wireframeLinewidth;
      if (this.wireframeLinecap !== "round") data.wireframeLinecap = this.wireframeLinecap;
      if (this.wireframeLinejoin !== "round") data.wireframeLinejoin = this.wireframeLinejoin;
      if (this.flatShading === true) data.flatShading = true;
      if (this.visible === false) data.visible = false;
      if (this.toneMapped === false) data.toneMapped = false;
      if (this.fog === false) data.fog = false;
      if (Object.keys(this.userData).length > 0) data.userData = this.userData;
      function extractFromCache(cache2) {
        const values = [];
        for (const key in cache2) {
          const data2 = cache2[key];
          delete data2.metadata;
          values.push(data2);
        }
        return values;
      }
      if (isRootObject) {
        const textures = extractFromCache(meta.textures);
        const images = extractFromCache(meta.images);
        if (textures.length > 0) data.textures = textures;
        if (images.length > 0) data.images = images;
      }
      return data;
    }
    clone() {
      return new this.constructor().copy(this);
    }
    copy(source) {
      this.name = source.name;
      this.blending = source.blending;
      this.side = source.side;
      this.vertexColors = source.vertexColors;
      this.opacity = source.opacity;
      this.transparent = source.transparent;
      this.blendSrc = source.blendSrc;
      this.blendDst = source.blendDst;
      this.blendEquation = source.blendEquation;
      this.blendSrcAlpha = source.blendSrcAlpha;
      this.blendDstAlpha = source.blendDstAlpha;
      this.blendEquationAlpha = source.blendEquationAlpha;
      this.blendColor.copy(source.blendColor);
      this.blendAlpha = source.blendAlpha;
      this.depthFunc = source.depthFunc;
      this.depthTest = source.depthTest;
      this.depthWrite = source.depthWrite;
      this.stencilWriteMask = source.stencilWriteMask;
      this.stencilFunc = source.stencilFunc;
      this.stencilRef = source.stencilRef;
      this.stencilFuncMask = source.stencilFuncMask;
      this.stencilFail = source.stencilFail;
      this.stencilZFail = source.stencilZFail;
      this.stencilZPass = source.stencilZPass;
      this.stencilWrite = source.stencilWrite;
      const srcPlanes = source.clippingPlanes;
      let dstPlanes = null;
      if (srcPlanes !== null) {
        const n2 = srcPlanes.length;
        dstPlanes = new Array(n2);
        for (let i2 = 0; i2 !== n2; ++i2) {
          dstPlanes[i2] = srcPlanes[i2].clone();
        }
      }
      this.clippingPlanes = dstPlanes;
      this.clipIntersection = source.clipIntersection;
      this.clipShadows = source.clipShadows;
      this.shadowSide = source.shadowSide;
      this.colorWrite = source.colorWrite;
      this.precision = source.precision;
      this.polygonOffset = source.polygonOffset;
      this.polygonOffsetFactor = source.polygonOffsetFactor;
      this.polygonOffsetUnits = source.polygonOffsetUnits;
      this.dithering = source.dithering;
      this.alphaTest = source.alphaTest;
      this.alphaHash = source.alphaHash;
      this.alphaToCoverage = source.alphaToCoverage;
      this.premultipliedAlpha = source.premultipliedAlpha;
      this.forceSinglePass = source.forceSinglePass;
      this.visible = source.visible;
      this.toneMapped = source.toneMapped;
      this.userData = JSON.parse(JSON.stringify(source.userData));
      return this;
    }
    dispose() {
      this.dispatchEvent({ type: "dispose" });
    }
    set needsUpdate(value) {
      if (value === true) this.version++;
    }
    onBuild() {
      console.warn("Material: onBuild() has been removed.");
    }
  };
  var MeshBasicMaterial = class extends Material {
    constructor(parameters) {
      super();
      this.isMeshBasicMaterial = true;
      this.type = "MeshBasicMaterial";
      this.color = new Color(16777215);
      this.map = null;
      this.lightMap = null;
      this.lightMapIntensity = 1;
      this.aoMap = null;
      this.aoMapIntensity = 1;
      this.specularMap = null;
      this.alphaMap = null;
      this.envMap = null;
      this.envMapRotation = new Euler();
      this.combine = MultiplyOperation;
      this.reflectivity = 1;
      this.refractionRatio = 0.98;
      this.wireframe = false;
      this.wireframeLinewidth = 1;
      this.wireframeLinecap = "round";
      this.wireframeLinejoin = "round";
      this.fog = true;
      this.setValues(parameters);
    }
    copy(source) {
      super.copy(source);
      this.color.copy(source.color);
      this.map = source.map;
      this.lightMap = source.lightMap;
      this.lightMapIntensity = source.lightMapIntensity;
      this.aoMap = source.aoMap;
      this.aoMapIntensity = source.aoMapIntensity;
      this.specularMap = source.specularMap;
      this.alphaMap = source.alphaMap;
      this.envMap = source.envMap;
      this.envMapRotation.copy(source.envMapRotation);
      this.combine = source.combine;
      this.reflectivity = source.reflectivity;
      this.refractionRatio = source.refractionRatio;
      this.wireframe = source.wireframe;
      this.wireframeLinewidth = source.wireframeLinewidth;
      this.wireframeLinecap = source.wireframeLinecap;
      this.wireframeLinejoin = source.wireframeLinejoin;
      this.fog = source.fog;
      return this;
    }
  };
  var _vector$9 = /* @__PURE__ */ new Vector3();
  var _vector2$1 = /* @__PURE__ */ new Vector2();
  var BufferAttribute = class {
    constructor(array, itemSize, normalized = false) {
      if (Array.isArray(array)) {
        throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
      }
      this.isBufferAttribute = true;
      this.name = "";
      this.array = array;
      this.itemSize = itemSize;
      this.count = array !== void 0 ? array.length / itemSize : 0;
      this.normalized = normalized;
      this.usage = StaticDrawUsage;
      this.updateRanges = [];
      this.gpuType = FloatType;
      this.version = 0;
    }
    onUploadCallback() {
    }
    set needsUpdate(value) {
      if (value === true) this.version++;
    }
    setUsage(value) {
      this.usage = value;
      return this;
    }
    addUpdateRange(start, count) {
      this.updateRanges.push({ start, count });
    }
    clearUpdateRanges() {
      this.updateRanges.length = 0;
    }
    copy(source) {
      this.name = source.name;
      this.array = new source.array.constructor(source.array);
      this.itemSize = source.itemSize;
      this.count = source.count;
      this.normalized = source.normalized;
      this.usage = source.usage;
      this.gpuType = source.gpuType;
      return this;
    }
    copyAt(index1, attribute, index2) {
      index1 *= this.itemSize;
      index2 *= attribute.itemSize;
      for (let i2 = 0, l2 = this.itemSize; i2 < l2; i2++) {
        this.array[index1 + i2] = attribute.array[index2 + i2];
      }
      return this;
    }
    copyArray(array) {
      this.array.set(array);
      return this;
    }
    applyMatrix3(m2) {
      if (this.itemSize === 2) {
        for (let i2 = 0, l2 = this.count; i2 < l2; i2++) {
          _vector2$1.fromBufferAttribute(this, i2);
          _vector2$1.applyMatrix3(m2);
          this.setXY(i2, _vector2$1.x, _vector2$1.y);
        }
      } else if (this.itemSize === 3) {
        for (let i2 = 0, l2 = this.count; i2 < l2; i2++) {
          _vector$9.fromBufferAttribute(this, i2);
          _vector$9.applyMatrix3(m2);
          this.setXYZ(i2, _vector$9.x, _vector$9.y, _vector$9.z);
        }
      }
      return this;
    }
    applyMatrix4(m2) {
      for (let i2 = 0, l2 = this.count; i2 < l2; i2++) {
        _vector$9.fromBufferAttribute(this, i2);
        _vector$9.applyMatrix4(m2);
        this.setXYZ(i2, _vector$9.x, _vector$9.y, _vector$9.z);
      }
      return this;
    }
    applyNormalMatrix(m2) {
      for (let i2 = 0, l2 = this.count; i2 < l2; i2++) {
        _vector$9.fromBufferAttribute(this, i2);
        _vector$9.applyNormalMatrix(m2);
        this.setXYZ(i2, _vector$9.x, _vector$9.y, _vector$9.z);
      }
      return this;
    }
    transformDirection(m2) {
      for (let i2 = 0, l2 = this.count; i2 < l2; i2++) {
        _vector$9.fromBufferAttribute(this, i2);
        _vector$9.transformDirection(m2);
        this.setXYZ(i2, _vector$9.x, _vector$9.y, _vector$9.z);
      }
      return this;
    }
    set(value, offset = 0) {
      this.array.set(value, offset);
      return this;
    }
    getComponent(index, component) {
      let value = this.array[index * this.itemSize + component];
      if (this.normalized) value = denormalize(value, this.array);
      return value;
    }
    setComponent(index, component, value) {
      if (this.normalized) value = normalize(value, this.array);
      this.array[index * this.itemSize + component] = value;
      return this;
    }
    getX(index) {
      let x2 = this.array[index * this.itemSize];
      if (this.normalized) x2 = denormalize(x2, this.array);
      return x2;
    }
    setX(index, x2) {
      if (this.normalized) x2 = normalize(x2, this.array);
      this.array[index * this.itemSize] = x2;
      return this;
    }
    getY(index) {
      let y2 = this.array[index * this.itemSize + 1];
      if (this.normalized) y2 = denormalize(y2, this.array);
      return y2;
    }
    setY(index, y2) {
      if (this.normalized) y2 = normalize(y2, this.array);
      this.array[index * this.itemSize + 1] = y2;
      return this;
    }
    getZ(index) {
      let z = this.array[index * this.itemSize + 2];
      if (this.normalized) z = denormalize(z, this.array);
      return z;
    }
    setZ(index, z) {
      if (this.normalized) z = normalize(z, this.array);
      this.array[index * this.itemSize + 2] = z;
      return this;
    }
    getW(index) {
      let w2 = this.array[index * this.itemSize + 3];
      if (this.normalized) w2 = denormalize(w2, this.array);
      return w2;
    }
    setW(index, w2) {
      if (this.normalized) w2 = normalize(w2, this.array);
      this.array[index * this.itemSize + 3] = w2;
      return this;
    }
    setXY(index, x2, y2) {
      index *= this.itemSize;
      if (this.normalized) {
        x2 = normalize(x2, this.array);
        y2 = normalize(y2, this.array);
      }
      this.array[index + 0] = x2;
      this.array[index + 1] = y2;
      return this;
    }
    setXYZ(index, x2, y2, z) {
      index *= this.itemSize;
      if (this.normalized) {
        x2 = normalize(x2, this.array);
        y2 = normalize(y2, this.array);
        z = normalize(z, this.array);
      }
      this.array[index + 0] = x2;
      this.array[index + 1] = y2;
      this.array[index + 2] = z;
      return this;
    }
    setXYZW(index, x2, y2, z, w2) {
      index *= this.itemSize;
      if (this.normalized) {
        x2 = normalize(x2, this.array);
        y2 = normalize(y2, this.array);
        z = normalize(z, this.array);
        w2 = normalize(w2, this.array);
      }
      this.array[index + 0] = x2;
      this.array[index + 1] = y2;
      this.array[index + 2] = z;
      this.array[index + 3] = w2;
      return this;
    }
    onUpload(callback) {
      this.onUploadCallback = callback;
      return this;
    }
    clone() {
      return new this.constructor(this.array, this.itemSize).copy(this);
    }
    toJSON() {
      const data = {
        itemSize: this.itemSize,
        type: this.array.constructor.name,
        array: Array.from(this.array),
        normalized: this.normalized
      };
      if (this.name !== "") data.name = this.name;
      if (this.usage !== StaticDrawUsage) data.usage = this.usage;
      return data;
    }
  };
  var Uint16BufferAttribute = class extends BufferAttribute {
    constructor(array, itemSize, normalized) {
      super(new Uint16Array(array), itemSize, normalized);
    }
  };
  var Uint32BufferAttribute = class extends BufferAttribute {
    constructor(array, itemSize, normalized) {
      super(new Uint32Array(array), itemSize, normalized);
    }
  };
  var Float32BufferAttribute = class extends BufferAttribute {
    constructor(array, itemSize, normalized) {
      super(new Float32Array(array), itemSize, normalized);
    }
  };
  var _id$1 = 0;
  var _m1 = /* @__PURE__ */ new Matrix4();
  var _obj = /* @__PURE__ */ new Object3D();
  var _offset = /* @__PURE__ */ new Vector3();
  var _box$2 = /* @__PURE__ */ new Box3();
  var _boxMorphTargets = /* @__PURE__ */ new Box3();
  var _vector$8 = /* @__PURE__ */ new Vector3();
  var BufferGeometry = class _BufferGeometry extends EventDispatcher {
    constructor() {
      super();
      this.isBufferGeometry = true;
      Object.defineProperty(this, "id", { value: _id$1++ });
      this.uuid = generateUUID();
      this.name = "";
      this.type = "BufferGeometry";
      this.index = null;
      this.indirect = null;
      this.attributes = {};
      this.morphAttributes = {};
      this.morphTargetsRelative = false;
      this.groups = [];
      this.boundingBox = null;
      this.boundingSphere = null;
      this.drawRange = { start: 0, count: Infinity };
      this.userData = {};
    }
    getIndex() {
      return this.index;
    }
    setIndex(index) {
      if (Array.isArray(index)) {
        this.index = new (arrayNeedsUint32(index) ? Uint32BufferAttribute : Uint16BufferAttribute)(index, 1);
      } else {
        this.index = index;
      }
      return this;
    }
    setIndirect(indirect) {
      this.indirect = indirect;
      return this;
    }
    getIndirect() {
      return this.indirect;
    }
    getAttribute(name) {
      return this.attributes[name];
    }
    setAttribute(name, attribute) {
      this.attributes[name] = attribute;
      return this;
    }
    deleteAttribute(name) {
      delete this.attributes[name];
      return this;
    }
    hasAttribute(name) {
      return this.attributes[name] !== void 0;
    }
    addGroup(start, count, materialIndex = 0) {
      this.groups.push({
        start,
        count,
        materialIndex
      });
    }
    clearGroups() {
      this.groups = [];
    }
    setDrawRange(start, count) {
      this.drawRange.start = start;
      this.drawRange.count = count;
    }
    applyMatrix4(matrix) {
      const position = this.attributes.position;
      if (position !== void 0) {
        position.applyMatrix4(matrix);
        position.needsUpdate = true;
      }
      const normal = this.attributes.normal;
      if (normal !== void 0) {
        const normalMatrix = new Matrix3().getNormalMatrix(matrix);
        normal.applyNormalMatrix(normalMatrix);
        normal.needsUpdate = true;
      }
      const tangent = this.attributes.tangent;
      if (tangent !== void 0) {
        tangent.transformDirection(matrix);
        tangent.needsUpdate = true;
      }
      if (this.boundingBox !== null) {
        this.computeBoundingBox();
      }
      if (this.boundingSphere !== null) {
        this.computeBoundingSphere();
      }
      return this;
    }
    applyQuaternion(q2) {
      _m1.makeRotationFromQuaternion(q2);
      this.applyMatrix4(_m1);
      return this;
    }
    rotateX(angle) {
      _m1.makeRotationX(angle);
      this.applyMatrix4(_m1);
      return this;
    }
    rotateY(angle) {
      _m1.makeRotationY(angle);
      this.applyMatrix4(_m1);
      return this;
    }
    rotateZ(angle) {
      _m1.makeRotationZ(angle);
      this.applyMatrix4(_m1);
      return this;
    }
    translate(x2, y2, z) {
      _m1.makeTranslation(x2, y2, z);
      this.applyMatrix4(_m1);
      return this;
    }
    scale(x2, y2, z) {
      _m1.makeScale(x2, y2, z);
      this.applyMatrix4(_m1);
      return this;
    }
    lookAt(vector) {
      _obj.lookAt(vector);
      _obj.updateMatrix();
      this.applyMatrix4(_obj.matrix);
      return this;
    }
    center() {
      this.computeBoundingBox();
      this.boundingBox.getCenter(_offset).negate();
      this.translate(_offset.x, _offset.y, _offset.z);
      return this;
    }
    setFromPoints(points) {
      const positionAttribute = this.getAttribute("position");
      if (positionAttribute === void 0) {
        const position = [];
        for (let i2 = 0, l2 = points.length; i2 < l2; i2++) {
          const point = points[i2];
          position.push(point.x, point.y, point.z || 0);
        }
        this.setAttribute("position", new Float32BufferAttribute(position, 3));
      } else {
        const l2 = Math.min(points.length, positionAttribute.count);
        for (let i2 = 0; i2 < l2; i2++) {
          const point = points[i2];
          positionAttribute.setXYZ(i2, point.x, point.y, point.z || 0);
        }
        if (points.length > positionAttribute.count) {
          console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.");
        }
        positionAttribute.needsUpdate = true;
      }
      return this;
    }
    computeBoundingBox() {
      if (this.boundingBox === null) {
        this.boundingBox = new Box3();
      }
      const position = this.attributes.position;
      const morphAttributesPosition = this.morphAttributes.position;
      if (position && position.isGLBufferAttribute) {
        console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.", this);
        this.boundingBox.set(
          new Vector3(-Infinity, -Infinity, -Infinity),
          new Vector3(Infinity, Infinity, Infinity)
        );
        return;
      }
      if (position !== void 0) {
        this.boundingBox.setFromBufferAttribute(position);
        if (morphAttributesPosition) {
          for (let i2 = 0, il = morphAttributesPosition.length; i2 < il; i2++) {
            const morphAttribute = morphAttributesPosition[i2];
            _box$2.setFromBufferAttribute(morphAttribute);
            if (this.morphTargetsRelative) {
              _vector$8.addVectors(this.boundingBox.min, _box$2.min);
              this.boundingBox.expandByPoint(_vector$8);
              _vector$8.addVectors(this.boundingBox.max, _box$2.max);
              this.boundingBox.expandByPoint(_vector$8);
            } else {
              this.boundingBox.expandByPoint(_box$2.min);
              this.boundingBox.expandByPoint(_box$2.max);
            }
          }
        }
      } else {
        this.boundingBox.makeEmpty();
      }
      if (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) {
        console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this);
      }
    }
    computeBoundingSphere() {
      if (this.boundingSphere === null) {
        this.boundingSphere = new Sphere();
      }
      const position = this.attributes.position;
      const morphAttributesPosition = this.morphAttributes.position;
      if (position && position.isGLBufferAttribute) {
        console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.", this);
        this.boundingSphere.set(new Vector3(), Infinity);
        return;
      }
      if (position) {
        const center = this.boundingSphere.center;
        _box$2.setFromBufferAttribute(position);
        if (morphAttributesPosition) {
          for (let i2 = 0, il = morphAttributesPosition.length; i2 < il; i2++) {
            const morphAttribute = morphAttributesPosition[i2];
            _boxMorphTargets.setFromBufferAttribute(morphAttribute);
            if (this.morphTargetsRelative) {
              _vector$8.addVectors(_box$2.min, _boxMorphTargets.min);
              _box$2.expandByPoint(_vector$8);
              _vector$8.addVectors(_box$2.max, _boxMorphTargets.max);
              _box$2.expandByPoint(_vector$8);
            } else {
              _box$2.expandByPoint(_boxMorphTargets.min);
              _box$2.expandByPoint(_boxMorphTargets.max);
            }
          }
        }
        _box$2.getCenter(center);
        let maxRadiusSq = 0;
        for (let i2 = 0, il = position.count; i2 < il; i2++) {
          _vector$8.fromBufferAttribute(position, i2);
          maxRadiusSq = Math.max(maxRadiusSq, center.distanceToSquared(_vector$8));
        }
        if (morphAttributesPosition) {
          for (let i2 = 0, il = morphAttributesPosition.length; i2 < il; i2++) {
            const morphAttribute = morphAttributesPosition[i2];
            const morphTargetsRelative = this.morphTargetsRelative;
            for (let j2 = 0, jl = morphAttribute.count; j2 < jl; j2++) {
              _vector$8.fromBufferAttribute(morphAttribute, j2);
              if (morphTargetsRelative) {
                _offset.fromBufferAttribute(position, j2);
                _vector$8.add(_offset);
              }
              maxRadiusSq = Math.max(maxRadiusSq, center.distanceToSquared(_vector$8));
            }
          }
        }
        this.boundingSphere.radius = Math.sqrt(maxRadiusSq);
        if (isNaN(this.boundingSphere.radius)) {
          console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this);
        }
      }
    }
    computeTangents() {
      const index = this.index;
      const attributes = this.attributes;
      if (index === null || attributes.position === void 0 || attributes.normal === void 0 || attributes.uv === void 0) {
        console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");
        return;
      }
      const positionAttribute = attributes.position;
      const normalAttribute = attributes.normal;
      const uvAttribute = attributes.uv;
      if (this.hasAttribute("tangent") === false) {
        this.setAttribute("tangent", new BufferAttribute(new Float32Array(4 * positionAttribute.count), 4));
      }
      const tangentAttribute = this.getAttribute("tangent");
      const tan1 = [], tan2 = [];
      for (let i2 = 0; i2 < positionAttribute.count; i2++) {
        tan1[i2] = new Vector3();
        tan2[i2] = new Vector3();
      }
      const vA = new Vector3(), vB = new Vector3(), vC = new Vector3(), uvA = new Vector2(), uvB = new Vector2(), uvC = new Vector2(), sdir = new Vector3(), tdir = new Vector3();
      function handleTriangle(a2, b2, c2) {
        vA.fromBufferAttribute(positionAttribute, a2);
        vB.fromBufferAttribute(positionAttribute, b2);
        vC.fromBufferAttribute(positionAttribute, c2);
        uvA.fromBufferAttribute(uvAttribute, a2);
        uvB.fromBufferAttribute(uvAttribute, b2);
        uvC.fromBufferAttribute(uvAttribute, c2);
        vB.sub(vA);
        vC.sub(vA);
        uvB.sub(uvA);
        uvC.sub(uvA);
        const r2 = 1 / (uvB.x * uvC.y - uvC.x * uvB.y);
        if (!isFinite(r2)) return;
        sdir.copy(vB).multiplyScalar(uvC.y).addScaledVector(vC, -uvB.y).multiplyScalar(r2);
        tdir.copy(vC).multiplyScalar(uvB.x).addScaledVector(vB, -uvC.x).multiplyScalar(r2);
        tan1[a2].add(sdir);
        tan1[b2].add(sdir);
        tan1[c2].add(sdir);
        tan2[a2].add(tdir);
        tan2[b2].add(tdir);
        tan2[c2].add(tdir);
      }
      let groups = this.groups;
      if (groups.length === 0) {
        groups = [{
          start: 0,
          count: index.count
        }];
      }
      for (let i2 = 0, il = groups.length; i2 < il; ++i2) {
        const group = groups[i2];
        const start = group.start;
        const count = group.count;
        for (let j2 = start, jl = start + count; j2 < jl; j2 += 3) {
          handleTriangle(
            index.getX(j2 + 0),
            index.getX(j2 + 1),
            index.getX(j2 + 2)
          );
        }
      }
      const tmp = new Vector3(), tmp2 = new Vector3();
      const n2 = new Vector3(), n22 = new Vector3();
      function handleVertex(v) {
        n2.fromBufferAttribute(normalAttribute, v);
        n22.copy(n2);
        const t = tan1[v];
        tmp.copy(t);
        tmp.sub(n2.multiplyScalar(n2.dot(t))).normalize();
        tmp2.crossVectors(n22, t);
        const test = tmp2.dot(tan2[v]);
        const w2 = test < 0 ? -1 : 1;
        tangentAttribute.setXYZW(v, tmp.x, tmp.y, tmp.z, w2);
      }
      for (let i2 = 0, il = groups.length; i2 < il; ++i2) {
        const group = groups[i2];
        const start = group.start;
        const count = group.count;
        for (let j2 = start, jl = start + count; j2 < jl; j2 += 3) {
          handleVertex(index.getX(j2 + 0));
          handleVertex(index.getX(j2 + 1));
          handleVertex(index.getX(j2 + 2));
        }
      }
    }
    computeVertexNormals() {
      const index = this.index;
      const positionAttribute = this.getAttribute("position");
      if (positionAttribute !== void 0) {
        let normalAttribute = this.getAttribute("normal");
        if (normalAttribute === void 0) {
          normalAttribute = new BufferAttribute(new Float32Array(positionAttribute.count * 3), 3);
          this.setAttribute("normal", normalAttribute);
        } else {
          for (let i2 = 0, il = normalAttribute.count; i2 < il; i2++) {
            normalAttribute.setXYZ(i2, 0, 0, 0);
          }
        }
        const pA = new Vector3(), pB = new Vector3(), pC = new Vector3();
        const nA = new Vector3(), nB = new Vector3(), nC = new Vector3();
        const cb = new Vector3(), ab = new Vector3();
        if (index) {
          for (let i2 = 0, il = index.count; i2 < il; i2 += 3) {
            const vA = index.getX(i2 + 0);
            const vB = index.getX(i2 + 1);
            const vC = index.getX(i2 + 2);
            pA.fromBufferAttribute(positionAttribute, vA);
            pB.fromBufferAttribute(positionAttribute, vB);
            pC.fromBufferAttribute(positionAttribute, vC);
            cb.subVectors(pC, pB);
            ab.subVectors(pA, pB);
            cb.cross(ab);
            nA.fromBufferAttribute(normalAttribute, vA);
            nB.fromBufferAttribute(normalAttribute, vB);
            nC.fromBufferAttribute(normalAttribute, vC);
            nA.add(cb);
            nB.add(cb);
            nC.add(cb);
            normalAttribute.setXYZ(vA, nA.x, nA.y, nA.z);
            normalAttribute.setXYZ(vB, nB.x, nB.y, nB.z);
            normalAttribute.setXYZ(vC, nC.x, nC.y, nC.z);
          }
        } else {
          for (let i2 = 0, il = positionAttribute.count; i2 < il; i2 += 3) {
            pA.fromBufferAttribute(positionAttribute, i2 + 0);
            pB.fromBufferAttribute(positionAttribute, i2 + 1);
            pC.fromBufferAttribute(positionAttribute, i2 + 2);
            cb.subVectors(pC, pB);
            ab.subVectors(pA, pB);
            cb.cross(ab);
            normalAttribute.setXYZ(i2 + 0, cb.x, cb.y, cb.z);
            normalAttribute.setXYZ(i2 + 1, cb.x, cb.y, cb.z);
            normalAttribute.setXYZ(i2 + 2, cb.x, cb.y, cb.z);
          }
        }
        this.normalizeNormals();
        normalAttribute.needsUpdate = true;
      }
    }
    normalizeNormals() {
      const normals = this.attributes.normal;
      for (let i2 = 0, il = normals.count; i2 < il; i2++) {
        _vector$8.fromBufferAttribute(normals, i2);
        _vector$8.normalize();
        normals.setXYZ(i2, _vector$8.x, _vector$8.y, _vector$8.z);
      }
    }
    toNonIndexed() {
      function convertBufferAttribute(attribute, indices2) {
        const array = attribute.array;
        const itemSize = attribute.itemSize;
        const normalized = attribute.normalized;
        const array2 = new array.constructor(indices2.length * itemSize);
        let index = 0, index2 = 0;
        for (let i2 = 0, l2 = indices2.length; i2 < l2; i2++) {
          if (attribute.isInterleavedBufferAttribute) {
            index = indices2[i2] * attribute.data.stride + attribute.offset;
          } else {
            index = indices2[i2] * itemSize;
          }
          for (let j2 = 0; j2 < itemSize; j2++) {
            array2[index2++] = array[index++];
          }
        }
        return new BufferAttribute(array2, itemSize, normalized);
      }
      if (this.index === null) {
        console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.");
        return this;
      }
      const geometry2 = new _BufferGeometry();
      const indices = this.index.array;
      const attributes = this.attributes;
      for (const name in attributes) {
        const attribute = attributes[name];
        const newAttribute = convertBufferAttribute(attribute, indices);
        geometry2.setAttribute(name, newAttribute);
      }
      const morphAttributes = this.morphAttributes;
      for (const name in morphAttributes) {
        const morphArray = [];
        const morphAttribute = morphAttributes[name];
        for (let i2 = 0, il = morphAttribute.length; i2 < il; i2++) {
          const attribute = morphAttribute[i2];
          const newAttribute = convertBufferAttribute(attribute, indices);
          morphArray.push(newAttribute);
        }
        geometry2.morphAttributes[name] = morphArray;
      }
      geometry2.morphTargetsRelative = this.morphTargetsRelative;
      const groups = this.groups;
      for (let i2 = 0, l2 = groups.length; i2 < l2; i2++) {
        const group = groups[i2];
        geometry2.addGroup(group.start, group.count, group.materialIndex);
      }
      return geometry2;
    }
    toJSON() {
      const data = {
        metadata: {
          version: 4.6,
          type: "BufferGeometry",
          generator: "BufferGeometry.toJSON"
        }
      };
      data.uuid = this.uuid;
      data.type = this.type;
      if (this.name !== "") data.name = this.name;
      if (Object.keys(this.userData).length > 0) data.userData = this.userData;
      if (this.parameters !== void 0) {
        const parameters = this.parameters;
        for (const key in parameters) {
          if (parameters[key] !== void 0) data[key] = parameters[key];
        }
        return data;
      }
      data.data = { attributes: {} };
      const index = this.index;
      if (index !== null) {
        data.data.index = {
          type: index.array.constructor.name,
          array: Array.prototype.slice.call(index.array)
        };
      }
      const attributes = this.attributes;
      for (const key in attributes) {
        const attribute = attributes[key];
        data.data.attributes[key] = attribute.toJSON(data.data);
      }
      const morphAttributes = {};
      let hasMorphAttributes = false;
      for (const key in this.morphAttributes) {
        const attributeArray = this.morphAttributes[key];
        const array = [];
        for (let i2 = 0, il = attributeArray.length; i2 < il; i2++) {
          const attribute = attributeArray[i2];
          array.push(attribute.toJSON(data.data));
        }
        if (array.length > 0) {
          morphAttributes[key] = array;
          hasMorphAttributes = true;
        }
      }
      if (hasMorphAttributes) {
        data.data.morphAttributes = morphAttributes;
        data.data.morphTargetsRelative = this.morphTargetsRelative;
      }
      const groups = this.groups;
      if (groups.length > 0) {
        data.data.groups = JSON.parse(JSON.stringify(groups));
      }
      const boundingSphere = this.boundingSphere;
      if (boundingSphere !== null) {
        data.data.boundingSphere = {
          center: boundingSphere.center.toArray(),
          radius: boundingSphere.radius
        };
      }
      return data;
    }
    clone() {
      return new this.constructor().copy(this);
    }
    copy(source) {
      this.index = null;
      this.attributes = {};
      this.morphAttributes = {};
      this.groups = [];
      this.boundingBox = null;
      this.boundingSphere = null;
      const data = {};
      this.name = source.name;
      const index = source.index;
      if (index !== null) {
        this.setIndex(index.clone(data));
      }
      const attributes = source.attributes;
      for (const name in attributes) {
        const attribute = attributes[name];
        this.setAttribute(name, attribute.clone(data));
      }
      const morphAttributes = source.morphAttributes;
      for (const name in morphAttributes) {
        const array = [];
        const morphAttribute = morphAttributes[name];
        for (let i2 = 0, l2 = morphAttribute.length; i2 < l2; i2++) {
          array.push(morphAttribute[i2].clone(data));
        }
        this.morphAttributes[name] = array;
      }
      this.morphTargetsRelative = source.morphTargetsRelative;
      const groups = source.groups;
      for (let i2 = 0, l2 = groups.length; i2 < l2; i2++) {
        const group = groups[i2];
        this.addGroup(group.start, group.count, group.materialIndex);
      }
      const boundingBox = source.boundingBox;
      if (boundingBox !== null) {
        this.boundingBox = boundingBox.clone();
      }
      const boundingSphere = source.boundingSphere;
      if (boundingSphere !== null) {
        this.boundingSphere = boundingSphere.clone();
      }
      this.drawRange.start = source.drawRange.start;
      this.drawRange.count = source.drawRange.count;
      this.userData = source.userData;
      return this;
    }
    dispose() {
      this.dispatchEvent({ type: "dispose" });
    }
  };
  var _inverseMatrix$3 = /* @__PURE__ */ new Matrix4();
  var _ray$3 = /* @__PURE__ */ new Ray();
  var _sphere$6 = /* @__PURE__ */ new Sphere();
  var _sphereHitAt = /* @__PURE__ */ new Vector3();
  var _vA$1 = /* @__PURE__ */ new Vector3();
  var _vB$1 = /* @__PURE__ */ new Vector3();
  var _vC$1 = /* @__PURE__ */ new Vector3();
  var _tempA = /* @__PURE__ */ new Vector3();
  var _morphA = /* @__PURE__ */ new Vector3();
  var _intersectionPoint = /* @__PURE__ */ new Vector3();
  var _intersectionPointWorld = /* @__PURE__ */ new Vector3();
  var Mesh = class extends Object3D {
    constructor(geometry2 = new BufferGeometry(), material2 = new MeshBasicMaterial()) {
      super();
      this.isMesh = true;
      this.type = "Mesh";
      this.geometry = geometry2;
      this.material = material2;
      this.updateMorphTargets();
    }
    copy(source, recursive) {
      super.copy(source, recursive);
      if (source.morphTargetInfluences !== void 0) {
        this.morphTargetInfluences = source.morphTargetInfluences.slice();
      }
      if (source.morphTargetDictionary !== void 0) {
        this.morphTargetDictionary = Object.assign({}, source.morphTargetDictionary);
      }
      this.material = Array.isArray(source.material) ? source.material.slice() : source.material;
      this.geometry = source.geometry;
      return this;
    }
    updateMorphTargets() {
      const geometry2 = this.geometry;
      const morphAttributes = geometry2.morphAttributes;
      const keys = Object.keys(morphAttributes);
      if (keys.length > 0) {
        const morphAttribute = morphAttributes[keys[0]];
        if (morphAttribute !== void 0) {
          this.morphTargetInfluences = [];
          this.morphTargetDictionary = {};
          for (let m2 = 0, ml = morphAttribute.length; m2 < ml; m2++) {
            const name = morphAttribute[m2].name || String(m2);
            this.morphTargetInfluences.push(0);
            this.morphTargetDictionary[name] = m2;
          }
        }
      }
    }
    getVertexPosition(index, target) {
      const geometry2 = this.geometry;
      const position = geometry2.attributes.position;
      const morphPosition = geometry2.morphAttributes.position;
      const morphTargetsRelative = geometry2.morphTargetsRelative;
      target.fromBufferAttribute(position, index);
      const morphInfluences = this.morphTargetInfluences;
      if (morphPosition && morphInfluences) {
        _morphA.set(0, 0, 0);
        for (let i2 = 0, il = morphPosition.length; i2 < il; i2++) {
          const influence = morphInfluences[i2];
          const morphAttribute = morphPosition[i2];
          if (influence === 0) continue;
          _tempA.fromBufferAttribute(morphAttribute, index);
          if (morphTargetsRelative) {
            _morphA.addScaledVector(_tempA, influence);
          } else {
            _morphA.addScaledVector(_tempA.sub(target), influence);
          }
        }
        target.add(_morphA);
      }
      return target;
    }
    raycast(raycaster, intersects) {
      const geometry2 = this.geometry;
      const material2 = this.material;
      const matrixWorld = this.matrixWorld;
      if (material2 === void 0) return;
      if (geometry2.boundingSphere === null) geometry2.computeBoundingSphere();
      _sphere$6.copy(geometry2.boundingSphere);
      _sphere$6.applyMatrix4(matrixWorld);
      _ray$3.copy(raycaster.ray).recast(raycaster.near);
      if (_sphere$6.containsPoint(_ray$3.origin) === false) {
        if (_ray$3.intersectSphere(_sphere$6, _sphereHitAt) === null) return;
        if (_ray$3.origin.distanceToSquared(_sphereHitAt) > (raycaster.far - raycaster.near) ** 2) return;
      }
      _inverseMatrix$3.copy(matrixWorld).invert();
      _ray$3.copy(raycaster.ray).applyMatrix4(_inverseMatrix$3);
      if (geometry2.boundingBox !== null) {
        if (_ray$3.intersectsBox(geometry2.boundingBox) === false) return;
      }
      this._computeIntersections(raycaster, intersects, _ray$3);
    }
    _computeIntersections(raycaster, intersects, rayLocalSpace) {
      let intersection;
      const geometry2 = this.geometry;
      const material2 = this.material;
      const index = geometry2.index;
      const position = geometry2.attributes.position;
      const uv = geometry2.attributes.uv;
      const uv1 = geometry2.attributes.uv1;
      const normal = geometry2.attributes.normal;
      const groups = geometry2.groups;
      const drawRange = geometry2.drawRange;
      if (index !== null) {
        if (Array.isArray(material2)) {
          for (let i2 = 0, il = groups.length; i2 < il; i2++) {
            const group = groups[i2];
            const groupMaterial = material2[group.materialIndex];
            const start = Math.max(group.start, drawRange.start);
            const end = Math.min(index.count, Math.min(group.start + group.count, drawRange.start + drawRange.count));
            for (let j2 = start, jl = end; j2 < jl; j2 += 3) {
              const a2 = index.getX(j2);
              const b2 = index.getX(j2 + 1);
              const c2 = index.getX(j2 + 2);
              intersection = checkGeometryIntersection(this, groupMaterial, raycaster, rayLocalSpace, uv, uv1, normal, a2, b2, c2);
              if (intersection) {
                intersection.faceIndex = Math.floor(j2 / 3);
                intersection.face.materialIndex = group.materialIndex;
                intersects.push(intersection);
              }
            }
          }
        } else {
          const start = Math.max(0, drawRange.start);
          const end = Math.min(index.count, drawRange.start + drawRange.count);
          for (let i2 = start, il = end; i2 < il; i2 += 3) {
            const a2 = index.getX(i2);
            const b2 = index.getX(i2 + 1);
            const c2 = index.getX(i2 + 2);
            intersection = checkGeometryIntersection(this, material2, raycaster, rayLocalSpace, uv, uv1, normal, a2, b2, c2);
            if (intersection) {
              intersection.faceIndex = Math.floor(i2 / 3);
              intersects.push(intersection);
            }
          }
        }
      } else if (position !== void 0) {
        if (Array.isArray(material2)) {
          for (let i2 = 0, il = groups.length; i2 < il; i2++) {
            const group = groups[i2];
            const groupMaterial = material2[group.materialIndex];
            const start = Math.max(group.start, drawRange.start);
            const end = Math.min(position.count, Math.min(group.start + group.count, drawRange.start + drawRange.count));
            for (let j2 = start, jl = end; j2 < jl; j2 += 3) {
              const a2 = j2;
              const b2 = j2 + 1;
              const c2 = j2 + 2;
              intersection = checkGeometryIntersection(this, groupMaterial, raycaster, rayLocalSpace, uv, uv1, normal, a2, b2, c2);
              if (intersection) {
                intersection.faceIndex = Math.floor(j2 / 3);
                intersection.face.materialIndex = group.materialIndex;
                intersects.push(intersection);
              }
            }
          }
        } else {
          const start = Math.max(0, drawRange.start);
          const end = Math.min(position.count, drawRange.start + drawRange.count);
          for (let i2 = start, il = end; i2 < il; i2 += 3) {
            const a2 = i2;
            const b2 = i2 + 1;
            const c2 = i2 + 2;
            intersection = checkGeometryIntersection(this, material2, raycaster, rayLocalSpace, uv, uv1, normal, a2, b2, c2);
            if (intersection) {
              intersection.faceIndex = Math.floor(i2 / 3);
              intersects.push(intersection);
            }
          }
        }
      }
    }
  };
  function checkIntersection$1(object, material2, raycaster, ray, pA, pB, pC, point) {
    let intersect;
    if (material2.side === BackSide) {
      intersect = ray.intersectTriangle(pC, pB, pA, true, point);
    } else {
      intersect = ray.intersectTriangle(pA, pB, pC, material2.side === FrontSide, point);
    }
    if (intersect === null) return null;
    _intersectionPointWorld.copy(point);
    _intersectionPointWorld.applyMatrix4(object.matrixWorld);
    const distance = raycaster.ray.origin.distanceTo(_intersectionPointWorld);
    if (distance < raycaster.near || distance > raycaster.far) return null;
    return {
      distance,
      point: _intersectionPointWorld.clone(),
      object
    };
  }
  function checkGeometryIntersection(object, material2, raycaster, ray, uv, uv1, normal, a2, b2, c2) {
    object.getVertexPosition(a2, _vA$1);
    object.getVertexPosition(b2, _vB$1);
    object.getVertexPosition(c2, _vC$1);
    const intersection = checkIntersection$1(object, material2, raycaster, ray, _vA$1, _vB$1, _vC$1, _intersectionPoint);
    if (intersection) {
      const barycoord = new Vector3();
      Triangle.getBarycoord(_intersectionPoint, _vA$1, _vB$1, _vC$1, barycoord);
      if (uv) {
        intersection.uv = Triangle.getInterpolatedAttribute(uv, a2, b2, c2, barycoord, new Vector2());
      }
      if (uv1) {
        intersection.uv1 = Triangle.getInterpolatedAttribute(uv1, a2, b2, c2, barycoord, new Vector2());
      }
      if (normal) {
        intersection.normal = Triangle.getInterpolatedAttribute(normal, a2, b2, c2, barycoord, new Vector3());
        if (intersection.normal.dot(ray.direction) > 0) {
          intersection.normal.multiplyScalar(-1);
        }
      }
      const face = {
        a: a2,
        b: b2,
        c: c2,
        normal: new Vector3(),
        materialIndex: 0
      };
      Triangle.getNormal(_vA$1, _vB$1, _vC$1, face.normal);
      intersection.face = face;
      intersection.barycoord = barycoord;
    }
    return intersection;
  }
  var BoxGeometry = class _BoxGeometry extends BufferGeometry {
    constructor(width = 1, height = 1, depth = 1, widthSegments = 1, heightSegments = 1, depthSegments = 1) {
      super();
      this.type = "BoxGeometry";
      this.parameters = {
        width,
        height,
        depth,
        widthSegments,
        heightSegments,
        depthSegments
      };
      const scope = this;
      widthSegments = Math.floor(widthSegments);
      heightSegments = Math.floor(heightSegments);
      depthSegments = Math.floor(depthSegments);
      const indices = [];
      const vertices = [];
      const normals = [];
      const uvs = [];
      let numberOfVertices = 0;
      let groupStart = 0;
      buildPlane("z", "y", "x", -1, -1, depth, height, width, depthSegments, heightSegments, 0);
      buildPlane("z", "y", "x", 1, -1, depth, height, -width, depthSegments, heightSegments, 1);
      buildPlane("x", "z", "y", 1, 1, width, depth, height, widthSegments, depthSegments, 2);
      buildPlane("x", "z", "y", 1, -1, width, depth, -height, widthSegments, depthSegments, 3);
      buildPlane("x", "y", "z", 1, -1, width, height, depth, widthSegments, heightSegments, 4);
      buildPlane("x", "y", "z", -1, -1, width, height, -depth, widthSegments, heightSegments, 5);
      this.setIndex(indices);
      this.setAttribute("position", new Float32BufferAttribute(vertices, 3));
      this.setAttribute("normal", new Float32BufferAttribute(normals, 3));
      this.setAttribute("uv", new Float32BufferAttribute(uvs, 2));
      function buildPlane(u2, v, w2, udir, vdir, width2, height2, depth2, gridX, gridY, materialIndex) {
        const segmentWidth = width2 / gridX;
        const segmentHeight = height2 / gridY;
        const widthHalf = width2 / 2;
        const heightHalf = height2 / 2;
        const depthHalf = depth2 / 2;
        const gridX1 = gridX + 1;
        const gridY1 = gridY + 1;
        let vertexCounter = 0;
        let groupCount = 0;
        const vector = new Vector3();
        for (let iy = 0; iy < gridY1; iy++) {
          const y2 = iy * segmentHeight - heightHalf;
          for (let ix = 0; ix < gridX1; ix++) {
            const x2 = ix * segmentWidth - widthHalf;
            vector[u2] = x2 * udir;
            vector[v] = y2 * vdir;
            vector[w2] = depthHalf;
            vertices.push(vector.x, vector.y, vector.z);
            vector[u2] = 0;
            vector[v] = 0;
            vector[w2] = depth2 > 0 ? 1 : -1;
            normals.push(vector.x, vector.y, vector.z);
            uvs.push(ix / gridX);
            uvs.push(1 - iy / gridY);
            vertexCounter += 1;
          }
        }
        for (let iy = 0; iy < gridY; iy++) {
          for (let ix = 0; ix < gridX; ix++) {
            const a2 = numberOfVertices + ix + gridX1 * iy;
            const b2 = numberOfVertices + ix + gridX1 * (iy + 1);
            const c2 = numberOfVertices + (ix + 1) + gridX1 * (iy + 1);
            const d2 = numberOfVertices + (ix + 1) + gridX1 * iy;
            indices.push(a2, b2, d2);
            indices.push(b2, c2, d2);
            groupCount += 6;
          }
        }
        scope.addGroup(groupStart, groupCount, materialIndex);
        groupStart += groupCount;
        numberOfVertices += vertexCounter;
      }
    }
    copy(source) {
      super.copy(source);
      this.parameters = Object.assign({}, source.parameters);
      return this;
    }
    static fromJSON(data) {
      return new _BoxGeometry(data.width, data.height, data.depth, data.widthSegments, data.heightSegments, data.depthSegments);
    }
  };
  function cloneUniforms(src) {
    const dst = {};
    for (const u2 in src) {
      dst[u2] = {};
      for (const p2 in src[u2]) {
        const property = src[u2][p2];
        if (property && (property.isColor || property.isMatrix3 || property.isMatrix4 || property.isVector2 || property.isVector3 || property.isVector4 || property.isTexture || property.isQuaternion)) {
          if (property.isRenderTargetTexture) {
            console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().");
            dst[u2][p2] = null;
          } else {
            dst[u2][p2] = property.clone();
          }
        } else if (Array.isArray(property)) {
          dst[u2][p2] = property.slice();
        } else {
          dst[u2][p2] = property;
        }
      }
    }
    return dst;
  }
  function mergeUniforms(uniforms) {
    const merged = {};
    for (let u2 = 0; u2 < uniforms.length; u2++) {
      const tmp = cloneUniforms(uniforms[u2]);
      for (const p2 in tmp) {
        merged[p2] = tmp[p2];
      }
    }
    return merged;
  }
  function cloneUniformsGroups(src) {
    const dst = [];
    for (let u2 = 0; u2 < src.length; u2++) {
      dst.push(src[u2].clone());
    }
    return dst;
  }
  function getUnlitUniformColorSpace(renderer2) {
    const currentRenderTarget = renderer2.getRenderTarget();
    if (currentRenderTarget === null) {
      return renderer2.outputColorSpace;
    }
    if (currentRenderTarget.isXRRenderTarget === true) {
      return currentRenderTarget.texture.colorSpace;
    }
    return ColorManagement.workingColorSpace;
  }
  var UniformsUtils = { clone: cloneUniforms, merge: mergeUniforms };
  var default_vertex = "void main() {\n	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}";
  var default_fragment = "void main() {\n	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );\n}";
  var ShaderMaterial = class extends Material {
    constructor(parameters) {
      super();
      this.isShaderMaterial = true;
      this.type = "ShaderMaterial";
      this.defines = {};
      this.uniforms = {};
      this.uniformsGroups = [];
      this.vertexShader = default_vertex;
      this.fragmentShader = default_fragment;
      this.linewidth = 1;
      this.wireframe = false;
      this.wireframeLinewidth = 1;
      this.fog = false;
      this.lights = false;
      this.clipping = false;
      this.forceSinglePass = true;
      this.extensions = {
        clipCullDistance: false,
        // set to use vertex shader clipping
        multiDraw: false
        // set to use vertex shader multi_draw / enable gl_DrawID
      };
      this.defaultAttributeValues = {
        "color": [1, 1, 1],
        "uv": [0, 0],
        "uv1": [0, 0]
      };
      this.index0AttributeName = void 0;
      this.uniformsNeedUpdate = false;
      this.glslVersion = null;
      if (parameters !== void 0) {
        this.setValues(parameters);
      }
    }
    copy(source) {
      super.copy(source);
      this.fragmentShader = source.fragmentShader;
      this.vertexShader = source.vertexShader;
      this.uniforms = cloneUniforms(source.uniforms);
      this.uniformsGroups = cloneUniformsGroups(source.uniformsGroups);
      this.defines = Object.assign({}, source.defines);
      this.wireframe = source.wireframe;
      this.wireframeLinewidth = source.wireframeLinewidth;
      this.fog = source.fog;
      this.lights = source.lights;
      this.clipping = source.clipping;
      this.extensions = Object.assign({}, source.extensions);
      this.glslVersion = source.glslVersion;
      return this;
    }
    toJSON(meta) {
      const data = super.toJSON(meta);
      data.glslVersion = this.glslVersion;
      data.uniforms = {};
      for (const name in this.uniforms) {
        const uniform = this.uniforms[name];
        const value = uniform.value;
        if (value && value.isTexture) {
          data.uniforms[name] = {
            type: "t",
            value: value.toJSON(meta).uuid
          };
        } else if (value && value.isColor) {
          data.uniforms[name] = {
            type: "c",
            value: value.getHex()
          };
        } else if (value && value.isVector2) {
          data.uniforms[name] = {
            type: "v2",
            value: value.toArray()
          };
        } else if (value && value.isVector3) {
          data.uniforms[name] = {
            type: "v3",
            value: value.toArray()
          };
        } else if (value && value.isVector4) {
          data.uniforms[name] = {
            type: "v4",
            value: value.toArray()
          };
        } else if (value && value.isMatrix3) {
          data.uniforms[name] = {
            type: "m3",
            value: value.toArray()
          };
        } else if (value && value.isMatrix4) {
          data.uniforms[name] = {
            type: "m4",
            value: value.toArray()
          };
        } else {
          data.uniforms[name] = {
            value
          };
        }
      }
      if (Object.keys(this.defines).length > 0) data.defines = this.defines;
      data.vertexShader = this.vertexShader;
      data.fragmentShader = this.fragmentShader;
      data.lights = this.lights;
      data.clipping = this.clipping;
      const extensions = {};
      for (const key in this.extensions) {
        if (this.extensions[key] === true) extensions[key] = true;
      }
      if (Object.keys(extensions).length > 0) data.extensions = extensions;
      return data;
    }
  };
  var Camera = class extends Object3D {
    constructor() {
      super();
      this.isCamera = true;
      this.type = "Camera";
      this.matrixWorldInverse = new Matrix4();
      this.projectionMatrix = new Matrix4();
      this.projectionMatrixInverse = new Matrix4();
      this.coordinateSystem = WebGLCoordinateSystem;
    }
    copy(source, recursive) {
      super.copy(source, recursive);
      this.matrixWorldInverse.copy(source.matrixWorldInverse);
      this.projectionMatrix.copy(source.projectionMatrix);
      this.projectionMatrixInverse.copy(source.projectionMatrixInverse);
      this.coordinateSystem = source.coordinateSystem;
      return this;
    }
    getWorldDirection(target) {
      return super.getWorldDirection(target).negate();
    }
    updateMatrixWorld(force) {
      super.updateMatrixWorld(force);
      this.matrixWorldInverse.copy(this.matrixWorld).invert();
    }
    updateWorldMatrix(updateParents, updateChildren) {
      super.updateWorldMatrix(updateParents, updateChildren);
      this.matrixWorldInverse.copy(this.matrixWorld).invert();
    }
    clone() {
      return new this.constructor().copy(this);
    }
  };
  var _v3$1 = /* @__PURE__ */ new Vector3();
  var _minTarget = /* @__PURE__ */ new Vector2();
  var _maxTarget = /* @__PURE__ */ new Vector2();
  var PerspectiveCamera = class extends Camera {
    constructor(fov2 = 50, aspect2 = 1, near = 0.1, far = 2e3) {
      super();
      this.isPerspectiveCamera = true;
      this.type = "PerspectiveCamera";
      this.fov = fov2;
      this.zoom = 1;
      this.near = near;
      this.far = far;
      this.focus = 10;
      this.aspect = aspect2;
      this.view = null;
      this.filmGauge = 35;
      this.filmOffset = 0;
      this.updateProjectionMatrix();
    }
    copy(source, recursive) {
      super.copy(source, recursive);
      this.fov = source.fov;
      this.zoom = source.zoom;
      this.near = source.near;
      this.far = source.far;
      this.focus = source.focus;
      this.aspect = source.aspect;
      this.view = source.view === null ? null : Object.assign({}, source.view);
      this.filmGauge = source.filmGauge;
      this.filmOffset = source.filmOffset;
      return this;
    }
    /**
     * Sets the FOV by focal length in respect to the current .filmGauge.
     *
     * The default film gauge is 35, so that the focal length can be specified for
     * a 35mm (full frame) camera.
     *
     * Values for focal length and film gauge must have the same unit.
     */
    setFocalLength(focalLength) {
      const vExtentSlope = 0.5 * this.getFilmHeight() / focalLength;
      this.fov = RAD2DEG * 2 * Math.atan(vExtentSlope);
      this.updateProjectionMatrix();
    }
    /**
     * Calculates the focal length from the current .fov and .filmGauge.
     */
    getFocalLength() {
      const vExtentSlope = Math.tan(DEG2RAD * 0.5 * this.fov);
      return 0.5 * this.getFilmHeight() / vExtentSlope;
    }
    getEffectiveFOV() {
      return RAD2DEG * 2 * Math.atan(
        Math.tan(DEG2RAD * 0.5 * this.fov) / this.zoom
      );
    }
    getFilmWidth() {
      return this.filmGauge * Math.min(this.aspect, 1);
    }
    getFilmHeight() {
      return this.filmGauge / Math.max(this.aspect, 1);
    }
    /**
     * Computes the 2D bounds of the camera's viewable rectangle at a given distance along the viewing direction.
     * Sets minTarget and maxTarget to the coordinates of the lower-left and upper-right corners of the view rectangle.
     */
    getViewBounds(distance, minTarget, maxTarget) {
      _v3$1.set(-1, -1, 0.5).applyMatrix4(this.projectionMatrixInverse);
      minTarget.set(_v3$1.x, _v3$1.y).multiplyScalar(-distance / _v3$1.z);
      _v3$1.set(1, 1, 0.5).applyMatrix4(this.projectionMatrixInverse);
      maxTarget.set(_v3$1.x, _v3$1.y).multiplyScalar(-distance / _v3$1.z);
    }
    /**
     * Computes the width and height of the camera's viewable rectangle at a given distance along the viewing direction.
     * Copies the result into the target Vector2, where x is width and y is height.
     */
    getViewSize(distance, target) {
      this.getViewBounds(distance, _minTarget, _maxTarget);
      return target.subVectors(_maxTarget, _minTarget);
    }
    /**
     * Sets an offset in a larger frustum. This is useful for multi-window or
     * multi-monitor/multi-machine setups.
     *
     * For example, if you have 3x2 monitors and each monitor is 1920x1080 and
     * the monitors are in grid like this
     *
     *   +---+---+---+
     *   | A | B | C |
     *   +---+---+---+
     *   | D | E | F |
     *   +---+---+---+
     *
     * then for each monitor you would call it like this
     *
     *   const w = 1920;
     *   const h = 1080;
     *   const fullWidth = w * 3;
     *   const fullHeight = h * 2;
     *
     *   --A--
     *   camera.setViewOffset( fullWidth, fullHeight, w * 0, h * 0, w, h );
     *   --B--
     *   camera.setViewOffset( fullWidth, fullHeight, w * 1, h * 0, w, h );
     *   --C--
     *   camera.setViewOffset( fullWidth, fullHeight, w * 2, h * 0, w, h );
     *   --D--
     *   camera.setViewOffset( fullWidth, fullHeight, w * 0, h * 1, w, h );
     *   --E--
     *   camera.setViewOffset( fullWidth, fullHeight, w * 1, h * 1, w, h );
     *   --F--
     *   camera.setViewOffset( fullWidth, fullHeight, w * 2, h * 1, w, h );
     *
     *   Note there is no reason monitors have to be the same size or in a grid.
     */
    setViewOffset(fullWidth, fullHeight, x2, y2, width, height) {
      this.aspect = fullWidth / fullHeight;
      if (this.view === null) {
        this.view = {
          enabled: true,
          fullWidth: 1,
          fullHeight: 1,
          offsetX: 0,
          offsetY: 0,
          width: 1,
          height: 1
        };
      }
      this.view.enabled = true;
      this.view.fullWidth = fullWidth;
      this.view.fullHeight = fullHeight;
      this.view.offsetX = x2;
      this.view.offsetY = y2;
      this.view.width = width;
      this.view.height = height;
      this.updateProjectionMatrix();
    }
    clearViewOffset() {
      if (this.view !== null) {
        this.view.enabled = false;
      }
      this.updateProjectionMatrix();
    }
    updateProjectionMatrix() {
      const near = this.near;
      let top = near * Math.tan(DEG2RAD * 0.5 * this.fov) / this.zoom;
      let height = 2 * top;
      let width = this.aspect * height;
      let left = -0.5 * width;
      const view = this.view;
      if (this.view !== null && this.view.enabled) {
        const fullWidth = view.fullWidth, fullHeight = view.fullHeight;
        left += view.offsetX * width / fullWidth;
        top -= view.offsetY * height / fullHeight;
        width *= view.width / fullWidth;
        height *= view.height / fullHeight;
      }
      const skew = this.filmOffset;
      if (skew !== 0) left += near * skew / this.getFilmWidth();
      this.projectionMatrix.makePerspective(left, left + width, top, top - height, near, this.far, this.coordinateSystem);
      this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
    }
    toJSON(meta) {
      const data = super.toJSON(meta);
      data.object.fov = this.fov;
      data.object.zoom = this.zoom;
      data.object.near = this.near;
      data.object.far = this.far;
      data.object.focus = this.focus;
      data.object.aspect = this.aspect;
      if (this.view !== null) data.object.view = Object.assign({}, this.view);
      data.object.filmGauge = this.filmGauge;
      data.object.filmOffset = this.filmOffset;
      return data;
    }
  };
  var fov = -90;
  var aspect = 1;
  var CubeCamera = class extends Object3D {
    constructor(near, far, renderTarget) {
      super();
      this.type = "CubeCamera";
      this.renderTarget = renderTarget;
      this.coordinateSystem = null;
      this.activeMipmapLevel = 0;
      const cameraPX = new PerspectiveCamera(fov, aspect, near, far);
      cameraPX.layers = this.layers;
      this.add(cameraPX);
      const cameraNX = new PerspectiveCamera(fov, aspect, near, far);
      cameraNX.layers = this.layers;
      this.add(cameraNX);
      const cameraPY = new PerspectiveCamera(fov, aspect, near, far);
      cameraPY.layers = this.layers;
      this.add(cameraPY);
      const cameraNY = new PerspectiveCamera(fov, aspect, near, far);
      cameraNY.layers = this.layers;
      this.add(cameraNY);
      const cameraPZ = new PerspectiveCamera(fov, aspect, near, far);
      cameraPZ.layers = this.layers;
      this.add(cameraPZ);
      const cameraNZ = new PerspectiveCamera(fov, aspect, near, far);
      cameraNZ.layers = this.layers;
      this.add(cameraNZ);
    }
    updateCoordinateSystem() {
      const coordinateSystem = this.coordinateSystem;
      const cameras = this.children.concat();
      const [cameraPX, cameraNX, cameraPY, cameraNY, cameraPZ, cameraNZ] = cameras;
      for (const camera2 of cameras) this.remove(camera2);
      if (coordinateSystem === WebGLCoordinateSystem) {
        cameraPX.up.set(0, 1, 0);
        cameraPX.lookAt(1, 0, 0);
        cameraNX.up.set(0, 1, 0);
        cameraNX.lookAt(-1, 0, 0);
        cameraPY.up.set(0, 0, -1);
        cameraPY.lookAt(0, 1, 0);
        cameraNY.up.set(0, 0, 1);
        cameraNY.lookAt(0, -1, 0);
        cameraPZ.up.set(0, 1, 0);
        cameraPZ.lookAt(0, 0, 1);
        cameraNZ.up.set(0, 1, 0);
        cameraNZ.lookAt(0, 0, -1);
      } else if (coordinateSystem === WebGPUCoordinateSystem) {
        cameraPX.up.set(0, -1, 0);
        cameraPX.lookAt(-1, 0, 0);
        cameraNX.up.set(0, -1, 0);
        cameraNX.lookAt(1, 0, 0);
        cameraPY.up.set(0, 0, 1);
        cameraPY.lookAt(0, 1, 0);
        cameraNY.up.set(0, 0, -1);
        cameraNY.lookAt(0, -1, 0);
        cameraPZ.up.set(0, -1, 0);
        cameraPZ.lookAt(0, 0, 1);
        cameraNZ.up.set(0, -1, 0);
        cameraNZ.lookAt(0, 0, -1);
      } else {
        throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: " + coordinateSystem);
      }
      for (const camera2 of cameras) {
        this.add(camera2);
        camera2.updateMatrixWorld();
      }
    }
    update(renderer2, scene2) {
      if (this.parent === null) this.updateMatrixWorld();
      const { renderTarget, activeMipmapLevel } = this;
      if (this.coordinateSystem !== renderer2.coordinateSystem) {
        this.coordinateSystem = renderer2.coordinateSystem;
        this.updateCoordinateSystem();
      }
      const [cameraPX, cameraNX, cameraPY, cameraNY, cameraPZ, cameraNZ] = this.children;
      const currentRenderTarget = renderer2.getRenderTarget();
      const currentActiveCubeFace = renderer2.getActiveCubeFace();
      const currentActiveMipmapLevel = renderer2.getActiveMipmapLevel();
      const currentXrEnabled = renderer2.xr.enabled;
      renderer2.xr.enabled = false;
      const generateMipmaps = renderTarget.texture.generateMipmaps;
      renderTarget.texture.generateMipmaps = false;
      renderer2.setRenderTarget(renderTarget, 0, activeMipmapLevel);
      renderer2.render(scene2, cameraPX);
      renderer2.setRenderTarget(renderTarget, 1, activeMipmapLevel);
      renderer2.render(scene2, cameraNX);
      renderer2.setRenderTarget(renderTarget, 2, activeMipmapLevel);
      renderer2.render(scene2, cameraPY);
      renderer2.setRenderTarget(renderTarget, 3, activeMipmapLevel);
      renderer2.render(scene2, cameraNY);
      renderer2.setRenderTarget(renderTarget, 4, activeMipmapLevel);
      renderer2.render(scene2, cameraPZ);
      renderTarget.texture.generateMipmaps = generateMipmaps;
      renderer2.setRenderTarget(renderTarget, 5, activeMipmapLevel);
      renderer2.render(scene2, cameraNZ);
      renderer2.setRenderTarget(currentRenderTarget, currentActiveCubeFace, currentActiveMipmapLevel);
      renderer2.xr.enabled = currentXrEnabled;
      renderTarget.texture.needsPMREMUpdate = true;
    }
  };
  var CubeTexture = class extends Texture {
    constructor(images, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, colorSpace) {
      images = images !== void 0 ? images : [];
      mapping = mapping !== void 0 ? mapping : CubeReflectionMapping;
      super(images, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, colorSpace);
      this.isCubeTexture = true;
      this.flipY = false;
    }
    get images() {
      return this.image;
    }
    set images(value) {
      this.image = value;
    }
  };
  var WebGLCubeRenderTarget = class extends WebGLRenderTarget {
    constructor(size = 1, options = {}) {
      super(size, size, options);
      this.isWebGLCubeRenderTarget = true;
      const image = { width: size, height: size, depth: 1 };
      const images = [image, image, image, image, image, image];
      this.texture = new CubeTexture(images, options.mapping, options.wrapS, options.wrapT, options.magFilter, options.minFilter, options.format, options.type, options.anisotropy, options.colorSpace);
      this.texture.isRenderTargetTexture = true;
      this.texture.generateMipmaps = options.generateMipmaps !== void 0 ? options.generateMipmaps : false;
      this.texture.minFilter = options.minFilter !== void 0 ? options.minFilter : LinearFilter;
    }
    fromEquirectangularTexture(renderer2, texture) {
      this.texture.type = texture.type;
      this.texture.colorSpace = texture.colorSpace;
      this.texture.generateMipmaps = texture.generateMipmaps;
      this.texture.minFilter = texture.minFilter;
      this.texture.magFilter = texture.magFilter;
      const shader = {
        uniforms: {
          tEquirect: { value: null }
        },
        vertexShader: (
          /* glsl */
          `

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`
        ),
        fragmentShader: (
          /* glsl */
          `

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`
        )
      };
      const geometry2 = new BoxGeometry(5, 5, 5);
      const material2 = new ShaderMaterial({
        name: "CubemapFromEquirect",
        uniforms: cloneUniforms(shader.uniforms),
        vertexShader: shader.vertexShader,
        fragmentShader: shader.fragmentShader,
        side: BackSide,
        blending: NoBlending
      });
      material2.uniforms.tEquirect.value = texture;
      const mesh = new Mesh(geometry2, material2);
      const currentMinFilter = texture.minFilter;
      if (texture.minFilter === LinearMipmapLinearFilter) texture.minFilter = LinearFilter;
      const camera2 = new CubeCamera(1, 10, this);
      camera2.update(renderer2, mesh);
      texture.minFilter = currentMinFilter;
      mesh.geometry.dispose();
      mesh.material.dispose();
      return this;
    }
    clear(renderer2, color, depth, stencil) {
      const currentRenderTarget = renderer2.getRenderTarget();
      for (let i2 = 0; i2 < 6; i2++) {
        renderer2.setRenderTarget(this, i2);
        renderer2.clear(color, depth, stencil);
      }
      renderer2.setRenderTarget(currentRenderTarget);
    }
  };
  var Scene = class extends Object3D {
    constructor() {
      super();
      this.isScene = true;
      this.type = "Scene";
      this.background = null;
      this.environment = null;
      this.fog = null;
      this.backgroundBlurriness = 0;
      this.backgroundIntensity = 1;
      this.backgroundRotation = new Euler();
      this.environmentIntensity = 1;
      this.environmentRotation = new Euler();
      this.overrideMaterial = null;
      if (typeof __THREE_DEVTOOLS__ !== "undefined") {
        __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
      }
    }
    copy(source, recursive) {
      super.copy(source, recursive);
      if (source.background !== null) this.background = source.background.clone();
      if (source.environment !== null) this.environment = source.environment.clone();
      if (source.fog !== null) this.fog = source.fog.clone();
      this.backgroundBlurriness = source.backgroundBlurriness;
      this.backgroundIntensity = source.backgroundIntensity;
      this.backgroundRotation.copy(source.backgroundRotation);
      this.environmentIntensity = source.environmentIntensity;
      this.environmentRotation.copy(source.environmentRotation);
      if (source.overrideMaterial !== null) this.overrideMaterial = source.overrideMaterial.clone();
      this.matrixAutoUpdate = source.matrixAutoUpdate;
      return this;
    }
    toJSON(meta) {
      const data = super.toJSON(meta);
      if (this.fog !== null) data.object.fog = this.fog.toJSON();
      if (this.backgroundBlurriness > 0) data.object.backgroundBlurriness = this.backgroundBlurriness;
      if (this.backgroundIntensity !== 1) data.object.backgroundIntensity = this.backgroundIntensity;
      data.object.backgroundRotation = this.backgroundRotation.toArray();
      if (this.environmentIntensity !== 1) data.object.environmentIntensity = this.environmentIntensity;
      data.object.environmentRotation = this.environmentRotation.toArray();
      return data;
    }
  };
  var _vector1 = /* @__PURE__ */ new Vector3();
  var _vector2 = /* @__PURE__ */ new Vector3();
  var _normalMatrix = /* @__PURE__ */ new Matrix3();
  var Plane = class {
    constructor(normal = new Vector3(1, 0, 0), constant = 0) {
      this.isPlane = true;
      this.normal = normal;
      this.constant = constant;
    }
    set(normal, constant) {
      this.normal.copy(normal);
      this.constant = constant;
      return this;
    }
    setComponents(x2, y2, z, w2) {
      this.normal.set(x2, y2, z);
      this.constant = w2;
      return this;
    }
    setFromNormalAndCoplanarPoint(normal, point) {
      this.normal.copy(normal);
      this.constant = -point.dot(this.normal);
      return this;
    }
    setFromCoplanarPoints(a2, b2, c2) {
      const normal = _vector1.subVectors(c2, b2).cross(_vector2.subVectors(a2, b2)).normalize();
      this.setFromNormalAndCoplanarPoint(normal, a2);
      return this;
    }
    copy(plane) {
      this.normal.copy(plane.normal);
      this.constant = plane.constant;
      return this;
    }
    normalize() {
      const inverseNormalLength = 1 / this.normal.length();
      this.normal.multiplyScalar(inverseNormalLength);
      this.constant *= inverseNormalLength;
      return this;
    }
    negate() {
      this.constant *= -1;
      this.normal.negate();
      return this;
    }
    distanceToPoint(point) {
      return this.normal.dot(point) + this.constant;
    }
    distanceToSphere(sphere) {
      return this.distanceToPoint(sphere.center) - sphere.radius;
    }
    projectPoint(point, target) {
      return target.copy(point).addScaledVector(this.normal, -this.distanceToPoint(point));
    }
    intersectLine(line, target) {
      const direction = line.delta(_vector1);
      const denominator = this.normal.dot(direction);
      if (denominator === 0) {
        if (this.distanceToPoint(line.start) === 0) {
          return target.copy(line.start);
        }
        return null;
      }
      const t = -(line.start.dot(this.normal) + this.constant) / denominator;
      if (t < 0 || t > 1) {
        return null;
      }
      return target.copy(line.start).addScaledVector(direction, t);
    }
    intersectsLine(line) {
      const startSign = this.distanceToPoint(line.start);
      const endSign = this.distanceToPoint(line.end);
      return startSign < 0 && endSign > 0 || endSign < 0 && startSign > 0;
    }
    intersectsBox(box) {
      return box.intersectsPlane(this);
    }
    intersectsSphere(sphere) {
      return sphere.intersectsPlane(this);
    }
    coplanarPoint(target) {
      return target.copy(this.normal).multiplyScalar(-this.constant);
    }
    applyMatrix4(matrix, optionalNormalMatrix) {
      const normalMatrix = optionalNormalMatrix || _normalMatrix.getNormalMatrix(matrix);
      const referencePoint = this.coplanarPoint(_vector1).applyMatrix4(matrix);
      const normal = this.normal.applyMatrix3(normalMatrix).normalize();
      this.constant = -referencePoint.dot(normal);
      return this;
    }
    translate(offset) {
      this.constant -= offset.dot(this.normal);
      return this;
    }
    equals(plane) {
      return plane.normal.equals(this.normal) && plane.constant === this.constant;
    }
    clone() {
      return new this.constructor().copy(this);
    }
  };
  var _sphere$3 = /* @__PURE__ */ new Sphere();
  var _vector$6 = /* @__PURE__ */ new Vector3();
  var Frustum = class {
    constructor(p0 = new Plane(), p1 = new Plane(), p2 = new Plane(), p3 = new Plane(), p4 = new Plane(), p5 = new Plane()) {
      this.planes = [p0, p1, p2, p3, p4, p5];
    }
    set(p0, p1, p2, p3, p4, p5) {
      const planes = this.planes;
      planes[0].copy(p0);
      planes[1].copy(p1);
      planes[2].copy(p2);
      planes[3].copy(p3);
      planes[4].copy(p4);
      planes[5].copy(p5);
      return this;
    }
    copy(frustum) {
      const planes = this.planes;
      for (let i2 = 0; i2 < 6; i2++) {
        planes[i2].copy(frustum.planes[i2]);
      }
      return this;
    }
    setFromProjectionMatrix(m2, coordinateSystem = WebGLCoordinateSystem) {
      const planes = this.planes;
      const me = m2.elements;
      const me0 = me[0], me1 = me[1], me2 = me[2], me3 = me[3];
      const me4 = me[4], me5 = me[5], me6 = me[6], me7 = me[7];
      const me8 = me[8], me9 = me[9], me10 = me[10], me11 = me[11];
      const me12 = me[12], me13 = me[13], me14 = me[14], me15 = me[15];
      planes[0].setComponents(me3 - me0, me7 - me4, me11 - me8, me15 - me12).normalize();
      planes[1].setComponents(me3 + me0, me7 + me4, me11 + me8, me15 + me12).normalize();
      planes[2].setComponents(me3 + me1, me7 + me5, me11 + me9, me15 + me13).normalize();
      planes[3].setComponents(me3 - me1, me7 - me5, me11 - me9, me15 - me13).normalize();
      planes[4].setComponents(me3 - me2, me7 - me6, me11 - me10, me15 - me14).normalize();
      if (coordinateSystem === WebGLCoordinateSystem) {
        planes[5].setComponents(me3 + me2, me7 + me6, me11 + me10, me15 + me14).normalize();
      } else if (coordinateSystem === WebGPUCoordinateSystem) {
        planes[5].setComponents(me2, me6, me10, me14).normalize();
      } else {
        throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: " + coordinateSystem);
      }
      return this;
    }
    intersectsObject(object) {
      if (object.boundingSphere !== void 0) {
        if (object.boundingSphere === null) object.computeBoundingSphere();
        _sphere$3.copy(object.boundingSphere).applyMatrix4(object.matrixWorld);
      } else {
        const geometry2 = object.geometry;
        if (geometry2.boundingSphere === null) geometry2.computeBoundingSphere();
        _sphere$3.copy(geometry2.boundingSphere).applyMatrix4(object.matrixWorld);
      }
      return this.intersectsSphere(_sphere$3);
    }
    intersectsSprite(sprite) {
      _sphere$3.center.set(0, 0, 0);
      _sphere$3.radius = 0.7071067811865476;
      _sphere$3.applyMatrix4(sprite.matrixWorld);
      return this.intersectsSphere(_sphere$3);
    }
    intersectsSphere(sphere) {
      const planes = this.planes;
      const center = sphere.center;
      const negRadius = -sphere.radius;
      for (let i2 = 0; i2 < 6; i2++) {
        const distance = planes[i2].distanceToPoint(center);
        if (distance < negRadius) {
          return false;
        }
      }
      return true;
    }
    intersectsBox(box) {
      const planes = this.planes;
      for (let i2 = 0; i2 < 6; i2++) {
        const plane = planes[i2];
        _vector$6.x = plane.normal.x > 0 ? box.max.x : box.min.x;
        _vector$6.y = plane.normal.y > 0 ? box.max.y : box.min.y;
        _vector$6.z = plane.normal.z > 0 ? box.max.z : box.min.z;
        if (plane.distanceToPoint(_vector$6) < 0) {
          return false;
        }
      }
      return true;
    }
    containsPoint(point) {
      const planes = this.planes;
      for (let i2 = 0; i2 < 6; i2++) {
        if (planes[i2].distanceToPoint(point) < 0) {
          return false;
        }
      }
      return true;
    }
    clone() {
      return new this.constructor().copy(this);
    }
  };
  var Group = class extends Object3D {
    constructor() {
      super();
      this.isGroup = true;
      this.type = "Group";
    }
  };
  var DepthTexture = class extends Texture {
    constructor(width, height, type, mapping, wrapS, wrapT, magFilter, minFilter, anisotropy, format = DepthFormat) {
      if (format !== DepthFormat && format !== DepthStencilFormat) {
        throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");
      }
      if (type === void 0 && format === DepthFormat) type = UnsignedIntType;
      if (type === void 0 && format === DepthStencilFormat) type = UnsignedInt248Type;
      super(null, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy);
      this.isDepthTexture = true;
      this.image = { width, height };
      this.magFilter = magFilter !== void 0 ? magFilter : NearestFilter;
      this.minFilter = minFilter !== void 0 ? minFilter : NearestFilter;
      this.flipY = false;
      this.generateMipmaps = false;
      this.compareFunction = null;
    }
    copy(source) {
      super.copy(source);
      this.compareFunction = source.compareFunction;
      return this;
    }
    toJSON(meta) {
      const data = super.toJSON(meta);
      if (this.compareFunction !== null) data.compareFunction = this.compareFunction;
      return data;
    }
  };
  var PlaneGeometry = class _PlaneGeometry extends BufferGeometry {
    constructor(width = 1, height = 1, widthSegments = 1, heightSegments = 1) {
      super();
      this.type = "PlaneGeometry";
      this.parameters = {
        width,
        height,
        widthSegments,
        heightSegments
      };
      const width_half = width / 2;
      const height_half = height / 2;
      const gridX = Math.floor(widthSegments);
      const gridY = Math.floor(heightSegments);
      const gridX1 = gridX + 1;
      const gridY1 = gridY + 1;
      const segment_width = width / gridX;
      const segment_height = height / gridY;
      const indices = [];
      const vertices = [];
      const normals = [];
      const uvs = [];
      for (let iy = 0; iy < gridY1; iy++) {
        const y2 = iy * segment_height - height_half;
        for (let ix = 0; ix < gridX1; ix++) {
          const x2 = ix * segment_width - width_half;
          vertices.push(x2, -y2, 0);
          normals.push(0, 0, 1);
          uvs.push(ix / gridX);
          uvs.push(1 - iy / gridY);
        }
      }
      for (let iy = 0; iy < gridY; iy++) {
        for (let ix = 0; ix < gridX; ix++) {
          const a2 = ix + gridX1 * iy;
          const b2 = ix + gridX1 * (iy + 1);
          const c2 = ix + 1 + gridX1 * (iy + 1);
          const d2 = ix + 1 + gridX1 * iy;
          indices.push(a2, b2, d2);
          indices.push(b2, c2, d2);
        }
      }
      this.setIndex(indices);
      this.setAttribute("position", new Float32BufferAttribute(vertices, 3));
      this.setAttribute("normal", new Float32BufferAttribute(normals, 3));
      this.setAttribute("uv", new Float32BufferAttribute(uvs, 2));
    }
    copy(source) {
      super.copy(source);
      this.parameters = Object.assign({}, source.parameters);
      return this;
    }
    static fromJSON(data) {
      return new _PlaneGeometry(data.width, data.height, data.widthSegments, data.heightSegments);
    }
  };
  var MeshDepthMaterial = class extends Material {
    constructor(parameters) {
      super();
      this.isMeshDepthMaterial = true;
      this.type = "MeshDepthMaterial";
      this.depthPacking = BasicDepthPacking;
      this.map = null;
      this.alphaMap = null;
      this.displacementMap = null;
      this.displacementScale = 1;
      this.displacementBias = 0;
      this.wireframe = false;
      this.wireframeLinewidth = 1;
      this.setValues(parameters);
    }
    copy(source) {
      super.copy(source);
      this.depthPacking = source.depthPacking;
      this.map = source.map;
      this.alphaMap = source.alphaMap;
      this.displacementMap = source.displacementMap;
      this.displacementScale = source.displacementScale;
      this.displacementBias = source.displacementBias;
      this.wireframe = source.wireframe;
      this.wireframeLinewidth = source.wireframeLinewidth;
      return this;
    }
  };
  var MeshDistanceMaterial = class extends Material {
    constructor(parameters) {
      super();
      this.isMeshDistanceMaterial = true;
      this.type = "MeshDistanceMaterial";
      this.map = null;
      this.alphaMap = null;
      this.displacementMap = null;
      this.displacementScale = 1;
      this.displacementBias = 0;
      this.setValues(parameters);
    }
    copy(source) {
      super.copy(source);
      this.map = source.map;
      this.alphaMap = source.alphaMap;
      this.displacementMap = source.displacementMap;
      this.displacementScale = source.displacementScale;
      this.displacementBias = source.displacementBias;
      return this;
    }
  };
  function convertArray(array, type, forceClone) {
    if (!array || // let 'undefined' and 'null' pass
    !forceClone && array.constructor === type) return array;
    if (typeof type.BYTES_PER_ELEMENT === "number") {
      return new type(array);
    }
    return Array.prototype.slice.call(array);
  }
  function isTypedArray(object) {
    return ArrayBuffer.isView(object) && !(object instanceof DataView);
  }
  var Interpolant = class {
    constructor(parameterPositions, sampleValues, sampleSize, resultBuffer) {
      this.parameterPositions = parameterPositions;
      this._cachedIndex = 0;
      this.resultBuffer = resultBuffer !== void 0 ? resultBuffer : new sampleValues.constructor(sampleSize);
      this.sampleValues = sampleValues;
      this.valueSize = sampleSize;
      this.settings = null;
      this.DefaultSettings_ = {};
    }
    evaluate(t) {
      const pp = this.parameterPositions;
      let i1 = this._cachedIndex, t1 = pp[i1], t0 = pp[i1 - 1];
      validate_interval: {
        seek: {
          let right;
          linear_scan: {
            forward_scan: if (!(t < t1)) {
              for (let giveUpAt = i1 + 2; ; ) {
                if (t1 === void 0) {
                  if (t < t0) break forward_scan;
                  i1 = pp.length;
                  this._cachedIndex = i1;
                  return this.copySampleValue_(i1 - 1);
                }
                if (i1 === giveUpAt) break;
                t0 = t1;
                t1 = pp[++i1];
                if (t < t1) {
                  break seek;
                }
              }
              right = pp.length;
              break linear_scan;
            }
            if (!(t >= t0)) {
              const t1global = pp[1];
              if (t < t1global) {
                i1 = 2;
                t0 = t1global;
              }
              for (let giveUpAt = i1 - 2; ; ) {
                if (t0 === void 0) {
                  this._cachedIndex = 0;
                  return this.copySampleValue_(0);
                }
                if (i1 === giveUpAt) break;
                t1 = t0;
                t0 = pp[--i1 - 1];
                if (t >= t0) {
                  break seek;
                }
              }
              right = i1;
              i1 = 0;
              break linear_scan;
            }
            break validate_interval;
          }
          while (i1 < right) {
            const mid = i1 + right >>> 1;
            if (t < pp[mid]) {
              right = mid;
            } else {
              i1 = mid + 1;
            }
          }
          t1 = pp[i1];
          t0 = pp[i1 - 1];
          if (t0 === void 0) {
            this._cachedIndex = 0;
            return this.copySampleValue_(0);
          }
          if (t1 === void 0) {
            i1 = pp.length;
            this._cachedIndex = i1;
            return this.copySampleValue_(i1 - 1);
          }
        }
        this._cachedIndex = i1;
        this.intervalChanged_(i1, t0, t1);
      }
      return this.interpolate_(i1, t0, t, t1);
    }
    getSettings_() {
      return this.settings || this.DefaultSettings_;
    }
    copySampleValue_(index) {
      const result = this.resultBuffer, values = this.sampleValues, stride = this.valueSize, offset = index * stride;
      for (let i2 = 0; i2 !== stride; ++i2) {
        result[i2] = values[offset + i2];
      }
      return result;
    }
    // Template methods for derived classes:
    interpolate_() {
      throw new Error("call to abstract method");
    }
    intervalChanged_() {
    }
  };
  var CubicInterpolant = class extends Interpolant {
    constructor(parameterPositions, sampleValues, sampleSize, resultBuffer) {
      super(parameterPositions, sampleValues, sampleSize, resultBuffer);
      this._weightPrev = -0;
      this._offsetPrev = -0;
      this._weightNext = -0;
      this._offsetNext = -0;
      this.DefaultSettings_ = {
        endingStart: ZeroCurvatureEnding,
        endingEnd: ZeroCurvatureEnding
      };
    }
    intervalChanged_(i1, t0, t1) {
      const pp = this.parameterPositions;
      let iPrev = i1 - 2, iNext = i1 + 1, tPrev = pp[iPrev], tNext = pp[iNext];
      if (tPrev === void 0) {
        switch (this.getSettings_().endingStart) {
          case ZeroSlopeEnding:
            iPrev = i1;
            tPrev = 2 * t0 - t1;
            break;
          case WrapAroundEnding:
            iPrev = pp.length - 2;
            tPrev = t0 + pp[iPrev] - pp[iPrev + 1];
            break;
          default:
            iPrev = i1;
            tPrev = t1;
        }
      }
      if (tNext === void 0) {
        switch (this.getSettings_().endingEnd) {
          case ZeroSlopeEnding:
            iNext = i1;
            tNext = 2 * t1 - t0;
            break;
          case WrapAroundEnding:
            iNext = 1;
            tNext = t1 + pp[1] - pp[0];
            break;
          default:
            iNext = i1 - 1;
            tNext = t0;
        }
      }
      const halfDt = (t1 - t0) * 0.5, stride = this.valueSize;
      this._weightPrev = halfDt / (t0 - tPrev);
      this._weightNext = halfDt / (tNext - t1);
      this._offsetPrev = iPrev * stride;
      this._offsetNext = iNext * stride;
    }
    interpolate_(i1, t0, t, t1) {
      const result = this.resultBuffer, values = this.sampleValues, stride = this.valueSize, o1 = i1 * stride, o0 = o1 - stride, oP = this._offsetPrev, oN = this._offsetNext, wP = this._weightPrev, wN = this._weightNext, p2 = (t - t0) / (t1 - t0), pp = p2 * p2, ppp = pp * p2;
      const sP = -wP * ppp + 2 * wP * pp - wP * p2;
      const s0 = (1 + wP) * ppp + (-1.5 - 2 * wP) * pp + (-0.5 + wP) * p2 + 1;
      const s1 = (-1 - wN) * ppp + (1.5 + wN) * pp + 0.5 * p2;
      const sN = wN * ppp - wN * pp;
      for (let i2 = 0; i2 !== stride; ++i2) {
        result[i2] = sP * values[oP + i2] + s0 * values[o0 + i2] + s1 * values[o1 + i2] + sN * values[oN + i2];
      }
      return result;
    }
  };
  var LinearInterpolant = class extends Interpolant {
    constructor(parameterPositions, sampleValues, sampleSize, resultBuffer) {
      super(parameterPositions, sampleValues, sampleSize, resultBuffer);
    }
    interpolate_(i1, t0, t, t1) {
      const result = this.resultBuffer, values = this.sampleValues, stride = this.valueSize, offset1 = i1 * stride, offset0 = offset1 - stride, weight1 = (t - t0) / (t1 - t0), weight0 = 1 - weight1;
      for (let i2 = 0; i2 !== stride; ++i2) {
        result[i2] = values[offset0 + i2] * weight0 + values[offset1 + i2] * weight1;
      }
      return result;
    }
  };
  var DiscreteInterpolant = class extends Interpolant {
    constructor(parameterPositions, sampleValues, sampleSize, resultBuffer) {
      super(parameterPositions, sampleValues, sampleSize, resultBuffer);
    }
    interpolate_(i1) {
      return this.copySampleValue_(i1 - 1);
    }
  };
  var KeyframeTrack = class {
    constructor(name, times, values, interpolation) {
      if (name === void 0) throw new Error("THREE.KeyframeTrack: track name is undefined");
      if (times === void 0 || times.length === 0) throw new Error("THREE.KeyframeTrack: no keyframes in track named " + name);
      this.name = name;
      this.times = convertArray(times, this.TimeBufferType);
      this.values = convertArray(values, this.ValueBufferType);
      this.setInterpolation(interpolation || this.DefaultInterpolation);
    }
    // Serialization (in static context, because of constructor invocation
    // and automatic invocation of .toJSON):
    static toJSON(track) {
      const trackType = track.constructor;
      let json;
      if (trackType.toJSON !== this.toJSON) {
        json = trackType.toJSON(track);
      } else {
        json = {
          "name": track.name,
          "times": convertArray(track.times, Array),
          "values": convertArray(track.values, Array)
        };
        const interpolation = track.getInterpolation();
        if (interpolation !== track.DefaultInterpolation) {
          json.interpolation = interpolation;
        }
      }
      json.type = track.ValueTypeName;
      return json;
    }
    InterpolantFactoryMethodDiscrete(result) {
      return new DiscreteInterpolant(this.times, this.values, this.getValueSize(), result);
    }
    InterpolantFactoryMethodLinear(result) {
      return new LinearInterpolant(this.times, this.values, this.getValueSize(), result);
    }
    InterpolantFactoryMethodSmooth(result) {
      return new CubicInterpolant(this.times, this.values, this.getValueSize(), result);
    }
    setInterpolation(interpolation) {
      let factoryMethod;
      switch (interpolation) {
        case InterpolateDiscrete:
          factoryMethod = this.InterpolantFactoryMethodDiscrete;
          break;
        case InterpolateLinear:
          factoryMethod = this.InterpolantFactoryMethodLinear;
          break;
        case InterpolateSmooth:
          factoryMethod = this.InterpolantFactoryMethodSmooth;
          break;
      }
      if (factoryMethod === void 0) {
        const message = "unsupported interpolation for " + this.ValueTypeName + " keyframe track named " + this.name;
        if (this.createInterpolant === void 0) {
          if (interpolation !== this.DefaultInterpolation) {
            this.setInterpolation(this.DefaultInterpolation);
          } else {
            throw new Error(message);
          }
        }
        console.warn("THREE.KeyframeTrack:", message);
        return this;
      }
      this.createInterpolant = factoryMethod;
      return this;
    }
    getInterpolation() {
      switch (this.createInterpolant) {
        case this.InterpolantFactoryMethodDiscrete:
          return InterpolateDiscrete;
        case this.InterpolantFactoryMethodLinear:
          return InterpolateLinear;
        case this.InterpolantFactoryMethodSmooth:
          return InterpolateSmooth;
      }
    }
    getValueSize() {
      return this.values.length / this.times.length;
    }
    // move all keyframes either forwards or backwards in time
    shift(timeOffset) {
      if (timeOffset !== 0) {
        const times = this.times;
        for (let i2 = 0, n2 = times.length; i2 !== n2; ++i2) {
          times[i2] += timeOffset;
        }
      }
      return this;
    }
    // scale all keyframe times by a factor (useful for frame <-> seconds conversions)
    scale(timeScale) {
      if (timeScale !== 1) {
        const times = this.times;
        for (let i2 = 0, n2 = times.length; i2 !== n2; ++i2) {
          times[i2] *= timeScale;
        }
      }
      return this;
    }
    // removes keyframes before and after animation without changing any values within the range [startTime, endTime].
    // IMPORTANT: We do not shift around keys to the start of the track time, because for interpolated keys this will change their values
    trim(startTime, endTime) {
      const times = this.times, nKeys = times.length;
      let from = 0, to = nKeys - 1;
      while (from !== nKeys && times[from] < startTime) {
        ++from;
      }
      while (to !== -1 && times[to] > endTime) {
        --to;
      }
      ++to;
      if (from !== 0 || to !== nKeys) {
        if (from >= to) {
          to = Math.max(to, 1);
          from = to - 1;
        }
        const stride = this.getValueSize();
        this.times = times.slice(from, to);
        this.values = this.values.slice(from * stride, to * stride);
      }
      return this;
    }
    // ensure we do not get a GarbageInGarbageOut situation, make sure tracks are at least minimally viable
    validate() {
      let valid = true;
      const valueSize = this.getValueSize();
      if (valueSize - Math.floor(valueSize) !== 0) {
        console.error("THREE.KeyframeTrack: Invalid value size in track.", this);
        valid = false;
      }
      const times = this.times, values = this.values, nKeys = times.length;
      if (nKeys === 0) {
        console.error("THREE.KeyframeTrack: Track is empty.", this);
        valid = false;
      }
      let prevTime = null;
      for (let i2 = 0; i2 !== nKeys; i2++) {
        const currTime = times[i2];
        if (typeof currTime === "number" && isNaN(currTime)) {
          console.error("THREE.KeyframeTrack: Time is not a valid number.", this, i2, currTime);
          valid = false;
          break;
        }
        if (prevTime !== null && prevTime > currTime) {
          console.error("THREE.KeyframeTrack: Out of order keys.", this, i2, currTime, prevTime);
          valid = false;
          break;
        }
        prevTime = currTime;
      }
      if (values !== void 0) {
        if (isTypedArray(values)) {
          for (let i2 = 0, n2 = values.length; i2 !== n2; ++i2) {
            const value = values[i2];
            if (isNaN(value)) {
              console.error("THREE.KeyframeTrack: Value is not a valid number.", this, i2, value);
              valid = false;
              break;
            }
          }
        }
      }
      return valid;
    }
    // removes equivalent sequential keys as common in morph target sequences
    // (0,0,0,0,1,1,1,0,0,0,0,0,0,0) --> (0,0,1,1,0,0)
    optimize() {
      const times = this.times.slice(), values = this.values.slice(), stride = this.getValueSize(), smoothInterpolation = this.getInterpolation() === InterpolateSmooth, lastIndex = times.length - 1;
      let writeIndex = 1;
      for (let i2 = 1; i2 < lastIndex; ++i2) {
        let keep = false;
        const time = times[i2];
        const timeNext = times[i2 + 1];
        if (time !== timeNext && (i2 !== 1 || time !== times[0])) {
          if (!smoothInterpolation) {
            const offset = i2 * stride, offsetP = offset - stride, offsetN = offset + stride;
            for (let j2 = 0; j2 !== stride; ++j2) {
              const value = values[offset + j2];
              if (value !== values[offsetP + j2] || value !== values[offsetN + j2]) {
                keep = true;
                break;
              }
            }
          } else {
            keep = true;
          }
        }
        if (keep) {
          if (i2 !== writeIndex) {
            times[writeIndex] = times[i2];
            const readOffset = i2 * stride, writeOffset = writeIndex * stride;
            for (let j2 = 0; j2 !== stride; ++j2) {
              values[writeOffset + j2] = values[readOffset + j2];
            }
          }
          ++writeIndex;
        }
      }
      if (lastIndex > 0) {
        times[writeIndex] = times[lastIndex];
        for (let readOffset = lastIndex * stride, writeOffset = writeIndex * stride, j2 = 0; j2 !== stride; ++j2) {
          values[writeOffset + j2] = values[readOffset + j2];
        }
        ++writeIndex;
      }
      if (writeIndex !== times.length) {
        this.times = times.slice(0, writeIndex);
        this.values = values.slice(0, writeIndex * stride);
      } else {
        this.times = times;
        this.values = values;
      }
      return this;
    }
    clone() {
      const times = this.times.slice();
      const values = this.values.slice();
      const TypedKeyframeTrack = this.constructor;
      const track = new TypedKeyframeTrack(this.name, times, values);
      track.createInterpolant = this.createInterpolant;
      return track;
    }
  };
  KeyframeTrack.prototype.TimeBufferType = Float32Array;
  KeyframeTrack.prototype.ValueBufferType = Float32Array;
  KeyframeTrack.prototype.DefaultInterpolation = InterpolateLinear;
  var BooleanKeyframeTrack = class extends KeyframeTrack {
    // No interpolation parameter because only InterpolateDiscrete is valid.
    constructor(name, times, values) {
      super(name, times, values);
    }
  };
  BooleanKeyframeTrack.prototype.ValueTypeName = "bool";
  BooleanKeyframeTrack.prototype.ValueBufferType = Array;
  BooleanKeyframeTrack.prototype.DefaultInterpolation = InterpolateDiscrete;
  BooleanKeyframeTrack.prototype.InterpolantFactoryMethodLinear = void 0;
  BooleanKeyframeTrack.prototype.InterpolantFactoryMethodSmooth = void 0;
  var ColorKeyframeTrack = class extends KeyframeTrack {
  };
  ColorKeyframeTrack.prototype.ValueTypeName = "color";
  var NumberKeyframeTrack = class extends KeyframeTrack {
  };
  NumberKeyframeTrack.prototype.ValueTypeName = "number";
  var QuaternionLinearInterpolant = class extends Interpolant {
    constructor(parameterPositions, sampleValues, sampleSize, resultBuffer) {
      super(parameterPositions, sampleValues, sampleSize, resultBuffer);
    }
    interpolate_(i1, t0, t, t1) {
      const result = this.resultBuffer, values = this.sampleValues, stride = this.valueSize, alpha = (t - t0) / (t1 - t0);
      let offset = i1 * stride;
      for (let end = offset + stride; offset !== end; offset += 4) {
        Quaternion.slerpFlat(result, 0, values, offset - stride, values, offset, alpha);
      }
      return result;
    }
  };
  var QuaternionKeyframeTrack = class extends KeyframeTrack {
    InterpolantFactoryMethodLinear(result) {
      return new QuaternionLinearInterpolant(this.times, this.values, this.getValueSize(), result);
    }
  };
  QuaternionKeyframeTrack.prototype.ValueTypeName = "quaternion";
  QuaternionKeyframeTrack.prototype.InterpolantFactoryMethodSmooth = void 0;
  var StringKeyframeTrack = class extends KeyframeTrack {
    // No interpolation parameter because only InterpolateDiscrete is valid.
    constructor(name, times, values) {
      super(name, times, values);
    }
  };
  StringKeyframeTrack.prototype.ValueTypeName = "string";
  StringKeyframeTrack.prototype.ValueBufferType = Array;
  StringKeyframeTrack.prototype.DefaultInterpolation = InterpolateDiscrete;
  StringKeyframeTrack.prototype.InterpolantFactoryMethodLinear = void 0;
  StringKeyframeTrack.prototype.InterpolantFactoryMethodSmooth = void 0;
  var VectorKeyframeTrack = class extends KeyframeTrack {
  };
  VectorKeyframeTrack.prototype.ValueTypeName = "vector";
  var LoadingManager = class {
    constructor(onLoad, onProgress, onError) {
      const scope = this;
      let isLoading = false;
      let itemsLoaded = 0;
      let itemsTotal = 0;
      let urlModifier = void 0;
      const handlers = [];
      this.onStart = void 0;
      this.onLoad = onLoad;
      this.onProgress = onProgress;
      this.onError = onError;
      this.itemStart = function(url) {
        itemsTotal++;
        if (isLoading === false) {
          if (scope.onStart !== void 0) {
            scope.onStart(url, itemsLoaded, itemsTotal);
          }
        }
        isLoading = true;
      };
      this.itemEnd = function(url) {
        itemsLoaded++;
        if (scope.onProgress !== void 0) {
          scope.onProgress(url, itemsLoaded, itemsTotal);
        }
        if (itemsLoaded === itemsTotal) {
          isLoading = false;
          if (scope.onLoad !== void 0) {
            scope.onLoad();
          }
        }
      };
      this.itemError = function(url) {
        if (scope.onError !== void 0) {
          scope.onError(url);
        }
      };
      this.resolveURL = function(url) {
        if (urlModifier) {
          return urlModifier(url);
        }
        return url;
      };
      this.setURLModifier = function(transform) {
        urlModifier = transform;
        return this;
      };
      this.addHandler = function(regex, loader) {
        handlers.push(regex, loader);
        return this;
      };
      this.removeHandler = function(regex) {
        const index = handlers.indexOf(regex);
        if (index !== -1) {
          handlers.splice(index, 2);
        }
        return this;
      };
      this.getHandler = function(file) {
        for (let i2 = 0, l2 = handlers.length; i2 < l2; i2 += 2) {
          const regex = handlers[i2];
          const loader = handlers[i2 + 1];
          if (regex.global) regex.lastIndex = 0;
          if (regex.test(file)) {
            return loader;
          }
        }
        return null;
      };
    }
  };
  var DefaultLoadingManager = /* @__PURE__ */ new LoadingManager();
  var Loader = class {
    constructor(manager) {
      this.manager = manager !== void 0 ? manager : DefaultLoadingManager;
      this.crossOrigin = "anonymous";
      this.withCredentials = false;
      this.path = "";
      this.resourcePath = "";
      this.requestHeader = {};
    }
    load() {
    }
    loadAsync(url, onProgress) {
      const scope = this;
      return new Promise(function(resolve, reject) {
        scope.load(url, resolve, onProgress, reject);
      });
    }
    parse() {
    }
    setCrossOrigin(crossOrigin) {
      this.crossOrigin = crossOrigin;
      return this;
    }
    setWithCredentials(value) {
      this.withCredentials = value;
      return this;
    }
    setPath(path) {
      this.path = path;
      return this;
    }
    setResourcePath(resourcePath) {
      this.resourcePath = resourcePath;
      return this;
    }
    setRequestHeader(requestHeader) {
      this.requestHeader = requestHeader;
      return this;
    }
  };
  Loader.DEFAULT_MATERIAL_NAME = "__DEFAULT";
  var OrthographicCamera = class extends Camera {
    constructor(left = -1, right = 1, top = 1, bottom = -1, near = 0.1, far = 2e3) {
      super();
      this.isOrthographicCamera = true;
      this.type = "OrthographicCamera";
      this.zoom = 1;
      this.view = null;
      this.left = left;
      this.right = right;
      this.top = top;
      this.bottom = bottom;
      this.near = near;
      this.far = far;
      this.updateProjectionMatrix();
    }
    copy(source, recursive) {
      super.copy(source, recursive);
      this.left = source.left;
      this.right = source.right;
      this.top = source.top;
      this.bottom = source.bottom;
      this.near = source.near;
      this.far = source.far;
      this.zoom = source.zoom;
      this.view = source.view === null ? null : Object.assign({}, source.view);
      return this;
    }
    setViewOffset(fullWidth, fullHeight, x2, y2, width, height) {
      if (this.view === null) {
        this.view = {
          enabled: true,
          fullWidth: 1,
          fullHeight: 1,
          offsetX: 0,
          offsetY: 0,
          width: 1,
          height: 1
        };
      }
      this.view.enabled = true;
      this.view.fullWidth = fullWidth;
      this.view.fullHeight = fullHeight;
      this.view.offsetX = x2;
      this.view.offsetY = y2;
      this.view.width = width;
      this.view.height = height;
      this.updateProjectionMatrix();
    }
    clearViewOffset() {
      if (this.view !== null) {
        this.view.enabled = false;
      }
      this.updateProjectionMatrix();
    }
    updateProjectionMatrix() {
      const dx = (this.right - this.left) / (2 * this.zoom);
      const dy = (this.top - this.bottom) / (2 * this.zoom);
      const cx = (this.right + this.left) / 2;
      const cy = (this.top + this.bottom) / 2;
      let left = cx - dx;
      let right = cx + dx;
      let top = cy + dy;
      let bottom = cy - dy;
      if (this.view !== null && this.view.enabled) {
        const scaleW = (this.right - this.left) / this.view.fullWidth / this.zoom;
        const scaleH = (this.top - this.bottom) / this.view.fullHeight / this.zoom;
        left += scaleW * this.view.offsetX;
        right = left + scaleW * this.view.width;
        top -= scaleH * this.view.offsetY;
        bottom = top - scaleH * this.view.height;
      }
      this.projectionMatrix.makeOrthographic(left, right, top, bottom, this.near, this.far, this.coordinateSystem);
      this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
    }
    toJSON(meta) {
      const data = super.toJSON(meta);
      data.object.zoom = this.zoom;
      data.object.left = this.left;
      data.object.right = this.right;
      data.object.top = this.top;
      data.object.bottom = this.bottom;
      data.object.near = this.near;
      data.object.far = this.far;
      if (this.view !== null) data.object.view = Object.assign({}, this.view);
      return data;
    }
  };
  var ArrayCamera = class extends PerspectiveCamera {
    constructor(array = []) {
      super();
      this.isArrayCamera = true;
      this.cameras = array;
    }
  };
  var _RESERVED_CHARS_RE = "\\[\\]\\.:\\/";
  var _reservedRe = new RegExp("[" + _RESERVED_CHARS_RE + "]", "g");
  var _wordChar = "[^" + _RESERVED_CHARS_RE + "]";
  var _wordCharOrDot = "[^" + _RESERVED_CHARS_RE.replace("\\.", "") + "]";
  var _directoryRe = /* @__PURE__ */ /((?:WC+[\/:])*)/.source.replace("WC", _wordChar);
  var _nodeRe = /* @__PURE__ */ /(WCOD+)?/.source.replace("WCOD", _wordCharOrDot);
  var _objectRe = /* @__PURE__ */ /(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC", _wordChar);
  var _propertyRe = /* @__PURE__ */ /\.(WC+)(?:\[(.+)\])?/.source.replace("WC", _wordChar);
  var _trackRe = new RegExp(
    "^" + _directoryRe + _nodeRe + _objectRe + _propertyRe + "$"
  );
  var _supportedObjectNames = ["material", "materials", "bones", "map"];
  var Composite = class {
    constructor(targetGroup, path, optionalParsedPath) {
      const parsedPath = optionalParsedPath || PropertyBinding.parseTrackName(path);
      this._targetGroup = targetGroup;
      this._bindings = targetGroup.subscribe_(path, parsedPath);
    }
    getValue(array, offset) {
      this.bind();
      const firstValidIndex = this._targetGroup.nCachedObjects_, binding = this._bindings[firstValidIndex];
      if (binding !== void 0) binding.getValue(array, offset);
    }
    setValue(array, offset) {
      const bindings = this._bindings;
      for (let i2 = this._targetGroup.nCachedObjects_, n2 = bindings.length; i2 !== n2; ++i2) {
        bindings[i2].setValue(array, offset);
      }
    }
    bind() {
      const bindings = this._bindings;
      for (let i2 = this._targetGroup.nCachedObjects_, n2 = bindings.length; i2 !== n2; ++i2) {
        bindings[i2].bind();
      }
    }
    unbind() {
      const bindings = this._bindings;
      for (let i2 = this._targetGroup.nCachedObjects_, n2 = bindings.length; i2 !== n2; ++i2) {
        bindings[i2].unbind();
      }
    }
  };
  var PropertyBinding = class _PropertyBinding {
    constructor(rootNode, path, parsedPath) {
      this.path = path;
      this.parsedPath = parsedPath || _PropertyBinding.parseTrackName(path);
      this.node = _PropertyBinding.findNode(rootNode, this.parsedPath.nodeName);
      this.rootNode = rootNode;
      this.getValue = this._getValue_unbound;
      this.setValue = this._setValue_unbound;
    }
    static create(root, path, parsedPath) {
      if (!(root && root.isAnimationObjectGroup)) {
        return new _PropertyBinding(root, path, parsedPath);
      } else {
        return new _PropertyBinding.Composite(root, path, parsedPath);
      }
    }
    /**
     * Replaces spaces with underscores and removes unsupported characters from
     * node names, to ensure compatibility with parseTrackName().
     *
     * @param {string} name Node name to be sanitized.
     * @return {string}
     */
    static sanitizeNodeName(name) {
      return name.replace(/\s/g, "_").replace(_reservedRe, "");
    }
    static parseTrackName(trackName) {
      const matches = _trackRe.exec(trackName);
      if (matches === null) {
        throw new Error("PropertyBinding: Cannot parse trackName: " + trackName);
      }
      const results = {
        // directoryName: matches[ 1 ], // (tschw) currently unused
        nodeName: matches[2],
        objectName: matches[3],
        objectIndex: matches[4],
        propertyName: matches[5],
        // required
        propertyIndex: matches[6]
      };
      const lastDot = results.nodeName && results.nodeName.lastIndexOf(".");
      if (lastDot !== void 0 && lastDot !== -1) {
        const objectName = results.nodeName.substring(lastDot + 1);
        if (_supportedObjectNames.indexOf(objectName) !== -1) {
          results.nodeName = results.nodeName.substring(0, lastDot);
          results.objectName = objectName;
        }
      }
      if (results.propertyName === null || results.propertyName.length === 0) {
        throw new Error("PropertyBinding: can not parse propertyName from trackName: " + trackName);
      }
      return results;
    }
    static findNode(root, nodeName) {
      if (nodeName === void 0 || nodeName === "" || nodeName === "." || nodeName === -1 || nodeName === root.name || nodeName === root.uuid) {
        return root;
      }
      if (root.skeleton) {
        const bone = root.skeleton.getBoneByName(nodeName);
        if (bone !== void 0) {
          return bone;
        }
      }
      if (root.children) {
        const searchNodeSubtree = function(children) {
          for (let i2 = 0; i2 < children.length; i2++) {
            const childNode = children[i2];
            if (childNode.name === nodeName || childNode.uuid === nodeName) {
              return childNode;
            }
            const result = searchNodeSubtree(childNode.children);
            if (result) return result;
          }
          return null;
        };
        const subTreeNode = searchNodeSubtree(root.children);
        if (subTreeNode) {
          return subTreeNode;
        }
      }
      return null;
    }
    // these are used to "bind" a nonexistent property
    _getValue_unavailable() {
    }
    _setValue_unavailable() {
    }
    // Getters
    _getValue_direct(buffer, offset) {
      buffer[offset] = this.targetObject[this.propertyName];
    }
    _getValue_array(buffer, offset) {
      const source = this.resolvedProperty;
      for (let i2 = 0, n2 = source.length; i2 !== n2; ++i2) {
        buffer[offset++] = source[i2];
      }
    }
    _getValue_arrayElement(buffer, offset) {
      buffer[offset] = this.resolvedProperty[this.propertyIndex];
    }
    _getValue_toArray(buffer, offset) {
      this.resolvedProperty.toArray(buffer, offset);
    }
    // Direct
    _setValue_direct(buffer, offset) {
      this.targetObject[this.propertyName] = buffer[offset];
    }
    _setValue_direct_setNeedsUpdate(buffer, offset) {
      this.targetObject[this.propertyName] = buffer[offset];
      this.targetObject.needsUpdate = true;
    }
    _setValue_direct_setMatrixWorldNeedsUpdate(buffer, offset) {
      this.targetObject[this.propertyName] = buffer[offset];
      this.targetObject.matrixWorldNeedsUpdate = true;
    }
    // EntireArray
    _setValue_array(buffer, offset) {
      const dest = this.resolvedProperty;
      for (let i2 = 0, n2 = dest.length; i2 !== n2; ++i2) {
        dest[i2] = buffer[offset++];
      }
    }
    _setValue_array_setNeedsUpdate(buffer, offset) {
      const dest = this.resolvedProperty;
      for (let i2 = 0, n2 = dest.length; i2 !== n2; ++i2) {
        dest[i2] = buffer[offset++];
      }
      this.targetObject.needsUpdate = true;
    }
    _setValue_array_setMatrixWorldNeedsUpdate(buffer, offset) {
      const dest = this.resolvedProperty;
      for (let i2 = 0, n2 = dest.length; i2 !== n2; ++i2) {
        dest[i2] = buffer[offset++];
      }
      this.targetObject.matrixWorldNeedsUpdate = true;
    }
    // ArrayElement
    _setValue_arrayElement(buffer, offset) {
      this.resolvedProperty[this.propertyIndex] = buffer[offset];
    }
    _setValue_arrayElement_setNeedsUpdate(buffer, offset) {
      this.resolvedProperty[this.propertyIndex] = buffer[offset];
      this.targetObject.needsUpdate = true;
    }
    _setValue_arrayElement_setMatrixWorldNeedsUpdate(buffer, offset) {
      this.resolvedProperty[this.propertyIndex] = buffer[offset];
      this.targetObject.matrixWorldNeedsUpdate = true;
    }
    // HasToFromArray
    _setValue_fromArray(buffer, offset) {
      this.resolvedProperty.fromArray(buffer, offset);
    }
    _setValue_fromArray_setNeedsUpdate(buffer, offset) {
      this.resolvedProperty.fromArray(buffer, offset);
      this.targetObject.needsUpdate = true;
    }
    _setValue_fromArray_setMatrixWorldNeedsUpdate(buffer, offset) {
      this.resolvedProperty.fromArray(buffer, offset);
      this.targetObject.matrixWorldNeedsUpdate = true;
    }
    _getValue_unbound(targetArray, offset) {
      this.bind();
      this.getValue(targetArray, offset);
    }
    _setValue_unbound(sourceArray, offset) {
      this.bind();
      this.setValue(sourceArray, offset);
    }
    // create getter / setter pair for a property in the scene graph
    bind() {
      let targetObject = this.node;
      const parsedPath = this.parsedPath;
      const objectName = parsedPath.objectName;
      const propertyName = parsedPath.propertyName;
      let propertyIndex = parsedPath.propertyIndex;
      if (!targetObject) {
        targetObject = _PropertyBinding.findNode(this.rootNode, parsedPath.nodeName);
        this.node = targetObject;
      }
      this.getValue = this._getValue_unavailable;
      this.setValue = this._setValue_unavailable;
      if (!targetObject) {
        console.warn("THREE.PropertyBinding: No target node found for track: " + this.path + ".");
        return;
      }
      if (objectName) {
        let objectIndex = parsedPath.objectIndex;
        switch (objectName) {
          case "materials":
            if (!targetObject.material) {
              console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.", this);
              return;
            }
            if (!targetObject.material.materials) {
              console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.", this);
              return;
            }
            targetObject = targetObject.material.materials;
            break;
          case "bones":
            if (!targetObject.skeleton) {
              console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.", this);
              return;
            }
            targetObject = targetObject.skeleton.bones;
            for (let i2 = 0; i2 < targetObject.length; i2++) {
              if (targetObject[i2].name === objectIndex) {
                objectIndex = i2;
                break;
              }
            }
            break;
          case "map":
            if ("map" in targetObject) {
              targetObject = targetObject.map;
              break;
            }
            if (!targetObject.material) {
              console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.", this);
              return;
            }
            if (!targetObject.material.map) {
              console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.", this);
              return;
            }
            targetObject = targetObject.material.map;
            break;
          default:
            if (targetObject[objectName] === void 0) {
              console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.", this);
              return;
            }
            targetObject = targetObject[objectName];
        }
        if (objectIndex !== void 0) {
          if (targetObject[objectIndex] === void 0) {
            console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.", this, targetObject);
            return;
          }
          targetObject = targetObject[objectIndex];
        }
      }
      const nodeProperty = targetObject[propertyName];
      if (nodeProperty === void 0) {
        const nodeName = parsedPath.nodeName;
        console.error("THREE.PropertyBinding: Trying to update property for track: " + nodeName + "." + propertyName + " but it wasn't found.", targetObject);
        return;
      }
      let versioning = this.Versioning.None;
      this.targetObject = targetObject;
      if (targetObject.needsUpdate !== void 0) {
        versioning = this.Versioning.NeedsUpdate;
      } else if (targetObject.matrixWorldNeedsUpdate !== void 0) {
        versioning = this.Versioning.MatrixWorldNeedsUpdate;
      }
      let bindingType = this.BindingType.Direct;
      if (propertyIndex !== void 0) {
        if (propertyName === "morphTargetInfluences") {
          if (!targetObject.geometry) {
            console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.", this);
            return;
          }
          if (!targetObject.geometry.morphAttributes) {
            console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.", this);
            return;
          }
          if (targetObject.morphTargetDictionary[propertyIndex] !== void 0) {
            propertyIndex = targetObject.morphTargetDictionary[propertyIndex];
          }
        }
        bindingType = this.BindingType.ArrayElement;
        this.resolvedProperty = nodeProperty;
        this.propertyIndex = propertyIndex;
      } else if (nodeProperty.fromArray !== void 0 && nodeProperty.toArray !== void 0) {
        bindingType = this.BindingType.HasFromToArray;
        this.resolvedProperty = nodeProperty;
      } else if (Array.isArray(nodeProperty)) {
        bindingType = this.BindingType.EntireArray;
        this.resolvedProperty = nodeProperty;
      } else {
        this.propertyName = propertyName;
      }
      this.getValue = this.GetterByBindingType[bindingType];
      this.setValue = this.SetterByBindingTypeAndVersioning[bindingType][versioning];
    }
    unbind() {
      this.node = null;
      this.getValue = this._getValue_unbound;
      this.setValue = this._setValue_unbound;
    }
  };
  PropertyBinding.Composite = Composite;
  PropertyBinding.prototype.BindingType = {
    Direct: 0,
    EntireArray: 1,
    ArrayElement: 2,
    HasFromToArray: 3
  };
  PropertyBinding.prototype.Versioning = {
    None: 0,
    NeedsUpdate: 1,
    MatrixWorldNeedsUpdate: 2
  };
  PropertyBinding.prototype.GetterByBindingType = [
    PropertyBinding.prototype._getValue_direct,
    PropertyBinding.prototype._getValue_array,
    PropertyBinding.prototype._getValue_arrayElement,
    PropertyBinding.prototype._getValue_toArray
  ];
  PropertyBinding.prototype.SetterByBindingTypeAndVersioning = [
    [
      // Direct
      PropertyBinding.prototype._setValue_direct,
      PropertyBinding.prototype._setValue_direct_setNeedsUpdate,
      PropertyBinding.prototype._setValue_direct_setMatrixWorldNeedsUpdate
    ],
    [
      // EntireArray
      PropertyBinding.prototype._setValue_array,
      PropertyBinding.prototype._setValue_array_setNeedsUpdate,
      PropertyBinding.prototype._setValue_array_setMatrixWorldNeedsUpdate
    ],
    [
      // ArrayElement
      PropertyBinding.prototype._setValue_arrayElement,
      PropertyBinding.prototype._setValue_arrayElement_setNeedsUpdate,
      PropertyBinding.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate
    ],
    [
      // HasToFromArray
      PropertyBinding.prototype._setValue_fromArray,
      PropertyBinding.prototype._setValue_fromArray_setNeedsUpdate,
      PropertyBinding.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate
    ]
  ];
  var _controlInterpolantsResultBuffer = new Float32Array(1);
  function getByteLength(width, height, format, type) {
    const typeByteLength = getTextureTypeByteLength(type);
    switch (format) {
      // https://registry.khronos.org/OpenGL-Refpages/es3.0/html/glTexImage2D.xhtml
      case AlphaFormat:
        return width * height;
      case LuminanceFormat:
        return width * height;
      case LuminanceAlphaFormat:
        return width * height * 2;
      case RedFormat:
        return width * height / typeByteLength.components * typeByteLength.byteLength;
      case RedIntegerFormat:
        return width * height / typeByteLength.components * typeByteLength.byteLength;
      case RGFormat:
        return width * height * 2 / typeByteLength.components * typeByteLength.byteLength;
      case RGIntegerFormat:
        return width * height * 2 / typeByteLength.components * typeByteLength.byteLength;
      case RGBFormat:
        return width * height * 3 / typeByteLength.components * typeByteLength.byteLength;
      case RGBAFormat:
        return width * height * 4 / typeByteLength.components * typeByteLength.byteLength;
      case RGBAIntegerFormat:
        return width * height * 4 / typeByteLength.components * typeByteLength.byteLength;
      // https://registry.khronos.org/webgl/extensions/WEBGL_compressed_texture_s3tc_srgb/
      case RGB_S3TC_DXT1_Format:
      case RGBA_S3TC_DXT1_Format:
        return Math.floor((width + 3) / 4) * Math.floor((height + 3) / 4) * 8;
      case RGBA_S3TC_DXT3_Format:
      case RGBA_S3TC_DXT5_Format:
        return Math.floor((width + 3) / 4) * Math.floor((height + 3) / 4) * 16;
      // https://registry.khronos.org/webgl/extensions/WEBGL_compressed_texture_pvrtc/
      case RGB_PVRTC_2BPPV1_Format:
      case RGBA_PVRTC_2BPPV1_Format:
        return Math.max(width, 16) * Math.max(height, 8) / 4;
      case RGB_PVRTC_4BPPV1_Format:
      case RGBA_PVRTC_4BPPV1_Format:
        return Math.max(width, 8) * Math.max(height, 8) / 2;
      // https://registry.khronos.org/webgl/extensions/WEBGL_compressed_texture_etc/
      case RGB_ETC1_Format:
      case RGB_ETC2_Format:
        return Math.floor((width + 3) / 4) * Math.floor((height + 3) / 4) * 8;
      case RGBA_ETC2_EAC_Format:
        return Math.floor((width + 3) / 4) * Math.floor((height + 3) / 4) * 16;
      // https://registry.khronos.org/webgl/extensions/WEBGL_compressed_texture_astc/
      case RGBA_ASTC_4x4_Format:
        return Math.floor((width + 3) / 4) * Math.floor((height + 3) / 4) * 16;
      case RGBA_ASTC_5x4_Format:
        return Math.floor((width + 4) / 5) * Math.floor((height + 3) / 4) * 16;
      case RGBA_ASTC_5x5_Format:
        return Math.floor((width + 4) / 5) * Math.floor((height + 4) / 5) * 16;
      case RGBA_ASTC_6x5_Format:
        return Math.floor((width + 5) / 6) * Math.floor((height + 4) / 5) * 16;
      case RGBA_ASTC_6x6_Format:
        return Math.floor((width + 5) / 6) * Math.floor((height + 5) / 6) * 16;
      case RGBA_ASTC_8x5_Format:
        return Math.floor((width + 7) / 8) * Math.floor((height + 4) / 5) * 16;
      case RGBA_ASTC_8x6_Format:
        return Math.floor((width + 7) / 8) * Math.floor((height + 5) / 6) * 16;
      case RGBA_ASTC_8x8_Format:
        return Math.floor((width + 7) / 8) * Math.floor((height + 7) / 8) * 16;
      case RGBA_ASTC_10x5_Format:
        return Math.floor((width + 9) / 10) * Math.floor((height + 4) / 5) * 16;
      case RGBA_ASTC_10x6_Format:
        return Math.floor((width + 9) / 10) * Math.floor((height + 5) / 6) * 16;
      case RGBA_ASTC_10x8_Format:
        return Math.floor((width + 9) / 10) * Math.floor((height + 7) / 8) * 16;
      case RGBA_ASTC_10x10_Format:
        return Math.floor((width + 9) / 10) * Math.floor((height + 9) / 10) * 16;
      case RGBA_ASTC_12x10_Format:
        return Math.floor((width + 11) / 12) * Math.floor((height + 9) / 10) * 16;
      case RGBA_ASTC_12x12_Format:
        return Math.floor((width + 11) / 12) * Math.floor((height + 11) / 12) * 16;
      // https://registry.khronos.org/webgl/extensions/EXT_texture_compression_bptc/
      case RGBA_BPTC_Format:
      case RGB_BPTC_SIGNED_Format:
      case RGB_BPTC_UNSIGNED_Format:
        return Math.ceil(width / 4) * Math.ceil(height / 4) * 16;
      // https://registry.khronos.org/webgl/extensions/EXT_texture_compression_rgtc/
      case RED_RGTC1_Format:
      case SIGNED_RED_RGTC1_Format:
        return Math.ceil(width / 4) * Math.ceil(height / 4) * 8;
      case RED_GREEN_RGTC2_Format:
      case SIGNED_RED_GREEN_RGTC2_Format:
        return Math.ceil(width / 4) * Math.ceil(height / 4) * 16;
    }
    throw new Error(
      `Unable to determine texture byte length for ${format} format.`
    );
  }
  function getTextureTypeByteLength(type) {
    switch (type) {
      case UnsignedByteType:
      case ByteType:
        return { byteLength: 1, components: 1 };
      case UnsignedShortType:
      case ShortType:
      case HalfFloatType:
        return { byteLength: 2, components: 1 };
      case UnsignedShort4444Type:
      case UnsignedShort5551Type:
        return { byteLength: 2, components: 4 };
      case UnsignedIntType:
      case IntType:
      case FloatType:
        return { byteLength: 4, components: 1 };
      case UnsignedInt5999Type:
        return { byteLength: 4, components: 3 };
    }
    throw new Error(`Unknown texture type ${type}.`);
  }
  if (typeof __THREE_DEVTOOLS__ !== "undefined") {
    __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register", { detail: {
      revision: REVISION
    } }));
  }
  if (typeof window !== "undefined") {
    if (window.__THREE__) {
      console.warn("WARNING: Multiple instances of Three.js being imported.");
    } else {
      window.__THREE__ = REVISION;
    }
  }

  // node_modules/three/build/three.module.js
  function WebGLAnimation() {
    let context = null;
    let isAnimating = false;
    let animationLoop = null;
    let requestId = null;
    function onAnimationFrame(time, frame) {
      animationLoop(time, frame);
      requestId = context.requestAnimationFrame(onAnimationFrame);
    }
    return {
      start: function() {
        if (isAnimating === true) return;
        if (animationLoop === null) return;
        requestId = context.requestAnimationFrame(onAnimationFrame);
        isAnimating = true;
      },
      stop: function() {
        context.cancelAnimationFrame(requestId);
        isAnimating = false;
      },
      setAnimationLoop: function(callback) {
        animationLoop = callback;
      },
      setContext: function(value) {
        context = value;
      }
    };
  }
  function WebGLAttributes(gl) {
    const buffers = /* @__PURE__ */ new WeakMap();
    function createBuffer(attribute, bufferType) {
      const array = attribute.array;
      const usage = attribute.usage;
      const size = array.byteLength;
      const buffer = gl.createBuffer();
      gl.bindBuffer(bufferType, buffer);
      gl.bufferData(bufferType, array, usage);
      attribute.onUploadCallback();
      let type;
      if (array instanceof Float32Array) {
        type = gl.FLOAT;
      } else if (array instanceof Uint16Array) {
        if (attribute.isFloat16BufferAttribute) {
          type = gl.HALF_FLOAT;
        } else {
          type = gl.UNSIGNED_SHORT;
        }
      } else if (array instanceof Int16Array) {
        type = gl.SHORT;
      } else if (array instanceof Uint32Array) {
        type = gl.UNSIGNED_INT;
      } else if (array instanceof Int32Array) {
        type = gl.INT;
      } else if (array instanceof Int8Array) {
        type = gl.BYTE;
      } else if (array instanceof Uint8Array) {
        type = gl.UNSIGNED_BYTE;
      } else if (array instanceof Uint8ClampedArray) {
        type = gl.UNSIGNED_BYTE;
      } else {
        throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: " + array);
      }
      return {
        buffer,
        type,
        bytesPerElement: array.BYTES_PER_ELEMENT,
        version: attribute.version,
        size
      };
    }
    function updateBuffer(buffer, attribute, bufferType) {
      const array = attribute.array;
      const updateRanges = attribute.updateRanges;
      gl.bindBuffer(bufferType, buffer);
      if (updateRanges.length === 0) {
        gl.bufferSubData(bufferType, 0, array);
      } else {
        updateRanges.sort((a2, b2) => a2.start - b2.start);
        let mergeIndex = 0;
        for (let i2 = 1; i2 < updateRanges.length; i2++) {
          const previousRange = updateRanges[mergeIndex];
          const range = updateRanges[i2];
          if (range.start <= previousRange.start + previousRange.count + 1) {
            previousRange.count = Math.max(
              previousRange.count,
              range.start + range.count - previousRange.start
            );
          } else {
            ++mergeIndex;
            updateRanges[mergeIndex] = range;
          }
        }
        updateRanges.length = mergeIndex + 1;
        for (let i2 = 0, l2 = updateRanges.length; i2 < l2; i2++) {
          const range = updateRanges[i2];
          gl.bufferSubData(
            bufferType,
            range.start * array.BYTES_PER_ELEMENT,
            array,
            range.start,
            range.count
          );
        }
        attribute.clearUpdateRanges();
      }
      attribute.onUploadCallback();
    }
    function get(attribute) {
      if (attribute.isInterleavedBufferAttribute) attribute = attribute.data;
      return buffers.get(attribute);
    }
    function remove(attribute) {
      if (attribute.isInterleavedBufferAttribute) attribute = attribute.data;
      const data = buffers.get(attribute);
      if (data) {
        gl.deleteBuffer(data.buffer);
        buffers.delete(attribute);
      }
    }
    function update(attribute, bufferType) {
      if (attribute.isInterleavedBufferAttribute) attribute = attribute.data;
      if (attribute.isGLBufferAttribute) {
        const cached = buffers.get(attribute);
        if (!cached || cached.version < attribute.version) {
          buffers.set(attribute, {
            buffer: attribute.buffer,
            type: attribute.type,
            bytesPerElement: attribute.elementSize,
            version: attribute.version
          });
        }
        return;
      }
      const data = buffers.get(attribute);
      if (data === void 0) {
        buffers.set(attribute, createBuffer(attribute, bufferType));
      } else if (data.version < attribute.version) {
        if (data.size !== attribute.array.byteLength) {
          throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");
        }
        updateBuffer(data.buffer, attribute, bufferType);
        data.version = attribute.version;
      }
    }
    return {
      get,
      remove,
      update
    };
  }
  var alphahash_fragment = "#ifdef USE_ALPHAHASH\n	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;\n#endif";
  var alphahash_pars_fragment = "#ifdef USE_ALPHAHASH\n	const float ALPHA_HASH_SCALE = 0.05;\n	float hash2D( vec2 value ) {\n		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );\n	}\n	float hash3D( vec3 value ) {\n		return hash2D( vec2( hash2D( value.xy ), value.z ) );\n	}\n	float getAlphaHashThreshold( vec3 position ) {\n		float maxDeriv = max(\n			length( dFdx( position.xyz ) ),\n			length( dFdy( position.xyz ) )\n		);\n		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );\n		vec2 pixScales = vec2(\n			exp2( floor( log2( pixScale ) ) ),\n			exp2( ceil( log2( pixScale ) ) )\n		);\n		vec2 alpha = vec2(\n			hash3D( floor( pixScales.x * position.xyz ) ),\n			hash3D( floor( pixScales.y * position.xyz ) )\n		);\n		float lerpFactor = fract( log2( pixScale ) );\n		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;\n		float a = min( lerpFactor, 1.0 - lerpFactor );\n		vec3 cases = vec3(\n			x * x / ( 2.0 * a * ( 1.0 - a ) ),\n			( x - 0.5 * a ) / ( 1.0 - a ),\n			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )\n		);\n		float threshold = ( x < ( 1.0 - a ) )\n			? ( ( x < a ) ? cases.x : cases.y )\n			: cases.z;\n		return clamp( threshold , 1.0e-6, 1.0 );\n	}\n#endif";
  var alphamap_fragment = "#ifdef USE_ALPHAMAP\n	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;\n#endif";
  var alphamap_pars_fragment = "#ifdef USE_ALPHAMAP\n	uniform sampler2D alphaMap;\n#endif";
  var alphatest_fragment = "#ifdef USE_ALPHATEST\n	#ifdef ALPHA_TO_COVERAGE\n	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );\n	if ( diffuseColor.a == 0.0 ) discard;\n	#else\n	if ( diffuseColor.a < alphaTest ) discard;\n	#endif\n#endif";
  var alphatest_pars_fragment = "#ifdef USE_ALPHATEST\n	uniform float alphaTest;\n#endif";
  var aomap_fragment = "#ifdef USE_AOMAP\n	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;\n	reflectedLight.indirectDiffuse *= ambientOcclusion;\n	#if defined( USE_CLEARCOAT ) \n		clearcoatSpecularIndirect *= ambientOcclusion;\n	#endif\n	#if defined( USE_SHEEN ) \n		sheenSpecularIndirect *= ambientOcclusion;\n	#endif\n	#if defined( USE_ENVMAP ) && defined( STANDARD )\n		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );\n		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );\n	#endif\n#endif";
  var aomap_pars_fragment = "#ifdef USE_AOMAP\n	uniform sampler2D aoMap;\n	uniform float aoMapIntensity;\n#endif";
  var batching_pars_vertex = "#ifdef USE_BATCHING\n	#if ! defined( GL_ANGLE_multi_draw )\n	#define gl_DrawID _gl_DrawID\n	uniform int _gl_DrawID;\n	#endif\n	uniform highp sampler2D batchingTexture;\n	uniform highp usampler2D batchingIdTexture;\n	mat4 getBatchingMatrix( const in float i ) {\n		int size = textureSize( batchingTexture, 0 ).x;\n		int j = int( i ) * 4;\n		int x = j % size;\n		int y = j / size;\n		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );\n		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );\n		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );\n		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );\n		return mat4( v1, v2, v3, v4 );\n	}\n	float getIndirectIndex( const in int i ) {\n		int size = textureSize( batchingIdTexture, 0 ).x;\n		int x = i % size;\n		int y = i / size;\n		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );\n	}\n#endif\n#ifdef USE_BATCHING_COLOR\n	uniform sampler2D batchingColorTexture;\n	vec3 getBatchingColor( const in float i ) {\n		int size = textureSize( batchingColorTexture, 0 ).x;\n		int j = int( i );\n		int x = j % size;\n		int y = j / size;\n		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;\n	}\n#endif";
  var batching_vertex = "#ifdef USE_BATCHING\n	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );\n#endif";
  var begin_vertex = "vec3 transformed = vec3( position );\n#ifdef USE_ALPHAHASH\n	vPosition = vec3( position );\n#endif";
  var beginnormal_vertex = "vec3 objectNormal = vec3( normal );\n#ifdef USE_TANGENT\n	vec3 objectTangent = vec3( tangent.xyz );\n#endif";
  var bsdfs = "float G_BlinnPhong_Implicit( ) {\n	return 0.25;\n}\nfloat D_BlinnPhong( const in float shininess, const in float dotNH ) {\n	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );\n}\nvec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {\n	vec3 halfDir = normalize( lightDir + viewDir );\n	float dotNH = saturate( dot( normal, halfDir ) );\n	float dotVH = saturate( dot( viewDir, halfDir ) );\n	vec3 F = F_Schlick( specularColor, 1.0, dotVH );\n	float G = G_BlinnPhong_Implicit( );\n	float D = D_BlinnPhong( shininess, dotNH );\n	return F * ( G * D );\n} // validated";
  var iridescence_fragment = "#ifdef USE_IRIDESCENCE\n	const mat3 XYZ_TO_REC709 = mat3(\n		 3.2404542, -0.9692660,  0.0556434,\n		-1.5371385,  1.8760108, -0.2040259,\n		-0.4985314,  0.0415560,  1.0572252\n	);\n	vec3 Fresnel0ToIor( vec3 fresnel0 ) {\n		vec3 sqrtF0 = sqrt( fresnel0 );\n		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );\n	}\n	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {\n		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );\n	}\n	float IorToFresnel0( float transmittedIor, float incidentIor ) {\n		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));\n	}\n	vec3 evalSensitivity( float OPD, vec3 shift ) {\n		float phase = 2.0 * PI * OPD * 1.0e-9;\n		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );\n		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );\n		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );\n		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );\n		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );\n		xyz /= 1.0685e-7;\n		vec3 rgb = XYZ_TO_REC709 * xyz;\n		return rgb;\n	}\n	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {\n		vec3 I;\n		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );\n		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );\n		float cosTheta2Sq = 1.0 - sinTheta2Sq;\n		if ( cosTheta2Sq < 0.0 ) {\n			return vec3( 1.0 );\n		}\n		float cosTheta2 = sqrt( cosTheta2Sq );\n		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );\n		float R12 = F_Schlick( R0, 1.0, cosTheta1 );\n		float T121 = 1.0 - R12;\n		float phi12 = 0.0;\n		if ( iridescenceIOR < outsideIOR ) phi12 = PI;\n		float phi21 = PI - phi12;\n		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );\n		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );\n		vec3 phi23 = vec3( 0.0 );\n		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;\n		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;\n		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;\n		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;\n		vec3 phi = vec3( phi21 ) + phi23;\n		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );\n		vec3 r123 = sqrt( R123 );\n		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );\n		vec3 C0 = R12 + Rs;\n		I = C0;\n		vec3 Cm = Rs - T121;\n		for ( int m = 1; m <= 2; ++ m ) {\n			Cm *= r123;\n			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );\n			I += Cm * Sm;\n		}\n		return max( I, vec3( 0.0 ) );\n	}\n#endif";
  var bumpmap_pars_fragment = "#ifdef USE_BUMPMAP\n	uniform sampler2D bumpMap;\n	uniform float bumpScale;\n	vec2 dHdxy_fwd() {\n		vec2 dSTdx = dFdx( vBumpMapUv );\n		vec2 dSTdy = dFdy( vBumpMapUv );\n		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;\n		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;\n		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;\n		return vec2( dBx, dBy );\n	}\n	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {\n		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );\n		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );\n		vec3 vN = surf_norm;\n		vec3 R1 = cross( vSigmaY, vN );\n		vec3 R2 = cross( vN, vSigmaX );\n		float fDet = dot( vSigmaX, R1 ) * faceDirection;\n		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );\n		return normalize( abs( fDet ) * surf_norm - vGrad );\n	}\n#endif";
  var clipping_planes_fragment = "#if NUM_CLIPPING_PLANES > 0\n	vec4 plane;\n	#ifdef ALPHA_TO_COVERAGE\n		float distanceToPlane, distanceGradient;\n		float clipOpacity = 1.0;\n		#pragma unroll_loop_start\n		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {\n			plane = clippingPlanes[ i ];\n			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;\n			distanceGradient = fwidth( distanceToPlane ) / 2.0;\n			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );\n			if ( clipOpacity == 0.0 ) discard;\n		}\n		#pragma unroll_loop_end\n		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES\n			float unionClipOpacity = 1.0;\n			#pragma unroll_loop_start\n			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {\n				plane = clippingPlanes[ i ];\n				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;\n				distanceGradient = fwidth( distanceToPlane ) / 2.0;\n				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );\n			}\n			#pragma unroll_loop_end\n			clipOpacity *= 1.0 - unionClipOpacity;\n		#endif\n		diffuseColor.a *= clipOpacity;\n		if ( diffuseColor.a == 0.0 ) discard;\n	#else\n		#pragma unroll_loop_start\n		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {\n			plane = clippingPlanes[ i ];\n			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;\n		}\n		#pragma unroll_loop_end\n		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES\n			bool clipped = true;\n			#pragma unroll_loop_start\n			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {\n				plane = clippingPlanes[ i ];\n				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;\n			}\n			#pragma unroll_loop_end\n			if ( clipped ) discard;\n		#endif\n	#endif\n#endif";
  var clipping_planes_pars_fragment = "#if NUM_CLIPPING_PLANES > 0\n	varying vec3 vClipPosition;\n	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];\n#endif";
  var clipping_planes_pars_vertex = "#if NUM_CLIPPING_PLANES > 0\n	varying vec3 vClipPosition;\n#endif";
  var clipping_planes_vertex = "#if NUM_CLIPPING_PLANES > 0\n	vClipPosition = - mvPosition.xyz;\n#endif";
  var color_fragment = "#if defined( USE_COLOR_ALPHA )\n	diffuseColor *= vColor;\n#elif defined( USE_COLOR )\n	diffuseColor.rgb *= vColor;\n#endif";
  var color_pars_fragment = "#if defined( USE_COLOR_ALPHA )\n	varying vec4 vColor;\n#elif defined( USE_COLOR )\n	varying vec3 vColor;\n#endif";
  var color_pars_vertex = "#if defined( USE_COLOR_ALPHA )\n	varying vec4 vColor;\n#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )\n	varying vec3 vColor;\n#endif";
  var color_vertex = "#if defined( USE_COLOR_ALPHA )\n	vColor = vec4( 1.0 );\n#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )\n	vColor = vec3( 1.0 );\n#endif\n#ifdef USE_COLOR\n	vColor *= color;\n#endif\n#ifdef USE_INSTANCING_COLOR\n	vColor.xyz *= instanceColor.xyz;\n#endif\n#ifdef USE_BATCHING_COLOR\n	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );\n	vColor.xyz *= batchingColor.xyz;\n#endif";
  var common = "#define PI 3.141592653589793\n#define PI2 6.283185307179586\n#define PI_HALF 1.5707963267948966\n#define RECIPROCAL_PI 0.3183098861837907\n#define RECIPROCAL_PI2 0.15915494309189535\n#define EPSILON 1e-6\n#ifndef saturate\n#define saturate( a ) clamp( a, 0.0, 1.0 )\n#endif\n#define whiteComplement( a ) ( 1.0 - saturate( a ) )\nfloat pow2( const in float x ) { return x*x; }\nvec3 pow2( const in vec3 x ) { return x*x; }\nfloat pow3( const in float x ) { return x*x*x; }\nfloat pow4( const in float x ) { float x2 = x*x; return x2*x2; }\nfloat max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }\nfloat average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }\nhighp float rand( const in vec2 uv ) {\n	const highp float a = 12.9898, b = 78.233, c = 43758.5453;\n	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );\n	return fract( sin( sn ) * c );\n}\n#ifdef HIGH_PRECISION\n	float precisionSafeLength( vec3 v ) { return length( v ); }\n#else\n	float precisionSafeLength( vec3 v ) {\n		float maxComponent = max3( abs( v ) );\n		return length( v / maxComponent ) * maxComponent;\n	}\n#endif\nstruct IncidentLight {\n	vec3 color;\n	vec3 direction;\n	bool visible;\n};\nstruct ReflectedLight {\n	vec3 directDiffuse;\n	vec3 directSpecular;\n	vec3 indirectDiffuse;\n	vec3 indirectSpecular;\n};\n#ifdef USE_ALPHAHASH\n	varying vec3 vPosition;\n#endif\nvec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n}\nvec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {\n	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );\n}\nmat3 transposeMat3( const in mat3 m ) {\n	mat3 tmp;\n	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );\n	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );\n	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );\n	return tmp;\n}\nbool isPerspectiveMatrix( mat4 m ) {\n	return m[ 2 ][ 3 ] == - 1.0;\n}\nvec2 equirectUv( in vec3 dir ) {\n	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;\n	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n	return vec2( u, v );\n}\nvec3 BRDF_Lambert( const in vec3 diffuseColor ) {\n	return RECIPROCAL_PI * diffuseColor;\n}\nvec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {\n	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );\n	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );\n}\nfloat F_Schlick( const in float f0, const in float f90, const in float dotVH ) {\n	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );\n	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );\n} // validated";
  var cube_uv_reflection_fragment = "#ifdef ENVMAP_TYPE_CUBE_UV\n	#define cubeUV_minMipLevel 4.0\n	#define cubeUV_minTileSize 16.0\n	float getFace( vec3 direction ) {\n		vec3 absDirection = abs( direction );\n		float face = - 1.0;\n		if ( absDirection.x > absDirection.z ) {\n			if ( absDirection.x > absDirection.y )\n				face = direction.x > 0.0 ? 0.0 : 3.0;\n			else\n				face = direction.y > 0.0 ? 1.0 : 4.0;\n		} else {\n			if ( absDirection.z > absDirection.y )\n				face = direction.z > 0.0 ? 2.0 : 5.0;\n			else\n				face = direction.y > 0.0 ? 1.0 : 4.0;\n		}\n		return face;\n	}\n	vec2 getUV( vec3 direction, float face ) {\n		vec2 uv;\n		if ( face == 0.0 ) {\n			uv = vec2( direction.z, direction.y ) / abs( direction.x );\n		} else if ( face == 1.0 ) {\n			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );\n		} else if ( face == 2.0 ) {\n			uv = vec2( - direction.x, direction.y ) / abs( direction.z );\n		} else if ( face == 3.0 ) {\n			uv = vec2( - direction.z, direction.y ) / abs( direction.x );\n		} else if ( face == 4.0 ) {\n			uv = vec2( - direction.x, direction.z ) / abs( direction.y );\n		} else {\n			uv = vec2( direction.x, direction.y ) / abs( direction.z );\n		}\n		return 0.5 * ( uv + 1.0 );\n	}\n	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {\n		float face = getFace( direction );\n		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );\n		mipInt = max( mipInt, cubeUV_minMipLevel );\n		float faceSize = exp2( mipInt );\n		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;\n		if ( face > 2.0 ) {\n			uv.y += faceSize;\n			face -= 3.0;\n		}\n		uv.x += face * faceSize;\n		uv.x += filterInt * 3.0 * cubeUV_minTileSize;\n		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );\n		uv.x *= CUBEUV_TEXEL_WIDTH;\n		uv.y *= CUBEUV_TEXEL_HEIGHT;\n		#ifdef texture2DGradEXT\n			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;\n		#else\n			return texture2D( envMap, uv ).rgb;\n		#endif\n	}\n	#define cubeUV_r0 1.0\n	#define cubeUV_m0 - 2.0\n	#define cubeUV_r1 0.8\n	#define cubeUV_m1 - 1.0\n	#define cubeUV_r4 0.4\n	#define cubeUV_m4 2.0\n	#define cubeUV_r5 0.305\n	#define cubeUV_m5 3.0\n	#define cubeUV_r6 0.21\n	#define cubeUV_m6 4.0\n	float roughnessToMip( float roughness ) {\n		float mip = 0.0;\n		if ( roughness >= cubeUV_r1 ) {\n			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;\n		} else if ( roughness >= cubeUV_r4 ) {\n			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;\n		} else if ( roughness >= cubeUV_r5 ) {\n			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;\n		} else if ( roughness >= cubeUV_r6 ) {\n			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;\n		} else {\n			mip = - 2.0 * log2( 1.16 * roughness );		}\n		return mip;\n	}\n	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {\n		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );\n		float mipF = fract( mip );\n		float mipInt = floor( mip );\n		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );\n		if ( mipF == 0.0 ) {\n			return vec4( color0, 1.0 );\n		} else {\n			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );\n			return vec4( mix( color0, color1, mipF ), 1.0 );\n		}\n	}\n#endif";
  var defaultnormal_vertex = "vec3 transformedNormal = objectNormal;\n#ifdef USE_TANGENT\n	vec3 transformedTangent = objectTangent;\n#endif\n#ifdef USE_BATCHING\n	mat3 bm = mat3( batchingMatrix );\n	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );\n	transformedNormal = bm * transformedNormal;\n	#ifdef USE_TANGENT\n		transformedTangent = bm * transformedTangent;\n	#endif\n#endif\n#ifdef USE_INSTANCING\n	mat3 im = mat3( instanceMatrix );\n	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );\n	transformedNormal = im * transformedNormal;\n	#ifdef USE_TANGENT\n		transformedTangent = im * transformedTangent;\n	#endif\n#endif\ntransformedNormal = normalMatrix * transformedNormal;\n#ifdef FLIP_SIDED\n	transformedNormal = - transformedNormal;\n#endif\n#ifdef USE_TANGENT\n	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;\n	#ifdef FLIP_SIDED\n		transformedTangent = - transformedTangent;\n	#endif\n#endif";
  var displacementmap_pars_vertex = "#ifdef USE_DISPLACEMENTMAP\n	uniform sampler2D displacementMap;\n	uniform float displacementScale;\n	uniform float displacementBias;\n#endif";
  var displacementmap_vertex = "#ifdef USE_DISPLACEMENTMAP\n	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );\n#endif";
  var emissivemap_fragment = "#ifdef USE_EMISSIVEMAP\n	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );\n	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE\n		emissiveColor = sRGBTransferEOTF( emissiveColor );\n	#endif\n	totalEmissiveRadiance *= emissiveColor.rgb;\n#endif";
  var emissivemap_pars_fragment = "#ifdef USE_EMISSIVEMAP\n	uniform sampler2D emissiveMap;\n#endif";
  var colorspace_fragment = "gl_FragColor = linearToOutputTexel( gl_FragColor );";
  var colorspace_pars_fragment = "vec4 LinearTransferOETF( in vec4 value ) {\n	return value;\n}\nvec4 sRGBTransferEOTF( in vec4 value ) {\n	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );\n}\nvec4 sRGBTransferOETF( in vec4 value ) {\n	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );\n}";
  var envmap_fragment = "#ifdef USE_ENVMAP\n	#ifdef ENV_WORLDPOS\n		vec3 cameraToFrag;\n		if ( isOrthographic ) {\n			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );\n		} else {\n			cameraToFrag = normalize( vWorldPosition - cameraPosition );\n		}\n		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n		#ifdef ENVMAP_MODE_REFLECTION\n			vec3 reflectVec = reflect( cameraToFrag, worldNormal );\n		#else\n			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );\n		#endif\n	#else\n		vec3 reflectVec = vReflect;\n	#endif\n	#ifdef ENVMAP_TYPE_CUBE\n		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n	#else\n		vec4 envColor = vec4( 0.0 );\n	#endif\n	#ifdef ENVMAP_BLENDING_MULTIPLY\n		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );\n	#elif defined( ENVMAP_BLENDING_MIX )\n		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );\n	#elif defined( ENVMAP_BLENDING_ADD )\n		outgoingLight += envColor.xyz * specularStrength * reflectivity;\n	#endif\n#endif";
  var envmap_common_pars_fragment = "#ifdef USE_ENVMAP\n	uniform float envMapIntensity;\n	uniform float flipEnvMap;\n	uniform mat3 envMapRotation;\n	#ifdef ENVMAP_TYPE_CUBE\n		uniform samplerCube envMap;\n	#else\n		uniform sampler2D envMap;\n	#endif\n	\n#endif";
  var envmap_pars_fragment = "#ifdef USE_ENVMAP\n	uniform float reflectivity;\n	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )\n		#define ENV_WORLDPOS\n	#endif\n	#ifdef ENV_WORLDPOS\n		varying vec3 vWorldPosition;\n		uniform float refractionRatio;\n	#else\n		varying vec3 vReflect;\n	#endif\n#endif";
  var envmap_pars_vertex = "#ifdef USE_ENVMAP\n	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )\n		#define ENV_WORLDPOS\n	#endif\n	#ifdef ENV_WORLDPOS\n		\n		varying vec3 vWorldPosition;\n	#else\n		varying vec3 vReflect;\n		uniform float refractionRatio;\n	#endif\n#endif";
  var envmap_vertex = "#ifdef USE_ENVMAP\n	#ifdef ENV_WORLDPOS\n		vWorldPosition = worldPosition.xyz;\n	#else\n		vec3 cameraToVertex;\n		if ( isOrthographic ) {\n			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );\n		} else {\n			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );\n		}\n		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );\n		#ifdef ENVMAP_MODE_REFLECTION\n			vReflect = reflect( cameraToVertex, worldNormal );\n		#else\n			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );\n		#endif\n	#endif\n#endif";
  var fog_vertex = "#ifdef USE_FOG\n	vFogDepth = - mvPosition.z;\n#endif";
  var fog_pars_vertex = "#ifdef USE_FOG\n	varying float vFogDepth;\n#endif";
  var fog_fragment = "#ifdef USE_FOG\n	#ifdef FOG_EXP2\n		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );\n	#else\n		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );\n	#endif\n	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );\n#endif";
  var fog_pars_fragment = "#ifdef USE_FOG\n	uniform vec3 fogColor;\n	varying float vFogDepth;\n	#ifdef FOG_EXP2\n		uniform float fogDensity;\n	#else\n		uniform float fogNear;\n		uniform float fogFar;\n	#endif\n#endif";
  var gradientmap_pars_fragment = "#ifdef USE_GRADIENTMAP\n	uniform sampler2D gradientMap;\n#endif\nvec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {\n	float dotNL = dot( normal, lightDirection );\n	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );\n	#ifdef USE_GRADIENTMAP\n		return vec3( texture2D( gradientMap, coord ).r );\n	#else\n		vec2 fw = fwidth( coord ) * 0.5;\n		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );\n	#endif\n}";
  var lightmap_pars_fragment = "#ifdef USE_LIGHTMAP\n	uniform sampler2D lightMap;\n	uniform float lightMapIntensity;\n#endif";
  var lights_lambert_fragment = "LambertMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.specularStrength = specularStrength;";
  var lights_lambert_pars_fragment = "varying vec3 vViewPosition;\nstruct LambertMaterial {\n	vec3 diffuseColor;\n	float specularStrength;\n};\nvoid RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {\n	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );\n	vec3 irradiance = dotNL * directLight.color;\n	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {\n	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\n#define RE_Direct				RE_Direct_Lambert\n#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert";
  var lights_pars_begin = "uniform bool receiveShadow;\nuniform vec3 ambientLightColor;\n#if defined( USE_LIGHT_PROBES )\n	uniform vec3 lightProbe[ 9 ];\n#endif\nvec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {\n	float x = normal.x, y = normal.y, z = normal.z;\n	vec3 result = shCoefficients[ 0 ] * 0.886227;\n	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;\n	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;\n	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;\n	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;\n	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;\n	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );\n	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;\n	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );\n	return result;\n}\nvec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {\n	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );\n	return irradiance;\n}\nvec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {\n	vec3 irradiance = ambientLightColor;\n	return irradiance;\n}\nfloat getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {\n	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );\n	if ( cutoffDistance > 0.0 ) {\n		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );\n	}\n	return distanceFalloff;\n}\nfloat getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {\n	return smoothstep( coneCosine, penumbraCosine, angleCosine );\n}\n#if NUM_DIR_LIGHTS > 0\n	struct DirectionalLight {\n		vec3 direction;\n		vec3 color;\n	};\n	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];\n	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {\n		light.color = directionalLight.color;\n		light.direction = directionalLight.direction;\n		light.visible = true;\n	}\n#endif\n#if NUM_POINT_LIGHTS > 0\n	struct PointLight {\n		vec3 position;\n		vec3 color;\n		float distance;\n		float decay;\n	};\n	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];\n	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {\n		vec3 lVector = pointLight.position - geometryPosition;\n		light.direction = normalize( lVector );\n		float lightDistance = length( lVector );\n		light.color = pointLight.color;\n		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );\n		light.visible = ( light.color != vec3( 0.0 ) );\n	}\n#endif\n#if NUM_SPOT_LIGHTS > 0\n	struct SpotLight {\n		vec3 position;\n		vec3 direction;\n		vec3 color;\n		float distance;\n		float decay;\n		float coneCos;\n		float penumbraCos;\n	};\n	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];\n	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {\n		vec3 lVector = spotLight.position - geometryPosition;\n		light.direction = normalize( lVector );\n		float angleCos = dot( light.direction, spotLight.direction );\n		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );\n		if ( spotAttenuation > 0.0 ) {\n			float lightDistance = length( lVector );\n			light.color = spotLight.color * spotAttenuation;\n			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );\n			light.visible = ( light.color != vec3( 0.0 ) );\n		} else {\n			light.color = vec3( 0.0 );\n			light.visible = false;\n		}\n	}\n#endif\n#if NUM_RECT_AREA_LIGHTS > 0\n	struct RectAreaLight {\n		vec3 color;\n		vec3 position;\n		vec3 halfWidth;\n		vec3 halfHeight;\n	};\n	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;\n	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];\n#endif\n#if NUM_HEMI_LIGHTS > 0\n	struct HemisphereLight {\n		vec3 direction;\n		vec3 skyColor;\n		vec3 groundColor;\n	};\n	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];\n	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {\n		float dotNL = dot( normal, hemiLight.direction );\n		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;\n		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );\n		return irradiance;\n	}\n#endif";
  var envmap_physical_pars_fragment = "#ifdef USE_ENVMAP\n	vec3 getIBLIrradiance( const in vec3 normal ) {\n		#ifdef ENVMAP_TYPE_CUBE_UV\n			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );\n			return PI * envMapColor.rgb * envMapIntensity;\n		#else\n			return vec3( 0.0 );\n		#endif\n	}\n	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {\n		#ifdef ENVMAP_TYPE_CUBE_UV\n			vec3 reflectVec = reflect( - viewDir, normal );\n			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );\n			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );\n			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );\n			return envMapColor.rgb * envMapIntensity;\n		#else\n			return vec3( 0.0 );\n		#endif\n	}\n	#ifdef USE_ANISOTROPY\n		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {\n			#ifdef ENVMAP_TYPE_CUBE_UV\n				vec3 bentNormal = cross( bitangent, viewDir );\n				bentNormal = normalize( cross( bentNormal, bitangent ) );\n				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );\n				return getIBLRadiance( viewDir, bentNormal, roughness );\n			#else\n				return vec3( 0.0 );\n			#endif\n		}\n	#endif\n#endif";
  var lights_toon_fragment = "ToonMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;";
  var lights_toon_pars_fragment = "varying vec3 vViewPosition;\nstruct ToonMaterial {\n	vec3 diffuseColor;\n};\nvoid RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {\n	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;\n	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {\n	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\n#define RE_Direct				RE_Direct_Toon\n#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon";
  var lights_phong_fragment = "BlinnPhongMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.specularColor = specular;\nmaterial.specularShininess = shininess;\nmaterial.specularStrength = specularStrength;";
  var lights_phong_pars_fragment = "varying vec3 vViewPosition;\nstruct BlinnPhongMaterial {\n	vec3 diffuseColor;\n	vec3 specularColor;\n	float specularShininess;\n	float specularStrength;\n};\nvoid RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );\n	vec3 irradiance = dotNL * directLight.color;\n	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;\n}\nvoid RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\n#define RE_Direct				RE_Direct_BlinnPhong\n#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong";
  var lights_physical_fragment = "PhysicalMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );\nvec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );\nfloat geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );\nmaterial.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;\nmaterial.roughness = min( material.roughness, 1.0 );\n#ifdef IOR\n	material.ior = ior;\n	#ifdef USE_SPECULAR\n		float specularIntensityFactor = specularIntensity;\n		vec3 specularColorFactor = specularColor;\n		#ifdef USE_SPECULAR_COLORMAP\n			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;\n		#endif\n		#ifdef USE_SPECULAR_INTENSITYMAP\n			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;\n		#endif\n		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );\n	#else\n		float specularIntensityFactor = 1.0;\n		vec3 specularColorFactor = vec3( 1.0 );\n		material.specularF90 = 1.0;\n	#endif\n	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );\n#else\n	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );\n	material.specularF90 = 1.0;\n#endif\n#ifdef USE_CLEARCOAT\n	material.clearcoat = clearcoat;\n	material.clearcoatRoughness = clearcoatRoughness;\n	material.clearcoatF0 = vec3( 0.04 );\n	material.clearcoatF90 = 1.0;\n	#ifdef USE_CLEARCOATMAP\n		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;\n	#endif\n	#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;\n	#endif\n	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );\n	material.clearcoatRoughness += geometryRoughness;\n	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );\n#endif\n#ifdef USE_DISPERSION\n	material.dispersion = dispersion;\n#endif\n#ifdef USE_IRIDESCENCE\n	material.iridescence = iridescence;\n	material.iridescenceIOR = iridescenceIOR;\n	#ifdef USE_IRIDESCENCEMAP\n		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;\n	#endif\n	#ifdef USE_IRIDESCENCE_THICKNESSMAP\n		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;\n	#else\n		material.iridescenceThickness = iridescenceThicknessMaximum;\n	#endif\n#endif\n#ifdef USE_SHEEN\n	material.sheenColor = sheenColor;\n	#ifdef USE_SHEEN_COLORMAP\n		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;\n	#endif\n	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );\n	#ifdef USE_SHEEN_ROUGHNESSMAP\n		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;\n	#endif\n#endif\n#ifdef USE_ANISOTROPY\n	#ifdef USE_ANISOTROPYMAP\n		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );\n		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;\n		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;\n	#else\n		vec2 anisotropyV = anisotropyVector;\n	#endif\n	material.anisotropy = length( anisotropyV );\n	if( material.anisotropy == 0.0 ) {\n		anisotropyV = vec2( 1.0, 0.0 );\n	} else {\n		anisotropyV /= material.anisotropy;\n		material.anisotropy = saturate( material.anisotropy );\n	}\n	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );\n	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;\n	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;\n#endif";
  var lights_physical_pars_fragment = "struct PhysicalMaterial {\n	vec3 diffuseColor;\n	float roughness;\n	vec3 specularColor;\n	float specularF90;\n	float dispersion;\n	#ifdef USE_CLEARCOAT\n		float clearcoat;\n		float clearcoatRoughness;\n		vec3 clearcoatF0;\n		float clearcoatF90;\n	#endif\n	#ifdef USE_IRIDESCENCE\n		float iridescence;\n		float iridescenceIOR;\n		float iridescenceThickness;\n		vec3 iridescenceFresnel;\n		vec3 iridescenceF0;\n	#endif\n	#ifdef USE_SHEEN\n		vec3 sheenColor;\n		float sheenRoughness;\n	#endif\n	#ifdef IOR\n		float ior;\n	#endif\n	#ifdef USE_TRANSMISSION\n		float transmission;\n		float transmissionAlpha;\n		float thickness;\n		float attenuationDistance;\n		vec3 attenuationColor;\n	#endif\n	#ifdef USE_ANISOTROPY\n		float anisotropy;\n		float alphaT;\n		vec3 anisotropyT;\n		vec3 anisotropyB;\n	#endif\n};\nvec3 clearcoatSpecularDirect = vec3( 0.0 );\nvec3 clearcoatSpecularIndirect = vec3( 0.0 );\nvec3 sheenSpecularDirect = vec3( 0.0 );\nvec3 sheenSpecularIndirect = vec3(0.0 );\nvec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {\n    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );\n    float x2 = x * x;\n    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );\n    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );\n}\nfloat V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {\n	float a2 = pow2( alpha );\n	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n	return 0.5 / max( gv + gl, EPSILON );\n}\nfloat D_GGX( const in float alpha, const in float dotNH ) {\n	float a2 = pow2( alpha );\n	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;\n	return RECIPROCAL_PI * a2 / pow2( denom );\n}\n#ifdef USE_ANISOTROPY\n	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {\n		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );\n		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );\n		float v = 0.5 / ( gv + gl );\n		return saturate(v);\n	}\n	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {\n		float a2 = alphaT * alphaB;\n		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );\n		highp float v2 = dot( v, v );\n		float w2 = a2 / v2;\n		return RECIPROCAL_PI * a2 * pow2 ( w2 );\n	}\n#endif\n#ifdef USE_CLEARCOAT\n	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {\n		vec3 f0 = material.clearcoatF0;\n		float f90 = material.clearcoatF90;\n		float roughness = material.clearcoatRoughness;\n		float alpha = pow2( roughness );\n		vec3 halfDir = normalize( lightDir + viewDir );\n		float dotNL = saturate( dot( normal, lightDir ) );\n		float dotNV = saturate( dot( normal, viewDir ) );\n		float dotNH = saturate( dot( normal, halfDir ) );\n		float dotVH = saturate( dot( viewDir, halfDir ) );\n		vec3 F = F_Schlick( f0, f90, dotVH );\n		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );\n		float D = D_GGX( alpha, dotNH );\n		return F * ( V * D );\n	}\n#endif\nvec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {\n	vec3 f0 = material.specularColor;\n	float f90 = material.specularF90;\n	float roughness = material.roughness;\n	float alpha = pow2( roughness );\n	vec3 halfDir = normalize( lightDir + viewDir );\n	float dotNL = saturate( dot( normal, lightDir ) );\n	float dotNV = saturate( dot( normal, viewDir ) );\n	float dotNH = saturate( dot( normal, halfDir ) );\n	float dotVH = saturate( dot( viewDir, halfDir ) );\n	vec3 F = F_Schlick( f0, f90, dotVH );\n	#ifdef USE_IRIDESCENCE\n		F = mix( F, material.iridescenceFresnel, material.iridescence );\n	#endif\n	#ifdef USE_ANISOTROPY\n		float dotTL = dot( material.anisotropyT, lightDir );\n		float dotTV = dot( material.anisotropyT, viewDir );\n		float dotTH = dot( material.anisotropyT, halfDir );\n		float dotBL = dot( material.anisotropyB, lightDir );\n		float dotBV = dot( material.anisotropyB, viewDir );\n		float dotBH = dot( material.anisotropyB, halfDir );\n		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );\n		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );\n	#else\n		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );\n		float D = D_GGX( alpha, dotNH );\n	#endif\n	return F * ( V * D );\n}\nvec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {\n	const float LUT_SIZE = 64.0;\n	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;\n	const float LUT_BIAS = 0.5 / LUT_SIZE;\n	float dotNV = saturate( dot( N, V ) );\n	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );\n	uv = uv * LUT_SCALE + LUT_BIAS;\n	return uv;\n}\nfloat LTC_ClippedSphereFormFactor( const in vec3 f ) {\n	float l = length( f );\n	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );\n}\nvec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {\n	float x = dot( v1, v2 );\n	float y = abs( x );\n	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;\n	float b = 3.4175940 + ( 4.1616724 + y ) * y;\n	float v = a / b;\n	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;\n	return cross( v1, v2 ) * theta_sintheta;\n}\nvec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {\n	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];\n	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];\n	vec3 lightNormal = cross( v1, v2 );\n	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );\n	vec3 T1, T2;\n	T1 = normalize( V - N * dot( V, N ) );\n	T2 = - cross( N, T1 );\n	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );\n	vec3 coords[ 4 ];\n	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );\n	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );\n	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );\n	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );\n	coords[ 0 ] = normalize( coords[ 0 ] );\n	coords[ 1 ] = normalize( coords[ 1 ] );\n	coords[ 2 ] = normalize( coords[ 2 ] );\n	coords[ 3 ] = normalize( coords[ 3 ] );\n	vec3 vectorFormFactor = vec3( 0.0 );\n	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );\n	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );\n	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );\n	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );\n	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );\n	return vec3( result );\n}\n#if defined( USE_SHEEN )\nfloat D_Charlie( float roughness, float dotNH ) {\n	float alpha = pow2( roughness );\n	float invAlpha = 1.0 / alpha;\n	float cos2h = dotNH * dotNH;\n	float sin2h = max( 1.0 - cos2h, 0.0078125 );\n	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );\n}\nfloat V_Neubelt( float dotNV, float dotNL ) {\n	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );\n}\nvec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {\n	vec3 halfDir = normalize( lightDir + viewDir );\n	float dotNL = saturate( dot( normal, lightDir ) );\n	float dotNV = saturate( dot( normal, viewDir ) );\n	float dotNH = saturate( dot( normal, halfDir ) );\n	float D = D_Charlie( sheenRoughness, dotNH );\n	float V = V_Neubelt( dotNV, dotNL );\n	return sheenColor * ( D * V );\n}\n#endif\nfloat IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {\n	float dotNV = saturate( dot( normal, viewDir ) );\n	float r2 = roughness * roughness;\n	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;\n	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;\n	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );\n	return saturate( DG * RECIPROCAL_PI );\n}\nvec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {\n	float dotNV = saturate( dot( normal, viewDir ) );\n	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );\n	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );\n	vec4 r = roughness * c0 + c1;\n	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;\n	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;\n	return fab;\n}\nvec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {\n	vec2 fab = DFGApprox( normal, viewDir, roughness );\n	return specularColor * fab.x + specularF90 * fab.y;\n}\n#ifdef USE_IRIDESCENCE\nvoid computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {\n#else\nvoid computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {\n#endif\n	vec2 fab = DFGApprox( normal, viewDir, roughness );\n	#ifdef USE_IRIDESCENCE\n		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );\n	#else\n		vec3 Fr = specularColor;\n	#endif\n	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;\n	float Ess = fab.x + fab.y;\n	float Ems = 1.0 - Ess;\n	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );\n	singleScatter += FssEss;\n	multiScatter += Fms * Ems;\n}\n#if NUM_RECT_AREA_LIGHTS > 0\n	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n		vec3 normal = geometryNormal;\n		vec3 viewDir = geometryViewDir;\n		vec3 position = geometryPosition;\n		vec3 lightPos = rectAreaLight.position;\n		vec3 halfWidth = rectAreaLight.halfWidth;\n		vec3 halfHeight = rectAreaLight.halfHeight;\n		vec3 lightColor = rectAreaLight.color;\n		float roughness = material.roughness;\n		vec3 rectCoords[ 4 ];\n		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;\n		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;\n		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;\n		vec2 uv = LTC_Uv( normal, viewDir, roughness );\n		vec4 t1 = texture2D( ltc_1, uv );\n		vec4 t2 = texture2D( ltc_2, uv );\n		mat3 mInv = mat3(\n			vec3( t1.x, 0, t1.y ),\n			vec3(    0, 1,    0 ),\n			vec3( t1.z, 0, t1.w )\n		);\n		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );\n		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );\n		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );\n	}\n#endif\nvoid RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );\n	vec3 irradiance = dotNL * directLight.color;\n	#ifdef USE_CLEARCOAT\n		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );\n		vec3 ccIrradiance = dotNLcc * directLight.color;\n		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );\n	#endif\n	#ifdef USE_SHEEN\n		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );\n	#endif\n	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );\n	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {\n	#ifdef USE_CLEARCOAT\n		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );\n	#endif\n	#ifdef USE_SHEEN\n		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );\n	#endif\n	vec3 singleScattering = vec3( 0.0 );\n	vec3 multiScattering = vec3( 0.0 );\n	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;\n	#ifdef USE_IRIDESCENCE\n		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );\n	#else\n		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );\n	#endif\n	vec3 totalScattering = singleScattering + multiScattering;\n	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );\n	reflectedLight.indirectSpecular += radiance * singleScattering;\n	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;\n	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;\n}\n#define RE_Direct				RE_Direct_Physical\n#define RE_Direct_RectArea		RE_Direct_RectArea_Physical\n#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical\n#define RE_IndirectSpecular		RE_IndirectSpecular_Physical\nfloat computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {\n	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );\n}";
  var lights_fragment_begin = "\nvec3 geometryPosition = - vViewPosition;\nvec3 geometryNormal = normal;\nvec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );\nvec3 geometryClearcoatNormal = vec3( 0.0 );\n#ifdef USE_CLEARCOAT\n	geometryClearcoatNormal = clearcoatNormal;\n#endif\n#ifdef USE_IRIDESCENCE\n	float dotNVi = saturate( dot( normal, geometryViewDir ) );\n	if ( material.iridescenceThickness == 0.0 ) {\n		material.iridescence = 0.0;\n	} else {\n		material.iridescence = saturate( material.iridescence );\n	}\n	if ( material.iridescence > 0.0 ) {\n		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );\n		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );\n	}\n#endif\nIncidentLight directLight;\n#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )\n	PointLight pointLight;\n	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0\n	PointLightShadow pointLightShadow;\n	#endif\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n		pointLight = pointLights[ i ];\n		getPointLightInfo( pointLight, geometryPosition, directLight );\n		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )\n		pointLightShadow = pointLightShadows[ i ];\n		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;\n		#endif\n		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n	}\n	#pragma unroll_loop_end\n#endif\n#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )\n	SpotLight spotLight;\n	vec4 spotColor;\n	vec3 spotLightCoord;\n	bool inSpotLightMap;\n	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0\n	SpotLightShadow spotLightShadow;\n	#endif\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n		spotLight = spotLights[ i ];\n		getSpotLightInfo( spotLight, geometryPosition, directLight );\n		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )\n		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX\n		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS\n		#else\n		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )\n		#endif\n		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )\n			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;\n			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );\n			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );\n			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;\n		#endif\n		#undef SPOT_LIGHT_MAP_INDEX\n		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n		spotLightShadow = spotLightShadows[ i ];\n		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;\n		#endif\n		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n	}\n	#pragma unroll_loop_end\n#endif\n#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )\n	DirectionalLight directionalLight;\n	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0\n	DirectionalLightShadow directionalLightShadow;\n	#endif\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n		directionalLight = directionalLights[ i ];\n		getDirectionalLightInfo( directionalLight, directLight );\n		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )\n		directionalLightShadow = directionalLightShadows[ i ];\n		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n		#endif\n		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n	}\n	#pragma unroll_loop_end\n#endif\n#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )\n	RectAreaLight rectAreaLight;\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {\n		rectAreaLight = rectAreaLights[ i ];\n		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n	}\n	#pragma unroll_loop_end\n#endif\n#if defined( RE_IndirectDiffuse )\n	vec3 iblIrradiance = vec3( 0.0 );\n	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );\n	#if defined( USE_LIGHT_PROBES )\n		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );\n	#endif\n	#if ( NUM_HEMI_LIGHTS > 0 )\n		#pragma unroll_loop_start\n		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );\n		}\n		#pragma unroll_loop_end\n	#endif\n#endif\n#if defined( RE_IndirectSpecular )\n	vec3 radiance = vec3( 0.0 );\n	vec3 clearcoatRadiance = vec3( 0.0 );\n#endif";
  var lights_fragment_maps = "#if defined( RE_IndirectDiffuse )\n	#ifdef USE_LIGHTMAP\n		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );\n		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;\n		irradiance += lightMapIrradiance;\n	#endif\n	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )\n		iblIrradiance += getIBLIrradiance( geometryNormal );\n	#endif\n#endif\n#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )\n	#ifdef USE_ANISOTROPY\n		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );\n	#else\n		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );\n	#endif\n	#ifdef USE_CLEARCOAT\n		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );\n	#endif\n#endif";
  var lights_fragment_end = "#if defined( RE_IndirectDiffuse )\n	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n#endif\n#if defined( RE_IndirectSpecular )\n	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n#endif";
  var logdepthbuf_fragment = "#if defined( USE_LOGDEPTHBUF )\n	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;\n#endif";
  var logdepthbuf_pars_fragment = "#if defined( USE_LOGDEPTHBUF )\n	uniform float logDepthBufFC;\n	varying float vFragDepth;\n	varying float vIsPerspective;\n#endif";
  var logdepthbuf_pars_vertex = "#ifdef USE_LOGDEPTHBUF\n	varying float vFragDepth;\n	varying float vIsPerspective;\n#endif";
  var logdepthbuf_vertex = "#ifdef USE_LOGDEPTHBUF\n	vFragDepth = 1.0 + gl_Position.w;\n	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );\n#endif";
  var map_fragment = "#ifdef USE_MAP\n	vec4 sampledDiffuseColor = texture2D( map, vMapUv );\n	#ifdef DECODE_VIDEO_TEXTURE\n		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );\n	#endif\n	diffuseColor *= sampledDiffuseColor;\n#endif";
  var map_pars_fragment = "#ifdef USE_MAP\n	uniform sampler2D map;\n#endif";
  var map_particle_fragment = "#if defined( USE_MAP ) || defined( USE_ALPHAMAP )\n	#if defined( USE_POINTS_UV )\n		vec2 uv = vUv;\n	#else\n		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;\n	#endif\n#endif\n#ifdef USE_MAP\n	diffuseColor *= texture2D( map, uv );\n#endif\n#ifdef USE_ALPHAMAP\n	diffuseColor.a *= texture2D( alphaMap, uv ).g;\n#endif";
  var map_particle_pars_fragment = "#if defined( USE_POINTS_UV )\n	varying vec2 vUv;\n#else\n	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )\n		uniform mat3 uvTransform;\n	#endif\n#endif\n#ifdef USE_MAP\n	uniform sampler2D map;\n#endif\n#ifdef USE_ALPHAMAP\n	uniform sampler2D alphaMap;\n#endif";
  var metalnessmap_fragment = "float metalnessFactor = metalness;\n#ifdef USE_METALNESSMAP\n	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );\n	metalnessFactor *= texelMetalness.b;\n#endif";
  var metalnessmap_pars_fragment = "#ifdef USE_METALNESSMAP\n	uniform sampler2D metalnessMap;\n#endif";
  var morphinstance_vertex = "#ifdef USE_INSTANCING_MORPH\n	float morphTargetInfluences[ MORPHTARGETS_COUNT ];\n	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;\n	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;\n	}\n#endif";
  var morphcolor_vertex = "#if defined( USE_MORPHCOLORS )\n	vColor *= morphTargetBaseInfluence;\n	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n		#if defined( USE_COLOR_ALPHA )\n			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];\n		#elif defined( USE_COLOR )\n			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];\n		#endif\n	}\n#endif";
  var morphnormal_vertex = "#ifdef USE_MORPHNORMALS\n	objectNormal *= morphTargetBaseInfluence;\n	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];\n	}\n#endif";
  var morphtarget_pars_vertex = "#ifdef USE_MORPHTARGETS\n	#ifndef USE_INSTANCING_MORPH\n		uniform float morphTargetBaseInfluence;\n		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];\n	#endif\n	uniform sampler2DArray morphTargetsTexture;\n	uniform ivec2 morphTargetsTextureSize;\n	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {\n		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;\n		int y = texelIndex / morphTargetsTextureSize.x;\n		int x = texelIndex - y * morphTargetsTextureSize.x;\n		ivec3 morphUV = ivec3( x, y, morphTargetIndex );\n		return texelFetch( morphTargetsTexture, morphUV, 0 );\n	}\n#endif";
  var morphtarget_vertex = "#ifdef USE_MORPHTARGETS\n	transformed *= morphTargetBaseInfluence;\n	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];\n	}\n#endif";
  var normal_fragment_begin = "float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;\n#ifdef FLAT_SHADED\n	vec3 fdx = dFdx( vViewPosition );\n	vec3 fdy = dFdy( vViewPosition );\n	vec3 normal = normalize( cross( fdx, fdy ) );\n#else\n	vec3 normal = normalize( vNormal );\n	#ifdef DOUBLE_SIDED\n		normal *= faceDirection;\n	#endif\n#endif\n#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )\n	#ifdef USE_TANGENT\n		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );\n	#else\n		mat3 tbn = getTangentFrame( - vViewPosition, normal,\n		#if defined( USE_NORMALMAP )\n			vNormalMapUv\n		#elif defined( USE_CLEARCOAT_NORMALMAP )\n			vClearcoatNormalMapUv\n		#else\n			vUv\n		#endif\n		);\n	#endif\n	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )\n		tbn[0] *= faceDirection;\n		tbn[1] *= faceDirection;\n	#endif\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n	#ifdef USE_TANGENT\n		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );\n	#else\n		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );\n	#endif\n	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )\n		tbn2[0] *= faceDirection;\n		tbn2[1] *= faceDirection;\n	#endif\n#endif\nvec3 nonPerturbedNormal = normal;";
  var normal_fragment_maps = "#ifdef USE_NORMALMAP_OBJECTSPACE\n	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;\n	#ifdef FLIP_SIDED\n		normal = - normal;\n	#endif\n	#ifdef DOUBLE_SIDED\n		normal = normal * faceDirection;\n	#endif\n	normal = normalize( normalMatrix * normal );\n#elif defined( USE_NORMALMAP_TANGENTSPACE )\n	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;\n	mapN.xy *= normalScale;\n	normal = normalize( tbn * mapN );\n#elif defined( USE_BUMPMAP )\n	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );\n#endif";
  var normal_pars_fragment = "#ifndef FLAT_SHADED\n	varying vec3 vNormal;\n	#ifdef USE_TANGENT\n		varying vec3 vTangent;\n		varying vec3 vBitangent;\n	#endif\n#endif";
  var normal_pars_vertex = "#ifndef FLAT_SHADED\n	varying vec3 vNormal;\n	#ifdef USE_TANGENT\n		varying vec3 vTangent;\n		varying vec3 vBitangent;\n	#endif\n#endif";
  var normal_vertex = "#ifndef FLAT_SHADED\n	vNormal = normalize( transformedNormal );\n	#ifdef USE_TANGENT\n		vTangent = normalize( transformedTangent );\n		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );\n	#endif\n#endif";
  var normalmap_pars_fragment = "#ifdef USE_NORMALMAP\n	uniform sampler2D normalMap;\n	uniform vec2 normalScale;\n#endif\n#ifdef USE_NORMALMAP_OBJECTSPACE\n	uniform mat3 normalMatrix;\n#endif\n#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )\n	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {\n		vec3 q0 = dFdx( eye_pos.xyz );\n		vec3 q1 = dFdy( eye_pos.xyz );\n		vec2 st0 = dFdx( uv.st );\n		vec2 st1 = dFdy( uv.st );\n		vec3 N = surf_norm;\n		vec3 q1perp = cross( q1, N );\n		vec3 q0perp = cross( N, q0 );\n		vec3 T = q1perp * st0.x + q0perp * st1.x;\n		vec3 B = q1perp * st0.y + q0perp * st1.y;\n		float det = max( dot( T, T ), dot( B, B ) );\n		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );\n		return mat3( T * scale, B * scale, N );\n	}\n#endif";
  var clearcoat_normal_fragment_begin = "#ifdef USE_CLEARCOAT\n	vec3 clearcoatNormal = nonPerturbedNormal;\n#endif";
  var clearcoat_normal_fragment_maps = "#ifdef USE_CLEARCOAT_NORMALMAP\n	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;\n	clearcoatMapN.xy *= clearcoatNormalScale;\n	clearcoatNormal = normalize( tbn2 * clearcoatMapN );\n#endif";
  var clearcoat_pars_fragment = "#ifdef USE_CLEARCOATMAP\n	uniform sampler2D clearcoatMap;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n	uniform sampler2D clearcoatNormalMap;\n	uniform vec2 clearcoatNormalScale;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n	uniform sampler2D clearcoatRoughnessMap;\n#endif";
  var iridescence_pars_fragment = "#ifdef USE_IRIDESCENCEMAP\n	uniform sampler2D iridescenceMap;\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n	uniform sampler2D iridescenceThicknessMap;\n#endif";
  var opaque_fragment = "#ifdef OPAQUE\ndiffuseColor.a = 1.0;\n#endif\n#ifdef USE_TRANSMISSION\ndiffuseColor.a *= material.transmissionAlpha;\n#endif\ngl_FragColor = vec4( outgoingLight, diffuseColor.a );";
  var packing = "vec3 packNormalToRGB( const in vec3 normal ) {\n	return normalize( normal ) * 0.5 + 0.5;\n}\nvec3 unpackRGBToNormal( const in vec3 rgb ) {\n	return 2.0 * rgb.xyz - 1.0;\n}\nconst float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;\nconst float Inv255 = 1. / 255.;\nconst vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );\nconst vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );\nconst vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );\nconst vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );\nvec4 packDepthToRGBA( const in float v ) {\n	if( v <= 0.0 )\n		return vec4( 0., 0., 0., 0. );\n	if( v >= 1.0 )\n		return vec4( 1., 1., 1., 1. );\n	float vuf;\n	float af = modf( v * PackFactors.a, vuf );\n	float bf = modf( vuf * ShiftRight8, vuf );\n	float gf = modf( vuf * ShiftRight8, vuf );\n	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );\n}\nvec3 packDepthToRGB( const in float v ) {\n	if( v <= 0.0 )\n		return vec3( 0., 0., 0. );\n	if( v >= 1.0 )\n		return vec3( 1., 1., 1. );\n	float vuf;\n	float bf = modf( v * PackFactors.b, vuf );\n	float gf = modf( vuf * ShiftRight8, vuf );\n	return vec3( vuf * Inv255, gf * PackUpscale, bf );\n}\nvec2 packDepthToRG( const in float v ) {\n	if( v <= 0.0 )\n		return vec2( 0., 0. );\n	if( v >= 1.0 )\n		return vec2( 1., 1. );\n	float vuf;\n	float gf = modf( v * 256., vuf );\n	return vec2( vuf * Inv255, gf );\n}\nfloat unpackRGBAToDepth( const in vec4 v ) {\n	return dot( v, UnpackFactors4 );\n}\nfloat unpackRGBToDepth( const in vec3 v ) {\n	return dot( v, UnpackFactors3 );\n}\nfloat unpackRGToDepth( const in vec2 v ) {\n	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;\n}\nvec4 pack2HalfToRGBA( const in vec2 v ) {\n	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );\n	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );\n}\nvec2 unpackRGBATo2Half( const in vec4 v ) {\n	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );\n}\nfloat viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {\n	return ( viewZ + near ) / ( near - far );\n}\nfloat orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {\n	return depth * ( near - far ) - near;\n}\nfloat viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {\n	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );\n}\nfloat perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {\n	return ( near * far ) / ( ( far - near ) * depth - far );\n}";
  var premultiplied_alpha_fragment = "#ifdef PREMULTIPLIED_ALPHA\n	gl_FragColor.rgb *= gl_FragColor.a;\n#endif";
  var project_vertex = "vec4 mvPosition = vec4( transformed, 1.0 );\n#ifdef USE_BATCHING\n	mvPosition = batchingMatrix * mvPosition;\n#endif\n#ifdef USE_INSTANCING\n	mvPosition = instanceMatrix * mvPosition;\n#endif\nmvPosition = modelViewMatrix * mvPosition;\ngl_Position = projectionMatrix * mvPosition;";
  var dithering_fragment = "#ifdef DITHERING\n	gl_FragColor.rgb = dithering( gl_FragColor.rgb );\n#endif";
  var dithering_pars_fragment = "#ifdef DITHERING\n	vec3 dithering( vec3 color ) {\n		float grid_position = rand( gl_FragCoord.xy );\n		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );\n		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );\n		return color + dither_shift_RGB;\n	}\n#endif";
  var roughnessmap_fragment = "float roughnessFactor = roughness;\n#ifdef USE_ROUGHNESSMAP\n	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );\n	roughnessFactor *= texelRoughness.g;\n#endif";
  var roughnessmap_pars_fragment = "#ifdef USE_ROUGHNESSMAP\n	uniform sampler2D roughnessMap;\n#endif";
  var shadowmap_pars_fragment = "#if NUM_SPOT_LIGHT_COORDS > 0\n	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];\n#endif\n#if NUM_SPOT_LIGHT_MAPS > 0\n	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];\n#endif\n#ifdef USE_SHADOWMAP\n	#if NUM_DIR_LIGHT_SHADOWS > 0\n		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];\n		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];\n		struct DirectionalLightShadow {\n			float shadowIntensity;\n			float shadowBias;\n			float shadowNormalBias;\n			float shadowRadius;\n			vec2 shadowMapSize;\n		};\n		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];\n	#endif\n	#if NUM_SPOT_LIGHT_SHADOWS > 0\n		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];\n		struct SpotLightShadow {\n			float shadowIntensity;\n			float shadowBias;\n			float shadowNormalBias;\n			float shadowRadius;\n			vec2 shadowMapSize;\n		};\n		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];\n	#endif\n	#if NUM_POINT_LIGHT_SHADOWS > 0\n		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];\n		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];\n		struct PointLightShadow {\n			float shadowIntensity;\n			float shadowBias;\n			float shadowNormalBias;\n			float shadowRadius;\n			vec2 shadowMapSize;\n			float shadowCameraNear;\n			float shadowCameraFar;\n		};\n		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];\n	#endif\n	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {\n		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );\n	}\n	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {\n		return unpackRGBATo2Half( texture2D( shadow, uv ) );\n	}\n	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){\n		float occlusion = 1.0;\n		vec2 distribution = texture2DDistribution( shadow, uv );\n		float hard_shadow = step( compare , distribution.x );\n		if (hard_shadow != 1.0 ) {\n			float distance = compare - distribution.x ;\n			float variance = max( 0.00000, distribution.y * distribution.y );\n			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );\n		}\n		return occlusion;\n	}\n	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {\n		float shadow = 1.0;\n		shadowCoord.xyz /= shadowCoord.w;\n		shadowCoord.z += shadowBias;\n		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;\n		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;\n		if ( frustumTest ) {\n		#if defined( SHADOWMAP_TYPE_PCF )\n			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n			float dx0 = - texelSize.x * shadowRadius;\n			float dy0 = - texelSize.y * shadowRadius;\n			float dx1 = + texelSize.x * shadowRadius;\n			float dy1 = + texelSize.y * shadowRadius;\n			float dx2 = dx0 / 2.0;\n			float dy2 = dy0 / 2.0;\n			float dx3 = dx1 / 2.0;\n			float dy3 = dy1 / 2.0;\n			shadow = (\n				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +\n				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +\n				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +\n				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +\n				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +\n				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +\n				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +\n				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +\n				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +\n				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +\n				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +\n				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +\n				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +\n				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +\n				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +\n				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +\n				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )\n			) * ( 1.0 / 17.0 );\n		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )\n			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n			float dx = texelSize.x;\n			float dy = texelSize.y;\n			vec2 uv = shadowCoord.xy;\n			vec2 f = fract( uv * shadowMapSize + 0.5 );\n			uv -= f * texelSize;\n			shadow = (\n				texture2DCompare( shadowMap, uv, shadowCoord.z ) +\n				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +\n				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +\n				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +\n				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),\n					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),\n					 f.x ) +\n				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),\n					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),\n					 f.x ) +\n				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),\n					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),\n					 f.y ) +\n				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),\n					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),\n					 f.y ) +\n				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),\n						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),\n						  f.x ),\n					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),\n						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),\n						  f.x ),\n					 f.y )\n			) * ( 1.0 / 9.0 );\n		#elif defined( SHADOWMAP_TYPE_VSM )\n			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );\n		#else\n			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );\n		#endif\n		}\n		return mix( 1.0, shadow, shadowIntensity );\n	}\n	vec2 cubeToUV( vec3 v, float texelSizeY ) {\n		vec3 absV = abs( v );\n		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );\n		absV *= scaleToCube;\n		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );\n		vec2 planar = v.xy;\n		float almostATexel = 1.5 * texelSizeY;\n		float almostOne = 1.0 - almostATexel;\n		if ( absV.z >= almostOne ) {\n			if ( v.z > 0.0 )\n				planar.x = 4.0 - v.x;\n		} else if ( absV.x >= almostOne ) {\n			float signX = sign( v.x );\n			planar.x = v.z * signX + 2.0 * signX;\n		} else if ( absV.y >= almostOne ) {\n			float signY = sign( v.y );\n			planar.x = v.x + 2.0 * signY + 2.0;\n			planar.y = v.z * signY - 2.0;\n		}\n		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );\n	}\n	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {\n		float shadow = 1.0;\n		vec3 lightToPosition = shadowCoord.xyz;\n		\n		float lightToPositionLength = length( lightToPosition );\n		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {\n			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;\n			vec3 bd3D = normalize( lightToPosition );\n			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );\n			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )\n				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;\n				shadow = (\n					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +\n					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +\n					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +\n					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +\n					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +\n					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +\n					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +\n					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +\n					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )\n				) * ( 1.0 / 9.0 );\n			#else\n				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );\n			#endif\n		}\n		return mix( 1.0, shadow, shadowIntensity );\n	}\n#endif";
  var shadowmap_pars_vertex = "#if NUM_SPOT_LIGHT_COORDS > 0\n	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];\n	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];\n#endif\n#ifdef USE_SHADOWMAP\n	#if NUM_DIR_LIGHT_SHADOWS > 0\n		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];\n		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];\n		struct DirectionalLightShadow {\n			float shadowIntensity;\n			float shadowBias;\n			float shadowNormalBias;\n			float shadowRadius;\n			vec2 shadowMapSize;\n		};\n		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];\n	#endif\n	#if NUM_SPOT_LIGHT_SHADOWS > 0\n		struct SpotLightShadow {\n			float shadowIntensity;\n			float shadowBias;\n			float shadowNormalBias;\n			float shadowRadius;\n			vec2 shadowMapSize;\n		};\n		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];\n	#endif\n	#if NUM_POINT_LIGHT_SHADOWS > 0\n		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];\n		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];\n		struct PointLightShadow {\n			float shadowIntensity;\n			float shadowBias;\n			float shadowNormalBias;\n			float shadowRadius;\n			vec2 shadowMapSize;\n			float shadowCameraNear;\n			float shadowCameraFar;\n		};\n		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];\n	#endif\n#endif";
  var shadowmap_vertex = "#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )\n	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );\n	vec4 shadowWorldPosition;\n#endif\n#if defined( USE_SHADOWMAP )\n	#if NUM_DIR_LIGHT_SHADOWS > 0\n		#pragma unroll_loop_start\n		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {\n			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );\n			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;\n		}\n		#pragma unroll_loop_end\n	#endif\n	#if NUM_POINT_LIGHT_SHADOWS > 0\n		#pragma unroll_loop_start\n		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {\n			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );\n			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;\n		}\n		#pragma unroll_loop_end\n	#endif\n#endif\n#if NUM_SPOT_LIGHT_COORDS > 0\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {\n		shadowWorldPosition = worldPosition;\n		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;\n		#endif\n		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;\n	}\n	#pragma unroll_loop_end\n#endif";
  var shadowmask_pars_fragment = "float getShadowMask() {\n	float shadow = 1.0;\n	#ifdef USE_SHADOWMAP\n	#if NUM_DIR_LIGHT_SHADOWS > 0\n	DirectionalLightShadow directionalLight;\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {\n		directionalLight = directionalLightShadows[ i ];\n		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n	}\n	#pragma unroll_loop_end\n	#endif\n	#if NUM_SPOT_LIGHT_SHADOWS > 0\n	SpotLightShadow spotLight;\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {\n		spotLight = spotLightShadows[ i ];\n		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;\n	}\n	#pragma unroll_loop_end\n	#endif\n	#if NUM_POINT_LIGHT_SHADOWS > 0\n	PointLightShadow pointLight;\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {\n		pointLight = pointLightShadows[ i ];\n		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;\n	}\n	#pragma unroll_loop_end\n	#endif\n	#endif\n	return shadow;\n}";
  var skinbase_vertex = "#ifdef USE_SKINNING\n	mat4 boneMatX = getBoneMatrix( skinIndex.x );\n	mat4 boneMatY = getBoneMatrix( skinIndex.y );\n	mat4 boneMatZ = getBoneMatrix( skinIndex.z );\n	mat4 boneMatW = getBoneMatrix( skinIndex.w );\n#endif";
  var skinning_pars_vertex = "#ifdef USE_SKINNING\n	uniform mat4 bindMatrix;\n	uniform mat4 bindMatrixInverse;\n	uniform highp sampler2D boneTexture;\n	mat4 getBoneMatrix( const in float i ) {\n		int size = textureSize( boneTexture, 0 ).x;\n		int j = int( i ) * 4;\n		int x = j % size;\n		int y = j / size;\n		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );\n		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );\n		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );\n		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );\n		return mat4( v1, v2, v3, v4 );\n	}\n#endif";
  var skinning_vertex = "#ifdef USE_SKINNING\n	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );\n	vec4 skinned = vec4( 0.0 );\n	skinned += boneMatX * skinVertex * skinWeight.x;\n	skinned += boneMatY * skinVertex * skinWeight.y;\n	skinned += boneMatZ * skinVertex * skinWeight.z;\n	skinned += boneMatW * skinVertex * skinWeight.w;\n	transformed = ( bindMatrixInverse * skinned ).xyz;\n#endif";
  var skinnormal_vertex = "#ifdef USE_SKINNING\n	mat4 skinMatrix = mat4( 0.0 );\n	skinMatrix += skinWeight.x * boneMatX;\n	skinMatrix += skinWeight.y * boneMatY;\n	skinMatrix += skinWeight.z * boneMatZ;\n	skinMatrix += skinWeight.w * boneMatW;\n	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;\n	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;\n	#ifdef USE_TANGENT\n		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;\n	#endif\n#endif";
  var specularmap_fragment = "float specularStrength;\n#ifdef USE_SPECULARMAP\n	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );\n	specularStrength = texelSpecular.r;\n#else\n	specularStrength = 1.0;\n#endif";
  var specularmap_pars_fragment = "#ifdef USE_SPECULARMAP\n	uniform sampler2D specularMap;\n#endif";
  var tonemapping_fragment = "#if defined( TONE_MAPPING )\n	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );\n#endif";
  var tonemapping_pars_fragment = "#ifndef saturate\n#define saturate( a ) clamp( a, 0.0, 1.0 )\n#endif\nuniform float toneMappingExposure;\nvec3 LinearToneMapping( vec3 color ) {\n	return saturate( toneMappingExposure * color );\n}\nvec3 ReinhardToneMapping( vec3 color ) {\n	color *= toneMappingExposure;\n	return saturate( color / ( vec3( 1.0 ) + color ) );\n}\nvec3 CineonToneMapping( vec3 color ) {\n	color *= toneMappingExposure;\n	color = max( vec3( 0.0 ), color - 0.004 );\n	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );\n}\nvec3 RRTAndODTFit( vec3 v ) {\n	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;\n	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;\n	return a / b;\n}\nvec3 ACESFilmicToneMapping( vec3 color ) {\n	const mat3 ACESInputMat = mat3(\n		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),\n		vec3( 0.04823, 0.01566, 0.83777 )\n	);\n	const mat3 ACESOutputMat = mat3(\n		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),\n		vec3( -0.07367, -0.00605,  1.07602 )\n	);\n	color *= toneMappingExposure / 0.6;\n	color = ACESInputMat * color;\n	color = RRTAndODTFit( color );\n	color = ACESOutputMat * color;\n	return saturate( color );\n}\nconst mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(\n	vec3( 1.6605, - 0.1246, - 0.0182 ),\n	vec3( - 0.5876, 1.1329, - 0.1006 ),\n	vec3( - 0.0728, - 0.0083, 1.1187 )\n);\nconst mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(\n	vec3( 0.6274, 0.0691, 0.0164 ),\n	vec3( 0.3293, 0.9195, 0.0880 ),\n	vec3( 0.0433, 0.0113, 0.8956 )\n);\nvec3 agxDefaultContrastApprox( vec3 x ) {\n	vec3 x2 = x * x;\n	vec3 x4 = x2 * x2;\n	return + 15.5 * x4 * x2\n		- 40.14 * x4 * x\n		+ 31.96 * x4\n		- 6.868 * x2 * x\n		+ 0.4298 * x2\n		+ 0.1191 * x\n		- 0.00232;\n}\nvec3 AgXToneMapping( vec3 color ) {\n	const mat3 AgXInsetMatrix = mat3(\n		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),\n		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),\n		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )\n	);\n	const mat3 AgXOutsetMatrix = mat3(\n		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),\n		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),\n		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )\n	);\n	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;\n	color *= toneMappingExposure;\n	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;\n	color = AgXInsetMatrix * color;\n	color = max( color, 1e-10 );	color = log2( color );\n	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );\n	color = clamp( color, 0.0, 1.0 );\n	color = agxDefaultContrastApprox( color );\n	color = AgXOutsetMatrix * color;\n	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );\n	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;\n	color = clamp( color, 0.0, 1.0 );\n	return color;\n}\nvec3 NeutralToneMapping( vec3 color ) {\n	const float StartCompression = 0.8 - 0.04;\n	const float Desaturation = 0.15;\n	color *= toneMappingExposure;\n	float x = min( color.r, min( color.g, color.b ) );\n	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;\n	color -= offset;\n	float peak = max( color.r, max( color.g, color.b ) );\n	if ( peak < StartCompression ) return color;\n	float d = 1. - StartCompression;\n	float newPeak = 1. - d * d / ( peak + d - StartCompression );\n	color *= newPeak / peak;\n	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );\n	return mix( color, vec3( newPeak ), g );\n}\nvec3 CustomToneMapping( vec3 color ) { return color; }";
  var transmission_fragment = "#ifdef USE_TRANSMISSION\n	material.transmission = transmission;\n	material.transmissionAlpha = 1.0;\n	material.thickness = thickness;\n	material.attenuationDistance = attenuationDistance;\n	material.attenuationColor = attenuationColor;\n	#ifdef USE_TRANSMISSIONMAP\n		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;\n	#endif\n	#ifdef USE_THICKNESSMAP\n		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;\n	#endif\n	vec3 pos = vWorldPosition;\n	vec3 v = normalize( cameraPosition - pos );\n	vec3 n = inverseTransformDirection( normal, viewMatrix );\n	vec4 transmitted = getIBLVolumeRefraction(\n		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,\n		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,\n		material.attenuationColor, material.attenuationDistance );\n	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );\n	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );\n#endif";
  var transmission_pars_fragment = "#ifdef USE_TRANSMISSION\n	uniform float transmission;\n	uniform float thickness;\n	uniform float attenuationDistance;\n	uniform vec3 attenuationColor;\n	#ifdef USE_TRANSMISSIONMAP\n		uniform sampler2D transmissionMap;\n	#endif\n	#ifdef USE_THICKNESSMAP\n		uniform sampler2D thicknessMap;\n	#endif\n	uniform vec2 transmissionSamplerSize;\n	uniform sampler2D transmissionSamplerMap;\n	uniform mat4 modelMatrix;\n	uniform mat4 projectionMatrix;\n	varying vec3 vWorldPosition;\n	float w0( float a ) {\n		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );\n	}\n	float w1( float a ) {\n		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );\n	}\n	float w2( float a ){\n		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );\n	}\n	float w3( float a ) {\n		return ( 1.0 / 6.0 ) * ( a * a * a );\n	}\n	float g0( float a ) {\n		return w0( a ) + w1( a );\n	}\n	float g1( float a ) {\n		return w2( a ) + w3( a );\n	}\n	float h0( float a ) {\n		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );\n	}\n	float h1( float a ) {\n		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );\n	}\n	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {\n		uv = uv * texelSize.zw + 0.5;\n		vec2 iuv = floor( uv );\n		vec2 fuv = fract( uv );\n		float g0x = g0( fuv.x );\n		float g1x = g1( fuv.x );\n		float h0x = h0( fuv.x );\n		float h1x = h1( fuv.x );\n		float h0y = h0( fuv.y );\n		float h1y = h1( fuv.y );\n		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;\n		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;\n		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;\n		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;\n		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +\n			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );\n	}\n	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {\n		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );\n		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );\n		vec2 fLodSizeInv = 1.0 / fLodSize;\n		vec2 cLodSizeInv = 1.0 / cLodSize;\n		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );\n		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );\n		return mix( fSample, cSample, fract( lod ) );\n	}\n	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {\n		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );\n		vec3 modelScale;\n		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );\n		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );\n		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );\n		return normalize( refractionVector ) * thickness * modelScale;\n	}\n	float applyIorToRoughness( const in float roughness, const in float ior ) {\n		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );\n	}\n	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {\n		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );\n		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );\n	}\n	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {\n		if ( isinf( attenuationDistance ) ) {\n			return vec3( 1.0 );\n		} else {\n			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;\n			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;\n		}\n	}\n	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,\n		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,\n		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,\n		const in vec3 attenuationColor, const in float attenuationDistance ) {\n		vec4 transmittedLight;\n		vec3 transmittance;\n		#ifdef USE_DISPERSION\n			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;\n			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );\n			for ( int i = 0; i < 3; i ++ ) {\n				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );\n				vec3 refractedRayExit = position + transmissionRay;\n		\n				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );\n				vec2 refractionCoords = ndcPos.xy / ndcPos.w;\n				refractionCoords += 1.0;\n				refractionCoords /= 2.0;\n		\n				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );\n				transmittedLight[ i ] = transmissionSample[ i ];\n				transmittedLight.a += transmissionSample.a;\n				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];\n			}\n			transmittedLight.a /= 3.0;\n		\n		#else\n		\n			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );\n			vec3 refractedRayExit = position + transmissionRay;\n			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );\n			vec2 refractionCoords = ndcPos.xy / ndcPos.w;\n			refractionCoords += 1.0;\n			refractionCoords /= 2.0;\n			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );\n			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );\n		\n		#endif\n		vec3 attenuatedColor = transmittance * transmittedLight.rgb;\n		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );\n		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;\n		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );\n	}\n#endif";
  var uv_pars_fragment = "#if defined( USE_UV ) || defined( USE_ANISOTROPY )\n	varying vec2 vUv;\n#endif\n#ifdef USE_MAP\n	varying vec2 vMapUv;\n#endif\n#ifdef USE_ALPHAMAP\n	varying vec2 vAlphaMapUv;\n#endif\n#ifdef USE_LIGHTMAP\n	varying vec2 vLightMapUv;\n#endif\n#ifdef USE_AOMAP\n	varying vec2 vAoMapUv;\n#endif\n#ifdef USE_BUMPMAP\n	varying vec2 vBumpMapUv;\n#endif\n#ifdef USE_NORMALMAP\n	varying vec2 vNormalMapUv;\n#endif\n#ifdef USE_EMISSIVEMAP\n	varying vec2 vEmissiveMapUv;\n#endif\n#ifdef USE_METALNESSMAP\n	varying vec2 vMetalnessMapUv;\n#endif\n#ifdef USE_ROUGHNESSMAP\n	varying vec2 vRoughnessMapUv;\n#endif\n#ifdef USE_ANISOTROPYMAP\n	varying vec2 vAnisotropyMapUv;\n#endif\n#ifdef USE_CLEARCOATMAP\n	varying vec2 vClearcoatMapUv;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n	varying vec2 vClearcoatNormalMapUv;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n	varying vec2 vClearcoatRoughnessMapUv;\n#endif\n#ifdef USE_IRIDESCENCEMAP\n	varying vec2 vIridescenceMapUv;\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n	varying vec2 vIridescenceThicknessMapUv;\n#endif\n#ifdef USE_SHEEN_COLORMAP\n	varying vec2 vSheenColorMapUv;\n#endif\n#ifdef USE_SHEEN_ROUGHNESSMAP\n	varying vec2 vSheenRoughnessMapUv;\n#endif\n#ifdef USE_SPECULARMAP\n	varying vec2 vSpecularMapUv;\n#endif\n#ifdef USE_SPECULAR_COLORMAP\n	varying vec2 vSpecularColorMapUv;\n#endif\n#ifdef USE_SPECULAR_INTENSITYMAP\n	varying vec2 vSpecularIntensityMapUv;\n#endif\n#ifdef USE_TRANSMISSIONMAP\n	uniform mat3 transmissionMapTransform;\n	varying vec2 vTransmissionMapUv;\n#endif\n#ifdef USE_THICKNESSMAP\n	uniform mat3 thicknessMapTransform;\n	varying vec2 vThicknessMapUv;\n#endif";
  var uv_pars_vertex = "#if defined( USE_UV ) || defined( USE_ANISOTROPY )\n	varying vec2 vUv;\n#endif\n#ifdef USE_MAP\n	uniform mat3 mapTransform;\n	varying vec2 vMapUv;\n#endif\n#ifdef USE_ALPHAMAP\n	uniform mat3 alphaMapTransform;\n	varying vec2 vAlphaMapUv;\n#endif\n#ifdef USE_LIGHTMAP\n	uniform mat3 lightMapTransform;\n	varying vec2 vLightMapUv;\n#endif\n#ifdef USE_AOMAP\n	uniform mat3 aoMapTransform;\n	varying vec2 vAoMapUv;\n#endif\n#ifdef USE_BUMPMAP\n	uniform mat3 bumpMapTransform;\n	varying vec2 vBumpMapUv;\n#endif\n#ifdef USE_NORMALMAP\n	uniform mat3 normalMapTransform;\n	varying vec2 vNormalMapUv;\n#endif\n#ifdef USE_DISPLACEMENTMAP\n	uniform mat3 displacementMapTransform;\n	varying vec2 vDisplacementMapUv;\n#endif\n#ifdef USE_EMISSIVEMAP\n	uniform mat3 emissiveMapTransform;\n	varying vec2 vEmissiveMapUv;\n#endif\n#ifdef USE_METALNESSMAP\n	uniform mat3 metalnessMapTransform;\n	varying vec2 vMetalnessMapUv;\n#endif\n#ifdef USE_ROUGHNESSMAP\n	uniform mat3 roughnessMapTransform;\n	varying vec2 vRoughnessMapUv;\n#endif\n#ifdef USE_ANISOTROPYMAP\n	uniform mat3 anisotropyMapTransform;\n	varying vec2 vAnisotropyMapUv;\n#endif\n#ifdef USE_CLEARCOATMAP\n	uniform mat3 clearcoatMapTransform;\n	varying vec2 vClearcoatMapUv;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n	uniform mat3 clearcoatNormalMapTransform;\n	varying vec2 vClearcoatNormalMapUv;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n	uniform mat3 clearcoatRoughnessMapTransform;\n	varying vec2 vClearcoatRoughnessMapUv;\n#endif\n#ifdef USE_SHEEN_COLORMAP\n	uniform mat3 sheenColorMapTransform;\n	varying vec2 vSheenColorMapUv;\n#endif\n#ifdef USE_SHEEN_ROUGHNESSMAP\n	uniform mat3 sheenRoughnessMapTransform;\n	varying vec2 vSheenRoughnessMapUv;\n#endif\n#ifdef USE_IRIDESCENCEMAP\n	uniform mat3 iridescenceMapTransform;\n	varying vec2 vIridescenceMapUv;\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n	uniform mat3 iridescenceThicknessMapTransform;\n	varying vec2 vIridescenceThicknessMapUv;\n#endif\n#ifdef USE_SPECULARMAP\n	uniform mat3 specularMapTransform;\n	varying vec2 vSpecularMapUv;\n#endif\n#ifdef USE_SPECULAR_COLORMAP\n	uniform mat3 specularColorMapTransform;\n	varying vec2 vSpecularColorMapUv;\n#endif\n#ifdef USE_SPECULAR_INTENSITYMAP\n	uniform mat3 specularIntensityMapTransform;\n	varying vec2 vSpecularIntensityMapUv;\n#endif\n#ifdef USE_TRANSMISSIONMAP\n	uniform mat3 transmissionMapTransform;\n	varying vec2 vTransmissionMapUv;\n#endif\n#ifdef USE_THICKNESSMAP\n	uniform mat3 thicknessMapTransform;\n	varying vec2 vThicknessMapUv;\n#endif";
  var uv_vertex = "#if defined( USE_UV ) || defined( USE_ANISOTROPY )\n	vUv = vec3( uv, 1 ).xy;\n#endif\n#ifdef USE_MAP\n	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_ALPHAMAP\n	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_LIGHTMAP\n	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_AOMAP\n	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_BUMPMAP\n	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_NORMALMAP\n	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_DISPLACEMENTMAP\n	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_EMISSIVEMAP\n	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_METALNESSMAP\n	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_ROUGHNESSMAP\n	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_ANISOTROPYMAP\n	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_CLEARCOATMAP\n	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_IRIDESCENCEMAP\n	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SHEEN_COLORMAP\n	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SHEEN_ROUGHNESSMAP\n	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SPECULARMAP\n	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SPECULAR_COLORMAP\n	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SPECULAR_INTENSITYMAP\n	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_TRANSMISSIONMAP\n	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_THICKNESSMAP\n	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;\n#endif";
  var worldpos_vertex = "#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0\n	vec4 worldPosition = vec4( transformed, 1.0 );\n	#ifdef USE_BATCHING\n		worldPosition = batchingMatrix * worldPosition;\n	#endif\n	#ifdef USE_INSTANCING\n		worldPosition = instanceMatrix * worldPosition;\n	#endif\n	worldPosition = modelMatrix * worldPosition;\n#endif";
  var vertex$h = "varying vec2 vUv;\nuniform mat3 uvTransform;\nvoid main() {\n	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n	gl_Position = vec4( position.xy, 1.0, 1.0 );\n}";
  var fragment$h = "uniform sampler2D t2D;\nuniform float backgroundIntensity;\nvarying vec2 vUv;\nvoid main() {\n	vec4 texColor = texture2D( t2D, vUv );\n	#ifdef DECODE_VIDEO_TEXTURE\n		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );\n	#endif\n	texColor.rgb *= backgroundIntensity;\n	gl_FragColor = texColor;\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n}";
  var vertex$g = "varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n	vWorldDirection = transformDirection( position, modelMatrix );\n	#include <begin_vertex>\n	#include <project_vertex>\n	gl_Position.z = gl_Position.w;\n}";
  var fragment$g = "#ifdef ENVMAP_TYPE_CUBE\n	uniform samplerCube envMap;\n#elif defined( ENVMAP_TYPE_CUBE_UV )\n	uniform sampler2D envMap;\n#endif\nuniform float flipEnvMap;\nuniform float backgroundBlurriness;\nuniform float backgroundIntensity;\nuniform mat3 backgroundRotation;\nvarying vec3 vWorldDirection;\n#include <cube_uv_reflection_fragment>\nvoid main() {\n	#ifdef ENVMAP_TYPE_CUBE\n		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );\n	#elif defined( ENVMAP_TYPE_CUBE_UV )\n		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );\n	#else\n		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );\n	#endif\n	texColor.rgb *= backgroundIntensity;\n	gl_FragColor = texColor;\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n}";
  var vertex$f = "varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n	vWorldDirection = transformDirection( position, modelMatrix );\n	#include <begin_vertex>\n	#include <project_vertex>\n	gl_Position.z = gl_Position.w;\n}";
  var fragment$f = "uniform samplerCube tCube;\nuniform float tFlip;\nuniform float opacity;\nvarying vec3 vWorldDirection;\nvoid main() {\n	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );\n	gl_FragColor = texColor;\n	gl_FragColor.a *= opacity;\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n}";
  var vertex$e = "#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvarying vec2 vHighPrecisionZW;\nvoid main() {\n	#include <uv_vertex>\n	#include <batching_vertex>\n	#include <skinbase_vertex>\n	#include <morphinstance_vertex>\n	#ifdef USE_DISPLACEMENTMAP\n		#include <beginnormal_vertex>\n		#include <morphnormal_vertex>\n		#include <skinnormal_vertex>\n	#endif\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	vHighPrecisionZW = gl_Position.zw;\n}";
  var fragment$e = "#if DEPTH_PACKING == 3200\n	uniform float opacity;\n#endif\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvarying vec2 vHighPrecisionZW;\nvoid main() {\n	vec4 diffuseColor = vec4( 1.0 );\n	#include <clipping_planes_fragment>\n	#if DEPTH_PACKING == 3200\n		diffuseColor.a = opacity;\n	#endif\n	#include <map_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <logdepthbuf_fragment>\n	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;\n	#if DEPTH_PACKING == 3200\n		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );\n	#elif DEPTH_PACKING == 3201\n		gl_FragColor = packDepthToRGBA( fragCoordZ );\n	#elif DEPTH_PACKING == 3202\n		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );\n	#elif DEPTH_PACKING == 3203\n		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );\n	#endif\n}";
  var vertex$d = "#define DISTANCE\nvarying vec3 vWorldPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <batching_vertex>\n	#include <skinbase_vertex>\n	#include <morphinstance_vertex>\n	#ifdef USE_DISPLACEMENTMAP\n		#include <beginnormal_vertex>\n		#include <morphnormal_vertex>\n		#include <skinnormal_vertex>\n	#endif\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <worldpos_vertex>\n	#include <clipping_planes_vertex>\n	vWorldPosition = worldPosition.xyz;\n}";
  var fragment$d = "#define DISTANCE\nuniform vec3 referencePosition;\nuniform float nearDistance;\nuniform float farDistance;\nvarying vec3 vWorldPosition;\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main () {\n	vec4 diffuseColor = vec4( 1.0 );\n	#include <clipping_planes_fragment>\n	#include <map_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	float dist = length( vWorldPosition - referencePosition );\n	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );\n	dist = saturate( dist );\n	gl_FragColor = packDepthToRGBA( dist );\n}";
  var vertex$c = "varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n	vWorldDirection = transformDirection( position, modelMatrix );\n	#include <begin_vertex>\n	#include <project_vertex>\n}";
  var fragment$c = "uniform sampler2D tEquirect;\nvarying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n	vec3 direction = normalize( vWorldDirection );\n	vec2 sampleUV = equirectUv( direction );\n	gl_FragColor = texture2D( tEquirect, sampleUV );\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n}";
  var vertex$b = "uniform float scale;\nattribute float lineDistance;\nvarying float vLineDistance;\n#include <common>\n#include <uv_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	vLineDistance = scale * lineDistance;\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphinstance_vertex>\n	#include <morphcolor_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	#include <fog_vertex>\n}";
  var fragment$b = "uniform vec3 diffuse;\nuniform float opacity;\nuniform float dashSize;\nuniform float totalSize;\nvarying float vLineDistance;\n#include <common>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	if ( mod( vLineDistance, totalSize ) > dashSize ) {\n		discard;\n	}\n	vec3 outgoingLight = vec3( 0.0 );\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	outgoingLight = diffuseColor.rgb;\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n}";
  var vertex$a = "#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphinstance_vertex>\n	#include <morphcolor_vertex>\n	#include <batching_vertex>\n	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )\n		#include <beginnormal_vertex>\n		#include <morphnormal_vertex>\n		#include <skinbase_vertex>\n		#include <skinnormal_vertex>\n		#include <defaultnormal_vertex>\n	#endif\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	#include <worldpos_vertex>\n	#include <envmap_vertex>\n	#include <fog_vertex>\n}";
  var fragment$a = "uniform vec3 diffuse;\nuniform float opacity;\n#ifndef FLAT_SHADED\n	varying vec3 vNormal;\n#endif\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <specularmap_fragment>\n	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n	#ifdef USE_LIGHTMAP\n		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );\n		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;\n	#else\n		reflectedLight.indirectDiffuse += vec3( 1.0 );\n	#endif\n	#include <aomap_fragment>\n	reflectedLight.indirectDiffuse *= diffuseColor.rgb;\n	vec3 outgoingLight = reflectedLight.indirectDiffuse;\n	#include <envmap_fragment>\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n	#include <dithering_fragment>\n}";
  var vertex$9 = "#define LAMBERT\nvarying vec3 vViewPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphinstance_vertex>\n	#include <morphcolor_vertex>\n	#include <batching_vertex>\n	#include <beginnormal_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <normal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	vViewPosition = - mvPosition.xyz;\n	#include <worldpos_vertex>\n	#include <envmap_vertex>\n	#include <shadowmap_vertex>\n	#include <fog_vertex>\n}";
  var fragment$9 = "#define LAMBERT\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_lambert_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n	vec3 totalEmissiveRadiance = emissive;\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <specularmap_fragment>\n	#include <normal_fragment_begin>\n	#include <normal_fragment_maps>\n	#include <emissivemap_fragment>\n	#include <lights_lambert_fragment>\n	#include <lights_fragment_begin>\n	#include <lights_fragment_maps>\n	#include <lights_fragment_end>\n	#include <aomap_fragment>\n	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n	#include <envmap_fragment>\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n	#include <dithering_fragment>\n}";
  var vertex$8 = "#define MATCAP\nvarying vec3 vViewPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <color_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphinstance_vertex>\n	#include <morphcolor_vertex>\n	#include <batching_vertex>\n	#include <beginnormal_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <normal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	#include <fog_vertex>\n	vViewPosition = - mvPosition.xyz;\n}";
  var fragment$8 = "#define MATCAP\nuniform vec3 diffuse;\nuniform float opacity;\nuniform sampler2D matcap;\nvarying vec3 vViewPosition;\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <fog_pars_fragment>\n#include <normal_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <normal_fragment_begin>\n	#include <normal_fragment_maps>\n	vec3 viewDir = normalize( vViewPosition );\n	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );\n	vec3 y = cross( viewDir, x );\n	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;\n	#ifdef USE_MATCAP\n		vec4 matcapColor = texture2D( matcap, uv );\n	#else\n		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );\n	#endif\n	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n	#include <dithering_fragment>\n}";
  var vertex$7 = "#define NORMAL\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )\n	varying vec3 vViewPosition;\n#endif\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <batching_vertex>\n	#include <beginnormal_vertex>\n	#include <morphinstance_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <normal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )\n	vViewPosition = - mvPosition.xyz;\n#endif\n}";
  var fragment$7 = "#define NORMAL\nuniform float opacity;\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )\n	varying vec3 vViewPosition;\n#endif\n#include <packing>\n#include <uv_pars_fragment>\n#include <normal_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );\n	#include <clipping_planes_fragment>\n	#include <logdepthbuf_fragment>\n	#include <normal_fragment_begin>\n	#include <normal_fragment_maps>\n	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );\n	#ifdef OPAQUE\n		gl_FragColor.a = 1.0;\n	#endif\n}";
  var vertex$6 = "#define PHONG\nvarying vec3 vViewPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphcolor_vertex>\n	#include <batching_vertex>\n	#include <beginnormal_vertex>\n	#include <morphinstance_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <normal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	vViewPosition = - mvPosition.xyz;\n	#include <worldpos_vertex>\n	#include <envmap_vertex>\n	#include <shadowmap_vertex>\n	#include <fog_vertex>\n}";
  var fragment$6 = "#define PHONG\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_phong_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n	vec3 totalEmissiveRadiance = emissive;\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <specularmap_fragment>\n	#include <normal_fragment_begin>\n	#include <normal_fragment_maps>\n	#include <emissivemap_fragment>\n	#include <lights_phong_fragment>\n	#include <lights_fragment_begin>\n	#include <lights_fragment_maps>\n	#include <lights_fragment_end>\n	#include <aomap_fragment>\n	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n	#include <envmap_fragment>\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n	#include <dithering_fragment>\n}";
  var vertex$5 = "#define STANDARD\nvarying vec3 vViewPosition;\n#ifdef USE_TRANSMISSION\n	varying vec3 vWorldPosition;\n#endif\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphinstance_vertex>\n	#include <morphcolor_vertex>\n	#include <batching_vertex>\n	#include <beginnormal_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <normal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	vViewPosition = - mvPosition.xyz;\n	#include <worldpos_vertex>\n	#include <shadowmap_vertex>\n	#include <fog_vertex>\n#ifdef USE_TRANSMISSION\n	vWorldPosition = worldPosition.xyz;\n#endif\n}";
  var fragment$5 = "#define STANDARD\n#ifdef PHYSICAL\n	#define IOR\n	#define USE_SPECULAR\n#endif\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float roughness;\nuniform float metalness;\nuniform float opacity;\n#ifdef IOR\n	uniform float ior;\n#endif\n#ifdef USE_SPECULAR\n	uniform float specularIntensity;\n	uniform vec3 specularColor;\n	#ifdef USE_SPECULAR_COLORMAP\n		uniform sampler2D specularColorMap;\n	#endif\n	#ifdef USE_SPECULAR_INTENSITYMAP\n		uniform sampler2D specularIntensityMap;\n	#endif\n#endif\n#ifdef USE_CLEARCOAT\n	uniform float clearcoat;\n	uniform float clearcoatRoughness;\n#endif\n#ifdef USE_DISPERSION\n	uniform float dispersion;\n#endif\n#ifdef USE_IRIDESCENCE\n	uniform float iridescence;\n	uniform float iridescenceIOR;\n	uniform float iridescenceThicknessMinimum;\n	uniform float iridescenceThicknessMaximum;\n#endif\n#ifdef USE_SHEEN\n	uniform vec3 sheenColor;\n	uniform float sheenRoughness;\n	#ifdef USE_SHEEN_COLORMAP\n		uniform sampler2D sheenColorMap;\n	#endif\n	#ifdef USE_SHEEN_ROUGHNESSMAP\n		uniform sampler2D sheenRoughnessMap;\n	#endif\n#endif\n#ifdef USE_ANISOTROPY\n	uniform vec2 anisotropyVector;\n	#ifdef USE_ANISOTROPYMAP\n		uniform sampler2D anisotropyMap;\n	#endif\n#endif\nvarying vec3 vViewPosition;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <iridescence_fragment>\n#include <cube_uv_reflection_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_physical_pars_fragment>\n#include <fog_pars_fragment>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_physical_pars_fragment>\n#include <transmission_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <clearcoat_pars_fragment>\n#include <iridescence_pars_fragment>\n#include <roughnessmap_pars_fragment>\n#include <metalnessmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n	vec3 totalEmissiveRadiance = emissive;\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <roughnessmap_fragment>\n	#include <metalnessmap_fragment>\n	#include <normal_fragment_begin>\n	#include <normal_fragment_maps>\n	#include <clearcoat_normal_fragment_begin>\n	#include <clearcoat_normal_fragment_maps>\n	#include <emissivemap_fragment>\n	#include <lights_physical_fragment>\n	#include <lights_fragment_begin>\n	#include <lights_fragment_maps>\n	#include <lights_fragment_end>\n	#include <aomap_fragment>\n	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;\n	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;\n	#include <transmission_fragment>\n	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;\n	#ifdef USE_SHEEN\n		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );\n		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;\n	#endif\n	#ifdef USE_CLEARCOAT\n		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );\n		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );\n		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;\n	#endif\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n	#include <dithering_fragment>\n}";
  var vertex$4 = "#define TOON\nvarying vec3 vViewPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphinstance_vertex>\n	#include <morphcolor_vertex>\n	#include <batching_vertex>\n	#include <beginnormal_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <normal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	vViewPosition = - mvPosition.xyz;\n	#include <worldpos_vertex>\n	#include <shadowmap_vertex>\n	#include <fog_vertex>\n}";
  var fragment$4 = "#define TOON\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <gradientmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_toon_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n	vec3 totalEmissiveRadiance = emissive;\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <normal_fragment_begin>\n	#include <normal_fragment_maps>\n	#include <emissivemap_fragment>\n	#include <lights_toon_fragment>\n	#include <lights_fragment_begin>\n	#include <lights_fragment_maps>\n	#include <lights_fragment_end>\n	#include <aomap_fragment>\n	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n	#include <dithering_fragment>\n}";
  var vertex$3 = "uniform float size;\nuniform float scale;\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n#ifdef USE_POINTS_UV\n	varying vec2 vUv;\n	uniform mat3 uvTransform;\n#endif\nvoid main() {\n	#ifdef USE_POINTS_UV\n		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n	#endif\n	#include <color_vertex>\n	#include <morphinstance_vertex>\n	#include <morphcolor_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <project_vertex>\n	gl_PointSize = size;\n	#ifdef USE_SIZEATTENUATION\n		bool isPerspective = isPerspectiveMatrix( projectionMatrix );\n		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );\n	#endif\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	#include <worldpos_vertex>\n	#include <fog_vertex>\n}";
  var fragment$3 = "uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <color_pars_fragment>\n#include <map_particle_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	vec3 outgoingLight = vec3( 0.0 );\n	#include <logdepthbuf_fragment>\n	#include <map_particle_fragment>\n	#include <color_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	outgoingLight = diffuseColor.rgb;\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n}";
  var vertex$2 = "#include <common>\n#include <batching_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <shadowmap_pars_vertex>\nvoid main() {\n	#include <batching_vertex>\n	#include <beginnormal_vertex>\n	#include <morphinstance_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <worldpos_vertex>\n	#include <shadowmap_vertex>\n	#include <fog_vertex>\n}";
  var fragment$2 = "uniform vec3 color;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <logdepthbuf_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\nvoid main() {\n	#include <logdepthbuf_fragment>\n	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n}";
  var vertex$1 = "uniform float rotation;\nuniform vec2 center;\n#include <common>\n#include <uv_pars_vertex>\n#include <fog_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	vec4 mvPosition = modelViewMatrix[ 3 ];\n	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );\n	#ifndef USE_SIZEATTENUATION\n		bool isPerspective = isPerspectiveMatrix( projectionMatrix );\n		if ( isPerspective ) scale *= - mvPosition.z;\n	#endif\n	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;\n	vec2 rotatedPosition;\n	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;\n	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;\n	mvPosition.xy += rotatedPosition;\n	gl_Position = projectionMatrix * mvPosition;\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	#include <fog_vertex>\n}";
  var fragment$1 = "uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	vec3 outgoingLight = vec3( 0.0 );\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	outgoingLight = diffuseColor.rgb;\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n}";
  var ShaderChunk = {
    alphahash_fragment,
    alphahash_pars_fragment,
    alphamap_fragment,
    alphamap_pars_fragment,
    alphatest_fragment,
    alphatest_pars_fragment,
    aomap_fragment,
    aomap_pars_fragment,
    batching_pars_vertex,
    batching_vertex,
    begin_vertex,
    beginnormal_vertex,
    bsdfs,
    iridescence_fragment,
    bumpmap_pars_fragment,
    clipping_planes_fragment,
    clipping_planes_pars_fragment,
    clipping_planes_pars_vertex,
    clipping_planes_vertex,
    color_fragment,
    color_pars_fragment,
    color_pars_vertex,
    color_vertex,
    common,
    cube_uv_reflection_fragment,
    defaultnormal_vertex,
    displacementmap_pars_vertex,
    displacementmap_vertex,
    emissivemap_fragment,
    emissivemap_pars_fragment,
    colorspace_fragment,
    colorspace_pars_fragment,
    envmap_fragment,
    envmap_common_pars_fragment,
    envmap_pars_fragment,
    envmap_pars_vertex,
    envmap_physical_pars_fragment,
    envmap_vertex,
    fog_vertex,
    fog_pars_vertex,
    fog_fragment,
    fog_pars_fragment,
    gradientmap_pars_fragment,
    lightmap_pars_fragment,
    lights_lambert_fragment,
    lights_lambert_pars_fragment,
    lights_pars_begin,
    lights_toon_fragment,
    lights_toon_pars_fragment,
    lights_phong_fragment,
    lights_phong_pars_fragment,
    lights_physical_fragment,
    lights_physical_pars_fragment,
    lights_fragment_begin,
    lights_fragment_maps,
    lights_fragment_end,
    logdepthbuf_fragment,
    logdepthbuf_pars_fragment,
    logdepthbuf_pars_vertex,
    logdepthbuf_vertex,
    map_fragment,
    map_pars_fragment,
    map_particle_fragment,
    map_particle_pars_fragment,
    metalnessmap_fragment,
    metalnessmap_pars_fragment,
    morphinstance_vertex,
    morphcolor_vertex,
    morphnormal_vertex,
    morphtarget_pars_vertex,
    morphtarget_vertex,
    normal_fragment_begin,
    normal_fragment_maps,
    normal_pars_fragment,
    normal_pars_vertex,
    normal_vertex,
    normalmap_pars_fragment,
    clearcoat_normal_fragment_begin,
    clearcoat_normal_fragment_maps,
    clearcoat_pars_fragment,
    iridescence_pars_fragment,
    opaque_fragment,
    packing,
    premultiplied_alpha_fragment,
    project_vertex,
    dithering_fragment,
    dithering_pars_fragment,
    roughnessmap_fragment,
    roughnessmap_pars_fragment,
    shadowmap_pars_fragment,
    shadowmap_pars_vertex,
    shadowmap_vertex,
    shadowmask_pars_fragment,
    skinbase_vertex,
    skinning_pars_vertex,
    skinning_vertex,
    skinnormal_vertex,
    specularmap_fragment,
    specularmap_pars_fragment,
    tonemapping_fragment,
    tonemapping_pars_fragment,
    transmission_fragment,
    transmission_pars_fragment,
    uv_pars_fragment,
    uv_pars_vertex,
    uv_vertex,
    worldpos_vertex,
    background_vert: vertex$h,
    background_frag: fragment$h,
    backgroundCube_vert: vertex$g,
    backgroundCube_frag: fragment$g,
    cube_vert: vertex$f,
    cube_frag: fragment$f,
    depth_vert: vertex$e,
    depth_frag: fragment$e,
    distanceRGBA_vert: vertex$d,
    distanceRGBA_frag: fragment$d,
    equirect_vert: vertex$c,
    equirect_frag: fragment$c,
    linedashed_vert: vertex$b,
    linedashed_frag: fragment$b,
    meshbasic_vert: vertex$a,
    meshbasic_frag: fragment$a,
    meshlambert_vert: vertex$9,
    meshlambert_frag: fragment$9,
    meshmatcap_vert: vertex$8,
    meshmatcap_frag: fragment$8,
    meshnormal_vert: vertex$7,
    meshnormal_frag: fragment$7,
    meshphong_vert: vertex$6,
    meshphong_frag: fragment$6,
    meshphysical_vert: vertex$5,
    meshphysical_frag: fragment$5,
    meshtoon_vert: vertex$4,
    meshtoon_frag: fragment$4,
    points_vert: vertex$3,
    points_frag: fragment$3,
    shadow_vert: vertex$2,
    shadow_frag: fragment$2,
    sprite_vert: vertex$1,
    sprite_frag: fragment$1
  };
  var UniformsLib = {
    common: {
      diffuse: { value: /* @__PURE__ */ new Color(16777215) },
      opacity: { value: 1 },
      map: { value: null },
      mapTransform: { value: /* @__PURE__ */ new Matrix3() },
      alphaMap: { value: null },
      alphaMapTransform: { value: /* @__PURE__ */ new Matrix3() },
      alphaTest: { value: 0 }
    },
    specularmap: {
      specularMap: { value: null },
      specularMapTransform: { value: /* @__PURE__ */ new Matrix3() }
    },
    envmap: {
      envMap: { value: null },
      envMapRotation: { value: /* @__PURE__ */ new Matrix3() },
      flipEnvMap: { value: -1 },
      reflectivity: { value: 1 },
      // basic, lambert, phong
      ior: { value: 1.5 },
      // physical
      refractionRatio: { value: 0.98 }
      // basic, lambert, phong
    },
    aomap: {
      aoMap: { value: null },
      aoMapIntensity: { value: 1 },
      aoMapTransform: { value: /* @__PURE__ */ new Matrix3() }
    },
    lightmap: {
      lightMap: { value: null },
      lightMapIntensity: { value: 1 },
      lightMapTransform: { value: /* @__PURE__ */ new Matrix3() }
    },
    bumpmap: {
      bumpMap: { value: null },
      bumpMapTransform: { value: /* @__PURE__ */ new Matrix3() },
      bumpScale: { value: 1 }
    },
    normalmap: {
      normalMap: { value: null },
      normalMapTransform: { value: /* @__PURE__ */ new Matrix3() },
      normalScale: { value: /* @__PURE__ */ new Vector2(1, 1) }
    },
    displacementmap: {
      displacementMap: { value: null },
      displacementMapTransform: { value: /* @__PURE__ */ new Matrix3() },
      displacementScale: { value: 1 },
      displacementBias: { value: 0 }
    },
    emissivemap: {
      emissiveMap: { value: null },
      emissiveMapTransform: { value: /* @__PURE__ */ new Matrix3() }
    },
    metalnessmap: {
      metalnessMap: { value: null },
      metalnessMapTransform: { value: /* @__PURE__ */ new Matrix3() }
    },
    roughnessmap: {
      roughnessMap: { value: null },
      roughnessMapTransform: { value: /* @__PURE__ */ new Matrix3() }
    },
    gradientmap: {
      gradientMap: { value: null }
    },
    fog: {
      fogDensity: { value: 25e-5 },
      fogNear: { value: 1 },
      fogFar: { value: 2e3 },
      fogColor: { value: /* @__PURE__ */ new Color(16777215) }
    },
    lights: {
      ambientLightColor: { value: [] },
      lightProbe: { value: [] },
      directionalLights: { value: [], properties: {
        direction: {},
        color: {}
      } },
      directionalLightShadows: { value: [], properties: {
        shadowIntensity: 1,
        shadowBias: {},
        shadowNormalBias: {},
        shadowRadius: {},
        shadowMapSize: {}
      } },
      directionalShadowMap: { value: [] },
      directionalShadowMatrix: { value: [] },
      spotLights: { value: [], properties: {
        color: {},
        position: {},
        direction: {},
        distance: {},
        coneCos: {},
        penumbraCos: {},
        decay: {}
      } },
      spotLightShadows: { value: [], properties: {
        shadowIntensity: 1,
        shadowBias: {},
        shadowNormalBias: {},
        shadowRadius: {},
        shadowMapSize: {}
      } },
      spotLightMap: { value: [] },
      spotShadowMap: { value: [] },
      spotLightMatrix: { value: [] },
      pointLights: { value: [], properties: {
        color: {},
        position: {},
        decay: {},
        distance: {}
      } },
      pointLightShadows: { value: [], properties: {
        shadowIntensity: 1,
        shadowBias: {},
        shadowNormalBias: {},
        shadowRadius: {},
        shadowMapSize: {},
        shadowCameraNear: {},
        shadowCameraFar: {}
      } },
      pointShadowMap: { value: [] },
      pointShadowMatrix: { value: [] },
      hemisphereLights: { value: [], properties: {
        direction: {},
        skyColor: {},
        groundColor: {}
      } },
      // TODO (abelnation): RectAreaLight BRDF data needs to be moved from example to main src
      rectAreaLights: { value: [], properties: {
        color: {},
        position: {},
        width: {},
        height: {}
      } },
      ltc_1: { value: null },
      ltc_2: { value: null }
    },
    points: {
      diffuse: { value: /* @__PURE__ */ new Color(16777215) },
      opacity: { value: 1 },
      size: { value: 1 },
      scale: { value: 1 },
      map: { value: null },
      alphaMap: { value: null },
      alphaMapTransform: { value: /* @__PURE__ */ new Matrix3() },
      alphaTest: { value: 0 },
      uvTransform: { value: /* @__PURE__ */ new Matrix3() }
    },
    sprite: {
      diffuse: { value: /* @__PURE__ */ new Color(16777215) },
      opacity: { value: 1 },
      center: { value: /* @__PURE__ */ new Vector2(0.5, 0.5) },
      rotation: { value: 0 },
      map: { value: null },
      mapTransform: { value: /* @__PURE__ */ new Matrix3() },
      alphaMap: { value: null },
      alphaMapTransform: { value: /* @__PURE__ */ new Matrix3() },
      alphaTest: { value: 0 }
    }
  };
  var ShaderLib = {
    basic: {
      uniforms: /* @__PURE__ */ mergeUniforms([
        UniformsLib.common,
        UniformsLib.specularmap,
        UniformsLib.envmap,
        UniformsLib.aomap,
        UniformsLib.lightmap,
        UniformsLib.fog
      ]),
      vertexShader: ShaderChunk.meshbasic_vert,
      fragmentShader: ShaderChunk.meshbasic_frag
    },
    lambert: {
      uniforms: /* @__PURE__ */ mergeUniforms([
        UniformsLib.common,
        UniformsLib.specularmap,
        UniformsLib.envmap,
        UniformsLib.aomap,
        UniformsLib.lightmap,
        UniformsLib.emissivemap,
        UniformsLib.bumpmap,
        UniformsLib.normalmap,
        UniformsLib.displacementmap,
        UniformsLib.fog,
        UniformsLib.lights,
        {
          emissive: { value: /* @__PURE__ */ new Color(0) }
        }
      ]),
      vertexShader: ShaderChunk.meshlambert_vert,
      fragmentShader: ShaderChunk.meshlambert_frag
    },
    phong: {
      uniforms: /* @__PURE__ */ mergeUniforms([
        UniformsLib.common,
        UniformsLib.specularmap,
        UniformsLib.envmap,
        UniformsLib.aomap,
        UniformsLib.lightmap,
        UniformsLib.emissivemap,
        UniformsLib.bumpmap,
        UniformsLib.normalmap,
        UniformsLib.displacementmap,
        UniformsLib.fog,
        UniformsLib.lights,
        {
          emissive: { value: /* @__PURE__ */ new Color(0) },
          specular: { value: /* @__PURE__ */ new Color(1118481) },
          shininess: { value: 30 }
        }
      ]),
      vertexShader: ShaderChunk.meshphong_vert,
      fragmentShader: ShaderChunk.meshphong_frag
    },
    standard: {
      uniforms: /* @__PURE__ */ mergeUniforms([
        UniformsLib.common,
        UniformsLib.envmap,
        UniformsLib.aomap,
        UniformsLib.lightmap,
        UniformsLib.emissivemap,
        UniformsLib.bumpmap,
        UniformsLib.normalmap,
        UniformsLib.displacementmap,
        UniformsLib.roughnessmap,
        UniformsLib.metalnessmap,
        UniformsLib.fog,
        UniformsLib.lights,
        {
          emissive: { value: /* @__PURE__ */ new Color(0) },
          roughness: { value: 1 },
          metalness: { value: 0 },
          envMapIntensity: { value: 1 }
        }
      ]),
      vertexShader: ShaderChunk.meshphysical_vert,
      fragmentShader: ShaderChunk.meshphysical_frag
    },
    toon: {
      uniforms: /* @__PURE__ */ mergeUniforms([
        UniformsLib.common,
        UniformsLib.aomap,
        UniformsLib.lightmap,
        UniformsLib.emissivemap,
        UniformsLib.bumpmap,
        UniformsLib.normalmap,
        UniformsLib.displacementmap,
        UniformsLib.gradientmap,
        UniformsLib.fog,
        UniformsLib.lights,
        {
          emissive: { value: /* @__PURE__ */ new Color(0) }
        }
      ]),
      vertexShader: ShaderChunk.meshtoon_vert,
      fragmentShader: ShaderChunk.meshtoon_frag
    },
    matcap: {
      uniforms: /* @__PURE__ */ mergeUniforms([
        UniformsLib.common,
        UniformsLib.bumpmap,
        UniformsLib.normalmap,
        UniformsLib.displacementmap,
        UniformsLib.fog,
        {
          matcap: { value: null }
        }
      ]),
      vertexShader: ShaderChunk.meshmatcap_vert,
      fragmentShader: ShaderChunk.meshmatcap_frag
    },
    points: {
      uniforms: /* @__PURE__ */ mergeUniforms([
        UniformsLib.points,
        UniformsLib.fog
      ]),
      vertexShader: ShaderChunk.points_vert,
      fragmentShader: ShaderChunk.points_frag
    },
    dashed: {
      uniforms: /* @__PURE__ */ mergeUniforms([
        UniformsLib.common,
        UniformsLib.fog,
        {
          scale: { value: 1 },
          dashSize: { value: 1 },
          totalSize: { value: 2 }
        }
      ]),
      vertexShader: ShaderChunk.linedashed_vert,
      fragmentShader: ShaderChunk.linedashed_frag
    },
    depth: {
      uniforms: /* @__PURE__ */ mergeUniforms([
        UniformsLib.common,
        UniformsLib.displacementmap
      ]),
      vertexShader: ShaderChunk.depth_vert,
      fragmentShader: ShaderChunk.depth_frag
    },
    normal: {
      uniforms: /* @__PURE__ */ mergeUniforms([
        UniformsLib.common,
        UniformsLib.bumpmap,
        UniformsLib.normalmap,
        UniformsLib.displacementmap,
        {
          opacity: { value: 1 }
        }
      ]),
      vertexShader: ShaderChunk.meshnormal_vert,
      fragmentShader: ShaderChunk.meshnormal_frag
    },
    sprite: {
      uniforms: /* @__PURE__ */ mergeUniforms([
        UniformsLib.sprite,
        UniformsLib.fog
      ]),
      vertexShader: ShaderChunk.sprite_vert,
      fragmentShader: ShaderChunk.sprite_frag
    },
    background: {
      uniforms: {
        uvTransform: { value: /* @__PURE__ */ new Matrix3() },
        t2D: { value: null },
        backgroundIntensity: { value: 1 }
      },
      vertexShader: ShaderChunk.background_vert,
      fragmentShader: ShaderChunk.background_frag
    },
    backgroundCube: {
      uniforms: {
        envMap: { value: null },
        flipEnvMap: { value: -1 },
        backgroundBlurriness: { value: 0 },
        backgroundIntensity: { value: 1 },
        backgroundRotation: { value: /* @__PURE__ */ new Matrix3() }
      },
      vertexShader: ShaderChunk.backgroundCube_vert,
      fragmentShader: ShaderChunk.backgroundCube_frag
    },
    cube: {
      uniforms: {
        tCube: { value: null },
        tFlip: { value: -1 },
        opacity: { value: 1 }
      },
      vertexShader: ShaderChunk.cube_vert,
      fragmentShader: ShaderChunk.cube_frag
    },
    equirect: {
      uniforms: {
        tEquirect: { value: null }
      },
      vertexShader: ShaderChunk.equirect_vert,
      fragmentShader: ShaderChunk.equirect_frag
    },
    distanceRGBA: {
      uniforms: /* @__PURE__ */ mergeUniforms([
        UniformsLib.common,
        UniformsLib.displacementmap,
        {
          referencePosition: { value: /* @__PURE__ */ new Vector3() },
          nearDistance: { value: 1 },
          farDistance: { value: 1e3 }
        }
      ]),
      vertexShader: ShaderChunk.distanceRGBA_vert,
      fragmentShader: ShaderChunk.distanceRGBA_frag
    },
    shadow: {
      uniforms: /* @__PURE__ */ mergeUniforms([
        UniformsLib.lights,
        UniformsLib.fog,
        {
          color: { value: /* @__PURE__ */ new Color(0) },
          opacity: { value: 1 }
        }
      ]),
      vertexShader: ShaderChunk.shadow_vert,
      fragmentShader: ShaderChunk.shadow_frag
    }
  };
  ShaderLib.physical = {
    uniforms: /* @__PURE__ */ mergeUniforms([
      ShaderLib.standard.uniforms,
      {
        clearcoat: { value: 0 },
        clearcoatMap: { value: null },
        clearcoatMapTransform: { value: /* @__PURE__ */ new Matrix3() },
        clearcoatNormalMap: { value: null },
        clearcoatNormalMapTransform: { value: /* @__PURE__ */ new Matrix3() },
        clearcoatNormalScale: { value: /* @__PURE__ */ new Vector2(1, 1) },
        clearcoatRoughness: { value: 0 },
        clearcoatRoughnessMap: { value: null },
        clearcoatRoughnessMapTransform: { value: /* @__PURE__ */ new Matrix3() },
        dispersion: { value: 0 },
        iridescence: { value: 0 },
        iridescenceMap: { value: null },
        iridescenceMapTransform: { value: /* @__PURE__ */ new Matrix3() },
        iridescenceIOR: { value: 1.3 },
        iridescenceThicknessMinimum: { value: 100 },
        iridescenceThicknessMaximum: { value: 400 },
        iridescenceThicknessMap: { value: null },
        iridescenceThicknessMapTransform: { value: /* @__PURE__ */ new Matrix3() },
        sheen: { value: 0 },
        sheenColor: { value: /* @__PURE__ */ new Color(0) },
        sheenColorMap: { value: null },
        sheenColorMapTransform: { value: /* @__PURE__ */ new Matrix3() },
        sheenRoughness: { value: 1 },
        sheenRoughnessMap: { value: null },
        sheenRoughnessMapTransform: { value: /* @__PURE__ */ new Matrix3() },
        transmission: { value: 0 },
        transmissionMap: { value: null },
        transmissionMapTransform: { value: /* @__PURE__ */ new Matrix3() },
        transmissionSamplerSize: { value: /* @__PURE__ */ new Vector2() },
        transmissionSamplerMap: { value: null },
        thickness: { value: 0 },
        thicknessMap: { value: null },
        thicknessMapTransform: { value: /* @__PURE__ */ new Matrix3() },
        attenuationDistance: { value: 0 },
        attenuationColor: { value: /* @__PURE__ */ new Color(0) },
        specularColor: { value: /* @__PURE__ */ new Color(1, 1, 1) },
        specularColorMap: { value: null },
        specularColorMapTransform: { value: /* @__PURE__ */ new Matrix3() },
        specularIntensity: { value: 1 },
        specularIntensityMap: { value: null },
        specularIntensityMapTransform: { value: /* @__PURE__ */ new Matrix3() },
        anisotropyVector: { value: /* @__PURE__ */ new Vector2() },
        anisotropyMap: { value: null },
        anisotropyMapTransform: { value: /* @__PURE__ */ new Matrix3() }
      }
    ]),
    vertexShader: ShaderChunk.meshphysical_vert,
    fragmentShader: ShaderChunk.meshphysical_frag
  };
  var _rgb = { r: 0, b: 0, g: 0 };
  var _e1$1 = /* @__PURE__ */ new Euler();
  var _m1$12 = /* @__PURE__ */ new Matrix4();
  function WebGLBackground(renderer2, cubemaps, cubeuvmaps, state, objects, alpha, premultipliedAlpha) {
    const clearColor = new Color(0);
    let clearAlpha = alpha === true ? 0 : 1;
    let planeMesh;
    let boxMesh;
    let currentBackground = null;
    let currentBackgroundVersion = 0;
    let currentTonemapping = null;
    function getBackground(scene2) {
      let background = scene2.isScene === true ? scene2.background : null;
      if (background && background.isTexture) {
        const usePMREM = scene2.backgroundBlurriness > 0;
        background = (usePMREM ? cubeuvmaps : cubemaps).get(background);
      }
      return background;
    }
    function render(scene2) {
      let forceClear = false;
      const background = getBackground(scene2);
      if (background === null) {
        setClear(clearColor, clearAlpha);
      } else if (background && background.isColor) {
        setClear(background, 1);
        forceClear = true;
      }
      const environmentBlendMode = renderer2.xr.getEnvironmentBlendMode();
      if (environmentBlendMode === "additive") {
        state.buffers.color.setClear(0, 0, 0, 1, premultipliedAlpha);
      } else if (environmentBlendMode === "alpha-blend") {
        state.buffers.color.setClear(0, 0, 0, 0, premultipliedAlpha);
      }
      if (renderer2.autoClear || forceClear) {
        state.buffers.depth.setTest(true);
        state.buffers.depth.setMask(true);
        state.buffers.color.setMask(true);
        renderer2.clear(renderer2.autoClearColor, renderer2.autoClearDepth, renderer2.autoClearStencil);
      }
    }
    function addToRenderList(renderList, scene2) {
      const background = getBackground(scene2);
      if (background && (background.isCubeTexture || background.mapping === CubeUVReflectionMapping)) {
        if (boxMesh === void 0) {
          boxMesh = new Mesh(
            new BoxGeometry(1, 1, 1),
            new ShaderMaterial({
              name: "BackgroundCubeMaterial",
              uniforms: cloneUniforms(ShaderLib.backgroundCube.uniforms),
              vertexShader: ShaderLib.backgroundCube.vertexShader,
              fragmentShader: ShaderLib.backgroundCube.fragmentShader,
              side: BackSide,
              depthTest: false,
              depthWrite: false,
              fog: false
            })
          );
          boxMesh.geometry.deleteAttribute("normal");
          boxMesh.geometry.deleteAttribute("uv");
          boxMesh.onBeforeRender = function(renderer3, scene3, camera2) {
            this.matrixWorld.copyPosition(camera2.matrixWorld);
          };
          Object.defineProperty(boxMesh.material, "envMap", {
            get: function() {
              return this.uniforms.envMap.value;
            }
          });
          objects.update(boxMesh);
        }
        _e1$1.copy(scene2.backgroundRotation);
        _e1$1.x *= -1;
        _e1$1.y *= -1;
        _e1$1.z *= -1;
        if (background.isCubeTexture && background.isRenderTargetTexture === false) {
          _e1$1.y *= -1;
          _e1$1.z *= -1;
        }
        boxMesh.material.uniforms.envMap.value = background;
        boxMesh.material.uniforms.flipEnvMap.value = background.isCubeTexture && background.isRenderTargetTexture === false ? -1 : 1;
        boxMesh.material.uniforms.backgroundBlurriness.value = scene2.backgroundBlurriness;
        boxMesh.material.uniforms.backgroundIntensity.value = scene2.backgroundIntensity;
        boxMesh.material.uniforms.backgroundRotation.value.setFromMatrix4(_m1$12.makeRotationFromEuler(_e1$1));
        boxMesh.material.toneMapped = ColorManagement.getTransfer(background.colorSpace) !== SRGBTransfer;
        if (currentBackground !== background || currentBackgroundVersion !== background.version || currentTonemapping !== renderer2.toneMapping) {
          boxMesh.material.needsUpdate = true;
          currentBackground = background;
          currentBackgroundVersion = background.version;
          currentTonemapping = renderer2.toneMapping;
        }
        boxMesh.layers.enableAll();
        renderList.unshift(boxMesh, boxMesh.geometry, boxMesh.material, 0, 0, null);
      } else if (background && background.isTexture) {
        if (planeMesh === void 0) {
          planeMesh = new Mesh(
            new PlaneGeometry(2, 2),
            new ShaderMaterial({
              name: "BackgroundMaterial",
              uniforms: cloneUniforms(ShaderLib.background.uniforms),
              vertexShader: ShaderLib.background.vertexShader,
              fragmentShader: ShaderLib.background.fragmentShader,
              side: FrontSide,
              depthTest: false,
              depthWrite: false,
              fog: false
            })
          );
          planeMesh.geometry.deleteAttribute("normal");
          Object.defineProperty(planeMesh.material, "map", {
            get: function() {
              return this.uniforms.t2D.value;
            }
          });
          objects.update(planeMesh);
        }
        planeMesh.material.uniforms.t2D.value = background;
        planeMesh.material.uniforms.backgroundIntensity.value = scene2.backgroundIntensity;
        planeMesh.material.toneMapped = ColorManagement.getTransfer(background.colorSpace) !== SRGBTransfer;
        if (background.matrixAutoUpdate === true) {
          background.updateMatrix();
        }
        planeMesh.material.uniforms.uvTransform.value.copy(background.matrix);
        if (currentBackground !== background || currentBackgroundVersion !== background.version || currentTonemapping !== renderer2.toneMapping) {
          planeMesh.material.needsUpdate = true;
          currentBackground = background;
          currentBackgroundVersion = background.version;
          currentTonemapping = renderer2.toneMapping;
        }
        planeMesh.layers.enableAll();
        renderList.unshift(planeMesh, planeMesh.geometry, planeMesh.material, 0, 0, null);
      }
    }
    function setClear(color, alpha2) {
      color.getRGB(_rgb, getUnlitUniformColorSpace(renderer2));
      state.buffers.color.setClear(_rgb.r, _rgb.g, _rgb.b, alpha2, premultipliedAlpha);
    }
    function dispose() {
      if (boxMesh !== void 0) {
        boxMesh.geometry.dispose();
        boxMesh.material.dispose();
      }
      if (planeMesh !== void 0) {
        planeMesh.geometry.dispose();
        planeMesh.material.dispose();
      }
    }
    return {
      getClearColor: function() {
        return clearColor;
      },
      setClearColor: function(color, alpha2 = 1) {
        clearColor.set(color);
        clearAlpha = alpha2;
        setClear(clearColor, clearAlpha);
      },
      getClearAlpha: function() {
        return clearAlpha;
      },
      setClearAlpha: function(alpha2) {
        clearAlpha = alpha2;
        setClear(clearColor, clearAlpha);
      },
      render,
      addToRenderList,
      dispose
    };
  }
  function WebGLBindingStates(gl, attributes) {
    const maxVertexAttributes = gl.getParameter(gl.MAX_VERTEX_ATTRIBS);
    const bindingStates = {};
    const defaultState = createBindingState(null);
    let currentState = defaultState;
    let forceUpdate = false;
    function setup(object, material2, program, geometry2, index) {
      let updateBuffers = false;
      const state = getBindingState(geometry2, program, material2);
      if (currentState !== state) {
        currentState = state;
        bindVertexArrayObject(currentState.object);
      }
      updateBuffers = needsUpdate(object, geometry2, program, index);
      if (updateBuffers) saveCache(object, geometry2, program, index);
      if (index !== null) {
        attributes.update(index, gl.ELEMENT_ARRAY_BUFFER);
      }
      if (updateBuffers || forceUpdate) {
        forceUpdate = false;
        setupVertexAttributes(object, material2, program, geometry2);
        if (index !== null) {
          gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, attributes.get(index).buffer);
        }
      }
    }
    function createVertexArrayObject() {
      return gl.createVertexArray();
    }
    function bindVertexArrayObject(vao) {
      return gl.bindVertexArray(vao);
    }
    function deleteVertexArrayObject(vao) {
      return gl.deleteVertexArray(vao);
    }
    function getBindingState(geometry2, program, material2) {
      const wireframe = material2.wireframe === true;
      let programMap = bindingStates[geometry2.id];
      if (programMap === void 0) {
        programMap = {};
        bindingStates[geometry2.id] = programMap;
      }
      let stateMap = programMap[program.id];
      if (stateMap === void 0) {
        stateMap = {};
        programMap[program.id] = stateMap;
      }
      let state = stateMap[wireframe];
      if (state === void 0) {
        state = createBindingState(createVertexArrayObject());
        stateMap[wireframe] = state;
      }
      return state;
    }
    function createBindingState(vao) {
      const newAttributes = [];
      const enabledAttributes = [];
      const attributeDivisors = [];
      for (let i2 = 0; i2 < maxVertexAttributes; i2++) {
        newAttributes[i2] = 0;
        enabledAttributes[i2] = 0;
        attributeDivisors[i2] = 0;
      }
      return {
        // for backward compatibility on non-VAO support browser
        geometry: null,
        program: null,
        wireframe: false,
        newAttributes,
        enabledAttributes,
        attributeDivisors,
        object: vao,
        attributes: {},
        index: null
      };
    }
    function needsUpdate(object, geometry2, program, index) {
      const cachedAttributes = currentState.attributes;
      const geometryAttributes = geometry2.attributes;
      let attributesNum = 0;
      const programAttributes = program.getAttributes();
      for (const name in programAttributes) {
        const programAttribute = programAttributes[name];
        if (programAttribute.location >= 0) {
          const cachedAttribute = cachedAttributes[name];
          let geometryAttribute = geometryAttributes[name];
          if (geometryAttribute === void 0) {
            if (name === "instanceMatrix" && object.instanceMatrix) geometryAttribute = object.instanceMatrix;
            if (name === "instanceColor" && object.instanceColor) geometryAttribute = object.instanceColor;
          }
          if (cachedAttribute === void 0) return true;
          if (cachedAttribute.attribute !== geometryAttribute) return true;
          if (geometryAttribute && cachedAttribute.data !== geometryAttribute.data) return true;
          attributesNum++;
        }
      }
      if (currentState.attributesNum !== attributesNum) return true;
      if (currentState.index !== index) return true;
      return false;
    }
    function saveCache(object, geometry2, program, index) {
      const cache2 = {};
      const attributes2 = geometry2.attributes;
      let attributesNum = 0;
      const programAttributes = program.getAttributes();
      for (const name in programAttributes) {
        const programAttribute = programAttributes[name];
        if (programAttribute.location >= 0) {
          let attribute = attributes2[name];
          if (attribute === void 0) {
            if (name === "instanceMatrix" && object.instanceMatrix) attribute = object.instanceMatrix;
            if (name === "instanceColor" && object.instanceColor) attribute = object.instanceColor;
          }
          const data = {};
          data.attribute = attribute;
          if (attribute && attribute.data) {
            data.data = attribute.data;
          }
          cache2[name] = data;
          attributesNum++;
        }
      }
      currentState.attributes = cache2;
      currentState.attributesNum = attributesNum;
      currentState.index = index;
    }
    function initAttributes() {
      const newAttributes = currentState.newAttributes;
      for (let i2 = 0, il = newAttributes.length; i2 < il; i2++) {
        newAttributes[i2] = 0;
      }
    }
    function enableAttribute(attribute) {
      enableAttributeAndDivisor(attribute, 0);
    }
    function enableAttributeAndDivisor(attribute, meshPerAttribute) {
      const newAttributes = currentState.newAttributes;
      const enabledAttributes = currentState.enabledAttributes;
      const attributeDivisors = currentState.attributeDivisors;
      newAttributes[attribute] = 1;
      if (enabledAttributes[attribute] === 0) {
        gl.enableVertexAttribArray(attribute);
        enabledAttributes[attribute] = 1;
      }
      if (attributeDivisors[attribute] !== meshPerAttribute) {
        gl.vertexAttribDivisor(attribute, meshPerAttribute);
        attributeDivisors[attribute] = meshPerAttribute;
      }
    }
    function disableUnusedAttributes() {
      const newAttributes = currentState.newAttributes;
      const enabledAttributes = currentState.enabledAttributes;
      for (let i2 = 0, il = enabledAttributes.length; i2 < il; i2++) {
        if (enabledAttributes[i2] !== newAttributes[i2]) {
          gl.disableVertexAttribArray(i2);
          enabledAttributes[i2] = 0;
        }
      }
    }
    function vertexAttribPointer(index, size, type, normalized, stride, offset, integer) {
      if (integer === true) {
        gl.vertexAttribIPointer(index, size, type, stride, offset);
      } else {
        gl.vertexAttribPointer(index, size, type, normalized, stride, offset);
      }
    }
    function setupVertexAttributes(object, material2, program, geometry2) {
      initAttributes();
      const geometryAttributes = geometry2.attributes;
      const programAttributes = program.getAttributes();
      const materialDefaultAttributeValues = material2.defaultAttributeValues;
      for (const name in programAttributes) {
        const programAttribute = programAttributes[name];
        if (programAttribute.location >= 0) {
          let geometryAttribute = geometryAttributes[name];
          if (geometryAttribute === void 0) {
            if (name === "instanceMatrix" && object.instanceMatrix) geometryAttribute = object.instanceMatrix;
            if (name === "instanceColor" && object.instanceColor) geometryAttribute = object.instanceColor;
          }
          if (geometryAttribute !== void 0) {
            const normalized = geometryAttribute.normalized;
            const size = geometryAttribute.itemSize;
            const attribute = attributes.get(geometryAttribute);
            if (attribute === void 0) continue;
            const buffer = attribute.buffer;
            const type = attribute.type;
            const bytesPerElement = attribute.bytesPerElement;
            const integer = type === gl.INT || type === gl.UNSIGNED_INT || geometryAttribute.gpuType === IntType;
            if (geometryAttribute.isInterleavedBufferAttribute) {
              const data = geometryAttribute.data;
              const stride = data.stride;
              const offset = geometryAttribute.offset;
              if (data.isInstancedInterleavedBuffer) {
                for (let i2 = 0; i2 < programAttribute.locationSize; i2++) {
                  enableAttributeAndDivisor(programAttribute.location + i2, data.meshPerAttribute);
                }
                if (object.isInstancedMesh !== true && geometry2._maxInstanceCount === void 0) {
                  geometry2._maxInstanceCount = data.meshPerAttribute * data.count;
                }
              } else {
                for (let i2 = 0; i2 < programAttribute.locationSize; i2++) {
                  enableAttribute(programAttribute.location + i2);
                }
              }
              gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
              for (let i2 = 0; i2 < programAttribute.locationSize; i2++) {
                vertexAttribPointer(
                  programAttribute.location + i2,
                  size / programAttribute.locationSize,
                  type,
                  normalized,
                  stride * bytesPerElement,
                  (offset + size / programAttribute.locationSize * i2) * bytesPerElement,
                  integer
                );
              }
            } else {
              if (geometryAttribute.isInstancedBufferAttribute) {
                for (let i2 = 0; i2 < programAttribute.locationSize; i2++) {
                  enableAttributeAndDivisor(programAttribute.location + i2, geometryAttribute.meshPerAttribute);
                }
                if (object.isInstancedMesh !== true && geometry2._maxInstanceCount === void 0) {
                  geometry2._maxInstanceCount = geometryAttribute.meshPerAttribute * geometryAttribute.count;
                }
              } else {
                for (let i2 = 0; i2 < programAttribute.locationSize; i2++) {
                  enableAttribute(programAttribute.location + i2);
                }
              }
              gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
              for (let i2 = 0; i2 < programAttribute.locationSize; i2++) {
                vertexAttribPointer(
                  programAttribute.location + i2,
                  size / programAttribute.locationSize,
                  type,
                  normalized,
                  size * bytesPerElement,
                  size / programAttribute.locationSize * i2 * bytesPerElement,
                  integer
                );
              }
            }
          } else if (materialDefaultAttributeValues !== void 0) {
            const value = materialDefaultAttributeValues[name];
            if (value !== void 0) {
              switch (value.length) {
                case 2:
                  gl.vertexAttrib2fv(programAttribute.location, value);
                  break;
                case 3:
                  gl.vertexAttrib3fv(programAttribute.location, value);
                  break;
                case 4:
                  gl.vertexAttrib4fv(programAttribute.location, value);
                  break;
                default:
                  gl.vertexAttrib1fv(programAttribute.location, value);
              }
            }
          }
        }
      }
      disableUnusedAttributes();
    }
    function dispose() {
      reset();
      for (const geometryId in bindingStates) {
        const programMap = bindingStates[geometryId];
        for (const programId in programMap) {
          const stateMap = programMap[programId];
          for (const wireframe in stateMap) {
            deleteVertexArrayObject(stateMap[wireframe].object);
            delete stateMap[wireframe];
          }
          delete programMap[programId];
        }
        delete bindingStates[geometryId];
      }
    }
    function releaseStatesOfGeometry(geometry2) {
      if (bindingStates[geometry2.id] === void 0) return;
      const programMap = bindingStates[geometry2.id];
      for (const programId in programMap) {
        const stateMap = programMap[programId];
        for (const wireframe in stateMap) {
          deleteVertexArrayObject(stateMap[wireframe].object);
          delete stateMap[wireframe];
        }
        delete programMap[programId];
      }
      delete bindingStates[geometry2.id];
    }
    function releaseStatesOfProgram(program) {
      for (const geometryId in bindingStates) {
        const programMap = bindingStates[geometryId];
        if (programMap[program.id] === void 0) continue;
        const stateMap = programMap[program.id];
        for (const wireframe in stateMap) {
          deleteVertexArrayObject(stateMap[wireframe].object);
          delete stateMap[wireframe];
        }
        delete programMap[program.id];
      }
    }
    function reset() {
      resetDefaultState();
      forceUpdate = true;
      if (currentState === defaultState) return;
      currentState = defaultState;
      bindVertexArrayObject(currentState.object);
    }
    function resetDefaultState() {
      defaultState.geometry = null;
      defaultState.program = null;
      defaultState.wireframe = false;
    }
    return {
      setup,
      reset,
      resetDefaultState,
      dispose,
      releaseStatesOfGeometry,
      releaseStatesOfProgram,
      initAttributes,
      enableAttribute,
      disableUnusedAttributes
    };
  }
  function WebGLBufferRenderer(gl, extensions, info) {
    let mode;
    function setMode(value) {
      mode = value;
    }
    function render(start, count) {
      gl.drawArrays(mode, start, count);
      info.update(count, mode, 1);
    }
    function renderInstances(start, count, primcount) {
      if (primcount === 0) return;
      gl.drawArraysInstanced(mode, start, count, primcount);
      info.update(count, mode, primcount);
    }
    function renderMultiDraw(starts, counts, drawCount) {
      if (drawCount === 0) return;
      const extension = extensions.get("WEBGL_multi_draw");
      extension.multiDrawArraysWEBGL(mode, starts, 0, counts, 0, drawCount);
      let elementCount = 0;
      for (let i2 = 0; i2 < drawCount; i2++) {
        elementCount += counts[i2];
      }
      info.update(elementCount, mode, 1);
    }
    function renderMultiDrawInstances(starts, counts, drawCount, primcount) {
      if (drawCount === 0) return;
      const extension = extensions.get("WEBGL_multi_draw");
      if (extension === null) {
        for (let i2 = 0; i2 < starts.length; i2++) {
          renderInstances(starts[i2], counts[i2], primcount[i2]);
        }
      } else {
        extension.multiDrawArraysInstancedWEBGL(mode, starts, 0, counts, 0, primcount, 0, drawCount);
        let elementCount = 0;
        for (let i2 = 0; i2 < drawCount; i2++) {
          elementCount += counts[i2] * primcount[i2];
        }
        info.update(elementCount, mode, 1);
      }
    }
    this.setMode = setMode;
    this.render = render;
    this.renderInstances = renderInstances;
    this.renderMultiDraw = renderMultiDraw;
    this.renderMultiDrawInstances = renderMultiDrawInstances;
  }
  function WebGLCapabilities(gl, extensions, parameters, utils) {
    let maxAnisotropy;
    function getMaxAnisotropy() {
      if (maxAnisotropy !== void 0) return maxAnisotropy;
      if (extensions.has("EXT_texture_filter_anisotropic") === true) {
        const extension = extensions.get("EXT_texture_filter_anisotropic");
        maxAnisotropy = gl.getParameter(extension.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
      } else {
        maxAnisotropy = 0;
      }
      return maxAnisotropy;
    }
    function textureFormatReadable(textureFormat) {
      if (textureFormat !== RGBAFormat && utils.convert(textureFormat) !== gl.getParameter(gl.IMPLEMENTATION_COLOR_READ_FORMAT)) {
        return false;
      }
      return true;
    }
    function textureTypeReadable(textureType) {
      const halfFloatSupportedByExt = textureType === HalfFloatType && (extensions.has("EXT_color_buffer_half_float") || extensions.has("EXT_color_buffer_float"));
      if (textureType !== UnsignedByteType && utils.convert(textureType) !== gl.getParameter(gl.IMPLEMENTATION_COLOR_READ_TYPE) && // Edge and Chrome Mac < 52 (#9513)
      textureType !== FloatType && !halfFloatSupportedByExt) {
        return false;
      }
      return true;
    }
    function getMaxPrecision(precision2) {
      if (precision2 === "highp") {
        if (gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_FLOAT).precision > 0 && gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT).precision > 0) {
          return "highp";
        }
        precision2 = "mediump";
      }
      if (precision2 === "mediump") {
        if (gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_FLOAT).precision > 0 && gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_FLOAT).precision > 0) {
          return "mediump";
        }
      }
      return "lowp";
    }
    let precision = parameters.precision !== void 0 ? parameters.precision : "highp";
    const maxPrecision = getMaxPrecision(precision);
    if (maxPrecision !== precision) {
      console.warn("THREE.WebGLRenderer:", precision, "not supported, using", maxPrecision, "instead.");
      precision = maxPrecision;
    }
    const logarithmicDepthBuffer = parameters.logarithmicDepthBuffer === true;
    const reverseDepthBuffer = parameters.reverseDepthBuffer === true && extensions.has("EXT_clip_control");
    const maxTextures = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);
    const maxVertexTextures = gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS);
    const maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
    const maxCubemapSize = gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE);
    const maxAttributes = gl.getParameter(gl.MAX_VERTEX_ATTRIBS);
    const maxVertexUniforms = gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS);
    const maxVaryings = gl.getParameter(gl.MAX_VARYING_VECTORS);
    const maxFragmentUniforms = gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS);
    const vertexTextures = maxVertexTextures > 0;
    const maxSamples = gl.getParameter(gl.MAX_SAMPLES);
    return {
      isWebGL2: true,
      // keeping this for backwards compatibility
      getMaxAnisotropy,
      getMaxPrecision,
      textureFormatReadable,
      textureTypeReadable,
      precision,
      logarithmicDepthBuffer,
      reverseDepthBuffer,
      maxTextures,
      maxVertexTextures,
      maxTextureSize,
      maxCubemapSize,
      maxAttributes,
      maxVertexUniforms,
      maxVaryings,
      maxFragmentUniforms,
      vertexTextures,
      maxSamples
    };
  }
  function WebGLClipping(properties) {
    const scope = this;
    let globalState = null, numGlobalPlanes = 0, localClippingEnabled = false, renderingShadows = false;
    const plane = new Plane(), viewNormalMatrix = new Matrix3(), uniform = { value: null, needsUpdate: false };
    this.uniform = uniform;
    this.numPlanes = 0;
    this.numIntersection = 0;
    this.init = function(planes, enableLocalClipping) {
      const enabled = planes.length !== 0 || enableLocalClipping || // enable state of previous frame - the clipping code has to
      // run another frame in order to reset the state:
      numGlobalPlanes !== 0 || localClippingEnabled;
      localClippingEnabled = enableLocalClipping;
      numGlobalPlanes = planes.length;
      return enabled;
    };
    this.beginShadows = function() {
      renderingShadows = true;
      projectPlanes(null);
    };
    this.endShadows = function() {
      renderingShadows = false;
    };
    this.setGlobalState = function(planes, camera2) {
      globalState = projectPlanes(planes, camera2, 0);
    };
    this.setState = function(material2, camera2, useCache) {
      const planes = material2.clippingPlanes, clipIntersection = material2.clipIntersection, clipShadows = material2.clipShadows;
      const materialProperties = properties.get(material2);
      if (!localClippingEnabled || planes === null || planes.length === 0 || renderingShadows && !clipShadows) {
        if (renderingShadows) {
          projectPlanes(null);
        } else {
          resetGlobalState();
        }
      } else {
        const nGlobal = renderingShadows ? 0 : numGlobalPlanes, lGlobal = nGlobal * 4;
        let dstArray = materialProperties.clippingState || null;
        uniform.value = dstArray;
        dstArray = projectPlanes(planes, camera2, lGlobal, useCache);
        for (let i2 = 0; i2 !== lGlobal; ++i2) {
          dstArray[i2] = globalState[i2];
        }
        materialProperties.clippingState = dstArray;
        this.numIntersection = clipIntersection ? this.numPlanes : 0;
        this.numPlanes += nGlobal;
      }
    };
    function resetGlobalState() {
      if (uniform.value !== globalState) {
        uniform.value = globalState;
        uniform.needsUpdate = numGlobalPlanes > 0;
      }
      scope.numPlanes = numGlobalPlanes;
      scope.numIntersection = 0;
    }
    function projectPlanes(planes, camera2, dstOffset, skipTransform) {
      const nPlanes = planes !== null ? planes.length : 0;
      let dstArray = null;
      if (nPlanes !== 0) {
        dstArray = uniform.value;
        if (skipTransform !== true || dstArray === null) {
          const flatSize = dstOffset + nPlanes * 4, viewMatrix = camera2.matrixWorldInverse;
          viewNormalMatrix.getNormalMatrix(viewMatrix);
          if (dstArray === null || dstArray.length < flatSize) {
            dstArray = new Float32Array(flatSize);
          }
          for (let i2 = 0, i4 = dstOffset; i2 !== nPlanes; ++i2, i4 += 4) {
            plane.copy(planes[i2]).applyMatrix4(viewMatrix, viewNormalMatrix);
            plane.normal.toArray(dstArray, i4);
            dstArray[i4 + 3] = plane.constant;
          }
        }
        uniform.value = dstArray;
        uniform.needsUpdate = true;
      }
      scope.numPlanes = nPlanes;
      scope.numIntersection = 0;
      return dstArray;
    }
  }
  function WebGLCubeMaps(renderer2) {
    let cubemaps = /* @__PURE__ */ new WeakMap();
    function mapTextureMapping(texture, mapping) {
      if (mapping === EquirectangularReflectionMapping) {
        texture.mapping = CubeReflectionMapping;
      } else if (mapping === EquirectangularRefractionMapping) {
        texture.mapping = CubeRefractionMapping;
      }
      return texture;
    }
    function get(texture) {
      if (texture && texture.isTexture) {
        const mapping = texture.mapping;
        if (mapping === EquirectangularReflectionMapping || mapping === EquirectangularRefractionMapping) {
          if (cubemaps.has(texture)) {
            const cubemap = cubemaps.get(texture).texture;
            return mapTextureMapping(cubemap, texture.mapping);
          } else {
            const image = texture.image;
            if (image && image.height > 0) {
              const renderTarget = new WebGLCubeRenderTarget(image.height);
              renderTarget.fromEquirectangularTexture(renderer2, texture);
              cubemaps.set(texture, renderTarget);
              texture.addEventListener("dispose", onTextureDispose);
              return mapTextureMapping(renderTarget.texture, texture.mapping);
            } else {
              return null;
            }
          }
        }
      }
      return texture;
    }
    function onTextureDispose(event) {
      const texture = event.target;
      texture.removeEventListener("dispose", onTextureDispose);
      const cubemap = cubemaps.get(texture);
      if (cubemap !== void 0) {
        cubemaps.delete(texture);
        cubemap.dispose();
      }
    }
    function dispose() {
      cubemaps = /* @__PURE__ */ new WeakMap();
    }
    return {
      get,
      dispose
    };
  }
  var LOD_MIN = 4;
  var EXTRA_LOD_SIGMA = [0.125, 0.215, 0.35, 0.446, 0.526, 0.582];
  var MAX_SAMPLES = 20;
  var _flatCamera = /* @__PURE__ */ new OrthographicCamera();
  var _clearColor = /* @__PURE__ */ new Color();
  var _oldTarget = null;
  var _oldActiveCubeFace = 0;
  var _oldActiveMipmapLevel = 0;
  var _oldXrEnabled = false;
  var PHI = (1 + Math.sqrt(5)) / 2;
  var INV_PHI = 1 / PHI;
  var _axisDirections = [
    /* @__PURE__ */ new Vector3(-PHI, INV_PHI, 0),
    /* @__PURE__ */ new Vector3(PHI, INV_PHI, 0),
    /* @__PURE__ */ new Vector3(-INV_PHI, 0, PHI),
    /* @__PURE__ */ new Vector3(INV_PHI, 0, PHI),
    /* @__PURE__ */ new Vector3(0, PHI, -INV_PHI),
    /* @__PURE__ */ new Vector3(0, PHI, INV_PHI),
    /* @__PURE__ */ new Vector3(-1, 1, -1),
    /* @__PURE__ */ new Vector3(1, 1, -1),
    /* @__PURE__ */ new Vector3(-1, 1, 1),
    /* @__PURE__ */ new Vector3(1, 1, 1)
  ];
  var PMREMGenerator = class {
    constructor(renderer2) {
      this._renderer = renderer2;
      this._pingPongRenderTarget = null;
      this._lodMax = 0;
      this._cubeSize = 0;
      this._lodPlanes = [];
      this._sizeLods = [];
      this._sigmas = [];
      this._blurMaterial = null;
      this._cubemapMaterial = null;
      this._equirectMaterial = null;
      this._compileMaterial(this._blurMaterial);
    }
    /**
     * Generates a PMREM from a supplied Scene, which can be faster than using an
     * image if networking bandwidth is low. Optional sigma specifies a blur radius
     * in radians to be applied to the scene before PMREM generation. Optional near
     * and far planes ensure the scene is rendered in its entirety (the cubeCamera
     * is placed at the origin).
     */
    fromScene(scene2, sigma = 0, near = 0.1, far = 100) {
      _oldTarget = this._renderer.getRenderTarget();
      _oldActiveCubeFace = this._renderer.getActiveCubeFace();
      _oldActiveMipmapLevel = this._renderer.getActiveMipmapLevel();
      _oldXrEnabled = this._renderer.xr.enabled;
      this._renderer.xr.enabled = false;
      this._setSize(256);
      const cubeUVRenderTarget = this._allocateTargets();
      cubeUVRenderTarget.depthBuffer = true;
      this._sceneToCubeUV(scene2, near, far, cubeUVRenderTarget);
      if (sigma > 0) {
        this._blur(cubeUVRenderTarget, 0, 0, sigma);
      }
      this._applyPMREM(cubeUVRenderTarget);
      this._cleanup(cubeUVRenderTarget);
      return cubeUVRenderTarget;
    }
    /**
     * Generates a PMREM from an equirectangular texture, which can be either LDR
     * or HDR. The ideal input image size is 1k (1024 x 512),
     * as this matches best with the 256 x 256 cubemap output.
     * The smallest supported equirectangular image size is 64 x 32.
     */
    fromEquirectangular(equirectangular, renderTarget = null) {
      return this._fromTexture(equirectangular, renderTarget);
    }
    /**
     * Generates a PMREM from an cubemap texture, which can be either LDR
     * or HDR. The ideal input cube size is 256 x 256,
     * as this matches best with the 256 x 256 cubemap output.
     * The smallest supported cube size is 16 x 16.
     */
    fromCubemap(cubemap, renderTarget = null) {
      return this._fromTexture(cubemap, renderTarget);
    }
    /**
     * Pre-compiles the cubemap shader. You can get faster start-up by invoking this method during
     * your texture's network fetch for increased concurrency.
     */
    compileCubemapShader() {
      if (this._cubemapMaterial === null) {
        this._cubemapMaterial = _getCubemapMaterial();
        this._compileMaterial(this._cubemapMaterial);
      }
    }
    /**
     * Pre-compiles the equirectangular shader. You can get faster start-up by invoking this method during
     * your texture's network fetch for increased concurrency.
     */
    compileEquirectangularShader() {
      if (this._equirectMaterial === null) {
        this._equirectMaterial = _getEquirectMaterial();
        this._compileMaterial(this._equirectMaterial);
      }
    }
    /**
     * Disposes of the PMREMGenerator's internal memory. Note that PMREMGenerator is a static class,
     * so you should not need more than one PMREMGenerator object. If you do, calling dispose() on
     * one of them will cause any others to also become unusable.
     */
    dispose() {
      this._dispose();
      if (this._cubemapMaterial !== null) this._cubemapMaterial.dispose();
      if (this._equirectMaterial !== null) this._equirectMaterial.dispose();
    }
    // private interface
    _setSize(cubeSize) {
      this._lodMax = Math.floor(Math.log2(cubeSize));
      this._cubeSize = Math.pow(2, this._lodMax);
    }
    _dispose() {
      if (this._blurMaterial !== null) this._blurMaterial.dispose();
      if (this._pingPongRenderTarget !== null) this._pingPongRenderTarget.dispose();
      for (let i2 = 0; i2 < this._lodPlanes.length; i2++) {
        this._lodPlanes[i2].dispose();
      }
    }
    _cleanup(outputTarget) {
      this._renderer.setRenderTarget(_oldTarget, _oldActiveCubeFace, _oldActiveMipmapLevel);
      this._renderer.xr.enabled = _oldXrEnabled;
      outputTarget.scissorTest = false;
      _setViewport(outputTarget, 0, 0, outputTarget.width, outputTarget.height);
    }
    _fromTexture(texture, renderTarget) {
      if (texture.mapping === CubeReflectionMapping || texture.mapping === CubeRefractionMapping) {
        this._setSize(texture.image.length === 0 ? 16 : texture.image[0].width || texture.image[0].image.width);
      } else {
        this._setSize(texture.image.width / 4);
      }
      _oldTarget = this._renderer.getRenderTarget();
      _oldActiveCubeFace = this._renderer.getActiveCubeFace();
      _oldActiveMipmapLevel = this._renderer.getActiveMipmapLevel();
      _oldXrEnabled = this._renderer.xr.enabled;
      this._renderer.xr.enabled = false;
      const cubeUVRenderTarget = renderTarget || this._allocateTargets();
      this._textureToCubeUV(texture, cubeUVRenderTarget);
      this._applyPMREM(cubeUVRenderTarget);
      this._cleanup(cubeUVRenderTarget);
      return cubeUVRenderTarget;
    }
    _allocateTargets() {
      const width = 3 * Math.max(this._cubeSize, 16 * 7);
      const height = 4 * this._cubeSize;
      const params = {
        magFilter: LinearFilter,
        minFilter: LinearFilter,
        generateMipmaps: false,
        type: HalfFloatType,
        format: RGBAFormat,
        colorSpace: LinearSRGBColorSpace,
        depthBuffer: false
      };
      const cubeUVRenderTarget = _createRenderTarget(width, height, params);
      if (this._pingPongRenderTarget === null || this._pingPongRenderTarget.width !== width || this._pingPongRenderTarget.height !== height) {
        if (this._pingPongRenderTarget !== null) {
          this._dispose();
        }
        this._pingPongRenderTarget = _createRenderTarget(width, height, params);
        const { _lodMax } = this;
        ({ sizeLods: this._sizeLods, lodPlanes: this._lodPlanes, sigmas: this._sigmas } = _createPlanes(_lodMax));
        this._blurMaterial = _getBlurShader(_lodMax, width, height);
      }
      return cubeUVRenderTarget;
    }
    _compileMaterial(material2) {
      const tmpMesh = new Mesh(this._lodPlanes[0], material2);
      this._renderer.compile(tmpMesh, _flatCamera);
    }
    _sceneToCubeUV(scene2, near, far, cubeUVRenderTarget) {
      const fov2 = 90;
      const aspect2 = 1;
      const cubeCamera = new PerspectiveCamera(fov2, aspect2, near, far);
      const upSign = [1, -1, 1, 1, 1, 1];
      const forwardSign = [1, 1, 1, -1, -1, -1];
      const renderer2 = this._renderer;
      const originalAutoClear = renderer2.autoClear;
      const toneMapping = renderer2.toneMapping;
      renderer2.getClearColor(_clearColor);
      renderer2.toneMapping = NoToneMapping;
      renderer2.autoClear = false;
      const backgroundMaterial = new MeshBasicMaterial({
        name: "PMREM.Background",
        side: BackSide,
        depthWrite: false,
        depthTest: false
      });
      const backgroundBox = new Mesh(new BoxGeometry(), backgroundMaterial);
      let useSolidColor = false;
      const background = scene2.background;
      if (background) {
        if (background.isColor) {
          backgroundMaterial.color.copy(background);
          scene2.background = null;
          useSolidColor = true;
        }
      } else {
        backgroundMaterial.color.copy(_clearColor);
        useSolidColor = true;
      }
      for (let i2 = 0; i2 < 6; i2++) {
        const col = i2 % 3;
        if (col === 0) {
          cubeCamera.up.set(0, upSign[i2], 0);
          cubeCamera.lookAt(forwardSign[i2], 0, 0);
        } else if (col === 1) {
          cubeCamera.up.set(0, 0, upSign[i2]);
          cubeCamera.lookAt(0, forwardSign[i2], 0);
        } else {
          cubeCamera.up.set(0, upSign[i2], 0);
          cubeCamera.lookAt(0, 0, forwardSign[i2]);
        }
        const size = this._cubeSize;
        _setViewport(cubeUVRenderTarget, col * size, i2 > 2 ? size : 0, size, size);
        renderer2.setRenderTarget(cubeUVRenderTarget);
        if (useSolidColor) {
          renderer2.render(backgroundBox, cubeCamera);
        }
        renderer2.render(scene2, cubeCamera);
      }
      backgroundBox.geometry.dispose();
      backgroundBox.material.dispose();
      renderer2.toneMapping = toneMapping;
      renderer2.autoClear = originalAutoClear;
      scene2.background = background;
    }
    _textureToCubeUV(texture, cubeUVRenderTarget) {
      const renderer2 = this._renderer;
      const isCubeTexture = texture.mapping === CubeReflectionMapping || texture.mapping === CubeRefractionMapping;
      if (isCubeTexture) {
        if (this._cubemapMaterial === null) {
          this._cubemapMaterial = _getCubemapMaterial();
        }
        this._cubemapMaterial.uniforms.flipEnvMap.value = texture.isRenderTargetTexture === false ? -1 : 1;
      } else {
        if (this._equirectMaterial === null) {
          this._equirectMaterial = _getEquirectMaterial();
        }
      }
      const material2 = isCubeTexture ? this._cubemapMaterial : this._equirectMaterial;
      const mesh = new Mesh(this._lodPlanes[0], material2);
      const uniforms = material2.uniforms;
      uniforms["envMap"].value = texture;
      const size = this._cubeSize;
      _setViewport(cubeUVRenderTarget, 0, 0, 3 * size, 2 * size);
      renderer2.setRenderTarget(cubeUVRenderTarget);
      renderer2.render(mesh, _flatCamera);
    }
    _applyPMREM(cubeUVRenderTarget) {
      const renderer2 = this._renderer;
      const autoClear = renderer2.autoClear;
      renderer2.autoClear = false;
      const n2 = this._lodPlanes.length;
      for (let i2 = 1; i2 < n2; i2++) {
        const sigma = Math.sqrt(this._sigmas[i2] * this._sigmas[i2] - this._sigmas[i2 - 1] * this._sigmas[i2 - 1]);
        const poleAxis = _axisDirections[(n2 - i2 - 1) % _axisDirections.length];
        this._blur(cubeUVRenderTarget, i2 - 1, i2, sigma, poleAxis);
      }
      renderer2.autoClear = autoClear;
    }
    /**
     * This is a two-pass Gaussian blur for a cubemap. Normally this is done
     * vertically and horizontally, but this breaks down on a cube. Here we apply
     * the blur latitudinally (around the poles), and then longitudinally (towards
     * the poles) to approximate the orthogonally-separable blur. It is least
     * accurate at the poles, but still does a decent job.
     */
    _blur(cubeUVRenderTarget, lodIn, lodOut, sigma, poleAxis) {
      const pingPongRenderTarget = this._pingPongRenderTarget;
      this._halfBlur(
        cubeUVRenderTarget,
        pingPongRenderTarget,
        lodIn,
        lodOut,
        sigma,
        "latitudinal",
        poleAxis
      );
      this._halfBlur(
        pingPongRenderTarget,
        cubeUVRenderTarget,
        lodOut,
        lodOut,
        sigma,
        "longitudinal",
        poleAxis
      );
    }
    _halfBlur(targetIn, targetOut, lodIn, lodOut, sigmaRadians, direction, poleAxis) {
      const renderer2 = this._renderer;
      const blurMaterial = this._blurMaterial;
      if (direction !== "latitudinal" && direction !== "longitudinal") {
        console.error(
          "blur direction must be either latitudinal or longitudinal!"
        );
      }
      const STANDARD_DEVIATIONS = 3;
      const blurMesh = new Mesh(this._lodPlanes[lodOut], blurMaterial);
      const blurUniforms = blurMaterial.uniforms;
      const pixels = this._sizeLods[lodIn] - 1;
      const radiansPerPixel = isFinite(sigmaRadians) ? Math.PI / (2 * pixels) : 2 * Math.PI / (2 * MAX_SAMPLES - 1);
      const sigmaPixels = sigmaRadians / radiansPerPixel;
      const samples = isFinite(sigmaRadians) ? 1 + Math.floor(STANDARD_DEVIATIONS * sigmaPixels) : MAX_SAMPLES;
      if (samples > MAX_SAMPLES) {
        console.warn(`sigmaRadians, ${sigmaRadians}, is too large and will clip, as it requested ${samples} samples when the maximum is set to ${MAX_SAMPLES}`);
      }
      const weights = [];
      let sum = 0;
      for (let i2 = 0; i2 < MAX_SAMPLES; ++i2) {
        const x3 = i2 / sigmaPixels;
        const weight = Math.exp(-x3 * x3 / 2);
        weights.push(weight);
        if (i2 === 0) {
          sum += weight;
        } else if (i2 < samples) {
          sum += 2 * weight;
        }
      }
      for (let i2 = 0; i2 < weights.length; i2++) {
        weights[i2] = weights[i2] / sum;
      }
      blurUniforms["envMap"].value = targetIn.texture;
      blurUniforms["samples"].value = samples;
      blurUniforms["weights"].value = weights;
      blurUniforms["latitudinal"].value = direction === "latitudinal";
      if (poleAxis) {
        blurUniforms["poleAxis"].value = poleAxis;
      }
      const { _lodMax } = this;
      blurUniforms["dTheta"].value = radiansPerPixel;
      blurUniforms["mipInt"].value = _lodMax - lodIn;
      const outputSize = this._sizeLods[lodOut];
      const x2 = 3 * outputSize * (lodOut > _lodMax - LOD_MIN ? lodOut - _lodMax + LOD_MIN : 0);
      const y2 = 4 * (this._cubeSize - outputSize);
      _setViewport(targetOut, x2, y2, 3 * outputSize, 2 * outputSize);
      renderer2.setRenderTarget(targetOut);
      renderer2.render(blurMesh, _flatCamera);
    }
  };
  function _createPlanes(lodMax) {
    const lodPlanes = [];
    const sizeLods = [];
    const sigmas = [];
    let lod = lodMax;
    const totalLods = lodMax - LOD_MIN + 1 + EXTRA_LOD_SIGMA.length;
    for (let i2 = 0; i2 < totalLods; i2++) {
      const sizeLod = Math.pow(2, lod);
      sizeLods.push(sizeLod);
      let sigma = 1 / sizeLod;
      if (i2 > lodMax - LOD_MIN) {
        sigma = EXTRA_LOD_SIGMA[i2 - lodMax + LOD_MIN - 1];
      } else if (i2 === 0) {
        sigma = 0;
      }
      sigmas.push(sigma);
      const texelSize = 1 / (sizeLod - 2);
      const min = -texelSize;
      const max = 1 + texelSize;
      const uv1 = [min, min, max, min, max, max, min, min, max, max, min, max];
      const cubeFaces = 6;
      const vertices = 6;
      const positionSize = 3;
      const uvSize = 2;
      const faceIndexSize = 1;
      const position = new Float32Array(positionSize * vertices * cubeFaces);
      const uv = new Float32Array(uvSize * vertices * cubeFaces);
      const faceIndex = new Float32Array(faceIndexSize * vertices * cubeFaces);
      for (let face = 0; face < cubeFaces; face++) {
        const x2 = face % 3 * 2 / 3 - 1;
        const y2 = face > 2 ? 0 : -1;
        const coordinates = [
          x2,
          y2,
          0,
          x2 + 2 / 3,
          y2,
          0,
          x2 + 2 / 3,
          y2 + 1,
          0,
          x2,
          y2,
          0,
          x2 + 2 / 3,
          y2 + 1,
          0,
          x2,
          y2 + 1,
          0
        ];
        position.set(coordinates, positionSize * vertices * face);
        uv.set(uv1, uvSize * vertices * face);
        const fill = [face, face, face, face, face, face];
        faceIndex.set(fill, faceIndexSize * vertices * face);
      }
      const planes = new BufferGeometry();
      planes.setAttribute("position", new BufferAttribute(position, positionSize));
      planes.setAttribute("uv", new BufferAttribute(uv, uvSize));
      planes.setAttribute("faceIndex", new BufferAttribute(faceIndex, faceIndexSize));
      lodPlanes.push(planes);
      if (lod > LOD_MIN) {
        lod--;
      }
    }
    return { lodPlanes, sizeLods, sigmas };
  }
  function _createRenderTarget(width, height, params) {
    const cubeUVRenderTarget = new WebGLRenderTarget(width, height, params);
    cubeUVRenderTarget.texture.mapping = CubeUVReflectionMapping;
    cubeUVRenderTarget.texture.name = "PMREM.cubeUv";
    cubeUVRenderTarget.scissorTest = true;
    return cubeUVRenderTarget;
  }
  function _setViewport(target, x2, y2, width, height) {
    target.viewport.set(x2, y2, width, height);
    target.scissor.set(x2, y2, width, height);
  }
  function _getBlurShader(lodMax, width, height) {
    const weights = new Float32Array(MAX_SAMPLES);
    const poleAxis = new Vector3(0, 1, 0);
    const shaderMaterial = new ShaderMaterial({
      name: "SphericalGaussianBlur",
      defines: {
        "n": MAX_SAMPLES,
        "CUBEUV_TEXEL_WIDTH": 1 / width,
        "CUBEUV_TEXEL_HEIGHT": 1 / height,
        "CUBEUV_MAX_MIP": `${lodMax}.0`
      },
      uniforms: {
        "envMap": { value: null },
        "samples": { value: 1 },
        "weights": { value: weights },
        "latitudinal": { value: false },
        "dTheta": { value: 0 },
        "mipInt": { value: 0 },
        "poleAxis": { value: poleAxis }
      },
      vertexShader: _getCommonVertexShader(),
      fragmentShader: (
        /* glsl */
        `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`
      ),
      blending: NoBlending,
      depthTest: false,
      depthWrite: false
    });
    return shaderMaterial;
  }
  function _getEquirectMaterial() {
    return new ShaderMaterial({
      name: "EquirectangularToCubeUV",
      uniforms: {
        "envMap": { value: null }
      },
      vertexShader: _getCommonVertexShader(),
      fragmentShader: (
        /* glsl */
        `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`
      ),
      blending: NoBlending,
      depthTest: false,
      depthWrite: false
    });
  }
  function _getCubemapMaterial() {
    return new ShaderMaterial({
      name: "CubemapToCubeUV",
      uniforms: {
        "envMap": { value: null },
        "flipEnvMap": { value: -1 }
      },
      vertexShader: _getCommonVertexShader(),
      fragmentShader: (
        /* glsl */
        `

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`
      ),
      blending: NoBlending,
      depthTest: false,
      depthWrite: false
    });
  }
  function _getCommonVertexShader() {
    return (
      /* glsl */
      `

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`
    );
  }
  function WebGLCubeUVMaps(renderer2) {
    let cubeUVmaps = /* @__PURE__ */ new WeakMap();
    let pmremGenerator = null;
    function get(texture) {
      if (texture && texture.isTexture) {
        const mapping = texture.mapping;
        const isEquirectMap = mapping === EquirectangularReflectionMapping || mapping === EquirectangularRefractionMapping;
        const isCubeMap = mapping === CubeReflectionMapping || mapping === CubeRefractionMapping;
        if (isEquirectMap || isCubeMap) {
          let renderTarget = cubeUVmaps.get(texture);
          const currentPMREMVersion = renderTarget !== void 0 ? renderTarget.texture.pmremVersion : 0;
          if (texture.isRenderTargetTexture && texture.pmremVersion !== currentPMREMVersion) {
            if (pmremGenerator === null) pmremGenerator = new PMREMGenerator(renderer2);
            renderTarget = isEquirectMap ? pmremGenerator.fromEquirectangular(texture, renderTarget) : pmremGenerator.fromCubemap(texture, renderTarget);
            renderTarget.texture.pmremVersion = texture.pmremVersion;
            cubeUVmaps.set(texture, renderTarget);
            return renderTarget.texture;
          } else {
            if (renderTarget !== void 0) {
              return renderTarget.texture;
            } else {
              const image = texture.image;
              if (isEquirectMap && image && image.height > 0 || isCubeMap && image && isCubeTextureComplete(image)) {
                if (pmremGenerator === null) pmremGenerator = new PMREMGenerator(renderer2);
                renderTarget = isEquirectMap ? pmremGenerator.fromEquirectangular(texture) : pmremGenerator.fromCubemap(texture);
                renderTarget.texture.pmremVersion = texture.pmremVersion;
                cubeUVmaps.set(texture, renderTarget);
                texture.addEventListener("dispose", onTextureDispose);
                return renderTarget.texture;
              } else {
                return null;
              }
            }
          }
        }
      }
      return texture;
    }
    function isCubeTextureComplete(image) {
      let count = 0;
      const length = 6;
      for (let i2 = 0; i2 < length; i2++) {
        if (image[i2] !== void 0) count++;
      }
      return count === length;
    }
    function onTextureDispose(event) {
      const texture = event.target;
      texture.removeEventListener("dispose", onTextureDispose);
      const cubemapUV = cubeUVmaps.get(texture);
      if (cubemapUV !== void 0) {
        cubeUVmaps.delete(texture);
        cubemapUV.dispose();
      }
    }
    function dispose() {
      cubeUVmaps = /* @__PURE__ */ new WeakMap();
      if (pmremGenerator !== null) {
        pmremGenerator.dispose();
        pmremGenerator = null;
      }
    }
    return {
      get,
      dispose
    };
  }
  function WebGLExtensions(gl) {
    const extensions = {};
    function getExtension(name) {
      if (extensions[name] !== void 0) {
        return extensions[name];
      }
      let extension;
      switch (name) {
        case "WEBGL_depth_texture":
          extension = gl.getExtension("WEBGL_depth_texture") || gl.getExtension("MOZ_WEBGL_depth_texture") || gl.getExtension("WEBKIT_WEBGL_depth_texture");
          break;
        case "EXT_texture_filter_anisotropic":
          extension = gl.getExtension("EXT_texture_filter_anisotropic") || gl.getExtension("MOZ_EXT_texture_filter_anisotropic") || gl.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
          break;
        case "WEBGL_compressed_texture_s3tc":
          extension = gl.getExtension("WEBGL_compressed_texture_s3tc") || gl.getExtension("MOZ_WEBGL_compressed_texture_s3tc") || gl.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");
          break;
        case "WEBGL_compressed_texture_pvrtc":
          extension = gl.getExtension("WEBGL_compressed_texture_pvrtc") || gl.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");
          break;
        default:
          extension = gl.getExtension(name);
      }
      extensions[name] = extension;
      return extension;
    }
    return {
      has: function(name) {
        return getExtension(name) !== null;
      },
      init: function() {
        getExtension("EXT_color_buffer_float");
        getExtension("WEBGL_clip_cull_distance");
        getExtension("OES_texture_float_linear");
        getExtension("EXT_color_buffer_half_float");
        getExtension("WEBGL_multisampled_render_to_texture");
        getExtension("WEBGL_render_shared_exponent");
      },
      get: function(name) {
        const extension = getExtension(name);
        if (extension === null) {
          warnOnce("THREE.WebGLRenderer: " + name + " extension not supported.");
        }
        return extension;
      }
    };
  }
  function WebGLGeometries(gl, attributes, info, bindingStates) {
    const geometries = {};
    const wireframeAttributes = /* @__PURE__ */ new WeakMap();
    function onGeometryDispose(event) {
      const geometry2 = event.target;
      if (geometry2.index !== null) {
        attributes.remove(geometry2.index);
      }
      for (const name in geometry2.attributes) {
        attributes.remove(geometry2.attributes[name]);
      }
      geometry2.removeEventListener("dispose", onGeometryDispose);
      delete geometries[geometry2.id];
      const attribute = wireframeAttributes.get(geometry2);
      if (attribute) {
        attributes.remove(attribute);
        wireframeAttributes.delete(geometry2);
      }
      bindingStates.releaseStatesOfGeometry(geometry2);
      if (geometry2.isInstancedBufferGeometry === true) {
        delete geometry2._maxInstanceCount;
      }
      info.memory.geometries--;
    }
    function get(object, geometry2) {
      if (geometries[geometry2.id] === true) return geometry2;
      geometry2.addEventListener("dispose", onGeometryDispose);
      geometries[geometry2.id] = true;
      info.memory.geometries++;
      return geometry2;
    }
    function update(geometry2) {
      const geometryAttributes = geometry2.attributes;
      for (const name in geometryAttributes) {
        attributes.update(geometryAttributes[name], gl.ARRAY_BUFFER);
      }
    }
    function updateWireframeAttribute(geometry2) {
      const indices = [];
      const geometryIndex = geometry2.index;
      const geometryPosition = geometry2.attributes.position;
      let version = 0;
      if (geometryIndex !== null) {
        const array = geometryIndex.array;
        version = geometryIndex.version;
        for (let i2 = 0, l2 = array.length; i2 < l2; i2 += 3) {
          const a2 = array[i2 + 0];
          const b2 = array[i2 + 1];
          const c2 = array[i2 + 2];
          indices.push(a2, b2, b2, c2, c2, a2);
        }
      } else if (geometryPosition !== void 0) {
        const array = geometryPosition.array;
        version = geometryPosition.version;
        for (let i2 = 0, l2 = array.length / 3 - 1; i2 < l2; i2 += 3) {
          const a2 = i2 + 0;
          const b2 = i2 + 1;
          const c2 = i2 + 2;
          indices.push(a2, b2, b2, c2, c2, a2);
        }
      } else {
        return;
      }
      const attribute = new (arrayNeedsUint32(indices) ? Uint32BufferAttribute : Uint16BufferAttribute)(indices, 1);
      attribute.version = version;
      const previousAttribute = wireframeAttributes.get(geometry2);
      if (previousAttribute) attributes.remove(previousAttribute);
      wireframeAttributes.set(geometry2, attribute);
    }
    function getWireframeAttribute(geometry2) {
      const currentAttribute = wireframeAttributes.get(geometry2);
      if (currentAttribute) {
        const geometryIndex = geometry2.index;
        if (geometryIndex !== null) {
          if (currentAttribute.version < geometryIndex.version) {
            updateWireframeAttribute(geometry2);
          }
        }
      } else {
        updateWireframeAttribute(geometry2);
      }
      return wireframeAttributes.get(geometry2);
    }
    return {
      get,
      update,
      getWireframeAttribute
    };
  }
  function WebGLIndexedBufferRenderer(gl, extensions, info) {
    let mode;
    function setMode(value) {
      mode = value;
    }
    let type, bytesPerElement;
    function setIndex(value) {
      type = value.type;
      bytesPerElement = value.bytesPerElement;
    }
    function render(start, count) {
      gl.drawElements(mode, count, type, start * bytesPerElement);
      info.update(count, mode, 1);
    }
    function renderInstances(start, count, primcount) {
      if (primcount === 0) return;
      gl.drawElementsInstanced(mode, count, type, start * bytesPerElement, primcount);
      info.update(count, mode, primcount);
    }
    function renderMultiDraw(starts, counts, drawCount) {
      if (drawCount === 0) return;
      const extension = extensions.get("WEBGL_multi_draw");
      extension.multiDrawElementsWEBGL(mode, counts, 0, type, starts, 0, drawCount);
      let elementCount = 0;
      for (let i2 = 0; i2 < drawCount; i2++) {
        elementCount += counts[i2];
      }
      info.update(elementCount, mode, 1);
    }
    function renderMultiDrawInstances(starts, counts, drawCount, primcount) {
      if (drawCount === 0) return;
      const extension = extensions.get("WEBGL_multi_draw");
      if (extension === null) {
        for (let i2 = 0; i2 < starts.length; i2++) {
          renderInstances(starts[i2] / bytesPerElement, counts[i2], primcount[i2]);
        }
      } else {
        extension.multiDrawElementsInstancedWEBGL(mode, counts, 0, type, starts, 0, primcount, 0, drawCount);
        let elementCount = 0;
        for (let i2 = 0; i2 < drawCount; i2++) {
          elementCount += counts[i2] * primcount[i2];
        }
        info.update(elementCount, mode, 1);
      }
    }
    this.setMode = setMode;
    this.setIndex = setIndex;
    this.render = render;
    this.renderInstances = renderInstances;
    this.renderMultiDraw = renderMultiDraw;
    this.renderMultiDrawInstances = renderMultiDrawInstances;
  }
  function WebGLInfo(gl) {
    const memory = {
      geometries: 0,
      textures: 0
    };
    const render = {
      frame: 0,
      calls: 0,
      triangles: 0,
      points: 0,
      lines: 0
    };
    function update(count, mode, instanceCount) {
      render.calls++;
      switch (mode) {
        case gl.TRIANGLES:
          render.triangles += instanceCount * (count / 3);
          break;
        case gl.LINES:
          render.lines += instanceCount * (count / 2);
          break;
        case gl.LINE_STRIP:
          render.lines += instanceCount * (count - 1);
          break;
        case gl.LINE_LOOP:
          render.lines += instanceCount * count;
          break;
        case gl.POINTS:
          render.points += instanceCount * count;
          break;
        default:
          console.error("THREE.WebGLInfo: Unknown draw mode:", mode);
          break;
      }
    }
    function reset() {
      render.calls = 0;
      render.triangles = 0;
      render.points = 0;
      render.lines = 0;
    }
    return {
      memory,
      render,
      programs: null,
      autoReset: true,
      reset,
      update
    };
  }
  function WebGLMorphtargets(gl, capabilities, textures) {
    const morphTextures = /* @__PURE__ */ new WeakMap();
    const morph = new Vector4();
    function update(object, geometry2, program) {
      const objectInfluences = object.morphTargetInfluences;
      const morphAttribute = geometry2.morphAttributes.position || geometry2.morphAttributes.normal || geometry2.morphAttributes.color;
      const morphTargetsCount = morphAttribute !== void 0 ? morphAttribute.length : 0;
      let entry = morphTextures.get(geometry2);
      if (entry === void 0 || entry.count !== morphTargetsCount) {
        let disposeTexture = function() {
          texture.dispose();
          morphTextures.delete(geometry2);
          geometry2.removeEventListener("dispose", disposeTexture);
        };
        if (entry !== void 0) entry.texture.dispose();
        const hasMorphPosition = geometry2.morphAttributes.position !== void 0;
        const hasMorphNormals = geometry2.morphAttributes.normal !== void 0;
        const hasMorphColors = geometry2.morphAttributes.color !== void 0;
        const morphTargets = geometry2.morphAttributes.position || [];
        const morphNormals = geometry2.morphAttributes.normal || [];
        const morphColors = geometry2.morphAttributes.color || [];
        let vertexDataCount = 0;
        if (hasMorphPosition === true) vertexDataCount = 1;
        if (hasMorphNormals === true) vertexDataCount = 2;
        if (hasMorphColors === true) vertexDataCount = 3;
        let width = geometry2.attributes.position.count * vertexDataCount;
        let height = 1;
        if (width > capabilities.maxTextureSize) {
          height = Math.ceil(width / capabilities.maxTextureSize);
          width = capabilities.maxTextureSize;
        }
        const buffer = new Float32Array(width * height * 4 * morphTargetsCount);
        const texture = new DataArrayTexture(buffer, width, height, morphTargetsCount);
        texture.type = FloatType;
        texture.needsUpdate = true;
        const vertexDataStride = vertexDataCount * 4;
        for (let i2 = 0; i2 < morphTargetsCount; i2++) {
          const morphTarget = morphTargets[i2];
          const morphNormal = morphNormals[i2];
          const morphColor = morphColors[i2];
          const offset = width * height * 4 * i2;
          for (let j2 = 0; j2 < morphTarget.count; j2++) {
            const stride = j2 * vertexDataStride;
            if (hasMorphPosition === true) {
              morph.fromBufferAttribute(morphTarget, j2);
              buffer[offset + stride + 0] = morph.x;
              buffer[offset + stride + 1] = morph.y;
              buffer[offset + stride + 2] = morph.z;
              buffer[offset + stride + 3] = 0;
            }
            if (hasMorphNormals === true) {
              morph.fromBufferAttribute(morphNormal, j2);
              buffer[offset + stride + 4] = morph.x;
              buffer[offset + stride + 5] = morph.y;
              buffer[offset + stride + 6] = morph.z;
              buffer[offset + stride + 7] = 0;
            }
            if (hasMorphColors === true) {
              morph.fromBufferAttribute(morphColor, j2);
              buffer[offset + stride + 8] = morph.x;
              buffer[offset + stride + 9] = morph.y;
              buffer[offset + stride + 10] = morph.z;
              buffer[offset + stride + 11] = morphColor.itemSize === 4 ? morph.w : 1;
            }
          }
        }
        entry = {
          count: morphTargetsCount,
          texture,
          size: new Vector2(width, height)
        };
        morphTextures.set(geometry2, entry);
        geometry2.addEventListener("dispose", disposeTexture);
      }
      if (object.isInstancedMesh === true && object.morphTexture !== null) {
        program.getUniforms().setValue(gl, "morphTexture", object.morphTexture, textures);
      } else {
        let morphInfluencesSum = 0;
        for (let i2 = 0; i2 < objectInfluences.length; i2++) {
          morphInfluencesSum += objectInfluences[i2];
        }
        const morphBaseInfluence = geometry2.morphTargetsRelative ? 1 : 1 - morphInfluencesSum;
        program.getUniforms().setValue(gl, "morphTargetBaseInfluence", morphBaseInfluence);
        program.getUniforms().setValue(gl, "morphTargetInfluences", objectInfluences);
      }
      program.getUniforms().setValue(gl, "morphTargetsTexture", entry.texture, textures);
      program.getUniforms().setValue(gl, "morphTargetsTextureSize", entry.size);
    }
    return {
      update
    };
  }
  function WebGLObjects(gl, geometries, attributes, info) {
    let updateMap = /* @__PURE__ */ new WeakMap();
    function update(object) {
      const frame = info.render.frame;
      const geometry2 = object.geometry;
      const buffergeometry = geometries.get(object, geometry2);
      if (updateMap.get(buffergeometry) !== frame) {
        geometries.update(buffergeometry);
        updateMap.set(buffergeometry, frame);
      }
      if (object.isInstancedMesh) {
        if (object.hasEventListener("dispose", onInstancedMeshDispose) === false) {
          object.addEventListener("dispose", onInstancedMeshDispose);
        }
        if (updateMap.get(object) !== frame) {
          attributes.update(object.instanceMatrix, gl.ARRAY_BUFFER);
          if (object.instanceColor !== null) {
            attributes.update(object.instanceColor, gl.ARRAY_BUFFER);
          }
          updateMap.set(object, frame);
        }
      }
      if (object.isSkinnedMesh) {
        const skeleton = object.skeleton;
        if (updateMap.get(skeleton) !== frame) {
          skeleton.update();
          updateMap.set(skeleton, frame);
        }
      }
      return buffergeometry;
    }
    function dispose() {
      updateMap = /* @__PURE__ */ new WeakMap();
    }
    function onInstancedMeshDispose(event) {
      const instancedMesh = event.target;
      instancedMesh.removeEventListener("dispose", onInstancedMeshDispose);
      attributes.remove(instancedMesh.instanceMatrix);
      if (instancedMesh.instanceColor !== null) attributes.remove(instancedMesh.instanceColor);
    }
    return {
      update,
      dispose
    };
  }
  var emptyTexture = /* @__PURE__ */ new Texture();
  var emptyShadowTexture = /* @__PURE__ */ new DepthTexture(1, 1);
  var emptyArrayTexture = /* @__PURE__ */ new DataArrayTexture();
  var empty3dTexture = /* @__PURE__ */ new Data3DTexture();
  var emptyCubeTexture = /* @__PURE__ */ new CubeTexture();
  var arrayCacheF32 = [];
  var arrayCacheI32 = [];
  var mat4array = new Float32Array(16);
  var mat3array = new Float32Array(9);
  var mat2array = new Float32Array(4);
  function flatten(array, nBlocks, blockSize) {
    const firstElem = array[0];
    if (firstElem <= 0 || firstElem > 0) return array;
    const n2 = nBlocks * blockSize;
    let r2 = arrayCacheF32[n2];
    if (r2 === void 0) {
      r2 = new Float32Array(n2);
      arrayCacheF32[n2] = r2;
    }
    if (nBlocks !== 0) {
      firstElem.toArray(r2, 0);
      for (let i2 = 1, offset = 0; i2 !== nBlocks; ++i2) {
        offset += blockSize;
        array[i2].toArray(r2, offset);
      }
    }
    return r2;
  }
  function arraysEqual(a2, b2) {
    if (a2.length !== b2.length) return false;
    for (let i2 = 0, l2 = a2.length; i2 < l2; i2++) {
      if (a2[i2] !== b2[i2]) return false;
    }
    return true;
  }
  function copyArray(a2, b2) {
    for (let i2 = 0, l2 = b2.length; i2 < l2; i2++) {
      a2[i2] = b2[i2];
    }
  }
  function allocTexUnits(textures, n2) {
    let r2 = arrayCacheI32[n2];
    if (r2 === void 0) {
      r2 = new Int32Array(n2);
      arrayCacheI32[n2] = r2;
    }
    for (let i2 = 0; i2 !== n2; ++i2) {
      r2[i2] = textures.allocateTextureUnit();
    }
    return r2;
  }
  function setValueV1f(gl, v) {
    const cache2 = this.cache;
    if (cache2[0] === v) return;
    gl.uniform1f(this.addr, v);
    cache2[0] = v;
  }
  function setValueV2f(gl, v) {
    const cache2 = this.cache;
    if (v.x !== void 0) {
      if (cache2[0] !== v.x || cache2[1] !== v.y) {
        gl.uniform2f(this.addr, v.x, v.y);
        cache2[0] = v.x;
        cache2[1] = v.y;
      }
    } else {
      if (arraysEqual(cache2, v)) return;
      gl.uniform2fv(this.addr, v);
      copyArray(cache2, v);
    }
  }
  function setValueV3f(gl, v) {
    const cache2 = this.cache;
    if (v.x !== void 0) {
      if (cache2[0] !== v.x || cache2[1] !== v.y || cache2[2] !== v.z) {
        gl.uniform3f(this.addr, v.x, v.y, v.z);
        cache2[0] = v.x;
        cache2[1] = v.y;
        cache2[2] = v.z;
      }
    } else if (v.r !== void 0) {
      if (cache2[0] !== v.r || cache2[1] !== v.g || cache2[2] !== v.b) {
        gl.uniform3f(this.addr, v.r, v.g, v.b);
        cache2[0] = v.r;
        cache2[1] = v.g;
        cache2[2] = v.b;
      }
    } else {
      if (arraysEqual(cache2, v)) return;
      gl.uniform3fv(this.addr, v);
      copyArray(cache2, v);
    }
  }
  function setValueV4f(gl, v) {
    const cache2 = this.cache;
    if (v.x !== void 0) {
      if (cache2[0] !== v.x || cache2[1] !== v.y || cache2[2] !== v.z || cache2[3] !== v.w) {
        gl.uniform4f(this.addr, v.x, v.y, v.z, v.w);
        cache2[0] = v.x;
        cache2[1] = v.y;
        cache2[2] = v.z;
        cache2[3] = v.w;
      }
    } else {
      if (arraysEqual(cache2, v)) return;
      gl.uniform4fv(this.addr, v);
      copyArray(cache2, v);
    }
  }
  function setValueM2(gl, v) {
    const cache2 = this.cache;
    const elements = v.elements;
    if (elements === void 0) {
      if (arraysEqual(cache2, v)) return;
      gl.uniformMatrix2fv(this.addr, false, v);
      copyArray(cache2, v);
    } else {
      if (arraysEqual(cache2, elements)) return;
      mat2array.set(elements);
      gl.uniformMatrix2fv(this.addr, false, mat2array);
      copyArray(cache2, elements);
    }
  }
  function setValueM3(gl, v) {
    const cache2 = this.cache;
    const elements = v.elements;
    if (elements === void 0) {
      if (arraysEqual(cache2, v)) return;
      gl.uniformMatrix3fv(this.addr, false, v);
      copyArray(cache2, v);
    } else {
      if (arraysEqual(cache2, elements)) return;
      mat3array.set(elements);
      gl.uniformMatrix3fv(this.addr, false, mat3array);
      copyArray(cache2, elements);
    }
  }
  function setValueM4(gl, v) {
    const cache2 = this.cache;
    const elements = v.elements;
    if (elements === void 0) {
      if (arraysEqual(cache2, v)) return;
      gl.uniformMatrix4fv(this.addr, false, v);
      copyArray(cache2, v);
    } else {
      if (arraysEqual(cache2, elements)) return;
      mat4array.set(elements);
      gl.uniformMatrix4fv(this.addr, false, mat4array);
      copyArray(cache2, elements);
    }
  }
  function setValueV1i(gl, v) {
    const cache2 = this.cache;
    if (cache2[0] === v) return;
    gl.uniform1i(this.addr, v);
    cache2[0] = v;
  }
  function setValueV2i(gl, v) {
    const cache2 = this.cache;
    if (v.x !== void 0) {
      if (cache2[0] !== v.x || cache2[1] !== v.y) {
        gl.uniform2i(this.addr, v.x, v.y);
        cache2[0] = v.x;
        cache2[1] = v.y;
      }
    } else {
      if (arraysEqual(cache2, v)) return;
      gl.uniform2iv(this.addr, v);
      copyArray(cache2, v);
    }
  }
  function setValueV3i(gl, v) {
    const cache2 = this.cache;
    if (v.x !== void 0) {
      if (cache2[0] !== v.x || cache2[1] !== v.y || cache2[2] !== v.z) {
        gl.uniform3i(this.addr, v.x, v.y, v.z);
        cache2[0] = v.x;
        cache2[1] = v.y;
        cache2[2] = v.z;
      }
    } else {
      if (arraysEqual(cache2, v)) return;
      gl.uniform3iv(this.addr, v);
      copyArray(cache2, v);
    }
  }
  function setValueV4i(gl, v) {
    const cache2 = this.cache;
    if (v.x !== void 0) {
      if (cache2[0] !== v.x || cache2[1] !== v.y || cache2[2] !== v.z || cache2[3] !== v.w) {
        gl.uniform4i(this.addr, v.x, v.y, v.z, v.w);
        cache2[0] = v.x;
        cache2[1] = v.y;
        cache2[2] = v.z;
        cache2[3] = v.w;
      }
    } else {
      if (arraysEqual(cache2, v)) return;
      gl.uniform4iv(this.addr, v);
      copyArray(cache2, v);
    }
  }
  function setValueV1ui(gl, v) {
    const cache2 = this.cache;
    if (cache2[0] === v) return;
    gl.uniform1ui(this.addr, v);
    cache2[0] = v;
  }
  function setValueV2ui(gl, v) {
    const cache2 = this.cache;
    if (v.x !== void 0) {
      if (cache2[0] !== v.x || cache2[1] !== v.y) {
        gl.uniform2ui(this.addr, v.x, v.y);
        cache2[0] = v.x;
        cache2[1] = v.y;
      }
    } else {
      if (arraysEqual(cache2, v)) return;
      gl.uniform2uiv(this.addr, v);
      copyArray(cache2, v);
    }
  }
  function setValueV3ui(gl, v) {
    const cache2 = this.cache;
    if (v.x !== void 0) {
      if (cache2[0] !== v.x || cache2[1] !== v.y || cache2[2] !== v.z) {
        gl.uniform3ui(this.addr, v.x, v.y, v.z);
        cache2[0] = v.x;
        cache2[1] = v.y;
        cache2[2] = v.z;
      }
    } else {
      if (arraysEqual(cache2, v)) return;
      gl.uniform3uiv(this.addr, v);
      copyArray(cache2, v);
    }
  }
  function setValueV4ui(gl, v) {
    const cache2 = this.cache;
    if (v.x !== void 0) {
      if (cache2[0] !== v.x || cache2[1] !== v.y || cache2[2] !== v.z || cache2[3] !== v.w) {
        gl.uniform4ui(this.addr, v.x, v.y, v.z, v.w);
        cache2[0] = v.x;
        cache2[1] = v.y;
        cache2[2] = v.z;
        cache2[3] = v.w;
      }
    } else {
      if (arraysEqual(cache2, v)) return;
      gl.uniform4uiv(this.addr, v);
      copyArray(cache2, v);
    }
  }
  function setValueT1(gl, v, textures) {
    const cache2 = this.cache;
    const unit = textures.allocateTextureUnit();
    if (cache2[0] !== unit) {
      gl.uniform1i(this.addr, unit);
      cache2[0] = unit;
    }
    let emptyTexture2D;
    if (this.type === gl.SAMPLER_2D_SHADOW) {
      emptyShadowTexture.compareFunction = LessEqualCompare;
      emptyTexture2D = emptyShadowTexture;
    } else {
      emptyTexture2D = emptyTexture;
    }
    textures.setTexture2D(v || emptyTexture2D, unit);
  }
  function setValueT3D1(gl, v, textures) {
    const cache2 = this.cache;
    const unit = textures.allocateTextureUnit();
    if (cache2[0] !== unit) {
      gl.uniform1i(this.addr, unit);
      cache2[0] = unit;
    }
    textures.setTexture3D(v || empty3dTexture, unit);
  }
  function setValueT6(gl, v, textures) {
    const cache2 = this.cache;
    const unit = textures.allocateTextureUnit();
    if (cache2[0] !== unit) {
      gl.uniform1i(this.addr, unit);
      cache2[0] = unit;
    }
    textures.setTextureCube(v || emptyCubeTexture, unit);
  }
  function setValueT2DArray1(gl, v, textures) {
    const cache2 = this.cache;
    const unit = textures.allocateTextureUnit();
    if (cache2[0] !== unit) {
      gl.uniform1i(this.addr, unit);
      cache2[0] = unit;
    }
    textures.setTexture2DArray(v || emptyArrayTexture, unit);
  }
  function getSingularSetter(type) {
    switch (type) {
      case 5126:
        return setValueV1f;
      // FLOAT
      case 35664:
        return setValueV2f;
      // _VEC2
      case 35665:
        return setValueV3f;
      // _VEC3
      case 35666:
        return setValueV4f;
      // _VEC4
      case 35674:
        return setValueM2;
      // _MAT2
      case 35675:
        return setValueM3;
      // _MAT3
      case 35676:
        return setValueM4;
      // _MAT4
      case 5124:
      case 35670:
        return setValueV1i;
      // INT, BOOL
      case 35667:
      case 35671:
        return setValueV2i;
      // _VEC2
      case 35668:
      case 35672:
        return setValueV3i;
      // _VEC3
      case 35669:
      case 35673:
        return setValueV4i;
      // _VEC4
      case 5125:
        return setValueV1ui;
      // UINT
      case 36294:
        return setValueV2ui;
      // _VEC2
      case 36295:
        return setValueV3ui;
      // _VEC3
      case 36296:
        return setValueV4ui;
      // _VEC4
      case 35678:
      // SAMPLER_2D
      case 36198:
      // SAMPLER_EXTERNAL_OES
      case 36298:
      // INT_SAMPLER_2D
      case 36306:
      // UNSIGNED_INT_SAMPLER_2D
      case 35682:
        return setValueT1;
      case 35679:
      // SAMPLER_3D
      case 36299:
      // INT_SAMPLER_3D
      case 36307:
        return setValueT3D1;
      case 35680:
      // SAMPLER_CUBE
      case 36300:
      // INT_SAMPLER_CUBE
      case 36308:
      // UNSIGNED_INT_SAMPLER_CUBE
      case 36293:
        return setValueT6;
      case 36289:
      // SAMPLER_2D_ARRAY
      case 36303:
      // INT_SAMPLER_2D_ARRAY
      case 36311:
      // UNSIGNED_INT_SAMPLER_2D_ARRAY
      case 36292:
        return setValueT2DArray1;
    }
  }
  function setValueV1fArray(gl, v) {
    gl.uniform1fv(this.addr, v);
  }
  function setValueV2fArray(gl, v) {
    const data = flatten(v, this.size, 2);
    gl.uniform2fv(this.addr, data);
  }
  function setValueV3fArray(gl, v) {
    const data = flatten(v, this.size, 3);
    gl.uniform3fv(this.addr, data);
  }
  function setValueV4fArray(gl, v) {
    const data = flatten(v, this.size, 4);
    gl.uniform4fv(this.addr, data);
  }
  function setValueM2Array(gl, v) {
    const data = flatten(v, this.size, 4);
    gl.uniformMatrix2fv(this.addr, false, data);
  }
  function setValueM3Array(gl, v) {
    const data = flatten(v, this.size, 9);
    gl.uniformMatrix3fv(this.addr, false, data);
  }
  function setValueM4Array(gl, v) {
    const data = flatten(v, this.size, 16);
    gl.uniformMatrix4fv(this.addr, false, data);
  }
  function setValueV1iArray(gl, v) {
    gl.uniform1iv(this.addr, v);
  }
  function setValueV2iArray(gl, v) {
    gl.uniform2iv(this.addr, v);
  }
  function setValueV3iArray(gl, v) {
    gl.uniform3iv(this.addr, v);
  }
  function setValueV4iArray(gl, v) {
    gl.uniform4iv(this.addr, v);
  }
  function setValueV1uiArray(gl, v) {
    gl.uniform1uiv(this.addr, v);
  }
  function setValueV2uiArray(gl, v) {
    gl.uniform2uiv(this.addr, v);
  }
  function setValueV3uiArray(gl, v) {
    gl.uniform3uiv(this.addr, v);
  }
  function setValueV4uiArray(gl, v) {
    gl.uniform4uiv(this.addr, v);
  }
  function setValueT1Array(gl, v, textures) {
    const cache2 = this.cache;
    const n2 = v.length;
    const units = allocTexUnits(textures, n2);
    if (!arraysEqual(cache2, units)) {
      gl.uniform1iv(this.addr, units);
      copyArray(cache2, units);
    }
    for (let i2 = 0; i2 !== n2; ++i2) {
      textures.setTexture2D(v[i2] || emptyTexture, units[i2]);
    }
  }
  function setValueT3DArray(gl, v, textures) {
    const cache2 = this.cache;
    const n2 = v.length;
    const units = allocTexUnits(textures, n2);
    if (!arraysEqual(cache2, units)) {
      gl.uniform1iv(this.addr, units);
      copyArray(cache2, units);
    }
    for (let i2 = 0; i2 !== n2; ++i2) {
      textures.setTexture3D(v[i2] || empty3dTexture, units[i2]);
    }
  }
  function setValueT6Array(gl, v, textures) {
    const cache2 = this.cache;
    const n2 = v.length;
    const units = allocTexUnits(textures, n2);
    if (!arraysEqual(cache2, units)) {
      gl.uniform1iv(this.addr, units);
      copyArray(cache2, units);
    }
    for (let i2 = 0; i2 !== n2; ++i2) {
      textures.setTextureCube(v[i2] || emptyCubeTexture, units[i2]);
    }
  }
  function setValueT2DArrayArray(gl, v, textures) {
    const cache2 = this.cache;
    const n2 = v.length;
    const units = allocTexUnits(textures, n2);
    if (!arraysEqual(cache2, units)) {
      gl.uniform1iv(this.addr, units);
      copyArray(cache2, units);
    }
    for (let i2 = 0; i2 !== n2; ++i2) {
      textures.setTexture2DArray(v[i2] || emptyArrayTexture, units[i2]);
    }
  }
  function getPureArraySetter(type) {
    switch (type) {
      case 5126:
        return setValueV1fArray;
      // FLOAT
      case 35664:
        return setValueV2fArray;
      // _VEC2
      case 35665:
        return setValueV3fArray;
      // _VEC3
      case 35666:
        return setValueV4fArray;
      // _VEC4
      case 35674:
        return setValueM2Array;
      // _MAT2
      case 35675:
        return setValueM3Array;
      // _MAT3
      case 35676:
        return setValueM4Array;
      // _MAT4
      case 5124:
      case 35670:
        return setValueV1iArray;
      // INT, BOOL
      case 35667:
      case 35671:
        return setValueV2iArray;
      // _VEC2
      case 35668:
      case 35672:
        return setValueV3iArray;
      // _VEC3
      case 35669:
      case 35673:
        return setValueV4iArray;
      // _VEC4
      case 5125:
        return setValueV1uiArray;
      // UINT
      case 36294:
        return setValueV2uiArray;
      // _VEC2
      case 36295:
        return setValueV3uiArray;
      // _VEC3
      case 36296:
        return setValueV4uiArray;
      // _VEC4
      case 35678:
      // SAMPLER_2D
      case 36198:
      // SAMPLER_EXTERNAL_OES
      case 36298:
      // INT_SAMPLER_2D
      case 36306:
      // UNSIGNED_INT_SAMPLER_2D
      case 35682:
        return setValueT1Array;
      case 35679:
      // SAMPLER_3D
      case 36299:
      // INT_SAMPLER_3D
      case 36307:
        return setValueT3DArray;
      case 35680:
      // SAMPLER_CUBE
      case 36300:
      // INT_SAMPLER_CUBE
      case 36308:
      // UNSIGNED_INT_SAMPLER_CUBE
      case 36293:
        return setValueT6Array;
      case 36289:
      // SAMPLER_2D_ARRAY
      case 36303:
      // INT_SAMPLER_2D_ARRAY
      case 36311:
      // UNSIGNED_INT_SAMPLER_2D_ARRAY
      case 36292:
        return setValueT2DArrayArray;
    }
  }
  var SingleUniform = class {
    constructor(id, activeInfo, addr) {
      this.id = id;
      this.addr = addr;
      this.cache = [];
      this.type = activeInfo.type;
      this.setValue = getSingularSetter(activeInfo.type);
    }
  };
  var PureArrayUniform = class {
    constructor(id, activeInfo, addr) {
      this.id = id;
      this.addr = addr;
      this.cache = [];
      this.type = activeInfo.type;
      this.size = activeInfo.size;
      this.setValue = getPureArraySetter(activeInfo.type);
    }
  };
  var StructuredUniform = class {
    constructor(id) {
      this.id = id;
      this.seq = [];
      this.map = {};
    }
    setValue(gl, value, textures) {
      const seq = this.seq;
      for (let i2 = 0, n2 = seq.length; i2 !== n2; ++i2) {
        const u2 = seq[i2];
        u2.setValue(gl, value[u2.id], textures);
      }
    }
  };
  var RePathPart = /(\w+)(\])?(\[|\.)?/g;
  function addUniform(container, uniformObject) {
    container.seq.push(uniformObject);
    container.map[uniformObject.id] = uniformObject;
  }
  function parseUniform(activeInfo, addr, container) {
    const path = activeInfo.name, pathLength = path.length;
    RePathPart.lastIndex = 0;
    while (true) {
      const match = RePathPart.exec(path), matchEnd = RePathPart.lastIndex;
      let id = match[1];
      const idIsIndex = match[2] === "]", subscript = match[3];
      if (idIsIndex) id = id | 0;
      if (subscript === void 0 || subscript === "[" && matchEnd + 2 === pathLength) {
        addUniform(container, subscript === void 0 ? new SingleUniform(id, activeInfo, addr) : new PureArrayUniform(id, activeInfo, addr));
        break;
      } else {
        const map = container.map;
        let next = map[id];
        if (next === void 0) {
          next = new StructuredUniform(id);
          addUniform(container, next);
        }
        container = next;
      }
    }
  }
  var WebGLUniforms = class {
    constructor(gl, program) {
      this.seq = [];
      this.map = {};
      const n2 = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
      for (let i2 = 0; i2 < n2; ++i2) {
        const info = gl.getActiveUniform(program, i2), addr = gl.getUniformLocation(program, info.name);
        parseUniform(info, addr, this);
      }
    }
    setValue(gl, name, value, textures) {
      const u2 = this.map[name];
      if (u2 !== void 0) u2.setValue(gl, value, textures);
    }
    setOptional(gl, object, name) {
      const v = object[name];
      if (v !== void 0) this.setValue(gl, name, v);
    }
    static upload(gl, seq, values, textures) {
      for (let i2 = 0, n2 = seq.length; i2 !== n2; ++i2) {
        const u2 = seq[i2], v = values[u2.id];
        if (v.needsUpdate !== false) {
          u2.setValue(gl, v.value, textures);
        }
      }
    }
    static seqWithValue(seq, values) {
      const r2 = [];
      for (let i2 = 0, n2 = seq.length; i2 !== n2; ++i2) {
        const u2 = seq[i2];
        if (u2.id in values) r2.push(u2);
      }
      return r2;
    }
  };
  function WebGLShader(gl, type, string) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, string);
    gl.compileShader(shader);
    return shader;
  }
  var COMPLETION_STATUS_KHR = 37297;
  var programIdCount = 0;
  function handleSource(string, errorLine) {
    const lines = string.split("\n");
    const lines2 = [];
    const from = Math.max(errorLine - 6, 0);
    const to = Math.min(errorLine + 6, lines.length);
    for (let i2 = from; i2 < to; i2++) {
      const line = i2 + 1;
      lines2.push(`${line === errorLine ? ">" : " "} ${line}: ${lines[i2]}`);
    }
    return lines2.join("\n");
  }
  var _m0 = /* @__PURE__ */ new Matrix3();
  function getEncodingComponents(colorSpace) {
    ColorManagement._getMatrix(_m0, ColorManagement.workingColorSpace, colorSpace);
    const encodingMatrix = `mat3( ${_m0.elements.map((v) => v.toFixed(4))} )`;
    switch (ColorManagement.getTransfer(colorSpace)) {
      case LinearTransfer:
        return [encodingMatrix, "LinearTransferOETF"];
      case SRGBTransfer:
        return [encodingMatrix, "sRGBTransferOETF"];
      default:
        console.warn("THREE.WebGLProgram: Unsupported color space: ", colorSpace);
        return [encodingMatrix, "LinearTransferOETF"];
    }
  }
  function getShaderErrors(gl, shader, type) {
    const status = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    const errors = gl.getShaderInfoLog(shader).trim();
    if (status && errors === "") return "";
    const errorMatches = /ERROR: 0:(\d+)/.exec(errors);
    if (errorMatches) {
      const errorLine = parseInt(errorMatches[1]);
      return type.toUpperCase() + "\n\n" + errors + "\n\n" + handleSource(gl.getShaderSource(shader), errorLine);
    } else {
      return errors;
    }
  }
  function getTexelEncodingFunction(functionName, colorSpace) {
    const components = getEncodingComponents(colorSpace);
    return [
      `vec4 ${functionName}( vec4 value ) {`,
      `	return ${components[1]}( vec4( value.rgb * ${components[0]}, value.a ) );`,
      "}"
    ].join("\n");
  }
  function getToneMappingFunction(functionName, toneMapping) {
    let toneMappingName;
    switch (toneMapping) {
      case LinearToneMapping:
        toneMappingName = "Linear";
        break;
      case ReinhardToneMapping:
        toneMappingName = "Reinhard";
        break;
      case CineonToneMapping:
        toneMappingName = "Cineon";
        break;
      case ACESFilmicToneMapping:
        toneMappingName = "ACESFilmic";
        break;
      case AgXToneMapping:
        toneMappingName = "AgX";
        break;
      case NeutralToneMapping:
        toneMappingName = "Neutral";
        break;
      case CustomToneMapping:
        toneMappingName = "Custom";
        break;
      default:
        console.warn("THREE.WebGLProgram: Unsupported toneMapping:", toneMapping);
        toneMappingName = "Linear";
    }
    return "vec3 " + functionName + "( vec3 color ) { return " + toneMappingName + "ToneMapping( color ); }";
  }
  var _v0 = /* @__PURE__ */ new Vector3();
  function getLuminanceFunction() {
    ColorManagement.getLuminanceCoefficients(_v0);
    const r2 = _v0.x.toFixed(4);
    const g2 = _v0.y.toFixed(4);
    const b2 = _v0.z.toFixed(4);
    return [
      "float luminance( const in vec3 rgb ) {",
      `	const vec3 weights = vec3( ${r2}, ${g2}, ${b2} );`,
      "	return dot( weights, rgb );",
      "}"
    ].join("\n");
  }
  function generateVertexExtensions(parameters) {
    const chunks = [
      parameters.extensionClipCullDistance ? "#extension GL_ANGLE_clip_cull_distance : require" : "",
      parameters.extensionMultiDraw ? "#extension GL_ANGLE_multi_draw : require" : ""
    ];
    return chunks.filter(filterEmptyLine).join("\n");
  }
  function generateDefines(defines) {
    const chunks = [];
    for (const name in defines) {
      const value = defines[name];
      if (value === false) continue;
      chunks.push("#define " + name + " " + value);
    }
    return chunks.join("\n");
  }
  function fetchAttributeLocations(gl, program) {
    const attributes = {};
    const n2 = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
    for (let i2 = 0; i2 < n2; i2++) {
      const info = gl.getActiveAttrib(program, i2);
      const name = info.name;
      let locationSize = 1;
      if (info.type === gl.FLOAT_MAT2) locationSize = 2;
      if (info.type === gl.FLOAT_MAT3) locationSize = 3;
      if (info.type === gl.FLOAT_MAT4) locationSize = 4;
      attributes[name] = {
        type: info.type,
        location: gl.getAttribLocation(program, name),
        locationSize
      };
    }
    return attributes;
  }
  function filterEmptyLine(string) {
    return string !== "";
  }
  function replaceLightNums(string, parameters) {
    const numSpotLightCoords = parameters.numSpotLightShadows + parameters.numSpotLightMaps - parameters.numSpotLightShadowsWithMaps;
    return string.replace(/NUM_DIR_LIGHTS/g, parameters.numDirLights).replace(/NUM_SPOT_LIGHTS/g, parameters.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g, parameters.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g, numSpotLightCoords).replace(/NUM_RECT_AREA_LIGHTS/g, parameters.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g, parameters.numPointLights).replace(/NUM_HEMI_LIGHTS/g, parameters.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g, parameters.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g, parameters.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g, parameters.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g, parameters.numPointLightShadows);
  }
  function replaceClippingPlaneNums(string, parameters) {
    return string.replace(/NUM_CLIPPING_PLANES/g, parameters.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g, parameters.numClippingPlanes - parameters.numClipIntersection);
  }
  var includePattern = /^[ \t]*#include +<([\w\d./]+)>/gm;
  function resolveIncludes(string) {
    return string.replace(includePattern, includeReplacer);
  }
  var shaderChunkMap = /* @__PURE__ */ new Map();
  function includeReplacer(match, include) {
    let string = ShaderChunk[include];
    if (string === void 0) {
      const newInclude = shaderChunkMap.get(include);
      if (newInclude !== void 0) {
        string = ShaderChunk[newInclude];
        console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.', include, newInclude);
      } else {
        throw new Error("Can not resolve #include <" + include + ">");
      }
    }
    return resolveIncludes(string);
  }
  var unrollLoopPattern = /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;
  function unrollLoops(string) {
    return string.replace(unrollLoopPattern, loopReplacer);
  }
  function loopReplacer(match, start, end, snippet) {
    let string = "";
    for (let i2 = parseInt(start); i2 < parseInt(end); i2++) {
      string += snippet.replace(/\[\s*i\s*\]/g, "[ " + i2 + " ]").replace(/UNROLLED_LOOP_INDEX/g, i2);
    }
    return string;
  }
  function generatePrecision(parameters) {
    let precisionstring = `precision ${parameters.precision} float;
	precision ${parameters.precision} int;
	precision ${parameters.precision} sampler2D;
	precision ${parameters.precision} samplerCube;
	precision ${parameters.precision} sampler3D;
	precision ${parameters.precision} sampler2DArray;
	precision ${parameters.precision} sampler2DShadow;
	precision ${parameters.precision} samplerCubeShadow;
	precision ${parameters.precision} sampler2DArrayShadow;
	precision ${parameters.precision} isampler2D;
	precision ${parameters.precision} isampler3D;
	precision ${parameters.precision} isamplerCube;
	precision ${parameters.precision} isampler2DArray;
	precision ${parameters.precision} usampler2D;
	precision ${parameters.precision} usampler3D;
	precision ${parameters.precision} usamplerCube;
	precision ${parameters.precision} usampler2DArray;
	`;
    if (parameters.precision === "highp") {
      precisionstring += "\n#define HIGH_PRECISION";
    } else if (parameters.precision === "mediump") {
      precisionstring += "\n#define MEDIUM_PRECISION";
    } else if (parameters.precision === "lowp") {
      precisionstring += "\n#define LOW_PRECISION";
    }
    return precisionstring;
  }
  function generateShadowMapTypeDefine(parameters) {
    let shadowMapTypeDefine = "SHADOWMAP_TYPE_BASIC";
    if (parameters.shadowMapType === PCFShadowMap) {
      shadowMapTypeDefine = "SHADOWMAP_TYPE_PCF";
    } else if (parameters.shadowMapType === PCFSoftShadowMap) {
      shadowMapTypeDefine = "SHADOWMAP_TYPE_PCF_SOFT";
    } else if (parameters.shadowMapType === VSMShadowMap) {
      shadowMapTypeDefine = "SHADOWMAP_TYPE_VSM";
    }
    return shadowMapTypeDefine;
  }
  function generateEnvMapTypeDefine(parameters) {
    let envMapTypeDefine = "ENVMAP_TYPE_CUBE";
    if (parameters.envMap) {
      switch (parameters.envMapMode) {
        case CubeReflectionMapping:
        case CubeRefractionMapping:
          envMapTypeDefine = "ENVMAP_TYPE_CUBE";
          break;
        case CubeUVReflectionMapping:
          envMapTypeDefine = "ENVMAP_TYPE_CUBE_UV";
          break;
      }
    }
    return envMapTypeDefine;
  }
  function generateEnvMapModeDefine(parameters) {
    let envMapModeDefine = "ENVMAP_MODE_REFLECTION";
    if (parameters.envMap) {
      switch (parameters.envMapMode) {
        case CubeRefractionMapping:
          envMapModeDefine = "ENVMAP_MODE_REFRACTION";
          break;
      }
    }
    return envMapModeDefine;
  }
  function generateEnvMapBlendingDefine(parameters) {
    let envMapBlendingDefine = "ENVMAP_BLENDING_NONE";
    if (parameters.envMap) {
      switch (parameters.combine) {
        case MultiplyOperation:
          envMapBlendingDefine = "ENVMAP_BLENDING_MULTIPLY";
          break;
        case MixOperation:
          envMapBlendingDefine = "ENVMAP_BLENDING_MIX";
          break;
        case AddOperation:
          envMapBlendingDefine = "ENVMAP_BLENDING_ADD";
          break;
      }
    }
    return envMapBlendingDefine;
  }
  function generateCubeUVSize(parameters) {
    const imageHeight = parameters.envMapCubeUVHeight;
    if (imageHeight === null) return null;
    const maxMip = Math.log2(imageHeight) - 2;
    const texelHeight = 1 / imageHeight;
    const texelWidth = 1 / (3 * Math.max(Math.pow(2, maxMip), 7 * 16));
    return { texelWidth, texelHeight, maxMip };
  }
  function WebGLProgram(renderer2, cacheKey, parameters, bindingStates) {
    const gl = renderer2.getContext();
    const defines = parameters.defines;
    let vertexShader = parameters.vertexShader;
    let fragmentShader = parameters.fragmentShader;
    const shadowMapTypeDefine = generateShadowMapTypeDefine(parameters);
    const envMapTypeDefine = generateEnvMapTypeDefine(parameters);
    const envMapModeDefine = generateEnvMapModeDefine(parameters);
    const envMapBlendingDefine = generateEnvMapBlendingDefine(parameters);
    const envMapCubeUVSize = generateCubeUVSize(parameters);
    const customVertexExtensions = generateVertexExtensions(parameters);
    const customDefines = generateDefines(defines);
    const program = gl.createProgram();
    let prefixVertex, prefixFragment;
    let versionString = parameters.glslVersion ? "#version " + parameters.glslVersion + "\n" : "";
    if (parameters.isRawShaderMaterial) {
      prefixVertex = [
        "#define SHADER_TYPE " + parameters.shaderType,
        "#define SHADER_NAME " + parameters.shaderName,
        customDefines
      ].filter(filterEmptyLine).join("\n");
      if (prefixVertex.length > 0) {
        prefixVertex += "\n";
      }
      prefixFragment = [
        "#define SHADER_TYPE " + parameters.shaderType,
        "#define SHADER_NAME " + parameters.shaderName,
        customDefines
      ].filter(filterEmptyLine).join("\n");
      if (prefixFragment.length > 0) {
        prefixFragment += "\n";
      }
    } else {
      prefixVertex = [
        generatePrecision(parameters),
        "#define SHADER_TYPE " + parameters.shaderType,
        "#define SHADER_NAME " + parameters.shaderName,
        customDefines,
        parameters.extensionClipCullDistance ? "#define USE_CLIP_DISTANCE" : "",
        parameters.batching ? "#define USE_BATCHING" : "",
        parameters.batchingColor ? "#define USE_BATCHING_COLOR" : "",
        parameters.instancing ? "#define USE_INSTANCING" : "",
        parameters.instancingColor ? "#define USE_INSTANCING_COLOR" : "",
        parameters.instancingMorph ? "#define USE_INSTANCING_MORPH" : "",
        parameters.useFog && parameters.fog ? "#define USE_FOG" : "",
        parameters.useFog && parameters.fogExp2 ? "#define FOG_EXP2" : "",
        parameters.map ? "#define USE_MAP" : "",
        parameters.envMap ? "#define USE_ENVMAP" : "",
        parameters.envMap ? "#define " + envMapModeDefine : "",
        parameters.lightMap ? "#define USE_LIGHTMAP" : "",
        parameters.aoMap ? "#define USE_AOMAP" : "",
        parameters.bumpMap ? "#define USE_BUMPMAP" : "",
        parameters.normalMap ? "#define USE_NORMALMAP" : "",
        parameters.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "",
        parameters.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "",
        parameters.displacementMap ? "#define USE_DISPLACEMENTMAP" : "",
        parameters.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
        parameters.anisotropy ? "#define USE_ANISOTROPY" : "",
        parameters.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "",
        parameters.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
        parameters.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
        parameters.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
        parameters.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
        parameters.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
        parameters.specularMap ? "#define USE_SPECULARMAP" : "",
        parameters.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "",
        parameters.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "",
        parameters.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
        parameters.metalnessMap ? "#define USE_METALNESSMAP" : "",
        parameters.alphaMap ? "#define USE_ALPHAMAP" : "",
        parameters.alphaHash ? "#define USE_ALPHAHASH" : "",
        parameters.transmission ? "#define USE_TRANSMISSION" : "",
        parameters.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
        parameters.thicknessMap ? "#define USE_THICKNESSMAP" : "",
        parameters.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "",
        parameters.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "",
        //
        parameters.mapUv ? "#define MAP_UV " + parameters.mapUv : "",
        parameters.alphaMapUv ? "#define ALPHAMAP_UV " + parameters.alphaMapUv : "",
        parameters.lightMapUv ? "#define LIGHTMAP_UV " + parameters.lightMapUv : "",
        parameters.aoMapUv ? "#define AOMAP_UV " + parameters.aoMapUv : "",
        parameters.emissiveMapUv ? "#define EMISSIVEMAP_UV " + parameters.emissiveMapUv : "",
        parameters.bumpMapUv ? "#define BUMPMAP_UV " + parameters.bumpMapUv : "",
        parameters.normalMapUv ? "#define NORMALMAP_UV " + parameters.normalMapUv : "",
        parameters.displacementMapUv ? "#define DISPLACEMENTMAP_UV " + parameters.displacementMapUv : "",
        parameters.metalnessMapUv ? "#define METALNESSMAP_UV " + parameters.metalnessMapUv : "",
        parameters.roughnessMapUv ? "#define ROUGHNESSMAP_UV " + parameters.roughnessMapUv : "",
        parameters.anisotropyMapUv ? "#define ANISOTROPYMAP_UV " + parameters.anisotropyMapUv : "",
        parameters.clearcoatMapUv ? "#define CLEARCOATMAP_UV " + parameters.clearcoatMapUv : "",
        parameters.clearcoatNormalMapUv ? "#define CLEARCOAT_NORMALMAP_UV " + parameters.clearcoatNormalMapUv : "",
        parameters.clearcoatRoughnessMapUv ? "#define CLEARCOAT_ROUGHNESSMAP_UV " + parameters.clearcoatRoughnessMapUv : "",
        parameters.iridescenceMapUv ? "#define IRIDESCENCEMAP_UV " + parameters.iridescenceMapUv : "",
        parameters.iridescenceThicknessMapUv ? "#define IRIDESCENCE_THICKNESSMAP_UV " + parameters.iridescenceThicknessMapUv : "",
        parameters.sheenColorMapUv ? "#define SHEEN_COLORMAP_UV " + parameters.sheenColorMapUv : "",
        parameters.sheenRoughnessMapUv ? "#define SHEEN_ROUGHNESSMAP_UV " + parameters.sheenRoughnessMapUv : "",
        parameters.specularMapUv ? "#define SPECULARMAP_UV " + parameters.specularMapUv : "",
        parameters.specularColorMapUv ? "#define SPECULAR_COLORMAP_UV " + parameters.specularColorMapUv : "",
        parameters.specularIntensityMapUv ? "#define SPECULAR_INTENSITYMAP_UV " + parameters.specularIntensityMapUv : "",
        parameters.transmissionMapUv ? "#define TRANSMISSIONMAP_UV " + parameters.transmissionMapUv : "",
        parameters.thicknessMapUv ? "#define THICKNESSMAP_UV " + parameters.thicknessMapUv : "",
        //
        parameters.vertexTangents && parameters.flatShading === false ? "#define USE_TANGENT" : "",
        parameters.vertexColors ? "#define USE_COLOR" : "",
        parameters.vertexAlphas ? "#define USE_COLOR_ALPHA" : "",
        parameters.vertexUv1s ? "#define USE_UV1" : "",
        parameters.vertexUv2s ? "#define USE_UV2" : "",
        parameters.vertexUv3s ? "#define USE_UV3" : "",
        parameters.pointsUvs ? "#define USE_POINTS_UV" : "",
        parameters.flatShading ? "#define FLAT_SHADED" : "",
        parameters.skinning ? "#define USE_SKINNING" : "",
        parameters.morphTargets ? "#define USE_MORPHTARGETS" : "",
        parameters.morphNormals && parameters.flatShading === false ? "#define USE_MORPHNORMALS" : "",
        parameters.morphColors ? "#define USE_MORPHCOLORS" : "",
        parameters.morphTargetsCount > 0 ? "#define MORPHTARGETS_TEXTURE_STRIDE " + parameters.morphTextureStride : "",
        parameters.morphTargetsCount > 0 ? "#define MORPHTARGETS_COUNT " + parameters.morphTargetsCount : "",
        parameters.doubleSided ? "#define DOUBLE_SIDED" : "",
        parameters.flipSided ? "#define FLIP_SIDED" : "",
        parameters.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
        parameters.shadowMapEnabled ? "#define " + shadowMapTypeDefine : "",
        parameters.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "",
        parameters.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "",
        parameters.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "",
        parameters.reverseDepthBuffer ? "#define USE_REVERSEDEPTHBUF" : "",
        "uniform mat4 modelMatrix;",
        "uniform mat4 modelViewMatrix;",
        "uniform mat4 projectionMatrix;",
        "uniform mat4 viewMatrix;",
        "uniform mat3 normalMatrix;",
        "uniform vec3 cameraPosition;",
        "uniform bool isOrthographic;",
        "#ifdef USE_INSTANCING",
        "	attribute mat4 instanceMatrix;",
        "#endif",
        "#ifdef USE_INSTANCING_COLOR",
        "	attribute vec3 instanceColor;",
        "#endif",
        "#ifdef USE_INSTANCING_MORPH",
        "	uniform sampler2D morphTexture;",
        "#endif",
        "attribute vec3 position;",
        "attribute vec3 normal;",
        "attribute vec2 uv;",
        "#ifdef USE_UV1",
        "	attribute vec2 uv1;",
        "#endif",
        "#ifdef USE_UV2",
        "	attribute vec2 uv2;",
        "#endif",
        "#ifdef USE_UV3",
        "	attribute vec2 uv3;",
        "#endif",
        "#ifdef USE_TANGENT",
        "	attribute vec4 tangent;",
        "#endif",
        "#if defined( USE_COLOR_ALPHA )",
        "	attribute vec4 color;",
        "#elif defined( USE_COLOR )",
        "	attribute vec3 color;",
        "#endif",
        "#ifdef USE_SKINNING",
        "	attribute vec4 skinIndex;",
        "	attribute vec4 skinWeight;",
        "#endif",
        "\n"
      ].filter(filterEmptyLine).join("\n");
      prefixFragment = [
        generatePrecision(parameters),
        "#define SHADER_TYPE " + parameters.shaderType,
        "#define SHADER_NAME " + parameters.shaderName,
        customDefines,
        parameters.useFog && parameters.fog ? "#define USE_FOG" : "",
        parameters.useFog && parameters.fogExp2 ? "#define FOG_EXP2" : "",
        parameters.alphaToCoverage ? "#define ALPHA_TO_COVERAGE" : "",
        parameters.map ? "#define USE_MAP" : "",
        parameters.matcap ? "#define USE_MATCAP" : "",
        parameters.envMap ? "#define USE_ENVMAP" : "",
        parameters.envMap ? "#define " + envMapTypeDefine : "",
        parameters.envMap ? "#define " + envMapModeDefine : "",
        parameters.envMap ? "#define " + envMapBlendingDefine : "",
        envMapCubeUVSize ? "#define CUBEUV_TEXEL_WIDTH " + envMapCubeUVSize.texelWidth : "",
        envMapCubeUVSize ? "#define CUBEUV_TEXEL_HEIGHT " + envMapCubeUVSize.texelHeight : "",
        envMapCubeUVSize ? "#define CUBEUV_MAX_MIP " + envMapCubeUVSize.maxMip + ".0" : "",
        parameters.lightMap ? "#define USE_LIGHTMAP" : "",
        parameters.aoMap ? "#define USE_AOMAP" : "",
        parameters.bumpMap ? "#define USE_BUMPMAP" : "",
        parameters.normalMap ? "#define USE_NORMALMAP" : "",
        parameters.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "",
        parameters.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "",
        parameters.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
        parameters.anisotropy ? "#define USE_ANISOTROPY" : "",
        parameters.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "",
        parameters.clearcoat ? "#define USE_CLEARCOAT" : "",
        parameters.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
        parameters.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
        parameters.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
        parameters.dispersion ? "#define USE_DISPERSION" : "",
        parameters.iridescence ? "#define USE_IRIDESCENCE" : "",
        parameters.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
        parameters.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
        parameters.specularMap ? "#define USE_SPECULARMAP" : "",
        parameters.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "",
        parameters.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "",
        parameters.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
        parameters.metalnessMap ? "#define USE_METALNESSMAP" : "",
        parameters.alphaMap ? "#define USE_ALPHAMAP" : "",
        parameters.alphaTest ? "#define USE_ALPHATEST" : "",
        parameters.alphaHash ? "#define USE_ALPHAHASH" : "",
        parameters.sheen ? "#define USE_SHEEN" : "",
        parameters.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "",
        parameters.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "",
        parameters.transmission ? "#define USE_TRANSMISSION" : "",
        parameters.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
        parameters.thicknessMap ? "#define USE_THICKNESSMAP" : "",
        parameters.vertexTangents && parameters.flatShading === false ? "#define USE_TANGENT" : "",
        parameters.vertexColors || parameters.instancingColor || parameters.batchingColor ? "#define USE_COLOR" : "",
        parameters.vertexAlphas ? "#define USE_COLOR_ALPHA" : "",
        parameters.vertexUv1s ? "#define USE_UV1" : "",
        parameters.vertexUv2s ? "#define USE_UV2" : "",
        parameters.vertexUv3s ? "#define USE_UV3" : "",
        parameters.pointsUvs ? "#define USE_POINTS_UV" : "",
        parameters.gradientMap ? "#define USE_GRADIENTMAP" : "",
        parameters.flatShading ? "#define FLAT_SHADED" : "",
        parameters.doubleSided ? "#define DOUBLE_SIDED" : "",
        parameters.flipSided ? "#define FLIP_SIDED" : "",
        parameters.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
        parameters.shadowMapEnabled ? "#define " + shadowMapTypeDefine : "",
        parameters.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "",
        parameters.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "",
        parameters.decodeVideoTexture ? "#define DECODE_VIDEO_TEXTURE" : "",
        parameters.decodeVideoTextureEmissive ? "#define DECODE_VIDEO_TEXTURE_EMISSIVE" : "",
        parameters.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "",
        parameters.reverseDepthBuffer ? "#define USE_REVERSEDEPTHBUF" : "",
        "uniform mat4 viewMatrix;",
        "uniform vec3 cameraPosition;",
        "uniform bool isOrthographic;",
        parameters.toneMapping !== NoToneMapping ? "#define TONE_MAPPING" : "",
        parameters.toneMapping !== NoToneMapping ? ShaderChunk["tonemapping_pars_fragment"] : "",
        // this code is required here because it is used by the toneMapping() function defined below
        parameters.toneMapping !== NoToneMapping ? getToneMappingFunction("toneMapping", parameters.toneMapping) : "",
        parameters.dithering ? "#define DITHERING" : "",
        parameters.opaque ? "#define OPAQUE" : "",
        ShaderChunk["colorspace_pars_fragment"],
        // this code is required here because it is used by the various encoding/decoding function defined below
        getTexelEncodingFunction("linearToOutputTexel", parameters.outputColorSpace),
        getLuminanceFunction(),
        parameters.useDepthPacking ? "#define DEPTH_PACKING " + parameters.depthPacking : "",
        "\n"
      ].filter(filterEmptyLine).join("\n");
    }
    vertexShader = resolveIncludes(vertexShader);
    vertexShader = replaceLightNums(vertexShader, parameters);
    vertexShader = replaceClippingPlaneNums(vertexShader, parameters);
    fragmentShader = resolveIncludes(fragmentShader);
    fragmentShader = replaceLightNums(fragmentShader, parameters);
    fragmentShader = replaceClippingPlaneNums(fragmentShader, parameters);
    vertexShader = unrollLoops(vertexShader);
    fragmentShader = unrollLoops(fragmentShader);
    if (parameters.isRawShaderMaterial !== true) {
      versionString = "#version 300 es\n";
      prefixVertex = [
        customVertexExtensions,
        "#define attribute in",
        "#define varying out",
        "#define texture2D texture"
      ].join("\n") + "\n" + prefixVertex;
      prefixFragment = [
        "#define varying in",
        parameters.glslVersion === GLSL3 ? "" : "layout(location = 0) out highp vec4 pc_fragColor;",
        parameters.glslVersion === GLSL3 ? "" : "#define gl_FragColor pc_fragColor",
        "#define gl_FragDepthEXT gl_FragDepth",
        "#define texture2D texture",
        "#define textureCube texture",
        "#define texture2DProj textureProj",
        "#define texture2DLodEXT textureLod",
        "#define texture2DProjLodEXT textureProjLod",
        "#define textureCubeLodEXT textureLod",
        "#define texture2DGradEXT textureGrad",
        "#define texture2DProjGradEXT textureProjGrad",
        "#define textureCubeGradEXT textureGrad"
      ].join("\n") + "\n" + prefixFragment;
    }
    const vertexGlsl = versionString + prefixVertex + vertexShader;
    const fragmentGlsl = versionString + prefixFragment + fragmentShader;
    const glVertexShader = WebGLShader(gl, gl.VERTEX_SHADER, vertexGlsl);
    const glFragmentShader = WebGLShader(gl, gl.FRAGMENT_SHADER, fragmentGlsl);
    gl.attachShader(program, glVertexShader);
    gl.attachShader(program, glFragmentShader);
    if (parameters.index0AttributeName !== void 0) {
      gl.bindAttribLocation(program, 0, parameters.index0AttributeName);
    } else if (parameters.morphTargets === true) {
      gl.bindAttribLocation(program, 0, "position");
    }
    gl.linkProgram(program);
    function onFirstUse(self2) {
      if (renderer2.debug.checkShaderErrors) {
        const programLog = gl.getProgramInfoLog(program).trim();
        const vertexLog = gl.getShaderInfoLog(glVertexShader).trim();
        const fragmentLog = gl.getShaderInfoLog(glFragmentShader).trim();
        let runnable = true;
        let haveDiagnostics = true;
        if (gl.getProgramParameter(program, gl.LINK_STATUS) === false) {
          runnable = false;
          if (typeof renderer2.debug.onShaderError === "function") {
            renderer2.debug.onShaderError(gl, program, glVertexShader, glFragmentShader);
          } else {
            const vertexErrors = getShaderErrors(gl, glVertexShader, "vertex");
            const fragmentErrors = getShaderErrors(gl, glFragmentShader, "fragment");
            console.error(
              "THREE.WebGLProgram: Shader Error " + gl.getError() + " - VALIDATE_STATUS " + gl.getProgramParameter(program, gl.VALIDATE_STATUS) + "\n\nMaterial Name: " + self2.name + "\nMaterial Type: " + self2.type + "\n\nProgram Info Log: " + programLog + "\n" + vertexErrors + "\n" + fragmentErrors
            );
          }
        } else if (programLog !== "") {
          console.warn("THREE.WebGLProgram: Program Info Log:", programLog);
        } else if (vertexLog === "" || fragmentLog === "") {
          haveDiagnostics = false;
        }
        if (haveDiagnostics) {
          self2.diagnostics = {
            runnable,
            programLog,
            vertexShader: {
              log: vertexLog,
              prefix: prefixVertex
            },
            fragmentShader: {
              log: fragmentLog,
              prefix: prefixFragment
            }
          };
        }
      }
      gl.deleteShader(glVertexShader);
      gl.deleteShader(glFragmentShader);
      cachedUniforms = new WebGLUniforms(gl, program);
      cachedAttributes = fetchAttributeLocations(gl, program);
    }
    let cachedUniforms;
    this.getUniforms = function() {
      if (cachedUniforms === void 0) {
        onFirstUse(this);
      }
      return cachedUniforms;
    };
    let cachedAttributes;
    this.getAttributes = function() {
      if (cachedAttributes === void 0) {
        onFirstUse(this);
      }
      return cachedAttributes;
    };
    let programReady = parameters.rendererExtensionParallelShaderCompile === false;
    this.isReady = function() {
      if (programReady === false) {
        programReady = gl.getProgramParameter(program, COMPLETION_STATUS_KHR);
      }
      return programReady;
    };
    this.destroy = function() {
      bindingStates.releaseStatesOfProgram(this);
      gl.deleteProgram(program);
      this.program = void 0;
    };
    this.type = parameters.shaderType;
    this.name = parameters.shaderName;
    this.id = programIdCount++;
    this.cacheKey = cacheKey;
    this.usedTimes = 1;
    this.program = program;
    this.vertexShader = glVertexShader;
    this.fragmentShader = glFragmentShader;
    return this;
  }
  var _id = 0;
  var WebGLShaderCache = class {
    constructor() {
      this.shaderCache = /* @__PURE__ */ new Map();
      this.materialCache = /* @__PURE__ */ new Map();
    }
    update(material2) {
      const vertexShader = material2.vertexShader;
      const fragmentShader = material2.fragmentShader;
      const vertexShaderStage = this._getShaderStage(vertexShader);
      const fragmentShaderStage = this._getShaderStage(fragmentShader);
      const materialShaders = this._getShaderCacheForMaterial(material2);
      if (materialShaders.has(vertexShaderStage) === false) {
        materialShaders.add(vertexShaderStage);
        vertexShaderStage.usedTimes++;
      }
      if (materialShaders.has(fragmentShaderStage) === false) {
        materialShaders.add(fragmentShaderStage);
        fragmentShaderStage.usedTimes++;
      }
      return this;
    }
    remove(material2) {
      const materialShaders = this.materialCache.get(material2);
      for (const shaderStage of materialShaders) {
        shaderStage.usedTimes--;
        if (shaderStage.usedTimes === 0) this.shaderCache.delete(shaderStage.code);
      }
      this.materialCache.delete(material2);
      return this;
    }
    getVertexShaderID(material2) {
      return this._getShaderStage(material2.vertexShader).id;
    }
    getFragmentShaderID(material2) {
      return this._getShaderStage(material2.fragmentShader).id;
    }
    dispose() {
      this.shaderCache.clear();
      this.materialCache.clear();
    }
    _getShaderCacheForMaterial(material2) {
      const cache2 = this.materialCache;
      let set = cache2.get(material2);
      if (set === void 0) {
        set = /* @__PURE__ */ new Set();
        cache2.set(material2, set);
      }
      return set;
    }
    _getShaderStage(code) {
      const cache2 = this.shaderCache;
      let stage = cache2.get(code);
      if (stage === void 0) {
        stage = new WebGLShaderStage(code);
        cache2.set(code, stage);
      }
      return stage;
    }
  };
  var WebGLShaderStage = class {
    constructor(code) {
      this.id = _id++;
      this.code = code;
      this.usedTimes = 0;
    }
  };
  function WebGLPrograms(renderer2, cubemaps, cubeuvmaps, extensions, capabilities, bindingStates, clipping) {
    const _programLayers = new Layers();
    const _customShaders = new WebGLShaderCache();
    const _activeChannels = /* @__PURE__ */ new Set();
    const programs = [];
    const logarithmicDepthBuffer = capabilities.logarithmicDepthBuffer;
    const SUPPORTS_VERTEX_TEXTURES = capabilities.vertexTextures;
    let precision = capabilities.precision;
    const shaderIDs = {
      MeshDepthMaterial: "depth",
      MeshDistanceMaterial: "distanceRGBA",
      MeshNormalMaterial: "normal",
      MeshBasicMaterial: "basic",
      MeshLambertMaterial: "lambert",
      MeshPhongMaterial: "phong",
      MeshToonMaterial: "toon",
      MeshStandardMaterial: "physical",
      MeshPhysicalMaterial: "physical",
      MeshMatcapMaterial: "matcap",
      LineBasicMaterial: "basic",
      LineDashedMaterial: "dashed",
      PointsMaterial: "points",
      ShadowMaterial: "shadow",
      SpriteMaterial: "sprite"
    };
    function getChannel(value) {
      _activeChannels.add(value);
      if (value === 0) return "uv";
      return `uv${value}`;
    }
    function getParameters(material2, lights, shadows, scene2, object) {
      const fog = scene2.fog;
      const geometry2 = object.geometry;
      const environment = material2.isMeshStandardMaterial ? scene2.environment : null;
      const envMap = (material2.isMeshStandardMaterial ? cubeuvmaps : cubemaps).get(material2.envMap || environment);
      const envMapCubeUVHeight = !!envMap && envMap.mapping === CubeUVReflectionMapping ? envMap.image.height : null;
      const shaderID = shaderIDs[material2.type];
      if (material2.precision !== null) {
        precision = capabilities.getMaxPrecision(material2.precision);
        if (precision !== material2.precision) {
          console.warn("THREE.WebGLProgram.getParameters:", material2.precision, "not supported, using", precision, "instead.");
        }
      }
      const morphAttribute = geometry2.morphAttributes.position || geometry2.morphAttributes.normal || geometry2.morphAttributes.color;
      const morphTargetsCount = morphAttribute !== void 0 ? morphAttribute.length : 0;
      let morphTextureStride = 0;
      if (geometry2.morphAttributes.position !== void 0) morphTextureStride = 1;
      if (geometry2.morphAttributes.normal !== void 0) morphTextureStride = 2;
      if (geometry2.morphAttributes.color !== void 0) morphTextureStride = 3;
      let vertexShader, fragmentShader;
      let customVertexShaderID, customFragmentShaderID;
      if (shaderID) {
        const shader = ShaderLib[shaderID];
        vertexShader = shader.vertexShader;
        fragmentShader = shader.fragmentShader;
      } else {
        vertexShader = material2.vertexShader;
        fragmentShader = material2.fragmentShader;
        _customShaders.update(material2);
        customVertexShaderID = _customShaders.getVertexShaderID(material2);
        customFragmentShaderID = _customShaders.getFragmentShaderID(material2);
      }
      const currentRenderTarget = renderer2.getRenderTarget();
      const reverseDepthBuffer = renderer2.state.buffers.depth.getReversed();
      const IS_INSTANCEDMESH = object.isInstancedMesh === true;
      const IS_BATCHEDMESH = object.isBatchedMesh === true;
      const HAS_MAP = !!material2.map;
      const HAS_MATCAP = !!material2.matcap;
      const HAS_ENVMAP = !!envMap;
      const HAS_AOMAP = !!material2.aoMap;
      const HAS_LIGHTMAP = !!material2.lightMap;
      const HAS_BUMPMAP = !!material2.bumpMap;
      const HAS_NORMALMAP = !!material2.normalMap;
      const HAS_DISPLACEMENTMAP = !!material2.displacementMap;
      const HAS_EMISSIVEMAP = !!material2.emissiveMap;
      const HAS_METALNESSMAP = !!material2.metalnessMap;
      const HAS_ROUGHNESSMAP = !!material2.roughnessMap;
      const HAS_ANISOTROPY = material2.anisotropy > 0;
      const HAS_CLEARCOAT = material2.clearcoat > 0;
      const HAS_DISPERSION = material2.dispersion > 0;
      const HAS_IRIDESCENCE = material2.iridescence > 0;
      const HAS_SHEEN = material2.sheen > 0;
      const HAS_TRANSMISSION = material2.transmission > 0;
      const HAS_ANISOTROPYMAP = HAS_ANISOTROPY && !!material2.anisotropyMap;
      const HAS_CLEARCOATMAP = HAS_CLEARCOAT && !!material2.clearcoatMap;
      const HAS_CLEARCOAT_NORMALMAP = HAS_CLEARCOAT && !!material2.clearcoatNormalMap;
      const HAS_CLEARCOAT_ROUGHNESSMAP = HAS_CLEARCOAT && !!material2.clearcoatRoughnessMap;
      const HAS_IRIDESCENCEMAP = HAS_IRIDESCENCE && !!material2.iridescenceMap;
      const HAS_IRIDESCENCE_THICKNESSMAP = HAS_IRIDESCENCE && !!material2.iridescenceThicknessMap;
      const HAS_SHEEN_COLORMAP = HAS_SHEEN && !!material2.sheenColorMap;
      const HAS_SHEEN_ROUGHNESSMAP = HAS_SHEEN && !!material2.sheenRoughnessMap;
      const HAS_SPECULARMAP = !!material2.specularMap;
      const HAS_SPECULAR_COLORMAP = !!material2.specularColorMap;
      const HAS_SPECULAR_INTENSITYMAP = !!material2.specularIntensityMap;
      const HAS_TRANSMISSIONMAP = HAS_TRANSMISSION && !!material2.transmissionMap;
      const HAS_THICKNESSMAP = HAS_TRANSMISSION && !!material2.thicknessMap;
      const HAS_GRADIENTMAP = !!material2.gradientMap;
      const HAS_ALPHAMAP = !!material2.alphaMap;
      const HAS_ALPHATEST = material2.alphaTest > 0;
      const HAS_ALPHAHASH = !!material2.alphaHash;
      const HAS_EXTENSIONS = !!material2.extensions;
      let toneMapping = NoToneMapping;
      if (material2.toneMapped) {
        if (currentRenderTarget === null || currentRenderTarget.isXRRenderTarget === true) {
          toneMapping = renderer2.toneMapping;
        }
      }
      const parameters = {
        shaderID,
        shaderType: material2.type,
        shaderName: material2.name,
        vertexShader,
        fragmentShader,
        defines: material2.defines,
        customVertexShaderID,
        customFragmentShaderID,
        isRawShaderMaterial: material2.isRawShaderMaterial === true,
        glslVersion: material2.glslVersion,
        precision,
        batching: IS_BATCHEDMESH,
        batchingColor: IS_BATCHEDMESH && object._colorsTexture !== null,
        instancing: IS_INSTANCEDMESH,
        instancingColor: IS_INSTANCEDMESH && object.instanceColor !== null,
        instancingMorph: IS_INSTANCEDMESH && object.morphTexture !== null,
        supportsVertexTextures: SUPPORTS_VERTEX_TEXTURES,
        outputColorSpace: currentRenderTarget === null ? renderer2.outputColorSpace : currentRenderTarget.isXRRenderTarget === true ? currentRenderTarget.texture.colorSpace : LinearSRGBColorSpace,
        alphaToCoverage: !!material2.alphaToCoverage,
        map: HAS_MAP,
        matcap: HAS_MATCAP,
        envMap: HAS_ENVMAP,
        envMapMode: HAS_ENVMAP && envMap.mapping,
        envMapCubeUVHeight,
        aoMap: HAS_AOMAP,
        lightMap: HAS_LIGHTMAP,
        bumpMap: HAS_BUMPMAP,
        normalMap: HAS_NORMALMAP,
        displacementMap: SUPPORTS_VERTEX_TEXTURES && HAS_DISPLACEMENTMAP,
        emissiveMap: HAS_EMISSIVEMAP,
        normalMapObjectSpace: HAS_NORMALMAP && material2.normalMapType === ObjectSpaceNormalMap,
        normalMapTangentSpace: HAS_NORMALMAP && material2.normalMapType === TangentSpaceNormalMap,
        metalnessMap: HAS_METALNESSMAP,
        roughnessMap: HAS_ROUGHNESSMAP,
        anisotropy: HAS_ANISOTROPY,
        anisotropyMap: HAS_ANISOTROPYMAP,
        clearcoat: HAS_CLEARCOAT,
        clearcoatMap: HAS_CLEARCOATMAP,
        clearcoatNormalMap: HAS_CLEARCOAT_NORMALMAP,
        clearcoatRoughnessMap: HAS_CLEARCOAT_ROUGHNESSMAP,
        dispersion: HAS_DISPERSION,
        iridescence: HAS_IRIDESCENCE,
        iridescenceMap: HAS_IRIDESCENCEMAP,
        iridescenceThicknessMap: HAS_IRIDESCENCE_THICKNESSMAP,
        sheen: HAS_SHEEN,
        sheenColorMap: HAS_SHEEN_COLORMAP,
        sheenRoughnessMap: HAS_SHEEN_ROUGHNESSMAP,
        specularMap: HAS_SPECULARMAP,
        specularColorMap: HAS_SPECULAR_COLORMAP,
        specularIntensityMap: HAS_SPECULAR_INTENSITYMAP,
        transmission: HAS_TRANSMISSION,
        transmissionMap: HAS_TRANSMISSIONMAP,
        thicknessMap: HAS_THICKNESSMAP,
        gradientMap: HAS_GRADIENTMAP,
        opaque: material2.transparent === false && material2.blending === NormalBlending && material2.alphaToCoverage === false,
        alphaMap: HAS_ALPHAMAP,
        alphaTest: HAS_ALPHATEST,
        alphaHash: HAS_ALPHAHASH,
        combine: material2.combine,
        //
        mapUv: HAS_MAP && getChannel(material2.map.channel),
        aoMapUv: HAS_AOMAP && getChannel(material2.aoMap.channel),
        lightMapUv: HAS_LIGHTMAP && getChannel(material2.lightMap.channel),
        bumpMapUv: HAS_BUMPMAP && getChannel(material2.bumpMap.channel),
        normalMapUv: HAS_NORMALMAP && getChannel(material2.normalMap.channel),
        displacementMapUv: HAS_DISPLACEMENTMAP && getChannel(material2.displacementMap.channel),
        emissiveMapUv: HAS_EMISSIVEMAP && getChannel(material2.emissiveMap.channel),
        metalnessMapUv: HAS_METALNESSMAP && getChannel(material2.metalnessMap.channel),
        roughnessMapUv: HAS_ROUGHNESSMAP && getChannel(material2.roughnessMap.channel),
        anisotropyMapUv: HAS_ANISOTROPYMAP && getChannel(material2.anisotropyMap.channel),
        clearcoatMapUv: HAS_CLEARCOATMAP && getChannel(material2.clearcoatMap.channel),
        clearcoatNormalMapUv: HAS_CLEARCOAT_NORMALMAP && getChannel(material2.clearcoatNormalMap.channel),
        clearcoatRoughnessMapUv: HAS_CLEARCOAT_ROUGHNESSMAP && getChannel(material2.clearcoatRoughnessMap.channel),
        iridescenceMapUv: HAS_IRIDESCENCEMAP && getChannel(material2.iridescenceMap.channel),
        iridescenceThicknessMapUv: HAS_IRIDESCENCE_THICKNESSMAP && getChannel(material2.iridescenceThicknessMap.channel),
        sheenColorMapUv: HAS_SHEEN_COLORMAP && getChannel(material2.sheenColorMap.channel),
        sheenRoughnessMapUv: HAS_SHEEN_ROUGHNESSMAP && getChannel(material2.sheenRoughnessMap.channel),
        specularMapUv: HAS_SPECULARMAP && getChannel(material2.specularMap.channel),
        specularColorMapUv: HAS_SPECULAR_COLORMAP && getChannel(material2.specularColorMap.channel),
        specularIntensityMapUv: HAS_SPECULAR_INTENSITYMAP && getChannel(material2.specularIntensityMap.channel),
        transmissionMapUv: HAS_TRANSMISSIONMAP && getChannel(material2.transmissionMap.channel),
        thicknessMapUv: HAS_THICKNESSMAP && getChannel(material2.thicknessMap.channel),
        alphaMapUv: HAS_ALPHAMAP && getChannel(material2.alphaMap.channel),
        //
        vertexTangents: !!geometry2.attributes.tangent && (HAS_NORMALMAP || HAS_ANISOTROPY),
        vertexColors: material2.vertexColors,
        vertexAlphas: material2.vertexColors === true && !!geometry2.attributes.color && geometry2.attributes.color.itemSize === 4,
        pointsUvs: object.isPoints === true && !!geometry2.attributes.uv && (HAS_MAP || HAS_ALPHAMAP),
        fog: !!fog,
        useFog: material2.fog === true,
        fogExp2: !!fog && fog.isFogExp2,
        flatShading: material2.flatShading === true,
        sizeAttenuation: material2.sizeAttenuation === true,
        logarithmicDepthBuffer,
        reverseDepthBuffer,
        skinning: object.isSkinnedMesh === true,
        morphTargets: geometry2.morphAttributes.position !== void 0,
        morphNormals: geometry2.morphAttributes.normal !== void 0,
        morphColors: geometry2.morphAttributes.color !== void 0,
        morphTargetsCount,
        morphTextureStride,
        numDirLights: lights.directional.length,
        numPointLights: lights.point.length,
        numSpotLights: lights.spot.length,
        numSpotLightMaps: lights.spotLightMap.length,
        numRectAreaLights: lights.rectArea.length,
        numHemiLights: lights.hemi.length,
        numDirLightShadows: lights.directionalShadowMap.length,
        numPointLightShadows: lights.pointShadowMap.length,
        numSpotLightShadows: lights.spotShadowMap.length,
        numSpotLightShadowsWithMaps: lights.numSpotLightShadowsWithMaps,
        numLightProbes: lights.numLightProbes,
        numClippingPlanes: clipping.numPlanes,
        numClipIntersection: clipping.numIntersection,
        dithering: material2.dithering,
        shadowMapEnabled: renderer2.shadowMap.enabled && shadows.length > 0,
        shadowMapType: renderer2.shadowMap.type,
        toneMapping,
        decodeVideoTexture: HAS_MAP && material2.map.isVideoTexture === true && ColorManagement.getTransfer(material2.map.colorSpace) === SRGBTransfer,
        decodeVideoTextureEmissive: HAS_EMISSIVEMAP && material2.emissiveMap.isVideoTexture === true && ColorManagement.getTransfer(material2.emissiveMap.colorSpace) === SRGBTransfer,
        premultipliedAlpha: material2.premultipliedAlpha,
        doubleSided: material2.side === DoubleSide,
        flipSided: material2.side === BackSide,
        useDepthPacking: material2.depthPacking >= 0,
        depthPacking: material2.depthPacking || 0,
        index0AttributeName: material2.index0AttributeName,
        extensionClipCullDistance: HAS_EXTENSIONS && material2.extensions.clipCullDistance === true && extensions.has("WEBGL_clip_cull_distance"),
        extensionMultiDraw: (HAS_EXTENSIONS && material2.extensions.multiDraw === true || IS_BATCHEDMESH) && extensions.has("WEBGL_multi_draw"),
        rendererExtensionParallelShaderCompile: extensions.has("KHR_parallel_shader_compile"),
        customProgramCacheKey: material2.customProgramCacheKey()
      };
      parameters.vertexUv1s = _activeChannels.has(1);
      parameters.vertexUv2s = _activeChannels.has(2);
      parameters.vertexUv3s = _activeChannels.has(3);
      _activeChannels.clear();
      return parameters;
    }
    function getProgramCacheKey(parameters) {
      const array = [];
      if (parameters.shaderID) {
        array.push(parameters.shaderID);
      } else {
        array.push(parameters.customVertexShaderID);
        array.push(parameters.customFragmentShaderID);
      }
      if (parameters.defines !== void 0) {
        for (const name in parameters.defines) {
          array.push(name);
          array.push(parameters.defines[name]);
        }
      }
      if (parameters.isRawShaderMaterial === false) {
        getProgramCacheKeyParameters(array, parameters);
        getProgramCacheKeyBooleans(array, parameters);
        array.push(renderer2.outputColorSpace);
      }
      array.push(parameters.customProgramCacheKey);
      return array.join();
    }
    function getProgramCacheKeyParameters(array, parameters) {
      array.push(parameters.precision);
      array.push(parameters.outputColorSpace);
      array.push(parameters.envMapMode);
      array.push(parameters.envMapCubeUVHeight);
      array.push(parameters.mapUv);
      array.push(parameters.alphaMapUv);
      array.push(parameters.lightMapUv);
      array.push(parameters.aoMapUv);
      array.push(parameters.bumpMapUv);
      array.push(parameters.normalMapUv);
      array.push(parameters.displacementMapUv);
      array.push(parameters.emissiveMapUv);
      array.push(parameters.metalnessMapUv);
      array.push(parameters.roughnessMapUv);
      array.push(parameters.anisotropyMapUv);
      array.push(parameters.clearcoatMapUv);
      array.push(parameters.clearcoatNormalMapUv);
      array.push(parameters.clearcoatRoughnessMapUv);
      array.push(parameters.iridescenceMapUv);
      array.push(parameters.iridescenceThicknessMapUv);
      array.push(parameters.sheenColorMapUv);
      array.push(parameters.sheenRoughnessMapUv);
      array.push(parameters.specularMapUv);
      array.push(parameters.specularColorMapUv);
      array.push(parameters.specularIntensityMapUv);
      array.push(parameters.transmissionMapUv);
      array.push(parameters.thicknessMapUv);
      array.push(parameters.combine);
      array.push(parameters.fogExp2);
      array.push(parameters.sizeAttenuation);
      array.push(parameters.morphTargetsCount);
      array.push(parameters.morphAttributeCount);
      array.push(parameters.numDirLights);
      array.push(parameters.numPointLights);
      array.push(parameters.numSpotLights);
      array.push(parameters.numSpotLightMaps);
      array.push(parameters.numHemiLights);
      array.push(parameters.numRectAreaLights);
      array.push(parameters.numDirLightShadows);
      array.push(parameters.numPointLightShadows);
      array.push(parameters.numSpotLightShadows);
      array.push(parameters.numSpotLightShadowsWithMaps);
      array.push(parameters.numLightProbes);
      array.push(parameters.shadowMapType);
      array.push(parameters.toneMapping);
      array.push(parameters.numClippingPlanes);
      array.push(parameters.numClipIntersection);
      array.push(parameters.depthPacking);
    }
    function getProgramCacheKeyBooleans(array, parameters) {
      _programLayers.disableAll();
      if (parameters.supportsVertexTextures)
        _programLayers.enable(0);
      if (parameters.instancing)
        _programLayers.enable(1);
      if (parameters.instancingColor)
        _programLayers.enable(2);
      if (parameters.instancingMorph)
        _programLayers.enable(3);
      if (parameters.matcap)
        _programLayers.enable(4);
      if (parameters.envMap)
        _programLayers.enable(5);
      if (parameters.normalMapObjectSpace)
        _programLayers.enable(6);
      if (parameters.normalMapTangentSpace)
        _programLayers.enable(7);
      if (parameters.clearcoat)
        _programLayers.enable(8);
      if (parameters.iridescence)
        _programLayers.enable(9);
      if (parameters.alphaTest)
        _programLayers.enable(10);
      if (parameters.vertexColors)
        _programLayers.enable(11);
      if (parameters.vertexAlphas)
        _programLayers.enable(12);
      if (parameters.vertexUv1s)
        _programLayers.enable(13);
      if (parameters.vertexUv2s)
        _programLayers.enable(14);
      if (parameters.vertexUv3s)
        _programLayers.enable(15);
      if (parameters.vertexTangents)
        _programLayers.enable(16);
      if (parameters.anisotropy)
        _programLayers.enable(17);
      if (parameters.alphaHash)
        _programLayers.enable(18);
      if (parameters.batching)
        _programLayers.enable(19);
      if (parameters.dispersion)
        _programLayers.enable(20);
      if (parameters.batchingColor)
        _programLayers.enable(21);
      array.push(_programLayers.mask);
      _programLayers.disableAll();
      if (parameters.fog)
        _programLayers.enable(0);
      if (parameters.useFog)
        _programLayers.enable(1);
      if (parameters.flatShading)
        _programLayers.enable(2);
      if (parameters.logarithmicDepthBuffer)
        _programLayers.enable(3);
      if (parameters.reverseDepthBuffer)
        _programLayers.enable(4);
      if (parameters.skinning)
        _programLayers.enable(5);
      if (parameters.morphTargets)
        _programLayers.enable(6);
      if (parameters.morphNormals)
        _programLayers.enable(7);
      if (parameters.morphColors)
        _programLayers.enable(8);
      if (parameters.premultipliedAlpha)
        _programLayers.enable(9);
      if (parameters.shadowMapEnabled)
        _programLayers.enable(10);
      if (parameters.doubleSided)
        _programLayers.enable(11);
      if (parameters.flipSided)
        _programLayers.enable(12);
      if (parameters.useDepthPacking)
        _programLayers.enable(13);
      if (parameters.dithering)
        _programLayers.enable(14);
      if (parameters.transmission)
        _programLayers.enable(15);
      if (parameters.sheen)
        _programLayers.enable(16);
      if (parameters.opaque)
        _programLayers.enable(17);
      if (parameters.pointsUvs)
        _programLayers.enable(18);
      if (parameters.decodeVideoTexture)
        _programLayers.enable(19);
      if (parameters.decodeVideoTextureEmissive)
        _programLayers.enable(20);
      if (parameters.alphaToCoverage)
        _programLayers.enable(21);
      array.push(_programLayers.mask);
    }
    function getUniforms(material2) {
      const shaderID = shaderIDs[material2.type];
      let uniforms;
      if (shaderID) {
        const shader = ShaderLib[shaderID];
        uniforms = UniformsUtils.clone(shader.uniforms);
      } else {
        uniforms = material2.uniforms;
      }
      return uniforms;
    }
    function acquireProgram(parameters, cacheKey) {
      let program;
      for (let p2 = 0, pl = programs.length; p2 < pl; p2++) {
        const preexistingProgram = programs[p2];
        if (preexistingProgram.cacheKey === cacheKey) {
          program = preexistingProgram;
          ++program.usedTimes;
          break;
        }
      }
      if (program === void 0) {
        program = new WebGLProgram(renderer2, cacheKey, parameters, bindingStates);
        programs.push(program);
      }
      return program;
    }
    function releaseProgram(program) {
      if (--program.usedTimes === 0) {
        const i2 = programs.indexOf(program);
        programs[i2] = programs[programs.length - 1];
        programs.pop();
        program.destroy();
      }
    }
    function releaseShaderCache(material2) {
      _customShaders.remove(material2);
    }
    function dispose() {
      _customShaders.dispose();
    }
    return {
      getParameters,
      getProgramCacheKey,
      getUniforms,
      acquireProgram,
      releaseProgram,
      releaseShaderCache,
      // Exposed for resource monitoring & error feedback via renderer.info:
      programs,
      dispose
    };
  }
  function WebGLProperties() {
    let properties = /* @__PURE__ */ new WeakMap();
    function has(object) {
      return properties.has(object);
    }
    function get(object) {
      let map = properties.get(object);
      if (map === void 0) {
        map = {};
        properties.set(object, map);
      }
      return map;
    }
    function remove(object) {
      properties.delete(object);
    }
    function update(object, key, value) {
      properties.get(object)[key] = value;
    }
    function dispose() {
      properties = /* @__PURE__ */ new WeakMap();
    }
    return {
      has,
      get,
      remove,
      update,
      dispose
    };
  }
  function painterSortStable(a2, b2) {
    if (a2.groupOrder !== b2.groupOrder) {
      return a2.groupOrder - b2.groupOrder;
    } else if (a2.renderOrder !== b2.renderOrder) {
      return a2.renderOrder - b2.renderOrder;
    } else if (a2.material.id !== b2.material.id) {
      return a2.material.id - b2.material.id;
    } else if (a2.z !== b2.z) {
      return a2.z - b2.z;
    } else {
      return a2.id - b2.id;
    }
  }
  function reversePainterSortStable(a2, b2) {
    if (a2.groupOrder !== b2.groupOrder) {
      return a2.groupOrder - b2.groupOrder;
    } else if (a2.renderOrder !== b2.renderOrder) {
      return a2.renderOrder - b2.renderOrder;
    } else if (a2.z !== b2.z) {
      return b2.z - a2.z;
    } else {
      return a2.id - b2.id;
    }
  }
  function WebGLRenderList() {
    const renderItems = [];
    let renderItemsIndex = 0;
    const opaque = [];
    const transmissive = [];
    const transparent = [];
    function init() {
      renderItemsIndex = 0;
      opaque.length = 0;
      transmissive.length = 0;
      transparent.length = 0;
    }
    function getNextRenderItem(object, geometry2, material2, groupOrder, z, group) {
      let renderItem = renderItems[renderItemsIndex];
      if (renderItem === void 0) {
        renderItem = {
          id: object.id,
          object,
          geometry: geometry2,
          material: material2,
          groupOrder,
          renderOrder: object.renderOrder,
          z,
          group
        };
        renderItems[renderItemsIndex] = renderItem;
      } else {
        renderItem.id = object.id;
        renderItem.object = object;
        renderItem.geometry = geometry2;
        renderItem.material = material2;
        renderItem.groupOrder = groupOrder;
        renderItem.renderOrder = object.renderOrder;
        renderItem.z = z;
        renderItem.group = group;
      }
      renderItemsIndex++;
      return renderItem;
    }
    function push(object, geometry2, material2, groupOrder, z, group) {
      const renderItem = getNextRenderItem(object, geometry2, material2, groupOrder, z, group);
      if (material2.transmission > 0) {
        transmissive.push(renderItem);
      } else if (material2.transparent === true) {
        transparent.push(renderItem);
      } else {
        opaque.push(renderItem);
      }
    }
    function unshift(object, geometry2, material2, groupOrder, z, group) {
      const renderItem = getNextRenderItem(object, geometry2, material2, groupOrder, z, group);
      if (material2.transmission > 0) {
        transmissive.unshift(renderItem);
      } else if (material2.transparent === true) {
        transparent.unshift(renderItem);
      } else {
        opaque.unshift(renderItem);
      }
    }
    function sort(customOpaqueSort, customTransparentSort) {
      if (opaque.length > 1) opaque.sort(customOpaqueSort || painterSortStable);
      if (transmissive.length > 1) transmissive.sort(customTransparentSort || reversePainterSortStable);
      if (transparent.length > 1) transparent.sort(customTransparentSort || reversePainterSortStable);
    }
    function finish() {
      for (let i2 = renderItemsIndex, il = renderItems.length; i2 < il; i2++) {
        const renderItem = renderItems[i2];
        if (renderItem.id === null) break;
        renderItem.id = null;
        renderItem.object = null;
        renderItem.geometry = null;
        renderItem.material = null;
        renderItem.group = null;
      }
    }
    return {
      opaque,
      transmissive,
      transparent,
      init,
      push,
      unshift,
      finish,
      sort
    };
  }
  function WebGLRenderLists() {
    let lists = /* @__PURE__ */ new WeakMap();
    function get(scene2, renderCallDepth) {
      const listArray = lists.get(scene2);
      let list;
      if (listArray === void 0) {
        list = new WebGLRenderList();
        lists.set(scene2, [list]);
      } else {
        if (renderCallDepth >= listArray.length) {
          list = new WebGLRenderList();
          listArray.push(list);
        } else {
          list = listArray[renderCallDepth];
        }
      }
      return list;
    }
    function dispose() {
      lists = /* @__PURE__ */ new WeakMap();
    }
    return {
      get,
      dispose
    };
  }
  function UniformsCache() {
    const lights = {};
    return {
      get: function(light) {
        if (lights[light.id] !== void 0) {
          return lights[light.id];
        }
        let uniforms;
        switch (light.type) {
          case "DirectionalLight":
            uniforms = {
              direction: new Vector3(),
              color: new Color()
            };
            break;
          case "SpotLight":
            uniforms = {
              position: new Vector3(),
              direction: new Vector3(),
              color: new Color(),
              distance: 0,
              coneCos: 0,
              penumbraCos: 0,
              decay: 0
            };
            break;
          case "PointLight":
            uniforms = {
              position: new Vector3(),
              color: new Color(),
              distance: 0,
              decay: 0
            };
            break;
          case "HemisphereLight":
            uniforms = {
              direction: new Vector3(),
              skyColor: new Color(),
              groundColor: new Color()
            };
            break;
          case "RectAreaLight":
            uniforms = {
              color: new Color(),
              position: new Vector3(),
              halfWidth: new Vector3(),
              halfHeight: new Vector3()
            };
            break;
        }
        lights[light.id] = uniforms;
        return uniforms;
      }
    };
  }
  function ShadowUniformsCache() {
    const lights = {};
    return {
      get: function(light) {
        if (lights[light.id] !== void 0) {
          return lights[light.id];
        }
        let uniforms;
        switch (light.type) {
          case "DirectionalLight":
            uniforms = {
              shadowIntensity: 1,
              shadowBias: 0,
              shadowNormalBias: 0,
              shadowRadius: 1,
              shadowMapSize: new Vector2()
            };
            break;
          case "SpotLight":
            uniforms = {
              shadowIntensity: 1,
              shadowBias: 0,
              shadowNormalBias: 0,
              shadowRadius: 1,
              shadowMapSize: new Vector2()
            };
            break;
          case "PointLight":
            uniforms = {
              shadowIntensity: 1,
              shadowBias: 0,
              shadowNormalBias: 0,
              shadowRadius: 1,
              shadowMapSize: new Vector2(),
              shadowCameraNear: 1,
              shadowCameraFar: 1e3
            };
            break;
        }
        lights[light.id] = uniforms;
        return uniforms;
      }
    };
  }
  var nextVersion = 0;
  function shadowCastingAndTexturingLightsFirst(lightA, lightB) {
    return (lightB.castShadow ? 2 : 0) - (lightA.castShadow ? 2 : 0) + (lightB.map ? 1 : 0) - (lightA.map ? 1 : 0);
  }
  function WebGLLights(extensions) {
    const cache2 = new UniformsCache();
    const shadowCache = ShadowUniformsCache();
    const state = {
      version: 0,
      hash: {
        directionalLength: -1,
        pointLength: -1,
        spotLength: -1,
        rectAreaLength: -1,
        hemiLength: -1,
        numDirectionalShadows: -1,
        numPointShadows: -1,
        numSpotShadows: -1,
        numSpotMaps: -1,
        numLightProbes: -1
      },
      ambient: [0, 0, 0],
      probe: [],
      directional: [],
      directionalShadow: [],
      directionalShadowMap: [],
      directionalShadowMatrix: [],
      spot: [],
      spotLightMap: [],
      spotShadow: [],
      spotShadowMap: [],
      spotLightMatrix: [],
      rectArea: [],
      rectAreaLTC1: null,
      rectAreaLTC2: null,
      point: [],
      pointShadow: [],
      pointShadowMap: [],
      pointShadowMatrix: [],
      hemi: [],
      numSpotLightShadowsWithMaps: 0,
      numLightProbes: 0
    };
    for (let i2 = 0; i2 < 9; i2++) state.probe.push(new Vector3());
    const vector3 = new Vector3();
    const matrix4 = new Matrix4();
    const matrix42 = new Matrix4();
    function setup(lights) {
      let r2 = 0, g2 = 0, b2 = 0;
      for (let i2 = 0; i2 < 9; i2++) state.probe[i2].set(0, 0, 0);
      let directionalLength = 0;
      let pointLength = 0;
      let spotLength = 0;
      let rectAreaLength = 0;
      let hemiLength = 0;
      let numDirectionalShadows = 0;
      let numPointShadows = 0;
      let numSpotShadows = 0;
      let numSpotMaps = 0;
      let numSpotShadowsWithMaps = 0;
      let numLightProbes = 0;
      lights.sort(shadowCastingAndTexturingLightsFirst);
      for (let i2 = 0, l2 = lights.length; i2 < l2; i2++) {
        const light = lights[i2];
        const color = light.color;
        const intensity = light.intensity;
        const distance = light.distance;
        const shadowMap = light.shadow && light.shadow.map ? light.shadow.map.texture : null;
        if (light.isAmbientLight) {
          r2 += color.r * intensity;
          g2 += color.g * intensity;
          b2 += color.b * intensity;
        } else if (light.isLightProbe) {
          for (let j2 = 0; j2 < 9; j2++) {
            state.probe[j2].addScaledVector(light.sh.coefficients[j2], intensity);
          }
          numLightProbes++;
        } else if (light.isDirectionalLight) {
          const uniforms = cache2.get(light);
          uniforms.color.copy(light.color).multiplyScalar(light.intensity);
          if (light.castShadow) {
            const shadow = light.shadow;
            const shadowUniforms = shadowCache.get(light);
            shadowUniforms.shadowIntensity = shadow.intensity;
            shadowUniforms.shadowBias = shadow.bias;
            shadowUniforms.shadowNormalBias = shadow.normalBias;
            shadowUniforms.shadowRadius = shadow.radius;
            shadowUniforms.shadowMapSize = shadow.mapSize;
            state.directionalShadow[directionalLength] = shadowUniforms;
            state.directionalShadowMap[directionalLength] = shadowMap;
            state.directionalShadowMatrix[directionalLength] = light.shadow.matrix;
            numDirectionalShadows++;
          }
          state.directional[directionalLength] = uniforms;
          directionalLength++;
        } else if (light.isSpotLight) {
          const uniforms = cache2.get(light);
          uniforms.position.setFromMatrixPosition(light.matrixWorld);
          uniforms.color.copy(color).multiplyScalar(intensity);
          uniforms.distance = distance;
          uniforms.coneCos = Math.cos(light.angle);
          uniforms.penumbraCos = Math.cos(light.angle * (1 - light.penumbra));
          uniforms.decay = light.decay;
          state.spot[spotLength] = uniforms;
          const shadow = light.shadow;
          if (light.map) {
            state.spotLightMap[numSpotMaps] = light.map;
            numSpotMaps++;
            shadow.updateMatrices(light);
            if (light.castShadow) numSpotShadowsWithMaps++;
          }
          state.spotLightMatrix[spotLength] = shadow.matrix;
          if (light.castShadow) {
            const shadowUniforms = shadowCache.get(light);
            shadowUniforms.shadowIntensity = shadow.intensity;
            shadowUniforms.shadowBias = shadow.bias;
            shadowUniforms.shadowNormalBias = shadow.normalBias;
            shadowUniforms.shadowRadius = shadow.radius;
            shadowUniforms.shadowMapSize = shadow.mapSize;
            state.spotShadow[spotLength] = shadowUniforms;
            state.spotShadowMap[spotLength] = shadowMap;
            numSpotShadows++;
          }
          spotLength++;
        } else if (light.isRectAreaLight) {
          const uniforms = cache2.get(light);
          uniforms.color.copy(color).multiplyScalar(intensity);
          uniforms.halfWidth.set(light.width * 0.5, 0, 0);
          uniforms.halfHeight.set(0, light.height * 0.5, 0);
          state.rectArea[rectAreaLength] = uniforms;
          rectAreaLength++;
        } else if (light.isPointLight) {
          const uniforms = cache2.get(light);
          uniforms.color.copy(light.color).multiplyScalar(light.intensity);
          uniforms.distance = light.distance;
          uniforms.decay = light.decay;
          if (light.castShadow) {
            const shadow = light.shadow;
            const shadowUniforms = shadowCache.get(light);
            shadowUniforms.shadowIntensity = shadow.intensity;
            shadowUniforms.shadowBias = shadow.bias;
            shadowUniforms.shadowNormalBias = shadow.normalBias;
            shadowUniforms.shadowRadius = shadow.radius;
            shadowUniforms.shadowMapSize = shadow.mapSize;
            shadowUniforms.shadowCameraNear = shadow.camera.near;
            shadowUniforms.shadowCameraFar = shadow.camera.far;
            state.pointShadow[pointLength] = shadowUniforms;
            state.pointShadowMap[pointLength] = shadowMap;
            state.pointShadowMatrix[pointLength] = light.shadow.matrix;
            numPointShadows++;
          }
          state.point[pointLength] = uniforms;
          pointLength++;
        } else if (light.isHemisphereLight) {
          const uniforms = cache2.get(light);
          uniforms.skyColor.copy(light.color).multiplyScalar(intensity);
          uniforms.groundColor.copy(light.groundColor).multiplyScalar(intensity);
          state.hemi[hemiLength] = uniforms;
          hemiLength++;
        }
      }
      if (rectAreaLength > 0) {
        if (extensions.has("OES_texture_float_linear") === true) {
          state.rectAreaLTC1 = UniformsLib.LTC_FLOAT_1;
          state.rectAreaLTC2 = UniformsLib.LTC_FLOAT_2;
        } else {
          state.rectAreaLTC1 = UniformsLib.LTC_HALF_1;
          state.rectAreaLTC2 = UniformsLib.LTC_HALF_2;
        }
      }
      state.ambient[0] = r2;
      state.ambient[1] = g2;
      state.ambient[2] = b2;
      const hash = state.hash;
      if (hash.directionalLength !== directionalLength || hash.pointLength !== pointLength || hash.spotLength !== spotLength || hash.rectAreaLength !== rectAreaLength || hash.hemiLength !== hemiLength || hash.numDirectionalShadows !== numDirectionalShadows || hash.numPointShadows !== numPointShadows || hash.numSpotShadows !== numSpotShadows || hash.numSpotMaps !== numSpotMaps || hash.numLightProbes !== numLightProbes) {
        state.directional.length = directionalLength;
        state.spot.length = spotLength;
        state.rectArea.length = rectAreaLength;
        state.point.length = pointLength;
        state.hemi.length = hemiLength;
        state.directionalShadow.length = numDirectionalShadows;
        state.directionalShadowMap.length = numDirectionalShadows;
        state.pointShadow.length = numPointShadows;
        state.pointShadowMap.length = numPointShadows;
        state.spotShadow.length = numSpotShadows;
        state.spotShadowMap.length = numSpotShadows;
        state.directionalShadowMatrix.length = numDirectionalShadows;
        state.pointShadowMatrix.length = numPointShadows;
        state.spotLightMatrix.length = numSpotShadows + numSpotMaps - numSpotShadowsWithMaps;
        state.spotLightMap.length = numSpotMaps;
        state.numSpotLightShadowsWithMaps = numSpotShadowsWithMaps;
        state.numLightProbes = numLightProbes;
        hash.directionalLength = directionalLength;
        hash.pointLength = pointLength;
        hash.spotLength = spotLength;
        hash.rectAreaLength = rectAreaLength;
        hash.hemiLength = hemiLength;
        hash.numDirectionalShadows = numDirectionalShadows;
        hash.numPointShadows = numPointShadows;
        hash.numSpotShadows = numSpotShadows;
        hash.numSpotMaps = numSpotMaps;
        hash.numLightProbes = numLightProbes;
        state.version = nextVersion++;
      }
    }
    function setupView(lights, camera2) {
      let directionalLength = 0;
      let pointLength = 0;
      let spotLength = 0;
      let rectAreaLength = 0;
      let hemiLength = 0;
      const viewMatrix = camera2.matrixWorldInverse;
      for (let i2 = 0, l2 = lights.length; i2 < l2; i2++) {
        const light = lights[i2];
        if (light.isDirectionalLight) {
          const uniforms = state.directional[directionalLength];
          uniforms.direction.setFromMatrixPosition(light.matrixWorld);
          vector3.setFromMatrixPosition(light.target.matrixWorld);
          uniforms.direction.sub(vector3);
          uniforms.direction.transformDirection(viewMatrix);
          directionalLength++;
        } else if (light.isSpotLight) {
          const uniforms = state.spot[spotLength];
          uniforms.position.setFromMatrixPosition(light.matrixWorld);
          uniforms.position.applyMatrix4(viewMatrix);
          uniforms.direction.setFromMatrixPosition(light.matrixWorld);
          vector3.setFromMatrixPosition(light.target.matrixWorld);
          uniforms.direction.sub(vector3);
          uniforms.direction.transformDirection(viewMatrix);
          spotLength++;
        } else if (light.isRectAreaLight) {
          const uniforms = state.rectArea[rectAreaLength];
          uniforms.position.setFromMatrixPosition(light.matrixWorld);
          uniforms.position.applyMatrix4(viewMatrix);
          matrix42.identity();
          matrix4.copy(light.matrixWorld);
          matrix4.premultiply(viewMatrix);
          matrix42.extractRotation(matrix4);
          uniforms.halfWidth.set(light.width * 0.5, 0, 0);
          uniforms.halfHeight.set(0, light.height * 0.5, 0);
          uniforms.halfWidth.applyMatrix4(matrix42);
          uniforms.halfHeight.applyMatrix4(matrix42);
          rectAreaLength++;
        } else if (light.isPointLight) {
          const uniforms = state.point[pointLength];
          uniforms.position.setFromMatrixPosition(light.matrixWorld);
          uniforms.position.applyMatrix4(viewMatrix);
          pointLength++;
        } else if (light.isHemisphereLight) {
          const uniforms = state.hemi[hemiLength];
          uniforms.direction.setFromMatrixPosition(light.matrixWorld);
          uniforms.direction.transformDirection(viewMatrix);
          hemiLength++;
        }
      }
    }
    return {
      setup,
      setupView,
      state
    };
  }
  function WebGLRenderState(extensions) {
    const lights = new WebGLLights(extensions);
    const lightsArray = [];
    const shadowsArray = [];
    function init(camera2) {
      state.camera = camera2;
      lightsArray.length = 0;
      shadowsArray.length = 0;
    }
    function pushLight(light) {
      lightsArray.push(light);
    }
    function pushShadow(shadowLight) {
      shadowsArray.push(shadowLight);
    }
    function setupLights() {
      lights.setup(lightsArray);
    }
    function setupLightsView(camera2) {
      lights.setupView(lightsArray, camera2);
    }
    const state = {
      lightsArray,
      shadowsArray,
      camera: null,
      lights,
      transmissionRenderTarget: {}
    };
    return {
      init,
      state,
      setupLights,
      setupLightsView,
      pushLight,
      pushShadow
    };
  }
  function WebGLRenderStates(extensions) {
    let renderStates = /* @__PURE__ */ new WeakMap();
    function get(scene2, renderCallDepth = 0) {
      const renderStateArray = renderStates.get(scene2);
      let renderState;
      if (renderStateArray === void 0) {
        renderState = new WebGLRenderState(extensions);
        renderStates.set(scene2, [renderState]);
      } else {
        if (renderCallDepth >= renderStateArray.length) {
          renderState = new WebGLRenderState(extensions);
          renderStateArray.push(renderState);
        } else {
          renderState = renderStateArray[renderCallDepth];
        }
      }
      return renderState;
    }
    function dispose() {
      renderStates = /* @__PURE__ */ new WeakMap();
    }
    return {
      get,
      dispose
    };
  }
  var vertex = "void main() {\n	gl_Position = vec4( position, 1.0 );\n}";
  var fragment = "uniform sampler2D shadow_pass;\nuniform vec2 resolution;\nuniform float radius;\n#include <packing>\nvoid main() {\n	const float samples = float( VSM_SAMPLES );\n	float mean = 0.0;\n	float squared_mean = 0.0;\n	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );\n	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;\n	for ( float i = 0.0; i < samples; i ++ ) {\n		float uvOffset = uvStart + i * uvStride;\n		#ifdef HORIZONTAL_PASS\n			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );\n			mean += distribution.x;\n			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;\n		#else\n			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );\n			mean += depth;\n			squared_mean += depth * depth;\n		#endif\n	}\n	mean = mean / samples;\n	squared_mean = squared_mean / samples;\n	float std_dev = sqrt( squared_mean - mean * mean );\n	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );\n}";
  function WebGLShadowMap(renderer2, objects, capabilities) {
    let _frustum = new Frustum();
    const _shadowMapSize = new Vector2(), _viewportSize = new Vector2(), _viewport = new Vector4(), _depthMaterial = new MeshDepthMaterial({ depthPacking: RGBADepthPacking }), _distanceMaterial = new MeshDistanceMaterial(), _materialCache = {}, _maxTextureSize = capabilities.maxTextureSize;
    const shadowSide = { [FrontSide]: BackSide, [BackSide]: FrontSide, [DoubleSide]: DoubleSide };
    const shadowMaterialVertical = new ShaderMaterial({
      defines: {
        VSM_SAMPLES: 8
      },
      uniforms: {
        shadow_pass: { value: null },
        resolution: { value: new Vector2() },
        radius: { value: 4 }
      },
      vertexShader: vertex,
      fragmentShader: fragment
    });
    const shadowMaterialHorizontal = shadowMaterialVertical.clone();
    shadowMaterialHorizontal.defines.HORIZONTAL_PASS = 1;
    const fullScreenTri = new BufferGeometry();
    fullScreenTri.setAttribute(
      "position",
      new BufferAttribute(
        new Float32Array([-1, -1, 0.5, 3, -1, 0.5, -1, 3, 0.5]),
        3
      )
    );
    const fullScreenMesh = new Mesh(fullScreenTri, shadowMaterialVertical);
    const scope = this;
    this.enabled = false;
    this.autoUpdate = true;
    this.needsUpdate = false;
    this.type = PCFShadowMap;
    let _previousType = this.type;
    this.render = function(lights, scene2, camera2) {
      if (scope.enabled === false) return;
      if (scope.autoUpdate === false && scope.needsUpdate === false) return;
      if (lights.length === 0) return;
      const currentRenderTarget = renderer2.getRenderTarget();
      const activeCubeFace = renderer2.getActiveCubeFace();
      const activeMipmapLevel = renderer2.getActiveMipmapLevel();
      const _state = renderer2.state;
      _state.setBlending(NoBlending);
      _state.buffers.color.setClear(1, 1, 1, 1);
      _state.buffers.depth.setTest(true);
      _state.setScissorTest(false);
      const toVSM = _previousType !== VSMShadowMap && this.type === VSMShadowMap;
      const fromVSM = _previousType === VSMShadowMap && this.type !== VSMShadowMap;
      for (let i2 = 0, il = lights.length; i2 < il; i2++) {
        const light = lights[i2];
        const shadow = light.shadow;
        if (shadow === void 0) {
          console.warn("THREE.WebGLShadowMap:", light, "has no shadow.");
          continue;
        }
        if (shadow.autoUpdate === false && shadow.needsUpdate === false) continue;
        _shadowMapSize.copy(shadow.mapSize);
        const shadowFrameExtents = shadow.getFrameExtents();
        _shadowMapSize.multiply(shadowFrameExtents);
        _viewportSize.copy(shadow.mapSize);
        if (_shadowMapSize.x > _maxTextureSize || _shadowMapSize.y > _maxTextureSize) {
          if (_shadowMapSize.x > _maxTextureSize) {
            _viewportSize.x = Math.floor(_maxTextureSize / shadowFrameExtents.x);
            _shadowMapSize.x = _viewportSize.x * shadowFrameExtents.x;
            shadow.mapSize.x = _viewportSize.x;
          }
          if (_shadowMapSize.y > _maxTextureSize) {
            _viewportSize.y = Math.floor(_maxTextureSize / shadowFrameExtents.y);
            _shadowMapSize.y = _viewportSize.y * shadowFrameExtents.y;
            shadow.mapSize.y = _viewportSize.y;
          }
        }
        if (shadow.map === null || toVSM === true || fromVSM === true) {
          const pars = this.type !== VSMShadowMap ? { minFilter: NearestFilter, magFilter: NearestFilter } : {};
          if (shadow.map !== null) {
            shadow.map.dispose();
          }
          shadow.map = new WebGLRenderTarget(_shadowMapSize.x, _shadowMapSize.y, pars);
          shadow.map.texture.name = light.name + ".shadowMap";
          shadow.camera.updateProjectionMatrix();
        }
        renderer2.setRenderTarget(shadow.map);
        renderer2.clear();
        const viewportCount = shadow.getViewportCount();
        for (let vp = 0; vp < viewportCount; vp++) {
          const viewport = shadow.getViewport(vp);
          _viewport.set(
            _viewportSize.x * viewport.x,
            _viewportSize.y * viewport.y,
            _viewportSize.x * viewport.z,
            _viewportSize.y * viewport.w
          );
          _state.viewport(_viewport);
          shadow.updateMatrices(light, vp);
          _frustum = shadow.getFrustum();
          renderObject(scene2, camera2, shadow.camera, light, this.type);
        }
        if (shadow.isPointLightShadow !== true && this.type === VSMShadowMap) {
          VSMPass(shadow, camera2);
        }
        shadow.needsUpdate = false;
      }
      _previousType = this.type;
      scope.needsUpdate = false;
      renderer2.setRenderTarget(currentRenderTarget, activeCubeFace, activeMipmapLevel);
    };
    function VSMPass(shadow, camera2) {
      const geometry2 = objects.update(fullScreenMesh);
      if (shadowMaterialVertical.defines.VSM_SAMPLES !== shadow.blurSamples) {
        shadowMaterialVertical.defines.VSM_SAMPLES = shadow.blurSamples;
        shadowMaterialHorizontal.defines.VSM_SAMPLES = shadow.blurSamples;
        shadowMaterialVertical.needsUpdate = true;
        shadowMaterialHorizontal.needsUpdate = true;
      }
      if (shadow.mapPass === null) {
        shadow.mapPass = new WebGLRenderTarget(_shadowMapSize.x, _shadowMapSize.y);
      }
      shadowMaterialVertical.uniforms.shadow_pass.value = shadow.map.texture;
      shadowMaterialVertical.uniforms.resolution.value = shadow.mapSize;
      shadowMaterialVertical.uniforms.radius.value = shadow.radius;
      renderer2.setRenderTarget(shadow.mapPass);
      renderer2.clear();
      renderer2.renderBufferDirect(camera2, null, geometry2, shadowMaterialVertical, fullScreenMesh, null);
      shadowMaterialHorizontal.uniforms.shadow_pass.value = shadow.mapPass.texture;
      shadowMaterialHorizontal.uniforms.resolution.value = shadow.mapSize;
      shadowMaterialHorizontal.uniforms.radius.value = shadow.radius;
      renderer2.setRenderTarget(shadow.map);
      renderer2.clear();
      renderer2.renderBufferDirect(camera2, null, geometry2, shadowMaterialHorizontal, fullScreenMesh, null);
    }
    function getDepthMaterial(object, material2, light, type) {
      let result = null;
      const customMaterial = light.isPointLight === true ? object.customDistanceMaterial : object.customDepthMaterial;
      if (customMaterial !== void 0) {
        result = customMaterial;
      } else {
        result = light.isPointLight === true ? _distanceMaterial : _depthMaterial;
        if (renderer2.localClippingEnabled && material2.clipShadows === true && Array.isArray(material2.clippingPlanes) && material2.clippingPlanes.length !== 0 || material2.displacementMap && material2.displacementScale !== 0 || material2.alphaMap && material2.alphaTest > 0 || material2.map && material2.alphaTest > 0) {
          const keyA = result.uuid, keyB = material2.uuid;
          let materialsForVariant = _materialCache[keyA];
          if (materialsForVariant === void 0) {
            materialsForVariant = {};
            _materialCache[keyA] = materialsForVariant;
          }
          let cachedMaterial = materialsForVariant[keyB];
          if (cachedMaterial === void 0) {
            cachedMaterial = result.clone();
            materialsForVariant[keyB] = cachedMaterial;
            material2.addEventListener("dispose", onMaterialDispose);
          }
          result = cachedMaterial;
        }
      }
      result.visible = material2.visible;
      result.wireframe = material2.wireframe;
      if (type === VSMShadowMap) {
        result.side = material2.shadowSide !== null ? material2.shadowSide : material2.side;
      } else {
        result.side = material2.shadowSide !== null ? material2.shadowSide : shadowSide[material2.side];
      }
      result.alphaMap = material2.alphaMap;
      result.alphaTest = material2.alphaTest;
      result.map = material2.map;
      result.clipShadows = material2.clipShadows;
      result.clippingPlanes = material2.clippingPlanes;
      result.clipIntersection = material2.clipIntersection;
      result.displacementMap = material2.displacementMap;
      result.displacementScale = material2.displacementScale;
      result.displacementBias = material2.displacementBias;
      result.wireframeLinewidth = material2.wireframeLinewidth;
      result.linewidth = material2.linewidth;
      if (light.isPointLight === true && result.isMeshDistanceMaterial === true) {
        const materialProperties = renderer2.properties.get(result);
        materialProperties.light = light;
      }
      return result;
    }
    function renderObject(object, camera2, shadowCamera, light, type) {
      if (object.visible === false) return;
      const visible = object.layers.test(camera2.layers);
      if (visible && (object.isMesh || object.isLine || object.isPoints)) {
        if ((object.castShadow || object.receiveShadow && type === VSMShadowMap) && (!object.frustumCulled || _frustum.intersectsObject(object))) {
          object.modelViewMatrix.multiplyMatrices(shadowCamera.matrixWorldInverse, object.matrixWorld);
          const geometry2 = objects.update(object);
          const material2 = object.material;
          if (Array.isArray(material2)) {
            const groups = geometry2.groups;
            for (let k2 = 0, kl = groups.length; k2 < kl; k2++) {
              const group = groups[k2];
              const groupMaterial = material2[group.materialIndex];
              if (groupMaterial && groupMaterial.visible) {
                const depthMaterial = getDepthMaterial(object, groupMaterial, light, type);
                object.onBeforeShadow(renderer2, object, camera2, shadowCamera, geometry2, depthMaterial, group);
                renderer2.renderBufferDirect(shadowCamera, null, geometry2, depthMaterial, object, group);
                object.onAfterShadow(renderer2, object, camera2, shadowCamera, geometry2, depthMaterial, group);
              }
            }
          } else if (material2.visible) {
            const depthMaterial = getDepthMaterial(object, material2, light, type);
            object.onBeforeShadow(renderer2, object, camera2, shadowCamera, geometry2, depthMaterial, null);
            renderer2.renderBufferDirect(shadowCamera, null, geometry2, depthMaterial, object, null);
            object.onAfterShadow(renderer2, object, camera2, shadowCamera, geometry2, depthMaterial, null);
          }
        }
      }
      const children = object.children;
      for (let i2 = 0, l2 = children.length; i2 < l2; i2++) {
        renderObject(children[i2], camera2, shadowCamera, light, type);
      }
    }
    function onMaterialDispose(event) {
      const material2 = event.target;
      material2.removeEventListener("dispose", onMaterialDispose);
      for (const id in _materialCache) {
        const cache2 = _materialCache[id];
        const uuid = event.target.uuid;
        if (uuid in cache2) {
          const shadowMaterial = cache2[uuid];
          shadowMaterial.dispose();
          delete cache2[uuid];
        }
      }
    }
  }
  var reversedFuncs = {
    [NeverDepth]: AlwaysDepth,
    [LessDepth]: GreaterDepth,
    [EqualDepth]: NotEqualDepth,
    [LessEqualDepth]: GreaterEqualDepth,
    [AlwaysDepth]: NeverDepth,
    [GreaterDepth]: LessDepth,
    [NotEqualDepth]: EqualDepth,
    [GreaterEqualDepth]: LessEqualDepth
  };
  function WebGLState(gl, extensions) {
    function ColorBuffer() {
      let locked = false;
      const color = new Vector4();
      let currentColorMask = null;
      const currentColorClear = new Vector4(0, 0, 0, 0);
      return {
        setMask: function(colorMask) {
          if (currentColorMask !== colorMask && !locked) {
            gl.colorMask(colorMask, colorMask, colorMask, colorMask);
            currentColorMask = colorMask;
          }
        },
        setLocked: function(lock) {
          locked = lock;
        },
        setClear: function(r2, g2, b2, a2, premultipliedAlpha) {
          if (premultipliedAlpha === true) {
            r2 *= a2;
            g2 *= a2;
            b2 *= a2;
          }
          color.set(r2, g2, b2, a2);
          if (currentColorClear.equals(color) === false) {
            gl.clearColor(r2, g2, b2, a2);
            currentColorClear.copy(color);
          }
        },
        reset: function() {
          locked = false;
          currentColorMask = null;
          currentColorClear.set(-1, 0, 0, 0);
        }
      };
    }
    function DepthBuffer() {
      let locked = false;
      let reversed = false;
      let currentDepthMask = null;
      let currentDepthFunc = null;
      let currentDepthClear = null;
      return {
        setReversed: function(value) {
          if (reversed !== value) {
            const ext = extensions.get("EXT_clip_control");
            if (reversed) {
              ext.clipControlEXT(ext.LOWER_LEFT_EXT, ext.ZERO_TO_ONE_EXT);
            } else {
              ext.clipControlEXT(ext.LOWER_LEFT_EXT, ext.NEGATIVE_ONE_TO_ONE_EXT);
            }
            const oldDepth = currentDepthClear;
            currentDepthClear = null;
            this.setClear(oldDepth);
          }
          reversed = value;
        },
        getReversed: function() {
          return reversed;
        },
        setTest: function(depthTest) {
          if (depthTest) {
            enable(gl.DEPTH_TEST);
          } else {
            disable(gl.DEPTH_TEST);
          }
        },
        setMask: function(depthMask) {
          if (currentDepthMask !== depthMask && !locked) {
            gl.depthMask(depthMask);
            currentDepthMask = depthMask;
          }
        },
        setFunc: function(depthFunc) {
          if (reversed) depthFunc = reversedFuncs[depthFunc];
          if (currentDepthFunc !== depthFunc) {
            switch (depthFunc) {
              case NeverDepth:
                gl.depthFunc(gl.NEVER);
                break;
              case AlwaysDepth:
                gl.depthFunc(gl.ALWAYS);
                break;
              case LessDepth:
                gl.depthFunc(gl.LESS);
                break;
              case LessEqualDepth:
                gl.depthFunc(gl.LEQUAL);
                break;
              case EqualDepth:
                gl.depthFunc(gl.EQUAL);
                break;
              case GreaterEqualDepth:
                gl.depthFunc(gl.GEQUAL);
                break;
              case GreaterDepth:
                gl.depthFunc(gl.GREATER);
                break;
              case NotEqualDepth:
                gl.depthFunc(gl.NOTEQUAL);
                break;
              default:
                gl.depthFunc(gl.LEQUAL);
            }
            currentDepthFunc = depthFunc;
          }
        },
        setLocked: function(lock) {
          locked = lock;
        },
        setClear: function(depth) {
          if (currentDepthClear !== depth) {
            if (reversed) {
              depth = 1 - depth;
            }
            gl.clearDepth(depth);
            currentDepthClear = depth;
          }
        },
        reset: function() {
          locked = false;
          currentDepthMask = null;
          currentDepthFunc = null;
          currentDepthClear = null;
          reversed = false;
        }
      };
    }
    function StencilBuffer() {
      let locked = false;
      let currentStencilMask = null;
      let currentStencilFunc = null;
      let currentStencilRef = null;
      let currentStencilFuncMask = null;
      let currentStencilFail = null;
      let currentStencilZFail = null;
      let currentStencilZPass = null;
      let currentStencilClear = null;
      return {
        setTest: function(stencilTest) {
          if (!locked) {
            if (stencilTest) {
              enable(gl.STENCIL_TEST);
            } else {
              disable(gl.STENCIL_TEST);
            }
          }
        },
        setMask: function(stencilMask) {
          if (currentStencilMask !== stencilMask && !locked) {
            gl.stencilMask(stencilMask);
            currentStencilMask = stencilMask;
          }
        },
        setFunc: function(stencilFunc, stencilRef, stencilMask) {
          if (currentStencilFunc !== stencilFunc || currentStencilRef !== stencilRef || currentStencilFuncMask !== stencilMask) {
            gl.stencilFunc(stencilFunc, stencilRef, stencilMask);
            currentStencilFunc = stencilFunc;
            currentStencilRef = stencilRef;
            currentStencilFuncMask = stencilMask;
          }
        },
        setOp: function(stencilFail, stencilZFail, stencilZPass) {
          if (currentStencilFail !== stencilFail || currentStencilZFail !== stencilZFail || currentStencilZPass !== stencilZPass) {
            gl.stencilOp(stencilFail, stencilZFail, stencilZPass);
            currentStencilFail = stencilFail;
            currentStencilZFail = stencilZFail;
            currentStencilZPass = stencilZPass;
          }
        },
        setLocked: function(lock) {
          locked = lock;
        },
        setClear: function(stencil) {
          if (currentStencilClear !== stencil) {
            gl.clearStencil(stencil);
            currentStencilClear = stencil;
          }
        },
        reset: function() {
          locked = false;
          currentStencilMask = null;
          currentStencilFunc = null;
          currentStencilRef = null;
          currentStencilFuncMask = null;
          currentStencilFail = null;
          currentStencilZFail = null;
          currentStencilZPass = null;
          currentStencilClear = null;
        }
      };
    }
    const colorBuffer = new ColorBuffer();
    const depthBuffer = new DepthBuffer();
    const stencilBuffer = new StencilBuffer();
    const uboBindings = /* @__PURE__ */ new WeakMap();
    const uboProgramMap = /* @__PURE__ */ new WeakMap();
    let enabledCapabilities = {};
    let currentBoundFramebuffers = {};
    let currentDrawbuffers = /* @__PURE__ */ new WeakMap();
    let defaultDrawbuffers = [];
    let currentProgram = null;
    let currentBlendingEnabled = false;
    let currentBlending = null;
    let currentBlendEquation = null;
    let currentBlendSrc = null;
    let currentBlendDst = null;
    let currentBlendEquationAlpha = null;
    let currentBlendSrcAlpha = null;
    let currentBlendDstAlpha = null;
    let currentBlendColor = new Color(0, 0, 0);
    let currentBlendAlpha = 0;
    let currentPremultipledAlpha = false;
    let currentFlipSided = null;
    let currentCullFace = null;
    let currentLineWidth = null;
    let currentPolygonOffsetFactor = null;
    let currentPolygonOffsetUnits = null;
    const maxTextures = gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
    let lineWidthAvailable = false;
    let version = 0;
    const glVersion = gl.getParameter(gl.VERSION);
    if (glVersion.indexOf("WebGL") !== -1) {
      version = parseFloat(/^WebGL (\d)/.exec(glVersion)[1]);
      lineWidthAvailable = version >= 1;
    } else if (glVersion.indexOf("OpenGL ES") !== -1) {
      version = parseFloat(/^OpenGL ES (\d)/.exec(glVersion)[1]);
      lineWidthAvailable = version >= 2;
    }
    let currentTextureSlot = null;
    let currentBoundTextures = {};
    const scissorParam = gl.getParameter(gl.SCISSOR_BOX);
    const viewportParam = gl.getParameter(gl.VIEWPORT);
    const currentScissor = new Vector4().fromArray(scissorParam);
    const currentViewport = new Vector4().fromArray(viewportParam);
    function createTexture(type, target, count, dimensions) {
      const data = new Uint8Array(4);
      const texture = gl.createTexture();
      gl.bindTexture(type, texture);
      gl.texParameteri(type, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(type, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      for (let i2 = 0; i2 < count; i2++) {
        if (type === gl.TEXTURE_3D || type === gl.TEXTURE_2D_ARRAY) {
          gl.texImage3D(target, 0, gl.RGBA, 1, 1, dimensions, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);
        } else {
          gl.texImage2D(target + i2, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);
        }
      }
      return texture;
    }
    const emptyTextures = {};
    emptyTextures[gl.TEXTURE_2D] = createTexture(gl.TEXTURE_2D, gl.TEXTURE_2D, 1);
    emptyTextures[gl.TEXTURE_CUBE_MAP] = createTexture(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_CUBE_MAP_POSITIVE_X, 6);
    emptyTextures[gl.TEXTURE_2D_ARRAY] = createTexture(gl.TEXTURE_2D_ARRAY, gl.TEXTURE_2D_ARRAY, 1, 1);
    emptyTextures[gl.TEXTURE_3D] = createTexture(gl.TEXTURE_3D, gl.TEXTURE_3D, 1, 1);
    colorBuffer.setClear(0, 0, 0, 1);
    depthBuffer.setClear(1);
    stencilBuffer.setClear(0);
    enable(gl.DEPTH_TEST);
    depthBuffer.setFunc(LessEqualDepth);
    setFlipSided(false);
    setCullFace(CullFaceBack);
    enable(gl.CULL_FACE);
    setBlending(NoBlending);
    function enable(id) {
      if (enabledCapabilities[id] !== true) {
        gl.enable(id);
        enabledCapabilities[id] = true;
      }
    }
    function disable(id) {
      if (enabledCapabilities[id] !== false) {
        gl.disable(id);
        enabledCapabilities[id] = false;
      }
    }
    function bindFramebuffer(target, framebuffer) {
      if (currentBoundFramebuffers[target] !== framebuffer) {
        gl.bindFramebuffer(target, framebuffer);
        currentBoundFramebuffers[target] = framebuffer;
        if (target === gl.DRAW_FRAMEBUFFER) {
          currentBoundFramebuffers[gl.FRAMEBUFFER] = framebuffer;
        }
        if (target === gl.FRAMEBUFFER) {
          currentBoundFramebuffers[gl.DRAW_FRAMEBUFFER] = framebuffer;
        }
        return true;
      }
      return false;
    }
    function drawBuffers(renderTarget, framebuffer) {
      let drawBuffers2 = defaultDrawbuffers;
      let needsUpdate = false;
      if (renderTarget) {
        drawBuffers2 = currentDrawbuffers.get(framebuffer);
        if (drawBuffers2 === void 0) {
          drawBuffers2 = [];
          currentDrawbuffers.set(framebuffer, drawBuffers2);
        }
        const textures = renderTarget.textures;
        if (drawBuffers2.length !== textures.length || drawBuffers2[0] !== gl.COLOR_ATTACHMENT0) {
          for (let i2 = 0, il = textures.length; i2 < il; i2++) {
            drawBuffers2[i2] = gl.COLOR_ATTACHMENT0 + i2;
          }
          drawBuffers2.length = textures.length;
          needsUpdate = true;
        }
      } else {
        if (drawBuffers2[0] !== gl.BACK) {
          drawBuffers2[0] = gl.BACK;
          needsUpdate = true;
        }
      }
      if (needsUpdate) {
        gl.drawBuffers(drawBuffers2);
      }
    }
    function useProgram(program) {
      if (currentProgram !== program) {
        gl.useProgram(program);
        currentProgram = program;
        return true;
      }
      return false;
    }
    const equationToGL = {
      [AddEquation]: gl.FUNC_ADD,
      [SubtractEquation]: gl.FUNC_SUBTRACT,
      [ReverseSubtractEquation]: gl.FUNC_REVERSE_SUBTRACT
    };
    equationToGL[MinEquation] = gl.MIN;
    equationToGL[MaxEquation] = gl.MAX;
    const factorToGL = {
      [ZeroFactor]: gl.ZERO,
      [OneFactor]: gl.ONE,
      [SrcColorFactor]: gl.SRC_COLOR,
      [SrcAlphaFactor]: gl.SRC_ALPHA,
      [SrcAlphaSaturateFactor]: gl.SRC_ALPHA_SATURATE,
      [DstColorFactor]: gl.DST_COLOR,
      [DstAlphaFactor]: gl.DST_ALPHA,
      [OneMinusSrcColorFactor]: gl.ONE_MINUS_SRC_COLOR,
      [OneMinusSrcAlphaFactor]: gl.ONE_MINUS_SRC_ALPHA,
      [OneMinusDstColorFactor]: gl.ONE_MINUS_DST_COLOR,
      [OneMinusDstAlphaFactor]: gl.ONE_MINUS_DST_ALPHA,
      [ConstantColorFactor]: gl.CONSTANT_COLOR,
      [OneMinusConstantColorFactor]: gl.ONE_MINUS_CONSTANT_COLOR,
      [ConstantAlphaFactor]: gl.CONSTANT_ALPHA,
      [OneMinusConstantAlphaFactor]: gl.ONE_MINUS_CONSTANT_ALPHA
    };
    function setBlending(blending, blendEquation, blendSrc, blendDst, blendEquationAlpha, blendSrcAlpha, blendDstAlpha, blendColor, blendAlpha, premultipliedAlpha) {
      if (blending === NoBlending) {
        if (currentBlendingEnabled === true) {
          disable(gl.BLEND);
          currentBlendingEnabled = false;
        }
        return;
      }
      if (currentBlendingEnabled === false) {
        enable(gl.BLEND);
        currentBlendingEnabled = true;
      }
      if (blending !== CustomBlending) {
        if (blending !== currentBlending || premultipliedAlpha !== currentPremultipledAlpha) {
          if (currentBlendEquation !== AddEquation || currentBlendEquationAlpha !== AddEquation) {
            gl.blendEquation(gl.FUNC_ADD);
            currentBlendEquation = AddEquation;
            currentBlendEquationAlpha = AddEquation;
          }
          if (premultipliedAlpha) {
            switch (blending) {
              case NormalBlending:
                gl.blendFuncSeparate(gl.ONE, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
                break;
              case AdditiveBlending:
                gl.blendFunc(gl.ONE, gl.ONE);
                break;
              case SubtractiveBlending:
                gl.blendFuncSeparate(gl.ZERO, gl.ONE_MINUS_SRC_COLOR, gl.ZERO, gl.ONE);
                break;
              case MultiplyBlending:
                gl.blendFuncSeparate(gl.ZERO, gl.SRC_COLOR, gl.ZERO, gl.SRC_ALPHA);
                break;
              default:
                console.error("THREE.WebGLState: Invalid blending: ", blending);
                break;
            }
          } else {
            switch (blending) {
              case NormalBlending:
                gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
                break;
              case AdditiveBlending:
                gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
                break;
              case SubtractiveBlending:
                gl.blendFuncSeparate(gl.ZERO, gl.ONE_MINUS_SRC_COLOR, gl.ZERO, gl.ONE);
                break;
              case MultiplyBlending:
                gl.blendFunc(gl.ZERO, gl.SRC_COLOR);
                break;
              default:
                console.error("THREE.WebGLState: Invalid blending: ", blending);
                break;
            }
          }
          currentBlendSrc = null;
          currentBlendDst = null;
          currentBlendSrcAlpha = null;
          currentBlendDstAlpha = null;
          currentBlendColor.set(0, 0, 0);
          currentBlendAlpha = 0;
          currentBlending = blending;
          currentPremultipledAlpha = premultipliedAlpha;
        }
        return;
      }
      blendEquationAlpha = blendEquationAlpha || blendEquation;
      blendSrcAlpha = blendSrcAlpha || blendSrc;
      blendDstAlpha = blendDstAlpha || blendDst;
      if (blendEquation !== currentBlendEquation || blendEquationAlpha !== currentBlendEquationAlpha) {
        gl.blendEquationSeparate(equationToGL[blendEquation], equationToGL[blendEquationAlpha]);
        currentBlendEquation = blendEquation;
        currentBlendEquationAlpha = blendEquationAlpha;
      }
      if (blendSrc !== currentBlendSrc || blendDst !== currentBlendDst || blendSrcAlpha !== currentBlendSrcAlpha || blendDstAlpha !== currentBlendDstAlpha) {
        gl.blendFuncSeparate(factorToGL[blendSrc], factorToGL[blendDst], factorToGL[blendSrcAlpha], factorToGL[blendDstAlpha]);
        currentBlendSrc = blendSrc;
        currentBlendDst = blendDst;
        currentBlendSrcAlpha = blendSrcAlpha;
        currentBlendDstAlpha = blendDstAlpha;
      }
      if (blendColor.equals(currentBlendColor) === false || blendAlpha !== currentBlendAlpha) {
        gl.blendColor(blendColor.r, blendColor.g, blendColor.b, blendAlpha);
        currentBlendColor.copy(blendColor);
        currentBlendAlpha = blendAlpha;
      }
      currentBlending = blending;
      currentPremultipledAlpha = false;
    }
    function setMaterial(material2, frontFaceCW) {
      material2.side === DoubleSide ? disable(gl.CULL_FACE) : enable(gl.CULL_FACE);
      let flipSided = material2.side === BackSide;
      if (frontFaceCW) flipSided = !flipSided;
      setFlipSided(flipSided);
      material2.blending === NormalBlending && material2.transparent === false ? setBlending(NoBlending) : setBlending(material2.blending, material2.blendEquation, material2.blendSrc, material2.blendDst, material2.blendEquationAlpha, material2.blendSrcAlpha, material2.blendDstAlpha, material2.blendColor, material2.blendAlpha, material2.premultipliedAlpha);
      depthBuffer.setFunc(material2.depthFunc);
      depthBuffer.setTest(material2.depthTest);
      depthBuffer.setMask(material2.depthWrite);
      colorBuffer.setMask(material2.colorWrite);
      const stencilWrite = material2.stencilWrite;
      stencilBuffer.setTest(stencilWrite);
      if (stencilWrite) {
        stencilBuffer.setMask(material2.stencilWriteMask);
        stencilBuffer.setFunc(material2.stencilFunc, material2.stencilRef, material2.stencilFuncMask);
        stencilBuffer.setOp(material2.stencilFail, material2.stencilZFail, material2.stencilZPass);
      }
      setPolygonOffset(material2.polygonOffset, material2.polygonOffsetFactor, material2.polygonOffsetUnits);
      material2.alphaToCoverage === true ? enable(gl.SAMPLE_ALPHA_TO_COVERAGE) : disable(gl.SAMPLE_ALPHA_TO_COVERAGE);
    }
    function setFlipSided(flipSided) {
      if (currentFlipSided !== flipSided) {
        if (flipSided) {
          gl.frontFace(gl.CW);
        } else {
          gl.frontFace(gl.CCW);
        }
        currentFlipSided = flipSided;
      }
    }
    function setCullFace(cullFace) {
      if (cullFace !== CullFaceNone) {
        enable(gl.CULL_FACE);
        if (cullFace !== currentCullFace) {
          if (cullFace === CullFaceBack) {
            gl.cullFace(gl.BACK);
          } else if (cullFace === CullFaceFront) {
            gl.cullFace(gl.FRONT);
          } else {
            gl.cullFace(gl.FRONT_AND_BACK);
          }
        }
      } else {
        disable(gl.CULL_FACE);
      }
      currentCullFace = cullFace;
    }
    function setLineWidth(width) {
      if (width !== currentLineWidth) {
        if (lineWidthAvailable) gl.lineWidth(width);
        currentLineWidth = width;
      }
    }
    function setPolygonOffset(polygonOffset, factor, units) {
      if (polygonOffset) {
        enable(gl.POLYGON_OFFSET_FILL);
        if (currentPolygonOffsetFactor !== factor || currentPolygonOffsetUnits !== units) {
          gl.polygonOffset(factor, units);
          currentPolygonOffsetFactor = factor;
          currentPolygonOffsetUnits = units;
        }
      } else {
        disable(gl.POLYGON_OFFSET_FILL);
      }
    }
    function setScissorTest(scissorTest) {
      if (scissorTest) {
        enable(gl.SCISSOR_TEST);
      } else {
        disable(gl.SCISSOR_TEST);
      }
    }
    function activeTexture(webglSlot) {
      if (webglSlot === void 0) webglSlot = gl.TEXTURE0 + maxTextures - 1;
      if (currentTextureSlot !== webglSlot) {
        gl.activeTexture(webglSlot);
        currentTextureSlot = webglSlot;
      }
    }
    function bindTexture(webglType, webglTexture, webglSlot) {
      if (webglSlot === void 0) {
        if (currentTextureSlot === null) {
          webglSlot = gl.TEXTURE0 + maxTextures - 1;
        } else {
          webglSlot = currentTextureSlot;
        }
      }
      let boundTexture = currentBoundTextures[webglSlot];
      if (boundTexture === void 0) {
        boundTexture = { type: void 0, texture: void 0 };
        currentBoundTextures[webglSlot] = boundTexture;
      }
      if (boundTexture.type !== webglType || boundTexture.texture !== webglTexture) {
        if (currentTextureSlot !== webglSlot) {
          gl.activeTexture(webglSlot);
          currentTextureSlot = webglSlot;
        }
        gl.bindTexture(webglType, webglTexture || emptyTextures[webglType]);
        boundTexture.type = webglType;
        boundTexture.texture = webglTexture;
      }
    }
    function unbindTexture() {
      const boundTexture = currentBoundTextures[currentTextureSlot];
      if (boundTexture !== void 0 && boundTexture.type !== void 0) {
        gl.bindTexture(boundTexture.type, null);
        boundTexture.type = void 0;
        boundTexture.texture = void 0;
      }
    }
    function compressedTexImage2D() {
      try {
        gl.compressedTexImage2D.apply(gl, arguments);
      } catch (error) {
        console.error("THREE.WebGLState:", error);
      }
    }
    function compressedTexImage3D() {
      try {
        gl.compressedTexImage3D.apply(gl, arguments);
      } catch (error) {
        console.error("THREE.WebGLState:", error);
      }
    }
    function texSubImage2D() {
      try {
        gl.texSubImage2D.apply(gl, arguments);
      } catch (error) {
        console.error("THREE.WebGLState:", error);
      }
    }
    function texSubImage3D() {
      try {
        gl.texSubImage3D.apply(gl, arguments);
      } catch (error) {
        console.error("THREE.WebGLState:", error);
      }
    }
    function compressedTexSubImage2D() {
      try {
        gl.compressedTexSubImage2D.apply(gl, arguments);
      } catch (error) {
        console.error("THREE.WebGLState:", error);
      }
    }
    function compressedTexSubImage3D() {
      try {
        gl.compressedTexSubImage3D.apply(gl, arguments);
      } catch (error) {
        console.error("THREE.WebGLState:", error);
      }
    }
    function texStorage2D() {
      try {
        gl.texStorage2D.apply(gl, arguments);
      } catch (error) {
        console.error("THREE.WebGLState:", error);
      }
    }
    function texStorage3D() {
      try {
        gl.texStorage3D.apply(gl, arguments);
      } catch (error) {
        console.error("THREE.WebGLState:", error);
      }
    }
    function texImage2D() {
      try {
        gl.texImage2D.apply(gl, arguments);
      } catch (error) {
        console.error("THREE.WebGLState:", error);
      }
    }
    function texImage3D() {
      try {
        gl.texImage3D.apply(gl, arguments);
      } catch (error) {
        console.error("THREE.WebGLState:", error);
      }
    }
    function scissor(scissor2) {
      if (currentScissor.equals(scissor2) === false) {
        gl.scissor(scissor2.x, scissor2.y, scissor2.z, scissor2.w);
        currentScissor.copy(scissor2);
      }
    }
    function viewport(viewport2) {
      if (currentViewport.equals(viewport2) === false) {
        gl.viewport(viewport2.x, viewport2.y, viewport2.z, viewport2.w);
        currentViewport.copy(viewport2);
      }
    }
    function updateUBOMapping(uniformsGroup, program) {
      let mapping = uboProgramMap.get(program);
      if (mapping === void 0) {
        mapping = /* @__PURE__ */ new WeakMap();
        uboProgramMap.set(program, mapping);
      }
      let blockIndex = mapping.get(uniformsGroup);
      if (blockIndex === void 0) {
        blockIndex = gl.getUniformBlockIndex(program, uniformsGroup.name);
        mapping.set(uniformsGroup, blockIndex);
      }
    }
    function uniformBlockBinding(uniformsGroup, program) {
      const mapping = uboProgramMap.get(program);
      const blockIndex = mapping.get(uniformsGroup);
      if (uboBindings.get(program) !== blockIndex) {
        gl.uniformBlockBinding(program, blockIndex, uniformsGroup.__bindingPointIndex);
        uboBindings.set(program, blockIndex);
      }
    }
    function reset() {
      gl.disable(gl.BLEND);
      gl.disable(gl.CULL_FACE);
      gl.disable(gl.DEPTH_TEST);
      gl.disable(gl.POLYGON_OFFSET_FILL);
      gl.disable(gl.SCISSOR_TEST);
      gl.disable(gl.STENCIL_TEST);
      gl.disable(gl.SAMPLE_ALPHA_TO_COVERAGE);
      gl.blendEquation(gl.FUNC_ADD);
      gl.blendFunc(gl.ONE, gl.ZERO);
      gl.blendFuncSeparate(gl.ONE, gl.ZERO, gl.ONE, gl.ZERO);
      gl.blendColor(0, 0, 0, 0);
      gl.colorMask(true, true, true, true);
      gl.clearColor(0, 0, 0, 0);
      gl.depthMask(true);
      gl.depthFunc(gl.LESS);
      depthBuffer.setReversed(false);
      gl.clearDepth(1);
      gl.stencilMask(4294967295);
      gl.stencilFunc(gl.ALWAYS, 0, 4294967295);
      gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP);
      gl.clearStencil(0);
      gl.cullFace(gl.BACK);
      gl.frontFace(gl.CCW);
      gl.polygonOffset(0, 0);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, null);
      gl.bindFramebuffer(gl.READ_FRAMEBUFFER, null);
      gl.useProgram(null);
      gl.lineWidth(1);
      gl.scissor(0, 0, gl.canvas.width, gl.canvas.height);
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
      enabledCapabilities = {};
      currentTextureSlot = null;
      currentBoundTextures = {};
      currentBoundFramebuffers = {};
      currentDrawbuffers = /* @__PURE__ */ new WeakMap();
      defaultDrawbuffers = [];
      currentProgram = null;
      currentBlendingEnabled = false;
      currentBlending = null;
      currentBlendEquation = null;
      currentBlendSrc = null;
      currentBlendDst = null;
      currentBlendEquationAlpha = null;
      currentBlendSrcAlpha = null;
      currentBlendDstAlpha = null;
      currentBlendColor = new Color(0, 0, 0);
      currentBlendAlpha = 0;
      currentPremultipledAlpha = false;
      currentFlipSided = null;
      currentCullFace = null;
      currentLineWidth = null;
      currentPolygonOffsetFactor = null;
      currentPolygonOffsetUnits = null;
      currentScissor.set(0, 0, gl.canvas.width, gl.canvas.height);
      currentViewport.set(0, 0, gl.canvas.width, gl.canvas.height);
      colorBuffer.reset();
      depthBuffer.reset();
      stencilBuffer.reset();
    }
    return {
      buffers: {
        color: colorBuffer,
        depth: depthBuffer,
        stencil: stencilBuffer
      },
      enable,
      disable,
      bindFramebuffer,
      drawBuffers,
      useProgram,
      setBlending,
      setMaterial,
      setFlipSided,
      setCullFace,
      setLineWidth,
      setPolygonOffset,
      setScissorTest,
      activeTexture,
      bindTexture,
      unbindTexture,
      compressedTexImage2D,
      compressedTexImage3D,
      texImage2D,
      texImage3D,
      updateUBOMapping,
      uniformBlockBinding,
      texStorage2D,
      texStorage3D,
      texSubImage2D,
      texSubImage3D,
      compressedTexSubImage2D,
      compressedTexSubImage3D,
      scissor,
      viewport,
      reset
    };
  }
  function WebGLTextures(_gl, extensions, state, properties, capabilities, utils, info) {
    const multisampledRTTExt = extensions.has("WEBGL_multisampled_render_to_texture") ? extensions.get("WEBGL_multisampled_render_to_texture") : null;
    const supportsInvalidateFramebuffer = typeof navigator === "undefined" ? false : /OculusBrowser/g.test(navigator.userAgent);
    const _imageDimensions = new Vector2();
    const _videoTextures = /* @__PURE__ */ new WeakMap();
    let _canvas2;
    const _sources = /* @__PURE__ */ new WeakMap();
    let useOffscreenCanvas = false;
    try {
      useOffscreenCanvas = typeof OffscreenCanvas !== "undefined" && new OffscreenCanvas(1, 1).getContext("2d") !== null;
    } catch (err) {
    }
    function createCanvas(width, height) {
      return useOffscreenCanvas ? (
        // eslint-disable-next-line compat/compat
        new OffscreenCanvas(width, height)
      ) : createElementNS("canvas");
    }
    function resizeImage(image, needsNewCanvas, maxSize) {
      let scale = 1;
      const dimensions = getDimensions(image);
      if (dimensions.width > maxSize || dimensions.height > maxSize) {
        scale = maxSize / Math.max(dimensions.width, dimensions.height);
      }
      if (scale < 1) {
        if (typeof HTMLImageElement !== "undefined" && image instanceof HTMLImageElement || typeof HTMLCanvasElement !== "undefined" && image instanceof HTMLCanvasElement || typeof ImageBitmap !== "undefined" && image instanceof ImageBitmap || typeof VideoFrame !== "undefined" && image instanceof VideoFrame) {
          const width = Math.floor(scale * dimensions.width);
          const height = Math.floor(scale * dimensions.height);
          if (_canvas2 === void 0) _canvas2 = createCanvas(width, height);
          const canvas2 = needsNewCanvas ? createCanvas(width, height) : _canvas2;
          canvas2.width = width;
          canvas2.height = height;
          const context = canvas2.getContext("2d");
          context.drawImage(image, 0, 0, width, height);
          console.warn("THREE.WebGLRenderer: Texture has been resized from (" + dimensions.width + "x" + dimensions.height + ") to (" + width + "x" + height + ").");
          return canvas2;
        } else {
          if ("data" in image) {
            console.warn("THREE.WebGLRenderer: Image in DataTexture is too big (" + dimensions.width + "x" + dimensions.height + ").");
          }
          return image;
        }
      }
      return image;
    }
    function textureNeedsGenerateMipmaps(texture) {
      return texture.generateMipmaps;
    }
    function generateMipmap(target) {
      _gl.generateMipmap(target);
    }
    function getTargetType(texture) {
      if (texture.isWebGLCubeRenderTarget) return _gl.TEXTURE_CUBE_MAP;
      if (texture.isWebGL3DRenderTarget) return _gl.TEXTURE_3D;
      if (texture.isWebGLArrayRenderTarget || texture.isCompressedArrayTexture) return _gl.TEXTURE_2D_ARRAY;
      return _gl.TEXTURE_2D;
    }
    function getInternalFormat(internalFormatName, glFormat, glType, colorSpace, forceLinearTransfer = false) {
      if (internalFormatName !== null) {
        if (_gl[internalFormatName] !== void 0) return _gl[internalFormatName];
        console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '" + internalFormatName + "'");
      }
      let internalFormat = glFormat;
      if (glFormat === _gl.RED) {
        if (glType === _gl.FLOAT) internalFormat = _gl.R32F;
        if (glType === _gl.HALF_FLOAT) internalFormat = _gl.R16F;
        if (glType === _gl.UNSIGNED_BYTE) internalFormat = _gl.R8;
      }
      if (glFormat === _gl.RED_INTEGER) {
        if (glType === _gl.UNSIGNED_BYTE) internalFormat = _gl.R8UI;
        if (glType === _gl.UNSIGNED_SHORT) internalFormat = _gl.R16UI;
        if (glType === _gl.UNSIGNED_INT) internalFormat = _gl.R32UI;
        if (glType === _gl.BYTE) internalFormat = _gl.R8I;
        if (glType === _gl.SHORT) internalFormat = _gl.R16I;
        if (glType === _gl.INT) internalFormat = _gl.R32I;
      }
      if (glFormat === _gl.RG) {
        if (glType === _gl.FLOAT) internalFormat = _gl.RG32F;
        if (glType === _gl.HALF_FLOAT) internalFormat = _gl.RG16F;
        if (glType === _gl.UNSIGNED_BYTE) internalFormat = _gl.RG8;
      }
      if (glFormat === _gl.RG_INTEGER) {
        if (glType === _gl.UNSIGNED_BYTE) internalFormat = _gl.RG8UI;
        if (glType === _gl.UNSIGNED_SHORT) internalFormat = _gl.RG16UI;
        if (glType === _gl.UNSIGNED_INT) internalFormat = _gl.RG32UI;
        if (glType === _gl.BYTE) internalFormat = _gl.RG8I;
        if (glType === _gl.SHORT) internalFormat = _gl.RG16I;
        if (glType === _gl.INT) internalFormat = _gl.RG32I;
      }
      if (glFormat === _gl.RGB_INTEGER) {
        if (glType === _gl.UNSIGNED_BYTE) internalFormat = _gl.RGB8UI;
        if (glType === _gl.UNSIGNED_SHORT) internalFormat = _gl.RGB16UI;
        if (glType === _gl.UNSIGNED_INT) internalFormat = _gl.RGB32UI;
        if (glType === _gl.BYTE) internalFormat = _gl.RGB8I;
        if (glType === _gl.SHORT) internalFormat = _gl.RGB16I;
        if (glType === _gl.INT) internalFormat = _gl.RGB32I;
      }
      if (glFormat === _gl.RGBA_INTEGER) {
        if (glType === _gl.UNSIGNED_BYTE) internalFormat = _gl.RGBA8UI;
        if (glType === _gl.UNSIGNED_SHORT) internalFormat = _gl.RGBA16UI;
        if (glType === _gl.UNSIGNED_INT) internalFormat = _gl.RGBA32UI;
        if (glType === _gl.BYTE) internalFormat = _gl.RGBA8I;
        if (glType === _gl.SHORT) internalFormat = _gl.RGBA16I;
        if (glType === _gl.INT) internalFormat = _gl.RGBA32I;
      }
      if (glFormat === _gl.RGB) {
        if (glType === _gl.UNSIGNED_INT_5_9_9_9_REV) internalFormat = _gl.RGB9_E5;
      }
      if (glFormat === _gl.RGBA) {
        const transfer = forceLinearTransfer ? LinearTransfer : ColorManagement.getTransfer(colorSpace);
        if (glType === _gl.FLOAT) internalFormat = _gl.RGBA32F;
        if (glType === _gl.HALF_FLOAT) internalFormat = _gl.RGBA16F;
        if (glType === _gl.UNSIGNED_BYTE) internalFormat = transfer === SRGBTransfer ? _gl.SRGB8_ALPHA8 : _gl.RGBA8;
        if (glType === _gl.UNSIGNED_SHORT_4_4_4_4) internalFormat = _gl.RGBA4;
        if (glType === _gl.UNSIGNED_SHORT_5_5_5_1) internalFormat = _gl.RGB5_A1;
      }
      if (internalFormat === _gl.R16F || internalFormat === _gl.R32F || internalFormat === _gl.RG16F || internalFormat === _gl.RG32F || internalFormat === _gl.RGBA16F || internalFormat === _gl.RGBA32F) {
        extensions.get("EXT_color_buffer_float");
      }
      return internalFormat;
    }
    function getInternalDepthFormat(useStencil, depthType) {
      let glInternalFormat;
      if (useStencil) {
        if (depthType === null || depthType === UnsignedIntType || depthType === UnsignedInt248Type) {
          glInternalFormat = _gl.DEPTH24_STENCIL8;
        } else if (depthType === FloatType) {
          glInternalFormat = _gl.DEPTH32F_STENCIL8;
        } else if (depthType === UnsignedShortType) {
          glInternalFormat = _gl.DEPTH24_STENCIL8;
          console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.");
        }
      } else {
        if (depthType === null || depthType === UnsignedIntType || depthType === UnsignedInt248Type) {
          glInternalFormat = _gl.DEPTH_COMPONENT24;
        } else if (depthType === FloatType) {
          glInternalFormat = _gl.DEPTH_COMPONENT32F;
        } else if (depthType === UnsignedShortType) {
          glInternalFormat = _gl.DEPTH_COMPONENT16;
        }
      }
      return glInternalFormat;
    }
    function getMipLevels(texture, image) {
      if (textureNeedsGenerateMipmaps(texture) === true || texture.isFramebufferTexture && texture.minFilter !== NearestFilter && texture.minFilter !== LinearFilter) {
        return Math.log2(Math.max(image.width, image.height)) + 1;
      } else if (texture.mipmaps !== void 0 && texture.mipmaps.length > 0) {
        return texture.mipmaps.length;
      } else if (texture.isCompressedTexture && Array.isArray(texture.image)) {
        return image.mipmaps.length;
      } else {
        return 1;
      }
    }
    function onTextureDispose(event) {
      const texture = event.target;
      texture.removeEventListener("dispose", onTextureDispose);
      deallocateTexture(texture);
      if (texture.isVideoTexture) {
        _videoTextures.delete(texture);
      }
    }
    function onRenderTargetDispose(event) {
      const renderTarget = event.target;
      renderTarget.removeEventListener("dispose", onRenderTargetDispose);
      deallocateRenderTarget(renderTarget);
    }
    function deallocateTexture(texture) {
      const textureProperties = properties.get(texture);
      if (textureProperties.__webglInit === void 0) return;
      const source = texture.source;
      const webglTextures = _sources.get(source);
      if (webglTextures) {
        const webglTexture = webglTextures[textureProperties.__cacheKey];
        webglTexture.usedTimes--;
        if (webglTexture.usedTimes === 0) {
          deleteTexture(texture);
        }
        if (Object.keys(webglTextures).length === 0) {
          _sources.delete(source);
        }
      }
      properties.remove(texture);
    }
    function deleteTexture(texture) {
      const textureProperties = properties.get(texture);
      _gl.deleteTexture(textureProperties.__webglTexture);
      const source = texture.source;
      const webglTextures = _sources.get(source);
      delete webglTextures[textureProperties.__cacheKey];
      info.memory.textures--;
    }
    function deallocateRenderTarget(renderTarget) {
      const renderTargetProperties = properties.get(renderTarget);
      if (renderTarget.depthTexture) {
        renderTarget.depthTexture.dispose();
        properties.remove(renderTarget.depthTexture);
      }
      if (renderTarget.isWebGLCubeRenderTarget) {
        for (let i2 = 0; i2 < 6; i2++) {
          if (Array.isArray(renderTargetProperties.__webglFramebuffer[i2])) {
            for (let level = 0; level < renderTargetProperties.__webglFramebuffer[i2].length; level++) _gl.deleteFramebuffer(renderTargetProperties.__webglFramebuffer[i2][level]);
          } else {
            _gl.deleteFramebuffer(renderTargetProperties.__webglFramebuffer[i2]);
          }
          if (renderTargetProperties.__webglDepthbuffer) _gl.deleteRenderbuffer(renderTargetProperties.__webglDepthbuffer[i2]);
        }
      } else {
        if (Array.isArray(renderTargetProperties.__webglFramebuffer)) {
          for (let level = 0; level < renderTargetProperties.__webglFramebuffer.length; level++) _gl.deleteFramebuffer(renderTargetProperties.__webglFramebuffer[level]);
        } else {
          _gl.deleteFramebuffer(renderTargetProperties.__webglFramebuffer);
        }
        if (renderTargetProperties.__webglDepthbuffer) _gl.deleteRenderbuffer(renderTargetProperties.__webglDepthbuffer);
        if (renderTargetProperties.__webglMultisampledFramebuffer) _gl.deleteFramebuffer(renderTargetProperties.__webglMultisampledFramebuffer);
        if (renderTargetProperties.__webglColorRenderbuffer) {
          for (let i2 = 0; i2 < renderTargetProperties.__webglColorRenderbuffer.length; i2++) {
            if (renderTargetProperties.__webglColorRenderbuffer[i2]) _gl.deleteRenderbuffer(renderTargetProperties.__webglColorRenderbuffer[i2]);
          }
        }
        if (renderTargetProperties.__webglDepthRenderbuffer) _gl.deleteRenderbuffer(renderTargetProperties.__webglDepthRenderbuffer);
      }
      const textures = renderTarget.textures;
      for (let i2 = 0, il = textures.length; i2 < il; i2++) {
        const attachmentProperties = properties.get(textures[i2]);
        if (attachmentProperties.__webglTexture) {
          _gl.deleteTexture(attachmentProperties.__webglTexture);
          info.memory.textures--;
        }
        properties.remove(textures[i2]);
      }
      properties.remove(renderTarget);
    }
    let textureUnits = 0;
    function resetTextureUnits() {
      textureUnits = 0;
    }
    function allocateTextureUnit() {
      const textureUnit = textureUnits;
      if (textureUnit >= capabilities.maxTextures) {
        console.warn("THREE.WebGLTextures: Trying to use " + textureUnit + " texture units while this GPU supports only " + capabilities.maxTextures);
      }
      textureUnits += 1;
      return textureUnit;
    }
    function getTextureCacheKey(texture) {
      const array = [];
      array.push(texture.wrapS);
      array.push(texture.wrapT);
      array.push(texture.wrapR || 0);
      array.push(texture.magFilter);
      array.push(texture.minFilter);
      array.push(texture.anisotropy);
      array.push(texture.internalFormat);
      array.push(texture.format);
      array.push(texture.type);
      array.push(texture.generateMipmaps);
      array.push(texture.premultiplyAlpha);
      array.push(texture.flipY);
      array.push(texture.unpackAlignment);
      array.push(texture.colorSpace);
      return array.join();
    }
    function setTexture2D(texture, slot) {
      const textureProperties = properties.get(texture);
      if (texture.isVideoTexture) updateVideoTexture(texture);
      if (texture.isRenderTargetTexture === false && texture.version > 0 && textureProperties.__version !== texture.version) {
        const image = texture.image;
        if (image === null) {
          console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");
        } else if (image.complete === false) {
          console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");
        } else {
          uploadTexture(textureProperties, texture, slot);
          return;
        }
      }
      state.bindTexture(_gl.TEXTURE_2D, textureProperties.__webglTexture, _gl.TEXTURE0 + slot);
    }
    function setTexture2DArray(texture, slot) {
      const textureProperties = properties.get(texture);
      if (texture.version > 0 && textureProperties.__version !== texture.version) {
        uploadTexture(textureProperties, texture, slot);
        return;
      }
      state.bindTexture(_gl.TEXTURE_2D_ARRAY, textureProperties.__webglTexture, _gl.TEXTURE0 + slot);
    }
    function setTexture3D(texture, slot) {
      const textureProperties = properties.get(texture);
      if (texture.version > 0 && textureProperties.__version !== texture.version) {
        uploadTexture(textureProperties, texture, slot);
        return;
      }
      state.bindTexture(_gl.TEXTURE_3D, textureProperties.__webglTexture, _gl.TEXTURE0 + slot);
    }
    function setTextureCube(texture, slot) {
      const textureProperties = properties.get(texture);
      if (texture.version > 0 && textureProperties.__version !== texture.version) {
        uploadCubeTexture(textureProperties, texture, slot);
        return;
      }
      state.bindTexture(_gl.TEXTURE_CUBE_MAP, textureProperties.__webglTexture, _gl.TEXTURE0 + slot);
    }
    const wrappingToGL = {
      [RepeatWrapping]: _gl.REPEAT,
      [ClampToEdgeWrapping]: _gl.CLAMP_TO_EDGE,
      [MirroredRepeatWrapping]: _gl.MIRRORED_REPEAT
    };
    const filterToGL = {
      [NearestFilter]: _gl.NEAREST,
      [NearestMipmapNearestFilter]: _gl.NEAREST_MIPMAP_NEAREST,
      [NearestMipmapLinearFilter]: _gl.NEAREST_MIPMAP_LINEAR,
      [LinearFilter]: _gl.LINEAR,
      [LinearMipmapNearestFilter]: _gl.LINEAR_MIPMAP_NEAREST,
      [LinearMipmapLinearFilter]: _gl.LINEAR_MIPMAP_LINEAR
    };
    const compareToGL = {
      [NeverCompare]: _gl.NEVER,
      [AlwaysCompare]: _gl.ALWAYS,
      [LessCompare]: _gl.LESS,
      [LessEqualCompare]: _gl.LEQUAL,
      [EqualCompare]: _gl.EQUAL,
      [GreaterEqualCompare]: _gl.GEQUAL,
      [GreaterCompare]: _gl.GREATER,
      [NotEqualCompare]: _gl.NOTEQUAL
    };
    function setTextureParameters(textureType, texture) {
      if (texture.type === FloatType && extensions.has("OES_texture_float_linear") === false && (texture.magFilter === LinearFilter || texture.magFilter === LinearMipmapNearestFilter || texture.magFilter === NearestMipmapLinearFilter || texture.magFilter === LinearMipmapLinearFilter || texture.minFilter === LinearFilter || texture.minFilter === LinearMipmapNearestFilter || texture.minFilter === NearestMipmapLinearFilter || texture.minFilter === LinearMipmapLinearFilter)) {
        console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.");
      }
      _gl.texParameteri(textureType, _gl.TEXTURE_WRAP_S, wrappingToGL[texture.wrapS]);
      _gl.texParameteri(textureType, _gl.TEXTURE_WRAP_T, wrappingToGL[texture.wrapT]);
      if (textureType === _gl.TEXTURE_3D || textureType === _gl.TEXTURE_2D_ARRAY) {
        _gl.texParameteri(textureType, _gl.TEXTURE_WRAP_R, wrappingToGL[texture.wrapR]);
      }
      _gl.texParameteri(textureType, _gl.TEXTURE_MAG_FILTER, filterToGL[texture.magFilter]);
      _gl.texParameteri(textureType, _gl.TEXTURE_MIN_FILTER, filterToGL[texture.minFilter]);
      if (texture.compareFunction) {
        _gl.texParameteri(textureType, _gl.TEXTURE_COMPARE_MODE, _gl.COMPARE_REF_TO_TEXTURE);
        _gl.texParameteri(textureType, _gl.TEXTURE_COMPARE_FUNC, compareToGL[texture.compareFunction]);
      }
      if (extensions.has("EXT_texture_filter_anisotropic") === true) {
        if (texture.magFilter === NearestFilter) return;
        if (texture.minFilter !== NearestMipmapLinearFilter && texture.minFilter !== LinearMipmapLinearFilter) return;
        if (texture.type === FloatType && extensions.has("OES_texture_float_linear") === false) return;
        if (texture.anisotropy > 1 || properties.get(texture).__currentAnisotropy) {
          const extension = extensions.get("EXT_texture_filter_anisotropic");
          _gl.texParameterf(textureType, extension.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(texture.anisotropy, capabilities.getMaxAnisotropy()));
          properties.get(texture).__currentAnisotropy = texture.anisotropy;
        }
      }
    }
    function initTexture(textureProperties, texture) {
      let forceUpload = false;
      if (textureProperties.__webglInit === void 0) {
        textureProperties.__webglInit = true;
        texture.addEventListener("dispose", onTextureDispose);
      }
      const source = texture.source;
      let webglTextures = _sources.get(source);
      if (webglTextures === void 0) {
        webglTextures = {};
        _sources.set(source, webglTextures);
      }
      const textureCacheKey = getTextureCacheKey(texture);
      if (textureCacheKey !== textureProperties.__cacheKey) {
        if (webglTextures[textureCacheKey] === void 0) {
          webglTextures[textureCacheKey] = {
            texture: _gl.createTexture(),
            usedTimes: 0
          };
          info.memory.textures++;
          forceUpload = true;
        }
        webglTextures[textureCacheKey].usedTimes++;
        const webglTexture = webglTextures[textureProperties.__cacheKey];
        if (webglTexture !== void 0) {
          webglTextures[textureProperties.__cacheKey].usedTimes--;
          if (webglTexture.usedTimes === 0) {
            deleteTexture(texture);
          }
        }
        textureProperties.__cacheKey = textureCacheKey;
        textureProperties.__webglTexture = webglTextures[textureCacheKey].texture;
      }
      return forceUpload;
    }
    function uploadTexture(textureProperties, texture, slot) {
      let textureType = _gl.TEXTURE_2D;
      if (texture.isDataArrayTexture || texture.isCompressedArrayTexture) textureType = _gl.TEXTURE_2D_ARRAY;
      if (texture.isData3DTexture) textureType = _gl.TEXTURE_3D;
      const forceUpload = initTexture(textureProperties, texture);
      const source = texture.source;
      state.bindTexture(textureType, textureProperties.__webglTexture, _gl.TEXTURE0 + slot);
      const sourceProperties = properties.get(source);
      if (source.version !== sourceProperties.__version || forceUpload === true) {
        state.activeTexture(_gl.TEXTURE0 + slot);
        const workingPrimaries = ColorManagement.getPrimaries(ColorManagement.workingColorSpace);
        const texturePrimaries = texture.colorSpace === NoColorSpace ? null : ColorManagement.getPrimaries(texture.colorSpace);
        const unpackConversion = texture.colorSpace === NoColorSpace || workingPrimaries === texturePrimaries ? _gl.NONE : _gl.BROWSER_DEFAULT_WEBGL;
        _gl.pixelStorei(_gl.UNPACK_FLIP_Y_WEBGL, texture.flipY);
        _gl.pixelStorei(_gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, texture.premultiplyAlpha);
        _gl.pixelStorei(_gl.UNPACK_ALIGNMENT, texture.unpackAlignment);
        _gl.pixelStorei(_gl.UNPACK_COLORSPACE_CONVERSION_WEBGL, unpackConversion);
        let image = resizeImage(texture.image, false, capabilities.maxTextureSize);
        image = verifyColorSpace(texture, image);
        const glFormat = utils.convert(texture.format, texture.colorSpace);
        const glType = utils.convert(texture.type);
        let glInternalFormat = getInternalFormat(texture.internalFormat, glFormat, glType, texture.colorSpace, texture.isVideoTexture);
        setTextureParameters(textureType, texture);
        let mipmap;
        const mipmaps = texture.mipmaps;
        const useTexStorage = texture.isVideoTexture !== true;
        const allocateMemory = sourceProperties.__version === void 0 || forceUpload === true;
        const dataReady = source.dataReady;
        const levels = getMipLevels(texture, image);
        if (texture.isDepthTexture) {
          glInternalFormat = getInternalDepthFormat(texture.format === DepthStencilFormat, texture.type);
          if (allocateMemory) {
            if (useTexStorage) {
              state.texStorage2D(_gl.TEXTURE_2D, 1, glInternalFormat, image.width, image.height);
            } else {
              state.texImage2D(_gl.TEXTURE_2D, 0, glInternalFormat, image.width, image.height, 0, glFormat, glType, null);
            }
          }
        } else if (texture.isDataTexture) {
          if (mipmaps.length > 0) {
            if (useTexStorage && allocateMemory) {
              state.texStorage2D(_gl.TEXTURE_2D, levels, glInternalFormat, mipmaps[0].width, mipmaps[0].height);
            }
            for (let i2 = 0, il = mipmaps.length; i2 < il; i2++) {
              mipmap = mipmaps[i2];
              if (useTexStorage) {
                if (dataReady) {
                  state.texSubImage2D(_gl.TEXTURE_2D, i2, 0, 0, mipmap.width, mipmap.height, glFormat, glType, mipmap.data);
                }
              } else {
                state.texImage2D(_gl.TEXTURE_2D, i2, glInternalFormat, mipmap.width, mipmap.height, 0, glFormat, glType, mipmap.data);
              }
            }
            texture.generateMipmaps = false;
          } else {
            if (useTexStorage) {
              if (allocateMemory) {
                state.texStorage2D(_gl.TEXTURE_2D, levels, glInternalFormat, image.width, image.height);
              }
              if (dataReady) {
                state.texSubImage2D(_gl.TEXTURE_2D, 0, 0, 0, image.width, image.height, glFormat, glType, image.data);
              }
            } else {
              state.texImage2D(_gl.TEXTURE_2D, 0, glInternalFormat, image.width, image.height, 0, glFormat, glType, image.data);
            }
          }
        } else if (texture.isCompressedTexture) {
          if (texture.isCompressedArrayTexture) {
            if (useTexStorage && allocateMemory) {
              state.texStorage3D(_gl.TEXTURE_2D_ARRAY, levels, glInternalFormat, mipmaps[0].width, mipmaps[0].height, image.depth);
            }
            for (let i2 = 0, il = mipmaps.length; i2 < il; i2++) {
              mipmap = mipmaps[i2];
              if (texture.format !== RGBAFormat) {
                if (glFormat !== null) {
                  if (useTexStorage) {
                    if (dataReady) {
                      if (texture.layerUpdates.size > 0) {
                        const layerByteLength = getByteLength(mipmap.width, mipmap.height, texture.format, texture.type);
                        for (const layerIndex of texture.layerUpdates) {
                          const layerData = mipmap.data.subarray(
                            layerIndex * layerByteLength / mipmap.data.BYTES_PER_ELEMENT,
                            (layerIndex + 1) * layerByteLength / mipmap.data.BYTES_PER_ELEMENT
                          );
                          state.compressedTexSubImage3D(_gl.TEXTURE_2D_ARRAY, i2, 0, 0, layerIndex, mipmap.width, mipmap.height, 1, glFormat, layerData);
                        }
                        texture.clearLayerUpdates();
                      } else {
                        state.compressedTexSubImage3D(_gl.TEXTURE_2D_ARRAY, i2, 0, 0, 0, mipmap.width, mipmap.height, image.depth, glFormat, mipmap.data);
                      }
                    }
                  } else {
                    state.compressedTexImage3D(_gl.TEXTURE_2D_ARRAY, i2, glInternalFormat, mipmap.width, mipmap.height, image.depth, 0, mipmap.data, 0, 0);
                  }
                } else {
                  console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");
                }
              } else {
                if (useTexStorage) {
                  if (dataReady) {
                    state.texSubImage3D(_gl.TEXTURE_2D_ARRAY, i2, 0, 0, 0, mipmap.width, mipmap.height, image.depth, glFormat, glType, mipmap.data);
                  }
                } else {
                  state.texImage3D(_gl.TEXTURE_2D_ARRAY, i2, glInternalFormat, mipmap.width, mipmap.height, image.depth, 0, glFormat, glType, mipmap.data);
                }
              }
            }
          } else {
            if (useTexStorage && allocateMemory) {
              state.texStorage2D(_gl.TEXTURE_2D, levels, glInternalFormat, mipmaps[0].width, mipmaps[0].height);
            }
            for (let i2 = 0, il = mipmaps.length; i2 < il; i2++) {
              mipmap = mipmaps[i2];
              if (texture.format !== RGBAFormat) {
                if (glFormat !== null) {
                  if (useTexStorage) {
                    if (dataReady) {
                      state.compressedTexSubImage2D(_gl.TEXTURE_2D, i2, 0, 0, mipmap.width, mipmap.height, glFormat, mipmap.data);
                    }
                  } else {
                    state.compressedTexImage2D(_gl.TEXTURE_2D, i2, glInternalFormat, mipmap.width, mipmap.height, 0, mipmap.data);
                  }
                } else {
                  console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");
                }
              } else {
                if (useTexStorage) {
                  if (dataReady) {
                    state.texSubImage2D(_gl.TEXTURE_2D, i2, 0, 0, mipmap.width, mipmap.height, glFormat, glType, mipmap.data);
                  }
                } else {
                  state.texImage2D(_gl.TEXTURE_2D, i2, glInternalFormat, mipmap.width, mipmap.height, 0, glFormat, glType, mipmap.data);
                }
              }
            }
          }
        } else if (texture.isDataArrayTexture) {
          if (useTexStorage) {
            if (allocateMemory) {
              state.texStorage3D(_gl.TEXTURE_2D_ARRAY, levels, glInternalFormat, image.width, image.height, image.depth);
            }
            if (dataReady) {
              if (texture.layerUpdates.size > 0) {
                const layerByteLength = getByteLength(image.width, image.height, texture.format, texture.type);
                for (const layerIndex of texture.layerUpdates) {
                  const layerData = image.data.subarray(
                    layerIndex * layerByteLength / image.data.BYTES_PER_ELEMENT,
                    (layerIndex + 1) * layerByteLength / image.data.BYTES_PER_ELEMENT
                  );
                  state.texSubImage3D(_gl.TEXTURE_2D_ARRAY, 0, 0, 0, layerIndex, image.width, image.height, 1, glFormat, glType, layerData);
                }
                texture.clearLayerUpdates();
              } else {
                state.texSubImage3D(_gl.TEXTURE_2D_ARRAY, 0, 0, 0, 0, image.width, image.height, image.depth, glFormat, glType, image.data);
              }
            }
          } else {
            state.texImage3D(_gl.TEXTURE_2D_ARRAY, 0, glInternalFormat, image.width, image.height, image.depth, 0, glFormat, glType, image.data);
          }
        } else if (texture.isData3DTexture) {
          if (useTexStorage) {
            if (allocateMemory) {
              state.texStorage3D(_gl.TEXTURE_3D, levels, glInternalFormat, image.width, image.height, image.depth);
            }
            if (dataReady) {
              state.texSubImage3D(_gl.TEXTURE_3D, 0, 0, 0, 0, image.width, image.height, image.depth, glFormat, glType, image.data);
            }
          } else {
            state.texImage3D(_gl.TEXTURE_3D, 0, glInternalFormat, image.width, image.height, image.depth, 0, glFormat, glType, image.data);
          }
        } else if (texture.isFramebufferTexture) {
          if (allocateMemory) {
            if (useTexStorage) {
              state.texStorage2D(_gl.TEXTURE_2D, levels, glInternalFormat, image.width, image.height);
            } else {
              let width = image.width, height = image.height;
              for (let i2 = 0; i2 < levels; i2++) {
                state.texImage2D(_gl.TEXTURE_2D, i2, glInternalFormat, width, height, 0, glFormat, glType, null);
                width >>= 1;
                height >>= 1;
              }
            }
          }
        } else {
          if (mipmaps.length > 0) {
            if (useTexStorage && allocateMemory) {
              const dimensions = getDimensions(mipmaps[0]);
              state.texStorage2D(_gl.TEXTURE_2D, levels, glInternalFormat, dimensions.width, dimensions.height);
            }
            for (let i2 = 0, il = mipmaps.length; i2 < il; i2++) {
              mipmap = mipmaps[i2];
              if (useTexStorage) {
                if (dataReady) {
                  state.texSubImage2D(_gl.TEXTURE_2D, i2, 0, 0, glFormat, glType, mipmap);
                }
              } else {
                state.texImage2D(_gl.TEXTURE_2D, i2, glInternalFormat, glFormat, glType, mipmap);
              }
            }
            texture.generateMipmaps = false;
          } else {
            if (useTexStorage) {
              if (allocateMemory) {
                const dimensions = getDimensions(image);
                state.texStorage2D(_gl.TEXTURE_2D, levels, glInternalFormat, dimensions.width, dimensions.height);
              }
              if (dataReady) {
                state.texSubImage2D(_gl.TEXTURE_2D, 0, 0, 0, glFormat, glType, image);
              }
            } else {
              state.texImage2D(_gl.TEXTURE_2D, 0, glInternalFormat, glFormat, glType, image);
            }
          }
        }
        if (textureNeedsGenerateMipmaps(texture)) {
          generateMipmap(textureType);
        }
        sourceProperties.__version = source.version;
        if (texture.onUpdate) texture.onUpdate(texture);
      }
      textureProperties.__version = texture.version;
    }
    function uploadCubeTexture(textureProperties, texture, slot) {
      if (texture.image.length !== 6) return;
      const forceUpload = initTexture(textureProperties, texture);
      const source = texture.source;
      state.bindTexture(_gl.TEXTURE_CUBE_MAP, textureProperties.__webglTexture, _gl.TEXTURE0 + slot);
      const sourceProperties = properties.get(source);
      if (source.version !== sourceProperties.__version || forceUpload === true) {
        state.activeTexture(_gl.TEXTURE0 + slot);
        const workingPrimaries = ColorManagement.getPrimaries(ColorManagement.workingColorSpace);
        const texturePrimaries = texture.colorSpace === NoColorSpace ? null : ColorManagement.getPrimaries(texture.colorSpace);
        const unpackConversion = texture.colorSpace === NoColorSpace || workingPrimaries === texturePrimaries ? _gl.NONE : _gl.BROWSER_DEFAULT_WEBGL;
        _gl.pixelStorei(_gl.UNPACK_FLIP_Y_WEBGL, texture.flipY);
        _gl.pixelStorei(_gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, texture.premultiplyAlpha);
        _gl.pixelStorei(_gl.UNPACK_ALIGNMENT, texture.unpackAlignment);
        _gl.pixelStorei(_gl.UNPACK_COLORSPACE_CONVERSION_WEBGL, unpackConversion);
        const isCompressed = texture.isCompressedTexture || texture.image[0].isCompressedTexture;
        const isDataTexture = texture.image[0] && texture.image[0].isDataTexture;
        const cubeImage = [];
        for (let i2 = 0; i2 < 6; i2++) {
          if (!isCompressed && !isDataTexture) {
            cubeImage[i2] = resizeImage(texture.image[i2], true, capabilities.maxCubemapSize);
          } else {
            cubeImage[i2] = isDataTexture ? texture.image[i2].image : texture.image[i2];
          }
          cubeImage[i2] = verifyColorSpace(texture, cubeImage[i2]);
        }
        const image = cubeImage[0], glFormat = utils.convert(texture.format, texture.colorSpace), glType = utils.convert(texture.type), glInternalFormat = getInternalFormat(texture.internalFormat, glFormat, glType, texture.colorSpace);
        const useTexStorage = texture.isVideoTexture !== true;
        const allocateMemory = sourceProperties.__version === void 0 || forceUpload === true;
        const dataReady = source.dataReady;
        let levels = getMipLevels(texture, image);
        setTextureParameters(_gl.TEXTURE_CUBE_MAP, texture);
        let mipmaps;
        if (isCompressed) {
          if (useTexStorage && allocateMemory) {
            state.texStorage2D(_gl.TEXTURE_CUBE_MAP, levels, glInternalFormat, image.width, image.height);
          }
          for (let i2 = 0; i2 < 6; i2++) {
            mipmaps = cubeImage[i2].mipmaps;
            for (let j2 = 0; j2 < mipmaps.length; j2++) {
              const mipmap = mipmaps[j2];
              if (texture.format !== RGBAFormat) {
                if (glFormat !== null) {
                  if (useTexStorage) {
                    if (dataReady) {
                      state.compressedTexSubImage2D(_gl.TEXTURE_CUBE_MAP_POSITIVE_X + i2, j2, 0, 0, mipmap.width, mipmap.height, glFormat, mipmap.data);
                    }
                  } else {
                    state.compressedTexImage2D(_gl.TEXTURE_CUBE_MAP_POSITIVE_X + i2, j2, glInternalFormat, mipmap.width, mipmap.height, 0, mipmap.data);
                  }
                } else {
                  console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()");
                }
              } else {
                if (useTexStorage) {
                  if (dataReady) {
                    state.texSubImage2D(_gl.TEXTURE_CUBE_MAP_POSITIVE_X + i2, j2, 0, 0, mipmap.width, mipmap.height, glFormat, glType, mipmap.data);
                  }
                } else {
                  state.texImage2D(_gl.TEXTURE_CUBE_MAP_POSITIVE_X + i2, j2, glInternalFormat, mipmap.width, mipmap.height, 0, glFormat, glType, mipmap.data);
                }
              }
            }
          }
        } else {
          mipmaps = texture.mipmaps;
          if (useTexStorage && allocateMemory) {
            if (mipmaps.length > 0) levels++;
            const dimensions = getDimensions(cubeImage[0]);
            state.texStorage2D(_gl.TEXTURE_CUBE_MAP, levels, glInternalFormat, dimensions.width, dimensions.height);
          }
          for (let i2 = 0; i2 < 6; i2++) {
            if (isDataTexture) {
              if (useTexStorage) {
                if (dataReady) {
                  state.texSubImage2D(_gl.TEXTURE_CUBE_MAP_POSITIVE_X + i2, 0, 0, 0, cubeImage[i2].width, cubeImage[i2].height, glFormat, glType, cubeImage[i2].data);
                }
              } else {
                state.texImage2D(_gl.TEXTURE_CUBE_MAP_POSITIVE_X + i2, 0, glInternalFormat, cubeImage[i2].width, cubeImage[i2].height, 0, glFormat, glType, cubeImage[i2].data);
              }
              for (let j2 = 0; j2 < mipmaps.length; j2++) {
                const mipmap = mipmaps[j2];
                const mipmapImage = mipmap.image[i2].image;
                if (useTexStorage) {
                  if (dataReady) {
                    state.texSubImage2D(_gl.TEXTURE_CUBE_MAP_POSITIVE_X + i2, j2 + 1, 0, 0, mipmapImage.width, mipmapImage.height, glFormat, glType, mipmapImage.data);
                  }
                } else {
                  state.texImage2D(_gl.TEXTURE_CUBE_MAP_POSITIVE_X + i2, j2 + 1, glInternalFormat, mipmapImage.width, mipmapImage.height, 0, glFormat, glType, mipmapImage.data);
                }
              }
            } else {
              if (useTexStorage) {
                if (dataReady) {
                  state.texSubImage2D(_gl.TEXTURE_CUBE_MAP_POSITIVE_X + i2, 0, 0, 0, glFormat, glType, cubeImage[i2]);
                }
              } else {
                state.texImage2D(_gl.TEXTURE_CUBE_MAP_POSITIVE_X + i2, 0, glInternalFormat, glFormat, glType, cubeImage[i2]);
              }
              for (let j2 = 0; j2 < mipmaps.length; j2++) {
                const mipmap = mipmaps[j2];
                if (useTexStorage) {
                  if (dataReady) {
                    state.texSubImage2D(_gl.TEXTURE_CUBE_MAP_POSITIVE_X + i2, j2 + 1, 0, 0, glFormat, glType, mipmap.image[i2]);
                  }
                } else {
                  state.texImage2D(_gl.TEXTURE_CUBE_MAP_POSITIVE_X + i2, j2 + 1, glInternalFormat, glFormat, glType, mipmap.image[i2]);
                }
              }
            }
          }
        }
        if (textureNeedsGenerateMipmaps(texture)) {
          generateMipmap(_gl.TEXTURE_CUBE_MAP);
        }
        sourceProperties.__version = source.version;
        if (texture.onUpdate) texture.onUpdate(texture);
      }
      textureProperties.__version = texture.version;
    }
    function setupFrameBufferTexture(framebuffer, renderTarget, texture, attachment, textureTarget, level) {
      const glFormat = utils.convert(texture.format, texture.colorSpace);
      const glType = utils.convert(texture.type);
      const glInternalFormat = getInternalFormat(texture.internalFormat, glFormat, glType, texture.colorSpace);
      const renderTargetProperties = properties.get(renderTarget);
      const textureProperties = properties.get(texture);
      textureProperties.__renderTarget = renderTarget;
      if (!renderTargetProperties.__hasExternalTextures) {
        const width = Math.max(1, renderTarget.width >> level);
        const height = Math.max(1, renderTarget.height >> level);
        if (textureTarget === _gl.TEXTURE_3D || textureTarget === _gl.TEXTURE_2D_ARRAY) {
          state.texImage3D(textureTarget, level, glInternalFormat, width, height, renderTarget.depth, 0, glFormat, glType, null);
        } else {
          state.texImage2D(textureTarget, level, glInternalFormat, width, height, 0, glFormat, glType, null);
        }
      }
      state.bindFramebuffer(_gl.FRAMEBUFFER, framebuffer);
      if (useMultisampledRTT(renderTarget)) {
        multisampledRTTExt.framebufferTexture2DMultisampleEXT(_gl.FRAMEBUFFER, attachment, textureTarget, textureProperties.__webglTexture, 0, getRenderTargetSamples(renderTarget));
      } else if (textureTarget === _gl.TEXTURE_2D || textureTarget >= _gl.TEXTURE_CUBE_MAP_POSITIVE_X && textureTarget <= _gl.TEXTURE_CUBE_MAP_NEGATIVE_Z) {
        _gl.framebufferTexture2D(_gl.FRAMEBUFFER, attachment, textureTarget, textureProperties.__webglTexture, level);
      }
      state.bindFramebuffer(_gl.FRAMEBUFFER, null);
    }
    function setupRenderBufferStorage(renderbuffer, renderTarget, isMultisample) {
      _gl.bindRenderbuffer(_gl.RENDERBUFFER, renderbuffer);
      if (renderTarget.depthBuffer) {
        const depthTexture = renderTarget.depthTexture;
        const depthType = depthTexture && depthTexture.isDepthTexture ? depthTexture.type : null;
        const glInternalFormat = getInternalDepthFormat(renderTarget.stencilBuffer, depthType);
        const glAttachmentType = renderTarget.stencilBuffer ? _gl.DEPTH_STENCIL_ATTACHMENT : _gl.DEPTH_ATTACHMENT;
        const samples = getRenderTargetSamples(renderTarget);
        const isUseMultisampledRTT = useMultisampledRTT(renderTarget);
        if (isUseMultisampledRTT) {
          multisampledRTTExt.renderbufferStorageMultisampleEXT(_gl.RENDERBUFFER, samples, glInternalFormat, renderTarget.width, renderTarget.height);
        } else if (isMultisample) {
          _gl.renderbufferStorageMultisample(_gl.RENDERBUFFER, samples, glInternalFormat, renderTarget.width, renderTarget.height);
        } else {
          _gl.renderbufferStorage(_gl.RENDERBUFFER, glInternalFormat, renderTarget.width, renderTarget.height);
        }
        _gl.framebufferRenderbuffer(_gl.FRAMEBUFFER, glAttachmentType, _gl.RENDERBUFFER, renderbuffer);
      } else {
        const textures = renderTarget.textures;
        for (let i2 = 0; i2 < textures.length; i2++) {
          const texture = textures[i2];
          const glFormat = utils.convert(texture.format, texture.colorSpace);
          const glType = utils.convert(texture.type);
          const glInternalFormat = getInternalFormat(texture.internalFormat, glFormat, glType, texture.colorSpace);
          const samples = getRenderTargetSamples(renderTarget);
          if (isMultisample && useMultisampledRTT(renderTarget) === false) {
            _gl.renderbufferStorageMultisample(_gl.RENDERBUFFER, samples, glInternalFormat, renderTarget.width, renderTarget.height);
          } else if (useMultisampledRTT(renderTarget)) {
            multisampledRTTExt.renderbufferStorageMultisampleEXT(_gl.RENDERBUFFER, samples, glInternalFormat, renderTarget.width, renderTarget.height);
          } else {
            _gl.renderbufferStorage(_gl.RENDERBUFFER, glInternalFormat, renderTarget.width, renderTarget.height);
          }
        }
      }
      _gl.bindRenderbuffer(_gl.RENDERBUFFER, null);
    }
    function setupDepthTexture(framebuffer, renderTarget) {
      const isCube = renderTarget && renderTarget.isWebGLCubeRenderTarget;
      if (isCube) throw new Error("Depth Texture with cube render targets is not supported");
      state.bindFramebuffer(_gl.FRAMEBUFFER, framebuffer);
      if (!(renderTarget.depthTexture && renderTarget.depthTexture.isDepthTexture)) {
        throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");
      }
      const textureProperties = properties.get(renderTarget.depthTexture);
      textureProperties.__renderTarget = renderTarget;
      if (!textureProperties.__webglTexture || renderTarget.depthTexture.image.width !== renderTarget.width || renderTarget.depthTexture.image.height !== renderTarget.height) {
        renderTarget.depthTexture.image.width = renderTarget.width;
        renderTarget.depthTexture.image.height = renderTarget.height;
        renderTarget.depthTexture.needsUpdate = true;
      }
      setTexture2D(renderTarget.depthTexture, 0);
      const webglDepthTexture = textureProperties.__webglTexture;
      const samples = getRenderTargetSamples(renderTarget);
      if (renderTarget.depthTexture.format === DepthFormat) {
        if (useMultisampledRTT(renderTarget)) {
          multisampledRTTExt.framebufferTexture2DMultisampleEXT(_gl.FRAMEBUFFER, _gl.DEPTH_ATTACHMENT, _gl.TEXTURE_2D, webglDepthTexture, 0, samples);
        } else {
          _gl.framebufferTexture2D(_gl.FRAMEBUFFER, _gl.DEPTH_ATTACHMENT, _gl.TEXTURE_2D, webglDepthTexture, 0);
        }
      } else if (renderTarget.depthTexture.format === DepthStencilFormat) {
        if (useMultisampledRTT(renderTarget)) {
          multisampledRTTExt.framebufferTexture2DMultisampleEXT(_gl.FRAMEBUFFER, _gl.DEPTH_STENCIL_ATTACHMENT, _gl.TEXTURE_2D, webglDepthTexture, 0, samples);
        } else {
          _gl.framebufferTexture2D(_gl.FRAMEBUFFER, _gl.DEPTH_STENCIL_ATTACHMENT, _gl.TEXTURE_2D, webglDepthTexture, 0);
        }
      } else {
        throw new Error("Unknown depthTexture format");
      }
    }
    function setupDepthRenderbuffer(renderTarget) {
      const renderTargetProperties = properties.get(renderTarget);
      const isCube = renderTarget.isWebGLCubeRenderTarget === true;
      if (renderTargetProperties.__boundDepthTexture !== renderTarget.depthTexture) {
        const depthTexture = renderTarget.depthTexture;
        if (renderTargetProperties.__depthDisposeCallback) {
          renderTargetProperties.__depthDisposeCallback();
        }
        if (depthTexture) {
          const disposeEvent = () => {
            delete renderTargetProperties.__boundDepthTexture;
            delete renderTargetProperties.__depthDisposeCallback;
            depthTexture.removeEventListener("dispose", disposeEvent);
          };
          depthTexture.addEventListener("dispose", disposeEvent);
          renderTargetProperties.__depthDisposeCallback = disposeEvent;
        }
        renderTargetProperties.__boundDepthTexture = depthTexture;
      }
      if (renderTarget.depthTexture && !renderTargetProperties.__autoAllocateDepthBuffer) {
        if (isCube) throw new Error("target.depthTexture not supported in Cube render targets");
        setupDepthTexture(renderTargetProperties.__webglFramebuffer, renderTarget);
      } else {
        if (isCube) {
          renderTargetProperties.__webglDepthbuffer = [];
          for (let i2 = 0; i2 < 6; i2++) {
            state.bindFramebuffer(_gl.FRAMEBUFFER, renderTargetProperties.__webglFramebuffer[i2]);
            if (renderTargetProperties.__webglDepthbuffer[i2] === void 0) {
              renderTargetProperties.__webglDepthbuffer[i2] = _gl.createRenderbuffer();
              setupRenderBufferStorage(renderTargetProperties.__webglDepthbuffer[i2], renderTarget, false);
            } else {
              const glAttachmentType = renderTarget.stencilBuffer ? _gl.DEPTH_STENCIL_ATTACHMENT : _gl.DEPTH_ATTACHMENT;
              const renderbuffer = renderTargetProperties.__webglDepthbuffer[i2];
              _gl.bindRenderbuffer(_gl.RENDERBUFFER, renderbuffer);
              _gl.framebufferRenderbuffer(_gl.FRAMEBUFFER, glAttachmentType, _gl.RENDERBUFFER, renderbuffer);
            }
          }
        } else {
          state.bindFramebuffer(_gl.FRAMEBUFFER, renderTargetProperties.__webglFramebuffer);
          if (renderTargetProperties.__webglDepthbuffer === void 0) {
            renderTargetProperties.__webglDepthbuffer = _gl.createRenderbuffer();
            setupRenderBufferStorage(renderTargetProperties.__webglDepthbuffer, renderTarget, false);
          } else {
            const glAttachmentType = renderTarget.stencilBuffer ? _gl.DEPTH_STENCIL_ATTACHMENT : _gl.DEPTH_ATTACHMENT;
            const renderbuffer = renderTargetProperties.__webglDepthbuffer;
            _gl.bindRenderbuffer(_gl.RENDERBUFFER, renderbuffer);
            _gl.framebufferRenderbuffer(_gl.FRAMEBUFFER, glAttachmentType, _gl.RENDERBUFFER, renderbuffer);
          }
        }
      }
      state.bindFramebuffer(_gl.FRAMEBUFFER, null);
    }
    function rebindTextures(renderTarget, colorTexture, depthTexture) {
      const renderTargetProperties = properties.get(renderTarget);
      if (colorTexture !== void 0) {
        setupFrameBufferTexture(renderTargetProperties.__webglFramebuffer, renderTarget, renderTarget.texture, _gl.COLOR_ATTACHMENT0, _gl.TEXTURE_2D, 0);
      }
      if (depthTexture !== void 0) {
        setupDepthRenderbuffer(renderTarget);
      }
    }
    function setupRenderTarget(renderTarget) {
      const texture = renderTarget.texture;
      const renderTargetProperties = properties.get(renderTarget);
      const textureProperties = properties.get(texture);
      renderTarget.addEventListener("dispose", onRenderTargetDispose);
      const textures = renderTarget.textures;
      const isCube = renderTarget.isWebGLCubeRenderTarget === true;
      const isMultipleRenderTargets = textures.length > 1;
      if (!isMultipleRenderTargets) {
        if (textureProperties.__webglTexture === void 0) {
          textureProperties.__webglTexture = _gl.createTexture();
        }
        textureProperties.__version = texture.version;
        info.memory.textures++;
      }
      if (isCube) {
        renderTargetProperties.__webglFramebuffer = [];
        for (let i2 = 0; i2 < 6; i2++) {
          if (texture.mipmaps && texture.mipmaps.length > 0) {
            renderTargetProperties.__webglFramebuffer[i2] = [];
            for (let level = 0; level < texture.mipmaps.length; level++) {
              renderTargetProperties.__webglFramebuffer[i2][level] = _gl.createFramebuffer();
            }
          } else {
            renderTargetProperties.__webglFramebuffer[i2] = _gl.createFramebuffer();
          }
        }
      } else {
        if (texture.mipmaps && texture.mipmaps.length > 0) {
          renderTargetProperties.__webglFramebuffer = [];
          for (let level = 0; level < texture.mipmaps.length; level++) {
            renderTargetProperties.__webglFramebuffer[level] = _gl.createFramebuffer();
          }
        } else {
          renderTargetProperties.__webglFramebuffer = _gl.createFramebuffer();
        }
        if (isMultipleRenderTargets) {
          for (let i2 = 0, il = textures.length; i2 < il; i2++) {
            const attachmentProperties = properties.get(textures[i2]);
            if (attachmentProperties.__webglTexture === void 0) {
              attachmentProperties.__webglTexture = _gl.createTexture();
              info.memory.textures++;
            }
          }
        }
        if (renderTarget.samples > 0 && useMultisampledRTT(renderTarget) === false) {
          renderTargetProperties.__webglMultisampledFramebuffer = _gl.createFramebuffer();
          renderTargetProperties.__webglColorRenderbuffer = [];
          state.bindFramebuffer(_gl.FRAMEBUFFER, renderTargetProperties.__webglMultisampledFramebuffer);
          for (let i2 = 0; i2 < textures.length; i2++) {
            const texture2 = textures[i2];
            renderTargetProperties.__webglColorRenderbuffer[i2] = _gl.createRenderbuffer();
            _gl.bindRenderbuffer(_gl.RENDERBUFFER, renderTargetProperties.__webglColorRenderbuffer[i2]);
            const glFormat = utils.convert(texture2.format, texture2.colorSpace);
            const glType = utils.convert(texture2.type);
            const glInternalFormat = getInternalFormat(texture2.internalFormat, glFormat, glType, texture2.colorSpace, renderTarget.isXRRenderTarget === true);
            const samples = getRenderTargetSamples(renderTarget);
            _gl.renderbufferStorageMultisample(_gl.RENDERBUFFER, samples, glInternalFormat, renderTarget.width, renderTarget.height);
            _gl.framebufferRenderbuffer(_gl.FRAMEBUFFER, _gl.COLOR_ATTACHMENT0 + i2, _gl.RENDERBUFFER, renderTargetProperties.__webglColorRenderbuffer[i2]);
          }
          _gl.bindRenderbuffer(_gl.RENDERBUFFER, null);
          if (renderTarget.depthBuffer) {
            renderTargetProperties.__webglDepthRenderbuffer = _gl.createRenderbuffer();
            setupRenderBufferStorage(renderTargetProperties.__webglDepthRenderbuffer, renderTarget, true);
          }
          state.bindFramebuffer(_gl.FRAMEBUFFER, null);
        }
      }
      if (isCube) {
        state.bindTexture(_gl.TEXTURE_CUBE_MAP, textureProperties.__webglTexture);
        setTextureParameters(_gl.TEXTURE_CUBE_MAP, texture);
        for (let i2 = 0; i2 < 6; i2++) {
          if (texture.mipmaps && texture.mipmaps.length > 0) {
            for (let level = 0; level < texture.mipmaps.length; level++) {
              setupFrameBufferTexture(renderTargetProperties.__webglFramebuffer[i2][level], renderTarget, texture, _gl.COLOR_ATTACHMENT0, _gl.TEXTURE_CUBE_MAP_POSITIVE_X + i2, level);
            }
          } else {
            setupFrameBufferTexture(renderTargetProperties.__webglFramebuffer[i2], renderTarget, texture, _gl.COLOR_ATTACHMENT0, _gl.TEXTURE_CUBE_MAP_POSITIVE_X + i2, 0);
          }
        }
        if (textureNeedsGenerateMipmaps(texture)) {
          generateMipmap(_gl.TEXTURE_CUBE_MAP);
        }
        state.unbindTexture();
      } else if (isMultipleRenderTargets) {
        for (let i2 = 0, il = textures.length; i2 < il; i2++) {
          const attachment = textures[i2];
          const attachmentProperties = properties.get(attachment);
          state.bindTexture(_gl.TEXTURE_2D, attachmentProperties.__webglTexture);
          setTextureParameters(_gl.TEXTURE_2D, attachment);
          setupFrameBufferTexture(renderTargetProperties.__webglFramebuffer, renderTarget, attachment, _gl.COLOR_ATTACHMENT0 + i2, _gl.TEXTURE_2D, 0);
          if (textureNeedsGenerateMipmaps(attachment)) {
            generateMipmap(_gl.TEXTURE_2D);
          }
        }
        state.unbindTexture();
      } else {
        let glTextureType = _gl.TEXTURE_2D;
        if (renderTarget.isWebGL3DRenderTarget || renderTarget.isWebGLArrayRenderTarget) {
          glTextureType = renderTarget.isWebGL3DRenderTarget ? _gl.TEXTURE_3D : _gl.TEXTURE_2D_ARRAY;
        }
        state.bindTexture(glTextureType, textureProperties.__webglTexture);
        setTextureParameters(glTextureType, texture);
        if (texture.mipmaps && texture.mipmaps.length > 0) {
          for (let level = 0; level < texture.mipmaps.length; level++) {
            setupFrameBufferTexture(renderTargetProperties.__webglFramebuffer[level], renderTarget, texture, _gl.COLOR_ATTACHMENT0, glTextureType, level);
          }
        } else {
          setupFrameBufferTexture(renderTargetProperties.__webglFramebuffer, renderTarget, texture, _gl.COLOR_ATTACHMENT0, glTextureType, 0);
        }
        if (textureNeedsGenerateMipmaps(texture)) {
          generateMipmap(glTextureType);
        }
        state.unbindTexture();
      }
      if (renderTarget.depthBuffer) {
        setupDepthRenderbuffer(renderTarget);
      }
    }
    function updateRenderTargetMipmap(renderTarget) {
      const textures = renderTarget.textures;
      for (let i2 = 0, il = textures.length; i2 < il; i2++) {
        const texture = textures[i2];
        if (textureNeedsGenerateMipmaps(texture)) {
          const targetType = getTargetType(renderTarget);
          const webglTexture = properties.get(texture).__webglTexture;
          state.bindTexture(targetType, webglTexture);
          generateMipmap(targetType);
          state.unbindTexture();
        }
      }
    }
    const invalidationArrayRead = [];
    const invalidationArrayDraw = [];
    function updateMultisampleRenderTarget(renderTarget) {
      if (renderTarget.samples > 0) {
        if (useMultisampledRTT(renderTarget) === false) {
          const textures = renderTarget.textures;
          const width = renderTarget.width;
          const height = renderTarget.height;
          let mask = _gl.COLOR_BUFFER_BIT;
          const depthStyle = renderTarget.stencilBuffer ? _gl.DEPTH_STENCIL_ATTACHMENT : _gl.DEPTH_ATTACHMENT;
          const renderTargetProperties = properties.get(renderTarget);
          const isMultipleRenderTargets = textures.length > 1;
          if (isMultipleRenderTargets) {
            for (let i2 = 0; i2 < textures.length; i2++) {
              state.bindFramebuffer(_gl.FRAMEBUFFER, renderTargetProperties.__webglMultisampledFramebuffer);
              _gl.framebufferRenderbuffer(_gl.FRAMEBUFFER, _gl.COLOR_ATTACHMENT0 + i2, _gl.RENDERBUFFER, null);
              state.bindFramebuffer(_gl.FRAMEBUFFER, renderTargetProperties.__webglFramebuffer);
              _gl.framebufferTexture2D(_gl.DRAW_FRAMEBUFFER, _gl.COLOR_ATTACHMENT0 + i2, _gl.TEXTURE_2D, null, 0);
            }
          }
          state.bindFramebuffer(_gl.READ_FRAMEBUFFER, renderTargetProperties.__webglMultisampledFramebuffer);
          state.bindFramebuffer(_gl.DRAW_FRAMEBUFFER, renderTargetProperties.__webglFramebuffer);
          for (let i2 = 0; i2 < textures.length; i2++) {
            if (renderTarget.resolveDepthBuffer) {
              if (renderTarget.depthBuffer) mask |= _gl.DEPTH_BUFFER_BIT;
              if (renderTarget.stencilBuffer && renderTarget.resolveStencilBuffer) mask |= _gl.STENCIL_BUFFER_BIT;
            }
            if (isMultipleRenderTargets) {
              _gl.framebufferRenderbuffer(_gl.READ_FRAMEBUFFER, _gl.COLOR_ATTACHMENT0, _gl.RENDERBUFFER, renderTargetProperties.__webglColorRenderbuffer[i2]);
              const webglTexture = properties.get(textures[i2]).__webglTexture;
              _gl.framebufferTexture2D(_gl.DRAW_FRAMEBUFFER, _gl.COLOR_ATTACHMENT0, _gl.TEXTURE_2D, webglTexture, 0);
            }
            _gl.blitFramebuffer(0, 0, width, height, 0, 0, width, height, mask, _gl.NEAREST);
            if (supportsInvalidateFramebuffer === true) {
              invalidationArrayRead.length = 0;
              invalidationArrayDraw.length = 0;
              invalidationArrayRead.push(_gl.COLOR_ATTACHMENT0 + i2);
              if (renderTarget.depthBuffer && renderTarget.resolveDepthBuffer === false) {
                invalidationArrayRead.push(depthStyle);
                invalidationArrayDraw.push(depthStyle);
                _gl.invalidateFramebuffer(_gl.DRAW_FRAMEBUFFER, invalidationArrayDraw);
              }
              _gl.invalidateFramebuffer(_gl.READ_FRAMEBUFFER, invalidationArrayRead);
            }
          }
          state.bindFramebuffer(_gl.READ_FRAMEBUFFER, null);
          state.bindFramebuffer(_gl.DRAW_FRAMEBUFFER, null);
          if (isMultipleRenderTargets) {
            for (let i2 = 0; i2 < textures.length; i2++) {
              state.bindFramebuffer(_gl.FRAMEBUFFER, renderTargetProperties.__webglMultisampledFramebuffer);
              _gl.framebufferRenderbuffer(_gl.FRAMEBUFFER, _gl.COLOR_ATTACHMENT0 + i2, _gl.RENDERBUFFER, renderTargetProperties.__webglColorRenderbuffer[i2]);
              const webglTexture = properties.get(textures[i2]).__webglTexture;
              state.bindFramebuffer(_gl.FRAMEBUFFER, renderTargetProperties.__webglFramebuffer);
              _gl.framebufferTexture2D(_gl.DRAW_FRAMEBUFFER, _gl.COLOR_ATTACHMENT0 + i2, _gl.TEXTURE_2D, webglTexture, 0);
            }
          }
          state.bindFramebuffer(_gl.DRAW_FRAMEBUFFER, renderTargetProperties.__webglMultisampledFramebuffer);
        } else {
          if (renderTarget.depthBuffer && renderTarget.resolveDepthBuffer === false && supportsInvalidateFramebuffer) {
            const depthStyle = renderTarget.stencilBuffer ? _gl.DEPTH_STENCIL_ATTACHMENT : _gl.DEPTH_ATTACHMENT;
            _gl.invalidateFramebuffer(_gl.DRAW_FRAMEBUFFER, [depthStyle]);
          }
        }
      }
    }
    function getRenderTargetSamples(renderTarget) {
      return Math.min(capabilities.maxSamples, renderTarget.samples);
    }
    function useMultisampledRTT(renderTarget) {
      const renderTargetProperties = properties.get(renderTarget);
      return renderTarget.samples > 0 && extensions.has("WEBGL_multisampled_render_to_texture") === true && renderTargetProperties.__useRenderToTexture !== false;
    }
    function updateVideoTexture(texture) {
      const frame = info.render.frame;
      if (_videoTextures.get(texture) !== frame) {
        _videoTextures.set(texture, frame);
        texture.update();
      }
    }
    function verifyColorSpace(texture, image) {
      const colorSpace = texture.colorSpace;
      const format = texture.format;
      const type = texture.type;
      if (texture.isCompressedTexture === true || texture.isVideoTexture === true) return image;
      if (colorSpace !== LinearSRGBColorSpace && colorSpace !== NoColorSpace) {
        if (ColorManagement.getTransfer(colorSpace) === SRGBTransfer) {
          if (format !== RGBAFormat || type !== UnsignedByteType) {
            console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.");
          }
        } else {
          console.error("THREE.WebGLTextures: Unsupported texture color space:", colorSpace);
        }
      }
      return image;
    }
    function getDimensions(image) {
      if (typeof HTMLImageElement !== "undefined" && image instanceof HTMLImageElement) {
        _imageDimensions.width = image.naturalWidth || image.width;
        _imageDimensions.height = image.naturalHeight || image.height;
      } else if (typeof VideoFrame !== "undefined" && image instanceof VideoFrame) {
        _imageDimensions.width = image.displayWidth;
        _imageDimensions.height = image.displayHeight;
      } else {
        _imageDimensions.width = image.width;
        _imageDimensions.height = image.height;
      }
      return _imageDimensions;
    }
    this.allocateTextureUnit = allocateTextureUnit;
    this.resetTextureUnits = resetTextureUnits;
    this.setTexture2D = setTexture2D;
    this.setTexture2DArray = setTexture2DArray;
    this.setTexture3D = setTexture3D;
    this.setTextureCube = setTextureCube;
    this.rebindTextures = rebindTextures;
    this.setupRenderTarget = setupRenderTarget;
    this.updateRenderTargetMipmap = updateRenderTargetMipmap;
    this.updateMultisampleRenderTarget = updateMultisampleRenderTarget;
    this.setupDepthRenderbuffer = setupDepthRenderbuffer;
    this.setupFrameBufferTexture = setupFrameBufferTexture;
    this.useMultisampledRTT = useMultisampledRTT;
  }
  function WebGLUtils(gl, extensions) {
    function convert(p2, colorSpace = NoColorSpace) {
      let extension;
      const transfer = ColorManagement.getTransfer(colorSpace);
      if (p2 === UnsignedByteType) return gl.UNSIGNED_BYTE;
      if (p2 === UnsignedShort4444Type) return gl.UNSIGNED_SHORT_4_4_4_4;
      if (p2 === UnsignedShort5551Type) return gl.UNSIGNED_SHORT_5_5_5_1;
      if (p2 === UnsignedInt5999Type) return gl.UNSIGNED_INT_5_9_9_9_REV;
      if (p2 === ByteType) return gl.BYTE;
      if (p2 === ShortType) return gl.SHORT;
      if (p2 === UnsignedShortType) return gl.UNSIGNED_SHORT;
      if (p2 === IntType) return gl.INT;
      if (p2 === UnsignedIntType) return gl.UNSIGNED_INT;
      if (p2 === FloatType) return gl.FLOAT;
      if (p2 === HalfFloatType) return gl.HALF_FLOAT;
      if (p2 === AlphaFormat) return gl.ALPHA;
      if (p2 === RGBFormat) return gl.RGB;
      if (p2 === RGBAFormat) return gl.RGBA;
      if (p2 === LuminanceFormat) return gl.LUMINANCE;
      if (p2 === LuminanceAlphaFormat) return gl.LUMINANCE_ALPHA;
      if (p2 === DepthFormat) return gl.DEPTH_COMPONENT;
      if (p2 === DepthStencilFormat) return gl.DEPTH_STENCIL;
      if (p2 === RedFormat) return gl.RED;
      if (p2 === RedIntegerFormat) return gl.RED_INTEGER;
      if (p2 === RGFormat) return gl.RG;
      if (p2 === RGIntegerFormat) return gl.RG_INTEGER;
      if (p2 === RGBAIntegerFormat) return gl.RGBA_INTEGER;
      if (p2 === RGB_S3TC_DXT1_Format || p2 === RGBA_S3TC_DXT1_Format || p2 === RGBA_S3TC_DXT3_Format || p2 === RGBA_S3TC_DXT5_Format) {
        if (transfer === SRGBTransfer) {
          extension = extensions.get("WEBGL_compressed_texture_s3tc_srgb");
          if (extension !== null) {
            if (p2 === RGB_S3TC_DXT1_Format) return extension.COMPRESSED_SRGB_S3TC_DXT1_EXT;
            if (p2 === RGBA_S3TC_DXT1_Format) return extension.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;
            if (p2 === RGBA_S3TC_DXT3_Format) return extension.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;
            if (p2 === RGBA_S3TC_DXT5_Format) return extension.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT;
          } else {
            return null;
          }
        } else {
          extension = extensions.get("WEBGL_compressed_texture_s3tc");
          if (extension !== null) {
            if (p2 === RGB_S3TC_DXT1_Format) return extension.COMPRESSED_RGB_S3TC_DXT1_EXT;
            if (p2 === RGBA_S3TC_DXT1_Format) return extension.COMPRESSED_RGBA_S3TC_DXT1_EXT;
            if (p2 === RGBA_S3TC_DXT3_Format) return extension.COMPRESSED_RGBA_S3TC_DXT3_EXT;
            if (p2 === RGBA_S3TC_DXT5_Format) return extension.COMPRESSED_RGBA_S3TC_DXT5_EXT;
          } else {
            return null;
          }
        }
      }
      if (p2 === RGB_PVRTC_4BPPV1_Format || p2 === RGB_PVRTC_2BPPV1_Format || p2 === RGBA_PVRTC_4BPPV1_Format || p2 === RGBA_PVRTC_2BPPV1_Format) {
        extension = extensions.get("WEBGL_compressed_texture_pvrtc");
        if (extension !== null) {
          if (p2 === RGB_PVRTC_4BPPV1_Format) return extension.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
          if (p2 === RGB_PVRTC_2BPPV1_Format) return extension.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
          if (p2 === RGBA_PVRTC_4BPPV1_Format) return extension.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
          if (p2 === RGBA_PVRTC_2BPPV1_Format) return extension.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
        } else {
          return null;
        }
      }
      if (p2 === RGB_ETC1_Format || p2 === RGB_ETC2_Format || p2 === RGBA_ETC2_EAC_Format) {
        extension = extensions.get("WEBGL_compressed_texture_etc");
        if (extension !== null) {
          if (p2 === RGB_ETC1_Format || p2 === RGB_ETC2_Format) return transfer === SRGBTransfer ? extension.COMPRESSED_SRGB8_ETC2 : extension.COMPRESSED_RGB8_ETC2;
          if (p2 === RGBA_ETC2_EAC_Format) return transfer === SRGBTransfer ? extension.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC : extension.COMPRESSED_RGBA8_ETC2_EAC;
        } else {
          return null;
        }
      }
      if (p2 === RGBA_ASTC_4x4_Format || p2 === RGBA_ASTC_5x4_Format || p2 === RGBA_ASTC_5x5_Format || p2 === RGBA_ASTC_6x5_Format || p2 === RGBA_ASTC_6x6_Format || p2 === RGBA_ASTC_8x5_Format || p2 === RGBA_ASTC_8x6_Format || p2 === RGBA_ASTC_8x8_Format || p2 === RGBA_ASTC_10x5_Format || p2 === RGBA_ASTC_10x6_Format || p2 === RGBA_ASTC_10x8_Format || p2 === RGBA_ASTC_10x10_Format || p2 === RGBA_ASTC_12x10_Format || p2 === RGBA_ASTC_12x12_Format) {
        extension = extensions.get("WEBGL_compressed_texture_astc");
        if (extension !== null) {
          if (p2 === RGBA_ASTC_4x4_Format) return transfer === SRGBTransfer ? extension.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR : extension.COMPRESSED_RGBA_ASTC_4x4_KHR;
          if (p2 === RGBA_ASTC_5x4_Format) return transfer === SRGBTransfer ? extension.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR : extension.COMPRESSED_RGBA_ASTC_5x4_KHR;
          if (p2 === RGBA_ASTC_5x5_Format) return transfer === SRGBTransfer ? extension.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR : extension.COMPRESSED_RGBA_ASTC_5x5_KHR;
          if (p2 === RGBA_ASTC_6x5_Format) return transfer === SRGBTransfer ? extension.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR : extension.COMPRESSED_RGBA_ASTC_6x5_KHR;
          if (p2 === RGBA_ASTC_6x6_Format) return transfer === SRGBTransfer ? extension.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR : extension.COMPRESSED_RGBA_ASTC_6x6_KHR;
          if (p2 === RGBA_ASTC_8x5_Format) return transfer === SRGBTransfer ? extension.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR : extension.COMPRESSED_RGBA_ASTC_8x5_KHR;
          if (p2 === RGBA_ASTC_8x6_Format) return transfer === SRGBTransfer ? extension.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR : extension.COMPRESSED_RGBA_ASTC_8x6_KHR;
          if (p2 === RGBA_ASTC_8x8_Format) return transfer === SRGBTransfer ? extension.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR : extension.COMPRESSED_RGBA_ASTC_8x8_KHR;
          if (p2 === RGBA_ASTC_10x5_Format) return transfer === SRGBTransfer ? extension.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR : extension.COMPRESSED_RGBA_ASTC_10x5_KHR;
          if (p2 === RGBA_ASTC_10x6_Format) return transfer === SRGBTransfer ? extension.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR : extension.COMPRESSED_RGBA_ASTC_10x6_KHR;
          if (p2 === RGBA_ASTC_10x8_Format) return transfer === SRGBTransfer ? extension.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR : extension.COMPRESSED_RGBA_ASTC_10x8_KHR;
          if (p2 === RGBA_ASTC_10x10_Format) return transfer === SRGBTransfer ? extension.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR : extension.COMPRESSED_RGBA_ASTC_10x10_KHR;
          if (p2 === RGBA_ASTC_12x10_Format) return transfer === SRGBTransfer ? extension.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR : extension.COMPRESSED_RGBA_ASTC_12x10_KHR;
          if (p2 === RGBA_ASTC_12x12_Format) return transfer === SRGBTransfer ? extension.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR : extension.COMPRESSED_RGBA_ASTC_12x12_KHR;
        } else {
          return null;
        }
      }
      if (p2 === RGBA_BPTC_Format || p2 === RGB_BPTC_SIGNED_Format || p2 === RGB_BPTC_UNSIGNED_Format) {
        extension = extensions.get("EXT_texture_compression_bptc");
        if (extension !== null) {
          if (p2 === RGBA_BPTC_Format) return transfer === SRGBTransfer ? extension.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT : extension.COMPRESSED_RGBA_BPTC_UNORM_EXT;
          if (p2 === RGB_BPTC_SIGNED_Format) return extension.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;
          if (p2 === RGB_BPTC_UNSIGNED_Format) return extension.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT;
        } else {
          return null;
        }
      }
      if (p2 === RED_RGTC1_Format || p2 === SIGNED_RED_RGTC1_Format || p2 === RED_GREEN_RGTC2_Format || p2 === SIGNED_RED_GREEN_RGTC2_Format) {
        extension = extensions.get("EXT_texture_compression_rgtc");
        if (extension !== null) {
          if (p2 === RGBA_BPTC_Format) return extension.COMPRESSED_RED_RGTC1_EXT;
          if (p2 === SIGNED_RED_RGTC1_Format) return extension.COMPRESSED_SIGNED_RED_RGTC1_EXT;
          if (p2 === RED_GREEN_RGTC2_Format) return extension.COMPRESSED_RED_GREEN_RGTC2_EXT;
          if (p2 === SIGNED_RED_GREEN_RGTC2_Format) return extension.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT;
        } else {
          return null;
        }
      }
      if (p2 === UnsignedInt248Type) return gl.UNSIGNED_INT_24_8;
      return gl[p2] !== void 0 ? gl[p2] : null;
    }
    return { convert };
  }
  var _moveEvent = { type: "move" };
  var WebXRController = class {
    constructor() {
      this._targetRay = null;
      this._grip = null;
      this._hand = null;
    }
    getHandSpace() {
      if (this._hand === null) {
        this._hand = new Group();
        this._hand.matrixAutoUpdate = false;
        this._hand.visible = false;
        this._hand.joints = {};
        this._hand.inputState = { pinching: false };
      }
      return this._hand;
    }
    getTargetRaySpace() {
      if (this._targetRay === null) {
        this._targetRay = new Group();
        this._targetRay.matrixAutoUpdate = false;
        this._targetRay.visible = false;
        this._targetRay.hasLinearVelocity = false;
        this._targetRay.linearVelocity = new Vector3();
        this._targetRay.hasAngularVelocity = false;
        this._targetRay.angularVelocity = new Vector3();
      }
      return this._targetRay;
    }
    getGripSpace() {
      if (this._grip === null) {
        this._grip = new Group();
        this._grip.matrixAutoUpdate = false;
        this._grip.visible = false;
        this._grip.hasLinearVelocity = false;
        this._grip.linearVelocity = new Vector3();
        this._grip.hasAngularVelocity = false;
        this._grip.angularVelocity = new Vector3();
      }
      return this._grip;
    }
    dispatchEvent(event) {
      if (this._targetRay !== null) {
        this._targetRay.dispatchEvent(event);
      }
      if (this._grip !== null) {
        this._grip.dispatchEvent(event);
      }
      if (this._hand !== null) {
        this._hand.dispatchEvent(event);
      }
      return this;
    }
    connect(inputSource) {
      if (inputSource && inputSource.hand) {
        const hand = this._hand;
        if (hand) {
          for (const inputjoint of inputSource.hand.values()) {
            this._getHandJoint(hand, inputjoint);
          }
        }
      }
      this.dispatchEvent({ type: "connected", data: inputSource });
      return this;
    }
    disconnect(inputSource) {
      this.dispatchEvent({ type: "disconnected", data: inputSource });
      if (this._targetRay !== null) {
        this._targetRay.visible = false;
      }
      if (this._grip !== null) {
        this._grip.visible = false;
      }
      if (this._hand !== null) {
        this._hand.visible = false;
      }
      return this;
    }
    update(inputSource, frame, referenceSpace) {
      let inputPose = null;
      let gripPose = null;
      let handPose = null;
      const targetRay = this._targetRay;
      const grip = this._grip;
      const hand = this._hand;
      if (inputSource && frame.session.visibilityState !== "visible-blurred") {
        if (hand && inputSource.hand) {
          handPose = true;
          for (const inputjoint of inputSource.hand.values()) {
            const jointPose = frame.getJointPose(inputjoint, referenceSpace);
            const joint = this._getHandJoint(hand, inputjoint);
            if (jointPose !== null) {
              joint.matrix.fromArray(jointPose.transform.matrix);
              joint.matrix.decompose(joint.position, joint.rotation, joint.scale);
              joint.matrixWorldNeedsUpdate = true;
              joint.jointRadius = jointPose.radius;
            }
            joint.visible = jointPose !== null;
          }
          const indexTip = hand.joints["index-finger-tip"];
          const thumbTip = hand.joints["thumb-tip"];
          const distance = indexTip.position.distanceTo(thumbTip.position);
          const distanceToPinch = 0.02;
          const threshold = 5e-3;
          if (hand.inputState.pinching && distance > distanceToPinch + threshold) {
            hand.inputState.pinching = false;
            this.dispatchEvent({
              type: "pinchend",
              handedness: inputSource.handedness,
              target: this
            });
          } else if (!hand.inputState.pinching && distance <= distanceToPinch - threshold) {
            hand.inputState.pinching = true;
            this.dispatchEvent({
              type: "pinchstart",
              handedness: inputSource.handedness,
              target: this
            });
          }
        } else {
          if (grip !== null && inputSource.gripSpace) {
            gripPose = frame.getPose(inputSource.gripSpace, referenceSpace);
            if (gripPose !== null) {
              grip.matrix.fromArray(gripPose.transform.matrix);
              grip.matrix.decompose(grip.position, grip.rotation, grip.scale);
              grip.matrixWorldNeedsUpdate = true;
              if (gripPose.linearVelocity) {
                grip.hasLinearVelocity = true;
                grip.linearVelocity.copy(gripPose.linearVelocity);
              } else {
                grip.hasLinearVelocity = false;
              }
              if (gripPose.angularVelocity) {
                grip.hasAngularVelocity = true;
                grip.angularVelocity.copy(gripPose.angularVelocity);
              } else {
                grip.hasAngularVelocity = false;
              }
            }
          }
        }
        if (targetRay !== null) {
          inputPose = frame.getPose(inputSource.targetRaySpace, referenceSpace);
          if (inputPose === null && gripPose !== null) {
            inputPose = gripPose;
          }
          if (inputPose !== null) {
            targetRay.matrix.fromArray(inputPose.transform.matrix);
            targetRay.matrix.decompose(targetRay.position, targetRay.rotation, targetRay.scale);
            targetRay.matrixWorldNeedsUpdate = true;
            if (inputPose.linearVelocity) {
              targetRay.hasLinearVelocity = true;
              targetRay.linearVelocity.copy(inputPose.linearVelocity);
            } else {
              targetRay.hasLinearVelocity = false;
            }
            if (inputPose.angularVelocity) {
              targetRay.hasAngularVelocity = true;
              targetRay.angularVelocity.copy(inputPose.angularVelocity);
            } else {
              targetRay.hasAngularVelocity = false;
            }
            this.dispatchEvent(_moveEvent);
          }
        }
      }
      if (targetRay !== null) {
        targetRay.visible = inputPose !== null;
      }
      if (grip !== null) {
        grip.visible = gripPose !== null;
      }
      if (hand !== null) {
        hand.visible = handPose !== null;
      }
      return this;
    }
    // private method
    _getHandJoint(hand, inputjoint) {
      if (hand.joints[inputjoint.jointName] === void 0) {
        const joint = new Group();
        joint.matrixAutoUpdate = false;
        joint.visible = false;
        hand.joints[inputjoint.jointName] = joint;
        hand.add(joint);
      }
      return hand.joints[inputjoint.jointName];
    }
  };
  var _occlusion_vertex = `
void main() {

	gl_Position = vec4( position, 1.0 );

}`;
  var _occlusion_fragment = `
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;
  var WebXRDepthSensing = class {
    constructor() {
      this.texture = null;
      this.mesh = null;
      this.depthNear = 0;
      this.depthFar = 0;
    }
    init(renderer2, depthData, renderState) {
      if (this.texture === null) {
        const texture = new Texture();
        const texProps = renderer2.properties.get(texture);
        texProps.__webglTexture = depthData.texture;
        if (depthData.depthNear != renderState.depthNear || depthData.depthFar != renderState.depthFar) {
          this.depthNear = depthData.depthNear;
          this.depthFar = depthData.depthFar;
        }
        this.texture = texture;
      }
    }
    getMesh(cameraXR) {
      if (this.texture !== null) {
        if (this.mesh === null) {
          const viewport = cameraXR.cameras[0].viewport;
          const material2 = new ShaderMaterial({
            vertexShader: _occlusion_vertex,
            fragmentShader: _occlusion_fragment,
            uniforms: {
              depthColor: { value: this.texture },
              depthWidth: { value: viewport.z },
              depthHeight: { value: viewport.w }
            }
          });
          this.mesh = new Mesh(new PlaneGeometry(20, 20), material2);
        }
      }
      return this.mesh;
    }
    reset() {
      this.texture = null;
      this.mesh = null;
    }
    getDepthTexture() {
      return this.texture;
    }
  };
  var WebXRManager = class extends EventDispatcher {
    constructor(renderer2, gl) {
      super();
      const scope = this;
      let session = null;
      let framebufferScaleFactor = 1;
      let referenceSpace = null;
      let referenceSpaceType = "local-floor";
      let foveation = 1;
      let customReferenceSpace = null;
      let pose = null;
      let glBinding = null;
      let glProjLayer = null;
      let glBaseLayer = null;
      let xrFrame = null;
      const depthSensing = new WebXRDepthSensing();
      const attributes = gl.getContextAttributes();
      let initialRenderTarget = null;
      let newRenderTarget = null;
      const controllers = [];
      const controllerInputSources = [];
      const currentSize = new Vector2();
      let currentPixelRatio = null;
      const cameraL = new PerspectiveCamera();
      cameraL.viewport = new Vector4();
      const cameraR = new PerspectiveCamera();
      cameraR.viewport = new Vector4();
      const cameras = [cameraL, cameraR];
      const cameraXR = new ArrayCamera();
      let _currentDepthNear = null;
      let _currentDepthFar = null;
      this.cameraAutoUpdate = true;
      this.enabled = false;
      this.isPresenting = false;
      this.getController = function(index) {
        let controller = controllers[index];
        if (controller === void 0) {
          controller = new WebXRController();
          controllers[index] = controller;
        }
        return controller.getTargetRaySpace();
      };
      this.getControllerGrip = function(index) {
        let controller = controllers[index];
        if (controller === void 0) {
          controller = new WebXRController();
          controllers[index] = controller;
        }
        return controller.getGripSpace();
      };
      this.getHand = function(index) {
        let controller = controllers[index];
        if (controller === void 0) {
          controller = new WebXRController();
          controllers[index] = controller;
        }
        return controller.getHandSpace();
      };
      function onSessionEvent(event) {
        const controllerIndex = controllerInputSources.indexOf(event.inputSource);
        if (controllerIndex === -1) {
          return;
        }
        const controller = controllers[controllerIndex];
        if (controller !== void 0) {
          controller.update(event.inputSource, event.frame, customReferenceSpace || referenceSpace);
          controller.dispatchEvent({ type: event.type, data: event.inputSource });
        }
      }
      function onSessionEnd() {
        session.removeEventListener("select", onSessionEvent);
        session.removeEventListener("selectstart", onSessionEvent);
        session.removeEventListener("selectend", onSessionEvent);
        session.removeEventListener("squeeze", onSessionEvent);
        session.removeEventListener("squeezestart", onSessionEvent);
        session.removeEventListener("squeezeend", onSessionEvent);
        session.removeEventListener("end", onSessionEnd);
        session.removeEventListener("inputsourceschange", onInputSourcesChange);
        for (let i2 = 0; i2 < controllers.length; i2++) {
          const inputSource = controllerInputSources[i2];
          if (inputSource === null) continue;
          controllerInputSources[i2] = null;
          controllers[i2].disconnect(inputSource);
        }
        _currentDepthNear = null;
        _currentDepthFar = null;
        depthSensing.reset();
        renderer2.setRenderTarget(initialRenderTarget);
        glBaseLayer = null;
        glProjLayer = null;
        glBinding = null;
        session = null;
        newRenderTarget = null;
        animation.stop();
        scope.isPresenting = false;
        renderer2.setPixelRatio(currentPixelRatio);
        renderer2.setSize(currentSize.width, currentSize.height, false);
        scope.dispatchEvent({ type: "sessionend" });
      }
      this.setFramebufferScaleFactor = function(value) {
        framebufferScaleFactor = value;
        if (scope.isPresenting === true) {
          console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.");
        }
      };
      this.setReferenceSpaceType = function(value) {
        referenceSpaceType = value;
        if (scope.isPresenting === true) {
          console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.");
        }
      };
      this.getReferenceSpace = function() {
        return customReferenceSpace || referenceSpace;
      };
      this.setReferenceSpace = function(space) {
        customReferenceSpace = space;
      };
      this.getBaseLayer = function() {
        return glProjLayer !== null ? glProjLayer : glBaseLayer;
      };
      this.getBinding = function() {
        return glBinding;
      };
      this.getFrame = function() {
        return xrFrame;
      };
      this.getSession = function() {
        return session;
      };
      this.setSession = async function(value) {
        session = value;
        if (session !== null) {
          initialRenderTarget = renderer2.getRenderTarget();
          session.addEventListener("select", onSessionEvent);
          session.addEventListener("selectstart", onSessionEvent);
          session.addEventListener("selectend", onSessionEvent);
          session.addEventListener("squeeze", onSessionEvent);
          session.addEventListener("squeezestart", onSessionEvent);
          session.addEventListener("squeezeend", onSessionEvent);
          session.addEventListener("end", onSessionEnd);
          session.addEventListener("inputsourceschange", onInputSourcesChange);
          if (attributes.xrCompatible !== true) {
            await gl.makeXRCompatible();
          }
          currentPixelRatio = renderer2.getPixelRatio();
          renderer2.getSize(currentSize);
          if (session.renderState.layers === void 0) {
            const layerInit = {
              antialias: attributes.antialias,
              alpha: true,
              depth: attributes.depth,
              stencil: attributes.stencil,
              framebufferScaleFactor
            };
            glBaseLayer = new XRWebGLLayer(session, gl, layerInit);
            session.updateRenderState({ baseLayer: glBaseLayer });
            renderer2.setPixelRatio(1);
            renderer2.setSize(glBaseLayer.framebufferWidth, glBaseLayer.framebufferHeight, false);
            newRenderTarget = new WebGLRenderTarget(
              glBaseLayer.framebufferWidth,
              glBaseLayer.framebufferHeight,
              {
                format: RGBAFormat,
                type: UnsignedByteType,
                colorSpace: renderer2.outputColorSpace,
                stencilBuffer: attributes.stencil
              }
            );
          } else {
            let depthFormat = null;
            let depthType = null;
            let glDepthFormat = null;
            if (attributes.depth) {
              glDepthFormat = attributes.stencil ? gl.DEPTH24_STENCIL8 : gl.DEPTH_COMPONENT24;
              depthFormat = attributes.stencil ? DepthStencilFormat : DepthFormat;
              depthType = attributes.stencil ? UnsignedInt248Type : UnsignedIntType;
            }
            const projectionlayerInit = {
              colorFormat: gl.RGBA8,
              depthFormat: glDepthFormat,
              scaleFactor: framebufferScaleFactor
            };
            glBinding = new XRWebGLBinding(session, gl);
            glProjLayer = glBinding.createProjectionLayer(projectionlayerInit);
            session.updateRenderState({ layers: [glProjLayer] });
            renderer2.setPixelRatio(1);
            renderer2.setSize(glProjLayer.textureWidth, glProjLayer.textureHeight, false);
            newRenderTarget = new WebGLRenderTarget(
              glProjLayer.textureWidth,
              glProjLayer.textureHeight,
              {
                format: RGBAFormat,
                type: UnsignedByteType,
                depthTexture: new DepthTexture(glProjLayer.textureWidth, glProjLayer.textureHeight, depthType, void 0, void 0, void 0, void 0, void 0, void 0, depthFormat),
                stencilBuffer: attributes.stencil,
                colorSpace: renderer2.outputColorSpace,
                samples: attributes.antialias ? 4 : 0,
                resolveDepthBuffer: glProjLayer.ignoreDepthValues === false
              }
            );
          }
          newRenderTarget.isXRRenderTarget = true;
          this.setFoveation(foveation);
          customReferenceSpace = null;
          referenceSpace = await session.requestReferenceSpace(referenceSpaceType);
          animation.setContext(session);
          animation.start();
          scope.isPresenting = true;
          scope.dispatchEvent({ type: "sessionstart" });
        }
      };
      this.getEnvironmentBlendMode = function() {
        if (session !== null) {
          return session.environmentBlendMode;
        }
      };
      this.getDepthTexture = function() {
        return depthSensing.getDepthTexture();
      };
      function onInputSourcesChange(event) {
        for (let i2 = 0; i2 < event.removed.length; i2++) {
          const inputSource = event.removed[i2];
          const index = controllerInputSources.indexOf(inputSource);
          if (index >= 0) {
            controllerInputSources[index] = null;
            controllers[index].disconnect(inputSource);
          }
        }
        for (let i2 = 0; i2 < event.added.length; i2++) {
          const inputSource = event.added[i2];
          let controllerIndex = controllerInputSources.indexOf(inputSource);
          if (controllerIndex === -1) {
            for (let i3 = 0; i3 < controllers.length; i3++) {
              if (i3 >= controllerInputSources.length) {
                controllerInputSources.push(inputSource);
                controllerIndex = i3;
                break;
              } else if (controllerInputSources[i3] === null) {
                controllerInputSources[i3] = inputSource;
                controllerIndex = i3;
                break;
              }
            }
            if (controllerIndex === -1) break;
          }
          const controller = controllers[controllerIndex];
          if (controller) {
            controller.connect(inputSource);
          }
        }
      }
      const cameraLPos = new Vector3();
      const cameraRPos = new Vector3();
      function setProjectionFromUnion(camera2, cameraL2, cameraR2) {
        cameraLPos.setFromMatrixPosition(cameraL2.matrixWorld);
        cameraRPos.setFromMatrixPosition(cameraR2.matrixWorld);
        const ipd = cameraLPos.distanceTo(cameraRPos);
        const projL = cameraL2.projectionMatrix.elements;
        const projR = cameraR2.projectionMatrix.elements;
        const near = projL[14] / (projL[10] - 1);
        const far = projL[14] / (projL[10] + 1);
        const topFov = (projL[9] + 1) / projL[5];
        const bottomFov = (projL[9] - 1) / projL[5];
        const leftFov = (projL[8] - 1) / projL[0];
        const rightFov = (projR[8] + 1) / projR[0];
        const left = near * leftFov;
        const right = near * rightFov;
        const zOffset = ipd / (-leftFov + rightFov);
        const xOffset = zOffset * -leftFov;
        cameraL2.matrixWorld.decompose(camera2.position, camera2.quaternion, camera2.scale);
        camera2.translateX(xOffset);
        camera2.translateZ(zOffset);
        camera2.matrixWorld.compose(camera2.position, camera2.quaternion, camera2.scale);
        camera2.matrixWorldInverse.copy(camera2.matrixWorld).invert();
        if (projL[10] === -1) {
          camera2.projectionMatrix.copy(cameraL2.projectionMatrix);
          camera2.projectionMatrixInverse.copy(cameraL2.projectionMatrixInverse);
        } else {
          const near2 = near + zOffset;
          const far2 = far + zOffset;
          const left2 = left - xOffset;
          const right2 = right + (ipd - xOffset);
          const top2 = topFov * far / far2 * near2;
          const bottom2 = bottomFov * far / far2 * near2;
          camera2.projectionMatrix.makePerspective(left2, right2, top2, bottom2, near2, far2);
          camera2.projectionMatrixInverse.copy(camera2.projectionMatrix).invert();
        }
      }
      function updateCamera(camera2, parent) {
        if (parent === null) {
          camera2.matrixWorld.copy(camera2.matrix);
        } else {
          camera2.matrixWorld.multiplyMatrices(parent.matrixWorld, camera2.matrix);
        }
        camera2.matrixWorldInverse.copy(camera2.matrixWorld).invert();
      }
      this.updateCamera = function(camera2) {
        if (session === null) return;
        let depthNear = camera2.near;
        let depthFar = camera2.far;
        if (depthSensing.texture !== null) {
          if (depthSensing.depthNear > 0) depthNear = depthSensing.depthNear;
          if (depthSensing.depthFar > 0) depthFar = depthSensing.depthFar;
        }
        cameraXR.near = cameraR.near = cameraL.near = depthNear;
        cameraXR.far = cameraR.far = cameraL.far = depthFar;
        if (_currentDepthNear !== cameraXR.near || _currentDepthFar !== cameraXR.far) {
          session.updateRenderState({
            depthNear: cameraXR.near,
            depthFar: cameraXR.far
          });
          _currentDepthNear = cameraXR.near;
          _currentDepthFar = cameraXR.far;
        }
        cameraL.layers.mask = camera2.layers.mask | 2;
        cameraR.layers.mask = camera2.layers.mask | 4;
        cameraXR.layers.mask = cameraL.layers.mask | cameraR.layers.mask;
        const parent = camera2.parent;
        const cameras2 = cameraXR.cameras;
        updateCamera(cameraXR, parent);
        for (let i2 = 0; i2 < cameras2.length; i2++) {
          updateCamera(cameras2[i2], parent);
        }
        if (cameras2.length === 2) {
          setProjectionFromUnion(cameraXR, cameraL, cameraR);
        } else {
          cameraXR.projectionMatrix.copy(cameraL.projectionMatrix);
        }
        updateUserCamera(camera2, cameraXR, parent);
      };
      function updateUserCamera(camera2, cameraXR2, parent) {
        if (parent === null) {
          camera2.matrix.copy(cameraXR2.matrixWorld);
        } else {
          camera2.matrix.copy(parent.matrixWorld);
          camera2.matrix.invert();
          camera2.matrix.multiply(cameraXR2.matrixWorld);
        }
        camera2.matrix.decompose(camera2.position, camera2.quaternion, camera2.scale);
        camera2.updateMatrixWorld(true);
        camera2.projectionMatrix.copy(cameraXR2.projectionMatrix);
        camera2.projectionMatrixInverse.copy(cameraXR2.projectionMatrixInverse);
        if (camera2.isPerspectiveCamera) {
          camera2.fov = RAD2DEG * 2 * Math.atan(1 / camera2.projectionMatrix.elements[5]);
          camera2.zoom = 1;
        }
      }
      this.getCamera = function() {
        return cameraXR;
      };
      this.getFoveation = function() {
        if (glProjLayer === null && glBaseLayer === null) {
          return void 0;
        }
        return foveation;
      };
      this.setFoveation = function(value) {
        foveation = value;
        if (glProjLayer !== null) {
          glProjLayer.fixedFoveation = value;
        }
        if (glBaseLayer !== null && glBaseLayer.fixedFoveation !== void 0) {
          glBaseLayer.fixedFoveation = value;
        }
      };
      this.hasDepthSensing = function() {
        return depthSensing.texture !== null;
      };
      this.getDepthSensingMesh = function() {
        return depthSensing.getMesh(cameraXR);
      };
      let onAnimationFrameCallback = null;
      function onAnimationFrame(time, frame) {
        pose = frame.getViewerPose(customReferenceSpace || referenceSpace);
        xrFrame = frame;
        if (pose !== null) {
          const views = pose.views;
          if (glBaseLayer !== null) {
            renderer2.setRenderTargetFramebuffer(newRenderTarget, glBaseLayer.framebuffer);
            renderer2.setRenderTarget(newRenderTarget);
          }
          let cameraXRNeedsUpdate = false;
          if (views.length !== cameraXR.cameras.length) {
            cameraXR.cameras.length = 0;
            cameraXRNeedsUpdate = true;
          }
          for (let i2 = 0; i2 < views.length; i2++) {
            const view = views[i2];
            let viewport = null;
            if (glBaseLayer !== null) {
              viewport = glBaseLayer.getViewport(view);
            } else {
              const glSubImage = glBinding.getViewSubImage(glProjLayer, view);
              viewport = glSubImage.viewport;
              if (i2 === 0) {
                renderer2.setRenderTargetTextures(
                  newRenderTarget,
                  glSubImage.colorTexture,
                  glProjLayer.ignoreDepthValues ? void 0 : glSubImage.depthStencilTexture
                );
                renderer2.setRenderTarget(newRenderTarget);
              }
            }
            let camera2 = cameras[i2];
            if (camera2 === void 0) {
              camera2 = new PerspectiveCamera();
              camera2.layers.enable(i2);
              camera2.viewport = new Vector4();
              cameras[i2] = camera2;
            }
            camera2.matrix.fromArray(view.transform.matrix);
            camera2.matrix.decompose(camera2.position, camera2.quaternion, camera2.scale);
            camera2.projectionMatrix.fromArray(view.projectionMatrix);
            camera2.projectionMatrixInverse.copy(camera2.projectionMatrix).invert();
            camera2.viewport.set(viewport.x, viewport.y, viewport.width, viewport.height);
            if (i2 === 0) {
              cameraXR.matrix.copy(camera2.matrix);
              cameraXR.matrix.decompose(cameraXR.position, cameraXR.quaternion, cameraXR.scale);
            }
            if (cameraXRNeedsUpdate === true) {
              cameraXR.cameras.push(camera2);
            }
          }
          const enabledFeatures = session.enabledFeatures;
          if (enabledFeatures && enabledFeatures.includes("depth-sensing")) {
            const depthData = glBinding.getDepthInformation(views[0]);
            if (depthData && depthData.isValid && depthData.texture) {
              depthSensing.init(renderer2, depthData, session.renderState);
            }
          }
        }
        for (let i2 = 0; i2 < controllers.length; i2++) {
          const inputSource = controllerInputSources[i2];
          const controller = controllers[i2];
          if (inputSource !== null && controller !== void 0) {
            controller.update(inputSource, frame, customReferenceSpace || referenceSpace);
          }
        }
        if (onAnimationFrameCallback) onAnimationFrameCallback(time, frame);
        if (frame.detectedPlanes) {
          scope.dispatchEvent({ type: "planesdetected", data: frame });
        }
        xrFrame = null;
      }
      const animation = new WebGLAnimation();
      animation.setAnimationLoop(onAnimationFrame);
      this.setAnimationLoop = function(callback) {
        onAnimationFrameCallback = callback;
      };
      this.dispose = function() {
      };
    }
  };
  var _e1 = /* @__PURE__ */ new Euler();
  var _m12 = /* @__PURE__ */ new Matrix4();
  function WebGLMaterials(renderer2, properties) {
    function refreshTransformUniform(map, uniform) {
      if (map.matrixAutoUpdate === true) {
        map.updateMatrix();
      }
      uniform.value.copy(map.matrix);
    }
    function refreshFogUniforms(uniforms, fog) {
      fog.color.getRGB(uniforms.fogColor.value, getUnlitUniformColorSpace(renderer2));
      if (fog.isFog) {
        uniforms.fogNear.value = fog.near;
        uniforms.fogFar.value = fog.far;
      } else if (fog.isFogExp2) {
        uniforms.fogDensity.value = fog.density;
      }
    }
    function refreshMaterialUniforms(uniforms, material2, pixelRatio, height, transmissionRenderTarget) {
      if (material2.isMeshBasicMaterial) {
        refreshUniformsCommon(uniforms, material2);
      } else if (material2.isMeshLambertMaterial) {
        refreshUniformsCommon(uniforms, material2);
      } else if (material2.isMeshToonMaterial) {
        refreshUniformsCommon(uniforms, material2);
        refreshUniformsToon(uniforms, material2);
      } else if (material2.isMeshPhongMaterial) {
        refreshUniformsCommon(uniforms, material2);
        refreshUniformsPhong(uniforms, material2);
      } else if (material2.isMeshStandardMaterial) {
        refreshUniformsCommon(uniforms, material2);
        refreshUniformsStandard(uniforms, material2);
        if (material2.isMeshPhysicalMaterial) {
          refreshUniformsPhysical(uniforms, material2, transmissionRenderTarget);
        }
      } else if (material2.isMeshMatcapMaterial) {
        refreshUniformsCommon(uniforms, material2);
        refreshUniformsMatcap(uniforms, material2);
      } else if (material2.isMeshDepthMaterial) {
        refreshUniformsCommon(uniforms, material2);
      } else if (material2.isMeshDistanceMaterial) {
        refreshUniformsCommon(uniforms, material2);
        refreshUniformsDistance(uniforms, material2);
      } else if (material2.isMeshNormalMaterial) {
        refreshUniformsCommon(uniforms, material2);
      } else if (material2.isLineBasicMaterial) {
        refreshUniformsLine(uniforms, material2);
        if (material2.isLineDashedMaterial) {
          refreshUniformsDash(uniforms, material2);
        }
      } else if (material2.isPointsMaterial) {
        refreshUniformsPoints(uniforms, material2, pixelRatio, height);
      } else if (material2.isSpriteMaterial) {
        refreshUniformsSprites(uniforms, material2);
      } else if (material2.isShadowMaterial) {
        uniforms.color.value.copy(material2.color);
        uniforms.opacity.value = material2.opacity;
      } else if (material2.isShaderMaterial) {
        material2.uniformsNeedUpdate = false;
      }
    }
    function refreshUniformsCommon(uniforms, material2) {
      uniforms.opacity.value = material2.opacity;
      if (material2.color) {
        uniforms.diffuse.value.copy(material2.color);
      }
      if (material2.emissive) {
        uniforms.emissive.value.copy(material2.emissive).multiplyScalar(material2.emissiveIntensity);
      }
      if (material2.map) {
        uniforms.map.value = material2.map;
        refreshTransformUniform(material2.map, uniforms.mapTransform);
      }
      if (material2.alphaMap) {
        uniforms.alphaMap.value = material2.alphaMap;
        refreshTransformUniform(material2.alphaMap, uniforms.alphaMapTransform);
      }
      if (material2.bumpMap) {
        uniforms.bumpMap.value = material2.bumpMap;
        refreshTransformUniform(material2.bumpMap, uniforms.bumpMapTransform);
        uniforms.bumpScale.value = material2.bumpScale;
        if (material2.side === BackSide) {
          uniforms.bumpScale.value *= -1;
        }
      }
      if (material2.normalMap) {
        uniforms.normalMap.value = material2.normalMap;
        refreshTransformUniform(material2.normalMap, uniforms.normalMapTransform);
        uniforms.normalScale.value.copy(material2.normalScale);
        if (material2.side === BackSide) {
          uniforms.normalScale.value.negate();
        }
      }
      if (material2.displacementMap) {
        uniforms.displacementMap.value = material2.displacementMap;
        refreshTransformUniform(material2.displacementMap, uniforms.displacementMapTransform);
        uniforms.displacementScale.value = material2.displacementScale;
        uniforms.displacementBias.value = material2.displacementBias;
      }
      if (material2.emissiveMap) {
        uniforms.emissiveMap.value = material2.emissiveMap;
        refreshTransformUniform(material2.emissiveMap, uniforms.emissiveMapTransform);
      }
      if (material2.specularMap) {
        uniforms.specularMap.value = material2.specularMap;
        refreshTransformUniform(material2.specularMap, uniforms.specularMapTransform);
      }
      if (material2.alphaTest > 0) {
        uniforms.alphaTest.value = material2.alphaTest;
      }
      const materialProperties = properties.get(material2);
      const envMap = materialProperties.envMap;
      const envMapRotation = materialProperties.envMapRotation;
      if (envMap) {
        uniforms.envMap.value = envMap;
        _e1.copy(envMapRotation);
        _e1.x *= -1;
        _e1.y *= -1;
        _e1.z *= -1;
        if (envMap.isCubeTexture && envMap.isRenderTargetTexture === false) {
          _e1.y *= -1;
          _e1.z *= -1;
        }
        uniforms.envMapRotation.value.setFromMatrix4(_m12.makeRotationFromEuler(_e1));
        uniforms.flipEnvMap.value = envMap.isCubeTexture && envMap.isRenderTargetTexture === false ? -1 : 1;
        uniforms.reflectivity.value = material2.reflectivity;
        uniforms.ior.value = material2.ior;
        uniforms.refractionRatio.value = material2.refractionRatio;
      }
      if (material2.lightMap) {
        uniforms.lightMap.value = material2.lightMap;
        uniforms.lightMapIntensity.value = material2.lightMapIntensity;
        refreshTransformUniform(material2.lightMap, uniforms.lightMapTransform);
      }
      if (material2.aoMap) {
        uniforms.aoMap.value = material2.aoMap;
        uniforms.aoMapIntensity.value = material2.aoMapIntensity;
        refreshTransformUniform(material2.aoMap, uniforms.aoMapTransform);
      }
    }
    function refreshUniformsLine(uniforms, material2) {
      uniforms.diffuse.value.copy(material2.color);
      uniforms.opacity.value = material2.opacity;
      if (material2.map) {
        uniforms.map.value = material2.map;
        refreshTransformUniform(material2.map, uniforms.mapTransform);
      }
    }
    function refreshUniformsDash(uniforms, material2) {
      uniforms.dashSize.value = material2.dashSize;
      uniforms.totalSize.value = material2.dashSize + material2.gapSize;
      uniforms.scale.value = material2.scale;
    }
    function refreshUniformsPoints(uniforms, material2, pixelRatio, height) {
      uniforms.diffuse.value.copy(material2.color);
      uniforms.opacity.value = material2.opacity;
      uniforms.size.value = material2.size * pixelRatio;
      uniforms.scale.value = height * 0.5;
      if (material2.map) {
        uniforms.map.value = material2.map;
        refreshTransformUniform(material2.map, uniforms.uvTransform);
      }
      if (material2.alphaMap) {
        uniforms.alphaMap.value = material2.alphaMap;
        refreshTransformUniform(material2.alphaMap, uniforms.alphaMapTransform);
      }
      if (material2.alphaTest > 0) {
        uniforms.alphaTest.value = material2.alphaTest;
      }
    }
    function refreshUniformsSprites(uniforms, material2) {
      uniforms.diffuse.value.copy(material2.color);
      uniforms.opacity.value = material2.opacity;
      uniforms.rotation.value = material2.rotation;
      if (material2.map) {
        uniforms.map.value = material2.map;
        refreshTransformUniform(material2.map, uniforms.mapTransform);
      }
      if (material2.alphaMap) {
        uniforms.alphaMap.value = material2.alphaMap;
        refreshTransformUniform(material2.alphaMap, uniforms.alphaMapTransform);
      }
      if (material2.alphaTest > 0) {
        uniforms.alphaTest.value = material2.alphaTest;
      }
    }
    function refreshUniformsPhong(uniforms, material2) {
      uniforms.specular.value.copy(material2.specular);
      uniforms.shininess.value = Math.max(material2.shininess, 1e-4);
    }
    function refreshUniformsToon(uniforms, material2) {
      if (material2.gradientMap) {
        uniforms.gradientMap.value = material2.gradientMap;
      }
    }
    function refreshUniformsStandard(uniforms, material2) {
      uniforms.metalness.value = material2.metalness;
      if (material2.metalnessMap) {
        uniforms.metalnessMap.value = material2.metalnessMap;
        refreshTransformUniform(material2.metalnessMap, uniforms.metalnessMapTransform);
      }
      uniforms.roughness.value = material2.roughness;
      if (material2.roughnessMap) {
        uniforms.roughnessMap.value = material2.roughnessMap;
        refreshTransformUniform(material2.roughnessMap, uniforms.roughnessMapTransform);
      }
      if (material2.envMap) {
        uniforms.envMapIntensity.value = material2.envMapIntensity;
      }
    }
    function refreshUniformsPhysical(uniforms, material2, transmissionRenderTarget) {
      uniforms.ior.value = material2.ior;
      if (material2.sheen > 0) {
        uniforms.sheenColor.value.copy(material2.sheenColor).multiplyScalar(material2.sheen);
        uniforms.sheenRoughness.value = material2.sheenRoughness;
        if (material2.sheenColorMap) {
          uniforms.sheenColorMap.value = material2.sheenColorMap;
          refreshTransformUniform(material2.sheenColorMap, uniforms.sheenColorMapTransform);
        }
        if (material2.sheenRoughnessMap) {
          uniforms.sheenRoughnessMap.value = material2.sheenRoughnessMap;
          refreshTransformUniform(material2.sheenRoughnessMap, uniforms.sheenRoughnessMapTransform);
        }
      }
      if (material2.clearcoat > 0) {
        uniforms.clearcoat.value = material2.clearcoat;
        uniforms.clearcoatRoughness.value = material2.clearcoatRoughness;
        if (material2.clearcoatMap) {
          uniforms.clearcoatMap.value = material2.clearcoatMap;
          refreshTransformUniform(material2.clearcoatMap, uniforms.clearcoatMapTransform);
        }
        if (material2.clearcoatRoughnessMap) {
          uniforms.clearcoatRoughnessMap.value = material2.clearcoatRoughnessMap;
          refreshTransformUniform(material2.clearcoatRoughnessMap, uniforms.clearcoatRoughnessMapTransform);
        }
        if (material2.clearcoatNormalMap) {
          uniforms.clearcoatNormalMap.value = material2.clearcoatNormalMap;
          refreshTransformUniform(material2.clearcoatNormalMap, uniforms.clearcoatNormalMapTransform);
          uniforms.clearcoatNormalScale.value.copy(material2.clearcoatNormalScale);
          if (material2.side === BackSide) {
            uniforms.clearcoatNormalScale.value.negate();
          }
        }
      }
      if (material2.dispersion > 0) {
        uniforms.dispersion.value = material2.dispersion;
      }
      if (material2.iridescence > 0) {
        uniforms.iridescence.value = material2.iridescence;
        uniforms.iridescenceIOR.value = material2.iridescenceIOR;
        uniforms.iridescenceThicknessMinimum.value = material2.iridescenceThicknessRange[0];
        uniforms.iridescenceThicknessMaximum.value = material2.iridescenceThicknessRange[1];
        if (material2.iridescenceMap) {
          uniforms.iridescenceMap.value = material2.iridescenceMap;
          refreshTransformUniform(material2.iridescenceMap, uniforms.iridescenceMapTransform);
        }
        if (material2.iridescenceThicknessMap) {
          uniforms.iridescenceThicknessMap.value = material2.iridescenceThicknessMap;
          refreshTransformUniform(material2.iridescenceThicknessMap, uniforms.iridescenceThicknessMapTransform);
        }
      }
      if (material2.transmission > 0) {
        uniforms.transmission.value = material2.transmission;
        uniforms.transmissionSamplerMap.value = transmissionRenderTarget.texture;
        uniforms.transmissionSamplerSize.value.set(transmissionRenderTarget.width, transmissionRenderTarget.height);
        if (material2.transmissionMap) {
          uniforms.transmissionMap.value = material2.transmissionMap;
          refreshTransformUniform(material2.transmissionMap, uniforms.transmissionMapTransform);
        }
        uniforms.thickness.value = material2.thickness;
        if (material2.thicknessMap) {
          uniforms.thicknessMap.value = material2.thicknessMap;
          refreshTransformUniform(material2.thicknessMap, uniforms.thicknessMapTransform);
        }
        uniforms.attenuationDistance.value = material2.attenuationDistance;
        uniforms.attenuationColor.value.copy(material2.attenuationColor);
      }
      if (material2.anisotropy > 0) {
        uniforms.anisotropyVector.value.set(material2.anisotropy * Math.cos(material2.anisotropyRotation), material2.anisotropy * Math.sin(material2.anisotropyRotation));
        if (material2.anisotropyMap) {
          uniforms.anisotropyMap.value = material2.anisotropyMap;
          refreshTransformUniform(material2.anisotropyMap, uniforms.anisotropyMapTransform);
        }
      }
      uniforms.specularIntensity.value = material2.specularIntensity;
      uniforms.specularColor.value.copy(material2.specularColor);
      if (material2.specularColorMap) {
        uniforms.specularColorMap.value = material2.specularColorMap;
        refreshTransformUniform(material2.specularColorMap, uniforms.specularColorMapTransform);
      }
      if (material2.specularIntensityMap) {
        uniforms.specularIntensityMap.value = material2.specularIntensityMap;
        refreshTransformUniform(material2.specularIntensityMap, uniforms.specularIntensityMapTransform);
      }
    }
    function refreshUniformsMatcap(uniforms, material2) {
      if (material2.matcap) {
        uniforms.matcap.value = material2.matcap;
      }
    }
    function refreshUniformsDistance(uniforms, material2) {
      const light = properties.get(material2).light;
      uniforms.referencePosition.value.setFromMatrixPosition(light.matrixWorld);
      uniforms.nearDistance.value = light.shadow.camera.near;
      uniforms.farDistance.value = light.shadow.camera.far;
    }
    return {
      refreshFogUniforms,
      refreshMaterialUniforms
    };
  }
  function WebGLUniformsGroups(gl, info, capabilities, state) {
    let buffers = {};
    let updateList = {};
    let allocatedBindingPoints = [];
    const maxBindingPoints = gl.getParameter(gl.MAX_UNIFORM_BUFFER_BINDINGS);
    function bind(uniformsGroup, program) {
      const webglProgram = program.program;
      state.uniformBlockBinding(uniformsGroup, webglProgram);
    }
    function update(uniformsGroup, program) {
      let buffer = buffers[uniformsGroup.id];
      if (buffer === void 0) {
        prepareUniformsGroup(uniformsGroup);
        buffer = createBuffer(uniformsGroup);
        buffers[uniformsGroup.id] = buffer;
        uniformsGroup.addEventListener("dispose", onUniformsGroupsDispose);
      }
      const webglProgram = program.program;
      state.updateUBOMapping(uniformsGroup, webglProgram);
      const frame = info.render.frame;
      if (updateList[uniformsGroup.id] !== frame) {
        updateBufferData(uniformsGroup);
        updateList[uniformsGroup.id] = frame;
      }
    }
    function createBuffer(uniformsGroup) {
      const bindingPointIndex = allocateBindingPointIndex();
      uniformsGroup.__bindingPointIndex = bindingPointIndex;
      const buffer = gl.createBuffer();
      const size = uniformsGroup.__size;
      const usage = uniformsGroup.usage;
      gl.bindBuffer(gl.UNIFORM_BUFFER, buffer);
      gl.bufferData(gl.UNIFORM_BUFFER, size, usage);
      gl.bindBuffer(gl.UNIFORM_BUFFER, null);
      gl.bindBufferBase(gl.UNIFORM_BUFFER, bindingPointIndex, buffer);
      return buffer;
    }
    function allocateBindingPointIndex() {
      for (let i2 = 0; i2 < maxBindingPoints; i2++) {
        if (allocatedBindingPoints.indexOf(i2) === -1) {
          allocatedBindingPoints.push(i2);
          return i2;
        }
      }
      console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached.");
      return 0;
    }
    function updateBufferData(uniformsGroup) {
      const buffer = buffers[uniformsGroup.id];
      const uniforms = uniformsGroup.uniforms;
      const cache2 = uniformsGroup.__cache;
      gl.bindBuffer(gl.UNIFORM_BUFFER, buffer);
      for (let i2 = 0, il = uniforms.length; i2 < il; i2++) {
        const uniformArray = Array.isArray(uniforms[i2]) ? uniforms[i2] : [uniforms[i2]];
        for (let j2 = 0, jl = uniformArray.length; j2 < jl; j2++) {
          const uniform = uniformArray[j2];
          if (hasUniformChanged(uniform, i2, j2, cache2) === true) {
            const offset = uniform.__offset;
            const values = Array.isArray(uniform.value) ? uniform.value : [uniform.value];
            let arrayOffset = 0;
            for (let k2 = 0; k2 < values.length; k2++) {
              const value = values[k2];
              const info2 = getUniformSize(value);
              if (typeof value === "number" || typeof value === "boolean") {
                uniform.__data[0] = value;
                gl.bufferSubData(gl.UNIFORM_BUFFER, offset + arrayOffset, uniform.__data);
              } else if (value.isMatrix3) {
                uniform.__data[0] = value.elements[0];
                uniform.__data[1] = value.elements[1];
                uniform.__data[2] = value.elements[2];
                uniform.__data[3] = 0;
                uniform.__data[4] = value.elements[3];
                uniform.__data[5] = value.elements[4];
                uniform.__data[6] = value.elements[5];
                uniform.__data[7] = 0;
                uniform.__data[8] = value.elements[6];
                uniform.__data[9] = value.elements[7];
                uniform.__data[10] = value.elements[8];
                uniform.__data[11] = 0;
              } else {
                value.toArray(uniform.__data, arrayOffset);
                arrayOffset += info2.storage / Float32Array.BYTES_PER_ELEMENT;
              }
            }
            gl.bufferSubData(gl.UNIFORM_BUFFER, offset, uniform.__data);
          }
        }
      }
      gl.bindBuffer(gl.UNIFORM_BUFFER, null);
    }
    function hasUniformChanged(uniform, index, indexArray, cache2) {
      const value = uniform.value;
      const indexString = index + "_" + indexArray;
      if (cache2[indexString] === void 0) {
        if (typeof value === "number" || typeof value === "boolean") {
          cache2[indexString] = value;
        } else {
          cache2[indexString] = value.clone();
        }
        return true;
      } else {
        const cachedObject = cache2[indexString];
        if (typeof value === "number" || typeof value === "boolean") {
          if (cachedObject !== value) {
            cache2[indexString] = value;
            return true;
          }
        } else {
          if (cachedObject.equals(value) === false) {
            cachedObject.copy(value);
            return true;
          }
        }
      }
      return false;
    }
    function prepareUniformsGroup(uniformsGroup) {
      const uniforms = uniformsGroup.uniforms;
      let offset = 0;
      const chunkSize = 16;
      for (let i2 = 0, l2 = uniforms.length; i2 < l2; i2++) {
        const uniformArray = Array.isArray(uniforms[i2]) ? uniforms[i2] : [uniforms[i2]];
        for (let j2 = 0, jl = uniformArray.length; j2 < jl; j2++) {
          const uniform = uniformArray[j2];
          const values = Array.isArray(uniform.value) ? uniform.value : [uniform.value];
          for (let k2 = 0, kl = values.length; k2 < kl; k2++) {
            const value = values[k2];
            const info2 = getUniformSize(value);
            const chunkOffset2 = offset % chunkSize;
            const chunkPadding = chunkOffset2 % info2.boundary;
            const chunkStart = chunkOffset2 + chunkPadding;
            offset += chunkPadding;
            if (chunkStart !== 0 && chunkSize - chunkStart < info2.storage) {
              offset += chunkSize - chunkStart;
            }
            uniform.__data = new Float32Array(info2.storage / Float32Array.BYTES_PER_ELEMENT);
            uniform.__offset = offset;
            offset += info2.storage;
          }
        }
      }
      const chunkOffset = offset % chunkSize;
      if (chunkOffset > 0) offset += chunkSize - chunkOffset;
      uniformsGroup.__size = offset;
      uniformsGroup.__cache = {};
      return this;
    }
    function getUniformSize(value) {
      const info2 = {
        boundary: 0,
        // bytes
        storage: 0
        // bytes
      };
      if (typeof value === "number" || typeof value === "boolean") {
        info2.boundary = 4;
        info2.storage = 4;
      } else if (value.isVector2) {
        info2.boundary = 8;
        info2.storage = 8;
      } else if (value.isVector3 || value.isColor) {
        info2.boundary = 16;
        info2.storage = 12;
      } else if (value.isVector4) {
        info2.boundary = 16;
        info2.storage = 16;
      } else if (value.isMatrix3) {
        info2.boundary = 48;
        info2.storage = 48;
      } else if (value.isMatrix4) {
        info2.boundary = 64;
        info2.storage = 64;
      } else if (value.isTexture) {
        console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group.");
      } else {
        console.warn("THREE.WebGLRenderer: Unsupported uniform value type.", value);
      }
      return info2;
    }
    function onUniformsGroupsDispose(event) {
      const uniformsGroup = event.target;
      uniformsGroup.removeEventListener("dispose", onUniformsGroupsDispose);
      const index = allocatedBindingPoints.indexOf(uniformsGroup.__bindingPointIndex);
      allocatedBindingPoints.splice(index, 1);
      gl.deleteBuffer(buffers[uniformsGroup.id]);
      delete buffers[uniformsGroup.id];
      delete updateList[uniformsGroup.id];
    }
    function dispose() {
      for (const id in buffers) {
        gl.deleteBuffer(buffers[id]);
      }
      allocatedBindingPoints = [];
      buffers = {};
      updateList = {};
    }
    return {
      bind,
      update,
      dispose
    };
  }
  var WebGLRenderer = class {
    constructor(parameters = {}) {
      const {
        canvas: canvas2 = createCanvasElement(),
        context = null,
        depth = true,
        stencil = false,
        alpha = false,
        antialias = false,
        premultipliedAlpha = true,
        preserveDrawingBuffer = false,
        powerPreference = "default",
        failIfMajorPerformanceCaveat = false,
        reverseDepthBuffer = false
      } = parameters;
      this.isWebGLRenderer = true;
      let _alpha;
      if (context !== null) {
        if (typeof WebGLRenderingContext !== "undefined" && context instanceof WebGLRenderingContext) {
          throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");
        }
        _alpha = context.getContextAttributes().alpha;
      } else {
        _alpha = alpha;
      }
      const uintClearColor = new Uint32Array(4);
      const intClearColor = new Int32Array(4);
      let currentRenderList = null;
      let currentRenderState = null;
      const renderListStack = [];
      const renderStateStack = [];
      this.domElement = canvas2;
      this.debug = {
        /**
         * Enables error checking and reporting when shader programs are being compiled
         * @type {boolean}
         */
        checkShaderErrors: true,
        /**
         * Callback for custom error reporting.
         * @type {?Function}
         */
        onShaderError: null
      };
      this.autoClear = true;
      this.autoClearColor = true;
      this.autoClearDepth = true;
      this.autoClearStencil = true;
      this.sortObjects = true;
      this.clippingPlanes = [];
      this.localClippingEnabled = false;
      this._outputColorSpace = SRGBColorSpace;
      this.toneMapping = NoToneMapping;
      this.toneMappingExposure = 1;
      const _this = this;
      let _isContextLost = false;
      let _currentActiveCubeFace = 0;
      let _currentActiveMipmapLevel = 0;
      let _currentRenderTarget = null;
      let _currentMaterialId = -1;
      let _currentCamera = null;
      const _currentViewport = new Vector4();
      const _currentScissor = new Vector4();
      let _currentScissorTest = null;
      const _currentClearColor = new Color(0);
      let _currentClearAlpha = 0;
      let _width = canvas2.width;
      let _height = canvas2.height;
      let _pixelRatio = 1;
      let _opaqueSort = null;
      let _transparentSort = null;
      const _viewport = new Vector4(0, 0, _width, _height);
      const _scissor = new Vector4(0, 0, _width, _height);
      let _scissorTest = false;
      const _frustum = new Frustum();
      let _clippingEnabled = false;
      let _localClippingEnabled = false;
      const _currentProjectionMatrix = new Matrix4();
      const _projScreenMatrix = new Matrix4();
      const _vector3 = new Vector3();
      const _vector4 = new Vector4();
      const _emptyScene = { background: null, fog: null, environment: null, overrideMaterial: null, isScene: true };
      let _renderBackground = false;
      function getTargetPixelRatio() {
        return _currentRenderTarget === null ? _pixelRatio : 1;
      }
      let _gl = context;
      function getContext(contextName, contextAttributes) {
        return canvas2.getContext(contextName, contextAttributes);
      }
      try {
        const contextAttributes = {
          alpha: true,
          depth,
          stencil,
          antialias,
          premultipliedAlpha,
          preserveDrawingBuffer,
          powerPreference,
          failIfMajorPerformanceCaveat
        };
        if ("setAttribute" in canvas2) canvas2.setAttribute("data-engine", `three.js r${REVISION}`);
        canvas2.addEventListener("webglcontextlost", onContextLost, false);
        canvas2.addEventListener("webglcontextrestored", onContextRestore, false);
        canvas2.addEventListener("webglcontextcreationerror", onContextCreationError, false);
        if (_gl === null) {
          const contextName = "webgl2";
          _gl = getContext(contextName, contextAttributes);
          if (_gl === null) {
            if (getContext(contextName)) {
              throw new Error("Error creating WebGL context with your selected attributes.");
            } else {
              throw new Error("Error creating WebGL context.");
            }
          }
        }
      } catch (error) {
        console.error("THREE.WebGLRenderer: " + error.message);
        throw error;
      }
      let extensions, capabilities, state, info;
      let properties, textures, cubemaps, cubeuvmaps, attributes, geometries, objects;
      let programCache, materials, renderLists, renderStates, clipping, shadowMap;
      let background, morphtargets, bufferRenderer, indexedBufferRenderer;
      let utils, bindingStates, uniformsGroups;
      function initGLContext() {
        extensions = new WebGLExtensions(_gl);
        extensions.init();
        utils = new WebGLUtils(_gl, extensions);
        capabilities = new WebGLCapabilities(_gl, extensions, parameters, utils);
        state = new WebGLState(_gl, extensions);
        if (capabilities.reverseDepthBuffer && reverseDepthBuffer) {
          state.buffers.depth.setReversed(true);
        }
        info = new WebGLInfo(_gl);
        properties = new WebGLProperties();
        textures = new WebGLTextures(_gl, extensions, state, properties, capabilities, utils, info);
        cubemaps = new WebGLCubeMaps(_this);
        cubeuvmaps = new WebGLCubeUVMaps(_this);
        attributes = new WebGLAttributes(_gl);
        bindingStates = new WebGLBindingStates(_gl, attributes);
        geometries = new WebGLGeometries(_gl, attributes, info, bindingStates);
        objects = new WebGLObjects(_gl, geometries, attributes, info);
        morphtargets = new WebGLMorphtargets(_gl, capabilities, textures);
        clipping = new WebGLClipping(properties);
        programCache = new WebGLPrograms(_this, cubemaps, cubeuvmaps, extensions, capabilities, bindingStates, clipping);
        materials = new WebGLMaterials(_this, properties);
        renderLists = new WebGLRenderLists();
        renderStates = new WebGLRenderStates(extensions);
        background = new WebGLBackground(_this, cubemaps, cubeuvmaps, state, objects, _alpha, premultipliedAlpha);
        shadowMap = new WebGLShadowMap(_this, objects, capabilities);
        uniformsGroups = new WebGLUniformsGroups(_gl, info, capabilities, state);
        bufferRenderer = new WebGLBufferRenderer(_gl, extensions, info);
        indexedBufferRenderer = new WebGLIndexedBufferRenderer(_gl, extensions, info);
        info.programs = programCache.programs;
        _this.capabilities = capabilities;
        _this.extensions = extensions;
        _this.properties = properties;
        _this.renderLists = renderLists;
        _this.shadowMap = shadowMap;
        _this.state = state;
        _this.info = info;
      }
      initGLContext();
      const xr = new WebXRManager(_this, _gl);
      this.xr = xr;
      this.getContext = function() {
        return _gl;
      };
      this.getContextAttributes = function() {
        return _gl.getContextAttributes();
      };
      this.forceContextLoss = function() {
        const extension = extensions.get("WEBGL_lose_context");
        if (extension) extension.loseContext();
      };
      this.forceContextRestore = function() {
        const extension = extensions.get("WEBGL_lose_context");
        if (extension) extension.restoreContext();
      };
      this.getPixelRatio = function() {
        return _pixelRatio;
      };
      this.setPixelRatio = function(value) {
        if (value === void 0) return;
        _pixelRatio = value;
        this.setSize(_width, _height, false);
      };
      this.getSize = function(target) {
        return target.set(_width, _height);
      };
      this.setSize = function(width, height, updateStyle = true) {
        if (xr.isPresenting) {
          console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");
          return;
        }
        _width = width;
        _height = height;
        canvas2.width = Math.floor(width * _pixelRatio);
        canvas2.height = Math.floor(height * _pixelRatio);
        if (updateStyle === true) {
          canvas2.style.width = width + "px";
          canvas2.style.height = height + "px";
        }
        this.setViewport(0, 0, width, height);
      };
      this.getDrawingBufferSize = function(target) {
        return target.set(_width * _pixelRatio, _height * _pixelRatio).floor();
      };
      this.setDrawingBufferSize = function(width, height, pixelRatio) {
        _width = width;
        _height = height;
        _pixelRatio = pixelRatio;
        canvas2.width = Math.floor(width * pixelRatio);
        canvas2.height = Math.floor(height * pixelRatio);
        this.setViewport(0, 0, width, height);
      };
      this.getCurrentViewport = function(target) {
        return target.copy(_currentViewport);
      };
      this.getViewport = function(target) {
        return target.copy(_viewport);
      };
      this.setViewport = function(x2, y2, width, height) {
        if (x2.isVector4) {
          _viewport.set(x2.x, x2.y, x2.z, x2.w);
        } else {
          _viewport.set(x2, y2, width, height);
        }
        state.viewport(_currentViewport.copy(_viewport).multiplyScalar(_pixelRatio).round());
      };
      this.getScissor = function(target) {
        return target.copy(_scissor);
      };
      this.setScissor = function(x2, y2, width, height) {
        if (x2.isVector4) {
          _scissor.set(x2.x, x2.y, x2.z, x2.w);
        } else {
          _scissor.set(x2, y2, width, height);
        }
        state.scissor(_currentScissor.copy(_scissor).multiplyScalar(_pixelRatio).round());
      };
      this.getScissorTest = function() {
        return _scissorTest;
      };
      this.setScissorTest = function(boolean) {
        state.setScissorTest(_scissorTest = boolean);
      };
      this.setOpaqueSort = function(method) {
        _opaqueSort = method;
      };
      this.setTransparentSort = function(method) {
        _transparentSort = method;
      };
      this.getClearColor = function(target) {
        return target.copy(background.getClearColor());
      };
      this.setClearColor = function() {
        background.setClearColor.apply(background, arguments);
      };
      this.getClearAlpha = function() {
        return background.getClearAlpha();
      };
      this.setClearAlpha = function() {
        background.setClearAlpha.apply(background, arguments);
      };
      this.clear = function(color = true, depth2 = true, stencil2 = true) {
        let bits = 0;
        if (color) {
          let isIntegerFormat = false;
          if (_currentRenderTarget !== null) {
            const targetFormat = _currentRenderTarget.texture.format;
            isIntegerFormat = targetFormat === RGBAIntegerFormat || targetFormat === RGIntegerFormat || targetFormat === RedIntegerFormat;
          }
          if (isIntegerFormat) {
            const targetType = _currentRenderTarget.texture.type;
            const isUnsignedType = targetType === UnsignedByteType || targetType === UnsignedIntType || targetType === UnsignedShortType || targetType === UnsignedInt248Type || targetType === UnsignedShort4444Type || targetType === UnsignedShort5551Type;
            const clearColor = background.getClearColor();
            const a2 = background.getClearAlpha();
            const r2 = clearColor.r;
            const g2 = clearColor.g;
            const b2 = clearColor.b;
            if (isUnsignedType) {
              uintClearColor[0] = r2;
              uintClearColor[1] = g2;
              uintClearColor[2] = b2;
              uintClearColor[3] = a2;
              _gl.clearBufferuiv(_gl.COLOR, 0, uintClearColor);
            } else {
              intClearColor[0] = r2;
              intClearColor[1] = g2;
              intClearColor[2] = b2;
              intClearColor[3] = a2;
              _gl.clearBufferiv(_gl.COLOR, 0, intClearColor);
            }
          } else {
            bits |= _gl.COLOR_BUFFER_BIT;
          }
        }
        if (depth2) {
          bits |= _gl.DEPTH_BUFFER_BIT;
        }
        if (stencil2) {
          bits |= _gl.STENCIL_BUFFER_BIT;
          this.state.buffers.stencil.setMask(4294967295);
        }
        _gl.clear(bits);
      };
      this.clearColor = function() {
        this.clear(true, false, false);
      };
      this.clearDepth = function() {
        this.clear(false, true, false);
      };
      this.clearStencil = function() {
        this.clear(false, false, true);
      };
      this.dispose = function() {
        canvas2.removeEventListener("webglcontextlost", onContextLost, false);
        canvas2.removeEventListener("webglcontextrestored", onContextRestore, false);
        canvas2.removeEventListener("webglcontextcreationerror", onContextCreationError, false);
        background.dispose();
        renderLists.dispose();
        renderStates.dispose();
        properties.dispose();
        cubemaps.dispose();
        cubeuvmaps.dispose();
        objects.dispose();
        bindingStates.dispose();
        uniformsGroups.dispose();
        programCache.dispose();
        xr.dispose();
        xr.removeEventListener("sessionstart", onXRSessionStart);
        xr.removeEventListener("sessionend", onXRSessionEnd);
        animation.stop();
      };
      function onContextLost(event) {
        event.preventDefault();
        console.log("THREE.WebGLRenderer: Context Lost.");
        _isContextLost = true;
      }
      function onContextRestore() {
        console.log("THREE.WebGLRenderer: Context Restored.");
        _isContextLost = false;
        const infoAutoReset = info.autoReset;
        const shadowMapEnabled = shadowMap.enabled;
        const shadowMapAutoUpdate = shadowMap.autoUpdate;
        const shadowMapNeedsUpdate = shadowMap.needsUpdate;
        const shadowMapType = shadowMap.type;
        initGLContext();
        info.autoReset = infoAutoReset;
        shadowMap.enabled = shadowMapEnabled;
        shadowMap.autoUpdate = shadowMapAutoUpdate;
        shadowMap.needsUpdate = shadowMapNeedsUpdate;
        shadowMap.type = shadowMapType;
      }
      function onContextCreationError(event) {
        console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ", event.statusMessage);
      }
      function onMaterialDispose(event) {
        const material2 = event.target;
        material2.removeEventListener("dispose", onMaterialDispose);
        deallocateMaterial(material2);
      }
      function deallocateMaterial(material2) {
        releaseMaterialProgramReferences(material2);
        properties.remove(material2);
      }
      function releaseMaterialProgramReferences(material2) {
        const programs = properties.get(material2).programs;
        if (programs !== void 0) {
          programs.forEach(function(program) {
            programCache.releaseProgram(program);
          });
          if (material2.isShaderMaterial) {
            programCache.releaseShaderCache(material2);
          }
        }
      }
      this.renderBufferDirect = function(camera2, scene2, geometry2, material2, object, group) {
        if (scene2 === null) scene2 = _emptyScene;
        const frontFaceCW = object.isMesh && object.matrixWorld.determinant() < 0;
        const program = setProgram(camera2, scene2, geometry2, material2, object);
        state.setMaterial(material2, frontFaceCW);
        let index = geometry2.index;
        let rangeFactor = 1;
        if (material2.wireframe === true) {
          index = geometries.getWireframeAttribute(geometry2);
          if (index === void 0) return;
          rangeFactor = 2;
        }
        const drawRange = geometry2.drawRange;
        const position = geometry2.attributes.position;
        let drawStart = drawRange.start * rangeFactor;
        let drawEnd = (drawRange.start + drawRange.count) * rangeFactor;
        if (group !== null) {
          drawStart = Math.max(drawStart, group.start * rangeFactor);
          drawEnd = Math.min(drawEnd, (group.start + group.count) * rangeFactor);
        }
        if (index !== null) {
          drawStart = Math.max(drawStart, 0);
          drawEnd = Math.min(drawEnd, index.count);
        } else if (position !== void 0 && position !== null) {
          drawStart = Math.max(drawStart, 0);
          drawEnd = Math.min(drawEnd, position.count);
        }
        const drawCount = drawEnd - drawStart;
        if (drawCount < 0 || drawCount === Infinity) return;
        bindingStates.setup(object, material2, program, geometry2, index);
        let attribute;
        let renderer2 = bufferRenderer;
        if (index !== null) {
          attribute = attributes.get(index);
          renderer2 = indexedBufferRenderer;
          renderer2.setIndex(attribute);
        }
        if (object.isMesh) {
          if (material2.wireframe === true) {
            state.setLineWidth(material2.wireframeLinewidth * getTargetPixelRatio());
            renderer2.setMode(_gl.LINES);
          } else {
            renderer2.setMode(_gl.TRIANGLES);
          }
        } else if (object.isLine) {
          let lineWidth = material2.linewidth;
          if (lineWidth === void 0) lineWidth = 1;
          state.setLineWidth(lineWidth * getTargetPixelRatio());
          if (object.isLineSegments) {
            renderer2.setMode(_gl.LINES);
          } else if (object.isLineLoop) {
            renderer2.setMode(_gl.LINE_LOOP);
          } else {
            renderer2.setMode(_gl.LINE_STRIP);
          }
        } else if (object.isPoints) {
          renderer2.setMode(_gl.POINTS);
        } else if (object.isSprite) {
          renderer2.setMode(_gl.TRIANGLES);
        }
        if (object.isBatchedMesh) {
          if (object._multiDrawInstances !== null) {
            renderer2.renderMultiDrawInstances(object._multiDrawStarts, object._multiDrawCounts, object._multiDrawCount, object._multiDrawInstances);
          } else {
            if (!extensions.get("WEBGL_multi_draw")) {
              const starts = object._multiDrawStarts;
              const counts = object._multiDrawCounts;
              const drawCount2 = object._multiDrawCount;
              const bytesPerElement = index ? attributes.get(index).bytesPerElement : 1;
              const uniforms = properties.get(material2).currentProgram.getUniforms();
              for (let i2 = 0; i2 < drawCount2; i2++) {
                uniforms.setValue(_gl, "_gl_DrawID", i2);
                renderer2.render(starts[i2] / bytesPerElement, counts[i2]);
              }
            } else {
              renderer2.renderMultiDraw(object._multiDrawStarts, object._multiDrawCounts, object._multiDrawCount);
            }
          }
        } else if (object.isInstancedMesh) {
          renderer2.renderInstances(drawStart, drawCount, object.count);
        } else if (geometry2.isInstancedBufferGeometry) {
          const maxInstanceCount = geometry2._maxInstanceCount !== void 0 ? geometry2._maxInstanceCount : Infinity;
          const instanceCount = Math.min(geometry2.instanceCount, maxInstanceCount);
          renderer2.renderInstances(drawStart, drawCount, instanceCount);
        } else {
          renderer2.render(drawStart, drawCount);
        }
      };
      function prepareMaterial(material2, scene2, object) {
        if (material2.transparent === true && material2.side === DoubleSide && material2.forceSinglePass === false) {
          material2.side = BackSide;
          material2.needsUpdate = true;
          getProgram(material2, scene2, object);
          material2.side = FrontSide;
          material2.needsUpdate = true;
          getProgram(material2, scene2, object);
          material2.side = DoubleSide;
        } else {
          getProgram(material2, scene2, object);
        }
      }
      this.compile = function(scene2, camera2, targetScene = null) {
        if (targetScene === null) targetScene = scene2;
        currentRenderState = renderStates.get(targetScene);
        currentRenderState.init(camera2);
        renderStateStack.push(currentRenderState);
        targetScene.traverseVisible(function(object) {
          if (object.isLight && object.layers.test(camera2.layers)) {
            currentRenderState.pushLight(object);
            if (object.castShadow) {
              currentRenderState.pushShadow(object);
            }
          }
        });
        if (scene2 !== targetScene) {
          scene2.traverseVisible(function(object) {
            if (object.isLight && object.layers.test(camera2.layers)) {
              currentRenderState.pushLight(object);
              if (object.castShadow) {
                currentRenderState.pushShadow(object);
              }
            }
          });
        }
        currentRenderState.setupLights();
        const materials2 = /* @__PURE__ */ new Set();
        scene2.traverse(function(object) {
          if (!(object.isMesh || object.isPoints || object.isLine || object.isSprite)) {
            return;
          }
          const material2 = object.material;
          if (material2) {
            if (Array.isArray(material2)) {
              for (let i2 = 0; i2 < material2.length; i2++) {
                const material22 = material2[i2];
                prepareMaterial(material22, targetScene, object);
                materials2.add(material22);
              }
            } else {
              prepareMaterial(material2, targetScene, object);
              materials2.add(material2);
            }
          }
        });
        renderStateStack.pop();
        currentRenderState = null;
        return materials2;
      };
      this.compileAsync = function(scene2, camera2, targetScene = null) {
        const materials2 = this.compile(scene2, camera2, targetScene);
        return new Promise((resolve) => {
          function checkMaterialsReady() {
            materials2.forEach(function(material2) {
              const materialProperties = properties.get(material2);
              const program = materialProperties.currentProgram;
              if (program.isReady()) {
                materials2.delete(material2);
              }
            });
            if (materials2.size === 0) {
              resolve(scene2);
              return;
            }
            setTimeout(checkMaterialsReady, 10);
          }
          if (extensions.get("KHR_parallel_shader_compile") !== null) {
            checkMaterialsReady();
          } else {
            setTimeout(checkMaterialsReady, 10);
          }
        });
      };
      let onAnimationFrameCallback = null;
      function onAnimationFrame(time) {
        if (onAnimationFrameCallback) onAnimationFrameCallback(time);
      }
      function onXRSessionStart() {
        animation.stop();
      }
      function onXRSessionEnd() {
        animation.start();
      }
      const animation = new WebGLAnimation();
      animation.setAnimationLoop(onAnimationFrame);
      if (typeof self !== "undefined") animation.setContext(self);
      this.setAnimationLoop = function(callback) {
        onAnimationFrameCallback = callback;
        xr.setAnimationLoop(callback);
        callback === null ? animation.stop() : animation.start();
      };
      xr.addEventListener("sessionstart", onXRSessionStart);
      xr.addEventListener("sessionend", onXRSessionEnd);
      this.render = function(scene2, camera2) {
        if (camera2 !== void 0 && camera2.isCamera !== true) {
          console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");
          return;
        }
        if (_isContextLost === true) return;
        if (scene2.matrixWorldAutoUpdate === true) scene2.updateMatrixWorld();
        if (camera2.parent === null && camera2.matrixWorldAutoUpdate === true) camera2.updateMatrixWorld();
        if (xr.enabled === true && xr.isPresenting === true) {
          if (xr.cameraAutoUpdate === true) xr.updateCamera(camera2);
          camera2 = xr.getCamera();
        }
        if (scene2.isScene === true) scene2.onBeforeRender(_this, scene2, camera2, _currentRenderTarget);
        currentRenderState = renderStates.get(scene2, renderStateStack.length);
        currentRenderState.init(camera2);
        renderStateStack.push(currentRenderState);
        _projScreenMatrix.multiplyMatrices(camera2.projectionMatrix, camera2.matrixWorldInverse);
        _frustum.setFromProjectionMatrix(_projScreenMatrix);
        _localClippingEnabled = this.localClippingEnabled;
        _clippingEnabled = clipping.init(this.clippingPlanes, _localClippingEnabled);
        currentRenderList = renderLists.get(scene2, renderListStack.length);
        currentRenderList.init();
        renderListStack.push(currentRenderList);
        if (xr.enabled === true && xr.isPresenting === true) {
          const depthSensingMesh = _this.xr.getDepthSensingMesh();
          if (depthSensingMesh !== null) {
            projectObject(depthSensingMesh, camera2, -Infinity, _this.sortObjects);
          }
        }
        projectObject(scene2, camera2, 0, _this.sortObjects);
        currentRenderList.finish();
        if (_this.sortObjects === true) {
          currentRenderList.sort(_opaqueSort, _transparentSort);
        }
        _renderBackground = xr.enabled === false || xr.isPresenting === false || xr.hasDepthSensing() === false;
        if (_renderBackground) {
          background.addToRenderList(currentRenderList, scene2);
        }
        this.info.render.frame++;
        if (_clippingEnabled === true) clipping.beginShadows();
        const shadowsArray = currentRenderState.state.shadowsArray;
        shadowMap.render(shadowsArray, scene2, camera2);
        if (_clippingEnabled === true) clipping.endShadows();
        if (this.info.autoReset === true) this.info.reset();
        const opaqueObjects = currentRenderList.opaque;
        const transmissiveObjects = currentRenderList.transmissive;
        currentRenderState.setupLights();
        if (camera2.isArrayCamera) {
          const cameras = camera2.cameras;
          if (transmissiveObjects.length > 0) {
            for (let i2 = 0, l2 = cameras.length; i2 < l2; i2++) {
              const camera22 = cameras[i2];
              renderTransmissionPass(opaqueObjects, transmissiveObjects, scene2, camera22);
            }
          }
          if (_renderBackground) background.render(scene2);
          for (let i2 = 0, l2 = cameras.length; i2 < l2; i2++) {
            const camera22 = cameras[i2];
            renderScene(currentRenderList, scene2, camera22, camera22.viewport);
          }
        } else {
          if (transmissiveObjects.length > 0) renderTransmissionPass(opaqueObjects, transmissiveObjects, scene2, camera2);
          if (_renderBackground) background.render(scene2);
          renderScene(currentRenderList, scene2, camera2);
        }
        if (_currentRenderTarget !== null) {
          textures.updateMultisampleRenderTarget(_currentRenderTarget);
          textures.updateRenderTargetMipmap(_currentRenderTarget);
        }
        if (scene2.isScene === true) scene2.onAfterRender(_this, scene2, camera2);
        bindingStates.resetDefaultState();
        _currentMaterialId = -1;
        _currentCamera = null;
        renderStateStack.pop();
        if (renderStateStack.length > 0) {
          currentRenderState = renderStateStack[renderStateStack.length - 1];
          if (_clippingEnabled === true) clipping.setGlobalState(_this.clippingPlanes, currentRenderState.state.camera);
        } else {
          currentRenderState = null;
        }
        renderListStack.pop();
        if (renderListStack.length > 0) {
          currentRenderList = renderListStack[renderListStack.length - 1];
        } else {
          currentRenderList = null;
        }
      };
      function projectObject(object, camera2, groupOrder, sortObjects) {
        if (object.visible === false) return;
        const visible = object.layers.test(camera2.layers);
        if (visible) {
          if (object.isGroup) {
            groupOrder = object.renderOrder;
          } else if (object.isLOD) {
            if (object.autoUpdate === true) object.update(camera2);
          } else if (object.isLight) {
            currentRenderState.pushLight(object);
            if (object.castShadow) {
              currentRenderState.pushShadow(object);
            }
          } else if (object.isSprite) {
            if (!object.frustumCulled || _frustum.intersectsSprite(object)) {
              if (sortObjects) {
                _vector4.setFromMatrixPosition(object.matrixWorld).applyMatrix4(_projScreenMatrix);
              }
              const geometry2 = objects.update(object);
              const material2 = object.material;
              if (material2.visible) {
                currentRenderList.push(object, geometry2, material2, groupOrder, _vector4.z, null);
              }
            }
          } else if (object.isMesh || object.isLine || object.isPoints) {
            if (!object.frustumCulled || _frustum.intersectsObject(object)) {
              const geometry2 = objects.update(object);
              const material2 = object.material;
              if (sortObjects) {
                if (object.boundingSphere !== void 0) {
                  if (object.boundingSphere === null) object.computeBoundingSphere();
                  _vector4.copy(object.boundingSphere.center);
                } else {
                  if (geometry2.boundingSphere === null) geometry2.computeBoundingSphere();
                  _vector4.copy(geometry2.boundingSphere.center);
                }
                _vector4.applyMatrix4(object.matrixWorld).applyMatrix4(_projScreenMatrix);
              }
              if (Array.isArray(material2)) {
                const groups = geometry2.groups;
                for (let i2 = 0, l2 = groups.length; i2 < l2; i2++) {
                  const group = groups[i2];
                  const groupMaterial = material2[group.materialIndex];
                  if (groupMaterial && groupMaterial.visible) {
                    currentRenderList.push(object, geometry2, groupMaterial, groupOrder, _vector4.z, group);
                  }
                }
              } else if (material2.visible) {
                currentRenderList.push(object, geometry2, material2, groupOrder, _vector4.z, null);
              }
            }
          }
        }
        const children = object.children;
        for (let i2 = 0, l2 = children.length; i2 < l2; i2++) {
          projectObject(children[i2], camera2, groupOrder, sortObjects);
        }
      }
      function renderScene(currentRenderList2, scene2, camera2, viewport) {
        const opaqueObjects = currentRenderList2.opaque;
        const transmissiveObjects = currentRenderList2.transmissive;
        const transparentObjects = currentRenderList2.transparent;
        currentRenderState.setupLightsView(camera2);
        if (_clippingEnabled === true) clipping.setGlobalState(_this.clippingPlanes, camera2);
        if (viewport) state.viewport(_currentViewport.copy(viewport));
        if (opaqueObjects.length > 0) renderObjects(opaqueObjects, scene2, camera2);
        if (transmissiveObjects.length > 0) renderObjects(transmissiveObjects, scene2, camera2);
        if (transparentObjects.length > 0) renderObjects(transparentObjects, scene2, camera2);
        state.buffers.depth.setTest(true);
        state.buffers.depth.setMask(true);
        state.buffers.color.setMask(true);
        state.setPolygonOffset(false);
      }
      function renderTransmissionPass(opaqueObjects, transmissiveObjects, scene2, camera2) {
        const overrideMaterial = scene2.isScene === true ? scene2.overrideMaterial : null;
        if (overrideMaterial !== null) {
          return;
        }
        if (currentRenderState.state.transmissionRenderTarget[camera2.id] === void 0) {
          currentRenderState.state.transmissionRenderTarget[camera2.id] = new WebGLRenderTarget(1, 1, {
            generateMipmaps: true,
            type: extensions.has("EXT_color_buffer_half_float") || extensions.has("EXT_color_buffer_float") ? HalfFloatType : UnsignedByteType,
            minFilter: LinearMipmapLinearFilter,
            samples: 4,
            stencilBuffer: stencil,
            resolveDepthBuffer: false,
            resolveStencilBuffer: false,
            colorSpace: ColorManagement.workingColorSpace
          });
        }
        const transmissionRenderTarget = currentRenderState.state.transmissionRenderTarget[camera2.id];
        const activeViewport = camera2.viewport || _currentViewport;
        transmissionRenderTarget.setSize(activeViewport.z, activeViewport.w);
        const currentRenderTarget = _this.getRenderTarget();
        _this.setRenderTarget(transmissionRenderTarget);
        _this.getClearColor(_currentClearColor);
        _currentClearAlpha = _this.getClearAlpha();
        if (_currentClearAlpha < 1) _this.setClearColor(16777215, 0.5);
        _this.clear();
        if (_renderBackground) background.render(scene2);
        const currentToneMapping = _this.toneMapping;
        _this.toneMapping = NoToneMapping;
        const currentCameraViewport = camera2.viewport;
        if (camera2.viewport !== void 0) camera2.viewport = void 0;
        currentRenderState.setupLightsView(camera2);
        if (_clippingEnabled === true) clipping.setGlobalState(_this.clippingPlanes, camera2);
        renderObjects(opaqueObjects, scene2, camera2);
        textures.updateMultisampleRenderTarget(transmissionRenderTarget);
        textures.updateRenderTargetMipmap(transmissionRenderTarget);
        if (extensions.has("WEBGL_multisampled_render_to_texture") === false) {
          let renderTargetNeedsUpdate = false;
          for (let i2 = 0, l2 = transmissiveObjects.length; i2 < l2; i2++) {
            const renderItem = transmissiveObjects[i2];
            const object = renderItem.object;
            const geometry2 = renderItem.geometry;
            const material2 = renderItem.material;
            const group = renderItem.group;
            if (material2.side === DoubleSide && object.layers.test(camera2.layers)) {
              const currentSide = material2.side;
              material2.side = BackSide;
              material2.needsUpdate = true;
              renderObject(object, scene2, camera2, geometry2, material2, group);
              material2.side = currentSide;
              material2.needsUpdate = true;
              renderTargetNeedsUpdate = true;
            }
          }
          if (renderTargetNeedsUpdate === true) {
            textures.updateMultisampleRenderTarget(transmissionRenderTarget);
            textures.updateRenderTargetMipmap(transmissionRenderTarget);
          }
        }
        _this.setRenderTarget(currentRenderTarget);
        _this.setClearColor(_currentClearColor, _currentClearAlpha);
        if (currentCameraViewport !== void 0) camera2.viewport = currentCameraViewport;
        _this.toneMapping = currentToneMapping;
      }
      function renderObjects(renderList, scene2, camera2) {
        const overrideMaterial = scene2.isScene === true ? scene2.overrideMaterial : null;
        for (let i2 = 0, l2 = renderList.length; i2 < l2; i2++) {
          const renderItem = renderList[i2];
          const object = renderItem.object;
          const geometry2 = renderItem.geometry;
          const material2 = overrideMaterial === null ? renderItem.material : overrideMaterial;
          const group = renderItem.group;
          if (object.layers.test(camera2.layers)) {
            renderObject(object, scene2, camera2, geometry2, material2, group);
          }
        }
      }
      function renderObject(object, scene2, camera2, geometry2, material2, group) {
        object.onBeforeRender(_this, scene2, camera2, geometry2, material2, group);
        object.modelViewMatrix.multiplyMatrices(camera2.matrixWorldInverse, object.matrixWorld);
        object.normalMatrix.getNormalMatrix(object.modelViewMatrix);
        material2.onBeforeRender(_this, scene2, camera2, geometry2, object, group);
        if (material2.transparent === true && material2.side === DoubleSide && material2.forceSinglePass === false) {
          material2.side = BackSide;
          material2.needsUpdate = true;
          _this.renderBufferDirect(camera2, scene2, geometry2, material2, object, group);
          material2.side = FrontSide;
          material2.needsUpdate = true;
          _this.renderBufferDirect(camera2, scene2, geometry2, material2, object, group);
          material2.side = DoubleSide;
        } else {
          _this.renderBufferDirect(camera2, scene2, geometry2, material2, object, group);
        }
        object.onAfterRender(_this, scene2, camera2, geometry2, material2, group);
      }
      function getProgram(material2, scene2, object) {
        if (scene2.isScene !== true) scene2 = _emptyScene;
        const materialProperties = properties.get(material2);
        const lights = currentRenderState.state.lights;
        const shadowsArray = currentRenderState.state.shadowsArray;
        const lightsStateVersion = lights.state.version;
        const parameters2 = programCache.getParameters(material2, lights.state, shadowsArray, scene2, object);
        const programCacheKey = programCache.getProgramCacheKey(parameters2);
        let programs = materialProperties.programs;
        materialProperties.environment = material2.isMeshStandardMaterial ? scene2.environment : null;
        materialProperties.fog = scene2.fog;
        materialProperties.envMap = (material2.isMeshStandardMaterial ? cubeuvmaps : cubemaps).get(material2.envMap || materialProperties.environment);
        materialProperties.envMapRotation = materialProperties.environment !== null && material2.envMap === null ? scene2.environmentRotation : material2.envMapRotation;
        if (programs === void 0) {
          material2.addEventListener("dispose", onMaterialDispose);
          programs = /* @__PURE__ */ new Map();
          materialProperties.programs = programs;
        }
        let program = programs.get(programCacheKey);
        if (program !== void 0) {
          if (materialProperties.currentProgram === program && materialProperties.lightsStateVersion === lightsStateVersion) {
            updateCommonMaterialProperties(material2, parameters2);
            return program;
          }
        } else {
          parameters2.uniforms = programCache.getUniforms(material2);
          material2.onBeforeCompile(parameters2, _this);
          program = programCache.acquireProgram(parameters2, programCacheKey);
          programs.set(programCacheKey, program);
          materialProperties.uniforms = parameters2.uniforms;
        }
        const uniforms = materialProperties.uniforms;
        if (!material2.isShaderMaterial && !material2.isRawShaderMaterial || material2.clipping === true) {
          uniforms.clippingPlanes = clipping.uniform;
        }
        updateCommonMaterialProperties(material2, parameters2);
        materialProperties.needsLights = materialNeedsLights(material2);
        materialProperties.lightsStateVersion = lightsStateVersion;
        if (materialProperties.needsLights) {
          uniforms.ambientLightColor.value = lights.state.ambient;
          uniforms.lightProbe.value = lights.state.probe;
          uniforms.directionalLights.value = lights.state.directional;
          uniforms.directionalLightShadows.value = lights.state.directionalShadow;
          uniforms.spotLights.value = lights.state.spot;
          uniforms.spotLightShadows.value = lights.state.spotShadow;
          uniforms.rectAreaLights.value = lights.state.rectArea;
          uniforms.ltc_1.value = lights.state.rectAreaLTC1;
          uniforms.ltc_2.value = lights.state.rectAreaLTC2;
          uniforms.pointLights.value = lights.state.point;
          uniforms.pointLightShadows.value = lights.state.pointShadow;
          uniforms.hemisphereLights.value = lights.state.hemi;
          uniforms.directionalShadowMap.value = lights.state.directionalShadowMap;
          uniforms.directionalShadowMatrix.value = lights.state.directionalShadowMatrix;
          uniforms.spotShadowMap.value = lights.state.spotShadowMap;
          uniforms.spotLightMatrix.value = lights.state.spotLightMatrix;
          uniforms.spotLightMap.value = lights.state.spotLightMap;
          uniforms.pointShadowMap.value = lights.state.pointShadowMap;
          uniforms.pointShadowMatrix.value = lights.state.pointShadowMatrix;
        }
        materialProperties.currentProgram = program;
        materialProperties.uniformsList = null;
        return program;
      }
      function getUniformList(materialProperties) {
        if (materialProperties.uniformsList === null) {
          const progUniforms = materialProperties.currentProgram.getUniforms();
          materialProperties.uniformsList = WebGLUniforms.seqWithValue(progUniforms.seq, materialProperties.uniforms);
        }
        return materialProperties.uniformsList;
      }
      function updateCommonMaterialProperties(material2, parameters2) {
        const materialProperties = properties.get(material2);
        materialProperties.outputColorSpace = parameters2.outputColorSpace;
        materialProperties.batching = parameters2.batching;
        materialProperties.batchingColor = parameters2.batchingColor;
        materialProperties.instancing = parameters2.instancing;
        materialProperties.instancingColor = parameters2.instancingColor;
        materialProperties.instancingMorph = parameters2.instancingMorph;
        materialProperties.skinning = parameters2.skinning;
        materialProperties.morphTargets = parameters2.morphTargets;
        materialProperties.morphNormals = parameters2.morphNormals;
        materialProperties.morphColors = parameters2.morphColors;
        materialProperties.morphTargetsCount = parameters2.morphTargetsCount;
        materialProperties.numClippingPlanes = parameters2.numClippingPlanes;
        materialProperties.numIntersection = parameters2.numClipIntersection;
        materialProperties.vertexAlphas = parameters2.vertexAlphas;
        materialProperties.vertexTangents = parameters2.vertexTangents;
        materialProperties.toneMapping = parameters2.toneMapping;
      }
      function setProgram(camera2, scene2, geometry2, material2, object) {
        if (scene2.isScene !== true) scene2 = _emptyScene;
        textures.resetTextureUnits();
        const fog = scene2.fog;
        const environment = material2.isMeshStandardMaterial ? scene2.environment : null;
        const colorSpace = _currentRenderTarget === null ? _this.outputColorSpace : _currentRenderTarget.isXRRenderTarget === true ? _currentRenderTarget.texture.colorSpace : LinearSRGBColorSpace;
        const envMap = (material2.isMeshStandardMaterial ? cubeuvmaps : cubemaps).get(material2.envMap || environment);
        const vertexAlphas = material2.vertexColors === true && !!geometry2.attributes.color && geometry2.attributes.color.itemSize === 4;
        const vertexTangents = !!geometry2.attributes.tangent && (!!material2.normalMap || material2.anisotropy > 0);
        const morphTargets = !!geometry2.morphAttributes.position;
        const morphNormals = !!geometry2.morphAttributes.normal;
        const morphColors = !!geometry2.morphAttributes.color;
        let toneMapping = NoToneMapping;
        if (material2.toneMapped) {
          if (_currentRenderTarget === null || _currentRenderTarget.isXRRenderTarget === true) {
            toneMapping = _this.toneMapping;
          }
        }
        const morphAttribute = geometry2.morphAttributes.position || geometry2.morphAttributes.normal || geometry2.morphAttributes.color;
        const morphTargetsCount = morphAttribute !== void 0 ? morphAttribute.length : 0;
        const materialProperties = properties.get(material2);
        const lights = currentRenderState.state.lights;
        if (_clippingEnabled === true) {
          if (_localClippingEnabled === true || camera2 !== _currentCamera) {
            const useCache = camera2 === _currentCamera && material2.id === _currentMaterialId;
            clipping.setState(material2, camera2, useCache);
          }
        }
        let needsProgramChange = false;
        if (material2.version === materialProperties.__version) {
          if (materialProperties.needsLights && materialProperties.lightsStateVersion !== lights.state.version) {
            needsProgramChange = true;
          } else if (materialProperties.outputColorSpace !== colorSpace) {
            needsProgramChange = true;
          } else if (object.isBatchedMesh && materialProperties.batching === false) {
            needsProgramChange = true;
          } else if (!object.isBatchedMesh && materialProperties.batching === true) {
            needsProgramChange = true;
          } else if (object.isBatchedMesh && materialProperties.batchingColor === true && object.colorTexture === null) {
            needsProgramChange = true;
          } else if (object.isBatchedMesh && materialProperties.batchingColor === false && object.colorTexture !== null) {
            needsProgramChange = true;
          } else if (object.isInstancedMesh && materialProperties.instancing === false) {
            needsProgramChange = true;
          } else if (!object.isInstancedMesh && materialProperties.instancing === true) {
            needsProgramChange = true;
          } else if (object.isSkinnedMesh && materialProperties.skinning === false) {
            needsProgramChange = true;
          } else if (!object.isSkinnedMesh && materialProperties.skinning === true) {
            needsProgramChange = true;
          } else if (object.isInstancedMesh && materialProperties.instancingColor === true && object.instanceColor === null) {
            needsProgramChange = true;
          } else if (object.isInstancedMesh && materialProperties.instancingColor === false && object.instanceColor !== null) {
            needsProgramChange = true;
          } else if (object.isInstancedMesh && materialProperties.instancingMorph === true && object.morphTexture === null) {
            needsProgramChange = true;
          } else if (object.isInstancedMesh && materialProperties.instancingMorph === false && object.morphTexture !== null) {
            needsProgramChange = true;
          } else if (materialProperties.envMap !== envMap) {
            needsProgramChange = true;
          } else if (material2.fog === true && materialProperties.fog !== fog) {
            needsProgramChange = true;
          } else if (materialProperties.numClippingPlanes !== void 0 && (materialProperties.numClippingPlanes !== clipping.numPlanes || materialProperties.numIntersection !== clipping.numIntersection)) {
            needsProgramChange = true;
          } else if (materialProperties.vertexAlphas !== vertexAlphas) {
            needsProgramChange = true;
          } else if (materialProperties.vertexTangents !== vertexTangents) {
            needsProgramChange = true;
          } else if (materialProperties.morphTargets !== morphTargets) {
            needsProgramChange = true;
          } else if (materialProperties.morphNormals !== morphNormals) {
            needsProgramChange = true;
          } else if (materialProperties.morphColors !== morphColors) {
            needsProgramChange = true;
          } else if (materialProperties.toneMapping !== toneMapping) {
            needsProgramChange = true;
          } else if (materialProperties.morphTargetsCount !== morphTargetsCount) {
            needsProgramChange = true;
          }
        } else {
          needsProgramChange = true;
          materialProperties.__version = material2.version;
        }
        let program = materialProperties.currentProgram;
        if (needsProgramChange === true) {
          program = getProgram(material2, scene2, object);
        }
        let refreshProgram = false;
        let refreshMaterial = false;
        let refreshLights = false;
        const p_uniforms = program.getUniforms(), m_uniforms = materialProperties.uniforms;
        if (state.useProgram(program.program)) {
          refreshProgram = true;
          refreshMaterial = true;
          refreshLights = true;
        }
        if (material2.id !== _currentMaterialId) {
          _currentMaterialId = material2.id;
          refreshMaterial = true;
        }
        if (refreshProgram || _currentCamera !== camera2) {
          const reverseDepthBuffer2 = state.buffers.depth.getReversed();
          if (reverseDepthBuffer2) {
            _currentProjectionMatrix.copy(camera2.projectionMatrix);
            toNormalizedProjectionMatrix(_currentProjectionMatrix);
            toReversedProjectionMatrix(_currentProjectionMatrix);
            p_uniforms.setValue(_gl, "projectionMatrix", _currentProjectionMatrix);
          } else {
            p_uniforms.setValue(_gl, "projectionMatrix", camera2.projectionMatrix);
          }
          p_uniforms.setValue(_gl, "viewMatrix", camera2.matrixWorldInverse);
          const uCamPos = p_uniforms.map.cameraPosition;
          if (uCamPos !== void 0) {
            uCamPos.setValue(_gl, _vector3.setFromMatrixPosition(camera2.matrixWorld));
          }
          if (capabilities.logarithmicDepthBuffer) {
            p_uniforms.setValue(
              _gl,
              "logDepthBufFC",
              2 / (Math.log(camera2.far + 1) / Math.LN2)
            );
          }
          if (material2.isMeshPhongMaterial || material2.isMeshToonMaterial || material2.isMeshLambertMaterial || material2.isMeshBasicMaterial || material2.isMeshStandardMaterial || material2.isShaderMaterial) {
            p_uniforms.setValue(_gl, "isOrthographic", camera2.isOrthographicCamera === true);
          }
          if (_currentCamera !== camera2) {
            _currentCamera = camera2;
            refreshMaterial = true;
            refreshLights = true;
          }
        }
        if (object.isSkinnedMesh) {
          p_uniforms.setOptional(_gl, object, "bindMatrix");
          p_uniforms.setOptional(_gl, object, "bindMatrixInverse");
          const skeleton = object.skeleton;
          if (skeleton) {
            if (skeleton.boneTexture === null) skeleton.computeBoneTexture();
            p_uniforms.setValue(_gl, "boneTexture", skeleton.boneTexture, textures);
          }
        }
        if (object.isBatchedMesh) {
          p_uniforms.setOptional(_gl, object, "batchingTexture");
          p_uniforms.setValue(_gl, "batchingTexture", object._matricesTexture, textures);
          p_uniforms.setOptional(_gl, object, "batchingIdTexture");
          p_uniforms.setValue(_gl, "batchingIdTexture", object._indirectTexture, textures);
          p_uniforms.setOptional(_gl, object, "batchingColorTexture");
          if (object._colorsTexture !== null) {
            p_uniforms.setValue(_gl, "batchingColorTexture", object._colorsTexture, textures);
          }
        }
        const morphAttributes = geometry2.morphAttributes;
        if (morphAttributes.position !== void 0 || morphAttributes.normal !== void 0 || morphAttributes.color !== void 0) {
          morphtargets.update(object, geometry2, program);
        }
        if (refreshMaterial || materialProperties.receiveShadow !== object.receiveShadow) {
          materialProperties.receiveShadow = object.receiveShadow;
          p_uniforms.setValue(_gl, "receiveShadow", object.receiveShadow);
        }
        if (material2.isMeshGouraudMaterial && material2.envMap !== null) {
          m_uniforms.envMap.value = envMap;
          m_uniforms.flipEnvMap.value = envMap.isCubeTexture && envMap.isRenderTargetTexture === false ? -1 : 1;
        }
        if (material2.isMeshStandardMaterial && material2.envMap === null && scene2.environment !== null) {
          m_uniforms.envMapIntensity.value = scene2.environmentIntensity;
        }
        if (refreshMaterial) {
          p_uniforms.setValue(_gl, "toneMappingExposure", _this.toneMappingExposure);
          if (materialProperties.needsLights) {
            markUniformsLightsNeedsUpdate(m_uniforms, refreshLights);
          }
          if (fog && material2.fog === true) {
            materials.refreshFogUniforms(m_uniforms, fog);
          }
          materials.refreshMaterialUniforms(m_uniforms, material2, _pixelRatio, _height, currentRenderState.state.transmissionRenderTarget[camera2.id]);
          WebGLUniforms.upload(_gl, getUniformList(materialProperties), m_uniforms, textures);
        }
        if (material2.isShaderMaterial && material2.uniformsNeedUpdate === true) {
          WebGLUniforms.upload(_gl, getUniformList(materialProperties), m_uniforms, textures);
          material2.uniformsNeedUpdate = false;
        }
        if (material2.isSpriteMaterial) {
          p_uniforms.setValue(_gl, "center", object.center);
        }
        p_uniforms.setValue(_gl, "modelViewMatrix", object.modelViewMatrix);
        p_uniforms.setValue(_gl, "normalMatrix", object.normalMatrix);
        p_uniforms.setValue(_gl, "modelMatrix", object.matrixWorld);
        if (material2.isShaderMaterial || material2.isRawShaderMaterial) {
          const groups = material2.uniformsGroups;
          for (let i2 = 0, l2 = groups.length; i2 < l2; i2++) {
            const group = groups[i2];
            uniformsGroups.update(group, program);
            uniformsGroups.bind(group, program);
          }
        }
        return program;
      }
      function markUniformsLightsNeedsUpdate(uniforms, value) {
        uniforms.ambientLightColor.needsUpdate = value;
        uniforms.lightProbe.needsUpdate = value;
        uniforms.directionalLights.needsUpdate = value;
        uniforms.directionalLightShadows.needsUpdate = value;
        uniforms.pointLights.needsUpdate = value;
        uniforms.pointLightShadows.needsUpdate = value;
        uniforms.spotLights.needsUpdate = value;
        uniforms.spotLightShadows.needsUpdate = value;
        uniforms.rectAreaLights.needsUpdate = value;
        uniforms.hemisphereLights.needsUpdate = value;
      }
      function materialNeedsLights(material2) {
        return material2.isMeshLambertMaterial || material2.isMeshToonMaterial || material2.isMeshPhongMaterial || material2.isMeshStandardMaterial || material2.isShadowMaterial || material2.isShaderMaterial && material2.lights === true;
      }
      this.getActiveCubeFace = function() {
        return _currentActiveCubeFace;
      };
      this.getActiveMipmapLevel = function() {
        return _currentActiveMipmapLevel;
      };
      this.getRenderTarget = function() {
        return _currentRenderTarget;
      };
      this.setRenderTargetTextures = function(renderTarget, colorTexture, depthTexture) {
        properties.get(renderTarget.texture).__webglTexture = colorTexture;
        properties.get(renderTarget.depthTexture).__webglTexture = depthTexture;
        const renderTargetProperties = properties.get(renderTarget);
        renderTargetProperties.__hasExternalTextures = true;
        renderTargetProperties.__autoAllocateDepthBuffer = depthTexture === void 0;
        if (!renderTargetProperties.__autoAllocateDepthBuffer) {
          if (extensions.has("WEBGL_multisampled_render_to_texture") === true) {
            console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided");
            renderTargetProperties.__useRenderToTexture = false;
          }
        }
      };
      this.setRenderTargetFramebuffer = function(renderTarget, defaultFramebuffer) {
        const renderTargetProperties = properties.get(renderTarget);
        renderTargetProperties.__webglFramebuffer = defaultFramebuffer;
        renderTargetProperties.__useDefaultFramebuffer = defaultFramebuffer === void 0;
      };
      this.setRenderTarget = function(renderTarget, activeCubeFace = 0, activeMipmapLevel = 0) {
        _currentRenderTarget = renderTarget;
        _currentActiveCubeFace = activeCubeFace;
        _currentActiveMipmapLevel = activeMipmapLevel;
        let useDefaultFramebuffer = true;
        let framebuffer = null;
        let isCube = false;
        let isRenderTarget3D = false;
        if (renderTarget) {
          const renderTargetProperties = properties.get(renderTarget);
          if (renderTargetProperties.__useDefaultFramebuffer !== void 0) {
            state.bindFramebuffer(_gl.FRAMEBUFFER, null);
            useDefaultFramebuffer = false;
          } else if (renderTargetProperties.__webglFramebuffer === void 0) {
            textures.setupRenderTarget(renderTarget);
          } else if (renderTargetProperties.__hasExternalTextures) {
            textures.rebindTextures(renderTarget, properties.get(renderTarget.texture).__webglTexture, properties.get(renderTarget.depthTexture).__webglTexture);
          } else if (renderTarget.depthBuffer) {
            const depthTexture = renderTarget.depthTexture;
            if (renderTargetProperties.__boundDepthTexture !== depthTexture) {
              if (depthTexture !== null && properties.has(depthTexture) && (renderTarget.width !== depthTexture.image.width || renderTarget.height !== depthTexture.image.height)) {
                throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");
              }
              textures.setupDepthRenderbuffer(renderTarget);
            }
          }
          const texture = renderTarget.texture;
          if (texture.isData3DTexture || texture.isDataArrayTexture || texture.isCompressedArrayTexture) {
            isRenderTarget3D = true;
          }
          const __webglFramebuffer = properties.get(renderTarget).__webglFramebuffer;
          if (renderTarget.isWebGLCubeRenderTarget) {
            if (Array.isArray(__webglFramebuffer[activeCubeFace])) {
              framebuffer = __webglFramebuffer[activeCubeFace][activeMipmapLevel];
            } else {
              framebuffer = __webglFramebuffer[activeCubeFace];
            }
            isCube = true;
          } else if (renderTarget.samples > 0 && textures.useMultisampledRTT(renderTarget) === false) {
            framebuffer = properties.get(renderTarget).__webglMultisampledFramebuffer;
          } else {
            if (Array.isArray(__webglFramebuffer)) {
              framebuffer = __webglFramebuffer[activeMipmapLevel];
            } else {
              framebuffer = __webglFramebuffer;
            }
          }
          _currentViewport.copy(renderTarget.viewport);
          _currentScissor.copy(renderTarget.scissor);
          _currentScissorTest = renderTarget.scissorTest;
        } else {
          _currentViewport.copy(_viewport).multiplyScalar(_pixelRatio).floor();
          _currentScissor.copy(_scissor).multiplyScalar(_pixelRatio).floor();
          _currentScissorTest = _scissorTest;
        }
        const framebufferBound = state.bindFramebuffer(_gl.FRAMEBUFFER, framebuffer);
        if (framebufferBound && useDefaultFramebuffer) {
          state.drawBuffers(renderTarget, framebuffer);
        }
        state.viewport(_currentViewport);
        state.scissor(_currentScissor);
        state.setScissorTest(_currentScissorTest);
        if (isCube) {
          const textureProperties = properties.get(renderTarget.texture);
          _gl.framebufferTexture2D(_gl.FRAMEBUFFER, _gl.COLOR_ATTACHMENT0, _gl.TEXTURE_CUBE_MAP_POSITIVE_X + activeCubeFace, textureProperties.__webglTexture, activeMipmapLevel);
        } else if (isRenderTarget3D) {
          const textureProperties = properties.get(renderTarget.texture);
          const layer = activeCubeFace || 0;
          _gl.framebufferTextureLayer(_gl.FRAMEBUFFER, _gl.COLOR_ATTACHMENT0, textureProperties.__webglTexture, activeMipmapLevel || 0, layer);
        }
        _currentMaterialId = -1;
      };
      this.readRenderTargetPixels = function(renderTarget, x2, y2, width, height, buffer, activeCubeFaceIndex) {
        if (!(renderTarget && renderTarget.isWebGLRenderTarget)) {
          console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
          return;
        }
        let framebuffer = properties.get(renderTarget).__webglFramebuffer;
        if (renderTarget.isWebGLCubeRenderTarget && activeCubeFaceIndex !== void 0) {
          framebuffer = framebuffer[activeCubeFaceIndex];
        }
        if (framebuffer) {
          state.bindFramebuffer(_gl.FRAMEBUFFER, framebuffer);
          try {
            const texture = renderTarget.texture;
            const textureFormat = texture.format;
            const textureType = texture.type;
            if (!capabilities.textureFormatReadable(textureFormat)) {
              console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");
              return;
            }
            if (!capabilities.textureTypeReadable(textureType)) {
              console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");
              return;
            }
            if (x2 >= 0 && x2 <= renderTarget.width - width && (y2 >= 0 && y2 <= renderTarget.height - height)) {
              _gl.readPixels(x2, y2, width, height, utils.convert(textureFormat), utils.convert(textureType), buffer);
            }
          } finally {
            const framebuffer2 = _currentRenderTarget !== null ? properties.get(_currentRenderTarget).__webglFramebuffer : null;
            state.bindFramebuffer(_gl.FRAMEBUFFER, framebuffer2);
          }
        }
      };
      this.readRenderTargetPixelsAsync = async function(renderTarget, x2, y2, width, height, buffer, activeCubeFaceIndex) {
        if (!(renderTarget && renderTarget.isWebGLRenderTarget)) {
          throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
        }
        let framebuffer = properties.get(renderTarget).__webglFramebuffer;
        if (renderTarget.isWebGLCubeRenderTarget && activeCubeFaceIndex !== void 0) {
          framebuffer = framebuffer[activeCubeFaceIndex];
        }
        if (framebuffer) {
          const texture = renderTarget.texture;
          const textureFormat = texture.format;
          const textureType = texture.type;
          if (!capabilities.textureFormatReadable(textureFormat)) {
            throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");
          }
          if (!capabilities.textureTypeReadable(textureType)) {
            throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");
          }
          if (x2 >= 0 && x2 <= renderTarget.width - width && (y2 >= 0 && y2 <= renderTarget.height - height)) {
            state.bindFramebuffer(_gl.FRAMEBUFFER, framebuffer);
            const glBuffer = _gl.createBuffer();
            _gl.bindBuffer(_gl.PIXEL_PACK_BUFFER, glBuffer);
            _gl.bufferData(_gl.PIXEL_PACK_BUFFER, buffer.byteLength, _gl.STREAM_READ);
            _gl.readPixels(x2, y2, width, height, utils.convert(textureFormat), utils.convert(textureType), 0);
            const currFramebuffer = _currentRenderTarget !== null ? properties.get(_currentRenderTarget).__webglFramebuffer : null;
            state.bindFramebuffer(_gl.FRAMEBUFFER, currFramebuffer);
            const sync = _gl.fenceSync(_gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
            _gl.flush();
            await probeAsync(_gl, sync, 4);
            _gl.bindBuffer(_gl.PIXEL_PACK_BUFFER, glBuffer);
            _gl.getBufferSubData(_gl.PIXEL_PACK_BUFFER, 0, buffer);
            _gl.deleteBuffer(glBuffer);
            _gl.deleteSync(sync);
            return buffer;
          } else {
            throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.");
          }
        }
      };
      this.copyFramebufferToTexture = function(texture, position = null, level = 0) {
        if (texture.isTexture !== true) {
          warnOnce("WebGLRenderer: copyFramebufferToTexture function signature has changed.");
          position = arguments[0] || null;
          texture = arguments[1];
        }
        const levelScale = Math.pow(2, -level);
        const width = Math.floor(texture.image.width * levelScale);
        const height = Math.floor(texture.image.height * levelScale);
        const x2 = position !== null ? position.x : 0;
        const y2 = position !== null ? position.y : 0;
        textures.setTexture2D(texture, 0);
        _gl.copyTexSubImage2D(_gl.TEXTURE_2D, level, 0, 0, x2, y2, width, height);
        state.unbindTexture();
      };
      const _srcFramebuffer = _gl.createFramebuffer();
      const _dstFramebuffer = _gl.createFramebuffer();
      this.copyTextureToTexture = function(srcTexture, dstTexture, srcRegion = null, dstPosition = null, srcLevel = 0, dstLevel = null) {
        if (srcTexture.isTexture !== true) {
          warnOnce("WebGLRenderer: copyTextureToTexture function signature has changed.");
          dstPosition = arguments[0] || null;
          srcTexture = arguments[1];
          dstTexture = arguments[2];
          dstLevel = arguments[3] || 0;
          srcRegion = null;
        }
        if (dstLevel === null) {
          if (srcLevel !== 0) {
            warnOnce("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels.");
            dstLevel = srcLevel;
            srcLevel = 0;
          } else {
            dstLevel = 0;
          }
        }
        let width, height, depth2, minX, minY, minZ;
        let dstX, dstY, dstZ;
        const image = srcTexture.isCompressedTexture ? srcTexture.mipmaps[dstLevel] : srcTexture.image;
        if (srcRegion !== null) {
          width = srcRegion.max.x - srcRegion.min.x;
          height = srcRegion.max.y - srcRegion.min.y;
          depth2 = srcRegion.isBox3 ? srcRegion.max.z - srcRegion.min.z : 1;
          minX = srcRegion.min.x;
          minY = srcRegion.min.y;
          minZ = srcRegion.isBox3 ? srcRegion.min.z : 0;
        } else {
          const levelScale = Math.pow(2, -srcLevel);
          width = Math.floor(image.width * levelScale);
          height = Math.floor(image.height * levelScale);
          if (srcTexture.isDataArrayTexture) {
            depth2 = image.depth;
          } else if (srcTexture.isData3DTexture) {
            depth2 = Math.floor(image.depth * levelScale);
          } else {
            depth2 = 1;
          }
          minX = 0;
          minY = 0;
          minZ = 0;
        }
        if (dstPosition !== null) {
          dstX = dstPosition.x;
          dstY = dstPosition.y;
          dstZ = dstPosition.z;
        } else {
          dstX = 0;
          dstY = 0;
          dstZ = 0;
        }
        const glFormat = utils.convert(dstTexture.format);
        const glType = utils.convert(dstTexture.type);
        let glTarget;
        if (dstTexture.isData3DTexture) {
          textures.setTexture3D(dstTexture, 0);
          glTarget = _gl.TEXTURE_3D;
        } else if (dstTexture.isDataArrayTexture || dstTexture.isCompressedArrayTexture) {
          textures.setTexture2DArray(dstTexture, 0);
          glTarget = _gl.TEXTURE_2D_ARRAY;
        } else {
          textures.setTexture2D(dstTexture, 0);
          glTarget = _gl.TEXTURE_2D;
        }
        _gl.pixelStorei(_gl.UNPACK_FLIP_Y_WEBGL, dstTexture.flipY);
        _gl.pixelStorei(_gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, dstTexture.premultiplyAlpha);
        _gl.pixelStorei(_gl.UNPACK_ALIGNMENT, dstTexture.unpackAlignment);
        const currentUnpackRowLen = _gl.getParameter(_gl.UNPACK_ROW_LENGTH);
        const currentUnpackImageHeight = _gl.getParameter(_gl.UNPACK_IMAGE_HEIGHT);
        const currentUnpackSkipPixels = _gl.getParameter(_gl.UNPACK_SKIP_PIXELS);
        const currentUnpackSkipRows = _gl.getParameter(_gl.UNPACK_SKIP_ROWS);
        const currentUnpackSkipImages = _gl.getParameter(_gl.UNPACK_SKIP_IMAGES);
        _gl.pixelStorei(_gl.UNPACK_ROW_LENGTH, image.width);
        _gl.pixelStorei(_gl.UNPACK_IMAGE_HEIGHT, image.height);
        _gl.pixelStorei(_gl.UNPACK_SKIP_PIXELS, minX);
        _gl.pixelStorei(_gl.UNPACK_SKIP_ROWS, minY);
        _gl.pixelStorei(_gl.UNPACK_SKIP_IMAGES, minZ);
        const isSrc3D = srcTexture.isDataArrayTexture || srcTexture.isData3DTexture;
        const isDst3D = dstTexture.isDataArrayTexture || dstTexture.isData3DTexture;
        if (srcTexture.isDepthTexture) {
          const srcTextureProperties = properties.get(srcTexture);
          const dstTextureProperties = properties.get(dstTexture);
          const srcRenderTargetProperties = properties.get(srcTextureProperties.__renderTarget);
          const dstRenderTargetProperties = properties.get(dstTextureProperties.__renderTarget);
          state.bindFramebuffer(_gl.READ_FRAMEBUFFER, srcRenderTargetProperties.__webglFramebuffer);
          state.bindFramebuffer(_gl.DRAW_FRAMEBUFFER, dstRenderTargetProperties.__webglFramebuffer);
          for (let i2 = 0; i2 < depth2; i2++) {
            if (isSrc3D) {
              _gl.framebufferTextureLayer(_gl.READ_FRAMEBUFFER, _gl.COLOR_ATTACHMENT0, properties.get(srcTexture).__webglTexture, srcLevel, minZ + i2);
              _gl.framebufferTextureLayer(_gl.DRAW_FRAMEBUFFER, _gl.COLOR_ATTACHMENT0, properties.get(dstTexture).__webglTexture, dstLevel, dstZ + i2);
            }
            _gl.blitFramebuffer(minX, minY, width, height, dstX, dstY, width, height, _gl.DEPTH_BUFFER_BIT, _gl.NEAREST);
          }
          state.bindFramebuffer(_gl.READ_FRAMEBUFFER, null);
          state.bindFramebuffer(_gl.DRAW_FRAMEBUFFER, null);
        } else if (srcLevel !== 0 || srcTexture.isRenderTargetTexture || properties.has(srcTexture)) {
          const srcTextureProperties = properties.get(srcTexture);
          const dstTextureProperties = properties.get(dstTexture);
          state.bindFramebuffer(_gl.READ_FRAMEBUFFER, _srcFramebuffer);
          state.bindFramebuffer(_gl.DRAW_FRAMEBUFFER, _dstFramebuffer);
          for (let i2 = 0; i2 < depth2; i2++) {
            if (isSrc3D) {
              _gl.framebufferTextureLayer(_gl.READ_FRAMEBUFFER, _gl.COLOR_ATTACHMENT0, srcTextureProperties.__webglTexture, srcLevel, minZ + i2);
            } else {
              _gl.framebufferTexture2D(_gl.READ_FRAMEBUFFER, _gl.COLOR_ATTACHMENT0, _gl.TEXTURE_2D, srcTextureProperties.__webglTexture, srcLevel);
            }
            if (isDst3D) {
              _gl.framebufferTextureLayer(_gl.DRAW_FRAMEBUFFER, _gl.COLOR_ATTACHMENT0, dstTextureProperties.__webglTexture, dstLevel, dstZ + i2);
            } else {
              _gl.framebufferTexture2D(_gl.DRAW_FRAMEBUFFER, _gl.COLOR_ATTACHMENT0, _gl.TEXTURE_2D, dstTextureProperties.__webglTexture, dstLevel);
            }
            if (srcLevel !== 0) {
              _gl.blitFramebuffer(minX, minY, width, height, dstX, dstY, width, height, _gl.COLOR_BUFFER_BIT, _gl.NEAREST);
            } else if (isDst3D) {
              _gl.copyTexSubImage3D(glTarget, dstLevel, dstX, dstY, dstZ + i2, minX, minY, width, height);
            } else {
              _gl.copyTexSubImage2D(glTarget, dstLevel, dstX, dstY, minX, minY, width, height);
            }
          }
          state.bindFramebuffer(_gl.READ_FRAMEBUFFER, null);
          state.bindFramebuffer(_gl.DRAW_FRAMEBUFFER, null);
        } else {
          if (isDst3D) {
            if (srcTexture.isDataTexture || srcTexture.isData3DTexture) {
              _gl.texSubImage3D(glTarget, dstLevel, dstX, dstY, dstZ, width, height, depth2, glFormat, glType, image.data);
            } else if (dstTexture.isCompressedArrayTexture) {
              _gl.compressedTexSubImage3D(glTarget, dstLevel, dstX, dstY, dstZ, width, height, depth2, glFormat, image.data);
            } else {
              _gl.texSubImage3D(glTarget, dstLevel, dstX, dstY, dstZ, width, height, depth2, glFormat, glType, image);
            }
          } else {
            if (srcTexture.isDataTexture) {
              _gl.texSubImage2D(_gl.TEXTURE_2D, dstLevel, dstX, dstY, width, height, glFormat, glType, image.data);
            } else if (srcTexture.isCompressedTexture) {
              _gl.compressedTexSubImage2D(_gl.TEXTURE_2D, dstLevel, dstX, dstY, image.width, image.height, glFormat, image.data);
            } else {
              _gl.texSubImage2D(_gl.TEXTURE_2D, dstLevel, dstX, dstY, width, height, glFormat, glType, image);
            }
          }
        }
        _gl.pixelStorei(_gl.UNPACK_ROW_LENGTH, currentUnpackRowLen);
        _gl.pixelStorei(_gl.UNPACK_IMAGE_HEIGHT, currentUnpackImageHeight);
        _gl.pixelStorei(_gl.UNPACK_SKIP_PIXELS, currentUnpackSkipPixels);
        _gl.pixelStorei(_gl.UNPACK_SKIP_ROWS, currentUnpackSkipRows);
        _gl.pixelStorei(_gl.UNPACK_SKIP_IMAGES, currentUnpackSkipImages);
        if (dstLevel === 0 && dstTexture.generateMipmaps) {
          _gl.generateMipmap(glTarget);
        }
        state.unbindTexture();
      };
      this.copyTextureToTexture3D = function(srcTexture, dstTexture, srcRegion = null, dstPosition = null, level = 0) {
        if (srcTexture.isTexture !== true) {
          warnOnce("WebGLRenderer: copyTextureToTexture3D function signature has changed.");
          srcRegion = arguments[0] || null;
          dstPosition = arguments[1] || null;
          srcTexture = arguments[2];
          dstTexture = arguments[3];
          level = arguments[4] || 0;
        }
        warnOnce('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.');
        return this.copyTextureToTexture(srcTexture, dstTexture, srcRegion, dstPosition, level);
      };
      this.initRenderTarget = function(target) {
        if (properties.get(target).__webglFramebuffer === void 0) {
          textures.setupRenderTarget(target);
        }
      };
      this.initTexture = function(texture) {
        if (texture.isCubeTexture) {
          textures.setTextureCube(texture, 0);
        } else if (texture.isData3DTexture) {
          textures.setTexture3D(texture, 0);
        } else if (texture.isDataArrayTexture || texture.isCompressedArrayTexture) {
          textures.setTexture2DArray(texture, 0);
        } else {
          textures.setTexture2D(texture, 0);
        }
        state.unbindTexture();
      };
      this.resetState = function() {
        _currentActiveCubeFace = 0;
        _currentActiveMipmapLevel = 0;
        _currentRenderTarget = null;
        state.reset();
        bindingStates.reset();
      };
      if (typeof __THREE_DEVTOOLS__ !== "undefined") {
        __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
      }
    }
    get coordinateSystem() {
      return WebGLCoordinateSystem;
    }
    get outputColorSpace() {
      return this._outputColorSpace;
    }
    set outputColorSpace(colorSpace) {
      this._outputColorSpace = colorSpace;
      const gl = this.getContext();
      gl.drawingBufferColorspace = ColorManagement._getDrawingBufferColorSpace(colorSpace);
      gl.unpackColorSpace = ColorManagement._getUnpackColorSpace();
    }
  };

  // ns-hugo:/home/emma/Code/Projects/hugo-blog/themes/Alexandria/assets/js/three.js
  var canvas = document.getElementById("threejs-canvas");
  var renderer = new WebGLRenderer({ canvas, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0, 0);
  var scene = new Scene();
  var camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1e3
  );
  camera.position.z = 5;
  var geometry = new BoxGeometry();
  var material = new MeshBasicMaterial({ color: 65280 });
  var cube = new Mesh(geometry, material);
  scene.add(cube);
  var animate = () => {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
  };
  animate();

  // ns-hugo:/home/emma/Code/Projects/hugo-blog/themes/Alexandria/assets/js/main.js
  var swup = new _();
  swup.hooks.on("page:view", () => {
    build_headings();
  });
  var hasSeenRoot = false;
  var pathsVisitedStorage = sessionStorage.getItem("pathsVisited");
  if (pathsVisitedStorage) {
    hasSeenRoot = pathsVisitedStorage;
  }

  // ns-hugo:/home/emma/Code/Projects/hugo-blog/themes/Alexandria/assets/js/animations.js
  if (!hasSeenRoot) {
    const subtleLandAnimation = document.querySelectorAll(".subtle-land-anime");
    anime_es_default({
      targets: ".subtle-land-anime",
      opacity: [0, 1],
      translateY: [-100, 0],
      duration: 1300,
      easing: "easeOutQuad"
    });
  }

  // <stdin>
  var swup2 = new _();
  swup2.hooks.on("page:view", () => {
    build_headings();
  });
  var hasSeenRoot2 = false;
  var pathsVisitedStorage2 = sessionStorage.getItem("pathsVisited");
  if (pathsVisitedStorage2) {
    hasSeenRoot2 = pathsVisitedStorage2;
  }
})();
/*! Bundled license information:

lucide/dist/esm/createElement.js:
  (**
   * @license lucide v0.462.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/replaceElement.js:
  (**
   * @license lucide v0.462.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/defaultAttributes.js:
  (**
   * @license lucide v0.462.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/icons/link.js:
  (**
   * @license lucide v0.462.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide/dist/esm/lucide.js:
  (**
   * @license lucide v0.462.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

three/build/three.core.js:
  (**
   * @license
   * Copyright 2010-2024 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)

three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2024 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
