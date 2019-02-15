$(document).ready(function(){
    // variable definitions
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

    // returns an array of products that are within the price range of low - high inclusive
    let filterProducts = function(low,high,products){
	let filtered = [];
	for(let i = 0; i < products.length; i++){
	    let current = Number(products[i].find('.block2-price').text().trim().substring(1));
	    if(current >= low && current <= high){
		filtered.push(products[i]);
	    }
	}
	return filtered;
    }

    // only displays products in the array of selected - hides all others
    let showProducts = function(selected){
	on = $defaultOrder.filter(function(ele){
	    return selected.indexOf(ele) > -1;
	});
	off = $defaultOrder.filter(function(ele){
	    return selected.indexOf(ele) <= -1;
	});
	for(let i = 0; i < on.length; i++){
	    if(on[i].is(":hidden")){
		on[i].toggle();
	    }
	}
	for(let i = 0; i < off.length; i++){
	    if(!off[i].is(":hidden")){
		off[i].toggle();
	    }
	}
    }

    // reroutes user to detailed product page on click of product
    $('.block2-overlay').each(function(index){
	$(this).click(function(){
	    window.location.href=window.location.origin+"/detail";
	});
    });

    // handles filter functionality
    $("button").each(function(index){
	if($(this).text().trim() === "Filter"){
	    $filter = $(this);
	}
    });
    $filter.click(function(){
	let $lower = Number($('#value-lower').text());
	let $upper = Number($('#value-upper').text());
	let $filtered = [];
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

    // handles search products
    searchProducts = function(){
	key = $('#search').val();
	if(key.length == 0){
	    showProducts($defaultOrder);
	}
	else{
	    hiddenItems = [];
	    selectedItems = [];
	    $(".p-r-5").each(function(index){
		let description = $(this).siblings("a").text().trim();
		if(description.includes(key)){
		    selectedItems.push($(this));
		}
		else{
		    hiddenItems.push($(this));
		}
	    });
	    for(let i = 0;i < hiddenItems.length; i++){
		div = hiddenItems[i].closest('.p-b-50');
		if(!div.is(":hidden")){
		    div.toggle();
		}
	    }
	    for(let i = 0;i < selectedItems.length; i++){
		div = selectedItems[i].closest('.p-b-50');
		if(div.is(":hidden")){
		    div.toggle();
		}
	    }
	}
    }
    $('#search').change(function(){
	searchProducts();
    });
    $("#search").siblings("button").click(function(){
	searchProducts();
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
	$def = $defaultOrder;
	switch(this.value){
	    case "$0.00 - $50.00":
	    	$filtered = filterProducts(0,50,$def);
		showProducts($filtered)
	    	break;
	    case "$50.00 - $100.00":
	    	$filtered = filterProducts(50,100,$def);
		showProducts($filtered)
	    	break;
	    case "$100.00 - $150.00":
	    	$filtered = filterProducts(100,150,$def);
		showProducts($filtered)
	    	break;
	    case "$150.00 - $200.00":
	    	$filtered = filterProducts(150,200,$def);
		showProducts($filtered)
	    	break;
	    case "$200.00+":
	    	$filtered = filterProducts(200,Number.MAX_SAFE_INTEGER,$def);
		showProducts($filtered)
	    	break;
	    case "Price":
	    	showProducts($defaultOrder)
	    default:
	    	break;
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


