
// resize splash on load
var width = $(window).width();
var height = $(window).height();
console.log('setting width to ' + width + ' and height to ' + height);
$('div.splash').css('height', height);

// alert older MSIE browsers
if (($.browser.msie) && ($.browser.version <= 8.0)) {
  alert('Your browser does not support HTML5, which is required for this site.\nRedirecting you to the official Registration site now.')
  window.location.href = 'http://monitorama-eu.eventbrite.com/';
}

// render view according to hash
var setSection = function(name) {
  $('section').css('display', 'none').css('height', '0')
  $('header ul li a').removeClass('active');
  $('section.' + name).css('display', 'block').css('height', 'auto')
  $('header ul li a#' + name).addClass('active');
  window.location.hash = name;
  window.scrollTo(0,0);
}

// load view by click
$('header ul li').on('click', 'a', function() {
  var sid = ($(this).attr('id'));
  setSection(sid);
  return false;
});

// load view by anchor
if (window.location.hash.length !== 0) {
  setSection(window.location.hash.replace('#', ''));
}

var formHandler = function (url) {
  return function () {
    var data = {};
    var parent = $(this).parent();
    var inputs = parent.find('input, textarea');
    for (var i=0; i<inputs.length; i++) {
      data[inputs[i].name] = inputs[i].value;
    }
    var thanks = function (response) {
      parent.parent().find('p, form').css('display', 'none');
      parent.parent().append('<span class="success">Thanks for your submission!</span>');
    }
    $.post(url, data, thanks).fail(thanks);
    return false;
  }
}

// submit CFP form
$('.demos .signup form').on('click', 'a', formHandler('https://docs.google.com/a/m.aier.us/forms/d/1QfIOleC_dIM7dg5gIw5Bjdk-R8PfgZl8qAlsRVtumXk/formResponse'));

// submit 5k form
$('.run .signup form').on('click', 'a', formHandler('https://docs.google.com/a/m.aier.us/forms/d/19Wmg2FvtQCciFXzNUojWIreHkvPysyLisL7gEMUKnP4/formResponse'));

// iterate through speakers
for (var i in speakers) {
  var image = '<img src="http://www.gravatar.com/avatar/' + speakers[i].hash + '" />';
  var name = '<span class="name">' + speakers[i].name + '</span>';
  var github = '';
  if (speakers[i].github.length > 0) {
    github = '<span class="github"><a href="https://github.com/' +
      speakers[i].github + '" target="_new">github</a></span>';
  }
  var twitter = '<span class="twitter"><a href="https://twitter.com/' +
    speakers[i].twitter + '" target="_new">twitter</a></span>';
  var bio = '<p class="bio">' + speakers[i].bio + '</p>';
  var video = '';
  var slides = '';

  if (speakers[i].videos) {
    for (var j in speakers[i].videos) {
      video += '<iframe class="video" src="http://player.vimeo.com/video/' + speakers[i].videos[j] + '" width="763" height="375" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';
    }
  }

  if (speakers[i].slides) {
    for (var j in speakers[i].slides) {
      slides += '<span class="slides"><a href="' + speakers[i].slides[j] + '" target="_new">slides</a></span>';
    }
  }

  // populate speaker blocks
  $('section.speakers ul').append('<li class="speaker">' + image + name + slides + twitter + github + bio + video + '</li>');

  // populate abstracts for schedule
  if (speakers[i].abstract.length > 0) {
    $('section.schedule td.session:contains(' + speakers[i].name + ')').append(
      '<span class="hidden abstract"><span class="name">' + speakers[i].name + '</span><hr />' + speakers[i].abstract + '</span>'
    );
  }

  // display abstracts on hover
  $('section.schedule').on('mouseenter', 'td.session', function() {
    $(this).children('span').removeClass('hidden');
  }).on('mouseleave', 'td.session', function() {
    $(this).children('span').addClass('hidden');
  });
}
