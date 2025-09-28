import { useState, useEffect } from "react";
import { Modal, Button, List, Image, message } from "antd";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { imageStorage } from "../utils/localStorage";

const SavedImages = ({ isVisible, onClose }) => {
  const [savedImages, setSavedImages] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (isVisible) {
      setSavedImages(imageStorage.getSavedImages());
    }
  }, [isVisible]);

  const handleDeleteImage = (imageId) => {
    if (imageStorage.deleteImage(imageId)) {
      setSavedImages(imageStorage.getSavedImages());
      message.success("Image deleted successfully!");
    } else {
      message.error("Failed to delete image!");
    }
  };

  const handlePreviewImage = (imageData) => {
    setPreviewImage(imageData);
  };

  return (
    <>
      <Modal
        title="Saved Images"
        open={isVisible}
        onCancel={onClose}
        footer={[
          <Button key="close" onClick={onClose}>
            Close
          </Button>,
        ]}
        width={800}
      >
        <List
          dataSource={savedImages}
          renderItem={(image) => (
            <List.Item
              actions={[
                <Button
                  key="preview"
                  icon={<EyeOutlined />}
                  onClick={() => handlePreviewImage(image.data)}
                >
                  Preview
                </Button>,
                <Button
                  key="delete"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => handleDeleteImage(image.id)}
                >
                  Delete
                </Button>,
              ]}
            >
              <List.Item.Meta
                title={`Saved on ${image.date}`}
                description={`Created: ${new Date(
                  image.timestamp
                ).toLocaleString()}`}
              />
            </List.Item>
          )}
        />
      </Modal>

      <Modal
        title="Image Preview"
        open={!!previewImage}
        onCancel={() => setPreviewImage(null)}
        footer={[
          <Button key="close" onClick={() => setPreviewImage(null)}>
            Close
          </Button>,
        ]}
        width={600}
      >
        {previewImage && (
          <Image
            src={previewImage}
            alt="Saved image preview"
            style={{ width: "100%" }}
          />
        )}
      </Modal>
    </>
  );
};

export default SavedImages;
