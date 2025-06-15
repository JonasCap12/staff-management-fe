// components/CheckInTab.jsx
import QRCodeDisplay from "./QRCodeDisplay";
import CheckInForm from "./CheckInForm";

const CheckInTab = ({ qrCode }) => {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <QRCodeDisplay qrCode={qrCode} />
      <CheckInForm qrCode={qrCode} />
    </div>
  );
};

export default CheckInTab;
