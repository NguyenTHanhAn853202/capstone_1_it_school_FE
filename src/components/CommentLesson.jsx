import CommentLS from "./CommentLS";

function CommentLesson({}) {
    return ( 
        <div className="rounded-xl space-y-2">
            <h1 className="font-bold text-12">12 bình luận</h1>
            <CommentLS />
        </div>
     );
}

export default CommentLesson;