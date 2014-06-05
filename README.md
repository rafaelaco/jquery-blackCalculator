# blackCalculator 1.0

blackCalculator is a jQuery plugin for create a calculator. It supports
CSS customization, easy translation, two options of calculators, cross-browser,
allow and disallow keyboard!

## Usage

First, include all the dependencies in your head tag:

```html
<script type="text/javascript" src="jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="jquery.blackcalculator-1.0.1.min.js"></script>
```

Make sure that: black_calculator.css, black_calculator_ie.css and PIE.htc are inside the folder "css/" (you can change the folder with the parameter called "css")

Now we call the method "blackCalculator" on an empty DIV, with only one line will be running your calculator:

```html
<div class="calculator"></div>
<script type="text/javascript">
$(document).ready(function(){
   $('.calculator').blackCalculator();
});
</script>
```

Example call by changing the parameters:
```html
<div class="calculator"></div>
<script type="text/javascript">
$(document).ready(function(){
   var langs = {value: 'Valor', clear: 'Limpar', backspace: 'Voltar'};
   $('.calculator').blackCalculator({type:'advanced', allowKeyboard:true, css:'styles/', language:langs});
});
</script>
```

## Options
Now know all the parameters to use blackCalculator:

  Name                | Type                                  | Default          | Description
----------------------|---------------------------------------|------------------|-------------
 `type`               | String                                | 'simple'         | It is a string representing the version of the calculator that the plugin should display: simple or advanced. Possible values ​​are "simple" and "advanced".
 `allowKeyboard`      | Boolean                               | false            | Specifies whether the plugin should let the user "type" (the plugin validates entries) in the calculator or just allows it to click the buttons on the calculator.
 `cssManual`          | Boolean                               | false            | Specifies whether the plug-in must put the files automatically or not, and allows files ".css" and ".htc" are placed manually.
 `css`                | String                                | 'css/'           | If the files ".css" and ".htc" are placed automatically by the plugin, this parameter defines the folder where the plugin will scan the files.
 `language`           | Object                                | {value: 'Value', backspace: 'Backspace', clear: 'Clear', error: 'Error message' }           | To set a few words of the calculator plugin search this object.

## Examples

Folders: example_1 and example_2

## Changelog

blackCalculator 1.0.1 - Enter comma from a keyboard. Custom error messages (issue #2) - Thanks a lot Svechnikov (Sergey) for that code!
blackCalculator 1.0 - Press enter action (issue #1)


## License

© Copyright 2012 Rafael Carvalho Oliveira - http://www.blackhauz.com.br/

Dual licensed under the MIT or GPL Version 2 licenses

## Credits

Credits to PHPJS project! Two functions have helped my development:

http://phpjs.org/functions/in_array:432

http://phpjs.org/functions/strpos:545

Credits to CSS3 PIE project: http://css3pie.com/
