<?php
session_cache_expire(30);
session_start();

$base = 'http://' . $_SERVER['HTTP_HOST'] . ($_SERVER['HTTP_HOST'] == 'localhost' ? '/allmej' : '');

$reference_id = @$_GET['reference'];
if($reference_id) {
	$_SESSION["reference"] = $reference_id;
	header("Location: " . $base);
} else if(@$_SESSION["reference"]) {
	$reference_id = $_SESSION["reference"];
	//unset($_SESSION['reference']);
}
?>
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="content-type" content="text/html; charset=utf-8"/>
	<title>ALLMEJ - Automatize sua EJ</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="author" content="Grupo de Pós-juniores ainda não revelado">
	<meta name="description" content="O sistema de gestão feito para empresas juniores ♥">
	<meta name="keywords" content="ALLMEJ, ALMEJ, Sistema de Gestão, Sistema integrado online, ERP, ERP para MEJ, Movimento Empresa Júnior, Sistema para EJ, Sistema para Empresa Júnior, Controle de Presença, Centralizar Documentação">
	<meta property="og:image" content="http://allmej.com/img/logo-avatar.png"/>
	<link rel="shortcut icon" href="img/icon/favicon.ico" />
	<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css"/>
	<link rel="stylesheet" type="text/css" href="css/landing.css"/>
	<link rel="stylesheet" type="text/css" href="css/flippant.css"/>
</head>
<body>
	<script type="text/javascript">
	var WRInitTime=(new Date()).getTime();
	</script>
	<script type="text/javascript">
	allmej = new Object();
	allmej.referenced_by = '<?php echo $reference_id; ?>';

	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

	ga('create', 'UA-44984070-1', 'allmej.com');
	ga('send', 'pageview');
	</script>
	<script>(function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) return;
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=536863369734733";
	fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));</script>
	<div id="fb-root"></div>
	<div id="page" class="fadeIn">
		<div id="banner" class="carousel slide">
			<!-- Indicators -->
			<ol class="carousel-indicators">
				<li data-target="#banner" data-slide-to="0" class="active glyphicon"><span class="glyphicon-home"></span></li>
				<li data-target="#banner" data-slide-to="1"></li>
				<li data-target="#banner" data-slide-to="2"></li>
				<li data-target="#banner" data-slide-to="3"></li>
				<li data-target="#banner" data-slide-to="4"></li>
				<!-- <li data-target="#banner" data-slide-to="5"></li> -->
			</ol>

			<!-- Wrapper for slides -->
			<div class="carousel-inner">
				<div class="land item active">
					<div style="text-align:center">
						<a class="logo" href="http://facebook.com/allmej" target="_blank">
							<img src="img/logo.png" class="col-xs-8 col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4" alt="ALLMEJ"/>
						</a>
					</div>

					<h1 class="title col-md-12">Automatize sua Empresa Júnior &amp;<br/>
					Atinja um novo nível de gestão</h1>
					<!-- <h1 class="title col-md-12">Agregue valor à sua Empresa Júnior:<br/>
					Automatize processos &amp; Foque no que é importante</h1> -->

					<div id="landing-area" class="col-xs-12 col-sm-10 col-sm-offset-1 col-md-6 col-md-offset-3">
						<div id="subscribe-form-flip">
							<form id="subscribe-form" method="POST" action="http://allmej.com/allmej/public/newsletter/create<?php echo $reference_id ? '/'.$reference_id : ''; ?>" target="_blank">
								<div class="toggle-btn glyphicon glyphicon-thumbs-up hidden"></div>
								<a href="javascript:void(0)" class="message text-link hidden"></a>
								
								<div class="input-field">
									<input type="text" name="email" placeholder="E-mail">
									<input type="text" name="ej" placeholder="Empresa Júnior">
									<button id="subscribe-button" class="btn">Me avise quando estiver pronto!</button>
								</div>

								<!-- <span class="subbtn-text"><small>Nós respeitamos sua privacidade. <span class="highlight">NUNCA</span> enviaremos spam!</small></span> -->
							</form>
						</div>

						<div id="share-flip" class="hidden">
							<div class="share-flip">
								<div class="toggle-btn glyphicon glyphicon-envelope"></div>

								<h2>Convide a galera do MEJ!</h2>
								<h3>Caso 3 EJs se inscrevam através do seu link, você terá acesso ao sistema antes de todo mundo e o deixaremos perfeito para sua EJ!
								<span class="counter">Você convidou <span class="count">0</span> pessoa(s)</span>
								</h3>


								<div class="fake-link share-button facebook col-xs-12 col-sm-10 col-sm-offset-1 col-md-6 col-md-offset-3" href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fallmej.com" target="_blank">
									<span class="icon"></span>
									<span class="invite-text">Compartilhar no Facebook</span>
									<span class="invite-link auto-select"></span>
								</div>
							</div>
						</div>
					</div>

					<h2 class="subtitle col-md-12">Sistema de gestão integrado<br/>
					que irá facilitar o seu trabalho e<br/>
					ajudar sua empresa a ficar mais forte.<br/>
					Feito para empresas juniores <span class="highlight glyphicon glyphicon-heart"></span></h2>

					<div style="text-align:center">
						<span class="arrow-like visible-lg"></span>
						<div class="fb-like" data-href="https://www.facebook.com/allmej" data-colorscheme="light" data-layout="button_count" data-action="like" data-show-faces="false" data-send="false"></div>
					</div>

				</div>

				<div class="item">
					<h1 class="title">Chega de papéis para fazer o controle de presença:<br/>
					Saiba facilmente quem cumpriu seus horários na sede</h1>

					<img src="img/print-presenca.png" class="col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2" alt="...">
				</div>

				<div class="item">
					<h1 class="title">Encontre o melhor horário para a reunião:<br/>
					Basta escolher as pessoas ou departamento desejado</h1>

					<img src="img/print-horario.png" class="col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2" alt="...">
				</div>

				<div class="item">
					<h1 class="title">Saiba onde está cada documento importante:<br/>
					Centralize todo o conhecimento em um só lugar</h1>
					
					<img src="img/print-documentacao.png" class="col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2" alt="...">
				</div>

				<div class="item">
					<h1 class="title">Nós queremos acabar com seu trabalho manual:<br/>
					Automatize o que puder e foque no que dá resultados</h1>
					
					<img src="img/print-dashboard.png" class="col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2" alt="...">
				</div>

				<!-- <div class="item">
					<img src="img/print-pessoas.png" class="col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2" alt="...">

					<h1 class="title">Organize os dados de todos seus contatos:<br/>
					Membros, Ex-Membros, Clientes, Parceiros, ...</h1>
				</div> -->
			</div>

			<!-- Controls -->
			<a class="left carousel-control" href="#banner" data-slide="prev">
				<span class="icon-prev"></span>
			</a>
			<a class="right carousel-control" href="#banner" data-slide="next">
				<span class="icon-next"></span>
			</a>
		</div>

		<!-- <nav id="features">
			<div class="wrapper col-xs-12 col-sm-10 col-sm-10 col-sm-offset-1">
				<div class="nav-button-left disabled"></div>

				<ul class="menu">
					<li class="item current" rel="documentacao">
						<div class="img icon-documentacao"></div>
						<h3 class="title">Documentação</h3>
					</li>
					<li class="item" rel="presenca">
						<div class="img icon-presenca"></div>
						<h3 class="title">Controle de presença</h3>
					</li>

					<li class="item" rel="horarios">
						<div class="img icon-match"></div>
						<h3 class="title">Horários para reuniões</h3>
					</li>

					<li class="item register" rel="">
						<div class="img"></div>
						<h3 class="title">Registre-se grátis!</h3>
					</li>
				</ul>

				<div class="nav-button-right disabled"></div>
			</div>
		</nav> -->
	</div>

	<script type="text/javascript" src="js/jquery.js"></script>
	<script type="text/javascript" src="js/jquery.cookie.js"></script>
	<!-- <script type="text/javascript" src="js/jquery-ui.js"></script> -->
	<script type="text/javascript" src="js/bootstrap.min.js"></script>
	<script type="text/javascript" src="js/flippant.min.js"></script>
	<script type="text/javascript" src="js/landing.js"></script>
	<link href='http://fonts.googleapis.com/css?family=Noto+Sans:400,700' rel='stylesheet' type='text/css'>
	<!-- <script type="text/javascript" src="http://files.markerly.com/markerly-cdn.js#pub_id=ma-526f318c3534c"></script><script type="text/javascript">var markerly_settings = {"image_services":"facebook,twitter,email","service_color":"ff3b61","image_sharing":0}</script> -->

	<!-- ClickTale Bottom part -->

	<script type='text/javascript'>
	// The ClickTale Balkan Tracking Code may be programmatically customized using hooks:
	// 
	//   function ClickTalePreRecordingHook() { /* place your customized code here */  }
	//
	// For details about ClickTale hooks, please consult the wiki page http://wiki.clicktale.com/Article/Customizing_code_version_2

	document.write(unescape("%3Cscript%20src='"+
	(document.location.protocol=='https:'?
	"https://clicktalecdn.sslcs.cdngc.net/www07/ptc/f326be2d-b668-4d99-9da2-15b581251590.js":
	"http://cdn.clicktale.net/www07/ptc/f326be2d-b668-4d99-9da2-15b581251590.js")+"'%20type='text/javascript'%3E%3C/script%3E"));
	</script>

	<!-- ClickTale end of Bottom part -->

</body>
</html>