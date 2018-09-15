const math = require("mathjs")
const util = require("./utilities.js")

var k = 0

module.exports = {
    det: function determinant(matrix)
    {
        //console.log(matrix.subset(math.index(0,0)))
        var n = matrix.size()[0]
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
                ans_str += determinant(submatrix)
                ans_str += ")"
            }
        }
        if (ans_str == "") {
            ans_str = "0"
        }
        /*k++
        for (var i = 0; i < n; i++) {
            for (var j = 0; j < n; j++) {
                console.log("k=" + k + "    M[" + i + "][" + j + "]=" + matrix.subset(math.index(i, j)) + "    ans_str=" + ans_str)
            }
        }*/
        ans_str = math.rationalize(math.simplify(ans_str).toString()).toString()
        ans_str = ans_str.replace(/[\s]/g, "")
        //console.log(ans_str)
        return ans_str
    }
}