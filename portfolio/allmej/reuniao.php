<?php
function strzero($number, $lenght) {
	return str_pad($number, $lenght, "0", STR_PAD_LEFT);
}
?>
<h1>Horário para reunião</h1>
<h2>Em breve</h2>
<?php die; ?>
<style type="text/css">
#horarios thead tr th:nth-child(1) {
	text-align: left;
}

#horarios thead tr th {
	text-align: center;
}

#horarios tr td:nth-child(even) {
	background-color: #eee;
}

#horarios tbody tr td:nth-child(1) {
	width: 30%;
	height: 50px;
	line-height: 40px;
}

#horarios tbody tr td {
	width: 10%;
	height: 25px;
}
</style>

<div class="col-lg-5">
	<h2>Cruzamento de horários</h2>
	<table id="horarios" class="table table-hover table-condensed">
		<thead>
			<tr>
				<th>Horário</th>
				<th>dom</th>
				<th>seg</th>
				<th>ter</th>
				<th>qua</th>
				<th>qui</th>
				<th>sex</th>
				<th>sab</th>
			</tr>
		</thead>

		<tbody>
			<?php 
			for($horario = 8; $horario < 18; $horario += 1) {
				/*$h1 	= str_pad(floor($horario), 2, "0", STR_PAD_LEFT);
				$m1 	= str_pad(($horario - $h1) * 60, 2, "0", STR_PAD_LEFT);
				$h2 	= str_pad(floor($horario+0.5), 2, "0", STR_PAD_LEFT);
				$m2 	= str_pad(($horario+0.5 - $h2) * 60, 2, "0", STR_PAD_LEFT);*/
			?>
			<tr>
				<td rowspan="2"><?php echo strzero($horario, 2)."h às ".strzero(($horario+1), 2)."h"; ?></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
			</tr>

			<tr>
				<td class="hidden"></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
			</tr>

			<?php } ?>
		</tbody>
	</table>
</div>

<div class="col-lg-7">
	<h2>Pessoas</h2>
</div>