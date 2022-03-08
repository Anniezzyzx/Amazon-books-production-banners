(function () {
  'use strict';

  // BannerUtils version 3.2.0
  function getBrowser() {
    // desktop browsers as of 2019-10-04
    var browserslist = ['other', 'blink', 'chrome', 'safari', 'opera', 'ie', 'edge', 'firefox'];
    var browser = 0;

    if ('WebkitAppearance' in document.documentElement.style) {
      browser = 1; // chrome/safari/opera/edge/firefox

      if (/google/i.test(window.navigator.vendor)) browser = 2;
      if (/apple/i.test(window.navigator.vendor)) browser = 3;
      if (!!window.opr && !!window.opr.addons || !!window.opera || / OPR\//.test(window.navigator.userAgent)) browser = 4;
    }

    if (
    /*@cc_on!@*/
     !!document.documentMode) browser = 5; // ie 6-11

    if (browser !== 5 && !!window.StyleMedia) browser = 6;
    if (typeof InstallTrigger !== 'undefined' || 'MozAppearance' in document.documentElement.style) browser = 7;
    return browserslist[browser];
  }
  var browser = getBrowser();
  function es5() {
    return parseInt('010', 10) === 10 && function () {
      return !this;
    }() && !!(Date && Date.prototype && Date.prototype.toISOString); // IE10, FF21, CH23, SF6, OP15, iOS7, AN4.4
  }
  var log = {
    // https://bit.ly/32ZIpgo
    traceOn: window.console.log.bind(window.console, '%s'),
    traceOff: function traceOff() {},
    trace: window.console.log.bind(window.console, '%s'),

    set debug(bool) {
      this._debug = bool;
      bool ? this.trace = this.traceOn : this.trace = this.traceOff;
    },

    get debug() {
      return this._debug;
    }

  };
  function domIds(scope) {
    if (scope === void 0) {
      scope = document;
    }

    var all = scope.getElementsByTagName('*');
    var haveIds = {};
    var i = all.length;

    while (i--) {
      if (all[i].id) {
        var safeId = all[i].id.replace(/-|:|\./g, '_');
        haveIds[safeId] = all[i];
      }
    }

    return haveIds;
  }

  var Banner = {
    init: function init() {
      var dom = domIds(); // Animation ---------------------------------------------------

      function display() {
        es5() ? animation() : dom.backup.classList.add('backup');

        function animation() {
          var tl = gsap.timeline({
            defaults: {
              ease: 'sine.inOut'
            }
          });
          var animFrames = 9;
          var fps = 12;
          tl.to('#animation', animFrames / fps, {
            backgroundPosition: '100%',
            ease: 'steps(9)'
          }, '+=2.5').from('#polygon', animFrames / fps, {
            y: '+=400',
            ease: 'circ.out'
          }, '-=0.65').to('#bg', 0.7, {
            y: '-=200'
          }, '-=0.8').to('#txt_2', 0.5, {
            autoAlpha: 0
          }, '+=4').from('#txt_3, #logo', 0.5, {
            autoAlpha: 0
          });
          dom.ad_content.classList.remove('invisible');
        }
      } // Events ------------------------------------------------------


      function clickThru() {
        dom.ad_content.addEventListener('click', function () {
          window.open(window.clickTag || window.clickTAG);
        });
      } // Init --------------------------------------------------------


      clickThru();
      display();
    }
  };

  window.onload = function () {
    window.requestAnimationFrame(Banner.init);
  };

}());
