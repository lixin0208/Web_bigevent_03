// 入口函数
$(function () {
    // 1.定义校验规则
    var form = layui.form;
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return "昵称长度为 1 ~ 6 个字符之间"
            }
        }
    });

    // 2.初始化用户信息
    initUserInfo();
    // 初始化用户信息封装，后面还要用；
    var layer = layui.layer;
    function initUserInfo() {
        $.ajax({
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                // console.log(res);
                form.val("formUserInfo", res.data)
            }
        })
    };

    // 3.重置表单；
    //   问题：为什么不用按钮的默认重置行为！
    //     原因：重置行为设置的是html内容value属性的值，跟js无关！
    //  给form表单绑定事件用reset事件，给按钮绑定事件用click
    $("#btnReset").on("click", function (e) {
        e.preventDefault();
        initUserInfo();
    })

    // 4.修改用户信息
    $('.layui-form').on("submit", function (e) {
        // 阻止浏览器默认行为，form表单的提交
        e.preventDefault();
        // 发送ajax，修改用户信息
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("用户信息修改失败！")
                }
                layer.msg("恭喜您，用户信息修改成功！")
                // 调用父页面中的更新用户信息和头像方法
                window.parent.getUserInfo();
            }
        })
    })
})