

function Avatar({style,url,alt,...props}) {
    return (  
        <img className={`block rounded-full size-[50px] ${style}`} src={url} alt={alt} />
    );
}

export default Avatar;