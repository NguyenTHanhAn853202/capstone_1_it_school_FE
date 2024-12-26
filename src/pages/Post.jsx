import { Pagination } from 'antd';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PostCard from '~/components/PostCard';
import { get } from '~/database';
import { pathname } from '~/routes/pathname';

const limit = 3;
function Post() {
    const [categories, setCategories] = useState([]);
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [categoryId, setCategoryId] = useState('');

    useEffect(() => {
        const getData = async () => {
            const resCategories = get('/post/categories');
            const resPosts = get('/post/posts?limit=' + limit);
            const [categoriesData, postsData] = await Promise.all([resCategories, resPosts]);
            categoriesData.status === 'ok' && setCategories(categoriesData.data);
            if (postsData.status === 'ok') {
                setPosts(postsData.data.posts);
                setTotalPages(postsData.data.numberPage);
            }
        };
        getData();
    }, []);

    const handleChangePage = async (currentPage) => {
        try {
            const response = await get(`/post/posts?limit=${limit}&page=${currentPage}&categoryId=${categoryId}`);
            response.status === 'ok' && setPosts(response.data.posts);
            setPage(currentPage);
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleClickCategory = async (id) => {
        try {
            const response = await get(`/post/posts?limit=${limit}&categoryId=${id}`);
            setCategoryId(id);
            setPage(1);
            response.status === 'ok' && setPosts(response.data.posts);
            setTotalPages(response.data.numberPage);
        } catch (error) {
            console.log(error.message);
        }
    };

    console.log(posts);

    return (
        <div>
            <div className="flex justify-between">
                <h1 className="text-12 font-bold">Bài viết nổi bật</h1>
                <Link
                    to={pathname.CREATEPOST}
                    className="border border-button_green px-3 py-[3px] hover:text-button_green rounded-2xl"
                >
                    Thêm bài viết
                </Link>
            </div>
            <div className="flex space-x-5 py-4">
                <div className="flex-1 space-y-2 ">
                    {posts.map((item, index) => (
                        <PostCard
                            id={item._id}
                            key={index}
                            username={item.author.name}
                            avatar={item.author.avatar}
                            description={item.content}
                            image={item.imageUrl}
                            title={item.title}
                            createdAt={item.createdAt}
                        />
                    ))}
                    {totalPages > 1 && (
                        <Pagination defaultCurrent={1} total={totalPages * 10} onChange={handleChangePage} />
                    )}
                </div>
                <div className="w-[32%]">
                    <h2 className="text-10 ">Xem các bài viết theo chủ đề</h2>
                    <div className="mt-2">
                        <button
                            onClick={() => handleClickCategory('')}
                            className={`ml-2 mb-2 rounded-xl bg-[#F2F5F8]  px-4 py-[3px] ${
                                categoryId === '' && 'bg-button_green text-white'
                            }`}
                        >
                            Tất cả
                        </button>
                        {categories.map((item, index) => (
                            <button
                                onClick={() => handleClickCategory(item._id)}
                                className={`ml-2 mb-2 rounded-xl bg-[#F2F5F8]  px-4 py-[3px] ${
                                    categoryId === item._id && 'bg-button_green text-white'
                                }`}
                            >
                                {item.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Post;
