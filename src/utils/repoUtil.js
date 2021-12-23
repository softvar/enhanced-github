window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
window.storageInfo = window.storageInfo || window.webkitStorageInfo;

// Request access to the file system
var fileSystem = null         // DOMFileSystem instance
    , fsType = PERSISTENT       // PERSISTENT vs. TEMPORARY storage
    , fsSize = 10 * 1024 * 1024 // size (bytes) of needed space
;

window.storageInfo.requestQuota(fsType, fsSize, function(gb) {
    window.requestFileSystem(fsType, gb, function(fs) {
        fileSystem = fs;
    }, errorHandler);
}, errorHandler);