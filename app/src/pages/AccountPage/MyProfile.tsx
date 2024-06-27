import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { User } from "types";
import { getUserDetails } from "services/api";
import { useAuth } from "context/AuthContext";

const MyProfile: React.FC = () => {
  const { authState } = useAuth();
  const { t } = useTranslation();
  const [userDetails, setUserDetails] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (authState.user?.username) {
        try {
          const details = await getUserDetails(authState.user.username);
          if (details) setUserDetails(details);
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }
    };

    fetchUserDetails();
  }, [authState.user?.username]);

  if (!userDetails) {
    return <div>{authState.user?.username}</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">{t("My Profile")}</h2>
      <p className="mb-2">{`${t("Email")}: ${userDetails.email}`}</p>
      <p>{t("Password")}: ••••••••</p>
      <p>Date of birth: {userDetails.dateOfBirth}</p>
      <p>Native language: {userDetails.nativeLanguage}</p>
    </div>
  );
};

export default MyProfile;
