import { Image } from 'antd';
import loading from '~/public/media/loading/loading.gif';

function ImageCustom({ src, className }) {
    return (
        <Image
            className={className}
            src={src}
            placeholder={<Image preview={false} src={loading} className="!w-[170px] !h-[100px] object-fill" />}
        />
    );
}

export default ImageCustom;
