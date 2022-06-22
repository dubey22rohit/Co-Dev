import { ChangeEventHandler } from "react";

export interface TextInputProps {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  fullwidth?: string;
}
