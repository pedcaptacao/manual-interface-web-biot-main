// para abrir/fechar menu lateral quando tela for menor que 992px
$(document).ready(function(){
    $("#toggleMenu").click(function(){
        $("#nav").toggleClass("menu");
        $(".overlay").toggleClass("active");
    });
});

// funções para indicar link ativo no menu lateral
if($('#nav').length){
    $('#nav').affix({
        offset: {     
          top: $('#nav').offset().top,
          bottom: ($('footer').outerHeight(true) + $('.application').outerHeight(true)) + 40
        }
    });
}

$('#nav').on('activate.bs.scrollspy', function () {
    item = $('#nav').find(".active").last();
    item.animatescroll({element: '#nav', padding:20});
});

$( function() {
    // Recover
    $('.led-recover').show();

    // Recover
    $('.led-falha').show();

     // Iniciando
    function acendeLedIniciando(){
            $('.led-iniciando').show();
    setTimeout(function(){ apagaLedIniciando() }, 15);
    }
    function apagaLedIniciando(){
            $('.led-iniciando').hide();
    setTimeout(function(){ acendeLedIniciando() }, 30);
    }
    acendeLedIniciando();

     // Configurando
    function acendeLedConfigurando(){
            $('.led-configurando').show();
    setTimeout(function(){ apagaLedConfigurando() }, 50);
    }
    function apagaLedConfigurando(){
            $('.led-configurando').hide();
    setTimeout(function(){ acendeLedConfigurando() }, 50);
    }
    acendeLedConfigurando();

    // Aguardando sistema
    function acendeLedAguardandoSistema(){
            $('.led-aguardando-sistema').show();
    setTimeout(function(){ apagaLedAguardandoSistema() }, 100);
    }
    function apagaLedAguardandoSistema(){
            $('.led-aguardando-sistema').hide();
    setTimeout(function(){ acendeLedAguardandoSistema() }, 100);
    }
    apagaLedAguardandoSistema();

    // Central inicializada
    function acendeLedCentralInicializada(){
            $('.led-central-inicializada').show();
    setTimeout(function(){ apagaLedCentralInicializada() }, 300);
    }
    function apagaLedCentralInicializada(){
            $('.led-central-inicializada').hide();
    setTimeout(function(){ acendeLedCentralInicializada() }, 300);
    }
    apagaLedCentralInicializada();

    // Imagens corrompidas
    function acendeLedImagensCorrompidas(){
            $('.led-imagens-corrompidas').show();
    setTimeout(function(){ apagaLedImagensCorrompidas() }, 1000);
    }
    function apagaLedImagensCorrompidas(){
            $('.led-imagens-corrompidas').hide();
    setTimeout(function(){ acendeLedImagensCorrompidas() }, 1000);
    }
    apagaLedImagensCorrompidas();

    // Recuperando
    function acendeLedRecuperando(){
            $('.led-recuperando').show();
    setTimeout(function(){ apagaLedRecuperando() }, 500);
    }
    function apagaLedRecuperando(){
            $('.led-recuperando').hide();
    setTimeout(function(){ acendeLedRecuperando() }, 100);
    }
    apagaLedRecuperando();

    // Falha Módulo
    function acendeLedFalhaModulo(){
            $('.led-falha-modulo').show();
    setTimeout(function(){ apagaLedFalhaModulo() }, 1400);
    }
    function apagaLedFalhaModulo(){
            $('.led-falha-modulo').hide();
    setTimeout(function(){ acendeLedFalhaModulo() }, 100);
    }
    apagaLedFalhaModulo();
});

function getCookie(nomeCookie){

    var valorCookie = "";

    var indiceInicio = -1;
    var indiceFim = -1;

    // Verifica se existem Cookies pelo tamanho da String
    if(document.cookie.length > 0){

        // Verifica se existe o Cookie procurando pela sua posicao na String
        indiceInicio = document.cookie.indexOf(nomeCookie + "=");

        // Se for diferente de -1 e porque encontrou um valor
        if(indiceInicio != -1){

            // Soma a posicao inicial na string do cookie mais o seu tamanho e mais 1 para pular o simbolo de igualdade
            indiceInicio = indiceInicio + nomeCookie.length + 1;

            // Recupera a posicao do final da String a partir do indiceInicio
            indiceFim = document.cookie.indexOf(";", indiceInicio);

            // Se for igual a -1 significa que era o ultimo cookie da String
            // Sendo o ultimo nao existe o caracter ';' no final do valor
            // Sendo assim a posicao final e considerada o tamanho da String dos cookies
            if(indiceFim == -1){
                indiceFim = document.cookie.length;
            }

            // Decodifica a valor no cookie para transmissao do valor em rede
            valorCookie = unescape(document.cookie.substring(indiceInicio, indiceFim));
        }
    }

    return valorCookie;
}

// para indicar no menu superior qual manual ativo
$(document).ready(function(){
    var path = window.location.pathname;
    var idiomaLogin = getCookie('idiomaLogin');
    
    var manualOpRamaisPtBR = '/manual/pt-BR/manualOpeRamal_pt-BR.html';
    var manualGerWebPtBR = '/manual/pt-BR/manualGerWeb_pt-BR.html';
    var manualHardwarePtBR = '/manual/pt-BR/manualHardware_pt-BR.html';

    var manualOpRamaisEs = '/manual/es/manualOpeRamal_es.html';
    var manualGerWebEs = '/manual/es/manualGerWeb_es.html';
    var manualHardwareEs = '/manual/es/manualHardware_pt-BR.html';

    if(idiomaLogin == 'es' && path == manualOpRamaisPtBR){
        window.location.pathname = manualOpRamaisEs;
        path = manualOpRamaisEs;
    } 
    if(idiomaLogin == 'es' && path == manualGerWebPtBR){
        window.location.pathname = manualGerWebEs;
        path = manualGerWebEs;
    } 
    if(idiomaLogin == 'es' && path == manualHardwarePtBR){
        window.location.pathname = manualHardwareEs;
        path = manualHardwareEs;
    } 

    if (path.includes("manualHardware")){
        $("#op1").addClass("active");
    }
    else if (path.includes("manualGerWeb")){
        $("#op2").addClass("active");
    }
    else if (path.includes("manualOpeRamal")){
        $("#op3").addClass("active");
    }
});

// var $doc = $('html, body');
// $('a').click(function() {
//     $doc.animate({
//         scrollTop: $( $.attr(this, 'href') ).offset().top
//     }, 200);
//     return false;
// });