// 入口函数
$(function () {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }
    // 1.3 创建裁剪区域
    $image.cropper(options)

    // 2.修改上传图片
    // 2.1.选择图片
    $("#btnChooseImage").on("click", function () {
        $("#file").click();
    })
    // 2.2.修改图片
    var layer = layui.layer;
    $("#file").on("change", function (e) {
        // console.log(e.target.files)
        // console.log(this.files)
        var files = e.target.files;
        if (files.length === 0) {
            return layer.msg("请选择用户头像！")
        }
        // 选择成功，修改图片
        // 1. 拿到用户选择的文件
        var file = e.target.files[0]
        // 2. 根据选择的文件，创建一个对应的 URL 地址：
        var newImgURL = URL.createObjectURL(file)
        // 3. 先销毁旧的裁剪区域，再重新设置图片路径，之后再创建新的裁剪区域：
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })

    // 3.头像上传
    $("#btnUpload").on("click", function () {
        // 3.1.获取头像
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            }).toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        console.log(typeof dataURL)
        console.log(dataURL)
        // 3.2.上传
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('头像上传失败！')
                }
                layer.msg('恭喜您，头像上传成功！')
                // 刷新父页面的头像
                window.parent.getUserInfo();
            }
        })
    })

    // 4.设置头像默认值
    // 渲染默认头像
    getUserInfo()
    function getUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                // console.log(res)
                if (res.status !== 0) {
                    return layui.layer.msg(res.message);
                }
                // 渲染用户头像
                $image.cropper('destroy')      // 销毁旧的裁剪区域
                    .attr('src', res.data.user_pic)  // 重新设置图片路径
                    .cropper(options)        // 重新初始化裁剪区域
            },
        });
    }
})