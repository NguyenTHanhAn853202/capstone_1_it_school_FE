function hiddenText(element) {
    return element?.offsetHeight < element?.scrollHeight || element?.offsetWidth < element?.scrollWidth;
}

export default hiddenText;
