module Main where

import qualified Data.ByteString.Lazy as BSL
import qualified Data.Aeson as A
import qualified System.IO as I

main :: IO ()
main = do
  jsonBsl <- BSL.getContents
  case A.eitherDecode jsonBsl of
    Left err ->
      I.hPutStrLn I.stderr $ "Error while decoding JSON provided via stdin: " ++ err
    Right json ->
      I.hPutStrLn I.stdout $ "JSON: " ++ json
