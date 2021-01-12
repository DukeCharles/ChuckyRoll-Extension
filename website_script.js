/**
 * Filtering duplicate comments
 * @author Charles Morin
 * @version 1.0.0
 */

    window.addEventListener('load', (event) => {
            /**
             * MutationObserver to detect change in the comments section(Usage of the more comments button).
             */
            const btnObserver = new MutationObserver(btnObserverCallBack);
            const targetNode = document.getElementById("allCommentsList");
            const options = {childList: true};

            //When the button "More comments" is clicked, the function checkForDuplicate is called again.
            document.getElementsByName("more_comments")[0].addEventListener("click", function(event) {
                btnObserver.observe(targetNode, options);
            });

            //Check for duplicate in the loaded comment
            checkForDuplicate(getCommentList(), true);

    });

    /**
     * Function called by the callBack of the MutationObserver for the Main Comments
     * @param {MutationRecord} mutationList List of all the changes made in the targetNode
     * @param {MutationObserver} observer MutationObserver used to watch the targetNode
     */
    function btnObserverCallBack(mutationList, observer) {
        let counter = 0;
        mutationList.forEach(mutation => {
            if(mutation.target == document.getElementById("allCommentsList")) {
                counter++;
            }
        });
        if(counter >= 2) {
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

                //Add EventListener
                //Call checkForDuplicate() when on button "show more comments" onclick for each MainComment.
                currentComment.querySelector(".more-replies").addEventListener("click", function(event) {
                    //Observe the change made by the call of the button and then call the checkForDuplicate function after all the changes have been made
                    const targetNode = event.target.parentElement.parentElement.parentElement;
                    const options = {childList: true};
                    const replyObserver = new MutationObserver(function(mutationList, observer) {
                        //Call the function checkForDuplicate with the specific list to check.
                        checkForDuplicate(Array.prototype.slice.call(mutationList[0].target.getElementsByClassName("guestbook-list cf")), false);
                        observer.disconnect();
                    });
                    //Tell the observer to observe any change to the targetNode
                    replyObserver.observe(targetNode, options);                    
                });

            }
            else {
                owner = currentComment.getElementsByClassName("guestbook-name")[0].innerText;
                text = currentComment.getElementsByClassName("guestbook-body")[0].innerText;
            }

            //Deleting "removed" comment from taking places in the comment section
            Array.prototype.slice.call(currentComment.getElementsByClassName("removed-comment")).forEach(removedComment => {
                //console.log("[Removed comment has been deleted]");
                removedComment.parentElement.parentElement.parentElement.remove();
            });

            //Does comment exist in the Map?
            //If yes, check if the commentContent is the same.
            if(comments_Map.has(owner)) {
                //Is there already a comment under this username?
                comments_Map.get(owner).forEach(commentText => {
                    //Compare if the comment is indeed a duplicate.
                    if(commentText.trim() == text.trim()) {
                        //Delete the duplicate from the comment section.
                        //console.log("[Duplicate comment has been deleted]");
                        if(isMainComment) {
                            currentComment.remove();  
                        }
                        else {
                            currentComment.parentElement.remove();
                        }
                        
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