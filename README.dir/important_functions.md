## Important Functions

### Data flow

 getRepoContent(api_path) / clipboard-data => onPathContentFetched => addFileSizeAndDownloadLink.. =>  fetchDataAndCreateDOMElements =>

addCopyAndDownloadButton: function() {
   data_clipboard(class_name, e.target) => getRepoContent (contentPath...) => onPathContentFetched(file_data)
}

addFileSizeAndDownloadLink: function() {
   getRepoContent (contentPath...) => onPathContentFetched(file_data)
}
domUtil.addRepoData
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

**fetchDataAndCreateDOMElements**

### fetchDataAndCreateDOMElements / domUtil.js

addCopyAndDownloadButton and addFileSizeAndDownloadLink

### addCopyAndDownloadButton

Adds button download button.

### addFileSizeAndDownloadLink

### onPathContentFetchedForBtns

1. removes clipboard data
2. vote-icon commit - button, defines < a href ..<svg ... >
3. insertsAdjecentHTML 'beforeend'

Embeds clipoard data into download button

### onPathContentFetched

Gets data from

Actual work in parsing and sorting files and putting in file size

### getRepoContent

Gets a json representation repo contents from api.github.com

#### Variables important

GITHUB_API_REPOS_BASE_URI + userRepo + contentParams

##### Example
https://api.github.com/repos/turbo-src/extension/contents/src?ref=master

window.fetch(https://api.github.com/repos/turbo-src/extension/contents/src?ref=master)

### getContentPath / commonUtil.js
tree/master/$file



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
