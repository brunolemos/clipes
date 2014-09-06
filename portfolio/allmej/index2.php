<?php
$url 	= @$_GET['url'] ? $_GET['url'] : "dashboard";
$page 	= file_exists($url.'.php') ? $url.'.php' : 'error.php';
?>
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="content-type" content="text/html; charset=utf-8"/>
	<title>ALLMEJ - Automatize sua EJ</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css"/>
	<link rel="stylesheet" type="text/css" href="css/style.css"/>
	<link rel="stylesheet" type="text/css" href="css/phone.css"/>
	<link rel="stylesheet" type="text/css" href="css/tablet.css"/>
	<link rel="stylesheet" type="text/css" href="css/desktop.css"/>
	<link href='http://fonts.googleapis.com/css?family=Open+Sans:400,300' rel='stylesheet' type='text/css'>
	<link href='http://fonts.googleapis.com/css?family=Noto+Sans:400,700' rel='stylesheet' type='text/css'>
	<link href='http://fonts.googleapis.com/css?family=Anton' rel='stylesheet' type='text/css'>
</head>
<body>
	<script type="text/javascript">
	page = "<?php echo $url; ?>";
	</script>

	<div id="page">
		<div id="logo"></div>

		<!--<div id="header"></div>-->

		<div id="sidebar">
			<div id="sidebar-scroll">
				<div id="menu-button"></div>

				<div class="avatar-container">
					<div class="avatar"></div>
				</div>

				<ul id="menu">
					<li class="item" rel="dashboard"><a href="dashboard">Dashboard</a></li>
					<li class="separator"></li>
					<li class="item" rel="pessoas"><a href="pessoas">Pessoas</a></li>
					<li class="item" rel="calendario"><a href="calendario">Calendário</a></li>
					<li class="separator"></li>
					<li class="item" rel="documentacao"><a href="documentacao">Documentação</a></li>
					<li class="item" rel="reuniao"><a href="reuniao">Horário para Reunião</a></li>
					<li class="item" rel="presenca"><a href="presenca">Controle de Presença</a></li>
				</ul>

				<a id="feedback-link" href="javascript:void(0)" data-uv-lightbox="classic_widget" data-uv-mode="full" data-uv-primary-color="#ff3059" data-uv-link-color="#ff3059" data-uv-default-mode="feedback" data-uv-forum-id="211383" data-uv-support-tab_name="Entrar em contato" data-uv-feedback-tab_name="Sugerir uma funcionalidade">Feedback &amp; Suporte</a>
			</div>

		</div>

		<div id="main">
			<div id="main-scroll">
				<div id="search-container">
					<div class="search">
						<input id="input-search" type="text" name="search" />
					</div>

					<ul id="search-results" class="hidden">
						<li class="item">
							<div class="avatar"></div>
						</li>

						<li class="item">
							<div class="avatar"></div>
						</li>

						<li class="item">
							<div class="avatar"></div>
						</li>
					</ul>
				</div>

				<div id="content">
					<?php include($page); ?>
				</div>
			</div>
		</div>
	</div>

	<script type="text/javascript" src="js/jquery.js"></script>
	<script type="text/javascript" src="js/bootstrap.min.js"></script>
	<script type="text/javascript" src="js/User.js"></script>
	<script type="text/javascript" src="js/script.js"></script>
	<script>(function(){var uv=document.createElement('script');uv.type='text/javascript';uv.async=true;uv.src='//widget.uservoice.com/CZ8CwTsJYvunWeUtQNrddA.js';var s=document.getElementsByTagName('script')[0];s.parentNode.insertBefore(uv,s)})()</script>
</body>
</html>