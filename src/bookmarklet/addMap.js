(function () {
	/*
	 * Go to http://laboratorididattici.unica.it/poli/ingegneristico/laboratorio-software/s
	 */
	var s = document.createElement('script');
	s.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js';
	document.body.appendChild(s);

	var s = document.createElement('script');
	s.src='https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/0.9.9/jquery.magnific-popup.min.js';
	document.body.appendChild(s);


	var iFrameMap = '<iframe width="725" height="350" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://www.google.com/maps/ms?ll=39.230588,9.108213&amp;spn=0.003414,0.004801&amp;t=h&amp;z=18&amp;msa=0&amp;msid=215715156014063569968.0004fc2df5af3fa6ce343&output=embed"></iframe><br /><small>View <a href="https://www.google.com/maps/ms?ll=39.230588,9.108213&amp;spn=0.003414,0.004801&amp;t=h&amp;z=18&amp;msa=0&amp;msid=215715156014063569968.0004fc2df5af3fa6ce343&amp;source=embed" style="color:#0000FF;text-align:left">poli/ingegneristico/laboratorio-software</a> in a larger map</small>';
    $('.entry-container.fix').find('img').parent('p').html(iFrameMap);

    var popupLink = '<a id="js-popup" href="http://laboratorididattici.unica.it/files/2013/09/Lidia.png" data-effect="mfp-zoom-in">test</a>';
    document.body.appendChild(popupLink);

})();
