var global = {};

$(document).ready(function() {

  global.selected_file = '';
  global.selected = false;

  populate_images();
  populate_categories();

  // preview on selecting an image
  $('#file_select').change(function() {
    global.selected_file = '';
    global.selected = false;
    set_preview(this);
  });

  // upload file submit event
  $('#file_upload').on('click', function() {
    if ($('#file_select').val()) {
      $('form').submit();
    }
  });

  // display preview on hover
  $('#images_col').on('mouseover', '.image', function() {
    if (!$('#file_select').val() && !global.selected) {
      $('#file_preview').attr('src', 'images/uploads/' + $(this).children('.x_mark').children('span').text());
    }
  });

  // clear display image on mouseleave
  $('#images_col').on('mouseleave', '.image', function() {
    if (!$('#file_select').val() && !global.selected) {
      $('#file_preview').attr('src', '');
    }
  });

  // change selected image on click
  $('#images_col').on('click', '.image .x_mark span', function() {
    $('#images_col .image').css('background-color', '');
    // TODO clear_categories();
    if ($(this).text() != global.selected_file) {
      global.selected_file = $(this).text();
      $('#file_preview').attr('src', 'images/uploads/' + $(this).text());
      $(this).parent('.x_mark').parent('.image').css('background-color', '#F26522');
      // TODO set_categories($(this).text());
      global.selected = true;
    } else {
      global.selected = false;
      global.selected_file = '';
    }
  });

  // delete image on clicking cross
  $('#images_col').on('click', '.image .x_box', function() {
    // TODO delete_image($(this).siblings('.x_mark').children('span').text());
  });

  // add a capability category
  $('#capa_button').on('click', function() {
    if ($('#capa_input').val()) {
      // TODO add_capa($('#capa_input').val());
      $('#capa_input').val('');
    }
  });

  // add a product category
  $('#prod_button').on('click', function() {
    if ($('#prod_input').val()) {
      // TODO add_prod($('#prod_input').val());
      $('#prod_input').val('');
    }
  });

  // delete a capability category
  $('#capas_col').on('click', '.capa .x_box', function() {
    // TODO delete_capa($(this).siblings('.x_mark').children('span').text());
  });

  // delete a product category
  $('#prods_col').on('click', '.prod .x_box', function() {
    // TODO delete_prod($(this).siblings('.x_mark').children('span').text());
  });

  // change flags on checkbox changes - images col
  $('#images_col').on('change', 'input', function() {
    if (global.selected && $(this).attr('name') != 'is_a') {
      if ($(this).is(':checked')) {
        // TODO lazy_func(1, $(this).siblings('.x_mark').children('span').text(), 'flag', $(this).attr('name'));
      } else {
        // TODO lazy_func(0, $(this).siblings('.x_mark').children('span').text(), 'flag', $(this).attr('name'));
      }
    }
  });

  // change flags on checkbox changes - capa/prod col
  $('#capas_col, #prods_col').on('change', 'input', function() {
    if (global.selected && $(this).attr('name') != 'is_a') {
      if ($(this).attr('name') == 'rep_color') {
        var flag_obj = {rep_color: $(this).siblings('.x_mark').children('span').text()};
        if ($(this).is(':checked')) {
          // TODO lazy_func(1, selected_file, 'flag', flag_obj);
        } else if (!$(this).is(':checked')) {
          // TODO lazy_func(0, selected_file, 'flag', flag_obj);
        }
      } else if ($(this).attr('name') == 'rep_bw') {
        flag_obj = {rep_bw: $(this).siblings('.x_mark').children('span').text()}
        if ($(this).is(':checked')) {
          // TODO lazy_func(1, selected_file, 'flag', flag_obj);
        } else if (!$(this).is(':checked')) {
          // TODO lazy_func(0, selected_file, 'flag', flag_obj);
        }
      }
    } else if (global.selected && $(this).attr('name') == 'is_a') {
      if ($('#capas_col').has($(this)).length) {
        if ($(this).is(':checked')) {
          // TODO lazy_func(1, selected_file, 'capa', $(this).siblings('.x_mark').children('span').text());
        } else if(!$(this).is(':checked')) {
          // TODO lazy_func(0, selected_file, 'capa', $(this).siblings('.x_mark').children('span').text());
        }
      } else if ($('#prods_col').has($(this)).length) {
        if ($(this).is(':checked')) {
          // TODO lazy_func(1, selected_file, 'prod', $(this).siblings('.x_mark').children('span').text());
        } else if (!$(this).is(':checked')) {
          // TODO lazy_func(0, selected_file, 'prod', $(this).siblings('.x_mark').children('span').text());
        }
      }
    }
  });
});

set_preview = function(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function(e) {
      $('#file_preview').attr('src', e.target.result);
    }
    reader.readAsDataURL(input.files[0]);
  }
}

populate_images = function() {
  $('#images_col').empty();
  $.ajax({
    method: 'GET',
    dataType: 'json',
    url: 'api/cms/img',
    success: function(res) {
      res.sort();
      for (var i = 0; i < res.length; i++) {
        $('#images_col').append('<div class="image"><div class="x_box"></div><input type="checkbox" name="Big_Slide"><input type="checkbox" name="Small_Slide"><div class="x_mark"><span>' + res[i] + '</span></div></div>');
      }
    },
    error: function(err) {
      console.log('ERROR in populate_images()');
    }
  });
}

populate_categories = function() {
  $('#capas_col, #prods_col').empty();
  $.ajax({
    method: 'GET',
    datatype: 'json',
    url: 'api/cms/capa',
    success: function(res) {
      res = JSON.parse(res);
      console.log(res);
      res.sort();
      for (var i = 0; i < res.length; i++) {
        $('#capas_col').append('<div class="capa"><div class="x_box"></div><input type="checkbox" name="is_a"><input type="checkbox" name="rep_color"><input type="checkbox" name="rep_bw"><div class="x_mark"><span>' + res[i] + '</span></div></div>');
      }
    }
  });
  $.ajax({
    method: 'GET',
    datatype: 'json',
    url: 'api/cms/prod',
    success: function(res) {
      res = JSON.parse(res);
      console.log(res);
      res.sort();
      for (var i = 0; i < res.length; i++) {
        $('#prods_col').append('<div class="prod"><div class="x_box"></div><input type="checkbox" name="is_a"><input type="checkbox" name="rep_color"><input type="checkbox" name="rep_bw"><div class="x_mark"><span>' + res[i] + '</span></div></div>');
      }
    }
  });
}
