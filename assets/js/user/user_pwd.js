$(function () {
  var form = layui.form

  form.verify({
    pass: [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'
    ],
    samePwd: function (value) {
      if (value == $('[name=oldPwd]').val()) {
        return '新旧密码不能相同'
      }
    },
    rePwd: function (value) {
      if (value !== $('[name=newPwd]').val()) {
        return '两次密码不一致'
      }
    }
  })

  $('.layui-form').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/my/updatepwd',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('更新密码失败！')
        }
        layer.msg('更新密码成功！')
        // 重置表单
        // 通过 jQuery 获取到表单元素，通过 [0] 的方式将 jQuery 元素变成原生 DOM 元素
        // 调用 reset() 函数重置表单
        $('.layui-form')[0].reset()
      }
    })
  })
})