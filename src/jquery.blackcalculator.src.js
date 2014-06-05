/**
 * jQuery Black Calculator
 * @name jquery.calculator.js
 * @description Calculator
 * @author Rafael Carvalho Oliveira - http://www.blackhauz.com.br/
 * @version 1.0.1
 * @update June 05, 2014
 * @date July 20, 2012
 * @copyright (c) 2012 Rafael Carvalho Oliveira - http://www.blackhauz.com.br/
 * @license Dual licensed under the MIT or GPL Version 2 licenses
 */
(function($)
{
    // ## public functions
    
    // primary function
    $.fn.blackCalculator = function(options) {
        var settings = $.extend({}, $.fn.blackCalculator.defaults, options);
		
		// whitelist
		if (settings.type == 'advanced') {
			var whiteList = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-', '+', '*', '/', '(', ')', '^', '%', '.', ','];
		} else {
			var whiteList = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-', '+', '*', '/', '.', ','];
		}
		
		// put CSS elements in head
		if (!settings.cssManual) {
			var styles = '<link rel="stylesheet" type="text/css" href="' + settings.css + 'black_calculator.css" />';
			styles += '<!--[if lt IE 9]><link rel="stylesheet" type="text/css" href="' + settings.css
			+ 'black_calculator_ie.css" />';
			styles += '<style type="text/css">';
			styles += '.blackCalculator a, .blackCalculator, .blackCalculator form input[type=text] { behavior:url("' + settings.css
			+ 'PIE.htc"); position:relative; }';
			styles += '</style><![endif]-->';
			
			$('head').append(styles);
		}
        
        // put itens inside element
        var form = '<form method="post" action="javascript:void(0)" id="blackCalculatorForm"><fieldset>';
		form += '<label for="blackCalculator">' + settings.language.value + '</label>';
        form += '<input type="text" name="blackCalculator" id="blackCalculator"/></fieldset></form>';
        
        $(this).addClass('blackCalculator');
        $(this).prepend(form);
		
		// line 1
		var lines = '<a href="javascript:void(0)" title="' + settings.language.backspace
		+ '" style="width:58px; margin:0;" rel="<">&lArr;</a>';
		
		if (settings.type == 'advanced') {
			lines += '<a href="javascript:void(0)" title="' + settings.language.clear + '" rel="c">C</a>';
			lines += '<a href="javascript:void(0)" title="(" rel="(">(</a>';
			lines += '<a href="javascript:void(0)" title=")" rel=")">)</a>';
		} else {
			lines += '<a href="javascript:void(0)" title="' + settings.language.clear + '" rel="c" style="width:101px;">' +
			settings.language.clear + '</a>';
		}
		
		// line 2
		lines += '<a href="javascript:void(0)" title="7" style="margin:0;" rel="7">7</a>';
        lines += '<a href="javascript:void(0)" title="8" rel="8">8</a>';
        lines += '<a href="javascript:void(0)" title="9" rel="9">9</a>';
		
		if (settings.type == 'advanced') {
			lines += '<a href="javascript:void(0)" title="/" rel="/">/</a>';
			lines += '<a href="javascript:void(0)" title="%" rel="%">%</a>';
		} else {
			lines += '<a href="javascript:void(0)" title="/" rel="/" style="width:57px;">/</a>';
		}
		
		// line 3
		lines += '<a href="javascript:void(0)" title="4" style="margin:0;" rel="4">4</a>';
        lines += '<a href="javascript:void(0)" title="5" rel="5">5</a>';
        lines += '<a href="javascript:void(0)" title="6" rel="6">6</a>';
		
		if (settings.type == 'advanced') {
			lines += '<a href="javascript:void(0)" title="*" rel="*">*</a>';
			lines += '<a href="javascript:void(0)" title="yx" rel="yx">y<sup>x</sup></a>';
		} else {
			lines += '<a href="javascript:void(0)" title="*" rel="*" style="width:57px;">*</a>';
		}
		
		// line 4
		lines += '<a href="javascript:void(0)" title="1" style="margin:0;" rel="1">1</a>';
        lines += '<a href="javascript:void(0)" title="2" rel="2">2</a>';
        lines += '<a href="javascript:void(0)" title="3" rel="3">3</a>';
		
		if (settings.type == 'advanced') {
			lines += '<a href="javascript:void(0)" title="-" rel="-">-</a>';
		} else {
			lines += '<a href="javascript:void(0)" title="-" rel="-" style="width:57px;">-</a>';
		}
		
        lines += '<div class="clear"></div>';
		
		// line 5
		if (settings.type == 'advanced') {
			lines += '<a href="javascript:void(0)" title="0" style="width:58px; margin:0;" rel="0">0</a>';
		} else {
			lines += '<a href="javascript:void(0)" title="0" rel="0" style="margin:0;">0</a>';
		}
		
        lines += '<a href="javascript:void(0)" title="," rel=",">,</a>';
		
		if (settings.type == 'simple') {
			lines += '<a href="javascript:void(0)" title="=" rel="=">=</a>';
		}
		
		if (settings.type == 'advanced') {
			lines += '<a href="javascript:void(0)" title="+" rel="+">+</a>';
		} else {
			lines += '<a href="javascript:void(0)" title="+" rel="+" style="width:57px;">+</a>';
		}
		
		if (settings.type == 'advanced') {
			lines += '<a href="javascript:void(0)" title="=" rel="=" style="height:40px; padding-top:35px;' +
			'position:absolute; bottom:1px; right:14px;">=</a>';
		}
		
        lines += '<div class="clear"></div>';
		
		$(this).append(lines);
		
		// calculator actions
		if (settings.allowKeyboard) {
			$('.blackCalculator').keypress(function(event) {
				var button = String.fromCharCode(event.charCode);
				var code = event.charCode;
				var value = $('#blackCalculator').val();
				
				// if press enter
				if (code == 13) {
					$('.blackCalculator a[rel="="]').trigger('click');
				} else {
					if (!inArray(whiteList, button)) {
						return false;
					}
				}
			});
		} else {
			$('#blackCalculator').keypress(function(event) {
				return false;
			});
		}
		
		$('.blackCalculator a').click(function() {
			var button = $(this).attr('rel');
			var value = $('#blackCalculator').val();
			
			if (inArray(whiteList, button)) {
				$('#blackCalculator').val(value + button);
			} else {
				if (button == 'c') {
					$('#blackCalculator').val(null);	
				} else if (button == 'yx') {
					$('#blackCalculator').val(value + '^');
				} else if (button == '<') {
					$('#blackCalculator').val(value.substr(0, value.length - 1));	
				} else if (button == '%') {
					$('#blackCalculator').val(value + '%');
				} else if (button == ',') {
					$('#blackCalculator').val(value + '.');
				} else if (button == '=') {
					try {
						// ^ replaced with Math.pow
						var powPattern = /\d+\^\d+/;
						value = value.split(',').join('.');
						while (strpos(value, '^', 0)) {
							if (powPattern.test(value)) {
								var elements = String(value.match(powPattern));
								var numbers = elements.split('^');
								
								value = value.replace(powPattern, Math.pow(numbers[0], numbers[1]));
							} else {
								break;
							}
						}
						
						// % replaced with percent
						var percentPattern = /\d+\*\d+\%/;
						while (strpos(value, '%', 0)) {
							if (percentPattern.test(value)) {
								var elements = String(value.match(percentPattern));
								var numbers = elements.split('*');
								numbers[1] = numbers[1].replace('%', '');
								
								value = value.replace(percentPattern, numbers[0] * (numbers[1] / 100));
							} else {
								break;
							}
						}
						
						percentPattern = /\d+\+\d+\%/;
						while (strpos(value, '%', 0)) {
							if (percentPattern.test(value)) {
								var elements = String(value.match(percentPattern));
								var numbers = elements.split('+');
								numbers[1] = numbers[1].replace('%', '');
								
								value = value.replace(percentPattern, parseFloat(numbers[0]) + (numbers[0] * (numbers[1] / 100)));
							} else {
								break;
							}
						}
						
						percentPattern = /\d+\-\d+\%/;
						while (strpos(value, '%', 0)) {
							if (percentPattern.test(value)) {
								var elements = String(value.match(percentPattern));
								var numbers = elements.split('-');
								numbers[1] = numbers[1].replace('%', '');
								
								value = value.replace(percentPattern, parseFloat(numbers[0]) - (numbers[0] * (numbers[1] / 100)));
							} else {
								break;
							}
						}
						
						percentPattern = /\d+\/\d+\%/;
						while (strpos(value, '%', 0)) {
							if (percentPattern.test(value)) {
								var elements = String(value.match(percentPattern));
								var numbers = elements.split('/');
								numbers[1] = numbers[1].replace('%', '');
								
								value = value.replace(percentPattern, numbers[0] / (numbers[1] / 100));
							} else {
								break;
							}
						}
						
						$('#blackCalculator').val(eval(value));
					} catch (err) {
						if (settings.language.error) {
							alert(settings.language.error);
						}
						else {
							alert(err.message);
						}
					}
				}
			}
		});
        
        return this;
    };
    
    $.fn.blackCalculator.defaults = {
        type: 'simple',
        allowKeyboard: false,
		cssManual: false,
		css: 'css/',
        language: {
            value: 'Value',
            backspace: 'Backspace',
            clear: 'Clear'
        }
    };
    
    // ## private functions
    
	// http://phpjs.org/functions/in_array:432
	function inArray(haystack, needle)
    {
		var length = haystack.length;
		for(var i = 0; i < length; i++) {
			if(haystack[i] == needle) return true;
		}
		return false;
	};
	
	// http://phpjs.org/functions/strpos:545
	function strpos(haystack, needle, offset)
    {
		var i = (haystack + '').indexOf(needle, (offset || 0));
		return i === -1 ? false : i;
	};
})(jQuery);
