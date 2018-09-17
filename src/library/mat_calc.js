const math = require("mathjs")
const util = require("./utilities.js")
const except = require("./exceptions.js")

var k = 0

function simplify(matrix, add_parents = false)
{
    try {
        const [row, col] = matrix.size()
        for (var i = 0; i < row; i++) {
            for (var j = 0; j < col; j++) {
                var ans_str = `${math.rationalize(math.simplify(matrix.subset(math.index(i, j))).toString()).toString()}`
                if (add_parents) {
                    ans_str = "(" + ans_str + ")"
                }
                matrix = matrix.subset(math.index(i, j), ans_str)
            }
        }
        return matrix
    } catch (e) {
        if (e instanceof SyntaxError) {
            throw new except.UserInputException()
        } else {
            throw new except.UnknownException()
        }
    }
}

function neg(matrix)
{
    var verify = util.verify(matrix)
    if (verify == 1) {
        throw new except.UserInputException()
    } else if (verify == -1) {
        throw new except.UnknownException()
    }

    const [row, col] = matrix.size()
    var res = math.matrix([row, col])
    for (var i = 0; i < row; i++) {
        for (var j = 0; j < col; j++) {
            var ans_str = `-${matrix.subset(math.index(i, j))}`
            ans_str = math.rationalize(math.simplify(ans_str).toString()).toString()
            ans_str = ans_str.replace(/\s/g, "")
            res = res.subset(math.index(i, j), ans_str)
        }
    }

    return res
}

function bin_op(mat1, mat2, op)
{
    var verify = util.verify(mat2)
    if (verify == 1) {
        throw new except.UserInputException()
    } else if (verify == -1) {
        throw new except.UnknownException()
    }

    if (op === "add") {
        const [row, col] = mat1.size()
        const [row2, col2] = mat2.size()
        if (row !== row2 || col !== col2) {
            let msg = `原先的矩阵与这个矩阵尺寸不同……看来它俩极其排斥互相加在一起。`
            throw new except.MatrixFormException(msg)
        }

        var res = math.matrix([row, col])
        for (var i = 0; i < row; i++) {
            for (var j = 0; j < col; j++) {
                var ans_str = `${mat1.subset(math.index(i, j))}+${mat2.subset(math.index(i, j))}`
                ans_str = math.rationalize(math.simplify(ans_str).toString()).toString()
                ans_str = ans_str.replace(/\s/g, "")
                res = res.subset(math.index(i, j), ans_str)
            }
        }
        return res
    } else if (op === "sub") {
        const [row, col] = mat1.size()
        const [row2, col2] = mat2.size()
        if (row !== row2 || col !== col2) {
            let msg = `原先的矩阵与这个矩阵尺寸不同……看来它俩极其不愿意相减。`
            throw new except.MatrixFormException(msg)
        }
        
        try {
            return bin_op(mat1, neg(mat2), "add")
        } catch (e) {
            throw e
        }
    } else if (op === "multiply") {
        try {
            const [row, col] = mat1.size()
            const [row2, col2] = mat2.size()
            if (col !== row2) {
                let msg = `我撞见乘法系统后台在自残抗议，它身上有两个醒目的矩阵状疤痕，我十分肯定我看到前一个矩阵的列数恰好是后者的行数。`
                throw new except.MatrixFormException(msg)
            }
    
            var res = math.matrix([row, col2])
            for (var i = 0; i < row; i++) {
                for (var j = 0; j < col2; j++) {
                    var ans_str = ""
                    for (var k = 0; k < col; k++) {
                        ans_str += `+${mat1.subset(math.index(i, k))}*${mat2.subset(math.index(k, j))}`
                    }
                    ans_str = math.rationalize(math.simplify(ans_str).toString()).toString()
                    ans_str = ans_str.replace(/\s/g, "")
                    res = res.subset(math.index(i, j), ans_str)
                }
            }
            return res
        } catch (e) {
            throw e
        }
    }
    return mat1
}

function sqr(matrix)
{
    var verify = util.verify(matrix)
    if (verify == 1) {
        throw new except.UserInputException()
    } else if (verify == -1) {
        throw new except.UnknownException()
    }

    if (matrix.size()[0] !== matrix.size()[1]) {
        throw new except.MatrixFormException(`显然地，你不可能从这个矩阵身上挖掘出它的幂——它那行数与列数不等的身躯正试图把可怜的求幂符号当点心吞掉。`)
    }

    try {
        return bin_op(matrix, matrix, "multiply")
    } catch (e) {
        throw e
    }
}

function cub(matrix)
{
    var verify = util.verify(matrix)
    if (verify == 1) {
        throw new except.UserInputException()
    } else if (verify == -1) {
        throw new except.UnknownException()
    }

    if (matrix.size()[0] !== matrix.size()[1]) {
        throw new except.MatrixFormException(`显然地，你不可能从这个矩阵身上挖掘出它的幂——它那行数与列数不等的身躯正试图把可怜的求幂符号当点心吞掉。`)
    }

    try {
        let tmp = sqr(matrix)
        return bin_op(tmp, matrix, "multiply")
    } catch (e) {
        throw e
    }
}

function det(matrix)
{
    var verify = util.verify(matrix)
    if (verify == 1) {
        throw new except.UserInputException()
    } else if (verify == -1) {
        throw new except.UnknownException()
    }

    var n = matrix.size()[0]
    var m = matrix.size()[1]
    if (n !== m) {
        throw new except.MatrixFormException(`这个矩阵气急败坏地表示自己没有资格拥有行列式，因为它的行数与列数并不相等。`)
    }

    ans_str = ""
    for (var i = 0; i < n; i++) {
        host = matrix.subset(math.index(i, 0))
        if (math.simplify(host).toString() === "0") {
            continue
        }
        if (i % 2 == 0) {
            host = "+" + host
        } else {
            host = "-" + host
        }
        ans_str += host
        if (n > 1) {
            ans_str += "*("
            rows = util.subrange(n, [i])
            cols = util.subrange(n, [0])
            submatrix = matrix.subset(math.index(rows, cols))
            if (typeof(submatrix) === "string") {
                submatrix = math.matrix([[submatrix]])
            }
            ans_str += det(submatrix)
            ans_str += ")"
        }
    }
    if (ans_str == "") {
        ans_str = "0"
    }
    ans_str = math.rationalize(math.simplify(ans_str).toString()).toString()
    ans_str = ans_str.replace(/[\s]/g, "")
    return ans_str
}

function tr(matrix)
{
    var verify = util.verify(matrix)
    if (verify == 1) {
        throw new except.UserInputException()
    } else if (verify == -1) {
        throw new except.UnknownException()
    }

    var n = matrix.size()[0]
    var m = matrix.size()[1]
    if (n !== m) {
        throw new except.MatrixFormException(`这个矩阵无精打采地表示自己没有资格拥有迹，因为它的行数与列数并不相等。`)
    }

    ans_str = ""
    for (var i = 0; i < n; i++) {
        ans_str += "+" + matrix.subset(math.index(i, i))
    }
    ans_str = math.rationalize(math.simplify(ans_str).toString()).toString()
    ans_str = ans_str.replace(/[\s]/g, "")
    return ans_str
}

module.exports = {
    simplify,
    neg,
    bin_op,
    sqr,
    cub,
    det,
    tr
}