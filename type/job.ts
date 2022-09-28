export interface JobDetail { 
    id? : string;
    jobName?: string;
    status?: string;
    completedDetail?: CompletedDetail;
    workStatus?: string;
    email?: string;
    timeStamp?: TimeStamp;
    startDetail?: StartDetail;
    CustomField?: (CustomField)[] | null;
    scheduled?: Scheduled;
    ownerJob?: string;
    location?: Location;
    fromPlace? : (FromPlace)[] | null
    toPlace? : (ToPlace)[] | null
  }
  export interface ToPlace{
    name : string;
    latlng : Latlng
  }
  export interface FromPlace{
    name : string;
    latlng : Latlng
  }
  export interface Time { 
    seconds: number;
    nanoseconds: number;
  }
  export interface CompletedDetail { 
    time: Time;
    remark: string;
  }
  export interface TimeStamp { 
    seconds: number;
    nanoseconds: number;
  }
  export interface StartDetail { 
    remark: string;
    time: Time;
  }
  export interface CustomField { 
    fieldType: string;
    defaultValue: boolean;
    value: boolean;
    label: string;
  }
  export interface Scheduled { 
    seconds: number;
    nanoseconds: number;
  }
  export interface Location { 
    name: string;
    latlng: Latlng;
  }
  export interface Latlng { 
    latitude: number;
    longitude: number;
  }
  