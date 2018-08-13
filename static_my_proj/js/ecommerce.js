$(document).ready(function(){
    // Contact Form Handlet
    var contactForm = $(".contact-form")
    var contactFormMethod = contactForm.attr("method")
    var contactFormEndpoint = contactForm.attr("action")
    
    function displaySubmitting(submitBtn, defaultText, doSubmit){
      if (doSubmit){
        submitBtn.addClass("disabled")
        submitBtn.html("<i class='fas fa-spinner'></i> Sending...")
      } else {
        submitBtn.removeClass("disabled")
        submitBtn.html(defaultText)
      }
      
    }
    contactForm.submit(function(event){
      event.preventDefault()
      var contactFormSubmitBtn = contactForm.find("[type='submit']")
      var contactFormSubmitBtnTxt = contactFormSubmitBtn.text()
      var contactFormData = contactForm.serialize()
      var thisForm = $(this)
      displaySubmitting(contactFormSubmitBtn, "", true)
      $.ajax({
        method: contactFormMethod,
        url: contactFormEndpoint,
        data: contactFormData,
        success: function(data){
          thisForm[0].reset()
          $.alert({
            title: 'Success!',
            content: data.message,
            type: 'blue',
            typeAnimated: true,
            buttons: {
                tryAgain: {
                    text: 'Thank You!',
                    btnClass: 'btn-blue',
                    action: function(){
                    }
                },
                close: function () {
                }
            }
        });
        setTimeout(function(){
          displaySubmitting(contactFormSubmitBtn, contactFormSubmitBtnTxt, false)
        }, 500)
        },
        error: function(error){
          console.log(error.responseJSON)
          var jsonData = error.responseJSON
          var msg = ""

          $.each(jsonData, function(key, value){
            msg += key + ": " + value[0].message + "<br/>"
          })

          $.alert({
            icon: 'fa fa-spinner fa-spin',
            title: 'Encountered an error!',
            content: msg,
            type: 'red',
            typeAnimated: true,
            buttons: {
                tryAgain: {
                    text: 'Try again',
                    btnClass: 'btn-red',
                    action: function(){
                    }
                },
                close: function () {
                }
            }
        });
        setTimeout(function(){
          displaySubmitting(contactFormSubmitBtn, contactFormSubmitBtnTxt, false)
        }, 500)
        }
      })
    })


    // Auto Search
    var searchForm = $(".search-form")
    var searchInput = searchForm.find("[name='q']")
    var typingTimer;
    var typingInterval = 1500;
    var searchBtn = searchForm.find("[type='submit']")

    searchInput.keyup(function(event){
      // key released
      clearTimeout(typingTimer)
      typingTimer = setTimeout(performSearch, typingInterval)
    })

    searchInput.keydown(function() {
      if(searchInput.val().length > 0){
         searchBtn.addClass("disabled")
         searchBtn.html("<i class='fas fa-spinner'></i> Searching...")
      } else {
         searchBtn.text("Search")
      }
   })
   function performSearch() {
      if(searchInput.val().length > 0) {
          window.location.href = "/search/?q=" + searchInput.val();
      }
    }


    // Cart & Add Products
    var productForm = $(".form-product-ajax")

    productForm.submit(function(event){
      event.preventDefault();
      // console.log("form is not sending")
      var thisForm = $(this)
      // var actionEndpoint = thisForm.attr("action");
      var actionEndpoint = thisForm.attr("data-endpoint")
      var httpMethod = thisForm.attr("method");
      var formData = thisForm.serialize();

      $.ajax({
        url: actionEndpoint,
        method: httpMethod,
        data: formData,
        success: function(data){
          var submitSpan = thisForm.find(".submit-span")
          if (data.added){
            submitSpan.html("In cart <button type='submit' class='btn btn-link'>Remove?</button>")
          } else {
            submitSpan.html("<button type='submit'  class='badge badge-pill badge-dark'>Add to cart</button>")
          }
          var navbarCount = $(".navbar-cart-count")
          navbarCount.text(data.cartItemCount)
          var currentPath = window.location.href
          if (currentPath.indexOf("cart") != -1) {
            refreshCart()
          }
        },
        error: function(errorData){
        $.alert({
          icon: 'fa fa-spinner fa-spin',
          title: 'Encountered an error!',
          content: 'Something went downhill, this may be serious',
          type: 'red',
          typeAnimated: true,
          buttons: {
              tryAgain: {
                  text: 'Try again',
                  btnClass: 'btn-red',
                  action: function(){
                  }
              },
              close: function () {
              }
          }
      });
        }
      })
    })
    function refreshCart(){
      console.log("in current cart")
      var cartTable = $(".cart-table")
      var cartBody = cartTable.find(".cart-body")
      var productRows = cartBody.find(".cart-product")
      var currentUrl = window.location.href
      

      var refreshCartUrl = '/api/cart/'
      var refreshCartMethod = "GET";
      var data = {};
      $.ajax({
        url: refreshCartUrl,
        method: refreshCartMethod,
        data: data,
        success: function(data){
           var hiddenCartItemRemoveFrom = $(".cart-item-remove-form")
          if (data.products.length > 0) {
            productRows.html(" ")
            i = data.products.length;
            $.each(data.products, function(index, value){
              console.log(value)
              var newCartItemRemove = hiddenCartItemRemoveFrom.clone()
              newCartItemRemove.css("display", "block")
              newCartItemRemove.find(".cart-item-product-id").val(value.id)
              cartBody.prepend("<tr><th scope=\"row\">" + i + "</th><td><a href='" + value.url + "'>" + value.name + "</a>" + newCartItemRemove.html() + "</td><td>" + value.price + "</td></tr>")
              i--
            })
            
            cartBody.find(".cart-subtotal").text(data.subtotal)
            cartBody.find(".cart-total").text(data.total)
          } else {
            window.location.href = currentUrl
          }
          
        },
        error: function(errorData){
          $.alert({
            icon: 'fa fa-spinner fa-spin',
            title: 'Encountered an error!',
            content: 'Something went downhill, this may be serious',
            type: 'red',
            typeAnimated: true,
            buttons: {
                tryAgain: {
                    text: 'Try again',
                    btnClass: 'btn-red',
                    action: function(){
                    }
                },
                close: function () {
                }
            }
        });
        }
      })

    }
  })