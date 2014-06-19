(function () {
	/*
	 * Go to http://laboratorididattici.unica.it/poli/ingegneristico/laboratorio-software/s
	 */
	var s = document.createElement('script');
	s.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js';
	document.body.appendChild(s);

	var iFrameMap = '<iframe width="425" height="350" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps/ms?ie=UTF8&amp;hl=it&amp;oe=UTF8&amp;msa=0&amp;msid=215580288115955627842.0004f0676e605f0f9e117&amp;ll=39.225024,9.112337&amp;spn=0.010127,0.009162&amp;t=m&amp;iwloc=0004f06783d188a8af553&amp;output=embed"></iframe><br /><small>Visualizza <a href="https://maps.google.com/maps/ms?ie=UTF8&amp;hl=it&amp;oe=UTF8&amp;msa=0&amp;msid=215580288115955627842.0004f0676e605f0f9e117&amp;ll=39.225024,9.112337&amp;spn=0.010127,0.009162&amp;t=m&amp;iwloc=0004f06783d188a8af553&amp;source=embed" style="color:#0000FF;text-align:left">Laboratorio LIDIA (Lab. Multifunzionale e Lab. Software)</a> in una mappa di dimensioni maggiori</small>';
    $('.entry-container.fix').find('img').parent('p').html(iFrameMap);
})();
