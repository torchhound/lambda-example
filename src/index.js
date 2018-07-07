/*
The MIT License (MIT)
Copyright © 2016 Tim Baumann, http://timbaumann.info

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the “Software”), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

const spawn = require('child_process').spawn;

exports.handler = function (event, context, callback) {
  process.env['PATH'] = process.env['PATH'] + ':' + process.env['LAMBDA_TASK_ROOT'];
  const executable = './lambda-example';
  const main = spawn(executable, { stdio: ['pipe', process.stdout, process.stderr] });

  main.on('error', function (err) {
    console.error('error: ' + err);
    callback(err, err);
  });

  main.on('exit', function (code) {
    if (code !== 0) {
      callback(new Error(
        "'" + executable + "' exited with non-zero exit code. Please check stderr for details."
      ));
    } else {
      callback(null, {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "ok": true, "description": "update has been processed" })
      });
    }
  });

  main.stdin.write(event.body);
  main.stdin.end();
};