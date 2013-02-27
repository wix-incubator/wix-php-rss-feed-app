![Wix](https://dl.dropbox.com/u/427838/ui-lib/images/wix_icon.png)
# Wix 3rd Party Starter Kit

This boilerplate is aimed at helping developers in the process of getting new apps to [Wix App Market][appmarket] as quickly as possible. The UI in this project focuses on the App's Settings Panel. The boilerplate offers UI standards and common Javascript components to assist the developer in passing Product tests, and in developing a consistent and uniformed UI for the app.
[appmarket]: "http://wix.com/"

## Structure & Standards
---

#### App Intro
---

First, make an introduction. *This is compulsry according to Wix Apps product style guide.*

###### HTML
    <div class="title">
    	<div class="icon">
        	<div class="logo">
          		<span class="gloss"></span>
            </div>
        </div>

        <div class="divider"></div>
    </div>

You can simply paste your app icon in the CSS `.logo` class:

###### CSS
	.intro .icon .logo {
	  border-radius: 15px;
	  height: 100%;
	  width: 100%;
	  background: url('../../images/wix_icon.png') center;
	}
	
Or, if you're using the precompiled Less sources, neatly nested in the `.intro` block, is the `.logo` class.

###### Less (precompiled)
	.intro {
	    .logo {
			// …
			background: url('@{images}/wix_icon.png') center;
	    }
	}


#### Guest & User
---

Once your app is running, an **authenticated user mode** should come in handy. Under the `.intro` block you'll find two sections: `.guest` and `.user`. Switch the `.hidden` class between the two to accompany each these state in the app, respectively.

Guests will see the **App Intro**, a **Connect Button**, and a **Text Link** for creating a new account. 

###### Guest
	<div class="guest">
    	<div class="description">
        	<p><!-- App Description --></p>
    	</div>

    	<div class="login-panel">
        	<p class="create-account">Don't have an<br/>account? <a href="#"><strong>Create one</strong></a></p>
        	<button class="submit btn connect">Connect account</button>
    	</div>
	</div>

Authenticated users will see the details of their **Session Details** (User name, e-mail etc) and a **Text Link** for disconnecting the session.

###### User	
	<div class="user hidden">
    	<p>
        	You are now connected to <strong class="user-name">John Doe (john@doe.com)</strong> account<br/>
	        <a class="disconnect-account">Disconnect account</a>
	    </p>
    	<div class="premium">
        	<p class="premium-features">Premium features</p>
        	<button class="submit btn upgrade">Upgrade</button>
    	</div>
  	</div>
  	
If this is irrelevant to your project, simply remove this markup.

#### Box (Container)
---
Box is the basic container for Wix 3rd Party Settings panel. Boxes are for grouped controls or information blocks. Use them as you like!

    <div class="box">
        <h3>Checkboxes</h3>
        <div class="feature">
            <p>Feature description</p>
			<!-- Box content goes here -->
        </div>
    </div>

Boxes also contain the `.feature`, which styles a simple paragraph for textual information.

#### List
---
To group different controls in horizontal view, you can use the `.list` class and structure:

	 <ul class="list">
	     <li>
	         <span class="option">Option Name</span>
	         <!-- Option Markup -->
	     </li>
	 </ul>
	 
This is a simple list with the proper CSS styling to contain all the HTML and JS components offered in the starter kit and present them in a neat horizontal row.

#### Layouts Picker
---
	<div class="layouts">
	    <figure class="boxes"><figcaption class="radiobutton">Layout 1</figcaption></figure>
	    <figure class="full"><figcaption class="radiobutton">Layout 2</figcaption></figure>
	    <figure class="grid"><figcaption class="radiobutton">Layout 3</figcaption></figure>
	</div>
    
Available Layouts (`images/layouts.png`)

![Wix](https://dl.dropbox.com/u/427838/ui-lib/images/layouts.png)


## Javascript Components
===

The starter kit Javascript components are basically a set of [jQuery][jquery] Plugins.

[jquery]: http://jquery.com/

#### Accordion
---

##### Usage	        

	<div class="accordion">
	    <div class="box">
	        <h3>Title</h3>
	        <div class="feature">
	        
	        	// content goes here
	        	
	        </div>
	    </div>
	</div>

Set the Accordion parameters in `accordion.js`. In this case, `box` defines the Wrapper Class, and `feature` defines the content wrapper.

	{
		triggerClass : "box",
		contentClass : "feature"
	}

Initialize the Accordion in `settings.js`:

    $('.accordion').Accordion();

#### Color Picker
---

##### Usage

Add the following HTML Markup

    <a rel="popover" class="color-picker-1 color-selector default"></a>


Include [Twitter Bootstrap][bootstrap] components `Tooltip` and `Popover` dependencies in your main HTML file

	<script type="text/javascript" src="javascripts/bootstrap/bootstrap-tooltip.js"></script>
	<script type="text/javascript" src="javascripts/bootstrap/bootstrap-popover.js"></script>

Next, initialize your color picker on DOM ready like so:

    $('.color-selector').ColorPicker();


[bootstrap]: http://twitter.github.com/bootstrap/


#### Radio Button
---

##### Usage

Add a radio button group to your HTML file:

	<div class="radiobuttons">
		<div class="radiobutton"><p>Option 1</p></div>
		<div class="radiobutton"><p>Option 2</p></div>
		<div class="radiobutton"><p>Option 3</p></div>
	</div>

Initialize the button group and decicde which button is `checked`.

    $('.radiobuttons').Radio({ checked: 0 });


##### Nested Radio Buttons

This is another use case for radio buttons, implemented in the Layout Picker structure:

	<div class="layouts">
		<figure class="boxes"><figcaption class="radiobutton">Layout 1</figcaption></figure>
		<figure class="full"><figcaption class="radiobutton">Layout 2</figcaption></figure>
		<figure class="grid"><figcaption class="radiobutton">Layout 3</figcaption></figure>
	</div>

Next, you specifiy the nested element (`el`) of the radio button:

    $('.layouts').Radio({el: "figure figcaption", checked: 1});


#### Checkbox
---
##### Usage

Add a checkbox group (Note, one checkbox also needs to be in a wrapping group):

	<div class="checkboxes">
	   <div class="checkbox"><p>Option 1</p></div>
	   <div class="checkbox"><p>Option 2</p></div>
	   <div class="checkbox"><p>Option 3</p></div>
	</div>

Initialize checkbox, specifying `checked` checkboxes array with checkboxes 0 and 2 are:

    $('.checkboxes').Checkbox({ checked: [0,2] });


#### Slider
---
##### Usage

Add the slider markup, a simple `div` would do.

    <div id="slider1" class="slider"></div>

Initialize the Slider component with a value string.

    $('.slider').Slider({ type: "Value" });


## Less.js
===
The starter kit stylesheets are compiled from LESS sources. If you are not familiar with LESS you can find more information [here][lessjs].

[lessjs]: http://mouapp.com "Markdown editor on Mac OS X"