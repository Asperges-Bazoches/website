var settings = {'aspb' : true, 'aspv' : true, 'fraise' : true};

function updateSettings(){

  for (key in settings){
    for (key of ['aspb', 'aspv', 'fraise']) {
      document.getElementById(key).style.display = settings[key] ? "" : "none";
      document.getElementById(key+'-unit').style.display = settings[key] ? "" : "none";
      document.getElementById('no-'+key).style.display = settings[key] ? "none" : "block";
    }
    if (key == 'website_title'){
      document.getElementsByClassName("header-headline")[0].innerText = settings[key];
    }
    if (key == 'website_subtitle'){
      document.getElementsByClassName("header-running-text")[0].innerText = settings[key];
    }
  }
}

$.get("https://api.champ-ramard.fr/v2/public/settings.php", function(result){
  for(var k in result) {
    if(result[k]['STR_KEY']=='aspb' | result[k]['STR_KEY']=='aspv' | result[k]['STR_KEY']=='fraise'){
      if(result[k]['STR_VALUE']=='true'){
        settings[result[k]['STR_KEY']] = true;
      }else if(result[k]['STR_VALUE']=='false'){
        settings[result[k]['STR_KEY']] = false;
      }else{
        settings[result[k]['STR_KEY']] = result[k]['STR_VALUE'];
      }
    } else {
      settings[result[k]['STR_KEY']] = result[k]['STR_VALUE'];
    }
  }
  updateSettings()
})
updateSettings()
