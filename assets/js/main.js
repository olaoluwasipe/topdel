$(document).ready(function(){
            

    //   localStorage.clear();

    function makePayment(email, number, name, amount) {
          FlutterwaveCheckout({
          public_key: "FLWPUBK_TEST-bfa348ed22bc17d90f73a3327cece5ad-X",
          tx_ref: "RX1",
          amount: amount,
          currency: "NGN",
          country: "NG",
          payment_options: " ",
          customer: {
              email: email,
              phone_number: number,
              name: name,
          },
          callback: function (data) { // specified callback function
              console.log(data);
          },
          customizations: {
              title: "TopDel Logistics",
              description: "Payment for logistics service",
              logo: "http://127.0.0.1:5500/assets/topdel_logo.png",
          },
          });
      }

      var picky = 0;
      var droppy = 0;

    if (localStorage.getItem("pick-lga") !== null && localStorage.getItem("drop-lga") !== null) {
        var pickLga = localStorage.getItem("pick-lga");
        var dropLga = localStorage.getItem("drop-lga");
        picky = pickLga;
        droppy = dropLga;
      $('#pick-up').val(pickLga).change();
      $('#drop-off').val(dropLga).change();
      var sdlga = $("#pick-up option:selected").text();
      var dolga = $("#drop-off option:selected").text();
      $("#sdlga").val(sdlga);
      $("#dolga").val(dolga);
      }

      $("#pick-up").on("select2:select", function(){
          picky = $(this).val();
          console.log(picky);
          var sdlga = $("#pick-up option:selected").text();
          $("#sdlga").val(sdlga);
      });
      $("#drop-off").on("select2:select", function(){
          droppy = $(this).val();
          console.log(droppy);
          var dolga = $("#drop-off option:selected").text();
          $("#dolga").val(dolga);
      });

      var amount = picky + droppy * 1000;



      $("#pay-button").click(function(){

          var sdname = $("#sdname").val();
          var sdemail = $("#sdemail").val();

          var tel = $("#sdtel").val();
          makePayment(sdemail, tel, sdname, amount);
      });

      function validateForm(form) {
          var valid = true;
          form.each(function () {
              if ($(this).val().length === 0) {
                  valid = false;
                  return false;
              }
          });
          return valid;
      }

      let num = 1;
      function completeStep(){
          var form = $(".order-form .grid."+num+" .form-field");
          if(validateForm(form) !== false){
              var step = $(".stepper-item[data-step='"+num+"']");
              step.addClass("completed");
          }
      }
      completeStep();

      $(".order-form .grid").not(".grid.1").hide();
      $(".stepper-item").click(function(){
          num = $(this).data("step");
          $(".order-form .grid."+num).show();
          $(".order-form .grid:not(."+num+")").hide();
          $(".stepper-item").removeClass("active");
          $(this).addClass("active");
          completeStep();
          switch(num){
              case 2:
                  $(".order-process .section-heading h2").html("Package Type");
                  $("#next-btn").show();
                  break;
              case 3:
                  $(".order-process .section-heading h2").html("Shipping Information");
                  $("#next-btn").show();
                  break;
              case 4:
                  $(".order-process .section-heading h2").html("Payment & Review");
                  $("#next-btn").hide();
                  break;
              default:
                  $(".order-process .section-heading h2").html("Make An Order");
                  $("#next-btn").show();
          }
      });

      function nextStep(){
          completeStep()
          num++;
          $(".order-form .grid."+num).show();
          $(".order-form .grid:not(."+num+")").hide();
          $(".stepper-item").removeClass("active");
          $(".stepper-item[data-step='"+num+"']").addClass("active");
          if(num == 4){
              num = 1;
              $("#next-btn").hide();
          }else{
              $("#next-btn").show();
          }
      }

      
      if(!$(".order-form .grid").css('visibility') === 'hidden'){
              $("#next-btn").show();
          }

      
      $("#next-btn").click(function(e){
          e.preventDefault();
          nextStep();
      })

      if($(".stepper-item[data-step='2']").hasClass("active")){
          $(".order-process .section-heading h2").html("Package Type");
      }
      
      $('.select-lga').select2({
          placeholder: "Choose your LGA",
          allowClear: true,
      });

      $(".package").select2({
          placeholder: "Select at most 3 options",
          maximumSelectionLength: 3,
      });

      $(".hamburger").click(function(){
          $(this).toggleClass("is-active");
          $(".header .navigation nav").toggleClass("is-active");
      });

      $(".track").on("click", function(e){
          e.preventDefault();
          $(".pop-up").addClass("open");  
      });

      $(".pop-close").on("click", function(){
          $(".pop-up").removeClass("open");
          $(".pop-up").fadeOut(1000);
      });
      $(".pop-up").click(function() {
          $(".pop-up").removeClass("open");
          $(".pop-up").fadeOut(1000);
      });
      $('.pop-up-block').click(function (evt) {
          evt.stopPropagation();
      });

      const scroll = new LocomotiveScroll({
          el: document.querySelector('[data-scroll-container]'),
          smooth: true
      });
      setTimeout(() => {
          scroll.update();
      }, 500); 
    $("a").on('click', function(event) {
      if (this.hash !== "") {
        event.preventDefault();
        var hash = this.hash;
        $('html, body').animate({
          scrollTop: $(hash).offset().top
        }, 800, function(){
          window.location.hash = hash;
        });
      } 
    });
  });