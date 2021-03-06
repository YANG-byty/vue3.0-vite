let verify = {
    Phone: /^1[3,5,7,8]\d{9}$/, //手机号
    Regexp: /^((\d{3,4}\-)|)\d{7,8}(|([-\u8f6c]{1}\d{1,5}))$/, //座机号 0359-00000000
    Email: /^([a-zA-Z]|[0-9])(\w)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/, //邮箱
    idCard: /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/ //身份证验证
}
export default verify;