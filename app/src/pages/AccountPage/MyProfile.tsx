import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { User, Language } from "types";
import { getUserDetails } from "services";
import { useLoaderData } from "react-router-dom";
import { FormCard } from "components";

const MyProfile: React.FC = () => {

  return (
    <FormCard/>
  );
};

export default MyProfile;