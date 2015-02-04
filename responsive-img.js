/*
// @name: Responsive-img.js
// @version: 1.1
// 
// Copyright 2013-2014 Koen Vendrik, http://kvendrik.com
// Licensed under the MIT license
//
// Container responsive - Paul Browne, http://paulbrowne.fi
*/
	function makeImagesResponsive(){
		var images = document.getElementsByTagName('body')[0].getElementsByTagName('img');
		if( images.length === 0 ){
			return;
		}
		var hasAttr;
		if(!images[0].hasAttribute){
			hasAttr = function(el, attrName){
				return el.getAttribute(attrName) !== null;
			};
		} else {
			hasAttr = function(el, attrName){
				return el.hasAttribute(attrName);
			};
		}
		var retina = window.devicePixelRatio ? window.devicePixelRatio >= 1.2 ? 1 : 0 : 0;
		for (var i = 0; i < images.length; i++) {
			var image = images[i],
			    imageport = image.parentNode.offsetWidth;
			var srcAttr = ( retina && hasAttr(image, 'data-src2x') ) ? 'data-src2x' : 'data-src';
			var baseAttr = ( retina && hasAttr(image, 'data-src-base2x') ) ? 'data-src-base2x' : 'data-src-base';
			if( !hasAttr(image, srcAttr) ){
				continue;
			}
			var basePath = hasAttr(image, baseAttr) ? image.getAttribute(baseAttr) : '';
			var queries = image.getAttribute(srcAttr);
				var queries_array = queries.split(',');
			for(var j = 0; j < queries_array.length; j++){
				var query = queries_array[j].replace(':','||').split('||');
				var condition = query[0];
				var response = query[1];
				var conditionpx;
				var bool;
				if(condition.indexOf('<') !== -1){
					conditionpx = condition.split('<');
					if(queries_array[(j -1)]){
						var prev_query = queries_array[(j - 1)].split(/:(.+)/);
						var prev_cond = prev_query[0].split('<');
						bool =  (imageport <= conditionpx[1] && imageport > prev_cond[1]);
					} else {
						bool =  (imageport <= conditionpx[1]);
					}
				} else {
					conditionpx = condition.split('>');
					if(queries_array[(j +1)]){
						var next_query = queries_array[(j +1)].split(/:(.+)/);
						var next_cond = next_query[0].split('>');
						bool = (imageport >= conditionpx[1] && imageport < next_cond[1]);
					} else {
						bool = (imageport >= conditionpx[1]);
					}
				}
				if(bool){
					var isCrossDomain = response.indexOf('//') !== -1 ? 1 : 0;
					var new_source;
					if(isCrossDomain === 1){
						new_source = response;
					} else {
						new_source = basePath + response;
					}
					if(image.src !== new_source){
						image.setAttribute('src', new_source);
					}
					break;
				}
			}
		}
	}
if(window.addEventListener){
	window.addEventListener('load', makeImagesResponsive, false);
	window.addEventListener('resize', makeImagesResponsive, false);
} else {
	window.attachEvent('onload', makeImagesResponsive);
	window.attachEvent('onresize', makeImagesResponsive);
}
