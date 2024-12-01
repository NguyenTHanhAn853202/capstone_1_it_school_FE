import PostCard from '~/components/PostCard';

function Post() {
    return (
        <div>
            <h1 className="text-12 font-bold">Bài viết nổi bật</h1>
            <div className="flex space-x-5 py-4">
                <div className="flex-1 space-y-2 overflow-y-scroll max-h-[590px]">
                    <PostCard
                        username={'Nguyen Thanh An'}
                        description={
                            ' Chào mừng các bạn đến với diễn đàn của [Tên Hệ Thống Học Lập Trình Trực Tuyến], nơi chúng ta Chào mừng các bạn đến với diễn đàn của [Tên Hệ Thống Học Lập Trình Trực Tuyến], nơi chúng ta'
                        }
                        image={'thumbnail-6741970497d359a0ec6f2294.jpg'}
                        title={'Chào mừng bạn đến với cộng đồng lập trình viên của chúng tôi! 🎉'}
                    />
                    <PostCard
                        username={'Nguyen Thanh An'}
                        description={
                            ' Chào mừng các bạn đến với diễn đàn của [Tên Hệ Thống Học Lập Trình Trực Tuyến], nơi chúng ta Chào mừng các bạn đến với diễn đàn của [Tên Hệ Thống Học Lập Trình Trực Tuyến], nơi chúng ta'
                        }
                        image={'thumbnail-6741970497d359a0ec6f2294.jpg'}
                        title={'Chào mừng bạn đến với cộng đồng lập trình viên của chúng tôi! 🎉'}
                    />
                    <PostCard
                        username={'Nguyen Thanh An'}
                        description={
                            ' Chào mừng các bạn đến với diễn đàn của [Tên Hệ Thống Học Lập Trình Trực Tuyến], nơi chúng ta Chào mừng các bạn đến với diễn đàn của [Tên Hệ Thống Học Lập Trình Trực Tuyến], nơi chúng ta'
                        }
                        image={'thumbnail-6741970497d359a0ec6f2294.jpg'}
                        title={'Chào mừng bạn đến với cộng đồng lập trình viên của chúng tôi! 🎉'}
                    />
                    <PostCard
                        username={'Nguyen Thanh An'}
                        description={
                            ' Chào mừng các bạn đến với diễn đàn của [Tên Hệ Thống Học Lập Trình Trực Tuyến], nơi chúng ta Chào mừng các bạn đến với diễn đàn của [Tên Hệ Thống Học Lập Trình Trực Tuyến], nơi chúng ta'
                        }
                        image={'thumbnail-6741970497d359a0ec6f2294.jpg'}
                        title={'Chào mừng bạn đến với cộng đồng lập trình viên của chúng tôi! 🎉'}
                    />
                    <PostCard
                        username={'Nguyen Thanh An'}
                        description={
                            ' Chào mừng các bạn đến với diễn đàn của [Tên Hệ Thống Học Lập Trình Trực Tuyến], nơi chúng ta Chào mừng các bạn đến với diễn đàn của [Tên Hệ Thống Học Lập Trình Trực Tuyến], nơi chúng ta'
                        }
                        image={'thumbnail-6741970497d359a0ec6f2294.jpg'}
                        title={'Chào mừng bạn đến với cộng đồng lập trình viên của chúng tôi! 🎉'}
                    />
                </div>
                <div className="w-[32%]">
                    <h2 className="text-10 ">Xem các bài viết theo chủ đề</h2>
                    <div className="mt-2">
                        <button className=" ml-2 mb-2 rounded-xl bg-[#F2F5F8]  px-4 py-[3px]">Frontend</button>
                        <button className=" ml-2 mb-2 rounded-xl bg-[#F2F5F8]  px-4 py-[3px]">Frontend</button>
                        <button className=" ml-2 mb-2 rounded-xl bg-[#F2F5F8]  px-4 py-[3px]">Frontend</button>
                        <button className=" ml-2 mb-2 rounded-xl bg-[#F2F5F8]  px-4 py-[3px]">Frontend</button>
                        <button className=" ml-2 mb-2 rounded-xl bg-[#F2F5F8]  px-4 py-[3px]">Frontend</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Post;
