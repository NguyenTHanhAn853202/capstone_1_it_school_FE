import { Avatar } from 'antd';
import { IoShareOutline } from 'react-icons/io5';

function DetailPost() {
    return (
        <div className="flex justify-center pt-4">
            <div className="w-[70%] space-y-4">
                <div className="flex justify-between">
                    <div className="flex space-x-1">
                        <Avatar size={40}>USER</Avatar>
                        <div>
                            <h2>Thanh An</h2>
                            <span>12 thang truoc</span>
                        </div>
                    </div>
                    <button>
                        <IoShareOutline size="1.2rem" />
                    </button>
                </div>
                <h1 className="text-10 font-bold">Chào mừng bạn đến với cộng đồng lập trình viên của chúng tôi! 🎉</h1>
                <p>
                    Tại sao bạn nên tham gia diễn đàn này? Cùng nhau học hỏi Bạn gặp khó khăn khi viết code? Bạn muốn
                    hiểu rõ hơn về thuật toán hoặc cấu trúc dữ liệu? Hay bạn đang băn khoăn cách sử dụng framework hoặc
                    công nghệ mới? Hãy đăng câu hỏi của bạn! Cộng đồng của chúng tôi luôn sẵn sàng giúp đỡ, từ những
                    người mới bắt đầu đến những lập trình viên có kinh nghiệm. Chia sẻ kiến thức và kinh nghiệmNếu bạn
                    vừa học được một mẹo hay về lập trình, một cách giải quyết vấn đề thú vị hoặc thậm chí một dự án mà
                    bạn tự hào, hãy chia sẻ với mọi người. Chia sẻ không chỉ giúp người khác mà còn giúp bạn củng cố
                    kiến thức và xây dựng uy tín cá nhân. Cập nhật xu hướng công nghệDiễn đàn là nơi bạn có thể khám phá
                    các chủ đề nóng hổi về công nghệ như AI, Blockchain, Web3, hay Phát triển ứng dụng di động. Đừng
                    ngần ngại tham gia thảo luận để nắm bắt những xu hướng mới nhất trong ngành IT. Kết nối và mở rộng
                    mạng lướiBạn muốn tìm đồng đội cho một dự án cá nhân? Hoặc kết nối với những người cùng đam mê? Hãy
                    sử dụng diễn đàn để tạo mối quan hệ giá trị và hợp tác trong công việc cũng như học tập. Làm thế nào
                    để bắt đầu? Đăng ký tài khoản nếu bạn chưa có. Tạo bài viết đầu tiên: Giới thiệu bản thân, chia sẻ
                    dự án bạn đang làm, hoặc đặt một câu hỏi. Tham gia thảo luận: Tương tác với các bài viết, trả lời
                    câu hỏi của người khác, và cùng tạo dựng một cộng đồng tích cực. Quy tắc cộng đồng Để diễn đàn luôn
                    là một nơi tích cực và hữu ích, chúng tôi có một số quy tắc nhỏ: Tôn trọng lẫn nhau: Không ngôn từ
                    xúc phạm, không tranh cãi vô nghĩa. Đóng góp có giá trị: Hãy chia sẻ những gì bạn thực sự hiểu biết
                    hoặc cần hỗ trợ. Không spam: Tránh đăng những nội dung không liên quan hoặc quảng cáo không phù hợp.
                    Câu hỏi thú vị cho bạn hôm nay Nếu bạn có thể học một ngôn ngữ lập trình mới trong vòng 1 tuần, bạn
                    sẽ chọn gì và tại sao? Hãy chia sẻ suy nghĩ của bạn trong phần bình luận nhé!
                </p>
            </div>
        </div>
    );
}

export default DetailPost;
