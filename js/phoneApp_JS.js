
//**Declaration of variables and Functions**
window.onload = function() {
    window.uploadedImg = 0;
    window.bgcanvasImg = new Image();
    window.bgcanvas=document.getElementById("bgcanvas");
    window.bgcontext = bgcanvas.getContext("2d");
    window.canvas=document.getElementById("canvas");
    window.context=canvas.getContext("2d");
    window.bgImg = new Image();
    //bgImg.src='SamsungS6.png';
    window.camcanvasImg = new Image();
    //window.camcanvas=document.getElementById("cameracanvas");
    //window.camcontext = camcanvas.getContext("2d");
    window.inputId = "fileToUpload";//Links to the input ID in the html
    window.selectFrmId = document.getElementById("phone-select");//Links to the form encasing the select option
    window.forumSelectId = document.getElementById("phone-list");//Links to the select option ID
    forumSelectId.selectedIndex=0;
    
    context.font="30px Georgia";
    context.shadowBlur=2;
    context.fillText("Select Phone Model",(canvas.width/2 - canvas.width/2.5),canvas.height/4);

    // Get the modal
    window.modal_PlaceOrder = document.getElementById("Modal-PlaceOrder");
    window.modal_Alert = document.getElementById("Modal-Alert");
    // Get the button that opens the modal
    window.btn_PlaceOrder = document.getElementById("PlaceOrder");
    // Get the <span> element that closes the modal
    window.close_PlaceOrder = document.getElementsByClassName("close")[0];
    window.close_Alert = document.getElementsByClassName("close")[1];
    window.modal_Alert_body = document.getElementById("Modal-Alert-body");
    // When the user clicks the button, open the modal 
    btn_PlaceOrder.onclick = function(e) {
        //var input = document.getElementById(inputId);
        if(uploadedImg){
            draw(e,false,false,true,true);
            //var dataURL = bgcanvas.toDataURL();//("image/png");
            var dataURL = new Image();
            dataURL.setAttribute('crossOrigin', 'anonymous');
            //dataURL.crossOrigin= "anonymous";
            dataURL.src = bgcanvas.toDataURL("image/png");
            //alert(dataURL);
            //var w=window.open('about:blank','image from canvas');
            //w.document.write("<img src='"+ dataURL +"' alt='from canvas'/>");
            var modal_PlaceOrder_Img = document.getElementById("modal-PlaceOrder-Img");
            //var imgDone = new Image();
            //imgDone.id="CustomCase";
            //imgDone.src = dataURL;
            //if(modal_PlaceOrder_Img.hasChildNodes()){modal_PlaceOrder_Img.removeChild(modal_PlaceOrder_Img.childNodes[0]);}
            //modal_PlaceOrder_Img.appendChild(imgDone);
            modal_PlaceOrder_Img.src=dataURL.src;
            modal_PlaceOrder.style.display = "block";
        }
        else{
            modal_Alert_body.innerHTML = "You must upload an image first.";
            modal_Alert.style.display = "block"; 
        }
    }
    // When the user clicks on <span> (x), close the modal
    close_PlaceOrder.onclick = function() {
        modal_PlaceOrder.style.display = "none";
        //modal_Alert.style.display = "none";
    }   
    close_Alert.onclick = function() {
        //modal_PlaceOrder.style.display = "none";
        modal_Alert.style.display = "none";
    }
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal_PlaceOrder||event.target == modal_Alert) {
            //modal_PlaceOrder.animation.name = animatetop-close;
            modal_PlaceOrder.style.display = "none";
            modal_Alert.style.display = "none";
        }
    }
    
    canvas.addEventListener('mousedown', mouseDown, false);
    canvas.addEventListener('mouseup', mouseUp, false);
    canvas.addEventListener('mousemove',mouseMove, false);
    document.getElementById("phone-list").addEventListener('change',PhoneAppBG, false);
    document.getElementById("RestartCase").addEventListener('click',ResetAll, false);
    document.getElementById(inputId).addEventListener('change',loadImage, false);
    
    document.getElementById(inputId).onclick = function (e) {
        var canLoad = CheckCanLoad();
        if(canLoad){
            this.click();
        }
        else{e.preventDefault();}
    }

}

var imgUploaded;

/**Reset Button**/
function ResetAll(){
    //alert(document.getElementById(inputId).value);
    forumSelectId.selectedIndex=0;
    document.getElementById(inputId).value=null;
    uploadedImg = 0;
    delete(imgUploaded);
    bgcontext.clearRect(0,0, bgcanvas.width, bgcanvas.height);
    context.clearRect(0,0, canvas.width, canvas.height);
    //camcontext.clearRect(0,0, camcanvas.width, camcanvas.height);
    context.font="30px Georgia";
    context.shadowBlur=1;
    context.fillText("Select Phone Model",(canvas.width/2 - canvas.width/2.5),canvas.height/4);
}


//**Handles the phone case image for the various models**
function PhoneAppBG() {
	//var E = selectFrmId;//To Use later on to force a submit to server
	var E_val = forumSelectId.value;
	if(E_val=="Samsung S6"){
        bgcanvasImg.src='images/S6/S6.png';//Change to S6 Picture
        bgImg.src='images/S6/S6_back.png';
        camcanvasImg.src='images/S6/S6_camera.png';
	}
	else if(E_val=="Samsung S7"){
		bgcanvasImg.src='images/S7/S7.png';//Change to Samsung S7's picture
        bgImg.src='images/S7/S7_back.png';
        camcanvasImg.src='images/S7/S7_camera.png';
	}
	else if(E_val=="iPhone 6"){
		bgcanvasImg.src='images/iPhone6/iP6.png';//replace with iPhone 6 image within directory
        bgImg.src='images/iPhone6/iP6_back.png';
        camcanvasImg.src='images/iPhone6/iP6_camera.png';
	}
	else if(E_val=="iPhone 6 Plus"){
		bgcanvasImg.src='images/iPhone6Plus/iP6Plus.png';//place image directory within ''
        bgImg.src='images/iPhone6Plus/iP6Plus_back.png';
        camcanvasImg.src='images/iPhone6Plus/iP6Plus_camera.png';
	}
    //drawBackDrop();
    camcanvasImg.onload=function(){
        if(!imgUploaded){drawBackDrop(false);}
        if(imgUploaded){drawBackDrop(true);}
    }
    //setTimeout(drawBackDrop,100,true);
}



function drawBackDrop(redraw){
    bgcanvas.width=bgcanvasImg.width;
    bgcanvas.height=bgcanvasImg.height;
    bgcontext.drawImage(bgcanvasImg,0,0);
    //Backdrop in which user uploaded img is placed
    canvas.width=bgImg.width;
    canvas.height=bgImg.height;
    roundedImage(0, 0, bgImg.width, bgImg.height, 42.5);
    context.clip();
    context.drawImage(bgImg,0,0);
    context.drawImage(camcanvasImg,0,0);
    //Canvas which places camera above case art
    //camcanvas.width=bgImg.width;
    //camcanvas.height=bgImg.height;
    //camcontext.drawImage(camcanvasImg,0,0);
    
    if(redraw){draw(0,false,true,false,false);}
}

//**Handles Uploaded Image and saves to canvas**
function CheckCanLoad() {
    //alert(forumSelectId.value);
    if(!forumSelectId.value||forumSelectId.selectedIndex==0){
        modal_Alert_body.innerHTML = "You must select a phone model first.";
        modal_Alert.style.display = "block";
        //write("You must select a phone model first.");
        //return (-1);
    }
    else{
        return (1);
    }
}
function loadImage() {
    var input, file, fr, img;
    if (typeof window.FileReader !== 'function') {
        write("The file API isn't supported on this browser yet.");
        return;
    }
    input = document.getElementById(inputId);
    if (!input) {
        write("Um, couldn't find the imgfile element.");
    }
    else if (!input.files) {
        write("This browser doesn't seem to support the `files` property of file inputs.");
    }
    else {
        file = input.files[0];
        fr = new FileReader();
        fr.onload = createImage;
        fr.readAsDataURL(file);
    }
    
    function createImage() {
        window.Img = new Image();
        Img.src = fr.result;
        Img.onload = imageLoaded;
    }
    
    function imageLoaded() {
        imgUploaded=new imgObject(Img, 0, 0,
                                         Img.width, Img.height);
        if(imgUploaded.Width>canvas.width){
            imgUploaded.Width=canvas.width/2;
            imgUploaded.X = canvas.width/2-imgUploaded.Width/2;
        }
        if(imgUploaded.Height>canvas.height){
            imgUploaded.Height=canvas.height/2;
            imgUploaded.Y = canvas.height/2-imgUploaded.Height/2;            
        }
        uploadedImg = 1;
        CalcDragDist(0);
        draw(0, false,true,true,false);
        //DebugShow(0,true,false);
    }

    function write(msg) {
        modal_Alert_body.style.innerHTML = msg;
        modal_Alert.style.display = "block";
        //alert(msg);
    }
}

