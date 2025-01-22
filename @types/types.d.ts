declare module 'types' {
  export interface VehicleType {
    name: string;
    title: string;
    icons: {
      default: string;
    };
  }

  export interface Nation {
    name: string;
    title: string;
    color: string;
    icons: {
      small: string;
      medium: string;
      large: string;
    };
  }

  export interface Icons {
    large: string;
    medium: string;
  }

  export interface Vehicle {
    title: string;
    description: string;
    level: number;
    nation: Nation;
    type: VehicleType;
    icons: Icons;
  }
}
