const spawn = require('child_process').spawn

exports.handler = function (event, context, callback) {
  process.env['PATH'] = process.env['PATH'] + ':' + process.env['LAMBDA_TASK_ROOT']
  const executable = './lambda-example'
  const main = spawn(executable, { stdio: ['pipe', process.stdout, process.stderr] })

  main.on('error', function (err) {
    console.error('error: ' + err)
    callback(err, err)
  })

  main.on('exit', function (code) {
    callback(null, {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ "ok": true, "description": "S3 upload successful" })
    })
  })

  main.stdin.write(event.body)
  main.stdin.end()
}
