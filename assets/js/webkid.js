function setColorsFilter() {
  //April 1, hello world!
  invertedPercent = "100%";
  ["body", "img", ".partner", ".post-image"].forEach(function(sel) {
    $(sel).css("filter", "invert(" + invertedPercent + ")");
    $(sel).css("-webkit-filter", "invert(" + invertedPercent + ")");
    $(sel).css("-moz-filter", "invert(" + invertedPercent + ")");
    $(sel).css("-ms-filter", "invert(" + invertedPercent + ")");
    $(sel).css("-o-filter", "invert(" + invertedPercent + ")");
  });
}

function invert() {
  //April 1, hello world!
  setColorsFilter();
}

$(function() {
  setColorsFilter();

  var months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  function renderSite(data) {
    data = $.xml2json(data);
    var posts = data.channel.item;
   
    renderLatestArticles(posts);
  }

  function renderLatestArticles(posts) {
    var $parent = $('.sidebox.latest-articles .sidebox-content');
    if(!$parent) {return};

    for(var i = 0; i < Math.min(posts.length, 5); i++) {
      var p = posts[i];
      var date = new Date(p.pubDate);
      var dateStr = date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear();
      var $a = $('<a href="' + p.link + '"><div class="date">' + dateStr + '</div><div>' + p.title + '</div></a>');
      if(i == 4) {
        $a.addClass('last');
      }
      $parent.append($a);
    }
    
    $parent.removeClass('loading');
  }

  setTimeout(function(){
      if (!$(".partner").is(":visible")) {
          $(".arrrgh").css("display", "block");
      }
  }, 1000);

  $.ajax({
    dataType: 'xml',
    url: '/rss',
    type: 'GET'
  }).success(renderSite);

  $('a[href^="http://"]').add('a[href^="https://"]').not('a[href*=itkpi]').attr('target','_blank');
});
