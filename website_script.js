/**
 * Filtering duplicate comments
 * @author Charles Morin
 * @version 1.0
 */
console.log("ChuckyRoll duplicateRemoval extension Loading...");
    
    document.onreadystatechange = function () {
        if (document.readyState == 'complete') {

            /**
             * MutationObserver to detect change in the comments section(Usage of the more comments button).
             */
            const btnObserver = new MutationObserver(observerCallBack);
            const targetNode = document.getElementById("allCommentsList");
            const options = {
                childList: true,
                subtree: true,
                characterData: true
            };

            //When the button "More comments" is clicked, the function checkForDuplicate is called again.
            document.getElementsByName("more_comments")[0].addEventListener("click", function(event) {
                btnObserver.observe(targetNode, options);
            });
            //Check for duplicate in the loaded comment
            checkForDuplicate(getCommentList(), true);

        }
    }

    /**
     * Function called by the callBack of the MutationObserver
     * @param {MutationRecord} mutationList List of all the changes made in the targetNode
     * @param {MutationObserver} observer MutationObserver used to watch the targetNode
     */
    function observerCallBack(mutationList, observer) {
        let counter = 0;
        mutationList.forEach(mutation => {
            //console.log(mutation);
            //console.log(mutation.type);
            //console.log(mutation.target);
            if(mutation.target == document.getElementById("allCommentsList")) {
                counter++;
                //console.log("Counter = "+counter);
            }
        });
        //console.log("Counter = "+counter);
        if(counter >= 2) {
            //console.log("Checking for duplicate in the comments");
            checkForDuplicate(getCommentList(), true);
         }
        observer.disconnect();
    }

    /**
     * Check for duplicate in a list of comments and remove them if found
     * @param commentList The list of comment to check for duplicate.
     * @param isMainComment Weither the comment list are mains comments or not.
     */
    function checkForDuplicate(commentsList, isMainComment) {
        comments_Map = new Map();
        commentsList.forEach(function(currentComment, currentIndex, listObj) {
            let owner, text, repliesList;
            
            if(isMainComment) {
                owner = currentComment.getElementsByClassName("guestbook-list cf")[0].getElementsByClassName("guestbook-name")[0].innerText;
                text = currentComment.getElementsByClassName("guestbook-list cf")[0].getElementsByClassName("guestbook-body")[0].innerText;
                repliesList = Array.prototype.slice.call(currentComment.getElementsByClassName("replylist")[0].getElementsByClassName("guestbook-list cf"));
            }
            else {
                owner = currentComment.getElementsByClassName("guestbook-name")[0].innerText;
                text = currentComment.getElementsByClassName("guestbook-body")[0].innerText;
            }

            //Call checkForDuplicate() when on button "show more comments" onclick for each MainComment.
            if(isMainComment) {
                //Show more Replies under the Main comment box, add a event listener with click to checkForDuplicate again after adding next comment.
                currentComment.querySelector(".more-replies").addEventListener("click", function(event) {
                    //Call the function checkForDuplicate with the specific list to check.
                    //#TODO Replaces setTimeOut with a MutationObserver
                    setTimeout(function() {
                        //Get the specific list
                        let newRepliesList = Array.prototype.slice.call(event.target.parentElement.parentElement.parentElement.getElementsByClassName("guestbook-list cf"));
                        checkForDuplicate(newRepliesList, false)
                    }, 500);
                    console.log("SHOW MORE REPLIES CLICKED");                
                }, false);
            }

            //Removing "removed" comment from taking places in the comment section
            Array.prototype.slice.call(currentComment.getElementsByClassName("removed-comment")).forEach(removedComment => {
                console.log("[Removed comment has been deleted]");
                const firstParent = removedComment.parentElement.parentElement.parentElement;
                const seParent = removedComment.parentElement.parentElement;
                //console.log(firstParent);
                //console.log(seParent);
                removedComment.parentElement.parentElement.parentElement.remove();
            });

            //Does comment exist in the Map?
            //If yes, check if the commentContent is the same.
            if(comments_Map.has(owner)) {
                //Is there already a comment under this username?
                comments_Map.get(owner).forEach(commentText => {
                    //Compare if the comment is indeed a duplicate.
                    if(commentText == text) {
                        //Remove the duplicate from the website.
                        console.log("[Duplicate comment has been deleted]");
                        currentComment.remove();
                    }
                    else {
                        //Is the comment a main comment?
                        //if yes, then check for duplicate in the repliesList of the mainComment.
                        if(isMainComment) {
                            checkForDuplicate(repliesList, false);
                        }
                        //Also, add the comment to the map as another comment under the same username
			            comments_Map.get(owner).push(text);
                    }
                });
            }
            //if no, then add the comment to the commentMap
            else {
                //Is the comment a main comment?
                //if yes, then check for duplicate in the repliesList of the mainComment.
                if(isMainComment) {
                    checkForDuplicate(repliesList, false);
                }
                //Then add the comment in the commentMap
	            comments_Map.set(owner, [text]);
            }
        });
    }

    /**
     * Return a list of visible comments from the episode webpage.
     * 
     * @returns {Array} List of comments.
     */
    function getCommentList() {
        return Array.prototype.slice.call(document.getElementById("allCommentsList").children);
    }