/**
 * Manage Wrapping HTML Comments for a React component.
 */
function CommentHelper() {}

/**
 */
CommentHelper.prototype.addWrappingComments = function(
  tag,
  currentNode,
  before,
  after
) {
  let parentNode = currentNode.parentNode;

  // Delete pageEditor comments if they were already created - so that they will be updated when state changes.
  let prev = currentNode.previousSibling;
  if (prev && prev.nodeType === Node.COMMENT_NODE) {
    //But don't remove the closing comment of the previous item!
    if (!prev.data.includes("/" + tag)) {
      prev.parentNode.removeChild(prev);
    }
  }
  let next = currentNode.nextSibling;
  if (next && next.nodeType === Node.COMMENT_NODE) {
    //But don't remove the opening comment of the next item!
    if (!next.data.includes(tag + " content")) {
      next.parentNode.removeChild(next);
    }
  }

  // Create the comment to insert before
  let commentBefore = document.createComment(before);
  parentNode.insertBefore(commentBefore, currentNode);

  // Create the comment to insert after
  let commentAfter = document.createComment(after);
  parentNode.insertBefore(commentAfter, currentNode.nextSibling);
};

export default CommentHelper;
