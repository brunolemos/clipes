arrPageContent = new Array();

$(document).ready(function() {
	var user = new User();
	user.login();
	
	//hide address bar
	setTimeout(function () {window.scrollTo(0, 1);}, 500);

	//ao voltar/avancar pagina no historico
	window.onpopstate = onPopState;

	$('#menu-button').bind('click', function() {
		$('#sidebar').toggleClass('opened');
	});

	$('#menu .item a').bind('click', function() {
		var rel 	= $(this).parent().attr('rel');
		var href 	= $(this).attr('href');
		window.history.replaceState({page: rel}, '', href);
		$('#sidebar').removeClass('opened');

		page = rel;
		pageChanged();

		return false;
	});


	$('#search-container').hover(function() {
		$(this).addClass('opened');
		if(!$('#input-search').val()) $('#input-search').focus();

	}, function() {
		if(!$('#input-search').val()) closeSearch();
	});

	$('#input-search').bind('click', function() {	
		if($('#input-search').val()) search();
	});

	$('#input-search').bind('keyup', function(e) {
		var input_search = this;

		if($(input_search).val()) {
			if(e.keyCode == 27) $(input_search).val(''); else search();
		} else {
			if(e.keyCode == 27) closeSearch(); else closeSearchResults();
		}
	});

	$('#input-search').bind('blur', function() {
		closeSearch();
	});
});

function closeSearchResults() {
	$('#search-results').addClass('hidden');
}

function closeSearch() {
	closeSearchResults();
	$('#search-container').removeClass('opened');
	//setTimeout(function() {$('#input-search').blur();}, 500);
}

function search() {
	$('#search-container').addClass('opened');
	$('#search-results').removeClass('hidden');
}

function onPopState(e) {
	page = e.state ? (e.state.page ? e.state.page : page) : page;
	pageChanged();
}

function pageChanged() {
	$('#menu .current').removeClass('current');
	$('#menu .item[rel=' + page + ']').addClass('current');

	loadPage(page);
};

function loadPage(page) {
	if(!page) return false;
	if(page=="error") {
		errorPage();
		return false;
	}

	//recupera valor salvo
	if(arrPageContent[page]) $("#content").html(arrPageContent[page]);

	$.ajax({
		url: page+'.php',
		type: 'GET',
		beforeSend: function() {
			$("#menu .current a").append('<span class="ajax-loading"></span>');
			$("#menu .item .ajax-loading").hide(0);
			setTimeout(function() {
				$("#menu .item .ajax-loading").show(0);
			}, 0500);
		},
		complete: function() {
			$("#menu .item .ajax-loading").remove();
		},
		success: function(data) {
			arrPageContent[page] = data;
			$("#content").html(data);
		},
		error: function() {
			errorPage();
		}
	});
}

function errorPage() {
	if(!arrPageContent["error"]) {
		$.get("error.php", function(data) {
			arrPageContent["error"] = data;
			$("#content").html(arrPageContent["error"]);
		});
	} else {
		$("#content").html(arrPageContent["error"]);
	}
}