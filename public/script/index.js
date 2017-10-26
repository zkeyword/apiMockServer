
window.onload = function () {
    var container = document.getElementById('container');
    var content = document.getElementById('content');
    var oDivs = DOM.children(content, "div"); oDivs[0].st = 0;
    for (var i = 1; i < oDivs.length; i++) { oDivs[i].st = oDivs[i].offsetTop; }
    var oLis = DOM.getElesByClass("tabOption");
    var flag = 0;
    var upFlag = oLis.length;
    ; (function () {
        function fn(e) {
            e = e || window.event;
            if (e.wheelDelta) { var n = e.wheelDelta; } else if (e.detail) { var n = e.detail * -1; }
            if (n > 0) { container.scrollTop -= 12; } else if (n < 0) { container.scrollTop += 12; }
            slider.style.top = container.scrollTop * container.offsetHeight / content.offsetHeight + "px";
            slider.offsetTop * (content.offsetHeight / container.offsetHeight);
            var st = container.scrollTop;
            if (st > this.preSt) {
                for (var j = 0; j < oLis.length; j++) { if (st < oDivs[j].st) break; }
                if (oLis[j - 2] && this.preLi !== j) {
                    // if ((j) > (flag + 1)) { DOM.removeClass(oLis[j - 2], "selectedTab"); DOM.addClass(oLis[j - 1], "selectedTab"); animate(blueline, { top: (j - 1) * 48 }, 500, 2); }
                } flag = j - 1;
            } else if (st < this.preSt) {
                for (var j = oLis.length - 1; j >= 0; j--) { if (st > oDivs[j].st) break; }
                if (oLis[j + 2] && this.preLi !== j) {
                    if (flag === undefined) return;
                    // if ((j) < (flag)) { for (var k = 0; k < oLis.length; k++) { DOM.removeClass(oLis[k], "selectedTab"); }; DOM.addClass(oLis[j + 1], "selectedTab"); animate(blueline, { top: (j + 1) * 48 }, 500, 2); upFlag = j + 1; }
                }
            } this.preSt = st; if (e.preventDefault) e.preventDefault(); return false;
        }
        container.onmousewheel = fn;
        if (container.addEventListener) container.addEventListener("DOMMouseScroll", fn, false);
        slider = document.createElement('span');
        slider.id = "slider";
        slider.style.height = container.offsetHeight * (container.offsetHeight / content.offsetHeight) + "px";
        sliderParent.appendChild(slider);
        on(slider, "mousedown", down);
        var blueline = document.getElementById("blueline");
        function changeTab() {
            var index = DOM.getIndex(this);
            for (var i = 0; i < oLis.length; i++) { DOM.removeClass(oLis[i], "selectedTab"); }
            DOM.addClass(this, "selectedTab");
            animate(container, { scrollTop: oDivs[index].st }, 500, 1);
            var t = oDivs[index].st * container.offsetHeight / content.offsetHeight;
            // animate(slider, { top: t }, 500); animate(blueline, { top: index * 48 }, 500, 2);
        }
        var tabPannel1 = document.getElementById("outerWrap");
        var oLis = DOM.children(DOM.children(tabPannel1, "ul")[0], "li");
        for (var i = 0; i < oLis.length; i++) { oLis[i].onclick = changeTab; };
    })();
}