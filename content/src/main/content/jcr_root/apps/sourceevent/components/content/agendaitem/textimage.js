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
 * Text and Image component JS Use-api script
 */
use(["/libs/wcm/foundation/components/utils/AuthoringUtils.js",
     "/libs/sightly/js/3rd-party/q.js"], function (AuthoringUtils, Q) {

    var hex2rgb = function ( colour, alphaDec ) {
      if ( colour.charAt(0) == '#' ) {
        colour = colour.substr(1);
      }
      $int = parseInt(colour, 16);
      return "rgba(" + (0xFF & ($int >> 0x10)) + "," + (0xFF & ($int >> 0x8)) + "," + (0xFF & $int) + "," + alphaDec/100;
    };

    var textimage = {};
    
    var CONST = {
        PROP_ALIGNMENT: "alignment",
        PROP_TEXT: "text",
        PROP_TEXTCOLOR: "textcolor",
        PROP_LEFT: "left",
        PROP_TOP: "top",
        PROP_BGOPACITY: "bgopacity",
        PROP_BGCOLOR: "bgcolor",
        PROP_IMAGEMARGIN: "imagemargin",
		PROP_TITLE: "agendatitle",
		PROP_AGENDASPEAKER: "agendaspeaker"
    };
    
    // The container CSS class name is what defines the alignment
    textimage.alignment = granite.resource.properties[CONST.PROP_ALIGNMENT]
            || currentStyle.get(CONST.PROP_ALIGNMENT, "");


    var hasContentDeferred = Q.defer();
    if (granite.resource.properties[CONST.PROP_TEXT]) {
        hasContentDeferred.resolve(true);
    }
    granite.resource.resolve(granite.resource.path + "/image").then(function (imageResource) {
        if (imageResource.properties["fileReference"]) {
            hasContentDeferred.resolve(true);
        } else {
            granite.resource.resolve(granite.resource.path + "/image/file").then(function (localImage) {
                hasContentDeferred.resolve(true);
            }, function () {
                hasContentDeferred.resolve(false);
            });
        }
    }, function () {
        hasContentDeferred.resolve(false);
    });
    
    // TODO: change currentStyle to wcm.currentStyle
    // Adding the constants to the exposed API
    textimage.CONST = CONST;

    textimage.isTouch = AuthoringUtils.isTouch;

    textimage.hasContent = hasContentDeferred.promise;

    textimage.textColor = granite.resource.properties[CONST.PROP_TEXTCOLOR];

    textimage.agendatitle = granite.resource.properties[CONST.PROP_TITLE];
    textimage.agendaspeakername = granite.resource.properties[CONST.PROP_AGENDASPEAKER];

    if (textimage.textColor) {
        textimage.textColor = '#'+textimage.textColor;
    } else {
        textimage.textColor = 'inherit';
    }

    textimage.top = granite.resource.properties[CONST.PROP_TOP];

    if (textimage.top) {

    } else {
        textimage.top = '0';
    }

    textimage.left = granite.resource.properties[CONST.PROP_LEFT];

    if (textimage.left) {

    } else {
        textimage.left = '0';
    }

    var bgColor = granite.resource.properties[CONST.PROP_BGCOLOR];
	var bgopacity = granite.resource.properties[CONST.PROP_BGOPACITY];
         
    if (bgColor && bgopacity && bgopacity>0 ) {
        textimage.bgColor = hex2rgb(bgColor, bgopacity) ;
    } else {
        textimage.bgColor = 'rgba(0,0,0,0)';
    }

    if (bgColor && bgopacity && (bgopacity>0 && bgopacity<100) ) {
		textimage.blur = true;
    } else {
        textimage.blur = false;
    }

    textimage.imageMargin =  granite.resource.properties[CONST.PROP_IMAGEMARGIN];
    if (textimage.imageMargin) {

    } else {
		textimage.imageMargin = "inherit";
    }

    var uuid = "id_";
    var p = String(granite.resource.path);
    for(var i = 0; i < p.length; i++) {
        var code = p.charCodeAt(i);
        if ( p.charAt(i) == '_' || p.charAt(i) == '-' || p.charAt(i) == '.'
            	|| ((code >= 65) && (code <= 90)) 
            	|| ((code >= 97) && (code <= 122))
                || ((code >= 30) && (code <= 39))
        ) {
        	// it is a char permit in javascript id
			uuid += p.charAt(i);
        } else {
			uuid += '_';
        }
    }
    textimage.uuid = uuid;

    return textimage;

});