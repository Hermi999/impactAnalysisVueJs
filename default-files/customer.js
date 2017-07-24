/*
 * With this file it is possible to overwrite the standard code of the
 * impact analysis. You can overwrite every singe function within ia.code
 * and ia.preload. In this way the Impact Analysis Tool is highly 
 * customizable and very flexible.
 */

// ****** example for function addition ******
// updates the suggested allocation - according to the ECB allocation activity diagram
/*ia.code.update_allocation_suggestion = function(){
	var _ = ia.initial.questions;
	var allocation;

	// SYS-ECU
	if (_.q1.answers === "Yes" && _q2.answers !== "Yes" ||
	  	_.q){

	}// SYS-SF
	else if(){

	}// SW-Design
	else if(_.q2){

	}// ChangeBasedDev
	else if(){

	}else{
		$("#allocation-suggestion").val("allocation error");
		$("#allocation-suggestion").css("background-color", "rgb(246, 172, 160)");
	}

	$("#allocation-suggestion").val(allocation);
	$("#allocation-suggestion").css("background-color", "rgb(166, 246, 166)");
}*/



// ****** example for a code overwrite ******
// overwrite log functionality
ia.code.log = function(username, action, value, storage_array){
	date_time = new Date();		

	// create storage object
	var storage_object = {
		date_time: date_time,
		username: username,
		action: action,
		value: value,
		"Customer specific": "BMW text"
	};

	// add to specific storage object
	storage_array.push(storage_object);
}




// ******* example for adding a customer specific functionality ********
// add feature list functionality, events
$("#open_feature_list").click(function(){
	ia.code.showFeatureList();
});
$("#list-modal-headline").html("Feature list");
$("#list-modal-search-text").html("Search feature");
$("#list-search").attr("placeholder", "Feature x");

// shows the feature list
ia.code.showFeatureList = function(){
	$("#list-modal").modal("show");
	setTimeout(function(){
		$("#list-search").focus();
	},500);
}

// add shortcuts for ptsa and feature list
ia.code.initialize_key_shortcuts = function(){
	$(window).keydown(function(e){
		var code = e.keyCode || e.which;
		// Strg + d
		if (code === 68 && e.ctrlKey){
			ia.code.showFeatureList();
			e.preventDefault();
		}	

		// Strg + b
		if (code === 66 && e.ctrlKey){
			ia.code.showSysElList("ptsa-modal", "ptsa-search");
			e.preventDefault();
		}	
	});
};
ia.code.initialize_key_shortcuts();

// example for a preload hook
ia.preload.customer_specific = function(){
	if(ia.preload.load_features === undefined){
		ia.preload.load_features = function(){
			Papa.parse(ia.feature_list_link, {
				download: true,
				header: true,
				complete: function(results)
				{
					if(results.errors.length > 0){
						console.log("Feature-List: Errors occured! See object below:");
						console.log(results.errors);
					}
					ia.feature_list = results.data;
					ia.code.load_object_list(ia.feature_list, "modal-list", "feature-list-element", "list-search");
					ia.ready = true;
					console.log("done loading customer specific features");
				}
			});
		};
	}
	ia.preload.load_features();
}



// ******* change user interface *********
// add feature list menu entry
var menu_entry = '<li><a id="open_feature_list" href="#">Open Feature List (Strg+d)</a></li>';
$(menu_entry).insertAfter($("#open_ptsa_list").parent());

// add list entry to side-bar / impact analysis tool documentation
$('<li id="ia-auto-alloc"><a href="docs/Allocation.pdf" target="_blank">The BMW allocation flow</a></li>').insertAfter("#ia-tool-customize");