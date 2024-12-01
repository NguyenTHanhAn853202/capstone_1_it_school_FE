import { PATH_MEDIA } from '~/utils/secret';
import CardAd from './Card';

function CourseStore({ data }) {
    console.log(data);

    return (
        <CardAd
            width={'w-[23%]'}
            courseId={data._id}
            image={PATH_MEDIA + data.image}
            price={data.price}
            star={data.star}
            title={data.title}
            viewers={data.studentNumber}
        />
    );
}

export default CourseStore;
