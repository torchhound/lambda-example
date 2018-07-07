module Main where

import qualified Data.ByteString.Lazy as BSL
import qualified Data.Aeson as A

main :: IO ()
main = do
  jsonBsl <- BSL.getContents
  case A.eitherDecode jsonBsl of
    Left err ->
      putStrLn $ "Error while decoding JSON provided via stdin: " ++ err
    Right json ->
      putStrLn $ "JSON: " ++ json