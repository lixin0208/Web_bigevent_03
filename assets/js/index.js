// 入口函数
$(function () {
    // 1.获取用户信息
    getUserInfo();

    // 2.退出登录功能
    $("#btnLogout").on("click", function () {
        // 带图标的询问
        layer.confirm('是否确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 1.删除本地存储中的token
            localStorage.removeItem("token");
            // 2.页面跳转
            location.href = '/login.html';
            // layui自己提示框提供的关闭功能
            layer.close(index);
        });
    })
});

// 获取用户信息封装函数
//   注意：位置写道入口函数外面，后面代码中要使用这个方法，但是要求这个方法是一个全局函数；
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // // 配置请求头信息： headers
        // headers: {
        //     Authorization: localStorage.getItem("token") || ""
        // },
        success: function (res) {
            // console.log(res)
            if (res.status !== 0) {
                return layui.layer.msg(res.message);
            }
            // 渲染用户头像
            renderAvatar(res.data);
        },

        // // 无论成功或者失败，都是触发complete方法
        // complete: function (res) {
        //     console.log(res)
        //     // 判断，如果是身份认证失败，跳转回登录页面
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
        //         // 1.删除本地token
        //         localStorage.removeItem("token");
        //         // 2.页面跳转
        //         location.href = '/login.html';
        //     }
        // }

    });
}

// 渲染用户
function renderAvatar(user) {
    // 1.获取用户名
    var name = user.nickname || user.username;
    // 2.渲染用户名
    $("#welcome").html("欢迎&nbsp;&nbsp;" + name);
    // 3.渲染头像
    if (user.user_pic !== null) {
        $(".layui-nav-img").show().attr('src', user.user_pic)
        $(".text-avatar").hide();
    } else {
        $(".layui-nav-img").hide();
        var first = name[0].toUpperCase();
        $(".text-avatar").show().html(first);
    }
}

