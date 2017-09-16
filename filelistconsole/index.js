/* 1) Add click handlers to call your helper functions */
document.getElementById("csdk-login").addEventListener('click', handleCsdkLogin, false);
document.getElementById("csdk-logout").addEventListener('click', handleCsdkLogout, false);

/* 1) Initialize the AdobeCreativeSDK object */
AdobeCreativeSDK.init({
    /* 2) Add your Client ID (API Key) */
    clientID: "90c2d77d35434ba6a78e34a533708943",
    onError: function(error) {
        /* 3) Handle any global or config errors */
        if (error.type === AdobeCreativeSDK.ErrorTypes.AUTHENTICATION) {
            /*
            	Note: this error will occur when you try
                to launch a component without checking if
            	the user has authorized your app.

            	From here, you can trigger
                AdobeCreativeSDK.loginWithRedirect().
            */
            console.log('You must be logged in to use the Creative SDK');
        } else if (error.type === AdobeCreativeSDK.ErrorTypes.GLOBAL_CONFIGURATION) {
            console.log('Please check your configuration');
        } else if (error.type === AdobeCreativeSDK.ErrorTypes.SERVER_ERROR) {
            console.log('Oops, something went wrong');
        }
    }
});

/* 2) Make a helper function */
function handleCsdkLogin() {

    /* 3) Get auth status */
    AdobeCreativeSDK.getAuthStatus(function(csdkAuth) {

        /* 4) Handle auth based on status */
        if (csdkAuth.isAuthorized) {
            // The user is logged in and has authorized your site.
            console.log('Logged in!');
            /* 1) Make a params object to pass to Creative Cloud */
            var params = {
                //path: "/files/My CSDK App test" // defaults to root if not set
            }

            /* 2) Request an array of assets from Creative Cloud */
            AdobeCreativeSDK.API.Files.getAssets(params, function(result) {
                if (result.error) {
                    console.log(result.error);
                    return;
                }

                // Success, an array of assets
                console.log(result.data);
        } else {
            // Trigger a login
            console.log('Not Logged in!');
            AdobeCreativeSDK.login(handleCsdkLogin);
        }
    });
}

/* 2) Make a helper function */
function handleCsdkLogout() {

    /* 3) Get auth status */
    AdobeCreativeSDK.getAuthStatus(function(csdkAuth) {

        /* 4) Handle auth based on status */
        if (csdkAuth.isAuthorized) {
            AdobeCreativeSDK.logout();
            console.log('Logged out!');
        } else {
            console.log('Not logged in!');
        }

    });
}

function handleAuth(auth) {
            if (auth.isAuthorized) {
                // The user is logged in and has authorized your site. You may launch the Asset Browser now.
                launchAssetBrowser();
                console.log('Logged In!');
            } else {
                // Else, trigger a login
                console.log('not logged in so trying');
                AdobeCreativeSDK.login(handleAuth);
            }
        }

        AdobeCreativeSDK.getAuthStatus(handleAuth);

        function launchAssetBrowser() {
            var assetBrowser = new AdobeCreativeSDK.UI.AssetBrowser({
                // openType: 'embed', // options include: embed, lightbox and window. Default is lightbox
                // element: 'domid', // use the element parameter parameter when specifying the "embed" openType
                onOpen: function() {
                    // asset browser launched
                },
                onClose: function() {
                    // asset browser closed
                },
                onError: function() {
                    // a launch error occured
                }
            });

            assetBrowser.open({
                multiSelect: true, // allow the user to select multiple assets
            }, function(response) {
                if (response.error) {
                    console.log('Something went wrong...')
                } else {
                    // response.data is an array of Creative Cloud Assets
                    getRendition(response.data[0], function(res) {
                        if (res.error) {
                            console.log('Something went wrong...')
                        } else {
                            // data contains a base64 encoded string representing the image
                            console.log(res.data)
                        }
                    });
                }
            });
        }

        function getRendition(asset, callback) {
            var assetType = AdobeCreativeSDK.Constants.Asset.RenditionType.PNG;
            var assetSize = 300;
            var photoSize = AdobeCreativeSDK.Constants.Photo.RenditionSize.THUMBNAIL_2X;

            // Use the assetType parameter to determine which getRendition() method to use
            if(asset.assetType == AdobeCreativeSDK.Constants.AssetType.FILES) {
                AdobeCreativeSDK.API.Files.getRendition({
                    path: asset.path,
                    type: assetType,
                    size: assetSize
                }, callback);
            }
            else if(asset.assetType == AdobeCreativeSDK.Constants.AssetType.LIBRARY_ASSETS) {
                AdobeCreativeSDK.API.Libraries.getRendition({
                    itemId: asset.id,
                    libraryId:asset.libraryId,
                    type: assetType,
                    size: assetSize
                }, callback);
            }
            else if(asset.assetType == AdobeCreativeSDK.Constants.AssetType.PHOTOS) {
                AdobeCreativeSDK.API.Photos.getRendition({
                    catalogId: asset.catalogId,
                    collectionId: asset.collectionId,
                    photoId: asset.id,
                    size: photoSize
                }, callback);
            }
            else if(asset.assetType == AdobeCreativeSDK.Constants.AssetType.ILLUSTRATOR_DRAW) {
                AdobeCreativeSDK.API.Draw.getRendition({
                    fileId: asset.fileId,
                    pageId: asset.id,
                    type: assetType,
                    size: assetSize
                }, callback);
            }
            else if( asset.assetType == AdobeCreativeSDK.Constants.AssetType.PHOTOSHOP_SKETCH) {
                AdobeCreativeSDK.API.Sketch.getRendition({
                    fileId: asset.fileId,
                    pageId: asset.id,
                    type: assetType,
                    size: assetSize
                }, callback);
            }
            else if(asset.assetType == AdobeCreativeSDK.Constants.AssetType.PHOTOSHOP_MIX) {
                AdobeCreativeSDK.API.PSMix.getRendition({
                    fileId: asset.fileId,
                    pageId: asset.id,
                    type: assetType,
                    size: assetSize
                }, callback);
            }
            else if(asset.assetType == AdobeCreativeSDK.Constants.AssetType.COMP_CC) {
                AdobeCreativeSDK.API.Comp.getRendition({
                    fileId: asset.fileId,
                    pageId: asset.id,
                    type: assetType,
                    size: assetSize
                }, callback);
            }
            else if(asset.assetType == AdobeCreativeSDK.Constants.AssetType.ILLUSTRATOR_LINE) {
                AdobeCreativeSDK.API.Line.getRendition({
                    fileId: asset.fileId,
                    pageId: asset.id,
                    type: assetType,
                    size: assetSize
                }, callback);
            }
            else if(asset.assetType == AdobeCreativeSDK.Constants.AssetType.PREMIERE_CLIP) {
                AdobeCreativeSDK.API.Clip.getRendition({
                    fileId: asset.fileId,
                    pageId: asset.id,
                    type: assetType,
                    size: assetSize
                }, callback);
            }
        }
