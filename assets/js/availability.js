var availability = {'aspb' : true, 'aspv' : true, 'fraise' : true}
function updateAvailability(){
  for (item of ['aspb', 'aspv', 'fraise']) {
    document.getElementById(item).style.display = availability[item] ? "" : "none";
    document.getElementById(item+'-unit').style.display = availability[item] ? "" : "none";
    document.getElementById('no-'+item).style.display = availability[item] ? "none" : "block";
  }
}

$.get("https://api.champ-ramard.fr/v2/public/settings.php", function(result){
  for(var k in result) {
    if(result[k]['STR_KEY']=='aspb' | result[k]['STR_KEY']=='aspv' | result[k]['STR_KEY']=='fraise'){
      if(result[k]['STR_VALUE']=='true'){
        availability[result[k]['STR_KEY']] = true
      }else if(result[k]['STR_VALUE']=='false'){
        availability[result[k]['STR_KEY']] = false
      }else{
        availability[result[k]['STR_KEY']] = result[k]['STR_VALUE']
      }
    }
  }
  updateAvailability()
})
updateAvailability()
