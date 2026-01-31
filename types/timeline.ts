export type TimelineEvent = {
  id: string;
  timestamp: string;
  disasterType: string;
  phaseId: string;
  phaseName: string;
  itemId: string;
  itemText: string;
  action: "checked" | "unchecked";
};
