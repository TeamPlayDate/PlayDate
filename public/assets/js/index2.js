
//Counters------------------------------------------------------------

$('.counter').each(function() {
  var $this = $(this),
      countTo = $this.attr('data-count');
  
  $({ countNum: $this.text()}).animate({
    countNum: countTo
  },

  {

    duration: 7000,
    easing:'linear',
    step: function() {
      $this.text(commaSeparateNumber(Math.floor(this.countNum)));
    },
    complete: function() {
      $this.text(commaSeparateNumber(this.countNum));
    }

  });  

});  

//Counter2------------------------------------------------------------
$('.counter2').each(function () {
    var $this = $(this),
        countTo = $this.attr('data-count');

    $({ countNum: $this.text() }).animate({
        countNum: countTo
    },

        {

            duration: 400000,
            easing: 'linear',
            step: function () {
                $this.text(commaSeparateNumber(Math.floor(this.countNum)));
            },
            complete: function () {
                $this.text(commaSeparateNumber(this.countNum));

            }

        });

});  

//Comma Seprator---------------------------------------------------------
function commaSeparateNumber(val) {
  while (/(\d+)(\d{3})/.test(val.toString())) {
    val = val.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
  }
  return val;
}


