/*
 * @author ghost
 */
var Browser_Name = navigator.appName;
var x = 25, y = 25, x1 = 0, y1 = 0, xx = 0, yy = 0, xx1 = 0, yy1 = 0;
var moveable = false;
var index = 10000;
var resizeable = false;
var objId = "";
var objParentId = "";
var num = 1;
var default_width = "30";
var default_height = "30";

var file = null;
var file_path = null;
var image = null;
var image_path = new Array();
var image_url = "";
var image_width = null;
var image_height = null;
var file_xml = null;
var file_path_xml = null;
var div_margin = 0;
var read_end = true;

var array_style = new Array();
var array_div = new Array();
var num_array_style = 0;
var del_array_div = new Array();

var menu_array = new Array();
var show_new = true;
var show_nonce = true;

function $(e) {
    return document.getElementById("" + e + "");
}

function openInBrowser(url) {
    air.navigateToURL(new air.URLRequest(url));
}

// 选择图片
function doBrowseImg() {
    var filters = new runtime.Array(new air.FileFilter('Images(*.jpg;*.gif;*.png)', '*.jpg;*.gif;*.png;*.jpeg'));

    file.browseForOpen('Select an Image', filters);
}

function doSelectImg(e) {
    image_url = file.url;
    image.load(new air.URLRequest(image_url));

    file_path = file.nativePath;
}

function doOver(e) {
    e.preventDefault();
}

function doDrop(e) {
    var files = e.dataTransfer.getData('application/x-vnd.adobe.air.file-list');

    if (checkFileType(files[0])) {
        image_url = files[0].url;
        image.load(new air.URLRequest(image_url));
        file_path = files[0].nativePath;
    }
    else {
        return false;
    }
    doComplete(event);
}

function checkFileType(file) {
    var temp_file = file.name.split(".");
    var temp_type = "jpg,gif,png,jpeg,JPG,GIF,PNG,JPEG";
    if (temp_type.search(temp_file[1]) >= 0) {
        return true;
    }
    else {
        return false;
    }
}

// 选择xml
function doBrowseXml() {
    var filters = new runtime.Array(new air.FileFilter('XML(*.xml)', '*.xml'));

    file_xml.browseForOpen('Select an XML', filters);
}

function doSelectXml(e) {
    file_path_xml = file_xml.nativePath;
    doCompleteXml();
}

function doComplete(event, imginfo) {
    var div = null;
    image_path.length = 0;
    $("div_view_css").innerText = "";
    image_x(1);

    div = $("image_view");
    if (arguments.length == 2) {
        image_width = div.style.width = imginfo[1] + "px";
        image_height = div.style.height = imginfo[2] + "px";
        image_path[0] = div.src = "file:///" + imginfo[0];
        $("input_bg_path").value = file_path = imginfo[0];
    }
    else {
        image_width = div.style.width = image.width + "px";
        image_height = div.style.height = image.height + "px";
        image_path[0] = div.src = "file:///" + file_path;
        $("input_bg_path").value = file_path;
        $("textarea_gb_class").value = "";
    }

    div.style.backgroundRepeat = "no-repeat";
    div.style.backgroundImage = "url(icon/b.gif)";
    div.style.backgroundColor = "#000000";

    $("bt_x1").disabled = "";
    $("bt_x2").disabled = "";
    $("bt_x4").disabled = "";

    var temp_img_width = parseInt(image_width.replace("px", ""));
    var temp_img_height = parseInt(image_height.replace("px", ""));
    if (temp_img_width < 150 && temp_img_height < 150) {
        $("bt_x6").disabled = "";
    }
    else {
        $("bt_x6").disabled = "true";
    }
    if (temp_img_width > 0 && temp_img_width < default_width) {
        default_width = temp_img_width;
    }
    if (temp_img_height > 0 && temp_img_height < default_height) {
        default_height = temp_img_height;
    }
    $("bt_color_1").disabled = "";
    $("bt_color_2").disabled = "";
    $("bt_color_3").disabled = "";
    $("checkbox_show_width").disabled = "";
    $("checkbox_show_height").disabled = "";
}

//修改层信息
function doEdit() {
    var temp = $("input_div_id").value;
    if (temp) {
        $("button_div_edit").disabled = "";
        $("button_copy_left").disabled = "true";
        $("button_copy_top").disabled = "trun";
        $("button_copy_right").disabled = "true";
        $("button_copy_bottom").disabled = "true";
        $("input_copy_pyl").disabled = "true";
        $("button_div_copy_width").disabled = "true";
        $("button_div_copy_height").disabled = "true";
        $("button_div_copy_left").disabled = "true";
        $("button_div_copy_top").disabled = "true";
        $("checkbox_copy_div_class").disabled = "true";
        $("checkbox_copy_div_width").disabled = "true";
        $("checkbox_copy_div_height").disabled = "true";
        $("checkbox_show_div_width").disabled = "true";
        $("checkbox_show_div_height").disabled = "true";
        $("button_div_copy").disabled = "true";
    }
}

//修改层信息
function editDiv() {
    var temp = $("input_div_id").value;

    if (temp != "") {
        checkinput(temp);
        update_info(temp);
        $("button_div_edit").disabled = "true";
        $("button_copy_left").disabled = "";
        $("button_copy_top").disabled = "";
        $("button_copy_right").disabled = "";
        $("button_copy_bottom").disabled = "";
        $("input_copy_pyl").disabled = "";
        $("button_div_copy_width").disabled = "";
        $("button_div_copy_height").disabled = "";
        $("button_div_copy_left").disabled = "";
        $("button_div_copy_top").disabled = "";
        $("checkbox_copy_div_class").disabled = "";
        $("checkbox_copy_div_width").disabled = "";
        $("checkbox_copy_div_height").disabled = "";
        $("checkbox_show_div_width").disabled = "";
        $("checkbox_show_div_height").disabled = "";
        $("button_div_copy").disabled = "";
    }
}

//删除层
function delDiv(event, divid) {
    var temp = "";
    if (arguments.length == 2) {
        temp = divid;
    }
    else {
        temp = $("input_div_id").value;
    }
    var temp_div_num = get_array_num(temp);
    if (temp_div_num >= 0) {
        $(temp).parentNode.removeChild($(temp));

        $("input_div_id").value = "";
        $("input_div_name").value = "";
        $("input_div_width").value = "";
        $("input_div_height").value = "";
        $("input_div_left").value = "";
        $("input_div_top").value = "";

        array_div[temp_div_num] = "";
        array_style[temp_div_num] = "";
        $("button_div_edit").disabled = "true";
        $("button_div_del").disabled = "true";
        $("button_copy_left").disabled = "true";
        $("button_copy_top").disabled = "true";
        $("button_copy_right").disabled = "true";
        $("button_copy_bottom").disabled = "true";
        $("input_copy_pyl").disabled = "true";
        $("checkbox_copy_div_class").disabled = "true";
        $("checkbox_copy_div_width").disabled = "true";
        $("checkbox_copy_div_height").disabled = "true";
        $("checkbox_show_div_width").disabled = "true";
        $("checkbox_show_div_height").disabled = "true";
        $("button_div_copy").disabled = "true";
    }
}

//重置层
function resetDive() {
    var temp = $("input_div_id").value;
    var temp_style = array_style;
    var temp_image_view = $("image_view");

    for (var n = 0; n < array_div.length; n++) {
        if (array_div[n] != "") {
            temp_style[n][2] = default_width;
            temp_style[n][3] = default_height;
            temp_style[n][4] = "10";
            temp_style[n][5] = "10";

            $(array_div[n]).style.width = temp_style[n][2] * num + "px";
            $(array_div[n]).style.height = temp_style[n][3] * num + "px";
            $(array_div[n]).style.left = temp_style[n][4] * num + "px";
            $(array_div[n]).style.top = temp_style[n][5] * num + "px";
        }
    }
    if (temp) {
        $("input_div_width").value = default_width;
        $("input_div_height").value = default_height;
        $("input_div_left").value = "10";
        $("input_div_top").value = "10";
    }
}

//增加层
function addDiv(divinfo, addDiv) {
    var temp_background = $("image_view").style.backgroundImage;
    if (temp_background != "") {
        var rn = Math.round(Math.random() * 10000);
        var div = document.createElement('div');
        var div_drag = document.createElement('div');
        var div_resize = document.createElement('div');
        var temp_image_view = $("image_view");
        var e = addDiv ? addDiv : window.event;
        var temp_array = new Array();

        //正常
        if (arguments.length == 2) {
            div.id = divinfo[0];
            div.title = divinfo[1];
            div.className = "div-dnr";
            div.style.width = divinfo[2] + "px";
            div.style.height = divinfo[3] + "px";
            div.style.left = parseInt(divinfo[4]) + "px";
            div.style.top = parseInt(divinfo[5]) + "px";
            if (divinfo.length > 6) {
                temp_array[6] = divinfo[6];
                temp_array[7] = divinfo[7];
            }
            else {
                temp_array[6] = true;
                temp_array[7] = true;
            }
        }
        else {
            div.id = "div_" + rn;
            div.title = "div_" + rn;
            div.className = "div-dnr";
            div.style.width = default_width * num + "px";
            div.style.height = default_height * num + "px";
            div.style.left = e.offsetX - parseInt(default_width * num / 2) + parseInt(div_margin * num) + "px";
            div.style.top = e.offsetY - parseInt(default_height * num / 2) + parseInt(div_margin * num) + "px";
            temp_array[6] = true;
            temp_array[7] = true;
        }

        div_drag.id = "drag_" + rn;
        div_drag.className = "div-drag";
        div_drag.onmousedown = function () {
            startDrag(this, event)
        };
        div_drag.onmousemove = function () {
            drag(event)
        };
        div_drag.onmouseup = function () {
            stopDrag(event)
        };

        div_resize.id = "resize_" + rn;
        div_resize.className = "div-resize";
        div_resize.onmousedown = function () {
            startResize(this, event)
        };
        div_resize.onmousemove = function () {
            Resizing(event)
        };
        div_resize.onmouseup = function () {
            stopResize(event)
        };

        div.appendChild(div_drag);
        div.appendChild(div_resize);
        $("div_image_view").appendChild(div);

        checkxy(div.id);

        var temp = $(div.id);
        var temp_id = div.id;
        temp_array[0] = "" + temp_id + "";
        temp_array[1] = "" + temp.title + "";
        temp_array[2] = "" + parseInt(temp.style.width.replace("px", "") / num) + "";
        temp_array[3] = "" + parseInt(temp.style.height.replace("px", "") / num) + "";
        temp_array[4] = "" + parseInt(temp.style.left.replace("px", "") / num) + "";
        temp_array[5] = "" + parseInt(temp.style.top.replace("px", "") / num) + "";

        array_div[num_array_style] = temp_array[0];
        array_style[num_array_style++] = temp_array;

        $("bt_view_css").disabled = "";
        if (arguments.length == 1) {
            $("input_div_id").value = temp_id;
            reset_div_className();
            div_info(temp_id, 0, 0, 0, 0);
            $(temp_id).style.zIndex = ++index;
            if (show_new) {
                showNonceDiv("true");
            }
        }
    }
}

//设置当前层信息显示方式
function setShowDiv() {
    var temp = arguments[0].target.data.item.name;
    var op = arguments[0].target.data.item.toggled;

    switch (temp) {
        case "show_new":
            if (!op) {
                show_new = false;
            }
            else {
                show_new = true;
            }
            break;
        case "show_nonce":
            if (!op) {
                show_nonce = false;
            }
            else {
                show_nonce = true;
            }
            break;
    }
}

//重置层的类名
function reset_div_className() {
    var temp_lenght = array_style.length;
    for (var n = 0; n < temp_lenght; n++) {
        if ($(array_style[n][1])) {
            $(array_style[n][1]).className = "div-dnr";
        }
    }
}

//取得层位置
function get_array_num(e) {
    var temp_lenght = array_div.length;
    for (var n = 0; n < temp_lenght; n++) {
        if (array_div[n] == e) {
            return n;
        }
    }
}

//修改留白
function doEditDivMargin() {
    var temp = $("image_view").style.width;
    if (temp != 0) {
        $("button_div_margin_edit").disabled = "";
    }
}

//修改留白
function editDivMargin() {
    var temp_margin = $("input_div_margin").value;
    if (temp_margin != div_margin) {
        div_margin = temp_margin;
    }
    else
        if (temp_margin == "") {
            div_margin = 0;
            $("input_div_margin").value = 0;
        }
    $("div_image").style.padding = div_margin * num;
    updataDivMagin();
    $("button_div_margin_edit").disabled = "true";
}

//检查输入
function checkinput(e) {
    var temp = $("" + e + "");
    var temp_num = get_array_num(e);
    var temp_array = new Array();

    temp_array[1] = $("input_div_name").value;
    temp_array[2] = $("input_div_width").value;
    temp_array[3] = $("input_div_height").value;
    temp_array[4] = $("input_div_left").value;
    temp_array[5] = $("input_div_top").value;

    if (temp_array[1] == "") {
        $("input_div_name").value = array_style[temp_num][1];
    }
    if (temp_array[2] == "") {
        $("input_div_width").value = array_style[temp_num][2];
    }
    if (temp_array[3] == "") {
        $("input_div_height").value = array_style[temp_num][3];
    }
    if (temp_array[4] == "") {
        $("input_div_left").value = array_style[temp_num][4];
    }
    if (temp_array[5] == "") {
        $("input_div_top").value = array_style[temp_num][5];
    }
}

//检查坐标
function checkxy(e) {
    var temp = $("" + e + "");
    var temp_div_width = parseInt(temp.style.width);
    var temp_div_height = parseInt(temp.style.height);
    var temp_div_left = parseInt(temp.style.left);
    var temp_div_top = parseInt(temp.style.top);

    if (temp.id.substr(0, 4) == "div_") {
        var temp_div_right = parseInt($("image_view").style.width) - temp_div_width + parseInt(div_margin * 2 * num);
        var temp_div_bottom = parseInt($("image_view").style.height) - temp_div_height + parseInt(div_margin * 2 * num);
    }
    else {
        var temp_div_right = parseInt($("div_image_view").offsetWidth) - parseInt(temp_div_width);
        var temp_div_bottom = parseInt($("div_image_view").offsetHeight) - parseInt(temp_div_height + 22);
    }

    if (read_end && temp_div_left < 0) {
        temp.style.left = 0;
    }

    if (temp_div_left > temp_div_right) {
        temp.style.left = Math.round(temp_div_right);
    }

    if (read_end && temp_div_top < 0) {
        temp.style.top = 0;
    }

    if (temp_div_top > temp_div_bottom) {
        temp.style.top = Math.round(temp_div_bottom);
    }
}

//检查大小
function checkwh(e) {
    var temp = $("" + e + "");
    var temp_div_width = parseInt(temp.style.width);
    var temp_div_height = parseInt(temp.style.height);
    var temp_div_left = parseInt(temp.style.left);
    var temp_div_top = parseInt(temp.style.top);
    var temp_div_right = temp_div_left + temp_div_width;
    var temp_div_bottom = temp_div_top + temp_div_height;
    var temp_div_width = parseInt($("image_view").style.width) + parseInt(div_margin * 2 * num);
    var temp_div_height = parseInt($("image_view").style.height) + parseInt(div_margin * 2 * num);
    var temp_width = temp_div_width - temp_div_left;
    var temp_height = temp_div_height - temp_div_top;

    if (temp_div_right > temp_div_width) {
        temp.style.width = temp_width;
    }
    if (temp_div_bottom > temp_div_height) {
        temp.style.height = temp_height;
    }
}

//更新层信息
function update_info(e) {
    var temp = $("" + e + "");
    if (temp.id.substr(0, 4) == "div_") {
        var temp_num = get_array_num(e);
        var temp_array = new Array();

        temp_array[0] = "" + e + "";
        temp_array[1] = $("input_div_name").value;
        temp_array[2] = $("input_div_width").value;
        temp_array[3] = $("input_div_height").value;
        temp_array[4] = $("input_div_left").value;
        temp_array[5] = $("input_div_top").value;
        temp_array[6] = $("checkbox_show_div_width").checked;
        temp_array[7] = $("checkbox_show_div_height").checked;
        array_style[temp_num] = temp_array;

        temp.title = temp_array[1];
        temp.style.width = Math.round(temp_array[2]) * num + "px";
        temp.style.height = Math.round(temp_array[3]) * num + "px";
        temp.style.left = Math.round(temp_array[4]) * num + div_margin * num + "px";
        temp.style.top = Math.round(temp_array[5]) * num + div_margin * num + "px";
    }
}

function checkNum(e) {
    if (e > 0) {
        return "-" + e + "px";
    }
    else
        if (e < 0) {
            e = e - e * 2;
            return e + "px";
        }
        else {
            return e;
        }
}

function checkType(fullpath) {
    var temp_path = fullpath.split("/");
    var temp_file = temp_path[temp_path.length - 1].split(".");
    if (temp_file[1]) {
        var type = temp_file[1];

        if (type != "xml") {
            temp_file[1] = "xml";
            var temp = temp_file.join(".");
            temp_path[temp_path.length - 1] = temp;
            temp = temp_path.join("/");
            return temp;
        }
        else {
            return fullpath;
        }
    }
    else {
        var temp = fullpath + ".xml";
        return temp;
    }
}

function div_info(e, t1, t2, t3, t4) {
    var temp = $("" + e + "");
    if (temp.id.substr(0, 4) == "div_") {
        $("input_div_id").value = temp.id;
        $("input_div_name").value = temp.title;

        if (num > 1) {
            $("input_div_width").value = Math.round(parseInt(temp.style.width) / num) + parseInt(t1);
            $("input_div_height").value = Math.round(parseInt(temp.style.height) / num) + parseInt(t2);
            $("input_div_left").value = Math.round(parseInt(temp.style.left) / num) - div_margin + parseInt(t3);
            $("input_div_top").value = Math.round(parseInt(temp.style.top) / num) - div_margin + parseInt(t4);
        }
        else {
            $("input_div_width").value = parseInt(temp.style.width) + parseInt(t1);
            $("input_div_height").value = parseInt(temp.style.height) + parseInt(t2);
            $("input_div_left").value = parseInt(temp.style.left) - div_margin + parseInt(t3);
            $("input_div_top").value = parseInt(temp.style.top) - div_margin + parseInt(t4);
        }
        $("checkbox_show_div_width").checked = show_divwh("width");
        $("checkbox_show_div_height").checked = show_divwh("height");

        temp.className = "div-dnr-now";
        $("button_div_edit").disabled = "true";
        $("button_div_del").disabled = "";
        $("button_copy_left").disabled = "";
        $("button_copy_top").disabled = "";
        $("button_copy_right").disabled = "";
        $("button_copy_bottom").disabled = "";
        $("input_copy_pyl").disabled = "";
        $("button_div_copy_width").disabled = "";
        $("button_div_copy_height").disabled = "";
        $("button_div_copy_left").disabled = "";
        $("button_div_copy_top").disabled = "";
        $("checkbox_copy_div_class").disabled = "";
        $("checkbox_copy_div_width").disabled = "";
        $("checkbox_copy_div_height").disabled = "";
        $("checkbox_show_div_width").disabled = "";
        $("checkbox_show_div_height").disabled = "";
        $("button_div_copy").disabled = "";
    }
}

//输出样式
function view_css() {
    var temp = "";
    var temp_css = "";
    var temp_background = $("image_view").style.backgroundImage;
    var temp_background_value = $("input_bg_path").value;
    var temp_gbstyle = $("textarea_gb_class").value;
    var div = $("div_view_css");
    var temp_lenght = array_div.length;
    var checkbox_show_width = $("checkbox_show_width").checked;
    var checkbox_show_height = $("checkbox_show_height").checked;
    var radio_show_allwh = $("radio_show_allwh").checked;

    if (temp_background_value == "") {
        temp_background_value = "background:url(" + temp_background + ") no-repeat 0 0;";
    }
    else {
        temp_background_value = "background:url(" + temp_background_value + ") no-repeat 0 0;";
    }

    for (var n = 0; n < temp_lenght; n++) {
        if (array_div[n] != "") {
            temp += "." + array_style[n][1] + ",";
        }
    }
    if (temp != "") {
        temp = temp.replace(/,$/g, "");
        if (temp_gbstyle != "") {
            temp += "{\n" + temp_background_value + "\n" + temp_gbstyle + "\n}\n";
        }
        else {
            temp += "{" + temp_background_value + "}\n";
        }
        temp_css = temp;
        for (var n = 0; n < array_div.length; n++) {
            if (radio_show_allwh) {
                if (array_div[n] != "") {
                    temp = "." + array_style[n][1] + "{";

                    if (checkbox_show_width) {
                        temp += "width:" + array_style[n][2] + "px;";
                    }
                    if (checkbox_show_height) {
                        temp += "height:" + array_style[n][3] + "px;";
                    }

                    temp += "background-position:" + checkNum(array_style[n][4]);
                    temp += " " + checkNum(array_style[n][5]);
                    temp += ";}\n";
                    temp_css = temp_css + temp;
                }
            }
            else {
                if (array_div[n] != "") {
                    temp = "." + array_style[n][1] + "{";

                    if (array_style[n][6]) {
                        temp += "width:" + array_style[n][2] + "px;";
                    }
                    if (array_style[n][7]) {
                        temp += "height:" + array_style[n][3] + "px;";
                    }

                    temp += "background-position:" + checkNum(array_style[n][4]);
                    temp += " " + checkNum(array_style[n][5]);
                    temp += ";}\n";
                    temp_css = temp_css + temp;
                }
            }
        }
        div.innerText = temp_css;
        $("bt_copy_css").disabled = "";
    }
    else {
        div.innerText = "";
        $("bt_copy_css").disabled = "true";
    }
    showhide("pre_css_div");
}

//显示当前层宽高是否输出
function show_divwh(op) {
    var temp = $("input_div_id").value;

    if (temp) {
        var n = get_array_num(temp);
        if (op == "width") {
            return array_style[n][6];
        }
        if (op == "height") {
            return array_style[n][7];
        }
    }
}

//设置当前层宽高是否输出
function set_divwh() {
    var temp = $("input_div_id").value;
    var nonce = $(this.id).checked;

    if (temp) {
        var n = get_array_num(temp);
        switch (this.id) {
            case "checkbox_show_div_width":
                if (nonce) {
                    array_style[n][6] = true;
                }
                else {
                    array_style[n][6] = false;
                }
                break;
            case "checkbox_show_div_height":
                if (nonce) {
                    array_style[n][7] = true;
                }
                else {
                    array_style[n][7] = false;
                }
                break;
        }
    }
}

function doSave() {
    var docsDir = air.File.documentsDirectory;
    try {
        docsDir.browseForSave("Save As");
        docsDir.addEventListener(air.Event.SELECT, doSaveSet);
    }
    catch (error) {
        air.trace("Failed:", error.message)
    }
}

function doSaveSet(event) {
    view_css();
    var newFile = event.target;
    newFile.url = "" + checkType(event.target.url) + "";

    var stream = new air.FileStream();
    stream.open(newFile, air.FileMode.WRITE);

    var temp_gbstyle = $("textarea_gb_class").value;
    var cr = air.File.lineEnding;
    temp_gbstyle.replace("\n", cr);
    image_width.replace("px", "");
    image_height.replace("px", "");
    var note = '<?xml version="1.0" encoding="utf-8"\?>' + cr +
        '<bg2css>' +
        cr +
        '<version>3</version>' +
        cr +
        '<imginfo>' +
        cr +
        '<path>' +
        file_path +
        '</path>' +
        cr +
        '<width>' +
        image_width +
        '</width>' +
        cr +
        '<height>' +
        image_height +
        '</height>' +
        cr +
        '<margin>' +
        div_margin +
        '</margin>' +
        cr +
        '<gbstyle>' +
        temp_gbstyle +
        '</gbstyle>' +
        cr +
        '</imginfo>';

    var temp_style = array_style;

    for (var n = 0; n < array_div.length; n++) {
        if (array_div[n] != "") {
            note += '<divinfo> ' + cr + '<id>' + array_style[n][0] + '</id>' + cr + '<name>' + array_style[n][1] + '</name>' + cr + '<width>' + array_style[n][2] + '</width>' + cr + '<height>' + array_style[n][3] + '</height>' + cr + '<left>' + array_style[n][4] + '</left>' + cr + '<top>' + array_style[n][5] + '</top>' + cr + '<setWidth>' + array_style[n][6] + '</setWidth>' + cr + '<setHeight>' + array_style[n][7] + '</setHeight>' + cr + '</divinfo>';
        }
    }

    note += cr + '</bg2css>';

    stream.writeUTFBytes(note);
    stream.close();

}

//开始拖动
function startDrag(obj, evt) {
    e = evt ? evt : window.event;
    if (true) {
        window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);

        var win = obj.parentNode;//取得父窗体 
        objId = obj.id;
        objParentId = win.id;

        if (objParentId.substr(0, 4) == "div_") {
            var temp_id = $("input_div_id").value;
            if (temp_id) {
                $(temp_id).className = "div-dnr";
            }

            div_info(objParentId, 0, 0, 0, 0);
            win.style.zIndex = ++index;//设置父窗体的Z轴值 
        }

        x = parseInt(e.clientX);//取得当前鼠标的X坐标 
        y = parseInt(e.clientY);//取得当前鼠标的Y坐标
        x1 = parseInt(win.style.left);//将父窗体的距浏览器左边界的距离转换为NUMBER 
        y1 = parseInt(win.style.top);//将父窗体的距浏览器上边界的距离转换为NUMBER 
        moveable = true;
        if (show_nonce) {
            showNonceDiv("true");
        }
    }
}

function drag(evt) {
    e = evt ? evt : window.event;
    if (moveable) {
        var win = $("" + objParentId + "");
        win.style.left = parseInt(x1 + e.clientX - x);
        win.style.top = parseInt(y1 + e.clientY - y);
        checkxy(objParentId);
        div_info(objParentId, 0, 0, 0, 0);
    }
}

//停止拖动 
function stopDrag(event) {
    var obj = $("" + objId + "");
    if (moveable) {
        e.preventDefault();
        document.addEventListener("mouseup", stopDrag, true);
        document.addEventListener("mousemove", drag, true);

        update_info(objParentId);

        moveable = false;
        objId = "";
        objParentId = "";
    }
}

//开始缩放
function startResize(obj, evt) {
    var e = evt;

    e.preventDefault();
    document.addEventListener("mouseup", stopResize, true);
    document.addEventListener("mousemove", Resizing, true);

    var win = obj.parentNode;
    objId = obj.id;
    objParentId = win.id;
    win.style.zIndex = ++index;
    x = parseInt(e.screenX);
    y = parseInt(e.screenY);
    x1 = parseInt(win.style.width);
    y1 = parseInt(win.style.height);
    resizeable = true;
}

function Resizing(evt) {
    var e = evt ? evt : window.event;

    if (resizeable) {
        var win = $("" + objParentId + "");
        win.style.width = parseInt(x1 + e.screenX - x) + "px";
        win.style.height = parseInt(y1 + e.screenY - y) + "px";
        checkwh(objParentId);
        div_info(objParentId, 0, 0, 0, 0);
    }
}

//停止缩放 
function stopResize(evt) {
    var obj = $("" + objId + "");
    if (resizeable) {
        document.removeEventListener("mouseup", stopResize, true);
        document.removeEventListener("mousemove", Resizing, true);

        update_info(objParentId);
        resizeable = false;
        objId = "";
        objParentId = "";
    }
}

//更改图片底色
function image_color(n) {
    var img = $("image_view");
    img.style.backgroundColor = "#" + n;
}

//图片缩放
function image_x(n) {
    var img_div = $("div_image_view");
    var img = $("image_view");

    if (n != "" && n > 0) {
        num = parseInt(n);

        if (num > 1) {
            if (image_path[num]) {
                img.src = image_path[num];
            }
            else {
                if (image.width * num < 8192 && image.height * num < 8192) {
                    var bmp = new air.BitmapData(image.width * num, image.height * num, true, 0x00000000);
                    var temp = air.File.createTempFile();
                    var desktop = null;
                    var matrix = new air.Matrix();
                    var stream = new air.FileStream();
                    var div = null;
                    var elem = null;

                    matrix.scale(num, num);
                    bmp.draw(image.content, matrix);

                    png = runtime.com.adobe.images.PNGEncoder.encode(bmp);

                    stream.open(temp, air.FileMode.WRITE);
                    stream.writeBytes(png, 0, 0);
                    stream.close();
                    image_path[num] = img.src = temp.url;
                }
                else {
                    img.src = image_path[0];
                }
            }
        }
        else {
            img.src = image_path[0];
        }
        img.style.width = parseInt(image_width) * num + "px";
        img.style.height = parseInt(image_height) * num + "px";



        $("div_image").style.padding = div_margin * num;

        var temp = 0;
        var temp_lenght = array_div.length;

        for (var n = 0; n < temp_lenght; n++) {
            if (array_div[n] != "") {
                temp++;
            }
        }
        if (temp > 0) {
            for (var n = 0; n < temp_lenght; n++) {
                if (array_div[n] != "") {
                    $(array_style[n][0]).style.width = array_style[n][2] * num + "px";
                    $(array_style[n][0]).style.height = array_style[n][3] * num + "px";
                    $(array_style[n][0]).style.left = parseInt(array_style[n][4]) * num + div_margin * num + "px";
                    $(array_style[n][0]).style.top = parseInt(array_style[n][5]) * num + div_margin * num + "px";
                }
            }
            resetDivXY();
        }

    }
    else {
        num = 1;
    }
}

//当前层在窗口内显示
function resetDivXY() {
    var img_div = $("div_image_view");
    var nonce_div = $("input_div_id").value;
    if (nonce_div != "") {
        nonce_div = $("" + nonce_div + "");
        if (nonce_div.offsetLeft > img_div.clientWidth) {
            img_div.scrollLeft = parseInt(nonce_div.offsetLeft) - parseInt(img_div.clientWidth / 2) + parseInt(nonce_div.clientWidth / 2);
        }
        else {
            img_div.scrollLeft = parseInt(nonce_div.offsetLeft) - parseInt(img_div.clientWidth / 2) + parseInt(nonce_div.clientWidth / 2);
        }
        if (nonce_div.offsetTop > img_div.clientHeight) {
            img_div.scrollTop = parseInt(nonce_div.offsetTop) - parseInt(img_div.clientHeight / 2) + parseInt(nonce_div.clientHeight / 2);
        }
        else {
            img_div.scrollTop = parseInt(nonce_div.offsetTop) - parseInt(img_div.clientHeight / 2) + parseInt(nonce_div.clientHeight / 2);
        }
    }
}

function updataDivMagin() {
    var temp_margin = $("input_div_margin").value;
    var temp = 0;
    var temp_lenght = array_div.length;

    for (var n = 0; n < temp_lenght; n++) {
        if (array_div[n] != "") {
            temp++;
        }
    }
    if (temp > 0) {
        for (var n = 0; n < array_div.length; n++) {
            if (array_div[n] != "") {
                $(array_style[n][0]).style.left = parseInt(array_style[n][4]) * num + div_margin * num + "px";
                $(array_style[n][0]).style.top = parseInt(array_style[n][5]) * num + div_margin * num + "px";
                checkxy(array_style[n][0]);
            }
        }
    }
}

//显示隐藏层
function showhide(e, op) {
    var temp_div = $("" + e + "");
    if (temp_div) {
        var display = "blcok";
        if (op != "true") {
            display = temp_div.style.display;
        }
        switch (display) {
            case "block":
                temp_div.style.display = "none";
                break;
            default:
                temp_div.style.display = "block";
                break;
        }
    }
}

//显示隐藏当前层
function showNonceDiv(op) {
    checkxy('nonce_div');
    showhide('nonce_div', op);
}

//显示隐藏生成样式层
function showSaveDiv() {
    showhide('save_css_div');
}

//显示隐藏操作层
function showOpDiv() {
    showhide('op_div');
}

//打开窗口
function menuOpenWin() {
    var op = arguments[0].target.data.item.name;

    switch (op) {
        case "allDiv":
            doWindow('divlist.html', 'width=600,height=600,top=100,scrollbars=yes');
            break;
        case "about":
            doWindow('about.html', 'width=460,height=360,scrollbars=yes');
            break;
        case "help":
            doWindow('help.html', 'width=460,height=600,top=100,scrollbars=yes');
            break;
        default:
            break;
    }
}

//初始化页面
function doLoad() {
    //菜单
    var menu = air.ui.Menu.createFromJSON("lib/menus/menu.js");
    air.ui.Menu.setAsMenu(menu);
    var menu1 = air.ui.Menu.createFromJSON("lib/menus/menu2.js");
    air.ui.Menu.setAsContextMenu(menu1, "div_image_view");

    $('button_div_del').addEventListener('click', delDiv);
    $('button_div_edit').addEventListener('click', editDiv);
    $('button_div_margin_edit').addEventListener('click', editDivMargin);
    $('input_div_margin').addEventListener('focus', doEditDivMargin);

    $('bt_copy_css').addEventListener('click', doCopyCss);
    $('button_div_copy_width').addEventListener('click', doCopyDivCss);
    $('button_div_copy_height').addEventListener('click', doCopyDivCss);
    $('button_div_copy_left').addEventListener('click', doCopyDivCss);
    $('button_div_copy_top').addEventListener('click', doCopyDivCss);
    $('button_div_copy').addEventListener('click', doCopyDivCss);
    $('button_div_copy_wh').addEventListener('click', doCopyDivCss);
    $('button_div_copy_xy').addEventListener('click', doCopyDivCss);
    $('button_copy_left').addEventListener('click', doCopyDiv);
    $('button_copy_top').addEventListener('click', doCopyDiv);
    $('button_copy_right').addEventListener('click', doCopyDiv);
    $('button_copy_bottom').addEventListener('click', doCopyDiv);

    $('checkbox_copy_div_class').checked = "";
    $('checkbox_copy_div_width').checked = "";
    $('checkbox_copy_div_height').checked = "";
    $('checkbox_show_div_width').addEventListener('click', set_divwh);
    $('checkbox_show_div_height').addEventListener('click', set_divwh);

    image = new air.Loader();
    image.contentLoaderInfo.addEventListener(air.Event.COMPLETE, doComplete);

    file = air.File.applicationDirectory;
    file.addEventListener(air.Event.SELECT, doSelectImg);

    file_xml = air.File.applicationDirectory;
    file_xml.addEventListener(air.Event.SELECT, doSelectXml);

    $('bt_view_css').addEventListener('click', view_css);

    $('input_div_name').addEventListener('focus', doEdit);
    $('input_div_width').addEventListener('focus', doEdit);
    $('input_div_height').addEventListener('focus', doEdit);
    $('input_div_left').addEventListener('focus', doEdit);
    $('input_div_top').addEventListener('focus', doEdit);

    $('image_view').addEventListener('dblclick', addDiv);
}

//快捷键
function keyDown(e) {
    var e = event ? event : window.event.getEvent();
    var key = runtime.flash.ui.Keyboard;
    var temp_img = $("image_view").src;
    var temp_div = $("input_div_id").value;
    var key_ctrl = e.ctrlKey;
    var key_alt = e.altKey;
    var key_shift = e.shiftKey;

    if (temp_img != "") {
        if (key_ctrl) {
            switch (event.keyCode) {
                case key.NUMBER_0:
                case key.NUMPAD_1:
                    image_x(1);
                    break;
                case key.NUMBER_2:
                case key.NUMPAD_2:
                    image_x(2);
                    break;
                case key.NUMBER_4:
                case key.NUMPAD_4:
                    image_x(4);
                    break;
                case key.NUMBER_6:
                case key.NUMPAD_6:
                    image_x(6);
                    break;
            }
        }
    }
    if (event.keyCode == 116) {
        refreshPic();
    }
    if (temp_div != "") {
        //alert("ASCII代码是："+event.keyCode);
        if (event.keyCode == key.DELETE || event.keyCode == 15 && event.keyCode == 8) {
            delDiv(event, temp_div);
        }
        if (key_shift && key_ctrl) {
            switch (event.keyCode) {
                case 38:
                    div_info(temp_div, 0, -1, 0, 0);
                    update_info(temp_div);
                    checkwh(temp_div);
                    break;
                case 40:
                    div_info(temp_div, 0, 1, 0, 0);
                    update_info(temp_div);
                    checkwh(temp_div);
                    break;
                case 37:
                    div_info(temp_div, -1, 0, 0, 0);
                    update_info(temp_div);
                    checkwh(temp_div);
                    break;
                case 39:
                    div_info(temp_div, 1, 0, 0, 0);
                    update_info(temp_div);
                    checkwh(temp_div);
                    break;
            }
        }
        else
            if (!key_shift && key_ctrl) {
                switch (event.keyCode) {
                    case 38:
                        div_info(temp_div, 0, 0, 0, -1);
                        update_info(temp_div);
                        checkxy(temp_div);
                        break;
                    case 40:
                        div_info(temp_div, 0, 0, 0, 1);
                        update_info(temp_div);
                        checkxy(temp_div);
                        break;
                    case 37:
                        div_info(temp_div, 0, 0, -1, 0);
                        update_info(temp_div);
                        checkxy(temp_div);
                        break;
                    case 39:
                        div_info(temp_div, 0, 0, 1, 0);
                        update_info(temp_div);
                        checkxy(temp_div);
                        break;
                }
            }
    }
}

/*
 * 打开新窗口
 */
function doWindow(page, info) {
    /*
     var init = new air.NativeWindowInitOptions();
     var bounds = null;
     var win = null;
     var page = air.File.applicationDirectory.resolvePath( page );
     bounds = new air.Rectangle( ( air.Capabilities.screenResolutionX - 325 ) / 2, ( air.Capabilities.screenResolutionY - 145 ) / 2, 325, 145 );
     init.minimizable = false;
     init.maximizable = false;
     init.resizable = false;
     
     win = air.HTMLLoader.createRootWindow( true, init, false, bounds );
     win.load( new air.URLRequest( page.url ) );
     */
    var login = window.open(page, null, info);
}

function doCopyDiv() {
    var id = this.id;
    var rn = Math.round(Math.random() * 10000);
    var temp = $("input_div_id").value;
    var n = get_array_num(temp);
    var temp_id = temp_name = "div_" + rn;
    var temp_width = parseInt(array_style[n][2]) * num;
    var temp_height = parseInt(array_style[n][3]) * num;
    var temp_left = parseInt(array_style[n][4]) * num + div_margin * num;
    var temp_top = parseInt(array_style[n][5]) * num + div_margin * num;
    var temp_array = new Array();
    var pyl = $("input_copy_pyl").value;

    if (pyl == "") {
        pyl = default_width * num;
    }
    else {
        pyl = pyl * num;
    }
    switch (id) {
        case "button_copy_left":
            temp_left = temp_left - pyl;
            break;
        case "button_copy_top":
            temp_top = temp_top - pyl;
            break;
        case "button_copy_right":
            temp_left = temp_left + pyl;
            break;
        case "button_copy_bottom":
            temp_top = temp_top + pyl;
            break;
    }

    temp_array = [temp_id, temp_name, temp_width, temp_height, temp_left, temp_top];
    addDiv(temp_array, addDiv);
    $(temp).className = "div-dnr";
    div_info(temp_id, 0, 0, 0, 0);
    update_info(temp_id);
}

//复制当前层样式
function doCopyDivCss(event) {
    var temp_id = this.id;
    var temp = $("input_div_id").value;
    var n = get_array_num(temp);
    var checkbox_show_class = $("checkbox_copy_div_class").checked;
    var checkbox_show_width = $("checkbox_copy_div_width").checked;
    var checkbox_show_height = $("checkbox_copy_div_height").checked;
    var copy = "";

    if (temp != "") {
        checkinput(temp);
        switch (temp_id) {
            case "button_div_copy_width":
                copy = "width:" + array_style[n][2] + "px;";
                break;
            case "button_div_copy_height":
                copy = "height:" + array_style[n][3] + "px;";
                break;
            case "button_div_copy_left":
                copy = (0 - array_style[n][4]) + "px";
                break;
            case "button_div_copy_top":
                copy = (0 - array_style[n][5]) + "px";
                break;
            case "button_div_copy":
                if (checkbox_show_class) {
                    copy = "." + array_style[n][1] + "{";
                }
                if (checkbox_show_width) {
                    copy += "width:" + array_style[n][2] + "px;";
                }
                if (checkbox_show_height) {
                    copy += "height:" + array_style[n][3] + "px;";
                }
                copy += "background-position:" + checkNum(array_style[n][4]) + " " + checkNum(array_style[n][5]) + ";";
                if (checkbox_show_class) {
                    copy += "}\n";
                }
                break;
            case "button_div_copy_wh":
                copy += "width:" + array_style[n][2] + "px;height:" + array_style[n][3] + "px;";
                break;
            case "button_div_copy_xy":
                copy += checkNum(array_style[n][4]) + " " + checkNum(array_style[n][5]);
                break;
        }
    }

    air.Clipboard.generalClipboard.clear();
    air.Clipboard.generalClipboard.setData(air.ClipboardFormats.TEXT_FORMAT, copy);
    doTimer("样式 " + copy + " 已复制到剪贴板！");
}

//复制所有样式
function doCopyCss(v) {
    var copy = $("div_view_css").innerText;
    air.Clipboard.generalClipboard.clear();
    air.Clipboard.generalClipboard.setData(air.ClipboardFormats.TEXT_FORMAT, copy);
    doTimer("样式复制成功！");
}

//刷新图片
function refreshPic() {
    if ($("image_view").src != "") {
        image.load(new air.URLRequest(image_url));
        file_path = image_url.replace("file:///", "");
        doComplete(event);
    }
}

function doTimer(txt) {
    $("hint_txt").style.display = "block";
    $("hint_txt").innerText = txt;
    setTimeout(function () { $("hint_txt").style.display = "none" }, 1500);
}

//读取设置
function doCompleteXml() {
    xml = new XMLHttpRequest();

    xml.onreadystatechange = function () {
        read_end = false;
        var version = null;
        var imginfo = null;
        var divinfo = null;
        var temp_path = null;
        var temp_id = null;
        var temp_name = null;
        var temp_width = null;
        var temp_height = null;
        var temp_left = null;
        var temp_top = null;
        var temp_set_width = null;
        var temp_set_height = null;
        var temp_array = new Array();
        var temp_array_div = new Array();
        image_path.length = 0;

        if (xml.readyState == 4) {
            imginfo = xml.responseXML.documentElement.getElementsByTagName('imginfo');
            divinfo = xml.responseXML.documentElement.getElementsByTagName('divinfo');
            version = xml.responseXML.documentElement.getElementsByTagName('version');

            image_path[0] = temp_path = imginfo[0].getElementsByTagName('path')[0].textContent;
            temp_width = imginfo[0].getElementsByTagName('width')[0].textContent;
            temp_height = imginfo[0].getElementsByTagName('height')[0].textContent;
            $("input_div_margin").value = div_margin = imginfo[0].getElementsByTagName('margin')[0].textContent;
            $("textarea_gb_class").value = imginfo[0].getElementsByTagName('gbstyle')[0].textContent;

            temp_array_div = [temp_path, temp_width, temp_height]
            doComplete(event, temp_array_div);
            if (version == "3") {
                for (var c = 0; c < divinfo.length; c++) {
                    temp_id = divinfo[c].getElementsByTagName('id')[0].textContent;
                    temp_name = divinfo[c].getElementsByTagName('name')[0].textContent;
                    temp_width = divinfo[c].getElementsByTagName('width')[0].textContent;
                    temp_height = divinfo[c].getElementsByTagName('height')[0].textContent;
                    temp_left = divinfo[c].getElementsByTagName('left')[0].textContent;
                    temp_top = divinfo[c].getElementsByTagName('top')[0].textContent;
                    temp_set_width = divinfo[c].getElementsByTagName('setWidth')[0].textContent;
                    temp_set_height = divinfo[c].getElementsByTagName('setHeight')[0].textContent;

                    temp_array[c] = [temp_id, temp_name, temp_width, temp_height, temp_left, temp_top, temp_set_width, temp_set_height];
                }
            }
            else {
                for (var c = 0; c < divinfo.length; c++) {
                    temp_id = divinfo[c].getElementsByTagName('id')[0].textContent;
                    temp_name = divinfo[c].getElementsByTagName('name')[0].textContent;
                    temp_width = divinfo[c].getElementsByTagName('width')[0].textContent;
                    temp_height = divinfo[c].getElementsByTagName('height')[0].textContent;
                    temp_left = divinfo[c].getElementsByTagName('left')[0].textContent;
                    temp_top = divinfo[c].getElementsByTagName('top')[0].textContent;

                    temp_array[c] = [temp_id, temp_name, temp_width, temp_height, temp_left, temp_top];
                }
            }
            $("div_view_css").innerText = "";
            temp_path = "file:///" + temp_path;
            image.load(new air.URLRequest(temp_path));
            setDiv(temp_array);
        }
        read_end = true;
    }
    xml.open('GET', file_xml.url, true);
    xml.send(null);
}

function setDiv(e) {
    for (var c = 0; c < array_div.length; c++) {
        if (array_div[c] != "") {
            delDiv(event, array_div[c]);
        }
    }

    array_div.length = 0;
    array_style.length = 0;
    num_array_style = 0;
    image_x(1);

    for (var c = 0; c < e.length; c++) {
        array_div[c] = e[c][0];
        addDiv(e[c], addDiv);
    }
    updataDivMagin();
}

function delAll() {
    for (var c = 0; c < array_div.length; c++) {
        if (array_div[c] != "") {
            delDiv(event, array_div[c]);
        }
    }

    array_div.length = 0;
    array_style.length = 0;
    num_array_style = 0;
}

/*
 用于其它页面调用
 */
function div_list() {
    var temp = new Array();
    var temp_lenght = array_div.length;
    for (var n = 0; n < temp_lenght; n++) {
        if (array_div[n] != "") {
            temp[n] = array_style[n];
        }
    }

    return temp;
}

function div_list_del(e) {
    delDiv(event, e);
}

function reset_div_class() {
    var temp_div = $("input_div_id").value;
    if (temp_div) {
        temp_div = $(temp_div);
        temp_div.className = "div-dnr";
    }
}

function checkUpdates() {
    openInBrowser("https://github.com/ghostzhang/bg2css/releases")
}