import { Podcast } from "../../types/models";

export class ValidationError {
  field: string;
  message: string;

  constructor(field: string, message: string) {
    this.field = field;
    this.message = message;
  }
}


export function validateData(data: PodcastData): Array<ValidationError> {
  const errors: Array<ValidationError> = []
  if (data.homepageBackgroundColor) {
    if (data.homepageBackgroundColor.length !== 7 && data.homepageBackgroundColor.startsWith("#")) {
      errors.push(new ValidationError("homepageBackgroundColor", "Invalid hex color"))
    }
  }
  return errors
}

export interface PodcastData extends Partial<Podcast> {
  logo?: any
}
