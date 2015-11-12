
function set_hint_action(){
  var ele_list = document.all
  for (var i = 0; i < ele_list.length; i++){
    if(ele_list[i].className != "content_area" ){ continue }
    ele_list[i].onclick = function(){ eval("show_next_hint(this)") }
  }
}
function show_next_hint(area){
  var target = event.target || event.srcElement
  if ( target.className != "click" ){ return }
  var list = area.children
  for (var i = 0; i < list.length; i++) {
    if (list[i].className == "click"){
      list[i].className = "click_over"
      if (list[i+1]){ list[i+1].className = "click" }
      break
    }
  }
}