function timeAgo(dateTime) {
    const now = new Date();
    const past = new Date(dateTime);
    const diffInSeconds = Math.floor((now - past) / 1000);

    if (diffInSeconds < 60) {
        return `${diffInSeconds} giây`;
    } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `${minutes} phút`;
    } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours} giờ`;
    } else if (diffInSeconds < 2592000) {
        // < 30 ngày
        const days = Math.floor(diffInSeconds / 86400);
        return `${days} ngày`;
    } else if (diffInSeconds < 31536000) {
        // < 1 năm
        const months = Math.floor(diffInSeconds / 2592000); // 30 ngày
        return `${months} tháng`;
    } else {
        const years = Math.floor(diffInSeconds / 31536000); // 365 ngày
        return `${years} năm`;
    }
}

export default timeAgo;
