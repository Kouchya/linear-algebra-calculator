const mat_tbl = require("../library/mat_tbl.js")

document.getElementById("resize-btn").addEventListener("click", () => {
	var matrix = document.getElementById("matrix")
	
	var row = document.getElementById("row").value
	var col = document.getElementById("col").value

	if (isNaN(row) || isNaN(col)) {
		msg = document.getElementById("error-msg")
		msg.innerHTML = "「“行数”和“列数”都带个“数”，据我所知，是有它的道理的。」\nby 沃兹·基硕德"
		$("#errorAlert").modal({
			show: true,
            focus: true,
            keyboard: true
		})
		return
	}

	if (row <= 0 || row > 6 || col <= 0 || col > 6) {
		msg = document.getElementById("error-msg")
		msg.innerHTML = "「机器并非全知全能的神，我就曾听见它们抱怨矩阵的行数或列数不是1~6之间的整数。」\nby 沃兹·基硕德"
		$("#errorAlert").modal({
			show: true,
            focus: true,
            keyboard: true
		})
		return
	}

	row = Number(row)
	col = Number(col)

	mat_tbl.resize_matrix(matrix, row, col)
})
