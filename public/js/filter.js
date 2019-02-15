$(document).ready(function(){
    $filter = null;
    $firstSelect = $('.selection-2')[0];
    $secondSelect = $('.selection-2')[1];

    $("button").each(function(index){
	if($(this).text().trim() === "Filter"){
	    $filter = $(this);
	}
    });
    $filter.click(function(){
	let $lower = Number($('#value-lower').text());
	let $upper = Number($('#value-upper').text());
	$(".p-r-5").each(function(index){
	    let $price = $(this).text().trim().substring(1);
	    let $product = $(this).closest(".p-b-50");
	    if($price < $lower || $price > $upper){
		if(!$product.is(":hidden")){
		    $product.toggle();
		}
	    }
	    else{
		if($product.is(":hidden")){
		    $product.toggle();
		}
	    }
	});
    });
    $('select').on('change',function(){
	if(this.value === "Price: low to high"){
	    console.log('lowhigh');
	    let orderDef = $(".block2").closest('.p-b-50').sort(function(a,b){
		let $first = Number($(a).find('.block2-price').text().trim().substring(1));
		let $second = Number($(b).find('.block2-price').text().trim().substring(1));
		return $first > $second;
	    });
	    $(".block2").closest('.row').html(orderDef);
	}
	if(this.value === "Price: high to low"){
	    let orderDef = $(".block2").closest('.p-b-50').sort(function(a,b){
		let $first = Number($(a).find('.block2-price').text().trim().substring(1));
		let $second = Number($(b).find('.block2-price').text().trim().substring(1));
		return $first < $second;
	    });
	    $(".block2").closest('.row').html(orderDef);
	}

    });
});


