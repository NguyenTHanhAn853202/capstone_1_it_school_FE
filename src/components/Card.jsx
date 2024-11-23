import { Avatar, Card, Rate, Tooltip } from 'antd';
import Meta from 'antd/es/card/Meta';
import { Link } from 'react-router-dom';
import { pathname } from '~/routes/pathname';
import { formatPrice } from '~/utils/formatPrice';

function CardAd({ image, title, price, viewers, star, courseId, width }) {
    return (
        <Link to={pathname.COURSEINFORMATION + '/' + courseId} className={`w-[300px'] ${width}`}>
            <Card
                style={{
                    width: '100%',
                    height: 310,
                }}
                className={`overflow-hidden !w-[${width}]`}
                cover={<img alt="example" className="h-[200px] object-fill" src={image} />}
            >
                <Tooltip placement="topLeft" title={title}>
                    <h2 className="truncate font-bold text-10">{title}</h2>
                </Tooltip>
                <h4>{price === 0 ? 'Miễn phí' : formatPrice(price) + '  VND'}</h4>
                <div className="flex justify-between items-center mt-1">
                    <Rate className="text-[0.8rem]" defaultValue={star} disabled />
                    <p className="">{viewers} Người</p>
                </div>
            </Card>
        </Link>
    );
}

export default CardAd;
