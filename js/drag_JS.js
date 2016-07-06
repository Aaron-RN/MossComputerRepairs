/*window.onload=function(){
    window.canvas=document.getElementById("Phone-canvas");
    window.context=canvas.getContext("2d");
    canvas.addEventListener('mousedown', mouseDown, false);
    canvas.addEventListener('mouseup', mouseUp, false);
    canvas.addEventListener('mousemove',mouseMove, false);
    
    //createImage();
}*/

var pi2=Math.PI*2;
var anchorRadius=10;
var anchorBoundingBox=anchorRadius*anchorRadius;
var draggingAnchor={x:0,y:0};
var imgSelected = 0;
var down = 0;
var startX = 0;
var startY = 0;
var startXY = 0;

function imgObject(src, X, Y, W, H){
    this.sourceId=src;
    this.X=X;
    this.Y=Y;
    this.Width=W;
    this.Height=H;
    this.TopRightX=this.X + this.Width;
    this.TopRightY=this.Y - this.Height;
    this.beingDragged = false;
    }

/**Detect whether or not the mouse pointer is within the boundingbox of the canvas image object (imgUploaded)**
/**returns : true or false**/
function ClickImage(x, y) {
    return (x > imgUploaded.X && x < imgUploaded.X + imgUploaded.Width 
            && y > imgUploaded.Y && y < imgUploaded.Y + imgUploaded.Height);
}

/**Detect whether or not the mouse pointer click within the bounding box of the anchor points**/
function ClickAnchor(x, y) {
    var dx=0;
    var dy=0;
    // top-left
    dx = x - imgUploaded.X;
    dy = y - imgUploaded.Y;
    if (dx * dx + dy * dy <= anchorBoundingBox) {
        //alert("TL");
        return (0);
    }
    // top-right
    dx = x - imgUploaded.TopRightX;
    dy = y - imgUploaded.Y;
    if (dx * dx + dy * dy <= anchorBoundingBox) {
        //alert("TR");
        return (1);
    }
    // bottom-right
    dx = x - imgUploaded.TopRightX;
    dy = y - imgUploaded.BottomY;
    if (dx * dx + dy * dy <= anchorBoundingBox) {
        //alert("BR");
        return (2);
    }
    // bottom-left
    dx = x - imgUploaded.X;
    dy = y - imgUploaded.BottomY;
    if (dx * dx + dy * dy <= anchorBoundingBox) {
        //alert("BL");
        return (3);
    }
    // top
    dx = x - (imgUploaded.X + imgUploaded.Width/2);
    dy = y - imgUploaded.Y;
    if (dx * dx + dy * dy <= anchorBoundingBox) {
        //alert("T");
        return (4);
    }
    // left
    dx = x - imgUploaded.X;
    dy = y - (imgUploaded.BottomY - imgUploaded.Height/2);
    if (dx * dx + dy * dy <= anchorBoundingBox) {
        //alert("L");
        return (5);
    }
    // right
    dx = x - imgUploaded.TopRightX;
    dy = y - (imgUploaded.Y + imgUploaded.Height/2);
    if (dx * dx + dy * dy <= anchorBoundingBox) {
        //alert("R");
        return (6);
    }
    // bottom
    dx = x - (imgUploaded.X + imgUploaded.Width/2);
    dy = y - imgUploaded.BottomY;
    if (dx * dx + dy * dy <= anchorBoundingBox) {
        //alert("B");
        return (7);
    }
    return (-1);
}

//Draws the grabbable corner points of the canvas image
function DrawDragAnchor(x,y){
    context.fillStyle = 'rgba(25,0,0,1)';
    context.shadowBlur=0.5;
    context.beginPath();
    //context.arc(x,y,anchorRadius,0,pi2,false);
    context.fillRect(x,y,anchorRadius,anchorRadius)
    context.closePath();
    context.fill();
}

/**Debug function that shows mouse co-ordinates as well as canvas image X and Y positions
/**Onle one argument is meant to be true at anyone point and time**/
function DebugShow(e, show_imgUploaded, mouse_coords){
    if(show_imgUploaded){
        if(imgUploaded){
            draw(e,true,false,true,false);
            context.shadowBlur=1;
            context.shadowColor="black";
            context.font="20px Georgia";
            context.fillStyle = 'black';
            context.fillText(imgUploaded.X,10,30);
            context.fillText(imgUploaded.Y,10,50);
        }
    }
    if(mouse_coords){
        draw(e,true,false,true,false);        
        var pos = new getMousePos(e);
        context.shadowBlur=1;
        context.shadowColor="black";
        context.font="20px Georgia";
        context.fillStyle = 'black';
        context.fillText(pos.X,canvas.width-40,30);
        context.fillText(pos.Y,canvas.width-40,50);
    }
}

function roundedImage(x, y, width, height, radius) {
    context.beginPath();
    context.moveTo(x + radius, y);
    context.lineTo(x + width - radius, y);
    context.quadraticCurveTo(x + width, y, x + width, y + radius);
    context.lineTo(x + width, y + height - radius);
    context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    context.lineTo(x + radius, y + height);
    context.quadraticCurveTo(x, y + height, x, y + height - radius);
    context.lineTo(x, y + radius);
    context.quadraticCurveTo(x, y, x + radius, y);
    context.closePath();
}
function getMousePos(e) {
    var rect = canvas.getBoundingClientRect();
    this.X = e.clientX - rect.left;
    this.Y = e.clientY - rect.top;
    if(!this.X){this.X=(canvas.width/2-imgUploaded.Width/2)}
    if(!this.Y){this.Y=(canvas.height/2-imgUploaded.Height/2)}
}
function CalcDragDist(e){
    var dx=0;
    var dy=0;
    var pos = new getMousePos(e);
    var x = pos.X;
    var y = pos.Y;
    dx += x - startX;
    dy += y - startY;
    imgUploaded.X += dx;
    imgUploaded.Y += dy;
    imgUploaded.TopRightX=imgUploaded.X + imgUploaded.Width;
    imgUploaded.BottomY=imgUploaded.Y + imgUploaded.Height;
    startX = x;
    startY = y;
}

function draw(e, with_border,with_anchor,with_bg,as_ordered){
    //if(with_bg){PhoneAppBG();}
    if(with_bg){
        bgcontext.clearRect(0,0,bgcanvas.width,bgcanvas.height);
        context.clearRect(0,0,canvas.width,canvas.height);
        //camcontext.clearRect(0,0,camcanvas.width,camcanvas.height);
        if(!as_ordered){drawBackDrop(true);}
        if(as_ordered){drawBackDrop(false);}
    }
    //context.clearRect(0,0,canvas.width,canvas.height);
    var imgUpSrc = imgUploaded.sourceId;
    //CalcDragDist(e);
    if(as_ordered){
        context.clearRect(0,0,canvas.width,canvas.height);
        context.shadowBlur=2;
        context.drawImage(imgUploaded.sourceId, imgUploaded.X, imgUploaded.Y, imgUploaded.Width, imgUploaded.Height);//x,y);
        context.shadowBlur=0;
        context.drawImage(camcanvasImg,0,0);
        bgcontext.shadowBlur=0;
        bgcontext.drawImage(canvas,(bgcanvas.width - canvas.width)/2,(bgcanvas.height - canvas.height)/2);
        //camcontext.shadowBlur=0.5;
        //bgcontext.drawImage(camcanvas,(bgcanvas.width - camcanvas.width)/2,(bgcanvas.height - camcanvas.height)/2);
    }
    if(!as_ordered){
        context.shadowBlur=2;
        context.shadowColor="black";
        context.drawImage(imgUploaded.sourceId, imgUploaded.X, imgUploaded.Y, imgUploaded.Width, imgUploaded.Height);//x,y);
    }
    if(with_border){
        context.strokeStyle = 'rgba(25,0,0,1)';
        context.lineWidth = 1;
        context.shadowBlur=0.5;
        context.beginPath();
        context.moveTo(imgUploaded.X, imgUploaded.Y);
        context.lineTo(imgUploaded.TopRightX,imgUploaded.Y);
        context.lineTo(imgUploaded.TopRightX,imgUploaded.BottomY);
        context.lineTo(imgUploaded.X,imgUploaded.BottomY);
        context.closePath();
        context.stroke();
        }
    if(with_anchor){
        //**InterCardinal/Ordinal Points**
        DrawDragAnchor(imgUploaded.X - anchorRadius/2,imgUploaded.Y - anchorRadius/2);
        DrawDragAnchor(imgUploaded.TopRightX - anchorRadius/2,imgUploaded.Y - anchorRadius/2);
        DrawDragAnchor(imgUploaded.TopRightX - anchorRadius/2,imgUploaded.BottomY - anchorRadius/2);
        DrawDragAnchor(imgUploaded.X - anchorRadius/2,imgUploaded.BottomY - anchorRadius/2);
        //**Cardinal Points**
        DrawDragAnchor(imgUploaded.X + imgUploaded.Width/2,imgUploaded.Y - anchorRadius/2);
        DrawDragAnchor(imgUploaded.TopRightX - anchorRadius/2,imgUploaded.Y + imgUploaded.Height/2);
        DrawDragAnchor(imgUploaded.X + imgUploaded.Width/2,imgUploaded.BottomY - anchorRadius/2);
        DrawDragAnchor(imgUploaded.X - anchorRadius/2,imgUploaded.BottomY - imgUploaded.Height/2);
    }
    if(!as_ordered){
        context.shadowBlur=0;
        context.drawImage(camcanvasImg,0,0);
    }
    
}
mouseOver = function(event){
    var pos = new getMousePos(event);
    var pointerIcon = ClickAnchor(pos.X, pos.Y);
    if(pointerIcon>-1){
        switch(pointerIcon){
            case 0: //top-left
                canvas.style.cursor = "nw-resize";
                break;
            case 1: //top-right
                canvas.style.cursor = "ne-resize";
                break;
            case 2: //bottom-right
                canvas.style.cursor = "se-resize";
                break;
            case 3: //bottom-left
                canvas.style.cursor = "sw-resize";
                break;
            case 4: //top
                canvas.style.cursor = "n-resize";
                break;
            case 5: //left
                canvas.style.cursor = "e-resize";
                break;
            case 6: //right
                canvas.style.cursor = "w-resize";
                break;
            case 7: //bottom
                canvas.style.cursor = "s-resize";
                break;
        }
    }
    else if(imgSelected){canvas.style.cursor = "move";}
    else if(ClickImage(pos.X,pos.Y)){canvas.style.cursor = "pointer";}
    else if(!imgSelected && !ClickImage(pos.X,pos.Y)){canvas.style.cursor = "default";}
}

mouseMove = function (event){
    //DebugShow(event,false,true);
    if(imgUploaded){mouseOver(event);}
    if(down){
        if(draggingAnchor>-1){
            // resize the image
            //alert("TL");
            var pos = new getMousePos(event);
            var x = pos.X; //parseInt(event.offsetX)//pos.X;
            var y = pos.Y;//parseInt(event.offsetY)//pos.Y;
            var differenceHW = imgUploaded.Height - imgUploaded.Width;
            //var differenceYX = y - x;
            switch(draggingAnchor){
                case 0: //top-left
                    //alert("TL");
                    imgUploaded.X = startX;
                    //imgUploaded.Y = startX + differenceYX;
                    imgUploaded.Y = startY;
                    imgUploaded.Width=imgUploaded.TopRightX - startX;
                    //imgUploaded.Height=imgUploaded.BottomY - startY;
                    imgUploaded.Height=imgUploaded.BottomY - startY;
                    break;
                case 1: //top-right
                    //alert("TR");
                    imgUploaded.Y = startY;
                    imgUploaded.Width=startX - imgUploaded.X;
                    imgUploaded.Height=imgUploaded.BottomY - startY;
                    break;
                case 2: //bottom-right
                    //alert("BR");
                    imgUploaded.Width=startX - imgUploaded.X;
                    imgUploaded.Height=(startX - imgUploaded.X) + differenceHW;
                    //imgUploaded.Height=startY - imgUploaded.Y;
                    break;
                case 3: //bottom-left
                    //alert("BL");
                    imgUploaded.X = startX;
                    imgUploaded.Width=imgUploaded.TopRightX - startX;
                    imgUploaded.Height=startY - imgUploaded.Y;
                    break;
                case 4: //top
                    //alert("T");
                    imgUploaded.Y = startY;
                    imgUploaded.Height=imgUploaded.BottomY - startY;
                    break;
                case 5: //left
                    //alert("L");
                    imgUploaded.X = startX;
                    imgUploaded.Width=imgUploaded.TopRightX - startX;
                    break;
                case 6: //right
                    //alert("R");
                    imgUploaded.Width=startX - imgUploaded.X;
                    break;
                case 7: //bottom
                    //alert("B");
                    imgUploaded.Height=startY - imgUploaded.Y;
                    break;
                //default:
                    //alert("default");
            }

            startX = x;
            startY = y;
            // Enforce minimum dimensions of 25x25
            if(imgUploaded.Width<25){imgUploaded.Width=25;}
            if(imgUploaded.Height<25){imgUploaded.Height=25;}

            // Set the image right and bottom
            imgUploaded.TopRightX=imgUploaded.X+imgUploaded.Width;
            imgUploaded.BottomY=imgUploaded.Y+imgUploaded.Height;

            // Redraw the image with resizing anchors
            draw(event,true,true,true,false);
        }
    else if(imgSelected){
        CalcDragDist(event);
        draw(event,true,false,true,false);
        //DebugShow(event,true,false);
    }
    }
}
mouseUp = function (event) {
    draggingAnchor=-1;
    if(imgUploaded){
        CalcDragDist(event);
        draw(event,false,true,true,false);
    }
    down = false;
    imgSelected = false;
}
mouseDown = function (event) {
    if(imgUploaded){
        down = true;
        var pos = new getMousePos(event);
        startX = pos.X;
        startY = pos.Y;
        startXY = ((pos.X + pos.Y)/2);
        draggingAnchor = ClickAnchor(pos.X, pos.Y);
        if(ClickImage(pos.X,pos.Y)){
            imgSelected = true;
            CalcDragDist(event);
            draw(event,true,false,true,false);
        }
    }
}

