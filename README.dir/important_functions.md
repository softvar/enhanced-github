## Important Functions

### Data flow

addCopyAndDownloadButton: function() {
   data_clipboard(class_name, e.target) => getRepoContent (contentPath...) => onPathContentFetched(file_data)

   e = event
   e.target returns the element that was triggered
   https://www.w3schools.com/jsref/tryit.asp?filename=try_dom_event_target

   Window = represents an open window in a browser
}


addCopyAndDownloadButton: function() {
    getRepoContent (contentPath...) => onPathContentFetched(file_data)
}

### addRepoData / domUtil.js

Called in inject.js, and uses a lot of important functions

### fetchDataAndCreateDOMElements / domUtil.js

addCopyAndDownloadButton and addFileSizeAndDownloadLink

### onPathContentFetchedForBtns

Embeds clipoard data into download button

### onPathContentFetched

Gets data from

Actual work in parsing and sorting files and putting in file size

### getRepoContent
Gets input from a function

### getContentPath / commonUtil.js



### setTimout / handlerUtil.js




### addData / domUtil.js

* Gets data `github.com/$user/$repo`
* Sets storageUtil repoSize from data.size
* sets storageUtil defaultBranch form data.default_branch

Goals
* Gets data `github.com/$user/$repo/pulls`
* sets storageUtil defaultBranch form data.default_branch


## Questions

Can we just leave `inject.js` alone, looks like we can.

What happens if you rename window.enhancedGithub to window.turboSrc in inject.js

## Notes

File
github.com/$user/$repo/tree/$branch/dir

Dir
github.com/$user/$repo/blob/$branch/$dir/file
