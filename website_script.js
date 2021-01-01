console.log("ChuckyRoll duplicateRemoval extension Loading...");
/**
 * Filtering duplicate comments
 */
    let comments_Map = new Map();
    let comments_Index = 0;
    
    document.onreadystatechange = function () {
        if (document.readyState == 'complete') {
            document.getElementsByName("more_comments")[0].addEventListener("click", function() {setTimeout(function() {checkForDuplicate()}, 500)});
            checkForDuplicate();
        }
    }
    
    function checkForDuplicate() {
        let commentsList = document.getElementById("allCommentsList").querySelectorAll('li:not([class]):not([id])');

        commentsList.forEach(function(currentComment, currentIndex, listObj) {
            
            let commentOwner = currentComment.getElementsByClassName("guestbook-list cf")[0].getElementsByClassName("guestbook-name")[0].innerText;
            let commentContent = currentComment.getElementsByClassName("guestbook-list cf")[0].getElementsByClassName("guestbook-body")[0].innerText;
    
            if(currentIndex >= comments_Index) {
                if(comments_Map.has(commentOwner)) {
                    comments_Map.get(commentOwner).forEach(comment => {
                        if(comment == commentContent) {
                            currentComment.remove();
                        }
                        else {
                            comments_Map.get(commentOwner).push(commentContent);
                            comments_Index++;
                        }
                    });
                }
                else {
                    comments_Map.set(commentOwner, [commentContent])
                    comments_Index++;
                }
            }
        });
    }

