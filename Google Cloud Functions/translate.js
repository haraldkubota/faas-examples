// Translate English into something else

exports.translate = function translate(req, res) {
  const Translate = require('@google-cloud/translate');
  const projectId = 'take-5-XXXXXX'; // Replace with your projectId

  // Instantiates a client
  const translateClient = Translate({
    projectId: projectId
  });


  if (req.body.text === undefined) {
    res.status(401).send(JSON.stringify({
      'error': 'No text defined!'
    }));
  } else if (req.body.target === undefined) {
    res.status(402).send(JSON.stringify({
      'error': 'No target language defined!'
    }));
  } else {

    // Everything is okay.
    let text = req.body.text;
    let target = req.body.target;
    console.log("Target:" + target, "Text:" + text);

    translateClient.translate(text, target)
      .then((results) => {
        const translation = results[0];
        console.log("Translation:" + translation);
        console.log("JSON:" + JSON.stringify({
          'source': 'en',
          'original': text,
          'target': target,
          'result': translation
        }));

        res.status(200).send(JSON.stringify({
          'source': 'en',
          'original': text,
          'target': target,
          'result': translation
        }));
      })
      .catch((err) => {
        res.status(403).send(JSON.stringify({
          'error': err
        }));
      });
  }
};