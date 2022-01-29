// Jogo Criado por Denilson Bonatti
// Novas Implementações por Roberto Júnior
// Em 08/01/2022
// Utilizando Javascrit, Css, Html 5
function start() { // Inicio da função start()

    $("#inicio").hide(); // Ocultar div Início 
	$("#fundoGame").append("<div id='jogador' class='anima1'></div>"); // Div Jogador
	$("#fundoGame").append("<div id='inimigo1' class='anima2'></div>"); // Div Inimigo1
	$("#fundoGame").append("<div id='inimigo2'></div>"); // Div Inimigo2
	$("#fundoGame").append("<div id='amigo' class='anima3'</div>"); // Div Amigo
	$("#fundoGame").append("<div id='placar'></div>"); // Div Placar
    $("#fundoGame").append("<div id='energia'></div>"); // Div Energia


    //Principais variáveis do jogo
    var jogo = {}
    var velocidade=5; /* Velocidade de Movimentação do Inimigo1*/
    var posicaoY = parseInt(Math.random() * 334); // Declara de 0 a 334 no Eixo Y a posição do Inimigo
	var podeAtirar=true; /* O Disparo Poderá Ser executado */
	var fimdejogo=false; /* verifica se jogo foi finalizado*/
	var pontos=0;        // Pontuação Iniciada com Zero
    var salvos=0;        // Passageiro ou Amigo Resgatado Iniciada com Zero
    var perdidos=0;      // Passageiro ou Amigo Perdido Iniciada com Zero
	var energiaAtual=3;  // Iniciado o Jogo com 3 Vidas
	var somDisparo=document.getElementById("somDisparo"); // Declara Div Som Disparo
    var somExplosao=document.getElementById("somExplosao"); // Declara Div Som Explosão
    var musica=document.getElementById("musica"); // Declara Div Musica
    var somGameover=document.getElementById("somGameover"); // Declara Div Som GameOver
    var somPerdido=document.getElementById("somPerdido"); // Declara Div Som Perdido
    var somResgate=document.getElementById("somResgate"); // Declara Div Som Resgate
	
	//Música em loop
    musica.addEventListener("ended", function(){ musica.currentTime = 0; musica.play(); }, false);
    musica.play(); // Inicia a Música no Jogo

	var TECLA = { // array
	  UP:    38, // Movimenta o Helicóptero Para Cima com a Tecla Cima
	  DOWN:  40, // Movimenta o Helicóptero Para Baixo com a Tecla Baixo
	  SPACE: 32, // Efetua Disparo do Helicóptero para o alvo com Barra de Espaço
	  RIGHT: 39, // Movimenta o Helicóptero Para Direeita com a Tecla Direita
	  LEFT:  37  // Movimenta o Helicóptero Para Esquerda com a Tecla Esquerda
	}

    jogo.pressionou = [];	/*declara a variável pressionou como array*/ 	
	
	/* Verifica se o usuário pressionou alguma tecla*/	
	
	$(document).keydown(function(e){ /* Se pressionada tecla - Verdadeiro */
	jogo.pressionou[e.which] = true;
	});


	$(document).keyup(function(e){ /* Se não pressionada pressionada tecla - Falso */
       jogo.pressionou[e.which] = false;
	});


    jogo.timer = setInterval(loop,30);	// temporiza o início do jogo com 30 milesegundos
	
	function loop() {
	
    	movefundo();    // Inicia a Função Move Fundo
		movejogador();  // Inicia a Função Move Jogador
		moveinimigo1(); // Inicia a Função Move Inimigo1
		moveinimigo2(); // Inicia a Função Move Inimigo2
		moveamigo();    // Inicia a Função Move Amigo
		colisao();      // Inicia a Função de Detecção de Colisões
		placar();		// Inicia a Função do Placar do Jogo
        energia();      // Inicia a Função de Energia do Jogador no Jogo
		
	
	} // Fim da função loop
	
	//Função que movimenta o fundo do jogo
	
	function movefundo() { // Faz com que o Fundo Movimente-se dentro da Div Principal
	
	// Movimentar fundo da Div Principal
	esquerda = parseInt($("#fundoGame").css("background-position")); 
	$("#fundoGame").css("background-position",esquerda-1); // Movimentar fundo para Esquerda.
	
	} // fim da função movefundo()

    function movejogador() { // Função para Movimentar o Jogador, no caso o Helicóptero
	
	  if (jogo.pressionou[TECLA.UP]) { // Pressionado a Tecla UP
		  var topo = parseInt($("#jogador").css("top")); // Movimentar subindo
		  $("#jogador").css("top",topo-10); // Movimenta Para Cima o Helicóptero
		  
		  if (topo<=0) { // Se topar na DIV, congela o Helicóptero Evitando se locomover
	        $("#jogador").css("top",topo+10); 
			/* Evitar que o Objeto saia da Parte Superior da Tela Limitada pela DIV*/
          }
	  }
	
	  if (jogo.pressionou[TECLA.DOWN]) { // Pressionado a Tecla DOWN
		 var topo = parseInt($("#jogador").css("top")); // Movimentar descendo
		 $("#jogador").css("top",topo+10);	// Movimenta Para Baixo o Helicóptero
		 
		 if (topo>=434) { // Se topar na DIV, congela o Helicóptero Evitando se
  		                  // locomover	
	        $("#jogador").css("top",topo-10); 
			/* Evitar que o Objeto saia da Parte Inferior da Tela  Limitada pela DIV*/
	     }
	  }
	
	  if (jogo.pressionou[TECLA.RIGHT]) { // Pressionado a Tecla RIGHT
	    posicaoX = parseInt($("#jogador").css("left")); // Movimentar Direita
	    $("#jogador").css("left",posicaoX+10); /* Caminhando para Direita 1 unidade */
				
		if (posicaoX>750) { /* quando Topar Margem Direita em 906*/
			
		$("#jogador").css("left",720); /* Reposicionar o Amigo na Posição Inicial, 0*/
					
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
		
		//Executa função Disparo	
		disparo(); 
	  }

	} // fim da função movejogador()
	
	function moveinimigo1() { /* Movimenta Helicóptero Inimigo */

	   posicaoX = parseInt($("#inimigo1").css("left")); /*Propriedade Left Div Inimigo1*/
	   $("#inimigo1").css("left",posicaoX-velocidade); /* Caminha p/ Esq. Eixo X 5 und*/
	   $("#inimigo1").css("top",posicaoY); /*Propriedade Top Div Inimigo1*/
		
		if (posicaoX<=0) { // Se Inimigo 1 Topou Margem Esquerda da Div, Reposicionar
		   posicaoY = parseInt(Math.random() * 334); // Calcula Nova Posicão Eixo Y de 
		                                             // Modo Randômico (Aleatório)
		   $("#inimigo1").css("left",694); // valor inicial de Esqueda do Inimigo1 Sempre
		   $("#inimigo1").css("top",posicaoY); // Posição do Inimigo 1 Eixo Y Pós Random
			
		}
    } //Fim da função moveinimigo1()  
	
	function moveinimigo2() { /* Movimenta Caminhão Inimigo */
        posicaoX = parseInt($("#inimigo2").css("left")); /*Propriedade Left Div Inimigo2*/
	    $("#inimigo2").css("left",posicaoX-3); /* Caminhar 3 und para o Lado Esquerdo*/
				
		if (posicaoX<=0) { /* ao Chegar em 0 no Eixo X*/
			
		$("#inimigo2").css("left",775);/* Reposicionar Inimigo 2*/
					
		}
    } // Fim da função moveinimigo2()
	
	function moveamigo() { // Movimentar Amigo
	
	posicaoX = parseInt($("#amigo").css("left")); /*Propriedade Left Div Amigo*/
	$("#amigo").css("left",posicaoX+1); /* Caminhando para Direita 1 unidade */
				
		if (posicaoX>906) { /* quando Topar Margem Direita em 906*/
			
		$("#amigo").css("left",0); /* Reposicionar o Amigo na Posição Inicial, 0*/
					
		}

    } // fim da função moveamigo()
	
	function disparo() { // Função de Verificação da Execução do Disparo
	  
	   if (podeAtirar==true) { /* Se foi disparado ou executado */
		 somDisparo.play(); // Executa Som do Disparo
	     podeAtirar=false; /* O Disparo é parado por enquanto */
	
	     topo = parseInt($("#jogador").css("top")) /* Posição inicial do Tiro Local do */
	     posicaoX= parseInt($("#jogador").css("left")) /* Helicóptero em left/top */
	     tiroX = posicaoX + 190; /* Caminhou para Direita */
	     topoTiro=topo+37; /* Local inicial do tiro para / Mais para baixo*/
	     $("#fundoGame").append("<div id='disparo'></div"); // Acrescenta div Disparo
	     $("#disparo").css("top",topoTiro); // Div Disparo Posição Top 
	     $("#disparo").css("left",tiroX);   // Div Disparo Posição Left
		 
	
	     var tempoDisparo=window.setInterval(executaDisparo, 30); 
		 /* Tempo para Disparo e assim aguardar novamente, para que um novo seja */
	     // Efetuado.
	   } //Fecha podeAtirar
 
   	   function executaDisparo() { // Função de Execução do Disparo
	      posicaoX = parseInt($("#disparo").css("left")); // Posição left da DIV Disparo
	      $("#disparo").css("left",posicaoX+15);  /* Caminha 15 und */

          if (posicaoX>900) { /* Ao Objeto do Disparo sair da tela*/
						
	        window.clearInterval(tempoDisparo); // Limpa o tempo do Disparo
		    tempoDisparo=null; // Esvazia a Variável Tempo do Disparo
		    $("#disparo").remove(); /* remove da tela */
		    podeAtirar=true; /* depois de removida poderá atirar */
					
          }
	   } // Fecha executaDisparo()
    } // Fecha disparo()
	
	function colisao() { // Função de Verificação das Colisões
	  // Colisão do Jogador  com o Inimigo1
      var colisao1 = ($("#jogador").collision($("#inimigo1"))); 
	  // Colisão do Jogador  com o Inimigo2
	  var colisao2 = ($("#jogador").collision($("#inimigo2")));
      // Colisão do Disparo  com o Inimigo1
	  var colisao3 = ($("#disparo").collision($("#inimigo1")));
      // Colisão do Disparo  com o Inimigo2
	  var colisao4 = ($("#disparo").collision($("#inimigo2")));
      // Colisão do Jogador com o Amigo
	  var colisao5 = ($("#jogador").collision($("#amigo")));
      // Colisão do Inimigo2 com o Amigo
	  var colisao6 = ($("#inimigo2").collision($("#amigo")));
      
	  // Verificação da Colisão do jogador com o inimigo1 - Helicóptero
	  if (colisao1.length>0) { // Se a variável estar preenchida, então, houve a colisão
		 energiaAtual--;       // Decrementa uma energia do Jogador
		 somExplosao.play();   // Executa o Som da Explosão
	     inimigo1X = parseInt($("#inimigo1").css("left")); // Posição Atual Left do 
		                                                   // Inimigo1
	     inimigo1Y = parseInt($("#inimigo1").css("top"));  // Posição Atual Top  do 
		                                                   // Inimigo1
	     explosao1(inimigo1X,inimigo1Y); // Explosão do Inimigo1

	     posicaoY = parseInt(Math.random() * 334); // Cálculo de Reposicão do Inimigo1
	     $("#inimigo1").css("left",694);     // Sempre em 694 Eixo X Esquerda
	     $("#inimigo1").css("top",posicaoY); // Posição do Eixo Y
	  } // Fim Colisão 1
	  
	  // Verificação da Colisão do jogador com o inimigo2 - Caminhão
	  if (colisao2.length>0) { // Se a variável estar preenchida, então, houve a colisão
	     energiaAtual--;       // Decrementa uma energia do Jogador
		 somExplosao.play();   // Executa o Som da Explosão
	     inimigo2X = parseInt($("#inimigo2").css("left")); // Posição Atual Left do 
		                                                   // Inimigo2 
	     inimigo2Y = parseInt($("#inimigo2").css("top"));  // Posição Atual Top  do  
		                                                   // Inimigo2
	     explosao2(inimigo2X,inimigo2Y); // Explosão do Inimigo2
			
	     $("#inimigo2").remove();        // Remove Explosão do Inimigo2 da Tela
		
	     reposicionaInimigo2();          // Reposiciona Inimigo2
		
	  }	// Fim Colisão 2
	
	  // Verificação da Colisão do Disparo com o inimigo1
	  if (colisao3.length>0) { // Se a variável estar preenchida, então, houve a colisão
		pontos=pontos+100;	   // Adiciona 100 Pontos ao Placar
		velocidade=velocidade+0.3; // Adiciona 0.3 na velocidade do Inimigo 1 Aumentando
		                           // Mais o Nível de Dificuldade no Jogo
        inimigo1X = parseInt($("#inimigo1").css("left")); // Posição Atual Left do 
		                                                  // Inimigo1
	    inimigo1Y = parseInt($("#inimigo1").css("top"));  // Posição Atual Top  do 
		                                                  // Inimigo1
		explosao1(inimigo1X,inimigo1Y); // Explosão do Inimigo2
	    $("#disparo").css("left",950);  // Evita o disparo continuar na tela após Atingido
		                                // Margem Total Esquerda da Div no caso 950.
		
	    posicaoY = parseInt(Math.random() * 334); // Cálcula nova posição aleatória
		                                          // do Inimigo 1 para  Tela
	    $("#inimigo1").css("left",694);           // Sempre 694 a Esquerda na Div
	    $("#inimigo1").css("top",posicaoY);       // Posição Calculada no Eixo Y postada
		
	  } // Fim Colisão 3
	
	  // Verificação da Colisão do Disparo com o inimigo2
      if (colisao4.length>0) { // Se a variável estar preenchida, então, houve a colisão
		pontos=pontos+50;      // Adiciona 50 Pontos ao Placar
		velocidade=velocidade+0.3; // Adiciona 0.3 na velocidade do Inimigo 1 Aumentando
		inimigo2X = parseInt($("#inimigo2").css("left")); // Posição Atual Left do
		                                                  // Inimigo2
   	    inimigo2Y = parseInt($("#inimigo2").css("top"));  // Posição Atual Top do
		                                                  // Inimigo2
	    $("#inimigo2").remove(); // Remove Explosão do Inimigo2 da Tela

	    explosao2(inimigo2X,inimigo2Y);  // Explosão do Inimigo2
	    $("#disparo").css("left",950);   // Evita o disparo continuar na tela após 
		                                 // Atingido
	
	    reposicionaInimigo2();           // Reposiciona Inimigo2
		
	  } // Fim Colisão 4
	
	  // Verificação da Colisão do jogador com o amigo
	  if (colisao5.length>0) { // Se a variável estar preenchida, então, houve a colisão
		salvos++;              // Adiciona a Variável salvos, no Caso a Cada Amigo
		                       // Resgatado +1
		somResgate.play();     // Executa o Som do Resgate
	    $("#amigo").remove();  // Remove o Amigo da Tela Pós Colisão
		reposicionaAmigo();    // Reposiciona Novamente o Amigo na Tela Margem Direita
  	  } // Fim Colisão 5
	
	  // Verificação da Colisão do Inimigo2 com o amigo
      if (colisao6.length>0) { // Se a variável estar preenchida, então, houve a colisão
	    perdidos++; // Adiciona a Variável Perdidos, no Caso a Cada Amigo Atropelado
		            // Pelo Inimigo 2
		amigoX = parseInt($("#amigo").css("left")); // Div Amigo em Lef Eixo X
        amigoY = parseInt($("#amigo").css("top"));  // Div Amigo em Top Eixo Y
        explosao3(amigoX,amigoY); // Explosão do Amigo
        $("#amigo").remove();     // Remove o Amigo da Tela
		reposicionaAmigo();       // Reposiciona Novamente o Amigo na Tela Margem Direita
		
	  } // Fim Colisão 6

    } //Fim da função colisao()
	
	// Execução da Explosão 1
    function explosao1(inimigo1X,inimigo1Y) { // Posição no Eixo X e Y do Inimigo1
	   somExplosao.play();	// Executa o Som da Explosão
	   // Adiciona Div Explosão no Jogo Quanto ao Inimigo 1, Mediante alguma das colisões
	   $("#fundoGame").append("<div id='explosao1'></div"); 
	   // Imagem da Explosão a ser usada pela Div Explosão 1
	   $("#explosao1").css("background-image", "url(imgs/explosao.png)");
	   var div=$("#explosao1");    // Declara Variável Div Como Explosão1 para uso
	   div.css("top", inimigo1Y);  // Posição aonde a DIV da Explosão1 vai Aparecer - Top
	   div.css("left", inimigo1X); // Posição aonde a DIV da Explosão1 vai Aparecer - Left
	   // Anima o tamanho da DIV - Lentamente de 15 a 200 e remove ao final
	   div.animate({width:200, opacity:0}, "slow"); // Anima o tamanho da DIV  
	   // Declara a Váriavel TempExplosao Para Remoção da explosão após 1 segundo
	   var tempoExplosao=window.setInterval(removeExplosao, 1000); 
	   	
	   function removeExplosao() { // Remove Explosão
			
		  div.remove(); // Executa a Remoção da Div
		  window.clearInterval(tempoExplosao); // Limpa a Variável TempoExplosao
		  tempoExplosao=null; // Esvazia a Variável TempoExplosao
			
	   } // Fim da Função removeExplosao
		
	} // Fim da função explosao1()
			
	// Execução da Explosão2
	function explosao2(inimigo2X,inimigo2Y) { // Posição no Eixo X e Y do Inimigo2
	   somExplosao.play(); // Executa o Som da Explosão
	   // Adiciona Div Explosão no Jogo Quanto ao Inimigo 2, Mediante alguma das colisões
	   $("#fundoGame").append("<div id='explosao2'></div");
	   // Imagem da Explosão a ser usada pela Div Explosão 2
	   $("#explosao2").css("background-image", "url(imgs/explosao.png)");
	   var div2=$("#explosao2"); // Declara Variável Div Como Explosão2 para uso
	   div2.css("top", inimigo2Y); // Posição aonde a DIV da Explosão2 vai Aparecer - Top
	   div2.css("left", inimigo2X);// Posição aonde a DIV da Explosão1 vai Aparecer - Left
	   // Anima o tamanho da DIV - Lentamente de 15 a 200 e remove ao final
	   div2.animate({width:200, opacity:0}, "slow");
	   // Declara a Váriavel TempExplosao2 Para Remoção da explosão após 1 segundo
	   var tempoExplosao2=window.setInterval(removeExplosao2, 1000);
	   
	   function removeExplosao2() { // Remove Explosão 2
			
		  div2.remove(); // Executa a Remoção da Div2
		  window.clearInterval(tempoExplosao2); // Limpa a Variável TempoExplosao
		  tempoExplosao2=null; //Esvazia a Variável TempoExplosao2
			
	   } // Fim da função RemoveExplosao2
	} // Fim da função explosao2()
	
	// Execução da Explosão3
    function explosao3(amigoX,amigoY) { // Posição no Eixo X e Y do Amigo
	   somPerdido.play(); // Executa o Som do Amigo Perdido Pós Atropelamento pelo 
	                      // Caminhão 
		// Adiciona Div Explosão no Jogo Quanto ao Amigo, Mediante colisão com o Caminhão
       $("#fundoGame").append("<div id='explosao3' class='anima4'></div");
       $("#explosao3").css("top",amigoY); // Posição aonde a DIV da Explosão2 vai 
	                                      // Aparecer - Top
       $("#explosao3").css("left",amigoX); // Posição aonde a DIV da Explosão2 vai 
	                                       // Aparecer - Top
	   // Declara a Váriavel TempExplosao2 Para Remoção da explosão após 1 segundo
	   var tempoExplosao3=window.setInterval(resetaExplosao3, 1000);
       
	   
	   function resetaExplosao3() { // Fução de Remoção de Explosão 3
          $("#explosao3").remove(); // Executa a Remoção da Div2
		  window.clearInterval(tempoExplosao3); // Limpa a Variável TempoExplosao
          tempoExplosao3=null; //Esvazia a Variável TempoExplosao2
       } // Fim da Função resetaExplosão3

    } // Fim da função explosao3

	// Executa o Reposicionamento do Inimigo2
	function reposicionaInimigo2() { 
	   // Será executado o reposicionamento do inimigo2 somente após 5 segundos
	   var tempoColisao4=window.setInterval(reposiciona4, 5000); 
		
	   function reposiciona4() { // Executa função Reposiciona4
	      window.clearInterval(tempoColisao4); //Limpa a Variável tempoColisao4
	      tempoColisao4=null; // Esvazia a Variável TempoColisao4
			
		  if (fimdejogo==false) { // Verifica se Fim de Jogo / GameOver
			 // senão for, Apresenta novamente o Inimigo2 no Jogo em nova posição
		     $("#fundoGame").append("<div id=inimigo2></div");
			
		  } // Fim da Verificação de Fim de Jogo
			
	   } // Fim da verificação de Reposiciona4
	} // Fim da verificação de ReposiciaInimigo2
	
	//Executa Função Reposiciona Amigo
	function reposicionaAmigo() {
	  // Será executado o reposicionamento do Amigo somente após 5 segundos
	   var tempoAmigo=window.setInterval(reposiciona6, 6000);
	
	   function reposiciona6() { // Executa função Reposiciona6
		   window.clearInterval(tempoAmigo); //Limpa a Variável tempoAmigo
		   tempoAmigo=null; // Esvazia a Variável TempoAmigo
		
		   if (fimdejogo==false) { // Verifica se Fim de Jogo / GameOver
		      // senão for, Apresenta novamente o Amigo no Jogo reposicionado
		      $("#fundoGame").append("<div id='amigo' class='anima3'></div>");
		
		   } // Fim da Verificação de Fim de Jogo
		
	   } // Fim da Função reposiciona6
	}  // Fim da função reposicionaAmigo()
	
	// Função Placar
    function placar() { 
	
	   $("#placar").html("<h3> Pontos: " + pontos + " Salvos: " + salvos + " Perdidos: " + perdidos + "</h3>"); // Adiciona na Tela a Div Placar
	
    } //fim da função placar()
	
	// Função Barra de energia
    function energia() {
	
		if (energiaAtual==3) { // Verificação de energia se = 3
			// Mostra a DIV energia preenchida com 3 barras de energia
			$("#energia").css("background-image", "url(imgs/energia3.png)");
		}
	
		if (energiaAtual==2) { // Verificação de energia se = 2
			// Mostra a DIV energia preenchida com 2 barras de energia
			$("#energia").css("background-image", "url(imgs/energia2.png)");
		}
	
		if (energiaAtual==1) { // Verificação de energia se = 1
			// Mostra a DIV energia preenchida com 1 barra de energia
			$("#energia").css("background-image", "url(imgs/energia1.png)");
		}
	
		if (energiaAtual==0) { // Verificação de energia se = 0
			// Mostra a DIV energia preenchida com barra de energia zerada
			$("#energia").css("background-image", "url(imgs/energia0.png)");
			
			gameOver(); // Executa a Função GameOver
		}
	
	} // Fim da função energia()

	//Função GAME OVER
	function gameOver() {
	   // declara a variável fimdejogo como verdadeira
	   fimdejogo=true; 
	   // executa a função música com o método pause, parando a música do jogo
	   musica.pause(); 
	   // executa o som de Gameover
	   somGameover.play();
	   // limpa a variável jogo.timer
	   window.clearInterval(jogo.timer);
	   jogo.timer=null; // esvazia a variável jogo.timer
	
	   $("#jogador").remove();  // Remove a Div Jogador
	   $("#inimigo1").remove(); // Remove a Div Inimigo1
	   $("#inimigo2").remove(); // Remove a Div Inimigo2
	   $("#amigo").remove();    // Remove a Div Amigo
	   // Declara a Div de Fim
	   $("#fundoGame").append("<div id='fim'></div>");
	   // Apresenta na Tela a Div FIM com a pontuação final do jogador obtida durante o 
	   // jogo - Determinando assim o fim do jogo
	   // E clicando em Jogar Novamente executa a Função reiniciajogo()
	   $("#fim").html("<h1> Game Over </h1><p><b>Sua pontuação foi: " + pontos + "</p>" + "<div id='reinicia'><input class='favorite styled' type='button' id='reinicia' onClick=reiniciaJogo() Value='Jogar Novamente'></div>");
	} // Fim da função gameOver();

} // Fim da função start

// Executa Função ReiniciaJogo
function reiniciaJogo() { 
	   somGameover.pause(); // Para o Som de GameOver
	   $("#fim").remove();  // Remove a Div Fim da Tela do Jogo
	   location.reload();
	   //start(); // Executa a Função Start(), Inicializando novamente o jogo
	
} //Fim da função reiniciaJogo		

