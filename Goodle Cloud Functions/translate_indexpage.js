exports.indexpage = function indexpage(req, res) {
  res.status(200).send(`
<!DOCTYPE html>
<html>

<header>
<script type="text/javascript" src="https://bootswatch.com/bower_components/jquery/dist/jquery.min.js"></script>
<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>

</header>
<body>

<h3>Translating via Functions</h3>

<div class="bs-docs-section">
  <div class="row">
    <div class="col-lg-6">
      <div class="well bs-component">
        <fieldset>
          <legend>Legend</legend>
          <div class="form-group">
            <label for="InputText" class="col-lg-2 control-label">Input Text</label>
            <div class="col-lg-10">
              <textarea class="form-control" rows="3" id="text"></textarea>
            </div>
          </div>
          
          <div class="form-group">
            <label for="TargetLanguage" class="col-lg-2 control-label">Target Language</label>
            <div class="col-lg-10">
              <select class="form-control" width="50%" id="target">
                <option>de</option>
                <option>fr</option>
                <option>ru</option>
                <option>ja</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <div class="col-lg-10 col-lg-offset-2">
              <button type="reset" class="btn btn-default">Cancel</button>
              <button type="submit" class="btn btn-primary" id="translateButton">Translate</button>
            </div>
          </div>

          <div class="form-group">
            <label for="ResultArea" class="col-lg-2 control-label">Translated Text</label>
            <div class="col-lg-10">
                <textarea class="form-control" rows="3" id="result" disabled></textarea>
            </div>
          </div>
        </fieldset>
      </div>
    </div>
  </div>
</div> 

</body>
<script>$("#translateButton").on("click",function() {
  // User your own projectId below
  var req=$.ajax({
    method: "POST",
    url:"https://us-central1-take-5-XXXXXX.cloudfunctions.net/translate",
    headers: {  
      "Accept":"application/json",
      "Content-type":"application/x-www-form-urlencoded"
    },
    data: {
        "source":"en",
        "target":$("#target").val(),
        "text":$("#text").val()
    },
    dataType: "json",

    success: function(response){
        $("#result").val(response.result);
        },
    error: function(response){
        $("#result").val("Error: "+JSON.stringify(response));
    }
    })
});
</script>
</html>`);
};
