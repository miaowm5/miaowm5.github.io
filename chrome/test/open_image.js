function m5_run_code(){
  var image = document.images;
  var text = "";
  var i,doc;
  for(i=0;i < image.length; i = i+1){ text +='<img src="' + document.images[i].src + '">'; };
  doc = window.open("","imgWin","width=800,height=600").document;
  doc.write(text);
  image = doc.images;
  for(i = 0;i < image.length;i=i+1){ image[i].style.maxWidth = "100%";image[i].style.maxHeight = "500px"; }
}
m5_run_code()