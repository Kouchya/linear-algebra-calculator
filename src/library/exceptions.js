class Exception {
    constructor(raw_msg, name, id) {
        this.msg = `「${raw_msg}」\nby ${name}`
        this.id = id
    }
}

class UnknownException extends Exception {
    constructor() {
        super(`我发誓在我的鞭策下所有系统都焦头烂额地搜查了个遍，但我们仍未知道那天所看见的错误的名字。`, `沃耶·布萧德`, 0)
    }
}

class UserInputException extends Exception {
    constructor(raw_msg = `负责矩阵处理的系统表示这个矩阵的内容中有一些难以下咽的字符。好孩子可不要学它挑食哦。`) {
        super(raw_msg, `沃什哲莫·壬薇德`, 1)
    }
}

class MatrixFormException extends Exception {
    constructor(raw_msg) {
        super(raw_msg, `沃兹·基硕德`, 2)
    }
}

module.exports = {
    Exception,
    UnknownException,
    UserInputException,
    MatrixFormException
}