module Main where

import qualified Data.ByteString.Lazy as BSL
import System.IO (hPutStrLn, stderr)
import System.Environment (getEnv)
import Data.Time (getCurrentTime)
import Data.UUID (toText)
import Data.UUID.V4 (nextRandom)
import Data.Text (pack)
import Control.Monad (void)
import Control.Monad.IO.Class (liftIO)
import Control.Monad.Trans.AWS (runAWST)
import Network.AWS (toBody, runResourceT, send, newEnv, Credentials(Discover))
import Network.AWS.S3 

main :: IO ()
main = do
  bs <- BSL.getContents
  env <- newEnv Discover
  uuid <- liftIO nextRandom
  bucket <- BucketName . pack <$> getEnv "S3_BUCKET"
  let request = putObject bucket (ObjectKey $ toText uuid) (toBody bs)
  runResourceT $ runAWST env $ void $ send request