let CommentManager = (function ($) {

    let CommentManager = {
        init: function (nickname, postId, comment) {
            $("#comment-container").BeautyComment({
                title: "评论",
                subTitle: "最新评论",
                bloggerName: nickname,
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
        }
    };

    return {
        init: CommentManager.init
    }

})(jQuery);