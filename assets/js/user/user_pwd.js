// 入口函数
$(function () {
    // 1.定义验证规则
    var form = layui.form;
    form.verify({
        // 所有的密码验证规则
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        // 新旧密码不能相同
        samePwd: function (value) {
            var v2 = $("[name=oldPwd]").val();
            if (value === v2) {
                return '新旧密码不能相同！'
            }
        },
        // 新密码和确认密码不一致问题
        rePwd: function (value) {
            var v3 = $("[name=newPwd]").val();
            if (value !== v3) {
                return '两次输入密码不一致！'
            }
        }
    })

    // 2.修改密码
    $(".layui-form").on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg("用户密码修改失败！")
                }
                layui.layer.msg("恭喜您，密码修改成功！")
                // 原生DOM方法，重置表单
                $(".layui-form")[0].reset();
            }
        })
    })
})