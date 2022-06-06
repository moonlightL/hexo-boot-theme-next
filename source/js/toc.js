function tocHelper(el, className) {
    let headingsMaxDepth = 6;
    let arr = ['h2', 'h3', 'h4', 'h5', 'h6'];
    let headingsSelector = arr.slice(0, headingsMaxDepth).join(',');
    let headings = $("#" + el).find(headingsSelector);

    if (!headings.length) return '';

    let listNumber = false;
    let result = '<ol class='+className+'>';
    let lastNumber = [0, 0, 0, 0, 0, 0];
    let firstLevel = 0;
    let lastLevel = 0;
    let i = 0;

    headings.each(function(index, domEle) {

        if (!$(domEle).hasClass("post-title")) {
            let level = arr.indexOf(this.localName) + 1;
            let text = $(this).text();
            let id = $(this).attr("id") || text.replace(/\s+/g,"-");
            $(domEle).attr("id", id);

            lastNumber[level - 1]++;

            for (i = level; i <= 5; i++) {
                lastNumber[i] = 0;
            }

            if (firstLevel) {
                for (i = level; i < lastLevel; i++) {
                    result += '</li></ol>';
                }

                if (level > lastLevel) {
                    result += '<ol class="'+className+'-child">';
                } else {
                    result += '</li>';
                }
            } else {
                firstLevel = level;
            }

            result += '<li class="'+className+'-item '+className+'-level-'+level+'">';
            result += '<a class="'+className+'-link" href="#'+id+'">';

            if (listNumber) {
                result += '<span class="'+className+'-number">';

                for (i = firstLevel - 1; i < level; i++) {
                    result +=lastNumber[i];
                }

                result += '</span> ';
            }

            result += '<span class="'+className+'-text">'+text+'</span></a>';

            lastLevel = level;
        }

    });

    for (i = firstLevel - 1; i < lastLevel; i++) {
        result += '</li></ol>';
    }

    return result;
}