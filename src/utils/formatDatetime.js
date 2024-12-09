export default function formatDateTime(datetimeStr) {
    const date = new Date(datetimeStr);

    // Định dạng ngày
    const formattedDate = date.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });

    // Định dạng giờ
    const formattedTime = date.toLocaleTimeString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false, // Sử dụng định dạng 24 giờ
    });

    return `${formattedDate} ${formattedTime}`;
}
