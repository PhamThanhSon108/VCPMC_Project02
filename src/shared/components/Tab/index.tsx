import { ReactNode } from "react";
import { images } from "../../assets/images";
import "./styles.scss";
export default function TabsCustom({
  children,
  position,
}: {
  children: ReactNode;
  position?: "left" | "right";
}) {
  return (
    <>
      {position === "right" ? (
        <div className={"devicepage__filter-last-item"}>
          <div className="custom-tab__wrap">{children}</div>;
        </div>
      ) : (
        <div className="custom-tab__wrap">{children}</div>
      )}
    </>
  );
}
