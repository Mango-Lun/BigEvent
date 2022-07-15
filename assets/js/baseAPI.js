// 每次调用 $.get() $.post() $.ajax() 的时候,
// 会先调用 ajaxPrefilter 这个函数,在这个函数中,
// 可以拿到我们给 Ajax 提供的配置对象
$.ajaxPrefilter(function (options) {
    // 在发起真正的 Ajax 请求之前,统一拼接请求的根路径
    options.url = 'http://www.liulongbin.top:3007' + options.url

    // 统一为有权限的接口，设置请求头 headers
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    // 挂载全局统一 complete 函数
    options.complete = function (res) {
        if (res.responseJSON.status === 1 || res.responseJSON.message === '身份认证失败!') {
            // 强制清空 token
            localStorage.removeItem('token')
            // 强制跳转到登录页面
            location.href = '/login.html'
        }
    }
})