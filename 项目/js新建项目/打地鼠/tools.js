function addEvent(obj, type, handle) {
    try {  // Chrome、FireFox、Opera、Safari、IE9.0及其以上版本
        obj.addEventListener(type, handle, false);
    } catch (e) {
        try {  // IE8.0及其以下版本
            obj.attachEvent('on' + type, handle);
        } catch (e) {  // 早期浏览器
            obj['on' + type] = handle;
        }
    }
}

window.tools = {};

window.tools.getMouse = function (element) {
    var mouse = { x: 0, y: 0 };

    addEvent(element, "mousemove", function (e) {
        var x, y;
        var e = e || window.event;

        if (e.pageX || e.pageY) { //兼容做到ie9
            x = e.pageX;
            y = e.pageY;
        } else {
            x = e.clientX + document.body.scrollLeft || document.documentElement.scrollLeft;
            y = e.clientY + document.body.scrollTop || document.documentElement.scrollTop;
        }

        x -= element.offsetLeft;
        y -= element.offsetTop;

        mouse.x = x;
        mouse.y = y;
    });

    return mouse;
};
