"use strict";

var global = this;

use(function () {

    var rootPage = currentPage.getAbsoluteParent(1);	// /content/wefinance
    var level1Page = currentPage.getAbsoluteParent(2);	// /content/wefinance/<language>
    var level2Page = currentPage.getAbsoluteParent(3);	// /content/wefinance/<language>/personal...
    var level3Page = currentPage.getAbsoluteParent(4);

    return {
        rootPage: rootPage,
        level1Page: level1Page,
        level2Page: level2Page,
        level3Page: level3Page
    };
});
