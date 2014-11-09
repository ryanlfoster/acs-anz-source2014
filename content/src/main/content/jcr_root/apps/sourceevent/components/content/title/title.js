/*
 * ADOBE CONFIDENTIAL
 *
 * Copyright 2014 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 */

"use strict";

/**
 * Title foundation component JS backing script
 */
use(["../utils/AuthoringUtils.js"], function (AuthoringUtils) {

    // TODO: change currentStyle to wcm.currentStyle
    
    var CONST = {
        PROP_TITLE: "jcr:title",
        PROP_PAGE_TITLE: "pageTitle",
        PROP_TYPE: "type",
        PROP_DEFAULT_TYPE: "defaultType",
        PROP_ALIGN: "alignment",
        PROP_TEXT: "text",
        PROP_RICH_FORMAT: "textIsRich",
        CONTEXT_TEXT: "text",
        CONTEXT_HTML: "html"


    }

    var title = {};
    
    // The actual title content
    title.text = granite.resource.properties[CONST.PROP_TITLE]
            || wcm.currentPage.properties[CONST.PROP_PAGE_TITLE]
            || wcm.currentPage.properties[CONST.PROP_TITLE]
            || wcm.currentPage.name;
    
    // The HTML element name
    title.element = granite.resource.properties[CONST.PROP_TYPE]
            || currentStyle.get(CONST.PROP_DEFAULT_TYPE, "");

    title.class = granite.resource.properties[CONST.PROP_ALIGN];
    
    // Adding the constants to the exposed API
    title.CONST = CONST;

    // The actual text content
    title.copy = granite.resource.properties[CONST.PROP_TEXT]
            || "";

    // Wether the text contains HTML or not
    title.context = granite.resource.properties[CONST.PROP_RICH_FORMAT]
            ? CONST.CONTEXT_HTML : CONST.CONTEXT_TEXT

   // Set up placeholder if empty
    if (!title.text) {
        title.cssClass = AuthoringUtils.isTouch
                ? "cq-placeholder"
                : "cq-text-placeholder-ipe";
        title.context = CONST.CONTEXT_TEXT;
        title.text = AuthoringUtils.isTouch
                ? ""
                : "Edit text";
    }



    return title;
    
});
