<div class="row expanded case">
    <a name="cases"></a>

    <div class="small-6 column">
            <div id="Left-Box">
                <h2>Design Your Case</h2>
                <div id="Left-box1">
                    <form id="phone-select">
                        <p>Choose your device</p>
                        <select id="phone-list">
                            <option disabled selected value>- Select a Model -</option>
                            <option value="Samsung S6">Samsung S6</option>
                            <option value="Samsung S7">Samsung S7</option>
                            <option value="iPhone 6">iPhone 6</option>
                            <option value="iPhone 6 Plus">iPhone 6 Plus</option>
                        </select>
                    </form>
                </div>
        <div id="Left-box2">
            <form action='#' onsubmit="return false;">
                    <input class="show-for-sr" type="file" id="fileToUpload" accept="image/*"/>
                    <label class="button" for="fileToUpload"> Select a Picture </label>
            </form>
            <button class="button" id="PlaceOrder">Place Order</button>
        </div>

        <div>
            <ul>
                <li>* Protection against dirt, scratches and minor bumps.</li>
                <li>* High quality print graphics.</li>
                <li>* Precise fit for easy access to button and ports.</li>
                <li>* High-gloss, scratch-resistant coating.</li>
                <li>* 2 piece Thermo Plastic Polymer Fusion Case.</li>
            </ul>
            <button class="button" id="RestartCase">Restart</button>
        </div>
    </div>

    </div>
    <div  id="Right-Box" class="small-6 column">
        <canvas id="canvas" class="Right-Box-canvas" width="350" height="600" style="z-index:2;">
            Your browser does not support the HTML5 canvas tag.
        </canvas>
        <canvas id="bgcanvas" class="Right-Box-canvas" width="350" height="600" style="z-index:1;pointer-events:none;">
            Your browser does not support the HTML5 canvas tag.
        </canvas>
    </div>
    <!-- The Place Order Modal -->
    <div id="Modal-PlaceOrder" class="modal">
        <!-- Modal content -->
        <div class="modal-content">
            <div class="modal-header">
                <span class="close">×</span>
                <h2>Confirm Custom Case Order</h2>
            </div>
            <div class="modal-body row">
                <form id="OrderForm"><!--Form which will be uploaded to Database-->
                    <div class="small-6 column">
                        <input id="image" name="image" class="hidden" type="image" src=""/><!--field form image to be uploaded-->
                        <input id="imageWphone" class="hidden" name="imageWphone" type="image" src=""/><!--firld for phone with image-->
                        <img id="modal-PlaceOrder-Img"/>
                    </div>

                    <div class="small-6 column">
                        <ul>
                            <li>
                                <label>
                                    <span>First Name:</span>
                                    <input type="text" id="fName" required size="20" maxlength="15"/>
                                </label>

                                <label>
                                    <span>Last Name:</span>
                                    <input type="text" id="LName" required size="20" maxlength="15"/>
                                </label>
                            </li>
                            <li>
                                <label>
                                    <span>Phone:</span>
                                    <input type="text" id="Phone" required size="20" value="(242)"/>
                                </label>

                                <label>
                                    <span>Email Address:</span>
                                    <input type="email" id="Email" required size="20"/>
                                </label>
                            </li>
                        </ul>
                    <div class="modal-footer" style="padding:10px;"><input type="submit" id="btn-SubmitOrder" form="OrderForm" value="Confirm">
                </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- The Alert Modal -->
    <div id="Modal-Alert" class="modal">
        <!-- Modal content -->
        <div class="modal-content">
            <div class="modal-header">
                <span class="close">Ok</span>
                <h2>Sorry...</h2>
            </div>
            <div class="modal-body">
                <p id="Modal-Alert-body">Some text in the Modal Body</p>
            </div>
            <div class="modal-footer">
                <p> </p>
            </div>
        </div>
    </div>

</div>