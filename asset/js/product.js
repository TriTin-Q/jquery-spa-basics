(function(){
    let productsContent = "";
    var i = 0;
    $.get('data/product.json', function(products) {
        $.each(products, function(id, product) {
            productsContent += `
            <div class="col-12 col-md-6 col-lg-4" style="margin-top: 15px; margin-bottom: 15px;">
                <div class="card" data-product='${JSON.stringify(product)}'>
                    <img class="card-img-top" src="${product.image}" alt="Card image cap" style="width: 150px; height: 150px; margin: 0 auto;">
                    <div class="card-body">
                        <h4 class="card-title" style="height:80px; overflow: hidden;">${product.title}</h4>
                        <p class="card-text" style="height: 150px; overflow: hidden;">${product.description}</p>
                        <div class="row">
                            <div class="col">
                                <p class="btn btn-danger btn-block">${product.price} €</p>
                            </div>
                            <div class="col">
                                <a href="#" class="cta-panier btn btn-success btn-block ">Add to cart</a>
                                <p> </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;

            $('.products .row').html(productsContent);

        })
        $('body').trigger('PRODUCT_LOADED');

    });
})();




$('body').on('PRODUCT_LOADED',function(){

    $('.cta-panier').click(function(event){
        event.preventDefault();
        
        let product = $(this).parents('.card');
        product = JSON.parse(product.attr('data-product'));
        console.log(product);
        
        TOTAL = TOTAL += product.price;

        $('.total').html(`${TOTAL} €`);

        $('ul').on('PANIER_LOADED',function(){
        // $('#listePanier').html('');

        $('#listePanier').append(`<li class="list-group-item d-flex justify-content-between lh-condensed">
            <div>
              <h6 class="my-0">${product.title}</h6>
            </div>
            <span class="text-muted">${product.price} €</span>
          </li>`)
          $('#TotalPanier').html(`${TOTAL} €`);

        })
  
    })

    // $.get('data/product.json', function(products){
    //     var i = 2;
    //     console.log(products[`${i},`].price); 
    // })

})
