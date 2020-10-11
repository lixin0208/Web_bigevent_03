$(function () {
    // 1.初始化文章分类列表
    initArtCateList();
    // 封装初始化文章分类列表
    function initArtCateList() {
        $.ajax({
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg("获取文章分类失败！");
                }
                // console.log(res);
                var htmlStr = template('tpl-table', res);
                $("tbody").html(htmlStr);
            }
        })
    };

    // 2.显示添加列表
    var layer = layui.layer;
    $("#btnAdd").on("click", function () {
        // 利用框架代码，显示添加区域
        indexAdd = layer.open({
            type: 1,
            title: '添加文章分类',
            area: ['500px', '260px'],
            content: $("#dialog-add").html()
        })
    });

    // 3.添加文章分类（事件代理）
    var indexAdd = null;
    $("body").on("submit", '#form-add', function (e) {
        e.preventDefault();
        // 添加文章分类发送ajax
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                // 1.提示成功，重新获取文章分类，关闭添加区域
                layer.msg("恭喜您，添加文章分类成功！");
                initArtCateList();
                layer.close(indexAdd);
            }
        })
    })

    // 4.显示修改区域
    var indexEdie = null;
    $("tbody").on("click", '.btn-edit', function () {
        indexEdie = layer.open({
            type: 1,
            title: '修改文章分类',
            area: ['500px', '260px'],
            content: $("#dialog-edit").html()
        })
        // 获取id
        var id = $(this).attr("data-id");
        $.ajax({
            url: "/my/article/cates/" + id,
            success: function (res) {
                layui.form.val("form-edit", res.data);
            }
        })
    })

    // 5.修改
    $("body").on("submit", "#form-edit", function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("更新用户失败！")
                }
                // 重新获取，关闭弹出层，提示
                layer.msg("更新用户成功！")
                initArtCateList();
                layer.close(indexEdie)
            }
        })
    })

    // 6.删除
    $("tbody").on("click", '.btn-delete', function () {
        // 先获取id，后面进入对话框，this的指向就不一定是按钮了
        var id = $(this).attr("data-id");
        // 弹出询问框
        layer.confirm('是否确认删除?', { icon: 3, title: '提示' }, function (index) {
            //do something
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message);
                    }
                    // 提示，关闭对话框，刷新页面
                    layer.msg("删除文章分类成功！")
                    layer.close(index);
                    initArtCateList();
                }
            })
        });
    })

})