var settings = {
  'aspb': true, 'aspv': true, 'fraise': true,
};

function fetchSettings(){
  return (
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
    })
  )
}

computeBill = function(qty){
  price = 0;
  for(ipt of ["aspb", "aspv", "fraise"]){
    price += Number(qty[ipt]);
  }
  if (isNaN(price)){
    return '... '
  } else {
    return parseFloat(price).toFixed(2);
  }
}
