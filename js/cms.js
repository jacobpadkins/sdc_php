var global = {};

$(document).ready(function() {

  global.selected_file = '';
  global.selected = false;
  global.filter = false;
  populate_images();
  populate_categories();

  // clear input information
  $('#file_select').val('');
  $('#file_preview').val('');

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
    $('#images_col .image, #images_col span').css('background-color', '');
    clear_categories();
    $('i').css('color', '');
    if ($(this).text() != global.selected_file) {
      global.selected_file = $(this).text();
      $('#file_preview').attr('src', 'images/uploads/' + $(this).text());
      $(this).parent('.x_mark').parent('.image').css('background-color', '#F26522');
      set_categories($(this).text());
      global.selected = true;
    } else {
      global.selected = false;
      global.selected_file = '';
    }
  });

  // delete image on clicking cross
  $('#images_col').on('click', '.image .x_box', function() {
    delete_image($(this).siblings('.x_mark').children('span').text());
  });

  // add a capability category
  $('#capa_button').on('click', function() {
    if ($('#capa_input').val()) {
      add_capa($('#capa_input').val());
      $('#capa_input').val('');
    }
  });

  // add a product category
  $('#prod_button').on('click', function() {
    if ($('#prod_input').val()) {
      add_prod($('#prod_input').val());
      $('#prod_input').val('');
    }
  });

  // delete a capability category
  $('#capas_col').on('click', '.capa .x_box', function() {
    delete_capa($(this).siblings('.x_mark').children('span').text());
  });

  // delete a product category
  $('#prods_col').on('click', '.prod .x_box', function() {
    delete_prod($(this).siblings('.x_mark').children('span').text());
  });

  // change flags on checkbox changes - images col
  $('#images_col').on('change', 'input', function() {
    if (global.selected && $(this).attr('name') != 'is_a') {
      if ($(this).is(':checked')) {
        lazy_func(1, $(this).siblings('.x_mark').children('span').text(), 'flag', $(this).attr('name'));
      } else {
        lazy_func(0, $(this).siblings('.x_mark').children('span').text(), 'flag', $(this).attr('name'));
      }
    }
  });

  // change flags on checkbox changes - capa/prod col
  $('#capas_col, #prods_col').on('change', 'input', function() {
    if (global.selected && $(this).attr('name') != 'is_a') {
      if ($(this).attr('name') == 'rep_color') {
        var flag_obj = {rep_color: $(this).siblings('.x_mark').children('span').text()};
        var json_flag_obj = JSON.stringify(flag_obj);
        if ($(this).is(':checked')) {
          lazy_func(1, global.selected_file, 'flag', json_flag_obj);
        } else if (!$(this).is(':checked')) {
          lazy_func(0, global.selected_file, 'flag', json_flag_obj);
        }
      } else if ($(this).attr('name') == 'rep_bw') {
        var flag_obj = {rep_bw: $(this).siblings('.x_mark').children('span').text()}
        var json_flag_obj = JSON.stringify(flag_obj);
        if ($(this).is(':checked')) {
          lazy_func(1, global.selected_file, 'flag', json_flag_obj);
        } else if (!$(this).is(':checked')) {
          lazy_func(0, global.selected_file, 'flag', json_flag_obj);
        }
      }
    } else if (global.selected && $(this).attr('name') == 'is_a') {
      if ($('#capas_col').has($(this)).length) {
        if ($(this).is(':checked')) {
          lazy_func(1, global.selected_file, 'capa', $(this).siblings('.x_mark').children('span').text());
        } else if(!$(this).is(':checked')) {
          lazy_func(0, global.selected_file, 'capa', $(this).siblings('.x_mark').children('span').text());
        }
      } else if ($('#prods_col').has($(this)).length) {
        if ($(this).is(':checked')) {
          lazy_func(1, global.selected_file, 'prod', $(this).siblings('.x_mark').children('span').text());
        } else if (!$(this).is(':checked')) {
          lazy_func(0, global.selected_file, 'prod', $(this).siblings('.x_mark').children('span').text());
        }
      }
    }
  });

  // display the capa namechange modal on category click
  $('#capas_col').on('click', 'span', function() {
    $('#current_capa_name').text($(this).text());
    $('#modal_capa_namechange').modal('show');
  });

  // display the prod namechange modal on category click
  $('#prods_col').on('click', 'span', function() {
    $('#current_prod_name').text($(this).text());
    $('#modal_prod_namechange').modal('show');
  });

  // update capa name
  $('#submit_capa_name').on('click', function() {
    var _capa = $('#current_capa_name').text();
    var _name = $('#new_capa_name').val();
    var data = {capa: _capa, name: _name};
    var json_data = JSON.stringify(data);
    $.ajax({
      url: 'api/cms/capa',
      method: 'PUT',
      datatype: 'json',
      data: json_data,
      success: function(res) {
        location.reload();
      },
      error: function(err) {
        console.log(err);
      }
    });
  });

  // update prod name
  $('#submit_prod_name').on('click', function() {
    var _prod = $('#current_prod_name').text();
    var _name = $('#new_prod_name').val();
    var data = {prod: _prod, name: _name};
    var json_data = JSON.stringify(data);
    $.ajax({
      url: 'api/cms/prod',
      method: 'PUT',
      datatype: 'json',
      data: json_data,
      success: function(res) {
        location.reload();
      },
      error: function(err) {
        console.log(err);
      }
    });
  });

  // sort images on capability click
  $('#capas_col').on('click', 'i.fa-eye', function() {
    var color = $(this).css('color');
    if (color == '#F26522' || color == 'rgb(242, 101, 34)') { 
      $('.image, span').css('background-color', '');
      $('i').css('color', ''); 
    } else {
      if (global.selected = true) {
        global.selected_file = '';
        global.selected = false;
        clear_categories();
      }
      $('i').css('color', '');
      $(this).css('color', '#F26522');
      $('.image, span').css('background-color', '');
      global.filter = true;
      var category = $(this).siblings('div').children('span').text();
      $.ajax({
        method: 'GET',
        url: 'api/cms',
        datatype: 'json',
        success: function(res) {
          res = JSON.parse(res);
          console.log(res);
          for (var i = 0; i < res.imgs.length; i++) {
            for (var j = 0; j < res.imgs[i].Capabilities.length; j++) {
              if (res.imgs[i].Capabilities[j] == category) {
                $('span:contains(' + res.imgs[i].filename + ')').css('background-color', 'orange');
              }
            }
            for (var j = 0; j < res.imgs[i].Flags.length; j++) {
              flag_obj = res.imgs[i].Flags[j];
              console.log(flag_obj);
              if (flag_obj != undefined && flag_obj == '{"rep_color":"' + category + '"}') {
                $('span:contains(' + res.imgs[i].filename + ')').css('background-color', 'Gold');
              }
              if (flag_obj != undefined && flag_obj == '{"rep_bw":"' + category + '"}') {
                $('span:contains(' + res.imgs[i].filename + ')').css('background-color', 'Silver');
              }
            }
          }
        },
        error: function(err) {
          console.log(err);
        }
      });
    }
  });

  // sort images on product click
  $('#prods_col').on('click', 'i.fa-eye', function() {
    var color = $(this).css('color');
    if (color == '#F26522' || color == 'rgb(242, 101, 34)') { 
      $('.image, span').css('background-color', '');
      $('i').css('color', ''); 
    } else {
      if (global.selected = true) {
        global.selected_file = '';
        global.selected = false;
        clear_categories();
      }
      $('i').css('color', '');
      $(this).css('color', '#F26522');
      $('.image, span').css('background-color', '');
      global.filter = true;
      var category = $(this).siblings('div').children('span').text();
      $.ajax({
        method: 'GET',
        url: 'api/cms',
        datatype: 'json',
        success: function(res) {
          res = JSON.parse(res); 
          for (var i = 0; i < res.imgs.length; i++) {
            for (var j = 0; j < res.imgs[i].Products.length; j++) {
              if (res.imgs[i].Products[j] == category) {
                $('span:contains(' + res.imgs[i].filename + ')').css('background-color', 'orange');
              }
            }
            for (var j = 0; j < res.imgs[i].Flags.length; j++) {
              flag_obj = res.imgs[i].Flags[j]; 
              if (flag_obj != undefined && flag_obj == '{"rep_color":"' + category + '"}') {
                $('span:contains(' + res.imgs[i].filename + ')').css('background-color', 'Gold');
              }
              if (flag_obj != undefined && flag_obj == '{"rep_bw":"' + category + '"}') {
                $('span:contains(' + res.imgs[i].filename + ')').css('background-color', 'Silver');
              }
            }
          }
        },
        error: function(err) {
          console.log(err);
        }
     });
    }
  });

  // open sorting modal
  $('#capas_col, #prods_col').on('click', 'i.fa-exclamation', function() {
    var category = $(this).siblings('div').children('span').text();
    $.ajax({
      method: 'GET',
      url: 'api/cms',
      datatype: 'json',
      success: function(res) {
        res = JSON.parse(res); 
        for (var i = 0; i < res.imgs.length; i++) {
          for (var j = 0; j < res.imgs[i].Products.length; j++) {
            if (res.imgs[i].Products[j] == category) {
              $('#importance_list').append('<li class="list-group-item"><img src="images/uploads/'
                + res.imgs[i].filename + '" style="width: 50px; height: 50px;"/></li>');
            }
          }
          for (var j = 0; j < res.imgs[i].Capabilities.length; j++) {
            if (res.imgs[i].Capabilities[j] == category) {
              $('#importance_list').append('<li class="list-group-item"><img src="images/uploads/'
                + res.imgs[i].filename + '" style="width: 50px; height: 50px;"/></li>');
            }
          } 

        }
        new Sortable(document.getElementsByClassName('sortable')[0]);
        $('#importance_name').text(category);
        $('#modal_importance').modal('show'); 
      },
      error: function(err) {
        console.log(err);
      }
    });
  });

  $('#submit_importance').on('click', function() {
    $('#modal_importance').modal('hide');
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
        $('#capas_col').append('<div class="capa"><div class="x_box"></div><input type="checkbox" name="is_a"><input type="checkbox" name="rep_color"><input type="checkbox" name="rep_bw"><i class="fa fa-eye"></i><i class="fa fa-exclamation"></i><div class="x_mark"><span>' + res[i] + '</span></div></div>');
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
        $('#prods_col').append('<div class="prod"><div class="x_box"></div><input type="checkbox" name="is_a"><input type="checkbox" name="rep_color"><input type="checkbox" name="rep_bw"><i class="fa fa-eye"></i><i class="fa fa-exclamation"></i><div class="x_mark"><span>' + res[i] + '</span></div></div>');
      }
    }
  });
}

delete_image = function(file) {
  var data = {filename: file};
  var json_data = JSON.stringify(data);
  $.ajax({
    method: 'DELETE',
    dataType: 'json',
    url: 'api/cms/img',
    data: json_data,
    success: function(res) {
      location.reload();
    },
    error: function(err) {
      console.log(err);
    }
  });
}

set_categories = function(file) {
  var data = {filename: file};
  var json_data = JSON.stringify(data);
  $.ajax({
    method: 'POST',
    dataType: 'json',
    url: 'api/cms/img/tags',
    data: json_data,
    success: function(res) {
      console.log(res);
      for (var i = 0; i < res.Capabilities.length; i++) {
        $('#capas_col span:contains("' + res.Capabilities[i] + '")').parent('.x_mark').siblings('input[name="is_a"]').prop('checked', 'true');
      }
      for (var i = 0; i < res.Products.length; i++) {
        $('#prods_col span:contains("' + res.Products[i] + '")').parent('.x_mark').siblings('input[name="is_a"]').prop('checked', 'true');
      }
      for (var i = 0; i < res.Flags.length; i++) {
        if (res.Flags[i] == 'Small_Slide' || res.Flags[i] == 'Big_Slide') {
          $('#images_col span:contains("' + file + '")').parent('.x_mark').siblings('input[name="' + res.Flags[i] + '"]').prop('checked', 'true');
        } else {
          flag_obj = JSON.parse(res.Flags[i])
          flag_key = Object.keys(flag_obj)
          $('#capas_col, #prods_col').find('span:contains("' + flag_obj[flag_key[0]] + '")').parent('.x_mark').siblings('input[name="' + flag_key[0] + '"]').prop('checked', 'true');
        }
      }
    },
    error: function(err) {
      console.log(err);
    }
  })
}

clear_categories = function() {
  $('input:checked').removeAttr('checked');
}

add_capa = function(_capa) {
  var data = {capa: _capa};
  var json_data = JSON.stringify(data);
  $.ajax({
    method: 'POST',
    dataType: 'json',
    url: 'api/cms/capa',
    data: json_data,
    success: function(res) {
      console.log(res);
      populate_categories();
    },
    error: function(err) {
      console.log(err);
    }
  });
}

delete_capa = function(_capa) {
  var data = {capa: _capa};
  var json_data = JSON.stringify(data);
  $.ajax({
    method: 'DELETE',
    dataType: 'json',
    url: 'api/cms/capa',
    data: json_data,
    success: function(res) {
      console.log(res);
      populate_categories();
    },
    error: function(err) {
      console.log(err);
    }
  });
}

add_prod = function(_prod) {
  var data = {prod: _prod};
  var json_data = JSON.stringify(data);
  $.ajax({
    method: 'POST',
    dataType: 'json',
    url: 'api/cms/prod',
    data: json_data,
    success: function(res) {
      console.log(res);
      populate_categories();
    },
    error: function(err) {
      console.log(err);
    }
  });
}

delete_prod = function(_prod) {
  var data = {prod: _prod};
  var json_data = JSON.stringify(data);
  $.ajax({
    method: 'DELETE',
    dataType: 'json',
    url: 'api/cms/prod',
    data: json_data,
    success: function(res) {
      console.log(res);
      populate_categories();
    },
    error: function(err) {
      console.log(err);
    }
  });
}

lazy_func = function(_operation, _file, _category, _name) {
  var data = {operation: _operation, file: _file, category: _category, name: _name};
  var json_data = JSON.stringify(data);
  $.ajax({
    method: 'PUT',
    dataType: 'json',
    url: 'api/cms/img',
    data: json_data,
    success: function(res) {
      console.log(res);
    },
    error: function(err) {
      console.log(err);
    }
  })
}
