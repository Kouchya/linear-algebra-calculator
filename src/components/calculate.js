const math = require("mathjs")
const calc = require("../library/mat_calc.js")
const util = require("./doc_util.js")

var operation = "none"
var op_mat = null

var bin_op_prepare = (new_op) => {
    return () => {
        const [matrix, rows, cols] = util.get_matrix()
        if (operation !== "none") {
            try {
                op_mat = calc.bin_op(op_mat, matrix, operation)
                util.display(op_mat)
                operation = new_op
            } catch (e) {
                util.error(e.msg)
            }
        } else {
            try {
                op_mat = calc.simplify(matrix, true)
                operation = new_op
            } catch (e) {
                util.error(e.msg)
            }
        }
    }
}

document.getElementById("add-calc-btn").addEventListener("click", bin_op_prepare("add"))

document.getElementById("sub-calc-btn").addEventListener("click", bin_op_prepare("sub"))

document.getElementById("mtp-calc-btn").addEventListener("click", bin_op_prepare("multiply"))

document.getElementById("sqr-calc-btn").addEventListener("click", () => {
    const [matrix, rows, cols] = util.get_matrix()
    try {
        let _matrix = calc.sqr(matrix)
        util.display(_matrix)
    } catch (e) {
        util.error(e.msg)
    }
})

document.getElementById("cub-calc-btn").addEventListener("click", () => {
    const [matrix, rows, cols] = util.get_matrix()
    try {
        let _matrix = calc.cub(matrix)
        util.display(_matrix)
    } catch (e) {
        util.error(e.msg)
    }
})

document.getElementById("neg-calc-btn").addEventListener("click", () => {
    const [matrix, rows, cols] = util.get_matrix()
    try {
        let _matrix = calc.neg(matrix)
        util.display(_matrix)
    } catch (e) {
        util.error(e.msg)
    }
})

document.getElementById("eql-calc-btn").addEventListener("click", () => {
    const [matrix, rows, cols] = util.get_matrix()
    if (operation === "none") {
        try {
            op_mat = calc.simplify(matrix)
            util.display(op_mat)
        } catch (e) {
            util.error(e.msg)
        }
    } else {
        try {
            op_mat = calc.bin_op(op_mat, matrix, operation)
            util.display(op_mat)
            operation = "none"
        } catch (e) {
            util.error(e.msg)
        }
    }
})

document.getElementById("ac-btn").addEventListener("click", () => {
    const [matrix, rows, cols] = util.get_matrix()
    let _matrix = math.matrix(math.zeros([rows, cols]))
    util.display(_matrix)
    operation = "none"
})

document.getElementById("det-calc-btn").addEventListener("click", () => {
    const [matrix, rows, cols] = util.get_matrix()
    try {
        var d = calc.det(matrix)
        var output_layer = document.getElementById("output")
        output_layer.value = d
    } catch (e) {
        console.log(e)
        util.error(e.msg)
    }
})

document.getElementById("tr-calc-btn").addEventListener("click", () => {
    const [matrix, rows, cols] = util.get_matrix()
    try {
        var tr = calc.tr(matrix)
        var output_layer = document.getElementById("output")
        output_layer.value = tr
    } catch (e) {
        util.error(e.msg)
    }
})