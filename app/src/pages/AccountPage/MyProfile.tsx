import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { User, Language } from "types";
import { getUserDetails } from "services";
import { useLoaderData } from "react-router-dom";
import { useAuth } from "context";
import { Select, Input, Button, DatePicker, Tag } from "antd";

const MyProfile: React.FC = () => {

  console.log("sasda:", useLoaderData() as { languages: Language[] });

  const { authState } = useAuth();
  const { t } = useTranslation();
  const [userDetails, setUserDetails] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false); // 添加一个状态变量来控制是否处于编辑模式
  const [isEditingTwo, setIsEditingTwo] = useState(false); // 添加一个状态变量来控制是否处于编辑模式

  const languageOptions = ["English", "Chinese", "Korean"];

  const [disabledButton, setDisabledButton] = useState(false);

  const selectOptions = languageOptions.map((lang) => (
    <Select.Option key={lang}>{lang}</Select.Option>
  ));

  const [usernameValue, setUsernameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [dateOfBirthValue, setDateOfBirthValue] = useState("");
  const [nativeLanguageValue, setNativeLanguageValue] = useState<string[]>([]);
  const [targetLanguageValue, setTargetLanguageValue] = useState<string[]>([]);

  useEffect(() => {
    const details = {
      userId: "",
      username: "Drizzle",
      email: "tiddler_7@qq.com",
      dateOfBirth: "1990-01-01",
      nativeLanguage: ["English"],
      targetLanguage: ["Chinese"],
    };
    setUserDetails(details);

    setUsernameValue(details.username);
    setEmailValue(details.email);
    setDateOfBirthValue(details.dateOfBirth);
    setNativeLanguageValue(details.nativeLanguage);
    setTargetLanguageValue(details.targetLanguage);
  }, []);

  const saveUserInfo = async () => {
    setIsEditing(false);

    const modifiedUserDetails = {
      userId: "",
      username: usernameValue as string,
      email: emailValue as string,
      dateOfBirth: dateOfBirthValue as string,
      nativeLanguage: nativeLanguageValue,
      targetLanguage: targetLanguageValue,
    };
    setUserDetails(modifiedUserDetails);
  };

  const saveEmail = async () => {
    setIsEditingTwo(false);

    const modifiedUserDetails = {
      userId: "",
      username: usernameValue as string,
      email: emailValue as string,
      dateOfBirth: dateOfBirthValue as string,
      nativeLanguage: nativeLanguageValue,
      targetLanguage: targetLanguageValue,
    };
    setUserDetails(modifiedUserDetails);
  };

  if (!userDetails) {
    return <div>{authState.user?.username}</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{t("My Profile")}</h2>
      <div className="w-80% mx-auto p-6 rounded-lg shadow-md">
        {isEditing ? (
          // 如果处于编辑模式，显示编辑表单
          <div>
            <div className="mb-2">
              <label className="block font-bold text-gray-700">
                {t("Username")}:{" "}
              </label>
              <Input
                defaultValue={userDetails.username}
                onChange={(e) => {
                  setUsernameValue(e.target.value);
                }}
                style={{ width: "20rem" }}
              />
            </div>
            <div className="mb-2">
              <label className="block font-bold text-gray-700">
                {t("Date of birth")}:{" "}
              </label>
              <DatePicker
                placeholder={userDetails.dateOfBirth}
                onChange={(date, dateString) => {
                  setDateOfBirthValue(dateString as string);
                }}
              />
            </div>
            <div className="mb-2">
              <label className="block font-bold text-gray-700">
                {t("Native language")}:{" "}
              </label>
              <Select
                mode="multiple"
                style={{ width: "100%" }}
                placeholder="Please select"
                defaultValue={userDetails.nativeLanguage}
                onChange={(value) => {
                  setNativeLanguageValue(value as string[]);
                }}
              >
                {selectOptions}
              </Select>
            </div>
            <div className="mb-2">
              <label className="block font-bold text-gray-700">
                {t("Target language")}:{" "}
              </label>
              <Select
                mode="multiple"
                style={{ width: "100%" }}
                placeholder="Please select"
                defaultValue={userDetails.targetLanguage}
                onChange={(value) => {
                  setTargetLanguageValue(value as string[]);
                }}
              >
                {selectOptions}
              </Select>
            </div>

            <button
              onClick={saveUserInfo}
              className="bg-blue-500 text-white px-4 py-1 rounded mt-5"
            >
              {t("Save")}
            </button>
          </div>
        ) : (
          // 如果不处于编辑模式，显示用户信息
          <div>
            <div className="mb-2">
              <label className="block font-bold text-gray-700">
                {t("Username")}:{" "}
              </label>
              <span className="text-gray-600">{userDetails.username}</span>
            </div>
            <div className="mb-2">
              <label className="block font-bold text-gray-700">
                {t("Date of birth")}:{" "}
              </label>
              <span className="text-gray-600">{userDetails.dateOfBirth}</span>
            </div>
            <div className="mb-2">
              <label className="block font-bold text-gray-700">
                {t("Native language")}:{" "}
              </label>
              <span className="text-gray-600">
                {userDetails.nativeLanguage?.map((language, index) => (
                  <Tag
                    key={index}
                    style={{ padding: "0.2rem 0.6rem", fontSize: "0.9rem" }}
                  >
                    {language}
                  </Tag>
                ))}
              </span>
            </div>
            <div className="mb-2">
              <label className="block font-bold text-gray-700">
                {t("Target language")}:{" "}
              </label>
              <span className="text-gray-600">
                {userDetails.targetLanguage?.map((language, index) => (
                  <Tag
                    key={index}
                    style={{ padding: "0.2rem 0.6rem", fontSize: "0.9rem" }}
                  >
                    {language}
                  </Tag>
                ))}
              </span>
            </div>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white px-4 py-1 rounded mt-5"
              disabled={isEditingTwo}
            >
              {t("Edit")}
            </button>
          </div>
        )}
      </div>
      <div className="w-80% mx-auto p-6 rounded-lg shadow-md mt-10">
        {isEditingTwo ? (
          // 如果处于编辑模式，显示编辑表单
          <div>
            <div className="mb-2">
              <label className="block font-bold text-gray-700">
                {t("New email")}:{" "}
              </label>
              <div className="flex justify-start items-center">
                <Input
                  type="emali"
                  defaultValue={userDetails.email}
                  onChange={(e) => {
                    setEmailValue(e.target.value);
                  }}
                  style={{ width: "20rem" }}
                />
                <Button
                  type="primary"
                  disabled={disabledButton}
                  onClick={() => {
                    // 发送验证码
                    // sendEmailVerification();
                    setDisabledButton(true);

                    setTimeout(() => {
                      setDisabledButton(false);
                    }, 3000);
                    console.log("send email verification");
                  }}
                  style={{ marginLeft: "20px" }}
                >
                  Verify
                </Button>
              </div>
              <Input
                placeholder="verification code"
                onChange={(e) => {
                  console.log(e.target.value);
                }}
                style={{ width: "15rem", marginTop: "10px" }}
              />
            </div>
            <button
              onClick={saveEmail}
              className="bg-blue-500 text-white px-4 py-1 rounded mt-5"
            >
              {t("Save")}
            </button>
          </div>
        ) : (
          // 如果不处于编辑模式，显示用户信息
          <div>
            <div className="mb-2">
              <label className="block font-bold text-gray-700">
                {t("Email")}:{" "}
              </label>
              <span className="text-gray-600">{userDetails.email}</span>
            </div>
            <button
              onClick={() => setIsEditingTwo(true)}
              className="bg-blue-500 text-white px-4 py-1 rounded mt-5"
              disabled={isEditing}
            >
              {t("Edit")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
