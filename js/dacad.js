
var console_buffer = new Array();
var refreshIntervalId;

$(document).ready(function() {

  	$('input[placeholder]').placeholder();
   
	$(document).bind("contextmenu",function(e){
              return false;
       });

	// Stuff to do as soon as the DOM is ready;
	setInterval("buffer_to_console()", 500);	
	setInterval ( "cursorAnimation()", 600 );

	$("#user_input").numeric({ negative: false }, function() { console_log_error("Please enter a positive integer or float value only."); this.value = ""; this.focus(); });



	$('#start_autoscroll').click(function () {
	        refreshIntervalId = setInterval( scroll_console_down, 500 );
	        });

	$('#stop_autoscroll').click(function () {
	           clearInterval(refreshIntervalId);
	        });		


		$('#console p:last').remove();
		$('#console').append('<p class="blueBox">+-+-+-+-+-+-+</p>');
		$('#console').append('<p class="blueBox">K&nbsp;o&nbsp;n&nbsp;C&nbsp;A&nbsp;D&nbsp;</p>');
		$('#console').append('<p class="blueBox">+-+-+-+-+-+-+</p>');
		$('#console').append('<p>&nbsp;</p>')
		$('#console').append('<p class="cursor">|</p>');

		console_log('+-+-+-+-+-+-+-+-+-+-+-+-+');
		console_log('|D|A|-|N|a|n|o|T|r|o|n|s|');
		console_log('+-+-+-+-+-+-+-+-+-+-+-+-+');

}); // end document ready


/*function SelectText(element) {
    var doc = document;
    var text = doc.getElementById(element);    
    if (doc.body.createTextRange) { // ms
        var range = doc.body.createTextRange();
        range.moveToElementText(text);
        range.select();
    } else if (window.getSelection) {
        var selection = window.getSelection();
        if (selection.setBaseAndExtent) { // webkit
            selection.setBaseAndExtent(text, 0, text, 1);
        } else { // moz, opera
            var range = doc.createRange();
            range.selectNodeContents(text);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }
}
*/



function process_input(){

	$('#table-wrapper').hide();
	$('#images-show').hide();
	$('#analysis-report').hide();			
	refreshIntervalId = setInterval( scroll_console_down, 500 );

	
	if($('#user_input').val() !=''){
		console_log_info('The radius of the outermost ring that you entered is ' + $('#user_input').val() + ' nm.' );

		var outer_radius = $('#user_input').val();			
		var outer_radius = outer_radius.replace(/^\s\s*/, '').replace(/\s\s*$/, '');			    				
		//var intRegex = /^\d+$/;				


		//if(intRegex.test(outer_radius)) {

			console_log('Processing details of the structure and rendering images ...');
			console_log_dot('================');
			console_log_dot('========');
			console_log_dot('==');
			console_log_dot('===================');

			// continue here ... 

			var outer_radius_original = outer_radius;
			$("#ana-1").html(outer_radius_original);

			var circumference_outer_original  = 2 * 3.14 * outer_radius_original;
			console_log_info('The circumference of the outer ring is ' + circumference_outer_original.toFixed(2) + ' nm');

			var bps_outer_original = 3.088 * circumference_outer_original;						
			console_log_info('The base pairs in the outermost ring according to your input is ' + Math.round(bps_outer_original*100)/100 + ' bps');

			if(bps_outer_original > 75){

				console_log('The outer radius that you specified meets the minimum requirement for creating a disk.');
				console_log('Analyzing ... ');
				console_log_dot('================');
				console_log_dot('========');
				console_log_dot('==');
				console_log_dot('===================');
			
				console_log('To improve the stability of the design of the structure, the software may modify the outer radius specified by you by +-1.25 nm.');

				var new_bps_outer = (Math.round(bps_outer_original/50)) * 50;
				var circumference_outer = new_bps_outer/3.088; 
				outer_radius = circumference_outer/(2*(3.14));

				outer_radius = Math.round(outer_radius*100)/100;

				console_log_info('The outer radius has been modified to ' + outer_radius + ' nm');
				console_log_info('This value is different from the original outer radius that you specified by ' + (outer_radius - outer_radius_original).toFixed(2) + ' nm');
				console_log_info('Now the circumference of the outer ring is ' + circumference_outer.toFixed(2) + ' nm');
				console_log_info('Now the base pairs in the outermost ring are ' + new_bps_outer.toFixed(0)  + ' bps')
				
				$("#ana-2").html(outer_radius);
				
				console_log('ReInitiating calculations ... ');
				console_log_dot('================');
				console_log_dot('========');
				console_log_dot('==');
				console_log_dot('===================');
				// outer_radius
				// circumference_outer
				// new_bps_outer

				if(new_bps_outer < (7250/2)){

					console_log('Calculating the number of rings that can be formed... ');
					console_log('Assuming that the distance between adjacent rings is 2.5 nm');
					console_log_info('Difference in circumference of two adjacent rings : ' + Math.round(2*3.14*2.5*100)/100 + ' bps, which is approximately a difference of 48 to 50 base-pairs between two adjacent rings.');

					console_log('A B-Form DNA has a natural helicity of 10.5 bps per turn. However, in this structure, we can safely assume that the helicity of the DNA strand is slightly flexible. This assumption has been proven valid through previous research.');

					console_log('Calculating the maximum number of rings possible in the structure...');
					console_log('Assuming that the maximum length of scaffold available to us is 7250 bps.');

					var current_ring_bp = new_bps_outer;
					var scaffold_length_needed = current_ring_bp;
					var number_of_rings = 1;

					while( (scaffold_length_needed + current_ring_bp < 7250) && current_ring_bp >= 100){
						number_of_rings++;
						current_ring_bp -= 50;
						scaffold_length_needed += current_ring_bp;
					}

					var bps_inner = current_ring_bp;

					console_log_info('The Number of rings which can fit into the structure is '+ number_of_rings);
					console_log_info('The scaffold length needed for the structure is '+ scaffold_length_needed);
					
					$("#ana-6").html(number_of_rings);
					$("#ana-4").html(scaffold_length_needed);
					$("#ana-5").html(7249 - parseInt(scaffold_length_needed));
					
					$("#scaffold-1-1").attr("src","imgs/software/2d_rings/perspective_1/"+number_of_rings+".png");
					$("#scaffold-2-1").attr("src","imgs/software/2d_rings/perspective_2/"+number_of_rings+".png");

					$("#scaffold-1-2").attr("src","imgs/software/2d_rings/perspective_1/"+number_of_rings+".png");
					$("#scaffold-2-2").attr("src","imgs/software/2d_rings/perspective_2/"+number_of_rings+".png");

					console_log_info('The number of basepairs in the outermost ring are ' + new_bps_outer + ' whereas the number of basepairs in the innermost ring are ' + current_ring_bp);
					
					
					console_log('Providing detailed analysis of each ring...');

					var current_ring_bp = bps_inner;
					var ring_number = 1;

					console_log('Clearing Table...');
					

						while($('#result_table tr').length > 1){
							$('#result_table tr:last').remove();
						}


					while( current_ring_bp <= new_bps_outer){

						var num_crossovers = 0;

						if(current_ring_bp <= 250){
							num_crossovers = 5;
						}else if(current_ring_bp > 250 && current_ring_bp < 700){
							num_crossovers = 10;
						}else{
							num_crossovers = 25;	
						}

						var cur_bp_per_crossover = Math.round((current_ring_bp/num_crossovers));
						var cur_radius  = Math.round((current_ring_bp)/(2*3.14*3.088)*100)/100;

						var cur_turn_per_crossover = 0;
						var cur_bps_per_turn = 0;

						if(cur_bp_per_crossover%10 == 0){
							cur_bps_per_turn = 10;
							cur_turn_per_crossover = cur_bp_per_crossover/10;
						}else{
							// write algo here
							// find appropriate bps per turn which is closest to 10.5
							// find turns between 2 consequetive crossovers
							var test_bps_per_turn_1 = 10.60;
							var test_bps_per_turn_2 = 10.50;

							console_log('Calculating the modified value of average bps per turn for  ' + ring_number);

							while( (Math.round((cur_bp_per_crossover%test_bps_per_turn_1)*100)/100 > 0.10) && (test_bps_per_turn_1 - (Math.round((cur_bp_per_crossover%test_bps_per_turn_1)*100)/100) > 0.10) && ( Math.round((cur_bp_per_crossover%test_bps_per_turn_2)*100)/100 > 0.1) && (test_bps_per_turn_2 - (Math.round((cur_bp_per_crossover%test_bps_per_turn_2)*100)/100) > 0.10) ){

								//alert('bps per crossover is ' + cur_bp_per_crossover);
								//alert(test_bps_per_turn_1);
								//alert(Math.round((cur_bp_per_crossover%test_bps_per_turn_1)*10)/10);
								//alert(Math.round((65%10.7)*10)/10);
								//alert(test_bps_per_turn_1 - (Math.round((cur_bp_per_crossover%test_bps_per_turn_1)*10)/10));
								//alert(test_bps_per_turn_2);
								//alert(Math.round((cur_bp_per_crossover%test_bps_per_turn_2)*10)/10);

								test_bps_per_turn_1 = (test_bps_per_turn_1 + 0.01);
								test_bps_per_turn_2 = (test_bps_per_turn_2 - 0.01);
							}

							if( (Math.round((cur_bp_per_crossover%test_bps_per_turn_1)*100)/100 <= 0.10) || ( test_bps_per_turn_1 - (Math.round((cur_bp_per_crossover%test_bps_per_turn_1)*100)/100) <= 0.10) ){
								cur_bps_per_turn = Math.round(test_bps_per_turn_1*100)/100;
								console_log_info('The modified value of average bps per turn for ring ' + ring_number + ' is ' + cur_bps_per_turn);
								cur_turn_per_crossover = Math.round(((cur_bp_per_crossover/cur_bps_per_turn)*100)/100);

							}else{
								cur_bps_per_turn = Math.round(test_bps_per_turn_2*100)/100;
								console_log_info('The modified value of average bps per turn for ring ' + ring_number + ' is ' + cur_bps_per_turn);
								cur_turn_per_crossover = Math.round(((cur_bp_per_crossover/cur_bps_per_turn)*100)/100);
							}								

						}


							$('#result_table').append('<tr><td>' + ring_number + '</td><td>'+ current_ring_bp + '</td><td>'+ num_crossovers + '</td><td>'+ cur_radius + '</td><td>'+ cur_bp_per_crossover + '</td><td>'+ cur_turn_per_crossover + '</td><td>'+ cur_bps_per_turn + '</td></tr>');

						current_ring_bp += 50;
						ring_number++;
					}

					console_log('Processing complete.');
					console_log('Scroll down for analysis reports.');
					console_log('====================================================================');

				}else{ // available scaffold not large enough to make structure
					console_log_error('The outer radius that you specified exceeds the maximum allowed size of the scaffold.');
				}

			}else{ // the number of base pairs is too less to create the structure
				console_log_error('The outer radius you specified is insufficient to create a disc structure. Please specify a larger value for Outer Radius.');						
			}


	}else{ // user input is empty
		console_log_error('Please enter the value of the Outer Radius of the disc that you want to study.');
	}
}
