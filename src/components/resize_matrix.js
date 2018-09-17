const mat_tbl = require("../library/mat_tbl.js")
const util = require("./doc_util.js")

document.getElementById("resize-btn").addEventListener("click", () => {
	var matrix = document.getElementById("matrix")
	
	var row = document.getElementById("row").value
	var col = document.getElementById("col").value

	try {
		mat_tbl.resize_matrix(matrix, row, col)
	} catch (e) {
		util.error(e.msg)
	}
})
