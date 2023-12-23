const clickHere = document.getElementById('clickHere'); /* boton principal */
const contador = document.getElementById('contador');   /* elemento que muestra los clicks */ 
const score = document.getElementById('score'); /* Record de clicks */
const preferencia = document.getElementById('ajustes');     /* Boton de ajustes */
const panelAjustes = document.getElementById('ajustesPanel');   /* Modal de ajustes */
const maxScore = document.getElementById('max-score');
const scoreActual = document.getElementById('Score-actual');

let cuentaRegresiva = 60000;    
let VariableContador = 0;   /* variable que guarda los clicks */
clickHere.addEventListener("click", ()=>{   /* sistema para contar los clicks */     
    VariableContador++;
    contador.textContent = VariableContador;
    preferencia.disabled = true;
    preferencia.style.backgroundColor = 'gray';
    preferencia.style.cursor = 'not-allowed';

    clearTimeout(cuentaRegresiva);
    setTimeout(stop, cuentaRegresiva);      
})

const fin = document.getElementById('fin'); /* elemento de mensaje de STOP */
const repetir = document.getElementById('Again');   /* boton de reiniciar ¡de nuevo! */
function stop(){
    fin.showModal();
    scoreActual.textContent = VariableContador;
    score.innerText = "Score: " + VariableContador;
    preferencia.disabled = false;
    preferencia.style.backgroundColor = '#0056b3';
    preferencia.style.cursor = 'pointer';

    repetir.addEventListener("touchstart", reiniciarJuego)
    repetir.addEventListener("click", reiniciarJuego)
    function reiniciarJuego() { /* Intentar de nuevo luego de que se acabo el tiempo */
        const maxScoreValue = parseInt(maxScore.textContent);
        if(VariableContador > maxScoreValue){
            maxScore.textContent = VariableContador;
        }else {
            contador.textContent = 0;
            VariableContador = 0;
        }
        repetir.removeEventListener("click", reiniciarJuego);
        repetir.removeEventListener("touchstart", reiniciarJuego);
        fin.close();
    }
}

preferencia.addEventListener("click", ()=>{ /* Ajustes */
    panelAjustes.showModal();
    const salvar = document.getElementById('guardar');  /* boton para guardar la configuracion */
    const color = document.getElementById('color'); /* elemento SELECTION para el color del boton */
    const time = document.getElementById('time');   /* elemento SELECTION para el tiempo de juego */
    const cancelar = document.getElementById('Cancelar');

    salvar.addEventListener("click", ()=>{      /* Guardar conguracion */
        var valorColor = color.value;
        var valorTime = time.value;
        panelAjustes.close();
        clickHere.style.backgroundColor = valorColor;
        cuentaRegresiva = valorTime;
    })
})