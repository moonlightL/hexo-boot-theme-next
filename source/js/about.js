let GuestBookManager = (function ($) {

    let GuestBookManager = {
        init: function (nickname) {
            $("#comment-container").BeautyComment({
                title: "留言",
                subTitle: "最新留言",
                bloggerName: nickname,
                baseUrl: "/admin/assets/custom/",
                listUrl: "/guestBookList.json",
                sendUrl: "/auth/sendGuestBook.json",
                wrapClass: "post-block",
                ajaxParams: {pageNum: 1, pageSize: 10},
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
        init: GuestBookManager.init
    }

})(jQuery);