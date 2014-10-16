DEBUG = 1;

$(document).ready(function() {
	//expirar cookie em 14 dias
	var cookie_expiration = new Date();
	cookie_expiration.setTime(cookie_expiration.getTime() + (14 * 24 * 60 * 60 * 1000));

	//texto original do botao
	subscribe_button_str = $("#subscribe-button").html();

	//obtem informacao do usuario que esta no cookie
	allmej.user = $.extend({}, allmej.user, JSON.parse($.cookie("user")));

	//
	updateUserDetails();

	//
	$("#banner #subscribe-form .toggle-btn").bind("click", showSharing);

	//mostra pagina
	$("#page").removeClass("fadeIn");
	setTimeout(function() {
		$("#page").animate({opacity: 1}, "normal");
	}, 1000);

	//banner size
	adjustBannerSize();
	$(window).bind("resize", function() {
		adjustBannerSize();
	});

	//aparece formulario
	setTimeout(function() {
		if($.cookie("registred")!=1) {
			showForm();
		} else {
			//$("#banner .message").html("Você já está cadastrado :)");
			//$("#banner .message").attr("title", "Você já está registrado com o e-mail " + $.cookie("email"));
			//$("#banner .message").removeClass("hidden");
			$("body").addClass("registred");
			$("#subscribe-button").html("Você já está cadastrado! Que tal chamar mais gente?");
			$("#subscribe-form input[name=email]").val(allmej.user.email);
			$("#subscribe-form input[name=ej]").val(allmej.user.ej);
			showSharing();
		}
	}, 0500);

	//$(".carousel").swiperight(function() {$(this).carousel('prev');});
	//$(".carousel").swipeleft(function() {$(this).carousel('next');});
	//$("body").bind("keyup", function(e) {if(e.keyCode == 37) $("#banner").carousel('prev');});
	//$("body").bind("keyup", function(e) {if(e.keyCode == 39) $("#banner").carousel('next');});

	//ao submeter formulario, salva no bd
	$("#subscribe-form").bind("submit", function() {
		var email = $("#subscribe-form input[name=email]").val();
		var empresa = $("#subscribe-form input[name=ej]").val();

		if(!email || !empresa) {
			$("#subscribe-button").html("Por favor, preencha os campos.");
			if(!email) {
				$("#subscribe-form input[name=email]").focus();
			} else if(!empresa)  {
				$("#subscribe-form input[name=ej]").focus();
			}

			return false;
		} else if (!isEmail(email)) {
			$("#subscribe-button").html("Seu e-mail está certo?");
			$("#subscribe-form input[name=email]").focus();
			return false;
		}
		
		$.ajax({
			url: 'http://allmej.com/allmej/public/newsletter/create' + (allmej.referenced_by ? '/' + allmej.referenced_by : ''),
			type: 'POST',
			data: {email: email, ej: empresa},
			dataType: "json",
			beforeSend: function() {
				debug("Salvando '" + email + "'' da EJ '" + empresa + "'...");
				$("#subscribe-button").html("Salvando...");
			},

			complete: function() {
				/*debug("complete");
				setTimeout(function() {
					$("#subscribe-button").html("Novo cadastro");
				}, 2000);*/
			},

			success: function(data) {
				//debug(data);
				if(data.Code == 0 && data.Status == 200) {
					$("#subscribe-button").html("Ae! Mandou bem! Que tal chamar mais gente?");

					allmej.user = $.extend({}, allmej.user, data.Data);
					$.cookie("registred", 1, {expires: cookie_expiration});
					$.cookie("user", JSON.stringify(allmej.user), {expires: cookie_expiration});

					setTimeout(hideForm, 200);
					setTimeout(showSharing, 2400);

				} else if(data.Code == 0) {
					$("#subscribe-button").html("Que estranho, algo deu errado...");
				} else if(data.Code == 2) {
					$("#subscribe-button").html("Este e-mail já foi cadastrado! Tem outro?");
					$("#subscribe-form input[name=email]").focus();
				} else {
					$("#subscribe-button").html("Oops, você preencheu corretamente?");
					debug(data);
				}
			},

			error: function(data) {
				debug(data);

				$("#subscribe-button").html("Oops, por favor tente novamente");
			}
		});

		return false;
	});

	$("#banner .message").bind("click", showForm);
	$("#features .item.register").bind("click", showForm);

	/*$("#subscribe-form input").bind("keyup", function(e) {
		if(e.keyCode == 27) {
			hideForm();
		}
	});*/

	bindUpdates();
});

function debug(msg) {
	if(DEBUG) console.log(msg);
}

function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

function adjustBannerSize() {
	$("#banner").css("min-height", 0);
	$("#banner").css("min-height", document.height + "px");
}

function showForm() {
	if(!($("#subscribe-form").hasClass("hidden"))) {
		//$("#subscribe-form").effect("shake");
		$("#subscribe-form input").val("");
	} else {
		//$("#subscribe-button").html("Você já está cadastrado :)");
	}

	//$.cookie("registred", 0);
	//$("#banner .message").addClass("hidden");
	$("#subscribe-form").removeClass("hidden");
	$("#subscribe-form input[name=email]").focus();
	$("#subscribe-form").scroll();
}

function hideForm() {
	$("#subscribe-form").addClass("success");

	setTimeout(function() {
		$("#subscribe-form").removeClass("success");
	/*
		$("#subscribe-form").addClass("hidden");
		$("#banner .message").removeClass("hidden");
	*/
	}, 0500);
}

function showSharing() {
	var link 	= "http://allmej.com/" + (allmej.user.reference_id ? 'i/' + allmej.user.reference_id : '');

	$("#subscribe-form .toggle-btn").removeClass("hidden");
	$(".share-flip .facebook").attr("href", "https://www.facebook.com/sharer/sharer.php?u=" + encodeURI(link));
	$("#landing-area .subbtn-text").html('Copie seu convite: <span class="auto-select">' + link + '</span>');

	var front = document.getElementById('landing-area');
	var back_content = $("#share-flip").html();
	var back = flippant.flip(front, back_content, 'card', 'flippant-modal-dark');
	back.classList.add('flip-fix');
	//back.classList.add('share-flipcard');

	$('#banner').bind('slide.bs.carousel', back.close);
	$("#banner .carousel-control").bind("click", back.close);
	$(".share-flip .toggle-btn").bind("click", back.close);
	$(".share-flip .invite-link").html(link);

	bindUpdates();

	//gambiarrinha para ficar responsivo
	$(window).bind("resize", function() {
		back.style.top=front.offsetTop+"px";
		back.style.left=front.offsetLeft+"px";
		back.style["min-height"]=front.offsetHeight+"px";
		back.style.width=front.offsetWidth+"px";
		
		setTimeout(function() {
			back.style.top=front.offsetTop+"px";
			back.style.left=front.offsetLeft+"px";
			back.style["min-height"]=front.offsetHeight+"px";
			back.style.width=front.offsetWidth+"px";
		}, 0200);
	});
}

function selectText(element) {
    if (document.body.createTextRange) { // ms
        var range = document.body.createTextRange();
        range.moveToElementText(element);
        range.select();
    } else if (window.getSelection) { // moz, opera, webkit
        var selection = window.getSelection();            
        var range = document.createRange();
        range.selectNodeContents(element);
        selection.removeAllRanges();
        selection.addRange(range);
    }
}

function bindUpdates() {
	$(".auto-select").unbind("hover");
	$(".auto-select").hover(function() {
		selectText(this);
	});

	$(".auto-select").unbind("click");
	$(".auto-select").click(function() {
		selectText(this);
		return false;
	});

	$(".fake-link").unbind("click");
	$(".fake-link").bind("click", function() {
		window.open($(this).attr("href"), $(this).attr("target"));
	});
}

function updateUserDetails() {
	if(!(allmej.user.id)) return false;

	$.get("http://allmej.com/allmej/public/newsletter/"+allmej.user.id, function(data) {
		debug(data);
		allmej.user = $.extend({}, allmej.user, data.Data);

		//atualiza contagem de ejs convidas
		$(".share-flip .counter .count").text(allmej.user.references);

		return true;
	}, "json");
}