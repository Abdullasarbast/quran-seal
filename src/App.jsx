import { useState, useEffect } from "react";
import {
  Select,
  Input,
  Button,
  Modal,
  message,
  Switch,
  Popconfirm,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  SaveOutlined,
  DownloadOutlined,
  HistoryOutlined,
  BulbOutlined,
  GlobalOutlined,
  SettingOutlined,
  TeamOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { nameStorage, imageStorage } from "./utils/localStorage";
import SavedImages from "./components/SavedImages";
import "./App.css";

const { Option } = Select;

function App() {
  // Language and theme
  const [lang, setLang] = useState(
    typeof window !== "undefined" ? localStorage.getItem("lang") || "ar" : "ar"
  );
  const [theme, setTheme] = useState(
    typeof window !== "undefined"
      ? localStorage.getItem("theme") || "light"
      : "light"
  );

  const translations = {
    ar: {
      addRow: "إضافة سطر",
      saveImage: "حفظ الصورة",
      viewSaved: "الصور المحفوظة",
      addNewName: "إضافة اسم جديد",
      manageNames: "إدارة الأسماء",
      settings: "الإعدادات",
      delete: "حذف",
      deleteAll: "حذف الكل",
      close: "إغلاق",
      confirmDeleteName: "هل تريد حذف هذا الاسم؟",
      confirmDeleteAll: "هل تريد حذف جميع الأسماء؟",
      names: "الأسماء",
      noNames: "لا توجد أسماء محفوظة",
      selectName: "اختر اسمًا",
      manual: "يدوي",
      edit: "تعديل",
      save: "حفظ",
      add: "إضافة",
      cancel: "إلغاء",
      namesPlaceholder: "أدخل الأسماء مفصولة بـ ،",
      manualPlaceholder: "أدخل الاسم يدويًا",
      language: "اللغة",
      theme: "الوضع",
    },
    ku: {
      addRow: "زیادکردنی ڕیز",
      saveImage: "پاشەکەوتی وێنە",
      viewSaved: "وێنە پاشەکەوتکراوەکان",
      addNewName: "زیادکردنی ناوی نوێ",
      manageNames: "بەڕێوەبردنی ناوەکان",
      settings: "ڕێکخستنەکان",
      delete: "سڕینەوە",
      deleteAll: "سڕینەوەی هەموو",
      close: "داخستن",
      confirmDeleteName: "دڵنیایت دەتەوێت ئەم ناوە بسڕیتەوە؟",
      confirmDeleteAll: "دڵنیایت هەموو ناوەکان بسڕیتەوە؟",
      names: "ناوەکان",
      noNames: "هیچ ناوێک پاشەکەوت نەکراوە",
      selectName: "ناوێک هەڵبژێرە",
      manual: "دەستی",
      edit: "دەستکاری",
      save: "پاشەکەوت",
      add: "زیادکردن",
      cancel: "ڕەتکردنەوه",
      namesPlaceholder: "ناوەکان بە «،» جیابکەرەوە بنووسە",
      manualPlaceholder: "ناوی دەستکارانە بنووسە",
      language: "زمان",
      theme: "دۆخ",
    },
    en: {
      addRow: "Add Row",
      saveImage: "Save Image",
      viewSaved: "View Saved",
      addNewName: "Add New Name",
      manageNames: "Manage Names",
      settings: "Settings",
      delete: "Delete",
      deleteAll: "Delete All",
      close: "Close",
      confirmDeleteName: "Delete this name?",
      confirmDeleteAll: "Delete all saved names?",
      names: "Names",
      noNames: "No saved names",
      selectName: "Select name",
      manual: "Manual",
      edit: "Edit",
      save: "Save",
      add: "Add",
      cancel: "Cancel",
      namesPlaceholder: "Enter names separated by ،",
      manualPlaceholder: "Enter name manually",
      language: "Language",
      theme: "Theme",
    },
  };

  const t = (key) => translations[lang]?.[key] || key;

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const [rows, setRows] = useState([{ id: 1, names: [] }]);
  const [storedNames, setStoredNames] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toLocaleDateString("en-GB")
  );
  const [isEditing, setIsEditing] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [showAddNameModal, setShowAddNameModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showManageNamesModal, setShowManageNamesModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [showSavedImages, setShowSavedImages] = useState(false);
  const [manualNameInput, setManualNameInput] = useState("");
  const [showManualInput, setShowManualInput] = useState(null);

  // Load stored names on component mount
  useEffect(() => {
    setStoredNames(nameStorage.getNames());
  }, []);

  // Apply theme on body root
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.style.setProperty("color-scheme", "dark");
    } else {
      root.classList.remove("dark");
      root.style.setProperty("color-scheme", "light");
    }
  }, [theme]);

  // Add a new row
  const addRow = () => {
    const newRow = { id: Date.now(), names: [] };
    setRows([...rows, newRow]);
  };

  // Add a name to a specific row
  const addNameToRow = (rowId, name) => {
    setRows(
      rows.map((row) =>
        row.id === rowId ? { ...row, names: [...row.names, name] } : row
      )
    );
  };

  // Remove a name from a row
  const removeNameFromRow = (rowId, nameIndex) => {
    setRows(
      rows.map((row) =>
        row.id === rowId
          ? {
              ...row,
              names: row.names.filter((_, index) => index !== nameIndex),
            }
          : row
      )
    );
  };

  // Start editing a row
  const startEditing = (rowId) => {
    const row = rows.find((r) => r.id === rowId);
    setIsEditing(rowId);
    setEditingText(row.names.join("، "));
  };

  // Save edited row
  const saveEditedRow = () => {
    if (editingText.trim()) {
      const names = editingText
        .split("،")
        .map((name) => name.trim())
        .filter((name) => name);
      setRows(
        rows.map((row) => (row.id === isEditing ? { ...row, names } : row))
      );
    }
    setIsEditing(null);
    setEditingText("");
  };

  // Cancel editing
  const cancelEditing = () => {
    setIsEditing(null);
    setEditingText("");
  };

  // Add manual name to row
  const addManualName = (rowId) => {
    if (manualNameInput.trim()) {
      const trimmedName = manualNameInput.trim();

      // Add name to the row
      addNameToRow(rowId, trimmedName);

      // Save name to localStorage for future use
      const success = nameStorage.addName(trimmedName);
      if (success) {
        // Update the stored names list
        setStoredNames(nameStorage.getNames());
        message.success("Name added to row and saved for future use!");
      } else {
        // Name already exists in storage, but still add to row
        message.info("Name added to row (already exists in storage)");
      }

      setManualNameInput("");
      setShowManualInput(null);
    }
  };

  // Cancel manual input
  const cancelManualInput = () => {
    setManualNameInput("");
    setShowManualInput(null);
  };

  // Add new name to storage
  const handleAddName = () => {
    if (newName.trim()) {
      const success = nameStorage.addName(newName.trim());
      if (success) {
        setStoredNames(nameStorage.getNames());
        setNewName("");
        setShowAddNameModal(false);
        message.success("Name added successfully!");
      } else {
        message.error("Name already exists!");
      }
    }
  };

  // Refresh stored names when Manage Names modal is opened
  useEffect(() => {
    if (showManageNamesModal) {
      setStoredNames(nameStorage.getNames());
    }
  }, [showManageNamesModal]);

  // Delete a stored name
  const handleDeleteStoredName = (name) => {
    const success = nameStorage.removeName(name);
    if (success) {
      setStoredNames(nameStorage.getNames());
      message.success(t("delete"));
    } else {
      message.error("Failed");
    }
  };

  // Clear all stored names
  const handleClearAllNames = () => {
    if (!storedNames.length) return;
    const success = nameStorage.clearAllNames();
    if (success) {
      setStoredNames([]);
      message.success(t("deleteAll"));
    } else {
      message.error("Failed");
    }
  };

  // Save current state as image
  const saveAsImage = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Set canvas size based on content
    const titleHeight = 80;
    const rowHeight = 35;
    const dateHeight = 30;
    const padding = 40;

    // Calculate total height needed for all rows including wrapped text
    let totalRows = 0;
    rows.forEach((row) => {
      const namesText = row.names.join("، ");
      const maxWidth = 800 - 100; // Leave space for number
      const textWidth = ctx.measureText(namesText).width;

      if (textWidth <= maxWidth) {
        totalRows += 1; // Single line
      } else {
        // Calculate how many lines this row will need
        const words = namesText.split("، ");
        let currentLine = "";
        let lines = 1;

        for (let i = 0; i < words.length; i++) {
          const testLine = currentLine + (currentLine ? "، " : "") + words[i];
          const testWidth = ctx.measureText(testLine).width;

          if (testWidth <= maxWidth) {
            currentLine = testLine;
          } else {
            currentLine = words[i];
            lines++;
          }
        }
        totalRows += lines;
      }
    });

    canvas.width = 800;
    canvas.height =
      titleHeight + totalRows * rowHeight + dateHeight + padding * 2;

    // White background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Title - centered and bold
    ctx.fillStyle = "#000000";
    ctx.font = "bold 28px 'Noto Sans Arabic', 'Amiri', serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(
      "بِسْمِ اللَّـهِ الرَّحْمَـٰنِ الرَّحِيمِ",
      canvas.width / 2,
      titleHeight / 2
    );

    // Rows with proper formatting
    ctx.font = "18px 'Noto Sans Arabic', 'Amiri', serif";
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";

    // Track current Y position for each row
    let currentY = titleHeight + rowHeight / 2;

    rows.forEach((row, index) => {
      // Compose the full names string
      const namesText = row.names.join("، ");

      // Reserve space on the far right for the row number
      const rightMargin = 30;
      const numberText = `/${index + 1}`;
      const numberWidth = ctx.measureText(numberText).width;
      const numberX = canvas.width - rightMargin; // right edge for number

      // The names anchor is immediately to the left of the number
      const namesAnchorX = numberX - numberWidth - 10; // 10px gap between names and number

      // Max width allowed for a line of names (from a soft left margin to the names anchor)
      const maxNamesWidth = namesAnchorX - 40; // leave ~40px on the left side

      const namesWidth = ctx.measureText(namesText).width;

      if (namesWidth <= maxNamesWidth) {
        // Single line: draw number at the right, names to its left
        ctx.fillText(numberText, numberX, currentY); // ctx.textAlign is already 'right'
        ctx.fillText(namesText, namesAnchorX, currentY);

        // Move to next row
        currentY += rowHeight;
      } else {
        // Multi-line wrapping for names
        const words = namesText.split("، ");
        let currentLine = "";
        let isFirstLine = true;

        for (let i = 0; i < words.length; i++) {
          const testLine = currentLine + (currentLine ? "، " : "") + words[i];
          const testWidth = ctx.measureText(testLine).width;

          if (testWidth <= maxNamesWidth) {
            currentLine = testLine;
          } else {
            // Draw the accumulated line
            if (currentLine) {
              // Draw number only on the very first visual line
              if (isFirstLine) {
                ctx.fillText(numberText, numberX, currentY);
                isFirstLine = false;
              }
              ctx.fillText(currentLine, namesAnchorX, currentY);
            }

            // Start new visual line
            currentLine = words[i];
            currentY += rowHeight;
          }
        }

        // Draw the last line
        if (currentLine) {
          if (isFirstLine) {
            ctx.fillText(numberText, numberX, currentY);
            isFirstLine = false;
          }
          ctx.fillText(currentLine, namesAnchorX, currentY);
        }

        // Move to next row after all wrapped lines
        currentY += rowHeight;
      }
    });

    // Date at bottom left
    ctx.font = "16px 'Noto Sans Arabic', 'Amiri', serif";
    ctx.textAlign = "left";
    ctx.textBaseline = "bottom";
    ctx.fillText(selectedDate, 30, canvas.height - 15);

    // Convert canvas to blob and download
    canvas.toBlob((blob) => {
      if (blob) {
        // Create download link
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;

        // Generate filename with timestamp
        const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
        link.download = `quran-seal-${timestamp}.png`;

        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Clean up the URL object
        URL.revokeObjectURL(url);
      }
    }, "image/png");

    // Save to localStorage
    const imageData = canvas.toDataURL("image/png");
    const imageId = imageStorage.saveImage(imageData);

    if (imageId) {
      message.success("Image saved to device and localStorage!");
    } else {
      message.error("Failed to save image to localStorage!");
    }
  };

  return (
    <div
      className="min-h-screen py-8 px-4"
      style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header with controls */}
        <div
          className="rounded-lg shadow-lg p-6 mb-6"
          style={{
            backgroundColor: "var(--panel-bg)",
            color: "var(--panel-text)",
          }}
        >
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <div className="w-full sm:w-auto inline-flex items-center border border-gray-300 dark:border-gray-300  hover:border-blue-500 hover:cursor-pointer hover:text-blue-500 rounded-md h-8 px-3 bg-white shadow-sm duration-200">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full bg-transparent outline-none border-0 h-full hover:cursor-pointer hover:text-blue-500 duration-200"
              />
            </div>
            <Button
              icon={<DownloadOutlined />}
              onClick={saveAsImage}
              className="w-full sm:w-auto whitespace-normal text-center"
            >
              {t("saveImage")}
            </Button>
            <Button
              icon={<HistoryOutlined />}
              onClick={() => setShowSavedImages(true)}
              className="w-full sm:w-auto whitespace-normal text-center"
            >
              {t("viewSaved")}
            </Button>
            <Button
              icon={<UserAddOutlined />}
              onClick={() => setShowAddNameModal(true)}
              className="w-full sm:w-auto whitespace-normal text-center"
            >
              {t("addNewName")}
            </Button>
            <Button
              icon={<TeamOutlined />}
              onClick={() => setShowManageNamesModal(true)}
              className="w-full sm:w-auto whitespace-normal text-center"
            >
              {t("manageNames")}
            </Button>
            <Button
              icon={<SettingOutlined />}
              onClick={() => setShowSettingsModal(true)}
              className="w-full sm:w-auto whitespace-normal text-center"
              aria-label={t("settings")}
              title={t("settings")}
            >
              {t("settings")}
            </Button>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={addRow}
              className="w-full basis-full whitespace-normal text-center"
            >
              {t("addRow")}
            </Button>
          </div>
        </div>

        {/* Main document */}
        <div
          className="rounded-lg shadow-lg p-8 min-h-[600px]"
          style={{
            backgroundColor: "var(--panel-bg)",
            color: "var(--panel-text)",
          }}
        >
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold arabic-text">
              بِسْمِ اللَّـهِ الرَّحْمَـٰنِ الرَّحِيمِ
            </h1>
          </div>

          {/* Rows */}
          <div className="space-y-4 mb-8">
            {rows.map((row, index) => (
              <div
                key={row.id}
                className={`p-4 space-y-3 ${
                  index < rows.length - 1 ? "border-b border-gray-200" : ""
                }`}
              >
                {/* Row header with number */}
                <div className="flex items-center gap-3">
                  <span className="text-lg font-semibold min-w-[40px]">
                    {index + 1}/
                  </span>
                </div>

                {isEditing === row.id ? (
                  <div className="space-y-3">
                    <Input
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      placeholder={t("namesPlaceholder")}
                      className="w-full"
                    />
                    <div className="flex gap-2 flex-wrap">
                      <Button
                        type="primary"
                        icon={<SaveOutlined />}
                        onClick={saveEditedRow}
                        size="small"
                      >
                        {t("save")}
                      </Button>
                      <Button onClick={cancelEditing} size="small">
                        {t("cancel")}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Names displayed horizontally with flex wrap */}
                    <div className="flex flex-wrap gap-2 min-h-[40px] items-start">
                      {row.names.map((name, nameIndex) => (
                        <span
                          key={nameIndex}
                          className="bg-blue-100 text-blue-800 px-3 py-2 rounded-full text-sm flex items-center gap-1"
                        >
                          {name}
                          <button
                            onClick={() => removeNameFromRow(row.id, nameIndex)}
                            className="text-red-500 hover:text-red-700 ml-1"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>

                    {/* Buttons at the bottom */}
                    <div className="flex flex-wrap gap-2">
                      {showManualInput === row.id ? (
                        <div className="flex flex-wrap gap-2 w-full">
                          <Input
                            placeholder={t("manualPlaceholder")}
                            value={manualNameInput}
                            onChange={(e) => setManualNameInput(e.target.value)}
                            onPressEnter={() => addManualName(row.id)}
                            className="flex-1 min-w-[200px]"
                          />
                          <Button
                            type="primary"
                            onClick={() => addManualName(row.id)}
                            size="small"
                          >
                            {t("save")}
                          </Button>
                          <Button onClick={cancelManualInput} size="small">
                            {t("cancel")}
                          </Button>
                        </div>
                      ) : (
                        <div className="flex flex-wrap gap-2 w-full">
                          <Select
                            placeholder={t("selectName")}
                            className="flex-1 min-w-[200px]"
                            showSearch
                            filterOption={(input, option) =>
                              option.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                            }
                            onSelect={(value) => addNameToRow(row.id, value)}
                          >
                            {storedNames.map((name) => (
                              <Option key={name} value={name}>
                                {name}
                              </Option>
                            ))}
                          </Select>

                          <Button
                            onClick={() => setShowManualInput(row.id)}
                            size="small"
                          >
                            {t("manual")}
                          </Button>

                          <Button
                            icon={<EditOutlined />}
                            onClick={() => startEditing(row.id)}
                            size="small"
                          >
                            {t("edit")}
                          </Button>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Add Name Modal */}
        <Modal
          title={t("addNewName")}
          open={showAddNameModal}
          onOk={handleAddName}
          onCancel={() => {
            setShowAddNameModal(false);
            setNewName("");
          }}
        >
          <Input
            placeholder={t("addNewName")}
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onPressEnter={handleAddName}
          />
        </Modal>

        {/* Manage Names Modal */}
        <Modal
          title={t("manageNames")}
          open={showManageNamesModal}
          onCancel={() => setShowManageNamesModal(false)}
          footer={[
            <Popconfirm
              key="clear"
              title={t("confirmDeleteAll")}
              okText={t("deleteAll")}
              cancelText={t("cancel")}
              onConfirm={handleClearAllNames}
              disabled={!storedNames.length}
            >
              <Button danger disabled={!storedNames.length}>
                {t("deleteAll")}
              </Button>
            </Popconfirm>,
            <Button key="close" onClick={() => setShowManageNamesModal(false)}>
              {t("close")}
            </Button>,
          ]}
        >
          {storedNames.length ? (
            <div className="space-y-2">
              {storedNames.map((name) => (
                <div
                  key={name}
                  className="flex items-center justify-between border border-gray-200 rounded px-3 py-2"
                >
                  <span>{name}</span>
                  <Popconfirm
                    title={t("confirmDeleteName")}
                    okText={t("delete")}
                    cancelText={t("cancel")}
                    onConfirm={() => handleDeleteStoredName(name)}
                  >
                    <Button size="small" danger>
                      {t("delete")}
                    </Button>
                  </Popconfirm>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-6">{t("noNames")}</div>
          )}
        </Modal>

        {/* Settings Modal */}
        <Modal
          title={t("settings")}
          open={showSettingsModal}
          onOk={() => setShowSettingsModal(false)}
          onCancel={() => setShowSettingsModal(false)}
        >
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="min-w-24">{t("language")}:</span>
              <Select
                value={lang}
                onChange={(v) => setLang(v)}
                className="flex-1"
              >
                <Option value="ar">العربية</Option>
                <Option value="ku">کوردی</Option>
                <Option value="en">English</Option>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <span className="min-w-24">{t("theme")}:</span>
              <Switch
                checked={theme === "dark"}
                onChange={(checked) => setTheme(checked ? "dark" : "light")}
                checkedChildren={t("dark")}
                unCheckedChildren={t("light")}
              />
            </div>
          </div>
        </Modal>

        {/* Saved Images Modal */}
        <SavedImages
          isVisible={showSavedImages}
          onClose={() => setShowSavedImages(false)}
        />
      </div>
    </div>
  );
}

export default App;
