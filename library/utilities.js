module.exports = {
    subrange: function(n, censor_list) {
        var list = new Array()
        for (var i = 0; i < n; i++) {
            if (censor_list.indexOf(i) < 0) {
                list.push(i)
            }
        }
        return list
    }
}