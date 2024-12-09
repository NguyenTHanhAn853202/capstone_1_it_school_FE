export default function parseMeetingData(response) {
    const urlMatch = response.match(/Join URL\*\*: (https:\/\/[^\s]+)/);
    const passwordMatch = response.match(/Password\*\*: (\S+)/);

    const joinUrl = urlMatch ? urlMatch[1] : '';
    const password = passwordMatch ? passwordMatch[1] : '';

    return { joinUrl, password };
}
