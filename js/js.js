(function($){
	var rows = [];
	var modal = $("#myModal1");
	var table = $("#table");
		function generateTable(rows){
			var tpl=$("#template-row").clone();	
			table.find("tbody tr").not("#template-row").remove();
			for(var i = 0; i < rows.length;i++){
				var t=tpl.clone();
				t.removeClass("hidden");
				t.attr("id","row"+i);
				t.find(".name a").text(rows[i].name);
				t.find(".count").text(rows[i].count);
				t.find(".price").text(rows[i].price);
				t.find(".btn-delete").attr("data-id",i);
				table.find("tbody").append(t);
			}
		}
	generateTable(rows);

    $("#btn-add").click(function(){
        modal.modal();
        $("#btnadd").text("Add");
    });

    $('.form-control').click(function(){
    	 $(this).closest('.form-group').removeClass('has-error');
    });

	$('#btnadd').click(function(){
		var n = $.trim($('#name').val());
		var c = $('#count').val();
		var p = $('#price').val();
		if(n.length > 15 || n == ""){
			 $('#name').closest('.form-group').addClass('has-error');	 
		}
		if(!$.isNumeric(c)){
			$('#count').closest('.form-group').addClass('has-error');
		}
		if($("#loginForm .form-group.has-error").length > 0){
			return;
		}
		if($(this).text() != "Update"){	
			rows.push({name:n,count:c,price:p});			
		}
		else {
			var i = $trEdit.index()-1;
			rows[i].name=n;
			rows[i].count=c;
			rows[i].price=p;
		}
		generateTable(rows);
		modal.modal("hide");
	});
	//edit
	var $trEdit = null;
	table.on('click','.btn-edit',function(){
		modal.modal();
		$("#btnadd").text("Update");
		
		$trEdit = $(this).closest('tr');
		var name = $trEdit.find('td:eq(0)').text();
		var count = $trEdit.find('td:eq(1)').text();
		var price = $trEdit.find('td:eq(2)').text();

		$('#name').val(name);
		$('#count').val(count);
		$('#price').val(price);
	});

	$("#price").blur(function(){
		if($.isNumeric(this.value)){
			this.value = accounting.formatMoney(this.value);
		}
		if(this.value != accounting.formatMoney(accounting.unformat(this.value))){
			$('#price').closest('.form-group').addClass('has-error');
		}
	});
	//delete
	$("#table").on('click','.btn-delete', function() { 
		var self = this; 
		$('#myModal').modal({ backdrop: 'static', keyboard: false }) 
		.one('click', '#yes', function () { 
			rows.splice($(self).closest('tr').index() - 1, 1); 
			$(self).closest('tr').remove(); 
		}); 
	});
	$(self).closest('tr').index() - 1
	//сортировка
	$(".glyphicon-chevron-up").click(function(){ 
		var vybor = $(this).attr("data-name"); 
		if($(this).hasClass("glyphicon-chevron-up")){ 
			$(this).removeClass("glyphicon-chevron-up"); 
			$(this).addClass("glyphicon-chevron-down"); 
			rows.sort(function(a,b){ 
				var a1 = a[vybor].replace("$", "").replace(",", "").replace(" ", ""); 
				var b1 = b[vybor].replace("$", "").replace(",", "").replace(" ", ""); 
				return (a1 < b1) ? 1 : (a1 > b1 ? -1 : 0); 
			}); 
		} 
		else{ 
			$(this).removeClass("glyphicon-chevron-down"); 
			$(this).addClass("glyphicon-chevron-up"); 
			rows.sort(function(a,b){ 
				var a1 = a[vybor].replace("$", "").replace(",", "").replace(" ", ""); 
				var b1 = b[vybor].replace("$", "").replace(",", "").replace(" ", ""); 
				return (a1 < b1) ? -1 : (a1 > b1 ? 1 : 0); 
			}); 
		} 
		generateTable(rows); 
	});
})(jQuery);
	
