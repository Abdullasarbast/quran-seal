// localStorage utilities for name management with 1-year expiration
const STORAGE_KEYS = {
  NAMES: "quran_seal_names",
  SAVED_IMAGES: "quran_seal_saved_images",
};

// Name management functions
export const nameStorage = {
  // Get all stored names
  getNames: () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.NAMES);
      if (!stored) return [];

      const data = JSON.parse(stored);
      const now = new Date().getTime();

      // Filter out expired names (older than 1 year)
      const validNames = data.filter((item) => {
        const itemDate = new Date(item.timestamp).getTime();
        const oneYearAgo = now - 365 * 24 * 60 * 60 * 1000;
        return itemDate > oneYearAgo;
      });

      // Update storage if some names were expired
      if (validNames.length !== data.length) {
        localStorage.setItem(STORAGE_KEYS.NAMES, JSON.stringify(validNames));
      }

      return validNames.map((item) => item.name);
    } catch (error) {
      console.error("Error getting names from localStorage:", error);
      return [];
    }
  },

  // Add a new name
  addName: (name) => {
    try {
      if (!name || name.trim() === "") return false;

      const existingNames = nameStorage.getNames();
      const trimmedName = name.trim();

      // Check if name already exists
      if (existingNames.includes(trimmedName)) {
        return false; // Name already exists
      }

      const names = JSON.parse(
        localStorage.getItem(STORAGE_KEYS.NAMES) || "[]"
      );
      names.push({
        name: trimmedName,
        timestamp: new Date().toISOString(),
      });

      localStorage.setItem(STORAGE_KEYS.NAMES, JSON.stringify(names));
      return true;
    } catch (error) {
      console.error("Error adding name to localStorage:", error);
      return false;
    }
  },

  // Remove a name
  removeName: (name) => {
    try {
      const names = JSON.parse(
        localStorage.getItem(STORAGE_KEYS.NAMES) || "[]"
      );
      const filteredNames = names.filter((item) => item.name !== name);
      localStorage.setItem(STORAGE_KEYS.NAMES, JSON.stringify(filteredNames));
      return true;
    } catch (error) {
      console.error("Error removing name from localStorage:", error);
      return false;
    }
  },
};

// Saved images management functions
export const imageStorage = {
  // Get all saved images
  getSavedImages: () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.SAVED_IMAGES);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Error getting saved images from localStorage:", error);
      return [];
    }
  },

  // Save an image with its data
  saveImage: (imageData) => {
    try {
      const savedImages = imageStorage.getSavedImages();
      const newImage = {
        id: Date.now().toString(),
        data: imageData,
        timestamp: new Date().toISOString(),
        date: new Date().toLocaleDateString("en-GB"), // DD/MM/YYYY format
      };

      savedImages.push(newImage);
      localStorage.setItem(
        STORAGE_KEYS.SAVED_IMAGES,
        JSON.stringify(savedImages)
      );
      return newImage.id;
    } catch (error) {
      console.error("Error saving image to localStorage:", error);
      return null;
    }
  },

  // Get a specific saved image
  getImage: (id) => {
    try {
      const savedImages = imageStorage.getSavedImages();
      return savedImages.find((img) => img.id === id);
    } catch (error) {
      console.error("Error getting image from localStorage:", error);
      return null;
    }
  },

  // Delete a saved image
  deleteImage: (id) => {
    try {
      const savedImages = imageStorage.getSavedImages();
      const filteredImages = savedImages.filter((img) => img.id !== id);
      localStorage.setItem(
        STORAGE_KEYS.SAVED_IMAGES,
        JSON.stringify(filteredImages)
      );
      return true;
    } catch (error) {
      console.error("Error deleting image from localStorage:", error);
      return false;
    }
  },
};
