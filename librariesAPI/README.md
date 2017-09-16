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
