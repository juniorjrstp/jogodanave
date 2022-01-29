// Jogo Criado por Denilson Bonatti
// Novas Implementa��es por Roberto J�nior
// Em 08/01/2022
// Utilizando Javascrit, Css, Html 5
function start() { // Inicio da fun��o start()

    $("#inicio").hide(); // Ocultar div In�cio 
	$("#fundoGame").append("<div id='jogador' class='anima1'></div>"); // Div Jogador
	$("#fundoGame").append("<div id='inimigo1' class='anima2'></div>"); // Div Inimigo1
	$("#fundoGame").append("<div id='inimigo2'></div>"); // Div Inimigo2
	$("#fundoGame").append("<div id='amigo' class='anima3'</div>"); // Div Amigo
	$("#fundoGame").append("<div id='placar'></div>"); // Div Placar
    $("#fundoGame").append("<div id='energia'></div>"); // Div Energia


    //Principais vari�veis do jogo
    var jogo = {}
    var velocidade=5; /* Velocidade de Movimenta��o do Inimigo1*/
    var posicaoY = parseInt(Math.random() * 334); // Declara de 0 a 334 no Eixo Y a posi��o do Inimigo
	var podeAtirar=true; /* O Disparo Poder� Ser executado */
	var fimdejogo=false; /* verifica se jogo foi finalizado*/
	var pontos=0;        // Pontua��o Iniciada com Zero
    var salvos=0;        // Passageiro ou Amigo Resgatado Iniciada com Zero
    var perdidos=0;      // Passageiro ou Amigo Perdido Iniciada com Zero
	var energiaAtual=3;  // Iniciado o Jogo com 3 Vidas
	var somDisparo=document.getElementById("somDisparo"); // Declara Div Som Disparo
    var somExplosao=document.getElementById("somExplosao"); // Declara Div Som Explos�o
    var musica=document.getElementById("musica"); // Declara Div Musica
    var somGameover=document.getElementById("somGameover"); // Declara Div Som GameOver
    var somPerdido=document.getElementById("somPerdido"); // Declara Div Som Perdido
    var somResgate=document.getElementById("somResgate"); // Declara Div Som Resgate
	
	//M�sica em loop
    musica.addEventListener("ended", function(){ musica.currentTime = 0; musica.play(); }, false);
    musica.play(); // Inicia a M�sica no Jogo

	var TECLA = { // array
	  UP:    38, // Movimenta o Helic�ptero Para Cima com a Tecla Cima
	  DOWN:  40, // Movimenta o Helic�ptero Para Baixo com a Tecla Baixo
	  SPACE: 32, // Efetua Disparo do Helic�ptero para o alvo com Barra de Espa�o
	  RIGHT: 39, // Movimenta o Helic�ptero Para Direeita com a Tecla Direita
	  LEFT:  37  // Movimenta o Helic�ptero Para Esquerda com a Tecla Esquerda
	}

    jogo.pressionou = [];	/*declara a vari�vel pressionou como array*/ 	
	
	/* Verifica se o usu�rio pressionou alguma tecla*/	
	
	$(document).keydown(function(e){ /* Se pressionada tecla - Verdadeiro */
	jogo.pressionou[e.which] = true;
	});


	$(document).keyup(function(e){ /* Se n�o pressionada pressionada tecla - Falso */
       jogo.pressionou[e.which] = false;
	});


    jogo.timer = setInterval(loop,30);	// temporiza o in�cio do jogo com 30 milesegundos
	
	function loop() {
	
    	movefundo();    // Inicia a Fun��o Move Fundo
		movejogador();  // Inicia a Fun��o Move Jogador
		moveinimigo1(); // Inicia a Fun��o Move Inimigo1
		moveinimigo2(); // Inicia a Fun��o Move Inimigo2
		moveamigo();    // Inicia a Fun��o Move Amigo
		colisao();      // Inicia a Fun��o de Detec��o de Colis�es
		placar();		// Inicia a Fun��o do Placar do Jogo
        energia();      // Inicia a Fun��o de Energia do Jogador no Jogo
		
	
	} // Fim da fun��o loop
	
	//Fun��o que movimenta o fundo do jogo
	
	function movefundo() { // Faz com que o Fundo Movimente-se dentro da Div Principal
	
	// Movimentar fundo da Div Principal
	esquerda = parseInt($("#fundoGame").css("background-position")); 
	$("#fundoGame").css("background-position",esquerda-1); // Movimentar fundo para Esquerda.
	
	} // fim da fun��o movefundo()

    function movejogador() { // Fun��o para Movimentar o Jogador, no caso o Helic�ptero
	
	  if (jogo.pressionou[TECLA.UP]) { // Pressionado a Tecla UP
		  var topo = parseInt($("#jogador").css("top")); // Movimentar subindo
		  $("#jogador").css("top",topo-10); // Movimenta Para Cima o Helic�ptero
		  
		  if (topo<=0) { // Se topar na DIV, congela o Helic�ptero Evitando se locomover
	        $("#jogador").css("top",topo+10); 
			/* Evitar que o Objeto saia da Parte Superior da Tela Limitada pela DIV*/
          }
	  }
	
	  if (jogo.pressionou[TECLA.DOWN]) { // Pressionado a Tecla DOWN
		 var topo = parseInt($("#jogador").css("top")); // Movimentar descendo
		 $("#jogador").css("top",topo+10);	// Movimenta Para Baixo o Helic�ptero
		 
		 if (topo>=434) { // Se topar na DIV, congela o Helic�ptero Evitando se
  		                  // locomover	
	        $("#jogador").css("top",topo-10); 
			/* Evitar que o Objeto saia da Parte Inferior da Tela  Limitada pela DIV*/
	     }
	  }
	
	  if (jogo.pressionou[TECLA.RIGHT]) { // Pressionado a Tecla RIGHT
	    posicaoX = parseInt($("#jogador").css("left")); // Movimentar Direita
	    $("#jogador").css("left",posicaoX+10); /* Caminhando para Direita 1 unidade */
				
		if (posicaoX>750) { /* quando Topar Margem Direita em 906*/
			
		$("#jogador").css("left",720); /* Reposicionar o Amigo na Posi��o Inicial, 0*/
					
		}
	  		 
	  }
	  
	  if (jogo.pressionou[TECLA.LEFT]) { // Pressionado a Tecla LEFT
	    $("#jogador").css("anima5")
		posicaoX = parseInt($("#jogador").css("left")); // Movimentar Esquerda
        //
				
		if (posicaoX<=750) { /* quando Topar Margem Direita em 906*/
		 
		  $("#jogador").css("left",posicaoX-10); /* Caminhando para Direita 1 unidade */					
		}
		if (posicaoX<=0) {
			$("#jogador").css("left",posicaoX+10); /* Caminhando para Direita 1 unidade */
		
	  	}
      }		
		
	  if (jogo.pressionou[TECLA.SPACE]) { // Pressionado a Tecla SPACE
		
		//Executa fun��o Disparo	
		disparo(); 
	  }

	} // fim da fun��o movejogador()
	
	function moveinimigo1() { /* Movimenta Helic�ptero Inimigo */

	   posicaoX = parseInt($("#inimigo1").css("left")); /*Propriedade Left Div Inimigo1*/
	   $("#inimigo1").css("left",posicaoX-velocidade); /* Caminha p/ Esq. Eixo X 5 und*/
	   $("#inimigo1").css("top",posicaoY); /*Propriedade Top Div Inimigo1*/
		
		if (posicaoX<=0) { // Se Inimigo 1 Topou Margem Esquerda da Div, Reposicionar
		   posicaoY = parseInt(Math.random() * 334); // Calcula Nova Posic�o Eixo Y de 
		                                             // Modo Rand�mico (Aleat�rio)
		   $("#inimigo1").css("left",694); // valor inicial de Esqueda do Inimigo1 Sempre
		   $("#inimigo1").css("top",posicaoY); // Posi��o do Inimigo 1 Eixo Y P�s Random
			
		}
    } //Fim da fun��o moveinimigo1()  
	
	function moveinimigo2() { /* Movimenta Caminh�o Inimigo */
        posicaoX = parseInt($("#inimigo2").css("left")); /*Propriedade Left Div Inimigo2*/
	    $("#inimigo2").css("left",posicaoX-3); /* Caminhar 3 und para o Lado Esquerdo*/
				
		if (posicaoX<=0) { /* ao Chegar em 0 no Eixo X*/
			
		$("#inimigo2").css("left",775);/* Reposicionar Inimigo 2*/
					
		}
    } // Fim da fun��o moveinimigo2()
	
	function moveamigo() { // Movimentar Amigo
	
	posicaoX = parseInt($("#amigo").css("left")); /*Propriedade Left Div Amigo*/
	$("#amigo").css("left",posicaoX+1); /* Caminhando para Direita 1 unidade */
				
		if (posicaoX>906) { /* quando Topar Margem Direita em 906*/
			
		$("#amigo").css("left",0); /* Reposicionar o Amigo na Posi��o Inicial, 0*/
					
		}

    } // fim da fun��o moveamigo()
	
	function disparo() { // Fun��o de Verifica��o da Execu��o do Disparo
	  
	   if (podeAtirar==true) { /* Se foi disparado ou executado */
		 somDisparo.play(); // Executa Som do Disparo
	     podeAtirar=false; /* O Disparo � parado por enquanto */
	
	     topo = parseInt($("#jogador").css("top")) /* Posi��o inicial do Tiro Local do */
	     posicaoX= parseInt($("#jogador").css("left")) /* Helic�ptero em left/top */
	     tiroX = posicaoX + 190; /* Caminhou para Direita */
	     topoTiro=topo+37; /* Local inicial do tiro para / Mais para baixo*/
	     $("#fundoGame").append("<div id='disparo'></div"); // Acrescenta div Disparo
	     $("#disparo").css("top",topoTiro); // Div Disparo Posi��o Top 
	     $("#disparo").css("left",tiroX);   // Div Disparo Posi��o Left
		 
	
	     var tempoDisparo=window.setInterval(executaDisparo, 30); 
		 /* Tempo para Disparo e assim aguardar novamente, para que um novo seja */
	     // Efetuado.
	   } //Fecha podeAtirar
 
   	   function executaDisparo() { // Fun��o de Execu��o do Disparo
	      posicaoX = parseInt($("#disparo").css("left")); // Posi��o left da DIV Disparo
	      $("#disparo").css("left",posicaoX+15);  /* Caminha 15 und */

          if (posicaoX>900) { /* Ao Objeto do Disparo sair da tela*/
						
	        window.clearInterval(tempoDisparo); // Limpa o tempo do Disparo
		    tempoDisparo=null; // Esvazia a Vari�vel Tempo do Disparo
		    $("#disparo").remove(); /* remove da tela */
		    podeAtirar=true; /* depois de removida poder� atirar */
					
          }
	   } // Fecha executaDisparo()
    } // Fecha disparo()
	
	function colisao() { // Fun��o de Verifica��o das Colis�es
	  // Colis�o do Jogador  com o Inimigo1
      var colisao1 = ($("#jogador").collision($("#inimigo1"))); 
	  // Colis�o do Jogador  com o Inimigo2
	  var colisao2 = ($("#jogador").collision($("#inimigo2")));
      // Colis�o do Disparo  com o Inimigo1
	  var colisao3 = ($("#disparo").collision($("#inimigo1")));
      // Colis�o do Disparo  com o Inimigo2
	  var colisao4 = ($("#disparo").collision($("#inimigo2")));
      // Colis�o do Jogador com o Amigo
	  var colisao5 = ($("#jogador").collision($("#amigo")));
      // Colis�o do Inimigo2 com o Amigo
	  var colisao6 = ($("#inimigo2").collision($("#amigo")));
      
	  // Verifica��o da Colis�o do jogador com o inimigo1 - Helic�ptero
	  if (colisao1.length>0) { // Se a vari�vel estar preenchida, ent�o, houve a colis�o
		 energiaAtual--;       // Decrementa uma energia do Jogador
		 somExplosao.play();   // Executa o Som da Explos�o
	     inimigo1X = parseInt($("#inimigo1").css("left")); // Posi��o Atual Left do 
		                                                   // Inimigo1
	     inimigo1Y = parseInt($("#inimigo1").css("top"));  // Posi��o Atual Top  do 
		                                                   // Inimigo1
	     explosao1(inimigo1X,inimigo1Y); // Explos�o do Inimigo1

	     posicaoY = parseInt(Math.random() * 334); // C�lculo de Reposic�o do Inimigo1
	     $("#inimigo1").css("left",694);     // Sempre em 694 Eixo X Esquerda
	     $("#inimigo1").css("top",posicaoY); // Posi��o do Eixo Y
	  } // Fim Colis�o 1
	  
	  // Verifica��o da Colis�o do jogador com o inimigo2 - Caminh�o
	  if (colisao2.length>0) { // Se a vari�vel estar preenchida, ent�o, houve a colis�o
	     energiaAtual--;       // Decrementa uma energia do Jogador
		 somExplosao.play();   // Executa o Som da Explos�o
	     inimigo2X = parseInt($("#inimigo2").css("left")); // Posi��o Atual Left do 
		                                                   // Inimigo2 
	     inimigo2Y = parseInt($("#inimigo2").css("top"));  // Posi��o Atual Top  do  
		                                                   // Inimigo2
	     explosao2(inimigo2X,inimigo2Y); // Explos�o do Inimigo2
			
	     $("#inimigo2").remove();        // Remove Explos�o do Inimigo2 da Tela
		
	     reposicionaInimigo2();          // Reposiciona Inimigo2
		
	  }	// Fim Colis�o 2
	
	  // Verifica��o da Colis�o do Disparo com o inimigo1
	  if (colisao3.length>0) { // Se a vari�vel estar preenchida, ent�o, houve a colis�o
		pontos=pontos+100;	   // Adiciona 100 Pontos ao Placar
		velocidade=velocidade+0.3; // Adiciona 0.3 na velocidade do Inimigo 1 Aumentando
		                           // Mais o N�vel de Dificuldade no Jogo
        inimigo1X = parseInt($("#inimigo1").css("left")); // Posi��o Atual Left do 
		                                                  // Inimigo1
	    inimigo1Y = parseInt($("#inimigo1").css("top"));  // Posi��o Atual Top  do 
		                                                  // Inimigo1
		explosao1(inimigo1X,inimigo1Y); // Explos�o do Inimigo2
	    $("#disparo").css("left",950);  // Evita o disparo continuar na tela ap�s Atingido
		                                // Margem Total Esquerda da Div no caso 950.
		
	    posicaoY = parseInt(Math.random() * 334); // C�lcula nova posi��o aleat�ria
		                                          // do Inimigo 1 para  Tela
	    $("#inimigo1").css("left",694);           // Sempre 694 a Esquerda na Div
	    $("#inimigo1").css("top",posicaoY);       // Posi��o Calculada no Eixo Y postada
		
	  } // Fim Colis�o 3
	
	  // Verifica��o da Colis�o do Disparo com o inimigo2
      if (colisao4.length>0) { // Se a vari�vel estar preenchida, ent�o, houve a colis�o
		pontos=pontos+50;      // Adiciona 50 Pontos ao Placar
		velocidade=velocidade+0.3; // Adiciona 0.3 na velocidade do Inimigo 1 Aumentando
		inimigo2X = parseInt($("#inimigo2").css("left")); // Posi��o Atual Left do
		                                                  // Inimigo2
   	    inimigo2Y = parseInt($("#inimigo2").css("top"));  // Posi��o Atual Top do
		                                                  // Inimigo2
	    $("#inimigo2").remove(); // Remove Explos�o do Inimigo2 da Tela

	    explosao2(inimigo2X,inimigo2Y);  // Explos�o do Inimigo2
	    $("#disparo").css("left",950);   // Evita o disparo continuar na tela ap�s 
		                                 // Atingido
	
	    reposicionaInimigo2();           // Reposiciona Inimigo2
		
	  } // Fim Colis�o 4
	
	  // Verifica��o da Colis�o do jogador com o amigo
	  if (colisao5.length>0) { // Se a vari�vel estar preenchida, ent�o, houve a colis�o
		salvos++;              // Adiciona a Vari�vel salvos, no Caso a Cada Amigo
		                       // Resgatado +1
		somResgate.play();     // Executa o Som do Resgate
	    $("#amigo").remove();  // Remove o Amigo da Tela P�s Colis�o
		reposicionaAmigo();    // Reposiciona Novamente o Amigo na Tela Margem Direita
  	  } // Fim Colis�o 5
	
	  // Verifica��o da Colis�o do Inimigo2 com o amigo
      if (colisao6.length>0) { // Se a vari�vel estar preenchida, ent�o, houve a colis�o
	    perdidos++; // Adiciona a Vari�vel Perdidos, no Caso a Cada Amigo Atropelado
		            // Pelo Inimigo 2
		amigoX = parseInt($("#amigo").css("left")); // Div Amigo em Lef Eixo X
        amigoY = parseInt($("#amigo").css("top"));  // Div Amigo em Top Eixo Y
        explosao3(amigoX,amigoY); // Explos�o do Amigo
        $("#amigo").remove();     // Remove o Amigo da Tela
		reposicionaAmigo();       // Reposiciona Novamente o Amigo na Tela Margem Direita
		
	  } // Fim Colis�o 6

    } //Fim da fun��o colisao()
	
	// Execu��o da Explos�o 1
    function explosao1(inimigo1X,inimigo1Y) { // Posi��o no Eixo X e Y do Inimigo1
	   somExplosao.play();	// Executa o Som da Explos�o
	   // Adiciona Div Explos�o no Jogo Quanto ao Inimigo 1, Mediante alguma das colis�es
	   $("#fundoGame").append("<div id='explosao1'></div"); 
	   // Imagem da Explos�o a ser usada pela Div Explos�o 1
	   $("#explosao1").css("background-image", "url(imgs/explosao.png)");
	   var div=$("#explosao1");    // Declara Vari�vel Div Como Explos�o1 para uso
	   div.css("top", inimigo1Y);  // Posi��o aonde a DIV da Explos�o1 vai Aparecer - Top
	   div.css("left", inimigo1X); // Posi��o aonde a DIV da Explos�o1 vai Aparecer - Left
	   // Anima o tamanho da DIV - Lentamente de 15 a 200 e remove ao final
	   div.animate({width:200, opacity:0}, "slow"); // Anima o tamanho da DIV  
	   // Declara a V�riavel TempExplosao Para Remo��o da explos�o ap�s 1 segundo
	   var tempoExplosao=window.setInterval(removeExplosao, 1000); 
	   	
	   function removeExplosao() { // Remove Explos�o
			
		  div.remove(); // Executa a Remo��o da Div
		  window.clearInterval(tempoExplosao); // Limpa a Vari�vel TempoExplosao
		  tempoExplosao=null; // Esvazia a Vari�vel TempoExplosao
			
	   } // Fim da Fun��o removeExplosao
		
	} // Fim da fun��o explosao1()
			
	// Execu��o da Explos�o2
	function explosao2(inimigo2X,inimigo2Y) { // Posi��o no Eixo X e Y do Inimigo2
	   somExplosao.play(); // Executa o Som da Explos�o
	   // Adiciona Div Explos�o no Jogo Quanto ao Inimigo 2, Mediante alguma das colis�es
	   $("#fundoGame").append("<div id='explosao2'></div");
	   // Imagem da Explos�o a ser usada pela Div Explos�o 2
	   $("#explosao2").css("background-image", "url(imgs/explosao.png)");
	   var div2=$("#explosao2"); // Declara Vari�vel Div Como Explos�o2 para uso
	   div2.css("top", inimigo2Y); // Posi��o aonde a DIV da Explos�o2 vai Aparecer - Top
	   div2.css("left", inimigo2X);// Posi��o aonde a DIV da Explos�o1 vai Aparecer - Left
	   // Anima o tamanho da DIV - Lentamente de 15 a 200 e remove ao final
	   div2.animate({width:200, opacity:0}, "slow");
	   // Declara a V�riavel TempExplosao2 Para Remo��o da explos�o ap�s 1 segundo
	   var tempoExplosao2=window.setInterval(removeExplosao2, 1000);
	   
	   function removeExplosao2() { // Remove Explos�o 2
			
		  div2.remove(); // Executa a Remo��o da Div2
		  window.clearInterval(tempoExplosao2); // Limpa a Vari�vel TempoExplosao
		  tempoExplosao2=null; //Esvazia a Vari�vel TempoExplosao2
			
	   } // Fim da fun��o RemoveExplosao2
	} // Fim da fun��o explosao2()
	
	// Execu��o da Explos�o3
    function explosao3(amigoX,amigoY) { // Posi��o no Eixo X e Y do Amigo
	   somPerdido.play(); // Executa o Som do Amigo Perdido P�s Atropelamento pelo 
	                      // Caminh�o 
		// Adiciona Div Explos�o no Jogo Quanto ao Amigo, Mediante colis�o com o Caminh�o
       $("#fundoGame").append("<div id='explosao3' class='anima4'></div");
       $("#explosao3").css("top",amigoY); // Posi��o aonde a DIV da Explos�o2 vai 
	                                      // Aparecer - Top
       $("#explosao3").css("left",amigoX); // Posi��o aonde a DIV da Explos�o2 vai 
	                                       // Aparecer - Top
	   // Declara a V�riavel TempExplosao2 Para Remo��o da explos�o ap�s 1 segundo
	   var tempoExplosao3=window.setInterval(resetaExplosao3, 1000);
       
	   
	   function resetaExplosao3() { // Fu��o de Remo��o de Explos�o 3
          $("#explosao3").remove(); // Executa a Remo��o da Div2
		  window.clearInterval(tempoExplosao3); // Limpa a Vari�vel TempoExplosao
          tempoExplosao3=null; //Esvazia a Vari�vel TempoExplosao2
       } // Fim da Fun��o resetaExplos�o3

    } // Fim da fun��o explosao3

	// Executa o Reposicionamento do Inimigo2
	function reposicionaInimigo2() { 
	   // Ser� executado o reposicionamento do inimigo2 somente ap�s 5 segundos
	   var tempoColisao4=window.setInterval(reposiciona4, 5000); 
		
	   function reposiciona4() { // Executa fun��o Reposiciona4
	      window.clearInterval(tempoColisao4); //Limpa a Vari�vel tempoColisao4
	      tempoColisao4=null; // Esvazia a Vari�vel TempoColisao4
			
		  if (fimdejogo==false) { // Verifica se Fim de Jogo / GameOver
			 // sen�o for, Apresenta novamente o Inimigo2 no Jogo em nova posi��o
		     $("#fundoGame").append("<div id=inimigo2></div");
			
		  } // Fim da Verifica��o de Fim de Jogo
			
	   } // Fim da verifica��o de Reposiciona4
	} // Fim da verifica��o de ReposiciaInimigo2
	
	//Executa Fun��o Reposiciona Amigo
	function reposicionaAmigo() {
	  // Ser� executado o reposicionamento do Amigo somente ap�s 5 segundos
	   var tempoAmigo=window.setInterval(reposiciona6, 6000);
	
	   function reposiciona6() { // Executa fun��o Reposiciona6
		   window.clearInterval(tempoAmigo); //Limpa a Vari�vel tempoAmigo
		   tempoAmigo=null; // Esvazia a Vari�vel TempoAmigo
		
		   if (fimdejogo==false) { // Verifica se Fim de Jogo / GameOver
		      // sen�o for, Apresenta novamente o Amigo no Jogo reposicionado
		      $("#fundoGame").append("<div id='amigo' class='anima3'></div>");
		
		   } // Fim da Verifica��o de Fim de Jogo
		
	   } // Fim da Fun��o reposiciona6
	}  // Fim da fun��o reposicionaAmigo()
	
	// Fun��o Placar
    function placar() { 
	
	   $("#placar").html("<h3> Pontos: " + pontos + " Salvos: " + salvos + " Perdidos: " + perdidos + "</h3>"); // Adiciona na Tela a Div Placar
	
    } //fim da fun��o placar()
	
	// Fun��o Barra de energia
    function energia() {
	
		if (energiaAtual==3) { // Verifica��o de energia se = 3
			// Mostra a DIV energia preenchida com 3 barras de energia
			$("#energia").css("background-image", "url(imgs/energia3.png)");
		}
	
		if (energiaAtual==2) { // Verifica��o de energia se = 2
			// Mostra a DIV energia preenchida com 2 barras de energia
			$("#energia").css("background-image", "url(imgs/energia2.png)");
		}
	
		if (energiaAtual==1) { // Verifica��o de energia se = 1
			// Mostra a DIV energia preenchida com 1 barra de energia
			$("#energia").css("background-image", "url(imgs/energia1.png)");
		}
	
		if (energiaAtual==0) { // Verifica��o de energia se = 0
			// Mostra a DIV energia preenchida com barra de energia zerada
			$("#energia").css("background-image", "url(imgs/energia0.png)");
			
			gameOver(); // Executa a Fun��o GameOver
		}
	
	} // Fim da fun��o energia()

	//Fun��o GAME OVER
	function gameOver() {
	   // declara a vari�vel fimdejogo como verdadeira
	   fimdejogo=true; 
	   // executa a fun��o m�sica com o m�todo pause, parando a m�sica do jogo
	   musica.pause(); 
	   // executa o som de Gameover
	   somGameover.play();
	   // limpa a vari�vel jogo.timer
	   window.clearInterval(jogo.timer);
	   jogo.timer=null; // esvazia a vari�vel jogo.timer
	
	   $("#jogador").remove();  // Remove a Div Jogador
	   $("#inimigo1").remove(); // Remove a Div Inimigo1
	   $("#inimigo2").remove(); // Remove a Div Inimigo2
	   $("#amigo").remove();    // Remove a Div Amigo
	   // Declara a Div de Fim
	   $("#fundoGame").append("<div id='fim'></div>");
	   // Apresenta na Tela a Div FIM com a pontua��o final do jogador obtida durante o 
	   // jogo - Determinando assim o fim do jogo
	   // E clicando em Jogar Novamente executa a Fun��o reiniciajogo()
	   $("#fim").html("<h1> Game Over </h1><p><b>Sua pontua��o foi: " + pontos + "</p>" + "<div id='reinicia'><input class='favorite styled' type='button' id='reinicia' onClick=reiniciaJogo() Value='Jogar Novamente'></div>");
	} // Fim da fun��o gameOver();

} // Fim da fun��o start

// Executa Fun��o ReiniciaJogo
function reiniciaJogo() { 
	   somGameover.pause(); // Para o Som de GameOver
	   $("#fim").remove();  // Remove a Div Fim da Tela do Jogo
	   location.reload();
	   //start(); // Executa a Fun��o Start(), Inicializando novamente o jogo
	
} //Fim da fun��o reiniciaJogo		

