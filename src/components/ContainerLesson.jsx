function ContainerLesson({ children, styles }) {
    return <div className={`bg-container px-6 py-4 rounded-2xl mt-6 space-y-5 ${styles}`}>{children}</div>;
}

export default ContainerLesson;
