export const leaveTypes = [
  { value: "annual", label: "Nghỉ phép thường niên" },
  { value: "sick", label: "Nghỉ ốm" },
  { value: "personal", label: "Nghỉ việc riêng" },
  { value: "maternity", label: "Nghỉ thai sản" },
  { value: "paternity", label: "Nghỉ chăm con" },
  { value: "emergency", label: "Nghỉ khẩn cấp" },
  { value: "other", label: "Khác" },
];

export const commonReasons = {
  annual: [
    "Nghỉ phép thường niên",
    "Du lịch cùng gia đình",
    "Nghỉ ngơi thư giãn",
    "Về quê thăm gia đình",
    "Khác",
  ],
  sick: [
    "Bị cảm sốt",
    "Đau bụng, tiêu chảy",
    "Đau đầu, chóng mặt",
    "Đau răng",
    "Bị thương, tai nạn nhẹ",
    "Khác",
  ],
  personal: [
    "Việc gia đình khẩn cấp",
    "Giải quyết giấy tờ quan trọng",
    "Tham gia đám cưới/lễ gia đình",
    "Chăm sóc người thân ốm",
    "Khác",
  ],
  maternity: [
    "Nghỉ sinh con",
    "Nghỉ trước sinh (thai sản)",
    "Nghỉ sau sinh (hậu sản)",
    "Khác",
  ],
  paternity: ["Nghỉ chăm con sơ sinh", "Chăm vợ sinh con", "Khác"],
  emergency: [
    "Cấp cứu y tế",
    "Tai nạn nghiêm trọng",
    "Tang lễ người thân",
    "Thiên tai, hỏa hoạn",
    "Khác",
  ],
};
