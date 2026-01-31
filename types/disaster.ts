export type DisasterType = "earthquake" | "typhoon" | "flood";

export type Phase = {
  id: string;
  name: string;
  items: ChecklistItem[];
};

export type ChecklistItem = {
  id: string;
  text: string;
};

export type DisasterData = {
  type: DisasterType;
  title: string;
  description: string;
  phases: Phase[];
};
