const except = require("./exceptions.js")

module.exports = {
    resize_matrix: function(matrix, row, col)
    {
        var regex = /^[1-9][0-9]*$/
        if (!regex.test(row) || !regex.test(col)) {
            throw new except.UserInputException(`我必须指出这非常诡异。——我是说，你总没见过一个行数和列数不是正整数的矩阵吧？`)
        }

        row = Number(row)
        col = Number(col)

        if (row > 6 || col > 6) {
            throw new except.UserInputException(`这些系统个个都是事儿精，我前不久还听见它们抱怨矩阵的行数或列数大于6。真6，不是吗？`)
        }

        const cell_text = '<input class="input-block-level" type="text" value="0">'

        var rows = matrix.rows
        var raw_row = rows.length
        var raw_col = rows[0].cells.length
    
        if (row > raw_row) {
            for (var i = raw_row; i < row; i++) {
                var new_row = matrix.insertRow(i)
                for (var j = 0; j < raw_col; j++) {
                    var cell = new_row.insertCell(j)
                    cell.innerHTML = cell_text
                }
            }
        } else if (row < raw_row) {
            for (var i = raw_row - 1; i > row - 1; i--) {
                matrix.deleteRow(i)
            }
        }
    
        if (col > raw_col) {
            for (var i = 0; i < matrix.rows.length; i++) {
                var current_row = matrix.rows[i]
                for (var j = raw_col; j < col; j++) {
                    var cell = current_row.insertCell(j)
                    cell.innerHTML = cell_text
                }
            }
        } else if (col < raw_col) {
            for (var i = 0; i < matrix.rows.length; i++) {
                var current_row = matrix.rows[i]
                for (var j = raw_col - 1; j > col - 1; j--) {
                    current_row.deleteCell(j)
                }
            }
        }
    
        for (var i = 0; i < matrix.rows.length; i++) {
            var current_row = matrix.rows[i]
            for (var j = 0; j < current_row.cells.length; j++) {
                var cell = current_row.cells[j]
                rate = raw_col / current_row.cells.length
                cell.style.width *= rate
            }
        }
    }
}