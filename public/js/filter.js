$(document).ready(function(){
    $filter = null;
    $firstSelect = $('.selection-2')[0];
    $secondSelect = $('.selection-2')[1];
    $defaultOrder = null;

    // retrieves the latest order of products
    let latestProducts = function(){
	$order = [];
	$(".block2").closest('.p-b-50').each(function(index){
	    $order.push($(this));
	});
	return $order;
    }

    $defaultOrder = latestProducts(); // default order of products
	
    $("button").each(function(index){
	if($(this).text().trim() === "Filter"){
	    $filter = $(this);
	}
    });

    // reroutes user to detailed product page on click of product
    $('.block2-overlay').each(function(index){
	$(this).click(function(){
	    window.location.href="http://localhost:3000/detail";
	});
    });

    // handles filter functionality
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

    // handles select functionality
    $('select').on('change',function(){
	if(this.value === "Price: low to high"){
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
	if(this.value === "Default Sorting"){
	    $(".block2").closest('.row').html($defaultOrder);
	}
    });


    // handles product pages
    let $firstPage = null;
    let $secondPage = null;
    $('a').each(function(index){
	if($(this).text() === '1'){
	    $firstPage = $(this);
	    $(this).click(function(){
		$secondPage.removeClass('active-pagination');
		$firstPage.addClass('active-pagination');
	    });
	}
	if($(this).text() === '2'){
	    $secondPage = $(this);
	    $(this).click(function(){
		$firstPage.removeClass('active-pagination');
		$secondPage.addClass('active-pagination');
	    });
	}
    });

});


