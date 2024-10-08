import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import { User, Language } from "types";
import DateInput from "./DateInput";
import MultiSelect from "./MultiSelect";
import InputField from "./InputField";
import Button from "./Button";
import { useAuth } from "context";
import { getUserDetails } from "services";
import "../../assets/styles/formCard.scss";

interface FormProps {}

const FormCard: React.FC<FormProps> = ({}) => {
  const { authState } = useAuth();
  const { t } = useTranslation();
  const [userDetails, setUserDetails] = useState<User | null>(null);
  const [error, setError] = useState("");

  const [isEdit, setIsEdit] = useState(false);
  const [usernameValue, setUsernameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [dateOfBirthValue, setDateOfBirthValue] = useState("");
  const [nativeLanguageValue, setNativeLanguageValue] = useState<string[]>([]);
  const [targetLanguageValue, setTargetLanguageValue] = useState<string[]>([]);

  const options = ["English", "Chinese", "Korean"];

  const formField = [
    {
      label: "email",
      value: emailValue,
    },
    {
      label: "username",
      value: usernameValue,
    },
    {
      label: "birthDate",
      value: dateOfBirthValue,
    },
    {
      label: "nativeLanguage",
      value: nativeLanguageValue,
    },
    {
      label: "targetLanguage",
      value: targetLanguageValue,
    },
  ];

  useEffect(() => {
    const details = {
      userId: "",
      username: "",
      email: "",
      dateOfBirth: "1990-01-01",
      nativeLanguage: ["English", "Chinese"],
      targetLanguage: ["Chinese", "English"],
    };

    if (authState.user) {
      details.username = authState.user.username;
      details.email = authState.user.email;
    }

    getUserDetails(authState.user?.userId).then((result) => {
      if (result !== null) {
        details.username = result.username;
        details.email = result?.email;
        details.dateOfBirth = String(result.dateOfBirth);
        details.nativeLanguage = Array.isArray(result.nativeLanguage)
          ? result.nativeLanguage
          : [];
        details.targetLanguage = Array.isArray(result.targetLanguage)
          ? result.targetLanguage
          : [];
      }
    });

    setUserDetails(details);

    setUsernameValue(details.username);
    setEmailValue(details.email);
    setDateOfBirthValue(details.dateOfBirth);
    setNativeLanguageValue(details.nativeLanguage);
    setTargetLanguageValue(details.targetLanguage);
  }, []);

  return (
    <form className="myFrom w-full h-fit mx-auto flex justify-between flex-col gap-6">
      <h2 className="myProfile text-2xl font-semibold">{ t("My Profile") }</h2>
      {isEdit ? (
        <>
          <div>
            <InputField
              key={"username"}
              id={"username"}
              label={"username"}
              type={"username"}
              value={usernameValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setUsernameValue(e.target.value);
                console.log("username: ", e.target.value);
              }}
            ></InputField>
          </div>
          <div className="editItem dateOfBirth">
            <DateInput
              handleChange={(date: string) => {
                setDateOfBirthValue(date);
                console.log("date: ", date);
              }}
              value={dateOfBirthValue as string}
              error={error}
              handleError={setError}
            ></DateInput>
          </div>
          <div className="editItem nativeLanguage">
            <div className="formLabel">nativeLanguage</div>
            <MultiSelect
              maxSelection={2}
              options={options}
              handleChange={(value) => {
                setNativeLanguageValue(value);
                console.log("nativeLanguage: ", value);
              }}
              value={nativeLanguageValue}
              error={error}
              handleError={setError}
              disabledOptions={nativeLanguageValue}
            ></MultiSelect>
          </div>
          <div className="editItem">
            <div className="formLabel">targetLanguage</div>
            <MultiSelect
              maxSelection={3}
              options={options}
              handleChange={(value) => {
                setTargetLanguageValue(value);
                console.log("targetLanguage: ", value);
              }}
              value={targetLanguageValue}
              error={error}
              handleError={setError}
              disabledOptions={targetLanguageValue}
            ></MultiSelect>
          </div>
          <Button
            width="w-40"
            variant="filled"
            padding="p-0.5"
            onClick={() => {
              setIsEdit(false);
              const data = {
                username: usernameValue,
                dateOfBirth: dateOfBirthValue,
                nativeLanguage: nativeLanguageValue,
                targetLanguage: targetLanguageValue,
              };
              // 发送请求更新数据
              console.log("data: ", data);
            }}
          >
            Save
          </Button>
        </>
      ) : (
        <>
          {formField.map((item, index) => (
            <div className="filedArea" key={index}>
              <div className="formLabel">{t(item.label)}:</div>
              {item.value instanceof Array ? (
                <div>
                  {item.value.map((item, index) => (
                    <div className="tagVlue" key={index}>
                      {item}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="formValue">{item.value}</div>
              )}
            </div>
          ))}
          <Button
            width="w-40"
            variant="filled"
            padding="p-0.5"
            onClick={() => setIsEdit(true)}
          >
            Edit
          </Button>
        </>
      )}
    </form>
  );
};

export default FormCard;