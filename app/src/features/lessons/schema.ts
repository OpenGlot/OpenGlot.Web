// src/validationSchema.ts
import { ContentType, QuestionType } from 'types';
import * as yup from 'yup';

const optionSchema = yup.object().shape({
  text: yup.string().required('Option text is required'),
  image: yup.object().required('Image is required'),
  audio: yup.object().required('Audio is required'),
});

// .test('validate-option', 'Each option must have either text, audio, or image', function(value) {
//   // Check if at least one of the fields is filled
//   return value && (value.text || (value.audio && value.audio.urlKey) || (value.image && value.image.urlKey));
// });

const questionSchema = yup.object().shape({
  text: yup.string().required('Question text is required'),
  questionType: yup
    .string()
    .notOneOf(['Not Selected', '0'], 'Question type cannot be "Not Selected"')
    .required('Question type is required'),
  answer: yup.string().required('Answer is required'),
  audio: yup.object().required('Audio is required'), // Include audio field for question validation
  image: yup.object().required('Image is required'),
  options: yup
    .array()
    .of(optionSchema)
    .min(1, 'At least one option is required') // Ensure at least one option
    .required('Options are required'), // Ensure options array is present
});
// .test('validate-question-type', 'Invalid combination of text and audio', function(value) {
//   const { questionType, text, audio, options } = this.parent;

//   switch (questionType) {
//     case QuestionType.Reply:
//     case QuestionType.Describe:
//     case QuestionType.FillBlank:
//       // At least one of text or audio must be filled
//       if (!text && !(audio && audio.urlKey)) {
//         return false;
//       }
//       // Validate options
//       return options?.every(option => option.text || (option.audio && option.audio.urlKey) || (option.image && option.image.urlKey)) || false;

//     case QuestionType.Listen:
//       // Only text should be filled
//       return !!text && options?.every(option => option.text) || false;

//     case QuestionType.Choose:
//       // At least one option must have an image filled
//       return options?.some(option => option.image?.urlKey) || false;

//     case QuestionType.Recognize:
//       // At least one option must have audio filled
//       return options?.some(option => option.audio?.urlKey) || false;

//     default:
//       return true; // Default case, no validation needed
//   }
// });

export const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  moduleId: yup.string(),
  contentType: yup.number().optional(),
  createdAt: yup.date(),
  order: yup.number().nullable(),
  questions: yup
    .array()
    .of(questionSchema)
    .min(1, 'At least one question is required'), // Ensure at least one question
});
