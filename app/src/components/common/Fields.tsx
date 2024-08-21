import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { getAudioDetails, getImageDetails } from "services";

interface TextFieldProps {
  name: string;
  control: any;
  label: string;
  placeholder?: string;
  type?: string;
}
interface AudioFieldProps {
  name: string;
  control: any;
  englishTranslation: string;
  languageCode: string;
  transcript: string;
  sentenceId: string;
  urlKey: string;
}

interface PictureFieldProps {
  name: string;
  control: any;
  context?: string;
  description?: string;
  enhancedDescription?: string;
  id?: string;
  uploadedAt?: Date;
  urlKey?: string;
}

interface SelectFieldProps {
  name: string;
  control: any;
  label: string;
  options: { value: string; label: string }[];
  onChange: (value: any) => void;
}
export const getRandomNumberAsString = (min: number, max: number): string => {
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber.toString();
};

const TextField: React.FC<TextFieldProps> = ({
  name,
  control,
  label,
  placeholder,
  type = "text",
}) => (
  <div className="mb-4">
    <label className="block text-gray-700 mb-2">{label}</label>
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        return (
          <>
            {type === "textarea" ? (
              <textarea
                {...field}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder={placeholder || `Enter ${label.toLowerCase()}`}
              />
            ) : (
              <input
                {...field}
                type={type}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder={placeholder || `Enter ${label.toLowerCase()}`}
              />
            )}
            {fieldState.error && (
              <p className="text-red-500 text-sm">{fieldState.error.message}</p>
            )}
          </>
        );
      }}
    />
  </div>
);

const AudioField: React.FC<AudioFieldProps> = ({
  id,
  name,
  control,
  englishTranslation,
  languageCode,
  transcript,
  sentenceId,
  urlKey,
}) => {
  const [fileName, setFileName] = useState<string | undefined>(undefined);
  const [audios, setAudios] = useState<Audio[]>([]);
  const [selectedAudio, setSelectedAudio] = useState<Audio | undefined>(
    undefined
  );

  useEffect(() => {
    if (urlKey) {
      const initialFileName = urlKey.split("/").pop();
      setFileName(initialFileName);
    }
  }, [urlKey]);

  useEffect(() => {
    async function fetchAudios() {
      try {
        const response = await getAudioDetails(null); // Fetch all images if no specific searchText
        setAudios(response); 
      } catch (error) {
        console.error("Error fetching images", error);
      }
    }
    fetchAudios();
  }, []);

  return (
    <div className="mb-4">
      <label className="block text-gray-700 mb-2">Audio</label>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <>
            {fileName && (
              <p className="text-gray-600 mt-2">Selected file: {fileName}</p>
            )}

            <select
              value={selectedAudio?.urlKey}
              onChange={(e) => {
                const selected = audios.find(
                  (audio) => audio.urlKey === e.target.value
                );
                setSelectedAudio(selected);
                field.onChange({
                  id: id,
                  file: field.value?.file,
                  englishTranslation,
                  languageCode,
                  sentenceId,
                  transcript,
                  urlKey: selected?.urlKey,
                });
              }}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">No audio selected</option>
              {audios.map((audio) => (
                <option key={audio.id} value={audio.urlKey}>
                  {audio.transcript}: {audio.englishTranslation}
                </option>
              ))}
            </select>
            {fieldState.error && (
              <p className="text-red-500 text-sm">{fieldState.error.message}</p>
            )}

            {selectedAudio && (
              <div className="mt-4">
                <p className="text-gray-600 mb-2">Audio Preview:</p>
                <audio
                  controls
                  className="w-[80%] h-auto m-auto border border-gray-300 rounded-full"
                >
                  <source
                    src={`https://your-audio-hosting-service.com/${selectedAudio.urlKey}`}
                    alt={`${selectedAudio.context}: ${selectedAudio.description}`}
                  />
                </audio>
              </div>
            )}
          </>
        )}
      />
    </div>
  );
};

const PictureField: React.FC<PictureFieldProps> = ({
  name,
  control,
  context,
  description,
  enhancedDescription,
  id = () => getRandomNumberAsString(1000, 999999),
  uploadedAt,
  urlKey,
}) => {
  const [fileName, setFileName] = useState<string | undefined>(undefined);
  const [images, setImages] = useState<Image[]>([]);
  const [selectedImage, setSelectedImage] = useState<Image | undefined>(
    undefined
  );

  useEffect(() => {
    if (urlKey) {
      const initialFileName = urlKey.split("/").pop();
      setFileName(initialFileName);
    }
  }, [urlKey]);

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await getImageDetails(null); 
        setImages(response); 
      } catch (error) {
        console.error("Error fetching images", error);
      }
    }
    fetchImages();
  }, []);

  return (
    <div className="mb-4">
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <>
            {fileName && (
              <p className="text-gray-700 mt-2">Selected file: {fileName}</p>
            )}

            <label className="block text-gray-700 mt-4 mb-2">
              Select Image
            </label>
            <select
              value={selectedImage?.urlKey}
              onChange={(e) => {
                const selected = images.find(
                  (image) => image.urlKey === e.target.value
                );
                setSelectedImage(selected);
                field.onChange({
                  id: id || undefined,
                  urlKey: urlKey || "",
                  file: field.value?.file,
                  context: context || "",
                  description: description || "",
                  enhancedDescription: enhancedDescription || "",
                  uploadedAt: uploadedAt || undefined,
                });
              }}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">No image selected</option>
              {images.map((image) => (
                <option key={image.id} value={image.urlKey}>
                  {image.context}: {image.description}
                </option>
              ))}
            </select>
            {fieldState.error && (
              <p className="text-red-500 text-sm">{fieldState.error.message}</p>
            )}

            {selectedImage && (
              <div className="mt-4">
                <p className="text-gray-600 mb-2">Image Preview:</p>
                <img
                  src={`https://your-image-hosting-service.com/${selectedImage.urlKey}`}
                  alt={`${selectedImage.context}: ${selectedImage.description}`}
                  className="w-full h-auto border border-gray-300 rounded-md"
                />
              </div>
            )}
          </>
        )}
      />
    </div>
  );
};

const SelectField: React.FC<SelectFieldProps> = ({
  name,
  control,
  label,
  options,
  onChange,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 mb-2">{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <>
            <select
              {...field}
              className="w-full p-2 border border-gray-300 rounded-md"
              onChange={(e) => {
                field.onChange(e);
              }}
            >
              {options.map((option, index) => (
                <option
                  key={option.value}
                  value={option.value}
                  data-index={index}
                >
                  {option.label}
                </option>
              ))}
            </select>
            {fieldState.error && (
              <p className="text-red-500 text-sm">{fieldState.error.message}</p>
            )}
          </>
        )}
      />
    </div>
  );
};

export { TextField, AudioField, PictureField, SelectField };
