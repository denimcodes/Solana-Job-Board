export class JobPost {
  company: string;
  position: string;
  location: string;

  constructor(company: string, position: string, location: string) {
    this.company = company;
    this.position = position;
    this.location = location;
  }
}