The details / code are in this file:
https://cdn-creativesdk.adobe.io/build/1.0.5/csdk-ui-asset/AssetAPI.js

GETCATALOGS
This gets the LightRoom catalog types:

type:0 is for LightRoom

AdobeCreativeSDK.API.Photos.getCatalogs({type:0}, function(result) {console.log(result.data)} )

returns an array,
with the id property of an entry being what you need for the next function:

was - ad851cf80068498f9815a5b3b293da79
in my case

GETCOLLECTIONS
AdobeCreativeSDK.API.Photos.getCollections({catalogId:"ad851cf80068498f9815a5b3b293da79"}, function(result) {console.log(result.data)} )

This returns an array of all Lightroom Collections

i used id = bc690cc645fbe164a793b63fae8b0815 which was for 2000 - December

showing id and Name properties. they are paged - returns the first 100 results;

GETPHOTOS
AdobeCreativeSDK.API.Photos.getPhotos({catalogId:"ad851cf80068498f9815a5b3b293da79",collectionId:"bc690cc645fbe164a793b63fae8b0815"}, function(result) {console.log(result.data)} )

note the resulting curl is -
https://photo-api.adobe.io/v1.0/catalogs/ad851cf80068498f9815a5b3b293da79/albums/bc690cc645fbe164a793b63fae8b0815/assets?orderby=name

Returns an array of photos where the name is the actual file name etc

metadata object contains lots of information
  - ratings
  - - guid
  - - - rating: 1 (means 1 star)
  - reviews
  - - guid
  - - - flag : "pick"
  - autotags
  - - tags (contains auto generated keywords)
renditions collection
 - 2048 : "a file path needed for use with getRendition()"

Sample photo I was playing with = 1edb743bac607a6b034fd93000eb6706
is picked and has 1 star



curl 'https://stewartsnow.github.io/CreativeCloudSDKTest/librariesAPI/index.html#access_token=eyJ4NXUiOiJpbXNfbmExLWtleS0xLmNlciIsImFsZyI6IlJTMjU2In0.eyJpZCI6IjE1MDU2MDYwMDM1ODJfNWJlOWMzOTEtYjU5Yi00NDZjLWJiNTYtM2NmYmM5ZTE1YjA0X3VlMSIsImNsaWVudF9pZCI6IjkwYzJkNzdkMzU0MzRiYTZhNzhlMzRhNTMzNzA4OTQzIiwidXNlcl9pZCI6IjVEQUQzQzVENEZGODc1NDkwQTQ5MEQ0NUBBZG9iZUlEIiwic3RhdGUiOiIiLCJ0eXBlIjoiYWNjZXNzX3Rva2VuIiwiYXMiOiJpbXMtbmExIiwiZmciOiJSWVNCU1NMRkJKSFFFQUFBQUFBQUFBSUFERT09PT09PSIsIm1vaSI6ImYyOWE1Yjk2IiwiYyI6Ik1iV3lBQWR2U21Va29KU2VxQjdtY0E9PSIsImV4cGlyZXNfaW4iOiI4NjQwMDAwMCIsInNjb3BlIjoiQWRvYmVJRCxvcGVuaWQsY3JlYXRpdmVfc2RrLGFkZHJlc3MsZW1haWwscHJvZmlsZSIsImNyZWF0ZWRfYXQiOiIxNTA1NjA2MDAzNTgyIn0.DlFogD90KqY5qOgzzyv167XuBjE9uPdHyXFh7Mfp7nbk6NH_SkG6ShaKKRgrDluOqLWP3LlTLwnj2bIeWNMXPgMQ1vQXoGo91siiDMB1PPL9tWUxgQDh2zK0lztTBx3tjaTb7_hhhQePyZhzCFEzbwthPNi8BWv3E1vO67oVnUHTvDwCLmDiLn0xCeE1xggk0XrnMb87NUDv2ulg6i-dG4UQEsiY_k9p9GHN6XPInj-qvpMttHFjtefImaY_5c12_uAy-AlrEgb_imqD-7ASJv9hKNv1j3AIhPAWT14YA9HjUnSv0KVgSYOfmqpUIVTvcwLnanaduY6i24zFH3DRcg&token_type=bearer&expires_in=86399991' \
-XGET \
-H 'Referer: https://ims-na1.adobelogin.com/ims/adobeid/90c2d77d35434ba6a78e34a533708943/AdobeID/token?redirect_uri=https%3A%2F%2Fstewartsnow.github.io%2FCreativeCloudSDKTest%2FlibrariesAPI%2Findex.html&permissions=cc_files%2Cprofile%2Cemail%2Caddress&scope=AdobeID%2Copenid%2Ccreative_sdk%2Caddress%2Cemail%2Cprofile&ir=AQ6rF1u91MdqcN-LRtsKESfjr_mrQ5dd21ayetGxOAUmyGWOY3qHZcqdYIUe20tF43HfO6DcWIZVMi2PZwf1tXOzJUVW1vflDWy0UkiyvCBFHtwsNalv62yjj6UqA40n0u8DJE-EEmW2Be3XF4I1Uq5VZLTBNT0f-KRbOEEuKcpad-PPumyoMHI5OQLF52e__HMHdT5_dRBwZrYJlKxc-M4PrG8uDG3mYjCt0U_ejWyO2pzOMlt0LQVA0WUMtdCdO4akXuMS92SiLti8zsWEuLLZoT6LyznxjO8WZGQQPZUVbacv9kluWb1nN0nN0pa1U1y9PK8gz7W1L3bBKlWSzkdCkNgogFPWp3zgcOMZfcGwImD_JWedDjbUB2ZXsH095TmUQgHwSBtGKQXygbQEKE5CJHRn64vM0G9LBgB2v5qhM0nj4GZD-n3XbGnRJGyKCBOL2C3Y9tG0rawcamYJdvF5wnC_jllMBhwSPWDIl5nERuYxo1KUbWyJClgsZs8W4EcmOLJLIc2p-C6jYH_ggHFiY9FZx4kPrNqg73oVslsD4WF8fws1hskmNGnp&invite_code=&opt_in=true&client_id=90c2d77d35434ba6a78e34a533708943' \
-H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8' \
-H 'Cache-Control: no-cache' \
-H 'Pragma: no-cache' \
-H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/603.3.8 (KHTML, like Gecko) Version/10.1.2 Safari/603.3.8'
