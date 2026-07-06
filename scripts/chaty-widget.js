(function () {
  'use strict';

  // URLs obfuscated with base64   decode at runtime
  var WA_URL   = atob('aHR0cHM6Ly93YS5tZS82NjYyMjc2OTkzNw==');   // wa.me/66622769937
  var LINE_URL = atob('aHR0cHM6Ly9saW5lLm1lL3RpL3AvQm9kYXpleQ=='); // line.me/ti/p/Bodazey
  var FB_URL   = 'https://www.facebook.com/cigarschiangmai';
  var MSG_URL  = 'https://m.me/cigarschiangmai';
  var EMAIL_URL = atob('bWFpbHRvOmluZm9AY254Y2lnYXJzLmNvbQ==');

  var GOLD      = '#D4AF37';
  var LEFT      = 20;
  var BOTTOM    = 28;
  var TRIG_SIZE = 52;
  var CHAN_SIZE  = 46;
  var GAP        = 10;

  var isMobile = window.innerWidth <= 768;

  var CNX_LOGO_HTML = '<img src="/images/cnxcigars-cnx-cigars-logo-circle.webp" width="52" height="52" alt="" aria-hidden="true" style="width:52px;height:52px;display:block;pointer-events:none;">';

  var CHAT_ICON =
    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' +
    '<path d="M20 2H4C2.9 2 2 2.9 2 4v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" fill="#0a0a0a"/>' +
    '<circle cx="8"  cy="11" r="1.3" fill="' + GOLD + '"/>' +
    '<circle cx="12" cy="11" r="1.3" fill="' + GOLD + '"/>' +
    '<circle cx="16" cy="11" r="1.3" fill="' + GOLD + '"/>' +
    '</svg>';

  var CLOSE_ICON =
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' +
    '<path d="M18 6L6 18M6 6l12 12" stroke="#0a0a0a" stroke-width="2.5" stroke-linecap="round"/>' +
    '</svg>';

  var WA_SVG =
    '<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" xmlns="http://www.w3.org/2000/svg">' +
    '<path d="M12 2C6.477 2 2 6.477 2 12c0 1.85.504 3.58 1.382 5.065L2 22l5.085-1.33A9.956 9.956 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm5.5 13.9c-.26.73-1.51 1.4-2.08 1.44-.57.05-1.1.25-3.71-.77-3.14-1.24-5.12-4.45-5.28-4.65-.15-.21-1.25-1.67-1.25-3.18 0-1.52.8-2.26 1.08-2.57.28-.31.61-.39.82-.39.2 0 .41.003.59.01.19.008.44-.07.69.53.26.62.88 2.15.96 2.31.07.15.13.34.026.54-.1.21-.16.34-.31.52-.15.18-.32.4-.46.54-.15.15-.31.32-.13.63.18.31.8 1.31 1.71 2.13 1.17 1.04 2.16 1.37 2.47 1.52.31.15.49.13.67-.08.18-.21.77-.9.97-1.21.2-.31.41-.26.69-.15.28.1 1.79.84 2.1 1 .31.15.51.23.59.36.08.13.08.74-.18 1.47z"/>' +
    '</svg>';

  var LINE_SVG =
    '<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" xmlns="http://www.w3.org/2000/svg">' +
    '<path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596a.618.618 0 01-.199.031c-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595a.645.645 0 01.199-.032c.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.346 0 .625.285.625.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>' +
    '</svg>';

  var FB_SVG =
    '<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" xmlns="http://www.w3.org/2000/svg">' +
    '<path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047v-2.66c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.265h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>' +
    '</svg>';

  var MSG_SVG =
    '<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" xmlns="http://www.w3.org/2000/svg">' +
    '<path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.664V24l4.088-2.242c1.092.3 2.246.464 3.443.464 6.627 0 12-4.975 12-11.111S18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26 6.559-6.963 3.13 3.26 5.889-3.26-6.56 6.963z"/>' +
    '</svg>';

  var EMAIL_SVG =
    '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">' +
    '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>' +
    '<polyline points="22,6 12,13 2,6"/>' +
    '</svg>';

  // Array order = bottom to top when open (index 0 is closest to trigger)
  var channels = [
    { label: 'WhatsApp',  url: WA_URL,    svg: WA_SVG    },
    { label: 'LINE',      url: LINE_URL,  svg: LINE_SVG  },
    { label: 'Facebook',  url: FB_URL,    svg: FB_SVG    },
    { label: 'Messenger', url: MSG_URL,   svg: MSG_SVG   },
    { label: 'Email',     url: EMAIL_URL, svg: EMAIL_SVG }
  ];

  function createWidget() {
    var isOpen = false;

    /* --- trigger --- */
    var trigger = document.createElement('div');
    trigger.id = 'cnx-chat-trigger';
    trigger.setAttribute('role', 'button');
    trigger.setAttribute('tabindex', '0');
    trigger.setAttribute('aria-label', 'Open chat');
    trigger.style.cssText = [
      'position:fixed',
      'bottom:' + BOTTOM + 'px',
      'left:' + LEFT + 'px',
      'width:' + TRIG_SIZE + 'px',
      'height:' + TRIG_SIZE + 'px',
      'background:' + GOLD,
      'border-radius:50%',
      'cursor:pointer',
      'z-index:10010',
      'display:flex',
      'align-items:center',
      'justify-content:center',
      'overflow:hidden',
      'transition:transform 0.2s ease',
      'box-shadow:0 4px 18px rgba(212,175,55,0.28)'
    ].join(';');
    trigger.innerHTML = CHAT_ICON;
    document.body.appendChild(trigger);

    /* --- "Chat now" label (desktop only) --- */
    var chatNow = null;
    if (!isMobile) {
      chatNow = document.createElement('div');
      chatNow.style.cssText = [
        'position:fixed',
        'bottom:' + (BOTTOM + TRIG_SIZE / 2 - 11) + 'px',
        'left:' + (LEFT + TRIG_SIZE + 12) + 'px',
        'background:rgba(8,8,8,0.92)',
        'color:#f0ece4',
        'padding:6px 13px',
        'font-family:\'DM Sans\',system-ui,sans-serif',
        'font-size:11px',
        'letter-spacing:0.12em',
        'text-transform:uppercase',
        'white-space:nowrap',
        'pointer-events:none',
        'opacity:0',
        'transition:opacity 0.18s ease',
        'z-index:10009'
      ].join(';');
      chatNow.textContent = 'Chat now';
      document.body.appendChild(chatNow);
    }

    /* --- channel rows --- */
    var channelEls = [];

    channels.forEach(function (ch, idx) {
      var targetBottom = BOTTOM + TRIG_SIZE + GAP + idx * (CHAN_SIZE + GAP);

      var row = document.createElement('div');
      row.style.cssText = [
        'position:fixed',
        'bottom:' + BOTTOM + 'px',
        'left:' + LEFT + 'px',
        'display:flex',
        'align-items:center',
        'gap:10px',
        'opacity:0',
        'pointer-events:none',
        'transition:bottom 0.28s ease, opacity 0.22s ease',
        'z-index:10009'
      ].join(';');

      var link = document.createElement('a');
      link.href = '#';
      link.setAttribute('aria-label', ch.label);
      link.style.cssText = 'display:flex;align-items:center;gap:10px;text-decoration:none;';
      (function(url){link.addEventListener('click',function(e){e.preventDefault();window.open(url,'_blank','noopener,noreferrer');});})(ch.url);

      var circle = document.createElement('div');
      circle.style.cssText = [
        'width:' + CHAN_SIZE + 'px',
        'height:' + CHAN_SIZE + 'px',
        'background:#1e1e1e',
        'border:1px solid rgba(255,255,255,0.09)',
        'border-radius:50%',
        'display:flex',
        'align-items:center',
        'justify-content:center',
        'flex-shrink:0',
        'color:#7a7570',
        'transition:background 0.18s ease, color 0.18s ease, border-color 0.18s ease'
      ].join(';');
      circle.innerHTML = ch.svg;

      var label = document.createElement('span');
      label.style.cssText = [
        'font-family:\'DM Sans\',system-ui,sans-serif',
        'font-size:11px',
        'letter-spacing:0.14em',
        'text-transform:uppercase',
        'color:' + GOLD,
        'white-space:nowrap',
        'opacity:0',
        'transition:opacity 0.18s ease'
      ].join(';');
      label.textContent = ch.label;

      link.addEventListener('mouseenter', function () {
        circle.style.background = '#2a2a2a';
        circle.style.color = GOLD;
        circle.style.borderColor = 'rgba(212,175,55,0.25)';
        if (!isMobile) label.style.opacity = '1';
      });
      link.addEventListener('mouseleave', function () {
        circle.style.background = '#1e1e1e';
        circle.style.color = '#7a7570';
        circle.style.borderColor = 'rgba(255,255,255,0.09)';
        label.style.opacity = '0';
      });

      link.appendChild(circle);
      link.appendChild(label);
      row.appendChild(link);
      document.body.appendChild(row);

      channelEls.push({ el: row, bottom: targetBottom });
    });

    /* --- open / close --- */
    function openWidget() {
      isOpen = true;
      trigger.innerHTML = CNX_LOGO_HTML;
      if (chatNow) chatNow.style.opacity = '0';
      channelEls.forEach(function (item, idx) {
        item.el.style.transitionDelay = (idx * 0.07) + 's';
        item.el.style.bottom = item.bottom + 'px';
        item.el.style.opacity = '1';
        item.el.style.pointerEvents = 'auto';
      });
    }

    function closeWidget() {
      isOpen = false;
      trigger.innerHTML = CHAT_ICON;
      channelEls.forEach(function (item) {
        item.el.style.transitionDelay = '0s';
        item.el.style.bottom = BOTTOM + 'px';
        item.el.style.opacity = '0';
        item.el.style.pointerEvents = 'none';
      });
    }

    /* --- close timer (desktop hover-to-close) --- */
    var closeTimer = null;
    function startCloseTimer() {
      clearTimeout(closeTimer);
      closeTimer = setTimeout(function () { if (isOpen) closeWidget(); }, 260);
    }
    function cancelCloseTimer() { clearTimeout(closeTimer); }

    /* --- events --- */
    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      cancelCloseTimer();
      isOpen ? closeWidget() : openWidget();
    });

    trigger.addEventListener('mouseenter', function () {
      trigger.style.transform = 'scale(1.08)';
      if (!isMobile) {
        cancelCloseTimer();
        if (!isOpen) openWidget();
      } else {
        if (!isOpen && chatNow) chatNow.style.opacity = '1';
      }
    });
    trigger.addEventListener('mouseleave', function () {
      trigger.style.transform = 'scale(1)';
      if (chatNow) chatNow.style.opacity = '0';
      if (!isMobile) startCloseTimer();
    });

    /* --- keep open while mouse is over any channel row --- */
    channelEls.forEach(function (item) {
      item.el.addEventListener('mouseenter', function () { if (!isMobile) cancelCloseTimer(); });
      item.el.addEventListener('mouseleave', function () { if (!isMobile) startCloseTimer(); });
    });

    document.addEventListener('click', function (e) {
      if (!isOpen) return;
      var onChannel = channelEls.some(function (item) { return item.el.contains(e.target); });
      if (!onChannel && !trigger.contains(e.target)) closeWidget();
    });

    /* --- "Chat now" on mouse entering bottom-left zone (desktop only) --- */
    if (!isMobile && chatNow) {
      document.addEventListener('mousemove', function (e) {
        if (isOpen) return;
        var inZone = e.clientX < window.innerWidth * 0.25 && e.clientY > window.innerHeight * 0.78;
        chatNow.style.opacity = inZone ? '1' : '0';
      });
    }
  }

  function initWhenReady() {
    var preloader = document.getElementById('preloader');
    if (!preloader) {
      // No preloader on this page   init now
      createWidget();
      return;
    }
    // Wait for preloader to be removed from DOM, then init
    var observer = new MutationObserver(function (mutations) {
      for (var i = 0; i < mutations.length; i++) {
        var removed = mutations[i].removedNodes;
        for (var j = 0; j < removed.length; j++) {
          if (removed[j].id === 'preloader') {
            observer.disconnect();
            createWidget();
            return;
          }
        }
      }
    });
    observer.observe(document.body, { childList: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWhenReady);
  } else {
    initWhenReady();
  }
})();
