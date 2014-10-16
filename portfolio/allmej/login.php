<form name="form-login" id="form-login">
	<input id="input-login" type="text" name="login"/>
	<input id="input-password" type="password" name="password"/>
	<button id="button-submit">Entrar</button>
</form>

<script type="text/javascript" src="js/jquery.js"></script>
<script type="text/javascript">
$(document).ready(function() {
	$("#form-login").bind("submit", function() {
		console.log("Login...");
		var username = $("#input-login").val();
		var password = $("#input-password").val();

		$.ajax({
			url: 'http://brunolemos.org/allmej/sessao.php',
			type: 'POST',
			data: {sid: "h58n3g2ja6t0kc3ue6aseolvb3"},
			success: function(data) {
				console.log(data);
			},
			error: function(data) {
				console.log(data);
			}
		});

		return false;
	});
});
</script>