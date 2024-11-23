import CardAd from './Card';

function CourseStore({ data }) {
    return (
        <CardAd
            width={"w-[23%]"}
            courseId={data.courseId}
            image={data.image}
            price={data.price}
            star={data.star}
            title={data.title}
            viewers={data.viewers}
        />
    );
}

export default CourseStore;
