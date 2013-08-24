$(
function(){
  var pre = '';
  function Message(mes,url) {
    $('#message').show().text(mes).append($('<a href="'+url+">").text('twitterで見る'));
  }
  $('#blank').css({
    'height': $(document).height(),
    'width': $(document).width()
  }).on('click',function(){
      $('#blank').hide();
      $('#message').hide();
  });
  $('.poteti-card').on('click',function(){
    if($(this).is('.pre')){return false}
    $('#blank').show();
    Message($(this).attr('data-text'),$(this).attr('data-url'));
    if(pre == ''){
      pre = $(this).attr('data-url');
      $(this).addClass('pre').removeClass('poteti-card');
    }else{
      if(pre == $(this).attr('data-url')){
        alert('正解！！');
        $(this).addClass('ok');
        $('.pre').addClass('ok').removeClass('pre').removeClass('poteti-card');
      }
      pre = '';
      $('.pre').removeClass('pre').addClass('poteti-card');
    }
  });
  $.getJSON('./poteti.json').done(function(data){
    data.sort(function() {
            return Math.random() - Math.random();
    });
    var cards = $('.poteti-card');
    $.each(data,function(i,item){
      cards[i].id = i;
      localStorage[('card'+i)] = {
        text:'',
        url:''
      };
      $(cards[i]).attr('data-text',item.text).attr('data-url',item.url);
    });
  });
});
