
/*
  2689  RANDRIANANDRASANA Tafita Mario Françisco
	2124  RAZAFIMANDIMBY Tokoto Princila
  2701  RASOAVELO Hélène
  3118  RANDRIANANDRASANA Alain Johny
*/

const fileinput = document.getElementById('fileinput')
const canvas = document.getElementById('canvas')
const canvas_initial = document.getElementById('canvas_initial')
const ctx = canvas.getContext('2d')
const ctx_result = canvas_initial.getContext('2d')
canvas.width = 360;
canvas.height = 0;

canvas_initial.width = 300;
canvas_initial.height = 0;

const srcImage = new Image()
const imageInitial = new Image()
let imgData = null
let initialPixels = null
let currentPixels = null
let originalPixels = null

let widthImg;
let heightImg;

$('.pixels').hide();


fileinput.onchange = function (e) {
	$('.textInitiale').hide()

  if (e.target.files && e.target.files.item(0)) {

    srcImage.src = URL.createObjectURL(e.target.files[0])
  }
}

srcImage.onload = function () {

  let w = canvas.width
  let nw = srcImage.naturalWidth;
  let nh = srcImage.naturalHeight;
  let w2 = canvas_initial.width

  widthImg = srcImage.naturalWidth;
  heightImg = srcImage.naturalHeight;

  $('.widthImg').text(widthImg)
  $('.heightImg').text(heightImg)
  
  $('.pixels').show();
  $('.finished').hide()
  let aspect = nw / nh
  let h = w / aspect
  let h2 = w2 /aspect
  canvas.height = h
  canvas_initial.height = h2

  ctx.drawImage(srcImage, 0, 0, w, h)
  ctx_result.drawImage(srcImage, 0, 0, w2, h2)

  imgData = ctx.getImageData(0, 0, srcImage.width, srcImage.height)
  initialPixels = imgData.data
  originalPixels = imgData.data.slice()
  $('#previewImg').waitMe('hide');
}

function commitChanges() {
  
  for (let i = 0; i < imgData.data.length; i++) {
    imgData.data[i] = currentPixels[i]
  }

  loading("not_go")

  ctx.putImageData(imgData, 0, 0, 0, 0, srcImage.width, srcImage.height)
}

function resetImage() {

	setTimeout(function(){
      for (let i = 0; i < imgData.data.length; i++) {
        imgData.data[i] = originalPixels[i]
      }

      ctx.putImageData(imgData, 0, 0, 0, 0, srcImage.width, srcImage.height)
  
   }, 1000);

   $('#previewImg').waitMe({
            effect : 'bounce',
            text : '',
            bg : 'rgba(255,255,255,0.7)',
            color : '#000',
            maxSize : '',
            waitTime : -1,
            textPos : 'vertical',
            fontSize : '',
            source : '',
            onClose : function() {}
    });

}



/*RAZAFIMANDIMBY Tokoto Princila*/
function grayScale() {
	$('.finished').hide()
	currentPixels = initialPixels.slice()

    for(let i = 0; i < currentPixels.length; i=i+4) {
        let redValue = currentPixels[i]
        let greenValue = currentPixels[i+1]
        let blueValue = currentPixels[i+2]

        let mean = parseInt((redValue + greenValue + blueValue) / 3);

        currentPixels[i] = mean;
        currentPixels[i+1] = mean;
        currentPixels[i+2] = mean;
    }
   
    commitChanges()
    $('#previewImg').waitMe('hide');
}
/*RASOAVELO Helene*/
function toInverse() {
	$('.finished').hide()
    currentPixels = initialPixels.slice()
    for (let i = 0; i < currentPixels.length; i=i+4) {
      
        let redValue = 255 - currentPixels[i]
        let greenValue = 255 - currentPixels[i+1]
        let blueValue = 255 - currentPixels[i+2]

        currentPixels[i] = redValue;
        currentPixels[i+1] = greenValue;
        currentPixels[i+2] = blueValue;
      
    }

    commitChanges()
    $('#previewImg').waitMe('hide');
}
/*RANDRIANANDRASANA Alain Johny*/


  $('#previewImg').waitMe({
            effect : 'bounce',
            text : '',
            bg : 'rgba(255,255,255,0.7)',
            color : '#000',
            maxSize : '',
            waitTime : -1,
            textPos : 'vertical',
            fontSize : '',
            source : '',
            onClose : function() {}
    });


async function toMonochrome() {
 
	$('.finished').hide()
   currentPixels = initialPixels.slice()
   let seuil = parseInt(165)
    
    if(typeof seuil === 'number') {
      for(let i = 0; i < currentPixels.length; i=i+4) {
            let redValue = currentPixels[i]
            let greenValue = currentPixels[i+1]
            let blueValue = currentPixels[i+2]

            let mean = (redValue + greenValue + blueValue)/3;

            if(mean < seuil){
              currentPixels[i] = 0
              currentPixels[i+1] = 0
              currentPixels[i+2] = 0
            }else{
              currentPixels[i] = 255
              currentPixels[i+1] = 255
              currentPixels[i+2] = 255
            }
            
       }
    }else {
      alert('Type de seuil non valide')
    }
         
  commitChanges()
  $('#previewImg').waitMe('hide');
}
/*RASOAVLO Helene*/
function etalement() {
	$('.finished').hide()
	loading("go");
	currentPixels = initialPixels.slice()
	for(let i = 0; i < currentPixels.length; i=i+4) {
            let redValue = currentPixels[i]
            let greenValue = currentPixels[i+1]
            let blueValue = currentPixels[i+2]
            let m = parseInt(20),M = parseInt(100);
            if(redValue < m) {
            	currentPixels[i] = 0
            }else if(redValue > M) {
            	currentPixels[i] = 255;
            }

            if(greenValue < m) {
            	currentPixels[i+1] = 0
            }else if(greenValue > M) {
            	currentPixels[i+1] = 255;
            }
            
            if(blueValue < m) {
            	currentPixels[i+2] = 0
            }else if(blueValue > M) {
            	currentPixels[i+2] = 255;
            }

            else {
            	currentPixels[i] = (255 / (M - m)) * (redValue - m)
            	currentPixels[i+1] = (255 / (M - m)) * (greenValue - m)
            	currentPixels[i+2] = (255 / (M - m)) * (blueValue - m)
            }
       }

    commitChanges()
    $('#previewImg').waitMe('hide');
}

/*RANDRIANANDRASANA Tafita Mario*/
function toEgalization() {
  return new Promise(resolve => {
  currentPixels = initialPixels.slice()
  let couleurs = [];
  
   
  let nbRouge= [];
  let nbVert = [];
  let nbBleu = []; 

  for(let i=0; i < currentPixels.length; i = i+4){
    
    let red = currentPixels[i];
    let vert = currentPixels[i+1];
    let bleu = currentPixels[i+2];
    for(let j=0; j < 256; j++){
      nbRouge[j] = nbRouge[j] === undefined ? 0 : nbRouge[j];
      nbVert[j] = nbVert[j] === undefined ? 0 : nbVert[j];
      nbBleu[j] = nbBleu[j] === undefined ? 0 : nbBleu[j];

        if( red == j) {
          nbRouge[j] = nbRouge[j] + 1;
        }
        if( vert == j) {
          nbVert[j] = nbVert[j] + 1;
        }
        if( bleu == j) {
          nbBleu[j] = nbBleu[j] + 1;
        }
    }
  }

   var hcR = [];
   var hcV = [];
   var hcB = [];
 
   hcR.push(nbRouge[0]);
   hcV.push(nbVert[0]);
   hcB.push(nbBleu[0]);

   for(let i=1; i < 256; i++ ){
      hcR.push(nbRouge[i] + hcR[i-1]);
      hcV.push(nbVert[i] + hcV[i-1]);
      hcB.push(nbBleu[i] + hcB[i-1]);
   }

   var desireRouge;
   var desireVert;
   var desireBleu;

   let totalOccurRouge = 0;
   let totalOccurVert = 0;
   let totalOccurBleu = 0;
   let nbRougeDesire = [];
   let nbVertDesire = [];
   let nbBleuDesire = []; 

   for(let i=0; i<256; i++){
    totalOccurRouge = totalOccurRouge + nbRouge[i];
    totalOccurVert = totalOccurVert + nbVert[i];
    totalOccurBleu = totalOccurBleu + nbBleu[i];
   }
  
   desireRouge = Math.round(totalOccurRouge / 256);
   desireVert = Math.round(totalOccurVert / 256);
   desireBleu = Math.round(totalOccurBleu / 256);

   for(let i=0; i<256; i++){
      nbRougeDesire.push(desireRouge);
      nbVertDesire.push(desireVert);
      nbBleuDesire.push(desireBleu);
   }


   var hcdR = [];
   var hcdV = [];
   var hcdB = [];
  
   hcdR.push(nbRougeDesire[0]);
   hcdV.push(nbVertDesire[0]);
   hcdB.push(nbBleuDesire[0]);

   for(let i=1; i < 256; i++ ){
      hcdR.push(nbRougeDesire[i] + hcdR[i-1]);
      hcdV.push(nbVertDesire[i] + hcdV[i-1]);
      hcdB.push(nbBleuDesire[i] + hcdB[i-1]);
   }

   var pixelFinalRouge = {
    h_closest : [],
    values : []
   }

   var pixelFinalVert = {
    h_closest : [],
    values : []
   }

   var pixelFinalBleu = {
    h_closest : [],
    values : []
   }
 
  hcR.map( (elm) => {
    pixelFinalRouge.h_closest.push(getClosest(elm,hcdR));
  })

  pixelFinalRouge.h_closest.map( elm => {
    let found = hcdR.findIndex(element => element == elm);
  
    if(found != -1){
      pixelFinalRouge.values.push(found);
    }
    
  })

  hcV.map( (elm) => {
     pixelFinalVert.h_closest.push(getClosest(elm,hcdV));
  })

  pixelFinalVert.h_closest.map( elm => {
    let found = hcdV.findIndex(element => element == elm);
  
    if(found != -1){
      pixelFinalVert.values.push(found);
    }
    
  })

  hcB.map( (elm) => {
     pixelFinalBleu.h_closest.push(getClosest(elm,hcdB));
  })

  pixelFinalBleu.h_closest.map( elm => {
    let found = hcdB.findIndex(element => element == elm);
  
    if(found != -1){
      pixelFinalBleu.values.push(found);
    }
    
  })
      
      let pixelFinal = {
        rouge : pixelFinalRouge,
        vert : pixelFinalVert,
        bleu : pixelFinalBleu
      }



      resolve(pixelFinal);
  });
}

$('.loading').hide()
$('.finished').hide()

function loading(msg) {
  if(msg === "go") {
  	$('.loading').show()
  	$('.finished').hide()
  }else{
  	$('.loading').hide()
  	$('.finished').show()
  }
}

/*RANDRIANANDRASANA Tafita Mario*/
async function runEgalisation() {
  $('.finished').hide()

  console.log('Traitement en cours')

  let pixel = await toEgalization();
  
  currentPixels = initialPixels.slice()
  loading("go");

  for(let i=0; i < currentPixels.length; i = i+4){
    let red = currentPixels[i];
    let vert = currentPixels[i+1];
    let bleu = currentPixels[i+2];
    for(let j=0; j < 256; j++){

        if( red == j) {
         currentPixels[i] = pixel.rouge.values[j]
        }
        if( vert == j) {
         currentPixels[i+1] = pixel.vert.values[j]
        }
        if( bleu == j) {
          currentPixels[i+2] = pixel.bleu.values[j]
        }
    }
  }

  console.log('Traitement terminé')
  commitChanges()
  $('#previewImg').waitMe('hide');
}

function getClosest(elm,tab){
  var closest = tab.reduce((a,b) => {
    return Math.abs(a - elm) < Math.abs(b - elm) ? a : b;
  })

  return closest;
}
/*RANDRIANANDRASANA Alain Johny*/
function toBinSeuillage() {
	$('.finished').hide()
   currentPixels = initialPixels.slice()
   let seuil  = parseInt(prompt('Entrez la valeur de seuil'))
    
    if(typeof seuil === 'number') {
      for(let i = 0; i < currentPixels.length; i=i+4) {
            let redValue = currentPixels[i]
            let greenValue = currentPixels[i+1]
            let blueValue = currentPixels[i+2]

            let mean = (redValue + greenValue + blueValue)/3;

            if(mean < seuil){
              currentPixels[i] = 0
              currentPixels[i+1] = 0
              currentPixels[i+2] = 0
            }else{
              currentPixels[i] = 255
              currentPixels[i+1] = 255
              currentPixels[i+2] = 255
            }
            
       }
    }else {
      alert('Type de seuil non valide')
    }
         
  commitChanges()
  $('#previewImg').waitMe('hide');
}
/*RANDRIANANDRASANA Tafita Mario*/
function toBinOtsu() {
	$('.finished').hide()
	loading("go");
    console.log('Traitement en cours')

    currentPixels = initialPixels.slice()
    let couleurs = [];
    
     
    let hRGB= [];
    let sommeHRGB = 0;

    for(let i=0; i < currentPixels.length; i = i+4){
      
      let redValue = currentPixels[i];
      let greenValue = currentPixels[i+1];
      let blueValue = currentPixels[i+2];

      let mean = (redValue + greenValue + blueValue)/3;
      for(let j=0; j < 256; j++){
        hRGB[j] = hRGB[j] === undefined ? 0 : hRGB[j];

          if( mean == j) {
            hRGB[j] = hRGB[j] + 1;
            sommeHRGB = sommeHRGB + hRGB[j];
          }
      }
    }

    let proba1 = 0;
    let proba2 = 0;
    let moy1 = 0;
    let moy2 = 0;
    let M1 = 0;
    let M2 = 0;
    let variance = [];
    for(let t=0; t < 256; t++) {
      for(let i=0; i < t; i++) {
        proba1 =  proba1 + hRGB[i];
        moy1 =  moy1 + hRGB[i];
      }


      for(let j=t; j < 256; j++ ) {

        proba2 =  proba2 + hRGB[j];

        moy2 =  moy2 +  hRGB[j];
      }

      proba1 = proba1 / sommeHRGB;
      proba2 = proba2 / sommeHRGB;
      M1 = moy1 / proba1;
      M2 = moy2 / proba2;
      variance[t] = proba1 * proba2 * (moy2 - moy1) * (moy2 - moy1);
    }

   let vr = variance.filter(Boolean)
   let max = Math.max(...vr);

   let seuil = variance.findIndex(elm => elm === max)



    if(typeof seuil === 'number') {
      alert('Seui trouvé : '+seuil)
      for(let i = 0; i < currentPixels.length; i=i+4) {
                let redValue = currentPixels[i]
                let greenValue = currentPixels[i+1]
                let blueValue = currentPixels[i+2]

                let mean = (redValue + greenValue + blueValue)/3;

                if(mean < seuil){
                  currentPixels[i] = 0
                  currentPixels[i+1] = 0
                  currentPixels[i+2] = 0
                }else{
                  currentPixels[i] = 255
                  currentPixels[i+1] = 255
                  currentPixels[i+2] = 255
                }
                
           }
    }

   commitChanges()
   $('#previewImg').waitMe('hide');
}



let symX = [
  [1,0],
  [0,-2]
]
let symY = [
  [-1,0],
  [0,1]
]


const R_OFFSET = 0
const G_OFFSET = 1
const B_OFFSET = 2

let redIndex;
let greenIndex;
let blueIndex;
let redVoisinageIndex;
let greenVoisinageIndex;
let blueVoisinageIndex;
let redFinal;
let greenFinal;
let blueFinal;

/*RANDRIANANDRASANA Tafita Mario*/
function filterImage(masque) {
  $('.finished').hide()

  console.log("hey",masque)

  currentPixels = originalPixels.slice()

  console.log('Traitement en cours...')
  for (let i = 0; i < srcImage.height; i++) {
    for (let j = 0; j < srcImage.width; j++) {

        redFinal = 0
        greenFinal = 0
        blueFinal = 0
        redIndex = getIndex(j, i) + R_OFFSET;
        greenIndex = getIndex(j, i) + G_OFFSET;
        blueIndex = getIndex(j, i) + B_OFFSET;
        let mi = 0;
        let mj = 0;
        
            for(let k=i-1,mi=0; k<i+2;k++,mi++) {
              for(let l=j-1, mj=0; l<j+2; l++,mj++) {
                 if(k < 0 || l < 0 || k > srcImage.height - 1 || l > srcImage.width - 1) {
                    continue;
                }else{
                    redVoisinageIndex = getIndex(l,k);
                    greenVoisinageIndex = getIndex(l,k) + 1;
                    blueVoisinageIndex = getIndex(l,k) + 2;

                    redFinal = Math.abs(redFinal + (currentPixels[redVoisinageIndex] * masque[mi][mj]));
                    greenFinal = Math.abs(greenFinal + (currentPixels[greenVoisinageIndex] * masque[mi][mj]));
                    blueFinal = Math.abs(blueFinal + (currentPixels[blueVoisinageIndex] * masque[mi][mj]));
                }

              }
            }

        currentPixels[redIndex] = redFinal
        currentPixels[greenIndex] = greenFinal
        currentPixels[blueIndex] = blueFinal
    }
  }

  commitChanges()
  console.log('Traitement terminé')
  $('#previewImg').waitMe('hide');
}

function getCentreX() {
  return Math.round((srcImage.width) / 2);
}

function getCentreY() {
  return Math.round((srcImage.height) / 2);
}

let xGeometrique;
let yGeometrique;
let xIndexFinal;
let yIndexFinal;

/*RASOAVELO Helene*/
function retourneX() {
  $('.finished').hide()
  currentPixels = originalPixels.slice()
  console.log('Traitement en cours...')
  for (let y = 0; y < srcImage.height; y++) {
    for (let x = 0; x < srcImage.width; x++) {

      const redIndex = getIndex(x, y) + R_OFFSET
      const greenIndex = getIndex(x, y) + G_OFFSET
      const blueIndex = getIndex(x, y) + B_OFFSET

      xGeometrique = - (y - getCentreY())
      yGeometrique = (x - getCentreX())

      xIndexFinal = yGeometrique + getCentreX()
      yIndexFinal = xGeometrique + getCentreY()

      const redIndexFinal = getIndex(xIndexFinal, yIndexFinal) + R_OFFSET
      const greenIndexFinal = getIndex(xIndexFinal, yIndexFinal) + G_OFFSET
      const blueIndexFinal = getIndex(xIndexFinal, yIndexFinal) + B_OFFSET

      currentPixels[redIndex] = currentPixels[redIndexFinal]
      currentPixels[greenIndex] = currentPixels[greenIndexFinal]
      currentPixels[blueIndex] = currentPixels[blueIndexFinal]
    }
  }

  commitChanges()
  console.log('Traitement terminé')
  $('#previewImg').waitMe('hide');
}
/*RANDRIANANDRASANA Alain JOhny*/
function retourneY() {
  $('.finished').hide()
  currentPixels = originalPixels.slice()
  console.log('Traitement en cours...')
  for (let y = 0; y < srcImage.height; y++) {
    for (let x = 0; x < srcImage.width; x++) {

      const redIndex = getIndex(x, y) + R_OFFSET
      const greenIndex = getIndex(x, y) + G_OFFSET
      const blueIndex = getIndex(x, y) + B_OFFSET

      xGeometrique = (y - getCentreY())
      yGeometrique =  - (x - getCentreX())

      xIndexFinal = yGeometrique + getCentreX()
      yIndexFinal = xGeometrique + getCentreY()

      const redIndexFinal = getIndex(xIndexFinal, yIndexFinal) + R_OFFSET
      const greenIndexFinal = getIndex(xIndexFinal, yIndexFinal) + G_OFFSET
      const blueIndexFinal = getIndex(xIndexFinal, yIndexFinal) + B_OFFSET

      currentPixels[redIndex] = currentPixels[redIndexFinal]
      currentPixels[greenIndex] = currentPixels[greenIndexFinal]
      currentPixels[blueIndex] = currentPixels[blueIndexFinal]
    }
  }

  commitChanges()
  console.log('Traitement terminé')
  $('#previewImg').waitMe('hide');
}

function getIndex(x, y) {
  return (x + y * srcImage.width) * 4
}