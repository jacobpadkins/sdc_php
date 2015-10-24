var global = {};

$(document).ready(function() {
  // declare global variables into global namespace
  global.$window = $(window);
  global.$logo = $('.logo');
  global.$bubbleDiv = $('#bubbleDiv');
  global.$slidemenu = $('#slidemenu');
  global.$slideHome = $('#slideHome');
  global.$slideCapa = $('#slideCapa');
  global.$slideProd = $('#slideProd');
  global.$slideServ = $('#slideServ');
  global.$slideAbou = $('#slideAbou');
  global.$slideCont = $('#slideCont');
  global.$tagline = $('#tagline h1');
  global.$navHome = $('#navHome');
  global.$navAbout = $('#navAbout');
  global.$navContact = $('#navContact');
  global.$navCapa = $('#navCapa');
  global.$navProd = $('#navProd');
  global.$navServ = $('#navServ');
  global.$allNav = $('#navHome h3, #navAbout h3, #navContact h3, #navCapa h3, #navProd h3, #navServ h3');
  global.$middle = $('#middle');
  global.$img0 = $('#img0');
  global.$img1 = $('#img1');
  global.$img2 = $('#img2');
  global.$img3 = $('#img3');
  global.$allImgs = $('#img0, #img1, #img2, #img3');
  global.$capaRow = $('#capaRow');
  global.$prodRow = $('#prodRow');
  global.$servRow = $('#servRow');
  global.$slideshowBG = $('#slideshowText');
  global.$slideshowText = $('#slideshowText h1');
  global.$socialYT = $('#socialButtons img:nth-of-type(1)');
  global.$socialTW = $('#socialButtons img:nth-of-type(2)');
  global.$socialFB = $('#socialButtons img:nth-of-type(3)');
  global.$socialGP = $('#socialButtons img:nth-of-type(4)');
  global.$socialLN = $('#socialButtons img:nth-of-type(5)');
  global.$socialPT = $('#socialButtons img:nth-of-type(6)');
  global.$socialIG = $('#socialButtons img:nth-of-type(7)');
  global.$smCapaRow = $('#smCapaRow');
  global.$smProdRow = $('#smProdRow');
  global.$smServRow = $('#smServRow');
  global.$smAbouRow = $('#smAbouRow');
  global.$smContRow = $('#smContRow');
  global.$smRowContainer = $('#smRowContainer');
  global.$capaList = $('#capaList');
  global.$capaTiles = $('.capaTiles');
  global.$prodList = $('#prodList');
  global.$prodTiles = $('.prodTiles');
  global.$servResponse = $('#servPage .col-md-12:nth-of-type(5) .col-md-8, #servPage .col-md-12:nth-of-type(6) .col-md-8, #servPage .col-md-12:nth-of-type(7) .col-md-8, #servPage .col-md-12:nth-of-type(8) .col-md-8');

  // other variables
  global.slidemenuShown = false;
  global.whichPage = 0;
  global.whichSlide = 4;
  global.whichMainSlide = 1;
  global.mainSlidePics = [];
  global.smallSlidePics = [];
  global.mainSlideTaglines = ['YOUR BRAND. YOUR VISION.',
                              'BRAND ELOQUENCE.',
                              'IMMERSIVE STORE EXPERIENCES.',
                              'DESTINATION DECOR.'];
  global.capaCats = [];
  global.capaWhichCate = 13;
  global.prodCats = [];
  global.prodWhichCate = 16;

  // color/bw pics arrays
  global.colorPics = {};
  global.bwPics = {};

  // slideshow timers
  global.timer = $.timer(function() {
    slideShow();
  });
  global.timer.set({time : 4000, autostart : true});

  global.timer_main = $.timer(function() {
    swapMainSlide();
  });
  global.timer_main.set({time: 8000, autostart: true});

  /* BEGIN INIT() -> COPY */

  database();
  global.$slideshowBG.fadeOut(0);
  middleResize(global.whichPage);
  highlightNavbar(0);

  global.timer.play();
  global.timer_main.play();
  // hide/show logo on scroll
  global.$window.scroll(function() {
    if (global.$window.scrollTop() > 10) {
      global.$logo.fadeOut('fast');
    } else {
      global.$logo.fadeIn('fast');
    }
  });

  // navbar listeners
  global.$logo.on('click', function() {
    home();
  });
  $('#tinyLogo').on('click', function() {
    home();
  });
  global.$navHome.on('click', function() {
    home();
  });
  global.$navAbout.on('click', function() {
    setPage(4);
  });
  global.$navContact.on('click', function() {
    setPage(5);
  });
  global.$navCapa.on('click', function() {
    setPage(1);
  });
  global.$navProd.on('click', function() {
    setPage(2);
  });
  global.$navServ.on('click', function() {
    setPage(3);
  });

  // slideshow buttons hover events
  global.$capaRow.on('mouseover', function() {
    global.$capaRow.attr('src', 'images/home_slideshow/capabilities-animated.gif');
    global.$slideshowText.html('Our collaborative attitude means there\'s nothing we can\'t create. Challenge us! Our <span class="underlined">Capabilities </span> are unbounded.');
    global.timer.pause();
    global.$slideshowBG.stop().fadeIn(300);
  });
  global.$capaRow.on('mouseleave', function() {
    global.$capaRow.attr('src', 'images/home_slideshow/capa0.png');
    global.$slideshowBG.stop().fadeOut(300);
    global.timer.play();
  });
  global.$capaRow.on('click', function() {
    setPage(1);
  });

  global.$prodRow.on('mouseover', function() {
    global.$prodRow.attr('src', 'images/home_slideshow/products-animated.gif');
    global.$slideshowText.html('We make <span class="underlined">Products</span> that set the industry standard for quality, durability and effect!');
    global.timer.pause();
    global.$slideshowBG.stop().fadeIn(300);
  });
  global.$prodRow.on('mouseleave', function() {
    global.$prodRow.attr('src', 'images/home_slideshow/prod0.png');
    global.$slideshowBG.stop().fadeOut(300);
    global.timer.play();
  });
  global.$prodRow.on('click', function() {
    setPage(2);
  });

  global.$servRow.on('mouseover', function() {
    global.$servRow.attr('src', 'images/home_slideshow/services-animated.gif');
    global.$slideshowText.html('We endeavor to understand your needs and eliminate your worries. Utilize our <span class="underlined">Services</span> to insure your success.');
    global.timer.pause();
    global.$slideshowBG.stop().fadeIn(300);
  });
  global.$servRow.on('mouseleave', function() {
    global.$servRow.attr('src', 'images/home_slideshow/serv0.png');
    global.$slideshowBG.stop().fadeOut(300);
    global.timer.play();
  });
  global.$servRow.on('click', function() {
    setPage(3);
  });

  // sm and xs row click events
  global.$smCapaRow.on('click', function() {
    setPage(1);
  });
  global.$smProdRow.on('click', function() {
    setPage(2);
  });
  global.$smServRow.on('click', function() {
    setPage(3);
  });
  global.$smAbouRow.on('click', function() {
    setPage(4);
  });
  global.$smContRow.on('click', function() {
    setPage(5);
  });

  // small menubar dropdown
  $('#smMenu').on('click', function() {
    $('#slidemenu h1').css('color', '#F1EFE6');
    $('#slidemenu h1:nth-of-type(' + (global.whichPage + 1) + ')').css('color', '#F26522');
    if (global.$slidemenu.hasClass('hidden')) {
      global.$slidemenu.removeClass('hidden');
    } else {
      global.$slidemenu.addClass('hidden');
    }
  });

  // small menubar click outside hide
  $(document).on('click', function(e) {
    if (!$(e.target).closest('#slidemenu').length && !$(e.target).closest('#smMenu').length) {
      if (!global.$slidemenu.hasClass('hidden')) {
        global.$slidemenu.addClass('hidden');
      }
    }
  });

  // slide listeners
  global.$slideHome.on('click', function() {
    global.$slidemenu.addClass('hidden');
    home();
  });
  global.$slideAbou.on('click', function() {
    global.$slidemenu.addClass('hidden');
    setPage(4);
  });
  global.$slideCont.on('click', function() {
    global.$slidemenu.addClass('hidden');
    setPage(5);
  });
  global.$slideCapa.on('click', function() {
    global.$slidemenu.addClass('hidden');
    setPage(1);
  });
  global.$slideProd.on('click', function() {
    global.$slidemenu.addClass('hidden');
    setPage(2);
  });
  global.$slideServ.on('click', function() {
    global.$slidemenu.addClass('hidden');
    setPage(3);
  });

  // resize listener
  global.$window.on('resize', function() {
    middleResize(global.whichPage);
  })

  // slideshow bubbles
  global.$bubbleDiv.on('click', 'img', function() {
    global.timer_main.reset();
    if (!$(this).is(':first-child')) {
      global.whichMainSlide = $(this).index();
    } else {
      global.whichMainSlide = global.$bubbleDiv.length - 1;
    }
    swapMainSlide();
  });

  // contact us Submission
  $('#submitButton').on('click', function() {
    var _name = $('#input_name').val();
    var _company = $('#input_company').val();
    var _phone = $('#input_phone').val();
    var _email = $('#input_email').val();
    var _city = $('#input_city').val();
    var _state = $('#input_state').val();
    var _info = $('#input_info').val();
    var data = {name: _name,
                company: _company,
                phone: _phone,
                email: _email,
                city: _city,
                state: _state,
                info: _info
               };
    var json_data = JSON.stringify(data);
    $.ajax({
      url: 'api/cms/email',
      method: 'POST',
      dataType: 'json',
      data: json_data,
      success: function(res) {
        console.log(res);
        $('#contWrapper').fadeOut(500,function() {
          $('#contWrapper').empty();
          $('#contWrapper').append('<h3>Thank you for your interest! We will get back to you as soon as possible.</h3>');
          $('#contWrapper').fadeIn(500);
        });
      },
      error: function(err) {
        console.log(err);
      }
    });
  });

  /* FUNCTIONS FOR CAPA PAGE */

  // tile hover animation
  global.$capaTiles.on('mouseover', 'div img', function() {
    if (global.$window.width() > 992) {
      $(this).stop().animate({'top':'20%'}, 200);
      color_image = $('#capaList div:nth-of-type(' + (parseInt($(this).parent('div').index()) + parseInt(1)) + ') h3').text();
      $(this).attr('src', 'images/uploads/' + global.colorPics[color_image]);
      $('#capaList div h3:contains("' + $(this).siblings('a').text() + '")').stop().animate({'font-size':'15'}, 200);
      $('#capaList div h3:contains("' + $(this).siblings('a').text() + '")').css('color', '#1352A5');
    }
  });
  global.$capaTiles.on('mouseleave', 'div img', function() {
    if (global.$window.width() > 992) {
      $(this).stop().animate({'top': '0'}, 200);
      bw_image = $('#capaList div:nth-of-type(' + (parseInt($(this).parent('div').index()) + parseInt(1)) + ') h3').text();
      $(this).attr('src', 'images/uploads/' + global.bwPics[bw_image]);
      $('#capaList div h3:contains("' + $(this).siblings('a').text() + '")').stop().animate({'font-size':'12'}, 200);
      $('#capaList div h3:contains("' + $(this).siblings('a').text() + '")').css('color', '#605F5B');
    }
  });

  // tile click lightbox
  global.$capaTiles.on('click', 'div img', function() {
    $('#wrapper a[data-lightbox="' + $(this).siblings('a').text() + '"]').first().click();
  });

  // list-tile hover animation
  global.$capaList.on('mouseover', 'div', function() {
    $(this).children('h3').stop().animate({'font-size':'15'}, 200);
    $(this).children('h3').css('color', '#1352A5');
    $('.capaTiles div:nth-of-type(' + ($(this).index() + 1) + ') img').stop().animate({'top':'20%'}, 200);
    color_image = $(this).children('h3').text();
    $('.capaTiles div:nth-of-type(' + ($(this).index() + 1) + ') img').attr('src', 'images/uploads/' + global.colorPics[color_image]);
  });
  global.$capaList.on('mouseleave', 'div', function() {
    if (($(this).index() + 1) != global.capaWhichCate) {
      $(this).children('h3').css('color', '#605F5B');
      $(this).children('h3').stop().animate({'font-size':'12'}, 200);
    }
    $('.capaTiles div:nth-of-type(' + ($(this).index() + 1) + ') img').stop().animate({'top':'0'}, 200);
    bw_image = $(this).children('h3').text();
    $('.capaTiles div:nth-of-type(' + ($(this).index() + 1) + ') img').attr('src', 'images/uploads/' + global.bwPics[bw_image]);
  });

  // list-tile click animation
  global.$capaList.on('click', 'div', function() {
    $('.capaTiles div:nth-of-type(' + ($(this).index() + 1) + ') img').click();
  });

  /* FUNCTIONS FOR PROD PAGE */

  // tile hover animation
  global.$prodTiles.on('mouseover', 'div img', function() {
    if (global.$window.width() > 992) {
      $(this).stop().animate({'top':'20%'}, 200);
      color_image = $('#prodList div:nth-of-type(' + (parseInt($(this).parent('div').index()) + parseInt(1)) + ') h3').text();
      $(this).attr('src', 'images/uploads/' + global.colorPics[color_image]);
      $('#prodList div h3:contains("' + $(this).siblings('a').text() + '")').stop().animate({'font-size':'15'}, 200);
      $('#prodList div h3:contains("' + $(this).siblings('a').text() + '")').css('color', '#1352A5');
    }
  });
  global.$prodTiles.on('mouseleave', 'div img', function() {
    if (global.$window.width() > 992) {
      $(this).stop().animate({'top': '0'}, 200);
      bw_image = $('#prodList div:nth-of-type(' + (parseInt($(this).parent('div').index()) + parseInt(1)) + ') h3').text();
      $(this).attr('src', 'images/uploads/' + global.bwPics[bw_image]);
      $('#prodList div h3:contains("' + $(this).siblings('a').text() + '")').stop().animate({'font-size':'12'}, 200);
      $('#prodList div h3:contains("' + $(this).siblings('a').text() + '")').css('color', '#605F5B');
    }
  });

  // tile click lightbox
  global.$prodTiles.on('click', 'div img', function() {
    $('#wrapper a[data-lightbox="' + $(this).siblings('a').text() + '"]').first().click();
  });

  // list-tile hover animation
  global.$prodList.on('mouseover', 'div', function() {
    $(this).children('h3').stop().animate({'font-size':'15'}, 200);
    $(this).children('h3').css('color', '#1352A5');
    $('.prodTiles div:nth-of-type(' + ($(this).index() + 1) + ') img').stop().animate({'top':'20%'}, 200);
    color_image = $(this).children('h3').text();
    $('.prodTiles div:nth-of-type(' + ($(this).index() + 1) + ') img').attr('src', 'images/uploads/' + global.colorPics[color_image]);
  });
  global.$prodList.on('mouseleave', 'div', function() {
    if (($(this).index() + 1) != global.prodWhichCate) {
      $(this).children('h3').css('color', '#605F5B');
      $(this).children('h3').stop().animate({'font-size':'12'}, 200);
    }
    $('.prodTiles div:nth-of-type(' + ($(this).index() + 1) + ') img').stop().animate({'top':'0'}, 200);
    bw_image = $(this).children('h3').text();
    $('.prodTiles div:nth-of-type(' + ($(this).index() + 1) + ') img').attr('src', 'images/uploads/' + global.bwPics[bw_image]);
  });

  // list-tile click animation
  global.$prodList.on('click', 'div', function() {
    $('.prodTiles div:nth-of-type(' + ($(this).index() + 1) + ') img').click();
  });

});


database = function() {
  $.ajax({
    method: 'GET',
    dataType: 'json',
    url: 'api/cms',
    success: function(res) {
      //res = JSON.parse(res);
      console.log(res);
      global.capaCats = res.capas;
      global.prodCats = res.prods;
      global.capaCats.sort();
      global.prodCats.sort();
      var index;
      for (var i = 0; i < res.imgs.length; i++) {
        index = $.inArray('Small_Slide', res.imgs[i].Flags);
        if (index != -1) {
          global.smallSlidePics.push(res.imgs[i].filename);
          res.imgs[i].Flags.splice(index, 1);
        }
        index = $.inArray('Big_Slide', res.imgs[i].Flags);
        if (index != -1) {
          global.mainSlidePics.push(res.imgs[i].filename);
          res.imgs[i].Flags.splice(index, 1);
        }
        for (var j = 0; j < res.imgs[i].Capabilities.length; j++) {
          var lightbox_str = res.imgs[i].Capabilities[j];
          $('#wrapper').append('<a href="images/uploads/' + res.imgs[i].filename + '" data-lightbox="' + lightbox_str + '"></a>');
        }
        for (var j = 0; j < res.imgs[i].Products.length; j++) {
          var lightbox_str = res.imgs[i].Products[j];
          $('#wrapper').append('<a href="images/uploads/' + res.imgs[i].filename + '" data-lightbox="' + lightbox_str + '"></a>');
        }
        for (var j = 0; j < res.imgs[i].Flags.length; j++) {
          var flag_obj = JSON.parse(res.imgs[i].Flags[j]);
          if (flag_obj["rep_color"] != undefined) {
            global.colorPics[flag_obj["rep_color"]] = res.imgs[i].filename;
          }
          if (flag_obj["rep_bw"] != undefined) {
            global.bwPics[flag_obj["rep_bw"]] = res.imgs[i].filename;
          }
        }
      }
      global.$img0.attr('src', 'images/uploads/' + global.smallSlidePics[0]);
      global.$img1.attr('src', 'images/uploads/' + global.smallSlidePics[1]);
      global.$img2.attr('src', 'images/uploads/' + global.smallSlidePics[2]);
      global.$img3.attr('src', 'images/uploads/' + global.smallSlidePics[3]);
      $('#slide, #slideSM').css('background-image', 'url(images/uploads/' + global.mainSlidePics[0] + ')');
      for (var i = 1; i < global.mainSlidePics.length; i++) {
        global.$bubbleDiv.append('<img class="bubble" src="images/home_slideshow/dot_empty.png">');
      }
      global.capaWhichCate = res.capas.length + 1;
      global.rodWhichCate = res.prods.length + 1;
    }
  });
}

swapMainSlide = function() {
  $('.bubble').attr('src', 'images/home_slideshow/dot_empty.png');
  $('#bubbleDiv img:nth-of-type(' + (global.whichMainSlide+1) + ')').attr('src', 'images/home_slideshow/dot_full.png');
  $('#slide, #slideSM, #tagline').stop().fadeOut(500, function() {
    $('#slide, #slideSM').css('background-image', 'url(images/uploads/' + global.mainSlidePics[global.whichMainSlide] + ')');
    $('#tagline h1').text(global.mainSlideTaglines[global.whichMainSlide]);
    if (global.whichMainSlide < global.mainSlidePics.length - 1) {
      global.whichMainSlide += 1;
    } else {
      global.whichMainSlide = 0;
    }
    $('#slide, #slideSM, #tagline').fadeIn(500);
  });
}

clearPage = function() {
  $('#capaPage, #prodPage, #servPage, #abouPage, #contPage').addClass('hidden');
  global.$capaList.empty();
  global.$capaTiles.empty();
  global.$prodList.empty();
  global.$prodTiles.empty();
}

highlightNavbar = function(which) {
  global.$allNav.css('background-color', '');
  if (which == 0) {
    $('#navHome h3').css('background-color', '#898888');
  } else if (which == 1) {
    $('#navCapa h3').css('background-color', '#898888');
  } else if (which == 2) {
    $('#navProd h3').css('background-color', '#898888');
  } else if (which == 3) {
    $('#navServ h3').css('background-color', '#898888');
  } else if (which == 4) {
    $('#navAbout h3').css('background-color', '#898888');
  } else if (which == 5) {
    $('#navContact h3').css('background-color', '#898888');
  }
}

setPage = function(which) {
  var popOnce = true;
  if (global.whichPage != which) {
    global.timer.stop();
    global.timer_main.stop();
    highlightNavbar(which);
    if (global.whichPage == 0) {
      $('html, body').animate({scrollTop: 0}, 300, function() {
        $('#slide, #slideSM').animate({'height':'135px'}, 500);
        $('#tagline, #bubbleDiv, .copyText, .copyTextM, #copyTextSM1, #copyTextSM, #divider, #middle, #bottom').fadeOut(500, function() {
          if ($('#tagline:animated, #copyText:animated, #copyTextSM:animated, #divider:animated, #middle:animated, #bottom:animated').length == 0) {
            $('#homePage').addClass('hidden');
            global.$middle.css('margin-top', '5px');
            $('#bottom').css('background-color', '#605F5B');
            $('#social').css('background-color', '#D85703');
            $('#socialDiv').removeClass('hidden');
            if (which == 1) {
              $('#capaPage').removeClass('hidden');
              if (popOnce == true) {
                populateCapa();
                popOnce = false;
              }
            } else if (which == 2) {
              $('#prodPage').removeClass('hidden');
              if (popOnce == true) {
                populateProd();
                popOnce = false;
              }
            } else if (which == 3) {
              $('#servPage').removeClass('hidden');
            } else if (which == 4) {
              $('#abouPage').removeClass('hidden');
            } else if (which == 5) {
              $('#contPage').removeClass('hidden');
            }
            $('#middle, #bottom').fadeIn(500);
            middleResize(which);
          }
        });
      });
    } else {
      $('html, body').animate({scrollTop: 0}, 300, function() {
        $('#middle, #bottom').fadeOut(300, function() {
          if ($('#middle:animated, #bottom:animated').length == 0) {
            clearPage();
            $('#socialDiv').removeClass('hidden');
            middleResize(which);
            if (which == 1) {
              $('#capaPage').removeClass('hidden');
              populateCapa();
            } else if (which == 2) {
              $('#prodPage').removeClass('hidden');
              populateProd();
            } else if (which == 3) {
              $('#servPage').removeClass('hidden');
            } else if (which == 4) {
              $('#abouPage').removeClass('hidden');
            } else if (which == 5) {
              $('#contPage').removeClass('hidden');
            }
            $('#middle, #bottom').fadeIn(300);
            middleResize(which);
          }
        });
      });
    }
    global.whichPage = which;
  }
}

home = function() {
  if (global.whichPage != 0) {
    global.timer.play();
    global.timer_main.play();
    highlightNavbar(0);
    $('html, body').animate({scrollTop: 0}, 300, function() {
      $('#slide').animate({'height':'500px'}, 500);
      $('#slideSM').animate({'height':'250px'}, 500);
      $('#middle, #bottom').fadeOut(500, function() {
        global.$middle.css('margin-top', '');
        middleResize(0);
        clearPage();
        $('#homePage').removeClass('hidden');
        $('#bottom').css('background-color', '#D85703');
        $('#social').css('background-color', '#605F5B');
        $('#socialDiv').addClass('hidden');
        $('#tagline, #bubbleDiv, .copyText, .copyTextM, #copyTextSM1, #copyTextSM, #divider, #middle, #bottom').fadeIn(500);
        global.whichPage = 0;
        global.$tagline.text('Your Brand. Your Vision.');
      });
    });
  }
}

nextImg = function() {
  if (global.whichSlide < global.smallSlidePics.length) {
    global.$img0.attr('src', 'images/uploads/' + global.smallSlidePics[global.whichSlide]);
    global.whichSlide++;
  }
  else {
    global.$img0.attr('src', 'images/uploads/' + global.smallSlidePics[0]);
    global.whichSlide = 1;
  }
}

slideShow = function() {
  global.$img0.animate({'left': '-80%', }, 500, function() {
    global.$img1.animate({'right': '20%'}, 500, function() {
      global.$img1.animate({'width': '80%', 'height': '480px'}, 500, function() {
        if ($('#img1:animated').length == 0) {
          global.$img2.animate({'top': '0'}, 500, function() {
            global.$img3.animate({'top': '33.33%'}, 500, function() {
              global.$img0.fadeOut(0);
              nextImg();
              global.$img0.animate({'width': '20%', 'height': '33.33%', 'top': '66.66%', 'left': '80%'}, 0, function() {
                global.$img0.fadeIn(500, function() {
                  resetSlideIds();
                });
              });
            });
          });
        }
      });
    });
  });
}

resetSlideIds = function() {
  global.$img0.attr('id', 'img3');
  global.$img1.attr('id', 'img0');
  global.$img2.attr('id', 'img1');
  global.$img3.attr('id', 'img2');
  global.$img0 = $('#img0');
  global.$img1 = $('#img1');
  global.$img2 = $('#img2');
  global.$img3 = $('#img3');
  global.$allImgs = $('#img0, #img1, #img2, #img3');
  global.$allImgs.removeAttr('style');
}

middleResize = function(which) {
  if ($(window).width() < 768) {
    if (which === 0) {
      global.$middle.css('height', '430px');
    } else if (which === 1) {
      global.$middle.css('height', (global.capaCats.length / 2) * 160 + 320);
      $('#capaCopy').css('top', ((global.capaCats.length / 2) * 160) + 120);
    } else if (which === 2) {
      global.$middle.css('height', (global.prodCats.length / 2) * 160 + 320);
      $('#prodCopy').css('top', ((global.prodCats.length / 2) * 160) + 120);
    } else if (which === 3) {
      global.$middle.css('height', '4030px');
      global.$servResponse.addClass('.col-md-8').removeClass('col-md-12');
      global.$servResponse.addClass('.col-md-12').removeClass('col-md-8');
    } else if (which === 4) {
      global.$middle.css('height', $('#aboutContainer').height() + 60);
    } else if (which === 5) {
      global.$middle.css('height', '580px');
    }
    global.$slidemenu.height($(window).height());
  } else if ($(window).width() >= 768 && $(window).width() <= 992) {
    if (which === 0) {
      global.$middle.css('height', '405px');
    } else if (which === 1) {
      global.$middle.css('height', (global.capaCats.length / 2) * 160 + 320);
      $('#capaCopy').css('top', ((global.capaCats.length / 2) * 160) + 120);
    } else if (which === 2) {
      global.$middle.css('height', (global.prodCats.length / 2) * 160 + 320);
      $('#prodCopy').css('top', ((global.prodCats.length / 2) * 160) + 120);
    } else if (which === 3) {
      global.$middle.css('height', '2590px');
      global.$servResponse.addClass('.col-md-8').removeClass('col-md-12');
      global.$servResponse.addClass('.col-md-12').removeClass('col-md-8');
    } else if (which === 4) {
      global.$middle.css('height', $('#aboutContainer').height() + 60);
    } else if (which === 5) {
      global.$middle.css('height', '580px');
    }
    global.$slidemenu.height($(window).height());
  } else if ($(window).width() > 992 && $(window).width() <= 1200) {
    if (which === 0) {
      global.$middle.css('height', '650px');
    } else if (which === 1) {
      global.$middle.css('height', (global.capaCats.length / 4) * 160 + 320);
      $('#capaCopy').css('top', ((global.capaCats.length / 4) * 160) + 180);
    } else if (which === 2) {
      global.$middle.css('height', (global.prodCats.length / 4) * 160 + 320);
      $('#prodCopy').css('top', ((global.prodCats.length / 4) * 160) + 180);
    } else if (which === 3) {
      global.$middle.css('height', '2230px');
      global.$servResponse.addClass('.col-md-12').removeClass('col-md-8');
      global.$servResponse.addClass('.col-md-8').removeClass('col-md-12');
    } else if (which === 4) {
      global.$middle.css('height', $('#aboutContainer').height() + 60);
    } else if (which === 5) {
      global.$middle.css('height', '580px');
    }
  } else {
    if (which === 0) {
      global.$middle.css('height', '650px');
    } else if (which === 1) {
      global.$middle.css('height', (global.capaCats.length / 4) * 160 + 320);
      $('#capaCopy').css('top', ((global.capaCats.length / 4) * 160) + 180);
    } else if (which === 2) {
      global.$middle.css('height', (global.prodCats.length / 4) * 160 + 320);
      $('#prodCopy').css('top', ((global.prodCats.length / 4) * 160) + 180);
    } else if (which === 3) {
      global.$middle.css('height', '1750px');
      global.$servResponse.addClass('.col-md-12').removeClass('col-md-8');
      global.$servResponse.addClass('.col-md-8').removeClass('col-md-12');
    } else if (which === 4) {
      global.$middle.css('height', $('#aboutContainer').height() + 60);
    } else if (which === 5) {
      global.$middle.css('height', '580px');
    }
  }
}

populateCapa = function() {
  global.$capaList.empty();
  for (var i = 0; i < global.capaCats.length; i++) {
    var category = global.capaCats[i];
    global.$capaList.append('<div><h3>' + category + '</h3></div>');
  }
  var whichCol = 0;
  var whichRow = 0;
  for (var i = 0; i < global.capaCats.length; i++) {
    var category = global.capaCats[i];
    if (whichCol === 0) {
      global.$capaTiles.append('<div class="col0" style="top:' + (160 * whichRow) + 'px;"><a href="">' + category + '</a><img><div>');
      whichCol = 1;
    } else if (whichCol === 1) {
      global.$capaTiles.append('<div class="col1" style="top:' + (160 * whichRow) + 'px;"><a href="">' + category + '</a><img><div>');
      whichCol = 2;
    } else if (whichCol === 2) {
      global.$capaTiles.append('<div class="col2" style="top:' + (160 * whichRow) + 'px;"><a href="">' + category + '</a><img><div>');
      whichCol = 3;
    } else if (whichCol === 3) {
      global.$capaTiles.append('<div class="col3" style="top:' + (160 * whichRow) + 'px;"><a href="">' + category + '</a><img><div>');
      whichCol = 0;
      whichRow++;
    }
  }
  for (var i = 1; i < global.capaCats.length+1; i++) {
    var bw_image = $('#capaList div:nth-of-type(' + parseInt(i) + ') h3').text();
    $('.capaTiles div:nth-of-type(' + parseInt(i) + ') img').attr('src', 'images/uploads/' + global.bwPics[bw_image]);
  }
}

populateProd = function() {
  global.$prodList.empty();
  for (var i = 0; i < global.prodCats.length; i++) {
    var category = global.prodCats[i];
    global.$prodList.append('<div><h3>' + category + '</h3></div>');
  }
  var whichCol = 0;
  var whichRow = 0;
  for (var i = 0; i < global.prodCats.length; i++) {
    var category = global.prodCats[i];
    if (whichCol === 0) {
      global.$prodTiles.append('<div class="col0" style="top:' + (160 * whichRow) + 'px;"><a href="">' + category + '</a><img><div>');
      whichCol = 1;
    } else if (whichCol === 1) {
      global.$prodTiles.append('<div class="col1" style="top:' + (160 * whichRow) + 'px;"><a href="">' + category + '</a><img><div>');
      whichCol = 2;
    } else if (whichCol === 2) {
      global.$prodTiles.append('<div class="col2" style="top:' + (160 * whichRow) + 'px;"><a href="">' + category + '</a><img><div>');
      whichCol = 3;
    } else if (whichCol === 3) {
      global.$prodTiles.append('<div class="col3" style="top:' + (160 * whichRow) + 'px;"><a href="">' + category + '</a><img><div>');
      whichCol = 0;
      whichRow++;
    }
  }
  for (var i = 1; i < global.prodCats.length+1; i++) {
    var bw_image = $('#prodList div:nth-of-type(' + parseInt(i) + ') h3').text();
    $('.prodTiles div:nth-of-type(' + parseInt(i) + ') img').attr('src', 'images/uploads/' + global.bwPics[bw_image]);
  }
}
