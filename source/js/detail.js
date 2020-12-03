let CommentManager = (function ($) {

    let CommentManager = {
        init: function (postId, comment) {
            CommentManager.initComment(postId, comment);
            CommentManager.bindEvent(postId);
        },
        initComment: function (postId, comment) {
            $("#comment-container").BeautyComment({
                title: "评论",
                subTitle: "最新评论",
                baseUrl: "/admin/assets/custom/",
                listUrl: "/commentList.json",
                sendUrl: "/auth/sendComment.json",
                wrapClass: "post-block",
                canComment: comment,
                ajaxParams: {postId: postId, pageNum: 1, pageSize: 10},
                listHandler: function (resp) {
                    return {
                        totalNum: resp.data.totalNum,
                        commentList: resp.data.commentList,
                        commentShowType: resp.data.commentShowType
                    }
                },
                sendHandler: function (resp) {
                    return {
                        success: resp.success,
                        message: resp.message
                    };
                }
            });
        },
        bindEvent: function (postId) {
            // 点赞
            $("#priseBtn").on("click",function () {
                if (sessionStorage.getItem("hasPrize" + postId)) {
                    return;
                }

                $.post("/praisePost/" + postId, null, function (resp) {
                    if (resp.success) {
                        $("#prizeCount").text(resp.data);
                        sessionStorage.setItem("hasPrize" + postId, "y");
                    }
                },"json");

            });
        }
    };

    // 分享
    $("#shareOpenBtn").on("click",function () {
        let shareBtns = $("#shareBtns");
        if (shareBtns.hasClass("share-open")) {
            shareBtns.removeClass("share-open");
        } else {
            shareBtns.addClass("share-open");
        }
    });

    return {
        init: CommentManager.init
    }

})(jQuery);