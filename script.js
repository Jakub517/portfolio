
function createSnowflake() {
    
    var snowflake = $('<div class="snowflake">❄️</div>').css({
        top: Math.random() * $(window).height(),
        left: Math.random() * $(window).width(),
    });

  
    $('body').append(snowflake);

  
    snowflake.animate(
        {
            top: $(window).height(),
            left: '+=' + (Math.random() * 200 - 100),
            opacity: 0,
        },
        Math.random() * 5000 + 5000, 
        function () {
          
            $(this).remove();
        
            createSnowflake();
        }
    );
}


$(document).ready(function () {
    for (var i = 0; i < 20; i++) {
        createSnowflake();
    }
});


$(document).ready(function() {

$('.scroll-link').click(function(event) {
  event.preventDefault();
  $('html, body').animate(
    { scrollTop: $($(this).attr('href')).offset().top },
    800
  );
});
});
