javascript:
function check_bookmarklet(){
  if ( m5_bookmarklet_done ) { m5_bookmarklet_done(); }
  else{ window.setTimeout("check_bookmarklet()", 50 ); }
}
function m5_bookmarklet_main(){
　var script=document.createElement('script');
　script.setAttribute('src','http://miaowm5.github.io/bookmarklet/bookmarklet.js');
　document.getElementsByTagName('head')[0].appendChild(script);
  window.setTimeout("check_bookmarklet()", 1000 );
}
m5_bookmarklet_main();