import { Segmented } from "antd"
import Avatar from "./Avatar"
import avatar from '~/public/media/images/default_avatar.jpg'
import VideoCard from "./VideoCard"
import image from '~/public/media/images/logo_node_react.png'
import CommentLesson from "./CommentLesson"
// import dashjs from 'da'

function DetailLesson(){
    const arr = new Array(10).fill(null)

    return <div className="flex space-x-5">
        <div className="w-[60%]">
            <video controls className="w-full h-[400px]"></video>
            <h2 className="font-bold mt-1 text-12">1. Lam quen voi java</h2>
            <div className="flex items-center space-x-2 ">
                <Avatar url={avatar} />
                <h2 className="font-bold">Nguyen Thanh An</h2>
            </div>
            
            <div className="bg-container p-4 pt-2 rounded-xl mt-1 mb-5">
                <Segmented options={["Mô tả","Bài tập"]} className="mb-2" />
                <p>
                Khóa học Java này giúp bạn làm quen và phát triển kỹ năng lập trình từ cơ bản đến nâng cao, giúp bạn tự tin phát triển các ứng dụng Java hiệu quả và chuyên nghiệp. Khóa học bao gồm các phần như cú pháp cơ bản, lập trình hướng đối tượng (OOP), xử lý ngoại lệ, làm việc với dữ liệu, và xây dựng ứng dụng Java nâng cao.
                </p>
            </div>
            <CommentLesson />
        </div>
        <div className="flex-1 space-y-2 max-h-[400px] overflow-hidden overflow-y-scroll border-b border-b-2 border-b-mark">
            <h2>Danh sách bài học</h2>
           {arr.map((_,i)=> <VideoCard image={image} to={""} time={120} title={"2. Hello world co ban"} view={60} key={i} />)}
        </div>
    </div>
}

export default DetailLesson