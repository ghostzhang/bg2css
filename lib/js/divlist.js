/**
 * @author ghostzhang
 */
function $(e){
    return document.getElementById("" + e + "");
}

function delDiv(divinfo){
    var id = divinfo.parentNode.parentNode.id;
    window.opener.div_list_del(id);
	$(id).style.display = "none";
}

function div_info(divinfo){
    var id = divinfo.parentNode.parentNode.id;
	window.opener.reset_div_class();
    window.opener.div_info(id, 0, 0, 0, 0);
	$(id).className = "div-dnr-now";
	var temp_div = $("input_div_id").value;
	if (temp_div) {
		temp_div = $(temp_div);
		temp_div.className = "div-dnr";
	}
	$("input_div_id").value = id;
	window.opener.image_x(1);
}

function resetDive(){
    window.opener.resetDive();
}

function delAll(){
	window.opener.delAll();
	$("div_list").style.display = "none";
}

function addAtt(div_list){
    for (var n = 0; n < div_list.length; n++) {
		if (div_list[n]) {
			var ch = document.createElement('input');
			var bt = document.createElement('input');
			
			ch.type = "radio";
			ch.name = "radio_ch";
			ch.onclick = function(){
				div_info(this);
			}
			bt.type = "button";
			bt.value = "X";
			bt.onclick = function(){
				delDiv(this)
			}
			
			$("choose_" + div_list[n][0] + "").appendChild(ch);
			$("del_" + div_list[n][0] + "").appendChild(bt);
		}
    }
}

function onload(){
    var temp_div_list = window.opener.div_list();
    var temp = "";
    
    for (var n = 0; n < temp_div_list.length; n++) {
		if (temp_div_list[n]) {
			temp += "<tr id='" + temp_div_list[n][0] + "' class='div-dnr'>";
			temp += "<td>" + temp_div_list[n][1] + "</td>";
			temp += "<td>" + temp_div_list[n][2] + "px</td>";
			temp += "<td>" + temp_div_list[n][3] + "px</td>";
			temp += "<td>" + temp_div_list[n][4] + "px</td>";
			temp += "<td>" + temp_div_list[n][5] + "px</td>";
			
			if (temp_div_list[n][6]){
				temp +='<td style="color:#155667">' + temp_div_list[n][6] + "</td>";
			}else{
				temp +='<td style="color:#CC0033">' + temp_div_list[n][6] + "</td>";
			}

			if (temp_div_list[n][7]){
				temp +='<td style="color:#155667">' + temp_div_list[n][7] + "</td>";
			}else{
				temp +='<td style="color:#CC0033">' + temp_div_list[n][7] + "</td>";
			}
			temp += '<td id="choose_' + temp_div_list[n][0] + '"></td>';
			temp += '<td id="del_' + temp_div_list[n][0] + '"></td>';
			temp += "</tr>";
		}
    }
    $("div_list").innerHTML = temp;
    addAtt(temp_div_list);
    $('bt_reset').addEventListener('click', resetDive);
    $('bt_delall').addEventListener('click', delAll);
}
