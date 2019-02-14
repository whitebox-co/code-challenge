$(document).ready(function(){
    $filter = null;
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
	    let $product = $(this).closest(".block2");
	    if($price < $lower || $price > $upper){
		$product.toggle();
	    }
	    else{
		if($product.is(":hidden")){
		    $product.toggle();
		}
	    }
	});
    });
});


