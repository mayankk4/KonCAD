function selectElementText(el, win) {
    win = win || window;
    var doc = win.document, sel, range;
    if (win.getSelection && doc.createRange) {
        sel = win.getSelection();
        range = doc.createRange();
        range.selectNodeContents(el);
        sel.removeAllRanges();
        sel.addRange(range);
    } else if (doc.body.createTextRange) {
        range = doc.body.createTextRange();
        range.moveToElementText(el);
        range.select();
    }
}

function scroll_console_down(){
	$('#console').scrollTop($('#console').height()+1000000);
}

function buffer_to_console(){
	var firstElement = console_buffer.shift();

	if(firstElement == '<p class="blueBox caption"> >: Processing complete.</p>'){
		clearInterval(refreshIntervalId);
		$('#table-wrapper').show('slow');

		//$("#scaffold-1").attr("src","");
		//$("#scaffold-2").attr("src","");
		//$("#stapler-1").attr("src","");
		
		$('#images-show').show('slow');
		$('#analysis-report').show('slow');					
		
		$('#pdf').removeAttr('disabled');
		$('#pdf').removeClass('grey');
		$('#pdf').addClass('orange');
	}

	$('#console p:last').remove();
	$('#console').append(firstElement);
	$('#console').append('<p class="cursor">|</p>');				
}

function console_log(log_message){
	console_buffer.push('<p class="blueBox caption"> >: '  + log_message + '</p>');	
}

function console_log_error(log_message){
	console_buffer.push('<p style="color:red" class="blueBox"> >: ' + log_message + '</p>');
	clearInterval(refreshIntervalId);
}

function console_log_info(log_message){
	console_buffer.push('<p style="color:white" class="blueBox"> >:' + log_message + '</p>');		
	
}

function console_log_dot(log_message){
	console_buffer.push('<span style="color: #55d839;"  class="blueBox">' + log_message + '</span>');
	
}

function removeByClass(className) {
   $("."+className).remove();
   console_log("cleared");
}
