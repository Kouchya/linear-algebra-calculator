const math = require("mathjs")
const mat_tbl = require("../library/mat_tbl.js")

module.exports = {
    get_matrix: function(add_parents = true)
    {
        var matrix_table = document.getElementById("matrix")
        var rows = matrix_table.rows.length
        var cols = matrix_table.rows[0].cells.length
        var matrix = math.zeros(rows, cols)
        for (var i = 0; i < rows; i++) {
            for (var j = 0; j < cols; j++) {
                var cell = matrix_table.rows[i].cells[j]
                var input = cell.getElementsByTagName("input")[0].value
                if (input === "") {
                    cell.getElementsByTagName("input")[0].value = "0"
                    input = "0"
                }
                if (add_parents) {
                    input = "(" + input + ")"
                }
                matrix = math.subset(matrix, math.index(i, j), input)
            }
        }
        return [matrix, rows, cols]
    },

    display: function(matrix)
    {
        const [row, col] = matrix.size()
        var matrix_table = document.getElementById("matrix")
        mat_tbl.resize_matrix(matrix_table, row, col)
        for (var i = 0; i < row; i++) {
            var current_row = matrix_table.rows[i]
            for (var j = 0; j < col; j++) {
                var cell = matrix_table.rows[i].cells[j]
                var input = matrix.subset(math.index(i, j))
                //input = math.rationalize(math.simplify(input).toString()).toString()
                cell.getElementsByTagName("input")[0].value = input
            }
        }
    },

    error: function(err_msg)
    {
        msg = document.getElementById("error-msg")
        msg.innerHTML = err_msg
        $("#errorAlert").modal({
            show: true,
            focus: true,
            keyboard: true
        })
    }
}
