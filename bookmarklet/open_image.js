function m5_bookmarklet_done(){
  var image = document.images;
  var text = "";
  var i,doc;
  if( /.*moeimg.*html.*/.test(window.location.href) ){
    doc = '<div style="position:fixed;background-color:white">';
    data = [];
    $('.box').each( function(i) { data[Math.floor(i / 5)] += ($(this).html()); })
    $.each( data, function(i){
      doc += '<a href="#'+ i +'" onclick="window.scrollTo(0,0);$(\'#content\').html(data[' + i + '])">PAGE'+ i +'</a>';
    })
    $('body').html(doc+"</div><div id='content'></div>");
    return;
  }
  if( /.*moeimg.*/.test(window.location.href) ){
    $('.post').each( function(i) { text += $(this).html() })
    $('body').html(text);
    return;
  }
  for(i=0;i < image.length; i = i+1){ text +='<img src="' + document.images[i].src + '">'; };
  doc = window.open("","imgWin","width=800,height=600").document;
  doc.write(text);
  image = doc.images;
  for(i = 0;i < image.length;i=i+1){ image[i].style.maxWidth = "100%";image[i].style.maxHeight = "500px"; }
}