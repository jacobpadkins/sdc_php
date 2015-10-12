
$(document).ready(function() {
  $('#file_upload').on('click', function() {
    if ($('#file_select').val()) {
      $('form').submit();
    }
  });
});
