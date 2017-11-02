function getMouse(e) {
    var element = canvas,
        offsetX = 0,
        offsetY = 0,
        mx, my;

    if (element.offsetParent !== undefined) {
        do {
            offsetX += element.offsetLeft;
            offsetY += element.offsetTop;
        } while ((element = element.offsetParent));
    }

    offsetX += this.stylePaddingLeft + this.styleBorderLeft + this.htmlLeft;
    offsetY += this.stylePaddingTop + this.styleBorderTop + this.htmlTop;

    mx = e.pageX - offsetX;
    my = e.pageY - offsetY;

    return {
        x: mx,
        y: my
    };
}

function inheritPseudoClass(Super, Sub) {
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
}