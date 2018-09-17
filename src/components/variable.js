const math = require("mathjs")
const mat_tbl = require("../library/mat_tbl.js")
const util = require("./doc_util.js")

var vars = {}

document.getElementById("save-btn").addEventListener("click", () => {
    varname = document.getElementById("variable").value
    regex = /^[a-zA-Z_]\w*$/
    if (!regex.test(varname)) {
        msg = document.getElementById("error-msg")
        msg.innerHTML = "「变量是一类多事儿的物种，它们非要让自己的名字以字母、数字或下划线组成，并且第一个字符还不能是数字。」\nby 沃兹·基硕德"
        $("#errorAlert").modal({
            show: true,
            focus: true,
            keyboard: true
        })
        return
    }

    const [matrix, row, col] = util.get_matrix(false)

    vars[varname] = matrix

    document.getElementById("save-hint").innerHTML = "存储矩阵到变量 " + varname + " 成功！"
})

document.getElementById("load-btn").addEventListener("click", () => {
    varname = document.getElementById("variable").value
    regex = /^[a-zA-Z_]\w*$/
    if (!regex.test(varname)) {
        msg = document.getElementById("error-msg")
        msg.innerHTML = "「变量是一类多事儿的物种，它们非要让自己的名字以字母、数字或下划线组成，并且第一个字符还不能是数字。」\nby 沃兹·基硕德"
        $("#errorAlert").modal({
            show: true,
            focus: true,
            keyboard: true
        })
        return
    }

    if (!(varname in vars)) {
        msg = document.getElementById("error-msg")
        msg.innerHTML = "「我相信存储器的记忆是强大而准确的，但它的确告诉我它不记得有哪个变量叫这么一个名字。」\nby 沃兹·基硕德"
        $("#errorAlert").modal({
            show: true,
            focus: true,
            keyboard: true
        })
        return
    }

    matrix = vars[varname]
    util.display(matrix)

    document.getElementById("save-hint").innerHTML = ""
})