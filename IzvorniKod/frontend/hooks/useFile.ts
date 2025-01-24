export function useFile() {
  const uploadFile = async (file: File): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      // Upload slike
      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const uploadData = await uploadResponse.json();

      if (!uploadData.success) {
        throw new Error("Greška pri uploadu slike");
      }

      // Vraćamo samo fileName koji će se spremiti u bazi
      return uploadData.fileName;
    } catch (error) {
      console.error("Greška pri uploadu slike:", error);
      return "main-image-gym.webp";
    }
  };

  const deleteFile = async (fileName: string): Promise<void> => {
    const response = await fetch(`/api/upload/${fileName}`, {
      method: "DELETE",
    });
    const data = await response.json();
    console.log("data", data);
    return data;
  };

  return {
    uploadFile,
    deleteFile,
  } as UseFileContextType;
}

export type UseFileContextType = {
  uploadFile: (file: File) => Promise<string>;
  deleteFile: (fileName: string) => Promise<void>;
};
