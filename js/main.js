// listen for form submit
document.getElementById("myForm").addEventListener("submit", saveBookmark);

// Save bookmark
function saveBookmark(event) {
   // Get form values
   let siteName = document.getElementById("siteName").value;
   let siteUrl = document.getElementById("siteUrl").value;

    if (!validateForm(siteName, siteUrl)) {
        return false;
    }

   let bookmark = {
        name: siteName,
        url: siteUrl
    }

 // Test if bookmarks is null
 if (localStorage.getItem('bookmarks') === null) {
     // init array
     let bookmarks = [];
     // Add to array
     bookmarks.push(bookmark);
     // Set to Local Storage
     localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
 } else {
     // Get from bookmarks from local storage
     let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
     // Add bookmark to array
     bookmarks.push(bookmark);
     // Reset back to local storage
     localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
 }

    // Clear form
    document.getElementById('myForm').reset();

    // Refetch bookmarks
    fetchBookmarks();

    // prevent form from submitting
    event.preventDefault();
}

// Delete bookmark
function deleteBookmark(url) {
    // Get bookmarks from Local Storage
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    // Loop through bookmrks
    for (let i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].url == url) {
            // Remove from array
            bookmarks.splice(i, 1);
        }
    }
    // Reset back to local storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    // Refecth bookmarks
    fetchBookmarks();
}

// Fetch bookmarks
function fetchBookmarks() {
    // Get from bookmarks from local storage
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    // Get output id
    let bookmarksResults = document.getElementById('bookmarkResults');

    // Build output
    bookmarksResults.innerHTML = "";
    for (let index = 0; index < bookmarks.length; index++) {
        const name = bookmarks[index].name;
        const url = bookmarks[index].url;

        bookmarksResults.innerHTML += '<div class="well">'+
                                      '<h3>'+name+
                                      ' <a class="btn btn-default" target = "+blank" href="'+url+'">Visit</a> ' +
                                      ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> ' +
                                      '</h3>'+
                                      '</div>';
    }
}

function validateForm(siteName, siteUrl) {
    if (!siteName || !siteUrl) {
        alert('Please fill out the form');
        return false;
       }
    
       var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
       var regex = new RegExp(expression);
    
       if (!siteUrl.match(regex)) {
           alert('Please use a valid HTTP URL');
           return false;
       }

       return true;
}