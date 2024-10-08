import React from "react";
import { useTranslation } from "react-i18next";
import "../assets/styles/gameSelect.scss";

const GameSelect: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="gameSelect">
      {/* <div className="selectText text-2xl font-semibold">{t("GameList")}</div> */}
      <div className="gameList">
        <a className="gameItem" href="/language-learning-game"><p className="ellipsis">Grammar Training</p></a>
        <div className="gameItem"><p className="ellipsis">...</p></div>
      </div>
    </div>
  );
};

export default GameSelect;
