const math = require("mathjs")

module.exports = {
    subrange: function(n, censor_list) {
        var list = new Array()
        for (var i = 0; i < n; i++) {
            if (censor_list.indexOf(i) < 0) {
                list.push(i)
            }
        }
        return list
    },

    verify: function(matrix) {
        try {
            for (var i = 0; i < matrix.size()[0]; i++) {
                for (var j = 0; j < matrix.size()[1]; j++) {
                    let verify_str = math.simplify(matrix.subset(math.index(i, j)))
                }
            }
        } catch (e) {
            if (e instanceof SyntaxError) {
                return 1
            } else {
                return -1
            }
        }
        return 0
    },

    simplify: function(expr) {
        expr = math.simplify(expr).toString()
    }
}