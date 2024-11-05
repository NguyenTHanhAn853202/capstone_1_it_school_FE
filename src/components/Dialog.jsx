import React, { useState } from 'react';
import { Modal } from 'antd';
const Dialog = ({ open, setOpen, confirmLoading, title, content, handleOk }) => {
    const handleCancel = () => {
        setOpen(false);
    };
    return (
        <Modal title={title} open={open} onOk={handleOk} confirmLoading={confirmLoading} onCancel={handleCancel}>
            <p>{content}</p>
        </Modal>
    );
};
export default Dialog;
