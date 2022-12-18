import { Modal } from "antd";
import "../../ProvideNumbersPage.scss";
export const modalProvideNewNumber = ({
  ordinalNumbers,
  serviceName,
  createdTime,
  expiredTime,
}: {
  ordinalNumbers: string;
  serviceName: string;
  createdTime: string;
  expiredTime: string;
}) => {
  Modal.info({
    icon: <></>,
    closable: true, // title: "This is a notification message",
    content: (
      <div className="print-number-wrap">
        <div className="print-number-description">
          <span className="print-number-title">SỐ THỨ TỰ ĐƯỢC CẤP</span>
          <p className="print-number-num">{ordinalNumbers}</p>
          <p className="print-number-service">{serviceName}</p>
        </div>
        <div className="print-number-time">
          <p className="print-number-time-create">
            Thời gian cấp {createdTime}
          </p>
          <p className="print-number-time-expiry">Hạn sử dụng {expiredTime}</p>
        </div>
      </div>
    ),
    // onOk() {},
  });
};
