function convertEntities(b){var d,a;d=function(c){if(/&[^;]+;/.test(c)){var f=document.createElement("div");f.innerHTML=c;return !f.firstChild?c:f.firstChild.nodeValue}return c};if(typeof b==="string"){return d(b)}else{if(typeof b==="object"){for(a in b){if(typeof b[a]==="string"){b[a]=d(b[a])}}}}return b};


/*global google, GeoMashupLoader */
var GeoMashupLoader;

/**
 * Set client location in comment form when appropriate.
 */
google.setOnLoadCallback( function() {
	var lat_element;
	if ( google.loader.ClientLocation ) {
		lat_element = document.getElementById( 'geo_mashup_lat_input' );
		if (lat_element) {
			lat_element.value = google.loader.ClientLocation.latitude;
			document.getElementById( 'geo_mashup_lng_input' ).value = google.loader.ClientLocation.longitude;
			document.getElementById( 'geo_mashup_address_input' ).value = google.loader.ClientLocation.address.city +
				', ' + google.loader.ClientLocation.address.region + ', ' + google.loader.ClientLocation.address.country_code;
			document.getElementById( 'geo_mashup_country_code_input' ).value = google.loader.ClientLocation.address.country_code;
			document.getElementById( 'geo_mashup_locality_name_input' ).value = google.loader.ClientLocation.address.city;
		}
	}
} );

/**
 * Geo Mashup Loader object.
 *
 * Currently implements click to load feature.
 */
GeoMashupLoader = {
	addMapFrame : function (element, frame_url, height, width, name) {
		var html = ['<iframe name="'];
		element.style.backgroundImage = 'none';
		html.push(name);
		html.push('" src="');
		html.push(frame_url);
		html.push('" height="');
		html.push(height);
		html.push('" width="');
		html.push(width);
		html.push('" marginheight="0" marginwidth="0" frameborder="0" scrolling="no"></iframe>');
		element.innerHTML = html.join('');
	}
};





function getScrollY() {
    scrOfY = 0;
    if( typeof( window.pageYOffset ) == "number" ) {
        scrOfY = window.pageYOffset;
    } else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
        scrOfY = document.body.scrollTop;
    } else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
        scrOfY = document.documentElement.scrollTop;
    }
    return scrOfY;
}

jQuery(function($){
    var upprev_closed = false;
    var upprev_hidden = true;
    $(window).scroll(function() {
        var lastScreen;
        if ($("#comments").length > 0)
            lastScreen = getScrollY() + $(window).height() < $("#comments").offset().top * 0.8 ? false : true;
        else
            lastScreen = getScrollY() + $(window).height() < $(document).height() * 0.8 ? false : true;
        if (lastScreen && !upprev_closed) {
            $("#upprev_box").stop().animate({right:"0px"});
            upprev_hidden = false;
        }
        else if (upprev_closed && getScrollY() == 0) {
            upprev_closed = false;
        }
        else if (!upprev_hidden) {
            upprev_hidden = true;
            $("#upprev_box").stop().animate({right:"-400px"});
        }
    });
    $("#upprev_close").click(function() {
        $("#upprev_box").stop().animate({right:"-400px"});
        upprev_closed = true;
        upprev_hidden = true;
    });
});






var shutterLinks={},shutterSets={};function shutterAddLoad(a){if("undefined"!=typeof jQuery){jQuery(document).ready(a())}else{if(typeof window.onload!="function"){window.onload=a}else{oldonld=window.onload;window.onload=function(){if(oldonld){oldonld()}a()}}}}shutterReloaded={I:function(b){return document.getElementById(b)},settings:function(){var a=this,b=shutterSettings;a.L10n=b.L10n||["Previous","Next","Close","Full Size","Fit to Screen","Image","of","Loading..."];a.imageCount=b.imageCount||0;a.textBtns=b.textBtns||0;a.imgDir=b.imgDir||"/wp-content/plugins/shutter-reloaded/menu/";a.FS=b.FS||0;a.oneSet=b.oneSet||0},init:function(o){var p=this,n,e,b,h,f,c,s,r,l,q,d,g;if("object"!=typeof shutterSettings){shutterSettings={}}p.settings();for(h=0,f=document.links.length;h<f;h++){n=document.links[h];b=(n.href.indexOf("?")==-1)?n.href.slice(-4).toLowerCase():n.href.substring(0,n.href.indexOf("?")).slice(-4).toLowerCase();if(b!=".jpg"&&b!=".png"&&b!=".gif"&&b!="jpeg"){continue}if(o=="sh"&&n.className.toLowerCase().indexOf("shutter")==-1){continue}if(o=="lb"&&n.rel.toLowerCase().indexOf("lightbox")==-1){continue}if(n.className&&n.className.toLowerCase().indexOf("shutterset")!=-1){s=n.className.match(/shutterset[^\s]*/g)}else{if(n.rel&&n.rel.toLowerCase().indexOf("lightbox[")!=-1){s=n.rel.replace(/\s/g,"_")}else{if(p.oneSet){s="oneSetForAllLinks"}else{s=0,r=-1}}}if(s){if(!shutterSets[s]){shutterSets[s]=[]}r=shutterSets[s].push(h)}l=n.href.slice(n.href.lastIndexOf("/")+1);e=(n.title&&n.title!=l)?n.title:"";if(!e&&n.firstChild&&n.firstChild.nodeName=="IMG"){e=n.firstChild.title||""}shutterLinks[h]={link:n.href,num:r,set:s,title:e};n.onclick=new Function('shutterReloaded.make("'+h+'");return false;')}if(!p.textBtns){q=["close.gif","prev.gif","prev-d.gif","next.gif","next-d.gif","resize1.gif","resize2.gif","resize-d.gif","loading.gif"];for(d=0,c=q.length;d<c;d++){g=new Image();g.src=p.imgDir+q[d]}}},make:function(j,g){var n=this,q,r,b="",p="",s,c,a,l,o,f,e,h=-1,d,k,i,u,m;if(!n.Top){if(typeof window.pageYOffset!="undefined"){n.Top=window.pageYOffset}else{n.Top=(document.documentElement.scrollTop>0)?document.documentElement.scrollTop:document.body.scrollTop}}if(typeof n.pgHeight=="undefined"){n.pgHeight=Math.max(document.documentElement.scrollHeight,document.body.scrollHeight)}if(g){n.FS=(g>0)?1:0}else{n.FS=shutterSettings.FS||0}if(n.resizing){n.resizing=null}window.onresize=new Function('shutterReloaded.resize("'+j+'");');document.documentElement.style.overflowX="hidden";if(!n.VP){n._viewPort();n.VP=true}if(!(f=n.I("shShutter"))){f=document.createElement("div");f.setAttribute("id","shShutter");document.getElementsByTagName("body")[0].appendChild(f);n.hideTags()}if(!(o=n.I("shDisplay"))){o=document.createElement("div");o.setAttribute("id","shDisplay");o.style.top=n.Top+"px";document.getElementsByTagName("body")[0].appendChild(o)}f.style.height=n.pgHeight+"px";m=n.textBtns?" | ":"";if(shutterLinks[j].num>1){q=shutterSets[shutterLinks[j].set][shutterLinks[j].num-2];a=n.textBtns?n.L10n[0]:'<img src="'+n.imgDir+'prev.gif" title="'+n.L10n[0]+'" />';b='<a href="#" onclick="shutterReloaded.make('+q+');return false">'+a+"</a>"+m;s=new Image();s.src=shutterLinks[q].link}else{b=n.textBtns?'<span class="srel-d">'+n.L10n[0]+"</span>"+m:'<img class="srel-d" src="'+n.imgDir+'prev-d.gif" title="'+n.L10n[0]+'" />'}if(shutterLinks[j].num!=-1&&shutterLinks[j].num<(shutterSets[shutterLinks[j].set].length)){r=shutterSets[shutterLinks[j].set][shutterLinks[j].num];l=n.textBtns?n.L10n[1]:'<img src="'+n.imgDir+'next.gif" title="'+n.L10n[1]+'" />';p='<a href="#" onclick="shutterReloaded.make('+r+');return false">'+l+"</a>"+m;c=new Image();c.src=shutterLinks[r].link}else{p=n.textBtns?'<span class="srel-d">'+n.L10n[1]+"</span>"+m:'<img class="srel-d" src="'+n.imgDir+'next-d.gif" title="'+n.L10n[1]+'" />'}k=n.textBtns?n.L10n[2]:'<img src="'+n.imgDir+'close.gif" title="'+n.L10n[2]+'" />';d=((shutterLinks[j].num>0)&&n.imageCount)?" "+n.L10n[5]+"&nbsp;"+shutterLinks[j].num+"&nbsp;"+n.L10n[6]+"&nbsp;"+shutterSets[shutterLinks[j].set].length:"";if(n.FS){i=n.textBtns?n.L10n[4]:'<img src="'+n.imgDir+'resize2.gif" title="'+n.L10n[4]+'"	/>'}else{i=n.textBtns?n.L10n[3]:'<img src="'+n.imgDir+'resize1.gif" title="'+n.L10n[3]+'" />';h=1}fsbtn_d=n.textBtns?'<span class="srel-d">'+n.L10n[3]+"</span>"+m:'<img class="srel-d" src="'+n.imgDir+'resize-d.gif" title="'+n.L10n[3]+'" />';u='<span id="fullSize"><a href="#" onclick="shutterReloaded.make('+j+", "+h+');return false">'+i+"</a>"+m+'</span><span id="fullSize-d">'+fsbtn_d+"</span>";if(!(e=n.I("shNavBar"))){e=document.createElement("div");e.setAttribute("id","shNavBar");document.getElementsByTagName("body")[0].appendChild(e)}e.innerHTML=m+b+'<a href="#" onclick="shutterReloaded.hideShutter();return false">'+k+"</a>"+m+p+u+d;o.innerHTML='<div id="shWrap"><img src="'+shutterLinks[j].link+'" id="shTopImg" onload="shutterReloaded.showImg();" onclick="shutterReloaded.hideShutter();" /><div id="shTitle">'+shutterLinks[j].title+"</div></div>";window.setTimeout(function(){shutterReloaded.loading()},2000)},loading:function(){var c=this,b,d,a;if((a=c.I("shWrap"))&&a.style.visibility=="visible"){return}if(!(b=c.I("shShutter"))){return}if(c.I("shWaitBar")){return}d=document.createElement("div");d.setAttribute("id","shWaitBar");d.style.top=c.Top+"px";d.innerHTML='<img src="'+c.imgDir+'loading.gif" title="'+c.L10n[7]+'" />';b.appendChild(d)},hideShutter:function(){var c=this,d,b,a;if(d=c.I("shDisplay")){d.parentNode.removeChild(d)}if(b=c.I("shShutter")){b.parentNode.removeChild(b)}if(a=c.I("shNavBar")){a.parentNode.removeChild(a)}c.hideTags(true);window.scrollTo(0,c.Top);window.onresize=c.FS=c.Top=c.VP=null;document.documentElement.style.overflowX=""},resize:function(c){var b=this,a;if(b.resizing){return}if(!b.I("shShutter")){return}a=b.I("shWrap");if(a){a.style.visibility="hidden"}window.setTimeout(function(){shutterReloaded.resizing=null},500);window.setTimeout(new Function('shutterReloaded.VP = null;shutterReloaded.make("'+c+'");'),100);b.resizing=true},_viewPort:function(){var d=this,b=window.innerHeight?window.innerHeight:0,f=document.body.clientHeight?document.body.clientHeight:0,c=document.documentElement?document.documentElement.clientHeight:0,a,e;if(b>0){d.wHeight=((b-f)>1&&(b-f)<30)?f:b;d.wHeight=((d.wHeight-c)>1&&(d.wHeight-c)<30)?c:d.wHeight}else{d.wHeight=(c>0)?c:f}a=document.documentElement?document.documentElement.clientWidth:0;e=window.innerWidth?window.innerWidth:document.body.clientWidth;d.wWidth=(a>1)?a:e},showImg:function(){var m=this,g=m.I("shShutter"),a=m.I("shDisplay"),i=m.I("shTopImg"),f=m.I("shTitle"),n=m.I("shNavBar"),c,l,b,k,j,e,d,h=0;if(!g){return}if((c=m.I("shWrap"))&&c.style.visibility=="visible"){return}if(l=m.I("shWaitBar")){l.parentNode.removeChild(l)}g.style.width=a.style.width="";f.style.width=(i.width-4)+"px";b=n.offsetHeight?f.offsetHeight+n.offsetHeight:30;k=m.wHeight-7-b;if(m.FS){if(i.width>(m.wWidth-10)){g.style.width=a.style.width=i.width+10+"px"}document.documentElement.style.overflowX=""}else{window.scrollTo(0,m.Top);if(i.height>k){i.width=i.width*(k/i.height);i.height=k;h=1}if(i.width>(m.wWidth-16)){i.height=i.height*((m.wWidth-16)/i.width);i.width=m.wWidth-16;h=1}f.style.width=(i.width-4)+"px";n.style.bottom="0px"}j=m.Top+i.height+b+10;if(j>m.pgHeight){g.style.height=j+"px"}window.scrollTo(0,m.Top);if((m.FS&&(i.height>k||i.width>m.wWidth))||h){m.I("fullSize").style.display="inline";m.I("fullSize-d").style.display="none"}e=(k-i.height)*0.45;d=(e>3)?Math.floor(e):3;a.style.top=m.Top+d+"px";n.style.bottom="0";c.style.visibility="visible"},hideTags:function(a){var f=document.getElementsByTagName("select"),g=document.getElementsByTagName("object"),b=document.getElementsByTagName("embed"),h=document.getElementsByTagName("iframe"),e=(a)?"visible":"hidden",d,c;for(d=0,c=f.length;d<c;d++){f[d].style.visibility=e}for(d=0,c=g.length;d<c;d++){g[d].style.visibility=e}for(d=0,c=b.length;d<c;d++){b[d].style.visibility=e}for(d=0,c=h.length;d<c;d++){h[d].style.visibility=e}}};


// Function returns a random number between 1 and n
function rand(n){return(Math.floor(Math.random()*n+1));}

jQuery(document).ready(function(){
 
  // Disable HTML title attribute for slider images
  jQuery('.promo_slider img').removeAttr('title');
 
  // Get all instances of promo_slider on the page
  var sliders = jQuery('.promo_slider_wrapper');
  
  // Cycle through each slider
  jQuery.each(sliders, function(){
	
	// Define current slider
	var currentSlider = jQuery(this);
	var thisSlider = jQuery('.promo_slider', currentSlider);
	
	// Get all panels
    var panels = jQuery('.panel', thisSlider);
	
	// Get total count of panels
    var panelCount = panels.length;
	
	// Set number for first panel
	if( promo_slider_options.startOn == 'first' ) var initialPanel = 1;
	else var initialPanel = rand(panelCount);
	if( currentSlider.hasClass('random') ) initialPanel = rand(panelCount);
	if( currentSlider.hasClass('first') ) initialPanel = 1;
	
	// Should we pause the slider on mouseover?
	var pauseOnMouseover;
	if( currentSlider.hasClass('pause') ) pauseOnMouseover = true;
	else pauseOnMouseover = false;
	
	// Assign variable for setInterval
	var sliderInterval;
	
	// Set time delay
	var timeDelay = promo_slider_options.timeDelay;
	if( jQuery('.promo_slider_time_delay', thisSlider).html() ){
		timeDelay = jQuery('.promo_slider_time_delay', thisSlider).html();
	}
	
	// Set auto advance variable
	var autoAdvance = promo_slider_options.autoAdvance;
	if( thisSlider.hasClass('auto_advance') ) autoAdvance = true;
	if( thisSlider.hasClass('no_auto_advance') ) autoAdvance = false;
	if( panelCount < 2 ) autoAdvance = false;
	
	// Set navigation option
	var navOption = promo_slider_options.nav_option;
	if( currentSlider.hasClass('default_nav') ) navOption = 'default';
	else if( currentSlider.hasClass('fancy_nav') ) navOption = 'fancy';
	else if( currentSlider.hasClass('links_nav') ) navOption = 'links';
	else if( currentSlider.hasClass('thumb_nav') ) navOption = 'thumb';
	else navOption = false;
	
	// Hide all panels
	panels.hide();
	
	// Show initial panel and add class 'current' to active panel
	jQuery('.panel-' + initialPanel, currentSlider).show().addClass('current');
	
	if(panelCount > 1 && (navOption == 'default' || navOption == 'fancy' || navOption == 'thumb') ){

	  jQuery('.promo_slider_nav').show();
	  jQuery('.promo_slider_thumb_nav').show();
	
	  if(navOption == 'fancy' || navOption == 'default'){
		  // Generate HTML for navigation
		  var navHTML = '';
		  jQuery.each(panels, function(index, object){
			// Set panel title
			panelTitle = jQuery('.panel-'+(index+1)+' span.panel-title', currentSlider).html();
			  newSpan = '<span class="'+(index+1)+'" title="'+panelTitle+'">'+(index+1)+'</span>';
			  if( (index + 1) != panelCount){newSpan = newSpan + '<b class="promo_slider_sep"> | </b>';}
			navHTML = navHTML + newSpan;
		  });
		  
		  // Insert HTML into nav
		  jQuery('.slider_selections', currentSlider).html(navHTML);
	  }
	  
	  // Set click functions for each span in the slider nav
	  var slideNav = jQuery('.slider_selections span', currentSlider);
	  jQuery.each(slideNav, function(index, object){
		jQuery(object).click(function(){ 
		  clearInterval(sliderInterval);
		  if( !jQuery(object).hasClass('current') ) progress(jQuery(object).attr('class'), currentSlider, panelCount);
		  if(autoAdvance) sliderInterval = setInterval(function(){progress('forward', currentSlider, panelCount);}, (timeDelay * 1000));
		});
	  });
	  
	  // Set active span class to 'current'
	  jQuery('.slider_selections span[class=' + initialPanel + ']', currentSlider).addClass('current');
	  
	}
	
	// Create click functions for navigational elements
	jQuery('.move_forward', currentSlider).click(function(){ 
	  clearInterval(sliderInterval);
	  progress('forward', currentSlider, panelCount);
	  if(autoAdvance) sliderInterval = setInterval(function(){progress('forward', currentSlider, panelCount);}, (timeDelay * 1000));
	});
	jQuery('.move_backward', currentSlider).click(function(){
	  clearInterval(sliderInterval);
	  progress('backward', currentSlider, panelCount);
	  if(autoAdvance) sliderInterval = setInterval(function(){progress('forward', currentSlider, panelCount);}, (timeDelay * 1000));
	});
	
	
	if( autoAdvance ){
	
		// Begin auto advancement of slides
		sliderInterval = setInterval(function(){progress('forward', currentSlider, panelCount);}, (timeDelay * 1000));
	
		if( pauseOnMouseover ){
		
			// Pause slide advancement on mouseover
			jQuery(thisSlider).mouseover(function(){
				clearInterval(sliderInterval);
			});
		
			// Continue slide advancement on mouseout
			jQuery(thisSlider).mouseout(function(){
				sliderInterval = setInterval(function(){progress('forward', currentSlider, panelCount);}, (timeDelay * 1000));
			});
		
		}
		
	}
	
  });
  
  // Progress to selected panel
  function progress(value, currentSlider, panelCount){
	  
	  // Find number of current panel
	  var currentValue = jQuery('div.promo_slider > .panel', currentSlider).index(jQuery('div.panel.current', currentSlider)) + 1;

	  // Set value of new panel
  	  if(value == 'forward'){
		var newValue = currentValue + 1;
		if(newValue > panelCount){newValue = 1;}
	  }
	  else if(value == 'backward'){
		var newValue = currentValue - 1;
		if(newValue == 0){newValue = panelCount;}
	  }
	  else{
		var newValue = value;
	  }
	  
	  // Assign variables for ease of use
	  var currentItem = jQuery('.panel-' + currentValue, currentSlider);
	  var newItem = jQuery('.panel-' + newValue, currentSlider);
	  var currentSpan = jQuery('.slider_selections span.current', currentSlider);
	  var newSpan = jQuery('.slider_selections span.' + newValue, currentSlider);
	  
	  // Add / Remove classes
	  currentItem.removeClass('current');
	  newItem.addClass('current');
	  currentSpan.removeClass('current');
	  newSpan.addClass('current');
	  
	  // Fade in / out
	  currentItem.fadeOut('fast', function(){
		newItem.fadeIn('fast');
	  });

  }

});