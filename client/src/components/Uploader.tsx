import { useState } from "react";
import axios, { AxiosProgressEvent } from "axios";
import { Upload, Button, Form, Progress } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_UPLOAD_PRESENT,
} from "../constants/constants";
import type { UploadRequestOption as RcCustomRequestOptions } from "rc-upload/lib/interface";
import { IUploaderProps } from "../interfaces/IUploaderProps";

function Uploader({ setAvatarUrl }: IUploaderProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const customRequest = async ({
    onSuccess,
    onError,
    file,
  }: RcCustomRequestOptions) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESENT);

    setLoading(true);

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData,
        {
          onUploadProgress: (progressEvent: AxiosProgressEvent) => {
            if (progressEvent  && progressEvent.total && progressEvent.loaded) {
              const percentCompleted = Math.round(
                (progressEvent.loaded / progressEvent.total) * 100
              );
              setUploadProgress(percentCompleted);
              console.log(`Upload progress: ${percentCompleted}%`);
            }
          }
        }
      );

      if (res.status === 200) {
        if (onSuccess) {
          setAvatarUrl(res.data.secure_url);
          onSuccess("Ok");
        }
        setLoading(false);
      }
    } catch (err: any) {
      setLoading(false);
      if (onError) {
        onError(err);
      }
      console.error("Error:", err);
    }
  };

  return (
    <>
      <label>Upload profile image</label>

      <Form.Item
        rules={[
          {
            required: true,
            message: "Please upload your avatar!",
          },
        ]}
      >
        <ImgCrop rotationSlider>
          <Upload
            onPreview={() => null}
            name="avatar"
            customRequest={customRequest}
            className="antd--upload--button"
            maxCount={1}
            listType="picture"
          >
            <Button icon={<UploadOutlined />} loading={loading}>
              Upload
            </Button>
          </Upload>
        </ImgCrop>
        {loading && <Progress percent={uploadProgress} />}
      </Form.Item>
    </>
  );
}

export default Uploader;
