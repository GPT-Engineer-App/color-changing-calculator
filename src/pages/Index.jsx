import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const Index = () => {
  const [display, setDisplay] = useState("");
  const [faceplateColor, setFaceplateColor] = useState("#f0f0f0");
  const [numberColor, setNumberColor] = useState("#000000");
  const [faceplateInput, setFaceplateInput] = useState("#f0f0f0");
  const [numberInput, setNumberInput] = useState("#000000");

  const handleButtonClick = (value) => {
    if (value === "=") {
      try {
        setDisplay(eval(display).toString());
      } catch (error) {
        setDisplay("Error");
      }
    } else if (value === "C") {
      setDisplay("");
    } else {
      setDisplay(display + value);
    }
  };

  const isValidHex = (color) => /^#[0-9A-F]{6}$/i.test(color);

  const applyColors = () => {
    if (isValidHex(faceplateInput) && isValidHex(numberInput)) {
      setFaceplateColor(faceplateInput);
      setNumberColor(numberInput);
    } else {
      toast.error("Invalid color code. Please use valid hexadecimal colors.");
    }
  };

  const buttons = [
    "7", "8", "9", "/",
    "4", "5", "6", "*",
    "1", "2", "3", "-",
    "0", ".", "=", "+",
    "C"
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg" style={{ backgroundColor: faceplateColor }}>
        <div className="mb-4">
          <Input
            type="text"
            value={display}
            readOnly
            className="w-full text-right text-2xl p-2 mb-4"
            style={{ color: numberColor }}
          />
          <div className="grid grid-cols-4 gap-2">
            {buttons.map((btn) => (
              <Button
                key={btn}
                onClick={() => handleButtonClick(btn)}
                className="text-xl p-2"
                style={{ color: numberColor }}
              >
                {btn}
              </Button>
            ))}
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <Input
            type="text"
            value={faceplateInput}
            onChange={(e) => setFaceplateInput(e.target.value)}
            placeholder="Faceplate color (hex)"
            className="w-full"
          />
          <Input
            type="text"
            value={numberInput}
            onChange={(e) => setNumberInput(e.target.value)}
            placeholder="Number color (hex)"
            className="w-full"
          />
          <Button onClick={applyColors} className="w-full">
            Apply Colors
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;