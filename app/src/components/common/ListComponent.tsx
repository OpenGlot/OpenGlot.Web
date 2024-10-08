import { useNavigate } from "react-router-dom";
import { ArrowLeft, Pencil } from "lucide-react";
import LessonDetailSlider from "./LessonDetailSlider";
interface Option {
  id: string;
  text?: string;
  audio?: { urlKey: string };
  image?: { urlKey: string; description?: string };
}

interface Question {
  text: string;
  answer: string;
  options: Option[];
}

export interface LessonDetail {
  questions: Question[];
}
interface Item {
  id: string;
  name: string;
  title: string;
  description: string;
}
interface ListCardProps {
  title: string;
  description: string;
  items: any[] | null;
  renderItem: (item: Item) => JSX.Element;
  onItemClick: (item: Item) => void;
  isLessonOpen?: boolean;
  lessonDetail?: LessonDetail;
  componentName: string;
  edit?: boolean;
}

const ListCard = ({
  title,
  description,
  items = [],
  renderItem,
  onItemClick,
  isLessonOpen = false,
  lessonDetail,
  componentName,
  edit = false,
}: ListCardProps) => {
  const navigate = useNavigate();

  if (!Array.isArray(items)) {
    console.error("Expected items to be an array, but got:", items);
    return null;
  }

  const handleEditClick = (item: Item) => {
    navigate(`/create-lesson/${item.id}`);
  };

  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        className="flex-shrink-0 p-2 rounded-full hover:bg-gray-100"
      >
        <ArrowLeft className="w-6 h-6 text-gray-600" />
      </button>
      <div className="flex bg-white shadow-md rounded-lg p-6">
        <div className="ml-4 flex-1">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {" "}
            {componentName === "Languages"
              ? `${title}`
              : `${componentName} Name : ${title}`}{" "}
          </h1>
          <p className="text-gray-600 mb-6">{description}</p>
          <div>
            {items.length === 0 ? (
              <p className="text-gray-500">No items available</p>
            ) : isLessonOpen ? (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mt-6">
                  Questions:
                </h2>
                <LessonDetailSlider lessonDetail={lessonDetail} />
              </div>
            ) : (
              <ul className="space-y-2">
                {items.map((item) => (
                  <div className="flex gap-2 items-center">
                    <li
                      key={item.id}
                      className="w-[100%] bg-gray-100 p-4 rounded-lg shadow-sm cursor-pointer hover:bg-gray-200"
                      onClick={() => onItemClick(item)}
                    >
                      <div> {renderItem(item)}</div>
                    </li>
                    {edit && (
                      <li>
                        {" "}
                        <Pencil
                          onClick={() => handleEditClick(item)}
                          className="w-6 h-6 text-gray-600 cursor-pointer"
                        />
                      </li>
                    )}
                  </div>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListCard;
