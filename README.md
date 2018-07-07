# lambda-example

Haskell on AWS Lambda via a Node.js shim.

`sudo pacman -S docker`

`sudo usermod -aG docker $USER`

`stack docker pull`

According to [this stack issue](https://github.com/commercialhaskell/stack/issues/4087) use `stack-exe: download` in `stack.yaml` to get a statically linked stack for docker to work.

`stack build lambda-example --docker`

`sudo pacman -S zip`

`zip -j lambda-example.zip src/index.js .stack-work/install/x86_64-linux-dkda49f7ca9b244180d3cfb1987cbc9743/lts-11.16/8.2.2/bin/lambda-example`

Create Lambda function with correct Node runtime and IAM role. Upload zip, save, and test!