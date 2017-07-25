/**
 * Add 2 numbers num1 and num2
 */

exports.handler = (event, context, callback) => {
  //console.log('Received event:', JSON.stringify(event, null, 2));
  //console.log('Context:', JSON.stringify(context));

  callback(null, {
    statusCode: '200',
    body: (parseInt(event.queryStringParameters.num1) + parseInt(event.queryStringParameters
      .num2)) + '\n',
    headers: {
      'Content-Type': 'application/json'
    }
  });

};