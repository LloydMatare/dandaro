import { Label } from "./ui/label";

function GenderCheckbox({ oncheckboxChange, selectedGender }: any) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="male"
          id=""
          className="w-5 h-5 rounded-lg"
          checked={selectedGender === "male"}
          onChange={() => oncheckboxChange("male")}
        />
        <Label>Male</Label>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="female"
          id=""
          className="w-5 h-5 rounded-lg"
          checked={selectedGender === "female"}
          onChange={() => oncheckboxChange("female")}
        />
        <Label>Female</Label>
      </div>
    </div>
  );
}

export default GenderCheckbox;
