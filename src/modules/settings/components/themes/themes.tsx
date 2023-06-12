import { clsx } from "clsx";
import { FC } from "react";
import { AcceptIcon } from "@/shared/components/icons/acceptIcon";
import { ChevronDownIcon } from "@/shared/components/icons/chevronDownIcon";
import { ThemesIcon } from "@/shared/components/icons/themesIcon";
import { hexToRgb } from "@/shared/utils/hexToRbga";
import { backgroundPattern } from "./themesSlice";
import { useThemes } from "./useThemes";

const themeColors = [
  { name: "main-blue", value: "#1fb6ff" },
  { name: "main-purple", value: "#7e5bef" },
  { name: "main-pink", value: "#ff49db" },
  { name: "main-orange", value: "#ff7849" },
  { name: "main-green", value: "#13ce66" },
  { name: "main-yellow", value: "#ffc82c" },
  { name: "main-gray", value: "#8492a6" },
];

interface IThemesProps {
  isOpen: boolean;
  setOpen: any;
}

export const Themes: FC<IThemesProps> = (props) => {
  const { isOpen, setOpen } = props;
  const { data, methods } = useThemes();
  const { handleChangeTheme, handleChangeBackground } = methods;
  const { themeColor, backgroundPatternType } = data;

  return (
    <div className={clsx("w-full")}>
      <div
        className={clsx(
          "w-full h-12 px-5 py-2 flex items-center gap-2 border-b border-slate-100 cursor-pointer",
          [isOpen ? "bg-[#f6f6f7]/70" : ""]
        )}
        onClick={() => {
          setOpen();
        }}
      >
        <div className="shrink-0">
          <ThemesIcon className="h-4 fill-[#495057]" />
        </div>
        <span className="inline-block grow text-[#495057] font-[500] noselect">
          Themes
        </span>
        <div className="shrink-0">
          <ChevronDownIcon
            className={clsx("h-3 fill-[#495057] transition-all duration-250", [
              isOpen && "-rotate-180",
            ])}
          />
        </div>
      </div>
      <div
        className={clsx(
          "w-full border-b border-slate-100 transition-all duration-250",
          [
            isOpen
              ? "max-h-[500px] opacity-100 p-5"
              : "max-h-0 invisible px-5 opacity-0",
          ]
        )}
      >
        <div className="w-full mb-4">
          <div className="flex flex-col justify-between items-center">
            <div>
              <span className="inline-block text-sm text-[#797c8c] mb-4">
                CHOOSE THEME COLOR :
              </span>
              <div className="flex flex-wrap gap-4">
                {themeColors.map((color: any, index: number) => {
                  return (
                    <div
                      key={index}
                      className={clsx(
                        "h-6 w-6 rounded-full border-white border-2 cursor-pointer flex justify-center items-center"
                      )}
                      style={{
                        backgroundColor: color.value,
                        boxShadow: `0 0 0pt 1px ${color.value}`,
                      }}
                      onClick={() => {
                        handleChangeTheme(color.value);
                        document.documentElement.style.setProperty(
                          "--color-primary",
                          hexToRgb(color.value)
                        );
                      }}
                    >
                      {color.value === themeColor && (
                        <AcceptIcon className="h-3 fill-white" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="pt-8">
              <span className="inline-block text-sm text-[#797c8c] mb-4">
                CHOOSE THEME IMAGE :
              </span>
              <div className="flex flex-wrap gap-4">
                {[...Array(9).keys()].map((index: number) => {
                  return (
                    <div
                      key={index}
                      className={clsx(
                        "h-8 w-8 rounded-full border-[#e6ebf5] bg-slate-100 bg-cover border cursor-pointer flex justify-center items-center"
                      )}
                      style={{
                        backgroundColor: `url(/assets/images/bg-pattern/pattern-0${
                          index + 1
                        }.png)`,
                      }}
                      onClick={() => {
                        handleChangeBackground(
                          (index + 1) as backgroundPattern
                        );
                      }}
                    >
                      {index + 1 === backgroundPatternType && (
                        <AcceptIcon className="h-3 fill-green-500" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
