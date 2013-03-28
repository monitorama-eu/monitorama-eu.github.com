
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

// submit notification form
$('.eu .signup form').on('click', 'a', function() {
  var data = {};
  var url = 'https://docs.google.com/a/dixongroup.net/spreadsheet/formResponse?formkey=dE0xdEw2cFVXR05zMlNCQlZYY2RQZGc6MQ&amp;embedded=true&amp;ifq';
  var inputs = $(this).parent().find('input');
  for (var i=0; i<inputs.length; i++) {
    data[inputs[i].name] = inputs[i].value;
  }
  $.post(url, data, function(response) {
    console.log(response);
    console.log('success!');
    $('.eu div.signup form').css('display', 'none');
    $('.eu div.signup').append('<span class="success">We\'ll be in touch!<br />Berlin 2013</span>');
  }).fail(function() {
    console.log('failure!');
    alert('Hmm, something went wrong. Please try again?');
  })
  return false;
})

// populate speakers
/* for (var i in speakers) {
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

  $('section.speakers ul').append('<li class="speaker">' + image + name + twitter + github + bio + '</li>');
} */
