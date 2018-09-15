const math = require("mathjs")
const calc = require("../library/mat_calc.js")

function get_matrix()
{
    var matrix_table = document.getElementById("matrix")
    var rows = matrix_table.rows.length
    var cols = matrix_table.rows[0].cells.length
    if (rows != cols) {
        msg = document.getElementById("error-msg")
        msg.innerHTML = "「这个矩阵垂头丧气地声称自己没有资格拥有行列式，因为它的行数与列数并不相等。」\nby 沃兹·基硕德"
        $("#errorAlert").modal({
            show: true,
            focus: true,
            keyboard: true
        })
        return null
    }
    var matrix = math.zeros(rows, cols)
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            var cell = matrix_table.rows[i].cells[j]
            var input = cell.getElementsByTagName("input")[0].value
            matrix = math.subset(matrix, math.index(i, j), "(" + input + ")")
        }
    }
    return matrix
}

document.getElementById("det-calc-btn").addEventListener("click", () => {
    var matrix = get_matrix()
    if (matrix === null) {
        return
    }
    var d = calc.det(matrix)
    var output_layer = document.getElementById("output")
    output_layer.value = d
})