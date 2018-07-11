# lambda-example

Haskell on AWS Lambda via a Node.js shim.

`sudo pacman -S docker`

`sudo usermod -aG docker $USER`

`stack docker pull`

According to [this stack issue](https://github.com/commercialhaskell/stack/issues/4087) use `stack-exe: download` in `stack.yaml` to get a statically linked stack for docker to work.

`stack build lambda-example --docker`

`sudo pacman -S zip`

`zip -j lambda-example.zip src/index.js .stack-work/install/x86_64-linux-dkda49f7ca9b244180d3cfb1987cbc9743/lts-11.16/8.2.2/bin/lambda-example`

Create Lambda function with correct Node runtime and IAM role. Create an S3 bucket and add the environment variable `S3_BUCKET` to your Lambda. Upload zip and save. Then add an API Gateway trigger and create an API Gateway test event. Hit test and your S3 bucket will have a file containing the body of your test event!