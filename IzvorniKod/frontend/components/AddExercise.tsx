import React, { useState } from "react";
import Select from "react-select";
import Image from "next/image";
import { useAppContext } from "@/contexts/AppContext";

interface AddExerciseModalProps {
  closeModal: () => void;
}

export default function AddExerciseModal({ closeModal }: AddExerciseModalProps) {
  const { createExercise, uploadFile, muscleGroups } = useAppContext();

  const [exerciseName, setExerciseName] = useState("");
  const [primaryMuscleGroups, setPrimaryMuscleGroups] = useState<number[]>([]);
  const [secondaryMuscleGroups, setSecondaryMuscleGroups] = useState<number[]>([]);
  const [description, setDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  };

  const handleSave = async () => {
    if (!exerciseName.trim()) {
      setErrorMessage("Exercise name is required.");
      return;
    }

    if (primaryMuscleGroups.length === 0) {
      setErrorMessage("Please select at least one primary muscle group.");
      return;
    }

    setErrorMessage("");

    try {
      let imageUrl = "";
      if (selectedImage) {
        imageUrl = await uploadFile(selectedImage);
      }

      const exerciseData = {
        name: exerciseName,
        primaryMuscleGroupsIds: primaryMuscleGroups,
        secondaryMuscleGroupsIds: secondaryMuscleGroups,
        description,
        gif: imageUrl,
        isApproved: false, 
      };

      console.log("Submitting exercise data:", exerciseData);
      await createExercise(exerciseData);
      closeModal();
    } catch (error) {
      console.error("Error saving exercise:", error);
      setErrorMessage("An error occurred while saving the exercise.");
    }
  };

  return (
    <div className="fixed top-5 inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-md p-6 w-96 space-y-4">
        <h2 className="text-lg font-semibold">Add New Exercise</h2>

        {errorMessage && (
          <p className="text-red-500 text-sm">{errorMessage}</p>
        )}

        <input
          type="text"
          placeholder="Exercise Name"
          value={exerciseName}
          onChange={(e) => setExerciseName(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2"
        />

        <label className="block font-medium text-sm">Primary Muscle Groups</label>
        <Select
          isMulti
          value={muscleGroups
            .filter((group) => primaryMuscleGroups.includes(group.id))
            .map((group) => ({ value: group.id, label: group.name }))}
          onChange={(newValue) =>
            setPrimaryMuscleGroups(newValue.map((item) => item.value))
          }
          options={muscleGroups.map((group) => ({
            value: group.id,
            label: group.name,
          }))}
          className="basic-multi-select"
          classNamePrefix="select"
          placeholder="Select Primary Muscle Groups"
        />

        <label className="block font-medium text-sm">Secondary Muscle Groups</label>
        <Select
          isMulti
          value={muscleGroups
            .filter((group) => secondaryMuscleGroups.includes(group.id))
            .map((group) => ({ value: group.id, label: group.name }))}
          onChange={(newValue) =>
            setSecondaryMuscleGroups(newValue.map((item) => item.value))
          }
          options={muscleGroups.map((group) => ({
            value: group.id,
            label: group.name,
          }))}
          className="basic-multi-select"
          classNamePrefix="select"
          placeholder="Select Secondary Muscle Groups"
        />

        <textarea
          placeholder="Exercise Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 h-24 resize-none"
        />

        <label className="block font-medium text-sm">Upload Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full border border-gray-300 rounded-md p-2"
        />
        {previewUrl && (
          <div className="mt-4">
            <Image
              src={previewUrl}
              alt="Preview"
              width={200}
              height={200}
              className="rounded-lg object-cover"
            />
          </div>
        )}

        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={closeModal}
            className="bg-gray-100 text-gray-900 py-1 px-4 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-black text-white py-1 px-4 rounded-md"
          >
            Save Exercise
          </button>
        </div>
      </div>
    </div>
  );
}
