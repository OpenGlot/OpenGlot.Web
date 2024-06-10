import { useState, useEffect } from 'react';
import { fetchQuestions, Question } from '../../../services/api';
import { shuffleArray } from '../../../utils/shuffleArray';

interface SelectedItem {
  item: string;
  column: 'left' | 'right';
}

export const useMatchingPairs = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [leftColumn, setLeftColumn] = useState<string[]>([]);
  const [rightColumn, setRightColumn] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState<SelectedItem | null>(null);
  const [correctPairs, setCorrectPairs] = useState<string[]>([]);
  const [disabledItems, setDisabledItems] = useState<string[]>([]);
  const [incorrectItems, setIncorrectItems] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const data = await fetchQuestions();
        setQuestions(data);
        const targetLanguage = data.map((q) => q.targetLanguage);
        const meaning = data.map((q) => q.meaning);
        setLeftColumn(shuffleArray(targetLanguage));
        setRightColumn(shuffleArray(meaning));
      } catch (error) {
        console.error(error);
      }
    };
    loadQuestions();
  }, []);

  const handleClick = async (item: string, column: 'left' | 'right') => {
    if (isProcessing) return;
    setIsProcessing(true);

    if (selectedItem) {
      if (selectedItem.column === column) {
        setSelectedItem({ item, column });
        setIsProcessing(false);
      } else {
        const correspondingItem =
          column === 'left'
            ? questions.find((q) => q.targetLanguage === item)?.meaning
            : questions.find((q) => q.meaning === item)?.targetLanguage;

        if (selectedItem.item === correspondingItem) {
          setCorrectPairs((prev) => [...prev, selectedItem.item, item]);
          setTimeout(() => {
            setDisabledItems((prev) => [...prev, selectedItem.item, item]);
            setSelectedItem(null);
            setIsProcessing(false);
          }, 200);
        } else {
          setIncorrectItems([selectedItem.item, item]);
          setTimeout(() => {
            setIncorrectItems([]);
            setSelectedItem(null);
            setIsProcessing(false);
          }, 200);
        }
      }
    } else {
      setSelectedItem({ item, column });
      setIsProcessing(false);
    }
  };

  return {
    leftColumn,
    rightColumn,
    selectedItem,
    correctPairs,
    disabledItems,
    incorrectItems,
    handleClick,
  };
};
